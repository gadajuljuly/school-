-- Basic automated RLS regression tests for shared_projects / office_groups.
--
-- Run via: psql -v ON_ERROR_STOP=1 -h <host> -U postgres -f supabase/tests/rls_head_office.sql
-- (CI runs this against a throwaway postgres:16 service container - see
-- .github/workflows/rls-tests.yml - never against the real database.)
--
-- Recreates just the columns shared_projects_created_by.sql and
-- office_groups.sql actually reference, then \ir-sources those files
-- VERBATIM (not reimplemented), so this tests what's actually shipped,
-- not a paraphrase of it that could quietly drift from the real policies.
-- Queries run as a plain non-superuser "authenticated" role (mirroring
-- Supabase's own role, the one RLS actually applies to - the connecting
-- "postgres" role owns the tables and would silently bypass RLS like any
-- table owner does), with request.jwt.claims set per simulated phone
-- number - the exact GUC auth.jwt() reads in production.
--
-- This exists because exactly this kind of policy broke once already in
-- production (an RLS self-reference Postgres rejects as infinite
-- recursion, which silently broke every shared-project query for
-- everyone, not just Head Office) - these tests exercise that same path
-- so a regression fails CI instead of surfacing as a live outage again.

create extension if not exists pgcrypto;

create schema if not exists auth;
create or replace function auth.jwt() returns jsonb
language sql stable
as $$
  select coalesce(nullif(current_setting('request.jwt.claims', true), ''), '{}')::jsonb
$$;

-- Minimal shared_projects stub - just what the two policy files below
-- reference. The real table also has name/data/messages/etc., none of
-- which matter for RLS.
create table shared_projects (
  id text primary key,
  members text[] not null default '{}'
);
alter table shared_projects enable row level security;

\ir ../sql/shared_projects_created_by.sql
\ir ../sql/office_groups.sql

do $$ begin
  if not exists (select from pg_roles where rolname = 'authenticated') then
    create role authenticated nologin;
  end if;
end $$;
grant usage on schema public to authenticated;
grant select, insert, update, delete on all tables in schema public to authenticated;
grant execute on all functions in schema public to authenticated;

-- Fixture: one shared project whose only member is MEM. Inserted as
-- postgres (bypasses RLS, same as the service role/service_role key would).
insert into shared_projects (id, members) values ('proj1', array['+972500000002']);

set role authenticated;

-- From here on, only request.jwt.claims changes between scenarios - the
-- session stays "authenticated" throughout, so every query below is
-- really subject to RLS, the same as the live app.

