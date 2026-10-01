const { test, expect } = require("@playwright/test");

// Firebase "phone numbers for testing" (Firebase Console > Authentication >
// Sign-in method > Phone > Phone numbers for testing). Signing in with this
// exact number and code never sends a real SMS and never touches a real
// person's account - that's the whole point of the feature - so these are
// safe to hardcode and run on every push.
const TEST_PHONE_LOCAL = "0500000001";
const TEST_CODE = "123456";

async function login(page) {
  // Surfaces the browser's own console/errors in the CI log, and whatever
  // Firebase actually put in #authError, instead of just a bare "stayed
  // hidden" timeout - needed to diagnose sign-in failures that only happen
  // in CI (datacenter IP, no local repro possible for this app).
  page.on("console", (msg) => console.log(`[browser:${msg.type()}] ${msg.text()}`));
  page.on("pageerror", (err) => console.log(`[pageerror] ${err}`));

  // ?e2e=1 makes tasks.html disable Firebase's reCAPTCHA app-verification
  // step (see the e2e check next to firebaseAuth's init) - CI runners use
  // datacenter IPs that Google's invisible reCAPTCHA routinely blocks, which
  // has nothing to do with the test phone number itself (that only skips
  // the real SMS).
  await page.goto("/tasks.html?e2e=1");
  await page.locator("#authPhone").fill(TEST_PHONE_LOCAL);
  await page.locator("#authSendCodeBtn").click();

  const codeForm = page.locator("#authCodeForm");
  const errorBox = page.locator("#authError");
  await expect(codeForm.or(errorBox)).toBeVisible({ timeout: 20000 });
  if (await errorBox.isVisible()) {
    throw new Error("Firebase sign-in failed: " + (await errorBox.textContent()));
  }

  await page.locator("#authCode").fill(TEST_CODE);
  await page.locator("#authVerifyCodeBtn").click();

  const appRoot = page.locator("#appRoot");
  const codeErrorBox = page.locator("#authCodeError");
  await expect(appRoot.or(codeErrorBox)).toBeVisible({ timeout: 20000 });
  if (await codeErrorBox.isVisible()) {
    throw new Error("Firebase code verification failed: " + (await codeErrorBox.textContent()));
  }
  await expect(page.locator("#appLoadingOverlay")).toBeHidden({ timeout: 15000 });
}

test("login, create a project, add a task, cycle its status, clean up", async ({ page }) => {
  await login(page);

  const projectName = "E2E " + Date.now();

  // Create a new private project and name it - addSheet() auto-opens the
  // rename input, matching what a real user sees right after tapping "+".
  await page.locator("#sheetsBarPrivate .add-sheet-tab").click();
  const renameInput = page.locator("#sheetsBarPrivate .rename-input");
  await expect(renameInput).toBeVisible();
  await renameInput.fill(projectName);
  await renameInput.press("Enter");
  await expect(page.locator("#sheetTitle")).toHaveText(projectName);

  // Add a task to it.
  const taskText = "Playwright test task";
  await page.locator("#taskInput").fill(taskText);
  await page.locator("#addForm button[type=submit]").click();
  const taskRow = page.locator("#taskList li.task", { hasText: taskText });
  await expect(taskRow).toBeVisible();
  await expect(taskRow).not.toHaveClass(/done/);

  // Tapping a task cycles it open -> partial -> done.
  await taskRow.click();
  await expect(taskRow).toHaveClass(/partial/);
  await taskRow.click();
  await expect(taskRow).toHaveClass(/done/);

  // Clean up: there's no per-task delete in this app (by design - it's a
  // notebook, not a to-do list you erase from), so the whole throwaway
  // project is deleted instead, via the same long-press-the-tab flow a
  // real user would use.
  const tab = page.locator("#sheetsBarPrivate .sheet-tab", { hasText: projectName });
  const box = await tab.boundingBox();
  if (!box) throw new Error("project tab not found for cleanup");
  await page.mouse.move(box.x + box.width / 2, box.y + box.height / 2);
  await page.mouse.down();
  await page.waitForTimeout(1200);
  await page.mouse.up();
  await expect(page.locator("#sheetActionOverlay")).toBeVisible();
  await page.locator("#sheetActionDeleteBtn").click();
  await expect(page.locator("#confirmOverlay")).toBeVisible();
  await page.locator("#confirmYesBtn").click();
  await expect(page.locator("#sheetsBarPrivate .sheet-tab", { hasText: projectName })).toHaveCount(0);
});
