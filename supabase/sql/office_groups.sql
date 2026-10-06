-- Run this once in the Supabase SQL Editor (safe to re-run - every policy
-- is dropped and recreated, and CREATE TABLE IF NOT EXISTS is idempotent).
--
-- office_groups: fully self-service, like a WhatsApp group - any user can
-- create one. A phone number only actually becomes a member (or the
-- group's Head Office) once THEY approve an invite addressed to them -
-- never just because the creator typed their number. This mirrors the
-- app's existing project_invites pattern (send an invite row, the
-- recipient approves/declines it themselves).

create table if not exists office_groups (
  id uuid primary key default gen_random_uuid(),
  creator_phone text not null,
  created_at timestamptz not null default now()
);

-- One row per invited phone number per group: 'member' rows are people
-- whose shared projects the group's Head Office should see once approved;
-- 'head_office' rows are the (usually one) phone number granted that
-- watching role once THEY approve.
create table if not exists office_group_invites (
  id uuid primary key default gen_random_uuid(),
  group_id uuid not null references office_groups(id) on delete cascade,
  role text not null check (role in ('member', 'head_office')),
  invited_phone text not null,
  invited_by_phone text not null,
  invited_by_name text,
  status text not null default 'pending' check (status in ('pending', 'approved', 'declined')),
  created_at timestamptz not null default now(),
  resolved_at timestamptz
);

