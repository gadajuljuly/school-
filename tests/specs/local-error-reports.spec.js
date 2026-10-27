const { test, expect } = require("@playwright/test");
const { openWithSharedProject } = require("./helpers/local-app");

// Error reports: what breaks lands in app_errors on the (fake) server.
test.use({ viewport: { width: 390, height: 800 }, serviceWorkers: "block" });
const ME = "+972500000001";

test("errors are reported once each, with who / build / screen; network noise isn't", async ({ page }) => {
  await openWithSharedProject(page, { phone: ME, sheet: { id: "p1", name: "בניין A", members: [ME], tasks: [] } });
  const rows = () => page.evaluate(() => (window.__backend.tables.app_errors || []).map((r) => ({ ...r })));
  await page.evaluate(() => {
    setTimeout(() => { throw new Error("boom in a timer"); }, 0);
    setTimeout(() => { throw new Error("boom in a timer"); }, 5); // the same again: once
    Promise.reject(new Error("nobody caught me"));
    console.error("sketch save failed:", new Error("bucket full"));
    Promise.reject(new TypeError("Failed to fetch")); // offline noise
  });
  await expect.poll(async () => (await rows()).map((r) => r.kind).sort()).toEqual(["error", "logged", "promise"]);
  const all = await rows();
  const err = all.find((r) => r.kind === "error");
  expect(err).toMatchObject({ message: expect.stringContaining("boom in a timer"), phone: ME, view: "tasks" });
  expect(err.build).toMatch(/^[0-9a-f]{6,}$/);
  expect(err.stack).toContain("boom in a timer");
  expect(all.find((r) => r.kind === "logged").message).toBe("sketch save failed: bucket full");
  expect(all.some((r) => /Failed to fetch/.test(r.message))).toBe(false);
});
