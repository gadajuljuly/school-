const { test, expect } = require("@playwright/test");
const { openWithSharedProject } = require("./helpers/local-app");

// Sharing a task's calendar event with members of a shared project: the
// owner picks members (long-press on the calendar icon); each invited
// member's app puts the event in THEIR phone's calendar, with the icon and
// the 15-minutes-before ring. Fake server + fake phone calendar.
test.use({ viewport: { width: 390, height: 800 }, serviceWorkers: "block" });

const A = "+972500000001"; // owner
const B = "+972500000002";
const C = "+972500000003";
const pad = (n) => String(n).padStart(2, "0");
const d = new Date();
const TODAY = `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`;
const start = new Date(); start.setDate(start.getDate() + 2); start.setHours(9, 0, 0, 0);
const end = new Date(start.getTime() + 3600000);
const EVENT_AT = start.toISOString();
const END_AT = end.toISOString();

const sheetWith = (task) => ({
  id: "sh1", name: "בניין A", members: [A, B, C], memberNames: { [A]: "גדי", [B]: "דנה", [C]: "רון" },
  tasks: [Object.assign({ id: "k1", text: "סיור באתר", status: 0, type: "task", date: TODAY, createdAt: 1 }, task)],
});
const serverTask = (page) => page.evaluate(() => window.__backend.tables.shared_projects[0].data.tasks[0]);
const calIcon = (page) => page.locator("#taskReminderIconsLayer .task-reminder-indicator", { has: page.locator(".cal-live-icon") });

test("owner: long-press the calendar icon, pick members, they're invited", async ({ page }) => {
  await openWithSharedProject(page, {
    phone: A, native: true, calendarEvents: [{ id: 100, title: "סיור באתר", start: start.getTime(), end: end.getTime() }],
    sheet: sheetWith({ calendarLinks: { [A]: { eventId: 100, eventAt: EVENT_AT, endAt: END_AT, fireAt: EVENT_AT, firedAt: null } } }),
  });
  await expect(calIcon(page)).toHaveCount(1);
  const box = await calIcon(page).boundingBox();
  await page.mouse.move(box.x + box.width / 2, box.y + box.height / 2);
  await page.mouse.down();
  await page.waitForTimeout(900);
  await page.mouse.up();

  const dialog = page.locator("#calInviteOverlay");
  await expect(dialog).toBeVisible();
  await expect(dialog.locator(".cal-invite-row")).toHaveText(["דנה", "רון"]); // not me
  await dialog.locator(".cal-invite-row", { hasText: "דנה" }).locator("input").check();
  await page.locator("#calInviteOkBtn").click();
  await expect(dialog).toBeHidden();
  await expect(page.locator("#calView")).toBeHidden(); // the long-press didn't also open the event

  await expect.poll(async () => (await serverTask(page)).calendarInvite).toEqual({
    by: A, title: "סיור באתר", eventAt: EVENT_AT, endAt: END_AT, invitees: [B],
  });

  // a push goes to the invited member only, and opens the task
  const pushes = () => page.evaluate(() => window.__backend.log.filter((l) => l.fn === "send-chat-notification").map((l) => l.body));
  await expect.poll(async () => (await pushes()).length).toBe(1);
  const push = (await pushes())[0];
  expect(push).toMatchObject({ kind: "calendarInvite", sheetId: "sh1", recipients: [B], taskId: "k1", date: TODAY });
  expect(push.text).toContain("גדי");
  expect(push.text).toContain("סיור באתר");

  // adding another member later notifies only the new one
  const box2 = await calIcon(page).boundingBox();
  await page.mouse.move(box2.x + box2.width / 2, box2.y + box2.height / 2);
  await page.mouse.down();
  await page.waitForTimeout(900);
  await page.mouse.up();
  await expect(dialog.locator(".cal-invite-row", { hasText: "דנה" }).locator("input")).toBeChecked();
  await dialog.locator(".cal-invite-row", { hasText: "רון" }).locator("input").check();
  await page.locator("#calInviteOkBtn").click();
  await expect.poll(async () => (await pushes()).length).toBe(2);
  expect((await pushes())[1].recipients).toEqual([C]);
});

