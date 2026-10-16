const { test, expect } = require("@playwright/test");
const { openLocalApp, addTask } = require("./helpers/local-app");

// Core task-list behaviour, offline (local-only mode).
test.use({ viewport: { width: 390, height: 800 }, serviceWorkers: "block" });

test("add a task, cycle its status, and it survives a reload", async ({ page }) => {
  await openLocalApp(page);
  const row = await addTask(page, "לקנות ברזל");
  await expect(row).not.toHaveClass(/partial|done/);
  await row.click();
  await expect(row).toHaveClass(/partial/);
  await row.click();
  await expect(row).toHaveClass(/done/);

  await page.reload();
  await page.locator("#appRoot").waitFor({ state: "visible" });
  await expect(page.locator("#taskList li.task", { hasText: "לקנות ברזל" })).toHaveClass(/done/);
});

test("a note is added as a note, not a task", async ({ page }) => {
  await openLocalApp(page);
  const row = await addTask(page, "להתקשר לקבלן", "note");
  // tapping a note doesn't mark it like a task
  await row.click();
  await expect(row).not.toHaveClass(/partial|done/);
});

test("project tabs are in alphabetical order (numbers as numbers)", async ({ page }) => {
  const sheet = (id, name) => ({ id, name, tasks: [], reports: [], files: [] });
  await openLocalApp(page, { data: { activeSheetId: "s1", sheets: [
    sheet("s1", "גשר"), sheet("s2", "אולם"), sheet("s3", "פרויקט 10"), sheet("s4", "בניין"), sheet("s5", "פרויקט 2"),
  ] } });
  await expect(page.locator("#sheetsBarPrivate .sheet-tab:not(.add-sheet-tab)")).toHaveText([/אולם/, /בניין/, /גשר/, /פרויקט 2/, /פרויקט 10/]);
});
