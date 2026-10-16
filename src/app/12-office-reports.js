  // Every active shared project this account can act on - its own real
  // memberships plus (full read/write, via office_groups.sql) any project
  // whose member is in a group this account created or is the named Head
  // Office of, already unified in sharedSheets by loadSharedSheets().
  function officeReportSheets() {
    return sharedSheets.filter(function (s) { return !s.ended; });
  }

  // Creates the "משרד ראשי" private sheet on first entry into Head Office
  // mode (and finds it again on every later call) - a plain entry in
  // data.sheets like any other private project, so it rides the app's
  // normal tab/select/save machinery for free; only its tasks are special
  // (system-generated, read-only - see syncHeadOfficeVirtualTasks below).
  function ensureHeadOfficeSheet() {
    if (!isHeadOfficeMode) return null;
    var sheet = data.sheets.find(function (s) { return s.id === HEAD_OFFICE_SHEET_ID; });
    if (!sheet) {
      sheet = { id: HEAD_OFFICE_SHEET_ID, name: tr("headOfficeMainProjectName"), tasks: [], reports: [], files: [] };
      data.sheets.unshift(sheet);
      saveData();
    } else if (sheet.name !== tr("headOfficeMainProjectName")) {
      // Not user-renamable (see appendSheetTab's isHeadOfficeSheetTab guard)
      // - its name is always whatever this key currently says, so renaming
      // it here (or switching language) takes effect on a sheet created
      // under an older name too, not just a freshly created one.
      sheet.name = tr("headOfficeMainProjectName");
      saveData();
    }
    return sheet;
  }

  // Every watched project's "שגר" (send) button on its procurement log
  // writes procurementSentDate directly onto that log (markSiteLogReportSent,
  // see siteLogProcurementOrderBtn above) - already readable here through
  // the normal sharedSheets sync/Realtime path, with no extra plumbing. One
  // virtual, non-editable task per project+date that's been sent, scanned
  // and (re)built on every render() while in Head Office mode, so a new one
  // shows up as soon as sharedSheets itself refreshes.
  function syncHeadOfficeVirtualTasks() {
    var sheet = ensureHeadOfficeSheet();
    if (!sheet) return;
    var dismissed = sheet.dismissedHeadOfficeIds || [];
    var seenIds = {};
    var changed = false;
    // A new notification is dated today (not the order's own date) so it
    // shows up right away regardless of when it was actually sent - once
    // created, the existing daily rollover (rollSheetsForward) carries it
    // forward exactly like any other open task, same as every other
    // project, and leaves it be the moment it's marked done, so it only
    // drops off the day after that. targetDate (used to jump to the right
    // project's procurement list) stays the order's own date throughout.
    var today = todayISO();
    officeReportSheets().forEach(function (s) {
      (s.siteLogs || []).forEach(function (log) {
        if (!log.procurementSentDate) return;
        var taskId = "ho-proc-" + s.id + "-" + log.date;
        if (dismissed.indexOf(taskId) !== -1) return;
        seenIds[taskId] = true;
        if (!sheet.tasks.some(function (t) { return t.id === taskId; })) {
          sheet.tasks.push({
            id: taskId,
            text: tr("headOfficeProcurementTaskPrefix") + " " + s.name + " " + isoToFullDisplay(log.date),
            status: 0,
            urgent: false,
            type: "task",
            date: today,
            createdAt: Date.now(),
            headOfficeVirtual: true,
            targetSheetId: s.id,
            targetDate: log.date
          });
          changed = true;
        }
      });
    });
    var before = sheet.tasks.length;
    sheet.tasks = sheet.tasks.filter(function (t) { return !t.headOfficeVirtual || seenIds[t.id]; });
    if (sheet.tasks.length !== before) changed = true;
    if (changed) saveData();
  }

  // Long-pressing a notification's text (see the render() task-row loop)
  // deletes it - remembered in dismissedHeadOfficeIds so the next sync
  // pass above doesn't just recreate the exact same notification from the
  // still-set procurementSentDate it was generated from.
  function dismissHeadOfficeNotification(taskId) {
    var sheet = ensureHeadOfficeSheet();
    if (!sheet) return;
    sheet.tasks = sheet.tasks.filter(function (t) { return t.id !== taskId; });
    if (!sheet.dismissedHeadOfficeIds) sheet.dismissedHeadOfficeIds = [];
    if (sheet.dismissedHeadOfficeIds.indexOf(taskId) === -1) sheet.dismissedHeadOfficeIds.push(taskId);
    saveData();
    render();
  }

  // The date the combined report screens are currently showing - defaults
  // to today, but browsable to any earlier date via the same date-label/
  // calendar-input/"today" button pattern as the main tasks page's own
  // date controls (see renderOfficeReportDateControls below).
  var officeReportViewDate = todayISO();

  // Only a project whose "Send report" button (markSiteLogReportSent above)
  // was clicked for this category on the selected date is included - a
  // project that's never sent (or only sent on a different day) is left out
  // entirely rather than shown with an empty table, so the combined report
  // reflects what was actually submitted that day, not just whatever
  // happens to be sitting half-filled in some project's draft log.
  function buildOfficeCombinedReportElement(kind, dateOverride) {
    var wrap = document.createElement("div");
    wrap.dir = RTL_LANGS[currentLang] ? "rtl" : "ltr";
    var dateISO = dateOverride || officeReportViewDate;
    var sectionCount = 0;
    officeReportSheets().forEach(function (sheet) {
      var log = findSiteLog(sheet, dateISO);
      if (!log || log[kind.sentField] !== dateISO) return;
      var section = document.createElement("div");
      section.className = "pdf-doc" + (sectionCount > 0 ? " pdf-doc-periodic-section" : "");
      section.appendChild(buildPdfDocTitleElement(sheet, sheet.name));
      var categoryTitle = document.createElement("div");
      categoryTitle.className = "pdf-doc-info-title";
      categoryTitle.textContent = tr(kind.titleKey);
      section.appendChild(categoryTitle);
      var infoDate = document.createElement("div");
      infoDate.className = "pdf-doc-info-date";
      infoDate.textContent = isoToFullDisplay(dateISO);
      section.appendChild(infoDate);
      section.appendChild(kind.tableFn(log));
      wrap.appendChild(section);
      sectionCount++;
    });
    if (!sectionCount) {
      var empty = document.createElement("div");
      empty.className = "pdf-doc";
      var emptyMsg = document.createElement("div");
      emptyMsg.className = "pdf-doc-info-title";
      emptyMsg.textContent = tr("officeCombinedReportEmptyMsg");
      empty.appendChild(emptyMsg);
      wrap.appendChild(empty);
    }
    return wrap;
  }

  function generateOfficeCombinedReport(kindKey) {
    var kind = OFFICE_REPORT_KINDS[kindKey];
    closeOfficeReportTypeModal();
    var fileName = tr("officeCombinedReportFileNamePrefix") + " " + tr(kind.titleKey) + " " + isoToFileNameDate(officeReportViewDate) + ".pdf";
    buildPdfBlobFromElement(buildOfficeCombinedReportElement(kind), fileName).then(function (result) {
      attemptShare(result.blob, result.fileName);
    }).catch(function (err) {
      console.error(err);
      alert(tr("reportPdfError"));
    });
  }

  // Attendance/tools go through a preview screen with three ways to produce
  // the report, instead of straight to a PDF like procurement's share
  // button above - see showOfficeReportPreview() further down.
  var officeReportOptionsView = document.getElementById("officeReportOptionsView");
  var officeReportOptionsBackBtn = document.getElementById("officeReportOptionsBackBtn");
  var officeReportOptionsTitle = document.getElementById("officeReportOptionsTitle");
  var officeReportOptionsPreview = document.getElementById("officeReportOptionsPreview");
  var officeReportOptionsDateLabel = document.getElementById("officeReportOptionsDateLabel");
  var officeReportOptionsDateInput = document.getElementById("officeReportOptionsDateInput");
  var officeReportOptionsTodayBtn = document.getElementById("officeReportOptionsTodayBtn");
  var officeReportDailyBtn = document.getElementById("officeReportDailyBtn");
  var officeReportMonthlyBtn = document.getElementById("officeReportMonthlyBtn");
  var officeReportCustomBtn = document.getElementById("officeReportCustomBtn");
  var pendingOfficeReportKind = null;

  // Shared by both combined-report screens (this one and the procurement
  // list further below) - same date-label/calendar-input/"today" button
  // pattern as the main tasks page's own date controls, so picking a past
  // date on either screen keeps it in sync on the other too.
  var officeProcurementDateLabel = document.getElementById("officeProcurementDateLabel");
  var officeProcurementDateInput = document.getElementById("officeProcurementDateInput");
  var officeProcurementTodayBtn = document.getElementById("officeProcurementTodayBtn");
  var officeProcurementFilterSheetId = null;

  function renderOfficeReportDateControls() {
    var isToday = officeReportViewDate === todayISO();
    var displayText = isoToFullDisplay(officeReportViewDate);
    officeReportOptionsDateLabel.textContent = displayText;
    officeReportOptionsDateInput.value = officeReportViewDate;
    officeReportOptionsTodayBtn.hidden = isToday;
    officeProcurementDateLabel.textContent = displayText;
    officeProcurementDateInput.value = officeReportViewDate;
    officeProcurementTodayBtn.hidden = isToday;
  }

  function setOfficeReportViewDate(dateISO) {
    officeReportViewDate = dateISO;
    renderOfficeReportDateControls();
    if (!officeReportOptionsView.hidden && pendingOfficeReportKind) {
      officeReportOptionsPreview.innerHTML = "";
      officeReportOptionsPreview.appendChild(buildOfficeCombinedReportElement(OFFICE_REPORT_KINDS[pendingOfficeReportKind]));
    }
    if (!officeProcurementView.hidden) renderOfficeProcurementList(officeProcurementFilterSheetId);
  }
  officeReportOptionsDateInput.addEventListener("change", function () {
    if (officeReportOptionsDateInput.value) setOfficeReportViewDate(officeReportOptionsDateInput.value);
  });
  officeReportOptionsTodayBtn.addEventListener("click", function () { setOfficeReportViewDate(todayISO()); });
  officeProcurementDateInput.addEventListener("change", function () {
    if (officeProcurementDateInput.value) setOfficeReportViewDate(officeProcurementDateInput.value);
  });
  officeProcurementTodayBtn.addEventListener("click", function () { setOfficeReportViewDate(todayISO()); });

  // Same horizontal-drag-changes-the-date gesture as the main tasks page's
  // own date zone (setupSwipeGestures above) - dragging anywhere on either
  // combined-report screen's header (except directly on the calendar input
  // or a button) moves officeReportViewDate one day at a time.
  function setupOfficeReportDateSwipe(el) {
    if (!el) return;
    var startX = 0, startY = 0, startTime = 0, tracking = false;
    el.addEventListener("touchstart", function (e) {
      if (e.touches.length !== 1 || e.target.closest("input, button")) { tracking = false; return; }
      tracking = true;
      startX = e.touches[0].clientX;
      startY = e.touches[0].clientY;
      startTime = Date.now();
    }, { passive: true });
    el.addEventListener("touchend", function (e) {
      if (!tracking) return;
      tracking = false;
      var touch = e.changedTouches[0];
      var dx = touch.clientX - startX;
      var dy = touch.clientY - startY;
      var elapsed = Date.now() - startTime;
      if (elapsed < 800 && Math.abs(dx) > 60 && Math.abs(dx) > Math.abs(dy) * 1.5) {
        setOfficeReportViewDate(addDaysToISO(officeReportViewDate, dx < 0 ? -1 : 1));
      }
    }, { passive: true });
  }
  setupOfficeReportDateSwipe(document.querySelector("#officeReportOptionsView .report-head"));
  setupOfficeReportDateSwipe(document.querySelector("#officeProcurementView .report-head"));

  function openOfficeReportOptionsView(kindKey) {
    pendingOfficeReportKind = kindKey;
    officeReportViewDate = todayISO();
    renderOfficeReportDateControls();
    var kind = OFFICE_REPORT_KINDS[kindKey];
    officeReportOptionsTitle.textContent = tr(kind.titleKey);
    officeReportOptionsPreview.innerHTML = "";
    officeReportOptionsPreview.appendChild(buildOfficeCombinedReportElement(kind));
    closeOfficeReportTypeModal();
    officeReportOptionsView.hidden = false;
  }
  function closeOfficeReportOptionsView() {
    officeReportOptionsView.hidden = true;
    pendingOfficeReportKind = null;
    officeReportTypeView.hidden = false;
  }
  officeReportAttendanceBtn.addEventListener("click", function () { openOfficeReportOptionsView("attendance"); });
  officeReportToolsBtn.addEventListener("click", function () { openOfficeReportOptionsView("tools"); });
  officeReportOptionsBackBtn.addEventListener("click", closeOfficeReportOptionsView);

  var officeReportPreviewView = document.getElementById("officeReportPreviewView");
  var officeReportPreviewBackBtn = document.getElementById("officeReportPreviewBackBtn");
  var officeReportPreviewShareBtn = document.getElementById("officeReportPreviewShareBtn");
  var officeReportPreviewContent = document.getElementById("officeReportPreviewContent");
  var lastOfficeReportElement = null;
  var lastOfficeReportFileName = "";
  var officeReportPreviewReturnView = null;

  // returnView defaults to the attendance/tools options screen, since that's
  // the only caller before procurement's monthly/custom reports (which come
  // from officeProcurementView instead) started reusing this same preview.
  function showOfficeReportPreview(element, fileName, returnView) {
    lastOfficeReportElement = element;
    lastOfficeReportFileName = fileName;
    officeReportPreviewContent.innerHTML = "";
    officeReportPreviewContent.appendChild(element);
    officeReportPreviewReturnView = returnView || officeReportOptionsView;
    officeReportPreviewReturnView.hidden = true;
    officeReportPreviewView.hidden = false;
  }
  function closeOfficeReportPreviewView() {
    officeReportPreviewView.hidden = true;
    if (officeReportPreviewReturnView) officeReportPreviewReturnView.hidden = false;
  }
  officeReportPreviewBackBtn.addEventListener("click", closeOfficeReportPreviewView);
  officeReportPreviewShareBtn.addEventListener("click", function () {
    if (!lastOfficeReportElement) return;
    // A clone - buildPdfBlobFromElement() re-parents whatever element it's
    // given into its own temporary off-screen container, which would yank
    // the real preview's content off the visible screen if passed directly.
    buildPdfBlobFromElement(lastOfficeReportElement.cloneNode(true), lastOfficeReportFileName).then(function (result) {
      attemptShare(result.blob, result.fileName);
    }).catch(function (err) {
      console.error(err);
      alert(tr("reportPdfError"));
    });
  });

  officeReportDailyBtn.addEventListener("click", function () {
    var kind = OFFICE_REPORT_KINDS[pendingOfficeReportKind];
    var fileName = tr("officeCombinedReportFileNamePrefix") + " " + tr(kind.titleKey) + " " + isoToFileNameDate(officeReportViewDate) + ".pdf";
    showOfficeReportPreview(buildOfficeCombinedReportElement(kind), fileName);
  });

  // Builds one flat table of every (date, project) match for a given name,
  // across every active shared project's logs in [fromISO, toISO] - only a
  // log actually sent on ITS OWN date counts (log[kind.sentField] === that
  // log's own date), same "only what was really submitted" rule as the
  // daily combined report, just checked per-date instead of only for today.
  function buildOfficeNameReportElement(kind, name, fromISO, toISO) {
    var wrap = document.createElement("div");
    wrap.className = "pdf-doc";
    wrap.dir = RTL_LANGS[currentLang] ? "rtl" : "ltr";
    var titleEl = document.createElement("div");
    titleEl.className = "pdf-doc-title";
    titleEl.textContent = tr(kind.titleKey) + " - " + name;
    wrap.appendChild(titleEl);
    var infoDate = document.createElement("div");
    infoDate.className = "pdf-doc-info-date";
    infoDate.textContent = isoToFullDisplay(fromISO) + " - " + isoToFullDisplay(toISO);
    wrap.appendChild(infoDate);

    var nameLower = name.trim().toLowerCase();
    var rows = [];
    officeReportSheets().forEach(function (sheet) {
      (sheet.siteLogs || []).forEach(function (rawLog) {
        if (rawLog.date < fromISO || rawLog.date > toISO) return;
        if (rawLog[kind.sentField] !== rawLog.date) return;
        var log = normalizeSiteLog(rawLog);
        kind.findMatches(log, nameLower).forEach(function (m) {
          rows.push(Object.assign({ date: rawLog.date, project: sheet.name }, m));
        });
      });
    });
    rows.sort(function (a, b) { return a.date < b.date ? -1 : (a.date > b.date ? 1 : 0); });

    var table = document.createElement("table");
    table.className = "pdf-doc-table";
    var thead = document.createElement("thead");
    var headRow = document.createElement("tr");
    kind.matchColumns.forEach(function (key) {
      var th = document.createElement("th");
      th.textContent = tr(key);
      headRow.appendChild(th);
    });
    thead.appendChild(headRow);
    table.appendChild(thead);
    var tbody = document.createElement("tbody");
    if (!rows.length) {
      var emptyRow = document.createElement("tr");
      var emptyTd = document.createElement("td");
      emptyTd.className = "pdf-doc-empty";
      emptyTd.colSpan = kind.matchColumns.length;
      emptyTd.textContent = tr("reportShareNoRows");
      emptyRow.appendChild(emptyTd);
      tbody.appendChild(emptyRow);
    } else {
      rows.forEach(function (r) {
        var rowEl = document.createElement("tr");
        kind.rowToCells(r).forEach(function (val) {
          var td = document.createElement("td");
          td.textContent = val;
          rowEl.appendChild(td);
        });
        tbody.appendChild(rowEl);
      });
    }
    table.appendChild(tbody);
    wrap.appendChild(table);
    var footerEl = document.createElement("div");
    footerEl.className = "pdf-doc-footer";
    footerEl.textContent = tr("reportPdfFooter");
    wrap.appendChild(footerEl);
    return wrap;
  }

  // Procurement's monthly/custom equivalent - no name to filter by, so this
  // just combines every log actually sent (kind.sentField === its own date)
  // in [fromISO, toISO] into one multi-section document, same building
  // blocks as the daily combined report, just across more than one date.
  function buildOfficeRangeReportElement(kind, fromISO, toISO) {
    var wrap = document.createElement("div");
    wrap.dir = RTL_LANGS[currentLang] ? "rtl" : "ltr";
    var entries = [];
    officeReportSheets().forEach(function (sheet) {
      (sheet.siteLogs || []).forEach(function (rawLog) {
        if (rawLog.date < fromISO || rawLog.date > toISO) return;
        if (rawLog[kind.sentField] !== rawLog.date) return;
        entries.push({ sheet: sheet, log: normalizeSiteLog(rawLog), date: rawLog.date });
      });
    });
    entries.sort(function (a, b) { return a.date < b.date ? -1 : (a.date > b.date ? 1 : 0); });
    entries.forEach(function (e, i) {
      var section = document.createElement("div");
      section.className = "pdf-doc" + (i > 0 ? " pdf-doc-periodic-section" : "");
      section.appendChild(buildPdfDocTitleElement(e.sheet, e.sheet.name));
      var categoryTitle = document.createElement("div");
      categoryTitle.className = "pdf-doc-info-title";
      categoryTitle.textContent = tr(kind.titleKey);
      section.appendChild(categoryTitle);
      var infoDate = document.createElement("div");
      infoDate.className = "pdf-doc-info-date";
      infoDate.textContent = isoToFullDisplay(e.date);
      section.appendChild(infoDate);
      section.appendChild(kind.tableFn(e.log));
      wrap.appendChild(section);
    });
    if (!entries.length) {
      var empty = document.createElement("div");
      empty.className = "pdf-doc";
      var emptyMsg = document.createElement("div");
      emptyMsg.className = "pdf-doc-info-title";
      emptyMsg.textContent = tr("officeCombinedReportEmptyMsg");
      empty.appendChild(emptyMsg);
      wrap.appendChild(empty);
    }
    return wrap;
  }

  function monthInputToRange(monthValue) {
    var parts = monthValue.split("-");
    var year = parseInt(parts[0], 10), month = parseInt(parts[1], 10);
    var lastDay = new Date(year, month, 0).getDate();
    return { from: monthValue + "-01", to: monthValue + "-" + String(lastDay).padStart(2, "0") };
  }

  var officeNameReportOverlay = document.getElementById("officeNameReportOverlay");
  var officeNameReportModalMessage = document.getElementById("officeNameReportModalMessage");
  var officeNameReportNameLabel = document.getElementById("officeNameReportNameLabel");
  var officeNameReportNameInput = document.getElementById("officeNameReportNameInput");
  var officeNameReportMonthRow = document.getElementById("officeNameReportMonthRow");
  var officeNameReportMonthInput = document.getElementById("officeNameReportMonthInput");
  var officeNameReportFromRow = document.getElementById("officeNameReportFromRow");
  var officeNameReportFromInput = document.getElementById("officeNameReportFromInput");
  var officeNameReportToRow = document.getElementById("officeNameReportToRow");
  var officeNameReportToInput = document.getElementById("officeNameReportToInput");
  var officeNameReportGenerateBtn = document.getElementById("officeNameReportGenerateBtn");
  var officeNameReportCancelBtn = document.getElementById("officeNameReportCancelBtn");
  var pendingOfficeNameReportMode = null;

  function openOfficeNameReportModal(mode) {
    pendingOfficeNameReportMode = mode;
    var kind = OFFICE_REPORT_KINDS[pendingOfficeReportKind];
    officeNameReportNameInput.value = "";
    officeNameReportNameLabel.hidden = !!kind.noName;
    officeNameReportNameInput.hidden = !!kind.noName;
    var isMonthly = mode === "monthly";
    if (kind.noName) {
      officeNameReportModalMessage.textContent = tr(isMonthly ? "officeRangeReportModalMessageMonthly" : "officeRangeReportModalMessageCustom");
    } else {
      officeNameReportModalMessage.textContent = tr(isMonthly ? "officeNameReportModalMessageMonthly" : "officeNameReportModalMessageCustom");
    }
    officeNameReportMonthRow.hidden = !isMonthly;
    officeNameReportMonthInput.hidden = !isMonthly;
    officeNameReportMonthInput.value = "";
    officeNameReportMonthInput.max = todayISO().slice(0, 7);
    officeNameReportFromRow.hidden = isMonthly;
    officeNameReportFromInput.hidden = isMonthly;
    officeNameReportToRow.hidden = isMonthly;
    officeNameReportToInput.hidden = isMonthly;
    officeNameReportFromInput.value = "";
    officeNameReportToInput.value = "";
    officeNameReportFromInput.max = todayISO();
    officeNameReportToInput.max = todayISO();
    officeNameReportOverlay.hidden = false;
  }
  function closeOfficeNameReportModal() {
    officeNameReportOverlay.hidden = true;
  }
  officeReportMonthlyBtn.addEventListener("click", function () { openOfficeNameReportModal("monthly"); });
  officeReportCustomBtn.addEventListener("click", function () { openOfficeNameReportModal("custom"); });
  officeNameReportCancelBtn.addEventListener("click", closeOfficeNameReportModal);
  officeNameReportOverlay.addEventListener("click", function (e) {
    if (e.target === officeNameReportOverlay) closeOfficeNameReportModal();
  });
  officeNameReportGenerateBtn.addEventListener("click", function () {
    var kind = OFFICE_REPORT_KINDS[pendingOfficeReportKind];
    var name = "";
    if (!kind.noName) {
      name = officeNameReportNameInput.value.trim();
      if (!name) { alert(tr("officeNameReportMissingNameMsg")); return; }
    }
    var range;
    if (pendingOfficeNameReportMode === "monthly") {
      if (!officeNameReportMonthInput.value) { alert(tr("officeNameReportMissingMonthMsg")); return; }
      range = monthInputToRange(officeNameReportMonthInput.value);
    } else {
      var from = officeNameReportFromInput.value, to = officeNameReportToInput.value;
      if (!from || !to) { alert(tr("siteLogPeriodicMissingDatesMsg")); return; }
      if (from > to) { alert(tr("siteLogPeriodicInvalidRangeMsg")); return; }
      range = { from: from, to: to };
    }
    closeOfficeNameReportModal();
    var fileName = tr("officeCombinedReportFileNamePrefix") + " " + tr(kind.titleKey) + (name ? " " + name : "") + " " + isoToFileNameDate(range.from) + " - " + isoToFileNameDate(range.to) + ".pdf";
    var element = kind.noName ? buildOfficeRangeReportElement(kind, range.from, range.to) : buildOfficeNameReportElement(kind, name, range.from, range.to);
    showOfficeReportPreview(element, fileName, kind.noName ? officeProcurementView : officeReportOptionsView);
  });

  // Procurement's combined report is interactive instead of going straight
  // to a PDF - Head Office marks each row purchased by tapping its circle,
  // written directly onto that project's own procurement entry (same
  // siteLogs sync path as everything else here), so regular members of that
  // project see the same green circle appear on their own copy of the row
  // (see the `entry.purchased` check in renderSiteLogProcurementRows above).
  var officeProcurementView = document.getElementById("officeProcurementView");
  var officeProcurementBackBtn = document.getElementById("officeProcurementBackBtn");
  var officeProcurementList = document.getElementById("officeProcurementList");
  var officeProcurementDailyBtn = document.getElementById("officeProcurementDailyBtn");
  var officeProcurementMonthlyBtn = document.getElementById("officeProcurementMonthlyBtn");
  var officeProcurementCustomBtn = document.getElementById("officeProcurementCustomBtn");

  function renderOfficeProcurementList(filterSheetId) {
    officeProcurementFilterSheetId = filterSheetId || null;
    officeProcurementList.innerHTML = "";
    var dateISO = officeReportViewDate;
    var sentField = OFFICE_REPORT_KINDS.procurement.sentField;
    var projects = officeReportSheets().filter(function (sheet) {
      if (filterSheetId && sheet.id !== filterSheetId) return false;
      var log = findSiteLog(sheet, dateISO);
      return log && log[sentField] === dateISO;
    });
    if (!projects.length) {
      var empty = document.createElement("div");
      empty.className = "library-empty";
      empty.textContent = tr("officeCombinedReportEmptyMsg");
      officeProcurementList.appendChild(empty);
      return;
    }
    projects.forEach(function (sheet) {
      var log = findSiteLog(sheet, dateISO);
      var block = document.createElement("div");
      block.className = "office-procurement-project";
      var nameEl = document.createElement("div");
      nameEl.className = "office-procurement-project-name";
      nameEl.textContent = sheet.name;
      block.appendChild(nameEl);
      filledProcurement(log).forEach(function (entry) {
        var row = document.createElement("div");
        row.className = "site-log-procurement-row";

        var mark = document.createElement("button");
        mark.type = "button";
        mark.className = "purchased-mark clickable" + (entry.purchased ? " purchased" : "");
        mark.addEventListener("click", function () {
          entry.purchased = !entry.purchased;
          saveData();
          renderOfficeProcurementList(officeProcurementFilterSheetId);
        });
        row.appendChild(mark);

        [
          { val: entry.item, cls: "site-log-procurement-item" },
          { val: entry.quantity, cls: "site-log-procurement-quantity" },
          { val: entry.supplier, cls: "site-log-procurement-supplier" }
        ].forEach(function (col) {
          var span = document.createElement("span");
          span.className = col.cls;
          span.textContent = col.val || "";
          row.appendChild(span);
        });

        block.appendChild(row);
      });
      officeProcurementList.appendChild(block);
    });
  }

  // filterSheetId/filterDate let a notification task in the "משרד ראשי"
  // tab (see syncHeadOfficeVirtualTasks) jump straight to one specific
  // project's procurement list on the date it was sent, instead of the
  // normal all-projects/today view this screen otherwise shows.
  // Opened from a Head Office notification (one project's order) rather
  // than from the combined reports screen: "back" then returns to the
  // notifications list, not to the reports screen it never came from.
  var officeProcurementFromNotification = false;
  // ---- Head Office "הזנת נתונים" ----
  // Six folders (engineers, foremen, workers, operators, crews,
  // surveyors), each a list of names kept with this account's own data
  // (data.officeDirectory[key]).
  var OFFICE_DATA_FOLDERS = [
    { key: "engineers", label: "officeDataEngineers" },
    { key: "foremen", label: "officeDataForemen" },
    { key: "workers", label: "officeDataWorkers" },
    { key: "operators", label: "officeDataOperators" },
    { key: "crews", label: "officeDataCrews" },
    { key: "surveyors", label: "officeDataSurveyors" }
  ];
  var officeDataBtn = document.getElementById("officeDataBtn");
  var officeDataView = document.getElementById("officeDataView");
  var officeDataTitleEl = document.getElementById("officeDataTitle");
  var officeDataFoldersEl = document.getElementById("officeDataFolders");
  var officeDataListEl = document.getElementById("officeDataList");
  var officeDataOpenKey = null;
  function officeDirectory() {
    if (!data.officeDirectory) data.officeDirectory = {};
    return data.officeDirectory;
  }
  // Which list feeds which diary field: attendance columns, and צוותים ->
  // the contractors (קבלנים) list.
  var ATTENDANCE_TO_OFFICE_FOLDER = {
    engineer: "engineers", foreman: "foremen", workers: "workers",
    operators: "operators", surveyor: "surveyors"
  };
  function officeDirectoryNames(sheet, key) {
    var dir = sheet && (sheet.officeDirectory || (!sheet.shared && data.officeDirectory));
    return key && dir && dir[key] ? dir[key].map(function (e) { return e.name; }) : [];
  }
  // Head Office hands its lists to every project it watches
  // (data.officeDirectory there), so whoever fills a project's diary gets
  // them as suggestions. Only projects whose copy differs are written.
  var officeDirectoryPublishTimer = null;
  function publishOfficeDirectory() {
    clearTimeout(officeDirectoryPublishTimer);
    officeDirectoryPublishTimer = setTimeout(function () {
      if (!isHeadOfficeMode || !supabaseClient) return;
      var dir = JSON.parse(JSON.stringify(officeDirectory()));
      var json = JSON.stringify(dir);
      officeReportSheets().forEach(function (sheet) {
        if (JSON.stringify(sheet.officeDirectory || {}) === json) return;
        updateSharedSheetDataSafely(sheet.id, function (current) {
          return Object.assign({}, current, { officeDirectory: dir });
        }).then(function () {
          var live = sharedSheets.find(function (s) { return s.id === sheet.id; });
          if (live) live.officeDirectory = dir;
        }, function () {});
      });
    }, 800);
  }
  function renderOfficeDataFolders() {
    officeDataOpenKey = null;
    officeDataTitleEl.textContent = tr("officeDataTitle");
    officeDataListEl.hidden = true;
    officeDataFoldersEl.hidden = false;
    officeDataFoldersEl.innerHTML = "";
    OFFICE_DATA_FOLDERS.forEach(function (f) {
      var item = document.createElement("div");
      item.className = "library-item";
      item.dataset.key = f.key;
      var thumb = document.createElement("div");
      thumb.className = "library-item-thumb";
      thumb.textContent = "📁";
      var name = document.createElement("div");
      name.className = "library-item-name";
      var count = (officeDirectory()[f.key] || []).length;
      name.textContent = tr(f.label) + (count ? " (" + count + ")" : "");
      item.appendChild(thumb);
      item.appendChild(name);
      item.addEventListener("click", function () { openOfficeDataFolder(f); });
      officeDataFoldersEl.appendChild(item);
    });
  }
  function openOfficeDataFolder(f) {
    officeDataOpenKey = f.key;
    officeDataTitleEl.textContent = tr(f.label);
    officeDataFoldersEl.hidden = true;
    officeDataListEl.hidden = false;
    var rerender = function () { openOfficeDataFolder(f); };
    renderSiteLogNameList(officeDataListEl, function () {
      return officeDirectory()[f.key] || [];
    }, function (name) {
      var dir = officeDirectory();
      var entry = { id: uid(), name: name };
      dir[f.key] = (dir[f.key] || []).concat([entry]);
      publishOfficeDirectory();
      return entry;
    }, function (id) {
      var dir = officeDirectory();
      dir[f.key] = (dir[f.key] || []).filter(function (e) { return e.id !== id; });
      publishOfficeDirectory();
    }, rerender);
  }
  officeDataBtn.addEventListener("click", function () {
    state.menuOpen = false;
    publishOfficeDirectory(); // projects added since the last change get the lists too
    renderOfficeDataFolders();
    officeDataView.hidden = false;
    render();
  });
  document.getElementById("officeDataBackBtn").addEventListener("click", function () {
    if (officeDataOpenKey) { renderOfficeDataFolders(); return; }
    officeDataView.hidden = true;
  });

  function openOfficeProcurementView(filterSheetId, filterDate) {
    officeProcurementFromNotification = !!filterSheetId;
    closeOfficeReportTypeModal();
    officeReportViewDate = filterDate || todayISO();
    renderOfficeReportDateControls();
    renderOfficeProcurementList(filterSheetId);
    officeProcurementView.hidden = false;
  }
  function closeOfficeProcurementView() {
    officeProcurementView.hidden = true;
    if (!officeProcurementFromNotification) officeReportTypeView.hidden = false;
    officeProcurementFromNotification = false;
  }
  officeReportProcurementBtn.addEventListener("click", function () { openOfficeProcurementView(); });
  officeProcurementBackBtn.addEventListener("click", closeOfficeProcurementView);
  officeProcurementDailyBtn.addEventListener("click", function () { generateOfficeCombinedReport("procurement"); });
  officeProcurementMonthlyBtn.addEventListener("click", function () {
    pendingOfficeReportKind = "procurement";
    openOfficeNameReportModal("monthly");
  });
  officeProcurementCustomBtn.addEventListener("click", function () {
    pendingOfficeReportKind = "procurement";
    openOfficeNameReportModal("custom");
  });

