
  // ---------------------------------------------------------------------
  // תוכנית עבודה: a project's activities on a Gantt chart (week / month /
  // the whole plan, any length), edited by every member. Kept in the
  // project's own data as workPlan: [{ id, name, start, end (ISO dates),
  // by (who carries it out), status todo|prog|done, progress 0-100, note,
  // updatedBy, updatedAt }]. A shared project's edits are applied to the
  // server's fresh copy one item at a time, so two members editing at once
  // don't overwrite each other. Head Office sees every watched project's
  // plan in one chart (wpState.sheetId null).
  // ---------------------------------------------------------------------
  var workPlanView = document.getElementById("workPlanView");
  var workPlanTitle = document.getElementById("workPlanTitle");
  var workPlanChart = document.getElementById("workPlanChart");
  var workPlanRangeLabel = document.getElementById("workPlanRangeLabel");
  var workPlanNav = document.getElementById("workPlanNav");
  var workPlanLateBanner = document.getElementById("workPlanLateBanner");
  var workPlanEmpty = document.getElementById("workPlanEmpty");
  var workPlanBtn = document.getElementById("workPlanBtn");
  var wpEditOverlay = document.getElementById("workPlanEditOverlay");
  var wpName = document.getElementById("wpName");
  var wpStart = document.getElementById("wpStart");
  var wpEnd = document.getElementById("wpEnd");
  var wpBy = document.getElementById("wpBy");
  var wpByList = document.getElementById("wpByList");
  var wpProgress = document.getElementById("wpProgress");
  var wpProgressLabel = document.getElementById("wpProgressLabel");
  var wpNote = document.getElementById("wpNote");
  var wpProject = document.getElementById("wpProject");
  var wpProjectRow = document.getElementById("wpProjectRow");
  var wpDeleteBtn = document.getElementById("wpDeleteBtn");
  var WP_NAME_W = 112;
  var wpState = { sheetId: null, zoom: "month", anchor: todayISO(), collapsed: {} };
  var wpEditing = null; // { sheetId, item (a copy), isNew }
  var wpEditStatus = "todo";

  function wpDate(iso) { var p = iso.split("-"); return new Date(+p[0], +p[1] - 1, +p[2], 12); }
  function wpIso(d) { return d.getFullYear() + "-" + String(d.getMonth() + 1).padStart(2, "0") + "-" + String(d.getDate()).padStart(2, "0"); }
  function wpDiff(a, b) { return Math.round((wpDate(b) - wpDate(a)) / 86400000); }
  function wpIsLate(item) { return item.status !== "done" && item.end < todayISO(); }
  function wpClass(item) { return item.status === "done" ? "done" : wpIsLate(item) ? "late" : item.status === "prog" ? "prog" : "todo"; }
  function wpSorted(list) {
    return (list || []).slice().sort(function (a, b) { return a.start.localeCompare(b.start) || a.end.localeCompare(b.end); });
  }

  // What the chart shows: one project, or (Head Office) every watched one.
  function wpGroups() {
    if (wpState.sheetId) {
      var sheet = allSheets().find(function (s) { return s.id === wpState.sheetId; });
      return sheet ? [{ sheet: sheet, items: wpSorted(sheet.workPlan) }] : [];
    }
    return officeReportSheets().slice().sort(compareSheetNames).map(function (s) {
      return { sheet: s, items: wpSorted(s.workPlan) };
    }).filter(function (g) { return g.items.length; });
  }

  function wpRange(groups) {
    var a = wpState.anchor;
    if (wpState.zoom === "week") {
      return { start: addDaysToISO(a, -wpDate(a).getDay()), days: 7 };
    }
    if (wpState.zoom === "month") {
      var d = wpDate(a);
      return { start: a.slice(0, 8) + "01", days: new Date(d.getFullYear(), d.getMonth() + 1, 0).getDate() };
    }
    // the whole plan, a day either side
    var all = [].concat.apply([], groups.map(function (g) { return g.items; }));
    if (!all.length) return { start: todayISO().slice(0, 8) + "01", days: 30 };
    var first = all.reduce(function (m, x) { return x.start < m ? x.start : m; }, all[0].start);
    var last = all.reduce(function (m, x) { return x.end > m ? x.end : m; }, all[0].end);
    var start = addDaysToISO(first, -1);
    return { start: start, days: Math.max(14, wpDiff(start, last) + 2) };
  }

  function wpRangeLabel(range) {
    var loc = calLocale();
    var s = wpDate(range.start), e = wpDate(addDaysToISO(range.start, range.days - 1));
    if (wpState.zoom === "month") return s.toLocaleDateString(loc, { month: "long", year: "numeric" });
    var fmt = { day: "numeric", month: "short" };
    if (wpState.zoom === "all") fmt.year = "numeric";
    return s.toLocaleDateString(loc, fmt) + " – " + e.toLocaleDateString(loc, fmt);
  }

  function wpEl(tag, cls, text) {
    var el = document.createElement(tag);
    if (cls) el.className = cls;
    if (text != null) el.textContent = text;
    return el;
  }

  // Builds the chart into `host`. width = the space for it; forPdf draws
  // every row (no collapsing, no tapping).
  function wpBuildChart(host, groups, range, width, forPdf) {
    host.innerHTML = "";
    var avail = Math.max(120, width - WP_NAME_W - 2);
    var minDay = wpState.zoom === "week" ? 30 : wpState.zoom === "month" ? 6.5 : 4;
    var dayW = Math.max(minDay, avail / range.days);
    var trackW = Math.round(dayW * range.days);
    var today = todayISO();
    var todayIdx = wpDiff(range.start, today);
    var loc = calLocale();

    function track(cls) {
      var t = wpEl("div", "wp-track" + (cls ? " " + cls : ""));
      t.style.width = trackW + "px";
      t.style.backgroundSize = dayW + "px 100%";
      // Saturdays shaded
      for (var i = 0; i < range.days; i++) {
        if (wpDate(addDaysToISO(range.start, i)).getDay() === 6) {
          var sat = wpEl("div", "wp-sat");
          sat.style.right = (i * dayW) + "px";
          sat.style.width = dayW + "px";
          t.appendChild(sat);
        }
      }
      if (todayIdx >= 0 && todayIdx < range.days) {
        var line = wpEl("div", "wp-today");
        line.style.right = (todayIdx * dayW + dayW / 2 - 1) + "px";
        t.appendChild(line);
      }
      return t;
    }

    var head = wpEl("div", "wp-row wp-head-row" + (wpState.zoom === "week" ? " wp-head-week" : ""));
    head.appendChild(wpEl("div", "wp-name wp-name-head", tr("workPlanActivity")));
    var ht = track("wp-head-track");
    for (var i = 0; i < range.days; i++) {
      var d = wpDate(addDaysToISO(range.start, i));
      var label = null;
      if (wpState.zoom === "week") {
        label = d.toLocaleDateString(loc, { weekday: "narrow" }) + "\n" + d.getDate();
      } else if (wpState.zoom === "month") {
        if (dayW >= 14 || d.getDate() === 1 || d.getDate() % 5 === 0) label = String(d.getDate());
      } else if (d.getDate() === 1 || (i === 0 && d.getDate() < 22)) {
        // the month's name where it starts (the first partial month only if
        // there's room before the next one's)
        label = d.toLocaleDateString(loc, { month: "short", year: "2-digit" });
      }
      if (label) {
        var lab = wpEl("span", "wp-day" + (i === todayIdx ? " wp-day-today" : ""), label);
        lab.style.right = (i * dayW) + "px";
        if (wpState.zoom === "week") lab.style.width = dayW + "px";
        ht.appendChild(lab);
      }
    }
    head.appendChild(ht);
    host.appendChild(head);

    groups.forEach(function (g) {
      if (!wpState.sheetId) {
        var lateCount = g.items.filter(wpIsLate).length;
        var gh = wpEl("div", "wp-group");
        var collapsed = !forPdf && wpState.collapsed[g.sheet.id];
        gh.appendChild(wpEl("span", "", (collapsed ? "◂ " : "▾ ") + g.sheet.name));
        if (lateCount) gh.appendChild(wpEl("em", "", tr("workPlanLateCount").replace("{n}", lateCount)));
        if (!forPdf) {
          gh.addEventListener("click", function () {
            wpState.collapsed[g.sheet.id] = !wpState.collapsed[g.sheet.id];
            renderWorkPlan();
          });
        }
        host.appendChild(gh);
        if (collapsed) return;
      }
      g.items.forEach(function (item) {
        var row = wpEl("div", "wp-row");
        var name = wpEl("div", "wp-name");
        name.appendChild(wpEl("span", "wp-name-text", item.name));
        if (item.by) name.appendChild(wpEl("small", "", item.by));
        row.appendChild(name);
        var t = track();
        var from = Math.max(0, wpDiff(range.start, item.start));
        var to = Math.min(range.days - 1, wpDiff(range.start, item.end));
        if (to >= 0 && from <= range.days - 1) {
          var cls = wpClass(item);
          var bar = wpEl("div", "wp-bar wp-" + cls);
          bar.style.right = (from * dayW + 1) + "px";
          bar.style.width = Math.max(4, (to - from + 1) * dayW - 2) + "px";
          if (item.progress > 0 && item.status !== "done") {
            var fill = wpEl("span", "wp-fill");
            fill.style.width = item.progress + "%";
            bar.appendChild(fill);
          }
          var text = wpState.zoom === "week" ? item.name + (item.by ? " · " + item.by : "") :
            (item.progress > 0 && item.status !== "done" ? item.progress + "%" : "");
          // only where it fits - a sliver of "...%" says nothing
          if (text && (to - from + 1) * dayW >= (wpState.zoom === "week" ? 30 : 34)) bar.appendChild(wpEl("span", "wp-bar-text", text));
          t.appendChild(bar);
        }
        row.appendChild(t);
        if (!forPdf) {
          row.addEventListener("click", function () { openWorkPlanEditor(g.sheet, item); });
        }
        host.appendChild(row);
      });
    });
  }

  function renderWorkPlan() {
    if (workPlanView.hidden) return;
    var groups = wpGroups();
    var range = wpRange(groups);
    workPlanRangeLabel.textContent = wpRangeLabel(range);
    workPlanNav.classList.toggle("wp-nav-off", wpState.zoom === "all");
    document.querySelectorAll(".wp-zoom").forEach(function (b) {
      b.classList.toggle("on", b.getAttribute("data-zoom") === wpState.zoom);
    });
    var late = [].concat.apply([], groups.map(function (g) { return g.items.filter(wpIsLate); }));
    workPlanLateBanner.hidden = !late.length;
    workPlanLateBanner.textContent = "⚠ " + (wpState.sheetId ? tr("workPlanLateBanner") :
      tr("workPlanLateBannerOffice").replace("{p}", groups.filter(function (g) { return g.items.some(wpIsLate); }).length))
      .replace("{n}", late.length);
    var any = groups.some(function (g) { return g.items.length; });
    workPlanEmpty.hidden = any;
    workPlanChart.hidden = !any;
    if (any) wpBuildChart(workPlanChart, groups, range, workPlanChart.clientWidth || window.innerWidth, false);
  }
  function refreshWorkPlanIfOpen() {
    if (!workPlanView.hidden && !wpEditing) renderWorkPlan();
  }

  function openWorkPlan() {
    var sheet = activeSheet();
    if (!sheet) return;
    wpState.sheetId = sheet.id === HEAD_OFFICE_SHEET_ID ? null : sheet.id;
    wpState.anchor = todayISO();
    workPlanTitle.textContent = wpState.sheetId ? tr("workPlanTitle") + " – " + sheet.name : tr("workPlanOfficeTitle");
    workPlanView.hidden = false;
    renderWorkPlan();
  }
  function closeWorkPlan() {
    workPlanView.hidden = true;
  }

  // ---- adding / editing an activity --------------------------------------
  function wpPeopleSuggestions(sheet) {
    var names = [];
    ["crews", "foremen", "engineers", "workers", "operators", "surveyors"].forEach(function (k) {
      officeDirectoryNames(sheet, k).forEach(function (n) { if (names.indexOf(n) === -1) names.push(n); });
    });
    (sheet.workPlan || []).forEach(function (x) { if (x.by && names.indexOf(x.by) === -1) names.push(x.by); });
    return names;
  }
  function wpFillPeople(sheet) {
    wpByList.innerHTML = "";
    wpPeopleSuggestions(sheet).forEach(function (n) {
      var o = document.createElement("option");
      o.value = n;
      wpByList.appendChild(o);
    });
  }
  function wpSetStatus(status) {
    wpEditStatus = status;
    document.querySelectorAll(".wp-status").forEach(function (b) {
      b.classList.toggle("on", b.getAttribute("data-status") === status);
    });
  }
  function wpSetProgress(p) {
    wpProgress.value = String(p);
    wpProgressLabel.textContent = tr("workPlanProgress").replace("{p}", p);
  }

  function openWorkPlanEditor(sheet, item) {
    var isNew = !item;
    var start = wpState.zoom === "month" && wpState.anchor.slice(0, 7) !== todayISO().slice(0, 7) ? wpState.anchor.slice(0, 8) + "01" : todayISO();
    var copy = item ? JSON.parse(JSON.stringify(item)) :
      { id: uid(), name: "", start: start, end: start, by: "", status: "todo", progress: 0, note: "" };
    wpEditing = { sheetId: sheet ? sheet.id : null, item: copy, isNew: isNew };
    wpName.value = copy.name;
    wpStart.value = copy.start;
    wpEnd.value = copy.end;
    wpBy.value = copy.by || "";
    wpNote.value = copy.note || "";
    wpSetStatus(copy.status || "todo");
    wpSetProgress(copy.progress || 0);
    // Head Office adding: which project
    wpProjectRow.hidden = !(isNew && !wpState.sheetId);
    if (!wpProjectRow.hidden) {
      wpProject.innerHTML = "";
      officeReportSheets().slice().sort(compareSheetNames).forEach(function (s) {
        var o = document.createElement("option");
        o.value = s.id;
        o.textContent = s.name;
        wpProject.appendChild(o);
      });
      wpEditing.sheetId = wpProject.value;
    }
    var peopleSheet = allSheets().find(function (s) { return s.id === wpEditing.sheetId; });
    if (peopleSheet) wpFillPeople(peopleSheet);
    wpDeleteBtn.hidden = isNew;
    document.getElementById("workPlanEditTitle").textContent = tr(isNew ? "workPlanAddTitle" : "workPlanEditTitle");
    wpEditOverlay.hidden = false;
    if (isNew) wpName.focus();
  }
  function closeWorkPlanEditor() {
    wpEditOverlay.hidden = true;
    wpEditing = null;
    renderWorkPlan();
  }

  // Applies one activity's change (or its removal) to a project's plan -
  // locally right away, and for a shared project onto the server's fresh
  // copy (other members' edits in between are kept).
  function saveWorkPlanItem(sheet, item, remove) {
    var apply = function (list) {
      var out = (list || []).filter(function (x) { return x.id !== item.id; });
      if (!remove) out.push(item);
      return out;
    };
    sheet.workPlan = apply(sheet.workPlan);
    if (!sheet.shared) {
      saveData();
      return;
    }
    if (!supabaseClient) return;
    updateSharedSheetDataSafely(sheet.id, function (current) {
      return Object.assign({}, current, { workPlan: apply(current.workPlan) });
    }).then(function (newData) {
      var live = sharedSheets.find(function (s) { return s.id === sheet.id; });
      if (live) live.workPlan = newData.workPlan || [];
      refreshWorkPlanIfOpen();
    }, function () {
      alert(tr("workPlanSaveError"));
    });
  }

  document.getElementById("workPlanEditForm").addEventListener("submit", function (e) {
    e.preventDefault();
    if (!wpEditing) return;
    var sheet = allSheets().find(function (s) { return s.id === wpEditing.sheetId; });
    var name = wpName.value.replace(/\s+/g, " ").trim();
    if (!sheet || !name || !wpStart.value) return;
    var end = wpEnd.value && wpEnd.value >= wpStart.value ? wpEnd.value : wpStart.value;
    var progress = parseInt(wpProgress.value, 10) || 0;
    var item = Object.assign(wpEditing.item, {
      name: name,
      start: wpStart.value,
      end: end,
      by: wpBy.value.replace(/\s+/g, " ").trim(),
      status: wpEditStatus,
      progress: wpEditStatus === "done" ? 100 : progress,
      note: wpNote.value.trim(),
      updatedBy: myPhoneNumber || null,
      updatedAt: Date.now()
    });
    saveWorkPlanItem(sheet, item, false);
    closeWorkPlanEditor();
  });
  wpDeleteBtn.addEventListener("click", function () {
    if (!wpEditing) return;
    var editing = wpEditing;
    askConfirm(tr("workPlanDeleteConfirm"), function () {
      var sheet = allSheets().find(function (s) { return s.id === editing.sheetId; });
      if (sheet) saveWorkPlanItem(sheet, editing.item, true);
      closeWorkPlanEditor();
    });
  });
  document.getElementById("wpCancelBtn").addEventListener("click", closeWorkPlanEditor);
  wpStart.addEventListener("change", function () {
    if (!wpEnd.value || wpEnd.value < wpStart.value) wpEnd.value = wpStart.value;
  });
  wpProject.addEventListener("change", function () {
    if (!wpEditing) return;
    wpEditing.sheetId = wpProject.value;
    var s = allSheets().find(function (x) { return x.id === wpProject.value; });
    if (s) wpFillPeople(s);
  });
  document.querySelectorAll(".wp-status").forEach(function (b) {
    b.addEventListener("click", function () {
      var status = b.getAttribute("data-status");
      wpSetStatus(status);
      if (status === "done") wpSetProgress(100);
      else if (status === "todo") wpSetProgress(0);
    });
  });
  wpProgress.addEventListener("input", function () {
    var p = parseInt(wpProgress.value, 10) || 0;
    wpSetProgress(p);
    if (p === 100) wpSetStatus("done");
    else if (p > 0) wpSetStatus("prog");
  });

  // ---- PDF -------------------------------------------------------------
  // The chart as on screen (the current week / month / whole plan), drawn
  // wide on landscape A4 pages.
  function workPlanPdf() {
    var groups = wpGroups();
    var range = wpRange(groups);
    var sheet = wpState.sheetId && allSheets().find(function (s) { return s.id === wpState.sheetId; });
    var title = sheet ? tr("workPlanTitle") + " – " + sheet.name : tr("workPlanOfficeTitle");
    var fileName = title + " " + isoToFileNameDate(todayISO()) + ".pdf";
    showToast(tr("workPlanPdfMsg"));
    var ready = (window.html2canvas && window.jspdf) ? Promise.resolve() : Promise.all([
      window.html2canvas ? Promise.resolve() : loadScriptOnce("vendor/html2canvas.min.js"),
      window.jspdf ? Promise.resolve() : loadScriptOnce("vendor/jspdf.umd.min.js")
    ]);
    ready.then(function () {
      var wrap = wpEl("div", "wp-pdf");
      wrap.dir = "rtl";
      wrap.style.cssText = "position:fixed;top:0;left:-99999px;width:1100px;background:#fff;padding:24px;";
      wrap.appendChild(wpEl("h1", "wp-pdf-title", title));
      wrap.appendChild(wpEl("div", "wp-pdf-range", wpRangeLabel(range)));
      var chart = wpEl("div", "wp-chart wp-chart-pdf");
      wrap.appendChild(chart);
      var legend = document.querySelector("#workPlanView .wp-legend").cloneNode(true);
      wrap.appendChild(legend);
      document.body.appendChild(wrap);
      var collapsedBefore = wpState.collapsed;
      wpBuildChart(chart, groups, range, 1052, true);
      wpState.collapsed = collapsedBefore;
      return window.html2canvas(wrap, { scale: 2, backgroundColor: "#ffffff" }).then(function (canvas) {
        document.body.removeChild(wrap);
        var pdf = new window.jspdf.jsPDF({ unit: "mm", format: "a4", orientation: "landscape" });
        var pw = pdf.internal.pageSize.getWidth(), ph = pdf.internal.pageSize.getHeight();
        var imgH = canvas.height * pw / canvas.width;
        var img = canvas.toDataURL("image/jpeg", 0.92);
        for (var y = 0; y < imgH; y += ph) {
          if (y > 0) pdf.addPage("a4", "landscape");
          pdf.addImage(img, "JPEG", 0, -y, pw, imgH);
        }
        attemptShare(pdf.output("blob"), fileName, "application/pdf");
      }, function (err) {
        if (wrap.parentNode) document.body.removeChild(wrap);
        throw err;
      });
    }).catch(function (err) {
      console.error("work plan pdf failed:", err);
      alert(tr("workPlanSaveError"));
    });
  }

  // ---- wiring ------------------------------------------------------------
  workPlanBtn.addEventListener("click", openWorkPlan);
  document.getElementById("workPlanBackBtn").addEventListener("click", closeWorkPlan);
  document.getElementById("workPlanAddBtn").addEventListener("click", function () {
    var sheet = wpState.sheetId && allSheets().find(function (s) { return s.id === wpState.sheetId; });
    if (!wpState.sheetId && !officeReportSheets().length) return;
    openWorkPlanEditor(sheet || null, null);
  });
  document.getElementById("workPlanPdfBtn").addEventListener("click", workPlanPdf);
  document.querySelectorAll(".wp-zoom").forEach(function (b) {
    b.addEventListener("click", function () {
      wpState.zoom = b.getAttribute("data-zoom");
      renderWorkPlan();
    });
  });
  function wpStep(dir) {
    if (wpState.zoom === "week") wpState.anchor = addDaysToISO(wpState.anchor, 7 * dir);
    else if (wpState.zoom === "month") {
      var d = wpDate(wpState.anchor);
      wpState.anchor = wpIso(new Date(d.getFullYear(), d.getMonth() + dir, 1, 12));
    }
    renderWorkPlan();
  }
  // RTL: the right arrow (earlier) comes first
  document.getElementById("workPlanPrevBtn").addEventListener("click", function () { wpStep(-1); });
  document.getElementById("workPlanNextBtn").addEventListener("click", function () { wpStep(1); });
  document.getElementById("workPlanTodayBtn").addEventListener("click", function () {
    wpState.anchor = todayISO();
    renderWorkPlan();
  });
  window.addEventListener("resize", refreshWorkPlanIfOpen);