-- 1: the plain member can read their own project (base "members manage
-- their shared projects" policy, unrelated to Head Office).
select set_config('request.jwt.claims', '{"phone_number":"+972500000002"}', false);
do $$
declare cnt int;
begin
  select count(*) into cnt from shared_projects where id = 'proj1';
  if cnt <> 1 then raise exception 'FAIL 1: member should see their own project (got %)', cnt; end if;
  raise notice 'PASS 1: member sees their own project';
end $$;

-- 2: an uninvolved phone cannot read it.
select set_config('request.jwt.claims', '{"phone_number":"+972500000099"}', false);
do $$
declare cnt int;
begin
  select count(*) into cnt from shared_projects where id = 'proj1';
  if cnt <> 0 then raise exception 'FAIL 2: stranger should NOT see the project (got %)', cnt; end if;
  raise notice 'PASS 2: stranger cannot see the project';
end $$;

-- Build an office group: creator CRE invites MEM as member and HO as
-- Head Office. Both invites start pending.
select set_config('request.jwt.claims', '{"phone_number":"+972500000001"}', false);
do $$
declare gid uuid;
begin
  insert into office_groups (creator_phone) values ('+972500000001') returning id into gid;
  insert into office_group_invites (group_id, role, invited_phone, invited_by_phone)
    values (gid, 'member', '+972500000002', '+972500000001');
  insert into office_group_invites (group_id, role, invited_phone, invited_by_phone)
    values (gid, 'head_office', '+972500000003', '+972500000001');
  perform set_config('app.test_group_id', gid::text, false);
end $$;

-- 3: Head Office (HO) cannot see the project yet - neither invite has
-- been approved.
select set_config('request.jwt.claims', '{"phone_number":"+972500000003"}', false);
do $$
declare cnt int;
begin
  select count(*) into cnt from shared_projects where id = 'proj1';
  if cnt <> 0 then raise exception 'FAIL 3: unapproved Head Office should NOT see the project (got %)', cnt; end if;
  raise notice 'PASS 3: unapproved Head Office sees nothing yet';
end $$;

-- The member (MEM) approves their own invite.
select set_config('request.jwt.claims', '{"phone_number":"+972500000002"}', false);
do $$
begin
  update office_group_invites set status = 'approved'
    where group_id = current_setting('app.test_group_id')::uuid
      and role = 'member' and invited_phone = '+972500000002';
end $$;

-- 4: still nothing - the member approved, but Head Office hasn't.
select set_config('request.jwt.claims', '{"phone_number":"+972500000003"}', false);
do $$
declare cnt int;
begin
  select count(*) into cnt from shared_projects where id = 'proj1';
  if cnt <> 0 then raise exception 'FAIL 4: Head Office should still see nothing before approving (got %)', cnt; end if;
  raise notice 'PASS 4: Head Office still sees nothing before its own approval';
end $$;

-- Head Office (HO) approves its own invite.
do $$
begin
  update office_group_invites set status = 'approved'
    where group_id = current_setting('app.test_group_id')::uuid
      and role = 'head_office' and invited_phone = '+972500000003';
end $$;

-- 5: now Head Office CAN see the project - this is exactly the scenario
-- that silently broke once in production.
do $$
declare cnt int;
begin
  select count(*) into cnt from shared_projects where id = 'proj1';
  if cnt <> 1 then raise exception 'FAIL 5: approved Head Office should see the project now (got %)', cnt; end if;
  raise notice 'PASS 5: approved Head Office sees the project';
end $$;

-- 6: a stranger is still blocked even with a fully-approved group
-- elsewhere.
select set_config('request.jwt.claims', '{"phone_number":"+972500000099"}', false);
do $$
declare cnt int;
begin
  select count(*) into cnt from shared_projects where id = 'proj1';
  if cnt <> 0 then raise exception 'FAIL 6: stranger should still see nothing (got %)', cnt; end if;
  raise notice 'PASS 6: stranger still sees nothing';
end $$;

-- 7: a non-creator cannot delete another group's invites.
select set_config('request.jwt.claims', '{"phone_number":"+972500000099"}', false);
do $$
declare affected int;
begin
  delete from office_group_invites where group_id = current_setting('app.test_group_id')::uuid;
  get diagnostics affected = row_count;
  if affected <> 0 then raise exception 'FAIL 7: a non-creator should not be able to delete group invites (deleted %)', affected; end if;
  raise notice 'PASS 7: non-creator cannot delete another group''s invites';
end $$;

-- 8: the real creator CAN delete (revoke) an invite.
select set_config('request.jwt.claims', '{"phone_number":"+972500000001"}', false);
do $$
declare affected int;
begin
  delete from office_group_invites
    where group_id = current_setting('app.test_group_id')::uuid
      and role = 'head_office';
  get diagnostics affected = row_count;
  if affected <> 1 then raise exception 'FAIL 8: creator should be able to revoke the head_office invite (deleted %)', affected; end if;
  raise notice 'PASS 8: creator can revoke an invite';
end $$;

-- 9: after revoking Head Office's invite, it loses access again
-- immediately.
select set_config('request.jwt.claims', '{"phone_number":"+972500000003"}', false);
do $$
declare cnt int;
begin
  select count(*) into cnt from shared_projects where id = 'proj1';
  if cnt <> 0 then raise exception 'FAIL 9: revoked Head Office should lose access (got %)', cnt; end if;
  raise notice 'PASS 9: revoked Head Office loses access immediately';
end $$;

reset role;
\echo 'ALL RLS TESTS PASSED'
