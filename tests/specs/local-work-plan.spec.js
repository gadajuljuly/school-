const { test, expect } = require("@playwright/test");
const { openLocalApp, openWithSharedProject, longPress } = require("./helpers/local-app");

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
  // (back to the whole plan: on a Sunday, last week's activity has no bar this week)
  await page.locator(".wp-zoom[data-zoom=all]").click();

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

// ---- stage 2: the plan in the daily task list ----

test("an activity under way is a task today; ticking it updates the plan, and back", async ({ page }) => {
  await openLocalApp(page);
  await page.locator("#workPlanBtn").click();
  await addActivity(page, { name: "קירות מרתף", start: iso(-2), end: iso(3), by: "צוות טפסנות" });
  await addActivity(page, { name: "תקרה", start: iso(5), end: iso(9) });            // not started yet
  await page.locator("#workPlanBackBtn").click();

  const row = page.locator("#taskList li.task", { hasText: "קירות מרתף" });
  await expect(row).toBeVisible();
  await expect(row.locator(".task-plan-badge")).toBeVisible();
  await expect(page.locator("#taskList li.task", { hasText: "תקרה" })).toHaveCount(0);

  // tap: בביצוע, tap: בוצע -> the plan follows
  await row.click();
  await row.click();
  await expect(row).toHaveClass(/done/);
  await page.locator("#workPlanBtn").click();
  const planRow = page.locator("#workPlanChart .wp-row", { hasText: "קירות מרתף" });
  await expect(planRow.locator(".wp-bar")).toHaveClass(/wp-done/);

  // and the plan side: back to בביצוע and renamed -> the task follows
  await planRow.click();
  await page.locator(".wp-status[data-status=prog]").click();
  await page.locator("#wpName").fill("קירות מרתף – צד מערבי");
  await page.locator("#workPlanEditForm button[type=submit]").click();
  await page.locator("#workPlanBackBtn").click();
  const renamed = page.locator("#taskList li.task", { hasText: "קירות מרתף – צד מערבי" });
  await expect(renamed).toHaveClass(/partial/);

  // the long-press menu opens it in the plan
  await longPress(page, renamed);
  await page.locator("#taskWorkPlanBtn").click();
  await expect(page.locator("#workPlanEditOverlay")).toBeVisible();
  await expect(page.locator("#wpName")).toHaveValue("קירות מרתף – צד מערבי");
  await page.locator("#wpCancelBtn").click();
  await page.locator("#workPlanBackBtn").click();

  // deleting the task keeps the activity, just not as a task any more
  await renamed.locator(".task-actions button").click({ force: true });
  await page.locator("#confirmYesBtn").click();
  await expect(renamed).toHaveCount(0);
  const stored = await page.evaluate(() => JSON.parse(localStorage.getItem("daily-tasks-sheets-v1")).sheets[0]);
  const item = stored.workPlan.find((x) => x.name.startsWith("קירות"));
  expect(stored.tasks.filter((t) => t.planItemId === item.id)).toHaveLength(0);
  // the one starting in 5 days waits on its start day
  const later = stored.workPlan.find((x) => x.name === "תקרה");
  expect(stored.tasks.find((t) => t.planItemId === later.id).date).toBe(iso(5));
  expect(item).toMatchObject({ status: "prog", showInTasks: false });
});

test("an activity not shown in tasks has no task", async ({ page }) => {
  await openLocalApp(page);
  await page.locator("#workPlanBtn").click();
  await page.locator("#workPlanAddBtn").click();
  await page.locator("#wpName").fill("בדיקת מפקח");
  await page.locator("#wpShowInTasks").uncheck();
  await page.locator("#workPlanEditForm button[type=submit]").click();
  await page.locator("#workPlanBackBtn").click();
  await expect(page.locator("#taskList li.task", { hasText: "בדיקת מפקח" })).toHaveCount(0);
});

