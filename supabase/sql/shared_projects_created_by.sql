-- Run this once in the Supabase SQL Editor.
--
-- Adds a created_by column to shared_projects, and splits the single
-- "members manage their shared projects" policy (which granted every
-- member - creator or invited - full access including DELETE) into one
-- policy per operation, so DELETE is now restricted to created_by only.
-- Matches the app: the "מחיקה" (delete) option on a shared project's
-- long-press menu is now only shown to the member who created it.
--
-- Existing shared projects (created before this column existed) get
-- created_by = null, since there's no reliable way to know after the
-- fact who created them - nobody will see the delete option for those
-- until/unless you set created_by manually for a specific row.

alter table shared_projects add column if not exists created_by text;

drop policy if exists "members manage their shared projects" on shared_projects;

create policy "members read their shared projects"
  on shared_projects for select
  using ((auth.jwt() ->> 'phone_number') = any(members));

create policy "members insert shared projects they belong to"
  on shared_projects for insert
  with check ((auth.jwt() ->> 'phone_number') = any(members));

create policy "members update their shared projects"
  on shared_projects for update
  using ((auth.jwt() ->> 'phone_number') = any(members))
  with check ((auth.jwt() ->> 'phone_number') = any(members));

create policy "creator can delete their shared project"
  on shared_projects for delete
  using ((auth.jwt() ->> 'phone_number') = created_by);
