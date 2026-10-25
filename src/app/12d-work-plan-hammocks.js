
  // ---------------------------------------------------------------------
  // ערסל: one level of grouping in a project's work plan (by area, trade,
  // anything). Kept in the project's data as workHammocks: [{ id, name,
  // color }]; an activity joins one through its own `hammock` (an id).
  // No button of its own: a hammock is made from the activity's settings
  // ("＋ ערסל חדש…") or by a long press on the activity's name in the chart,
  // and one with no activities left is dropped on the next save. In the
  // chart its row folds open / shut, and its bar runs from its earliest
  // start to its latest end with the done part weighted by each
  // activity's length; a long press on it renames it / changes its colour.
  // ---------------------------------------------------------------------
  var WP_HAMMOCK_COLORS = ["#2e4fb8", "#2e7d32", "#c05023", "#7b3fa0", "#00838f", "#b8860b"];
  var wpHammockSelect = document.getElementById("wpHammock");
  var wpHammockMenuOverlay = document.getElementById("wpHammockMenuOverlay");
  var wpHammockEditOverlay = document.getElementById("wpHammockEditOverlay");
  var wpHammockNameInput = document.getElementById("wpHammockName");
  var wpHammockEditing = null; // { hammock (a copy), done(hammock|null) }

  // the project's hammocks that have activities, earliest first, each
  // with its activities: [{ h, items }]
  function wpHammockGroups(sheet, items) {
    var out = [];
    (sheet.workHammocks || []).forEach(function (h) {
      var own = items.filter(function (x) { return x.hammock === h.id; });
      if (own.length) out.push({ h: h, items: own });
    });
    var first = function (g) { return g.items.reduce(function (m, x) { return x.start < m ? x.start : m; }, g.items[0].start); };
    return out.sort(function (a, b) { return first(a).localeCompare(first(b)); });
  }
  // a hammock's span and how much of it is done (weighted by length)
  function wpHammockSummary(items) {
    var start = items[0].start, end = items[0].end, done = 0, total = 0;
    items.forEach(function (x) {
      if (x.start < start) start = x.start;
      if (x.end > end) end = x.end;
      var days = wpDiff(x.start, x.end) + 1;
      total += days;
      done += days * (x.status === "done" ? 100 : x.progress || 0);
    });
    return {
      start: start, end: end,
      progress: total ? Math.round(done / total) : 0,
      late: items.some(wpIsLate),
      allDone: items.every(function (x) { return x.status === "done"; })
    };
  }
  function wpNextHammockColor(sheet) {
    var used = (sheet.workHammocks || []).map(function (h) { return h.color; });
    return WP_HAMMOCK_COLORS.find(function (c) { return used.indexOf(c) < 0; }) || WP_HAMMOCK_COLORS[(sheet.workHammocks || []).length % WP_HAMMOCK_COLORS.length];
  }

  // A long press (600ms, still) on an element; returns nothing - `fn` runs
  // and the click that ends the press is swallowed by `onFired`.
  function wpBindLongPress(el, fn, onFired) {
    var timer = null, x0 = 0, y0 = 0;
    var cancel = function () { clearTimeout(timer); timer = null; };
    el.addEventListener("pointerdown", function (e) {
      x0 = e.clientX; y0 = e.clientY;
      cancel();
      timer = setTimeout(function () {
        timer = null;
        onFired();
        if (navigator.vibrate) { try { navigator.vibrate(30); } catch (err) {} }
        fn();
      }, 600);
    });
    el.addEventListener("pointermove", function (e) {
      if (Math.abs(e.clientX - x0) > 10 || Math.abs(e.clientY - y0) > 10) cancel();
    });
    el.addEventListener("pointerup", cancel);
    el.addEventListener("pointercancel", cancel);
    el.addEventListener("pointerleave", cancel);
    el.addEventListener("contextmenu", function (e) { e.preventDefault(); });
  }

  // ---- the chart rows ------------------------------------------------------
  // draws a group's activities, under their hammocks when it has any
  function wpBuildHammockRows(host, g, range, dayW, forPdf, track, drawItem) {
    var groups = wpHammockGroups(g.sheet, g.items);
    if (!groups.length) { g.items.forEach(function (item) { drawItem(item, null); }); return; }
    groups.forEach(function (hg) {
      var h = hg.h, sum = wpHammockSummary(hg.items);
      var key = "h:" + h.id, collapsed = !forPdf && wpState.collapsed[key];
      var row = wpEl("div", "wp-row wp-hammock-row");
      row.setAttribute("data-hammock", h.id);
      var name = wpEl("div", "wp-name wp-hammock-name");
      name.style.borderRightColor = h.color;
      name.appendChild(wpEl("span", "wp-name-text", (forPdf ? "" : collapsed ? "◂ " : "▾ ") + h.name));
      name.appendChild(wpEl("small", "", tr("workPlanHammockCount").replace("{n}", hg.items.length)));
      row.appendChild(name);
      var t = track();
      var from = Math.max(0, wpDiff(range.start, sum.start));
      var to = Math.min(range.days - 1, wpDiff(range.start, sum.end));
      if (to >= 0 && from <= range.days - 1) {
        var bar = wpEl("div", "wp-hbar" + (sum.late ? " wp-hbar-late" : ""));
        var w = Math.max(6, (to - from + 1) * dayW - 2);
        bar.style.right = (from * dayW + 1) + "px";
        bar.style.width = w + "px";
        bar.style.setProperty("--hc", h.color);
        var fill = wpEl("span", "wp-hbar-fill");
        fill.style.width = (sum.allDone ? 100 : sum.progress) + "%";
        bar.appendChild(fill);
        if (w >= 30) bar.appendChild(wpEl("span", "wp-hbar-text", (sum.allDone ? 100 : sum.progress) + "%"));
        t.appendChild(bar);
      }
      row.appendChild(t);
      if (!forPdf) {
        var fired = 0;
        wpBindLongPress(row, function () { openWpHammockEdit(g.sheet, h); }, function () { fired = Date.now(); });
        row.addEventListener("click", function () {
          if (Date.now() - fired < 800) return;
          wpState.collapsed[key] = !wpState.collapsed[key];
          renderWorkPlan();
        });
      }
      host.appendChild(row);
      if (!collapsed) hg.items.forEach(function (item) { drawItem(item, h); });
    });
    var ids = groups.map(function (hg) { return hg.h.id; });
    var loose = g.items.filter(function (x) { return ids.indexOf(x.hammock) < 0; });
    if (loose.length) {
      host.appendChild(wpEl("div", "wp-hammock-none", tr("workPlanNoHammock")));
      loose.forEach(function (item) { drawItem(item, null); });
    }
  }
  // the activity's name: a long press assigns it to a hammock
  function wpBindNameLongPress(nameEl, sheet, item) {
    wpBindLongPress(nameEl, function () { openWpHammockMenu(sheet, item); }, function () {
      wpLinkSuppress = { itemId: item.id, until: Date.now() + 800 };
    });
  }

  // ---- assigning from the chart ---------------------------------------------------
  function openWpHammockMenu(sheet, item) {
    document.getElementById("wpHammockMenuTitle").textContent = tr("workPlanHammockMenuTitle").replace("{name}", item.name);
    var list = document.getElementById("wpHammockMenuList");
    list.innerHTML = "";
    var choose = function (hammockId, newHammock) {
      wpHammockMenuOverlay.hidden = true;
      if ((item.hammock || null) === (hammockId || null) && !newHammock) return;
      var copy = Object.assign({}, item, { hammock: hammockId || null, updatedBy: myPhoneNumber || null, updatedAt: Date.now() });
      saveWorkPlanItem(sheet, copy, false, newHammock || null);
      renderWorkPlan();
    };
    (sheet.workHammocks || []).forEach(function (h) {
      if (!(sheet.workPlan || []).some(function (x) { return x.hammock === h.id; })) return;
      var b = document.createElement("button");
      b.type = "button";
      b.className = "wp-hammock-pick" + (item.hammock === h.id ? " on" : "");
      b.style.setProperty("--hc", h.color);
      b.textContent = (item.hammock === h.id ? "✓ " : "") + h.name;
      b.addEventListener("click", function () { choose(h.id); });
      list.appendChild(b);
    });
    var add = document.createElement("button");
    add.type = "button";
    add.textContent = tr("workPlanHammockNew");
    add.addEventListener("click", function () {
      wpHammockMenuOverlay.hidden = true;
      openWpHammockEdit(sheet, null, function (h) { if (h) choose(h.id, h); });
    });
    list.appendChild(add);
    if (item.hammock) {
      var none = document.createElement("button");
      none.type = "button";
      none.textContent = tr("workPlanNoHammockOption");
      none.addEventListener("click", function () { choose(null); });
      list.appendChild(none);
    }
    wpHammockMenuOverlay.hidden = false;
  }
  document.getElementById("wpHammockMenuCancelBtn").addEventListener("click", function () { wpHammockMenuOverlay.hidden = true; });

  // ---- naming / colouring a hammock ------------------------------------------------
  // hammock null = a new one; done(h) gets the saved copy (or null when
  // cancelled). An existing hammock is saved here; a new one is saved by
  // the caller together with the activity that joins it.
  function openWpHammockEdit(sheet, hammock, done) {
    var copy = hammock ? Object.assign({}, hammock) : { id: uid(), name: "", color: wpNextHammockColor(sheet) };
    wpHammockEditing = { sheet: sheet, hammock: copy, isNew: !hammock, done: done || null };
    document.getElementById("wpHammockEditTitle").textContent = tr(hammock ? "workPlanHammockEditTitle" : "workPlanHammockNewTitle");
    wpHammockNameInput.value = copy.name;
    wpHammockNameInput.placeholder = tr("workPlanHammockPlaceholder");
    wpRenderHammockColors();
    wpHammockEditOverlay.hidden = false;
    wpHammockNameInput.focus();
  }
  function wpRenderHammockColors() {
    var box = document.getElementById("wpHammockColors");
    box.innerHTML = "";
    WP_HAMMOCK_COLORS.forEach(function (c) {
      var b = document.createElement("button");
      b.type = "button";
      b.className = "wp-hammock-color" + (wpHammockEditing.hammock.color === c ? " on" : "");
      b.style.background = c;
      b.setAttribute("data-color", c);
      b.addEventListener("click", function () { wpHammockEditing.hammock.color = c; wpRenderHammockColors(); });
      box.appendChild(b);
    });
  }
  function closeWpHammockEdit(saved) {
    var ed = wpHammockEditing;
    wpHammockEditing = null;
    wpHammockEditOverlay.hidden = true;
    if (ed && ed.done) ed.done(saved || null);
  }
  function wpSaveHammockEdit() {
    var ed = wpHammockEditing;
    if (!ed) return;
    var name = wpHammockNameInput.value.replace(/\s+/g, " ").trim();
    if (!name) { wpHammockNameInput.focus(); return; }
    ed.hammock.name = name;
    if (!ed.isNew) {
      saveWorkPlanItem(ed.sheet, null, false, ed.hammock);
      renderWorkPlan();
    }
    closeWpHammockEdit(ed.hammock);
  }
  document.getElementById("wpHammockEditOkBtn").addEventListener("click", wpSaveHammockEdit);
  document.getElementById("wpHammockEditCancelBtn").addEventListener("click", function () { closeWpHammockEdit(null); });
  wpHammockNameInput.addEventListener("keydown", function (e) {
    if (e.key === "Enter") { e.preventDefault(); wpSaveHammockEdit(); }
  });

  // ---- the activity's settings: its hammock -------------------------------------------
  function wpFillHammocks(sheet, selected) {
    wpHammockSelect.innerHTML = "";
    var opt = function (value, text) {
      var o = document.createElement("option");
      o.value = value;
      o.textContent = text;
      wpHammockSelect.appendChild(o);
    };
    opt("", tr("workPlanNoHammockOption"));
    var hams = (sheet && sheet.workHammocks) || [];
    hams.forEach(function (h) {
      if (h.id === selected || (sheet.workPlan || []).some(function (x) { return x.hammock === h.id; })) opt(h.id, h.name);
    });
    if (wpEditing && wpEditing.newHammock) opt(wpEditing.newHammock.id, wpEditing.newHammock.name);
    opt("__new", tr("workPlanHammockNew"));
    wpHammockSelect.value = selected && Array.prototype.some.call(wpHammockSelect.options, function (o) { return o.value === selected; }) ? selected : "";
    wpHammockSelect.setAttribute("data-was", wpHammockSelect.value);
  }
  wpHammockSelect.addEventListener("change", function () {
    if (wpHammockSelect.value !== "__new") { wpHammockSelect.setAttribute("data-was", wpHammockSelect.value); return; }
    var was = wpHammockSelect.getAttribute("data-was") || "";
    var sheet = wpEditing && allSheets().find(function (s) { return s.id === wpEditing.sheetId; });
    if (!sheet) { wpHammockSelect.value = was; return; }
    openWpHammockEdit(sheet, null, function (h) {
      if (!wpEditing) return;
      if (!h) { wpHammockSelect.value = was; return; }
      wpEditing.newHammock = h;
      wpFillHammocks(sheet, h.id);
    });
  });
