const { test, expect } = require("@playwright/test");
const { openWithSharedProject } = require("./helpers/local-app");

// On a computer: files dragged in from the desktop go into the folder whose
// tile they're dropped on, or into the open folder.
test.use({ viewport: { width: 1440, height: 860 }, serviceWorkers: "block" });

const ME = "+972500000001";
const folders = (page) => page.evaluate(() => window.__backend.tables.shared_projects[0].data.folders || []);
const filesIn = async (page, key) => { const f = (await folders(page)).find((x) => x.key === key || x.name === key); return f ? (f.files || []).map((x) => x.name).sort() : null; };

// a drag of files from outside the page, as the browser delivers it
async function dropFiles(page, selector, names) {
  const dt = await page.evaluateHandle((names) => {
    const dt = new DataTransfer();
    names.forEach((n) => dt.items.add(new File(["%PDF-1.4 " + n], n, { type: "application/pdf" })));
    return dt;
  }, names);
  const el = page.locator(selector);
  await el.dispatchEvent("dragenter", { dataTransfer: dt });
  await el.dispatchEvent("dragover", { dataTransfer: dt });
  return { dt, el };
}

test("files dropped on a folder tile go into that folder; dropped in an open folder go there", async ({ page }) => {
  await openWithSharedProject(page, { phone: ME, sheet: { id: "p1", name: "בניין A", members: [ME], tasks: [] } });
  await page.locator("#libraryBtn").click();
  const tile = "#libraryFoldersGrid .library-folder-tile:has-text('תוכניות')";
  await expect(page.locator(tile)).toBeVisible();

  // onto the tile: it lights up, then both files land in it
  const { dt, el } = await dropFiles(page, tile, ["a.pdf", "b.pdf"]);
  await expect(page.locator(tile)).toHaveClass(/library-drop-over/);
  await el.dispatchEvent("drop", { dataTransfer: dt });
  await expect(page.locator(tile)).not.toHaveClass(/library-drop-over/);
  await expect.poll(() => filesIn(page, "plans")).toEqual(["a.pdf", "b.pdf"]);

  // inside an open folder, anywhere in the view
  await page.locator("#libraryFoldersGrid .library-folder-tile", { hasText: "הזמנות רכש" }).click();
  await expect(page.locator("#libraryHeadTitle")).toHaveText("הזמנות רכש");
  const drop2 = await dropFiles(page, "#libraryView", ["order.pdf"]);
  await expect(page.locator("#libraryView")).toHaveClass(/library-drop-here/);
  await drop2.el.dispatchEvent("drop", { dataTransfer: drop2.dt });
  await expect(page.locator("#libraryView")).not.toHaveClass(/library-drop-here/);
  await expect.poll(() => filesIn(page, "procurementOrders")).toEqual(["order.pdf"]);
  await expect(page.locator("#libraryGrid .library-item", { hasText: "order.pdf" })).toBeVisible();
  expect(await page.evaluate(() => window.__backend.uploads.length)).toBe(3);
});

test("files dropped outside the library are not taken", async ({ page }) => {
  await openWithSharedProject(page, { phone: ME, sheet: { id: "p1", name: "בניין A", members: [ME], tasks: [] } });
  const { dt, el } = await dropFiles(page, "#appRoot", ["x.pdf"]);
  await el.dispatchEvent("drop", { dataTransfer: dt });
  await page.waitForTimeout(300);
  expect(await page.evaluate(() => window.__backend.uploads.length)).toBe(0);
});
