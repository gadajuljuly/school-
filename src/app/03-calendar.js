  // ---------------------------------------------------------------------
  // לוח שנה: month / week / day / list views over the phone's own
  // calendars, read and written through the native ItaskCalendar plugin
  // (android-app/native-src) - so it shows and edits the same events as the
  // phone's calendar app, Google Calendar, and Outlook (when the Outlook
  // app's "Sync calendars" is on). Opened from the icon next to the date.
  // ---------------------------------------------------------------------
  var calPlugin = (
    window.Capacitor && window.Capacitor.isNativePlatform && window.Capacitor.isNativePlatform() &&
    window.Capacitor.Plugins && window.Capacitor.Plugins.ItaskCalendar
  ) || null;
  var CAL_MODE_KEY = "itask-cal-mode";
  var CAL_HIDDEN_KEY = "itask-cal-hidden";
  var CAL_LAST_CALENDAR_KEY = "itask-cal-last-calendar";
  var CAL_HOUR_PX = 48;
  var calView = document.getElementById("calView");
  var calBody = document.getElementById("calBody");
  var calTitle = document.getElementById("calTitle");
  var calState = {
    mode: "month",
    anchor: new Date(),
    events: [],
    calendars: [],
    hidden: {},
    loadSeq: 0,
    // set while picking a task reminder's time ({sheetId, taskId, text})
    pick: null
  };
  try {
    calState.mode = localStorage.getItem(CAL_MODE_KEY) || "month";
    calState.hidden = JSON.parse(localStorage.getItem(CAL_HIDDEN_KEY) || "{}") || {};
  } catch (e) {}

  var calAppBtn = document.getElementById("calendarAppBtn");
  calAppBtn.hidden = !calPlugin;
  calAppBtn.addEventListener("click", openCalendarView);

  function calLocale() {
    return { he: "he-IL", en: "en-US", ar: "ar", ru: "ru-RU" }[currentLang] || "he-IL";
  }
  // The calendar icons (by the date, in the task menu) show today: weekday
  // in the green band and the day number, kept current across midnight.
  // An icon with data-at (a task's calendar reminder) shows that moment's
  // day instead of today.
  function updateLiveCalendarIcons() {
    document.querySelectorAll(".cal-live-icon").forEach(function (el) {
      var d = el.dataset.at ? new Date(el.dataset.at) : new Date();
      el.querySelector(".cal-live-wd").textContent = d.toLocaleDateString(calLocale(), { weekday: "short" });
      el.querySelector(".cal-live-day").textContent = d.getDate();
    });
  }
  updateLiveCalendarIcons();
  setInterval(updateLiveCalendarIcons, 60000);
  document.addEventListener("visibilitychange", function () { if (!document.hidden) updateLiveCalendarIcons(); });
  function calStartOfDay(d) { return new Date(d.getFullYear(), d.getMonth(), d.getDate()); }
  function calAddDays(d, n) { return new Date(d.getFullYear(), d.getMonth(), d.getDate() + n, d.getHours(), d.getMinutes()); }
  function calSameDay(a, b) {
    return a.getFullYear() === b.getFullYear() && a.getMonth() === b.getMonth() && a.getDate() === b.getDate();
  }
  function calWeekStart(d) { return calAddDays(calStartOfDay(d), -calStartOfDay(d).getDay()); }
  function calYmd(d) {
    return d.getFullYear() + "-" + String(d.getMonth() + 1).padStart(2, "0") + "-" + String(d.getDate()).padStart(2, "0");
  }
  function calHm(d) { return String(d.getHours()).padStart(2, "0") + ":" + String(d.getMinutes()).padStart(2, "0"); }
  function calParseYmd(s) { var p = s.split("-"); return new Date(+p[0], +p[1] - 1, +p[2]); }
  function calColor(n) {
    if (n === null || n === undefined) return "#35618f";
    var c = (n >>> 0) & 0xffffff;
    return "#" + c.toString(16).padStart(6, "0");
  }

  // All-day events are stored at UTC midnight (Android's rule): map them to
  // local calendar days so they land on the right date in every timezone.
  function calEventStart(ev) {
    if (!ev.allDay) return new Date(ev.begin);
    var u = new Date(ev.begin);
    return new Date(u.getUTCFullYear(), u.getUTCMonth(), u.getUTCDate());
  }
  function calEventEnd(ev) {
    if (!ev.allDay) return new Date(ev.end);
    var u = new Date(ev.end);
    return new Date(u.getUTCFullYear(), u.getUTCMonth(), u.getUTCDate());
  }
  function calEventsOn(day) {
    var dayStart = calStartOfDay(day), dayEnd = calAddDays(dayStart, 1);
    return calState.events.filter(function (ev) {
      var s = calEventStart(ev), e = calEventEnd(ev);
      if (e <= s) e = new Date(s.getTime() + 1);
      return s < dayEnd && e > dayStart;
    }).sort(function (a, b) {
      if (a.allDay !== b.allDay) return a.allDay ? -1 : 1;
      return a.begin - b.begin;
    });
  }

  function calRange() {
    var a = calState.anchor;
    if (calState.mode === "month") {
      var first = new Date(a.getFullYear(), a.getMonth(), 1);
      var start = calWeekStart(first);
      return { from: start, to: calAddDays(start, 42) };
    }
    if (calState.mode === "week") {
      var ws = calWeekStart(a);
      return { from: ws, to: calAddDays(ws, 7) };
    }
    if (calState.mode === "day") {
      var ds = calStartOfDay(a);
      return { from: ds, to: calAddDays(ds, 1) };
    }
    var ts = calStartOfDay(a);
    return { from: ts, to: calAddDays(ts, 60) };
  }

  // The bottom icon bar stays in view under the calendar, so the user can
  // jump straight to another screen: the calendar ends just above the bar
  // (and its divider), and tapping any of its buttons closes the calendar
  // first.
  var notebookFooterEl = document.getElementById("notebookFooter");
  function calFitAboveFooter() {
    calView.style.bottom = "";
    if (calView.hidden) return;
    var edge = notebookFooterEl.previousElementSibling || notebookFooterEl;
    var top = edge.getBoundingClientRect().top;
    if (notebookFooterEl.offsetHeight && top > window.innerHeight / 2 && top < window.innerHeight) {
      calView.style.bottom = (window.innerHeight - top) + "px";
      calView.style.paddingBottom = "0";
    }
  }
  window.addEventListener("resize", calFitAboveFooter);
  notebookFooterEl.addEventListener("click", function () {
    if (!calView.hidden) closeCalendarView();
  }, true);

  function openCalendarView() {
    if (!calPlugin) return;
    calState.anchor = new Date();
    calView.hidden = false;
    calFitAboveFooter();
    calEnsurePermission(function () { calLoadCalendars().then(calLoadAndRender); });
  }
  // Task long-press -> התראה -> לוח שנה: the calendar opens on today's day
  // view; tapping a time opens the event editor with the task's text, and
  // saving puts the task in the phone's calendar AND sets the task's
  // ringing reminder (dinging, snooze...) for that same moment.
  var calPickBanner = document.getElementById("calPickBanner");
  function openCalendarForTaskReminder(sheetId, task) {
    if (!calPlugin || !task) return;
    calState.pick = { sheetId: sheetId, taskId: task.id, text: task.text };
    calState.mode = "day";
    calState.anchor = new Date();
    calView.hidden = false;
    calFitAboveFooter();
    calEnsurePermission(function () { calLoadCalendars().then(calLoadAndRender); });
  }
  document.getElementById("calPickCancelBtn").addEventListener("click", closeCalendarView);

  // The Android WebView no longer opens its own picker for the app's
  // invisible <input type="date"> overlays (tapping the date did nothing),
  // so in the native app a small month picker opens instead; picking a
  // day fills the input and fires its usual "change". Honours min/max.
  var datePickOverlay = document.getElementById("datePickOverlay");
  var datePick = { input: null, month: null };
  function openSimpleDatePicker(input) {
    datePick.input = input;
    var d = input.value ? calParseYmd(input.value) : new Date();
    datePick.month = new Date(d.getFullYear(), d.getMonth(), 1);
    renderSimpleDatePicker();
    datePickOverlay.hidden = false;
  }
  function renderSimpleDatePicker() {
    var input = datePick.input, m = datePick.month;
    var loc = calLocale();
    document.getElementById("datePickTitle").textContent =
      m.toLocaleDateString(loc, { month: "long", year: "numeric" });
    var grid = document.getElementById("datePickGrid");
    grid.innerHTML = "";
    var first = calWeekStart(m);
    for (var w = 0; w < 7; w++) {
      var h = document.createElement("span");
      h.className = "date-pick-wd";
      h.textContent = calAddDays(first, w).toLocaleDateString(loc, { weekday: "narrow" });
      grid.appendChild(h);
    }
    var today = calYmd(new Date());
    for (var i = 0; i < m.getDay(); i++) grid.appendChild(document.createElement("span"));
    var days = new Date(m.getFullYear(), m.getMonth() + 1, 0).getDate();
    for (var n = 1; n <= days; n++) {
      var ymd = calYmd(new Date(m.getFullYear(), m.getMonth(), n));
      var b = document.createElement("button");
      b.type = "button";
      b.className = "date-pick-day" + (ymd === today ? " is-today" : "") +
        (ymd === input.value ? " is-selected" : "");
      b.textContent = n;
      b.disabled = !!((input.min && ymd < input.min) || (input.max && ymd > input.max));
      b.addEventListener("click", finishSimpleDatePick.bind(null, ymd));
      grid.appendChild(b);
    }
  }
  function finishSimpleDatePick(ymd) {
    var input = datePick.input;
    datePickOverlay.hidden = true;
    datePick.input = null;
    if (!input || input.value === ymd) return;
    input.value = ymd;
    input.dispatchEvent(new Event("change", { bubbles: true }));
  }
  function shiftSimpleDatePicker(delta) {
    datePick.month = new Date(datePick.month.getFullYear(), datePick.month.getMonth() + delta, 1);
    renderSimpleDatePicker();
  }
  document.getElementById("datePickPrev").addEventListener("click", function () { shiftSimpleDatePicker(-1); });
  document.getElementById("datePickNext").addEventListener("click", function () { shiftSimpleDatePicker(1); });
  document.getElementById("datePickTodayBtn").addEventListener("click", function () {
    var t = calYmd(new Date()), input = datePick.input;
    if (input && ((input.min && t < input.min) || (input.max && t > input.max))) return;
    finishSimpleDatePick(t);
  });
  document.getElementById("datePickCancelBtn").addEventListener("click", function () {
    datePickOverlay.hidden = true;
    datePick.input = null;
  });
  datePickOverlay.addEventListener("click", function (e) {
    if (e.target === datePickOverlay) { datePickOverlay.hidden = true; datePick.input = null; }
  });
  if (window.Capacitor && window.Capacitor.isNativePlatform && window.Capacitor.isNativePlatform()) {
    document.querySelectorAll(".date-click-area input[type=date]").forEach(function (input) {
      input.addEventListener("click", function (e) {
        e.preventDefault();
        openSimpleDatePicker(input);
      });
    });
  }

  // A task put in the calendar rings a quarter of an hour before its event
  // (or at the event itself when that's already less than 15 minutes away).
  var CAL_TASK_REMINDER_LEAD_MS = 15 * 60000;
  function calReminderFireMs(startMs) {
    var early = startMs - CAL_TASK_REMINDER_LEAD_MS;
    return early > Date.now() ? early : startMs;
  }
  function calApplyPickedReminder(startMs, eventId, endMs) {
    var pick = calState.pick;
    var sheet = pick && allSheets().find(function (s) { return s.id === pick.sheetId; });
    var task = sheet && (sheet.tasks || []).find(function (t) { return t.id === pick.taskId; });
    if (!task) return;
    migrateCalendarReminderToLink(task);
    var old = getMyCalendarLink(sheet, task);
    if (old && old.eventId != null && String(old.eventId) !== String(eventId)) {
      calPlugin.deleteEvent({ eventId: old.eventId }).catch(function () {});
    }
    var endAt = new Date(endMs || startMs + 3600000).toISOString();
    setMyCalendarLink(sheet, task, {
      eventId: eventId,
      eventAt: new Date(startMs).toISOString(),
      endAt: endAt,
      fireAt: new Date(calReminderFireMs(startMs)).toISOString(),
      firedAt: null
    });
    calMoveMyInvite(task, startMs, endAt);
    saveData();
    closeCalendarView();
    render();
    showToast(tr("calReminderSetMsg"));
    ensureExactAlarmPermission();
  }

  // Tapping a task's calendar icon: the calendar opens on that day and the
  // reminder's event opens in the editor (or just the day, with a note, if
  // the event was removed from the phone's calendar meanwhile).
  function openTaskCalendarEvent(link) {
    if (!calPlugin) return;
    calState.mode = "day";
    calState.anchor = new Date(link.eventAt);
    calView.hidden = false;
    calFitAboveFooter();
    calEnsurePermission(function () {
      calLoadCalendars().then(calLoadAndRender).then(function () {
        var occ = (calState.events || []).find(function (ev) {
          return String(ev.eventId) === String(link.eventId);
        });
        if (occ) calOpenEditor(occ);
        else showToast(tr("calEventMissingMsg"));
      });
    });
  }
  // Editing / deleting that event in the calendar carries over to the
  // task's reminder: a new time moves it, deleting the event removes it.
  // For the member who invited others (calendarInvite.by), the change
  // carries over to everyone invited: a new time moves their copies,
  // deleting it removes them.
  function calSyncTaskRemindersForEvent(eventId, startMs, deleted, endMs) {
    var changed = false;
    allSheets().forEach(function (sheet) {
      (sheet.tasks || []).forEach(function (t) {
        if (migrateCalendarReminderToLink(t)) changed = true;
        var link = getMyCalendarLink(sheet, t);
        if (!link || link.eventId == null || String(link.eventId) !== String(eventId)) return;
        if (deleted) {
          removeMyCalendarLink(sheet, t, link);
        } else {
          var endAt = endMs ? new Date(endMs).toISOString() : link.endAt;
          if (Date.parse(link.eventAt) === startMs && link.endAt === endAt) return;
          link.eventAt = new Date(startMs).toISOString();
          link.endAt = endAt;
          link.fireAt = new Date(calReminderFireMs(startMs)).toISOString();
          link.firedAt = null;
          calMoveMyInvite(t, startMs, endAt);
        }
        changed = true;
      });
    });
    if (changed) { saveData(); render(); }
  }

  // ---- sharing a task's calendar event with project members ----
  // Long-press on a shared task's calendar icon (my own event) -> pick
  // members -> task.calendarInvite {by, title, eventAt, endAt, invitees}.
  // Each invited member's app then adds the same event to THEIR phone's
  // calendar (processCalendarInvites below) and gets the calendar icon and
  // the 15-minutes-before ring on that task too. Unticking someone, or the
  // owner removing the event, takes it off their phone again.
  var calInviteOverlay = document.getElementById("calInviteOverlay");
  var calInviteList = document.getElementById("calInviteList");
  var calInviteTarget = null;
  function openCalendarInviteModal(sheet, task) {
    var link = getMyCalendarLink(sheet, task);
    if (!sheet || !sheet.shared || !link) return;
    calInviteTarget = { sheetId: sheet.id, taskId: task.id };
    var current = (task.calendarInvite && task.calendarInvite.invitees) || [];
    calInviteList.innerHTML = "";
    var others = (sheet.members || []).filter(function (p) { return p && p !== myPhoneNumber; });
    if (!others.length) {
      var none = document.createElement("div");
      none.className = "move-task-empty";
      none.textContent = tr("calInviteNoMembers");
      calInviteList.appendChild(none);
    }
    others.forEach(function (phone) {
      var row = document.createElement("label");
      row.className = "cal-invite-row";
      var box = document.createElement("input");
      box.type = "checkbox";
      box.value = phone;
      box.checked = current.indexOf(phone) !== -1;
      var name = document.createElement("span");
      name.textContent = resolveMemberName(sheet, phone);
      row.appendChild(box);
      row.appendChild(name);
      calInviteList.appendChild(row);
    });
    document.getElementById("calInviteTaskText").textContent = task.text;
    calInviteOverlay.hidden = false;
  }
  function closeCalendarInviteModal() {
    calInviteOverlay.hidden = true;
    calInviteTarget = null;
  }
  document.getElementById("calInviteCancelBtn").addEventListener("click", closeCalendarInviteModal);
  calInviteOverlay.addEventListener("click", function (e) { if (e.target === calInviteOverlay) closeCalendarInviteModal(); });
  document.getElementById("calInviteOkBtn").addEventListener("click", function () {
    var target = calInviteTarget;
    var invitees = Array.prototype.slice.call(calInviteList.querySelectorAll("input:checked")).map(function (b) { return b.value; });
    closeCalendarInviteModal();
    var sheet = target && sharedSheets.find(function (s) { return s.id === target.sheetId; });
    var task = sheet && sheet.tasks.find(function (t) { return t.id === target.taskId; });
    var link = task && getMyCalendarLink(sheet, task);
    if (!link) return;
    var withEnd = link.endAt ? Promise.resolve(link.endAt) : calPlugin.getEvent({ eventId: link.eventId }).then(function (full) {
      var endMs = full.dtend || (full.dtstart + (full.durationMs || 3600000));
      return new Date(endMs).toISOString();
    }, function () { return new Date(Date.parse(link.eventAt) + 3600000).toISOString(); });
    var before = (task.calendarInvite && task.calendarInvite.invitees) || [];
    withEnd.then(function (endAt) {
      link.endAt = endAt;
      if (invitees.length) {
        task.calendarInvite = { by: myPhoneNumber, title: task.text, eventAt: link.eventAt, endAt: endAt, invitees: invitees };
      } else {
        delete task.calendarInvite;
      }
      saveData();
      render();
      showToast(invitees.length ? tr("calInviteSentMsg").replace("{n}", invitees.length) : tr("calInviteClearedMsg"));
      var added = invitees.filter(function (p) { return before.indexOf(p) === -1; });
      if (added.length) notifyCalendarInvitees(sheet, task, added);
    });
  });

  // A push to the newly added members only: "<name> הוסיף/ה אותך לאירוע:
  // <task> · <day date time>"; tapping it opens that task.
  function notifyCalendarInvitees(sheet, task, phones) {
    if (!supabaseClient || !supabaseClient.functions) return;
    var at = new Date(task.calendarInvite.eventAt);
    var when = at.toLocaleDateString(calLocale(), { weekday: "short", day: "numeric", month: "numeric" }) + " " + calHm(at);
    var text = tr("calInvitePushText").replace("{name}", resolveMemberName(sheet, myPhoneNumber)) + " " + task.text + " · " + when;
    try {
      supabaseClient.functions.invoke("send-chat-notification", {
        body: {
          kind: "calendarInvite", sheetId: sheet.id, senderPhone: myPhoneNumber,
          senderName: resolveMemberName(sheet, myPhoneNumber), text: text,
          recipients: phones, taskId: task.id, date: task.date
        }
      }).then(function () {}, function (err) { console.error("calendar invite push failed:", err); });
    } catch (e) {}
  }

  // Runs on every render: brings this phone's calendar in line with the
  // invites addressed to me on shared projects (add / move / take off).
  var calInviteBusy = {};
  var calInvitePermissionAsked = false;
  function calInviteCalendarId() {
    return calPlugin.checkPermissions().then(function (st) {
      if (st && st.calendar === "granted") return true;
      if (calInvitePermissionAsked) return false;
      calInvitePermissionAsked = true;
      return calPlugin.requestPermissions({ permissions: ["calendar"] }).then(function (st2) {
        return !!(st2 && st2.calendar === "granted");
      });
    }).then(function (granted) {
      if (!granted) return null;
      return calPlugin.listCalendars().then(function (res) {
        var writable = ((res && res.calendars) || []).filter(function (c) { return c.writable; });
        var last = null;
        try { last = localStorage.getItem(CAL_LAST_CALENDAR_KEY); } catch (e) {}
        var pick = writable.find(function (c) { return String(c.id) === last; }) ||
          writable.find(function (c) { return c.primary; }) || writable[0];
        return pick ? pick.id : null;
      });
    });
  }
  function processCalendarInvites() {
    if (!calPlugin || !myPhoneNumber || dataLoadBlocked) return;
    sharedSheets.forEach(function (sheet) {
      if (sheet.ended) return;
      (sheet.tasks || []).forEach(function (t) {
        var key = sheet.id + ":" + t.id;
        if (calInviteBusy[key]) return;
        var inv = t.calendarInvite;
        var mine = t.calendarLinks ? t.calendarLinks[myPhoneNumber] : null;
        var invited = inv && inv.by !== myPhoneNumber && (inv.invitees || []).indexOf(myPhoneNumber) !== -1;
        if (invited) {
          if (mine && (mine.removed || (mine.eventAt === inv.eventAt && mine.endAt === inv.endAt))) return;
          calInviteBusy[key] = true;
          calInviteCalendarId().then(function (calendarId) {
            if (calendarId == null) return;
            var start = Date.parse(inv.eventAt);
            var payload = {
              calendarId: calendarId, title: inv.title || t.text, allDay: false,
              start: start, end: Date.parse(inv.endAt) || start + 3600000,
              rrule: "", reminderMinutes: -1, location: "", description: sheet.name
            };
            if (mine && mine.eventId != null) payload.eventId = mine.eventId;
            return calPlugin.saveEvent(payload).then(function (res) {
              var live = sheet.tasks.find(function (x) { return x.id === t.id; }) || t;
              setMyCalendarLink(sheet, live, {
                eventId: (res && res.eventId != null) ? res.eventId : payload.eventId,
                eventAt: inv.eventAt, endAt: inv.endAt,
                fireAt: new Date(calReminderFireMs(start)).toISOString(), firedAt: null,
                fromInvite: true
              });
              saveData();
              render();
            });
          }).catch(function () {}).then(function () { delete calInviteBusy[key]; });
        } else if (mine && mine.fromInvite) {
          // no longer invited (unticked, or the owner removed the event)
          calInviteBusy[key] = true;
          var gone = mine.eventId != null ? calPlugin.deleteEvent({ eventId: mine.eventId }).catch(function () {}) : Promise.resolve();
          gone.then(function () {
            var live = sheet.tasks.find(function (x) { return x.id === t.id; }) || t;
            setMyCalendarLink(sheet, live, null);
            saveData();
            render();
          }).then(function () { delete calInviteBusy[key]; });
        }
      });
    });
  }

  function closeCalendarView() {
    calState.pick = null;
    calView.style.bottom = "";
    calView.style.paddingBottom = "";
    calPickBanner.hidden = true;
    try { calState.mode = localStorage.getItem(CAL_MODE_KEY) || "month"; } catch (e) {}
    calView.hidden = true;
    document.getElementById("calEventOverlay").hidden = true;
    document.getElementById("calCalendarsOverlay").hidden = true;
    calCopyOverlay.hidden = true;
  }
  document.getElementById("calCloseBtn").addEventListener("click", closeCalendarView);

  function calShowMessage(text, buttonText, onButton) {
    calBody.innerHTML = "";
    var box = document.createElement("div");
    box.className = "cal-message";
    box.textContent = text;
    if (buttonText) {
      var btn = document.createElement("button");
      btn.type = "button";
      btn.className = "modal-btn modal-btn-primary";
      btn.textContent = buttonText;
      btn.addEventListener("click", onButton);
      box.appendChild(document.createElement("br"));
      box.appendChild(btn);
    }
    calBody.appendChild(box);
  }

  function calEnsurePermission(then) {
    calPlugin.checkPermissions().then(function (st) {
      if (st && st.calendar === "granted") { then(); return; }
      calPlugin.requestPermissions({ permissions: ["calendar"] }).then(function (st2) {
        if (st2 && st2.calendar === "granted") then();
        else calShowMessage(tr("calPermissionNeeded"), tr("calGrantAccess"), function () { calEnsurePermission(then); });
      }, function () {
        calShowMessage(tr("calPermissionNeeded"), tr("calGrantAccess"), function () { calEnsurePermission(then); });
      });
    }, function () {
      calShowMessage(tr("calLoadError"));
    });
  }

  function calLoadCalendars() {
    return calPlugin.listCalendars().then(function (res) {
      calState.calendars = (res && res.calendars) || [];
    }, function () { calState.calendars = []; });
  }

  function calLoadAndRender() {
    var range = calRange();
    var seq = ++calState.loadSeq;
    calRenderTitle();
    return calPlugin.listEvents({ from: range.from.getTime(), to: range.to.getTime() }).then(function (res) {
      if (seq !== calState.loadSeq) return;
      calState.events = ((res && res.events) || []).filter(function (ev) {
        return !calState.hidden[String(ev.calendarId)];
      });
      calRender();
    }, function () {
      if (seq === calState.loadSeq) calShowMessage(tr("calLoadError"));
    });
  }

  function calRenderTitle() {
    var a = calState.anchor, loc = calLocale(), text;
    if (calState.mode === "month") {
      text = a.toLocaleDateString(loc, { month: "long", year: "numeric" });
    } else if (calState.mode === "week") {
      var ws = calWeekStart(a), we = calAddDays(ws, 6);
      text = ws.toLocaleDateString(loc, { day: "numeric", month: "short" }) + " – " +
        we.toLocaleDateString(loc, { day: "numeric", month: "short", year: "numeric" });
    } else if (calState.mode === "day") {
      text = a.toLocaleDateString(loc, { weekday: "long", day: "numeric", month: "long" });
    } else {
      text = tr("calModeAgenda");
    }
    calTitle.textContent = text;
    document.querySelectorAll("[data-cal-mode]").forEach(function (b) {
      b.classList.toggle("active", b.getAttribute("data-cal-mode") === calState.mode);
    });
  }

  function calRender() {
    calRenderTitle();
    calBody.innerHTML = "";
    if (calState.mode === "month") calRenderMonth();
    else if (calState.mode === "agenda") calRenderAgenda();
    else calRenderDays(calState.mode === "week" ? 7 : 1);
    var fab = document.createElement("button");
    fab.type = "button";
    fab.className = "cal-fab";
    fab.textContent = "+";
    fab.addEventListener("click", function () {
      var start = calSameDay(calState.anchor, new Date()) ? new Date() : calStartOfDay(calState.anchor);
      if (calSameDay(start, new Date())) start.setMinutes(0, 0, 0), start.setHours(start.getHours() + 1);
      else start.setHours(9);
      calOpenEditor(null, start);
    });
    calBody.appendChild(fab);
  }

  function calWeekdayHeaders(container, start, count) {
    for (var i = 0; i < count; i++) {
      var d = document.createElement("div");
      d.textContent = calAddDays(start, i).toLocaleDateString(calLocale(), { weekday: "short" });
      container.appendChild(d);
    }
  }

  // Month cells and all-day lanes: the title alone, like the phone's
  // calendar - a timed event gets a coloured dot, an all-day one a bar.
  function calChip(ev) {
    var chip = document.createElement("span");
    var color = calColor(ev.color);
    chip.className = "cal-chip" + (ev.allDay ? "" : " timed");
    if (ev.allDay) chip.style.background = color;
    else chip.style.setProperty("--chip-color", color);
    chip.textContent = ev.title || tr("calNoTitle");
    calBindEvent(chip, ev);
    return chip;
  }

  // Tap an event to edit it; press and hold to copy it into a project as a
  // task or a מזכרת (calOpenCopy).
  function calBindEvent(el, ev) {
    var timer = null, fired = false, sx = 0, sy = 0;
    function start(e) {
      var p = e.touches ? e.touches[0] : e;
      sx = p.clientX; sy = p.clientY;
      fired = false;
      clearTimeout(timer);
      timer = setTimeout(function () { fired = true; calOpenCopy(ev); }, 600);
    }
    function cancel() { clearTimeout(timer); }
    function move(e) {
      var p = e.touches ? e.touches[0] : e;
      if (Math.abs(p.clientX - sx) > 10 || Math.abs(p.clientY - sy) > 10) cancel();
    }
    el.addEventListener("touchstart", start, { passive: true });
    el.addEventListener("touchend", cancel);
    el.addEventListener("touchmove", move, { passive: true });
    el.addEventListener("mousedown", start);
    el.addEventListener("mouseup", cancel);
    el.addEventListener("mouseleave", cancel);
    el.addEventListener("contextmenu", function (e) { e.preventDefault(); });
    el.style.webkitTouchCallout = "none";
    el.style.userSelect = "none";
    el.addEventListener("click", function (e) {
      e.stopPropagation();
      if (fired) { fired = false; return; }
      calOpenEditor(ev);
    });
  }

  // ---- copy an event into a project (task / מזכרת) ----
  var calCopyOverlay = document.getElementById("calCopyOverlay");
  var calCopyProjects = document.getElementById("calCopyProjects");
  var calCopyTypeRow = document.getElementById("calCopyTypeRow");
  var calCopyMessage = document.getElementById("calCopyMessage");
  var calCopyEvent = null, calCopyType = "task";
  function calOpenCopy(ev) {
    calCopyEvent = ev;
    calCopyMessage.textContent = ev.title || tr("calNoTitle");
    calCopyTypeRow.hidden = false;
    calCopyProjects.hidden = true;
    calCopyOverlay.hidden = false;
  }
  function calCloseCopy() {
    calCopyOverlay.hidden = true;
    calCopyEvent = null;
  }
  function calCopyChooseType(type) {
    calCopyType = type;
    calCopyTypeRow.hidden = true;
    calCopyMessage.textContent = tr("calCopyPickProject");
    calCopyProjects.innerHTML = "";
    allSheets().filter(function (s) {
      return !s.ended && s.id !== HEAD_OFFICE_SHEET_ID;
    }).forEach(function (sheet) {
      var b = document.createElement("button");
      b.type = "button";
      b.textContent = (sheet.shared ? "👥 " : "") + sheet.name;
      b.addEventListener("click", function () { calCopyInto(sheet); });
      calCopyProjects.appendChild(b);
    });
    calCopyProjects.hidden = false;
  }
  // Same shape as a row added by hand (addPendingTask), dated today - the
  // day it was copied, so it shows up right away in the project's list -
  // with the event's own date (and start time, if it has one) kept in the
  // text, e.g. "פגישה עם הקבלן (18/10 09:00)".
  function calCopyInto(sheet) {
    var ev = calCopyEvent;
    if (!ev) return;
    var start = calEventStart(ev);
    var title = (ev.title || tr("calNoTitle")).trim();
    var when = isoToDisplay(calYmd(start)) + (ev.allDay ? "" : " " + calHm(start));
    var newTask = {
      id: uid(),
      text: title + " (" + when + ")",
      status: 0,
      urgent: false,
      type: calCopyType,
      date: todayISO(),
      createdAt: Date.now()
    };
    if (calCopyType === "note") newTask.time = currentTimeHHMM();
    if (isHeadOfficeMode) newTask.isHeadOffice = true;
    // a task made from a timed, upcoming event is linked to it: calendar
    // icon by the task, and a ringing reminder 15 minutes before
    var linkReminder = calCopyType === "task" && !ev.allDay && start.getTime() > Date.now() && ev.eventId != null;
    if (linkReminder) {
      setMyCalendarLink(sheet, newTask, {
        eventId: ev.eventId, eventAt: start.toISOString(), endAt: new Date(calEventEnd(ev)).toISOString(),
        fireAt: new Date(calReminderFireMs(start.getTime())).toISOString(), firedAt: null
      });
    }
    sheet.tasks.push(newTask);
    saveData();
    if (sheet.shared && calCopyType === "task") {
      sendChatSystemMessage(sheet.id, "added", newTask.text, myPhoneNumber);
    }
    calCloseCopy();
    showToast(tr(calCopyType === "task" ? "calCopiedTaskMsg" : "calCopiedNoteMsg") + " " + sheet.name);
    render();
    if (linkReminder) ensureExactAlarmPermission();
  }
  document.getElementById("calCopyTaskBtn").addEventListener("click", function () { calCopyChooseType("task"); });
  document.getElementById("calCopyNoteBtn").addEventListener("click", function () { calCopyChooseType("note"); });
  document.getElementById("calCopyCancelBtn").addEventListener("click", calCloseCopy);
  calCopyOverlay.addEventListener("click", function (e) { if (e.target === calCopyOverlay) calCloseCopy(); });

  function calRenderMonth() {
    var a = calState.anchor;
    var gridStart = calWeekStart(new Date(a.getFullYear(), a.getMonth(), 1));
    var head = document.createElement("div");
    head.className = "cal-weekdays";
    calWeekdayHeaders(head, gridStart, 7);
    calBody.appendChild(head);
    var grid = document.createElement("div");
    grid.className = "cal-month-grid";
    var today = new Date();
    for (var i = 0; i < 42; i++) {
      (function (day) {
        var cell = document.createElement("div");
        cell.className = "cal-day-cell" + (day.getMonth() !== a.getMonth() ? " other-month" : "") +
          (calSameDay(day, today) ? " today" : "");
        var num = document.createElement("span");
        num.className = "cal-day-num";
        num.textContent = day.getDate();
        cell.appendChild(num);
        var evs = calEventsOn(day);
        evs.slice(0, 3).forEach(function (ev) { cell.appendChild(calChip(ev)); });
        if (evs.length > 3) {
          var more = document.createElement("div");
          more.className = "cal-more";
          more.textContent = "+" + (evs.length - 3);
          more.dir = "ltr";
          cell.appendChild(more);
        }
        cell.addEventListener("click", function () {
          calState.anchor = day;
          calSetMode("day");
        });
        grid.appendChild(cell);
      })(calAddDays(gridStart, i));
    }
    calBody.appendChild(grid);
  }

  function calRenderDays(count) {
    var start = count === 7 ? calWeekStart(calState.anchor) : calStartOfDay(calState.anchor);
    var today = new Date();
    var head = document.createElement("div");
    head.className = "cal-cols-head";
    var g = document.createElement("div");
    g.className = "cal-gutter";
    head.appendChild(g);
    var allDayRow = document.createElement("div");
    allDayRow.className = "cal-allday-row";
    var g2 = document.createElement("div");
    g2.className = "cal-gutter";
    allDayRow.appendChild(g2);
    var days = [];
    for (var i = 0; i < count; i++) days.push(calAddDays(start, i));
    days.forEach(function (day) {
      var ch = document.createElement("div");
      ch.className = "cal-col-head" + (calSameDay(day, today) ? " today" : "");
      var nm = document.createElement("div");
      nm.className = "cal-col-name";
      nm.textContent = day.toLocaleDateString(calLocale(), { weekday: "short" });
      var nu = document.createElement("span");
      nu.className = "cal-col-num";
      nu.textContent = day.getDate();
      ch.appendChild(nm);
      ch.appendChild(nu);
      if (count === 7) ch.addEventListener("click", function () { calState.anchor = day; calSetMode("day"); });
      head.appendChild(ch);
      var ad = document.createElement("div");
      ad.className = "cal-allday-cell";
      calEventsOn(day).filter(function (ev) { return ev.allDay; }).forEach(function (ev) { ad.appendChild(calChip(ev)); });
      allDayRow.appendChild(ad);
    });
    calBody.appendChild(head);
    calBody.appendChild(allDayRow);

    var scroll = document.createElement("div");
    scroll.className = "cal-time-scroll";
    var grid = document.createElement("div");
    grid.className = "cal-time-grid";
    grid.style.height = (24 * CAL_HOUR_PX) + "px";
    var hours = document.createElement("div");
    hours.className = "cal-hours";
    for (var h = 0; h < 24; h++) {
      var hl = document.createElement("div");
      hl.className = "cal-hour-label";
      hl.textContent = h === 0 ? "" : String(h).padStart(2, "0") + ":00";
      hours.appendChild(hl);
    }
    grid.appendChild(hours);
    days.forEach(function (day) {
      var col = document.createElement("div");
      col.className = "cal-col";
      col.addEventListener("click", function (e) {
        if (e.target !== col) return;
        var rect = col.getBoundingClientRect();
        var minutes = Math.floor(((e.clientY - rect.top) / CAL_HOUR_PX) * 2) * 30;
        var s = calStartOfDay(day);
        s.setMinutes(minutes);
        calOpenEditor(null, s);
      });
      calLayoutTimed(calEventsOn(day).filter(function (ev) { return !ev.allDay; }), day).forEach(function (item) {
        var block = document.createElement("div");
        block.className = "cal-event-block";
        block.style.background = calColor(item.ev.color);
        block.style.top = item.top + "px";
        block.style.height = Math.max(item.height, 18) + "px";
        block.style.insetInlineStart = (item.lane / item.lanes * 100) + "%";
        block.style.width = "calc(" + (100 / item.lanes) + "% - 2px)";
        block.textContent = (item.ev.title || tr("calNoTitle")) + " " + calHm(calEventStart(item.ev));
        calBindEvent(block, item.ev);
        col.appendChild(block);
      });
      if (calSameDay(day, today)) {
        var now = document.createElement("div");
        now.className = "cal-now-line";
        now.style.top = ((today.getHours() * 60 + today.getMinutes()) / 60 * CAL_HOUR_PX) + "px";
        col.appendChild(now);
      }
      grid.appendChild(col);
    });
    scroll.appendChild(grid);
    calBody.appendChild(scroll);
    var focusHour = days.some(function (d) { return calSameDay(d, today); }) ? Math.max(today.getHours() - 1, 0) : 7;
    scroll.scrollTop = focusHour * CAL_HOUR_PX;
  }

  // Side-by-side lanes for overlapping timed events within one day.
  function calLayoutTimed(evs, day) {
    var dayStart = calStartOfDay(day).getTime(), dayEnd = calAddDays(calStartOfDay(day), 1).getTime();
    var items = evs.map(function (ev) {
      var s = Math.max(ev.begin, dayStart), e = Math.min(Math.max(ev.end, ev.begin + 15 * 60000), dayEnd);
      return { ev: ev, s: s, e: e, top: (s - dayStart) / 3600000 * CAL_HOUR_PX, height: (e - s) / 3600000 * CAL_HOUR_PX };
    }).sort(function (a, b) { return a.s - b.s; });
    var cluster = [], clusterEnd = 0;
    function flush() {
      var lanesEnd = [];
      cluster.forEach(function (it) {
        var lane = lanesEnd.findIndex(function (end) { return end <= it.s; });
        if (lane === -1) { lane = lanesEnd.length; lanesEnd.push(it.e); } else lanesEnd[lane] = it.e;
        it.lane = lane;
      });
      cluster.forEach(function (it) { it.lanes = lanesEnd.length; });
      cluster = [];
    }
    items.forEach(function (it) {
      if (cluster.length && it.s >= clusterEnd) flush();
      cluster.push(it);
      clusterEnd = cluster.length === 1 ? it.e : Math.max(clusterEnd, it.e);
    });
    flush();
    return items;
  }

  function calRenderAgenda() {
    var list = document.createElement("div");
    list.className = "cal-agenda";
    var start = calStartOfDay(calState.anchor), today = new Date(), any = false;
    for (var i = 0; i < 60; i++) {
      var day = calAddDays(start, i);
      var evs = calEventsOn(day);
      if (!evs.length) continue;
      any = true;
      var h = document.createElement("div");
      h.className = "cal-agenda-day" + (calSameDay(day, today) ? " today" : "");
      h.textContent = day.toLocaleDateString(calLocale(), { weekday: "long", day: "numeric", month: "long" });
      list.appendChild(h);
      evs.forEach(function (ev) {
        var row = document.createElement("div");
        row.className = "cal-agenda-item";
        var dot = document.createElement("span");
        dot.className = "cal-agenda-dot";
        dot.style.background = calColor(ev.color);
        var time = document.createElement("span");
        time.className = "cal-agenda-time";
        time.dir = "ltr";
        time.textContent = ev.allDay ? tr("calEvAllDay") : calHm(calEventStart(ev)) + "–" + calHm(calEventEnd(ev));
        var text = document.createElement("div");
        text.className = "cal-agenda-text";
        text.textContent = ev.title || tr("calNoTitle");
        if (ev.location) {
          var loc = document.createElement("div");
          loc.className = "cal-agenda-loc";
          loc.textContent = ev.location;
          text.appendChild(loc);
        }
        row.appendChild(dot);
        row.appendChild(time);
        row.appendChild(text);
        calBindEvent(row, ev);
        list.appendChild(row);
      });
    }
    if (!any) {
      var none = document.createElement("div");
      none.className = "cal-message";
      none.textContent = tr("calNoEvents");
      list.appendChild(none);
    }
    calBody.appendChild(list);
  }

  function calSetMode(mode) {
    calState.mode = mode;
    try { localStorage.setItem(CAL_MODE_KEY, mode); } catch (e) {}
    calLoadAndRender();
  }
  document.querySelectorAll("[data-cal-mode]").forEach(function (b) {
    b.addEventListener("click", function () { calSetMode(b.getAttribute("data-cal-mode")); });
  });
  function calShift(dir) {
    var a = calState.anchor;
    if (calState.mode === "month") calState.anchor = new Date(a.getFullYear(), a.getMonth() + dir, 1);
    else if (calState.mode === "week") calState.anchor = calAddDays(a, 7 * dir);
    else if (calState.mode === "day") calState.anchor = calAddDays(a, dir);
    else calState.anchor = calAddDays(a, 30 * dir);
    calLoadAndRender();
  }
  // RTL: the right-hand "›" goes back, the left-hand "‹" goes forward
  document.getElementById("calPrevBtn").addEventListener("click", function () { calShift(-1); });
  document.getElementById("calNextBtn").addEventListener("click", function () { calShift(1); });
  document.getElementById("calTodayBtn").addEventListener("click", function () {
    calState.anchor = new Date();
    calLoadAndRender();
  });
  // Swipe sideways to move between months/weeks/days, like the phone's calendar.
  (function () {
    var sx = 0, sy = 0;
    calBody.addEventListener("touchstart", function (e) { sx = e.touches[0].clientX; sy = e.touches[0].clientY; }, { passive: true });
    calBody.addEventListener("touchend", function (e) {
      var dx = e.changedTouches[0].clientX - sx, dy = e.changedTouches[0].clientY - sy;
      if (Math.abs(dx) > 60 && Math.abs(dx) > Math.abs(dy) * 1.5) {
        var rtl = document.documentElement.dir === "rtl";
        calShift((dx > 0) === rtl ? 1 : -1);
      }
    }, { passive: true });
  })();

  // ---- event editor ----
  var calEditing = null;
  var calEvOverlay = document.getElementById("calEventOverlay");
  var calEvTitle = document.getElementById("calEvTitle");
  var calEvAllDay = document.getElementById("calEvAllDay");
  var calEvStartDate = document.getElementById("calEvStartDate");
  var calEvStartTime = document.getElementById("calEvStartTime");
  var calEvEndDate = document.getElementById("calEvEndDate");
  var calEvEndTime = document.getElementById("calEvEndTime");
  var calEvRepeat = document.getElementById("calEvRepeat");
  var calEvReminder = document.getElementById("calEvReminder");
  var calEvCalendar = document.getElementById("calEvCalendar");
  var calEvLocation = document.getElementById("calEvLocation");
  var calEvDescription = document.getElementById("calEvDescription");
  var calEvDeleteBtn = document.getElementById("calEvDeleteBtn");
  var calEvSeriesNote = document.getElementById("calEvSeriesNote");

  function calSyncTimeInputs() {
    calEvStartTime.hidden = calEvAllDay.checked;
    calEvEndTime.hidden = calEvAllDay.checked;
  }
  calEvAllDay.addEventListener("change", calSyncTimeInputs);
  calEvStartDate.addEventListener("change", function () {
    if (calEvEndDate.value < calEvStartDate.value) calEvEndDate.value = calEvStartDate.value;
  });

  function calFillCalendarSelect(selectedId) {
    calEvCalendar.innerHTML = "";
    var writable = calState.calendars.filter(function (c) { return c.writable; });
    var last = null;
    try { last = localStorage.getItem(CAL_LAST_CALENDAR_KEY); } catch (e) {}
    writable.forEach(function (c) {
      var o = document.createElement("option");
      o.value = String(c.id);
      o.textContent = c.name + (c.account && c.account !== c.name ? " (" + c.account + ")" : "");
      calEvCalendar.appendChild(o);
    });
    var want = selectedId !== null && selectedId !== undefined ? String(selectedId) : last;
    if (want && writable.some(function (c) { return String(c.id) === want; })) calEvCalendar.value = want;
    else {
      var primary = writable.find(function (c) { return c.primary; });
      if (primary) calEvCalendar.value = String(primary.id);
    }
    return writable.length;
  }

  function calFillForm(v) {
    calEvTitle.value = v.title || "";
    calEvAllDay.checked = !!v.allDay;
    calEvStartDate.value = calYmd(v.start);
    calEvStartTime.value = calHm(v.start);
    calEvEndDate.value = calYmd(v.end);
    calEvEndTime.value = calHm(v.end);
    calEvRepeat.value = v.rrule ? (["FREQ=DAILY", "FREQ=WEEKLY", "FREQ=MONTHLY", "FREQ=YEARLY"].find(function (f) {
      return v.rrule.indexOf(f) === 0;
    }) || "") : "";
    calEvReminder.value = String(v.reminder === undefined ? -1 : v.reminder);
    if (!calEvReminder.value) calEvReminder.value = "-1";
    calEvLocation.value = v.location || "";
    calEvDescription.value = v.description || "";
    calSyncTimeInputs();
  }

  function calOpenEditor(ev, newStart) {
    if (!calFillCalendarSelect(ev ? ev.calendarId : null)) {
      alert(tr("calNoWritableCalendar"));
      return;
    }
    calEditing = ev ? { eventId: ev.eventId } : null;
    calEvDeleteBtn.hidden = !ev;
    calEvSeriesNote.hidden = !(ev && ev.rrule);
    // picking a task reminder: a one-time, timed slot - the task's own
    // ringing reminder does the alerting, so no calendar reminder either
    var picking = !ev && !!calState.pick;
    calEvAllDay.parentElement.hidden = picking;
    calEvRepeat.hidden = picking;
    calEvRepeat.previousElementSibling.hidden = picking;
    if (!ev) {
      var s = newStart || new Date();
      calFillForm({
        title: picking ? calState.pick.text : "",
        start: s,
        end: new Date(s.getTime() + 3600000),
        reminder: picking ? -1 : 10
      });
      calEvOverlay.hidden = false;
      calEvTitle.focus();
      return;
    }
    // the series' own start/end/reminder, not just this occurrence's
    calPlugin.getEvent({ eventId: ev.eventId }).then(function (full) {
      var allDay = !!full.allDay;
      var start = allDay ? calEventStart({ allDay: true, begin: full.dtstart }) : new Date(full.dtstart);
      var endMs = full.dtend || (full.dtstart + (full.durationMs || 3600000));
      var end = allDay ? calAddDays(calEventStart({ allDay: true, begin: endMs }), -1) : new Date(endMs);
      if (allDay && end < start) end = start;
      calFillForm({
        title: full.title, allDay: allDay, start: start, end: end, rrule: full.rrule,
        reminder: full.reminders && full.reminders.length ? full.reminders[0] : -1,
        location: full.location, description: full.description
      });
      calEvCalendar.value = String(full.calendarId);
      calEvOverlay.hidden = false;
    }, function () {
      // couldn't read the series itself: edit from this occurrence's data
      var start = calEventStart(ev);
      var end = ev.allDay ? calAddDays(calEventEnd(ev), -1) : calEventEnd(ev);
      calFillForm({
        title: ev.title, allDay: !!ev.allDay, start: start, end: end < start ? start : end,
        rrule: ev.rrule, reminder: -1, location: ev.location, description: ""
      });
      calEvOverlay.hidden = false;
    });
  }

  function calCloseEditor() {
    calEvOverlay.hidden = true;
    calEditing = null;
  }
  document.getElementById("calEvCancelBtn").addEventListener("click", calCloseEditor);
  calEvOverlay.addEventListener("click", function (e) { if (e.target === calEvOverlay) calCloseEditor(); });

  document.getElementById("calEventForm").addEventListener("submit", function (e) {
    e.preventDefault();
    if (!calEvStartDate.value || !calEvEndDate.value) return;
    var allDay = calEvAllDay.checked;
    var start, end;
    if (allDay) {
      var sd = calParseYmd(calEvStartDate.value), ed = calParseYmd(calEvEndDate.value);
      start = Date.UTC(sd.getFullYear(), sd.getMonth(), sd.getDate());
      end = Date.UTC(ed.getFullYear(), ed.getMonth(), ed.getDate() + 1);
    } else {
      start = new Date(calEvStartDate.value + "T" + (calEvStartTime.value || "09:00")).getTime();
      end = new Date(calEvEndDate.value + "T" + (calEvEndTime.value || "10:00")).getTime();
    }
    if (end <= start) { alert(tr("calEndBeforeStart")); return; }
    if (!calEditing && calState.pick && start <= Date.now()) { alert(tr("taskReminderPastMsg")); return; }
    var payload = {
      calendarId: Number(calEvCalendar.value),
      title: calEvTitle.value.trim(),
      allDay: allDay,
      start: start,
      end: end,
      rrule: calEvRepeat.value,
      reminderMinutes: Number(calEvReminder.value),
      location: calEvLocation.value.trim(),
      description: calEvDescription.value.trim()
    };
    if (calEditing) payload.eventId = calEditing.eventId;
    try { localStorage.setItem(CAL_LAST_CALENDAR_KEY, calEvCalendar.value); } catch (err) {}
    // picking a task's reminder: a new event, or an existing timed one the
    // user tapped instead - either way the task gets linked to it
    var pickingReminder = !!calState.pick && (!calEditing || (!allDay && start > Date.now()));
    calPlugin.saveEvent(payload).then(function (res) {
      calCloseEditor();
      if (pickingReminder) {
        calApplyPickedReminder(start, (res && res.eventId != null) ? res.eventId : payload.eventId, end);
        return;
      }
      showToast(tr("calSavedMsg"));
      if (payload.eventId != null && !allDay && start > Date.now()) calSyncTaskRemindersForEvent(payload.eventId, start, false, end);
      calLoadAndRender();
    }, function () { alert(tr("calSaveError")); });
  });

  calEvDeleteBtn.addEventListener("click", function () {
    if (!calEditing || !confirm(tr("calDeleteConfirm"))) return;
    var deletedId = calEditing.eventId;
    calPlugin.deleteEvent({ eventId: deletedId }).then(function () {
      calCloseEditor();
      calSyncTaskRemindersForEvent(deletedId, 0, true);
      showToast(tr("calDeletedMsg"));
      calLoadAndRender();
    }, function () { alert(tr("calSaveError")); });
  });

  // ---- which calendars to show ----
  var calCalendarsOverlay = document.getElementById("calCalendarsOverlay");
  document.getElementById("calCalendarsBtn").addEventListener("click", function () {
    var list = document.getElementById("calCalendarsList");
    list.innerHTML = "";
    if (!calState.calendars.length) {
      var none = document.createElement("p");
      none.className = "cal-form-note";
      none.textContent = tr("calNoCalendars");
      list.appendChild(none);
    }
    calState.calendars.forEach(function (c) {
      var row = document.createElement("label");
      row.className = "cal-cal-row";
      var cb = document.createElement("input");
      cb.type = "checkbox";
      cb.checked = !calState.hidden[String(c.id)];
      cb.addEventListener("change", function () {
        if (cb.checked) delete calState.hidden[String(c.id)];
        else calState.hidden[String(c.id)] = true;
        try { localStorage.setItem(CAL_HIDDEN_KEY, JSON.stringify(calState.hidden)); } catch (e) {}
      });
      var sw = document.createElement("span");
      sw.className = "cal-cal-swatch";
      sw.style.background = calColor(c.color);
      var name = document.createElement("span");
      name.className = "cal-cal-name";
      name.textContent = c.name;
      if (c.account) {
        var acc = document.createElement("div");
        acc.className = "cal-cal-account";
        acc.textContent = c.account;
        name.appendChild(acc);
      }
      row.appendChild(cb);
      row.appendChild(sw);
      row.appendChild(name);
      list.appendChild(row);
    });
    calCalendarsOverlay.hidden = false;
  });
  document.getElementById("calCalendarsDoneBtn").addEventListener("click", function () {
    calCalendarsOverlay.hidden = true;
    calLoadAndRender();
  });

