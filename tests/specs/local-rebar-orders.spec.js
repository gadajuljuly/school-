const { test, expect } = require("@playwright/test");
const { openWithSharedProject } = require("./helpers/local-app");

// 🧱 הזמנת ברזל (src/app/14o-rebar-orders.js): a table of bars - number,
// sketch (shapes / by hand / mesh), diameter, length, kg per metre, units,
// weight - printed or shared as a PDF; kept on the shared project.
test.use({ viewport: { width: 390, height: 800 }, serviceWorkers: "block" });
const ME = "+972500000001";
const server = (page) => page.evaluate(() => window.__backend.tables.shared_projects[0].data.rebarOrders || []);
async function newOrder(page) {
  await openWithSharedProject(page, { phone: ME, sheet: { id: "p1", name: "בניין A", members: [ME], tasks: [] } });
  await page.locator("#toolboxBtn").click();
  await page.locator("#toolboxRebar").click();
  await expect(page.locator("#rebarListView")).toBeVisible();
  await expect(page.locator("#rebarList")).toContainText("עוד אין הזמנות ברזל");
  await page.locator("#rebarNewBtn").click();
  await expect(page.locator("#rebarOrderView")).toBeVisible();
}

test("an order: rows with a shape, a diameter, length and units; the weights; kept on the project", async ({ page }) => {
  await newOrder(page);
  await expect(page.locator("#rebarOrderTitle")).toHaveText("הזמנת ברזל · ב-001");
  await expect(page.locator("#rbProjectName")).toHaveValue("בניין A");
  const today = await page.evaluate(() => { const d = new Date(), p = (n) => String(n).padStart(2, "0"); return d.getFullYear() + "-" + p(d.getMonth() + 1) + "-" + p(d.getDate()); });
  await expect(page.locator("#rbEditDate")).toHaveValue(today);
  await page.locator("#rbSupplier").fill("ברזל המרכז");
  await page.locator("#rbElement").fill("תקרה קומה 2");
  const rows = page.locator("#rbRows tr");
  await expect(rows).toHaveCount(1);
  // row 1: an L, a=40 b=280 -> 3.20 m; Ø12; 96 units
  await rows.nth(0).locator(".rb-sk-btn").click();
  await expect(page.locator("#rbShapeOverlay")).toBeVisible();
  await page.locator(".rb-shape[data-shape=L]").click();
  const dims = page.locator("#rbDims input");
  await expect(dims).toHaveCount(2);
  await dims.nth(0).fill("40");
  await dims.nth(1).fill("280");
  await expect(page.locator("#rbShapeCalc")).toContainText("3.20");
  await page.locator("#rbShapeOkBtn").click();
  await expect(rows.nth(0).locator("td").nth(3).locator("input")).toHaveValue("3.2");
  await rows.nth(0).locator(".rb-dia-btn").click();
  await page.locator(".rb-dia[data-dia='12']").click();
  await expect(rows.nth(0).locator(".rb-kgm")).toHaveText("0.888");
  await rows.nth(0).locator("td").nth(5).locator("input").fill("96");
  await expect(rows.nth(0).locator(".rb-tot")).toHaveText("272.8");
  // row 2: a mesh 20/20, 2.40 x 6.00, Ø8, 12 sheets
  await page.locator("#rbAddRowBtn").click();
  await expect(rows).toHaveCount(2);
  await expect(rows.nth(1).locator(".rb-no")).toHaveValue("2");
  await rows.nth(1).locator(".rb-dia-btn").click();
  await page.locator(".rb-dia[data-dia='8']").click();
  await rows.nth(1).locator(".rb-sk-btn").click();
  await page.locator(".rb-shape[data-shape=mesh]").click();
  await expect(page.locator("#rbDims input")).toHaveCount(4);
  await page.locator("#rbShapeOkBtn").click();
  await expect(rows.nth(1).locator("td").nth(3)).toHaveText("—");
  await rows.nth(1).locator("td").nth(5).locator("input").fill("12");
  // 0.395 x (100/20 + 100/20) = 3.95 kg/m² x 14.4 m² x 12 = 682.6
  await expect(rows.nth(1).locator(".rb-tot")).toHaveText("682.6");
  await expect(page.locator("#rbSumUnits")).toHaveText("108");
  await expect(page.locator("#rbSumKg")).toHaveText("955.4");
  await expect(page.locator("#rbByDia span")).toHaveText(["\u200FØ8 · 683 ק״ג", "\u200FØ12 · 273 ק״ג", "0.96 טון"]);
  // the number can be changed
  await rows.nth(1).locator(".rb-no").fill("7");
  // kept on the shared project
  await expect.poll(async () => { const o = (await server(page))[0]; return o && o.rows[1] && [o.supplier, o.rows.length, o.rows[1].no, o.rows[0].shape && o.rows[0].shape.k, o.rows[0].dia]; }).toEqual(["ברזל המרכז", 2, "7", "L", 12]);
  // back: the list shows it
  await page.locator("#rebarOrderBackBtn").click();
  await expect(page.locator(".rb-list-item")).toHaveCount(1);
  await expect(page.locator(".rb-list-item")).toContainText("ב-001");
  await expect(page.locator(".rb-list-item")).toContainText("955.4");
  // a long press on a row deletes it
  await page.locator(".rb-list-item").click();
  const box = await rows.nth(0).locator(".rb-kgm").boundingBox();
  await page.mouse.move(box.x + 5, box.y + 5);
  await page.mouse.down();
  await page.waitForTimeout(800);
  await page.mouse.up();
  await expect(page.locator("#confirmOverlay")).toBeVisible();
  await page.locator("#confirmYesBtn").click();
  await expect(rows).toHaveCount(1);
  await expect.poll(async () => (await server(page))[0].rows.length).toBe(1);
});

