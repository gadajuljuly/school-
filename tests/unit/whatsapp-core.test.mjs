// node --test tests/unit/  - the WhatsApp bot's plain helpers
// (supabase/functions/_shared/whatsapp-core.ts, run here with Node's type stripping).
import { test } from "node:test";
import assert from "node:assert/strict";
import { createHmac, createHash } from "node:crypto";
import { buildContext, extractMessages, israelNow, phoneFromWa, phoneToUuid, verifySignature, whatsappReplyText } from "../../supabase/functions/_shared/whatsapp-core.ts";

test("a WhatsApp sender as the app writes phone numbers", () => {
  assert.equal(phoneFromWa("972523255088"), "+972523255088");
  assert.equal(phoneFromWa(""), "");
});

test("the same private-row id as the app's phoneToUuid", async () => {
  const phone = "+972523255088";
  const hex = createHash("sha256").update("itask-phone:" + phone).digest("hex").slice(0, 32);
  const expected = hex.slice(0, 8) + "-" + hex.slice(8, 12) + "-4" + hex.slice(13, 16) + "-a" + hex.slice(17, 20) + "-" + hex.slice(20, 32);
  assert.equal(await phoneToUuid(phone), expected);
});

test("Meta's signature: right secret and body only", async () => {
  const body = JSON.stringify({ entry: [] });
  const sig = "sha256=" + createHmac("sha256", "s3cret").update(body).digest("hex");
  assert.equal(await verifySignature(body, sig, "s3cret"), true);
  assert.equal(await verifySignature(body + " ", sig, "s3cret"), false);
  assert.equal(await verifySignature(body, sig, "other"), false);
  assert.equal(await verifySignature(body, null, "s3cret"), false);
  assert.equal(await verifySignature(body, sig, ""), false);
});

test("messages out of a webhook call; delivery statuses skipped", () => {
  const payload = { entry: [{ changes: [{ value: {
    messages: [{ id: "wamid.1", from: "972523255088", type: "text", timestamp: "1700000000", text: { body: "הגיעו 3 משאיות" } },
               { id: "wamid.2", from: "972523255088", type: "audio", audio: { id: "a1" } }],
    statuses: [{ id: "wamid.0", status: "read" }],
  } }] }] };
  assert.deepEqual(extractMessages(payload), [
    { id: "wamid.1", from: "972523255088", type: "text", text: "הגיעו 3 משאיות", timestamp: 1700000000 },
    { id: "wamid.2", from: "972523255088", type: "audio", text: "", timestamp: 0 },
  ]);
  assert.deepEqual(extractMessages({}), []);
});

test("the date in Israel, also just after midnight there", () => {
  const n = israelNow(Date.parse("2026-11-11T22:30:00Z")); // 00:30 in Israel
  assert.equal(n.today, "2026-11-12");
  assert.equal(n.now, "00:30");
});

test("the projects the assistant sees: own and shared, not ended, no head office, open tasks only", () => {
  const own = { sheets: [
    { id: "a", name: "כביש", tasks: [{ id: "t1", text: "פתוחה", status: 0, date: "2026-11-11" }, { id: "t2", text: "בוצעה", status: 2 },
      { id: "t3", text: "הערה", type: "note" }, { id: "t4", text: "מהתוכנית", planItemId: "x" }], workPlan: [{ id: "w1", name: "מצע", progress: 40 }, { id: "w2", name: "גמור", status: "done" }] },
    { id: "b", name: "הסתיים", ended: true },
    { id: "head-office-main", name: "משרד" },
  ] };
  const shared = [{ id: "s1", name: "מתנ\"ס", data: { tasks: [], workPlan: [] } }, { id: "a", name: "כפול", data: {} }];
  const ctx = buildContext(own, shared, Date.parse("2026-11-11T08:00:00Z"));
  assert.equal(ctx.channel, "whatsapp");
  assert.deepEqual(ctx.projects.map((p) => p.id), ["a", "s1"]);
  assert.deepEqual(ctx.projects[0].open_tasks, [{ id: "t1", text: "פתוחה", date: "2026-11-11" }]);
  assert.deepEqual(ctx.projects[0].activities.map((x) => [x.id, x.progress]), [["w1", 40]]);
});

test("the bot's answer says where the actions show", () => {
  assert.match(whatsappReplyText("רשמתי ביומן.", 2), /^רשמתי ביומן\.\n\n📱 יופיע ב-ITASK/);
  assert.equal(whatsappReplyText("פתוחות לך 3 משימות.", 0), "פתוחות לך 3 משימות.");
  assert.match(whatsappReplyText("", 0), /לא הבנתי/);
});
