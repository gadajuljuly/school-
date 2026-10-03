-- Run this once in the Supabase SQL Editor.
--
-- Adds shared_projects to Supabase's Realtime publication, so an UPDATE
-- (a task added/changed, a chat message sent, a purchase mark toggled...)
-- or INSERT (a new shared project landing in your account) is pushed to
-- every connected member's app immediately over a websocket, instead of
-- members only finding out the next time their app happens to poll the
-- server (previously every 20s for tasks, every 5s for an open chat).
--
-- RLS still applies: Realtime only ever delivers a row's change to a
-- client whose JWT satisfies that row's own SELECT policy (the same
-- membership/head-office-watcher policies already on this table), so this
-- does not expose anything a member/watcher couldn't already read.

alter publication supabase_realtime add table shared_projects;
