const { test, expect } = require("@playwright/test");
const { openLocalApp, longPress, addTask } = require("./helpers/local-app");

// Task reminders in the Android app, against a fake native bridge
// (helpers/local-app.js): checks what the app hands the phone's alarm clock
// (ItaskAlarm.setAlarms) and calendar (ItaskCalendar), and the icons shown.
test.use({ viewport: { width: 390, height: 800 }, serviceWorkers: "block" });

const alarms = (page) => page.evaluate(() => window.__native.alarms);
const pad = (n) => String(n).padStart(2, "0");
function inDays(days, hh, mm) {
  const d = new Date();
  d.setDate(d.getDate() + days);
  d.setHours(hh, mm, 0, 0);
  return { date: `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`, time: `${pad(hh)}:${pad(mm)}`, ms: d.getTime() };
}

async function newTaskWithMenu(page, text) {
  const row = await addTask(page, text);
  const taskId = await row.getAttribute("data-task-id");
  return { row, taskId, openMenu: async () => {
    await longPress(page, row.locator(".task-text, input, span").first());
    await expect(page.locator("#moveTaskOverlay")).toBeVisible();
  } };
}

const iconsLayer = (page) => page.locator("#taskReminderIconsLayer");
const alarmIcon = (page) => iconsLayer(page).locator('img[src*="tasks-reminder-icon"]');
const calendarIcon = (page) => iconsLayer(page).locator(".cal-live-icon");

test("'בחר שעה' sets a ringing alarm; done pauses it; turning it off removes it", async ({ page }) => {
  await openLocalApp(page, { native: true });
  const t = await newTaskWithMenu(page, "בדיקת התראה");
  const when = inDays(1, 10, 0);

  await t.openMenu();
  await page.locator("#taskReminderBtn").click();
  await expect(page.locator("#taskReminderOverlay")).toBeVisible();
  await page.locator("#taskReminderTimeToggleBtn").click();
  await page.locator("#taskReminderDateInput").fill(when.date);
  await page.locator("#taskReminderTimeInput").fill(when.time);
  await page.locator("#taskReminderTimeConfirmBtn").click();

  await expect(alarmIcon(page)).toHaveCount(1);
  await expect.poll(() => alarms(page)).toEqual([expect.objectContaining({ at: when.ms, body: "בדיקת התראה" })]);
  expect((await alarms(page))[0].id.endsWith(":" + t.taskId)).toBe(true);

  // marking it done pauses the alarm, un-marking brings it back
  await t.row.click();
  await t.row.click();
  await expect(t.row).toHaveClass(/done/);
  await expect.poll(() => alarms(page)).toEqual([]);
  await t.row.click();
  await expect(t.row).not.toHaveClass(/done/);
  await expect.poll(async () => (await alarms(page)).length).toBe(1);

  // turning it off
  await t.openMenu();
  await page.locator("#taskReminderBtn").click();
  await page.locator("#taskReminderOffBtn").click();
  await expect(alarmIcon(page)).toHaveCount(0);
  await expect.poll(() => alarms(page)).toEqual([]);
});

test("every 30 minutes repeats", async ({ page }) => {
  await openLocalApp(page, { native: true });
  const t = await newTaskWithMenu(page, "כל חצי שעה");
  await t.openMenu();
  await page.locator("#taskReminderBtn").click();
  await page.locator("#taskReminderEvery30Btn").click();
  await expect.poll(() => alarms(page)).toEqual([expect.objectContaining({ repeatMinutes: 30 })]);
  await expect(alarmIcon(page)).toHaveCount(1);
});

