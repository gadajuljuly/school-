-- Run once in the Supabase SQL Editor, before deploying whatsapp-webhook.
--
-- whatsapp_inbox: every message a user sends the ITASK bot on WhatsApp, with
-- the assistant's reply and the actions it decided on. The webhook
-- (supabase/functions/whatsapp-webhook, service role) writes the rows; the
-- user's own app reads its pending ones, applies the actions and marks them
-- applied (src/app/14k-whatsapp-inbox.js).
--
-- status: received -> pending (actions waiting for the app) -> applying ->
-- applied; or answered (a question, nothing to apply), ignored (not text, or
-- a voice message not understood / over a minute),
-- unknown_user (the number isn't an ITASK user), failed (the AI call failed).
-- day: the date in Israel when it was sent - diary lines go on that day's
-- diary even when the app is opened only the next morning.

create table if not exists whatsapp_inbox (
  id uuid primary key default gen_random_uuid(),
  wa_message_id text not null unique,
  phone text not null,
  text text not null default '',
  day date,
  reply text,
  actions jsonb not null default '[]'::jsonb,
  status text not null default 'received',
  created_at timestamptz not null default now(),
  applied_at timestamptz
);
create index if not exists whatsapp_inbox_phone_status on whatsapp_inbox (phone, status, created_at);

alter table whatsapp_inbox enable row level security;

-- a user sees only their own messages (the phone in their ITASK login token)
drop policy if exists "users read their own whatsapp messages" on whatsapp_inbox;
create policy "users read their own whatsapp messages"
  on whatsapp_inbox for select
  using ((auth.jwt() ->> 'phone_number') = phone);

-- ... and may only move their own pending ones along (claim, mark applied)
drop policy if exists "users mark their own whatsapp messages" on whatsapp_inbox;
create policy "users mark their own whatsapp messages"
  on whatsapp_inbox for update
  using ((auth.jwt() ->> 'phone_number') = phone)
  with check ((auth.jwt() ->> 'phone_number') = phone and status in ('applying', 'applied', 'pending'));

-- no insert / delete policy: only the webhook (service role) adds rows
