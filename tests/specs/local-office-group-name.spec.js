const { test, expect } = require("@playwright/test");
const { openWithSharedProject } = require("./helpers/local-app");

// "הקמת קבוצת משרד": the group gets a name (required), saved on the group
// and copied onto its invites (for the invited to see); "ניהול קבוצת
// המשרד" shows it and renames it. Before office_groups_name.sql was run
// (no such columns) the group is still created, without the name.
test.use({ viewport: { width: 390, height: 800 }, serviceWorkers: "block" });
const ME = "+972500000001";
const rows = (page, t) => page.evaluate((t) => window.__backend.tables[t] || [], t);

async function createGroup(page, name) {
  await page.locator("#menuBtn").click();
  await page.locator("#officeGroupCreateBtn").click();
  await expect(page.locator("#officeGroupMembersOverlay")).toBeVisible();
  await page.locator("#officeGroupMembersList input").fill("0501234567");
  await page.locator("#officeGroupMembersList .site-log-add-btn").click();
  if (name !== null) await page.locator("#officeGroupNameInput").fill(name);
  await page.locator("#officeGroupMembersNextBtn").click();
}

test("an office group is created with its name; the manage page renames it", async ({ page }) => {
  await openWithSharedProject(page, { phone: ME, sheet: { id: "p1", name: "בניין A", members: [ME], tasks: [] } });
  // no name: not on to the next step
  await createGroup(page, null);
  await expect(page.locator("#officeGroupMembersOverlay")).toBeVisible();
  await page.locator("#officeGroupNameInput").fill("משרד צפון");
  await page.locator("#officeGroupMembersNextBtn").click();
  await page.locator("#officeGroupHeadOfficeFinishBtn").click();
  await expect.poll(async () => (await rows(page, "office_groups")).map((g) => g.name)).toEqual(["משרד צפון"]);
  const invites = await rows(page, "office_group_invites");
  expect(invites.length).toBe(2);
  expect(invites.every((i) => i.group_name === "משרד צפון")).toBe(true);

  // the manage page: the name, editable
  await page.locator("#menuBtn").click();
  await page.locator("#officeGroupManageBtn").click();
  const nameInput = page.locator("#officeGroupManageList .office-group-name-input");
  await expect(nameInput).toHaveValue("משרד צפון");
  await nameInput.fill("משרד דרום");
  await nameInput.press("Enter");
  await expect.poll(async () => (await rows(page, "office_groups"))[0].name).toBe("משרד דרום");
});

test("an office group is still created before the name columns exist", async ({ page }) => {
  await openWithSharedProject(page, { phone: ME, sheet: { id: "p1", name: "בניין A", members: [ME], tasks: [] } });
  // the server without office_groups.name / office_group_invites.group_name
  await page.evaluate(() => {
    const from = window.__backend.client.from;
    window.__backend.client.from = (t) => {
      const b = from(t);
      const insert = b.insert;
      b.insert = (p) => {
        const bad = [].concat(p).some((r) => (t === "office_groups" && "name" in r) || (t === "office_group_invites" && "group_name" in r));
        if (!bad) return insert(p);
        const failing = { select: () => failing, then: (res) => Promise.resolve({ data: null, error: { code: "PGRST204", message: "Could not find the 'name' column" } }).then(res) };
        return failing;
      };
      return b;
    };
  });
  await createGroup(page, "משרד צפון");
  await page.locator("#officeGroupHeadOfficeFinishBtn").click();
  await expect.poll(async () => (await rows(page, "office_groups")).length).toBe(1);
  await expect.poll(async () => (await rows(page, "office_group_invites")).length).toBe(2);
});
