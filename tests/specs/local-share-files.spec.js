const { test, expect } = require("@playwright/test");
const { openWithSharedProject } = require("./helpers/local-app");

// Photos / PDFs shared into ITASK from WhatsApp or the gallery (app
// version 31+) are saved into a folder of a project's library.
test.use({ viewport: { width: 390, height: 800 }, serviceWorkers: "block" });

const ME = "+972500000001";
const sheets = [
  { id: "p1", name: "כביש הדקלים", members: [ME], tasks: [] },
  { id: "p2", name: "מתנ\"ס קלור", members: [ME], tasks: [] },
];
const folders = (page, id) => page.evaluate((id) => window.__backend.tables.shared_projects.find((r) => r.id === id).data.folders || [], id);
const share = (page, files) => page.evaluate((files) => window.__native.listeners.launchView({ view: "share", files }), files);

test("shared photos go to the chosen project's photos folder, a PDF to the folder chosen", async ({ page }) => {
  await openWithSharedProject(page, { phone: ME, native: true, sheets });
  await expect.poll(() => page.evaluate(() => !!(window.__native.listeners && window.__native.listeners.launchView))).toBe(true);

  await share(page, [
    { name: "IMG-1.jpg", type: "image/jpeg", size: 0, path: "/cache/shared-in/0-IMG-1.jpg" },
    { name: "IMG-2.jpg", type: "image/jpeg", size: 0, path: "/cache/shared-in/1-IMG-2.jpg" },
  ]);
  const modal = page.locator("#shareFilesOverlay");
  await expect(modal).toBeVisible();
  await expect(modal.locator("#shareFilesList li")).toHaveCount(2);
  await page.locator("#shareFilesProject").selectOption("p2");
  await expect(page.locator("#shareFilesFolder option:checked")).toHaveText("תמונות");
  await page.locator("#shareFilesSaveBtn").click();
  await expect(modal).toBeHidden();
  await expect.poll(async () => {
    const photos = (await folders(page, "p2")).find((f) => f.key === "photos");
    return ((photos && photos.files) || []).map((f) => f.name).sort();
  }).toEqual(["IMG-1.jpg", "IMG-2.jpg"]);
  const ups = await page.evaluate(() => window.__backend.uploads.map((u) => u.path));
  expect(ups.every((p) => p.startsWith("p2/"))).toBe(true);

  // a PDF: any folder, chosen here - and remembered for that project
  await share(page, [{ name: "חשבון 7.pdf", type: "application/pdf", size: 0, path: "/cache/shared-in/0-x.pdf" }]);
  await expect(modal).toBeVisible();
  await page.locator("#shareFilesProject").selectOption("p1");
  await expect(page.locator("#shareFilesFolder option")).not.toHaveCount(0);
  await page.locator("#shareFilesFolder").selectOption({ label: "תוכניות" });
  await page.locator("#shareFilesSaveBtn").click();
  await expect(modal).toBeHidden();
  await expect.poll(async () => {
    const plans = (await folders(page, "p1")).find((f) => f.key === "plans");
    return ((plans && plans.files) || []).map((f) => f.name);
  }).toEqual(["חשבון 7.pdf"]);

  await share(page, [{ name: "b.pdf", type: "application/pdf", size: 0, path: "/cache/shared-in/0-b.pdf" }]);
  await page.locator("#shareFilesProject").selectOption("p1");
  await expect(page.locator("#shareFilesFolder option:checked")).toHaveText("תוכניות");
  await page.locator("#shareFilesCancelBtn").click();
  await expect(modal).toBeHidden();
});

test("shared text still opens the add-task window", async ({ page }) => {
  await openWithSharedProject(page, { phone: ME, native: true, sheets });
  await expect.poll(() => page.evaluate(() => !!(window.__native.listeners && window.__native.listeners.launchView))).toBe(true);
  await page.evaluate(() => window.__native.listeners.launchView({ view: "share", text: "להזמין מצע" }));
  await expect(page.locator("#shareTaskOverlay")).toBeVisible();
  await expect(page.locator("#shareFilesOverlay")).toBeHidden();
});
