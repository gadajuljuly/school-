-- Run this once in the Supabase SQL Editor, AFTER deploying the "send-reminders"
-- Edge Function with: supabase functions deploy send-reminders --no-verify-jwt
--
-- Replace YOUR-PROJECT-REF with your Supabase project reference (visible in your
-- project URL: https://YOUR-PROJECT-REF.supabase.co).

create extension if not exists pg_cron;
create extension if not exists pg_net;

select cron.schedule(
  'send-reminders-every-minute',
  '* * * * *',
  $$
  select net.http_post(
    url := 'https://YOUR-PROJECT-REF.supabase.co/functions/v1/send-reminders',
    headers := '{"Content-Type": "application/json"}'::jsonb,
    body := '{}'::jsonb
  );
  $$
);

-- To check it's running: select * from cron.job;
-- To stop it: select cron.unschedule('send-reminders-every-minute');