test("Head Office lists every project's activities under way; ticking one updates that project's plan", async ({ page }) => {
  await openWithSharedProject(page, { phone: ME, sheets: [
    { id: "p1", name: "בניין A", members: [ME], tasks: [], workPlan: [
      { id: "a1", name: "קירות", start: iso(-6), end: iso(-2), by: "", status: "prog", progress: 60 },
      { id: "a2", name: "תקרה", start: iso(3), end: iso(5), by: "", status: "todo", progress: 0 }] },
  ] });
  await page.evaluate((me) => {
    window.__backend.tables.office_groups = [{ id: "g1", creator_phone: me }];
    return window.__hooks.loadMyOfficeGroups();
  }, ME);
  await page.locator("#headOfficeIconBtn").click();
  const row = page.locator("#taskList li.task", { hasText: "בניין A: קירות" });
  await expect(row).toBeVisible();
  await expect(row).toHaveClass(/partial/);
  await expect(page.locator("#taskList li.task", { hasText: "תקרה" })).toHaveCount(0);
  await row.locator(".row-mark").click();
  await expect(row).toHaveClass(/done/);
  await expect.poll(async () => (await serverPlan(page, "p1")).find((x) => x.id === "a1").status).toBe("done");
});

test("voice: 'תוסיף לתוכנית ... מיום ... עד ..., צוות ...' adds an activity", async ({ page }) => {
  await openWithSharedProject(page, { phone: ME, native: true, sheets: [{ id: "p1", name: "בניין A", members: [ME], tasks: [] }] });
  await page.evaluate(() => { window.__voiceSay = "תוסיף לתוכנית יציקת תקרה קומה 3 ממחר עד מחרתיים, צוות טפסנות"; });
  await page.locator("#voiceBtn").click();
  await expect(page.locator("#assistantDockReply .as-bot").last()).toContainText("✓");
  await expect.poll(async () => (await serverPlan(page, "p1")).map((x) => [x.name, x.start, x.end, x.by]))
    .toEqual([["יציקת תקרה קומה 3", iso(1), iso(2), "צוות טפסנות"]]);
});

// ---- stage 3 ----

const PLAN3 = () => [
  { id: "w1", name: "קירות מרתף", start: iso(-3), end: iso(0), by: "צוות טפסנות", status: "prog", progress: 40 },
  { id: "w2", name: "איטום", start: iso(1), end: iso(3), by: "קבלן איטום", status: "todo", progress: 0, after: "w1" },
  { id: "w3", name: "חשמל", start: iso(-10), end: iso(-2), by: "", status: "prog", progress: 50 }, // late
];

test("diary: planned vs done - marking updates the plan, the reason is kept, the PDF shows it", async ({ page }) => {
  await openWithSharedProject(page, { phone: ME, sheets: [{ id: "p1", name: "בניין A", members: [ME], tasks: [], workPlan: PLAN3() }] });
  await page.locator("#calendarFabBtn").click();
  await page.locator("#siteLogPlanBtn").click();
  const rows = page.locator(".wp-diary-row");
  await expect(rows).toHaveCount(2); // today's + the late one; איטום starts tomorrow
  await expect(rows.filter({ hasText: "חשמל" })).toContainText("באיחור");
  // the % bar: green as far as it's done (right to left in Hebrew); tap / drag along it
  const wallsBar = rows.filter({ hasText: "קירות מרתף" }).locator(".wp-diary-pct");
  await expect(wallsBar).toHaveText("40%"); // the plan's so far, faded
  await expect(wallsBar).not.toHaveClass(/set/);
  const box = await wallsBar.boundingBox();
  await wallsBar.click({ position: { x: box.width * 0.4, y: box.height / 2 } });
  await expect(wallsBar).toHaveText("60%");
  await expect(wallsBar).toHaveClass(/set/);
  await expect.poll(async () => (await serverPlan(page, "p1")).find((x) => x.id === "w1").progress).toBe(60);
  // dragged all the way: done
  await page.mouse.move(box.x + box.width * 0.5, box.y + box.height / 2);
  await page.mouse.down();
  await page.mouse.move(box.x + box.width * 0.2, box.y + box.height / 2, { steps: 4 });
  await page.mouse.move(box.x + 1, box.y + box.height / 2, { steps: 4 });
  await page.mouse.up();
  await expect(wallsBar).toHaveText("100%");
  const elecBar = rows.filter({ hasText: "חשמל" }).locator(".wp-diary-pct");
  const eb = await elecBar.boundingBox();
  await elecBar.click({ position: { x: eb.width - 5, y: eb.height / 2 } });
  await expect(elecBar).toHaveText("0%");
  await rows.filter({ hasText: "חשמל" }).locator(".wp-diary-reason").fill("לא הגיע ספק");
  await rows.filter({ hasText: "חשמל" }).locator(".wp-diary-reason").blur();
  await expect.poll(async () => (await serverPlan(page, "p1")).find((x) => x.id === "w1").status).toBe("done");
  await page.locator("#siteLogPlanBackBtn").click();
  await page.locator("#siteLogPreviewBtn").click();
  const preview = page.locator("#siteLogPreviewContent");
  await expect(preview).toContainText("מתוכנן מול ביצוע");
  await expect(preview).toContainText("לא הגיע ספק");
  await expect(preview).toContainText("✓ בוצע");
});

