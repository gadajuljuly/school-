  // ---------------------------------------------------------------------
  // Shared text (e.g. a WhatsApp message via Android's share sheet) ->
  // a new task: ItaskAlarmPlugin hands it over as launch view "share".
  // ---------------------------------------------------------------------
  var shareTaskOverlay = document.getElementById("shareTaskOverlay");
  var shareTaskText = document.getElementById("shareTaskText");
  var shareTaskProject = document.getElementById("shareTaskProject");
  var shareTaskDate = document.getElementById("shareTaskDate");
  function openShareTaskModal(text) {
    closeMoveTask();
    shareTaskText.value = (text || "").trim();
    shareTaskProject.innerHTML = "";
    allSheets().filter(function (s) {
      return !s.ended && s.id !== HEAD_OFFICE_SHEET_ID;
    }).forEach(function (s) {
      var o = document.createElement("option");
      o.value = s.id;
      o.textContent = (s.shared ? "👥 " : "") + s.name;
      shareTaskProject.appendChild(o);
    });
    if (allSheets().some(function (s) { return s.id === data.activeSheetId && !s.ended; })) {
      shareTaskProject.value = data.activeSheetId;
    }
    shareTaskDate.value = todayISO();
    shareTaskOverlay.hidden = false;
  }
  document.getElementById("shareTaskCancelBtn").addEventListener("click", function () {
    shareTaskOverlay.hidden = true;
  });
  document.getElementById("shareTaskForm").addEventListener("submit", function (e) {
    e.preventDefault();
    var text = shareTaskText.value.replace(/\s*\n\s*/g, " ").trim();
    var sheet = allSheets().find(function (s) { return s.id === shareTaskProject.value; });
    if (!text || !sheet) return;
    var date = shareTaskDate.value || todayISO();
    sheet.tasks.push({
      id: uid(),
      text: text,
      status: 0,
      urgent: false,
      type: "task",
      date: date,
      createdAt: Date.now()
    });
    shareTaskOverlay.hidden = true;
    viewingArchive = false;
    state.viewMode = "tasks";
    state.showingCompleted = false;
    data.activeSheetId = sheet.id;
    state.viewDate = clampViewDate(date);
    saveData();
    render();
    showToast(tr("shareTaskAddedMsg"));
  });

  // Android 12+ only rings an alarm on the exact minute with the user's
  // "Alarms & reminders" permission; without it alarms can drift by minutes.
  function ensureExactAlarmPermission() {
    if (!nativeTaskAlarmPlugin) return;
    nativeTaskAlarmPlugin.canScheduleExact().then(function (res) {
      if (res && res.value === false && confirm(tr("exactAlarmPermissionPrompt"))) {
        nativeTaskAlarmPlugin.openExactAlarmSettings();
      }
    }).catch(function () {});
  }
  document.addEventListener("visibilitychange", function () {
    if (document.visibilityState === "visible") pruneFinishedTaskReminders();
  });

  function describeTaskReminder(reminder) {
    if (!isTaskReminderActive(reminder)) return "";
    if (reminder.type === "interval") {
      return reminder.minutes === 30 ? tr("taskReminderActiveEvery30") : tr("taskReminderActiveEveryHour");
    }
    if (reminder.date) {
      return tr("taskReminderActiveOnDate") + isoToDisplay(reminder.date) + " " + tr("taskReminderAtTimeWord") + reminder.time;
    }
    return tr("taskReminderActiveAt") + reminder.time;
  }

  // The reminder-alarm icons live in their own layer, a sibling of
  // #taskList rather than a child of any one row - #taskList's own
  // overflow-y:auto also clips overflow-x (a plain CSS limitation, not a
  // choice), so an icon placed inside it can never bleed further left
  // than the list's own box, no matter how it's positioned. Sitting
  // outside it instead lets the icons reach all the way to the page's
  // own left edge. The tradeoff: since the layer doesn't scroll on its
  // own, every row's vertical position and the list's live scroll offset
  // both have to be tracked here by hand instead of coming for free.
  function syncTaskReminderIconsLayerBounds() {
    taskReminderIconsLayer.style.top = taskList.offsetTop + "px";
    taskReminderIconsLayer.style.height = taskList.offsetHeight + "px";
  }
  function applyTaskReminderIconsScroll() {
    taskReminderIconsLayer.style.transform = "translateY(" + (-taskList.scrollTop) + "px)";
  }
  taskList.addEventListener("scroll", applyTaskReminderIconsScroll);
  window.addEventListener("resize", syncTaskReminderIconsLayerBounds);

  function renderTaskReminderIconsLayer(entries) {
    syncTaskReminderIconsLayerBounds();
    taskReminderIconsLayer.innerHTML = "";
    entries.forEach(function (entry) {
      var both = entry.calLink && entry.alarm;
      if (entry.calLink) {
        // linked to a calendar event: a calendar icon with the event's day;
        // tapping it opens that event in the calendar
        var link = entry.task.calendarLink;
        var cal = document.createElement("span");
        cal.className = "task-reminder-indicator" + (both ? " is-pair-cal" : "");
        cal.style.top = (entry.top + entry.height / 2) + "px";
        cal.innerHTML = '<span class="cal-live-icon"><img src="tasks-calendar-app-icon-blank.webp" alt="">' +
          '<span class="cal-live-wd"></span><span class="cal-live-day"></span></span>';
        var liveIcon = cal.querySelector(".cal-live-icon");
        liveIcon.dataset.at = link.eventAt;
        var at = new Date(link.eventAt);
        liveIcon.querySelector(".cal-live-wd").textContent = at.toLocaleDateString(calLocale(), { weekday: "short" });
        liveIcon.querySelector(".cal-live-day").textContent = at.getDate();
        cal.addEventListener("click", function (e) {
          e.stopPropagation();
          openTaskCalendarEvent(link);
        });
        taskReminderIconsLayer.appendChild(cal);
      }
      if (entry.alarm) {
        var icon = document.createElement("span");
        icon.className = "task-reminder-indicator" + (both ? " is-pair-alarm" : "");
        icon.style.top = (entry.top + entry.height / 2) + "px";
        icon.title = describeTaskReminder(entry.task.reminder);
        icon.innerHTML = '<img src="tasks-reminder-icon.webp" alt="">';
        if (entry.editable) {
          icon.addEventListener("click", function (e) {
            e.stopPropagation();
            pendingMoveTaskId = entry.task.id;
            openTaskReminderModal();
          });
        }
        taskReminderIconsLayer.appendChild(icon);
      }
    });
    applyTaskReminderIconsScroll();
  }

  function openTaskReminderModal() {
    var task = activeSheet().tasks.find(function (t) { return t.id === pendingMoveTaskId; });
    moveTaskOverlay.hidden = true;
    taskReminderTimeRow.hidden = true;
    var currentTimeReminder = (task && isTaskReminderActive(task.reminder) && task.reminder.type === "time") ? task.reminder : null;
    var nextHour = new Date(Date.now() + 3600000);
    taskReminderTimeInput.value = currentTimeReminder ? currentTimeReminder.time :
      ("0" + nextHour.getHours()).slice(-2) + ":00";
    taskReminderDateInput.value = (currentTimeReminder && currentTimeReminder.date) ||
      (currentTimeReminder ? todayISO() : calYmd(nextHour));
    taskReminderDateInput.min = todayISO();
    var statusText = task ? describeTaskReminder(task.reminder) : "";
    taskReminderCurrentStatus.hidden = !statusText;
    taskReminderCurrentStatus.textContent = statusText;
    taskReminderOffBtn.hidden = !task || !isTaskReminderActive(task.reminder);
    taskReminderOverlay.hidden = false;
  }

  function setTaskReminder(reminder) {
    var task = activeSheet().tasks.find(function (t) { return t.id === pendingMoveTaskId; });
    if (!task) { closeMoveTask(); return; }
    if (!reminder) {
      delete task.reminder;
      saveData();
      closeMoveTask();
      showToast(tr("taskReminderOffMsg"));
      render();
      return;
    }
    // The native app rings reminders itself (ItaskAlarm), so push being
    // unavailable there (FCM registration failing...) mustn't block them.
    var ready = nativeTaskAlarmPlugin
      ? Promise.resolve(true).then(function (ok) { ensurePushReadyForTaskReminder(); return ok; })
      : ensurePushReadyForTaskReminder();
    ready.then(function (ok) {
      if (!ok) {
        alert(tr("taskReminderNotSupportedMsg"));
        return;
      }
      if (activeSheet().shared) reminder.by = myPhoneNumber;
      task.reminder = reminder;
      saveData();
      closeMoveTask();
      showToast(tr("taskReminderSetMsg"));
      render();
      ensureExactAlarmPermission();
    });
  }

  taskReminderBtn.addEventListener("click", openTaskReminderModal);
  taskReminderEvery30Btn.addEventListener("click", function () {
    setTaskReminder({ type: "interval", minutes: 30, startedAt: new Date().toISOString(), lastSentAt: null });
  });
  taskReminderEvery60Btn.addEventListener("click", function () {
    setTaskReminder({ type: "interval", minutes: 60, startedAt: new Date().toISOString(), lastSentAt: null });
  });
  // Task long-press -> calendar-with-arrow button: pick the reminder's
  // moment straight on the calendar (the התראה button keeps the every
  // 30/60 minutes choice).
  // "הסרה מלוח השנה": deletes the linked event from the phone's calendar
  // and the link (calendar icon + its 15-minutes-before ring) from the
  // task; a regular reminder on it stays.
  removeFromCalendarBtn.addEventListener("click", function () {
    var task = activeSheet().tasks.find(function (t) { return t.id === pendingMoveTaskId; });
    closeMoveTask();
    if (!task || !task.calendarLink || !confirm(tr("removeFromCalendarConfirm"))) return;
    var eventId = task.calendarLink.eventId;
    delete task.calendarLink;
    saveData();
    render();
    if (calPlugin && eventId != null) calPlugin.deleteEvent({ eventId: eventId }).catch(function () {});
    showToast(tr("removeFromCalendarMsg"));
  });
  taskCalendarReminderBtn.addEventListener("click", function () {
    var sheet = activeSheet();
    var task = sheet.tasks.find(function (t) { return t.id === pendingMoveTaskId; });
    closeMoveTask();
    openCalendarForTaskReminder(sheet.id, task);
  });
  // "שעה מסוימת": a date + time for the reminder without putting it in the
  // phone's calendar (the menu's calendar button does that).
  taskReminderTimeToggleBtn.addEventListener("click", function () {
    taskReminderTimeRow.hidden = !taskReminderTimeRow.hidden;
    if (!taskReminderTimeRow.hidden) taskReminderTimeInput.focus();
  });
  taskReminderTimeConfirmBtn.addEventListener("click", function () {
    if (!taskReminderTimeInput.value || !taskReminderDateInput.value) return;
    var time = taskReminderTimeInput.value;
    var date = taskReminderDateInput.value;
    var fireAtDate = new Date(date + "T" + time);
    if (isNaN(fireAtDate.getTime()) || fireAtDate.getTime() <= Date.now()) {
      showToast(tr("taskReminderPastMsg"));
      return;
    }
    setTaskReminder({ type: "time", date: date, time: time, fireAt: fireAtDate.toISOString(), firedAt: null });
  });
  taskReminderOffBtn.addEventListener("click", function () { setTaskReminder(null); });
  taskReminderCancelBtn.addEventListener("click", closeMoveTask);
  taskReminderOverlay.addEventListener("click", function (e) {
    if (e.target === taskReminderOverlay) closeMoveTask();
  });

  convertToNoteBtn.addEventListener("click", function () {
    var task = activeSheet().tasks.find(function (t) { return t.id === pendingMoveTaskId; });
    if (task) {
      task.type = "note";
      task.time = currentTimeHHMM();
      saveData();
    }
    closeMoveTask();
    render();
  });
  convertToTaskBtn.addEventListener("click", function () {
    var task = activeSheet().tasks.find(function (t) { return t.id === pendingMoveTaskId; });
    if (task) {
      task.type = "task";
      delete task.time;
      saveData();
    }
    closeMoveTask();
    render();
  });
  transferToLogBtn.addEventListener("click", function () {
    var sheet = activeSheet();
    var task = sheet.tasks.find(function (t) { return t.id === pendingMoveTaskId; });
    if (task) transferTaskToSiteLogWorks(sheet, task);
    closeMoveTask();
  });
  removeFromLogBtn.addEventListener("click", function () {
    var sheet = activeSheet();
    var task = sheet.tasks.find(function (t) { return t.id === pendingMoveTaskId; });
    if (task) removeTaskFromSiteLogWorks(sheet, task);
    closeMoveTask();
  });
  moveTaskCancelBtn.addEventListener("click", closeMoveTask);
  moveTaskOverlay.addEventListener("click", function (e) {
    if (e.target === moveTaskOverlay) closeMoveTask();
  });
  moveTaskProjectsCancelBtn.addEventListener("click", closeMoveTask);
  moveTaskProjectsOverlay.addEventListener("click", function (e) {
    if (e.target === moveTaskProjectsOverlay) closeMoveTask();
  });

  function isoToFullDisplay(iso) {
    var parts = iso.split("-");
    return parts[2] + "/" + parts[1] + "/" + parts[0];
  }
  // "/" in a filename is a path separator, not punctuation - browsers and
  // the OS silently drop everything before the last one (a share/download
  // named "... 23/09/2026.pdf" becomes just "2026.pdf"). Use this instead
  // of isoToFullDisplay/isoToDisplay anywhere a date is part of a file name.
  function isoToFileNameDate(iso) {
    var parts = iso.split("-");
    return parts[2] + "-" + parts[1] + "-" + parts[0];
  }

  var dateInput = document.getElementById("dateInput");
  var todayBtn = document.getElementById("todayBtn");

  dateInput.addEventListener("change", function () {
    if (!dateInput.value) return;
    state.viewDate = clampViewDate(dateInput.value);
    render();
  });
  todayBtn.addEventListener("click", function () {
    state.viewDate = clampViewDate(todayISO());
    render();
  });

  showCompletedTasksBtn.addEventListener("click", function () {
    state.showingCompleted = true;
    render();
  });
  showActiveTasksBtn.addEventListener("click", function () {
    state.showingCompleted = false;
    render();
  });

  function switchSheetBySwipe(direction) {
    var visible = visibleSheets();
    var idx = visible.findIndex(function (s) { return s.id === data.activeSheetId; });
    if (idx === -1) return;
    var newIdx = idx + direction;
    if (newIdx < 0 || newIdx >= visible.length) return;
    selectSheet(visible[newIdx].id);
  }

  (function setupSwipeGestures() {
    var notebookEl = document.querySelector(".notebook");
    if (!notebookEl) return;
    var startX = 0, startY = 0, startTime = 0, tracking = false, zone = null;

    notebookEl.addEventListener("touchstart", function (e) {
      var target = e.target;
      if (state.menuOpen || state.searchOpen || e.touches.length !== 1 ||
          target.closest(".sheets-bar") || target.closest(".menu-panel") ||
          target.closest(".search-panel") || target.closest("input") || target.closest("textarea")) {
        tracking = false;
        return;
      }
      if (target.closest(".notebook-head")) {
        zone = "date";
      } else if (target.closest(".ruled-body")) {
        zone = "sheet";
      } else {
        tracking = false;
        return;
      }
      tracking = true;
      startX = e.touches[0].clientX;
      startY = e.touches[0].clientY;
      startTime = Date.now();
    }, { passive: true });

    notebookEl.addEventListener("touchend", function (e) {
      if (!tracking) return;
      tracking = false;
      var touch = e.changedTouches[0];
      var dx = touch.clientX - startX;
      var dy = touch.clientY - startY;
      var elapsed = Date.now() - startTime;
      if (elapsed < 800 && Math.abs(dx) > 60 && Math.abs(dx) > Math.abs(dy) * 1.5) {
        if (zone === "date") {
          var swipedDate = clampViewDate(addDaysToISO(state.viewDate, dx < 0 ? -1 : 1));
          // A diary log is a record of a day that already happened - never
          // let swiping push it into the future (matches the old dedicated
          // site-log swipe's own guard, now merged into this one handler).
          if (state.viewMode === "diary" && swipedDate > todayISO()) return;
          state.viewDate = swipedDate;
          render();
        } else if (zone === "sheet") {
          switchSheetBySwipe(dx < 0 ? -1 : 1);
        }
      }
    }, { passive: true });
  })();

  (function setupSheetsBarResize() {
    var resizeTimer = null;
    window.addEventListener("resize", function () {
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(function () {
        if (state.renamingSheetId === null) renderSheetsBar();
      }, 200);
    });
  })();

