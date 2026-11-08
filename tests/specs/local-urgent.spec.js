const { test, expect } = require("@playwright/test");
const { openWithSharedProject } = require("./helpers/local-app");

// The red dot by the app's name: how many urgent tasks are open, in all
// projects; a tap opens them on one page, to tick off or un-urgent.
test.use({ viewport: { width: 390, height: 800 }, serviceWorkers: "block" });

const ME = "+972500000001";
const pad = (n) => String(n).padStart(2, "0");
const iso = (d0) => { const d = new Date(); d.setDate(d.getDate() + d0); return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`; };
const T = (id, text, urgent, extra) => Object.assign({ id, text, status: 0, type: "task", date: iso(0), createdAt: 1, urgent }, extra);
const sheets = [
  { id: "p1", name: "כביש הדקלים", members: [ME], tasks: [T("a", "להזמין אספלט", true), T("b", "לא דחוף", false), T("c", "לתאם מכבש", true, { date: iso(-2) })] },
  { id: "p2", name: "מתנ\"ס קלור", members: [ME], tasks: [T("d", "בדיקת בטון", true), T("e", "בוצעה כבר", true, { status: 2 })] },
];
const server = (page, id) => page.evaluate((id) => window.__backend.tables.shared_projects.find((r) => r.id === id).data.tasks, id);

test("the red dot counts the urgent tasks of every project and opens them on one page", async ({ page }) => {
  await openWithSharedProject(page, { phone: ME, sheets });
  await expect(page.locator("#urgentDotBtn")).toHaveClass(/has-urgent/);
  await expect(page.locator("#urgentCount")).toHaveText("3");

  await page.locator("#urgentDotBtn").click();
  const view = page.locator("#urgentView");
  await expect(view).toBeVisible();
  await expect(view.locator(".urgent-row")).toHaveCount(3);
  await expect(view).toContainText("כביש הדקלים");
  await expect(view).toContainText("מתנ\"ס קלור");
  await expect(view).not.toContainText("לא דחוף");
  await expect(view).not.toContainText("בוצעה כבר");

  // ticked: partly, then done - stays on the page, saved
  const row = view.locator(".urgent-row", { hasText: "להזמין אספלט" });
  await row.locator(".morning-mark").click();
  await row.locator(".morning-mark").click();
  await expect(view.locator(".urgent-row", { hasText: "להזמין אספלט" })).toHaveClass(/done/);
  await expect.poll(async () => (await server(page, "p1")).find((t) => t.id === "a").status).toBe(2);
  await expect(page.locator("#urgentCount")).toHaveText("2");

  // no longer urgent: off the page
  await view.locator(".urgent-row", { hasText: "בדיקת בטון" }).locator(".urgent-unmark").click();
  await expect(view.locator(".urgent-row", { hasText: "בדיקת בטון" })).toHaveCount(0);
  await expect.poll(async () => (await server(page, "p2")).find((t) => t.id === "d").urgent).toBe(false);
  await expect(page.locator("#urgentCount")).toHaveText("1");

  // tapping a task opens it in its project
  await view.locator(".urgent-row", { hasText: "לתאם מכבש" }).locator(".urgent-task-text").click();
  await expect(view).toBeHidden();
  await expect(page.locator("#taskList li.task", { hasText: "לתאם מכבש" })).toBeVisible();
});