test("copy a week, postpone with what follows, and a dependency moves its follower", async ({ page }) => {
  await openWithSharedProject(page, { phone: ME, sheets: [{ id: "p1", name: "בניין A", members: [ME], tasks: [], workPlan: PLAN3() }] });
  await page.locator("#workPlanBtn").click();
  // the arrow from קירות to איטום
  await expect(page.locator("#workPlanChart .wp-deps path[marker-end]")).toHaveCount(1);

  // postpone קירות by 2 days -> איטום (starts after it) is offered to move too
  await page.locator("#workPlanChart .wp-row", { hasText: "קירות מרתף" }).click();
  await expect(page.locator("#wpAfter")).toHaveValue("");
  await page.locator("#wpPostponeBtn").click();
  await page.locator("#wpPostponeDays").fill("2");
  await page.locator("#wpPostponeApplyBtn").click();
  await expect(page.locator("#confirmOverlay")).toContainText("איטום");
  await page.locator("#confirmYesBtn").click();
  await expect.poll(async () => {
    const plan = await serverPlan(page, "p1");
    const w1 = plan.find((x) => x.id === "w1"), w2 = plan.find((x) => x.id === "w2");
    return [w1.start, w1.end, w2.start, w2.end];
  }).toEqual([iso(-1), iso(2), iso(3), iso(5)]);

  // copy this week to the next
  await page.locator(".wp-zoom[data-zoom=week]").click();
  await page.locator("#workPlanCopyWeekBtn").click();
  await page.locator("#confirmYesBtn").click();
  await expect.poll(async () => (await serverPlan(page, "p1")).length).toBeGreaterThan(3);
  const copies = (await serverPlan(page, "p1")).filter((x) => !["w1", "w2", "w3"].includes(x.id));
  expect(copies.every((x) => x.status === "todo" && x.progress === 0)).toBe(true);
  const w1copy = copies.find((x) => x.name === "קירות מרתף");
  expect(w1copy.start).toBe(iso(6));
});

test("a new activity set to start after another starts the day after it", async ({ page }) => {
  await openWithSharedProject(page, { phone: ME, sheets: [{ id: "p1", name: "בניין A", members: [ME], tasks: [], workPlan: PLAN3() }] });
  await page.locator("#workPlanBtn").click();
  await page.locator("#workPlanAddBtn").click();
  await page.locator("#wpName").fill("ריצוף");
  await page.locator("#wpAfter").selectOption({ label: "איטום" });
  await expect(page.locator("#wpStart")).toHaveValue(iso(4));
  await page.locator("#workPlanEditForm button[type=submit]").click();
  await expect.poll(async () => (await serverPlan(page, "p1")).find((x) => x.name === "ריצוף")).toMatchObject({ start: iso(4), after: "w2" });
});

test("phone notices: late the next morning, starting the afternoon before - quiet; switchable", async ({ page }) => {
  await openWithSharedProject(page, { phone: ME, native: true, sheets: [{ id: "p1", name: "בניין A", members: [ME], tasks: [], workPlan: PLAN3() }] });
  const planAlarms = () => page.evaluate(() => window.__native.alarms.filter((a) => /^plan-/.test(a.id)));
  // w2 starts tomorrow: its notice is today at 16:00 - only while that's ahead
  const startToo = new Date().getHours() < 16;
  const expected = ["plan-late:p1:w1", "plan-late:p1:w2"].concat(startToo ? ["plan-start:p1:w2"] : []).sort();
  await expect.poll(async () => (await planAlarms()).map((a) => a.id).sort()).toEqual(expected);
  const alarms = await planAlarms();
  expect(alarms.every((a) => a.quiet === true)).toBe(true);
  const late = alarms.find((a) => a.id === "plan-late:p1:w1");
  expect(new Date(late.at).getHours()).toBe(8);
  expect(late.body).toContain("קירות מרתף");
  if (startToo) expect(new Date(alarms.find((a) => a.id === "plan-start:p1:w2").at).getHours()).toBe(16);
  // the late one already past is in the app: a toast once a day
  // switching "late" off in the menu drops those
  await page.evaluate(() => { const el = document.getElementById("wpNotifyLateToggle"); el.checked = false; el.dispatchEvent(new Event("change")); });
  await expect.poll(async () => (await planAlarms()).map((a) => a.id)).toEqual(startToo ? ["plan-start:p1:w2"] : []);
});

