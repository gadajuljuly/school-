-- Run this once in the Supabase SQL Editor.
--
-- Replaces the old self-service Head Office setup (anyone could type their
-- own number into the app's "מספר משרד ראשי" field, or - for one hardcoded
-- number - flip a menu toggle, then add any phone number to their own
-- watchlist) with office_groups: fully self-service, like a WhatsApp
-- group - any user can create one, naming a list of member phone numbers
-- and the one phone number that becomes that group's Head Office. Both
-- the creator and the named Head Office can see (and the Head Office can
-- also write to) every shared project any of the group's members belongs
-- to. No admin, no developer intervention - whoever creates the group
-- decides who's in it and who watches it, exactly like adding people to a
-- WhatsApp group.
--
-- members is a plain text[] array of phone numbers. shared_projects.members
-- is the same type, so "do these two arrays share any phone number" is a
-- single overlap check (&&) - no join table needed.

create table if not exists office_groups (
  id uuid primary key default gen_random_uuid(),
  creator_phone text not null,
  head_office_phone text not null,
  members text[] not null default '{}',
  created_at timestamptz not null default now()
);
alter table office_groups enable row level security;

drop policy if exists "creator or head office can read the group" on office_groups;
create policy "creator or head office can read the group"
  on office_groups for select
  using (
    creator_phone = (auth.jwt() ->> 'phone_number')
    or head_office_phone = (auth.jwt() ->> 'phone_number')
  );

drop policy if exists "creator manages their own office groups" on office_groups;
create policy "creator manages their own office groups"
  on office_groups for all
  using (creator_phone = (auth.jwt() ->> 'phone_number'))
  with check (creator_phone = (auth.jwt() ->> 'phone_number'));

-- Replaces head_office_watchlist.sql's two shared_projects policies: the
-- creator or the named Head Office of a group can see/write a shared
-- project as soon as ANY of that group's members is one of the project's
-- own members - no per-project invite needed, and nothing here changes
-- who can invite whom into a shared project in the first place. Postgres
-- combines multiple permissive policies for the same command with OR, so
-- this only ever ADDS access on top of "members manage their shared
-- projects" - it can't weaken it.
drop policy if exists "head office watchers can read watched members projects" on shared_projects;
drop policy if exists "head office watchers can write watched members projects" on shared_projects;
drop policy if exists "head offices can read exposed users projects" on shared_projects;
drop policy if exists "head offices can write exposed users projects" on shared_projects;
create policy "office group heads can read members projects"
  on shared_projects for select
  using (
    exists (
      select 1 from office_groups g
      where (g.head_office_phone = (auth.jwt() ->> 'phone_number') or g.creator_phone = (auth.jwt() ->> 'phone_number'))
        and g.members && members
    )
  );
create policy "office group heads can write members projects"
  on shared_projects for update
  using (
    exists (
      select 1 from office_groups g
      where (g.head_office_phone = (auth.jwt() ->> 'phone_number') or g.creator_phone = (auth.jwt() ->> 'phone_number'))
        and g.members && members
    )
  )
  with check (
    exists (
      select 1 from office_groups g
      where (g.head_office_phone = (auth.jwt() ->> 'phone_number') or g.creator_phone = (auth.jwt() ->> 'phone_number'))
        and g.members && members
    )
  );

-- The old per-account watchlist table is no longer read by the app at all
-- after this change - left in place rather than dropped, in case you want
-- to keep its history. Safe to drop yourself later if you don't:
--   drop table if exists head_office_watchlist;
