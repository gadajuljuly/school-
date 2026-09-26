// Deploy with: supabase functions deploy send-chat-notification --no-verify-jwt
// Required secrets (same ones used by send-reminders):
//   VAPID_PUBLIC_KEY, VAPID_PRIVATE_KEY, VAPID_SUBJECT
//   FCM_PROJECT_ID, FCM_CLIENT_EMAIL, FCM_PRIVATE_KEY (from the Firebase service
//     account JSON - see android-app/README.md's "Push notifications" section)
// SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY are provided automatically by Supabase.
//
// Called directly by the client (from the browser) right after a chat
// message is sent - unlike send-reminders, which pg_cron calls server-side
// and never needs CORS. Sends a real web push to every other member of the
// project so they get a notification even if the app/browser isn't open.

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

// Being called directly from the browser (unlike send-reminders, which only
// pg_cron ever calls) means every response - including errors - needs CORS
// headers, and the browser's OPTIONS preflight must be answered explicitly,
// or the browser reports a generic network failure with no real detail.
const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
};

function jsonResponse(body: unknown, status = 200) {
  return new Response(JSON.stringify(body), {
    status,
    headers: { ...corsHeaders, "Content-Type": "application/json" },
  });
}

// Same derivation as phoneToUuid() in tasks.html - must stay in sync.
async function phoneToUuid(phone: string): Promise<string> {
  const digest = await crypto.subtle.digest("SHA-256", new TextEncoder().encode("itask-phone:" + phone));
  const bytes = Array.from(new Uint8Array(digest)).slice(0, 16);
  const hex = bytes.map((b) => b.toString(16).padStart(2, "0")).join("");
  return hex.slice(0, 8) + "-" + hex.slice(8, 12) + "-4" + hex.slice(13, 16) + "-a" + hex.slice(17, 20) + "-" + hex.slice(20, 32);
}

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response("ok", { headers: corsHeaders });
  }

  let body: { sheetId?: string; senderPhone?: string; senderName?: string; text?: string };
  try {
    body = await req.json();
  } catch {
    return jsonResponse({ error: "invalid json body" }, 400);
  }

  const { sheetId, senderPhone, senderName, text } = body;
  if (!sheetId || !senderPhone || !text) {
    return jsonResponse({ error: "missing sheetId, senderPhone, or text" }, 400);
  }

  const { data: sheet, error: sheetError } = await supabase
    .from("shared_projects")
    .select("name, members")
    .eq("id", sheetId)
    .maybeSingle();

  if (sheetError || !sheet) {
    return jsonResponse({ error: sheetError?.message || "project not found" }, 404);
  }

  const recipients: string[] = (sheet.members || []).filter((p: string) => p !== senderPhone);
  if (!recipients.length) {
    return jsonResponse({ sent: 0, note: "no other members" });
  }

  const recipientIds = await Promise.all(recipients.map(phoneToUuid));

  const { data: subs, error: subsError } = await supabase
    .from("push_subscriptions")
    .select("*")
    .in("user_id", recipientIds)
    .eq("chat_enabled", true);

  if (subsError) {
    return jsonResponse({ error: subsError.message }, 500);
  }

  const title = sheet.name;
  const body = (senderName || senderPhone) + ": " + text;
  const data = { sheetId, chat: "true" };

  let sent = 0;
  let removed = 0;

  for (const sub of subs || []) {
    try {
      if (sub.fcm_token) {
        const result = await sendFcmMessage(sub.fcm_token, title, body, data);
        if (!result.ok) throw Object.assign(new Error(result.error), { shouldRemove: result.shouldRemove });
      } else {
        await webpush.sendNotification(
          { endpoint: sub.endpoint, keys: { p256dh: sub.p256dh, auth: sub.auth } },
          JSON.stringify({ title, body, data: { sheetId, chat: true } }),
        );
      }
      sent++;
    } catch (err: any) {
      const status = err?.statusCode || err?.status;
      if (err?.shouldRemove || status === 404 || status === 410) {
        await supabase.from("push_subscriptions").delete().eq("id", sub.id);
        removed++;
      }
    }
  }

  return jsonResponse({ recipients: recipients.length, subscriptions: (subs || []).length, sent, removed });
});
