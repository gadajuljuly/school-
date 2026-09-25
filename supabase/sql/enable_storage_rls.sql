-- Run this once in the Supabase SQL Editor, after enable_rls_custom_auth.sql
-- (it depends on the same mint-session-token JWT: auth.uid() = the user's
-- own phoneToUuid id, auth.jwt()->>'phone_number' = their verified phone).
--
-- Until now the "project-files" Storage bucket had no per-project locking
-- at all: it's a public bucket with no RLS on storage.objects, so anyone
-- holding the app's anon key (visible in the app's own source) could
-- upload, overwrite, delete, or - since it's public - simply guess/browse
-- for files belonging to ANY project, not just their own. This locks it
-- down to match the same ownership rules already enforced on app_state and
-- shared_projects: a path's first folder segment is always the owning
-- sheet's own id (see uploadLibraryFiles/uploadAndSendChatFile/etc. in
-- tasks.html, which all build paths as "<sheetId>/...").

-- Stop serving every object to anyone with a bare URL. The app already
-- switched from getPublicUrl() to createSignedUrl() everywhere (see
-- resolveFileUrl() in tasks.html) - a signed URL still requires the
-- policies below to succeed, so making the bucket private doesn't break
-- anything the app already does going forward. It DOES mean any
-- old public-style links already handed out (old chat messages, old site
-- log attachments) stop working unless migrated - see migrate_file_urls in
-- tasks.html, which the app runs once automatically to reissue them as
-- signed URLs before this file is applied.
update storage.buckets set public = false where id = 'project-files';

alter table storage.objects enable row level security;

drop policy if exists "manage own or shared project files" on storage.objects;
create policy "manage own or shared project files"
  on storage.objects for all
  using (
    bucket_id = 'project-files'
    and (
      -- Private sheet: the path's first folder segment (the sheet id) must
      -- appear as an "id" in this user's own app_state.data.sheets array.
      exists (
        select 1 from app_state a
        where a.id::text = auth.uid()::text
          and a.data->'sheets' @> jsonb_build_array(jsonb_build_object('id', (storage.foldername(name))[1]))
      )
      -- Shared project: the path's first folder segment is the
      -- shared_projects row id, and the requester's phone is a member.
      or exists (
        select 1 from shared_projects sp
        where sp.id::text = (storage.foldername(name))[1]
          and (auth.jwt() ->> 'phone_number') = any(sp.members)
      )
    )
  )
  with check (
    bucket_id = 'project-files'
    and (
      exists (
        select 1 from app_state a
        where a.id::text = auth.uid()::text
          and a.data->'sheets' @> jsonb_build_array(jsonb_build_object('id', (storage.foldername(name))[1]))
      )
      or exists (
        select 1 from shared_projects sp
        where sp.id::text = (storage.foldername(name))[1]
          and (auth.jwt() ->> 'phone_number') = any(sp.members)
      )
    )
  );
