  // ---------------------------------------------------------------------
  // תוכנית עבודה – קבוצות: a project's plan split by section, area or kind
  // of work ("מקטע א'", "גשרים"...), one level above the hammocks. Kept in
  // the project's data as workGroups: [{ id, name }] (in their order), each
  // activity's group in item.group; one with none (or a deleted group's) is
  // in "כללי". With no groups the plan looks as before. On the chart: a row
  // per group - its span and % done (weighted by length), tap to fold,
  // long press to rename / move / delete - and above it a chip per group
  // to show only that one (a new activity then joins it).
  // ---------------------------------------------------------------------
  var WP_GENERAL = "__general";
  var wpGroupChips = document.getElementById("wpGroupChips");
  var wpGroupSelect = document.getElementById("wpGroup");
  var wpGroupEditOverlay = document.getElementById("wpGroupEditOverlay");
  var wpGroupNameInput = document.getElementById("wpGroupName");
  var wpGroupEditing = null; // { sheet, group (a copy), isNew, done(group|null) }

  function wpSheetGroups(sheet) { return (sheet && sheet.workGroups) || []; }
  function wpGroupKey(sheet, item) {
    return item.group && wpSheetGroups(sheet).some(function (g) { return g.id === item.group; }) ? item.group : WP_GENERAL;
  }
  // the group's name for an export ("" while the project has no groups)
  function wpGroupName(sheet, id) {
    var groups = wpSheetGroups(sheet);
    if (!groups.length) return "";
    var g = groups.find(function (x) { return x.id === id; });
    return g ? g.name : tr("workPlanGroupGeneral");
  }
  // the chosen chip: only that group's activities
  function wpFilterByGroup(sheet, items) {
    var f = wpState.groupFilter;
    if (!f || !wpState.sheetId) return items;
    return items.filter(function (x) { return wpGroupKey(sheet, x) === f; });
  }
  // the chart's sections: each group (in its order, even an empty one), then
  // "כללי" when anything is in it; null when the project has no groups or
  // one group is chosen (then no group rows at all)
  function wpGroupSections(sheet, items) {
    var groups = wpSheetGroups(sheet);
    if (!groups.length || wpState.groupFilter || !wpState.sheetId) return null;
    var out = groups.map(function (g) {
      return { key: g.id, group: g, items: items.filter(function (x) { return x.group === g.id; }) };
    });
    var general = items.filter(function (x) { return wpGroupKey(sheet, x) === WP_GENERAL; });
    if (general.length) out.push({ key: WP_GENERAL, group: null, items: general });
    return out;
  }

  // Changes a project's groups (mutate(groups) -> the new list) - locally and,
  // for a shared project, on the server's fresh copy. An activity whose group
  // is gone is in "כללי" again.
  function saveWorkGroups(sheet, mutate) {
    sheet = allSheets().find(function (x) { return x.id === sheet.id; }) || sheet;
    wpRememberForUndo(sheet); // (↶ - 12g-work-plan-undo.js)
    var clean = function (plan, groups) {
      return (plan || []).map(function (x) {
        if (!x.group || groups.some(function (g) { return g.id === x.group; })) return x;
        return Object.assign({}, x, { group: null });
      });
    };
    sheet.workGroups = mutate(JSON.parse(JSON.stringify(sheet.workGroups || [])));
    sheet.workPlan = clean(sheet.workPlan, sheet.workGroups);
    if (!sheet.shared) {
      saveData();
      return;
    }
    if (!supabaseClient) return;
    updateSharedSheetDataSafely(sheet.id, function (current) {
      var groups = mutate(JSON.parse(JSON.stringify(current.workGroups || [])));
      return Object.assign({}, current, { workGroups: groups, workPlan: clean(current.workPlan, groups) });
    }).then(function (newData) {
      var live = sharedSheets.find(function (s) { return s.id === sheet.id; });
      if (live) {
        live.workGroups = newData.workGroups || [];
        live.workPlan = newData.workPlan || [];
      }
      refreshWorkPlanIfOpen();
    }, function () {
      alert(tr("workPlanSaveError"));
    });
  }

  // ---- the chips above the chart ---------------------------------------------------
  function renderWpGroupChips() {
    var sheet = wpState.sheetId && allSheets().find(function (s) { return s.id === wpState.sheetId; });
    wpGroupChips.hidden = !sheet;
    wpGroupChips.innerHTML = "";
    if (!sheet) return;
    var groups = wpSheetGroups(sheet);
    if (wpState.groupFilter && wpState.groupFilter !== WP_GENERAL && !groups.some(function (g) { return g.id === wpState.groupFilter; })) {
      wpState.groupFilter = null;
    }
    var plan = sheet.workPlan || [];
    var chip = function (key, text, count, cls) {
      var b = document.createElement("button");
      b.type = "button";
      b.className = "wp-group-chip" + (cls ? " " + cls : "") + ((wpState.groupFilter || null) === key ? " on" : "");
      b.textContent = text;
      if (count != null) b.appendChild(wpEl("small", "", " (" + count + ")"));
      wpGroupChips.appendChild(b);
      return b;
    };
    if (groups.length) {
      chip(null, tr("workPlanAll"), plan.length).addEventListener("click", function () { wpChooseGroup(null); });
      groups.forEach(function (g) {
        var b = chip(g.id, g.name, plan.filter(function (x) { return x.group === g.id; }).length);
        var fired = 0;
        wpBindLongPress(b, function () { openWpGroupEdit(sheet, g); }, function () { fired = Date.now(); });
        b.addEventListener("click", function () { if (Date.now() - fired > 800) wpChooseGroup(g.id); });
      });
      var general = plan.filter(function (x) { return wpGroupKey(sheet, x) === WP_GENERAL; }).length;
      if (general) chip(WP_GENERAL, tr("workPlanGroupGeneral"), general).addEventListener("click", function () { wpChooseGroup(WP_GENERAL); });
    }
    chip("__add", tr("workPlanGroupAdd"), null, "add").addEventListener("click", function () {
      openWpGroupEdit(sheet, null, function (g) { if (g) wpChooseGroup(g.id); });
    });
  }
  function wpChooseGroup(key) {
    wpState.groupFilter = key;
    renderWorkPlan();
  }

  // ---- a group's row on the chart ---------------------------------------------------
  function wpBuildGroupRow(host, sheet, sec, range, dayW, forPdf, track) {
    var key = "g:" + sec.key, collapsed = !forPdf && wpState.collapsed[key];
    var row = wpEl("div", "wp-row wp-group-row");
    row.setAttribute("data-group", sec.key);
    var name = wpEl("div", "wp-name wp-group-name");
    name.appendChild(wpEl("span", "wp-name-text", (forPdf ? "" : collapsed ? "◂ " : "▾ ") + (sec.group ? sec.group.name : tr("workPlanGroupGeneral"))));
    var sum = sec.items.length ? wpHammockSummary(sec.items) : null;
    name.appendChild(wpEl("small", "", sum
      ? (sum.allDone ? 100 : sum.progress) + "% · " + tr("workPlanHammockCount").replace("{n}", sec.items.length)
      : tr("workPlanGroupEmpty")));
    row.appendChild(name);
    var t = track();
    if (sum) {
      var from = Math.max(0, wpDiff(range.start, sum.start));
      var to = Math.min(range.days - 1, wpDiff(range.start, sum.end));
      if (to >= 0 && from <= range.days - 1) {
        var bar = wpEl("div", "wp-gbar" + (sum.late ? " wp-gbar-late" : ""));
        var w = Math.max(6, (to - from + 1) * dayW - 2);
        bar.style.right = (from * dayW + 1) + "px";
        bar.style.width = w + "px";
        var fill = wpEl("span", "wp-gbar-fill");
        fill.style.width = (sum.allDone ? 100 : sum.progress) + "%";
        bar.appendChild(fill);
        if (w >= 30) bar.appendChild(wpEl("span", "wp-gbar-text", (sum.allDone ? 100 : sum.progress) + "%"));
        t.appendChild(bar);
      }
    }
    row.appendChild(t);
    if (!forPdf) {
      var fired = 0;
      if (sec.group) wpBindLongPress(row, function () { openWpGroupEdit(sheet, sec.group); }, function () { fired = Date.now(); });
      row.addEventListener("click", function () {
        if (Date.now() - fired < 800) return;
        wpState.collapsed[key] = !wpState.collapsed[key];
        renderWorkPlan();
      });
    }
    host.appendChild(row);
    return collapsed;
  }

  // ---- naming / moving / deleting a group ---------------------------------------------
  // group null = a new one (saved here, so it shows even before it has
  // activities); done(g) gets the saved group (or null)
  function openWpGroupEdit(sheet, group, done) {
    // the project as it is now (a shared one may have been reloaded since the chart was drawn)
    sheet = allSheets().find(function (x) { return x.id === sheet.id; }) || sheet;
    var copy = group ? Object.assign({}, group) : { id: uid(), name: "" };
    wpGroupEditing = { sheet: sheet, group: copy, isNew: !group, done: done || null };
    document.getElementById("wpGroupEditTitle").textContent = tr(group ? "workPlanGroupEditTitle" : "workPlanGroupNewTitle");
    wpGroupNameInput.value = copy.name;
    wpGroupNameInput.placeholder = tr("workPlanGroupPlaceholder");
    document.getElementById("wpGroupEditTools").hidden = !group;
    if (group) {
      var list = wpSheetGroups(sheet), i = list.findIndex(function (g) { return g.id === group.id; });
      document.getElementById("wpGroupUpBtn").disabled = i <= 0;
      document.getElementById("wpGroupDownBtn").disabled = i < 0 || i >= list.length - 1;
    }
    wpGroupEditOverlay.hidden = false;
    wpGroupNameInput.focus();
  }
  function closeWpGroupEdit(saved) {
    var ed = wpGroupEditing;
    wpGroupEditing = null;
    wpGroupEditOverlay.hidden = true;
    if (ed && ed.done) ed.done(saved || null);
  }
  function wpSaveGroupEdit() {
    var ed = wpGroupEditing;
    if (!ed) return;
    var name = wpGroupNameInput.value.replace(/\s+/g, " ").trim();
    if (!name) { wpGroupNameInput.focus(); return; }
    var g = Object.assign({}, ed.group, { name: name });
    saveWorkGroups(ed.sheet, function (list) {
      var i = list.findIndex(function (x) { return x.id === g.id; });
      if (i >= 0) list[i] = g; else list.push(g);
      return list;
    });
    closeWpGroupEdit(g);
    renderWorkPlan();
  }
  function wpMoveGroup(delta) {
    var ed = wpGroupEditing;
    if (!ed) return;
    saveWorkGroups(ed.sheet, function (list) {
      var i = list.findIndex(function (x) { return x.id === ed.group.id; }), j = i + delta;
      if (i < 0 || j < 0 || j >= list.length) return list;
      var moved = list.splice(i, 1)[0];
      list.splice(j, 0, moved);
      return list;
    });
    closeWpGroupEdit(null);
    renderWorkPlan();
  }
  document.getElementById("wpGroupEditOkBtn").addEventListener("click", wpSaveGroupEdit);
  document.getElementById("wpGroupEditCancelBtn").addEventListener("click", function () { closeWpGroupEdit(null); });
  document.getElementById("wpGroupUpBtn").addEventListener("click", function () { wpMoveGroup(-1); });
  document.getElementById("wpGroupDownBtn").addEventListener("click", function () { wpMoveGroup(1); });
  document.getElementById("wpGroupDeleteBtn").addEventListener("click", function () {
    var ed = wpGroupEditing;
    if (!ed) return;
    wpGroupEditOverlay.hidden = true;
    wpGroupEditing = null;
    // its activities stay - in "כללי"
    askConfirm(tr("workPlanGroupDeleteConfirm").replace("{name}", ed.group.name), function () {
      saveWorkGroups(ed.sheet, function (list) { return list.filter(function (x) { return x.id !== ed.group.id; }); });
      if (wpState.groupFilter === ed.group.id) wpState.groupFilter = null;
      renderWorkPlan();
    });
  });
  wpGroupNameInput.addEventListener("keydown", function (e) {
    if (e.key === "Enter") { e.preventDefault(); wpSaveGroupEdit(); }
  });

  // ---- an activity's group: in its editor, and from its long press ------------------------
  function wpFillGroups(sheet, selected) {
    wpGroupSelect.innerHTML = "";
    var opt = function (value, text) {
      var o = document.createElement("option");
      o.value = value;
      o.textContent = text;
      wpGroupSelect.appendChild(o);
    };
    opt("", tr("workPlanGroupGeneral"));
    wpSheetGroups(sheet).forEach(function (g) { opt(g.id, g.name); });
    opt("__new", tr("workPlanGroupNewOption"));
    wpGroupSelect.value = selected && wpSheetGroups(sheet).some(function (g) { return g.id === selected; }) ? selected : "";
    wpGroupSelect.setAttribute("data-was", wpGroupSelect.value);
  }
  wpGroupSelect.addEventListener("change", function () {
    if (wpGroupSelect.value !== "__new") { wpGroupSelect.setAttribute("data-was", wpGroupSelect.value); return; }
    var was = wpGroupSelect.getAttribute("data-was") || "";
    var sheet = wpEditing && allSheets().find(function (s) { return s.id === wpEditing.sheetId; });
    if (!sheet) { wpGroupSelect.value = was; return; }
    openWpGroupEdit(sheet, null, function (g) {
      if (!wpEditing) return;
      wpFillGroups(sheet, g ? g.id : was);
    });
  });
  // the group an activity being edited ends up in
  function wpEditorGroup() {
    var v = wpGroupSelect.value;
    return v && v !== "__new" ? v : null;
  }
  // a new activity joins the group whose chip is chosen
  function wpDefaultGroup() {
    return wpState.groupFilter && wpState.groupFilter !== WP_GENERAL ? wpState.groupFilter : null;
  }

  function openWpGroupMenu(sheet, item) {
    document.getElementById("wpHammockMenuTitle").textContent = tr("workPlanGroupMenuTitle").replace("{name}", item.name);
    var list = document.getElementById("wpHammockMenuList");
    list.innerHTML = "";
    var choose = function (groupId) {
      wpHammockMenuOverlay.hidden = true;
      if ((item.group || null) === (groupId || null)) return;
      saveWorkPlanItem(sheet, Object.assign({}, item, { group: groupId || null, updatedBy: myPhoneNumber || null, updatedAt: Date.now() }), false);
      renderWorkPlan();
    };
    var key = wpGroupKey(sheet, item);
    var pick = function (id, text) {
      var b = document.createElement("button");
      b.type = "button";
      var on = (id || WP_GENERAL) === key;
      b.className = "wp-hammock-pick" + (on ? " on" : "");
      b.textContent = (on ? "✓ " : "") + text;
      b.addEventListener("click", function () { choose(id); });
      list.appendChild(b);
    };
    wpSheetGroups(sheet).forEach(function (g) { pick(g.id, g.name); });
    pick(null, tr("workPlanGroupGeneral"));
    var add = document.createElement("button");
    add.type = "button";
    add.textContent = tr("workPlanGroupNewOption");
    add.addEventListener("click", function () {
      wpHammockMenuOverlay.hidden = true;
      openWpGroupEdit(sheet, null, function (g) { if (g) choose(g.id); });
    });
    list.appendChild(add);
    wpHammockMenuOverlay.hidden = false;
  }
