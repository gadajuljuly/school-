-- Run this once in the Supabase SQL Editor.
--
-- The team a user keeps (מהנדסים ומנהלי עבודה, by phone number) and the
-- projects' money (budget, expenses, income - project_finance). The money
-- is seen and edited only by that user and the ENGINEERS on their team;
-- site managers are on the list but don't see it. Enforced here, by RLS,
-- not just hidden in the app. auth.jwt() ->> 'phone_number' is the signed-in
-- phone, as in enable_rls_custom_auth.sql.

create table if not exists team_roles (
  owner_phone text not null,           -- whose team (the one who manages it)
  phone text not null,                 -- the team member, +972...
  name text,
  role text not null check (role in ('engineer', 'site_manager')),
  created_at timestamptz not null default now(),
  primary key (owner_phone, phone)
);
alter table team_roles enable row level security;

drop policy if exists "owner manages their team" on team_roles;
create policy "owner manages their team"
  on team_roles for all
  using (owner_phone = (auth.jwt() ->> 'phone_number'))
  with check (owner_phone = (auth.jwt() ->> 'phone_number'));

-- a member sees the rows that name them (which teams they're on, as what)
drop policy if exists "members see their own role" on team_roles;
create policy "members see their own role"
  on team_roles for select
  using (phone = (auth.jwt() ->> 'phone_number'));

-- the owner, or an engineer on the owner's team
create or replace function is_finance_member(p_owner text)
returns boolean
language sql stable security definer
set search_path = public
as $$
  select coalesce(auth.jwt() ->> 'phone_number', '') <> ''
    and (p_owner = auth.jwt() ->> 'phone_number'
      or exists (
        select 1 from team_roles t
        where t.owner_phone = p_owner
          and t.phone = auth.jwt() ->> 'phone_number'
          and t.role = 'engineer'));
$$;

-- one row per project per team owner; `data` holds budget lines, expenses
-- and income (with the fields Priority will need later: project number,
-- supplier code, invoice number, budget item; all amounts before VAT)
create table if not exists project_finance (
  owner_phone text not null,
  project_id text not null,
  data jsonb not null default '{}'::jsonb,
  data_version integer not null default 1,
  updated_at timestamptz not null default now(),
  primary key (owner_phone, project_id)
);
alter table project_finance enable row level security;

drop policy if exists "owner and their engineers manage the money" on project_finance;
create policy "owner and their engineers manage the money"
  on project_finance for all
  using (is_finance_member(owner_phone))
  with check (is_finance_member(owner_phone));
