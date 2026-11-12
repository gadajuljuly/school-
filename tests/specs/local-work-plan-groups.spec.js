const { test, expect } = require("@playwright/test");
const { openWithSharedProject } = require("./helpers/local-app");

// A project's plan split into groups (section / area / kind of work): a
// row per group with its span and weighted %, chips to show one group,
// a new activity joining the chosen group, moving / renaming / deleting.
test.use({ viewport: { width: 412, height: 860 }, serviceWorkers: "block" });

const ME = "+972500000001";
const pad = (n) => String(n).padStart(2, "0");
const iso = (d0) => { const d = new Date(); d.setDate(d.getDate() + d0); return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`; };
const A = (id, name, s, e, p, group) => ({ id, name, start: iso(s), end: iso(e), status: p >= 100 ? "done" : p ? "prog" : "todo", progress: p, by: "", group });
const server = (page) => page.evaluate(() => window.__backend.tables.shared_projects.find((r) => r.id === "p1").data);

async function open(page, sheetExtra) {
  await openWithSharedProject(page, { phone: ME, sheet: Object.assign({ id: "p1", name: "כביש 6", members: [ME], tasks: [] }, sheetExtra) });
  await page.locator("#workPlanBtn").click();
  await expect(page.locator("#workPlanView")).toBeVisible();
}

test("no groups: the plan as before, only '+ group'; a group created, an activity added into it", async ({ page }) => {
  await open(page, { workPlan: [A("a", "חפירה", -5, 2, 50)] });
  await expect(page.locator(".wp-group-row")).toHaveCount(0);
  await expect(page.locator(".wp-group-chip")).toHaveText(["+ קבוצה"]);

  await page.locator(".wp-group-chip.add").click();
  await page.locator("#wpGroupName").fill("גשרים");
  await page.locator("#wpGroupEditOkBtn").click();
  // it's chosen: its chip on, the plan shows only it (nothing yet)
  await expect(page.locator(".wp-group-chip.on")).toContainText("גשרים");
  await expect.poll(async () => (await server(page)).workGroups.map((g) => g.name)).toEqual(["גשרים"]);

  // a new activity joins the chosen group
  await page.locator("#workPlanAddBtn").click();
  await expect(page.locator("#wpGroup option:checked")).toHaveText("גשרים");
  await page.locator("#wpName").fill("יסודות גשר");
  await page.locator("#workPlanEditForm button[type=submit]").click();
  await expect.poll(async () => (await server(page)).workPlan.map((x) => [x.name, !!x.group])).toEqual([["חפירה", false], ["יסודות גשר", true]]);
  await expect(page.locator(".wp-row:not(.wp-head-row) .wp-name-text")).toHaveText(["יסודות גשר"]);

  // all: a row per group, "כללי" last with what has none
  await page.locator(".wp-group-chip", { hasText: "הכל" }).click();
  await expect(page.locator(".wp-group-row .wp-name-text")).toHaveText(["▾ גשרים", "▾ כללי"]);
});

test("groups: weighted %, fold, a chip shows one group; move an activity; rename, reorder, delete (its activities stay)", async ({ page }) => {
  await open(page, {
    workGroups: [{ id: "g1", name: "מקטע א'" }, { id: "g2", name: "גשרים" }],
    workPlan: [A("a", "חפירה", -10, -1, 100, "g1"), A("b", "מצע", 0, 9, 0, "g1"), A("c", "יסודות", -2, 7, 30, "g2"), A("d", "גידור", 0, 1, 0)],
  });
  const rows = page.locator(".wp-group-row");
  await expect(rows.locator(".wp-name-text")).toHaveText(["▾ מקטע א'", "▾ גשרים", "▾ כללי"]);
  await expect(rows.first()).toContainText("50%"); // 10 days done + 10 not
  await expect(page.locator(".wp-group-chip")).toHaveText(["הכל (4)", "מקטע א' (2)", "גשרים (1)", "כללי (1)", "+ קבוצה"]);

  // folded: its activities hidden
  await rows.first().click();
  await expect(page.locator(".wp-row .wp-name-text", { hasText: "מצע" })).toHaveCount(0);
  await rows.first().click();
  await expect(page.locator(".wp-row .wp-name-text", { hasText: "מצע" })).toHaveCount(1);

  // a chip: only that group, no group rows
  await page.locator(".wp-group-chip", { hasText: "גשרים" }).click();
  await expect(page.locator(".wp-group-row")).toHaveCount(0);
  await expect(page.locator(".wp-row:not(.wp-head-row) .wp-name-text")).toHaveText(["יסודות"]);
  await page.locator(".wp-group-chip", { hasText: "הכל" }).click();

  // the activity's editor: its group changed
  await page.locator(".wp-row", { hasText: "גידור" }).click();
  await page.locator("#wpGroup").selectOption({ label: "גשרים" });
  await page.locator("#workPlanEditForm button[type=submit]").click();
  await expect.poll(async () => (await server(page)).workPlan.find((x) => x.id === "d").group).toBe("g2");
  await expect(rows.locator(".wp-name-text")).toHaveText(["▾ מקטע א'", "▾ גשרים"]); // nothing in "כללי" now

  // long press on a group's row: rename, then down
  const longPress = async (loc) => {
    const box = await loc.boundingBox();
    await page.mouse.move(box.x + box.width - 30, box.y + box.height / 2);
    await page.mouse.down();
    await page.waitForTimeout(800);
    await page.mouse.up();
  };
  await longPress(rows.first());
  await expect(page.locator("#wpGroupEditOverlay")).toBeVisible();
  await page.locator("#wpGroupName").fill("מקטע א' – ק\"מ 0-2");
  await page.locator("#wpGroupEditOkBtn").click();
  await longPress(rows.first());
  await page.locator("#wpGroupDownBtn").click();
  await expect(rows.locator(".wp-name-text")).toHaveText(["▾ גשרים", "▾ מקטע א' – ק\"מ 0-2"]);
  await expect.poll(async () => (await server(page)).workGroups.map((g) => g.name)).toEqual(["גשרים", "מקטע א' – ק\"מ 0-2"]);

  // deleted: its activities in "כללי"
  await longPress(rows.first());
  await page.locator("#wpGroupDeleteBtn").click();
  await page.locator("#confirmYesBtn").click();
  await expect(rows.locator(".wp-name-text")).toHaveText(["▾ מקטע א' – ק\"מ 0-2", "▾ כללי"]);
  await expect.poll(async () => (await server(page)).workPlan.filter((x) => x.group === "g2").length).toBe(0);
  await expect.poll(async () => (await server(page)).workPlan.length).toBe(4);

  // ↶ puts the group back
  await page.locator("#workPlanUndoBtn").click();
  await expect(rows.locator(".wp-name-text")).toHaveText(["▾ גשרים", "▾ מקטע א' – ק\"מ 0-2"]);
});

test("a long press on an activity's name: move it to a group", async ({ page }) => {
  await open(page, { workGroups: [{ id: "g1", name: "מקטע א'" }, { id: "g2", name: "גשרים" }], workPlan: [A("a", "חפירה", -5, 2, 50, "g1")] });
  const name = page.locator(".wp-row:not(.wp-group-row) .wp-name", { hasText: "חפירה" });
  const box = await name.boundingBox();
  await page.mouse.move(box.x + box.width / 2, box.y + box.height / 2);
  await page.mouse.down();
  await page.waitForTimeout(800);
  await page.mouse.up();
  await page.locator("#wpHammockMenuList button", { hasText: "העברה לקבוצה" }).click();
  await expect(page.locator("#wpHammockMenuList .wp-hammock-pick.on")).toHaveText("✓ מקטע א'");
  await page.locator("#wpHammockMenuList button", { hasText: "גשרים" }).click();
  await expect.poll(async () => (await server(page)).workPlan[0].group).toBe("g2");
  await expect(page.locator(".wp-group-row .wp-name-text")).toHaveText(["▾ מקטע א'", "▾ גשרים"]);
  await expect(page.locator(".wp-group-row").first()).toContainText("אין עדיין פעילויות");
});
