-- Run this once in the Supabase SQL Editor.
-- Adds optimistic-concurrency version counters to shared_projects, one per
-- independently-updated column group (`data` = tasks/reports/folders/
-- siteLogs/ended/logoId, `messages` = chat). Every write that touches one of
-- these columns now does a compare-and-swap on its version number instead
-- of a blind upsert/update, so a write from one member never silently
-- overwrites a change another member made in between - see
-- updateSharedSheetDataSafely() / updateSharedMessagesSafely() in tasks.html.

alter table shared_projects add column if not exists data_version integer not null default 1;
alter table shared_projects add column if not exists messages_version integer not null default 1;
