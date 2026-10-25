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

test("library: folders inside folders, files dragged into them or moved from the menu, back goes up one folder", async ({ page }) => {
  await openWithSharedProject(page, { phone: ME, sheet: { id: "p1", name: "בניין A", members: [ME], tasks: [] } });
  await page.locator("#libraryBtn").click();
  await expect(page.locator("#libraryAddFolderBtn img")).toHaveAttribute("src", /tasks-folder-add-icon/);
  const grid = page.locator("#libraryFoldersGrid");
  await grid.locator(".library-item", { hasText: "תוכניות" }).click();

  // an empty folder inside "תוכניות", named by me
  await expect(page.locator("#libraryAddSubfolderBtn")).toBeVisible();
  await page.locator("#libraryAddSubfolderBtn").click();
  await page.locator("#libraryFolderNameInput").fill("חשמל");
  await page.locator("#libraryFolderNameOkBtn").click();
  const sub = page.locator("#libraryGrid .library-folder-tile", { hasText: "חשמל" });
  await expect(sub).toBeVisible();
  const plans = async () => (await folders(page)).find((f) => f.key === "plans");
  await expect.poll(async () => (await folders(page)).find((f) => f.name === "חשמל")?.parentId).toBe((await plans()).id);
  // it's not on the first screen - only inside its parent
  await page.locator("#libraryFileInput").setInputFiles([
    { name: "a.pdf", mimeType: "application/pdf", buffer: Buffer.from("%PDF-1.4 a") },
    { name: "b.pdf", mimeType: "application/pdf", buffer: Buffer.from("%PDF-1.4 b") },
  ]);
  const fileA = page.locator("#libraryGrid .library-item", { hasText: "a.pdf" });
  await expect(fileA).toBeVisible();
  await expect(page.locator("#libraryGrid .library-item", { hasText: "b.pdf" })).toBeVisible();

  // hold a.pdf until it lifts, drag it onto "חשמל"
  const fb = await fileA.boundingBox(), sb = await sub.boundingBox();
  await page.mouse.move(fb.x + fb.width / 2, fb.y + fb.height / 2);
  await page.mouse.down();
  await page.waitForTimeout(600);
  for (let i = 1; i <= 8; i++) await page.mouse.move(fb.x + fb.width / 2 + (sb.x + sb.width / 2 - fb.x - fb.width / 2) * i / 8, fb.y + fb.height / 2 + (sb.y + sb.height / 2 - fb.y - fb.height / 2) * i / 8);
  await expect(sub).toHaveClass(/library-drop-over/);
  await page.mouse.up();
  await expect(fileA).toHaveCount(0);
  await expect.poll(async () => (await folders(page)).find((f) => f.name === "חשמל").files.map((x) => x.name)).toEqual(["a.pdf"]);
  expect((await plans()).files.map((x) => x.name)).toEqual(["b.pdf"]);

  // b.pdf: held and let go -> the menu -> "העברה לתיקייה" -> "תוכניות / חשמל"
  const fileB = page.locator("#libraryGrid .library-item", { hasText: "b.pdf" });
  const bb = await fileB.boundingBox();
  await page.mouse.move(bb.x + bb.width / 2, bb.y + bb.height / 2);
  await page.mouse.down();
  await page.waitForTimeout(600);
  await page.mouse.up();
  await expect(page.locator("#libraryFileActionOverlay")).toBeVisible();
  await page.locator("#libraryFileActionMoveBtn").click();
  await page.locator("#libraryMoveList button", { hasText: "תוכניות / חשמל" }).click();
  await expect.poll(async () => (await folders(page)).find((f) => f.name === "חשמל").files.map((x) => x.name).sort()).toEqual(["a.pdf", "b.pdf"]);

  // into the subfolder: the title shows where it is; back goes up to "תוכניות"
  await sub.click();
  await expect(page.locator("#libraryHeadTitle")).toHaveText("תוכניות / חשמל");
  await expect(page.locator("#libraryGrid .library-item")).toHaveCount(2);
  await page.locator("#libraryBackBtn").click();
  await expect(page.locator("#libraryHeadTitle")).toHaveText("תוכניות");
  await page.locator("#libraryBackBtn").click();
  await expect(grid).toBeVisible();
  await expect(grid.locator(".library-item", { hasText: "חשמל" })).toHaveCount(0);

  // deleting the parent... (a built-in can't go) - delete "חשמל" with its files
  await grid.locator(".library-item", { hasText: "תוכניות" }).click();
  await sub.locator(".library-item-delete").click();
  if (await page.locator("#confirmOverlay").isVisible()) await page.locator("#confirmYesBtn").click();
  await expect(sub).toHaveCount(0);
  await expect.poll(async () => (await folders(page)).some((f) => f.name === "חשמל")).toBe(false);
});
