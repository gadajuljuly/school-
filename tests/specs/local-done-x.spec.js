const { test, expect } = require("@playwright/test");
const { openWithSharedProject } = require("./helpers/local-app");

// The tasks done in a project: the "done" mark in the margin right of the
// red line, with how many; a tap shows them, another the open ones again.
test.use({ viewport: { width: 412, height: 900 }, serviceWorkers: "block" });

const ME = "+972500000001";
const pad = (n) => String(n).padStart(2, "0");
const iso = (d0) => { const d = new Date(); d.setDate(d.getDate() + d0); return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`; };
const T = (id, text, status, date) => ({ id, text, status, type: "task", date, createdAt: 1 });

test("the done mark: how many, a tap shows them, again back; right of the red line", async ({ page }) => {
  await openWithSharedProject(page, { phone: ME, sheet: { id: "p1", name: "רכבת נתניה", members: [ME],
    tasks: [T("a", "להזמין אספלט", 0, iso(0)), T("b", "בדיקת בטון", 2, iso(-3)), T("c", "יציקה", 2, iso(-1))] } });
  const x = page.locator("#doneTasksXBtn");
  await expect(x).toBeVisible();
  await expect(page.locator("#doneTasksXCount")).toHaveText("2");
  await expect(x.locator("svg path")).toHaveCount(2); // the mark and its red stroke
  await expect(page.locator("#showCompletedTasksBtn")).toBeHidden();

  // in the margin: right of the red line (.ruled-body::before), inside the page
  const pos = await page.evaluate(() => {
    const ruled = document.querySelector(".ruled-body").getBoundingClientRect();
    const line = ruled.right - 39;
    const b = document.getElementById("doneTasksXBtn").getBoundingClientRect();
    return { left: b.left - line, right: ruled.right - b.right };
  });
  expect(pos.left).toBeGreaterThanOrEqual(2);
  expect(pos.right).toBeGreaterThanOrEqual(0);

  await x.click();
  await expect(x).toHaveClass(/(^|\s)on(\s|$)/);
  await expect(page.locator("#taskList li.task")).toHaveText([/יציקה/, /בדיקת בטון/]);
  await expect(page.locator("#addForm")).toBeHidden();
  await x.click();
  await expect(x).not.toHaveClass(/(^|\s)on(\s|$)/);
  await expect(page.locator("#taskList li.task", { hasText: "להזמין אספלט" })).toBeVisible();
});

test("nothing done yet: the mark faint, no number", async ({ page }) => {
  await openWithSharedProject(page, { phone: ME, sheet: { id: "p1", name: "רכבת נתניה", members: [ME], tasks: [T("a", "להזמין אספלט", 0, iso(0))] } });
  await expect(page.locator("#doneTasksXBtn")).toHaveClass(/(^|\s)none(\s|$)/);
  await expect(page.locator("#doneTasksXCount")).toBeHidden();
});
