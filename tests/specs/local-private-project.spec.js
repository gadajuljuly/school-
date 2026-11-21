const { test, expect } = require("@playwright/test");
const { openWithSharedProject, longPress } = require("./helpers/local-app");

// "פרטי" on a shared project (its long-press menu): the project stays its
// members', kept from the head office (the server's own rules do the real
// hiding - supabase/sql/shared_projects_private.sql, tested in
// supabase/tests/rls_head_office.sql; here the app's side).
test.use({ viewport: { width: 1280, height: 800 }, serviceWorkers: "block" });
const ME = "+972500000001";
const row = (page) => page.evaluate(() => window.__backend.tables.shared_projects.find((r) => r.id === "fam"));

test("mark a shared project private, and back; the head office's tabs leave it out", async ({ page }) => {
  await openWithSharedProject(page, { phone: ME, sheets: [
    { id: "work", name: "רכבת נתניה", members: [ME], tasks: [] },
    { id: "fam", name: "משפחה", members: [ME, "+972500000009"], tasks: [] },
  ] });
  const tab = page.locator("#sheetsBarShared .sheet-tab", { hasText: "משפחה" });
  await longPress(page, tab);
  const btn = page.locator("#sheetActionPrivateBtn");
  await expect(btn).toBeVisible();
  await expect(btn).toHaveText("🔒 פרטי – לא יוצג במשרד הראשי");
  await btn.click();
  await expect.poll(async () => (await row(page)).hidden_from_office).toBe(true);
  await expect(tab).toContainText("🔒");
  await expect(page.locator("#appToast")).toContainText("המשרד הראשי לא רואה אותו");

  // Head Office mode (this phone runs an office group): the private project isn't among its tabs
  await page.evaluate((me) => {
    window.__backend.tables.office_groups = [{ id: "g1", creator_phone: me }];
    return window.__hooks.loadMyOfficeGroups();
  }, ME);
  await page.locator("#headOfficeIconBtn").click();
  await expect(page.locator(".sheet-tab", { hasText: "רכבת נתניה" })).toBeVisible();
  await expect(page.locator(".sheet-tab", { hasText: "משפחה" })).toHaveCount(0);
  await page.locator("#headOfficeIconBtn").click();

  // and back: not private
  await longPress(page, page.locator("#sheetsBarShared .sheet-tab", { hasText: "משפחה" }));
  await expect(btn).toHaveText("🔓 ביטול פרטי – יוצג במשרד הראשי");
  await btn.click();
  await expect.poll(async () => (await row(page)).hidden_from_office).toBe(false);
  await expect(page.locator("#sheetsBarShared .sheet-tab", { hasText: "משפחה" })).toContainText("👥");
});

test("'פרטי' is offered for shared projects only", async ({ page }) => {
  await openWithSharedProject(page, { phone: ME, sheet: { id: "work", name: "רכבת נתניה", members: [ME], tasks: [] } });
  await longPress(page, page.locator("#sheetsBarPrivate .sheet-tab").first());
  await expect(page.locator("#sheetActionOverlay")).toBeVisible();
  await expect(page.locator("#sheetActionPrivateBtn")).toBeHidden();
});
