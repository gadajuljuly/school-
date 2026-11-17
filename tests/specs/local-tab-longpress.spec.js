const { test, expect } = require("@playwright/test");
const { openWithSharedProject } = require("./helpers/local-app");

// A long press - on a project's tab (its menu: delete, share, logo...) or on
// a task (its menu) - survives the page being drawn again in the middle of
// it: the app does that whenever the server answers (a sync, the shared
// projects' poll), so a press that happened to span one used to come to
// nothing.
test.use({ viewport: { width: 1280, height: 800 }, serviceWorkers: "block" });
const ME = "+972500000001";

// another member's change arriving: the page drawn again
const serverChange = () => {
  window.__backend.tables.shared_projects.forEach((r) => { r.data_version = (r.data_version || 1) + 1; });
  return window.__hooks.loadSharedSheets();
};

async function longPressWithRedraw(page, tab, redraw) {
  const box = await tab.boundingBox();
  await page.mouse.move(box.x + box.width / 2, box.y + box.height / 2);
  await page.mouse.down();
  await page.waitForTimeout(400);
  await page.evaluate(redraw); // the tabs drawn again under the finger
  await page.waitForTimeout(800);
  await page.mouse.up();
}

test("a long press on a project's tab opens its menu even when the tabs are redrawn during it", async ({ page }) => {
  await openWithSharedProject(page, { phone: ME, sheet: { id: "p1", name: "בניין A", members: [ME], tasks: [] } });
  await page.locator("#sheetsBarPrivate .add-sheet-tab").click();
  await page.locator("#sheetsBarPrivate .rename-input").fill("פרויקט בדיקה");
  await page.locator("#sheetsBarPrivate .rename-input").press("Enter");
  const tab = page.locator("#sheetsBarPrivate .sheet-tab", { hasText: "פרויקט בדיקה" });
  await longPressWithRedraw(page, tab, serverChange);
  await expect(page.locator("#sheetActionOverlay")).toBeVisible();
  // the press didn't also count as a tap (which would open the renaming)
  await expect(page.locator("#sheetsBarPrivate .rename-input")).toHaveCount(0);
  await page.locator("#sheetActionCancelBtn").click().catch(() => page.keyboard.press("Escape"));
});

test("a short press (a tap) with a redraw in the middle is still just a tap", async ({ page }) => {
  await openWithSharedProject(page, { phone: ME, sheet: { id: "p1", name: "בניין A", members: [ME], tasks: [] } });
  const tab = page.locator("#sheetsBarPrivate .sheet-tab").first();
  const box = await tab.boundingBox();
  await page.mouse.move(box.x + box.width / 2, box.y + box.height / 2);
  await page.mouse.down();
  await page.waitForTimeout(200);
  await page.evaluate(serverChange);
  await page.waitForTimeout(100);
  await page.mouse.up();
  await page.waitForTimeout(1200);
  await expect(page.locator("#sheetActionOverlay")).toBeHidden();
});

test("a long press on a task opens its menu even when the list is redrawn during it - and doesn't also tick it", async ({ page }) => {
  const today = new Date().toISOString().slice(0, 10);
  await openWithSharedProject(page, { phone: ME, sheet: { id: "p1", name: "בניין A", members: [ME], tasks: [{ id: "t1", text: "להזמין בטון", status: 0, type: "task", date: today, createdAt: 1 }] } });
  const row = page.locator("#taskList li.task", { hasText: "להזמין בטון" });
  await longPressWithRedraw(page, row.locator(".task-text, span").first(), serverChange);
  await expect(page.locator("#moveTaskOverlay")).toBeVisible();
  await expect(page.locator("#taskList li.task", { hasText: "להזמין בטון" })).not.toHaveClass(/partial|done/);
});

test("a new project's tab stays in sight once it gets its name (the tabs are in name order), and its long press works", async ({ page }) => {
  await page.setViewportSize({ width: 1280, height: 720 });
  await openWithSharedProject(page, { phone: ME, sheet: { id: "p1", name: "בניין A", members: [ME], tasks: [] } });
  // many projects before it: its tab's place, once named, is far along the bar
  for (let i = 0; i < 16; i++) {
    await page.locator("#sheetsBarPrivate .add-sheet-tab").click();
    await page.locator("#sheetsBarPrivate .rename-input").fill("E2E 17630" + String(i).padStart(5, "0"));
    await page.locator("#sheetsBarPrivate .rename-input").press("Enter");
  }
  await page.locator("#sheetsBarPrivate .add-sheet-tab").click();
  await page.locator("#sheetsBarPrivate .rename-input").fill("E2E 1763999999");
  await page.locator("#sheetsBarPrivate .rename-input").press("Enter");
  const tab = page.locator("#sheetsBarPrivate .sheet-tab", { hasText: "E2E 1763999999" });
  await expect.poll(async () => {
    const b = await tab.boundingBox();
    return b && b.x >= 0 && b.x + b.width <= 1280;
  }).toBe(true);
  await longPressWithRedraw(page, tab, () => 0);
  await expect(page.locator("#sheetActionOverlay")).toBeVisible();
});
