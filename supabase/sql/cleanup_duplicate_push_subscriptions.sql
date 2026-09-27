-- Run this once in the Supabase SQL Editor.
-- One-time cleanup for accounts that have both a native app (fcm_token)
-- subscription AND leftover Web Push subscriptions (endpoint) from having
-- opened the site directly in a phone browser (Chrome/Samsung Internet)
-- before or alongside installing the native app - these were causing the
-- same chat message to arrive as several duplicate notifications, each
-- showing that browser's icon instead of the app's. The app's own code
-- now prevents this going forward (see upsertPushSubscriptionRow in
-- tasks.html), but that only runs the next time each affected account's
-- native app does a full cold restart - this cleans up right now instead.

-- 1. For any account that has a native (fcm_token) row, delete its Web
--    Push (endpoint) rows - the native app is the single channel now.
delete from push_subscriptions p
where p.endpoint is not null
  and exists (
    select 1 from push_subscriptions n
    where n.user_id = p.user_id and n.fcm_token is not null
  );

-- 2. Also collapse any leftover duplicate native rows for the same
--    account down to the most recent one (belt-and-suspenders, in case
--    any survived from before the app-side fix).
delete from push_subscriptions p
where p.fcm_token is not null
  and exists (
    select 1 from push_subscriptions n
    where n.user_id = p.user_id
      and n.fcm_token is not null
      and n.id <> p.id
      and n.created_at > p.created_at
  );
