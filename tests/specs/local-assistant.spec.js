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
