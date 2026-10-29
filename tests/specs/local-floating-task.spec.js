const { test, expect } = require("@playwright/test");
const { openLocalApp } = require("./helpers/local-app");

// The floating task (the phone shows it, every quarter hour 06:00-18:00):
// the app asks once for "display over other apps", and the menu has its
// switch. Fake phone: window.__native records the calls.
test.use({ viewport: { width: 390, height: 800 }, serviceWorkers: "block" });

const native = (page) => page.evaluate(() => window.__native);

test("without the permission: asked once on opening; the menu offers it again and switches it off", async ({ page }) => {
  await page.addInitScript(() => { window.__floatNoPermission = true; });
  await openLocalApp(page, { native: true });
  await expect(page.locator("#confirmOverlay")).toBeVisible();
  await expect(page.locator("#confirmOverlay")).toContainText("הצגה מעל אפליקציות אחרות");
  await page.locator("#confirmYesBtn").click();
  expect((await native(page)).floatSettingsOpened).toBe(1);

  // not asked again
  await page.reload();
  await page.locator("#appRoot").waitFor({ state: "visible" });
  await page.waitForTimeout(500);
  await expect(page.locator("#confirmOverlay")).toBeHidden();

  // the menu: on, with the permission button
  await page.locator("#menuBtn").click();
  await expect(page.locator("#floatMenuSection")).toBeVisible();
  await expect(page.locator("#floatToggle")).toBeChecked();
  await page.locator("#floatAllowBtn").click();
  expect((await native(page)).floatSettingsOpened).toBe(1); // (the fake phone starts afresh on reload)
  await page.locator("#floatToggle").uncheck();
  await expect.poll(async () => (await native(page)).floatOn).toBe(false);
  await expect(page.locator("#floatAllowBtn")).toBeHidden();
});

test("with the permission: nothing asked; the switch is in the menu", async ({ page }) => {
  await openLocalApp(page, { native: true });
  await page.waitForTimeout(500);
  await expect(page.locator("#confirmOverlay")).toBeHidden();
  await page.locator("#menuBtn").click();
  await expect(page.locator("#floatToggle")).toBeChecked();
  await expect(page.locator("#floatAllowBtn")).toBeHidden();
});

test("in a browser (no phone app) there's no such switch", async ({ page }) => {
  await openLocalApp(page);
  await page.locator("#menuBtn").click();
  await expect(page.locator("#floatMenuSection")).toBeHidden();
});
