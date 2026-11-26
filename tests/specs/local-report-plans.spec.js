const { test, expect } = require("@playwright/test");
const { openLocalApp, openWithSharedProject } = require("./helpers/local-app");

// A tour report's defects on the plan (src/app/13b-report-plans.js): a
// row's place on a plan (the "מיקום" column, its numbered pin), 👷 a PDF
// per responsible person, and a new tour offered the previous tour's
// undone rows.
test.use({ viewport: { width: 390, height: 800 }, serviceWorkers: "block", acceptDownloads: true });

const ME = "+972500000001";
const PNG1 = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mP8z8BQDwAEhQGAhKmMIQAAAABJRU5ErkJggg==";

// a plan-like picture: white, with walls
async function planPng(page) {
  const b64 = await page.evaluate(() => {
    const c = document.createElement("canvas");
    c.width = 600; c.height = 400;
    const g = c.getContext("2d");
    g.fillStyle = "#fff"; g.fillRect(0, 0, 600, 400);
    g.strokeStyle = "#333"; g.lineWidth = 8;
    g.strokeRect(20, 20, 560, 360);
    g.beginPath(); g.moveTo(300, 20); g.lineTo(300, 250); g.stroke();
    return c.toDataURL("image/png").split(",")[1];
  });
  return Buffer.from(b64, "base64");
}

test("a tour row gets its place on a plan: the picker, the plan, a tap, the pin in the table and the PDF", async ({ page }) => {
  await openLocalApp(page);
  await page.locator("#reportFabBtn").click();
  await page.locator(".sheet-reports-add-btn").click();
  await page.locator("#reportTypeTourBtn").click();
  await page.locator("#reportTitleInput").fill("סיור מסירה");
  await page.locator("#reportTitleSaveBtn").click();
  await page.locator("#reportDateSaveBtn").click();
  await page.locator("#reportParticipantsSaveBtn").click();
  await expect(page.locator("#reportView")).toBeVisible();
  // no earlier tour: nothing offered
  await expect(page.locator("#reportCarryOverlay")).toBeHidden();
  // the location column: a tour's
  await expect(page.locator("#reportView th.report-col-location")).toBeVisible();

  await page.locator(".report-add-row-btn").click();
  const cell = page.locator("#reportTableBody .report-cell-input").first();
  await cell.fill("סדק בטיח במטבח");
  await cell.blur();

  // no plan yet: choose one (a picture from the device)
  await page.locator("#reportTableBody .report-loc-btn").first().click();
  await expect(page.locator("#reportPlanPickOverlay")).toBeVisible();
  const chooser = page.waitForEvent("filechooser");
  await page.locator("#reportPlanFromFileBtn").click();
  await (await chooser).setFiles({ name: "קומה 2.png", mimeType: "image/png", buffer: await planPng(page) });
  await expect(page.locator("#reportPlanView")).toBeVisible();
  await expect(page.locator("#reportPlanName")).toHaveText("📄 קומה 2");
  await expect(page.locator("#reportPlanTitle")).toHaveText("מיקום שורה 1");
  await expect(page.locator("#reportPlanHint")).toContainText("סדק בטיח במטבח");

  // a tap: the row's pin there
  const img = await page.locator("#reportPlanImg").boundingBox();
  await page.mouse.click(img.x + img.width * 0.25, img.y + img.height * 0.5);
  await expect(page.locator("#reportPlanInner .report-pin")).toHaveCount(1);
  await expect(page.locator("#reportPlanHint")).toContainText("המיקום סומן");
  const pin = await page.locator("#reportPlanInner .report-pin").boundingBox();
  // the pin's tip on the point (its box above and around it)
  expect(Math.abs(pin.x + pin.width / 2 - (img.x + img.width * 0.25))).toBeLessThan(3);
  expect(pin.y + pin.height).toBeLessThan(img.y + img.height * 0.5 + 2);
  expect(pin.y + pin.height).toBeGreaterThan(img.y + img.height * 0.5 - 12);

  // a drag moves the plan, and doesn't mark
  await page.mouse.move(img.x + 100, img.y + 100);
  await page.mouse.down();
  await page.mouse.move(img.x + 160, img.y + 130, { steps: 5 });
  await page.mouse.up();
  await expect(page.locator("#reportPlanInner .report-pin")).toHaveCount(1);

  // back: the table's pin, numbered; the status's colour follows
  await page.locator("#reportPlanBackBtn").click();
  const tablePin = page.locator("#reportTableBody .report-loc-btn .report-pin");
  await expect(tablePin).toHaveText("1");
  await expect(tablePin).toHaveClass(/pin-open/);
  await page.locator("#reportTableBody .report-status-mark").first().click();
  await expect(tablePin).toHaveClass(/pin-partial/);

  // the PDF (with the plan) still a real PDF
  const download = page.waitForEvent("download");
  await page.locator("#reportSaveBtn").click();
  const bytes = require("fs").readFileSync(await (await download).path());
  expect(bytes.slice(0, 5).toString()).toBe("%PDF-");

  // the pin can be taken away
  await tablePin.click();
  await page.locator("#reportPlanRemoveBtn").click();
  await expect(page.locator("#reportPlanInner .report-pin")).toHaveCount(0);
  await page.locator("#reportPlanBackBtn").click();
  await expect(page.locator("#reportTableBody .report-loc-btn .report-pin")).toHaveCount(0);
});

