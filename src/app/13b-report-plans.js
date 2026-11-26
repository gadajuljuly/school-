  // ---------------------------------------------------------------------
  // A tour report's defects on the plan (סיכום פגישות וסיורים, a tour):
  //  - each row can have a place on a plan: report.plans [{ id, name,
  //    image (a JPEG data URL), w, h }], the one in use report.planId, and
  //    row.loc { planId, x, y } (0..1 across / down the plan). The table's
  //    "מיקום" column shows the row's numbered pin (its colour: the row's
  //    status); a tap opens the plan, where a tap marks the place.
  //  - 👷 "שליחה לפי אחראי": a PDF per responsible person, only their rows
  //    (by default only what isn't done) and the plan with their pins.
  //  - a new tour offers to copy the rows the previous tour left undone
  //    (with their place, picture and plan).
  // The report's own table and PDF: 13-meeting-reports-pdf.js.
  // ---------------------------------------------------------------------
  var PLAN_MAX_SIDE = 1600;

  function reportPlan(report, planId) {
    return ((report && report.plans) || []).find(function (p) { return p.id === planId; }) || null;
  }
  function pinStatusClass(status) {
    return status === 2 ? "pin-done" : status === 1 ? "pin-partial" : "pin-open";
  }
  // a numbered pin (the table, the plan, the PDF)
  function makePin(number, status, extraClass) {
    var pin = document.createElement("span");
    pin.className = "report-pin " + pinStatusClass(status) + (extraClass ? " " + extraClass : "");
    var n = document.createElement("span");
    n.textContent = String(number);
    pin.appendChild(n);
    return pin;
  }

  // the table's "מיקום" cell (a tour only)
  function buildReportLocationCell(report, row, index) {
    var td = document.createElement("td");
    td.className = "report-col-location";
    var btn = document.createElement("button");
    btn.type = "button";
    btn.className = "report-loc-btn";
    btn.title = tr("reportColLocation");
    if (row.loc && reportPlan(report, row.loc.planId)) btn.appendChild(makePin(index + 1, row.status));
    else btn.innerHTML = '<span class="report-loc-empty">&#128205;</span>';
    btn.addEventListener("click", function (e) {
      e.stopPropagation();
      openRowLocation(row.id);
    });
    td.appendChild(btn);
    return td;
  }
  function reportShowsLocations(report) { return !!report && report.type === "tour"; }

  // ---- the plan view ------------------------------------------------------------
  var reportPlanView = document.getElementById("reportPlanView");
  var reportPlanStage = document.getElementById("reportPlanStage");
  var reportPlanInner = document.getElementById("reportPlanInner");
  var reportPlanImg = document.getElementById("reportPlanImg");
  var reportPlanHint = document.getElementById("reportPlanHint");
  var planView = { reportId: null, rowId: null, planId: null, z: 1, tx: 0, ty: 0, w: 0, h: 0 };

  function planViewRow() {
    var report = findReport(planView.reportId);
    var row = report && report.rows.find(function (r) { return r.id === planView.rowId; });
    return { report: report, row: row, index: report && row ? report.rows.indexOf(row) : -1 };
  }

  function openRowLocation(rowId) {
    var report = findReport(activeReportId);
    if (!report) return;
    var row = report.rows.find(function (r) { return r.id === rowId; });
    if (!row) return;
    var plan = (row.loc && reportPlan(report, row.loc.planId)) || reportPlan(report, report.planId) || (report.plans || [])[0];
    if (plan) { showPlanView(report.id, rowId, plan.id); return; }
    // no plan yet: choose one first
    openPlanPicker(report, function (picked) { showPlanView(report.id, rowId, picked.id); });
  }

  function showPlanView(reportId, rowId, planId) {
    planView.reportId = reportId;
    planView.rowId = rowId;
    planView.planId = planId;
    var ctx = planViewRow();
    var plan = reportPlan(ctx.report, planId);
    if (!ctx.row || !plan) return;
    document.getElementById("reportPlanTitle").textContent = tr("reportPlanTitle").replace("{n}", ctx.index + 1);
    document.getElementById("reportPlanName").textContent = "📄 " + plan.name;
    reportPlanHint.innerHTML = "";
    reportPlanHint.appendChild(document.createTextNode(tr("reportPlanHint")));
    if (ctx.row.task) {
      reportPlanHint.appendChild(document.createElement("br"));
      var b = document.createElement("b");
      b.textContent = ctx.row.task;
      reportPlanHint.appendChild(b);
    }
    reportPlanView.hidden = false;
    reportPlanImg.onload = function () { fitPlan(plan); };
    reportPlanImg.src = plan.image;
    if (reportPlanImg.complete && reportPlanImg.naturalWidth) fitPlan(plan);
    updatePlanRemoveBtn();
  }
  function closePlanView() {
    reportPlanView.hidden = true;
    planView.rowId = null;
    if (activeReportId) renderReportView();
  }
  document.getElementById("reportPlanBackBtn").addEventListener("click", closePlanView);
  function updatePlanRemoveBtn() {
    var ctx = planViewRow();
    document.getElementById("reportPlanRemoveBtn").hidden = !(ctx.row && ctx.row.loc);
  }
  document.getElementById("reportPlanRemoveBtn").addEventListener("click", function () {
    var ctx = planViewRow();
    if (!ctx.row) return;
    delete ctx.row.loc;
    saveData();
    drawPlanPins();
    updatePlanRemoveBtn();
  });
  document.getElementById("reportPlanSwitchBtn").addEventListener("click", function () {
    var ctx = planViewRow();
    if (!ctx.report) return;
    openPlanPicker(ctx.report, function (picked) { showPlanView(ctx.report.id, ctx.row.id, picked.id); });
  });

  // the whole plan in sight (zoom 1); its pins
  function fitPlan(plan) {
    var r = reportPlanStage.getBoundingClientRect();
    var iw = reportPlanImg.naturalWidth || plan.w || 1;
    var ih = reportPlanImg.naturalHeight || plan.h || 1;
    var k = Math.min(r.width / iw, r.height / ih);
    planView.w = iw * k;
    planView.h = ih * k;
    planView.z = 1;
    planView.tx = (r.width - planView.w) / 2;
    planView.ty = (r.height - planView.h) / 2;
    reportPlanInner.style.width = planView.w + "px";
    reportPlanInner.style.height = planView.h + "px";
    applyPlanTransform();
    drawPlanPins();
  }
  function applyPlanTransform() {
    reportPlanInner.style.transform = "translate(" + planView.tx + "px," + planView.ty + "px) scale(" + planView.z + ")";
    // the pins stay the same size on the screen whatever the zoom
    Array.prototype.forEach.call(reportPlanInner.querySelectorAll(".report-pin"), function (p) {
      // (the tip - 17px below the pin's middle once turned - on the point)
      p.style.transform = "translate(-50%, -50%) scale(" + (1 / planView.z) + ") translateY(-17px) rotate(-45deg)";
    });
  }
  function drawPlanPins() {
    Array.prototype.forEach.call(reportPlanInner.querySelectorAll(".report-pin"), function (p) { p.remove(); });
    var ctx = planViewRow();
    if (!ctx.report) return;
    ctx.report.rows.forEach(function (row, i) {
      if (!row.loc || row.loc.planId !== planView.planId) return;
      var pin = makePin(i + 1, row.status, row.id === planView.rowId ? "report-pin-current" : "");
      pin.style.left = (row.loc.x * 100) + "%";
      pin.style.top = (row.loc.y * 100) + "%";
      reportPlanInner.appendChild(pin);
    });
    applyPlanTransform();
  }
  // a tap on the plan: this row's place
  function placePinAt(clientX, clientY) {
    var ctx = planViewRow();
    if (!ctx.row || !planView.w) return;
    var r = reportPlanStage.getBoundingClientRect();
    var x = (clientX - r.left - planView.tx) / planView.z / planView.w;
    var y = (clientY - r.top - planView.ty) / planView.z / planView.h;
    if (x < 0 || x > 1 || y < 0 || y > 1) return;
    ctx.row.loc = { planId: planView.planId, x: Math.round(x * 10000) / 10000, y: Math.round(y * 10000) / 10000 };
    ctx.report.planId = planView.planId; // the next row starts on this plan
    saveData();
    drawPlanPins();
    updatePlanRemoveBtn();
    reportPlanHint.textContent = tr("reportPlanPlaced");
  }

  // dragging moves the plan, two fingers (or the wheel) zoom, a tap marks
  var planPointers = {};
  var planGesture = null;
  function planPointerList() { return Object.keys(planPointers).map(function (k) { return planPointers[k]; }); }
  reportPlanStage.addEventListener("pointerdown", function (e) {
    planPointers[e.pointerId] = { x: e.clientX, y: e.clientY };
    try { reportPlanStage.setPointerCapture(e.pointerId); } catch (err) {}
    var pts = planPointerList();
    if (pts.length === 1) {
      planGesture = { kind: "pan", sx: e.clientX, sy: e.clientY, tx: planView.tx, ty: planView.ty, moved: false };
    } else if (pts.length === 2) {
      var a = pts[0], b = pts[1];
      planGesture = {
        kind: "pinch", d: Math.hypot(a.x - b.x, a.y - b.y) || 1, z: planView.z, tx: planView.tx, ty: planView.ty,
        mx: (a.x + b.x) / 2, my: (a.y + b.y) / 2, moved: true
      };
    }
  });
  reportPlanStage.addEventListener("pointermove", function (e) {
    if (!planPointers[e.pointerId] || !planGesture) return;
    planPointers[e.pointerId] = { x: e.clientX, y: e.clientY };
    var r = reportPlanStage.getBoundingClientRect();
    if (planGesture.kind === "pan") {
      var dx = e.clientX - planGesture.sx, dy = e.clientY - planGesture.sy;
      if (!planGesture.moved && Math.hypot(dx, dy) < 8) return;
      planGesture.moved = true;
      planView.tx = planGesture.tx + dx;
      planView.ty = planGesture.ty + dy;
      applyPlanTransform();
    } else {
      var pts = planPointerList();
      if (pts.length < 2) return;
      var a = pts[0], b = pts[1];
      var z = Math.max(1, Math.min(10, planGesture.z * Math.hypot(a.x - b.x, a.y - b.y) / planGesture.d));
      var mx = (a.x + b.x) / 2 - r.left, my = (a.y + b.y) / 2 - r.top;
      var wx = (planGesture.mx - r.left - planGesture.tx) / planGesture.z;
      var wy = (planGesture.my - r.top - planGesture.ty) / planGesture.z;
      planView.z = z;
      planView.tx = mx - wx * z;
      planView.ty = my - wy * z;
      applyPlanTransform();
    }
  });
  function planPointerEnd(e) {
    if (!planPointers[e.pointerId]) return;
    delete planPointers[e.pointerId];
    var left = planPointerList();
    if (planGesture && planGesture.kind === "pan" && !planGesture.moved && !left.length && e.type === "pointerup") {
      placePinAt(e.clientX, e.clientY);
    }
    if (!left.length) planGesture = null;
    else if (left.length === 1) planGesture = { kind: "pan", sx: left[0].x, sy: left[0].y, tx: planView.tx, ty: planView.ty, moved: true };
  }
  reportPlanStage.addEventListener("pointerup", planPointerEnd);
  reportPlanStage.addEventListener("pointercancel", planPointerEnd);
  reportPlanStage.addEventListener("wheel", function (e) {
    e.preventDefault();
    var r = reportPlanStage.getBoundingClientRect();
    var mx = e.clientX - r.left, my = e.clientY - r.top;
    var wx = (mx - planView.tx) / planView.z, wy = (my - planView.ty) / planView.z;
    planView.z = Math.max(1, Math.min(10, planView.z * (e.deltaY < 0 ? 1.15 : 1 / 1.15)));
    planView.tx = mx - wx * planView.z;
    planView.ty = my - wy * planView.z;
    applyPlanTransform();
  }, { passive: false });
  window.addEventListener("resize", function () {
    if (reportPlanView.hidden) return;
    var ctx = planViewRow();
    var plan = reportPlan(ctx.report, planView.planId);
    if (plan) fitPlan(plan);
  });

  // ---- choosing a plan: one already in the report, or a new one -------------------
  var reportPlanPickOverlay = document.getElementById("reportPlanPickOverlay");
  var planPick = { report: null, done: null };
  function openPlanPicker(report, done) {
    planPick = { report: report, done: done };
    var list = document.getElementById("reportPlanPickList");
    list.innerHTML = "";
    (report.plans || []).forEach(function (plan) {
      var b = document.createElement("button");
      b.type = "button";
      b.className = "report-plan-pick" + (plan.id === report.planId ? " current" : "");
      b.textContent = "📄 " + plan.name;
      b.addEventListener("click", function () {
        reportPlanPickOverlay.hidden = true;
        report.planId = plan.id;
        saveData();
        done(plan);
      });
      list.appendChild(b);
    });
    list.hidden = !(report.plans || []).length;
    reportPlanPickOverlay.hidden = false;
  }
  function closePlanPicker() { reportPlanPickOverlay.hidden = true; }
  document.getElementById("reportPlanPickCloseBtn").addEventListener("click", closePlanPicker);
  reportPlanPickOverlay.addEventListener("click", function (e) { if (e.target === reportPlanPickOverlay) closePlanPicker(); });

  // a picture (or a PDF's page) -> a new plan in the report, then on
  function addPlanFromCanvas(canvas, name) {
    var report = planPick.report && findReport(planPick.report.id);
    if (!report) return;
    var k = Math.min(1, PLAN_MAX_SIDE / Math.max(canvas.width, canvas.height));
    var c = document.createElement("canvas");
    c.width = Math.max(1, Math.round(canvas.width * k));
    c.height = Math.max(1, Math.round(canvas.height * k));
    var g = c.getContext("2d");
    g.fillStyle = "#fff";
    g.fillRect(0, 0, c.width, c.height);
    g.drawImage(canvas, 0, 0, c.width, c.height);
    var plan = { id: uid(), name: name || tr("reportPlanDefaultName"), image: c.toDataURL("image/jpeg", 0.75), w: c.width, h: c.height };
    report.plans = (report.plans || []).concat([plan]);
    report.planId = plan.id;
    saveData();
    if (planPick.done) planPick.done(plan);
  }
  function planNameOf(fileName, page, pages) {
    var base = String(fileName || "").replace(/\.[^.]+$/, "") || tr("reportPlanDefaultName");
    return pages > 1 ? base + " - " + tr("sketchPdfPage").replace("{n}", page) : base;
  }
  function isPdfFile(file) { return file.type === "application/pdf" || /\.pdf$/i.test(file.name || ""); }
  function addPlanFromFile(file) {
    if (!file) return;
    if (isPdfFile(file)) {
      pickPdfPageCanvas(file, function (canvas, page, pages) { addPlanFromCanvas(canvas, planNameOf(file.name, page, pages)); });
      return;
    }
    scanLoadImage(file).then(function (canvas) { addPlanFromCanvas(canvas, planNameOf(file.name, 1, 1)); }, function () {
      alert(tr("logoInvalidFileMsg"));
    });
  }
  document.getElementById("reportPlanFromLibraryBtn").addEventListener("click", function () {
    var report = planPick.report;
    if (!report) return;
    closePlanPicker();
    openLibraryFilePicker(findSheetForReport(report) || activeSheet(), tr("reportPlanLibTitle"), function (entry, file) {
      addPlanFromFile(file);
    });
  });
  var reportPlanCameraInput = document.getElementById("reportPlanCameraInput");
  var reportPlanFileInput = document.getElementById("reportPlanFileInput");
  document.getElementById("reportPlanFromCameraBtn").addEventListener("click", function () {
    closePlanPicker();
    reportPlanCameraInput.value = "";
    reportPlanCameraInput.click();
  });
  document.getElementById("reportPlanFromFileBtn").addEventListener("click", function () {
    closePlanPicker();
    reportPlanFileInput.value = "";
    reportPlanFileInput.click();
  });
  [reportPlanCameraInput, reportPlanFileInput].forEach(function (input) {
    input.addEventListener("change", function () { addPlanFromFile(input.files && input.files[0]); });
  });

  // ---- the PDF: the plans with their pins ---------------------------------------
  // (rows: [{ row, number }] - the rows the PDF shows, with their number in
  // the full report, so a pin matches its row)
  function appendReportPlansPdfSection(doc, report, rows) {
    var shown = [];
    rows.forEach(function (x) {
      var plan = x.row.loc && reportPlan(report, x.row.loc.planId);
      if (plan && shown.indexOf(plan) === -1) shown.push(plan);
    });
    shown.forEach(function (plan) {
      var heading = document.createElement("div");
      heading.className = "pdf-doc-section-heading";
      heading.textContent = tr("reportPlanPdfHeading").replace("{name}", plan.name);
      doc.appendChild(heading);
      var box = document.createElement("div");
      box.className = "pdf-doc-plan";
      var img = document.createElement("img");
      img.src = plan.image;
      box.appendChild(img);
      rows.forEach(function (x) {
        if (!x.row.loc || x.row.loc.planId !== plan.id) return;
        var pin = makePin(x.number, x.row.status);
        pin.style.left = (x.row.loc.x * 100) + "%";
        pin.style.top = (x.row.loc.y * 100) + "%";
        box.appendChild(pin);
      });
      doc.appendChild(box);
    });
  }

  // ---- 👷 שליחה לפי אחראי ------------------------------------------------------
  var reportByRespOverlay = document.getElementById("reportByRespOverlay");
  var reportByRespList = document.getElementById("reportByRespList");
  var reportByRespOpenOnly = document.getElementById("reportByRespOpenOnly");
  var byRespBuild = 0;
  function responsibleKey(row) { return (row.responsible || "").trim(); }
  function reportResponsibleGroups(report) {
    var groups = [];
    report.rows.forEach(function (row) {
      var key = responsibleKey(row);
      var g = groups.find(function (x) { return x.key === key; });
      if (!g) { g = { key: key, notDone: 0, partial: 0, done: 0 }; groups.push(g); }
      if (row.status === 2) g.done++;
      else if (row.status === 1) g.partial++;
      else g.notDone++;
    });
    // the unassigned last
    return groups.filter(function (g) { return g.key; }).concat(groups.filter(function (g) { return !g.key; }));
  }
  function reportByRespFileName(report, key) {
    var typeLabel = report.type === "meeting" ? tr("reportTypeMeeting") : tr("reportTypeTour");
    return (report.title || typeLabel) + " - " + (key || tr("reportByRespNone")) + ".pdf";
  }
  function openReportByResp() {
    var report = findReport(activeReportId);
    if (!report) return;
    renderReportByResp(report);
    reportByRespOverlay.hidden = false;
  }
  function renderReportByResp(report) {
    var build = ++byRespBuild;
    var openOnly = reportByRespOpenOnly.checked;
    reportByRespList.innerHTML = "";
    var groups = reportResponsibleGroups(report);
    if (!groups.length) {
      reportByRespList.appendChild(Object.assign(document.createElement("div"), { className: "report-by-resp-empty", textContent: tr("reportByRespEmpty") }));
      return;
    }
    var queue = [];
    groups.forEach(function (g) {
      var row = document.createElement("div");
      row.className = "report-by-resp-row";
      var name = document.createElement("span");
      name.className = "report-by-resp-name";
      name.textContent = g.key || tr("reportByRespNone");
      row.appendChild(name);
      var counts = document.createElement("span");
      counts.className = "report-by-resp-counts";
      var shownCount = openOnly ? g.notDone + g.partial : g.notDone + g.partial + g.done;
      if (!g.notDone && !g.partial) counts.textContent = tr("reportByRespAllDone");
      else {
        var parts = [];
        if (g.notDone) parts.push(tr("reportByRespNotDone").replace("{n}", g.notDone));
        if (g.partial) parts.push(tr("reportByRespPartial").replace("{n}", g.partial));
        counts.textContent = parts.join(" · ");
      }
      row.appendChild(counts);
      if (shownCount) {
        var send = document.createElement("button");
        send.type = "button";
        send.className = "report-by-resp-send";
        send.disabled = true;
        send.innerHTML = "&#8987;";
        row.appendChild(send);
        queue.push({ key: g.key, btn: send });
      } else {
        row.classList.add("all-done");
      }
      reportByRespList.appendChild(row);
    });
    // each one's PDF made ahead, one after another, so a tap shares it at
    // once (sharing after the slow work loses the tap's permission)
    (function next(i) {
      if (i >= queue.length || build !== byRespBuild) return;
      var item = queue[i];
      var fileName = reportByRespFileName(report, item.key);
      buildPdfBlobFromElement(buildReportPdfElement(report, { responsible: item.key, openOnly: openOnly }), fileName).then(function (result) {
        if (build !== byRespBuild) return;
        item.btn.disabled = false;
        item.btn.textContent = tr("reportByRespSend");
        item.btn.onclick = function () { attemptShare(result.blob, result.fileName); };
        next(i + 1);
      }).catch(function (err) {
        console.error(err);
        if (build !== byRespBuild) return;
        item.btn.disabled = false;
        item.btn.textContent = tr("reportByRespSend");
        item.btn.onclick = function () { alert(tr("reportPdfError")); };
        next(i + 1);
      });
    })(0);
  }
  function closeReportByResp() {
    reportByRespOverlay.hidden = true;
    byRespBuild++;
  }
  document.getElementById("reportByRespBtn").addEventListener("click", openReportByResp);
  document.getElementById("reportByRespCloseBtn").addEventListener("click", closeReportByResp);
  reportByRespOverlay.addEventListener("click", function (e) { if (e.target === reportByRespOverlay) closeReportByResp(); });
  reportByRespOpenOnly.addEventListener("change", function () {
    var report = findReport(activeReportId);
    if (report) renderReportByResp(report);
  });

  // ---- a new tour: the previous tour's undone rows ----------------------------------
  var reportCarryOverlay = document.getElementById("reportCarryOverlay");
  var carry = { reportId: null, fromId: null };
  function previousTourWithOpenRows(newReport) {
    var sheet = findSheetForReport(newReport) || activeSheet();
    if (!sheet) return null;
    var tours = (sheet.reports || []).filter(function (r) { return r.type === "tour" && r.id !== newReport.id; });
    tours.sort(function (a, b) { return (b.date || "").localeCompare(a.date || "") || (b.createdAt || 0) - (a.createdAt || 0); });
    var prev = tours[0];
    return prev && prev.rows.some(function (r) { return r.status !== 2; }) ? prev : null;
  }
  function offerTourCarryOver(newReport) {
    if (!newReport || newReport.type !== "tour" || newReport.rows.length) return;
    var prev = previousTourWithOpenRows(newReport);
    if (!prev) return;
    carry = { reportId: newReport.id, fromId: prev.id };
    var open = prev.rows.filter(function (r) { return r.status !== 2; });
    document.getElementById("reportCarrySub").textContent = tr("reportCarrySub")
      .replace("{title}", prev.title || tr("reportTypeTour"))
      .replace("{date}", isoToDisplay(prev.date))
      .replace("{n}", open.length);
    var list = document.getElementById("reportCarryList");
    list.innerHTML = "";
    open.forEach(function (row) {
      var label = document.createElement("label");
      label.className = "report-carry-row";
      var cb = document.createElement("input");
      cb.type = "checkbox";
      cb.checked = true;
      cb.value = row.id;
      label.appendChild(cb);
      if (row.loc && reportPlan(prev, row.loc.planId)) label.appendChild(makePin(prev.rows.indexOf(row) + 1, row.status, "report-pin-small"));
      var text = document.createElement("span");
      text.textContent = (row.task || "…") + (row.responsible ? " · " + row.responsible : "");
      label.appendChild(text);
      list.appendChild(label);
    });
    reportCarryOverlay.hidden = false;
  }
  function closeReportCarry() { reportCarryOverlay.hidden = true; carry = { reportId: null, fromId: null }; }
  document.getElementById("reportCarryCloseBtn").addEventListener("click", closeReportCarry);
  document.getElementById("reportCarrySkipBtn").addEventListener("click", closeReportCarry);
  document.getElementById("reportCarryCopyBtn").addEventListener("click", function () {
    var report = findReport(carry.reportId);
    var prev = findReport(carry.fromId);
    if (!report || !prev) { closeReportCarry(); return; }
    var ids = Array.prototype.slice.call(document.querySelectorAll("#reportCarryList input:checked")).map(function (cb) { return cb.value; });
    var plans = (report.plans || []).slice();
    prev.rows.forEach(function (row) {
      if (ids.indexOf(row.id) === -1) return;
      var copy = {
        id: uid(), task: row.task || "", responsible: row.responsible || "", status: row.status === 1 ? 1 : 0,
        priority: row.priority || null, dueDate: row.dueDate || null, image: row.image || null, carriedFrom: prev.date
      };
      var plan = row.loc && reportPlan(prev, row.loc.planId);
      if (plan) {
        copy.loc = { planId: plan.id, x: row.loc.x, y: row.loc.y };
        if (!plans.some(function (p) { return p.id === plan.id; })) plans.push(plan);
      }
      report.rows.push(copy);
    });
    report.plans = plans;
    if (!report.planId && prev.planId && reportPlan(report, prev.planId)) report.planId = prev.planId;
    saveData();
    closeReportCarry();
    renderReportView();
  });
