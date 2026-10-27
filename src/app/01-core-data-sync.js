  var LANG_STORAGE_KEY = "itask-lang";
  var currentLang = (function () {
    try {
      var saved = localStorage.getItem(LANG_STORAGE_KEY);
      if (saved && TRANSLATIONS.authSubtitle[saved]) return saved;
    } catch (e) {}
    return "he";
  })();
  var RTL_LANGS = { he: true, ar: true };
  document.documentElement.lang = currentLang;
  document.documentElement.dir = RTL_LANGS[currentLang] ? "rtl" : "ltr";

  function tr(key) {
    var entry = TRANSLATIONS[key];
    if (!entry) return "";
    return entry[currentLang] || entry.he || "";
  }

  function applyStaticTranslations() {
    document.querySelectorAll("[data-i18n]").forEach(function (el) {
      el.textContent = tr(el.getAttribute("data-i18n"));
    });
    document.querySelectorAll("[data-i18n-ph]").forEach(function (el) {
      el.setAttribute("placeholder", tr(el.getAttribute("data-i18n-ph")));
    });
    document.querySelectorAll("[data-i18n-title]").forEach(function (el) {
      el.setAttribute("title", tr(el.getAttribute("data-i18n-title")));
    });
  }

  function setLang(lang) {
    if (!TRANSLATIONS.authSubtitle[lang]) lang = "he";
    currentLang = lang;
    try { localStorage.setItem(LANG_STORAGE_KEY, lang); } catch (e) {}
    document.documentElement.lang = lang;
    document.documentElement.dir = RTL_LANGS[lang] ? "rtl" : "ltr";
    applyStaticTranslations();
    if (typeof render === "function" && typeof data !== "undefined") render();
  }

  var splashScreen = document.getElementById("splashScreen");
  function hideSplash() {
    if (!splashScreen || splashScreen.hidden) return;
    splashScreen.classList.add("splash-hide");
    setTimeout(function () { splashScreen.hidden = true; }, 500);
  }

  var STORAGE_KEY = "daily-tasks-sheets-v1";
  function localStorageKey() {
    return SUPABASE_ROW_ID ? (STORAGE_KEY + ":" + SUPABASE_ROW_ID) : STORAGE_KEY;
  }
  var ROW_MARK_BASE_D = "M4 3 L16 15 M1.5 3 L6.5 3 M13.5 3 L18.5 3 M1.5 15 L6.5 15 M13.5 15 L18.5 15";
  var ROW_MARK_HALF_D = "M16 3 L10 9";
  var ROW_MARK_FULL_D = "M16 3 L4 15";

  function rowMarkSvg(status) {
    var progressD = status === 2 ? ROW_MARK_FULL_D : status === 1 ? ROW_MARK_HALF_D : "";
    var progressPath = progressD
      ? '<path d="' + progressD + '" fill="none" stroke="var(--danger)" stroke-width="2.1" stroke-linecap="round"/>'
      : "";
    return '<svg viewBox="0 0 20 18" xmlns="http://www.w3.org/2000/svg"><path d="' + ROW_MARK_BASE_D + '" fill="none" stroke="currentColor" stroke-width="2.1" stroke-linecap="round"/>' + progressPath + '</svg>';
  }

  function uid() {
    return Date.now().toString(36) + Math.random().toString(36).slice(2, 8);
  }

  function todayISO() {
    var d = new Date();
    var y = d.getFullYear();
    var m = String(d.getMonth() + 1).padStart(2, "0");
    var day = String(d.getDate()).padStart(2, "0");
    return y + "-" + m + "-" + day;
  }
  function addDaysToISO(iso, delta) {
    var parts = iso.split("-");
    var d = new Date(Number(parts[0]), Number(parts[1]) - 1, Number(parts[2]));
    d.setDate(d.getDate() + delta);
    var y = d.getFullYear();
    var m = String(d.getMonth() + 1).padStart(2, "0");
    var day = String(d.getDate()).padStart(2, "0");
    return y + "-" + m + "-" + day;
  }
  function isoToDisplay(iso) {
    var parts = iso.split("-");
    return parts[2] + "/" + parts[1];
  }

  function rollSheetsForward(sheets) {
    var today = todayISO();
    sheets.forEach(function (sheet) {
      (sheet.tasks || []).forEach(function (t) {
        if (typeof t.date !== "string") t.date = today;
        if (t.type !== "note" && t.status !== 2 && t.date < today) t.date = today;
      });
    });
  }

  function applyDailyRollover(data) {
    var today = todayISO();
    if (data.lastRolloverDate === today) return false;
    rollSheetsForward(data.sheets);
    data.lastRolloverDate = today;
    return true;
  }

  function defaultData() {
    var sheetId = uid();
    return {
      sheets: [{ id: sheetId, name: tr("projectWord") + " 1", tasks: [], reports: [], files: [], siteLogs: [], logoId: null }],
      activeSheetId: sheetId,
      logos: []
    };
  }

  var SITE_LOG_ATTENDANCE_COLUMNS = ["foreman", "engineer", "workers", "operators", "consultants", "surveyor"];
  var SITE_LOG_TOOLS_COLUMNS = ["excavator", "loader", "bagger", "miniBagger", "bobcat", "roller", "truck", "arrowCart", "waterTanker", "concretePump", "crane", "telescopic", "drillingMachine", "pirkit"];

  function normalizeSiteLog(log) {
    if (!log.attendance || typeof log.attendance !== "object") log.attendance = {};
    SITE_LOG_ATTENDANCE_COLUMNS.forEach(function (col) {
      if (!Array.isArray(log.attendance[col])) log.attendance[col] = [];
    });
    if (!log.tools || typeof log.tools !== "object" || Array.isArray(log.tools)) log.tools = {};
    SITE_LOG_TOOLS_COLUMNS.forEach(function (col) {
      var val = log.tools[col];
      if (Array.isArray(val)) {
        val.forEach(function (entry) {
          if (!entry.id) entry.id = uid();
          if (typeof entry.qty !== "string") entry.qty = entry.qty ? String(entry.qty) : "";
          if (typeof entry.note !== "string") entry.note = "";
        });
      } else if (typeof val === "string") {
        log.tools[col] = val.trim() ? [{ id: uid(), qty: val, note: "" }] : [];
      } else if (val && typeof val === "object") {
        var qty = typeof val.qty === "string" ? val.qty : (val.qty ? String(val.qty) : "");
        var note = typeof val.note === "string" ? val.note : "";
        log.tools[col] = (qty || note) ? [{ id: uid(), qty: qty, note: note }] : [];
      } else {
        log.tools[col] = [];
      }
    });
    if (!Array.isArray(log.contractors)) log.contractors = [];
    if (!Array.isArray(log.works)) log.works = [];
    if (!Array.isArray(log.procurement)) log.procurement = [];
    if (!Array.isArray(log.planned)) log.planned = [];
    if (!Array.isArray(log.photos)) log.photos = [];
    log.procurement.forEach(function (row) {
      if (typeof row.item !== "string") row.item = "";
      if (typeof row.quantity !== "string") row.quantity = "";
      if (typeof row.supplier !== "string") row.supplier = "";
    });
    if (typeof log.closed !== "boolean") log.closed = false;
    if (typeof log.number !== "number") log.number = null;
    if (typeof log.closedAt !== "number") log.closedAt = null;
    if (!log.closedFile || typeof log.closedFile !== "object") log.closedFile = null;
    return log;
  }

  function normalizeData(parsed) {
    if (!parsed || !Array.isArray(parsed.sheets) || !parsed.sheets.length) return null;
    parsed.sheets.forEach(function (sheet) {
      (sheet.tasks || []).forEach(function (t) {
        if (typeof t.status !== "number") {
          t.status = t.done ? 2 : 0;
        }
        if (typeof t.urgent !== "boolean") {
          t.urgent = t.priority === "high";
        }
        if (!t.logEntry || typeof t.logEntry !== "object") t.logEntry = null;
        delete t.done;
        delete t.priority;
      });
      if (!Array.isArray(sheet.reports)) sheet.reports = [];
      if (!Array.isArray(sheet.files)) sheet.files = [];
      if (!Array.isArray(sheet.siteLogs)) sheet.siteLogs = [];
      if (typeof sheet.logoId !== "string") sheet.logoId = null;
      sheet.siteLogs.forEach(normalizeSiteLog);
      sheet.reports.forEach(function (report) {
        if (!Array.isArray(report.rows)) report.rows = [];
        if (!report.closedFile || typeof report.closedFile !== "object") report.closedFile = null;
        report.rows.forEach(function (row) {
          if (typeof row.status !== "number") row.status = 0;
          if (row.priority !== "urgent" && row.priority !== "regular") row.priority = null;
          if (typeof row.dueDate !== "string") row.dueDate = null;
          if (typeof row.image !== "string") row.image = null;
        });
      });
    });
    if (!Array.isArray(parsed.logos)) parsed.logos = [];
    parsed.logos.forEach(function (logo) {
      if (typeof logo.name !== "string") logo.name = "";
      if (typeof logo.dataUrl !== "string") logo.dataUrl = "";
    });
    delete parsed.reports;
    return parsed;
  }
  function loadLocalData() {
    try {
      return normalizeData(JSON.parse(localStorage.getItem(localStorageKey())));
    } catch (e) {
      return null;
    }
  }
  function saveLocalData() {
    try {
      localStorage.setItem(localStorageKey(), JSON.stringify(data));
    } catch (e) {}
  }
  function countTasks(d) {
    var total = 0;
    (d.sheets || []).forEach(function (s) { total += (s.tasks || []).length; });
    return total;
  }
  function findLegacyLocalData() {
    try {
      var currentKey = localStorageKey();
      var prefix = STORAGE_KEY + ":";
      var best = null;
      var bestCount = 0;
      for (var i = 0; i < localStorage.length; i++) {
        var key = localStorage.key(i);
        if (key === currentKey || (key !== STORAGE_KEY && key.indexOf(prefix) !== 0)) continue;
        var parsed = normalizeData(JSON.parse(localStorage.getItem(key)));
        var count = countTasks(parsed);
        if (count > bestCount) { best = parsed; bestCount = count; }
      }
      return best;
    } catch (e) {
      return null;
    }
  }

  var SUPABASE_URL = "https://oqvqrqhtywcqdnftaovk.supabase.co";
  var SUPABASE_KEY = "sb_publishable_K6dRlzpWSRV7O-Dy_C8ypA_Yep2P3x7";
  var SUPABASE_ROW_ID = null;
  var myPhoneNumber = null;
  var sharedSheets = [];
  var supabaseClient = (window.supabase && SUPABASE_URL && SUPABASE_KEY)
    ? window.supabase.createClient(SUPABASE_URL, SUPABASE_KEY)
    : null;

  var FIREBASE_CONFIG = {
    apiKey: "AIzaSyDdOBjiG2pO7pTkRC44gLJQ_gEPiTaHTPU",
    authDomain: "itask-93f4f.firebaseapp.com",
    projectId: "itask-93f4f",
    storageBucket: "itask-93f4f.firebasestorage.app",
    messagingSenderId: "480651316688",
    appId: "1:480651316688:web:7a4378d6347fe22dc67dd5"
  };
  var firebaseAuth = (window.firebase && FIREBASE_CONFIG.apiKey)
    ? (firebase.initializeApp(FIREBASE_CONFIG), firebase.auth())
    : null;
  if (firebaseAuth) {
    firebaseAuth.setPersistence(firebase.auth.Auth.Persistence.LOCAL).catch(function () {});
    // Ask the browser/WebView to keep this site's storage (where the sign-in
    // lives) instead of treating it as evictable cache when space runs low -
    // a tester was once sent back to the sign-in screen for no visible reason.
    if (navigator.storage && navigator.storage.persist) {
      navigator.storage.persisted().then(function (already) {
        if (!already) return navigator.storage.persist();
      }).catch(function () {});
    }
    // Opt-in only (?e2e=1), never on for real users: automated test runners
    // (GitHub Actions, etc.) run from datacenter IPs that Google's invisible
    // reCAPTCHA routinely blocks regardless of using a Firebase test phone
    // number - that number only skips the real SMS, not this client-side
    // challenge. This is Firebase's own documented bypass for exactly that
    // case, scoped to Firebase's test phone numbers only, which already
    // require configuring them in the Firebase console - it cannot be used
    // to skip verification for a real phone number.
    if (new URLSearchParams(window.location.search).get("e2e") === "1") {
      firebaseAuth.settings.appVerificationDisabledForTesting = true;
    }
  }

  function phoneToUuid(phone) {
    return window.crypto.subtle.digest("SHA-256", new TextEncoder().encode("itask-phone:" + phone)).then(function (buf) {
      var bytes = Array.prototype.slice.call(new Uint8Array(buf), 0, 16);
      var hex = bytes.map(function (b) { return b.toString(16).padStart(2, "0"); }).join("");
      return hex.slice(0, 8) + "-" + hex.slice(8, 12) + "-4" + hex.slice(13, 16) + "-a" + hex.slice(17, 20) + "-" + hex.slice(20, 32);
    });
  }

  var SHARED_TABLE = "shared_projects";

  function saveData() {
    if (dataLoadBlocked || !privateDataSettled) return;
    editedSinceLastLoad = true;
    saveLocalData();
    if (supabaseClient) {
      markPendingSyncDirty();
      supabaseClient.from("app_state")
        .upsert({ id: SUPABASE_ROW_ID, data: data, updated_at: new Date().toISOString() })
        .then(function (result) {
          if (result && result.error) { scheduleSyncRetry(); return; }
          clearPendingSyncDirty();
        }, function () { scheduleSyncRetry(); });
    }
    saveSharedSheets();
  }

  // Merges a fresh-from-server array of {id,...} items with this device's
  // in-memory copy, using the last-confirmed-synced copy to tell "we
  // changed/added/removed this one locally" apart from "we just haven't
  // touched this since it loaded" - so an item neither side touched always
  // comes from the fresh server copy (never silently reverted), an item
  // only WE touched (added, edited, or deleted) keeps our version, and an
  // item added or removed by someone else meanwhile is preserved as such
  // even though our local copy doesn't reflect it yet.
  function mergeSharedArrayByLocalChanges(freshArr, localArr, syncedArr) {
    freshArr = freshArr || []; localArr = localArr || []; syncedArr = syncedArr || [];
    var syncedIds = {}; var syncedById = {};
    syncedArr.forEach(function (i) { syncedIds[i.id] = true; syncedById[i.id] = i; });
    var localById = {}; localArr.forEach(function (i) { localById[i.id] = i; });
    var result = [];
    var seen = {};
    freshArr.forEach(function (freshItem) {
      seen[freshItem.id] = true;
      var localItem = localById[freshItem.id];
      if (!localItem) {
        if (syncedIds[freshItem.id]) return; // we deleted it locally - keep it deleted
        result.push(freshItem); // someone else added it remotely - keep it
        return;
      }
      var weChangedIt = JSON.stringify(syncedById[freshItem.id]) !== JSON.stringify(localItem);
      result.push(weChangedIt ? localItem : freshItem);
    });
    localArr.forEach(function (localItem) {
      if (seen[localItem.id]) return;
      if (!syncedIds[localItem.id]) result.push(localItem); // a genuinely new local addition
      // else: known at last sync but fresh no longer has it - someone else
      // deleted it remotely; don't resurrect it just because our local
      // copy (loaded before that deletion) still has it.
    });
    return result;
  }

  function mergeSharedScalarByLocalChange(freshVal, localVal, syncedVal) {
    return JSON.stringify(localVal) !== JSON.stringify(syncedVal) ? localVal : freshVal;
  }

  // Only ever pushes a sheet whose tasks/reports/siteLogs/ended/logoId
  // actually differ from what we last confirmed the server holds - a save
  // triggered by editing sheet A no longer re-uploads every OTHER shared
  // sheet's possibly-stale local cache over whatever a concurrent member
  // just wrote to it. For the sheet(s) that did change, the write is
  // version-gated (updateSharedSheetDataSafely) and merged per-item
  // against fresh data on every retry, instead of blindly overwriting the
  // whole row - so two members editing the SAME shared project around the
  // same time no longer silently drop each other's changes.
  function saveSharedSheets() {
    if (!supabaseClient) return;
    sharedSheets.forEach(function (sheet) {
      if (!sheet._syncedData) {
        // Never confirmed to exist on the server (freshly created this
        // session, via "new shared project" or converting a private one) -
        // a plain insert, not the version-gated update path below, which
        // can only ever modify a row that's already there.
        supabaseClient.from(SHARED_TABLE).insert({
          id: sheet.id,
          name: sheet.name,
          data: {
            tasks: sheet.tasks || [], reports: sheet.reports || [], files: [], folders: sheet.folders || null,
            siteLogs: sheet.siteLogs || [], ended: sheet.ended || false, endedDate: sheet.endedDate || null, logoId: sheet.logoId || null,
            workPlan: sheet.workPlan || [], workHammocks: sheet.workHammocks || [], workBaseline: sheet.workBaseline || null
          },
          data_version: 1,
          members: sheet.members || [],
          member_names: sheet.memberNames || {},
          created_by: sheet.createdBy || myPhoneNumber,
          messages: sheet.messages || [],
          messages_version: 1,
          updated_at: new Date().toISOString()
        }).then(function (result) {
          var err = result && result.error;
          if (err) {
            // A duplicate-key error here means our own earlier insert
            // attempt actually landed but we never saw the response (a
            // dropped ack, not a real failure) - treat it as confirmed
            // rather than retrying an insert that will only conflict again.
            if (err.code !== "23505" && !/duplicate key/i.test(err.message || "")) { scheduleSyncRetry(); return; }
          }
          // Deep-cloned - see the comment on sharedRowToSheet's _syncedData
          // for why this must never alias the live sheet's own arrays.
          sheet._syncedData = JSON.parse(JSON.stringify({
            tasks: sheet.tasks || [], reports: sheet.reports || [], siteLogs: sheet.siteLogs || [],
            ended: !!sheet.ended, endedDate: sheet.endedDate || null, logoId: sheet.logoId || null
          }));
        }, function () { scheduleSyncRetry(); });
        return;
      }
      var synced = sheet._syncedData || {};
      var local = {
        tasks: sheet.tasks || [], reports: sheet.reports || [], siteLogs: sheet.siteLogs || [],
        ended: !!sheet.ended, endedDate: sheet.endedDate || null, logoId: sheet.logoId || null
      };
      var syncedComparable = {
        tasks: synced.tasks || [], reports: synced.reports || [], siteLogs: synced.siteLogs || [],
        ended: !!synced.ended, endedDate: synced.endedDate || null, logoId: synced.logoId || null
      };
      if (JSON.stringify(local) === JSON.stringify(syncedComparable)) return;

      updateSharedSheetDataSafely(sheet.id, function (freshData) {
        return {
          tasks: mergeSharedArrayByLocalChanges(freshData.tasks, local.tasks, syncedComparable.tasks),
          reports: mergeSharedArrayByLocalChanges(freshData.reports, local.reports, syncedComparable.reports),
          files: [],
          folders: freshData.folders || null,
          siteLogs: mergeSharedArrayByLocalChanges(freshData.siteLogs, local.siteLogs, syncedComparable.siteLogs),
          ended: mergeSharedScalarByLocalChange(freshData.ended || false, local.ended, syncedComparable.ended),
          endedDate: mergeSharedScalarByLocalChange(freshData.endedDate || null, local.endedDate, syncedComparable.endedDate),
          logoId: mergeSharedScalarByLocalChange(freshData.logoId || null, local.logoId, syncedComparable.logoId)
        };
      }).then(function (mergedData) {
        var liveSheet = sharedSheets.find(function (s) { return s.id === sheet.id; });
        if (liveSheet) {
          liveSheet.tasks = mergedData.tasks;
          liveSheet.reports = mergedData.reports;
          liveSheet.siteLogs = mergedData.siteLogs;
          liveSheet.ended = mergedData.ended;
          liveSheet.endedDate = mergedData.endedDate;
          liveSheet.logoId = mergedData.logoId;
          liveSheet.folders = mergedData.folders;
          // Deep-cloned - liveSheet.tasks/reports/siteLogs above are the
          // SAME array objects as mergedData's; _syncedData must not alias
          // them (see the comment on sharedRowToSheet's _syncedData).
          liveSheet._syncedData = JSON.parse(JSON.stringify({
            tasks: mergedData.tasks, reports: mergedData.reports, siteLogs: mergedData.siteLogs,
            ended: mergedData.ended, endedDate: mergedData.endedDate, logoId: mergedData.logoId
          }));
          render();
        }
      }, function () { scheduleSyncRetry(); });
    });
  }

  // Renaming a shared project, or editing its member list/names via the
  // shared-project settings modal, is rare and user-initiated (unlike
  // task/report edits, which fire on every keystroke's worth of activity) -
  // a plain fresh-read-immediately-before-write is enough here, the same
  // safe pattern chat messages already use, without needing its own
  // version column.
  function updateSharedProjectSettings(sheetId, mutateFn) {
    if (!supabaseClient) return Promise.resolve();
    return supabaseClient.from(SHARED_TABLE).select("name, members, member_names").eq("id", sheetId).maybeSingle()
      .then(function (result) {
        if (result && result.error) throw result.error;
        var row = result && result.data;
        var current = { name: row && row.name, members: (row && row.members) || [], memberNames: (row && row.member_names) || {} };
        var updated = mutateFn(current);
        return supabaseClient.from(SHARED_TABLE)
          .update({ name: updated.name, members: updated.members, member_names: updated.memberNames, updated_at: new Date().toISOString() })
          .eq("id", sheetId)
          .then(function (updateResult) {
            if (updateResult && updateResult.error) throw updateResult.error;
            var liveSheet = sharedSheets.find(function (s) { return s.id === sheetId; });
            if (liveSheet) {
              liveSheet.name = updated.name;
              liveSheet.members = updated.members;
              liveSheet.memberNames = updated.memberNames;
            }
            return updated;
          });
      });
  }

  // Offline resilience: saveLocalData() above always succeeds (it's just
  // localStorage), but the Supabase upsert can fail or never even fire
  // (no connectivity) - previously that failure was silently swallowed and
  // never retried, so an edit made offline could simply never reach the
  // server, and worse, the *next* app load's remote fetch would overwrite
  // the still-unsynced local snapshot with the older server row. This flag
  // (persisted so it survives a reload/app close) tracks "the local copy
  // may be ahead of what's confirmed saved" and drives a retry loop plus a
  // small visible badge, and startWithSupabase() below checks it to avoid
  // clobbering an unsynced local edit with a stale remote read.
  var pendingSyncDirty = false;
  var syncRetryTimer = null;
  function pendingSyncStorageKey() { return "itask-pending-sync:" + SUPABASE_ROW_ID; }
  function markPendingSyncDirty() {
    pendingSyncDirty = true;
    try { localStorage.setItem(pendingSyncStorageKey(), String(Date.now())); } catch (e) {}
    updateOfflineSyncBadge();
  }
  function clearPendingSyncDirty() {
    pendingSyncDirty = false;
    try { localStorage.removeItem(pendingSyncStorageKey()); } catch (e) {}
    updateOfflineSyncBadge();
  }
  // A pending-sync flag from days ago is more likely an abandoned device
  // whose cached data has since fallen behind (an old browser tab, a phone
  // that sat unused) than a genuine offline edit still worth pushing -
  // honoring it would silently overwrite the server with that stale
  // snapshot, wiping out real work done elsewhere in the meantime. Only
  // trust the flag while it's recent; a stale one is discarded instead of
  // acted on. This also self-heals any device already carrying the old
  // (timestamp-less) "1" marker from before this check existed, since that
  // parses as an ancient timestamp and is treated as stale too.
  var PENDING_SYNC_STALE_MS = 24 * 60 * 60 * 1000;
  function hasPendingSyncFromPreviousSession() {
    try {
      var raw = localStorage.getItem(pendingSyncStorageKey());
      if (!raw) return false;
      var ts = parseInt(raw, 10);
      if (!ts || Date.now() - ts > PENDING_SYNC_STALE_MS) {
        try { localStorage.removeItem(pendingSyncStorageKey()); } catch (e) {}
        return false;
      }
      return true;
    } catch (e) { return false; }
  }
  function scheduleSyncRetry() {
    updateOfflineSyncBadge();
    if (syncRetryTimer) return;
    syncRetryTimer = setTimeout(function () {
      syncRetryTimer = null;
      flushPendingSync();
    }, 20000);
  }
  function flushPendingSync() {
    if (!pendingSyncDirty || !supabaseClient || dataLoadBlocked || !privateDataSettled) return;
    supabaseClient.from("app_state")
      .upsert({ id: SUPABASE_ROW_ID, data: data, updated_at: new Date().toISOString() })
      .then(function (result) {
        if (result && result.error) { scheduleSyncRetry(); return; }
        clearPendingSyncDirty();
      }, function () { scheduleSyncRetry(); });
    saveSharedSheets();
  }
  var offlineSyncBadge = document.getElementById("offlineSyncBadge");
  function updateOfflineSyncBadge() {
    if (offlineSyncBadge) offlineSyncBadge.hidden = !pendingSyncDirty;
  }
  window.addEventListener("online", flushPendingSync);
  document.addEventListener("visibilitychange", function () {
    if (document.visibilityState === "visible") flushPendingSync();
  });

  var BACKUP_TABLE = "app_state_backups";
  var BACKUP_MIN_INTERVAL_MS = 30 * 60 * 1000;
  var BACKUP_KEEP_COUNT = 20;

  function backupStorageKey() {
    return "itask-last-backup:" + SUPABASE_ROW_ID;
  }

  function pruneOldBackups() {
    supabaseClient.from(BACKUP_TABLE).select("id").eq("row_id", SUPABASE_ROW_ID).order("created_at", { ascending: false })
      .then(function (result) {
        var rows = (result && result.data) || [];
        var toDelete = rows.slice(BACKUP_KEEP_COUNT).map(function (r) { return r.id; });
        if (toDelete.length) {
          supabaseClient.from(BACKUP_TABLE).delete().in("id", toDelete).then(function () {}, function () {});
        }
      }, function () {});
  }

  // Best-effort rolling backup: whenever we've just confirmed we're holding
  // real data (not a bare fresh default), snapshot it into a separate
  // history table at most once per BACKUP_MIN_INTERVAL_MS, so a future bug
  // or mistake has something to restore from beyond just the live row.
  function maybeBackupData() {
    if (!supabaseClient || !SUPABASE_ROW_ID || dataLoadBlocked) return;
    var lastBackupAt = 0;
    try { lastBackupAt = Number(localStorage.getItem(backupStorageKey())) || 0; } catch (e) {}
    if (Date.now() - lastBackupAt < BACKUP_MIN_INTERVAL_MS) return;
    try {
      supabaseClient.from(BACKUP_TABLE).insert({ row_id: SUPABASE_ROW_ID, data: data }).then(function (result) {
        if (result && result.error) return;
        try { localStorage.setItem(backupStorageKey(), String(Date.now())); } catch (e) {}
        try { pruneOldBackups(); } catch (e) {}
      }, function () {});
    } catch (e) {}
  }

  var data = defaultData();
  var dataLoadBlocked = false;
  // The private app_state read and the shared-projects read both fire in
  // parallel on startup (loadSharedSheets() is not awaited by
  // startWithSupabase()). If the shared read resolves first, its own
  // render() call would show a fully-interactive app with `data` still at
  // its unresolved initial default - no error overlay, since that's only
  // shown once the private read settles - and any tap before the private
  // read finishes could saveData() that empty default over the real row.
  // Gate every render() triggered by the shared-projects path behind this
  // flag so the very first paint always reflects the private read's outcome.
  var privateDataSettled = false;
  // Set whenever saveData() actually runs. Lets startWithSupabase() tell
  // whether the user made a real edit against an instantly-rendered local
  // snapshot before the authoritative server fetch came back - if so, the
  // fetch's (now possibly stale-relative-to-that-edit) result must not
  // blindly overwrite `data`, or a fast edit could be silently lost.
  var editedSinceLastLoad = false;
  var state = { renamingSheetId: null, menuOpen: false, editingTaskId: null, viewDate: todayISO(), searchOpen: false, highlightTaskId: null, viewMode: "tasks", showingCompleted: false };
  // The diary (יומן) always shows state.viewDate's own log - kept in sync
  // each render() while viewMode is "diary" (see openDiaryView() below).
  var activeSiteLogDate = null;

  var dateLabel = document.getElementById("dateLabel");
  var sheetsBarPrivate = document.getElementById("sheetsBarPrivate");
  var sheetsBarShared = document.getElementById("sheetsBarShared");
  var taskInput = document.getElementById("taskInput");
  var addForm = document.getElementById("addForm");
  var taskList = document.getElementById("taskList");
  var taskReminderIconsLayer = document.getElementById("taskReminderIconsLayer");
  var emptyState = document.getElementById("emptyState");
  var emptyStateText = document.getElementById("emptyStateText");
  var showCompletedTasksBtn = document.getElementById("showCompletedTasksBtn");
  var showActiveTasksBtn = document.getElementById("showActiveTasksBtn");
  var sheetTitle = document.getElementById("sheetTitle");
  var menuBtn = document.getElementById("menuBtn");
  var menuPanel = document.getElementById("menuPanel");
  var searchBtn = document.getElementById("searchBtn");
  var searchPanel = document.getElementById("searchPanel");
  var searchInput = document.getElementById("searchInput");
  var searchResults = document.getElementById("searchResults");
  var confirmOverlay = document.getElementById("confirmOverlay");
  var confirmMessage = document.getElementById("confirmMessage");
  var confirmYesBtn = document.getElementById("confirmYesBtn");
  var confirmNoBtn = document.getElementById("confirmNoBtn");
  var pendingConfirmYes = null;

  function askConfirm(message, onYes) {
    confirmMessage.textContent = message;
    pendingConfirmYes = onYes;
    confirmOverlay.hidden = false;
  }
  function closeConfirm() {
    confirmOverlay.hidden = true;
    pendingConfirmYes = null;
  }
  confirmYesBtn.addEventListener("click", function () {
    var action = pendingConfirmYes;
    closeConfirm();
    if (action) action();
  });
  confirmNoBtn.addEventListener("click", closeConfirm);
  confirmOverlay.addEventListener("click", function (e) {
    if (e.target === confirmOverlay) closeConfirm();
  });

  var moveTaskOverlay = document.getElementById("moveTaskOverlay");
  var moveTaskProjectsOverlay = document.getElementById("moveTaskProjectsOverlay");
  var moveTaskProjects = document.getElementById("moveTaskProjects");
  var moveTaskProjectsTitle = document.getElementById("moveTaskProjectsTitle");
  var moveTaskProjectsCancelBtn = document.getElementById("moveTaskProjectsCancelBtn");
  var moveModeMoveBtn = document.getElementById("moveModeMoveBtn");
  var moveModeCopyBtn = document.getElementById("moveModeCopyBtn");
  var shareTaskBtn = document.getElementById("shareTaskBtn");
  var taskReminderBtn = document.getElementById("taskReminderBtn");
  var taskChatQuoteBtn = document.getElementById("taskChatQuoteBtn");
  var taskCalendarReminderBtn = document.getElementById("taskCalendarReminderBtn");
  var removeFromCalendarBtn = document.getElementById("removeFromCalendarBtn");
  var taskReminderOverlay = document.getElementById("taskReminderOverlay");
  var taskReminderCurrentStatus = document.getElementById("taskReminderCurrentStatus");
  var taskReminderEvery30Btn = document.getElementById("taskReminderEvery30Btn");
  var taskReminderEvery60Btn = document.getElementById("taskReminderEvery60Btn");
  var taskReminderTimeToggleBtn = document.getElementById("taskReminderTimeToggleBtn");
  var taskReminderTimeRow = document.getElementById("taskReminderTimeRow");
  var taskReminderTimeInput = document.getElementById("taskReminderTimeInput");
  var taskReminderDateInput = document.getElementById("taskReminderDateInput");
  var taskReminderTimeConfirmBtn = document.getElementById("taskReminderTimeConfirmBtn");
  var taskReminderOffBtn = document.getElementById("taskReminderOffBtn");
  var taskReminderCancelBtn = document.getElementById("taskReminderCancelBtn");
  var convertToNoteBtn = document.getElementById("convertToNoteBtn");
  var taskWorkPlanBtn = document.getElementById("taskWorkPlanBtn");
  var taskToPlanBtn = document.getElementById("taskToPlanBtn");
  var convertToTaskBtn = document.getElementById("convertToTaskBtn");
  var transferToLogBtn = document.getElementById("transferToLogBtn");
  var removeFromLogBtn = document.getElementById("removeFromLogBtn");
  var moveTaskCancelBtn = document.getElementById("moveTaskCancelBtn");
  var pendingMoveTaskId = null;
  var longPressTimer = null;
  var lastScrolledSheetId = null;
  var moveTaskMode = "move";

  function moveOrCopyTask(taskId, targetSheetId, mode) {
    var sourceSheet = activeSheet();
    var idx = sourceSheet.tasks.findIndex(function (x) { return x.id === taskId; });
    if (idx === -1) return;
    var task = sourceSheet.tasks[idx];
    var targetSheet = allSheets().find(function (s) { return s.id === targetSheetId; });
    if (!targetSheet) return;

    if (mode === "copy") {
      targetSheet.tasks.push({
        id: uid(),
        text: task.text,
        status: task.status,
        urgent: task.urgent,
        date: task.date,
        createdAt: Date.now()
      });
    } else {
      sourceSheet.tasks.splice(idx, 1);
      // a work-plan activity's task moved elsewhere is just a task there
      if (task.planItemId) {
        workPlanTaskRemoved(sourceSheet, task);
        task = Object.assign({}, task, { id: uid() });
        delete task.planItemId;
      }
      targetSheet.tasks.push(task);
    }
    saveData();
    render();
  }

  function renderMoveTaskProjects() {
    moveTaskProjects.innerHTML = "";
    var others = allSheets().filter(function (s) { return s.id !== data.activeSheetId; });
    if (!others.length) {
      var empty = document.createElement("div");
      empty.className = "move-task-empty";
      empty.textContent = tr("noOtherProjects");
      moveTaskProjects.appendChild(empty);
      return;
    }
    others.forEach(function (s) {
      var btn = document.createElement("button");
      btn.type = "button";
      btn.textContent = s.name;
      btn.addEventListener("click", function () {
        moveOrCopyTask(pendingMoveTaskId, s.id, moveTaskMode);
        closeMoveTask();
      });
      moveTaskProjects.appendChild(btn);
    });
  }

  function openMoveTaskModal(taskId) {
    pendingMoveTaskId = taskId;
    moveTaskMode = "move";
    var task = activeSheet().tasks.find(function (t) { return t.id === taskId; });
    convertToNoteBtn.hidden = !task || task.type === "note";
    convertToTaskBtn.hidden = !task || task.type !== "note";
    taskWorkPlanBtn.hidden = !task || !task.planItemId;
    taskToPlanBtn.hidden = !task || !!task.planItemId || task.type === "note" ||
      activeSheet().id === HEAD_OFFICE_SHEET_ID || !!task.headOfficeVirtual;
    var logEligible = task && task.type === "task" && task.status === 2;
    transferToLogBtn.hidden = !logEligible || !!task.logEntry;
    removeFromLogBtn.hidden = !logEligible || !task.logEntry;
    taskChatQuoteBtn.hidden = !activeSheet().shared;
    taskCalendarReminderBtn.hidden = !calPlugin;
    var menuCalIcon = taskCalendarReminderBtn.querySelector(".cal-live-icon");
    if (task) migrateCalendarReminderToLink(task);
    var myLink = task ? getMyCalendarLink(activeSheet(), task) : null;
    var menuLink = calPlugin && isCalendarLinkShown(myLink);
    if (menuLink) menuCalIcon.dataset.at = myLink.eventAt;
    else delete menuCalIcon.dataset.at;
    removeFromCalendarBtn.hidden = !menuLink;
    updateLiveCalendarIcons();
    moveTaskOverlay.hidden = false;
  }
  function closeMoveTask() {
    moveTaskOverlay.hidden = true;
    moveTaskProjectsOverlay.hidden = true;
    taskReminderOverlay.hidden = true;
    pendingMoveTaskId = null;
  }
  function openMoveTaskProjectsModal(mode) {
    moveTaskMode = mode;
    moveTaskOverlay.hidden = true;
    moveTaskProjectsTitle.textContent = tr("moveTaskProjectsTitle");
    renderMoveTaskProjects();
    moveTaskProjectsOverlay.hidden = false;
  }
  moveModeMoveBtn.addEventListener("click", function () { openMoveTaskProjectsModal("move"); });
  moveModeCopyBtn.addEventListener("click", function () { openMoveTaskProjectsModal("copy"); });
  shareTaskBtn.addEventListener("click", function () {
    var task = activeSheet().tasks.find(function (t) { return t.id === pendingMoveTaskId; });
    closeMoveTask();
    if (!task) return;
    var text = task.text;
    // The Android WebView this app runs in natively has no navigator.share()
    // at all (same reason file-sharing needs the Capacitor Share plugin
    // elsewhere) - without this branch the button would silently fall
    // through to a clipboard copy there instead of a real WhatsApp/etc.
    // share sheet.
    if (window.Capacitor && window.Capacitor.isNativePlatform && window.Capacitor.isNativePlatform() &&
        window.Capacitor.Plugins && window.Capacitor.Plugins.Share) {
      window.Capacitor.Plugins.Share.share({ title: "ITASK", text: text }).catch(function () {});
      return;
    }
    if (navigator.share) {
      navigator.share({ title: "ITASK", text: text }).catch(function () {});
      return;
    }
    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(text).then(function () {
        showToast(tr("chatMsgCopiedMsg"));
      }, function () {
        alert(text);
      });
      return;
    }
    alert(text);
  });

  // Reuses the same push_subscriptions row/permission flow the general
  // "תזכורות משימות" menu setting and auto-enabled chat notifications
  // already go through - a task reminder has nowhere to deliver through
  // without an active push subscription for this device.
  function ensurePushReadyForTaskReminder() {
    if (!supabaseClient || !SUPABASE_ROW_ID || !pushSupported()) return Promise.resolve(false);
    return pushPermissionDenied().then(function (denied) {
      if (denied) return false;
      return requestPushPermissionGranted().then(function (granted) {
        if (!granted) return false;
        return ensurePushIdentity().then(function (identity) {
          return upsertPushSubscriptionRow({}, identity);
        }).then(function (result) {
          return !(result && result.error);
        });
      });
    }).catch(function () { return false; });
  }