test("long-press a bar, tap another: link them with any link type and a lag", async ({ page }) => {
  await openWithSharedProject(page, { phone: ME, sheets: [{ id: "p1", name: "בניין A", members: [ME], tasks: [], workPlan: [
    { id: "a", name: "יסודות", start: iso(0), end: iso(4), by: "", status: "todo", progress: 0 },
    { id: "b", name: "קירות", start: iso(0), end: iso(2), by: "", status: "todo", progress: 0 },
    { id: "c", name: "גג", start: iso(10), end: iso(12), by: "", status: "todo", progress: 0 },
  ] }] });
  await page.locator("#workPlanBtn").click();
  await page.locator(".wp-zoom[data-zoom=all]").click();
  const bar = (name) => page.locator("#workPlanChart .wp-row", { hasText: name }).locator(".wp-bar");
  const row = (name) => page.locator("#workPlanChart .wp-row", { hasText: name });

  // long press יסודות -> it blinks; the release doesn't open the editor
  const box = await bar("יסודות").boundingBox();
  await page.mouse.move(box.x + box.width / 2, box.y + box.height / 2);
  await page.mouse.down();
  await page.waitForTimeout(900);
  await page.mouse.up();
  await expect(bar("יסודות")).toHaveClass(/wp-linking/);
  await expect(page.locator("#workPlanEditOverlay")).toBeHidden();

  // tap קירות -> the link dialog with all four types
  await row("קירות").click();
  await expect(page.locator("#workPlanLinkOverlay")).toBeVisible();
  await expect(page.locator("#wpLinkPair")).toContainText("יסודות");
  await expect(page.locator(".wp-link-type")).toHaveCount(4);
  await expect(page.locator("input[name=wpLinkType]:checked")).toHaveValue("FS");
  // finish-to-finish, 1 day after: קירות must end a day after יסודות ends
  await page.locator("input[name=wpLinkType][value=FF]").check();
  await page.locator("#wpLinkLag").fill("1");
  await page.locator("#wpLinkSaveBtn").click();
  await expect(bar("יסודות")).not.toHaveClass(/wp-linking/);
  await expect.poll(async () => (await serverPlan(page, "p1")).find((x) => x.id === "b"))
    .toMatchObject({ start: iso(3), end: iso(5), links: [{ from: "a", type: "FF", lag: 1 }] });
  await expect(page.locator("#workPlanChart .wp-deps path[marker-end]")).toHaveCount(1);

  // the reverse link would loop
  const kb = await bar("קירות").boundingBox();
  await page.mouse.move(kb.x + kb.width / 2, kb.y + kb.height / 2);
  await page.mouse.down(); await page.waitForTimeout(900); await page.mouse.up();
  await row("יסודות").click();
  await page.locator("#wpLinkSaveBtn").click();
  await expect(page.locator("#workPlanLinkOverlay")).toBeVisible(); // refused (alert accepted by the harness)
  await page.locator("#wpLinkCancelBtn").click();

  // the editor lists the link; moving יסודות later offers to move קירות along
  await row("יסודות").click();
  await page.locator("#wpPostponeBtn").click();
  await page.locator("#wpPostponeDays").fill("3");
  await page.locator("#wpPostponeApplyBtn").click();
  await expect(page.locator("#confirmOverlay")).toContainText("קירות");
  await page.locator("#confirmYesBtn").click();
  await expect.poll(async () => (await serverPlan(page, "p1")).find((x) => x.id === "b").end).toBe(iso(8));

  // removing the link from the dialog
  const ab = await bar("יסודות").boundingBox();
  await page.mouse.move(ab.x + ab.width / 2, ab.y + ab.height / 2);
  await page.mouse.down(); await page.waitForTimeout(900); await page.mouse.up();
  await row("קירות").click();
  await expect(page.locator("input[name=wpLinkType]:checked")).toHaveValue("FF");
  await page.locator("#wpLinkRemoveBtn").click();
  await expect.poll(async () => (await serverPlan(page, "p1")).find((x) => x.id === "b").links).toEqual([]);
});

