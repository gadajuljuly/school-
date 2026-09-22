// Deploy with: supabase functions deploy send-chat-notification --no-verify-jwt
// Required secrets (same ones used by send-reminders):
//   VAPID_PUBLIC_KEY, VAPID_PRIVATE_KEY, VAPID_SUBJECT
// SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY are provided automatically by Supabase.
//
// Called directly by the client (from the browser) right after a chat
// message is sent - unlike send-reminders, which pg_cron calls server-side
// and never needs CORS. Sends a real web push to every other member of the
// project so they get a notification even if the app/browser isn't open.

import { createClient } from "npm:@supabase/supabase-js@2";
import webpush from "npm:web-push@3.6.7";

const SUPABASE_URL = Deno.env.get("SUPABASE_URL")!;
const SERVICE_ROLE_KEY = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;
const VAPID_PUBLIC_KEY = Deno.env.get("VAPID_PUBLIC_KEY")!;
const VAPID_PRIVATE_KEY = Deno.env.get("VAPID_PRIVATE_KEY")!;
const VAPID_SUBJECT = Deno.env.get("VAPID_SUBJECT") || "mailto:admin@example.com";

webpush.setVapidDetails(VAPID_SUBJECT, VAPID_PUBLIC_KEY, VAPID_PRIVATE_KEY);

const supabase = createClient(SUPABASE_URL, SERVICE_ROLE_KEY);

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

  return jsonResponse({ recipients: recipients.length, subscriptions: (subs || []).length, sent, removed });
});