test("invited member: the event goes into their phone's calendar, with icon and ring", async ({ page }) => {
  await openWithSharedProject(page, {
    phone: B, native: true,
    sheet: sheetWith({
      calendarLinks: { [A]: { eventId: 100, eventAt: EVENT_AT, endAt: END_AT } },
      calendarInvite: { by: A, title: "סיור באתר", eventAt: EVENT_AT, endAt: END_AT, invitees: [B] },
    }),
  });
  await expect.poll(() => page.evaluate(() => window.__native.saved.length)).toBe(1);
  const saved = (await page.evaluate(() => window.__native.saved))[0];
  expect(saved).toMatchObject({ title: "סיור באתר", start: start.getTime(), end: end.getTime(), calendarId: 1 });
  await expect(calIcon(page)).toHaveCount(1);
  await expect.poll(() => page.evaluate(() => window.__native.alarms)).toEqual([
    expect.objectContaining({ id: "sh1:k1:cal", at: start.getTime() - 15 * 60000 }),
  ]);
  await expect.poll(async () => (await serverTask(page)).calendarLinks[B]).toMatchObject({ eventId: saved.eventId, fromInvite: true, eventAt: EVENT_AT });

  // once is enough - no duplicate on later renders
  await page.locator("#taskList li.task").first().click();
  await page.waitForTimeout(500);
  expect(await page.evaluate(() => window.__native.saved.length)).toBe(1);

  // an invitee can't re-share it (no long-press dialog)
  const box = await calIcon(page).boundingBox();
  await page.mouse.move(box.x + box.width / 2, box.y + box.height / 2);
  await page.mouse.down();
  await page.waitForTimeout(900);
  await page.mouse.up();
  await expect(page.locator("#calInviteOverlay")).toBeHidden();
});

test("invited member: the owner moving the event moves their copy; un-inviting removes it", async ({ page }) => {
  await openWithSharedProject(page, {
    phone: B, native: true,
    sheet: sheetWith({
      calendarLinks: { [A]: { eventId: 100, eventAt: EVENT_AT, endAt: END_AT } },
      calendarInvite: { by: A, title: "סיור באתר", eventAt: EVENT_AT, endAt: END_AT, invitees: [B] },
    }),
  });
  await expect.poll(() => page.evaluate(() => window.__native.saved.length)).toBe(1);
  const myEventId = (await page.evaluate(() => window.__native.saved))[0].eventId;

  // the owner moves it an hour later (arrives through the shared project)
  const later = new Date(start.getTime() + 3600000);
  await page.evaluate(({ at, endAt }) => {
    window.__hooks.updateSharedTaskForTest("sh1", "k1", (t) => { t.calendarInvite.eventAt = at; t.calendarInvite.endAt = endAt; });
  }, { at: later.toISOString(), endAt: new Date(later.getTime() + 3600000).toISOString() });
  await expect.poll(() => page.evaluate(() => window.__native.saved.length)).toBe(2);
  expect((await page.evaluate(() => window.__native.saved))[1]).toMatchObject({ eventId: myEventId, start: later.getTime() });

  // the owner un-invites them
  await page.evaluate(() => {
    window.__hooks.updateSharedTaskForTest("sh1", "k1", (t) => { delete t.calendarInvite; });
  });
  await expect.poll(() => page.evaluate(() => window.__native.deleted)).toEqual([myEventId]);
  await expect(calIcon(page)).toHaveCount(0);
});

test("invited member who removes it from their calendar doesn't get it back", async ({ page }) => {
  await openWithSharedProject(page, {
    phone: B, native: true,
    sheet: sheetWith({
      calendarLinks: { [A]: { eventId: 100, eventAt: EVENT_AT, endAt: END_AT } },
      calendarInvite: { by: A, title: "סיור באתר", eventAt: EVENT_AT, endAt: END_AT, invitees: [B] },
    }),
  });
  await expect(calIcon(page)).toHaveCount(1);
  const row = page.locator("#taskList li.task").first();
  const box = await row.boundingBox();
  await page.mouse.move(box.x + box.width / 2, box.y + box.height / 2);
  await page.mouse.down();
  await page.waitForTimeout(1300);
  await page.mouse.up();
  await page.locator("#removeFromCalendarBtn").click();
  await expect(calIcon(page)).toHaveCount(0);
  await page.waitForTimeout(800);
  expect(await page.evaluate(() => window.__native.saved.length)).toBe(1);
  expect((await serverTask(page)).calendarLinks[B]).toMatchObject({ removed: true });
  expect((await serverTask(page)).calendarInvite.invitees).toEqual([B]); // the owner's invite is untouched
});

test("owner removing the event withdraws the invite from everyone", async ({ page }) => {
  await openWithSharedProject(page, {
    phone: A, native: true, calendarEvents: [{ id: 100, title: "סיור באתר", start: start.getTime(), end: end.getTime() }],
    sheet: sheetWith({
      calendarLinks: { [A]: { eventId: 100, eventAt: EVENT_AT, endAt: END_AT, fireAt: EVENT_AT, firedAt: null } },
      calendarInvite: { by: A, title: "סיור באתר", eventAt: EVENT_AT, endAt: END_AT, invitees: [B, C] },
    }),
  });
  const row = page.locator("#taskList li.task").first();
  const box = await row.boundingBox();
  await page.mouse.move(box.x + box.width / 2, box.y + box.height / 2);
  await page.mouse.down();
  await page.waitForTimeout(1300);
  await page.mouse.up();
  await page.locator("#removeFromCalendarBtn").click();
  await expect(calIcon(page)).toHaveCount(0);
  await expect.poll(async () => {
    const t = await serverTask(page);
    return { invite: t.calendarInvite || null, mine: (t.calendarLinks || {})[A] || null };
  }).toEqual({ invite: null, mine: null });
  expect(await page.evaluate(() => window.__native.deleted)).toEqual([100]);
});
