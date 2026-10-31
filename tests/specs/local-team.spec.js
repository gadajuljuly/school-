const { test, expect } = require("@playwright/test");
const { openWithSharedProject } = require("./helpers/local-app");

// הצוות: engineers and site managers, by phone number - typed in or picked
// from the phone's contacts - kept in team_roles (the fake server here);
// the server's own rules (RLS) are tested in supabase/tests/rls_team_finance.sql.
test.use({ viewport: { width: 390, height: 800 }, serviceWorkers: "block" });

const ME = "+972500000001";
const rows = (page) => page.evaluate(() => (window.__backend.tables.team_roles || []).map((r) => [r.owner_phone, r.phone, r.name, r.role]));
const SHEET = { id: "p1", name: "בניין A", members: [ME], tasks: [] };

async function openTeam(page) {
  await page.locator("#menuBtn").click();
  await page.locator("#teamBtn").click();
  await expect(page.locator("#teamView")).toBeVisible();
}

test("add engineers and site managers - typed or from the contacts; move between them; remove", async ({ page }) => {
  await openWithSharedProject(page, { phone: ME, native: true, sheet: SHEET });
  await openTeam(page);
  const engineers = page.locator("#teamEngineerList");
  const managers = page.locator("#teamSiteManagerList");
  await expect(engineers).toContainText("עדיין אין אף אחד");

  // typed in
  const engAdd = page.locator(".team-add[data-role=engineer]");
  await engAdd.locator(".team-type-btn").click();
  await engAdd.locator("input").first().fill("יוסי כהן");
  await engAdd.locator("input[type=tel]").fill("050-123-4567");
  await engAdd.locator("button[type=submit]").click();
  await expect(engineers.locator(".team-row")).toContainText("יוסי כהן");
  await expect(engineers.locator(".team-row")).toContainText("0501234567");
  await expect.poll(() => rows(page)).toEqual([[ME, "+972501234567", "יוסי כהן", "engineer"]]);

  // from the contacts
  await page.evaluate(() => { window.__pickContact = { name: "דני לוי", tel: "052-7654321" }; });
  await page.locator(".team-add[data-role=site_manager] .team-pick-btn").click();
  await expect(managers.locator(".team-row")).toContainText("דני לוי");
  await expect.poll(async () => (await rows(page)).length).toBe(2);
  // the same person again: just said
  await page.locator(".team-add[data-role=site_manager] .team-pick-btn").click();
  await expect(page.locator("#appToast")).toContainText("כבר בצוות");
  expect((await rows(page)).length).toBe(2);

  // moved: the site manager becomes an engineer
  await managers.locator(".team-row", { hasText: "דני לוי" }).locator("button", { hasText: "העבר למהנדסים" }).click();
  await expect(engineers.locator(".team-row")).toHaveCount(2);
  await expect.poll(async () => (await rows(page)).find((r) => r[1] === "+972527654321")[3]).toBe("engineer");

  // removed
  await engineers.locator(".team-row", { hasText: "יוסי כהן" }).locator(".team-del").click();
  await page.locator("#confirmYesBtn").click();
  await expect(engineers.locator(".team-row")).toHaveCount(1);
  await expect.poll(async () => (await rows(page)).map((r) => r[1])).toEqual(["+972527654321"]);

  // a wrong number isn't added
  await engAdd.locator(".team-type-btn").click();
  await engAdd.locator("input[type=tel]").fill("123");
  await engAdd.locator("button[type=submit]").click();
  expect((await rows(page)).length).toBe(1);
});

test("on someone else's team: the menu says so, and their finances become this phone's to see", async ({ page }) => {
  await openWithSharedProject(page, { phone: ME, native: true, sheet: SHEET });
  await page.evaluate(() => {
    window.__backend.tables.team_roles = [
      { owner_phone: "+972509999999", phone: "+972500000001", name: "אני", role: "engineer" },
      { owner_phone: "+972508888888", phone: "+972500000001", name: "אני", role: "site_manager" },
    ];
    return window.__hooks.loadTeam();
  });
  await page.locator("#menuBtn").click();
  await expect(page.locator("#teamMyRoles")).toContainText("אתה מהנדס בצוות של 0509999999");
  await expect(page.locator("#teamMyRoles")).toContainText("מנהל עבודה");
  // whose money: mine, and the team I'm an engineer on (not the site-manager one)
  expect(await page.evaluate(() => window.__hooks.financeOwnerPhones())).toEqual([ "+972500000001", "+972509999999" ]);
});

test("the diary's בקרה תקציבית tile: for the project's owner and the engineers on their team only", async ({ page }) => {
  const BOSS = "+972509999999";
  await openWithSharedProject(page, { phone: ME, native: true, sheets: [
    { id: "mine", name: "שלי", members: [ME], tasks: [] },
    { id: "boss", name: "של הבוס", members: [ME, BOSS], tasks: [], createdBy: BOSS },
  ] });
  const tile = page.locator("#siteLogBudgetBtn");
  const diaryOf = async (name) => {
    await page.locator(".sheet-tab", { hasText: name }).click();
    await page.locator("#calendarFabBtn").click();
  };
  // the boss's project, before being on the boss's team: no tile
  await page.locator("#calendarFabBtn").click();
  await expect(page.locator("#diaryView")).toBeVisible();
  await expect(tile).toBeHidden();
  // my own project: the tile, and its screen
  await diaryOf("שלי");
  await expect(tile).toBeVisible();
  await tile.click();
  await expect(page.locator("#budgetView")).toBeVisible();
  await expect(page.locator("#budgetProjectName")).toHaveText("שלי");
  await page.locator("#budgetBackBtn").click();

  // made an engineer on the boss's team: the boss's project has it too
  await page.evaluate((boss) => {
    window.__backend.tables.team_roles = [{ owner_phone: boss, phone: "+972500000001", name: "", role: "engineer" }];
    return window.__hooks.loadTeam();
  }, BOSS);
  await diaryOf("של הבוס");
  await expect(tile).toBeVisible();
  // ...but not as a site manager
  await page.evaluate(() => { window.__backend.tables.team_roles[0].role = "site_manager"; return window.__hooks.loadTeam(); });
  await expect(tile).toBeHidden();
});
