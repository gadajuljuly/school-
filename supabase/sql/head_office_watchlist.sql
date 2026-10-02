-- Run this once in the Supabase SQL Editor.
--
-- Lets a Head Office account declare a list of OTHER people's phone numbers
-- ("watched" numbers) whose shared projects it should be able to read for
-- generating combined attendance/tools/procurement reports - without being
-- a real member of those projects (which would also grant it ordinary
-- write access, chat, notifications, etc.).
--
-- head_office_watchlist: each row is "this head office account watches
-- this phone number". A user may only read/write their OWN watch rows
-- (head_office_phone = their own verified number from the JWT).
create table if not exists head_office_watchlist (
  head_office_phone text not null,
  watched_phone text not null,
  created_at timestamptz not null default now(),
  primary key (head_office_phone, watched_phone)
);

alter table head_office_watchlist enable row level security;

drop policy if exists "users manage their own head office watchlist" on head_office_watchlist;
create policy "users manage their own head office watchlist"
  on head_office_watchlist for all
  using ((auth.jwt() ->> 'phone_number') = head_office_phone)
  with check ((auth.jwt() ->> 'phone_number') = head_office_phone);

-- Read-only addition to shared_projects' existing RLS: a Head Office
-- account can SELECT (never INSERT/UPDATE/DELETE) a project it isn't a
-- member of, as long as it has registered at least one of that project's
-- members as a watched number. Postgres combines multiple permissive
-- policies for the same command with OR, so this only ever ADDS read
-- visibility on top of "members manage their shared projects" below - it
-- can't weaken it, and write access to a watched-but-not-member project
-- stays blocked (enforced by the app's own code too - see
-- isSheetHeadOfficeMember() in tasks.html).
drop policy if exists "head office watchers can read watched members projects" on shared_projects;
create policy "head office watchers can read watched members projects"
  on shared_projects for select
  using (
    exists (
      select 1 from head_office_watchlist w
      where w.head_office_phone = (auth.jwt() ->> 'phone_number')
        and w.watched_phone = any(members)
    )
  );
