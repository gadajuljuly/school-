
  // ---------------------------------------------------------------------
  // קו בסיס: a snapshot of a project's plan (each activity's start / end),
  // kept as workBaseline: { savedAt, savedBy, items: { id: { start, end } } }.
  // The chart draws it as a thin grey bar under each activity, and an
  // activity that has slipped past it says by how many days. "Excel" hands
  // the plan over as a spreadsheet (CSV), baseline and slip included.
  // ---------------------------------------------------------------------
  var wpBaselineOverlay = document.getElementById("wpBaselineOverlay");
  wpState.showBaseline = true;

  function wpBaselineOf(sheet, item) {
    var b = sheet && sheet.workBaseline;
    return b && b.items && b.items[item.id] || null;
  }
  // days the activity now ends after (+) / before (-) its baseline end
  function wpSlipDays(sheet, item) {
    var base = wpBaselineOf(sheet, item);
    return base ? wpDiff(base.end, item.end) : null;
  }
  // under an activity's bar: where it was planned
  function wpDrawBaselineBar(trackEl, sheet, item, range, dayW) {
    if (!wpState.showBaseline) return;
    var base = wpBaselineOf(sheet, item);
    if (!base) return;
    var from = Math.max(0, wpDiff(range.start, base.start));
    var to = Math.min(range.days - 1, wpDiff(range.start, base.end));
    if (to < 0 || from > range.days - 1) return;
    var bar = wpEl("div", "wp-base-bar" + (item.end > base.end ? " wp-base-late" : ""));
    bar.style.right = (from * dayW + 1) + "px";
    bar.style.width = Math.max(3, (to - from + 1) * dayW - 2) + "px";
    bar.title = tr("workPlanBaselineLegend") + ": " + isoToDisplay(base.start) + " – " + isoToDisplay(base.end);
    trackEl.appendChild(bar);
  }
  // beside the activity's name: "+3 ימים" when it has slipped
  function wpSlipLabel(nameEl, sheet, item) {
    if (!wpState.showBaseline) return;
    var slip = wpSlipDays(sheet, item);
    if (slip && slip > 0) nameEl.appendChild(wpEl("small", "wp-slip", tr("workPlanSlip").replace("{n}", slip)));
  }

  function saveWorkBaseline(sheet, baseline) {
    sheet.workBaseline = baseline;
    if (!sheet.shared) { saveData(); renderWorkPlan(); return; }
    renderWorkPlan();
    if (!supabaseClient) return;
    updateSharedSheetDataSafely(sheet.id, function (current) {
      return Object.assign({}, current, { workBaseline: baseline });
    }).then(function (newData) {
      var live = sharedSheets.find(function (s) { return s.id === sheet.id; });
      if (live) live.workBaseline = newData.workBaseline || null;
      refreshWorkPlanIfOpen();
    }, function () {
      alert(tr("workPlanSaveError"));
    });
  }
  function wpBaselineSheet() {
    return wpState.sheetId && allSheets().find(function (s) { return s.id === wpState.sheetId; });
  }
  function openWpBaseline() {
    var sheet = wpBaselineSheet();
    if (!sheet) return;
    var b = sheet.workBaseline;
    document.getElementById("wpBaselineText").textContent = b ?
      tr("workPlanBaselineSavedOn").replace("{date}", new Date(b.savedAt).toLocaleDateString(calLocale(), { day: "numeric", month: "numeric", year: "numeric" })) :
      tr("workPlanBaselineExplain");
    document.getElementById("wpBaselineSaveBtn").textContent = tr(b ? "workPlanBaselineUpdate" : "workPlanBaselineSave");
    var toggle = document.getElementById("wpBaselineToggleBtn");
    toggle.hidden = !b;
    toggle.textContent = tr(wpState.showBaseline ? "workPlanBaselineHide" : "workPlanBaselineShow");
    document.getElementById("wpBaselineDeleteBtn").hidden = !b;
    wpBaselineOverlay.hidden = false;
  }
  document.getElementById("workPlanBaselineBtn").addEventListener("click", openWpBaseline);
  document.getElementById("wpBaselineSaveBtn").addEventListener("click", function () {
    wpBaselineOverlay.hidden = true;
    var sheet = wpBaselineSheet();
    if (!sheet) return;
    var items = {};
    (sheet.workPlan || []).forEach(function (x) { items[x.id] = { start: x.start, end: x.end }; });
    wpState.showBaseline = true;
    saveWorkBaseline(sheet, { savedAt: Date.now(), savedBy: myPhoneNumber || null, items: items });
    showToast(tr("workPlanBaselineSavedMsg"));
  });
  document.getElementById("wpBaselineToggleBtn").addEventListener("click", function () {
    wpBaselineOverlay.hidden = true;
    wpState.showBaseline = !wpState.showBaseline;
    renderWorkPlan();
  });
  document.getElementById("wpBaselineDeleteBtn").addEventListener("click", function () {
    wpBaselineOverlay.hidden = true;
    var sheet = wpBaselineSheet();
    if (!sheet) return;
    askConfirm(tr("workPlanBaselineDeleteConfirm"), function () { saveWorkBaseline(sheet, null); });
  });
  document.getElementById("wpBaselineCancelBtn").addEventListener("click", function () { wpBaselineOverlay.hidden = true; });

  // ---- Excel ---------------------------------------------------------------------
  function wpCsvCell(v) {
    v = v == null ? "" : String(v);
    return /[",\n\r]/.test(v) ? "\"" + v.replace(/"/g, "\"\"") + "\"" : v;
  }
  function wpExcelDate(iso) {
    if (!iso) return "";
    var p = iso.split("-");
    return p[2] + "/" + p[1] + "/" + p[0];
  }
  function workPlanExcel() {
    var groups = wpGroups();
    if (!groups.some(function (g) { return g.items.length; })) { showToast(tr("workPlanEmpty")); return; }
    var office = !wpState.sheetId;
    var head = [tr("workPlanExcelActivity"), tr("workPlanHammock"), tr("workPlanBy"), tr("workPlanFrom"), tr("workPlanTo"),
      tr("workPlanExcelDays"), tr("workPlanStatus"), tr("workPlanExcelDone"), tr("workPlanStatusLate"),
      tr("workPlanExcelBaseStart"), tr("workPlanExcelBaseEnd"), tr("workPlanExcelSlip"), tr("workPlanNote")];
    if (office) head.unshift(tr("shareTaskProject"));
    var rows = [head];
    var statusText = { todo: tr("workPlanStatusTodo"), prog: tr("workPlanStatusProg"), done: tr("workPlanStatusDone") };
    groups.forEach(function (g) {
      var hams = {};
      (g.sheet.workHammocks || []).forEach(function (h) { hams[h.id] = h.name; });
      g.items.forEach(function (x) {
        var base = wpBaselineOf(g.sheet, x);
        var row = [x.name, hams[x.hammock] || "", x.by || "", wpExcelDate(x.start), wpExcelDate(x.end),
          wpDiff(x.start, x.end) + 1, statusText[x.status] || "", (x.status === "done" ? 100 : x.progress || 0) + "%",
          wpIsLate(x) ? "✓" : "", base ? wpExcelDate(base.start) : "", base ? wpExcelDate(base.end) : "",
          base ? wpDiff(base.end, x.end) : "", x.note || ""];
        if (office) row.unshift(g.sheet.name);
        rows.push(row);
      });
    });
    // with a BOM, so Excel reads the Hebrew right
    var csv = "﻿" + rows.map(function (r) { return r.map(wpCsvCell).join(","); }).join("\r\n");
    var sheet = wpBaselineSheet();
    var name = (sheet ? tr("workPlanTitle") + " " + sheet.name : tr("workPlanOfficeTitle")) + " " + isoToFileNameDate(todayISO()) + ".csv";
    attemptShare(new Blob([csv], { type: "text/csv;charset=utf-8" }), name, "text/csv");
  }
  document.getElementById("workPlanExcelBtn").addEventListener("click", workPlanExcel);