test("task menu: 'העברה לתוכנית העבודה' turns a task into an activity, the editor prefilled", async ({ page }) => {
  await openLocalApp(page);
  await page.locator("#taskInput").fill("יציקת תקרה");
  await page.locator("#addForm button[type=submit]").click();
  const row = page.locator("#taskList li.task", { hasText: "יציקת תקרה" });
  await longPress(page, row);
  await expect(page.locator("#taskWorkPlanBtn")).toBeHidden(); // not linked yet
  await page.locator("#taskToPlanBtn").click();
  await expect(page.locator("#workPlanView")).toBeVisible();
  await expect(page.locator("#workPlanEditOverlay")).toBeVisible();
  await expect(page.locator("#wpName")).toHaveValue("יציקת תקרה");
  await expect(page.locator("#wpStart")).toHaveValue(iso(0));
  await page.locator("#wpEnd").fill(iso(2));
  await page.locator("#wpBy").fill("צוות טפסנות");
  await page.locator("#workPlanEditForm button[type=submit]").click();
  await expect(page.locator("#workPlanChart .wp-row", { hasText: "יציקת תקרה" })).toBeVisible();
  await page.locator("#workPlanBackBtn").click();
  // the same task, now the activity's (one row, with the plan icon)
  await expect(row).toHaveCount(1);
  await expect(row.locator(".task-plan-badge")).toBeVisible();
  await longPress(page, row);
  await expect(page.locator("#taskToPlanBtn")).toBeHidden();
  await expect(page.locator("#taskWorkPlanBtn")).toBeVisible();
});

test("the work plan always opens on the whole plan (הכל), whatever view it was left on", async ({ page }) => {
  await openWithSharedProject(page, { phone: "+972500000001", sheets: [{ id: "p1", name: "בניין A", members: ["+972500000001"], tasks: [] }] });
  await page.locator("#workPlanBtn").click();
  await expect(page.locator(".wp-zoom[data-zoom=all]")).toHaveClass(/on/);
  await page.locator(".wp-zoom[data-zoom=week]").click();
  await expect(page.locator(".wp-zoom[data-zoom=week]")).toHaveClass(/on/);
  await page.locator("#workPlanBackBtn").click();
  await page.locator("#workPlanBtn").click();
  await expect(page.locator(".wp-zoom[data-zoom=all]")).toHaveClass(/on/);
});

const serverHammocks = (page, id) => page.evaluate((id) => (window.__backend.tables.shared_projects.find((r) => r.id === id).data.workHammocks || []), id);

