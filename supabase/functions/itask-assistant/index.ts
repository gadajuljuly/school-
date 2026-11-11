// Deploy with: supabase functions deploy itask-assistant --no-verify-jwt
// Required secrets: APP_JWT_SECRET (already set for mint-session-token) and
// ANTHROPIC_API_KEY (an Anthropic API key - set it yourself with
// `supabase secrets set ANTHROPIC_API_KEY=...`; never commit it).
//
// The ITASK assistant's "brain": a site manager's free-form message
// ("4 trucks of base course came, the roller worked till 2, tomorrow at 7
// meeting with the supervisor") goes in, together with a short summary of
// their projects that the app sends; out comes a short Hebrew reply and a
// list of actions (a task, a diary line, attendance, a tool, a contractor,
// procurement, an activity's %, a calendar event). The app applies the
// actions itself - on the phone, with ↶ undo - so nothing here writes to the
// database. The brain itself (prompt, schema, the model call) is in
// ../_shared/assistant.ts, shared with the WhatsApp bot (whatsapp-webhook).

import Anthropic from "npm:@anthropic-ai/sdk@1.5.0";
import * as jose from "npm:jose@5";
import { askAssistant } from "../_shared/assistant.ts";

const APP_JWT_SECRET = Deno.env.get("APP_JWT_SECRET")!;
const client = new Anthropic(); // reads ANTHROPIC_API_KEY

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
};
function jsonResponse(body: unknown, status = 200) {
  return new Response(JSON.stringify(body), { status, headers: { ...corsHeaders, "Content-Type": "application/json" } });
}

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") return new Response("ok", { headers: corsHeaders });

  // only signed-in ITASK users (the app's own token from mint-session-token)
  const auth = req.headers.get("Authorization") || "";
  let phone = "";
  try {
    const { payload } = await jose.jwtVerify(auth.replace(/^Bearer\s+/i, ""), new TextEncoder().encode(APP_JWT_SECRET));
    phone = String(payload.phone_number || "");
  } catch {
    return jsonResponse({ error: "unauthorized" }, 401);
  }
  if (!phone) return jsonResponse({ error: "unauthorized" }, 401);

  let body: { text?: string; context?: unknown; history?: { role: string; text: string }[] };
  try {
    body = await req.json();
  } catch {
    return jsonResponse({ error: "invalid json body" }, 400);
  }
  const text = String(body.text || "").trim().slice(0, 4000);
  if (!text) return jsonResponse({ error: "missing text" }, 400);

  try {
    const out = await askAssistant(client, { text, context: body.context || {}, history: Array.isArray(body.history) ? body.history : [] });
    if (out.refused) return jsonResponse({ reply: "", actions: [], error: "refused" });
    return jsonResponse({ reply: out.reply, actions: out.actions });
  } catch (err) {
    if (err instanceof Anthropic.RateLimitError) return jsonResponse({ error: "busy" }, 429);
    if (err instanceof Anthropic.APIError) return jsonResponse({ error: "ai " + err.status }, 502);
    return jsonResponse({ error: "failed" }, 500);
  }
});
