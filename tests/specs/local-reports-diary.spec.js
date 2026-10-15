const { test, expect } = require("@playwright/test");
const { openLocalApp, longPress, addTask } = require("./helpers/local-app");

// Meeting/tour reports (with their PDF) and the work diary (יומן עבודה),
// offline in local-only mode.
test.use({ viewport: { width: 390, height: 800 }, serviceWorkers: "block", acceptDownloads: true });

const pad = (n) => String(n).padStart(2, "0");
const isoDaysAgo = (n) => { const d = new Date(); d.setDate(d.getDate() - n); return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`; };

async function goToDate(page, iso) {
  await page.locator("#dateInput").fill(iso);
  await page.locator("#dateInput").dispatchEvent("change");
}

test("meeting report: create it, add a row, it's kept, and it saves as a real PDF", async ({ page }) => {
  await openLocalApp(page);
  await page.locator("#reportFabBtn").click();
  await page.locator(".sheet-reports-add-btn").click();
  await page.locator("#reportTypeMeetingBtn").click();
  await page.locator("#reportTitleInput").fill("פגישת תיאום");
  await page.locator("#reportTitleSaveBtn").click();
  await page.locator("#reportDateSaveBtn").click();
  await page.locator("#reportParticipantsList input").first().fill("דני");
  await page.locator("#reportParticipantsSaveBtn").click();

  await expect(page.locator("#reportView")).toBeVisible();
  await expect(page.locator("#reportHeadTitle")).toHaveText("פגישת תיאום");
  await expect(page.locator("#reportMeta")).toContainText("דני");
  await page.locator(".report-add-row-btn").click();
  const cell = page.locator("#reportTableBody .report-cell-input").first();
  await cell.fill("להזמין בטון");
  await cell.blur();

  const download = page.waitForEvent("download");
  await page.locator("#reportSaveBtn").click();
  const file = await (await download).path();
  const bytes = require("fs").readFileSync(file);
  expect(bytes.slice(0, 5).toString()).toBe("%PDF-");
  expect(bytes.length).toBeGreaterThan(10000);

  // still there after a reload
  await page.reload();
  await page.locator("#appRoot").waitFor({ state: "visible" });
  await page.locator("#reportFabBtn").click();
  await expect(page.locator("#appRoot")).toContainText("פגישת תיאום");
});

test("diary attendance: add, see it in the log preview, remove it", async ({ page }) => {
  await openLocalApp(page);
  await page.locator("#calendarFabBtn").click();
  await page.locator("#siteLogAttendanceBtn").click();
  const workers = page.locator("#siteLogAttendanceColumns .site-log-col").nth(2);
  await workers.locator(".site-log-add-btn").click();
  await workers.locator(".site-log-add-input").fill("משה כהן");
  await workers.locator(".site-log-add-input").press("Enter");
  await expect(workers.locator(".site-log-entry", { hasText: "משה כהן" })).toBeVisible();

  await page.locator("#siteLogAttendanceBackBtn").click();
  await page.locator("#siteLogPreviewBtn").click();
  await expect(page.locator("#siteLogPreviewContent")).toContainText("משה כהן");
  await expect(page.locator("#siteLogPreviewContent")).toContainText("יומן עבודה");
  await page.locator("#siteLogPreviewBackBtn").click();

  await page.locator("#siteLogAttendanceBtn").click();
  await workers.locator(".site-log-entry", { hasText: "משה כהן" }).locator(".site-log-entry-remove").click();
  await expect(workers.locator(".site-log-entry")).toHaveCount(0);
});

test("diary: 'העתקת יומן קודם' copies yesterday's attendance", async ({ page }) => {
  await openLocalApp(page);
  await goToDate(page, isoDaysAgo(1));
  await page.locator("#calendarFabBtn").click();
  await page.locator("#siteLogAttendanceBtn").click();
  const workers = page.locator("#siteLogAttendanceColumns .site-log-col").nth(2);
  await workers.locator(".site-log-add-btn").click();
  await workers.locator(".site-log-add-input").fill("יוסי");
  await workers.locator(".site-log-add-input").press("Enter");
  await expect(workers.locator(".site-log-entry", { hasText: "יוסי" })).toBeVisible();
  await page.locator("#siteLogAttendanceBackBtn").click();

  await goToDate(page, isoDaysAgo(0));
  await page.locator("#calendarFabBtn").click();
  await page.locator("#siteLogAttendanceBtn").click();
  await expect(workers.locator(".site-log-entry")).toHaveCount(0);
  await page.locator("#siteLogAttendanceCopyPrevBtn").click();
  await page.locator("#confirmYesBtn").click();
  await expect(workers.locator(".site-log-entry", { hasText: "יוסי" })).toBeVisible();
});

test("a done task can be moved into the diary's works", async ({ page }) => {
  await openLocalApp(page);
  const row = await addTask(page, "יציקת תקרה");
  await row.click();
  await row.click();
  await expect(row).toHaveClass(/done/);
  await longPress(page, row);
  await page.locator("#transferToLogBtn").click();

  await page.locator("#calendarFabBtn").click();
  await page.locator("#siteLogPreviewBtn").click();
  await expect(page.locator("#siteLogPreviewContent")).toContainText("יציקת תקרה");

  // and back out again
  await page.locator("#siteLogPreviewBackBtn").click();
  await page.locator("#tasksFabBtn").click();
  await longPress(page, row);
  await page.locator("#removeFromLogBtn").click();
  await page.locator("#calendarFabBtn").click();
  await page.locator("#siteLogPreviewBtn").click();
  await expect(page.locator("#siteLogPreviewContent")).not.toContainText("יציקת תקרה");
});