test("hammock (ערסל): made from an activity's settings or a long press on its name; summary bar, folding, rename, empty ones go", async ({ page }) => {
  const plan = [
    { id: "a1", name: "שלד בניין A", start: iso(-4), end: iso(5), status: "prog", progress: 50, by: "" },
    { id: "a2", name: "חשמל בניין A", start: iso(6), end: iso(15), status: "todo", progress: 0, by: "" },
    { id: "b1", name: "ריצוף חניון", start: iso(0), end: iso(3), status: "todo", progress: 0, by: "" },
  ];
  await openWithSharedProject(page, { phone: ME, sheets: [{ id: "p1", name: "בניין A", members: [ME], tasks: [], workPlan: plan }] });
  await page.locator("#workPlanBtn").click();
  const chart = page.locator("#workPlanChart");
  await expect(chart.locator(".wp-hammock-row")).toHaveCount(0); // none yet: as before

  // 1) from the settings: "＋ ערסל חדש…" -> name + colour
  await chart.locator(".wp-row", { hasText: "שלד בניין A" }).click();
  await page.locator("#wpHammock").selectOption("__new");
  await expect(page.locator("#wpHammockEditOverlay")).toBeVisible();
  await page.locator("#wpHammockName").fill("בניין A");
  await page.locator(".wp-hammock-color[data-color='#2e7d32']").click();
  await page.locator("#wpHammockEditOkBtn").click();
  await expect(page.locator("#wpHammock")).toHaveValue(/.+/);
  await page.locator("#workPlanEditForm button[type=submit]").click();
  await expect(chart.locator(".wp-hammock-row")).toHaveCount(1);
  await expect(chart.locator(".wp-hammock-row")).toContainText("בניין A");
  await expect(chart.locator(".wp-hammock-none")).toBeVisible(); // the rest: "ללא ערסל"
  await expect.poll(async () => (await serverHammocks(page, "p1")).map((h) => [h.name, h.color])).toEqual([["בניין A", "#2e7d32"]]);
  const hid = (await serverHammocks(page, "p1"))[0].id;
  expect((await serverPlan(page, "p1")).find((x) => x.id === "a1").hammock).toBe(hid);

  // 2) a long press on an activity's name -> pick the hammock
  await longPress(page, chart.locator(".wp-row", { hasText: "חשמל בניין A" }).locator(".wp-name"), 900);
  await expect(page.locator("#wpHammockMenuOverlay")).toBeVisible();
  await expect(page.locator("#workPlanEditOverlay")).toBeHidden(); // not the settings too
  await page.locator("#wpHammockMenuList button", { hasText: "בניין A" }).click();
  await expect.poll(async () => (await serverPlan(page, "p1")).find((x) => x.id === "a2").hammock).toBe(hid);
  // ...and a new one from the same menu
  await longPress(page, chart.locator(".wp-row", { hasText: "ריצוף חניון" }).locator(".wp-name"), 900);
  await page.locator("#wpHammockMenuList button", { hasText: "ערסל חדש" }).click();
  await page.locator("#wpHammockName").fill("חניון");
  await page.locator("#wpHammockEditOkBtn").click();
  await expect(chart.locator(".wp-hammock-row")).toHaveCount(2);
  await expect(chart.locator(".wp-hammock-none")).toHaveCount(0);
  await expect.poll(async () => (await serverHammocks(page, "p1")).length).toBe(2);

  // the summary bar spans its activities; done weighted by length (10 days at 50%, 10 at 0%)
  const hrow = chart.locator(".wp-hammock-row", { hasText: "בניין A" });
  await expect(hrow.locator(".wp-hbar-text")).toHaveText("25%");
  await expect(hrow).toContainText("2 פעילויות");
  const hb = await hrow.locator(".wp-hbar").boundingBox();
  const b1 = await chart.locator(".wp-row", { hasText: "שלד בניין A" }).locator(".wp-bar").boundingBox();
  const b2 = await chart.locator(".wp-row", { hasText: "חשמל בניין A" }).locator(".wp-bar").boundingBox();
  expect(Math.abs((hb.x + hb.width) - (b1.x + b1.width))).toBeLessThan(4); // RTL: starts with the first
  expect(Math.abs(hb.x - b2.x)).toBeLessThan(4);                           // ends with the last

  // tap folds it shut / open
  await hrow.click();
  await expect(chart.locator(".wp-row", { hasText: "שלד בניין A" })).toHaveCount(0);
  await hrow.click();
  await expect(chart.locator(".wp-row", { hasText: "שלד בניין A" })).toHaveCount(1);

  // long press on it: rename
  await longPress(page, hrow.locator(".wp-name"), 900);
  await expect(page.locator("#wpHammockEditOverlay")).toBeVisible();
  await page.locator("#wpHammockName").fill("בניין A – שלד וגמר");
  await page.locator("#wpHammockEditOkBtn").click();
  await expect(chart.locator(".wp-hammock-row", { hasText: "שלד וגמר" })).toHaveCount(1);
  await expect.poll(async () => (await serverHammocks(page, "p1")).map((h) => h.name).sort()).toEqual(["בניין A – שלד וגמר", "חניון"]);

  // the last activity out of "חניון": it goes
  await longPress(page, chart.locator(".wp-row", { hasText: "ריצוף חניון" }).locator(".wp-name"), 900);
  await page.locator("#wpHammockMenuList button", { hasText: "ללא ערסל" }).click();
  await expect(chart.locator(".wp-hammock-row")).toHaveCount(1);
  await expect.poll(async () => (await serverHammocks(page, "p1")).map((h) => h.name)).toEqual(["בניין A – שלד וגמר"]);
});