test("a meeting has no location column", async ({ page }) => {
  await openLocalApp(page);
  await page.locator("#reportFabBtn").click();
  await page.locator(".sheet-reports-add-btn").click();
  await page.locator("#reportTypeMeetingBtn").click();
  await page.locator("#reportTitleSaveBtn").click();
  await page.locator("#reportDateSaveBtn").click();
  await page.locator("#reportParticipantsSaveBtn").click();
  await page.locator(".report-add-row-btn").click();
  await expect(page.locator("#reportView th.report-col-location")).toBeHidden();
  await expect(page.locator("#reportTableBody .report-loc-btn")).toHaveCount(0);
});

const tour = (id, date, rows, extra) => Object.assign({ id, type: "tour", title: "סיור " + date, participants: "", date, createdAt: 1, rows }, extra || {});
const row = (id, task, responsible, status, extra) => Object.assign({ id, task, responsible, status, priority: null, dueDate: null, image: null }, extra || {});

test("👷 a PDF per responsible person: their counts, ready to send; one with everything done has none", async ({ page }) => {
  const plan = { id: "pl1", name: "קומה 2", image: PNG1, w: 1, h: 1 };
  await openWithSharedProject(page, { phone: ME, sheet: { id: "p1", name: "בניין A", members: [ME], tasks: [], reports: [
    tour("t1", "2026-11-20", [
      row("r1", "סדק בטיח", "טייח - משה", 0, { loc: { planId: "pl1", x: 0.3, y: 0.4 } }),
      row("r2", "חסר אריח", "רצף - אבי", 1),
      row("r3", "מעקה", "מסגר - יוסי", 2),
      row("r4", "רובה", "טייח - משה", 0),
    ], { plans: [plan], planId: "pl1" }),
  ] } });
  await page.locator("#reportFabBtn").click();
  await page.locator("#sheetReportsList", { hasText: "סיור 2026-11-20" }).getByText("סיור 2026-11-20").first().click();
  await expect(page.locator("#reportView")).toBeVisible();
  await page.locator("#reportByRespBtn").click();
  await expect(page.locator("#reportByRespOverlay")).toBeVisible();
  const rows = page.locator("#reportByRespList .report-by-resp-row");
  await expect(rows).toHaveCount(3);
  await expect(rows.nth(0)).toContainText("טייח - משה");
  await expect(rows.nth(0)).toContainText("לא בוצע: 2");
  await expect(rows.nth(1)).toContainText("חלקי: 1");
  await expect(rows.nth(2)).toContainText("הכול בוצע");
  await expect(rows.nth(2).locator(".report-by-resp-send")).toHaveCount(0);
  // ready one after another, then a tap sends (here: a download)
  const send = rows.nth(0).locator(".report-by-resp-send");
  await expect(send).toBeEnabled({ timeout: 15000 });
  await expect(send).toHaveText("שליחה");
  // the phone's share sheet: the PDF, named for him
  await page.evaluate(() => {
    navigator.canShare = () => true;
    navigator.share = (d) => { window.__shared = { name: d.files[0].name, size: d.files[0].size }; return Promise.resolve(); };
  });
  await send.click();
  const shared = await page.evaluate(() => window.__shared);
  expect(shared.name).toContain("טייח - משה");
  expect(shared.size).toBeGreaterThan(10000);
  // everything (done too): the done one can be sent as well
  await page.locator("#reportByRespOpenOnly").uncheck();
  await expect(rows.nth(2).locator(".report-by-resp-send")).toHaveCount(1);
});

