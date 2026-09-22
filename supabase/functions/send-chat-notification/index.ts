// Deploy with: supabase functions deploy send-chat-notification --no-verify-jwt
// Required secrets (same ones used by send-reminders):
//   VAPID_PUBLIC_KEY, VAPID_PRIVATE_KEY, VAPID_SUBJECT
// SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY are provided automatically by Supabase.
//
// Called directly by the client right after a chat message is sent (no cron
// needed here - it's triggered per-message, not on a schedule). Sends a real
// web push to every other member of the project so they get a notification
// even if the app/browser isn't open, like a normal messaging app.

import { createClient } from "npm:@supabase/supabase-js@2";
import webpush from "npm:web-push@3.6.7";

const SUPABASE_URL = Deno.env.get("SUPABASE_URL")!;
const SERVICE_ROLE_KEY = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;
const VAPID_PUBLIC_KEY = Deno.env.get("VAPID_PUBLIC_KEY")!;
const VAPID_PRIVATE_KEY = Deno.env.get("VAPID_PRIVATE_KEY")!;
const VAPID_SUBJECT = Deno.env.get("VAPID_SUBJECT") || "mailto:admin@example.com";

webpush.setVapidDetails(VAPID_SUBJECT, VAPID_PUBLIC_KEY, VAPID_PRIVATE_KEY);

const supabase = createClient(SUPABASE_URL, SERVICE_ROLE_KEY);

// Same derivation as phoneToUuid() in tasks.html - must stay in sync.
async function phoneToUuid(phone: string): Promise<string> {
  const digest = await crypto.subtle.digest("SHA-256", new TextEncoder().encode("itask-phone:" + phone));
  const bytes = Array.from(new Uint8Array(digest)).slice(0, 16);
  const hex = bytes.map((b) => b.toString(16).padStart(2, "0")).join("");
  return hex.slice(0, 8) + "-" + hex.slice(8, 12) + "-4" + hex.slice(13, 16) + "-a" + hex.slice(17, 20) + "-" + hex.slice(20, 32);
}

Deno.serve(async (req) => {
  let body: { sheetId?: string; senderPhone?: string; senderName?: string; text?: string };
  try {
    body = await req.json();
  } catch {
    return new Response(JSON.stringify({ error: "invalid json body" }), { status: 400 });
  }

  const { sheetId, senderPhone, senderName, text } = body;
  if (!sheetId || !senderPhone || !text) {
    return new Response(JSON.stringify({ error: "missing sheetId, senderPhone, or text" }), { status: 400 });
  }

  const { data: sheet, error: sheetError } = await supabase
    .from("shared_projects")
    .select("name, members")
    .eq("id", sheetId)
    .maybeSingle();

  if (sheetError || !sheet) {
    return new Response(JSON.stringify({ error: sheetError?.message || "project not found" }), { status: 404 });
  }

  const recipients: string[] = (sheet.members || []).filter((p: string) => p !== senderPhone);
  if (!recipients.length) {
    return new Response(JSON.stringify({ sent: 0, note: "no other members" }), { headers: { "Content-Type": "application/json" } });
  }

  const recipientIds = await Promise.all(recipients.map(phoneToUuid));

  const { data: subs, error: subsError } = await supabase
    .from("push_subscriptions")
    .select("*")
    .in("user_id", recipientIds)
    .eq("chat_enabled", true);

  if (subsError) {
    return new Response(JSON.stringify({ error: subsError.message }), { status: 500 });
  }

  const payload = JSON.stringify({
    title: sheet.name,
    body: (senderName || senderPhone) + ": " + text,
    data: { sheetId, chat: true },
  });

  let sent = 0;
  let removed = 0;

  for (const sub of subs || []) {
    try {
      await webpush.sendNotification(
        { endpoint: sub.endpoint, keys: { p256dh: sub.p256dh, auth: sub.auth } },
        payload,
      );
      sent++;
    } catch (err: any) {
      const status = err?.statusCode || err?.status;
      if (status === 404 || status === 410) {
        await supabase.from("push_subscriptions").delete().eq("id", sub.id);
        removed++;
      }
    }
  }

  return new Response(JSON.stringify({ recipients: recipients.length, subscriptions: (subs || []).length, sent, removed }), {
    headers: { "Content-Type": "application/json" },
  });
});
