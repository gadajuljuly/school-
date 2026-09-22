-- Run this once in the Supabase SQL Editor.
-- Adds a separate opt-in for chat push notifications, independent of the
-- task-reminder frequency already stored on this table.

alter table push_subscriptions add column if not exists chat_enabled boolean not null default false;
