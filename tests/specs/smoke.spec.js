const { test, expect } = require("@playwright/test");

test("app shell loads and shows the phone login screen", async ({ page }) => {
  await page.goto("/tasks.html");
  await expect(page).toHaveTitle(/ITASK/);
  await expect(page.locator("#authGate")).toBeVisible();
  await expect(page.locator("#authPhone")).toBeVisible();
  await expect(page.locator("#appRoot")).toBeHidden();
});
