// Deploy with: supabase functions deploy whatsapp-webhook --no-verify-jwt
// (Meta calls it - no ITASK login; every call is checked by Meta's signature.)
//
// Secrets (set with `supabase secrets set NAME=...`; never commit them):
//   WHATSAPP_VERIFY_TOKEN     - any long random text; the same one is typed
//                               into Meta's webhook settings ("Verify token")
//   WHATSAPP_APP_SECRET       - the Meta app's "App secret" (App settings -> Basic)
//   WHATSAPP_TOKEN            - a permanent access token of a system user
//   WHATSAPP_PHONE_NUMBER_ID  - the bot number's "Phone number ID"
//   ANTHROPIC_API_KEY         - already set for itask-assistant
//   GOOGLE_SPEECH_API_KEY     - a Google Cloud API key with the Speech-to-Text
//                               API enabled (voice messages; without it the bot
//                               asks for text)
// SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY are provided by Supabase.
//
// The ITASK assistant on WhatsApp: a registered user writes to the bot what
// happened on site; the same brain as the in-app chat (../_shared/assistant.ts)
// turns it into actions, and the bot answers at once. A voice message is first
// turned into words by Google Speech-to-Text (Hebrew, Arabic, English, Russian),
// and the answer starts with what was heard. The actions wait in
// whatsapp_inbox (supabase/sql/whatsapp_inbox.sql) and are applied by the app
// itself the next time it's opened (src/app/14k-whatsapp-inbox.js) - through
// the same code as the in-app chat, with ↶ undo there.

import Anthropic from "npm:@anthropic-ai/sdk@1.5.0";
import { createClient } from "npm:@supabase/supabase-js@2";
import { askAssistant } from "../_shared/assistant.ts";
import { buildContext, bytesToBase64, extractMessages, heardPrefix, israelNow, phoneFromWa, phoneToUuid, speechRequest, transcriptFrom, verifySignature, whatsappReplyText, type WaMessage } from "../_shared/whatsapp-core.ts";

const VERIFY_TOKEN = Deno.env.get("WHATSAPP_VERIFY_TOKEN") || "";
const APP_SECRET = Deno.env.get("WHATSAPP_APP_SECRET") || "";
const WA_TOKEN = Deno.env.get("WHATSAPP_TOKEN") || "";
const PHONE_NUMBER_ID = Deno.env.get("WHATSAPP_PHONE_NUMBER_ID") || "";
const SPEECH_KEY = Deno.env.get("GOOGLE_SPEECH_API_KEY") || "";
const MAX_AUDIO_BYTES = 9 * 1024 * 1024; // the speech service's quick path: up to ~1 minute
const GRAPH = "https://graph.facebook.com/v21.0";

const supabase = createClient(Deno.env.get("SUPABASE_URL")!, Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!);
const anthropic = new Anthropic();

const NOT_REGISTERED = "שלום! המספר הזה לא רשום ב-ITASK. כדי להשתמש בעוזר, היכנסו לאפליקציה עם מספר הטלפון הזה: https://itask-app.com";
const TEXT_ONLY = "אני מבין הודעות כתובות והקלטות קוליות. אפשר לכתוב או להקליט לי מה קרה באתר, ואני ארשום ביומן, במשימות ובתוכנית.";
const NOT_HEARD = "לא הצלחתי להבין את ההקלטה. אפשר להקליט שוב, קרוב לטלפון ובשקט יחסי, או לכתוב.";
const TOO_LONG = "ההקלטה ארוכה מדי - אני מבין הקלטות של עד דקה. אפשר לחלק לכמה הקלטות קצרות.";
const AI_FAILED = "מצטער, לא הצלחתי לעבד את ההודעה כרגע. נסו שוב בעוד דקה.";

async function sendWhatsApp(to: string, text: string) {
  if (!WA_TOKEN || !PHONE_NUMBER_ID) return;
  await fetch(`${GRAPH}/${PHONE_NUMBER_ID}/messages`, {
    method: "POST",
    headers: { Authorization: `Bearer ${WA_TOKEN}`, "Content-Type": "application/json" },
    body: JSON.stringify({ messaging_product: "whatsapp", to, type: "text", text: { body: text.slice(0, 4000) } }),
  }).catch(() => {});
}

// the last few turns with this user, for "and also the roller" follow-ups
async function recentTurns(phone: string, exceptId: string) {
  const { data } = await supabase.from("whatsapp_inbox").select("text, reply, wa_message_id")
    .eq("phone", phone).neq("wa_message_id", exceptId).not("reply", "is", null)
    .order("created_at", { ascending: false }).limit(3);
  const turns: { role: string; text: string }[] = [];
  for (const r of (data || []).reverse()) {
    turns.push({ role: "user", text: String(r.text || "") });
    turns.push({ role: "assistant", text: String(r.reply || "") });
  }
  return turns;
}

