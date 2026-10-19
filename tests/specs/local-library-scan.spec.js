const { test, expect } = require("@playwright/test");
const { openWithSharedProject } = require("./helpers/local-app");

// Library "סריקת מסמך": pages from the camera -> one PDF -> a folder the
// user picks (against the fake server's storage).
test.use({ viewport: { width: 390, height: 800 }, serviceWorkers: "block" });

const ME = "+972500000001";
const folders = (page) => page.evaluate(() => window.__backend.tables.shared_projects[0].data.folders || []);

// a photo-like page: grey paper with dark lines of "text"
async function pagePhoto(page, w, h) {
  const b64 = await page.evaluate(([w, h]) => {
    const c = document.createElement("canvas");
    c.width = w; c.height = h;
    const ctx = c.getContext("2d");
    ctx.fillStyle = "#b8b2a6"; ctx.fillRect(0, 0, w, h);
    ctx.fillStyle = "#3a3a3a";
    for (let y = 40; y < h - 40; y += 30) ctx.fillRect(30, y, w - 60, 8);
    return c.toDataURL("image/jpeg", 0.9).split(",")[1];
  }, [w, h]);
  return Buffer.from(b64, "base64");
}

// a white sheet (100,150)-(500,750) with text lines on a dark table, 600x900
async function sheetOnTable(page) {
  const b64 = await page.evaluate(() => {
    const c = document.createElement("canvas");
    c.width = 600; c.height = 900;
    const ctx = c.getContext("2d");
    ctx.fillStyle = "#2a2622"; ctx.fillRect(0, 0, 600, 900);
    ctx.fillStyle = "#e8e4da"; ctx.fillRect(100, 150, 400, 600);
    ctx.fillStyle = "#333";
    for (let y = 190; y < 720; y += 40) ctx.fillRect(130, y, 340, 6);
    return c.toDataURL("image/jpeg", 0.92).split(",")[1];
  });
  return Buffer.from(b64, "base64");
}

