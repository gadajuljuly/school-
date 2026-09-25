-- Run this once in the Supabase SQL Editor, after enable_rls_custom_auth.sql
-- (it depends on the same mint-session-token JWT: auth.jwt()->>'phone_number'
-- is the user's own verified phone).
--
-- "שיתוף" on a project's tab sends a one-time COPY of the project to each
-- invited phone, not a live shared project - the sender's own project is
-- never touched. Each invite carries a full snapshot of the project's
-- tasks/reports/site logs at send time; once the invited phone approves,
-- their own client creates a brand-new private project from that
-- snapshot. Because the recipient never needs to touch anything but their
-- own invite row, a plain per-phone RLS policy is enough here - no
-- elevated/security-definer function needed (contrast with a real
-- membership model like shared_projects, which would need one).

create table if not exists project_invites (
  id uuid primary key default gen_random_uuid(),
  project_name text not null,
  snapshot jsonb not null,
  invited_phone text not null,
  invited_by_phone text not null,
  invited_by_name text,
  status text not null default 'pending' check (status in ('pending', 'approved', 'declined')),
  created_at timestamptz not null default now(),
  resolved_at timestamptz
);

alter table project_invites enable row level security;

drop policy if exists "see invites sent to or by me" on project_invites;
create policy "see invites sent to or by me"
  on project_invites for select
  using (
    invited_phone = (auth.jwt() ->> 'phone_number')
    or invited_by_phone = (auth.jwt() ->> 'phone_number')
  );

drop policy if exists "create invites as myself" on project_invites;
create policy "create invites as myself"
  on project_invites for insert
  with check (invited_by_phone = (auth.jwt() ->> 'phone_number'));

drop policy if exists "resolve my own invites" on project_invites;
create policy "resolve my own invites"
  on project_invites for update
  using (invited_phone = (auth.jwt() ->> 'phone_number'))
  with check (invited_phone = (auth.jwt() ->> 'phone_number'));
