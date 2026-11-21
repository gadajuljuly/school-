-- Run once in the Supabase SQL Editor.
--
-- "פרטי" on a shared project (the project's long-press menu): its members
-- keep it from the head office - the office-group policies that let a head
-- office read and write its members' projects skip it. The same as in
-- office_groups.sql (re-running that file keeps this).

alter table shared_projects add column if not exists hidden_from_office boolean not null default false;

drop policy if exists "office group heads can read members projects" on shared_projects;
drop policy if exists "office group heads can write members projects" on shared_projects;

create policy "office group heads can read members projects"
  on shared_projects for select
  using (
    not hidden_from_office and (
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
  );
create policy "office group heads can write members projects"
  on shared_projects for update
  using (
    not hidden_from_office and (
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
  )
  with check (
    not hidden_from_office and (
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
  );
