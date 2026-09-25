// Deploy with: supabase functions deploy send-project-invite-notification --no-verify-jwt
// Required secrets (same ones used by send-chat-notification / send-reminders):
//   VAPID_PUBLIC_KEY, VAPID_PRIVATE_KEY, VAPID_SUBJECT
// SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY are provided automatically by Supabase.
//
// Called directly by the client right after a project_invites row is
// inserted. Sends a real web push to the invited phone's device(s) so they
// get notified even if the app/browser isn't open, same as
// send-chat-notification does for chat messages.

import { createClient } from "npm:@supabase/supabase-js@2";
import webpush from "npm:web-push@3.6.7";

const SUPABASE_URL = Deno.env.get("SUPABASE_URL")!;
const SERVICE_ROLE_KEY = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;
const VAPID_PUBLIC_KEY = Deno.env.get("VAPID_PUBLIC_KEY")!;
const VAPID_PRIVATE_KEY = Deno.env.get("VAPID_PRIVATE_KEY")!;
const VAPID_SUBJECT = Deno.env.get("VAPID_SUBJECT") || "mailto:admin@example.com";

webpush.setVapidDetails(VAPID_SUBJECT, VAPID_PUBLIC_KEY, VAPID_PRIVATE_KEY);

const supabase = createClient(SUPABASE_URL, SERVICE_ROLE_KEY);

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

  let body: { targetPhone?: string; projectName?: string; senderName?: string; inviteId?: string };
  try {
    body = await req.json();
  } catch {
    return jsonResponse({ error: "invalid json body" }, 400);
  }

  const { targetPhone, projectName, senderName, inviteId } = body;
  if (!targetPhone || !projectName || !senderName || !inviteId) {
    return jsonResponse({ error: "missing targetPhone, projectName, senderName, or inviteId" }, 400);
  }

  const targetId = await phoneToUuid(targetPhone);

  const { data: subs, error: subsError } = await supabase
    .from("push_subscriptions")
    .select("*")
    .eq("user_id", targetId);

  if (subsError) {
    return jsonResponse({ error: subsError.message }, 500);
  }
  if (!subs || !subs.length) {
    return jsonResponse({ sent: 0, note: "no subscriptions for this phone" });
  }

  const payload = JSON.stringify({
    title: "הזמנה לפרויקט",
    body: 'קיבלת פרויקט "' + projectName + '" מ' + senderName,
    data: { projectInvite: true, inviteId },
  });

  let sent = 0;
  let removed = 0;

  for (const sub of subs) {
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

  return jsonResponse({ subscriptions: subs.length, sent, removed });
});
