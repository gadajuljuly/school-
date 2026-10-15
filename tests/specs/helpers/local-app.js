// Runs tasks.html with no backend at all (Supabase/Firebase/CDNs blocked,
// so the app falls back to its local-only mode) and, optionally, with a
// fake Capacitor bridge standing in for the Android app's native plugins:
// ItaskAlarm (alarm-clock reminders, widget) and ItaskCalendar (the phone's
// calendar, kept in memory). The fakes record every call in
// window.__native so tests can check what the app asked the phone to do.
// Fully deterministic and offline - runs the same locally and in CI.

const NATIVE_FAKE = () => {
  const native = (window.__native = {
    alarms: [], alarmCalls: 0, widget: null,
    events: {}, nextEventId: 100, saved: [], deleted: [],
  });
  const ok = (v) => Promise.resolve(v);
  const instancesBetween = (from, to) => Object.values(native.events)
    .filter((e) => e.start < to && e.end > from)
    .map((e) => ({ eventId: e.id, title: e.title, begin: e.start, end: e.end, allDay: !!e.allDay,
      calendarId: e.calendarId, color: -16737844, location: e.location || "", rrule: e.rrule || null }));
  window.Capacitor = {
    isNativePlatform: () => true,
    getPlatform: () => "android",
    Plugins: {
      ItaskAlarm: {
        setAlarms: ({ alarms }) => { native.alarms = alarms; native.alarmCalls++; return ok(); },
        takeTurnedOffAlarms: () => ok({ ids: native.turnedOff ? native.turnedOff.splice(0) : [] }),
        takeLaunchView: () => ok(null),
        addListener: () => ok({ remove() {} }),
        setWidgetData: (d) => { native.widget = d; return ok(); },
        canScheduleExact: () => ok({ value: true }),
        openExactAlarmSettings: () => ok(),
      },
      ItaskCalendar: {
        checkPermissions: () => ok({ calendar: "granted" }),
        requestPermissions: () => ok({ calendar: "granted" }),
        listCalendars: () => ok({ calendars: [{ id: 1, name: "Test", account: "test", color: -16737844, writable: true, primary: true }] }),
        listEvents: ({ from, to }) => ok({ events: instancesBetween(from, to) }),
        getEvent: ({ eventId }) => {
          const e = native.events[eventId];
          if (!e) return Promise.reject(new Error("no event"));
          return ok({ eventId: e.id, title: e.title, dtstart: e.start, dtend: e.end, allDay: !!e.allDay,
            calendarId: e.calendarId, location: e.location || "", description: e.description || "", rrule: e.rrule || null, reminders: [] });
        },
        saveEvent: (p) => {
          const id = p.eventId != null ? p.eventId : native.nextEventId++;
          native.events[id] = { id, title: p.title, start: p.start, end: p.end, allDay: p.allDay,
            calendarId: p.calendarId, location: p.location, description: p.description, rrule: p.rrule || null };
          native.saved.push({ ...p, eventId: id });
          return ok({ eventId: id });
        },
        deleteEvent: ({ eventId }) => { delete native.events[eventId]; native.deleted.push(eventId); return ok(); },
      },
    },
  };
};

async function openLocalApp(page, { native = false, data = null } = {}) {
  page.on("pageerror", (err) => console.log(`[pageerror] ${err}`));
  // only the app's own files - no Supabase, Firebase or CDNs
  await page.route("**/*", (route) => {
    const url = route.request().url();
    if (url.startsWith("http://localhost")) return route.continue();
    return route.abort();
  });
  if (native) await page.addInitScript(NATIVE_FAKE);
  if (data) {
    await page.addInitScript((d) => {
      if (!sessionStorage.getItem("__seeded")) {
        localStorage.setItem("daily-tasks-sheets-v1", JSON.stringify(d));
        sessionStorage.setItem("__seeded", "1");
      }
    }, data);
  }
  // auto-accept confirm()/alert() like a user tapping OK
  page.on("dialog", (d) => d.accept());
  await page.goto("/tasks.html");
  await page.locator("#appRoot").waitFor({ state: "visible" });
  await page.locator("#appLoadingOverlay").waitFor({ state: "hidden" });
}

// Long-press (the app's 600ms+ hold) on an element.
async function longPress(page, locator, ms = 1300) {
  const box = await locator.boundingBox();
  if (!box) throw new Error("element not visible for long-press");
  await page.mouse.move(box.x + box.width / 2, box.y + box.height / 2);
  await page.mouse.down();
  await page.waitForTimeout(ms);
  await page.mouse.up();
}

async function addTask(page, text, type = "task") {
  await page.locator("#taskInput").fill(text);
  await page.locator("#addForm button[type=submit]").click();
  // "איך להוסיף את השורה?" - משימה / מזכרת
  await page.locator(type === "note" ? "#addTypeNoteBtn" : "#addTypeTaskBtn").click();
  const row = page.locator("#taskList li.task", { hasText: text });
  await row.waitFor();
  return row;
}

module.exports = { openLocalApp, longPress, addTask };
