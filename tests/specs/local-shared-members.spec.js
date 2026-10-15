const { test, expect } = require("@playwright/test");
const { longPress, openWithSharedProject } = require("./helpers/local-app");

// Adding someone to a shared project asks them first: they get a push and
// an approve/decline prompt, and the project stays hidden for them until
// they approve. Fake server.
test.use({ viewport: { width: 390, height: 800 }, serviceWorkers: "block" });

const A = "+972500000001", B = "+972500000002", C = "+972500000003";
const project = (members) => ({ id: "sh1", name: "בניין A", members, memberNames: { [A]: "גדי", [B]: "דנה" }, tasks: [] });
const invites = (page) => page.evaluate(() => window.__backend.tables.project_invites || []);
const tab = (page) => page.locator(".sheet-tab", { hasText: "בניין A" });

test("adding a member to a shared project sends them an invite and a push", async ({ page }) => {
  await openWithSharedProject(page, { phone: A, sheet: project([A, B]) });
  await longPress(page, tab(page));
  await page.locator("#sheetActionMembersBtn").click();
  await expect(page.locator("#sharedProjectOverlay")).toBeVisible();
  const empty = page.locator("#sharedProjectMembersList input");
  // type the new number into the first empty member field
  const count = await empty.count();
  let filled = false;
  for (let i = 0; i < count && !filled; i++) {
    if (!(await empty.nth(i).inputValue())) { await empty.nth(i).fill("0500000003"); filled = true; }
  }
  expect(filled).toBe(true);
  await page.locator("#sharedProjectSaveBtn").click();

  await expect.poll(async () => (await invites(page)).map((r) => [r.invited_phone, r.status, r.snapshot.sharedProjectId])).toEqual([[C, "pending", "sh1"]]);
  const pushes = await page.evaluate(() => window.__backend.log.filter((l) => l.fn === "send-project-invite-notification").map((l) => l.body));
  expect(pushes).toEqual([expect.objectContaining({ targetPhone: C, projectName: "בניין A", shared: true })]);
  // existing members aren't invited again
  expect((await invites(page)).some((r) => r.invited_phone === B)).toBe(false);
});

async function openAsInvitee(page, status = "pending") {
  await openWithSharedProject(page, { phone: C, sheet: project([A, B, C]) });
  await page.evaluate(({ C, A, status }) => {
    window.__backend.tables.project_invites = [{
      id: "inv1", project_name: "בניין A", snapshot: { sharedProjectId: "sh1" }, invited_phone: C,
      invited_by_phone: A, invited_by_name: "גדי", status, created_at: new Date().toISOString(),
    }];
    window.__hooks.checkPendingProjectInvites();
  }, { C, A, status });
}

test("invited member: the project stays hidden until they approve", async ({ page }) => {
  await openAsInvitee(page);
  await expect(page.locator("#projectInviteReceivedOverlay")).toBeVisible();
  await expect(page.locator("#projectInviteReceivedMessage")).toContainText("גדי");
  await expect(page.locator("#projectInviteReceivedMessage")).toContainText("בניין A");
  await expect(tab(page)).toHaveCount(0);

  await page.locator("#projectInviteApproveBtn").click();
  await expect(tab(page)).toBeVisible();
  await expect.poll(async () => (await invites(page))[0].status).toBe("approved");
});

test("invited member who declines never sees the project", async ({ page }) => {
  await openAsInvitee(page);
  await page.locator("#projectInviteDeclineBtn").click();
  await expect(page.locator("#projectInviteReceivedOverlay")).toBeHidden();
  await expect.poll(async () => (await invites(page))[0].status).toBe("declined");
  await page.evaluate(() => window.__hooks.checkPendingProjectInvites());
  await page.waitForTimeout(300);
  await expect(tab(page)).toHaveCount(0);
  await expect(page.locator("#projectInviteReceivedOverlay")).toBeHidden();
});

test("the inviter's app takes a member who declined off the project", async ({ page }) => {
  await openWithSharedProject(page, { phone: A, sheet: project([A, B, C]) });
  await page.evaluate(({ A, C }) => {
    window.__backend.tables.project_invites = [{
      id: "inv1", project_name: "בניין A", snapshot: { sharedProjectId: "sh1" }, invited_phone: C,
      invited_by_phone: A, invited_by_name: "גדי", status: "declined", created_at: new Date().toISOString(),
    }];
    window.__hooks.checkPendingProjectInvites();
  }, { A, C });
  await expect.poll(() => page.evaluate(() => window.__backend.tables.shared_projects[0].members)).toEqual([A, B]);
});
