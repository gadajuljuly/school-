const { test, expect } = require("@playwright/test");
const { openWithSharedProject } = require("./helpers/local-app");

// The shared projects are checked every 10 seconds; when nothing changed on
// the server the page is left as it is - no redraw (it cost battery and
// cancelled what was under the finger) - and a real change still shows.
test.use({ viewport: { width: 390, height: 800 }, serviceWorkers: "block" });
const ME = "+972500000001";
const today = () => { const d = new Date(), p = (n) => String(n).padStart(2, "0"); return d.getFullYear() + "-" + p(d.getMonth() + 1) + "-" + p(d.getDate()); };
const T = (id, text, date) => ({ id, text, status: 0, type: "task", date: date || today(), createdAt: 1 });

test("nothing new on the server: no redraw; another member's change: shown", async ({ page }) => {
  await openWithSharedProject(page, { phone: ME, sheet: { id: "p1", name: "בניין A", members: [ME, "+972500000002"], tasks: [T("t1", "לסגור ביוב")] } });
  await page.evaluate(() => window.__hooks.loadSharedSheets()); // (the first read: everything new)
  // mark the task's row on screen; quiet checks leave that very row in place
  await page.evaluate(() => { document.querySelector("#taskList li.task").dataset.mark = "same"; });
  await page.evaluate(() => window.__hooks.loadSharedSheets());
  await page.evaluate(() => window.__hooks.loadSharedSheets());
  await expect(page.locator("#taskList li.task[data-mark=same]")).toHaveCount(1);
  // the other member adds a task: it shows
  await page.evaluate((t) => {
    const r = window.__backend.tables.shared_projects[0];
    r.data.tasks.push(t);
    r.data_version += 1;
    return window.__hooks.loadSharedSheets();
  }, T("t2", "להזמין בטון"));
  await expect(page.locator("#taskList li.task", { hasText: "להזמין בטון" })).toBeVisible();
  await expect(page.locator("#taskList li.task[data-mark=same]")).toHaveCount(0); // (drawn again)
});

test("a quiet check after midnight still moves yesterday's open tasks to today", async ({ page }) => {
  await openWithSharedProject(page, { phone: ME, sheet: { id: "p1", name: "בניין A", members: [ME], tasks: [T("t1", "לסגור ביוב")] } });
  await page.evaluate(() => window.__hooks.loadSharedSheets());
  // as if the day turned: the task's day is now "yesterday" (on this phone only)
  await page.evaluate(() => window.__hooks.updateSharedTaskForTest("p1", "t1", (t) => { t.date = "2000-01-01"; }));
  await expect(page.locator("#taskList li.task", { hasText: "לסגור ביוב" })).toHaveCount(0);
  await page.evaluate(() => window.__hooks.loadSharedSheets()); // nothing new on the server
  await expect(page.locator("#taskList li.task", { hasText: "לסגור ביוב" })).toBeVisible();
});