test("scan: photograph pages, edit them, save one PDF into a chosen folder", async ({ page }) => {
  // (crop, rotate, filter and brightness in the editor that opens after each photo)
  // save one PDF into a chosen folder", async ({ page }) => {
  await openWithSharedProject(page, { phone: ME, sheet: { id: "p1", name: "בניין A", members: [ME], tasks: [] } });
  await page.locator("#libraryBtn").click();
  const scanBtn = page.locator("#libraryScanBtn");
  await expect(scanBtn).toBeVisible();
  // on the right, level with the add-folder "+" on the left
  const [scanBox, addBox] = [await scanBtn.boundingBox(), await page.locator("#libraryAddFolderBtn").boundingBox()];
  expect(Math.abs(scanBox.y - addBox.y)).toBeLessThan(2);
  expect(scanBox.x).toBeGreaterThan(addBox.x + 200);

  await scanBtn.click();
  await expect(page.locator("#scanOverlay")).toBeVisible();
  await expect(page.locator("#scanSaveBtn")).toBeDisabled();
  await expect(page.locator("#scanName")).toHaveValue(/^סריקה \d\d-\d\d-\d{4} \d\d-\d\d$/);

  // a page shot on a dark table: the editor opens, the corners are dragged
  // onto the sheet -> only the sheet is kept
  await page.locator("#scanCameraInput").setInputFiles({ name: "p1.jpg", mimeType: "image/jpeg", buffer: await sheetOnTable(page) });
  await expect(page.locator("#scanEditor")).toBeVisible();
  await expect(page.locator(".scan-handle").first()).toBeVisible();
  const box = await page.locator("#scanEditorCanvas").boundingBox();
  const targets = [[100, 150], [500, 150], [500, 750], [100, 750]]; // the sheet, in a 600x900 photo
  for (let i = 0; i < 4; i++) {
    const h = await page.locator(".scan-handle").nth(i).boundingBox();
    await page.mouse.move(h.x + h.width / 2, h.y + h.height / 2);
    await page.mouse.down();
    await page.mouse.move(box.x + targets[i][0] / 600 * box.width, box.y + targets[i][1] / 900 * box.height, { steps: 4 });
    await page.mouse.up();
  }
  await page.locator("#scanEditDoneBtn").click();
  await expect(page.locator("#scanEditor")).toBeHidden();
  await expect(page.locator(".scan-page")).toHaveCount(1);
  const first = await page.locator(".scan-page canvas").first().evaluate((c) => {
    const d = c.getContext("2d").getImageData(0, 0, c.width, c.height).data;
    let dark = 0; for (let i = 0; i < d.length; i += 4) if (d[i] < 60) dark++;
    return { ratio: c.width / c.height, darkShare: dark / (c.width * c.height) };
  });
  expect(first.ratio).toBeGreaterThan(0.6); expect(first.ratio).toBeLessThan(0.73); // 400x600, not 600x900
  expect(first.darkShare).toBeLessThan(0.2); // the dark table is gone

  // a landscape page: rotated and set to grey in the editor
  await page.locator("#scanCameraInput").setInputFiles({ name: "p2.jpg", mimeType: "image/jpeg", buffer: await pagePhoto(page, 800, 600) });
  await expect(page.locator("#scanEditor")).toBeVisible();
  await page.locator("#scanRotateRightBtn").click();
  await page.locator(".scan-filter-btn[data-filter=gray]").click();
  await expect(page.locator(".scan-filter-btn[data-filter=gray]")).toHaveClass(/active/);
  await page.locator(".scan-editor-tab[data-mode=light]").click();
  await page.locator("#scanBrightness").fill("20");
  await page.locator("#scanEditDoneBtn").click();
  const second = await page.locator(".scan-page canvas").nth(1).evaluate((c) => c.height > c.width);
  expect(second).toBe(true);

  // from the gallery: no editor; tapping the page opens it, ✕ drops it
  await page.locator("#scanGalleryInput").setInputFiles({ name: "p3.jpg", mimeType: "image/jpeg", buffer: await pagePhoto(page, 600, 800) });
  await expect(page.locator(".scan-page")).toHaveCount(3);
  await expect(page.locator("#scanEditor")).toBeHidden();
  await expect(page.locator("#scanSaveBtn")).toBeEnabled();
  // document mode: the grey paper comes out white
  const corner = await page.locator(".scan-page canvas").nth(2).evaluate((c) => Array.from(c.getContext("2d").getImageData(2, 2, 1, 1).data));
  expect(corner[0]).toBeGreaterThan(245);
  await page.locator(".scan-page").nth(2).click();
  await expect(page.locator("#scanEditor")).toBeVisible();
  await page.locator("#scanEditCancelBtn").click();
  await page.locator(".scan-page").nth(2).locator(".scan-page-del").click();
  await expect(page.locator(".scan-page")).toHaveCount(2);

  await page.locator("#scanName").fill("תעודת משלוח");
  await page.locator("#scanSaveBtn").click();
  const picker = page.locator("#chatSaveFolderOverlay");
  await expect(picker).toBeVisible();
  await picker.locator("button", { hasText: "תוכניות" }).click();

  await expect(page.locator("#scanOverlay")).toBeHidden();
  await expect.poll(async () => {
    const f = (await folders(page)).find((x) => x.key === "plans");
    return f && f.files.map((x) => x.name);
  }).toEqual(["תעודת משלוח.pdf"]);
  const uploads = await page.evaluate(() => window.__backend.uploads);
  expect(uploads).toEqual([expect.objectContaining({ bucket: "project-files", path: expect.stringMatching(/^p1\/.+\.pdf$/) })]);
  expect(uploads[0].size).toBeGreaterThan(1000);
});

test("scan: ביטול with pages asks first", async ({ page }) => {
  await openWithSharedProject(page, { phone: ME, sheet: { id: "p1", name: "בניין A", members: [ME], tasks: [] } });
  await page.locator("#libraryBtn").click();
  await page.locator("#libraryScanBtn").click();
  await page.locator("#scanCameraInput").setInputFiles({ name: "p1.jpg", mimeType: "image/jpeg", buffer: await pagePhoto(page, 300, 400) });
  await page.locator("#scanEditDoneBtn").click();
  await expect(page.locator(".scan-page")).toHaveCount(1);
  await page.locator("#scanCancelBtn").click();
  await expect(page.locator("#confirmOverlay")).toBeVisible();
  await page.locator("#confirmYesBtn").click();
  await expect(page.locator("#scanOverlay")).toBeHidden();
  expect(await page.evaluate(() => window.__backend.uploads)).toEqual([]);
});