// a voice message -> its words ("" if not understood); "too long" past ~1 min
async function transcribe(mediaId: string): Promise<string> {
  if (!SPEECH_KEY || !WA_TOKEN || !mediaId) return "";
  const meta = await fetch(`${GRAPH}/${mediaId}`, { headers: { Authorization: `Bearer ${WA_TOKEN}` } }).then((r) => r.ok ? r.json() : null);
  if (!meta || !meta.url) return "";
  if (Number(meta.file_size || 0) > MAX_AUDIO_BYTES) return "too long";
  const audio = await fetch(meta.url, { headers: { Authorization: `Bearer ${WA_TOKEN}` } });
  if (!audio.ok) return "";
  const bytes = new Uint8Array(await audio.arrayBuffer());
  if (bytes.length > MAX_AUDIO_BYTES) return "too long";
  const res = await fetch(`https://speech.googleapis.com/v1p1beta1/speech:recognize?key=${encodeURIComponent(SPEECH_KEY)}`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(speechRequest(bytesToBase64(bytes))),
  });
  const out = res.ok ? await res.json() : null;
  // the quick path refuses audio over a minute
  if (!res.ok) return /exceeds?.*(duration|1 minute)|too long/i.test(await res.text().catch(() => "")) ? "too long" : "";
  return transcriptFrom(out);
}

async function handle(m: WaMessage) {
  const phone = phoneFromWa(m.from);
  // once per message: Meta may deliver the same one again
  const day = israelNow(Date.now()).today;
  const { data: inserted } = await supabase.from("whatsapp_inbox")
    .upsert({ wa_message_id: m.id, phone, text: m.text, day, status: "received" }, { onConflict: "wa_message_id", ignoreDuplicates: true })
    .select("id");
  if (!inserted || !inserted.length) return;
  const rowId = inserted[0].id;
  const finish = (fields: Record<string, unknown>) => supabase.from("whatsapp_inbox").update(fields).eq("id", rowId);

  // only registered ITASK users: their private row is keyed by their phone
  // (checked first: no transcribing for strangers)
  const { data: own } = await supabase.from("app_state").select("data").eq("id", await phoneToUuid(phone)).maybeSingle();
  if (!own) {
    await finish({ status: "unknown_user", reply: NOT_REGISTERED });
    await sendWhatsApp(m.from, NOT_REGISTERED);
    return;
  }

  // a voice message: its words become the message
  let text = m.text;
  let heard = "";
  if (m.type === "audio") {
    const words = await transcribe(m.mediaId).catch(() => "");
    if (words === "too long" || !words) {
      const say = words === "too long" ? TOO_LONG : NOT_HEARD;
      await finish({ status: "ignored", reply: say });
      await sendWhatsApp(m.from, say);
      return;
    }
    text = words;
    heard = heardPrefix(words);
    await finish({ text: "🎤 " + words });
  }
  if (!text.trim()) {
    await finish({ status: "ignored", reply: TEXT_ONLY });
    await sendWhatsApp(m.from, TEXT_ONLY);
    return;
  }

  const { data: shared } = await supabase.from("shared_projects").select("id, name, data").contains("members", [phone]);
  const context = buildContext(own.data, shared || [], Date.now());

  try {
    const out = await askAssistant(anthropic, { text, context, history: await recentTurns(phone, m.id) });
    const actions = out.refused ? [] : out.actions;
    const reply = whatsappReplyText(out.reply, actions.length);
    await finish({ status: actions.length ? "pending" : "answered", reply, actions });
    await sendWhatsApp(m.from, heard + reply);
  } catch (_err) {
    await finish({ status: "failed", reply: AI_FAILED });
    await sendWhatsApp(m.from, AI_FAILED);
  }
}

Deno.serve(async (req) => {
  const url = new URL(req.url);

  // Meta's one-time check when the webhook URL is saved
  if (req.method === "GET") {
    const ok = url.searchParams.get("hub.mode") === "subscribe" && VERIFY_TOKEN && url.searchParams.get("hub.verify_token") === VERIFY_TOKEN;
    return ok ? new Response(url.searchParams.get("hub.challenge") || "", { status: 200 }) : new Response("forbidden", { status: 403 });
  }
  if (req.method !== "POST") return new Response("method not allowed", { status: 405 });

  const raw = await req.text();
  if (!(await verifySignature(raw, req.headers.get("x-hub-signature-256"), APP_SECRET))) {
    return new Response("bad signature", { status: 401 });
  }
  let payload: unknown;
  try {
    payload = JSON.parse(raw);
  } catch {
    return new Response("bad json", { status: 400 });
  }
  // answer Meta at once (it retries slow calls); the work goes on after
  const work = Promise.all(extractMessages(payload).map((m) => handle(m).catch(() => {})));
  // deno-lint-ignore no-explicit-any
  const runtime = (globalThis as any).EdgeRuntime;
  if (runtime && typeof runtime.waitUntil === "function") runtime.waitUntil(work);
  else await work;
  return new Response("ok", { status: 200 });
});