test("baseline (קו בסיס): saved, a slipped activity shows its grey planned bar and +days; Excel export", async ({ page }) => {
  const plan = [
    { id: "a1", name: "שלד", start: iso(-4), end: iso(5), status: "prog", progress: 50, by: "צוות טפסנות" },
    { id: "a2", name: "חשמל", start: iso(6), end: iso(10), status: "todo", progress: 0, by: "" },
  ];
  await openWithSharedProject(page, { phone: ME, sheets: [{ id: "p1", name: "בניין A", members: [ME], tasks: [], workPlan: plan }] });
  await page.locator("#workPlanBtn").click();
  const chart = page.locator("#workPlanChart");
  await expect(chart.locator(".wp-base-bar")).toHaveCount(0);

  await page.locator("#workPlanBaselineBtn").click();
  await expect(page.locator("#wpBaselineText")).toContainText("קו בסיס שומר");
  await page.locator("#wpBaselineSaveBtn").click();
  await expect(chart.locator(".wp-base-bar")).toHaveCount(2);
  await expect(page.locator("#wpLegendBaseline")).toBeVisible();
  const serverBase = () => page.evaluate(() => window.__backend.tables.shared_projects[0].data.workBaseline);
  await expect.poll(async () => Object.keys((await serverBase())?.items || {}).sort()).toEqual(["a1", "a2"]);

  // "חשמל" moves 3 days later: its planned bar stays, "+3 ימים" by its name
  await chart.locator(".wp-row", { hasText: "חשמל" }).click();
  await page.locator("#wpEnd").fill(iso(13));
  await page.locator("#workPlanEditForm button[type=submit]").click();
  const row = chart.locator(".wp-row", { hasText: "חשמל" });
  await expect(row.locator(".wp-slip")).toHaveText("+3 ימים");
  await expect(row.locator(".wp-base-bar")).toHaveClass(/wp-base-late/);
  const actual = await row.locator(".wp-bar").boundingBox(), planned = await row.locator(".wp-base-bar").boundingBox();
  expect(actual.width).toBeGreaterThan(planned.width + 5);
  await expect(chart.locator(".wp-row", { hasText: "שלד" }).locator(".wp-slip")).toHaveCount(0);

  // hide / show
  await page.locator("#workPlanBaselineBtn").click();
  await expect(page.locator("#wpBaselineText")).toContainText("נשמר");
  await page.locator("#wpBaselineToggleBtn").click();
  await expect(chart.locator(".wp-base-bar")).toHaveCount(0);
  await page.locator("#workPlanBaselineBtn").click();
  await page.locator("#wpBaselineToggleBtn").click();
  await expect(chart.locator(".wp-base-bar")).toHaveCount(2);

  // Excel: a CSV with the baseline and the slip
  const [download] = await Promise.all([page.waitForEvent("download"), page.locator("#workPlanExcelBtn").click()]);
  const csv = require("fs").readFileSync(await download.path(), "utf8");
  expect(csv.charCodeAt(0)).toBe(0xfeff);
  const lines = csv.slice(1).split("\r\n");
  expect(lines[0]).toContain("קו בסיס – סיום");
  const elec = lines.find((l) => l.startsWith("חשמל"));
  const col = lines[0].split(",").indexOf("סטייה (ימים)");
  expect(elec.split(",")[col]).toBe("3"); // slipped 3 days
  expect(lines.find((l) => l.startsWith("שלד"))).toContain("50%");

  // delete it
  await page.locator("#workPlanBaselineBtn").click();
  await page.locator("#wpBaselineDeleteBtn").click();
  if (await page.locator("#confirmOverlay").isVisible()) await page.locator("#confirmYesBtn").click();
  await expect(chart.locator(".wp-base-bar")).toHaveCount(0);
  await expect.poll(serverBase).toBe(null);
});

