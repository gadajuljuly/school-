-- Run this once in the Supabase SQL Editor (safe to re-run).
--
-- A Head Office used to see a shared project only when one of the
-- project's members was an APPROVED 'member' invite of the office group -
-- the group's own creator wasn't counted, so every project the creator runs
-- (and its procurement orders) stayed invisible on the Head Office's own
-- device unless the creator had also invited and approved themselves as a
-- member. This makes the group's creator an implicit member: a project the
-- creator belongs to is visible/writable to that group's approved Head
-- Office too. Only ever ADDS access (permissive policies are OR'd).

-- SECURITY DEFINER so the lookup into office_groups/office_group_invites
-- isn't re-filtered by their own RLS from inside a shared_projects policy.
create or replace function is_head_office_of_project_creator(p_members text[])
returns boolean
language sql
security definer
stable
as $$
  select exists (
    select 1
    from office_group_invites ho
    join office_groups g on g.id = ho.group_id
    where ho.invited_phone = (auth.jwt() ->> 'phone_number')
      and ho.role = 'head_office'
      and ho.status = 'approved'
      and g.creator_phone = any(p_members)
  );
$$;

drop policy if exists "head office reads group creator projects" on shared_projects;
create policy "head office reads group creator projects"
  on shared_projects for select
  using (is_head_office_of_project_creator(members));

drop policy if exists "head office writes group creator projects" on shared_projects;
create policy "head office writes group creator projects"
  on shared_projects for update
  using (is_head_office_of_project_creator(members))
  with check (is_head_office_of_project_creator(members));
