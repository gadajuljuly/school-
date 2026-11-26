-- Run once in the Supabase SQL Editor (safe to re-run).
-- An office group's name: typed when the group is created ("הקמת קבוצת
-- משרד"), editable by its creator in "ניהול קבוצת המשרד" (the existing
-- "creator manages their own office groups" policy covers the update).
-- Each invite carries a copy (group_name), so the invited phone - who may
-- not read office_groups before approving - sees which group it is.
alter table office_groups add column if not exists name text;
alter table office_group_invites add column if not exists group_name text;
