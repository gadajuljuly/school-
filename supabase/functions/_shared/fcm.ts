// Sends push notifications to native Android app installs via Firebase
// Cloud Messaging's HTTP v1 API - used instead of Web Push for any
// push_subscriptions row that has an fcm_token (the Capacitor app's Android
// WebView has no Web Push API support at all, so it registers an FCM token
// through the native @capacitor/push-notifications plugin instead).
//
// Required secrets (set with: supabase secrets set NAME=value):
//   FCM_PROJECT_ID    - the Firebase project id (same project used for phone auth)
//   FCM_CLIENT_EMAIL  - "client_email" from the downloaded service account JSON
//   FCM_PRIVATE_KEY   - "private_key" from that same JSON (keep the \n escapes
//                        as-is when pasting into the Supabase secret value)
//
// Get the service account JSON from: Firebase Console -> Project Settings ->
// Service accounts -> Generate new private key.

import { SignJWT, importPKCS8 } from "npm:jose@5";

const FCM_PROJECT_ID = Deno.env.get("FCM_PROJECT_ID") || "";
const FCM_CLIENT_EMAIL = Deno.env.get("FCM_CLIENT_EMAIL") || "";
const FCM_PRIVATE_KEY = (Deno.env.get("FCM_PRIVATE_KEY") || "").replace(/\\n/g, "\n");

let cachedToken: { token: string; expiresAt: number } | null = null;

async function getAccessToken(): Promise<string> {
  if (cachedToken && cachedToken.expiresAt > Date.now() + 60_000) {
    return cachedToken.token;
  }
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
    body: new URLSearchParams({
      grant_type: "urn:ietf:params:oauth:grant-type:jwt-bearer",
      assertion,
    }),
  });
  const json = await res.json();
  if (!res.ok) throw new Error("FCM token exchange failed: " + JSON.stringify(json));
  cachedToken = { token: json.access_token, expiresAt: Date.now() + json.expires_in * 1000 };
  return cachedToken.token;
}

export async function sendFcmMessage(
  fcmToken: string,
  title: string,
  body: string,
  data: Record<string, string>,
): Promise<{ ok: boolean; shouldRemove: boolean; error?: string }> {
  const accessToken = await getAccessToken();
  const res = await fetch(`https://fcm.googleapis.com/v1/projects/${FCM_PROJECT_ID}/messages:send`, {
    method: "POST",
    headers: { Authorization: `Bearer ${accessToken}`, "Content-Type": "application/json" },
    body: JSON.stringify({
      message: {
        token: fcmToken,
        notification: { title, body },
        data,
        android: { priority: "high" },
      },
    }),
  });
  if (res.ok) return { ok: true, shouldRemove: false };
  const errJson = await res.json().catch(() => ({}));
  const status = errJson?.error?.status;
  const shouldRemove = status === "NOT_FOUND" || status === "UNREGISTERED" || status === "INVALID_ARGUMENT";
  return { ok: false, shouldRemove, error: JSON.stringify(errJson) };
}
