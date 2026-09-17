-- Run this once in the Supabase SQL Editor.

create table if not exists push_subscriptions (
  id uuid primary key default gen_random_uuid(),
  user_id text not null,
  endpoint text not null unique,
  p256dh text not null,
  auth text not null,
  frequency_minutes integer,
  last_sent_at timestamptz,
  created_at timestamptz not null default now()
);

alter table push_subscriptions enable row level security;

create policy "users manage their own push subscriptions"
  on push_subscriptions for all
  using (auth.uid()::text = user_id)
  with check (auth.uid()::text = user_id);
