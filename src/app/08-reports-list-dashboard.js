  var reportActionOverlay = document.getElementById("reportActionOverlay");
  var reportActionDeleteBtn = document.getElementById("reportActionDeleteBtn");
  var reportActionEditBtn = document.getElementById("reportActionEditBtn");
  var reportActionShareBtn = document.getElementById("reportActionShareBtn");
  var reportActionAddTasksBtn = document.getElementById("reportActionAddTasksBtn");
  var reportActionCancelBtn = document.getElementById("reportActionCancelBtn");
  var pendingReportActionId = null;

  function openReportActionModal(id) {
    pendingReportActionId = id;
    reportActionOverlay.hidden = false;
  }
  function closeReportActionModal() {
    reportActionOverlay.hidden = true;
    pendingReportActionId = null;
  }
  function deleteReport(id) {
    var report = findReport(id);
    if (!report) return;
    var typeLabel = report.type === "meeting" ? tr("reportTypeMeeting") : tr("reportTypeTour");
    askConfirm(tr("confirmDeleteReport").replace("{name}", report.title || typeLabel), function () {
      var sheet = activeSheet();
      sheet.reports = (sheet.reports || []).filter(function (r) { return r.id !== id; });
      saveData();
      if (state.viewMode === "reports") renderSheetReportsList();
    });
  }
  reportActionDeleteBtn.addEventListener("click", function () {
    var id = pendingReportActionId;
    closeReportActionModal();
    deleteReport(id);
  });
  reportActionEditBtn.addEventListener("click", function () {
    var id = pendingReportActionId;
    closeReportActionModal();
    openReportEditFlow(id);
  });
  reportActionShareBtn.addEventListener("click", function () {
    var id = pendingReportActionId;
    closeReportActionModal();
    var report = findReport(id);
    if (report) generateReportPdf(report, "share");
  });

  var reportRowActionOverlay = document.getElementById("reportRowActionOverlay");
  var reportRowActionDeleteBtn = document.getElementById("reportRowActionDeleteBtn");
  var reportRowActionCopyBtn = document.getElementById("reportRowActionCopyBtn");
  var reportRowActionCancelBtn = document.getElementById("reportRowActionCancelBtn");
  var pendingReportRowActionId = null;

  function openReportRowActionModal(rowId) {
    pendingReportRowActionId = rowId;
    reportRowActionOverlay.hidden = false;
  }
  function closeReportRowActionModal() {
    reportRowActionOverlay.hidden = true;
    pendingReportRowActionId = null;
  }
  function deleteReportRow(rowId) {
    var report = findReport(activeReportId);
    if (!report) return;
    askConfirm(tr("confirmDeleteReportRow"), function () {
      report.rows = report.rows.filter(function (r) { return r.id !== rowId; });
      saveData();
      renderReportView();
    });
  }
  function duplicateReportRow(rowId) {
    var report = findReport(activeReportId);
    if (!report) return;
    var idx = report.rows.findIndex(function (r) { return r.id === rowId; });
    if (idx === -1) return;
    var copy = Object.assign({}, report.rows[idx], { id: uid() });
    report.rows.splice(idx + 1, 0, copy);
    saveData();
    renderReportView();
  }
  reportRowActionDeleteBtn.addEventListener("click", function () {
    var rowId = pendingReportRowActionId;
    closeReportRowActionModal();
    deleteReportRow(rowId);
  });
  reportRowActionCopyBtn.addEventListener("click", function () {
    var rowId = pendingReportRowActionId;
    closeReportRowActionModal();
    duplicateReportRow(rowId);
  });
  reportRowActionCancelBtn.addEventListener("click", closeReportRowActionModal);
  reportRowActionOverlay.addEventListener("click", function (e) {
    if (e.target === reportRowActionOverlay) closeReportRowActionModal();
  });

  function addReportRowsToTaskList(reportId) {
    var report = findReport(reportId);
    if (!report) return 0;
    var sheet = activeSheet();
    var added = 0;
    (report.rows || []).forEach(function (row) {
      var lines = (row.task || "").split(/\r\n|\r|\n/).map(function (l) { return l.trim(); }).filter(function (l) { return l; });
      lines.forEach(function (line) {
        var text = line;
        if (row.dueDate) text += " - " + tr("reportTaskDueSuffix") + " " + isoToDisplay(row.dueDate);
        sheet.tasks.push({
          id: uid(),
          text: text,
          status: row.status || 0,
          urgent: row.priority === "urgent",
          type: "task",
          date: todayISO(),
          createdAt: Date.now()
        });
        added++;
      });
    });
    if (added) saveData();
    return added;
  }
  reportActionAddTasksBtn.addEventListener("click", function () {
    var id = pendingReportActionId;
    closeReportActionModal();
    var added = addReportRowsToTaskList(id);
    alert(added ? tr("reportTasksAddedMsg").replace("{count}", added) : tr("reportTasksNoneToAdd"));
  });
  reportActionCancelBtn.addEventListener("click", closeReportActionModal);
  reportActionOverlay.addEventListener("click", function (e) {
    if (e.target === reportActionOverlay) closeReportActionModal();
  });

  var companyDashboardBtn = document.getElementById("companyDashboardBtn");
  var companyDashboardView = document.getElementById("companyDashboardView");
  var companyDashboardBackBtn = document.getElementById("companyDashboardBackBtn");
  var companyDashboardList = document.getElementById("companyDashboardList");

  function openCompanyDashboardView() {
    companyDashboardView.hidden = false;
    renderCompanyDashboard();
  }
  function closeCompanyDashboardView() {
    companyDashboardView.hidden = true;
  }
  function renderCompanyDashboard() {
    companyDashboardList.innerHTML = "";
    var sheets = visibleSheets();
    if (!sheets.length) {
      var empty = document.createElement("div");
      empty.className = "company-dashboard-empty";
      empty.textContent = tr("companyDashboardEmpty");
      companyDashboardList.appendChild(empty);
      return;
    }
    var today = todayISO();
    sheets.forEach(function (sheet) {
      var row = document.createElement("div");
      row.className = "company-dashboard-row";

      var nameEl = document.createElement("div");
      nameEl.className = "company-dashboard-name";
      nameEl.textContent = (sheet.shared ? "👥 " : "") + sheet.name;
      row.appendChild(nameEl);

      var todayLog = findSiteLog(sheet, today);
      var statusEl = document.createElement("div");
      statusEl.className = "company-dashboard-status";
      if (todayLog && todayLog.closed) {
        statusEl.classList.add("company-dashboard-status-closed");
        statusEl.textContent = tr("companyDashboardClosedToday");
      } else if (todayLog) {
        statusEl.classList.add("company-dashboard-status-open");
        statusEl.textContent = tr("companyDashboardOpenNotClosed");
      } else {
        statusEl.classList.add("company-dashboard-status-missing");
        statusEl.textContent = tr("companyDashboardNoLogToday");
      }
      row.appendChild(statusEl);

      var closedLogs = (sheet.siteLogs || []).filter(function (l) { return l.closed; });
      if (closedLogs.length) {
        closedLogs.sort(function (a, b) { return a.date < b.date ? 1 : -1; });
        var lastEl = document.createElement("div");
        lastEl.className = "company-dashboard-last";
        lastEl.textContent = tr("companyDashboardLastLog") + " " + isoToFullDisplay(closedLogs[0].date);
        row.appendChild(lastEl);
      }

      row.addEventListener("click", function () {
        closeCompanyDashboardView();
        selectSheet(sheet.id);
        state.viewDate = today;
        openDiaryView();
      });
      companyDashboardList.appendChild(row);
    });
  }
  companyDashboardBtn.addEventListener("click", function () {
    state.menuOpen = false;
    render();
    openCompanyDashboardView();
  });
  companyDashboardBackBtn.addEventListener("click", closeCompanyDashboardView);

  var VAPID_PUBLIC_KEY = "BPdpuz8Hlv_j8NYip_kdmzpj6h6fhbhjY3_NeeLyBIoVo7K1qJiouH3RtdyOTNV6riNdmGB_X6u7qL_jVwejDrM";

  function urlBase64ToUint8Array(base64String) {
    var padding = "=".repeat((4 - (base64String.length % 4)) % 4);
    var base64 = (base64String + padding).replace(/-/g, "+").replace(/_/g, "/");
    var rawData = atob(base64);
    var outputArray = new Uint8Array(rawData.length);
    for (var i = 0; i < rawData.length; i++) {
      outputArray[i] = rawData.charCodeAt(i);
    }
    return outputArray;
  }

  var reminderFrequencySelect = document.getElementById("reminderFrequencySelect");
  var reminderStatus = document.getElementById("reminderStatus");

  var langSelect = document.getElementById("langSelect");
  langSelect.value = currentLang;
  langSelect.addEventListener("change", function () {
    state.menuOpen = false;
    setLang(langSelect.value);
    authLangSelect.value = currentLang;
  });

  var authLangSelect = document.getElementById("authLangSelect");
  authLangSelect.value = currentLang;
  authLangSelect.addEventListener("change", function () {
    setLang(authLangSelect.value);
    langSelect.value = currentLang;
  });

  applyStaticTranslations();

