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

// An in-memory stand-in for the Supabase client, installed in the page via
// window.__itaskTestHooks().setBackendForTest. Supports the query-builder
// chains the app uses (select/update/upsert/insert/delete + eq +
// maybeSingle, awaited as a promise) over plain arrays of rows, logs every
// call in window.__backend.log, and can simulate another member writing
// between this device's read and its write (window.__backend.interfere).
const FAKE_BACKEND = () => {
  const tables = {};
  const backend = (window.__backend = { tables, log: [], interfere: null });
  const clone = (o) => JSON.parse(JSON.stringify(o));
  function from(table) {
    const st = { table, op: "select", filters: [], payload: null, single: false };
    const rows = () => (tables[table] = tables[table] || []);
    const match = (r) => st.filters.every(([c, v]) => r[c] === v);
    function run() {
      if (backend.interfere && backend.interfere(st, tables)) backend.interfere = null;
      backend.log.push({ table, op: st.op, filters: st.filters.slice(), payload: st.payload && clone(st.payload) });
      if (st.op === "select") {
        const m = rows().filter(match).map(clone);
        return { data: st.single ? m[0] || null : m, error: null };
      }
      if (st.op === "update") {
        const m = rows().filter(match);
        m.forEach((r) => Object.assign(r, clone(st.payload)));
        return { data: m.map((r) => ({ id: r.id })), error: null };
      }
      if (st.op === "upsert" || st.op === "insert") {
        [].concat(st.payload).forEach((p) => {
          const ex = rows().find((r) => r.id === p.id);
          if (ex) Object.assign(ex, clone(p)); else rows().push(clone(p));
        });
        return { data: null, error: null };
      }
      if (st.op === "delete") {
        tables[table] = rows().filter((r) => !match(r));
        return { data: null, error: null };
      }
      return { data: null, error: null };
    }
    const b = {
      select() { return b; },
      eq(c, v) { st.filters.push([c, v]); return b; },
      neq() { return b; }, in() { return b; }, order() { return b; }, limit() { return b; },
      contains() { return b; }, or() { return b; }, filter() { return b; }, gte() { return b; }, lte() { return b; },
      maybeSingle() { st.single = true; return b; },
      single() { st.single = true; return b; },
      update(p) { st.op = "update"; st.payload = p; return b; },
      upsert(p) { st.op = "upsert"; st.payload = p; return b; },
      insert(p) { st.op = "insert"; st.payload = p; return b; },
      delete() { st.op = "delete"; return b; },
      then(res, rej) { return Promise.resolve().then(run).then(res, rej); },
    };
    return b;
  }
  const ok = (data) => Promise.resolve({ data, error: null });
  backend.uploads = [];
  backend.client = {
    from,
    storage: {
      from: (bucket) => ({
        upload: (path, blob) => { backend.uploads.push({ bucket, path, size: blob && blob.size }); return ok({ path }); },
        remove: (paths) => ok(paths),
        createSignedUrl: (path) => ok({ signedUrl: "about:blank#" + path }),
        getPublicUrl: (path) => ({ data: { publicUrl: "about:blank#" + path } }),
      }),
    },
    functions: { invoke: (name, o) => { backend.log.push({ fn: name, body: o && o.body }); return Promise.resolve({ data: null, error: null }); } },
    channel: () => { const c = { on: () => c, subscribe: () => c }; return c; },
    removeChannel: () => {},
  };
};

// Opens the app offline with the fake backend and one shared project.
async function openWithSharedProject(page, { phone = "+972500000001", sheet, sheets, native = false }) {
  sheets = sheets || [sheet];
  await page.addInitScript(() => { window.__itaskTestHooks = (h) => { window.__hooks = h; }; });
  await page.addInitScript(FAKE_BACKEND);
  await openLocalApp(page, { native });
  await page.evaluate(({ phone, sheets }) => {
    const copy = (o) => JSON.parse(JSON.stringify(o));
    window.__backend.tables.shared_projects = sheets.map((sheet) => ({
      id: sheet.id, name: sheet.name, members: sheet.members, created_by: phone,
      data: { tasks: copy(sheet.tasks || []), reports: [], siteLogs: copy(sheet.siteLogs || []), files: [], folders: null, ended: false },
      data_version: 1, messages: [], messages_version: 1,
    }));
    window.__hooks.setBackendForTest(window.__backend.client, phone);
    sheets.forEach((sheet) => window.__hooks.addSharedSheetForTest(Object.assign({
      shared: true, memberNames: {}, messages: [], reports: [], siteLogs: [], tasks: [], createdBy: phone,
      _syncedData: { tasks: copy(sheet.tasks || []), reports: [], siteLogs: copy(sheet.siteLogs || []), ended: false, endedDate: null, logoId: null },
    }, copy(sheet))));
  }, { phone, sheets });
}

module.exports.FAKE_BACKEND = FAKE_BACKEND;
module.exports.openWithSharedProject = openWithSharedProject;