-- A plain subquery inside a policy that reads the SAME table it's
-- attached to (see the office_group_invites policy below) makes Postgres
-- re-evaluate that table's row security recursively while resolving it,
-- which Postgres rejects outright ("infinite recursion detected in
-- policy") - and since policies on a table are OR'd together, that error
-- broke EVERY query against office_group_invites and, transitively, every
-- shared_projects query too (including the plain "members manage their
-- shared projects" path everyone relies on), not just the Head Office
-- case. A SECURITY DEFINER function sidesteps this the standard way: the
-- query inside it runs in its own planning context instead of being
-- inlined into the same recursive policy expression.
create or replace function is_approved_office_group_head_office(p_group_id uuid)
returns boolean
language sql
security definer
stable
as $$
  select exists (
    select 1 from office_group_invites
    where group_id = p_group_id
      and invited_phone = (auth.jwt() ->> 'phone_number')
      and role = 'head_office'
      and status = 'approved'
  );
$$;

-- Drop every shared_projects policy from every earlier version of this
-- file FIRST - an older one ("office group heads can read/write members
-- projects") reads office_groups.members directly, and Postgres refuses
-- to drop a column a live policy still depends on. Must happen before the
-- column drop just below.
drop policy if exists "head office watchers can read watched members projects" on shared_projects;
drop policy if exists "head office watchers can write watched members projects" on shared_projects;
drop policy if exists "head offices can read exposed users projects" on shared_projects;
drop policy if exists "head offices can write exposed users projects" on shared_projects;
drop policy if exists "office group heads can read members projects" on shared_projects;
drop policy if exists "office group heads can write members projects" on shared_projects;

-- If an earlier version of this file already ran, office_groups exists
-- with its own head_office_phone (not null) and members (not null)
-- columns - CREATE TABLE IF NOT EXISTS above is then a no-op and skips
-- them entirely, so every insert from the app (which no longer sends
-- either field) would fail a not-null constraint. Drop them unconditionally
-- now that nothing depends on them; harmless if they were never there.
alter table office_groups drop column if exists head_office_phone;
alter table office_groups drop column if exists members;

alter table office_groups enable row level security;
alter table office_group_invites enable row level security;

drop policy if exists "creator or head office can read the group" on office_groups;
drop policy if exists "creator manages their own office groups" on office_groups;
drop policy if exists "read own or approved-invite office groups" on office_groups;
create policy "read own or approved-invite office groups"
  on office_groups for select
  using (
    creator_phone = (auth.jwt() ->> 'phone_number')
    or exists (
      select 1 from office_group_invites i
      where i.group_id = office_groups.id
        and i.invited_phone = (auth.jwt() ->> 'phone_number')
        and i.status = 'approved'
    )
  );
create policy "creator manages their own office groups"
  on office_groups for all
  using (creator_phone = (auth.jwt() ->> 'phone_number'))
  with check (creator_phone = (auth.jwt() ->> 'phone_number'));

drop policy if exists "see invites sent to or by me" on office_group_invites;
create policy "see invites sent to or by me"
  on office_group_invites for select
  using (
    invited_phone = (auth.jwt() ->> 'phone_number')
    or invited_by_phone = (auth.jwt() ->> 'phone_number')
  );

-- Without this, a Head Office account that is neither the member nor the
-- group's creator (the normal case - Head Office is usually a third
-- phone number) has no RLS visibility into the MEMBER invite rows at
-- all, so the shared_projects policy below - which joins against exactly
-- those rows to decide what to expose - silently finds nothing and the
-- Head Office never sees any project, even once everyone has approved.
drop policy if exists "approved head office can read its group's invites" on office_group_invites;
create policy "approved head office can read its group's invites"
  on office_group_invites for select
  using (is_approved_office_group_head_office(group_id));

-- Only the group's own creator can invite someone into it.
drop policy if exists "group creator sends invites" on office_group_invites;
create policy "group creator sends invites"
  on office_group_invites for insert
  with check (
    invited_by_phone = (auth.jwt() ->> 'phone_number')
    and exists (
      select 1 from office_groups g
      where g.id = group_id and g.creator_phone = (auth.jwt() ->> 'phone_number')
    )
  );

-- Only the group's own creator can remove someone from it (member or the
-- head_office invite alike) - lets the app's group-management screen add
-- or delete members after creation, not just at setup time.
drop policy if exists "group creator removes invites" on office_group_invites;
create policy "group creator removes invites"
  on office_group_invites for delete
  using (
    exists (
      select 1 from office_groups g
      where g.id = group_id and g.creator_phone = (auth.jwt() ->> 'phone_number')
    )
  );

-- Only the invited phone can approve/decline their own invite.
drop policy if exists "invited phone resolves their own invite" on office_group_invites;
create policy "invited phone resolves their own invite"
  on office_group_invites for update
  using (invited_phone = (auth.jwt() ->> 'phone_number'))
  with check (invited_phone = (auth.jwt() ->> 'phone_number'));

-- A Head Office account (or the group's own creator) can see/write a
-- shared project once there's an APPROVED member invite (in a group
-- they're the approved Head Office of, or that they created) whose phone
-- is one of the project's own members. Postgres combines multiple
-- permissive policies for the same command with OR, so this only ever
-- ADDS access on top of "members manage their shared projects" - it
-- can't weaken it.
create policy "office group heads can read members projects"
  on shared_projects for select
  using (
    exists (
      select 1 from office_group_invites ho
      join office_group_invites mem on mem.group_id = ho.group_id
      where ho.invited_phone = (auth.jwt() ->> 'phone_number') and ho.role = 'head_office' and ho.status = 'approved'
        and mem.role = 'member' and mem.status = 'approved'
        and mem.invited_phone = any(members)
    )
    or exists (
      select 1 from office_groups g
      join office_group_invites mem on mem.group_id = g.id
      where g.creator_phone = (auth.jwt() ->> 'phone_number')
        and mem.role = 'member' and mem.status = 'approved'
        and mem.invited_phone = any(members)
    )
  );
create policy "office group heads can write members projects"
  on shared_projects for update
  using (
    exists (
      select 1 from office_group_invites ho
      join office_group_invites mem on mem.group_id = ho.group_id
      where ho.invited_phone = (auth.jwt() ->> 'phone_number') and ho.role = 'head_office' and ho.status = 'approved'
        and mem.role = 'member' and mem.status = 'approved'
        and mem.invited_phone = any(members)
    )
    or exists (
      select 1 from office_groups g
      join office_group_invites mem on mem.group_id = g.id
      where g.creator_phone = (auth.jwt() ->> 'phone_number')
        and mem.role = 'member' and mem.status = 'approved'
        and mem.invited_phone = any(members)
    )
  )
  with check (
    exists (
      select 1 from office_group_invites ho
      join office_group_invites mem on mem.group_id = ho.group_id
      where ho.invited_phone = (auth.jwt() ->> 'phone_number') and ho.role = 'head_office' and ho.status = 'approved'
        and mem.role = 'member' and mem.status = 'approved'
        and mem.invited_phone = any(members)
    )
    or exists (
      select 1 from office_groups g
      join office_group_invites mem on mem.group_id = g.id
      where g.creator_phone = (auth.jwt() ->> 'phone_number')
        and mem.role = 'member' and mem.status = 'approved'
        and mem.invited_phone = any(members)
    )
  );

-- The old per-account watchlist table (an even earlier version of Head
-- Office access) is no longer read by the app either - safe to drop:
--   drop table if exists head_office_watchlist;
