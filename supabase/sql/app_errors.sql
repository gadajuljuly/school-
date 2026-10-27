-- Run this once in the Supabase SQL Editor.
--
-- Error reports from the app (src/app/00b-error-reports.js): an uncaught
-- error, a promise nobody caught, or a failure the app logs itself, with
-- who (phone), which build, which screen, native app or browser. The app
-- may only ADD rows - nobody can read them through the app's key; look at
-- them in the Table Editor (app_errors), newest first.

create table if not exists app_errors (
  id bigserial primary key,
  created_at timestamptz not null default now(),
  kind text,
  message text not null check (char_length(message) <= 1000),
  stack text check (char_length(stack) <= 4000),
  source text,
  line int,
  col int,
  build text,
  view text,
  phone text,
  native boolean,
  lang text,
  ua text
);

alter table app_errors enable row level security;

drop policy if exists "the app adds error reports" on app_errors;
create policy "the app adds error reports" on app_errors
  for insert to anon, authenticated
  with check (true);

create index if not exists app_errors_created_at on app_errors (created_at desc);

-- Keep a month of them (with pg_cron, see pg_cron_schedule.sql):
-- select cron.schedule('app-errors-cleanup', '30 3 * * *',
--   $$delete from app_errors where created_at < now() - interval '30 days'$$);
