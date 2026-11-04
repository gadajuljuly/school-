const { test, expect } = require("@playwright/test");
const { openLocalApp } = require("./helpers/local-app");

// On a computer: the browser offers installing (beforeinstallprompt); the
// bar shows, the first click anywhere opens the browser's own dialog, "✕"
// puts it off for good. A wide screen uses the width, projects on top.
test.use({ viewport: { width: 1440, height: 860 }, serviceWorkers: "block" });

const fakeInstallOffer = (page) => page.evaluate(() => {
  window.__prompted = 0;
  const e = new Event("beforeinstallprompt", { cancelable: true });
  e.prompt = () => { window.__prompted++; };
  e.userChoice = Promise.resolve({ outcome: "accepted" });
  window.dispatchEvent(e);
});

test("the install bar: shows when offered, the first click opens the dialog", async ({ page }) => {
  await openLocalApp(page);
  await expect(page.locator("#installBar")).toBeHidden();
  await fakeInstallOffer(page);
  await expect(page.locator("#installBar")).toBeVisible();
  await page.locator("#menuBtn").click(); // any click
  expect(await page.evaluate(() => window.__prompted)).toBe(1);
  await expect(page.locator("#installBar")).toBeHidden(); // accepted
});

test("the install bar: ✕ puts it off for good; wide screen keeps the tabs on top", async ({ page }) => {
  await openLocalApp(page);
  const box = await page.locator(".app").boundingBox();
  expect(box.width).toBeGreaterThan(1000);
  await fakeInstallOffer(page);
  await page.locator("#installOffBtn").click();
  await expect(page.locator("#installBar")).toBeHidden();
  expect(await page.evaluate(() => window.__prompted)).toBe(0);
  await page.reload();
  await page.locator("#appRoot").waitFor({ state: "visible" });
  await fakeInstallOffer(page);
  await expect(page.locator("#installBar")).toBeHidden();
});

test("the install bar never shows in the phone app", async ({ page }) => {
  await openLocalApp(page, { native: true });
  await page.waitForTimeout(300);
  const dismissed = page.locator("#confirmOverlay");
  if (await dismissed.isVisible()) await page.locator("#confirmNoBtn").click().catch(() => {});
  await fakeInstallOffer(page);
  await expect(page.locator("#installBar")).toBeHidden();
});
