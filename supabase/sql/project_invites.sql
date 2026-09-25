-- Run this once in the Supabase SQL Editor, after enable_rls_custom_auth.sql
-- (it depends on the same mint-session-token JWT: auth.jwt()->>'phone_number'
-- is the user's own verified phone).
--
-- "שיתוף" on a project's tab now sends an explicit invite instead of
-- silently adding someone as a member: the invited phone only gets access
-- to the project once they approve it themselves, via the two
-- security-definer functions below. A plain client-side UPDATE can't add
-- someone to shared_projects.members directly, since that table's own RLS
-- (see enable_rls_custom_auth.sql) only lets EXISTING members touch a row
-- at all - so approving/declining has to go through a function that runs
-- with elevated privileges but still checks the caller really is the
-- invited phone before doing anything.

create table if not exists project_invites (
  id uuid primary key default gen_random_uuid(),
  project_id uuid not null references shared_projects(id) on delete cascade,
  project_name text not null,
  invited_phone text not null,
  invited_name text,
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

-- No update/delete policy for plain clients on purpose - see the functions
-- below for how a pending invite actually gets resolved.

create or replace function approve_project_invite(invite_id uuid)
returns void
language plpgsql
security definer
set search_path = public
as $$
declare
  inv project_invites%rowtype;
  caller_phone text := auth.jwt() ->> 'phone_number';
begin
  if caller_phone is null then
    raise exception 'not authenticated';
  end if;

  select * into inv from project_invites where id = invite_id for update;
  if not found then
    raise exception 'invite not found';
  end if;
  if inv.invited_phone <> caller_phone then
    raise exception 'not your invite';
  end if;
  if inv.status <> 'pending' then
    raise exception 'invite already resolved';
  end if;

  update shared_projects
    set members = array_append(members, caller_phone),
        member_names = coalesce(member_names, '{}'::jsonb) || jsonb_build_object(caller_phone, coalesce(inv.invited_name, caller_phone))
    where id = inv.project_id
      and not (caller_phone = any(members));

  update project_invites set status = 'approved', resolved_at = now() where id = invite_id;
end;
$$;

create or replace function decline_project_invite(invite_id uuid)
returns void
language plpgsql
security definer
set search_path = public
as $$
declare
  inv project_invites%rowtype;
  caller_phone text := auth.jwt() ->> 'phone_number';
begin
  if caller_phone is null then
    raise exception 'not authenticated';
  end if;

  select * into inv from project_invites where id = invite_id for update;
  if not found then
    raise exception 'invite not found';
  end if;
  if inv.invited_phone <> caller_phone then
    raise exception 'not your invite';
  end if;
  if inv.status <> 'pending' then
    raise exception 'invite already resolved';
  end if;

  update project_invites set status = 'declined', resolved_at = now() where id = invite_id;
end;
$$;

grant execute on function approve_project_invite(uuid) to public;
grant execute on function decline_project_invite(uuid) to public;
