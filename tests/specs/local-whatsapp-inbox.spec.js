const { test, expect } = require("@playwright/test");
const { openWithSharedProject } = require("./helpers/local-app");

// What the user wrote the ITASK bot on WhatsApp waits in whatsapp_inbox (the
// webhook already answered there); the app applies it - the diary on the day
// it was sent - shows it in the assistant's chat with ↶, and marks it applied.
test.use({ viewport: { width: 390, height: 800 }, serviceWorkers: "block" });

const ME = "+972500000001";
const pad = (n) => String(n).padStart(2, "0");
const iso = (d0) => { const d = new Date(); d.setDate(d.getDate() + d0); return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`; };
const SHEET = { id: "p1", name: "כביש הדקלים", members: [ME], tasks: [] };
const A = (o) => Object.assign({ project_id: "p1", text: "", date: "", time: "", end_time: "", column: "", quantity: "", supplier: "", task_id: "", activity_id: "", percent: 0 }, o);
const server = (page) => page.evaluate(() => window.__backend.tables.shared_projects.find((r) => r.id === "p1").data);
const inbox = (page) => page.evaluate(() => window.__backend.tables.whatsapp_inbox.map((r) => ({ id: r.id, status: r.status })));

test("WhatsApp messages are applied when the app opens: yesterday's diary, a task, in the chat with undo", async ({ page }) => {
  await openWithSharedProject(page, { phone: ME, sheet: SHEET });
  await page.evaluate(({ rows }) => { window.__backend.tables.whatsapp_inbox = rows; }, { rows: [
    { id: "w1", phone: ME, status: "pending", day: iso(-1), created_at: new Date(Date.now() - 86400000).toISOString(),
      text: "הגיעו 3 משאיות מצע, מכבש עבד", reply: "רשמתי ביומן של כביש הדקלים.\n\n📱 יופיע ב-ITASK בפתיחה הבאה של האפליקציה.",
      actions: [A({ type: "diary_work", text: "פיזור מצע – 3 משאיות" }), A({ type: "diary_tool", column: "roller", quantity: "1" })] },
    { id: "w2", phone: ME, status: "pending", day: iso(0), created_at: new Date().toISOString(),
      text: "מחר להזמין אספלט", reply: "הוספתי משימה למחר.", actions: [A({ type: "add_task", text: "להזמין אספלט", date: iso(1) })] },
    // already taken by another device / someone else's / just a question
    { id: "w3", phone: ME, status: "applying", day: iso(0), created_at: new Date().toISOString(), text: "x", reply: "", actions: [A({ type: "add_task", text: "לא להוסיף" })] },
    { id: "w4", phone: "+972599999999", status: "pending", day: iso(0), created_at: new Date().toISOString(), text: "y", reply: "", actions: [A({ type: "add_task", text: "של מישהו אחר" })] },
  ] });
  await page.evaluate(() => window.__hooks.pullWhatsAppForTest());

  await expect.poll(async () => (await inbox(page)).map((r) => r.status)).toEqual(["applied", "applied", "applying", "pending"]);
  await expect.poll(async () => {
    const d = await server(page);
    const y = (d.siteLogs || []).find((l) => l.date === iso(-1)) || {};
    return { works: (y.works || []).map((w) => w.text), roller: ((y.tools || {}).roller || []).length,
      tasks: (d.tasks || []).map((t) => [t.text, t.date]) };
  }).toEqual({ works: ["פיזור מצע – 3 משאיות"], roller: 1, tasks: [["להזמין אספלט", iso(1)]] });

  // in the assistant's chat, marked 📱, the WhatsApp footnote dropped; ↶ for the latest
  await page.locator("#menuBtn").click();
  await page.locator("#assistantMenuBtn").click();
  const msgs = page.locator(".assistant-msg");
  await expect(msgs).toHaveCount(4);
  await expect(msgs.nth(0)).toContainText("📱 הגיעו 3 משאיות מצע");
  await expect(msgs.nth(1)).toHaveText(/רשמתי ביומן של כביש הדקלים\./);
  await expect(msgs.nth(1)).not.toContainText("בפתיחה הבאה");
  await msgs.nth(3).locator(".assistant-undo").click();
  await expect.poll(async () => ((await server(page)).tasks || []).length).toBe(0);

  // pulled again: nothing applied twice
  await page.evaluate(() => window.__hooks.pullWhatsAppForTest());
  await page.waitForTimeout(500);
  expect(((await server(page)).siteLogs || []).find((l) => l.date === iso(-1)).works).toHaveLength(1);
});
