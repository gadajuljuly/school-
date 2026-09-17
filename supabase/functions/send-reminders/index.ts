// Deploy with: supabase functions deploy send-reminders
// Required secrets (set with: supabase secrets set NAME=value):
//   VAPID_PUBLIC_KEY, VAPID_PRIVATE_KEY, VAPID_SUBJECT (e.g. "mailto:you@example.com")
//   SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY are provided automatically by Supabase.
//
// Meant to be invoked on a schedule (e.g. every minute) via pg_cron + pg_net.
// See ../sql/pg_cron_schedule.sql.

import { createClient } from "npm:@supabase/supabase-js@2";
import webpush from "npm:web-push@3.6.7";

const SUPABASE_URL = Deno.env.get("SUPABASE_URL")!;
const SERVICE_ROLE_KEY = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;
const VAPID_PUBLIC_KEY = Deno.env.get("VAPID_PUBLIC_KEY")!;
const VAPID_PRIVATE_KEY = Deno.env.get("VAPID_PRIVATE_KEY")!;
const VAPID_SUBJECT = Deno.env.get("VAPID_SUBJECT") || "mailto:admin@example.com";

webpush.setVapidDetails(VAPID_SUBJECT, VAPID_PUBLIC_KEY, VAPID_PRIVATE_KEY);

const supabase = createClient(SUPABASE_URL, SERVICE_ROLE_KEY);

function pickIncompleteTask(appData: any): { taskText: string; sheetName: string } | null {
  if (!appData || !Array.isArray(appData.sheets)) return null;
  const candidates: { taskText: string; sheetName: string }[] = [];
  for (const sheet of appData.sheets) {
    if (sheet.ended) continue;
    for (const t of sheet.tasks || []) {
      if (t.type === "note") continue;
      if (t.status === 2) continue;
      candidates.push({ taskText: t.text, sheetName: sheet.name });
    }
  }
  if (!candidates.length) return null;
  return candidates[Math.floor(Math.random() * candidates.length)];
}

Deno.serve(async () => {
  const now = new Date();

  const { data: subs, error } = await supabase
    .from("push_subscriptions")
    .select("*")
    .not("frequency_minutes", "is", null)
    .gt("frequency_minutes", 0);

  if (error) {
    return new Response(JSON.stringify({ error: error.message }), { status: 500 });
  }

  const due = (subs || []).filter((s) => {
    if (!s.last_sent_at) return true;
    const elapsedMinutes = (now.getTime() - new Date(s.last_sent_at).getTime()) / 60000;
    return elapsedMinutes >= s.frequency_minutes;
  });

  let sent = 0;
  let removed = 0;

  for (const sub of due) {
    const { data: appRow } = await supabase
      .from("app_state")
      .select("data")
      .eq("id", sub.user_id)
      .maybeSingle();

    const pick = pickIncompleteTask(appRow?.data);
    if (!pick) {
      await supabase.from("push_subscriptions").update({ last_sent_at: now.toISOString() }).eq("id", sub.id);
      continue;
    }

    const payload = JSON.stringify({
      title: pick.sheetName,
      body: pick.taskText,
    });

    try {
      await webpush.sendNotification(
        {
          endpoint: sub.endpoint,
          keys: { p256dh: sub.p256dh, auth: sub.auth },
        },
        payload,
      );
      sent++;
      await supabase.from("push_subscriptions").update({ last_sent_at: now.toISOString() }).eq("id", sub.id);
    } catch (err: any) {
      const status = err?.statusCode || err?.status;
      if (status === 404 || status === 410) {
        await supabase.from("push_subscriptions").delete().eq("id", sub.id);
        removed++;
      } else {
        await supabase.from("push_subscriptions").update({ last_sent_at: now.toISOString() }).eq("id", sub.id);
      }
    }
  }

  return new Response(JSON.stringify({ checked: subs?.length || 0, due: due.length, sent, removed }), {
    headers: { "Content-Type": "application/json" },
  });
});
