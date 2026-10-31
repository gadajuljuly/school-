const { test, expect } = require("@playwright/test");
const { openWithSharedProject } = require("./helpers/local-app");

// דוח בוקר: what needs attention, the open tasks of every project (tap to
// mark done), and the work plans with their % bars - opened by the morning
// notification and the home-screen widget. Offline: fake server, fake phone.
test.use({ viewport: { width: 390, height: 800 }, serviceWorkers: "block" });

const ME = "+972500000001";
const pad = (n) => String(n).padStart(2, "0");
const iso = (delta) => { const d = new Date(); d.setDate(d.getDate() + delta); return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`; };
const shown = (delta) => iso(delta).split("-").reverse().slice(0, 2).join("/");
const server = (page) => page.evaluate(() => window.__backend.tables.shared_projects[0].data);

const SHEET = {
  id: "p1", name: "בניין A", members: [ME], tasks: [
    { id: "t1", text: "לבדוק ברזל בקומה 3", status: 0, type: "task", date: iso(0), createdAt: 1 },
    { id: "t2", text: "להזמין בטון", status: 0, type: "task", date: iso(1), createdAt: 2, reminder: { type: "time", date: iso(1), time: "08:00", fireAt: new Date(Date.now() + 86400000).toISOString(), firedAt: null } },
    { id: "t3", text: "לתאם משאבה", status: 0, type: "task", date: iso(-2), createdAt: 3 },
  ],
  workPlan: [
    { id: "w1", name: "יציקת תקרה", start: iso(-6), end: iso(-1), status: "prog", progress: 40, by: "צוות טפסנות" },
    { id: "w2", name: "טיח", start: iso(0), end: iso(10), status: "todo", progress: 0, by: "", after: "w1" },
    { id: "w3", name: "ריצוף", start: iso(12), end: iso(20), status: "todo", progress: 0, by: "" },
  ],
};

async function openReport(page, view = "morning") {
  await expect.poll(() => page.evaluate(() => !!(window.__native.listeners && window.__native.listeners.launchView))).toBe(true);
  await page.evaluate((v) => window.__native.listeners.launchView({ view: v }), view);
  await expect(page.locator("#morningView")).toBeVisible();
}

test("morning notification: quiet, each morning, the day's tasks, late activities and first reminder; its tap opens the report", async ({ page }) => {
  await openWithSharedProject(page, { phone: ME, native: true, sheet: SHEET });
  const morning = () => page.evaluate(() => (window.__native.alarms || []).filter((a) => a.id.startsWith("morning:")));
  // tomorrow: one open task with an 08:00 reminder, one activity late by then (w1 ended yesterday)
  await expect.poll(async () => (await morning()).map((a) => a.id)).toContain("morning:" + iso(1));
  const tomorrow = (await morning()).find((a) => a.id === "morning:" + iso(1));
  expect(tomorrow).toMatchObject({ quiet: true, view: "morning" });
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
  // the home-screen widget gets today's line
  await expect.poll(() => page.evaluate(() => window.__native.widget && window.__native.widget.morningLine)).toContain("2 משימות");
  expect(await page.evaluate(() => window.__native.widget.morningDate)).toBe(iso(0));
  // the tap - and the older widget / notifications' views open it too
  await openReport(page);
  await page.locator("#morningBackBtn").click();
  await openReport(page, "assistant-today");
  await page.locator("#morningBackBtn").click();
  await openReport(page, "assistant");
});

test("the report: what needs attention, then every project's open tasks to tick, then the plans with % bars", async ({ page }) => {
  await openWithSharedProject(page, { phone: ME, native: true, sheet: SHEET });
  await openReport(page);
  // 1. שים לב
  const att = page.locator(".morning-attention");
  await expect(att).toContainText("יציקת תקרה באיחור – הייתה צריכה להסתיים ב-" + shown(-1));
  await expect(att).toContainText("צוות טפסנות · ותגרור את: טיח");
  await expect(att).toContainText("1 משימות מימים קודמים");

  // 2. tasks: today's and earlier, not tomorrow's (until asked)
  const tasks = page.locator(".morning-task");
  await expect(tasks).toHaveCount(2);
  await expect(tasks.first()).toContainText("לתאם משאבה");
  await expect(tasks.first()).toContainText("מ-" + shown(-2));
  // the task list's X mark: partly done, done (stays on the report), open again
  const iron = tasks.filter({ hasText: "לבדוק ברזל" });
  await expect(iron.locator(".row-mark svg")).toBeVisible();
  await iron.locator(".row-mark").click();
  await expect(iron).toHaveClass(/partial/);
  await expect.poll(async () => (await server(page)).tasks.find((t) => t.id === "t1").status).toBe(1);
  await iron.locator(".row-mark").click();
  await expect(iron).toHaveClass(/done/);
  await expect.poll(async () => (await server(page)).tasks.find((t) => t.id === "t1").status).toBe(2);
  await iron.locator(".row-mark").click();
  await expect.poll(async () => (await server(page)).tasks.find((t) => t.id === "t1").status).toBe(0);
  await page.locator(".morning-more", { hasText: "הצג גם את השבוע הקרוב" }).click();
  await expect(tasks).toHaveCount(3);
  await expect(tasks.filter({ hasText: "להזמין בטון" })).toContainText("⏰ 08:00");

  // 3. plans: under way / late / starting soon; the rest on request
  const rows = page.locator(".morning-plan-row");
  await expect(rows).toHaveCount(2);
  await expect(rows.filter({ hasText: "יציקת תקרה" })).toContainText("באיחור");
  const bar = rows.filter({ hasText: "יציקת תקרה" }).locator(".wp-diary-pct");
  await expect(bar).toHaveText("40%");
  const box = await bar.boundingBox();
  await bar.click({ position: { x: box.width * 0.4, y: box.height / 2 } });
  await expect(bar).toHaveText("60%");
  await expect(bar).toHaveClass(/set/);
  await expect.poll(async () => (await server(page)).workPlan.find((x) => x.id === "w1").progress).toBe(60);
  await page.locator(".morning-more", { hasText: "הצג את כל התוכנית" }).click();
  await expect(rows).toHaveCount(3);
  await expect(rows.filter({ hasText: "ריצוף" })).toContainText("מתחילה ב-" + shown(12));

  // ...and today's diary has it in מתוכנן מול ביצוע
  await page.locator("#morningBackBtn").click();
  await page.locator("#calendarFabBtn").click();
  await page.locator("#siteLogPlanBtn").click();
  const diaryBar = page.locator(".wp-diary-row", { hasText: "יציקת תקרה" }).locator(".wp-diary-pct");
  await expect(diaryBar).toHaveText("60%");
  await expect(diaryBar).toHaveClass(/set/);
});

test("nothing on: the report says so", async ({ page }) => {
  await openWithSharedProject(page, { phone: ME, native: true, sheet: { id: "p1", name: "בניין A", members: [ME], tasks: [] } });
  await openReport(page);
  await expect(page.locator("#morningBody")).toContainText("אין משהו דחוף");
  await expect(page.locator("#morningBody")).toContainText("אין משימות פתוחות להיום");
  await expect(page.locator(".morning-plan-row")).toHaveCount(0);
});

test("budget overruns in שים לב - for whoever may see the money", async ({ page }) => {
  await openWithSharedProject(page, { phone: ME, native: true, sheet: { id: "p1", name: "בניין A", members: [ME], tasks: [] } });
  await page.evaluate(() => {
    window.__backend.tables.project_finance = [
      { owner_phone: "+972500000001", project_id: "p1", data_version: 1, data: {
        items: [{ id: "i1", code: "02.010", name: "יסודות", qty: 10, price: 1000, cost: 1000, progress: 10 },
          { id: "i2", code: "03.010", name: "טיח", qty: 10, price: 100, cost: 1000, progress: 50 }],
        generalBudget: { insurance: 500 },
        expenses: [{ id: "e1", date: "2026-10-01", category: "materials", itemId: "i1", amount: 600 },
          { id: "e2", date: "2026-10-01", category: "materials", itemId: "i2", amount: 400 },
          { id: "e3", date: "2026-10-01", category: "insurance", amount: 800 }] } },
      // someone else's money for the same project id: not this phone's to see
      { owner_phone: "+972509999999", project_id: "p1", data_version: 1, data: {
        items: [{ id: "x", code: "99", name: "של אחר", qty: 1, price: 1, cost: 10, progress: 0 }],
        expenses: [{ id: "y", category: "materials", itemId: "x", amount: 100 }] } },
    ];
  });
  await openReport(page);
  const att = page.locator(".morning-attention");
  // 60% spent for 10% done -> at that pace 6,000: 5,000 over
  await expect(att).toContainText("02.010 יסודות: נוצל 60% מהתקציב, בוצע רק 10%");
  await expect(att).toContainText("חריגה צפויה: 5,000 ₪");
  await expect(att).toContainText("ביטוחים: מעבר לתקציב");
  await expect(att).toContainText("חריגה צפויה: 300 ₪");
  await expect(att).not.toContainText("טיח"); // 40% spent, 50% done: fine
  await expect(att).not.toContainText("של אחר");
});
