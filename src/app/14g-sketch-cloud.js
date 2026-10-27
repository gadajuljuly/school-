
  // ---------------------------------------------------------------------
  // סקיצה – on the server. A project can hold several sketches: their list
  // is in the project's data (sketches: [{ id, name, updatedAt, updatedBy }],
  // so every member sees it) and each one's drawing is a JSON file in the
  // project's storage (<project>/sketches/<id>.json). The pad keeps working
  // on the phone's copy (skSaveDraft, every change) and sends it up a few
  // seconds after the drawing stops, and on leaving; what didn't make it
  // up (offline) goes the next time. Opening the pad: the sketch last open
  // on this phone - unless the server has a newer one of it - or the
  // project's newest, or a new one. The title (its name ▾) opens the list:
  // new, open, rename, delete.
  // ---------------------------------------------------------------------
  var SK_CUR_KEY = "itask-sketch-cur:";
  var skCloudTimer = null;
  var skCloudUploaded = {}; // sketchId -> the drawing last sent up (as JSON)
  var skCloudIndexAt = {};  // sketchId -> when its list entry was last written

  function skSheet() { return allSheets().find(function (s) { return s.id === sk.sheetId; }); }
  function skCloudPath(sheetId, id) { return sheetId + "/sketches/" + id + ".json"; }
  function skReadDraft(sheetId, id) {
    try { return JSON.parse(localStorage.getItem("itask-sketch:" + sheetId + ":" + id) || "null"); } catch (e) { return null; }
  }
  function skNewName(sheet) {
    var used = (sheet.sketches || []).map(function (x) { return x.name; });
    if (sk.sheetId === sheet.id && sk.sketchName) used.push(sk.sketchName);
    for (var n = 1; ; n++) {
      var name = tr("sketchTitle") + " " + n;
      if (used.indexOf(name) < 0) return name;
    }
  }
  function skFreshDraft(sheet) {
    return { sketchId: uid(), name: skNewName(sheet), els: [], scale: null, view: null, savedAt: 0, syncedAt: 0 };
  }
  // which sketch the pad opens on
  function skOpeningDraft(sheet) {
    var curId = null;
    try { curId = localStorage.getItem(SK_CUR_KEY + sheet.id); } catch (e) {}
    // the one draft per project of before (itask-sketch:<project>) becomes a sketch of its own
    var legacy = null;
    try { legacy = JSON.parse(localStorage.getItem("itask-sketch:" + sheet.id) || "null"); } catch (e) {}
    if (legacy && legacy.els) {
      var moved = Object.assign(skFreshDraft(sheet), { els: legacy.els, scale: legacy.scale || null, view: legacy.view || null, savedAt: Date.now() });
      try {
        localStorage.setItem("itask-sketch:" + sheet.id + ":" + moved.sketchId, JSON.stringify(moved));
        localStorage.setItem(SK_CUR_KEY + sheet.id, moved.sketchId);
        localStorage.removeItem("itask-sketch:" + sheet.id);
      } catch (e) {}
      return moved;
    }
    var mine = curId && skReadDraft(sheet.id, curId);
    if (mine) return mine;
    var listed = (sheet.sketches || []).slice().sort(function (a, b) { return (b.updatedAt || 0) - (a.updatedAt || 0); })[0];
    if (listed) return { sketchId: listed.id, name: listed.name, els: [], scale: null, view: null, savedAt: 0, syncedAt: 0, needsServer: true };
    return skFreshDraft(sheet);
  }
  function skShowTitle() {
    var sheet = skSheet();
    document.getElementById("sketchTitle").textContent = (sk.sketchName || tr("sketchTitle")) + " ▾" + (sheet ? " · " + sheet.name : "");
  }

  // ---- up ---------------------------------------------------------------------
  function skCloudSoon() {
    clearTimeout(skCloudTimer);
    skCloudTimer = setTimeout(function () { skCloudNow(false); }, 2500);
  }
  // sends the open sketch up when it changed; final: also its list entry now
  function skCloudNow(final) {
    clearTimeout(skCloudTimer);
    var sheet = skSheet();
    if (!sheet || !sk.sketchId || !supabaseClient) return Promise.resolve();
    var id = sk.sketchId, name = sk.sketchName;
    var body = JSON.stringify({ name: name, els: sk.els, scale: sk.scale });
    var known = (sheet.sketches || []).some(function (x) { return x.id === id; });
    // nothing drawn yet and never sent: nothing to keep
    if (!sk.els.length && !known) return Promise.resolve();
    var sendBody = skCloudUploaded[id] !== body;
    var sendIndex = !known || final || Date.now() - (skCloudIndexAt[id] || 0) > 30000;
    if (!sendBody && !(sendIndex && sk.savedAt > (skCloudIndexAt[id] || 0))) return Promise.resolve();
    var savedAt = sk.savedAt;
    var up = sendBody ? supabaseClient.storage.from(LIBRARY_BUCKET).upload(skCloudPath(sheet.id, id),
      new Blob([JSON.stringify({ name: name, els: sk.els, scale: sk.scale, view: sk.view })], { type: "application/json" }),
      { upsert: true, contentType: "application/json" }).then(function (r) { if (r && r.error) throw r.error; }) : Promise.resolve();
    return up.then(function () {
      skCloudUploaded[id] = body;
      // one moment for both: this phone's copy and the list's "updated"
      var stamp = Math.max(savedAt, Date.now());
      if (sk.sketchId === id) {
        sk.syncedAt = stamp;
        var d = skReadDraft(sheet.id, id);
        if (d) { d.syncedAt = sk.syncedAt; try { localStorage.setItem("itask-sketch:" + sheet.id + ":" + id, JSON.stringify(d)); } catch (e) {} }
      }
      if (sendIndex) {
        skCloudIndexAt[id] = Date.now();
        return skIndexPut(sheet, { id: id, name: name, updatedAt: stamp, updatedBy: myPhoneNumber || null });
      }
    }).catch(function (err) {
      console.error("sketch upload failed:", err);
    });
  }
  // the project's list of sketches: add / update one entry, or drop it
  function skIndexPut(sheet, entry, remove) {
    var apply = function (list) {
      var out = (list || []).filter(function (x) { return x.id !== entry.id; });
      if (!remove) out.push(entry);
      return out;
    };
    if (!sheet.shared) {
      var live = data.sheets.find(function (s) { return s.id === sheet.id; });
      if (live) { live.sketches = apply(live.sketches); saveData(); }
      return Promise.resolve();
    }
    sheet.sketches = apply(sheet.sketches);
    return updateSharedSheetDataSafely(sheet.id, function (current) {
      return Object.assign({}, current, { sketches: apply(current.sketches) });
    }).then(function (newData) {
      var live2 = sharedSheets.find(function (s) { return s.id === sheet.id; });
      if (live2) live2.sketches = newData.sketches || [];
    });
  }

  // ---- down ---------------------------------------------------------------------
  function skFetchSketch(sheet, id) {
    return resolveFileUrl(skCloudPath(sheet.id, id)).then(fetchFileBlob).then(function (b) { return b.text(); }).then(JSON.parse);
  }
  // after opening: what's newer on the server comes down; what's waiting goes up
  function skCloudAfterOpen(sheet) {
    if (!supabaseClient) return;
    var id = sk.sketchId;
    var listed = (sheet.sketches || []).find(function (x) { return x.id === id; });
    var pending = sk.savedAt > (sk.syncedAt || 0);
    if (pending) { skCloudNow(true); return; }
    if (!listed || (listed.updatedAt || 0) <= (sk.syncedAt || 0)) return;
    skFetchSketch(sheet, id).then(function (remote) {
      if (sk.sketchId !== id || sk.savedAt > (sk.syncedAt || 0)) return; // drawn on meanwhile: keep
      skLoadDraft({ sketchId: id, name: listed.name, els: remote.els, scale: remote.scale, view: sk.els.length ? sk.view : remote.view,
        savedAt: listed.updatedAt, syncedAt: listed.updatedAt });
      skCloudUploaded[id] = JSON.stringify({ name: listed.name, els: sk.els, scale: sk.scale });
      skStoreOpened();
      skShowTitle();
      skUpdateButtons();
      skDraw();
    }).catch(function (err) { console.error("sketch download failed:", err); });
  }
  // the phone's copy of what's on the pad, without counting it as a change
  function skStoreOpened() {
    try {
      localStorage.setItem("itask-sketch:" + sk.sheetId + ":" + sk.sketchId, JSON.stringify({ sketchId: sk.sketchId, name: sk.sketchName,
        els: sk.els, scale: sk.scale, view: sk.view, savedAt: sk.savedAt, syncedAt: sk.syncedAt }));
      localStorage.setItem(SK_CUR_KEY + sk.sheetId, sk.sketchId);
    } catch (e) {}
  }
  // switches the pad to another sketch (after sending the open one up)
  function skSwitchTo(sheet, draft) {
    skCloudNow(true);
    skLoadDraft(draft);
    skStoreOpened();
    skShowTitle();
    skUpdateButtons();
    skDraw();
    skCloudAfterOpen(sheet);
  }

  // ---- the list -------------------------------------------------------------------
  var skListOverlay = document.getElementById("sketchListOverlay");
  function openSketchList() {
    var sheet = skSheet();
    if (!sheet) return;
    var list = document.getElementById("sketchListRows");
    list.innerHTML = "";
    var rows = (sheet.sketches || []).slice();
    if (!rows.some(function (x) { return x.id === sk.sketchId; })) rows.push({ id: sk.sketchId, name: sk.sketchName, updatedAt: sk.savedAt, local: true });
    rows.sort(function (a, b) { return (b.updatedAt || 0) - (a.updatedAt || 0); });
    rows.forEach(function (x) {
      var row = document.createElement("div");
      row.className = "sk-list-row" + (x.id === sk.sketchId ? " on" : "");
      var open = document.createElement("button");
      open.type = "button";
      open.className = "sk-list-open";
      var nm = document.createElement("b");
      nm.textContent = (x.id === sk.sketchId ? "✏️ " : "") + x.name;
      open.appendChild(nm);
      var meta = document.createElement("small");
      var when = x.updatedAt ? new Date(x.updatedAt).toLocaleString(calLocale(), { day: "numeric", month: "numeric", hour: "2-digit", minute: "2-digit" }) : "";
      var who = !x.updatedBy ? "" : x.updatedBy === myPhoneNumber ? tr("sketchByMe") : (resolveMemberName(sheet, x.updatedBy) || x.updatedBy);
      meta.textContent = [when, who].filter(Boolean).join(" · ");
      open.appendChild(meta);
      open.addEventListener("click", function () {
        skListOverlay.hidden = true;
        if (x.id === sk.sketchId) return;
        var mine = skReadDraft(sheet.id, x.id);
        skSwitchTo(sheet, mine || { sketchId: x.id, name: x.name, els: [], scale: null, view: null, savedAt: 0, syncedAt: 0 });
      });
      row.appendChild(open);
      var ren = document.createElement("button");
      ren.type = "button";
      ren.className = "sk-list-btn";
      ren.textContent = "✎";
      ren.title = tr("sketchRename");
      ren.addEventListener("click", function () { skAskName(sheet, x); });
      row.appendChild(ren);
      var del = document.createElement("button");
      del.type = "button";
      del.className = "sk-list-btn";
      del.textContent = "🗑";
      del.title = tr("deleteBtn");
      del.addEventListener("click", function () {
        // the question goes on top: the list steps aside till it's answered
        skListOverlay.hidden = true;
        askConfirm(tr("sketchDeleteConfirm").replace("{name}", x.name), function () { skDeleteSketch(sheet, x); });
      });
      row.appendChild(del);
      list.appendChild(row);
    });
    skListOverlay.hidden = false;
  }
  function skDeleteSketch(sheet, x) {
    try { localStorage.removeItem("itask-sketch:" + sheet.id + ":" + x.id); } catch (e) {}
    if (supabaseClient) supabaseClient.storage.from(LIBRARY_BUCKET).remove([skCloudPath(sheet.id, x.id)]).then(function () {}, function () {});
    var done = function () {
      if (x.id !== sk.sketchId) { openSketchList(); return; }
      // the open one went: the next newest, or a new one
      var next = (sheet.sketches || []).slice().sort(function (a, b) { return (b.updatedAt || 0) - (a.updatedAt || 0); })[0];
      skLoadDraft(next ? (skReadDraft(sheet.id, next.id) || { sketchId: next.id, name: next.name, els: [], savedAt: 0, syncedAt: 0 }) : skFreshDraft(sheet));
      skStoreOpened();
      skShowTitle();
      skUpdateButtons();
      skDraw();
      skCloudAfterOpen(sheet);
      skListOverlay.hidden = true;
    };
    if ((sheet.sketches || []).some(function (s) { return s.id === x.id; })) skIndexPut(sheet, { id: x.id }, true).then(done, done);
    else done();
  }
  var skNameOverlay = document.getElementById("sketchNameOverlay");
  var skNameInput = document.getElementById("sketchNameInput");
  var skNaming = null;
  function skAskName(sheet, x) {
    skNaming = { sheet: sheet, x: x };
    skNameInput.value = x.name;
    skNameOverlay.hidden = false;
    skNameInput.focus();
    skNameInput.select();
  }
  function skSaveName() {
    var n = skNaming;
    var name = skNameInput.value.replace(/\s+/g, " ").trim();
    if (!n || !name) return;
    skNaming = null;
    skNameOverlay.hidden = true;
    if (n.x.id === sk.sketchId) {
      sk.sketchName = name;
      skShowTitle();
      skSaveDraft();
      skCloudNow(true).then(openSketchList);
      return;
    }
    var d = skReadDraft(n.sheet.id, n.x.id);
    if (d) { d.name = name; try { localStorage.setItem("itask-sketch:" + n.sheet.id + ":" + n.x.id, JSON.stringify(d)); } catch (e) {} }
    var listed = (n.sheet.sketches || []).find(function (s) { return s.id === n.x.id; });
    if (listed) skIndexPut(n.sheet, Object.assign({}, listed, { name: name, updatedAt: Date.now(), updatedBy: myPhoneNumber || null })).then(openSketchList, openSketchList);
    else openSketchList();
  }
  document.getElementById("sketchNameOkBtn").addEventListener("click", skSaveName);
  document.getElementById("sketchNameCancelBtn").addEventListener("click", function () { skNaming = null; skNameOverlay.hidden = true; });
  skNameInput.addEventListener("keydown", function (e) { if (e.key === "Enter") { e.preventDefault(); skSaveName(); } });
  document.getElementById("sketchTitle").addEventListener("click", openSketchList);
  document.getElementById("sketchNewBtn").addEventListener("click", function () {
    var sheet = skSheet();
    if (!sheet) return;
    skListOverlay.hidden = true;
    skSwitchTo(sheet, skFreshDraft(sheet));
  });
  document.getElementById("sketchListCancelBtn").addEventListener("click", function () { skListOverlay.hidden = true; });
