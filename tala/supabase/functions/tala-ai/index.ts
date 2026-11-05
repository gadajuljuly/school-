// Supabase Edge Function "tala-ai": the ✨ writing helper of תל"א / תח"י.
// Signed-in teachers send a field's text and context; the AI returns the rewritten text.
// Secrets (Edge Functions → Secrets), one of:
//   GEMINI_API_KEY    – Google Gemini, free tier (on the free tier Google may use the texts to improve its products)
//   ANTHROPIC_API_KEY – Claude, paid
// Optional: GEMINI_MODEL (default "gemini-flash-latest").
import Anthropic from "npm:@anthropic-ai/sdk";
import { createClient } from "npm:@supabase/supabase-js@2";

const GEMINI_KEY = Deno.env.get("GEMINI_API_KEY");
const GEMINI_MODEL = Deno.env.get("GEMINI_MODEL") || "gemini-flash-latest";

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

class AiError extends Error {}

// Google Gemini (REST generateContent).
async function askGemini(prompt: string): Promise<string> {
  const res = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/${GEMINI_MODEL}:generateContent`, {
    method: "POST",
    headers: { "Content-Type": "application/json", "x-goog-api-key": GEMINI_KEY! },
    body: JSON.stringify({
      system_instruction: { parts: [{ text: SYSTEM }] },
      contents: [{ role: "user", parts: [{ text: prompt }] }],
      generationConfig: { maxOutputTokens: 4000, temperature: 0.4 },
    }),
  });
  if (res.status === 429) throw new AiError("busy");
  if (res.status === 400 || res.status === 401 || res.status === 403) {
    const body = await res.text();
    throw new AiError(/API key|PERMISSION_DENIED|UNAUTHENTICATED/i.test(body) ? "api-key" : `api-${res.status}`);
  }
  if (!res.ok) throw new AiError(`api-${res.status}`);
  const data = await res.json();
  const cand = data.candidates?.[0];
  if (!cand || cand.finishReason === "SAFETY" || data.promptFeedback?.blockReason) throw new AiError("refusal");
  return (cand.content?.parts ?? [])
    .map((p: { text?: string; thought?: boolean }) => (p.thought ? "" : p.text ?? ""))
    .join("")
    .trim();
}

// Claude (Anthropic SDK).
async function askClaude(prompt: string): Promise<string> {
  const anthropic = new Anthropic(); // reads ANTHROPIC_API_KEY
  try {
    const response = await anthropic.beta.messages.create({
      model: "claude-opus-5-5",
      max_tokens: 4000,
      output_config: { effort: "low" },
      betas: ["server-side-fallback-2026-07-01"],
      fallbacks: "default",
      system: SYSTEM,
      messages: [{ role: "user", content: prompt }],
    });
    if (response.stop_reason === "refusal") throw new AiError("refusal");
    return response.content.map((block) => (block.type === "text" ? block.text : "")).join("").trim();
  } catch (error) {
    if (error instanceof AiError) throw error;
    if (error instanceof Anthropic.AuthenticationError) throw new AiError("api-key");
    if (error instanceof Anthropic.RateLimitError) throw new AiError("busy");
    if (error instanceof Anthropic.APIError) throw new AiError(`api-${error.status}`);
    throw error;
  }
}

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
  if (!GEMINI_KEY && !Deno.env.get("ANTHROPIC_API_KEY")) return json({ error: "api-key" }, 500);

  const prompt = `Task: ${task}\n\nField: ${body.field ?? ""}\n\nContext:\n${context || "(none)"}\n\nText:\n${text || "(empty)"}`;
  try {
    const result = GEMINI_KEY ? await askGemini(prompt) : await askClaude(prompt);
    if (!result) return json({ error: "empty-result" }, 502);
    return json({ text: result });
  } catch (error) {
    if (error instanceof AiError) {
      const m = error.message;
      return json({ error: m }, m === "busy" ? 429 : m === "refusal" ? 422 : m === "api-key" ? 500 : 502);
    }
    return json({ error: "server" }, 500);
  }
});
