-- תל"א / תח"י – database setup.
-- Run once in Supabase: SQL Editor → New query → paste everything → Run.
-- Before running, put your own e-mail in the last line (the administrator who sees all teachers).

create table if not exists public.tala_students (
  id          text primary key,
  owner       uuid not null default auth.uid() references auth.users (id) on delete cascade,
  owner_email text,
  owner_name  text,
  data        jsonb not null default '{}'::jsonb,
  deleted     boolean not null default false,
  updated_at  timestamptz not null default now()
);
alter table public.tala_students add column if not exists owner_name text;
create index if not exists tala_students_owner on public.tala_students (owner);

create table if not exists public.tala_admins (
  email text primary key
);

-- The owner and their e-mail always come from the signed-in user, never from the app.
create or replace function public.tala_stamp_owner() returns trigger
language plpgsql security definer set search_path = public as $$
begin
  new.owner := auth.uid();
  new.owner_email := lower(auth.jwt() ->> 'email');
  new.owner_name := auth.jwt() -> 'user_metadata' ->> 'name';
  return new;
end $$;
drop trigger if exists tala_stamp_owner on public.tala_students;
create trigger tala_stamp_owner before insert or update on public.tala_students
  for each row execute function public.tala_stamp_owner();

create or replace function public.tala_is_admin() returns boolean
language sql stable security definer set search_path = public as $$
  select exists (select 1 from public.tala_admins where lower(email) = lower(auth.jwt() ->> 'email'));
$$;

alter table public.tala_students enable row level security;
alter table public.tala_admins enable row level security;

-- Each teacher reads and writes only her own students; the administrator can read everyone's.
drop policy if exists "tala read" on public.tala_students;
create policy "tala read" on public.tala_students for select to authenticated
  using (owner = auth.uid() or public.tala_is_admin());
drop policy if exists "tala insert" on public.tala_students;
create policy "tala insert" on public.tala_students for insert to authenticated
  with check (owner = auth.uid());
drop policy if exists "tala update" on public.tala_students;
create policy "tala update" on public.tala_students for update to authenticated
  using (owner = auth.uid()) with check (owner = auth.uid());
drop policy if exists "tala delete" on public.tala_students;
create policy "tala delete" on public.tala_students for delete to authenticated
  using (owner = auth.uid());

-- A signed-in user can only check whether she herself is an administrator.
drop policy if exists "tala admin self" on public.tala_admins;
create policy "tala admin self" on public.tala_admins for select to authenticated
  using (lower(email) = lower(auth.jwt() ->> 'email'));

-- Access for signed-in users only (needed when "Automatically expose new tables" is off).
revoke all on public.tala_students, public.tala_admins from anon;
grant usage on schema public to authenticated;
grant select, insert, update, delete on public.tala_students to authenticated;
grant select on public.tala_admins to authenticated;
grant execute on function public.tala_is_admin() to authenticated;

-- The administrator (sees every teacher's students): her e-mail.
-- ↓↓↓ Replace with the administrator's e-mail ↓↓↓
insert into public.tala_admins (email) values (lower('YOUR_EMAIL@example.com')) on conflict do nothing;
