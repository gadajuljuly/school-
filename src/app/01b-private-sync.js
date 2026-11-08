  // ---------------------------------------------------------------------
  // The private data (app_state: my own projects, settings...) on several
  // devices at once - the phone and the computer side by side. Every device
  // keeps the copy it last read from / wrote to the server (privateBase) and
  // that copy's updated_at. A save only lands if the server row is still the
  // one this device knows (compare-and-set on updated_at); if another device
  // saved meanwhile, its version is fetched, merged with ours item by item
  // (privateMerge3: what only we changed is kept, what only they changed is
  // taken, a task / activity / diary line both changed keeps ours), and the
  // save is retried. A light poll (updated_at only) brings the other
  // device's changes in while the app is open. Which project is open stays
  // each device's own.
  // ---------------------------------------------------------------------
  var privateBase = null;       // the server's data as this device last knew it
  var privateUpdatedAt = null;  // ... and its updated_at
  var privateWriting = false;
  var privateWriteAgain = false;
  var PRIVATE_LOCAL_KEYS = ["activeSheetId"];

  function privateClone(v) {
    return v === undefined ? undefined : JSON.parse(JSON.stringify(v));
  }
  // equal in content, whatever the key order (the server's jsonb reorders keys)
  function privateStable(v) {
    if (Array.isArray(v)) return "[" + v.map(privateStable).join(",") + "]";
    if (v && typeof v === "object") {
      return "{" + Object.keys(v).sort().filter(function (k) { return v[k] !== undefined; })
        .map(function (k) { return JSON.stringify(k) + ":" + privateStable(v[k]); }).join(",") + "}";
    }
    return JSON.stringify(v === undefined ? null : v);
  }
  function privateEq(a, b) {
    if (a === undefined || b === undefined) return a === b;
    return privateStable(a) === privateStable(b);
  }
  function privateIsPlain(v) {
    return !!v && typeof v === "object" && !Array.isArray(v);
  }
  function privateHasIds(arr) {
    return Array.isArray(arr) && arr.every(function (x) { return privateIsPlain(x) && x.id != null; });
  }

  // three-way merge: fresh = the server now, local = this device, base =
  // what both started from
  function privateMerge3(fresh, local, base) {
    if (privateEq(local, base)) return privateClone(fresh);
    if (privateEq(fresh, base) || privateEq(fresh, local)) return local;
    if (Array.isArray(fresh) && Array.isArray(local) && privateHasIds(fresh) && privateHasIds(local) &&
        (base === undefined || privateHasIds(base))) {
      var baseById = {};
      (base || []).forEach(function (x) { baseById[x.id] = x; });
      var localById = {};
      local.forEach(function (x) { localById[x.id] = x; });
      var out = [], seen = {};
      fresh.forEach(function (f) {
        seen[f.id] = true;
        var l = localById[f.id], b = baseById[f.id];
        if (l) { out.push(privateMerge3(f, l, b)); return; }
        // gone here: deleted on this device - unless the other one changed it since
        if (b && privateEq(f, b)) return;
        out.push(privateClone(f));
      });
      local.forEach(function (l) {
        if (seen[l.id]) return;
        var b = baseById[l.id];
        // gone there: deleted on the other device - unless we changed it since
        if (b && privateEq(l, b)) return;
        out.push(l);
      });
      return out;
    }
    if (privateIsPlain(fresh) && privateIsPlain(local)) {
      var b2 = privateIsPlain(base) ? base : {};
      var merged = {};
      var keys = {};
      Object.keys(fresh).concat(Object.keys(local), Object.keys(b2)).forEach(function (k) { keys[k] = true; });
      Object.keys(keys).forEach(function (k) {
        var v = privateMerge3(fresh[k], local[k], b2[k]);
        if (v !== undefined) merged[k] = v;
      });
      return merged;
    }
    return local; // both changed one value: this device's wins
  }

  function privateMergeData(fresh, local, base) {
    var merged = privateMerge3(fresh, local, base);
    PRIVATE_LOCAL_KEYS.forEach(function (k) {
      if (local[k] !== undefined) merged[k] = local[k];
    });
    // the same day's diary written on both devices: one log, all its lines
    (merged.sheets || []).forEach(function (s) {
      if (Array.isArray(s.siteLogs) && s.siteLogs.length > 1) s.siteLogs = combineSameDaySiteLogs(s.siteLogs);
    });
    return merged;
  }

  // the server's row as this device now knows it (after a read or a write)
  function privateNoteServer(serverData, updatedAt) {
    privateBase = privateClone(serverData);
    privateUpdatedAt = updatedAt || null;
  }

  function privateAdopt(merged) {
    data = normalizeData(merged);
    saveLocalData();
  }

  // Saves this device's data: only over the row it knows; another device's
  // newer save is merged in first. One save at a time.
  function pushPrivateData() {
    if (!supabaseClient || !SUPABASE_ROW_ID || dataLoadBlocked || !privateDataSettled) return;
    if (privateWriting) { privateWriteAgain = true; return; }
    privateWriting = true;
    privateWriteAgain = false;
    var attempt = function (tries) {
      var sent = privateClone(data);
      var stamp = new Date().toISOString();
      var write = privateUpdatedAt
        ? supabaseClient.from("app_state").update({ data: sent, updated_at: stamp })
            .eq("id", SUPABASE_ROW_ID).eq("updated_at", privateUpdatedAt).select("updated_at")
        : supabaseClient.from("app_state").upsert({ id: SUPABASE_ROW_ID, data: sent, updated_at: stamp }).select("updated_at");
      return write.then(function (result) {
        if (result && result.error) throw result.error;
        var rows = (result && result.data) || [];
        if (rows.length) {
          privateNoteServer(sent, rows[0].updated_at || stamp);
          clearPendingSyncDirty();
          return;
        }
        // another device saved since: take theirs in, then save again
        if (tries >= 3) throw new Error("app_state kept changing");
        return supabaseClient.from("app_state").select("data, updated_at").eq("id", SUPABASE_ROW_ID).maybeSingle()
          .then(function (res) {
            var row = res && res.data;
            if (!row || !row.data) throw new Error("app_state row missing");
            var fresh = normalizeData(row.data);
            privateAdopt(privateMergeData(fresh, data, privateBase || fresh));
            privateNoteServer(fresh, row.updated_at);
            privateRenderSoon();
            return attempt(tries + 1);
          });
      });
    };
    attempt(0).then(null, function () { scheduleSyncRetry(); }).then(function () {
      privateWriting = false;
      if (privateWriteAgain) pushPrivateData();
    });
  }

  // shows what came from the other device - not while typing in a field
  // (that would interrupt it): as soon as the field is left
  var privateRenderPending = false;
  function privateRenderSoon() {
    if (!isEditingActively()) { privateRenderPending = false; render(); return; }
    privateRenderPending = true;
  }
  document.addEventListener("focusout", function () {
    if (!privateRenderPending) return;
    setTimeout(function () { if (privateRenderPending && !isEditingActively()) { privateRenderPending = false; render(); } }, 0);
  });

  // the other device's changes, while the app is open
  var privatePulling = false;
  function pullPrivateData() {
    if (!supabaseClient || !SUPABASE_ROW_ID || dataLoadBlocked || !privateDataSettled || !privateUpdatedAt) return;
    if (privatePulling || privateWriting) return;
    privatePulling = true;
    supabaseClient.from("app_state").select("updated_at").eq("id", SUPABASE_ROW_ID).maybeSingle().then(function (res) {
      var at = res && res.data && res.data.updated_at;
      if (!at || at === privateUpdatedAt || privateWriting) return;
      return supabaseClient.from("app_state").select("data, updated_at").eq("id", SUPABASE_ROW_ID).maybeSingle().then(function (r2) {
        var row = r2 && r2.data;
        if (!row || !row.data || privateWriting) return;
        var fresh = normalizeData(row.data);
        var hadLocal = !privateEq(data, privateBase);
        var merged = privateMergeData(fresh, data, privateBase || fresh);
        var changedHere = !privateEq(merged, data);
        privateNoteServer(fresh, row.updated_at);
        if (changedHere) {
          privateAdopt(merged);
          privateRenderSoon();
        }
        if (hadLocal) pushPrivateData();
      });
    }).then(null, function () {}).then(function () { privatePulling = false; });
  }
  setInterval(function () { if (!document.hidden) pullPrivateData(); }, 15000);
  document.addEventListener("visibilitychange", function () {
    if (!document.hidden) pullPrivateData();
  });
