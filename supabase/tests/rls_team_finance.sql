-- RLS tests for team_roles / project_finance (supabase/sql/team_and_finance.sql),
-- sourced verbatim. Same setup as rls_head_office.sql: a plain
-- "authenticated" role, request.jwt.claims set per simulated phone.
-- OWN = the team owner, ENG = an engineer on it, MGR = a site manager on
-- it, STR = a stranger.

create schema if not exists auth;
create or replace function auth.jwt() returns jsonb
language sql stable
as $$
  select coalesce(nullif(current_setting('request.jwt.claims', true), ''), '{}')::jsonb
$$;

\ir ../sql/team_and_finance.sql

do $$ begin
  if not exists (select from pg_roles where rolname = 'authenticated') then
    create role authenticated nologin;
  end if;
end $$;
grant usage on schema public to authenticated;
grant usage on schema auth to authenticated;
grant select, insert, update, delete on all tables in schema public to authenticated;
grant execute on all functions in schema public to authenticated;
grant execute on all functions in schema auth to authenticated;

set role authenticated;

-- the owner builds the team and a project's money
select set_config('request.jwt.claims', '{"phone_number":"+972500000001"}', false);
insert into team_roles (owner_phone, phone, name, role) values
  ('+972500000001', '+972500000002', 'מהנדס', 'engineer'),
  ('+972500000001', '+972500000003', 'מנהל עבודה', 'site_manager');
insert into project_finance (owner_phone, project_id, data) values ('+972500000001', 'proj1', '{"budget":[{"amount":100}]}');
do $$
declare cnt int;
begin
  select count(*) into cnt from team_roles;
  if cnt <> 2 then raise exception 'FAIL 1: owner should see their whole team (got %)', cnt; end if;
  select count(*) into cnt from project_finance;
  if cnt <> 1 then raise exception 'FAIL 2: owner should see their money (got %)', cnt; end if;
  raise notice 'PASS 1-2: the owner sees the team and the money';
end $$;

-- the engineer: sees their own role only, sees and edits the money
select set_config('request.jwt.claims', '{"phone_number":"+972500000002"}', false);
do $$
declare cnt int;
begin
  select count(*) into cnt from team_roles;
  if cnt <> 1 then raise exception 'FAIL 3: engineer should see only their own role (got %)', cnt; end if;
  select count(*) into cnt from project_finance where project_id = 'proj1';
  if cnt <> 1 then raise exception 'FAIL 4: engineer should see the money (got %)', cnt; end if;
  update project_finance set data = '{"budget":[{"amount":120}]}', data_version = data_version + 1 where project_id = 'proj1';
  get diagnostics cnt = row_count;
  if cnt <> 1 then raise exception 'FAIL 5: engineer should edit the money (got %)', cnt; end if;
  insert into project_finance (owner_phone, project_id) values ('+972500000001', 'proj2');
  raise notice 'PASS 3-6: the engineer sees their role, sees, edits and adds the money';
end $$;
do $$
begin
  begin
    insert into team_roles (owner_phone, phone, role) values ('+972500000001', '+972500000009', 'engineer');
    raise exception 'FAIL 7: engineer must not add people to the owner''s team';
  exception when insufficient_privilege then
    raise notice 'PASS 7: the engineer can''t change the team';
  end;
end $$;

-- the site manager: on the team, but no money
select set_config('request.jwt.claims', '{"phone_number":"+972500000003"}', false);
do $$
declare cnt int;
begin
  select count(*) into cnt from project_finance;
  if cnt <> 0 then raise exception 'FAIL 8: site manager must not see the money (got %)', cnt; end if;
  update project_finance set data = '{}' where project_id = 'proj1';
  get diagnostics cnt = row_count;
  if cnt <> 0 then raise exception 'FAIL 9: site manager must not edit the money'; end if;
  begin
    insert into project_finance (owner_phone, project_id) values ('+972500000001', 'proj3');
    raise exception 'FAIL 10: site manager must not add money rows';
  exception when insufficient_privilege then null;
  end;
  raise notice 'PASS 8-10: the site manager sees and changes no money';
end $$;

-- a stranger: nothing
select set_config('request.jwt.claims', '{"phone_number":"+972500000099"}', false);
do $$
declare cnt int;
begin
  select count(*) into cnt from team_roles;
  if cnt <> 0 then raise exception 'FAIL 11: stranger must not see the team (got %)', cnt; end if;
  select count(*) into cnt from project_finance;
  if cnt <> 0 then raise exception 'FAIL 12: stranger must not see the money (got %)', cnt; end if;
  raise notice 'PASS 11-12: a stranger sees nothing';
end $$;
-- no phone at all (signed out): nothing
select set_config('request.jwt.claims', '{}', false);
do $$
declare cnt int;
begin
  select count(*) into cnt from project_finance;
  if cnt <> 0 then raise exception 'FAIL 13: no phone must see nothing (got %)', cnt; end if;
  raise notice 'PASS 13: signed out sees nothing';
end $$;

-- the owner takes the engineer off the team: the money is gone for them
select set_config('request.jwt.claims', '{"phone_number":"+972500000001"}', false);
delete from team_roles where phone = '+972500000002';
select set_config('request.jwt.claims', '{"phone_number":"+972500000002"}', false);
do $$
declare cnt int;
begin
  select count(*) into cnt from project_finance;
  if cnt <> 0 then raise exception 'FAIL 14: a removed engineer must lose the money (got %)', cnt; end if;
  raise notice 'PASS 14: taken off the team, the money is gone';
end $$;