test("calendar link: event in the phone's calendar, rings 15 minutes before, independent of the regular reminder", async ({ page }) => {
  await openLocalApp(page, { native: true });
  const t = await newTaskWithMenu(page, "סיור באתר");
  const when = inDays(2, 9, 0);

  // menu -> calendar button -> new event at a chosen time -> save
  await t.openMenu();
  await page.locator("#taskCalendarReminderBtn").click();
  await expect(page.locator("#calView")).toBeVisible();
  await page.locator(".cal-fab").click();
  await expect(page.locator("#calEventOverlay")).toBeVisible();
  await expect(page.locator("#calEvTitle")).toHaveValue("סיור באתר");
  await page.locator("#calEvStartDate").fill(when.date);
  await page.locator("#calEvStartTime").fill(when.time);
  await page.locator("#calEvEndDate").fill(when.date);
  await page.locator("#calEvEndTime").fill("10:00");
  await page.locator('#calEventForm button[type="submit"]').click();
  await expect(page.locator("#calView")).toBeHidden();

  const saved = await page.evaluate(() => window.__native.saved);
  expect(saved).toHaveLength(1);
  expect(saved[0]).toMatchObject({ title: "סיור באתר", start: when.ms });
  await expect(calendarIcon(page)).toHaveCount(1);
  await expect(calendarIcon(page).locator(".cal-live-day")).toHaveText(String(new Date(when.ms).getDate()));
  await expect.poll(() => alarms(page)).toEqual([
    expect.objectContaining({ id: expect.stringMatching(/:cal$/), at: when.ms - 15 * 60000 }),
  ]);

  // a regular reminder on top: both icons, two alarms
  await t.openMenu();
  await page.locator("#taskReminderBtn").click();
  await page.locator("#taskReminderEvery30Btn").click();
  await expect(alarmIcon(page)).toHaveCount(1);
  await expect(calendarIcon(page)).toHaveCount(1);
  await expect.poll(async () => (await alarms(page)).length).toBe(2);

  // turning the regular reminder off keeps the calendar link
  await t.openMenu();
  await page.locator("#taskReminderBtn").click();
  await page.locator("#taskReminderOffBtn").click();
  await expect(alarmIcon(page)).toHaveCount(0);
  await expect(calendarIcon(page)).toHaveCount(1);
  await expect.poll(async () => (await alarms(page)).map((a) => a.id.endsWith(":cal"))).toEqual([true]);

  // tapping the calendar icon opens that event
  await iconsLayer(page).locator(".task-reminder-indicator", { has: page.locator(".cal-live-icon") }).click();
  await expect(page.locator("#calEventOverlay")).toBeVisible();
  await expect(page.locator("#calEvTitle")).toHaveValue("סיור באתר");
  await page.locator("#calEvCancelBtn").click();
  await page.locator("#calCloseBtn").click();

  // "הסרה מלוח השנה" deletes the event and the link
  await t.openMenu();
  await page.locator("#removeFromCalendarBtn").click();
  await expect(calendarIcon(page)).toHaveCount(0);
  await expect.poll(() => alarms(page)).toEqual([]);
  expect(await page.evaluate(() => window.__native.deleted)).toEqual([saved[0].eventId]);
});

test("an old calendar-set reminder is converted to a calendar link", async ({ page }) => {
  const when = inDays(3, 8, 0);
  const today = inDays(0, 0, 0).date;
  await openLocalApp(page, {
    native: true,
    data: {
      activeSheetId: "s1",
      sheets: [{ id: "s1", name: "פרויקט", tasks: [{
        id: "t1", text: "ישן", status: 0, type: "task", date: today, createdAt: 1,
        reminder: { type: "time", date: when.date, time: "07:45", fireAt: new Date(when.ms - 15 * 60000).toISOString(),
          firedAt: null, calendarEventId: 55, eventAt: new Date(when.ms).toISOString() },
      }], reports: [], files: [] }],
    },
  });
  await expect(page.locator("#taskList li.task", { hasText: "ישן" })).toBeVisible();
  await expect(calendarIcon(page)).toHaveCount(1);
  await expect(alarmIcon(page)).toHaveCount(0);
  await expect.poll(() => alarms(page)).toEqual([
    expect.objectContaining({ id: "s1:t1:cal", at: when.ms - 15 * 60000 }),
  ]);
});

test("in the calendar, events linked to a task stand out in ITASK's colour", async ({ page }) => {
  const when = inDays(1, 10, 0);
  const today = inDays(0, 0, 0).date;
  await openLocalApp(page, {
    native: true,
    data: { activeSheetId: "s1", sheets: [{ id: "s1", name: "פרויקט", reports: [], files: [], tasks: [{
      id: "t1", text: "סיור", status: 0, type: "task", date: today, createdAt: 1,
      calendarLink: { eventId: 100, eventAt: new Date(when.ms).toISOString(), fireAt: new Date(when.ms - 900000).toISOString(), firedAt: null },
    }] }] },
  });
  await page.evaluate((ms) => {
    window.__native.events[100] = { id: 100, title: "סיור", start: ms, end: ms + 3600000, calendarId: 1 };
    window.__native.events[101] = { id: 101, title: "רופא", start: ms + 7200000, end: ms + 10800000, calendarId: 1 };
  }, when.ms);
  // the task's calendar icon opens that day
  await iconsLayer(page).locator(".task-reminder-indicator").click();
  await page.locator("#calEvCancelBtn").click();
  const linked = page.locator(".cal-event-block", { hasText: "סיור" });
  const other = page.locator(".cal-event-block", { hasText: "רופא" });
  await expect(linked).toHaveClass(/cal-itask/);
  await expect(linked).toHaveCSS("background-color", "rgb(201, 81, 44)");
  await expect(other).not.toHaveClass(/cal-itask/);
  await expect(other).not.toHaveCSS("background-color", "rgb(201, 81, 44)");
});
