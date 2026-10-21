
  // ---------------------------------------------------------------------
  // Work plan stage 3: planned vs. done in the work diary, notices about
  // late / starting activities, copying a week, postponing (optionally
  // everything after), and "starts after" dependencies.
  // ---------------------------------------------------------------------

  // ---- planned vs. done in the diary -----------------------------------
  // The day's log keeps planned: [{ itemId, name, by, result done|partial|
  // not, reason }] - a snapshot, so the diary still says what was planned
  // even if the plan changes later. Marking also updates the plan.
  var siteLogPlanView = document.getElementById("siteLogPlanView");
  var siteLogPlanList = document.getElementById("siteLogPlanList");
  var WP_RESULTS = [
    { key: "done", mark: "✓", label: "workPlanResultDone" },
    { key: "partial", mark: "½", label: "workPlanResultPartial" },
    { key: "not", mark: "✗", label: "workPlanResultNot" }
  ];

  // What was planned for that day: running then, or late and still open.
  function wpPlannedFor(sheet, dateISO) {
    return wpSorted(sheet.workPlan).filter(function (item) {
      if (item.start > dateISO) return false;
      if (item.end >= dateISO) return true;
      return item.status !== "done";
    });
  }

  function renderSiteLogPlanList() {
    var sheet = activeSheet();
    var dateISO = activeSiteLogDate;
    var log = findSiteLog(sheet, dateISO);
    var entries = (log && log.planned) || [];
    var items = wpPlannedFor(sheet, dateISO);
    // an activity marked that day and since moved/deleted still shows
    entries.forEach(function (e) {
      if (!items.some(function (it) { return it.id === e.itemId; })) items.push({ id: e.itemId, name: e.name, by: e.by, gone: true });
    });
    siteLogPlanList.innerHTML = "";
    if (!items.length) {
      siteLogPlanList.appendChild(wpEl("p", "wp-empty", tr("workPlanNothingPlanned")));
      return;
    }
    items.forEach(function (item) {
      var entry = entries.find(function (e) { return e.itemId === item.id; });
      var row = wpEl("div", "wp-diary-row");
      var head = wpEl("div", "wp-diary-head");
      var name = wpEl("div", "wp-diary-name");
      name.appendChild(wpEl("b", "", item.name));
      if (item.by) name.appendChild(wpEl("small", "", item.by));
      if (!item.gone && wpIsLate(item)) name.appendChild(wpEl("small", "wp-diary-late", tr("workPlanStatusLate")));
      head.appendChild(name);
      var marks = wpEl("div", "wp-diary-marks");
      WP_RESULTS.forEach(function (r) {
        var b = wpEl("button", "wp-diary-mark wp-diary-" + r.key + (entry && entry.result === r.key ? " on" : ""), r.mark);
        b.type = "button";
        b.title = tr(r.label);
        b.setAttribute("data-result", r.key);
        b.addEventListener("click", function () {
          setSiteLogPlanResult(sheet, dateISO, item, entry && entry.result === r.key ? null : r.key);
        });
        marks.appendChild(b);
      });
      head.appendChild(marks);
      row.appendChild(head);
      if (entry && entry.result !== "done") {
        var reason = document.createElement("input");
        reason.type = "text";
        reason.className = "wp-diary-reason";
        reason.maxLength = 120;
        reason.placeholder = tr("workPlanReasonPh");
        reason.value = entry.reason || "";
        reason.addEventListener("change", function () {
          entry.reason = reason.value.replace(/\s+/g, " ").trim();
          saveData();
        });
        row.appendChild(reason);
      }
      siteLogPlanList.appendChild(row);
    });
  }

  function setSiteLogPlanResult(sheet, dateISO, item, result) {
    var log = findOrCreateSiteLog(sheet, dateISO);
    if (!Array.isArray(log.planned)) log.planned = [];
    var entry = log.planned.find(function (e) { return e.itemId === item.id; });
    if (!result) {
      log.planned = log.planned.filter(function (e) { return e !== entry; });
    } else if (entry) {
      entry.result = result;
    } else {
      log.planned.push({ itemId: item.id, name: item.name, by: item.by || "", result: result, reason: "" });
    }
    // the plan follows: done -> הושלם, partly -> בביצוע
    var live = !item.gone && (sheet.workPlan || []).find(function (x) { return x.id === item.id; });
    if (live && result && result !== "not") {
      var status = result === "done" ? "done" : "prog";
      if (live.status !== status) {
        saveWorkPlanItem(sheet, Object.assign({}, live, {
          status: status,
          progress: status === "done" ? 100 : Math.max(live.progress || 0, 10),
          updatedBy: myPhoneNumber || null,
          updatedAt: Date.now()
        }), false);
      }
    }
    saveData();
    renderSiteLogPlanList();
  }

  function openSiteLogPlanView() {
    document.getElementById("siteLogPlanProjectName").textContent = activeSheet().name + " · " + isoToFullDisplay(activeSiteLogDate);
    renderSiteLogPlanList();
    diaryView.hidden = true;
    siteLogPlanView.hidden = false;
  }
  function closeSiteLogPlanView() {
    siteLogPlanView.hidden = true;
    diaryView.hidden = false;
    render();
  }
  document.getElementById("siteLogPlanBtn").addEventListener("click", openSiteLogPlanView);
  document.getElementById("siteLogPlanBackBtn").addEventListener("click", closeSiteLogPlanView);

  function wpResultLabel(result) {
    var r = WP_RESULTS.find(function (x) { return x.key === result; });
    return r ? r.mark + " " + tr(r.label) : "";
  }

  // The diary PDF's "מתוכנן מול ביצוע" table.
  function appendPlannedPdfSection(doc, log) {
    var entries = (log && log.planned) || [];
    if (!entries.length) return;
    doc.appendChild(wpEl("div", "pdf-doc-section-heading", tr("workPlanPlannedVsDone")));
    var table = wpEl("table", "pdf-doc-table");
    var headRow = wpEl("tr");
    ["workPlanActivity", "workPlanBy", "workPlanResult", "workPlanReason"].forEach(function (k) {
      headRow.appendChild(wpEl("th", "", tr(k)));
    });
    var thead = wpEl("thead");
    thead.appendChild(headRow);
    table.appendChild(thead);
    var tbody = wpEl("tbody");
    entries.forEach(function (e) {
      var tr_ = wpEl("tr");
      tr_.appendChild(wpEl("td", "", e.name));
      tr_.appendChild(wpEl("td", "", e.by || ""));
      tr_.appendChild(wpEl("td", "wp-pdf-result-" + e.result, wpResultLabel(e.result)));
      tr_.appendChild(wpEl("td", "", e.reason || ""));
      tbody.appendChild(tr_);
    });
    table.appendChild(tbody);
    doc.appendChild(table);
  }

  // The periodic report's summary page: how much of the plan got done,
  // and the reasons for what didn't.
  function buildPlannedSummaryElement(sheet, logs, from, to) {
    var entries = [].concat.apply([], logs.map(function (l) { return l.planned || []; }));
    if (!entries.length) return null;
    var count = function (r) { return entries.filter(function (e) { return e.result === r; }).length; };
    var doc = wpEl("div", "pdf-doc");
    doc.dir = RTL_LANGS[currentLang] ? "rtl" : "ltr";
    doc.appendChild(buildPdfDocTitleElement(sheet, sheet.name));
    doc.appendChild(wpEl("div", "pdf-doc-info-title", tr("workPlanPlannedVsDone")));
    doc.appendChild(wpEl("div", "pdf-doc-info-date", isoToFullDisplay(from) + " – " + isoToFullDisplay(to)));
    doc.appendChild(wpEl("div", "wp-pdf-summary", tr("workPlanSummaryLine")
      .replace("{n}", entries.length).replace("{done}", count("done"))
      .replace("{partial}", count("partial")).replace("{not}", count("not"))));
    var reasons = {};
    entries.forEach(function (e) {
      if (e.result === "done" || !e.reason) return;
      var key = e.reason.trim();
      reasons[key] = (reasons[key] || 0) + 1;
    });
    var keys = Object.keys(reasons).sort(function (a, b) { return reasons[b] - reasons[a]; });
    if (keys.length) {
      doc.appendChild(wpEl("div", "pdf-doc-section-heading", tr("workPlanReasons")));
      var table = wpEl("table", "pdf-doc-table");
      keys.forEach(function (k) {
        var row = wpEl("tr");
        row.appendChild(wpEl("td", "", k));
        row.appendChild(wpEl("td", "", String(reasons[k])));
        table.appendChild(row);
      });
      doc.appendChild(table);
    }
    return doc;
  }

  // ---- copying a week, postponing ----------------------------------------
  var wpCopyWeekBtn = document.getElementById("workPlanCopyWeekBtn");
  wpCopyWeekBtn.addEventListener("click", function () {
    var groups = wpGroups();
    var range = wpRange(groups);
    var weekEnd = addDaysToISO(range.start, 6);
    var toCopy = [];
    groups.forEach(function (g) {
      g.items.forEach(function (item) {
        if (item.start <= weekEnd && item.end >= range.start) toCopy.push({ sheet: g.sheet, item: item });
      });
    });
    if (!toCopy.length) { showToast(tr("workPlanNothingToCopy")); return; }
    askConfirm(tr("workPlanCopyWeekConfirm").replace("{n}", toCopy.length), function () {
      toCopy.forEach(function (c) {
        saveWorkPlanItem(c.sheet, Object.assign({}, c.item, {
          id: uid(), start: addDaysToISO(c.item.start, 7), end: addDaysToISO(c.item.end, 7),
          status: "todo", progress: 0, after: null, updatedBy: myPhoneNumber || null, updatedAt: Date.now()
        }), false);
      });
      wpState.anchor = addDaysToISO(wpState.anchor, 7);
      renderWorkPlan();
      showToast(tr("workPlanCopiedMsg").replace("{n}", toCopy.length));
    });
  });

  // Moves activities by `days`, keeping each one's length.
  function wpShift(item, days) {
    return Object.assign({}, item, {
      start: addDaysToISO(item.start, days), end: addDaysToISO(item.end, days),
      updatedBy: myPhoneNumber || null, updatedAt: Date.now()
    });
  }

  var wpPostponeRow = document.getElementById("wpPostponeRow");
  var wpPostponeDays = document.getElementById("wpPostponeDays");
  var wpPostponeFollowing = document.getElementById("wpPostponeFollowing");
  document.getElementById("wpPostponeBtn").addEventListener("click", function () {
    wpPostponeRow.hidden = !wpPostponeRow.hidden;
    if (!wpPostponeRow.hidden) wpPostponeDays.focus();
  });
  document.getElementById("wpPostponeApplyBtn").addEventListener("click", function () {
    if (!wpEditing) return;
    var days = parseInt(wpPostponeDays.value, 10);
    if (!days) return;
    var sheet = allSheets().find(function (s) { return s.id === wpEditing.sheetId; });
    if (!sheet) return;
    var original = (sheet.workPlan || []).find(function (x) { return x.id === wpEditing.item.id; });
    var fromStart = original ? original.start : wpStart.value;
    // the form shows the new dates; saving keeps whatever else was edited
    wpStart.value = addDaysToISO(wpStart.value, days);
    wpEnd.value = addDaysToISO(wpEnd.value || wpStart.value, days);
    if (wpPostponeFollowing.checked && original) {
      (sheet.workPlan || []).forEach(function (x) {
        if (x.id === original.id || x.status === "done" || x.start < fromStart) return;
        saveWorkPlanItem(sheet, wpShift(x, days), false);
      });
    }
    wpPostponeRow.hidden = true;
    document.getElementById("workPlanEditForm").requestSubmit();
  });

  // ---- "starts after" ------------------------------------------------------
  var wpAfter = document.getElementById("wpAfter");
  function wpFillAfterOptions(sheet, item) {
    wpAfter.innerHTML = "";
    var none = document.createElement("option");
    none.value = "";
    none.textContent = tr("workPlanAfterNone");
    wpAfter.appendChild(none);
    wpSorted(sheet ? sheet.workPlan : []).forEach(function (x) {
      if (x.id === item.id) return;
      var o = document.createElement("option");
      o.value = x.id;
      o.textContent = x.name;
      wpAfter.appendChild(o);
    });
    wpAfter.value = item.after || "";
  }
  wpAfter.addEventListener("change", function () {
    // a dependency picks the start: the day after the one it follows
    var sheet = wpEditing && allSheets().find(function (s) { return s.id === wpEditing.sheetId; });
    var pred = sheet && (sheet.workPlan || []).find(function (x) { return x.id === wpAfter.value; });
    if (!pred) return;
    var len = Math.max(0, wpDiff(wpStart.value, wpEnd.value || wpStart.value));
    var start = addDaysToISO(pred.end, 1);
    if (wpStart.value < start) {
      wpStart.value = start;
      wpEnd.value = addDaysToISO(start, len);
    }
  });

  // After an activity is saved: the ones that start after it and now
  // overlap it are offered to move along (and theirs after them).
  function wpCascadeDependents(sheet, item) {
    var moves = [];
    var byId = {};
    (sheet.workPlan || []).forEach(function (x) { byId[x.id] = Object.assign({}, x); });
    byId[item.id] = item;
    var queue = [item.id];
    while (queue.length) {
      var pred = byId[queue.shift()];
      Object.keys(byId).forEach(function (id) {
        var x = byId[id];
        if (x.after !== pred.id || x.status === "done" || x.start > pred.end) return;
        var days = wpDiff(x.start, addDaysToISO(pred.end, 1));
        byId[id] = wpShift(x, days);
        moves.push(byId[id]);
        queue.push(id);
      });
    }
    if (!moves.length) return;
    askConfirm(tr("workPlanCascadeConfirm").replace("{name}", item.name)
      .replace("{list}", moves.map(function (m) { return m.name; }).join(", ")), function () {
      moves.forEach(function (m) { saveWorkPlanItem(sheet, m, false); });
      renderWorkPlan();
    });
  }

  // Arrows from each activity's end to the start of the one after it.
  function wpDrawDependencies(host) {
    var old = host.querySelector(".wp-deps");
    if (old) old.remove();
    var bars = {};
    host.querySelectorAll(".wp-bar[data-id]").forEach(function (b) { bars[b.getAttribute("data-id")] = b; });
    var hostBox = host.getBoundingClientRect();
    var lines = [];
    host.querySelectorAll(".wp-bar[data-after]").forEach(function (b) {
      var pred = bars[b.getAttribute("data-after")];
      if (!pred) return;
      var p = pred.getBoundingClientRect(), d = b.getBoundingClientRect();
      var ox = host.scrollLeft - hostBox.left, oy = host.scrollTop - hostBox.top;
      var x1 = p.left + ox, y1 = p.top + p.height / 2 + oy;
      var x2 = d.right + ox, y2 = d.top + d.height / 2 + oy;
      lines.push("M" + x1 + "," + y1 + " h-5 V" + y2 + " H" + (x2 + 4));
    });
    if (!lines.length) return;
    var ns = "http://www.w3.org/2000/svg";
    var svg = document.createElementNS(ns, "svg");
    svg.setAttribute("class", "wp-deps");
    svg.setAttribute("width", host.scrollWidth);
    svg.setAttribute("height", host.scrollHeight);
    svg.innerHTML = '<defs><marker id="wpArrow" markerWidth="6" markerHeight="6" refX="5" refY="3" orient="auto"><path d="M0,0 L6,3 L0,6 z" fill="#5b6b7d"/></marker></defs>' +
      lines.map(function (d) { return '<path d="' + d + '" fill="none" stroke="#5b6b7d" stroke-width="1.4" marker-end="url(#wpArrow)"/>'; }).join("");
    host.appendChild(svg);
  }

  // ---- notices ------------------------------------------------------------
  // Quiet phone notifications (ItaskAlarm alarms with quiet:true - app
  // version 22+, which says so through features()): the morning after an
  // activity should have ended and isn't done, and the afternoon before one
  // starts. Head Office gets one morning summary instead of each project's.
  var WP_NOTIFY_LATE_KEY = "itask-plan-notify-late";
  var WP_NOTIFY_START_KEY = "itask-plan-notify-start";
  function wpNotifyOn(key) {
    try { return localStorage.getItem(key) !== "off"; } catch (e) { return true; }
  }
  var wpQuietAlarmsSupported = null; // unknown until features() answers
  if (nativeTaskAlarmPlugin && nativeTaskAlarmPlugin.features) {
    nativeTaskAlarmPlugin.features().then(function (f) {
      wpQuietAlarmsSupported = !!(f && f.quietAlarms);
      if (wpQuietAlarmsSupported) { lastNativeTaskAlarmsJson = null; syncNativeTaskAlarms(); }
    }, function () { wpQuietAlarmsSupported = false; });
  }
  function wpAt(dateISO, hour) {
    var d = wpDate(dateISO);
    d.setHours(hour, 0, 0, 0);
    return d.getTime();
  }
  function workPlanNativeAlarms() {
    if (!wpQuietAlarmsSupported) return [];
    var now = Date.now();
    var alarms = [];
    var late = wpNotifyOn(WP_NOTIFY_LATE_KEY), soon = wpNotifyOn(WP_NOTIFY_START_KEY);
    var officeSheets = isHeadOfficeMode ? officeReportSheets().map(function (s) { return s.id; }) : [];
    allSheets().forEach(function (sheet) {
      if (sheet.ended || sheet.id === HEAD_OFFICE_SHEET_ID) return;
      var summarised = officeSheets.indexOf(sheet.id) !== -1;
      (sheet.workPlan || []).forEach(function (item) {
        if (item.status === "done") return;
        var title = tr("workPlanTitle") + " – " + sheet.name;
        var lateAt = wpAt(addDaysToISO(item.end, 1), 8);
        if (late && !summarised && lateAt > now) {
          alarms.push({ id: "plan-late:" + sheet.id + ":" + item.id, title: title, quiet: true, at: lateAt,
            body: tr("workPlanNoticeLate").replace("{name}", item.name).replace("{date}", isoToDisplay(item.end)) });
        }
        var startAt = wpAt(addDaysToISO(item.start, -1), 16);
        if (soon && item.status === "todo" && startAt > now) {
          alarms.push({ id: "plan-start:" + sheet.id + ":" + item.id, title: title, quiet: true, at: startAt,
            body: tr("workPlanNoticeStart").replace("{name}", item.name + (item.by ? ", " + item.by : "")) });
        }
      });
    });
    if (late && officeSheets.length) {
      // the next 08:00, counting what will be late by then
      var next = new Date();
      if (next.getHours() >= 8) next.setDate(next.getDate() + 1);
      var nextISO = wpIso(next);
      var lateItems = 0, lateProjects = 0;
      officeReportSheets().forEach(function (s) {
        var n = (s.workPlan || []).filter(function (x) { return x.status !== "done" && x.end < nextISO; }).length;
        lateItems += n;
        if (n) lateProjects++;
      });
      if (lateItems) {
        alarms.push({ id: "plan-office:" + nextISO, title: tr("workPlanOfficeTitle"), quiet: true, at: wpAt(nextISO, 8),
          body: tr("workPlanLateBannerOffice").replace("{n}", lateItems).replace("{p}", lateProjects) });
      }
    }
    return alarms;
  }

  // In the app itself (web and phone alike): once a day, a note when
  // activities are late.
  var WP_LATE_TOAST_KEY = "itask-plan-late-toast";
  function maybeShowWorkPlanLateToast() {
    if (!wpNotifyOn(WP_NOTIFY_LATE_KEY) || dataLoadBlocked) return;
    var today = todayISO();
    try { if (localStorage.getItem(WP_LATE_TOAST_KEY) === today) return; } catch (e) { return; }
    var n = 0;
    allSheets().forEach(function (s) {
      if (s.ended || s.id === HEAD_OFFICE_SHEET_ID) return;
      n += (s.workPlan || []).filter(wpIsLate).length;
    });
    if (!n) return;
    try { localStorage.setItem(WP_LATE_TOAST_KEY, today); } catch (e) {}
    showToast("⚠ " + tr("workPlanLateBanner").replace("{n}", n), 4000);
  }

  // ---- settings: the two notice switches --------------------------------
  [["wpNotifyLateToggle", WP_NOTIFY_LATE_KEY], ["wpNotifyStartToggle", WP_NOTIFY_START_KEY]].forEach(function (pair) {
    var el = document.getElementById(pair[0]);
    if (!el) return;
    el.checked = wpNotifyOn(pair[1]);
    el.addEventListener("change", function () {
      try { localStorage.setItem(pair[1], el.checked ? "on" : "off"); } catch (e) {}
      lastNativeTaskAlarmsJson = null;
      syncNativeTaskAlarms();
    });
  });