test("actuals: started / finished dates kept; done early brings what follows forward, done late pushes it on", async ({ page }) => {
  const plan = [
    { id: "a1", name: "שלד", start: iso(-5), end: iso(5), status: "todo", progress: 0, by: "" },
    { id: "a2", name: "טיח", start: iso(6), end: iso(10), status: "todo", progress: 0, by: "", after: "a1" },
    { id: "b1", name: "חפירה", start: iso(-8), end: iso(-2), status: "prog", progress: 80, by: "", actualStart: iso(-8) },
    { id: "b2", name: "יסודות", start: iso(-1), end: iso(3), status: "todo", progress: 0, by: "", after: "b1" },
  ];
  await openWithSharedProject(page, { phone: ME, sheets: [{ id: "p1", name: "בניין A", members: [ME], tasks: [], workPlan: plan }] });
  await page.locator("#workPlanBtn").click();
  const chart = page.locator("#workPlanChart");
  const item = async (id) => (await serverPlan(page, "p1")).find((x) => x.id === id);

  // "שלד" goes under way: its actual start is kept (it was due 5 days ago)
  await chart.locator(".wp-row", { hasText: "שלד" }).click();
  await page.locator(".wp-status[data-status=prog]").click();
  await expect(page.locator("#wpActualStart")).toHaveValue(iso(-5));
  await page.locator("#workPlanEditForm button[type=submit]").click();
  await expect.poll(async () => (await item("a1")).actualStart).toBe(iso(-5));

  // ...and is done today, 5 days early: its end moves to today, "טיח" is offered to come forward
  await chart.locator(".wp-row", { hasText: "שלד" }).click();
  await page.locator(".wp-status[data-status=done]").click();
  await expect(page.locator("#wpActualEnd")).toHaveValue(iso(0));
  await page.locator("#workPlanEditForm button[type=submit]").click();
  await expect(page.locator("#confirmOverlay")).toBeVisible();
  await expect(page.locator("#confirmOverlay")).toContainText("הסתיימה מוקדם");
  await page.locator("#confirmYesBtn").click();
  await expect.poll(async () => (await item("a1"))).toMatchObject({ status: "done", end: iso(0), actualEnd: iso(0) });
  await expect.poll(async () => (await item("a2"))).toMatchObject({ start: iso(1), end: iso(5) });

  // "חפירה" (due 2 days ago) is done today: its end moves on, "יסודות" with it
  await chart.locator(".wp-row", { hasText: "חפירה" }).click();
  await page.locator(".wp-status[data-status=done]").click();
  await page.locator("#workPlanEditForm button[type=submit]").click();
  await expect(page.locator("#confirmOverlay")).toBeVisible();
  await page.locator("#confirmYesBtn").click();
  await expect.poll(async () => (await item("b1"))).toMatchObject({ end: iso(0), actualStart: iso(-8), actualEnd: iso(0) });
  await expect.poll(async () => (await item("b2")).start).toBe(iso(1));
});

test("forecast: an activity under way shows where its pace leads; tapping the tail replans by it; the assistant knows", async ({ page }) => {
  const plan = [
    // 40% after 6 days (today included): 9 more days -> today+9, planned today+2
    { id: "c1", name: "שלד", start: iso(-5), end: iso(2), status: "prog", progress: 40, by: "", actualStart: iso(-5) },
    { id: "c2", name: "חשמל", start: iso(3), end: iso(8), status: "todo", progress: 0, by: "", after: "c1" },
  ];
  await openWithSharedProject(page, { phone: ME, native: true, sheets: [{ id: "p1", name: "בניין A", members: [ME], tasks: [], workPlan: plan }] });
  await page.locator("#workPlanBtn").click();
  const row = page.locator("#workPlanChart .wp-row", { hasText: "שלד" });
  const shown = iso(9).split("-").reverse().slice(0, 2).join("/");
  await expect(row.locator(".wp-forecast-label")).toHaveText("צפי: " + shown);
  await expect(row.locator(".wp-forecast")).toBeVisible();
  // the assistant answers from the same numbers
  await page.evaluate(() => window.__native.listeners.launchView({ view: "assistant" }));
  await page.locator("#assistantInput").fill("מתי צפוי להסתיים השלד?");
  await page.locator("#assistantSendBtn").click();
  await expect(page.locator("#assistantDockReply .as-bot").last()).toContainText("צפויה להסתיים ב-" + shown + " – 7 ימים אחרי המתוכנן");
  await page.locator("#assistantDockCloseBtn").click();
  // replan by it: the end moves, and what's linked after it follows
  await row.locator(".wp-forecast").click();
  await expect(page.locator("#confirmOverlay")).toContainText(shown);
  await page.locator("#confirmYesBtn").click();
  await expect.poll(async () => (await serverPlan(page, "p1")).find((x) => x.id === "c1").end).toBe(iso(9));
  if (await page.locator("#confirmOverlay").isVisible()) await page.locator("#confirmYesBtn").click();
  await expect.poll(async () => (await serverPlan(page, "p1")).find((x) => x.id === "c2").start).toBe(iso(10));
  await expect(row.locator(".wp-forecast")).toHaveCount(0); // on plan now
});