test("a shape drawn by hand, and its length", async ({ page }) => {
  await newOrder(page);
  await page.locator("#rbRows tr").nth(0).locator(".rb-sk-btn").click();
  await page.locator(".rb-shape[data-shape=free]").click();
  await expect(page.locator("#rbDrawTools")).toBeVisible();
  const c = await page.locator("#rbShapePreview").boundingBox();
  await page.mouse.move(c.x + 20, c.y + 20);
  await page.mouse.down();
  for (let i = 1; i <= 10; i++) await page.mouse.move(c.x + 20 + i * 25, c.y + 20 + (i % 2) * 60);
  await page.mouse.up();
  await page.locator("#rbDims input").fill("4.5");
  await page.locator("#rbShapeOkBtn").click();
  await expect(page.locator("#rbRows tr").nth(0).locator("td").nth(3).locator("input")).toHaveValue("4.5");
  await expect.poll(async () => { const o = (await server(page))[0]; return o && o.rows[0].shape && o.rows[0].shape.pts.length > 2; }).toBe(true);
});

test("printing: the computer's print dialog; sharing: a PDF", async ({ page }) => {
  await newOrder(page);
  await page.evaluate(() => {
    window.__framePrints = 0;
    new MutationObserver((list) => list.forEach((m) => m.addedNodes.forEach((n) => {
      if (n.tagName === "IFRAME") n.contentWindow.print = () => { window.__framePrints++; window.__printedText = n.contentWindow.document.body.innerText; };
    }))).observe(document.body, { childList: true });
  });
  await page.locator("#rbSupplier").fill("ספק בדיקה");
  await page.locator("#rbPrintBtn").click();
  await expect.poll(() => page.evaluate(() => window.__framePrints)).toBe(1);
  const text = await page.evaluate(() => window.__printedText);
  expect(text).toContain("הזמנת ברזל ב-001");
  expect(text).toContain("ספק בדיקה");
  expect(text).toContain("בניין A");
  // sharing: a PDF to the share sheet
  await page.evaluate(() => { window.__shared = []; navigator.canShare = () => true; navigator.share = (d) => { window.__shared.push(d.files[0].name); return Promise.resolve(); }; });
  await page.locator("#rbShareBtn").click();
  await expect.poll(() => page.evaluate(() => window.__shared.length), { timeout: 15000 }).toBe(1);
  expect(await page.evaluate(() => window.__shared[0])).toMatch(/^הזמנת ברזל ב-001 בניין A .+\.pdf$/);
});
