const { test, expect } = require("@playwright/test");
const { openWithSharedProject } = require("./helpers/local-app");

// The project file library (against the fake server's storage) and the
// periodic work-diary report.
test.use({ viewport: { width: 390, height: 800 }, serviceWorkers: "block", acceptDownloads: true });

const ME = "+972500000001";
const pad = (n) => String(n).padStart(2, "0");
const iso = (daysAgo) => { const d = new Date(); d.setDate(d.getDate() - daysAgo); return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`; };
const folders = (page) => page.evaluate(() => window.__backend.tables.shared_projects[0].data.folders || []);

test("library: new folder, upload a file into it, delete the file and the folder", async ({ page }) => {
  await openWithSharedProject(page, { phone: ME, sheet: { id: "p1", name: "בניין A", members: [ME], tasks: [] } });
  await page.locator("#libraryBtn").click();
  const grid = page.locator("#libraryFoldersGrid");
  await expect(grid).toContainText("תוכניות"); // the built-in folders
  await expect(grid).toContainText("הזמנות רכש");

  await page.locator("#libraryAddFolderBtn").click();
  await page.locator("#libraryFolderNameInput").fill("חוזים");
  await page.locator("#libraryFolderNameOkBtn").click();
  const folder = grid.locator(".library-item", { hasText: "חוזים" });
  await expect(folder).toBeVisible();
  await expect.poll(async () => (await folders(page)).map((f) => f.name)).toContain("חוזים");

  await folder.click();
  await expect(page.locator("#libraryHeadTitle")).toHaveText("חוזים");
  await page.locator("#libraryFileInput").setInputFiles({ name: "contract.pdf", mimeType: "application/pdf", buffer: Buffer.from("%PDF-1.4 test") });
  const file = page.locator("#libraryGrid .library-item", { hasText: "contract.pdf" });
  await expect(file).toBeVisible();
  await expect.poll(async () => {
    const f = (await folders(page)).find((x) => x.name === "חוזים");
    return f && f.files.map((x) => x.name);
  }).toEqual(["contract.pdf"]);
  const uploads = await page.evaluate(() => window.__backend.uploads);
  expect(uploads).toEqual([expect.objectContaining({ bucket: "project-files", path: expect.stringMatching(/^p1\/.+contract\.pdf$/) })]);

  // delete the file
  await file.locator(".library-item-delete, button", { hasText: "✕" }).first().click();
  if (await page.locator("#confirmOverlay").isVisible()) await page.locator("#confirmYesBtn").click();
  await expect(file).toHaveCount(0);
  await expect.poll(async () => (await folders(page)).find((x) => x.name === "חוזים").files).toEqual([]);

  // and the folder
  await page.locator("#libraryBackBtn").click();
  await folder.locator("button", { hasText: "✕" }).first().click();
  if (await page.locator("#confirmOverlay").isVisible()) await page.locator("#confirmYesBtn").click();
  await expect(folder).toHaveCount(0);
  await expect.poll(async () => (await folders(page)).map((f) => f.name)).not.toContain("חוזים");
});

test("closing the day's log files it in the library; the periodic report covers closed logs only", async ({ page }) => {
  const dialogs = [];
  page.on("dialog", (d) => dialogs.push(d.message()));
  await openWithSharedProject(page, { phone: ME, sheet: { id: "p1", name: "בניין A", members: [ME], tasks: [] } });
  await page.locator("#calendarFabBtn").click();

  // nothing closed yet -> a message, no file
  await page.locator("#siteLogPeriodicBtn").click();
  await page.locator("#siteLogPeriodicFromInput").fill(iso(6));
  await page.locator("#siteLogPeriodicToInput").fill(iso(0));
  await page.locator("#siteLogPeriodicGenerateBtn").click();
  await expect.poll(() => dialogs.length).toBe(1);
  await page.locator("#siteLogPeriodicCancelBtn").click();

  // fill today's attendance and close the day's log
  await page.locator("#siteLogAttendanceBtn").click();
  const workers = page.locator("#siteLogAttendanceColumns .site-log-col").nth(2);
  await workers.locator(".site-log-add-btn").click();
  await workers.locator(".site-log-add-input").fill("משה כהן");
  await workers.locator(".site-log-add-input").press("Enter");
  await page.locator("#siteLogAttendanceBackBtn").click();
  await page.locator("#siteLogCloseBtn").click();
  if (await page.locator("#confirmOverlay").isVisible()) await page.locator("#confirmYesBtn").click();
  await expect.poll(async () => {
    const log = ((await page.evaluate(() => window.__backend.tables.shared_projects[0].data.siteLogs)) || []).find((l) => l.date === iso(0));
    return log && { closed: log.closed, number: log.number };
  }, { timeout: 15000 }).toEqual({ closed: true, number: 1 });
  const diaries = (await folders(page)).find((f) => f.key === "diaries");
  expect(diaries.files).toHaveLength(1);
  expect(diaries.files[0].name).toContain("בניין A");

  await page.locator("#siteLogPeriodicBtn").click();
  await page.locator("#siteLogPeriodicFromInput").fill(iso(6));
  await page.locator("#siteLogPeriodicToInput").fill(iso(0));
  const download = page.waitForEvent("download", { timeout: 30000 });
  await page.locator("#siteLogPeriodicGenerateBtn").click();
  const bytes = require("fs").readFileSync(await (await download).path());
  expect(bytes.slice(0, 5).toString()).toBe("%PDF-");
  expect(bytes.length).toBeGreaterThan(10000);
  expect(dialogs).toHaveLength(1);
});
