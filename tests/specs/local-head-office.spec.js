const { test, expect } = require("@playwright/test");
const { openWithSharedProject } = require("./helpers/local-app");

// Head Office (משרד ראשי) and the "שגר" reports projects send to it, against
// the in-memory server stand-in (helpers/local-app.js FAKE_BACKEND).
test.use({ viewport: { width: 390, height: 800 }, serviceWorkers: "block", acceptDownloads: true });

const ME = "+972500000001";
const pad = (n) => String(n).padStart(2, "0");
const d = new Date();
const TODAY = `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`;
const project = (id, name, siteLogs = []) => ({ id, name, members: [ME], tasks: [], siteLogs });
const serverRow = (page, id) => page.evaluate((id) => window.__backend.tables.shared_projects.find((r) => r.id === id), id);

async function becomeHeadOffice(page) {
  await page.evaluate((me) => {
    window.__backend.tables.office_groups = [{ id: "g1", creator_phone: me }];
    return window.__hooks.loadMyOfficeGroups();
  }, ME);
  await expect(page.locator("#headOfficeIconBtn")).toBeVisible();
  await page.locator("#headOfficeIconBtn").click();
  await expect(page.locator("#headOfficeIconBtn")).toHaveClass(/active/);
}

test("a group creator can switch to Head Office mode and back", async ({ page }) => {
  await openWithSharedProject(page, { phone: ME, sheet: project("p1", "בניין A") });
  await expect(page.locator("#headOfficeIconBtn")).toBeHidden(); // not in any group yet
  await becomeHeadOffice(page);
  await expect(page.locator(".sheet-tab", { hasText: "הזמנות רכש" })).toBeVisible();
  await expect(page.locator("#officeReportsBtn")).toBeVisible();

  await page.locator("#headOfficeIconBtn").click();
  await expect(page.locator("#headOfficeIconBtn")).not.toHaveClass(/active/);
  await expect(page.locator("#officeReportsBtn")).toBeHidden();
});

test("'שגר דוח נוכחות' marks the day's log as sent and files the PDF in the library", async ({ page }) => {
  await openWithSharedProject(page, { phone: ME, sheet: project("p1", "בניין A") });
  await page.locator("#calendarFabBtn").click();
  await page.locator("#siteLogAttendanceBtn").click();
  const workers = page.locator("#siteLogAttendanceColumns .site-log-col").nth(2);
  await workers.locator(".site-log-add-btn").click();
  await workers.locator(".site-log-add-input").fill("משה כהן");
  await workers.locator(".site-log-add-input").press("Enter");
  await page.locator("#siteLogAttendanceOrderBtn").click();

  await expect.poll(async () => {
    const log = ((await serverRow(page, "p1")).data.siteLogs || []).find((l) => l.date === TODAY);
    return log && log.attendanceSentDate;
  }, { timeout: 15000 }).toBe(TODAY);
  const log = (await serverRow(page, "p1")).data.siteLogs.find((l) => l.date === TODAY);
  expect(log.attendance.workers.map((w) => w.name)).toEqual(["משה כהן"]);
  const uploads = await page.evaluate(() => window.__backend.uploads);
  expect(uploads).toHaveLength(1);
  expect(uploads[0].path.startsWith("p1/")).toBe(true);
  expect(uploads[0].size).toBeGreaterThan(5000);
});

test("Head Office's combined attendance report includes only the projects that sent today", async ({ page }) => {
  const sent = { date: TODAY, attendanceSentDate: TODAY, attendance: { workers: [{ id: "w1", name: "אבי לוי" }] } };
  const notSent = { date: TODAY, attendance: { workers: [{ id: "w2", name: "רון שקד" }] } };
  await openWithSharedProject(page, { phone: ME, sheets: [
    project("p1", "בניין A", [sent]),
    project("p2", "בניין B", [notSent]),
  ] });
  await becomeHeadOffice(page);
  await page.locator("#officeReportsBtn").click();
  await page.locator("#officeReportAttendanceBtn").click();
  const preview = page.locator("#officeReportOptionsPreview");
  await expect(preview).toContainText("בניין A");
  await expect(preview).toContainText("אבי לוי");
  await expect(preview).not.toContainText("בניין B");
  await expect(preview).not.toContainText("רון שקד");
});

test("a sent procurement order shows up as a Head Office notification, opens the order, and can be dismissed", async ({ page }) => {
  const log = { date: TODAY, procurementSentDate: TODAY, procurement: [{ id: "r1", item: "ברזל 12", qty: "3 טון" }] };
  await openWithSharedProject(page, { phone: ME, sheet: project("p1", "בניין A", [log]) });
  await becomeHeadOffice(page);
  await page.locator(".sheet-tab", { hasText: "הזמנות רכש" }).click();
  const note = page.locator("#taskList li.task", { hasText: "בניין A" });
  await expect(note).toBeVisible();
  await expect(note).toHaveClass(/head-office-notification-task/);

  await note.locator(".task-text").click();
  await expect(page.locator("#officeProcurementView")).toBeVisible();
  await page.locator("#officeProcurementView .report-back-btn").first().click();

  // long-press -> confirm -> gone, and it stays gone
  await expect(page.locator("#officeProcurementView")).toBeHidden();
  // back from a notification's order returns to the notifications
  await expect(page.locator("#officeReportTypeView")).toBeHidden();
  await expect(note).toBeVisible();
  const box = await note.locator(".task-text").boundingBox();
  await page.mouse.move(box.x + box.width / 2, box.y + box.height / 2);
  await page.mouse.down();
  await page.waitForTimeout(1300);
  await page.mouse.up();
  await page.locator("#confirmYesBtn").click();
  await expect(note).toHaveCount(0);
  await page.locator(".sheet-tab", { hasText: "בניין A" }).click();
  await page.locator(".sheet-tab", { hasText: "הזמנות רכש" }).click();
  await expect(note).toHaveCount(0);
});

test("Head Office 'הזנת נתונים': six folders, each a list of names that's kept", async ({ page }) => {
  await openWithSharedProject(page, { phone: ME, sheet: project("p1", "בניין A") });
  await expect(page.locator("#officeDataBtn")).toBeHidden(); // only in Head Office mode
  await becomeHeadOffice(page);
  await page.locator("#officeDataBtn").click();
  const folders = page.locator("#officeDataFolders .library-item-name");
  await expect(folders).toHaveText(["מהנדסים", "מנהלי עבודה", "פועלים", "מפעילים", "צוותים", "מודדים"]);

  await page.locator("#officeDataFolders .library-item", { hasText: "מודדים" }).click();
  await expect(page.locator("#officeDataTitle")).toHaveText("מודדים");
  await page.locator("#officeDataList .site-log-add-btn").click();
  await page.locator("#officeDataList .site-log-add-input").fill("יוסי מדידות");
  await page.locator("#officeDataList .site-log-add-input").press("Enter");
  await expect(page.locator("#officeDataList .site-log-entry", { hasText: "יוסי מדידות" })).toBeVisible();

  await page.locator("#officeDataBackBtn").click(); // back to the folders
  await expect(page.locator("#officeDataFolders .library-item", { hasText: "מודדים" })).toContainText("(1)");
  const saved = await page.evaluate(() => JSON.parse(Object.entries(localStorage).find(([k]) => k.startsWith("daily-tasks-sheets-v1"))[1]).officeDirectory);
  expect(saved.surveyors.map((e) => e.name)).toEqual(["יוסי מדידות"]);
  await page.locator("#officeDataBackBtn").click(); // and out
  await expect(page.locator("#officeDataView")).toBeHidden();
});
