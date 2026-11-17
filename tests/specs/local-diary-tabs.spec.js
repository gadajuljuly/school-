const { test, expect } = require("@playwright/test");
const { openWithSharedProject } = require("./helpers/local-app");

// The diary as a binder (src/app/11i-diary-tabs.js): tabs down its left
// side - the whole diary, then each part's page by its icon.
test.use({ viewport: { width: 390, height: 844 }, serviceWorkers: "block" });
const ME = "+972500000001";
const today = () => { const d = new Date(), p = (n) => String(n).padStart(2, "0"); return d.getFullYear() + "-" + p(d.getMonth() + 1) + "-" + p(d.getDate()); };

test("the tabs: the diary, then each part's page beside them; filled parts dotted; gone off the diary", async ({ page }) => {
  const log = { id: "l1", date: today(), attendance: { workers: [{ id: "a1", name: "מוחמד" }] }, tools: {}, works: [], contractors: [], procurement: [], photos: [], planned: [] };
  await openWithSharedProject(page, { phone: ME, sheet: { id: "p1", name: "בניין A", members: [ME], tasks: [], siteLogs: [log] } });
  await expect(page.locator("#diaryTabs")).toBeHidden();
  await page.locator("#calendarFabBtn").click();
  const tabs = page.locator("#diaryTabs .diary-tab");
  await expect(page.locator("#diaryTabs")).toBeVisible();
  await expect(tabs).toHaveCount(8);
  await expect(page.locator(".diary-tab.on")).toHaveAttribute("data-tab", "home");
  await expect(page.locator(".diary-tab.filled")).toHaveCount(1);
  await expect(page.locator(".diary-tab.filled")).toHaveAttribute("data-tab", "attendance");
  // the tabs on the left, the diary's page beside them
  const tb = await page.locator("#diaryTabs").boundingBox();
  expect(tb.x).toBeLessThan(40);
  // attendance: its page in the binder, right of the tabs, the footer still there
  await page.locator(".diary-tab[data-tab=attendance]").click();
  await expect(page.locator("#siteLogAttendanceView")).toBeVisible();
  await expect(page.locator("#diaryView")).toBeHidden();
  await expect(page.locator(".diary-tab.on")).toHaveAttribute("data-tab", "attendance");
  const pg = await page.locator("#siteLogAttendanceView").boundingBox();
  expect(pg.x).toBeGreaterThanOrEqual(tb.x + 50);
  await expect(page.locator("#tasksFabBtn")).toBeVisible();
  // straight to another part
  await page.locator(".diary-tab[data-tab=works]").click();
  await expect(page.locator("#siteLogWorksView")).toBeVisible();
  await expect(page.locator("#siteLogAttendanceView")).toBeHidden();
  // photos, and back with its own back button
  await page.locator(".diary-tab[data-tab=photos]").click();
  await expect(page.locator("#diaryPhotosView")).toBeVisible();
  await expect(page.locator("#siteLogWorksView")).toBeHidden();
  await page.locator("#diaryPhotosBackBtn").click();
  await expect(page.locator("#diaryView")).toBeVisible();
  await expect(page.locator(".diary-tab.on")).toHaveAttribute("data-tab", "home");
  // a part's own back button: the diary
  await page.locator(".diary-tab[data-tab=tools]").click();
  await page.locator("#siteLogToolsBackBtn").click();
  await expect(page.locator("#diaryView")).toBeVisible();
  // the tasks page from the footer while a part is open: the part closes, the tabs go
  await page.locator(".diary-tab[data-tab=procurement]").click();
  await expect(page.locator("#siteLogProcurementView")).toBeVisible();
  await page.locator("#tasksFabBtn").click();
  await expect(page.locator("#siteLogProcurementView")).toBeHidden();
  await expect(page.locator("#diaryTabs")).toBeHidden();
});
