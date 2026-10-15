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
