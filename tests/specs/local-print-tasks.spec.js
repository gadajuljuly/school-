const { test, expect } = require("@playwright/test");
const { openWithSharedProject } = require("./helpers/local-app");

// 🖨 printing the tasks on screen: every task ticked to start with, untick
// some; a PDF (or the printer) of a page that looks like the app.
test.use({ viewport: { width: 412, height: 860 }, serviceWorkers: "block", acceptDownloads: true });

const ME = "+972500000001";
const pad = (n) => String(n).padStart(2, "0");
const today = (() => { const d = new Date(); return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`; })();
const T = (id, text, status, extra) => Object.assign({ id, text, status, type: "task", date: today, createdAt: +id.slice(1) }, extra || {});

test("the print button on the tasks page: all ticked, untick one, a PDF of the rest", async ({ page }) => {
  await openWithSharedProject(page, { phone: ME, sheet: { id: "p1", name: "רכבת נתניה", members: [ME],
    tasks: [T("t1", "סגירת ביוב", 0), T("t2", "שוחות ניקוז", 1), T("t3", "להזמין אספלט", 0, { urgent: true })] } });
  // in the toolbox
  await page.locator("#toolboxBtn").click();
  await expect(page.locator("#toolboxPop")).toBeVisible();
  await expect(page.locator("#toolboxPop .toolbox-item:visible")).toHaveText(["הדפסה", "סורק PDF", "סקיצה"]);
  await page.locator("#toolboxPrint").click();
  await expect(page.locator("#toolboxPop")).toBeHidden();
  const boxes = page.locator("#printTasksList input");
  await expect(boxes).toHaveCount(3);
  for (let i = 0; i < 3; i++) await expect(boxes.nth(i)).toBeChecked();
  await expect(page.locator("#printTasksCount")).toHaveText("3 מתוך 3");
  await boxes.nth(1).uncheck();
  await expect(page.locator("#printTasksCount")).toHaveText("2 מתוך 3");
  await expect(page.locator("#printTasksAll")).not.toBeChecked();

  // none: not printed (the "all" box half-ticked: a tap ticks all, another unticks all)
  await page.locator("#printTasksAll").check();
  for (let i = 0; i < 3; i++) await expect(boxes.nth(i)).toBeChecked();
  await page.locator("#printTasksAll").uncheck();
  for (let i = 0; i < 3; i++) await expect(boxes.nth(i)).not.toBeChecked();
  await page.locator("#printTasksPdfBtn").click();
  await expect(page.locator("#printTasksOverlay")).toBeVisible();
  await page.locator("#printTasksAll").check();
  await boxes.nth(1).uncheck();

  const download = page.waitForEvent("download", { timeout: 20000 });
  await page.locator("#printTasksPdfBtn").click();
  const file = await download;
  const path = await file.path();
  const head = require("fs").readFileSync(path).slice(0, 5).toString();
  expect(head).toBe("%PDF-");
  await expect(page.locator("#printTasksOverlay")).toBeHidden();
});

test("a day with no tasks: a message; printing only on the tasks page; the scanner from the toolbox", async ({ page }) => {
  await openWithSharedProject(page, { phone: ME, sheet: { id: "p1", name: "רכבת נתניה", members: [ME], tasks: [] } });
  await page.locator("#toolboxBtn").click();
  await page.locator("#toolboxPrint").click();
  await expect(page.locator("#printTasksOverlay")).toBeHidden();
  // other pages: the toolbox without printing; the library: no toolbox (its own scan button)
  await page.locator("#reportFabBtn").click();
  await page.locator("#toolboxBtn").click();
  await expect(page.locator("#toolboxPop .toolbox-item:visible")).toHaveText(["סורק PDF", "סקיצה"]);
  await page.locator("#toolboxBtn").click();
  await expect(page.locator("#toolboxPop")).toBeHidden();
  await page.locator("#libraryBtn").click();
  await expect(page.locator("#toolboxBtn")).toBeHidden();
});

test("the toolbox's scanner: into this project's library", async ({ page }) => {
  await openWithSharedProject(page, { phone: ME, sheet: { id: "p1", name: "רכבת נתניה", members: [ME], tasks: [] } });
  await page.locator("#toolboxBtn").click();
  await page.locator("#toolboxScan").click();
  await expect(page.locator("#scanOverlay")).toBeVisible();
});

test("the phone app: the printer - Android's print screen (version 32+), or the PDF in the phone's PDF app before", async ({ page }) => {
  await openWithSharedProject(page, { phone: ME, native: true, sheet: { id: "p1", name: "רכבת נתניה", members: [ME], tasks: [T("t1", "סגירת ביוב", 0)] } });
  const print = async () => {
    await page.locator("#toolboxBtn").click();
    await page.locator("#toolboxPrint").click();
    await page.locator("#printTasksPrinterBtn").click();
  };
  // an older app: the PDF opened
  await print();
  await expect.poll(() => page.evaluate(() => (window.__native.opened || []).map((o) => o.mimeType))).toEqual(["application/pdf"]);
  // version 32+: straight to the print screen
  await page.evaluate(() => { window.__printPdf = true; });
  await print();
  await expect.poll(() => page.evaluate(() => (window.__native.printed || []).length)).toBe(1);
  const printed = await page.evaluate(() => window.__native.printed[0]);
  expect(printed.path).toMatch(/\.pdf$/);
  expect(printed.name).toContain("רכבת נתניה");
  expect(await page.evaluate(() => window.__native.opened.length)).toBe(1); // not opened again
});
