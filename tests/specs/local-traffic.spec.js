const { test, expect } = require("@playwright/test");
const { openWithSharedProject } = require("./helpers/local-app");

// Server traffic: a refresh of the shared projects reads a light list (ids,
// names, members, version stamps) and fetches whole rows only for projects
// that changed; a failed read keeps what's on screen. The open chat
// checks its version stamp and reads the messages only when they changed.
test.use({ viewport: { width: 390, height: 800 }, serviceWorkers: "block" });

const ME = "+972500000001";
const sheet = (id, name) => ({ id, name, members: [ME], tasks: [{ id: id + "t", text: "משימה ב" + name, status: 0, type: "task", date: new Date().toISOString().slice(0, 10), createdAt: 1 }] });
const reads = (page, cols) => page.evaluate((c) => window.__backend.log.filter((l) => l.table === "shared_projects" && l.op === "select" && l.cols === c), cols);

test("a refresh fetches whole rows only for projects that changed", async ({ page }) => {
  await openWithSharedProject(page, { phone: ME, sheets: [sheet("p1", "בניין A"), sheet("p2", "בניין B")] });
  const refresh = () => page.evaluate(() => window.__hooks.loadSharedSheets());
  await refresh();
  const first = await reads(page, "*");
  expect(first).toHaveLength(1); // the first time: both, in one read
  await refresh();
  await refresh();
  expect(await reads(page, "*")).toHaveLength(1); // nothing changed: light reads only
  expect((await reads(page, "id, name, members, member_names, created_by, data_version, messages_version, updated_at")).length).toBe(3);

  // another member changes בניין B
  await page.evaluate(() => {
    const row = window.__backend.tables.shared_projects.find((r) => r.id === "p2");
    row.data.tasks.push({ id: "new", text: "לתאם משאבה", status: 0, type: "task", date: new Date().toISOString().slice(0, 10), createdAt: 2 });
    row.data_version++;
  });
  await refresh();
  const full = await reads(page, "*");
  expect(full).toHaveLength(2);
  expect(full[1].ins).toEqual([["id", ["p2"]]]); // just that one
  await expect(page.locator(".sheet-tab.active")).toContainText("בניין B"); // (on screen already)
  await expect(page.locator("#taskList li.task", { hasText: "לתאם משאבה" })).toBeVisible();
  // ...and בניין A still has its own
  await page.locator(".sheet-tab", { hasText: "בניין A" }).click();
  await expect(page.locator("#taskList li.task", { hasText: "משימה בבניין A" })).toBeVisible();
});

test("a failed read (server refusing) keeps the shared projects on screen", async ({ page }) => {
  await openWithSharedProject(page, { phone: ME, sheets: [sheet("p1", "בניין A")] });
  await page.evaluate(() => {
    const from = window.__backend.client.from;
    window.__backend.client.from = (t) => t === "shared_projects"
      ? { select: () => ({ then: (res) => Promise.resolve({ data: null, error: { message: "402" } }).then(res) }) }
      : from(t);
  });
  await page.evaluate(() => window.__hooks.loadSharedSheets());
  await expect(page.locator(".sheet-tab", { hasText: "בניין A" })).toBeVisible();
  await expect(page.locator("#taskList li.task", { hasText: "משימה בבניין A" })).toBeVisible();
});
