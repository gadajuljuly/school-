-- Run once in the Supabase SQL Editor (after team_and_finance.sql and
-- office_groups.sql).
--
-- הרשאות (who sees the projects' money) are the head office's to give:
-- adding or changing someone on a team is allowed only to a phone that
-- created an office group, or holds an approved head-office invite in one -
-- the same ones the app lets into Head Office mode (10-head-office-groups.js).
-- Everyone can still see, and remove, the rows they already own, and see
-- the teams they're on.

create or replace function is_head_office()
returns boolean
language sql stable security definer
set search_path = public
as $$
  select coalesce(auth.jwt() ->> 'phone_number', '') <> ''
    and (exists (select 1 from office_groups g where g.creator_phone = auth.jwt() ->> 'phone_number')
      or exists (select 1 from office_group_invites i
                 where i.invited_phone = auth.jwt() ->> 'phone_number'
                   and i.role = 'head_office' and i.status = 'approved'));
$$;

drop policy if exists "owner manages their team" on team_roles;

-- the owner sees and removes their own rows
drop policy if exists "owner sees their team" on team_roles;
create policy "owner sees their team"
  on team_roles for select
  using (owner_phone = (auth.jwt() ->> 'phone_number'));
drop policy if exists "owner removes from their team" on team_roles;
create policy "owner removes from their team"
  on team_roles for delete
  using (owner_phone = (auth.jwt() ->> 'phone_number'));

-- adding / changing: the head office only
drop policy if exists "head office adds to their team" on team_roles;
create policy "head office adds to their team"
  on team_roles for insert
  with check (owner_phone = (auth.jwt() ->> 'phone_number') and is_head_office());
drop policy if exists "head office changes their team" on team_roles;
create policy "head office changes their team"
  on team_roles for update
  using (owner_phone = (auth.jwt() ->> 'phone_number') and is_head_office())
  with check (owner_phone = (auth.jwt() ->> 'phone_number') and is_head_office());
