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

// Per-task reminders (set via the task's long-press "התראה" button) store an
// HH:MM clock time with no timezone of its own - it means that time in the
// app's own (Israel) wall-clock, not the edge function's host timezone
// (Supabase runs these in UTC), so comparing against the server's own local
// hours/minutes would fire hours off. Format "now" through this timezone
// explicitly instead.
const APP_TIME_ZONE = "Asia/Jerusalem";
function nowHHMMInAppTimeZone(now: Date): string {
  const parts = new Intl.DateTimeFormat("en-GB", {
    timeZone: APP_TIME_ZONE,
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  }).formatToParts(now);
  const h = parts.find((p) => p.type === "hour")?.value ?? "00";
  const m = parts.find((p) => p.type === "minute")?.value ?? "00";
  return `${h}:${m}`;
}

type DueTaskReminder = { taskText: string; sheetName: string; taskId: string; sheetId: string; date: string; task: any };

// Scans every task across every (non-ended) sheet for a per-task reminder
// (set via the "התראה" long-press button) that's due right now - an
// "interval" one (every 30/60 minutes) due since its own last send, or a
// one-shot "time" alarm whose clock time matches this exact minute and
// hasn't already fired. Mutates the matched tasks' reminder bookkeeping
// in place (lastSentAt/firedAt) so the caller just needs to persist
// appData back once after sending, same as any other in-place task edit.
function findDueTaskReminders(appData: any, now: Date, nowHHMM: string): DueTaskReminder[] {
  if (!appData || !Array.isArray(appData.sheets)) return [];
  const due: DueTaskReminder[] = [];
  for (const sheet of appData.sheets) {
    if (sheet.ended) continue;
    for (const t of sheet.tasks || []) {
      const r = t.reminder;
      if (!r || t.status === 2) continue;
      if (r.type === "interval") {
        const elapsedMinutes = r.lastSentAt ? (now.getTime() - new Date(r.lastSentAt).getTime()) / 60000 : Infinity;
        if (elapsedMinutes < r.minutes) continue;
        r.lastSentAt = now.toISOString();
      } else if (r.type === "time") {
        if (r.firedAt || r.time !== nowHHMM) continue;
        r.firedAt = now.toISOString();
      } else {
        continue;
      }
      due.push({ taskText: t.text, sheetName: sheet.name, taskId: t.id, sheetId: sheet.id, date: t.date, task: t });
    }
  }
  return due;
}

// Single send path shared by the random-incomplete-task reminder and
// per-task reminders below - both just need "did it go out, and if not,
// is this token/endpoint dead" out of either the FCM or Web Push branch.
async function sendPush(
  sub: any,
  title: string,
  body: string,
  data: Record<string, string>,
): Promise<{ ok: boolean; shouldRemove: boolean }> {
  try {
    if (sub.fcm_token) {
      const result = await sendFcmMessage(sub.fcm_token, title, body, data);
      return { ok: result.ok, shouldRemove: result.shouldRemove };
    }
    await webpush.sendNotification(
      { endpoint: sub.endpoint, keys: { p256dh: sub.p256dh, auth: sub.auth } },
      JSON.stringify({ title, body, data }),
    );
    return { ok: true, shouldRemove: false };
  } catch (err: any) {
    const status = err?.statusCode || err?.status;
    const shouldRemove = err?.shouldRemove || status === 404 || status === 410;
    return { ok: false, shouldRemove };
  }
}

Deno.serve(async () => {
  const now = new Date();
  const nowHHMM = nowHHMMInAppTimeZone(now);

  // Every row, not just ones with a general frequency set - a per-task
  // reminder (the task's own "התראה" long-press option) has to be checked
  // for every device regardless of whether that device also has the
  // general "תזכורות משימות" menu setting turned on; it's a separate,
  // independent feature that happens to share the same push plumbing.
  const { data: subs, error } = await supabase.from("push_subscriptions").select("*");

  if (error) {
    return new Response(JSON.stringify({ error: error.message }), { status: 500 });
  }

  let sent = 0;
  let removed = 0;
  let taskRemindersSent = 0;

  for (const sub of subs || []) {
    const globalDue = !!sub.frequency_minutes && sub.frequency_minutes > 0 &&
      (!sub.last_sent_at || (now.getTime() - new Date(sub.last_sent_at).getTime()) / 60000 >= sub.frequency_minutes);

    const { data: appRow } = await supabase
      .from("app_state")
      .select("data")
      .eq("id", sub.user_id)
      .maybeSingle();
    const appData = appRow?.data;

    if (globalDue) {
      const pick = pickIncompleteTask(appData);
      if (!pick) {
        await supabase.from("push_subscriptions").update({ last_sent_at: now.toISOString() }).eq("id", sub.id);
      } else {
        const result = await sendPush(sub, pick.sheetName, pick.taskText, {
          taskId: pick.taskId,
          sheetId: pick.sheetId,
          date: pick.date,
        });
        if (result.shouldRemove) {
          await supabase.from("push_subscriptions").delete().eq("id", sub.id);
          removed++;
          continue; // this subscription is gone - nothing left here to send task reminders to either
        }
        if (result.ok) sent++;
        await supabase.from("push_subscriptions").update({ last_sent_at: now.toISOString() }).eq("id", sub.id);
      }
    }

    // findDueTaskReminders mutates the matched tasks' reminder bookkeeping
    // (lastSentAt/firedAt) in place on appData - persisted once below,
    // the same shape as any other in-place task edit this app makes.
    const dueTaskReminders = findDueTaskReminders(appData, now, nowHHMM);
    if (dueTaskReminders.length) {
      for (const dr of dueTaskReminders) {
        const result = await sendPush(sub, dr.sheetName, dr.taskText, {
          taskId: dr.taskId,
          sheetId: dr.sheetId,
          date: dr.date,
        });
        if (result.ok) taskRemindersSent++;
      }
      await supabase.from("app_state").update({ data: appData }).eq("id", sub.user_id);
    }
  }

  return new Response(JSON.stringify({ checked: subs?.length || 0, sent, removed, taskRemindersSent }), {
    headers: { "Content-Type": "application/json" },
  });
});
