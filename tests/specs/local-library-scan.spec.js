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

test("scan: photograph pages, clean them up, save one PDF into a chosen folder", async ({ page }) => {
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

  await page.locator("#scanCameraInput").setInputFiles({ name: "p1.jpg", mimeType: "image/jpeg", buffer: await pagePhoto(page, 600, 800) });
  await page.locator("#scanCameraInput").setInputFiles({ name: "p2.jpg", mimeType: "image/jpeg", buffer: await pagePhoto(page, 800, 600) });
  await page.locator("#scanGalleryInput").setInputFiles({ name: "p3.jpg", mimeType: "image/jpeg", buffer: await pagePhoto(page, 600, 800) });
  await expect(page.locator(".scan-page")).toHaveCount(3);
  await expect(page.locator("#scanSaveBtn")).toBeEnabled();

  // document mode: the grey paper comes out white
  const corner = await page.locator(".scan-page canvas").first().evaluate((c) => Array.from(c.getContext("2d").getImageData(2, 2, 1, 1).data));
  expect(corner[0]).toBeGreaterThan(245);

  // rotate the landscape page, drop the third
  await page.locator(".scan-page").nth(1).locator(".scan-page-rotate").click();
  const rotated = await page.locator(".scan-page canvas").nth(1).evaluate((c) => c.height > c.width);
  expect(rotated).toBe(true);
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
  await expect(page.locator(".scan-page")).toHaveCount(1);
  await page.locator("#scanCancelBtn").click();
  await expect(page.locator("#confirmOverlay")).toBeVisible();
  await page.locator("#confirmYesBtn").click();
  await expect(page.locator("#scanOverlay")).toBeHidden();
  expect(await page.evaluate(() => window.__backend.uploads)).toEqual([]);
});
