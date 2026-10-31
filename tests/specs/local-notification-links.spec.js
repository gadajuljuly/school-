const { test, expect } = require("@playwright/test");
const { openWithSharedProject } = require("./helpers/local-app");

// A tapped notification lands where it's about, whatever screen was open:
// a reminder on its task (on the task's own day), a work-plan notice on
// that project's plan with the activity picked out.
test.use({ viewport: { width: 390, height: 800 }, serviceWorkers: "block" });

const ME = "+972500000001";
const pad = (n) => String(n).padStart(2, "0");
const iso = (delta) => { const d = new Date(); d.setDate(d.getDate() + delta); return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`; };
const SHEETS = [
  { id: "p1", name: "בניין A", members: [ME], tasks: [{ id: "t1", text: "לבדוק ברזל", status: 0, type: "task", date: iso(0), createdAt: 1 }],
    workPlan: [{ id: "w1", name: "יציקת תקרה", start: iso(-3), end: iso(5), status: "prog", progress: 20, by: "" }] },
  { id: "p2", name: "בניין B", members: [ME], tasks: [{ id: "t9", text: "להזמין בטון", status: 0, type: "task", date: iso(3), createdAt: 1 }] },
];
const tap = (page, view) => page.evaluate((v) => window.__native.listeners.launchView({ view: v }), view);

test("a reminder: from another project's open screen, straight to the task, on its day", async ({ page }) => {
  await openWithSharedProject(page, { phone: ME, native: true, sheets: SHEETS });
  await expect.poll(() => page.evaluate(() => !!(window.__native.listeners && window.__native.listeners.launchView))).toBe(true);
  // somewhere else: בניין A's diary, then its work plan
  await page.locator(".sheet-tab", { hasText: "בניין A" }).click();
  await page.locator("#calendarFabBtn").click();
  await expect(page.locator("#diaryView")).toBeVisible();
  // the reminder of בניין B's task, three days from now (the link has no date)
  await tap(page, "task|p2||t9");
  await expect(page.locator("#diaryView")).toBeHidden();
  await expect(page.locator(".sheet-tab.active")).toContainText("בניין B");
  await expect(page.locator("#taskList li.task", { hasText: "להזמין בטון" })).toBeVisible();
});

test("a work-plan notice: that project's plan, the activity picked out", async ({ page }) => {
  await openWithSharedProject(page, { phone: ME, native: true, sheets: SHEETS });
  await expect.poll(() => page.evaluate(() => !!(window.__native.listeners && window.__native.listeners.launchView))).toBe(true);
  await expect(page.locator(".sheet-tab.active")).toContainText("בניין B");
  await tap(page, "workplan|p1|w1");
  await expect(page.locator("#workPlanView")).toBeVisible();
  await expect(page.locator("#workPlanTitle")).toContainText("בניין A");
  await expect(page.locator('#workPlanView [data-id="w1"]')).toHaveClass(/link-flash/);
  // the work-plan notices carry that view
  const alarms = await page.evaluate(() => (window.__native.alarms || []).filter((a) => a.id.startsWith("plan-")));
  for (const a of alarms) expect(a.view).toMatch(/^workplan\|/);
});
