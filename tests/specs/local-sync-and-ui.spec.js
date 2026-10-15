const { test, expect } = require("@playwright/test");
const { openLocalApp, longPress, addTask } = require("./helpers/local-app");

test.use({ viewport: { width: 390, height: 800 }, serviceWorkers: "block" });

async function withHooks(page) {
  await page.addInitScript(() => {
    window.__itaskTestHooks = (h) => { window.__hooks = h; };
  });
}

// Shared projects: when saving, the app merges its own changes into the
// latest server copy item by item (tasks, reports...). These are the rules
// that keep two members editing at once from losing each other's work.
test("shared-project merge keeps everyone's changes", async ({ page }) => {
  await withHooks(page);
  await openLocalApp(page);
  const r = await page.evaluate(() => {
    const merge = window.__hooks.mergeSharedArrayByLocalChanges;
    const ids = (arr) => arr.map((i) => i.id + ":" + i.v).sort();
    const synced = [{ id: "a", v: 1 }, { id: "b", v: 1 }, { id: "c", v: 1 }, { id: "d", v: 1 }];
    const local = [
      { id: "a", v: 1 },        // untouched here
      { id: "b", v: 2 },        // edited here
      // c deleted here
      { id: "d", v: 1 },        // untouched here (deleted remotely)
      { id: "e", v: 1 },        // added here
    ];
    const fresh = [
      { id: "a", v: 5 },        // edited remotely
      { id: "b", v: 1 },
      { id: "c", v: 1 },
      // d deleted remotely
      { id: "f", v: 1 },        // added remotely
    ];
    return ids(merge(fresh, local, synced));
  });
  expect(r).toEqual(["a:5", "b:2", "e:1", "f:1"]);
});

test("tapping the date opens the simple date picker and moves to the chosen day", async ({ page }) => {
  await openLocalApp(page, { native: true });
  await page.locator("#dateInput").click({ force: true });
  await expect(page.locator("#datePickOverlay")).toBeVisible();
  const today = new Date();
  const target = today.getDate() === 1 ? 2 : 1; // another day of this month
  await page.locator("#datePickGrid .date-pick-day", { hasText: new RegExp(`^${target}$`) }).click();
  await expect(page.locator("#datePickOverlay")).toBeHidden();
  const pad = (n) => String(n).padStart(2, "0");
  await expect(page.locator("#dateLabel")).toHaveText(`${pad(target)}/${pad(today.getMonth() + 1)}/${today.getFullYear()}`);
});

test("quoting a task in the project chat shows the quote above the input", async ({ page }) => {
  await withHooks(page);
  await openLocalApp(page);
  const pad = (n) => String(n).padStart(2, "0");
  const d = new Date();
  const today = `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`;
  await page.evaluate((today) => window.__hooks.addSharedSheetForTest({
    id: "sh1", name: "משותף", shared: true, members: [], memberNames: {}, messages: [], reports: [], siteLogs: [],
    tasks: [{ id: "k1", text: "לבדוק יציקה", status: 0, type: "task", date: today, createdAt: 1 }],
  }), today);
  const row = page.locator("#taskList li.task", { hasText: "לבדוק יציקה" });
  await longPress(page, row);
  await page.locator("#taskChatQuoteBtn").click();
  await expect(page.locator("#chatView")).toBeVisible();
  await expect(page.locator("#chatReplyBar")).toBeVisible();
  await expect(page.locator("#chatReplyText")).toHaveText("לבדוק יציקה");
  await expect(page.locator("#chatReplySender")).toContainText("משימה");
});

test("small phone: the diary icons don't run under its buttons", async ({ page }) => {
  await page.setViewportSize({ width: 360, height: 640 });
  await openLocalApp(page);
  await page.locator("#calendarFabBtn").click();
  await expect(page.locator("#diaryView")).toBeVisible();
  const last = await page.locator("#siteLogProcurementBtn").boundingBox();
  const buttons = await page.locator(".diary-actions-fixed").boundingBox();
  expect(last.y + last.height).toBeLessThanOrEqual(buttons.y + 1);
});
