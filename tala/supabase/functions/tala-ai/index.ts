// Supabase Edge Function "tala-ai": the ✨ writing helper of תל"א / תח"י.
// Signed-in teachers send a field's text and context; Claude returns the rewritten text.
// Secret needed in Supabase (Edge Functions → Secrets): ANTHROPIC_API_KEY.
import Anthropic from "npm:@anthropic-ai/sdk";
import { createClient } from "npm:@supabase/supabase-js@2";

const anthropic = new Anthropic(); // reads ANTHROPIC_API_KEY

const cors = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
};
const json = (body: unknown, status = 200) =>
  new Response(JSON.stringify(body), { status, headers: { ...cors, "Content-Type": "application/json" } });

const SYSTEM = `You are the writing assistant inside an app for building individual education plans (תל"א / תח"י) for special-education students at an Arab-sector school in Israel. Teachers write plan content mostly in Arabic and sometimes in Hebrew.

Rules:
- Return only the resulting text for the field - no preface, quotes, explanations or markdown.
- Keep the language of the input text unless the task is a translation. When drafting an empty field, write in the language the field normally uses: Arabic for goals, objectives, methods and evaluations; Hebrew if the context or the existing text is Hebrew.
- Arabic objectives follow the school's style: "ان + present-tense verb + الطالب ...", short and measurable, at the student's level.
- Use only facts given in the text or the context. Never invent diagnoses, scores, names or events. Keep blanks written as ___ unless the context gives the value.
- Professional, respectful, strengths-based wording suitable for parents to read.
- Keep the length suitable for the field: a single objective, criterion or method is one line; descriptions may be a short paragraph.`;

const TASKS: Record<string, string> = {
  improve: "Improve the wording: clearer, more professional and grammatically correct. Keep the meaning and the language.",
  expand: "Expand the text with a little more professional detail, based only on the given context. Keep the language.",
  shorten: "Shorten the text and keep its essential meaning. Keep the language.",
  measurable: "Rewrite as a measurable, observable objective (who, what, under which conditions, to what criterion). Keep the language.",
  to_ar: "Translate the text into Modern Standard Arabic suitable for a school document.",
  to_he: "Translate the text into Hebrew suitable for a school document.",
  draft: "The field is empty or almost empty. Draft suitable content for it from the context.",
};

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") return new Response("ok", { headers: cors });
  if (req.method !== "POST") return json({ error: "method" }, 405);

  // Only signed-in users of this project.
  const supabase = createClient(Deno.env.get("SUPABASE_URL")!, Deno.env.get("SUPABASE_ANON_KEY")!, {
    global: { headers: { Authorization: req.headers.get("Authorization") ?? "" } },
  });
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return json({ error: "not-signed-in" }, 401);

  let body: { action?: string; text?: string; field?: string; context?: string };
  try { body = await req.json(); } catch { return json({ error: "bad-request" }, 400); }
  const task = TASKS[body.action ?? ""];
  const text = String(body.text ?? "").slice(0, 6000);
  const context = String(body.context ?? "").slice(0, 6000);
  if (!task) return json({ error: "bad-action" }, 400);
  if (!text.trim() && body.action !== "draft") return json({ error: "empty" }, 400);

  try {
    const response = await anthropic.beta.messages.create({
      model: "claude-opus-5-5",
      max_tokens: 4000,
      output_config: { effort: "low" },
      betas: ["server-side-fallback-2026-07-01"],
      fallbacks: "default",
      system: SYSTEM,
      messages: [{
        role: "user",
        content: `Task: ${task}\n\nField: ${body.field ?? ""}\n\nContext:\n${context || "(none)"}\n\nText:\n${text || "(empty)"}`,
      }],
    });
    if (response.stop_reason === "refusal") return json({ error: "refusal" }, 422);
    const result = response.content
      .map((block) => (block.type === "text" ? block.text : ""))
      .join("")
      .trim();
    if (!result) return json({ error: "empty-result" }, 502);
    return json({ text: result });
  } catch (error) {
    if (error instanceof Anthropic.AuthenticationError) return json({ error: "api-key" }, 500);
    if (error instanceof Anthropic.RateLimitError) return json({ error: "busy" }, 429);
    if (error instanceof Anthropic.APIError) return json({ error: `api-${error.status}` }, 502);
    return json({ error: "server" }, 500);
  }
});
