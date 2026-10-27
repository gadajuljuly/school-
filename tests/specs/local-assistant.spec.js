const { test, expect } = require("@playwright/test");
const { openWithSharedProject } = require("./helpers/local-app");

// עוזר ITASK: the chat with the app the home-screen widget opens - its
// questions answered from the projects, its commands carried out at once
// with an undo. Offline: fake server, fake phone (speech hears __voiceSay).
test.use({ viewport: { width: 390, height: 800 }, serviceWorkers: "block" });

const ME = "+972500000001";
const pad = (n) => String(n).padStart(2, "0");
const iso = (delta) => { const d = new Date(); d.setDate(d.getDate() + delta); return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`; };
const tasksOf = (page) => page.evaluate(() => window.__backend.tables.shared_projects[0].data.tasks);

async function openFromWidget(page, view) {
  await expect.poll(() => page.evaluate(() => !!(window.__native.listeners && window.__native.listeners.launchView))).toBe(true);
  await page.evaluate((v) => window.__native.listeners.launchView({ view: v }), view);
  await expect(page.locator("#assistantView")).toBeVisible();
}
const bot = (page) => page.locator("#assistantMessages .as-bot");
const say = async (page, text) => {
  await page.locator("#assistantInput").fill(text);
  await page.locator("#assistantSendBtn").click();
};

const SHEET = {
  id: "p1", name: "בניין A", members: [ME], tasks: [
    { id: "t1", text: "לבדוק ברזל בקומה 3", status: 0, type: "task", date: iso(0), createdAt: 1 },
    { id: "t2", text: "להזמין בטון", status: 0, type: "task", date: iso(1), createdAt: 2, reminder: { type: "time", date: iso(1), time: "08:00", fireAt: new Date(Date.now() + 86400000).toISOString(), firedAt: null } },
  ],
  workPlan: [
    { id: "w1", name: "יציקת תקרה", start: iso(-6), end: iso(-1), status: "prog", progress: 40, by: "צוות טפסנות" },
    { id: "w2", name: "טיח", start: iso(0), end: iso(10), status: "todo", progress: 0, by: "" },
  ],
};

test("the widget opens the assistant; it answers what's on today, tomorrow and what's late", async ({ page }) => {
  await openWithSharedProject(page, { phone: ME, native: true, sheet: SHEET });
  await openFromWidget(page, "assistant");
  await expect(bot(page).first()).toContainText("שלום");
  await expect(page.locator("#assistantInput")).toBeFocused(); // the keyboard, ready

  await page.locator(".as-chips button", { hasText: "מה יש לי היום?" }).click();
  await expect(bot(page).last()).toContainText("לבדוק ברזל בקומה 3");
  await expect(bot(page).last()).toContainText("📊 טיח");      // a plan activity running today
  await expect(bot(page).last()).toContainText("📊 יציקת תקרה (40%) ⚠"); // ...and a late one
  await expect(bot(page).last().locator("li", { hasText: "טיח" })).toHaveCount(1); // not its task too
  await expect(bot(page).last()).not.toContainText("להזמין בטון");

  await say(page, "מה יש לי מחר?");
  await expect(bot(page).last()).toContainText("להזמין בטון ⏰ 08:00");

  await say(page, "מה באיחור?");
  await expect(bot(page).last()).toContainText("יציקת תקרה");
  await expect(bot(page).last()).toContainText("צוות טפסנות");

  await say(page, "מה המשימות של בניין A?");
  await expect(bot(page).last()).toContainText("לבדוק ברזל");
  await expect(bot(page).last()).toContainText("להזמין בטון");
});

test("a command is carried out at once, with undo; a done task; the widget's 🎤 listens straight away", async ({ page }) => {
  await openWithSharedProject(page, { phone: ME, native: true, sheet: SHEET });
  await page.evaluate(() => { window.__voiceSay = "תזכיר לי מחר ב-9 להתקשר לקבלן החשמל"; });
  await openFromWidget(page, "assistant-listen");
  // heard and done without a tap
  await expect(page.locator("#assistantMessages .as-me").last()).toHaveText("תזכיר לי מחר ב-9 להתקשר לקבלן החשמל");
  await expect(bot(page).last()).toContainText("✓");
  await expect(bot(page).last()).toContainText("09:00");
  await expect.poll(async () => (await tasksOf(page)).find((t) => /קבלן החשמל/.test(t.text))?.reminder?.time).toBe("09:00");
  const added = (await tasksOf(page)).find((t) => /קבלן החשמל/.test(t.text));
  expect(added.date).toBe(iso(1));

  // ↶ takes it back
  await bot(page).last().locator("button", { hasText: "ביטול" }).click();
  await expect(bot(page).last().locator("button", { hasText: "בוטל" })).toBeDisabled();
  await expect.poll(async () => (await tasksOf(page)).some((t) => /קבלן החשמל/.test(t.text))).toBe(false);

  // typed: a task marked done
  await say(page, "סיימתי לבדוק ברזל");
  await expect(bot(page).last()).toContainText("לבדוק ברזל בקומה 3");
  await expect.poll(async () => (await tasksOf(page)).find((t) => t.id === "t1").status).toBe(2);

  // "פתח באפליקציה" takes me to it
  await say(page, "משימה לבניין A לסדר את המחסן");
  await expect(bot(page).last()).toContainText("לסדר את המחסן");
  await bot(page).last().locator("button", { hasText: "פתח באפליקציה" }).click();
  await expect(page.locator("#assistantView")).toBeHidden();
  await expect(page.locator("#taskList li.task", { hasText: "לסדר את המחסן" })).toBeVisible();
});

const planOf = (page) => page.evaluate(() => window.__backend.tables.shared_projects[0].data.workPlan);

test("assistant: progress of an activity, moving / postponing one, a message to a project's chat", async ({ page }) => {
  await openWithSharedProject(page, { phone: ME, native: true, sheet: SHEET });
  await openFromWidget(page, "assistant");

  await say(page, "עדכן טיח ל-60%");
  await expect(bot(page).last()).toContainText("ההתקדמות עודכנה");
  await expect(bot(page).last()).toContainText("טיח – 60%");
  await expect.poll(async () => (await planOf(page)).find((x) => x.id === "w2")).toMatchObject({ progress: 60, status: "prog" });
  // ↶ puts it back
  await bot(page).last().locator("button", { hasText: "ביטול" }).click();
  await expect.poll(async () => (await planOf(page)).find((x) => x.id === "w2").progress).toBe(0);

  await say(page, "דחה את יציקת התקרה ביומיים");
  await expect(bot(page).last()).toContainText("הועברה");
  await expect.poll(async () => (await planOf(page)).find((x) => x.id === "w1")).toMatchObject({ start: iso(-4), end: iso(1) });

  await say(page, "העבר את הטיח ליום חמישי");
  const thu = await page.evaluate(() => { const d = new Date(); do { d.setDate(d.getDate() + 1); } while (d.getDay() !== 4); return d.toISOString(); });
  await expect.poll(async () => (await planOf(page)).find((x) => x.id === "w2").start).toBe(
    await page.evaluate((s) => { const d = new Date(s); const p = (n) => String(n).padStart(2, "0"); return `${d.getFullYear()}-${p(d.getMonth() + 1)}-${p(d.getDate())}`; }, thu));
  const w2 = (await planOf(page)).find((x) => x.id === "w2");
  const days = (a, b) => Math.round((new Date(b) - new Date(a)) / 864e5);
  expect(days(w2.start, w2.end)).toBe(10); // same length

  await say(page, "שלח לצ'אט של בניין A: הבטון מתעכב בשעה");
  await expect(bot(page).last()).toContainText("נשלח לצ'אט של בניין A");
  await expect.poll(() => page.evaluate(() => window.__backend.tables.shared_projects[0].messages.map((m) => m.text))).toEqual(["הבטון מתעכב בשעה"]);
  await bot(page).last().locator("button", { hasText: "פתח את הצ'אט" }).click();
  await expect(page.locator("#chatView")).toBeVisible();
});

test("morning summary: a quiet notification each morning with the day's tasks, late activities and first reminder; tap opens the assistant on today", async ({ page }) => {
  await openWithSharedProject(page, { phone: ME, native: true, sheet: SHEET });
  const morning = () => page.evaluate(() => (window.__native.alarms || []).filter((a) => a.id.startsWith("morning:")));
  // tomorrow: one open task with an 08:00 reminder, two activities late by then (w1 ended yesterday, w2 not yet)
  await expect.poll(async () => (await morning()).map((a) => a.id)).toContain("morning:" + iso(1));
  const tomorrow = (await morning()).find((a) => a.id === "morning:" + iso(1));
  expect(tomorrow).toMatchObject({ quiet: true, view: "assistant-today" });
  expect(tomorrow.body).toContain("היום: 1 משימות");
  expect(tomorrow.body).toContain("1 פעילויות באיחור");
  expect(tomorrow.body).toContain("תזכורת ב-08:00 – להזמין בטון");
  expect(new Date(tomorrow.at).getHours()).toBe(7);
  // the time is set from the menu
  await page.evaluate(() => { const el = document.getElementById("morningSummaryTime"); el.value = "06:30"; el.dispatchEvent(new Event("change")); });
  await expect.poll(async () => { const a = (await morning()).find((x) => x.id === "morning:" + iso(1)); return a && new Date(a.at).getHours() * 60 + new Date(a.at).getMinutes(); }).toBe(390);
  // ...and turned off
  await page.evaluate(() => { const el = document.getElementById("morningSummaryToggle"); el.checked = false; el.dispatchEvent(new Event("change")); });
  await expect.poll(async () => (await morning()).length).toBe(0);
  // the tap: the assistant answers what's on today
  await page.evaluate(() => window.__native.listeners.launchView({ view: "assistant-today" }));
  await expect(page.locator("#assistantView")).toBeVisible();
  await expect(page.locator("#assistantMessages .as-me").last()).toHaveText("מה יש לי היום?");
  await expect(bot(page).last()).toContainText("לבדוק ברזל בקומה 3");
});
