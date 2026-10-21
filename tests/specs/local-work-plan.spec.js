const { test, expect } = require("@playwright/test");
const { openLocalApp, openWithSharedProject } = require("./helpers/local-app");

// תוכנית עבודה: the Gantt work plan - a private project, a shared one
// (every member edits, written onto the server's fresh copy), and Head
// Office's combined chart.
test.use({ viewport: { width: 390, height: 800 }, serviceWorkers: "block" });

const ME = "+972500000001";
const pad = (n) => String(n).padStart(2, "0");
const iso = (delta) => { const d = new Date(); d.setDate(d.getDate() + delta); return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`; };
const serverPlan = (page, id) => page.evaluate((id) => (window.__backend.tables.shared_projects.find((r) => r.id === id).data.workPlan || []), id);

async function addActivity(page, { name, start, end, by }) {
  await page.locator("#workPlanAddBtn").click();
  await expect(page.locator("#workPlanEditOverlay")).toBeVisible();
  await page.locator("#wpName").fill(name);
  await page.locator("#wpStart").fill(start);
  await page.locator("#wpEnd").fill(end);
  if (by) await page.locator("#wpBy").fill(by);
  await page.locator("#workPlanEditForm button[type=submit]").click();
  await expect(page.locator("#workPlanEditOverlay")).toBeHidden();
}

test("private project: add, edit to done, late shown in red, any length, delete", async ({ page }) => {
  await openLocalApp(page);
  await expect(page.locator("#workPlanBtn")).toBeVisible(); // in the footer
  await page.locator("#workPlanBtn").click();
  await expect(page.locator("#workPlanView")).toBeVisible();
  await expect(page.locator("#workPlanEmpty")).toBeVisible();

  await addActivity(page, { name: "קירות מרתף", start: iso(-5), end: iso(-1), by: "צוות טפסנות" }); // ended yesterday, not done
  await addActivity(page, { name: "שלד – כל הקומות", start: iso(-2), end: iso(120) });              // four months long
  const rows = page.locator("#workPlanChart .wp-row:not(.wp-head-row)");
  await expect(rows).toHaveCount(2);
  await expect(rows.first()).toContainText("קירות מרתף");
  await expect(rows.first()).toContainText("צוות טפסנות");
  await expect(rows.first().locator(".wp-bar")).toHaveClass(/wp-late/);
  await expect(page.locator("#workPlanLateBanner")).toContainText("1");

  // "הכל" covers the whole plan
  await page.locator(".wp-zoom[data-zoom=all]").click();
  const box = await rows.nth(1).locator(".wp-bar").boundingBox();
  expect(box.width).toBeGreaterThan(200);
  await page.locator(".wp-zoom[data-zoom=week]").click();
  await expect(rows.nth(1).locator(".wp-bar")).toBeVisible();

  // done -> green, the late banner goes away
  await rows.first().click();
  await page.locator(".wp-status[data-status=done]").click();
  await expect(page.locator("#wpProgressLabel")).toContainText("100%");
  await page.locator("#workPlanEditForm button[type=submit]").click();
  await expect(rows.first().locator(".wp-bar")).toHaveClass(/wp-done/);
  await expect(page.locator("#workPlanLateBanner")).toBeHidden();

  // saved with the project, survives a reload
  await page.reload();
  await page.locator("#appRoot").waitFor({ state: "visible" });
  await page.locator("#workPlanBtn").click();
  await expect(rows).toHaveCount(2);

  await rows.nth(1).click();
  await page.locator("#wpDeleteBtn").click();
  await page.locator("#confirmYesBtn").click();
  await expect(rows).toHaveCount(1);
});

test("shared project: an activity is written into the server's copy, keeping another member's", async ({ page }) => {
  await openWithSharedProject(page, { phone: ME, sheet: { id: "p1", name: "בניין A", members: [ME, "+972500000002"], tasks: [] } });
  // another member already added one, after this device loaded
  await page.evaluate(() => {
    window.__backend.tables.shared_projects[0].data.workPlan = [{ id: "other", name: "חפירה", start: "2026-01-01", end: "2026-01-05", by: "", status: "done", progress: 100 }];
  });
  await page.locator("#workPlanBtn").click();
  await addActivity(page, { name: "איטום", start: iso(0), end: iso(3), by: "קבלן איטום" });
  await expect.poll(async () => (await serverPlan(page, "p1")).map((x) => x.name).sort()).toEqual(["איטום", "חפירה"]);
  const mine = (await serverPlan(page, "p1")).find((x) => x.name === "איטום");
  expect(mine).toMatchObject({ start: iso(0), end: iso(3), by: "קבלן איטום", status: "todo", updatedBy: ME });
});

test("Head Office: one chart of every project's plan, late ones flagged", async ({ page }) => {
  await openWithSharedProject(page, { phone: ME, sheets: [
    { id: "p1", name: "בניין A", members: [ME], tasks: [], workPlan: [
      { id: "a1", name: "קירות", start: iso(-6), end: iso(-2), by: "", status: "prog", progress: 60 },
      { id: "a2", name: "תקרה", start: iso(1), end: iso(5), by: "", status: "todo", progress: 0 }] },
    { id: "p2", name: "חולון", members: [ME], tasks: [], workPlan: [
      { id: "b1", name: "חיפוי", start: iso(-3), end: iso(10), by: "", status: "prog", progress: 20 }] },
    { id: "p3", name: "רמת גן", members: [ME], tasks: [] },
  ] });
  await page.evaluate((me) => {
    window.__backend.tables.office_groups = [{ id: "g1", creator_phone: me }];
    return window.__hooks.loadMyOfficeGroups();
  }, ME);
  await page.locator("#headOfficeIconBtn").click();
  await expect(page.locator("#headOfficeIconBtn")).toHaveClass(/active/);
  await page.locator("#workPlanBtn").click();
  await expect(page.locator("#workPlanTitle")).toHaveText("תוכנית עבודה מרוכזת");
  await expect(page.locator(".wp-group")).toHaveText([/בניין A.*1 באיחור/, /חולון/]); // no empty projects
  await expect(page.locator("#workPlanLateBanner")).toContainText("1 פעילויות באיחור ב-1 פרויקטים");
  // collapse a project
  await page.locator(".wp-group", { hasText: "בניין A" }).click();
  await expect(page.locator("#workPlanChart .wp-row:not(.wp-head-row)")).toHaveCount(1);
  // adding from Head Office asks which project
  await page.locator("#workPlanAddBtn").click();
  await expect(page.locator("#wpProjectRow")).toBeVisible();
  await page.locator("#wpProject").selectOption({ label: "רמת גן" });
  await page.locator("#wpName").fill("גמרים");
  await page.locator("#workPlanEditForm button[type=submit]").click();
  await expect.poll(async () => (await serverPlan(page, "p3")).map((x) => x.name)).toEqual(["גמרים"]);
  await expect(page.locator(".wp-group")).toHaveCount(3);
});
