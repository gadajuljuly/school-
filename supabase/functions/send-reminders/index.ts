// Deploy with: supabase functions deploy send-reminders
// Required secrets (set with: supabase secrets set NAME=value):
//   VAPID_PUBLIC_KEY, VAPID_PRIVATE_KEY, VAPID_SUBJECT (e.g. "mailto:you@example.com")
//   FCM_PROJECT_ID, FCM_CLIENT_EMAIL, FCM_PRIVATE_KEY (from the Firebase service
//     account JSON - see android-app/README.md's "Push notifications" section)
//   SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY are provided automatically by Supabase.
//
// Meant to be invoked on a schedule (e.g. every minute) via pg_cron + pg_net.
// See ../sql/pg_cron_schedule.sql.

import { createClient } from "npm:@supabase/supabase-js@2";
import webpush from "npm:web-push@3.6.7";
import { SignJWT, importPKCS8 } from "npm:jose@5";

const SUPABASE_URL = Deno.env.get("SUPABASE_URL")!;
const SERVICE_ROLE_KEY = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;
const VAPID_PUBLIC_KEY = Deno.env.get("VAPID_PUBLIC_KEY")!;
const VAPID_PRIVATE_KEY = Deno.env.get("VAPID_PRIVATE_KEY")!;
const VAPID_SUBJECT = Deno.env.get("VAPID_SUBJECT") || "mailto:admin@example.com";
const FCM_PROJECT_ID = Deno.env.get("FCM_PROJECT_ID") || "";
const FCM_CLIENT_EMAIL = Deno.env.get("FCM_CLIENT_EMAIL") || "";
const FCM_PRIVATE_KEY = (Deno.env.get("FCM_PRIVATE_KEY") || "").replace(/\\n/g, "\n");

webpush.setVapidDetails(VAPID_SUBJECT, VAPID_PUBLIC_KEY, VAPID_PRIVATE_KEY);

const supabase = createClient(SUPABASE_URL, SERVICE_ROLE_KEY);

// Sends to a native app install via Firebase Cloud Messaging's HTTP v1 API -
// used instead of Web Push for any row with an fcm_token, since the
// Capacitor app's Android WebView has no Web Push API support at all.
let cachedFcmToken: { token: string; expiresAt: number } | null = null;

async function getFcmAccessToken(): Promise<string> {
  if (cachedFcmToken && cachedFcmToken.expiresAt > Date.now() + 60_000) return cachedFcmToken.token;
  const key = await importPKCS8(FCM_PRIVATE_KEY, "RS256");
  const now = Math.floor(Date.now() / 1000);
  const assertion = await new SignJWT({ scope: "https://www.googleapis.com/auth/firebase.messaging" })
    .setProtectedHeader({ alg: "RS256" })
    .setIssuer(FCM_CLIENT_EMAIL)
    .setSubject(FCM_CLIENT_EMAIL)
    .setAudience("https://oauth2.googleapis.com/token")
    .setIssuedAt(now)
    .setExpirationTime(now + 3600)
    .sign(key);
  const res = await fetch("https://oauth2.googleapis.com/token", {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: new URLSearchParams({ grant_type: "urn:ietf:params:oauth:grant-type:jwt-bearer", assertion }),
  });
  const json = await res.json();
  if (!res.ok) throw new Error("FCM token exchange failed: " + JSON.stringify(json));
  cachedFcmToken = { token: json.access_token, expiresAt: Date.now() + json.expires_in * 1000 };
  return cachedFcmToken.token;
}

async function sendFcmMessage(
  fcmToken: string,
  title: string,
  body: string,
  data: Record<string, string>,
): Promise<{ ok: boolean; shouldRemove: boolean; error?: string }> {
  const accessToken = await getFcmAccessToken();
  const res = await fetch(`https://fcm.googleapis.com/v1/projects/${FCM_PROJECT_ID}/messages:send`, {
    method: "POST",
    headers: { Authorization: `Bearer ${accessToken}`, "Content-Type": "application/json" },
    body: JSON.stringify({ message: { token: fcmToken, notification: { title, body }, data, android: { priority: "high" } } }),
  });
  if (res.ok) return { ok: true, shouldRemove: false };
  const errJson = await res.json().catch(() => ({}));
  const status = errJson?.error?.status;
  const shouldRemove = status === "NOT_FOUND" || status === "UNREGISTERED" || status === "INVALID_ARGUMENT";
  return { ok: false, shouldRemove, error: JSON.stringify(errJson) };
}

function pickIncompleteTask(
  appData: any,
): { taskText: string; sheetName: string; taskId: string; sheetId: string; date: string } | null {
  if (!appData || !Array.isArray(appData.sheets)) return null;
  const candidates: { taskText: string; sheetName: string; taskId: string; sheetId: string; date: string }[] = [];
  for (const sheet of appData.sheets) {
    if (sheet.ended) continue;
    for (const t of sheet.tasks || []) {
      if (t.type === "note") continue;
      if (t.status === 2) continue;
      candidates.push({ taskText: t.text, sheetName: sheet.name, taskId: t.id, sheetId: sheet.id, date: t.date });
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

    const title = pick.sheetName;
    const body = pick.taskText;
    const data = { taskId: pick.taskId, sheetId: pick.sheetId, date: pick.date };

    try {
      if (sub.fcm_token) {
        const result = await sendFcmMessage(sub.fcm_token, title, body, data);
        if (!result.ok) throw Object.assign(new Error(result.error), { shouldRemove: result.shouldRemove });
      } else {
        await webpush.sendNotification(
          { endpoint: sub.endpoint, keys: { p256dh: sub.p256dh, auth: sub.auth } },
          JSON.stringify({ title, body, data }),
        );
      }
      sent++;
      await supabase.from("push_subscriptions").update({ last_sent_at: now.toISOString() }).eq("id", sub.id);
    } catch (err: any) {
      const status = err?.statusCode || err?.status;
      const shouldRemove = err?.shouldRemove || status === 404 || status === 410;
      if (shouldRemove) {
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
