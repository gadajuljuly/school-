const { test, expect } = require("@playwright/test");
const { openWithSharedProject, addTask } = require("./helpers/local-app");

// The phone and the computer side by side (01b-private-sync.js): a save never
// goes over the other device's newer one - it's merged in first; the other
// device's changes come in while the app is open; signing in on one never
// signs the other out; which project is open stays each device's own.
test.use({ viewport: { width: 390, height: 800 }, serviceWorkers: "block" });

const ME = "+972500000001";
const SHARED = { id: "p1", name: "כביש הדקלים", members: [ME], tasks: [] };
const row = (page) => page.evaluate(() => (window.__backend.tables.app_state || [])[0] || null);
const privateTasks = async (page) => {
  const r = await row(page);
  return r ? r.data.sheets.flatMap((s) => (s.tasks || []).map((t) => t.text)).sort() : [];
};
// the computer saves: a task added to the first private project
const otherDeviceAdds = (page, text) => page.evaluate((text) => {
  const r = window.__backend.tables.app_state[0];
  r.data.sheets[0].tasks.push({ id: "pc-" + text.length + "-" + Date.now(), text, status: 0, urgent: false, type: "task", date: new Date().toISOString().slice(0, 10), createdAt: Date.now() });
  r.data.activeSheetId = "somewhere-else";
  r.updated_at = new Date(Date.now() + 1000).toISOString();
}, text);

async function openPrivate(page) {
  await openWithSharedProject(page, { phone: ME, sheet: SHARED });
  await page.locator("#sheetsBarPrivate .sheet-tab:not(.add-sheet-tab)").first().click();
}

test("a save merges the other device's newer save instead of overwriting it", async ({ page }) => {
  await openPrivate(page);
  await addTask(page, "מהטלפון 1");
  await expect.poll(() => privateTasks(page)).toEqual(["מהטלפון 1"]);

  await otherDeviceAdds(page, "מהמחשב");
  await addTask(page, "מהטלפון 2");
  await expect.poll(() => privateTasks(page)).toEqual(["מהטלפון 1", "מהטלפון 2", "מהמחשב"]);
  // ...and the computer's task shows here too (once the new-task field is
  // left); the open project stayed this device's
  await page.locator("#taskInput").blur();
  await expect(page.locator("#taskList li.task", { hasText: "מהמחשב" })).toBeVisible();
  expect((await row(page)).data.activeSheetId).not.toBe("somewhere-else");
});

test("the other device's changes come in while the app is open; a deletion here stays deleted", async ({ page }) => {
  await openPrivate(page);
  await addTask(page, "למחיקה");
  await addTask(page, "נשארת");
  await expect.poll(() => privateTasks(page)).toEqual(["למחיקה", "נשארת"]);

  await otherDeviceAdds(page, "חדשה מהמחשב");
  await page.locator("#taskInput").blur();
  await page.evaluate(() => document.dispatchEvent(new Event("visibilitychange")));
  await expect(page.locator("#taskList li.task", { hasText: "חדשה מהמחשב" })).toBeVisible();

  // deleted here after that: gone on the server too, the computer's task kept
  await page.locator("#taskList li.task", { hasText: "למחיקה" }).locator(".task-actions button").first().click();
  await page.locator("#confirmYesBtn").click();
  await expect.poll(() => privateTasks(page)).toEqual(["חדשה מהמחשב", "נשארת"]);
});

test("signing in on another device no longer signs this one out", async ({ page }) => {
  await openPrivate(page);
  await addTask(page, "משימה");
  await page.evaluate(() => { const r = window.__backend.tables.app_state[0]; r.session_token = "another-device"; });
  await page.evaluate(() => document.dispatchEvent(new Event("visibilitychange")));
  await page.waitForTimeout(800);
  await expect(page.locator("#appRoot")).toBeVisible();
  await expect(page.locator("#authGate")).toBeHidden();
});
