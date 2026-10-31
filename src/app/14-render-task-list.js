  // Ended sheets used to drop out of the tab bar entirely once the viewed
  // date passed their end date, which made an ended project's tab - and the
  // long-press "reactivate" action on it - permanently unreachable. Now the
  // archive view (toggled by viewingArchive) is a dedicated, always-reachable
  // way to get to them instead: normal browsing only ever shows active
  // (non-ended) sheets, and the archive view shows only ended ones, in the
  // exact same tab bar/task list.
  var viewingArchive = false;
  var lastActiveSheetIdBeforeArchive = null;
  // Tabs (and swiping between them) go in alphabetical order of the
  // project names, by the rules of the app's current language (numbers
  // in names compare as numbers: "פרויקט 2" before "פרויקט 10"); Head
  // Office's own tab stays first, and private projects come before shared
  // ones (they're two rows of tabs; swiping goes through both in turn).
  function compareSheetNames(a, b) {
    if (a.id === HEAD_OFFICE_SHEET_ID) return -1;
    if (b.id === HEAD_OFFICE_SHEET_ID) return 1;
    if (!!a.shared !== !!b.shared) return a.shared ? 1 : -1; // private row, then shared
    return String(a.name || "").localeCompare(String(b.name || ""), calLocale(), { numeric: true, sensitivity: "base" });
  }
  function visibleSheets() {
    return allSheets().filter(function (s) {
      if (s.id === HEAD_OFFICE_SHEET_ID) return isHeadOfficeMode && !viewingArchive;
      if (isHeadOfficeMode && !s.shared) return false;
      return !!s.ended === viewingArchive;
    }).sort(compareSheetNames);
  }
  // An ended project's task view is a record of how things stood the day it
  // ended - it's pinned to (and can never browse past) sheet.endedDate. Every
  // place that changes state.viewDate routes through clampViewDate so this
  // holds no matter how the date got changed (swipe, calendar, today button,
  // jumping to a task, a notification deep link, switching archived tabs...).
  function maxViewDateForSheet(sheet) {
    return (sheet && sheet.ended && sheet.endedDate) ? sheet.endedDate : null;
  }
  function clampViewDate(dateISO) {
    var max = maxViewDateForSheet(activeSheet());
    return (max && dateISO > max) ? max : dateISO;
  }
  function enterArchiveView() {
    if (viewingArchive) return;
    var endedSheets = allSheets().filter(function (s) { return s.ended; });
    if (!endedSheets.length) { showToast(tr("noArchivedProjectsMsg")); return; }
    lastActiveSheetIdBeforeArchive = data.activeSheetId;
    viewingArchive = true;
    data.activeSheetId = endedSheets[0].id;
    state.viewDate = endedSheets[0].endedDate || todayISO();
    state.viewMode = "tasks";
    state.showingCompleted = false;
    render();
  }
  function exitArchiveView() {
    if (!viewingArchive) return;
    viewingArchive = false;
    state.viewDate = todayISO();
    var activeSheets = allSheets().filter(function (s) { return !s.ended; });
    var restored = activeSheets.find(function (s) { return s.id === lastActiveSheetIdBeforeArchive; });
    data.activeSheetId = (restored || activeSheets[0] || {}).id || data.activeSheetId;
  }

  // Builds one sheet's tab element into the given bar - shared by both the
  // private and shared rows below, so a tab behaves identically (rename,
  // long-press action menu, marquee overflow scroll) regardless of which
  // row it's rendered into.
  function appendSheetTab(bar, sheet) {
    var tab = document.createElement("div");
    tab.className = "sheet-tab" + (sheet.id === data.activeSheetId ? " active" : "") + (sheet.ended ? " ended" : "");
    tab.dataset.sheetId = sheet.id;

    if (state.renamingSheetId === sheet.id) {
      var input = document.createElement("input");
      input.className = "rename-input";
      input.value = sheet.name;
      input.maxLength = 40;
      input.addEventListener("click", function (e) { e.stopPropagation(); });
      input.addEventListener("keydown", function (e) {
        if (e.key === "Enter") { commitRename(sheet.id, input.value); }
        if (e.key === "Escape") { state.renamingSheetId = null; render(); }
      });
      input.addEventListener("blur", function () { commitRename(sheet.id, input.value); });
      tab.appendChild(input);
      bar.appendChild(tab);
      input.focus();
      input.select();
      return;
    }

    var label = document.createElement("span");
    label.className = "sheet-tab-label";
    label.textContent = (sheet.shared ? "👥 " : "") + sheet.name;
    tab.appendChild(label);
    tab.title = sheet.id === data.activeSheetId ? tr("clickToRename") : sheet.name;

    if (sheet.shared) {
      var unreadCount = getUnreadCount(sheet);
      if (unreadCount > 0) {
        var unreadBadge = document.createElement("span");
        unreadBadge.className = "sheet-tab-unread-badge";
        unreadBadge.textContent = unreadCount > 99 ? "99+" : String(unreadCount);
        tab.appendChild(unreadBadge);
      }
    }

    // The "משרד ראשי" virtual tab has no name to rename and nothing to
    // move/share/delete via the long-press menu - a plain tap just selects
    // it, same as any other tab, with no rename or long-press wiring at all.
    var isHeadOfficeSheetTab = sheet.id === HEAD_OFFICE_SHEET_ID;

    var tabLongPressFired = false;
    tab.addEventListener("click", function () {
      if (tabLongPressFired) { tabLongPressFired = false; return; }
      if (isHeadOfficeSheetTab) {
        selectSheet(sheet.id);
      } else if (sheet.id === data.activeSheetId) {
        state.renamingSheetId = sheet.id;
        render();
      } else {
        selectSheet(sheet.id);
      }
    });
    if (!isHeadOfficeSheetTab) {
      tab.addEventListener("dblclick", function (e) {
        e.stopPropagation();
        data.activeSheetId = sheet.id;
        state.renamingSheetId = sheet.id;
        render();
      });

      var tabPressStartX = 0, tabPressStartY = 0;
      var startTabPress = function (e) {
        var point = e.touches ? e.touches[0] : e;
        tabPressStartX = point.clientX;
        tabPressStartY = point.clientY;
        tabLongPressFired = false;
        clearTimeout(longPressTimer);
        longPressTimer = setTimeout(function () {
          tabLongPressFired = true;
          openSheetActionModal(sheet.id);
        }, 1000);
      };
      var cancelTabPress = function () {
        clearTimeout(longPressTimer);
      };
      var moveTabPress = function (e) {
        var point = e.touches ? e.touches[0] : e;
        if (Math.abs(point.clientX - tabPressStartX) > 10 || Math.abs(point.clientY - tabPressStartY) > 10) {
          cancelTabPress();
        }
      };
      tab.addEventListener("mousedown", startTabPress);
      tab.addEventListener("mouseup", cancelTabPress);
      tab.addEventListener("mouseleave", cancelTabPress);
      tab.addEventListener("mousemove", moveTabPress);
      tab.addEventListener("touchstart", startTabPress, { passive: true });
      tab.addEventListener("touchend", cancelTabPress);
      tab.addEventListener("touchmove", moveTabPress, { passive: true });
    }

    bar.appendChild(tab);

    var tabStyle = getComputedStyle(tab);
    var availableWidth = tab.clientWidth - parseFloat(tabStyle.paddingLeft) - parseFloat(tabStyle.paddingRight);
    var overflowPx = label.scrollWidth - availableWidth;
    if (overflowPx > 2) {
      var gapPx = 24;
      var track = document.createElement("span");
      track.className = "marquee-track";
      tab.insertBefore(track, label);
      track.appendChild(label);
      var clone = label.cloneNode(true);
      clone.classList.add("sheet-tab-label-clone");
      clone.setAttribute("aria-hidden", "true");
      track.appendChild(clone);

      var segment = label.scrollWidth + gapPx;
      track.style.setProperty("--marquee-segment", segment + "px");
      track.style.animationDuration = Math.max(4, segment / 40) + "s";
    }
  }

  function appendAddBtn(bar, titleKey, onClick) {
    var addBtn = document.createElement("button");
    addBtn.className = "sheet-tab add-sheet-tab";
    addBtn.type = "button";
    addBtn.title = tr(titleKey);
    var addSheetBtnImg = document.createElement("img");
    addSheetBtnImg.src = "tasks-plus-icon.webp";
    addSheetBtnImg.alt = "+";
    addBtn.appendChild(addSheetBtnImg);
    addBtn.addEventListener("click", onClick);
    bar.appendChild(addBtn);
  }

  // The private and shared projects are rendered as two separate rows
  // (rather than one mixed, category-tagged row) so each stays a short,
  // easy-to-scan strip on its own - the row holding the currently active
  // tab is always the one closer to the task list below it (via flex
  // `order`), so switching between a private and a shared project visibly
  // swaps which row is "in front."
  function renderSheetsBar() {
    clearTimeout(longPressTimer);
    sheetsBarPrivate.innerHTML = "";
    sheetsBarShared.innerHTML = "";

    var privateSheets = visibleSheets().filter(function (s) { return !s.shared; });
    var sharedSheetsVisible = visibleSheets().filter(function (s) { return s.shared; });

    privateSheets.forEach(function (sheet) { appendSheetTab(sheetsBarPrivate, sheet); });
    if (!viewingArchive && !isHeadOfficeMode) appendAddBtn(sheetsBarPrivate, "addProjectTitle", function () { addSheet(); });

    sharedSheetsVisible.forEach(function (sheet) { appendSheetTab(sheetsBarShared, sheet); });
    if (!viewingArchive && !isHeadOfficeMode) appendAddBtn(sheetsBarShared, "addSharedProjectTitle", function () { openSharedProjectModal(); });

    var active = activeSheet();
    var activeIsShared = !!(active && active.shared);
    sheetsBarPrivate.style.order = activeIsShared ? "0" : "1";
    sheetsBarShared.style.order = activeIsShared ? "1" : "0";

    if (data.activeSheetId !== lastScrolledSheetId) {
      lastScrolledSheetId = data.activeSheetId;
      var visible = activeIsShared ? sharedSheetsVisible : privateSheets;
      var activeBar = activeIsShared ? sheetsBarShared : sheetsBarPrivate;
      var activeIndex = visible.findIndex(function (s) { return s.id === data.activeSheetId; });
      var anchorSheet = activeIndex > 0 ? visible[activeIndex - 1] : visible[activeIndex];
      if (anchorSheet) {
        var anchorTabEl = activeBar.querySelector('[data-sheet-id="' + anchorSheet.id + '"]');
        if (anchorTabEl) {
          anchorTabEl.scrollIntoView({ inline: "start", block: "nearest", behavior: "smooth" });
        }
      }
    }
  }

  function currentTimeHHMM() {
    var d = new Date();
    return String(d.getHours()).padStart(2, "0") + ":" + String(d.getMinutes()).padStart(2, "0");
  }

  var addTypeOverlay = document.getElementById("addTypeOverlay");
  var addTypeTaskBtn = document.getElementById("addTypeTaskBtn");
  var addTypeNoteBtn = document.getElementById("addTypeNoteBtn");
  var addTypeCancelBtn = document.getElementById("addTypeCancelBtn");
  var pendingNewTaskText = null;

  function closeAddTypeModal() {
    addTypeOverlay.hidden = true;
    pendingNewTaskText = null;
  }

  function addPendingTask(type) {
    if (!pendingNewTaskText) return;
    var newTask = {
      id: uid(),
      text: pendingNewTaskText,
      status: 0,
      urgent: false,
      type: type,
      date: state.viewDate,
      createdAt: Date.now()
    };
    if (type === "note") newTask.time = currentTimeHHMM();
    if (isHeadOfficeMode) newTask.isHeadOffice = true;
    var sheet = activeSheet();
    sheet.tasks.push(newTask);
    saveData();
    if (sheet.shared && type === "task") {
      sendChatSystemMessage(sheet.id, "added", newTask.text, myPhoneNumber);
    }
    taskInput.value = "";
    closeAddTypeModal();
    render();
    taskInput.focus();
  }

  addTypeTaskBtn.addEventListener("click", function () { addPendingTask("task"); });
  addTypeNoteBtn.addEventListener("click", function () { addPendingTask("note"); });
  addTypeCancelBtn.addEventListener("click", closeAddTypeModal);
  addTypeOverlay.addEventListener("click", function (e) {
    if (e.target === addTypeOverlay) closeAddTypeModal();
  });

  // A typed line is always a task; it becomes a note (מזכרת) from the
  // long-press menu ("הפוך למזכרת").
  addForm.addEventListener("submit", function (e) {
    e.preventDefault();
    var text = taskInput.value.trim();
    if (!text) return;
    pendingNewTaskText = text;
    addPendingTask("task");
  });

  function cycleStatus(id, inSheet) {
    var sheet = inSheet || activeSheet();
    var t = sheet.tasks.find(function (x) { return x.id === id; });
    if (t) {
      var wasDone = t.status === 2;
      t.status = (t.status + 1) % 3;
      if (t.planItemId) workPlanTaskStatusChanged(sheet, t);
      if (t.planRef) workPlanRefStatusChanged(t);
      saveData();
      if (sheet.shared && t.type === "task" && wasDone !== (t.status === 2)) {
        sendChatSystemMessage(sheet.id, t.status === 2 ? "done" : "undone", t.text, myPhoneNumber);
      }
      render();
      if (wasDone && t.status !== 2 && t.type === "task" && t.logEntry) {
        removeTaskFromSiteLogWorks(sheet, t);
      }
    }
  }

  function transferTaskToSiteLogWorks(sheet, task) {
    var log = findOrCreateSiteLog(sheet, task.date);
    var entry = { id: uid(), text: tr("taskDoneLogPrefix") + " " + task.text, attachment: null };
    log.works.push(entry);
    task.logEntry = { date: task.date, entryId: entry.id };
    saveData();
    showToast(tr("taskTransferredToLogMsg"));
  }

  // Undoes transferTaskToSiteLogWorks() above - marking the task not-done
  // again after it was auto-copied into the day's work log removes that
  // same log entry, rather than leaving a stale "בוצע ..." row behind for
  // work that (per the task itself) never actually got done.
  function removeTaskFromSiteLogWorks(sheet, task) {
    var log = findSiteLog(sheet, task.logEntry.date);
    if (log) {
      log.works = log.works.filter(function (w) { return w.id !== task.logEntry.entryId; });
    }
    task.logEntry = null;
    saveData();
    showToast(tr("taskRemovedFromLogMsg"));
  }

  function removeTask(id) {
    var sheet = activeSheet();
    var t = sheet.tasks.find(function (x) { return x.id === id; });
    sheet.tasks = sheet.tasks.filter(function (x) { return x.id !== id; });
    if (t && t.planItemId) workPlanTaskRemoved(sheet, t);
    saveData();
    if (sheet.shared && t && t.type === "task") {
      sendChatSystemMessage(sheet.id, "deleted", t.text, myPhoneNumber);
    }
    render();
  }

  function toggleUrgent(id) {
    var t = activeSheet().tasks.find(function (x) { return x.id === id; });
    if (t) {
      t.urgent = !t.urgent;
      saveData();
      render();
    }
  }

  function commitTaskText(id, value) {
    var t = activeSheet().tasks.find(function (x) { return x.id === id; });
    var trimmed = value.trim();
    if (t && trimmed) {
      t.text = trimmed.slice(0, 200);
      if (t.planItemId) workPlanTaskRenamed(activeSheet(), t);
    }
    state.editingTaskId = null;
    saveData();
    render();
  }

  var URGENT_CIRCLE_SVG = '<svg viewBox="0 0 11 11" xmlns="http://www.w3.org/2000/svg"><circle cx="5.5" cy="5.5" r="4" fill="none" stroke="currentColor" stroke-width="1.4"/></svg>';

  // Highlights whichever of the 4 footer icons the user is "inside" right
  // now. Checks state.viewMode directly (not the DOM's hidden attributes,
  // which this is called from render() before those get updated for the
  // current render - they'd still reflect the previous one). The
  // library's folder-detail screen is still a genuine full-screen overlay
  // that doesn't go through render(), so it calls this directly itself.
  function updateActiveFabHighlight() {
    [tasksFabBtn, calendarFabBtn, reportFabBtn, chatBtn, libraryBtn, archiveBtn].forEach(function (btn) {
      btn.classList.remove("fab-active");
    });
    var active;
    workPlanBtn.classList.remove("fab-active");
    if (!workPlanView.hidden) active = workPlanBtn;
    else if (state.viewMode === "chat") active = chatBtn;
    else if (state.viewMode === "library" || !libraryView.hidden) active = libraryBtn;
    else if (viewingArchive) active = archiveBtn;
    else if (state.viewMode === "reports") active = reportFabBtn;
    else if (state.viewMode === "diary") active = calendarFabBtn;
    else active = tasksFabBtn;
    active.classList.add("fab-active");
  }

  var chatWasActiveLastRender = false;
  function render() {
    appLoadingOverlay.hidden = true;
    syncWorkPlanTasks();
    clearTimeout(longPressTimer);
    if (chatWasActiveLastRender && state.viewMode !== "chat") teardownChatView();
    chatWasActiveLastRender = state.viewMode === "chat";
    if (isHeadOfficeMode) {
      ensureHeadOfficeSheet();
      syncHeadOfficeVirtualTasks();
      // Jump straight to the tasks page and the "משרד ראשי" tab every time
      // Head Office mode is ENTERED - on app launch already in that mode,
      // and again on every later toggle-on mid-session (not on every
      // render while already in it, which would keep yanking the user back
      // off whatever tab/screen they'd since navigated to).
      if (!wasHeadOfficeModeLastRender) {
        data.activeSheetId = HEAD_OFFICE_SHEET_ID;
        state.viewMode = "tasks";
      }
    }
    wasHeadOfficeModeLastRender = isHeadOfficeMode;
    var visibleForDate = visibleSheets();
    if (visibleForDate.length && data.activeSheetId !== pendingOpenChatSheetId &&
        !visibleForDate.some(function (s) { return s.id === data.activeSheetId; })) {
      data.activeSheetId = visibleForDate[0].id;
      if (visibleForDate[0].ended && visibleForDate[0].endedDate) state.viewDate = visibleForDate[0].endedDate;
    }
    renderSheetsBar();

    menuPanel.hidden = !state.menuOpen;
    menuBtn.setAttribute("aria-expanded", String(state.menuOpen));
    // Head Office mode trades the per-project diary/log icon and the
    // meetings-tours report icon for one icon that produces a report
    // combining every shared project at once (see officeReportsBtn below).
    calendarFabBtn.hidden = isHeadOfficeMode;
    officeReportsBtn.hidden = !isHeadOfficeMode;
    officeDataBtn.hidden = !isHeadOfficeMode;
    reportFabBtn.hidden = isHeadOfficeMode;

    var STATUS_LABEL = { 0: tr("statusPartial"), 1: tr("statusDone"), 2: tr("statusReset") };

    var today = todayISO();
    var isToday = state.viewDate === today;
    var isPast = state.viewDate < today;
    var isFuture = state.viewDate > today;
    var editable = !isPast;
    dateLabel.textContent = isoToFullDisplay(state.viewDate);
    dateInput.value = state.viewDate;
    var activeMaxDate = maxViewDateForSheet(activeSheet());
    if (activeMaxDate) dateInput.max = activeMaxDate;
    else dateInput.removeAttribute("max");
    todayBtn.hidden = isToday;
    sheetTitle.textContent = activeSheet().name;
    renderSheetTitleLogo();
    chatBtn.hidden = !activeSheet().shared;
    if (activeSheet().shared) {
      var activeUnread = getUnreadCount(activeSheet());
      chatFabBadge.hidden = activeUnread <= 0;
      chatFabBadge.textContent = activeUnread > 99 ? "99+" : String(activeUnread);
    } else {
      chatFabBadge.hidden = true;
    }

    updateActiveFabHighlight();

    var reportsMode = state.viewMode === "reports";
    var diaryMode = state.viewMode === "diary";
    var libraryMode = state.viewMode === "library";
    var chatMode = state.viewMode === "chat";
    taskList.hidden = reportsMode || diaryMode || libraryMode || chatMode;
    taskReminderIconsLayer.hidden = taskList.hidden;
    emptyState.hidden = reportsMode || diaryMode || libraryMode || chatMode;
    if (reportsMode || diaryMode || libraryMode || chatMode) emptyState.style.display = "none";
    sheetReportsList.hidden = !reportsMode;
    diaryView.hidden = !diaryMode;
    libraryFoldersView.hidden = !libraryMode;
    chatView.hidden = !chatMode;
    document.getElementById("sketchBtn").hidden = libraryMode; // no sketch icon in the library
    ruledBodyEl.classList.toggle("chat-mode", chatMode);
    if (reportsMode) {
      addForm.hidden = true;
      showCompletedTasksBtn.hidden = true;
      showActiveTasksBtn.hidden = true;
      renderSheetReportsList();
      return;
    }
    if (diaryMode) {
      addForm.hidden = true;
      showCompletedTasksBtn.hidden = true;
      showActiveTasksBtn.hidden = true;
      // Kept in sync here (not just on entry) so changing the date via the
      // normal top date controls/swipe while already in diary mode updates
      // which day's log the icons below point to, same as it always did.
      activeSiteLogDate = state.viewDate;
      updateSiteLogCloseShareButtons();
      updateBudgetTile();
      refreshOpenSiteLogViews();
      return;
    }
    if (libraryMode) {
      addForm.hidden = true;
      showCompletedTasksBtn.hidden = true;
      showActiveTasksBtn.hidden = true;
      // Kept in sync here (not just on entry) so switching project tabs
      // while already in library mode updates whose folders are shown,
      // same as diary mode does for the date above.
      activeLibrarySheetId = activeSheet().id;
      renderLibraryFolders();
      return;
    }
    if (chatMode) {
      addForm.hidden = true;
      showCompletedTasksBtn.hidden = true;
      showActiveTasksBtn.hidden = true;
      var chatSheet = activeSheet();
      // A sheet switch while chat is open can land on a non-shared
      // project, which has no chat at all - fall back to tasks mode for
      // it instead of showing an empty/broken chat screen.
      if (!chatSheet.shared) {
        state.viewMode = "tasks";
        render();
        return;
      }
      // Kept in sync here (not just on entry) so switching project tabs
      // while already in chat mode switches to that project's own chat,
      // same as diary/library do above for their own per-project state.
      if (activeChatSheetId !== chatSheet.id) {
        activeChatSheetId = chatSheet.id;
        chatForceScrollNext = true;
        markChatRead(chatSheet);
        markMessagesReadOnServer(chatSheet.id);
      }
      renderChatMessages();
      return;
    }
    // The "הזמנות רכש" virtual sheet has nothing addable - its tasks are
    // entirely system-generated notification entries (see
    // syncHeadOfficeVirtualTasks), never created by hand - but browsing
    // completed ones works the same as any other project.
    var isHeadOfficeVirtualSheet = activeSheet().id === HEAD_OFFICE_SHEET_ID;
    showCompletedTasksBtn.hidden = viewingArchive || state.showingCompleted;
    showActiveTasksBtn.hidden = viewingArchive || !state.showingCompleted;
    addForm.hidden = isPast || state.showingCompleted || isHeadOfficeVirtualSheet;

    // Browsing completed tasks shows every done task across every date in
    // this project at once (not just state.viewDate), so each row's own
    // date matters and nothing here is editable - same readonly treatment
    // a past date already gets, just reused via rowEditable instead of
    // editable so the normal per-date view's own editability is untouched.
    var sheetTasks, visible;
    if (state.showingCompleted) {
      sheetTasks = activeSheet().tasks.filter(function (t) { return t.status === 2; });
      visible = sheetTasks.slice().sort(function (a, b) {
        if (a.date !== b.date) return a.date < b.date ? 1 : -1;
        return a.createdAt - b.createdAt;
      });
    } else {
      sheetTasks = activeSheet().tasks.filter(function (t) { return t.date === state.viewDate; });
      visible = sheetTasks.slice().sort(function (a, b) {
        return a.createdAt - b.createdAt;
      });
    }
    var rowEditable = editable && !state.showingCompleted && !isHeadOfficeVirtualSheet;

    // Rebuilding the list via innerHTML resets its own scroll position to
    // the top - restoring it afterward (the browser clamps automatically
    // if the list got shorter) keeps a long, scrolled-down list from
    // jumping back up every time, e.g. after deleting one task near the
    // bottom.
    var taskListScrollTop = taskList.scrollTop;
    taskList.innerHTML = "";
    var reminderRowsForIconsLayer = [];
    var migratedCalendarReminders = false;
    visible.forEach(function (t) {
      var isNote = t.type === "note";
      var li = document.createElement("li");
      li.className = "task" + (t.status === 1 ? " partial" : "") + (t.status === 2 ? " done" : "") + (rowEditable ? "" : " readonly") + (t.isHeadOffice ? " head-office-task" : "") + (t.headOfficeVirtual ? " head-office-notification-task" : "");
      li.dataset.taskId = t.id;
      var longPressFired = false;
      if (rowEditable && state.editingTaskId !== t.id) {
        li.addEventListener("click", function () {
          if (longPressFired) { longPressFired = false; return; }
          if (isNote) return;
          cycleStatus(t.id);
        });

        var pressStartX = 0, pressStartY = 0;
        var startPress = function (e) {
          if (e.target.closest("input, button")) return;
          var point = e.touches ? e.touches[0] : e;
          pressStartX = point.clientX;
          pressStartY = point.clientY;
          longPressFired = false;
          clearTimeout(longPressTimer);
          longPressTimer = setTimeout(function () {
            longPressFired = true;
            openMoveTaskModal(t.id);
          }, 1000);
        };
        var cancelPress = function () {
          clearTimeout(longPressTimer);
        };
        var movePress = function (e) {
          var point = e.touches ? e.touches[0] : e;
          if (Math.abs(point.clientX - pressStartX) > 10 || Math.abs(point.clientY - pressStartY) > 10) {
            cancelPress();
          }
        };
        li.addEventListener("mousedown", startPress);
        li.addEventListener("mouseup", cancelPress);
        li.addEventListener("mouseleave", cancelPress);
        li.addEventListener("mousemove", movePress);
        li.addEventListener("touchstart", startPress, { passive: true });
        li.addEventListener("touchend", cancelPress);
        li.addEventListener("touchmove", movePress, { passive: true });
      } else if (t.headOfficeVirtual) {
        // Not editable (handled above via rowEditable=false for this whole
        // sheet) - tapping one of these notification rows instead jumps
        // straight to that specific project's procurement list for that
        // date, with the same purchased-marking circles as the regular
        // combined procurement report.
        li.addEventListener("click", function () {
          openHeadOfficeNotificationTarget(t);
        });
      }

      var check, dot, timeLabel;
      if (isNote) {
        timeLabel = document.createElement("span");
        timeLabel.className = "note-time";
        timeLabel.textContent = t.time || "";
      } else {
        check = document.createElement("span");
        check.className = "row-mark";
        check.setAttribute("aria-hidden", "true");
        check.title = STATUS_LABEL[t.status];
        check.innerHTML = rowMarkSvg(t.status);
        // A notification row in "משרד ראשי" isn't otherwise editable (no
        // text edit, no move, no delete - see rowEditable above), but the
        // status mark and urgent dot still work exactly like a normal task
        // row, independent of the row's own click (which jumps to that
        // project's procurement list instead of cycling status) - each
        // stops its click from bubbling up to the row.
        if (t.headOfficeVirtual) {
          check.addEventListener("click", function (e) {
            e.stopPropagation();
            cycleStatus(t.id);
          });
        }

        dot = document.createElement("span");
        dot.className = "urgent-toggle" + (t.urgent ? " urgent" : "");
        dot.title = t.urgent ? tr("unmarkUrgent") : tr("markUrgent");
        dot.innerHTML = t.urgent ? "" : URGENT_CIRCLE_SVG;
        if (rowEditable || t.headOfficeVirtual) {
          dot.addEventListener("click", function (e) {
            e.stopPropagation();
            toggleUrgent(t.id);
          });
        }
      }

      var textEl;
      if (rowEditable && state.editingTaskId === t.id) {
        textEl = document.createElement("input");
        textEl.type = "text";
        textEl.className = "task-text-input";
        textEl.value = t.text;
        textEl.maxLength = 200;
        var editResolved = false;
        textEl.addEventListener("click", function (e) { e.stopPropagation(); });
        textEl.addEventListener("keydown", function (e) {
          e.stopPropagation();
          if (e.key === "Enter") {
            editResolved = true;
            commitTaskText(t.id, textEl.value);
          }
          if (e.key === "Escape") {
            editResolved = true;
            state.editingTaskId = null;
            render();
          }
        });
        textEl.addEventListener("blur", function () {
          if (!editResolved) {
            editResolved = true;
            commitTaskText(t.id, textEl.value);
          }
        });
      } else {
        textEl = document.createElement("span");
        textEl.className = "task-text";
        textEl.title = t.text;
        if (t.planItemId || t.planRef) {
          // from the work plan
          var planBadge = document.createElement("img");
          planBadge.className = "task-plan-badge";
          planBadge.src = "tasks-work-plan-icon.webp";
          planBadge.alt = "";
          textEl.appendChild(planBadge);
        }
        var textLabel = document.createElement("span");
        textLabel.className = "task-text-label";
        textLabel.textContent = t.text;
        textEl.appendChild(textLabel);
        if (rowEditable) {
          textEl.addEventListener("click", function (e) {
            e.stopPropagation();
            state.editingTaskId = t.id;
            render();
          });
        } else if (t.headOfficeVirtual) {
          // Same tap-vs-long-press split as a normal row's long-press (just
          // scoped to the text, since the icon/dot above already have their
          // own clicks) - a quick tap still navigates to that project's
          // procurement list, a sustained press offers to delete this
          // notification instead.
          var textLongPressFired = false;
          var textPressStartX = 0, textPressStartY = 0;
          var startTextPress = function (e) {
            var point = e.touches ? e.touches[0] : e;
            textPressStartX = point.clientX;
            textPressStartY = point.clientY;
            textLongPressFired = false;
            clearTimeout(longPressTimer);
            longPressTimer = setTimeout(function () {
              textLongPressFired = true;
              askConfirm(tr("confirmDeleteTask").replace("{name}", t.text), function () {
                dismissHeadOfficeNotification(t.id);
              });
            }, 1000);
          };
          var cancelTextPress = function () { clearTimeout(longPressTimer); };
          var moveTextPress = function (e) {
            var point = e.touches ? e.touches[0] : e;
            if (Math.abs(point.clientX - textPressStartX) > 10 || Math.abs(point.clientY - textPressStartY) > 10) cancelTextPress();
          };
          textEl.addEventListener("mousedown", startTextPress);
          textEl.addEventListener("mouseup", cancelTextPress);
          textEl.addEventListener("mouseleave", cancelTextPress);
          textEl.addEventListener("mousemove", moveTextPress);
          textEl.addEventListener("touchstart", startTextPress, { passive: true });
          textEl.addEventListener("touchend", cancelTextPress);
          textEl.addEventListener("touchmove", moveTextPress, { passive: true });
          textEl.addEventListener("click", function (e) {
            e.stopPropagation();
            if (textLongPressFired) { textLongPressFired = false; return; }
            openHeadOfficeNotificationTarget(t);
          });
        }
      }

      var actions = document.createElement("span");
      actions.className = "task-actions";
      if (!rowEditable) actions.hidden = true;
      var delBtn = document.createElement("button");
      delBtn.innerHTML = "&#10005;";
      delBtn.title = tr("deleteBtn");
      delBtn.addEventListener("click", function (e) {
        e.stopPropagation();
        askConfirm(tr("confirmDeleteTask").replace("{name}", t.text), function () {
          removeTask(t.id);
        });
      });
      actions.appendChild(delBtn);

      var lead = document.createElement("span");
      lead.className = "row-lead";
      if (isNote) {
        lead.appendChild(timeLabel);
      } else {
        lead.appendChild(dot);
        lead.appendChild(check);
      }

      li.appendChild(lead);
      li.appendChild(textEl);
      if (t.status === 2 && t.date) {
        var dateBadge = document.createElement("span");
        dateBadge.className = "row-date";
        dateBadge.textContent = isoToDisplay(t.date);
        dateBadge.title = tr("completedOn") + isoToDisplay(t.date);
        li.appendChild(dateBadge);
      }
      li.appendChild(actions);
      taskList.appendChild(li);
      // done tasks keep their reminder (it comes back if un-marked) but it's paused
      // calendar-set reminders from before the split become links right
      // away, so the first render already shows the calendar icon
      if (migrateCalendarReminderToLink(t)) migratedCalendarReminders = true;
      var rowCalLink = calPlugin && isCalendarLinkShown(getMyCalendarLink(activeSheet(), t));
      var rowAlarm = isTaskReminderActive(t.reminder) && isMyTaskReminder(activeSheet(), t.reminder);
      if (t.status === 2) rowAlarm = false; // a done task's reminder is paused
      if (rowCalLink || rowAlarm) reminderRowsForIconsLayer.push({ task: t, editable: rowEditable, top: li.offsetTop, height: li.offsetHeight, calLink: rowCalLink, alarm: rowAlarm });

      if (!(rowEditable && state.editingTaskId === t.id)) {
        var textOverflowPx = textLabel.scrollWidth - textEl.clientWidth;
        if (textOverflowPx > 2) {
          var textGapPx = 32;
          var textTrack = document.createElement("span");
          textTrack.className = "marquee-track";
          textEl.insertBefore(textTrack, textLabel);
          textTrack.appendChild(textLabel);
          var textClone = textLabel.cloneNode(true);
          textClone.setAttribute("aria-hidden", "true");
          textTrack.appendChild(textClone);

          var textSegment = textLabel.scrollWidth + textGapPx;
          textTrack.style.setProperty("--marquee-segment", textSegment + "px");
          textTrack.style.animationDuration = Math.max(4, textSegment / 40) + "s";
        }
      }

      if (state.editingTaskId === t.id) {
        textEl.focus();
        textEl.select();
      }
    });
    taskList.scrollTop = taskListScrollTop;
    renderTaskReminderIconsLayer(reminderRowsForIconsLayer);
    if (migratedCalendarReminders) saveData();
    syncNativeTaskAlarms();
    processCalendarInvites();
    if (!dataLoadBlocked) calVerifyLinks(false);
    syncNativeWidget();
    refreshWorkPlanIfOpen();
    if (privateDataSettled) maybeShowWorkPlanLateToast();

    sheetTitle.textContent = activeSheet().name;
    renderSheetTitleLogo();

    if (state.showingCompleted) {
      emptyStateText.textContent = tr("emptyStateCompleted");
    } else {
      emptyStateText.textContent = isToday
        ? tr("emptyStateToday")
        : isFuture
          ? tr("emptyStateFuture")
          : tr("emptyStatePast");
    }
    emptyState.style.display = visible.length ? "none" : "block";

    if (state.highlightTaskId) {
      var highlightId = state.highlightTaskId;
      state.highlightTaskId = null;
      var targetLi = taskList.querySelector('[data-task-id="' + highlightId + '"]');
      if (targetLi) {
        targetLi.scrollIntoView({ behavior: "smooth", block: "center" });
        targetLi.classList.add("task-highlight");
        setTimeout(function () { targetLi.classList.remove("task-highlight"); }, 2200);
      }
    }
  }

  function showNavDebugToast(source, sheetId, date, taskId) {
    var el = document.getElementById("navDebugToast");
    if (!el) return;
    el.textContent = "DEBUG [" + source + "]: sheet=" + sheetId + " date=" + date + " task=" + taskId;
    el.style.display = "block";
    setTimeout(function () { el.style.display = "none"; }, 8000);
  }

  var pendingOpenChatSheetId = null;

  function tryOpenPendingChat() {
    if (!pendingOpenChatSheetId) return;
    var sheet = sharedSheets.find(function (s) { return s.id === pendingOpenChatSheetId; });
    if (sheet) {
      pendingOpenChatSheetId = null;
      openChatView();
    }
  }

  function navigateToTaskLink(sheetId, date, taskId, chat) {
    if (sheetId) data.activeSheetId = sheetId;
    if (date) state.viewDate = clampViewDate(date);
    if (taskId) state.highlightTaskId = taskId;
    if (chat && sheetId) {
      pendingOpenChatSheetId = sheetId;
      tryOpenPendingChat();
    }
  }

  function applyTaskLinkFromURL() {
    var params = new URLSearchParams(location.search);
    var sheetId = params.get("sheet");
    var date = params.get("date");
    var taskId = params.get("task");
    var chat = params.get("chat") === "1";
    var invite = params.get("invite") === "1";
    if (invite) checkPendingProjectInvites();
    if (!sheetId && !date && !taskId && !chat) return;
    showNavDebugToast("URL", sheetId, date, taskId);
    navigateToTaskLink(sheetId, date, taskId, chat);
    history.replaceState(null, "", location.pathname);
  }

  if ("serviceWorker" in navigator) {
    navigator.serviceWorker.addEventListener("message", function (event) {
      var msg = event.data || {};
      if (msg.type !== "navigate-task") return;
      showNavDebugToast("message", msg.sheetId, msg.date, msg.taskId);
      if (msg.projectInvite) checkPendingProjectInvites();
      navigateToTaskLink(msg.sheetId, msg.date, msg.taskId, msg.chat);
      render();
    });
  }

  // Native-app equivalent of the service-worker "navigate-task" message
  // above: tapping an FCM notification (app backgrounded/closed) fires this
  // instead of the SW message event, with the same custom fields under
  // notification.data (all values arrive as strings, same as the SW path).
  if (capacitorPushAvailable) {
    window.Capacitor.Plugins.FirebaseMessaging.addListener("notificationActionPerformed", function (event) {
      var data = (event.notification && event.notification.data) || {};
      if (data.projectInvite === "true" || data.projectInvite === true) checkPendingProjectInvites();
      navigateToTaskLink(data.sheetId, data.date, data.taskId, data.chat === "true" || data.chat === true);
      render();
    });
  }

  // Native-only changes (notification channels, launcher icon, plugins)
  // still need a new Play release, and Play's own background auto-update can
  // take a day or more to reach a phone. @capawesome/capacitor-app-update
  // asks Play directly whether a newer version exists and, if so, opens
  // Play's full-screen "update now" flow right inside the app. Checked on
  // launch and every time the app comes back to the foreground, so someone
  // who backs out of the prompt gets it again next time. Only does anything
  // in the Play-installed native app; the plugin is absent everywhere else.
  var capacitorAppUpdateAvailable = !!(
    window.Capacitor && window.Capacitor.isNativePlatform && window.Capacitor.isNativePlatform() &&
    window.Capacitor.Plugins && window.Capacitor.Plugins.AppUpdate
  );
  if (capacitorAppUpdateAvailable) {
    var appUpdateCheckRunning = false;
    var checkForNativeAppUpdate = function () {
      if (appUpdateCheckRunning) return;
      appUpdateCheckRunning = true;
      var AppUpdate = window.Capacitor.Plugins.AppUpdate;
      AppUpdate.getAppUpdateInfo().then(function (info) {
        // 2 = UPDATE_AVAILABLE, 3 = an update the user already started
        // (resume it rather than leaving it half-done)
        if ((info.updateAvailability === 2 && info.immediateUpdateAllowed) || info.updateAvailability === 3) {
          return AppUpdate.performImmediateUpdate();
        }
      }).catch(function () {}).then(function () {
        appUpdateCheckRunning = false;
      });
    };
    checkForNativeAppUpdate();
    document.addEventListener("visibilitychange", function () {
      if (document.visibilityState === "visible") checkForNativeAppUpdate();
    });
  }

