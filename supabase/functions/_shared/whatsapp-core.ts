// The WhatsApp bot's plain helpers - no imports, so they run the same in the
// Edge Function (Deno) and in the tests (Node: tests/unit/whatsapp-core.test.mjs).

// A WhatsApp sender ("972523255088") as the app writes phone numbers.
export function phoneFromWa(waId: string): string {
  const digits = String(waId || "").replace(/\D/g, "");
  return digits ? "+" + digits : "";
}

// The same id the app gives a user's private row (app_state.id) - see
// phoneToUuid in src/app/01-core-data-sync.js.
export async function phoneToUuid(phone: string): Promise<string> {
  const buf = await crypto.subtle.digest("SHA-256", new TextEncoder().encode("itask-phone:" + phone));
  const hex = Array.from(new Uint8Array(buf).slice(0, 16)).map((b) => b.toString(16).padStart(2, "0")).join("");
  return hex.slice(0, 8) + "-" + hex.slice(8, 12) + "-4" + hex.slice(13, 16) + "-a" + hex.slice(17, 20) + "-" + hex.slice(20, 32);
}

// Meta signs every webhook call: X-Hub-Signature-256 = "sha256=" + HMAC-SHA256
// of the raw body with the app secret. Compared in constant time.
export async function verifySignature(rawBody: string, header: string | null, appSecret: string): Promise<boolean> {
  if (!header || !appSecret || !header.startsWith("sha256=")) return false;
  const key = await crypto.subtle.importKey("raw", new TextEncoder().encode(appSecret), { name: "HMAC", hash: "SHA-256" }, false, ["sign"]);
  const sig = new Uint8Array(await crypto.subtle.sign("HMAC", key, new TextEncoder().encode(rawBody)));
  const expected = Array.from(sig).map((b) => b.toString(16).padStart(2, "0")).join("");
  const got = header.slice(7).toLowerCase();
  if (got.length !== expected.length) return false;
  let diff = 0;
  for (let i = 0; i < got.length; i++) diff |= got.charCodeAt(i) ^ expected.charCodeAt(i);
  return diff === 0;
}

// mediaId: a voice message's audio (downloaded and transcribed by the webhook)
export type WaMessage = { id: string; from: string; type: string; text: string; timestamp: number; mediaId: string };

// The messages in one webhook call (statuses - delivered, read - are skipped).
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function extractMessages(payload: any): WaMessage[] {
  const out: WaMessage[] = [];
  for (const entry of (payload && payload.entry) || []) {
    for (const change of entry.changes || []) {
      const value = change.value || {};
      for (const m of value.messages || []) {
        if (!m || !m.id || !m.from) continue;
        out.push({
          id: String(m.id),
          from: String(m.from),
          type: String(m.type || ""),
          text: m.type === "text" ? String((m.text && m.text.body) || "") : "",
          timestamp: Number(m.timestamp || 0),
          mediaId: m.type === "audio" ? String((m.audio && m.audio.id) || "") : "",
        });
      }
    }
  }
  return out;
}

// Today's date / the time / the weekday where the sites are (Israel).
export function israelNow(ms: number): { today: string; now: string; weekday: string } {
  const d = new Date(ms);
  const part = (o: Intl.DateTimeFormatOptions) => new Intl.DateTimeFormat("en-CA", { timeZone: "Asia/Jerusalem", ...o }).format(d);
  return {
    today: part({ year: "numeric", month: "2-digit", day: "2-digit" }),
    now: new Intl.DateTimeFormat("en-GB", { timeZone: "Asia/Jerusalem", hour: "2-digit", minute: "2-digit", hour12: false }).format(d),
    weekday: new Intl.DateTimeFormat("he-IL", { timeZone: "Asia/Jerusalem", weekday: "long" }).format(d),
  };
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type Sheet = { id: string; name: string; ended?: boolean; tasks?: any[]; workPlan?: any[] };

// What the assistant knows about the user's projects - the same shape as
// assistantContext() in src/app/14h-site-assistant.js: their own projects
// (app_state) and the shared ones they're a member of, not ended.
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function buildContext(privateData: any, sharedRows: any[], ms: number) {
  const HEAD_OFFICE = "head-office-main"; // HEAD_OFFICE_SHEET_ID in the app
  const own: Sheet[] = ((privateData && privateData.sheets) || []).filter((s: Sheet) => s && s.id && s.id !== HEAD_OFFICE);
  const shared: Sheet[] = (sharedRows || []).map((r) => ({ id: r.id, name: r.name, ...((r.data as object) || {}) }));
  const seen = new Set<string>();
  const sheets = own.concat(shared).filter((s) => {
    if (!s || s.ended || seen.has(s.id)) return false;
    seen.add(s.id);
    return true;
  });
  return {
    ...israelNow(ms),
    calendar: true,
    channel: "whatsapp",
    projects: sheets.map((s) => ({
      id: s.id,
      name: s.name,
      open_tasks: (s.tasks || []).filter((t) => t && t.type !== "note" && t.status !== 2 && !t.headOfficeVirtual && !t.planItemId && String(t.text || "").trim())
        .slice(0, 40).map((t) => ({ id: t.id, text: t.text, date: t.date })),
      activities: (s.workPlan || []).filter((x) => x && x.status !== "done").slice(0, 40)
        .map((x) => ({ id: x.id, name: x.name, progress: x.progress || 0, start: x.start, end: x.end, by: x.by || "" })),
    })),
  };
}

// The bot's answer: the assistant's reply, and - when it did something - that
// it shows in ITASK once the app is opened (that's where it's applied).
export function whatsappReplyText(reply: string, actionCount: number): string {
  const r = String(reply || "").trim();
  if (!actionCount) return r || "לא הבנתי מה לרשום. אפשר לכתוב שוב, למשל: \"הגיעו 3 משאיות מצע לכביש הדקלים\".";
  return (r || "רשמתי.") + "\n\n📱 יופיע ב-ITASK בפתיחה הבאה של האפליקציה.";
}

// bytes -> base64 (for the speech service), in pieces so a long recording
// doesn't overflow the call stack
export function bytesToBase64(bytes: Uint8Array): string {
  let bin = "";
  for (let i = 0; i < bytes.length; i += 0x8000) bin += String.fromCharCode(...bytes.subarray(i, i + 0x8000));
  return btoa(bin);
}

// Google Speech-to-Text's request for a WhatsApp voice message (Ogg / Opus):
// Hebrew first, Arabic, English and Russian also understood; numbers as digits
export function speechRequest(audioBase64: string) {
  return {
    config: {
      encoding: "OGG_OPUS",
      sampleRateHertz: 16000,
      languageCode: "he-IL",
      alternativeLanguageCodes: ["ar-IL", "en-US", "ru-RU"],
      enableAutomaticPunctuation: true,
      model: "default",
    },
    audio: { content: audioBase64 },
  };
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function transcriptFrom(response: any): string {
  return ((response && response.results) || [])
    .map((r: { alternatives?: { transcript?: string }[] }) => String((r.alternatives && r.alternatives[0] && r.alternatives[0].transcript) || "").trim())
    .filter(Boolean).join(" ").trim();
}

// what the bot says it heard, before its answer - so a misheard word shows
export function heardPrefix(transcript: string): string {
  return transcript ? "🎤 שמעתי: «" + transcript + "»\n\n" : "";
}
