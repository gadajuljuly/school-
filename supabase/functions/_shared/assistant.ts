// The ITASK assistant's "brain", shared by the in-app chat (itask-assistant)
// and the WhatsApp bot (whatsapp-webhook): a site manager's free-form
// message plus a short summary of their projects goes in; out comes a short
// reply and a list of actions for the app to apply.
import Anthropic from "npm:@anthropic-ai/sdk@1.5.0";

export const ATTENDANCE = ["foreman", "engineer", "workers", "operators", "consultants", "surveyor"];
export const TOOLS = ["excavator", "loader", "bagger", "miniBagger", "bobcat", "roller", "truck", "arrowCart", "waterTanker",
  "concretePump", "crane", "telescopic", "drillingMachine", "pirkit"];
export const ACTION_TYPES = ["add_task", "complete_task", "diary_work", "diary_attendance", "diary_tool", "diary_contractor",
  "diary_procurement", "activity_progress", "calendar_event"];

// Every field is always present (empty string / 0 when it doesn't apply), so
// the schema stays strict without nullable types.
export const SCHEMA = {
  type: "object",
  additionalProperties: false,
  required: ["reply", "actions"],
  properties: {
    reply: { type: "string" },
    actions: {
      type: "array",
      items: {
        type: "object",
        additionalProperties: false,
        required: ["type", "project_id", "text", "date", "time", "end_time", "column", "quantity", "supplier", "task_id", "activity_id", "percent"],
        properties: {
          type: { type: "string", enum: ACTION_TYPES },
          project_id: { type: "string" },
          text: { type: "string" },
          date: { type: "string" },
          time: { type: "string" },
          end_time: { type: "string" },
          column: { type: "string" },
          quantity: { type: "string" },
          supplier: { type: "string" },
          task_id: { type: "string" },
          activity_id: { type: "string" },
          percent: { type: "integer" },
        },
      },
    },
  },
};

export const SYSTEM = `You are ITASK's site assistant. Engineers and site managers on construction, roads, earthworks and infrastructure sites write or dictate (in Hebrew, sometimes Arabic, Russian or English) what happened on site or what needs doing. You turn each message into actions on their projects and answer briefly in the user's language.

The user message holds a JSON context: today's date and time, the user's projects (id, name, open tasks with ids, work-plan activities with ids and %), and the message itself, with the last few turns of the conversation.

Action types (fill every field; use "" or 0 for fields that don't apply):
- add_task: a to-do. text = the task. date = YYYY-MM-DD it's for (default today; "מחר" = tomorrow). time = HH:MM only when a reminder time was said.
- complete_task: the user says a task was done. task_id = the matching open task's id.
- diary_work: a line of work done today for the site diary. text = the work, concise, with quantities and locations as said.
- diary_attendance: people on site. column = one of ${ATTENDANCE.join(", ")}. text = the person's or crew's name, or e.g. "6 פועלים" when only a count was given (column workers).
- diary_tool: equipment that worked. column = one of ${TOOLS.join(", ")} (roller = מכבש, truck = משאית, excavator = מחפרון, loader = שופל, bagger = באגר, waterTanker = מכלית מים, crane = מנוף, pirkit = פרקית, telescopic = טלסקופי). quantity = how many (as a number string). text = a short note (hours, location) or "".
- diary_contractor: a subcontractor/crew that worked today. text = its name.
- diary_procurement: material that arrived or was ordered. text = the item, quantity = amount with unit, supplier = supplier or "".
- activity_progress: a work-plan activity's cumulative % done. activity_id from the context, percent 0-100. Only when a % (or "finished" = 100) was stated or clearly implied.
- calendar_event: a meeting/appointment for the phone calendar. text = title, date, time = start, end_time = end (default one hour after start). An event with no time: time "".

Rules:
- project_id must be one of the context's project ids. Pick it from the message, the conversation, or the only project. When the message clearly belongs to a project but doesn't name it and the user has several, use the project named in the previous turns; if there is none, return no actions and ask which project in reply (list the names).
- Split a message into as many actions as it holds. Don't invent facts, numbers or names.
- Diary actions are always for today; don't use them for future plans (those are tasks or calendar events).
- If the message is a question ("מה פתוח לי היום?", "כמה בוצע במצעים?"), answer it from the context in reply with no actions.
- reply: one or two short sentences confirming what you recorded, by project, in the user's language - e.g. "רשמתי ביומן של כביש הדקלים: פיזור מצע, מכבש 1. הוספתי משימה למחר: להזמין אספלט." No markdown.`;


export type AssistantTurn = { role: string; text: string };
export type AssistantAction = Record<string, string | number> & { type: string };
export type AssistantResult = { reply: string; actions: AssistantAction[]; refused?: boolean };

// One message -> { reply, actions }. Throws the SDK's errors (rate limit,
// API errors) for the caller to map.
export async function askAssistant(client: Anthropic, input: { text: string; context: unknown; history: AssistantTurn[] }): Promise<AssistantResult> {
  const text = String(input.text || "").trim().slice(0, 4000);
  const history = (Array.isArray(input.history) ? input.history : []).slice(-6).map((h) => ({
    role: h.role === "assistant" ? "assistant" : "user",
    text: String(h.text || "").slice(0, 1000),
  }));
  const userContent = JSON.stringify({ context: input.context || {}, conversation: history, message: text });
  const response = await client.beta.messages.create({
    model: "claude-opus-5-5",
    max_tokens: 4000,
    betas: ["server-side-fallback-2026-07-01"],
    fallbacks: "default",
    system: SYSTEM,
    output_config: { effort: "low", format: { type: "json_schema", schema: SCHEMA } },
    messages: [{ role: "user", content: userContent }],
  });
  if (response.stop_reason === "refusal") return { reply: "", actions: [], refused: true };
  let out = "";
  for (const block of response.content) if (block.type === "text") out += block.text;
  const parsed = JSON.parse(out);
  const actions = (parsed.actions || []).filter((a: { type: string }) => ACTION_TYPES.includes(a.type));
  return { reply: String(parsed.reply || ""), actions };
}
