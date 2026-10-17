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
  // the folders give way to the list (on screen, not below them)
  await expect(page.locator("#officeDataFolders")).toBeHidden();
  await expect(page.locator("#officeDataList .site-log-add-btn")).toBeInViewport();
  await page.locator("#officeDataList .site-log-add-btn").click();
  await page.locator("#officeDataList .site-log-add-input").fill("יוסי מדידות");
  await page.locator("#officeDataList .site-log-add-input").press("Enter");
  await expect(page.locator("#officeDataList .site-log-entry", { hasText: "יוסי מדידות" })).toBeVisible();

  await page.locator("#officeDataBackBtn").click(); // back to the folders
  await expect(page.locator("#officeDataFolders")).toBeVisible();
  await expect(page.locator("#officeDataList")).toBeHidden();
  await expect(page.locator("#officeDataFolders .library-item", { hasText: "מודדים" })).toContainText("(1)");
  const saved = await page.evaluate(() => JSON.parse(Object.entries(localStorage).find(([k]) => k.startsWith("daily-tasks-sheets-v1"))[1]).officeDirectory);
  expect(saved.surveyors.map((e) => e.name)).toEqual(["יוסי מדידות"]);
  await page.locator("#officeDataBackBtn").click(); // and out
  await expect(page.locator("#officeDataView")).toBeHidden();
});

test("Head Office's lists reach its projects, and stay there when members save", async ({ page }) => {
  await openWithSharedProject(page, { phone: ME, sheet: Object.assign(project("p1", "בניין A"), {
    tasks: [{ id: "k1", text: "משימה", status: 0, type: "task", date: TODAY, createdAt: 1 }],
  }) });
  await becomeHeadOffice(page);
  await page.locator("#officeDataBtn").click();
  await page.locator("#officeDataFolders .library-item", { hasText: "פועלים" }).click();
  await page.locator("#officeDataList .site-log-add-btn").click();
  await page.locator("#officeDataList .site-log-add-input").fill("משה כהן");
  await page.locator("#officeDataList .site-log-add-input").press("Enter");
  const serverDir = () => page.evaluate(() => window.__backend.tables.shared_projects[0].data.officeDirectory);
  await expect.poll(async () => ((await serverDir()) || {}).workers?.map((e) => e.name)).toEqual(["משה כהן"]);

  // a member's later save of the project keeps the lists
  await page.locator("#officeDataBackBtn").click();
  await page.locator("#officeDataBackBtn").click();
  await page.locator("#headOfficeIconBtn").click(); // back to normal mode
  await page.locator(".sheet-tab", { hasText: "בניין A" }).click();
  await page.locator("#taskList li.task", { hasText: "משימה" }).click();
  await expect.poll(async () => (await page.evaluate(() => window.__backend.tables.shared_projects[0].data.tasks[0].status))).toBe(1);
  expect(((await serverDir()) || {}).workers.map((e) => e.name)).toEqual(["משה כהן"]);
});

test("in a project's diary, Head Office's lists are suggested while typing a name", async ({ page }) => {
  await openWithSharedProject(page, { phone: ME, sheet: Object.assign(project("p1", "בניין A"), {
    officeDirectory: { workers: [{ id: "a", name: "משה כהן" }, { id: "b", name: "רון לוי" }], crews: [{ id: "c", name: "צוות אלפא" }] },
  }) });
  await page.locator("#calendarFabBtn").click();
  await page.locator("#siteLogAttendanceBtn").click();
  const workers = page.locator("#siteLogAttendanceColumns .site-log-col").nth(2);
  await workers.locator(".site-log-add-btn").click();
  const input = workers.locator(".site-log-add-input");
  const listId = await input.getAttribute("list");
  expect(listId).toBeTruthy();
  await expect(page.locator(`#${listId} option`)).toHaveCount(2);
  expect(await page.locator(`#${listId} option`).evaluateAll((os) => os.map((o) => o.value))).toEqual(["משה כהן", "רון לוי"]);
  // a column without a list gets no suggestions
  const consultants = page.locator("#siteLogAttendanceColumns .site-log-col").nth(4);
  await consultants.locator(".site-log-add-btn").click();
  expect(await consultants.locator(".site-log-add-input").getAttribute("list")).toBeNull();

  await page.locator("#siteLogAttendanceBackBtn").click();
  await page.locator("#siteLogContractorsBtn").click();
  await page.locator("#siteLogContractorsList .site-log-add-btn").click();
  const cid = await page.locator("#siteLogContractorsList .site-log-add-input").getAttribute("list");
  expect(await page.locator(`#${cid} option`).evaluateAll((os) => os.map((o) => o.value))).toEqual(["צוות אלפא"]);
});
