-- Run this once in the Supabase SQL Editor, AFTER the mint-session-token
-- Edge Function is deployed and the app is updated to call it.
--
-- The app authenticates with Firebase phone auth, not Supabase Auth, so
-- until now every table here had RLS turned OFF entirely - anyone holding
-- the public anon key (visible in the app's own source) could read or
-- write any row directly, bypassing the app and login completely.
--
-- mint-session-token now mints a short separate JWT (signed with this
-- project's own JWT secret) whose `sub` claim is the same phoneToUuid(phone)
-- id the app already uses everywhere, and whose `phone_number` claim carries
-- the verified phone number. The app swaps this token in as its Supabase
-- client's Authorization header right after login, so auth.uid() and
-- auth.jwt() below now correctly reflect who is actually asking - the
-- policies just describe the same ownership rules the app's own code
-- already assumes.
--
-- Casts use ::text on both sides so this works whether a column is a
-- native uuid or a plain text column holding the same value.

-- app_state: one private row per user, keyed by their own id.
alter table app_state enable row level security;
drop policy if exists "users manage their own app_state" on app_state;
create policy "users manage their own app_state"
  on app_state for all
  using (auth.uid()::text = id::text)
  with check (auth.uid()::text = id::text);

-- shared_projects: any member listed by phone number in `members` may
-- read/write the project (matches how the app already checks membership
-- client-side - this just makes the database itself enforce the same rule).
alter table shared_projects enable row level security;
drop policy if exists "members manage their shared projects" on shared_projects;
create policy "members manage their shared projects"
  on shared_projects for all
  using ((auth.jwt() ->> 'phone_number') = any(members))
  with check ((auth.jwt() ->> 'phone_number') = any(members));

-- push_subscriptions: a user only ever needs their own subscription rows.
alter table push_subscriptions enable row level security;
drop policy if exists "users manage their own push subscriptions" on push_subscriptions;
create policy "users manage their own push subscriptions"
  on push_subscriptions for all
  using (auth.uid()::text = user_id::text)
  with check (auth.uid()::text = user_id::text);

-- app_state_backups: same private-row ownership as app_state itself.
alter table app_state_backups enable row level security;
drop policy if exists "users manage their own backups" on app_state_backups;
create policy "users manage their own backups"
  on app_state_backups for all
  using (auth.uid()::text = row_id::text)
  with check (auth.uid()::text = row_id::text);
