-- Run this once in the Supabase SQL Editor.
-- Lets a push_subscriptions row represent EITHER a Web Push subscription
-- (endpoint/p256dh/auth, used by browsers and the TWA build) OR a native
-- FCM token (fcm_token, used by the Capacitor app - its Android WebView
-- has no Web Push API support at all). Exactly one of the two channels is
-- ever set on a given row.

alter table push_subscriptions alter column endpoint drop not null;
alter table push_subscriptions alter column p256dh drop not null;
alter table push_subscriptions alter column auth drop not null;

alter table push_subscriptions add column if not exists fcm_token text unique;

alter table push_subscriptions add constraint push_subscriptions_has_a_channel
  check (endpoint is not null or fcm_token is not null);
