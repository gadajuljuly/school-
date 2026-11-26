const { test, expect } = require("@playwright/test");
const { openWithSharedProject } = require("./helpers/local-app");

// The toolbox stays open through a re-render (a quiet refresh a second after
// opening it used to close it - it opened only on the second try), and
// closes when the project (or the page) changes.
test.use({ viewport: { width: 390, height: 800 }, serviceWorkers: "block" });

const ME = "+972500000001";

test("the toolbox stays open when the page re-renders", async ({ page }) => {
  await openWithSharedProject(page, { phone: ME, sheet: { id: "p1", name: "בניין A", members: [ME], tasks: [{ id: "t1", text: "יציקה", status: 0, type: "task", date: new Date().toISOString().slice(0, 10), createdAt: 1 }] } });
  await page.locator("#toolboxBtn").click();
  await expect(page.locator("#toolboxPop")).toBeVisible();
  // a refresh: another member's change arriving, the page drawn again
  await page.evaluate(() => window.__hooks.updateSharedTaskForTest("p1", "t1", (t) => { t.text = "יציקה 2"; }));
  await expect(page.locator("#taskList")).toContainText("יציקה 2");
  await expect(page.locator("#toolboxPop")).toBeVisible();
  // another project: it closes
  await page.evaluate(() => window.__hooks.addSharedSheetForTest({ id: "p2", name: "בניין B", shared: true, members: ["+972500000001"], memberNames: {}, messages: [], reports: [], siteLogs: [], tasks: [], createdBy: "+972500000001", _syncedData: { tasks: [], reports: [], siteLogs: [] } }));
  await expect(page.locator("#toolboxPop")).toBeHidden();
});