test("a new tour is offered the previous tour's undone rows - with their place, picture and plan", async ({ page }) => {
  const plan = { id: "pl1", name: "קומה 2", image: PNG1, w: 1, h: 1 };
  await openWithSharedProject(page, { phone: ME, sheet: { id: "p1", name: "בניין A", members: [ME], tasks: [], reports: [
    tour("t0", "2026-11-10", [row("o1", "ישן", "", 0)]),
    tour("t1", "2026-11-20", [
      row("r1", "סדק בטיח", "טייח - משה", 0, { loc: { planId: "pl1", x: 0.3, y: 0.4 }, image: PNG1 }),
      row("r2", "חסר אריח", "רצף - אבי", 1),
      row("r3", "מעקה", "מסגר - יוסי", 2),
    ], { plans: [plan], planId: "pl1" }),
  ] } });
  await page.locator("#reportFabBtn").click();
  await page.locator(".sheet-reports-add-btn").click();
  await page.locator("#reportTypeTourBtn").click();
  await page.locator("#reportTitleInput").fill("סיור חוזר");
  await page.locator("#reportTitleSaveBtn").click();
  await page.locator("#reportDateSaveBtn").click();
  await page.locator("#reportParticipantsSaveBtn").click();
  await expect(page.locator("#reportCarryOverlay")).toBeVisible();
  // the latest tour's (not the older one's), only what isn't done
  await expect(page.locator("#reportCarrySub")).toContainText("סיור 2026-11-20");
  await expect(page.locator("#reportCarryList .report-carry-row")).toHaveCount(2);
  await expect(page.locator("#reportCarryList")).not.toContainText("מעקה");
  await page.locator("#reportCarryCopyBtn").click();
  await expect(page.locator("#reportCarryOverlay")).toBeHidden();
  const body = page.locator("#reportTableBody");
  await expect(body).toContainText("סדק בטיח");
  await expect(body).toContainText("חסר אריח");
  await expect(body).toContainText("מסיור 20/11");
  // the first kept its place (its pin, now number 1) and picture
  await expect(body.locator("tr").nth(0).locator(".report-loc-btn .report-pin")).toHaveText("1");
  await expect(body.locator("tr").nth(0).locator(".report-image-thumb")).toHaveCount(1);
  // the partly done one stays partly done
  await expect(body.locator("tr").nth(1).locator(".report-loc-btn .report-pin")).toHaveCount(0);
  // its plan came along: the pin opens it
  await body.locator("tr").nth(0).locator(".report-loc-btn").click();
  await expect(page.locator("#reportPlanName")).toHaveText("📄 קומה 2");
});

test("an empty tour: 'סיור ריק' copies nothing", async ({ page }) => {
  await openWithSharedProject(page, { phone: ME, sheet: { id: "p1", name: "בניין A", members: [ME], tasks: [], reports: [
    tour("t1", "2026-11-20", [row("r1", "סדק בטיח", "", 0)]),
  ] } });
  await page.locator("#reportFabBtn").click();
  await page.locator(".sheet-reports-add-btn").click();
  await page.locator("#reportTypeTourBtn").click();
  await page.locator("#reportTitleSaveBtn").click();
  await page.locator("#reportDateSaveBtn").click();
  await page.locator("#reportParticipantsSaveBtn").click();
  await page.locator("#reportCarrySkipBtn").click();
  await expect(page.locator("#reportCarryOverlay")).toBeHidden();
  await expect(page.locator("#reportTableBody tr")).toHaveCount(1); // the add row only
});
