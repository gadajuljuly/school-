  // ---------------------------------------------------------------------
  // 🧱 הזמנת ברזל (the toolbox): a project's rebar orders. Each is a table -
  // a row per bar: its number, a sketch of its shape (with the sizes; picked
  // from the shapes, drawn by hand, or a mesh), its diameter, its total
  // length, kg per metre (from the diameter), how many, and their weight -
  // with the totals and the weight per diameter under it. Printed (the
  // computer's print dialog / Android's print screen) or shared as a PDF.
  // Kept on the project (sheet.rebarOrders), shared with its members.
  // ---------------------------------------------------------------------
  var rebarListView = document.getElementById("rebarListView");
  var rebarOrderView = document.getElementById("rebarOrderView");
  var rbShapeOverlay = document.getElementById("rbShapeOverlay");
  var rbDiaOverlay = document.getElementById("rbDiaOverlay");
  var rbRowsEl = document.getElementById("rbRows");
  var rb = { sheetId: null, order: null, saveTimer: null, editRow: null, draft: null, drawing: null };

  // kg per metre: the standard table (d² / 162 for any other)
  var RB_KGM = { 6: 0.222, 8: 0.395, 10: 0.617, 12: 0.888, 14: 1.21, 16: 1.58, 18: 2.0, 20: 2.47, 22: 2.98, 25: 3.85, 28: 4.83, 32: 6.31 };
  var RB_DIAS = [8, 10, 12, 14, 16, 18, 20, 22, 25, 28, 32];
  function rbKgm(d) { d = +d || 0; return RB_KGM[d] || Math.round(d * d / 162 * 1000) / 1000; }
  // the shapes: their sizes (cm) and their total length (m)
  var RB_SHAPES = {
    straight: { label: "rbShapeStraight", dims: ["a"], len: function (d) { return d.a; } },
    L: { label: "rbShapeL", dims: ["a", "b"], len: function (d) { return d.a + d.b; } },
    U: { label: "rbShapeU", dims: ["a", "b", "c"], len: function (d) { return d.a + d.b + d.c; } },
    hoop: { label: "rbShapeHoop", dims: ["a", "b", "h"], len: function (d) { return 2 * (d.a + d.b) + 2 * d.h; } },
    step: { label: "rbShapeStep", dims: ["a", "b", "c"], len: function (d) { return d.a + d.b + d.c; } },
    cap: { label: "rbShapeCap", dims: ["a", "b", "c", "h"], len: function (d) { return d.a + d.b + d.c + 2 * d.h; } },
    spiral: { label: "rbShapeSpiral", dims: ["D", "p", "H"], len: function (d) {
      if (!d.p) return 0;
      return (d.H / d.p) * Math.sqrt(Math.pow(Math.PI * d.D, 2) + d.p * d.p);
    } },
    Z: { label: "rbShapeZ", dims: ["a", "b", "c"], len: function (d) { return d.a + d.b + d.c; } },
    free: { label: "rbShapeFree" },
    mesh: { label: "rbShapeMesh" }
  };
  var RB_SHAPE_ORDER = ["straight", "L", "U", "hoop", "step", "cap", "spiral", "Z", "free", "mesh"];
  function rbDimLabel(k) {
    if (k === "h") return tr("rbDimHook");
    if (k === "D") return tr("rbDimD");
    if (k === "p") return tr("rbDimPitch");
    if (k === "H") return tr("rbDimHeight");
    return k + " (" + tr("rbDimLen").replace(/^[^(]*\(/, "").replace(/\)$/, "") + ")";
  }

  function rbNum(v) { var n = parseFloat(String(v == null ? "" : v).replace(",", ".")); return isFinite(n) ? n : 0; }
  function rbFmt(n, digits) { return (Math.round(n * Math.pow(10, digits)) / Math.pow(10, digits)).toLocaleString("he-IL", { minimumFractionDigits: digits, maximumFractionDigits: digits }); }
  function rbIsMesh(row) { return row.shape && row.shape.k === "mesh"; }
  // a mesh: kg per m² (bars both ways)
  function rbMeshKgm2(row) {
    var m = (row.shape && row.shape.mesh) || {};
    var sx = rbNum(m.sx), sy = rbNum(m.sy);
    if (!sx || !sy) return 0;
    return rbKgm(row.dia) * (100 / sx + 100 / sy);
  }
  function rbRowKg(row) {
    var units = rbNum(row.units);
    if (rbIsMesh(row)) {
      var m = row.shape.mesh || {};
      return rbMeshKgm2(row) * rbNum(m.w) * rbNum(m.l) * units;
    }
    return rbNum(row.len) * rbKgm(row.dia) * units;
  }
  function rbTotals(order) {
    var units = 0, kg = 0, byDia = {};
    (order.rows || []).forEach(function (r) {
      var w = rbRowKg(r);
      units += rbNum(r.units);
      kg += w;
      if (r.dia) byDia[r.dia] = (byDia[r.dia] || 0) + w;
    });
    return { units: units, kg: kg, byDia: byDia };
  }

  // ---- drawing a bar's shape (the table's cells, the picker, the printout) ----------------------
  function rbDrawShape(canvas, shape, opts) {
    opts = opts || {};
    var ctx = canvas.getContext("2d");
    var W = canvas.width, H = canvas.height;
    ctx.clearRect(0, 0, W, H);
    if (!shape || !shape.k) return;
    var k = shape.k, d = shape.d || {};
    var lw = opts.lineWidth || Math.max(2, Math.round(H / 18));
    var font = opts.font || Math.max(10, Math.round(H / 5.2));
    var px = opts.labels ? font * 2.1 : lw * 2, py = opts.labels ? font * 1.3 : lw * 2;
    var bx = px, by = py, bw = W - 2 * px, bh = H - 2 * py;
    var P = function (x, y) { return [bx + x * bw, by + y * bh]; };
    ctx.strokeStyle = "#2c2a24";
    ctx.lineWidth = lw;
    ctx.lineJoin = "round";
    ctx.lineCap = "round";
    var line = function (pts) {
      ctx.beginPath();
      pts.forEach(function (p, i) { var q = P(p[0], p[1]); if (i) ctx.lineTo(q[0], q[1]); else ctx.moveTo(q[0], q[1]); });
      ctx.stroke();
    };
    var labels = [];
    var lab = function (key, x, y, align) { if (opts.labels) labels.push({ t: opts.letters ? key : (d[key] != null && d[key] !== "" ? String(d[key]) : key), x: x, y: y, a: align || "center" }); };
    if (k === "straight") { line([[0, 0.55], [1, 0.55]]); lab("a", 0.5, 0.2); }
    else if (k === "L") { line([[0, 0], [0, 1], [1, 1]]); lab("a", -0.04, 0.5, "right"); lab("b", 0.5, 1.28); }
    else if (k === "U") { line([[0, 0], [0, 1], [1, 1], [1, 0]]); lab("a", -0.04, 0.5, "right"); lab("b", 0.5, 1.28); lab("c", 1.04, 0.5, "left"); }
    else if (k === "hoop") {
      line([[0.2, 0], [0.8, 0], [0.8, 1], [0.2, 1], [0.2, 0]]);
      line([[0.2, 0], [0.32, 0.22]]);
      lab("a", 0.5, 1.28); lab("b", 0.16, 0.5, "right"); lab("h", 0.36, 0.3, "left");
    }
    else if (k === "step") { line([[0, 1], [0.32, 1], [0.68, 0], [1, 0]]); lab("a", 0.16, 1.28); lab("b", 0.42, 0.5, "right"); lab("c", 0.84, -0.3); }
    else if (k === "cap") {
      line([[0.14, 0], [0, 0], [0, 1], [1, 1], [1, 0], [0.86, 0]]);
      lab("a", -0.04, 0.5, "right"); lab("b", 0.5, 1.28); lab("c", 1.04, 0.5, "left"); lab("h", 0.2, -0.3);
    }
    else if (k === "spiral") {
      ctx.beginPath();
      for (var t = 0; t <= 1.0001; t += 0.01) {
        var q = P(0.5 + 0.38 * Math.cos(t * Math.PI * 8), t);
        if (t) ctx.lineTo(q[0], q[1] + 0.12 * bh * Math.sin(t * Math.PI * 8)); else ctx.moveTo(q[0], q[1]);
      }
      ctx.stroke();
      lab("D", 0.5, 1.28); lab("p", 0.96, 0.5, "left"); lab("H", 0.04, 0.5, "right");
    }
    else if (k === "Z") { line([[0, 0], [1, 0], [0, 1], [1, 1]]); lab("a", 0.5, -0.3); lab("b", 0.56, 0.5, "left"); lab("c", 0.5, 1.28); }
    else if (k === "free") {
      var pts = shape.pts || [];
      if (pts.length > 1) line(pts);
    }
    else if (k === "mesh") {
      ctx.lineWidth = Math.max(1, lw * 0.6);
      for (var i = 0; i <= 5; i++) line([[i / 5, 0], [i / 5, opts.labels ? 1 : 0.78]]);
      for (var j = 0; j <= 3; j++) line([[-0.04, j / 3 * (opts.labels ? 1 : 0.78)], [1.04, j / 3 * (opts.labels ? 1 : 0.78)]]);
      var m = shape.mesh || {};
      if (!opts.labels && (m.sx || m.w)) {
        ctx.fillStyle = "#bf4e30";
        ctx.font = "700 " + Math.round(font * 0.85) + "px Rubik, Assistant, Arial, sans-serif";
        ctx.textAlign = "center";
        ctx.textBaseline = "bottom";
        ctx.direction = "rtl";
        ctx.fillText(tr("rbMeshLabel").replace("{sx}", m.sx || "?").replace("{sy}", m.sy || "?").replace("{w}", m.w || "?").replace("{l}", m.l || "?"), W / 2, H - 1);
      }
    }
    if (labels.length) {
      ctx.fillStyle = "#bf4e30";
      ctx.font = "700 " + font + "px Rubik, Assistant, Arial, sans-serif";
      ctx.textBaseline = "middle";
      ctx.direction = "ltr";
      labels.forEach(function (l) {
        var q = P(l.x, l.y);
        ctx.textAlign = l.a;
        ctx.fillText(l.t, q[0], Math.max(font / 2, Math.min(H - font / 2, q[1])));
      });
    }
  }
  function rbShapeCanvas(shape, w, h, opts) {
    var dpr = window.devicePixelRatio || 1;
    var c = document.createElement("canvas");
    c.width = Math.round(w * dpr); c.height = Math.round(h * dpr);
    c.style.width = w + "px"; c.style.height = h + "px";
    rbDrawShape(c, shape, Object.assign({ lineWidth: 2.4 * dpr, font: 10 * dpr }, opts || {}));
    return c;
  }

  // ---- keeping them --------------------------------------------------------------------------------
  function rbSheet() { return rb.sheetId && allSheets().find(function (s) { return s.id === rb.sheetId; }); }
  function rbCopy(x) { return JSON.parse(JSON.stringify(x)); }
  function rbPersist(order, removed) {
    var sheet = rbSheet();
    if (!sheet) return Promise.resolve();
    var mutate = function (list) {
      list = (list || []).filter(function (o) { return o.id !== order.id; });
      if (!removed) list.push(rbCopy(order));
      list.sort(function (a, b) { return (a.createdAt || 0) - (b.createdAt || 0); });
      return list;
    };
    sheet.rebarOrders = mutate(sheet.rebarOrders);
    if (!sheet.shared) { saveData(); return Promise.resolve(); }
    if (!supabaseClient) return Promise.resolve();
    return updateSharedSheetDataSafely(sheet.id, function (current) {
      return Object.assign({}, current, { rebarOrders: mutate(current.rebarOrders) });
    }).then(function (newData) {
      var live = sharedSheets.find(function (s) { return s.id === sheet.id; });
      if (live) live.rebarOrders = newData.rebarOrders || [];
    }, function () {
      showToast(tr("rbSaveError"), 3500);
    });
  }
  function rbSaveSoon() {
    clearTimeout(rb.saveTimer);
    rb.saveTimer = setTimeout(rbSaveNow, 900);
  }
  function rbSaveNow() {
    clearTimeout(rb.saveTimer);
    rb.saveTimer = null;
    if (!rb.order) return Promise.resolve();
    rb.order.updatedAt = Date.now();
    return rbPersist(rb.order);
  }

  // ---- the project's orders ------------------------------------------------------------------------
  function rbOrderNumber(sheet) {
    var max = 0;
    (sheet.rebarOrders || []).forEach(function (o) { var n = parseInt(String(o.number || "").replace(/\D/g, ""), 10); if (n > max) max = n; });
    return "ב-" + String(max + 1).padStart(3, "0");
  }
  function renderRebarList() {
    var sheet = rbSheet();
    var list = document.getElementById("rebarList");
    list.innerHTML = "";
    var orders = ((sheet && sheet.rebarOrders) || []).slice().reverse();
    if (!orders.length) {
      var empty = document.createElement("div");
      empty.className = "library-empty";
      empty.textContent = tr("rbEmpty");
      list.appendChild(empty);
      return;
    }
    orders.forEach(function (o) {
      var t = rbTotals(o);
      var b = document.createElement("button");
      b.type = "button";
      b.className = "rb-list-item";
      var top = document.createElement("div");
      top.className = "rb-li-top";
      var n = document.createElement("b");
      n.textContent = o.number;
      var w = document.createElement("span");
      w.className = "rb-li-kg";
      w.textContent = t.kg >= 1000 ? tr("rbTons").replace("{n}", rbFmt(t.kg / 1000, 2)) : rbFmt(t.kg, 1) + " ק״ג";
      top.appendChild(n);
      top.appendChild(w);
      var sub = document.createElement("div");
      sub.className = "rb-li-sub";
      sub.textContent = [o.editDate ? isoToDisplay(o.editDate) : "", o.supplier, o.element].filter(Boolean).join(" · ");
      b.appendChild(top);
      b.appendChild(sub);
      b.addEventListener("click", function () { openRebarOrder(o.id); });
      list.appendChild(b);
    });
  }
  function openRebarList() {
    var sheet = activeSheet();
    if (!sheet) return;
    rb.sheetId = sheet.id;
    renderRebarList();
    rebarListView.hidden = false;
  }
  document.getElementById("rebarListBackBtn").addEventListener("click", function () { rebarListView.hidden = true; });
  document.getElementById("rebarNewBtn").addEventListener("click", function () {
    var sheet = rbSheet();
    if (!sheet) return;
    var order = {
      id: uid(), number: rbOrderNumber(sheet), editDate: todayISO(), createdAt: Date.now(), by: myPhoneNumber || null,
      supplier: "", deliveryDate: "", deliveryTime: "", element: "", notes: "",
      rows: [rbNewRow(1)]
    };
    rb.order = order;
    rbPersist(order);
    openRebarOrder(order.id);
  });
  function rbNewRow(no) { return { id: uid(), no: String(no), shape: null, dia: null, len: "", units: "" }; }

  // ---- one order -------------------------------------------------------------------------------------
  var rbFields = { rbEditDate: "editDate", rbSupplier: "supplier", rbDate: "deliveryDate", rbTime: "deliveryTime", rbElement: "element", rbNotes: "notes" };
  function openRebarOrder(id) {
    var sheet = rbSheet();
    var o = sheet && (sheet.rebarOrders || []).find(function (x) { return x.id === id; });
    if (!o && rb.order && rb.order.id === id) o = rb.order;
    if (!o) return;
    rb.order = rbCopy(o);
    if (!rb.order.rows) rb.order.rows = [];
    document.getElementById("rebarOrderTitle").textContent = tr("rbOrderTitle").replace("{n}", rb.order.number);
    document.getElementById("rbProjectName").value = sheet.name;
    Object.keys(rbFields).forEach(function (elId) { document.getElementById(elId).value = rb.order[rbFields[elId]] || ""; });
    renderRebarRows();
    rebarOrderView.hidden = false;
  }
  Object.keys(rbFields).forEach(function (elId) {
    document.getElementById(elId).addEventListener("input", function () {
      if (!rb.order) return;
      rb.order[rbFields[elId]] = this.value;
      rbSaveSoon();
    });
  });
  function rbCloseOrder() {
    var pending = rb.saveTimer ? rbSaveNow() : Promise.resolve();
    rebarOrderView.hidden = true;
    pending.then(function () {
      rb.order = null;
      if (!rebarListView.hidden) renderRebarList();
    });
  }
  document.getElementById("rebarOrderBackBtn").addEventListener("click", rbCloseOrder);
  document.getElementById("rebarDeleteBtn").addEventListener("click", function () {
    if (!rb.order) return;
    var order = rb.order;
    askConfirm(tr("rbDeleteConfirm").replace("{n}", order.number), function () {
      clearTimeout(rb.saveTimer);
      rb.saveTimer = null;
      rebarOrderView.hidden = true;
      rb.order = null;
      rbPersist(order, true).then(renderRebarList);
      renderRebarList();
    });
  });

  // the table
  function rbInput(cls, value, mode) {
    var i = document.createElement("input");
    i.type = "text";
    i.className = cls;
    i.value = value == null ? "" : value;
    if (mode) i.setAttribute("inputmode", mode);
    i.setAttribute("autocomplete", "off");
    return i;
  }
  function renderRebarRows() {
    rbRowsEl.innerHTML = "";
    rb.order.rows.forEach(function (row, idx) {
      var tr_ = document.createElement("tr");
      tr_.setAttribute("data-row", row.id);
      // מס'
      var tdNo = document.createElement("td");
      var no = rbInput("rb-in rb-no", row.no, "numeric");
      no.addEventListener("input", function () { row.no = no.value; rbSaveSoon(); });
      tdNo.appendChild(no);
      // the sketch
      var tdSk = document.createElement("td");
      tdSk.className = "rb-sk";
      var skBtn = document.createElement("button");
      skBtn.type = "button";
      skBtn.className = "rb-sk-btn";
      if (row.shape) skBtn.appendChild(rbShapeCanvas(row.shape, 112, 50, { labels: !rbIsMesh(row) && row.shape.k !== "free" }));
      else skBtn.textContent = tr("rbPickShape");
      skBtn.addEventListener("click", function () { rbOpenShape(row); });
      tdSk.appendChild(skBtn);
      // the diameter
      var tdDia = document.createElement("td");
      var diaBtn = document.createElement("button");
      diaBtn.type = "button";
      diaBtn.className = "rb-dia-btn" + (row.dia ? "" : " empty");
      diaBtn.textContent = row.dia ? row.dia : "Ø";
      diaBtn.addEventListener("click", function () { rbOpenDia(row); });
      tdDia.appendChild(diaBtn);
      // the length (a mesh: its sheet instead)
      var tdLen = document.createElement("td");
      if (rbIsMesh(row)) {
        tdLen.textContent = "—";
        tdLen.className = "rb-dim";
      } else {
        var len = rbInput("rb-in", row.len, "decimal");
        len.addEventListener("input", function () { row.len = len.value; rbUpdateRow(tr_, row); rbSaveSoon(); });
        tdLen.appendChild(len);
      }
      // kg / m (a mesh: kg / m²)
      var tdKgm = document.createElement("td");
      tdKgm.className = "rb-kgm";
      // units
      var tdUnits = document.createElement("td");
      var units = rbInput("rb-in", row.units, "numeric");
      units.addEventListener("input", function () { row.units = units.value; rbUpdateRow(tr_, row); rbSaveSoon(); });
      tdUnits.appendChild(units);
      // the row's weight
      var tdTot = document.createElement("td");
      tdTot.className = "rb-tot";
      [tdNo, tdSk, tdDia, tdLen, tdKgm, tdUnits, tdTot].forEach(function (td) { tr_.appendChild(td); });
      // a long press: delete the row
      var timer = null;
      tr_.addEventListener("pointerdown", function (e) {
        if (e.target.closest("input")) return;
        timer = setTimeout(function () {
          timer = null;
          tr_.classList.add("rb-pressed");
          askConfirm(tr("rbRowDeleteConfirm").replace("{n}", row.no || idx + 1), function () {
            rb.order.rows = rb.order.rows.filter(function (r) { return r.id !== row.id; });
            renderRebarRows();
            rbSaveSoon();
          });
          setTimeout(function () { tr_.classList.remove("rb-pressed"); }, 400);
        }, 600);
      });
      ["pointerup", "pointerleave", "pointercancel", "pointermove"].forEach(function (ev) {
        tr_.addEventListener(ev, function (e) {
          if (ev === "pointermove" && Math.abs(e.movementX) + Math.abs(e.movementY) < 4) return;
          clearTimeout(timer);
        });
      });
      tr_.addEventListener("contextmenu", function (e) { e.preventDefault(); });
      rbRowsEl.appendChild(tr_);
      rbUpdateRow(tr_, row, true);
    });
    rbUpdateTotals();
  }
  function rbUpdateRow(tr_, row, noTotals) {
    var cells = tr_.children;
    if (rbIsMesh(row)) {
      cells[4].innerHTML = "";
      cells[4].appendChild(document.createTextNode(row.dia ? rbFmt(rbMeshKgm2(row), 2) : ""));
      var small = document.createElement("small");
      small.textContent = tr("rbPerM2");
      if (row.dia) cells[4].appendChild(small);
    } else {
      cells[4].textContent = row.dia ? rbKgm(row.dia).toFixed(3) : "";
    }
    var kg = rbRowKg(row);
    cells[6].textContent = kg ? rbFmt(kg, 1) : "";
    if (!noTotals) rbUpdateTotals();
  }
  function rbUpdateTotals() {
    var t = rbTotals(rb.order);
    document.getElementById("rbSumUnits").textContent = t.units ? rbFmt(t.units, 0) : "";
    document.getElementById("rbSumKg").textContent = t.kg ? rbFmt(t.kg, 1) : "";
    var by = document.getElementById("rbByDia");
    by.innerHTML = "";
    Object.keys(t.byDia).map(Number).sort(function (a, b) { return a - b; }).forEach(function (d) {
      if (!t.byDia[d]) return;
      var c = document.createElement("span");
      c.textContent = "\u200FØ" + d + " · " + rbFmt(t.byDia[d], 0) + " ק״ג";
      by.appendChild(c);
    });
    if (t.kg) {
      var tot = document.createElement("span");
      tot.className = "rb-tons";
      tot.textContent = tr("rbTons").replace("{n}", rbFmt(t.kg / 1000, 2));
      by.appendChild(tot);
    }
  }
  document.getElementById("rbAddRowBtn").addEventListener("click", function () {
    if (!rb.order) return;
    var max = 0;
    rb.order.rows.forEach(function (r) { var n = parseInt(r.no, 10); if (n > max) max = n; });
    rb.order.rows.push(rbNewRow(max + 1));
    renderRebarRows();
    rbSaveSoon();
    var last = rbRowsEl.lastElementChild;
    if (last && last.scrollIntoView) last.scrollIntoView({ block: "nearest" });
  });

  // ---- the shape picker ----------------------------------------------------------------------------
  var rbPreview = document.getElementById("rbShapePreview");
  function rbOpenShape(row) {
    rb.editRow = row;
    rb.draft = row.shape ? rbCopy(row.shape) : { k: "straight", d: {} };
    if (!rb.draft.d) rb.draft.d = {};
    // a straight bar's length already in the row: its size
    if (!row.shape && rbNum(row.len)) rb.draft.d.a = Math.round(rbNum(row.len) * 100);
    document.getElementById("rbShapeTitle").textContent = tr("rbShapeTitle").replace("{n}", row.no || "");
    var box = document.getElementById("rbShapes");
    box.innerHTML = "";
    RB_SHAPE_ORDER.forEach(function (k) {
      var b = document.createElement("button");
      b.type = "button";
      b.className = "rb-shape" + (k === "free" || k === "mesh" ? " rb-shape-wide" : "");
      b.setAttribute("data-shape", k);
      b.appendChild(rbShapeCanvas({ k: k, pts: k === "free" ? [[0, 0.8], [0.25, 0.2], [0.5, 0.7], [0.75, 0.25], [1, 0.5]] : null, d: {} }, k === "free" || k === "mesh" ? 44 : 40, 26, { lineWidth: 2.2 * (window.devicePixelRatio || 1) }));
      var t = document.createElement("span");
      t.textContent = tr(RB_SHAPES[k].label);
      b.appendChild(t);
      b.addEventListener("click", function () {
        if (rb.draft.k === k) return;
        rb.draft = { k: k, d: {} };
        if (k === "mesh") rb.draft.mesh = { sx: 20, sy: 20, w: 2.4, l: 6 };
        rbRenderShapeEditor();
      });
      box.appendChild(b);
    });
    rbRenderShapeEditor();
    rbShapeOverlay.hidden = false;
  }
  function rbDraftLen() {
    var def = RB_SHAPES[rb.draft.k];
    if (!def || !def.len) return rb.draft.k === "free" ? rbNum(rb.draft.total) : 0;
    var d = {};
    def.dims.forEach(function (x) { d[x] = rbNum(rb.draft.d[x]); });
    return def.len(d) / 100;
  }
  function rbRenderShapeEditor() {
    var k = rb.draft.k;
    document.querySelectorAll("#rbShapes .rb-shape").forEach(function (b) { b.classList.toggle("on", b.getAttribute("data-shape") === k); });
    var dims = document.getElementById("rbDims");
    dims.innerHTML = "";
    var field = function (label, value, onInput) {
      var l = document.createElement("label");
      l.className = "rb-f";
      var s = document.createElement("span");
      s.textContent = label;
      var i = rbInput("", value, "decimal");
      i.addEventListener("input", function () { onInput(i.value); rbDrawPreview(); rbShapeCalc(); });
      l.appendChild(s);
      l.appendChild(i);
      dims.appendChild(l);
      return i;
    };
    if (k === "mesh") {
      var m = rb.draft.mesh;
      field(tr("rbMeshSx"), m.sx, function (v) { m.sx = v; });
      field(tr("rbMeshSy"), m.sy, function (v) { m.sy = v; });
      field(tr("rbMeshW"), m.w, function (v) { m.w = v; });
      field(tr("rbMeshL"), m.l, function (v) { m.l = v; });
    } else if (k === "free") {
      field(tr("rbDimTotal"), rb.draft.total || "", function (v) { rb.draft.total = v; });
    } else {
      RB_SHAPES[k].dims.forEach(function (x) {
        field(rbDimLabel(x), rb.draft.d[x] == null ? "" : rb.draft.d[x], function (v) { rb.draft.d[x] = v; });
      });
    }
    document.getElementById("rbDrawTools").hidden = k !== "free";
    rbPreview.classList.toggle("drawing", k === "free");
    rbDrawPreview();
    rbShapeCalc();
  }
  function rbDrawPreview() {
    rbDrawShape(rbPreview, rb.draft, { labels: rb.draft.k !== "free" && rb.draft.k !== "mesh", letters: false, lineWidth: 6, font: 22 });
  }
  function rbShapeCalc() {
    var el = document.getElementById("rbShapeCalc");
    if (rb.draft.k === "mesh") {
      var m = rb.draft.mesh;
      var row = { dia: rb.editRow.dia, shape: rb.draft, units: 1 };
      el.textContent = rb.editRow.dia ? tr("rbMeshCalc").replace("{kg}", rbFmt(rbMeshKgm2(row), 2)).replace("{w}", m.w).replace("{l}", m.l).replace("{s}", rbFmt(rbRowKg(row), 1)) : "";
      return;
    }
    var len = rbDraftLen();
    el.textContent = len ? tr("rbLenCalc").replace("{n}", rbFmt(len, 2)) : "";
  }
  // drawing by hand on the preview
  rbPreview.addEventListener("pointerdown", function (e) {
    if (!rb.draft || rb.draft.k !== "free") return;
    e.preventDefault();
    rbPreview.setPointerCapture(e.pointerId);
    var r = rbPreview.getBoundingClientRect();
    var pt = function (ev) { return [Math.max(0, Math.min(1, (ev.clientX - r.left) / r.width)), Math.max(0, Math.min(1, (ev.clientY - r.top) / r.height))]; };
    rb.draft.pts = [pt(e)];
    rb.drawing = pt;
  });
  rbPreview.addEventListener("pointermove", function (e) {
    if (!rb.drawing) return;
    var p = rb.drawing(e), last = rb.draft.pts[rb.draft.pts.length - 1];
    if (Math.abs(p[0] - last[0]) + Math.abs(p[1] - last[1]) < 0.01) return;
    rb.draft.pts.push(p);
    rbDrawPreview();
  });
  ["pointerup", "pointercancel"].forEach(function (ev) {
    rbPreview.addEventListener(ev, function () {
      if (!rb.drawing) return;
      rb.drawing = null;
      // fit to its own box, rounded (small to keep)
      var pts = rb.draft.pts || [];
      if (pts.length < 2) { rb.draft.pts = []; rbDrawPreview(); return; }
      var minx = 1, miny = 1, maxx = 0, maxy = 0;
      pts.forEach(function (p) { minx = Math.min(minx, p[0]); miny = Math.min(miny, p[1]); maxx = Math.max(maxx, p[0]); maxy = Math.max(maxy, p[1]); });
      var sx = Math.max(0.05, maxx - minx), sy = Math.max(0.05, maxy - miny);
      rb.draft.pts = pts.filter(function (p, i) { return i % 2 === 0 || i === pts.length - 1; }).map(function (p) {
        return [Math.round((p[0] - minx) / sx * 100) / 100, Math.round((p[1] - miny) / sy * 100) / 100];
      });
      rbDrawPreview();
    });
  });
  document.getElementById("rbDrawClearBtn").addEventListener("click", function () { rb.draft.pts = []; rbDrawPreview(); });
  document.getElementById("rbShapeCancelBtn").addEventListener("click", function () { rbShapeOverlay.hidden = true; });
  document.getElementById("rbShapeOkBtn").addEventListener("click", function () {
    var row = rb.editRow;
    rbShapeOverlay.hidden = true;
    if (!row) return;
    var shape = rb.draft;
    if (shape.k !== "mesh") delete shape.mesh;
    if (shape.k !== "free") { delete shape.pts; delete shape.total; }
    if (shape.k === "free" || shape.k === "mesh") shape.d = {};
    row.shape = shape;
    var len = rbDraftLen();
    if (shape.k === "mesh") row.len = "";
    else if (len) row.len = String(Math.round(len * 100) / 100);
    renderRebarRows();
    rbSaveSoon();
  });

  // ---- the diameter picker ----------------------------------------------------------------------------
  function rbOpenDia(row) {
    rb.editRow = row;
    document.getElementById("rbDiaTitle").textContent = tr("rbDiaTitle").replace("{n}", row.no || "");
    var box = document.getElementById("rbDias");
    box.innerHTML = "";
    var pick = function (d) {
      row.dia = d;
      rbDiaOverlay.hidden = true;
      renderRebarRows();
      rbSaveSoon();
    };
    RB_DIAS.forEach(function (d) {
      var b = document.createElement("button");
      b.type = "button";
      b.className = "rb-dia" + (row.dia === d ? " on" : "");
      b.setAttribute("data-dia", d);
      var n = document.createElement("b");
      n.textContent = d;
      var s = document.createElement("small");
      s.textContent = rbKgm(d).toFixed(3) + " ק״ג/מ׳";
      b.appendChild(n);
      b.appendChild(s);
      b.addEventListener("click", function () { pick(d); });
      box.appendChild(b);
    });
    var other = document.createElement("button");
    other.type = "button";
    other.className = "rb-dia rb-dia-other";
    other.textContent = tr("rbDiaOther");
    other.addEventListener("click", function () {
      var v = rbNum(window.prompt(tr("rbDiaOtherAsk"), row.dia || ""));
      if (v > 0 && v < 100) pick(v);
    });
    box.appendChild(other);
    rbDiaOverlay.hidden = false;
  }
  rbDiaOverlay.addEventListener("click", function (e) { if (e.target === rbDiaOverlay) rbDiaOverlay.hidden = true; });
  rbShapeOverlay.addEventListener("click", function (e) { if (e.target === rbShapeOverlay) rbShapeOverlay.hidden = true; });

  // ---- the printout (the printer and the shared PDF): one A4 page of its own ------------------------------
  function rbEl(tag, css, text) {
    var e = document.createElement(tag);
    if (css) e.setAttribute("style", css);
    if (text != null) e.textContent = text;
    return e;
  }
  function rbBuildPage(order) {
    var sheet = rbSheet();
    var t = rbTotals(order);
    var ink = "#2c2a24", muted = "#7d7668", line = "#cfc6b2", green = "#44563c", red = "#bf4e30";
    var page = rbEl("div", "position:relative;width:794px;min-height:1123px;box-sizing:border-box;padding:46px 40px 40px;background:#ffffff;direction:rtl;font-family:'Rubik','Assistant','Segoe UI',Arial,sans-serif;color:" + ink + ";");
    page.className = "print-tasks-page";
    page.setAttribute("data-branded", "1");
    if (brandMarkCached) {
      var mark = rbEl("img", "position:absolute;left:15px;top:13px;height:23px;width:" + Math.round(23 * brandMarkCached.ratio) + "px;");
      mark.src = brandMarkCached.url;
      mark.alt = "ITASK";
      page.appendChild(mark);
    }
    // the title and the order's details
    var head = rbEl("div", "display:flex;justify-content:space-between;align-items:flex-end;border-bottom:3px solid " + green + ";padding-bottom:10px;");
    head.appendChild(rbEl("div", "font-size:28px;font-weight:800;", tr("rbPdfTitle").replace("{n}", order.number)));
    var logo = sheet && findLogo(sheet.logoId);
    if (logo) { var lg = rbEl("img", "height:48px;max-width:140px;object-fit:contain;"); lg.src = logo.dataUrl; head.appendChild(lg); }
    page.appendChild(head);
    var info = rbEl("div", "display:grid;grid-template-columns:1fr 1fr;gap:6px 24px;margin:14px 0 16px;font-size:15px;");
    var pair = function (k, v) {
      if (!v) return;
      var d = rbEl("div", "");
      d.appendChild(rbEl("span", "color:" + muted + ";font-weight:700;", tr(k) + ": "));
      d.appendChild(rbEl("span", "font-weight:700;", v));
      info.appendChild(d);
    };
    pair("rbProject", sheet ? sheet.name : "");
    pair("rbEditDate", order.editDate ? isoToFullDisplay(order.editDate) : "");
    pair("rbSupplier", order.supplier);
    pair("rbDelivery", [order.deliveryDate ? isoToFullDisplay(order.deliveryDate) : "", order.deliveryTime].filter(Boolean).join(" · "));
    pair("rbElement", order.element);
    page.appendChild(info);
    // the table
    var table = rbEl("table", "width:100%;border-collapse:collapse;font-size:14px;table-layout:fixed;");
    var cols = [44, null, 54, 70, 70, 54, 86];
    var cg = rbEl("colgroup");
    cols.forEach(function (w) { cg.appendChild(rbEl("col", w ? "width:" + w + "px;" : "")); });
    table.appendChild(cg);
    var th = rbEl("tr");
    ["rbColNo", "rbColSketch", "rbColDia", "rbColLen", "rbColKgm", "rbColUnits", "rbColTotal"].forEach(function (k) {
      th.appendChild(rbEl("th", "background:" + green + ";color:#fff;padding:8px 4px;border:1px solid " + green + ";font-size:13px;", tr(k)));
    });
    table.appendChild(th);
    var td = "border:1px solid " + line + ";padding:4px;text-align:center;font-weight:700;";
    (order.rows || []).forEach(function (r) {
      var row = rbEl("tr");
      row.appendChild(rbEl("td", td, r.no || ""));
      var sk = rbEl("td", td + "height:74px;");
      if (r.shape) {
        var c = document.createElement("canvas");
        c.width = 520; c.height = 150;
        rbDrawShape(c, r.shape, { labels: !rbIsMesh(r) && r.shape.k !== "free", lineWidth: 6, font: 26 });
        if (rbIsMesh(r)) {
          var m = r.shape.mesh || {};
          var ctx = c.getContext("2d");
          ctx.clearRect(0, 0, c.width, c.height);
          rbDrawShape(c, r.shape, { lineWidth: 6, font: 30 });
        }
        var img = rbEl("img", "width:100%;height:68px;object-fit:contain;display:block;");
        img.src = c.toDataURL("image/png");
        sk.appendChild(img);
      }
      row.appendChild(sk);
      row.appendChild(rbEl("td", td, r.dia ? "Ø" + r.dia : ""));
      row.appendChild(rbEl("td", td, rbIsMesh(r) ? "—" : (r.len ? rbFmt(rbNum(r.len), 2) : "")));
      row.appendChild(rbEl("td", td + "color:" + muted + ";", r.dia ? (rbIsMesh(r) ? rbFmt(rbMeshKgm2(r), 2) + " " + tr("rbPerM2") : rbKgm(r.dia).toFixed(3)) : ""));
      row.appendChild(rbEl("td", td, r.units || ""));
      var kg = rbRowKg(r);
      row.appendChild(rbEl("td", td + "color:" + red + ";", kg ? rbFmt(kg, 1) : ""));
      table.appendChild(row);
    });
    var sum = rbEl("tr");
    var sumLabel = rbEl("td", td + "background:#f4efe2;", tr("rbSum"));
    sumLabel.colSpan = 5;
    sum.appendChild(sumLabel);
    sum.appendChild(rbEl("td", td + "background:#f4efe2;", t.units ? rbFmt(t.units, 0) : ""));
    sum.appendChild(rbEl("td", td + "background:#f4efe2;color:" + red + ";", t.kg ? rbFmt(t.kg, 1) : ""));
    table.appendChild(sum);
    page.appendChild(table);
    // by diameter
    var by = rbEl("div", "display:flex;flex-wrap:wrap;gap:8px;margin-top:12px;font-size:14px;font-weight:700;");
    Object.keys(t.byDia).map(Number).sort(function (a, b) { return a - b; }).forEach(function (d) {
      if (t.byDia[d]) by.appendChild(rbEl("span", "border:1px solid " + line + ";border-radius:999px;padding:3px 10px;", "\u200FØ" + d + " · " + rbFmt(t.byDia[d], 0) + " ק״ג"));
    });
    if (t.kg) by.appendChild(rbEl("span", "background:" + green + ";color:#fff;border-radius:999px;padding:3px 12px;", tr("rbTons").replace("{n}", rbFmt(t.kg / 1000, 2))));
    page.appendChild(by);
    if (order.notes) {
      var notes = rbEl("div", "margin-top:16px;font-size:14px;line-height:1.5;border-top:1px solid " + line + ";padding-top:10px;");
      notes.appendChild(rbEl("div", "color:" + muted + ";font-weight:700;", tr("rbNotes")));
      notes.appendChild(rbEl("div", "white-space:pre-wrap;", order.notes));
      page.appendChild(notes);
    }
    return page;
  }
  function rbFileName(order) {
    var sheet = rbSheet();
    return tr("rbPdfTitle").replace("{n}", order.number) + (sheet ? " " + sheet.name : "") + " " + isoToFileNameDate(order.editDate || todayISO()) + ".pdf";
  }
  function rbPdf() {
    var order = rb.order;
    if (!order) return Promise.resolve(null);
    showToast(tr("printTasksMaking"));
    return brandMarkImage().catch(function () {}).then(function () {
      return buildPdfBlobFromElement(rbBuildPage(order), rbFileName(order));
    }).catch(function () {
      alert(tr("reportPdfError"));
      return null;
    });
  }
  document.getElementById("rbPrintBtn").addEventListener("click", function () {
    if (!rb.order) return;
    rbSaveNow();
    if (capacitorShareAvailable) {
      rbPdf().then(function (r) { if (r) openPrintPdfOnPhone(r.blob, r.fileName); });
      return;
    }
    var order = rb.order;
    brandMarkImage().catch(function () {}).then(function () {
      printPageInFrame(rbBuildPage(order), rbFileName(order), "#ffffff");
    });
  });
  document.getElementById("rbShareBtn").addEventListener("click", function () {
    if (!rb.order) return;
    rbSaveNow();
    rbPdf().then(function (r) { if (r) attemptShare(r.blob, r.fileName, "application/pdf"); });
  });

  document.getElementById("toolboxRebar").addEventListener("click", function () {
    closeToolbox();
    openRebarList();
  });
