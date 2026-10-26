  // A one-shot "time" alarm is finished once it has rung: the server
  // removes it then, but this device's in-memory copy only learns that on
  // its next load, so it also expires locally shortly after fireAt - the
  // alarm icon disappears and the reminder option resets on time either way.
  // In the native app it stays until the ringing is turned off ("כבה",
  // reported back by the plugin), with an hour as the outer limit in case
  // it's never touched (snoozes in between keep it alive meanwhile).
  function isTaskReminderActive(reminder) {
    if (!reminder) return false;
    if (reminder.type !== "time") return true;
    if (reminder.firedAt) return false;
    var graceMs = nativeTaskAlarmPlugin ? 60 * 60000 : 60000;
    return !reminder.fireAt || Date.parse(reminder.fireAt) + graceMs > Date.now();
  }
  // A reminder on a SHARED project's task is synced to every member, but it
  // only rings for whoever set it: it carries their phone as "by". (Older
  // shared reminders without "by" never rang anywhere and still don't.)
  function isMyTaskReminder(sheet, reminder) {
    if (!reminder) return false;
    if (!sheet || !sheet.shared) return true;
    return !!myPhoneNumber && reminder.by === myPhoneNumber;
  }
  function nextOccurrenceOfTime(hhmm) {
    var parts = hhmm.split(":");
    var d = new Date();
    d.setHours(+parts[0], +parts[1], 0, 0);
    if (d.getTime() <= Date.now()) d.setDate(d.getDate() + 1);
    return d.toISOString();
  }
  // "כבה" on a ringing native alarm turns that reminder off for good: the
  // plugin queues the ids and this removes them from the data.
  function collectNativeAlarmsTurnedOff() {
    if (!nativeTaskAlarmPlugin || dataLoadBlocked || !privateDataSettled) return;
    nativeTaskAlarmPlugin.takeTurnedOffAlarms().then(function (res) {
      var ids = (res && res.ids) || [];
      if (!ids.length) return;
      var changed = false;
      allSheets().forEach(function (sheet) {
        (sheet.tasks || []).forEach(function (t) {
          var calLink = getMyCalendarLink(sheet, t);
          if (calLink && !calLink.firedAt && ids.indexOf(sheet.id + ":" + t.id + ":cal") !== -1) {
            calLink.firedAt = new Date().toISOString();
            changed = true;
          }
          if (t.reminder && ids.indexOf(sheet.id + ":" + t.id) !== -1) {
            delete t.reminder;
            changed = true;
          }
        });
      });
      if (changed) { saveData(); render(); }
    }).catch(function () {});
  }
  // A task's link to a phone-calendar event lives apart from its regular
  // reminder: task.calendarLink {eventId, eventAt, fireAt, firedAt, by?}
  // rings 15 minutes before the event and shows the calendar icon, while
  // task.reminder (every 30/60 minutes, "בחר שעה") shows the alarm clock.
  // Turning the reminder off leaves the link; "הסרה מלוח השנה" (or
  // deleting the event) removes the link. The link and its icon stay for
  // good otherwise, past events included (and on done tasks too).
  function isCalendarLinkShown(link) {
    return !!link && !!link.eventAt;
  }
  // On a SHARED project's task every member has their own link (their own
  // phone's event), in task.calendarLinks[phone]; a member who removed an
  // event they were invited to keeps a {removed: true} marker there so it
  // isn't added back. Private projects use the single task.calendarLink.
  // (A shared task's older single calendarLink {by} still counts for "by".)
  function getMyCalendarLink(sheet, t) {
    if (sheet && sheet.shared) {
      var mine = t.calendarLinks && myPhoneNumber ? t.calendarLinks[myPhoneNumber] : null;
      if (mine) return mine.removed ? null : mine;
      return t.calendarLink && isMyTaskReminder(sheet, t.calendarLink) ? t.calendarLink : null;
    }
    return t.calendarLink || null;
  }
  // Taking my link off a task: an event I was invited to leaves a
  // "removed" marker (so the invite doesn't add it back); for an event I
  // shared with others, the invite goes too, which takes it off their
  // phones as well.
  function removeMyCalendarLink(sheet, t, link) {
    var inv = t.calendarInvite;
    if (inv && inv.by === myPhoneNumber) delete t.calendarInvite;
    if (link && link.fromInvite) setMyCalendarLink(sheet, t, { removed: true, eventAt: link.eventAt });
    else setMyCalendarLink(sheet, t, null);
  }
  // My shared event moved: everyone I invited follows.
  function calMoveMyInvite(t, startMs, endAt) {
    var inv = t.calendarInvite;
    if (!inv || inv.by !== myPhoneNumber) return;
    inv.eventAt = new Date(startMs).toISOString();
    if (endAt) inv.endAt = endAt;
    inv.title = t.text;
  }
  function setMyCalendarLink(sheet, t, link) {
    if (sheet && sheet.shared) {
      if (t.calendarLink && isMyTaskReminder(sheet, t.calendarLink)) delete t.calendarLink;
      if (!myPhoneNumber) return;
      var links = Object.assign({}, t.calendarLinks);
      if (link) links[myPhoneNumber] = link; else delete links[myPhoneNumber];
      if (Object.keys(links).length) t.calendarLinks = links; else delete t.calendarLinks;
      return;
    }
    if (link) t.calendarLink = link; else delete t.calendarLink;
  }
  function isCalendarLinkAlarmDue(link) {
    if (!isCalendarLinkShown(link) || link.firedAt || !link.fireAt) return false;
    var graceMs = nativeTaskAlarmPlugin ? 60 * 60000 : 60000;
    return Date.parse(link.fireAt) + graceMs > Date.now();
  }
  // reminders set through the calendar before the split become links
  function migrateCalendarReminderToLink(t) {
    var r = t.reminder;
    if (!r || r.calendarEventId == null) return false;
    t.calendarLink = {
      eventId: r.calendarEventId,
      eventAt: r.eventAt || r.fireAt,
      fireAt: r.fireAt,
      firedAt: r.firedAt || null
    };
    if (r.by) t.calendarLink.by = r.by;
    delete t.reminder;
    return true;
  }
  function pruneFinishedTaskReminders() {
    collectNativeAlarmsTurnedOff();
    if (isEditingActively()) return;
    var changed = false;
    allSheets().forEach(function (sheet) {
      (sheet.tasks || []).forEach(function (t) {
        if (migrateCalendarReminderToLink(t)) changed = true;
        if (!t.reminder || t.reminder.type !== "time") return;
        if (!isTaskReminderActive(t.reminder)) {
          delete t.reminder;
          changed = true;
        } else if (!t.reminder.fireAt) {
          // set before fireAt existed - pin it to its next occurrence
          t.reminder.fireAt = nextOccurrenceOfTime(t.reminder.time);
          changed = true;
        }
      });
    });
    if (changed) { saveData(); render(); }
  }
  setInterval(pruneFinishedTaskReminders, 30000);

  // In the native app, per-task reminders ring as a real alarm clock: the
  // ItaskAlarm plugin (android-app/native-src) schedules them with Android's
  // AlarmManager and shows an insistent notification that keeps ringing
  // until "כבה"/"נודניק" is pressed - something a pushed FCM notification
  // can never do. This hands it the full current set on every render (it
  // replaces whatever was scheduled before), and flags each reminder
  // nativeAlarm so send-reminders stops also pushing it to native devices.
  // Private projects, plus the reminders this user set on shared projects'
  // tasks (isMyTaskReminder) - send-reminders itself only sees private ones.
  var nativeTaskAlarmPlugin = (
    window.Capacitor && window.Capacitor.isNativePlatform && window.Capacitor.isNativePlatform() &&
    window.Capacitor.Plugins && window.Capacitor.Plugins.ItaskAlarm
  ) || null;
  var lastNativeTaskAlarmsJson = null;
  function syncNativeTaskAlarms() {
    if (!nativeTaskAlarmPlugin || dataLoadBlocked || !privateDataSettled) return;
    var alarms = [];
    var flagged = false;
    allSheets().forEach(function (sheet) {
      if (sheet.ended) return;
      (sheet.tasks || []).forEach(function (t) {
        if (migrateCalendarReminderToLink(t)) flagged = true;
        var link = getMyCalendarLink(sheet, t);
        if (t.status !== 2 && isCalendarLinkAlarmDue(link)) {
          alarms.push({ id: sheet.id + ":" + t.id + ":cal", title: sheet.name, body: t.text, at: Date.parse(link.fireAt) });
        }
        var r = t.reminder;
        if (t.status === 2 || !isTaskReminderActive(r) || !isMyTaskReminder(sheet, r)) return;
        var entry = { id: sheet.id + ":" + t.id, title: sheet.name, body: t.text };
        if (r.type === "time" && r.fireAt) {
          entry.at = Date.parse(r.fireAt);
        } else if (r.type === "interval") {
          if (!r.startedAt) { r.startedAt = new Date().toISOString(); flagged = true; }
          entry.at = Date.parse(r.startedAt) + r.minutes * 60000;
          entry.repeatMinutes = r.minutes;
        } else {
          return;
        }
        if (!r.nativeAlarm) { r.nativeAlarm = true; flagged = true; }
        alarms.push(entry);
      });
    });
    if (flagged) saveData();
    alarms = alarms.concat(workPlanNativeAlarms());
    var json = JSON.stringify(alarms);
    if (json === lastNativeTaskAlarmsJson) return;
    lastNativeTaskAlarmsJson = json;
    nativeTaskAlarmPlugin.setAlarms({ alarms: alarms }).catch(function () { lastNativeTaskAlarmsJson = null; });
  }
  // Every open task (not done, not a note) of every live project, oldest
  // first - what the native home-screen widget shows.
  function openTasksByProject() {
    return allSheets().filter(function (sheet) {
      return !sheet.ended && sheet.id !== HEAD_OFFICE_SHEET_ID;
    }).map(function (sheet) {
      var tasks = (sheet.tasks || []).filter(function (t) {
        return t.type !== "note" && t.status !== 2 && !t.headOfficeVirtual && (t.text || "").trim();
      }).sort(function (a, b) {
        if (a.date !== b.date) return a.date < b.date ? -1 : 1;
        return (a.createdAt || 0) - (b.createdAt || 0);
      });
      return { sheet: sheet, tasks: tasks };
    });
  }

  // Native app: text shared into ITASK from another app (a WhatsApp
  // message...) arrives as view "share" with its text - see
  // openShareTaskModal. Tapping the home-screen widget starts the app with
  // "task|sheetId|date|taskId" (just the project when tapping its tab):
  // picked up at startup (takeLaunchView) or, when the app was already
  // running, through the "launchView" event, and opened like a tapped
  // notification. ("focus", from app versions before 15, just opens the app.)
  function openLaunchView(view, text) {
    if (view === "share") { openShareTaskModal(text); return; }
    if (view === "workplan") { openWorkPlan(); return; }
    if (view === "assistant" || view === "assistant-listen") { openAssistant(view === "assistant-listen"); return; }
    if (!view || view.indexOf("task|") !== 0) return;
    var parts = view.split("|");
    closeMoveTask();
    viewingArchive = false;
    state.showingCompleted = false;
    navigateToTaskLink(parts[1] || null, parts[2] || null, parts[3] || null, false);
    render();
  }
  var launchViewChecked = false;
  function checkLaunchView() {
    if (launchViewChecked || !nativeTaskAlarmPlugin) return;
    launchViewChecked = true;
    nativeTaskAlarmPlugin.takeLaunchView().then(function (res) {
      if (res) openLaunchView(res.view, res.text);
    }).catch(function () {});
    nativeTaskAlarmPlugin.addListener("launchView", function (e) {
      if (e) openLaunchView(e.view, e.text);
      nativeTaskAlarmPlugin.takeLaunchView().catch(function () {});
    });
  }

  // Hands the home-screen widget the open-tasks list (it can't read
  // Supabase itself), whenever it changes.
  var lastNativeWidgetJson = null;
  function syncNativeWidget() {
    if (!nativeTaskAlarmPlugin || dataLoadBlocked || !privateDataSettled) return;
    checkLaunchView();
    var projects = openTasksByProject().map(function (group) {
      return {
        id: group.sheet.id,
        name: group.sheet.name,
        shared: !!group.sheet.shared,
        tasks: group.tasks.map(function (t) {
          return { id: t.id, date: t.date, text: t.text, status: t.status || 0 };
        })
      };
    });
    var json = JSON.stringify(projects);
    if (json === lastNativeWidgetJson) return;
    lastNativeWidgetJson = json;
    nativeTaskAlarmPlugin.setWidgetData({
      projects: projects,
      title: tr("focusViewTitle"),
      emptyText: tr("focusViewEmpty")
    }).catch(function () { lastNativeWidgetJson = null; });
  }

