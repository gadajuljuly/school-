  function loadFromLocalOrDefault() {
    return loadLocalData() || defaultData();
  }

  // If we can't confirm what's really in Supabase (or in a local cache) for
  // this user, we must never show a silently-empty, fully-editable app: any
  // ordinary action the user then takes (adding a task, renaming...) calls
  // the plain saveData() below, which would happily persist that empty
  // in-memory placeholder over real data still sitting in the row. Instead
  // we block all editing behind a visible retry screen until a load
  // actually confirms either real data or a genuinely brand-new user.
  function showDataLoadError(debugDetail) {
    dataLoadBlocked = true;
    privateDataSettled = true;
    appLoadingOverlay.hidden = true;
    dataErrorOverlay.hidden = false;
    var debugEl = document.getElementById("dataErrorDebug");
    if (debugEl) debugEl.textContent = debugDetail || "";
  }
  function hideDataLoadError() {
    dataLoadBlocked = false;
    privateDataSettled = true;
    dataErrorOverlay.hidden = true;
  }

  function startLocalOnly() {
    // Only ever auto-save here if we actually had a local cache to roll
    // forward. If local storage is also empty (new browser profile, cleared
    // data, a transient read failure - anything) AND there's a real Supabase
    // row this might be shadowing, block editing instead of rendering an
    // in-memory default: a network hiccup must never be able to silently
    // overwrite real data already sitting in Supabase just because this one
    // load couldn't reach it. When there's no Supabase client at all (e.g.
    // it failed to load), there's no remote row to protect, so fall back to
    // a plain empty default as before.
    var local = loadLocalData() || findLegacyLocalData();
    if (!local && supabaseClient) { showDataLoadError(); return; }
    hideDataLoadError();
    data = local || defaultData();
    if (local && applyDailyRollover(data)) saveData();
    applyTaskLinkFromURL();
    render();
  }

  function startWithSupabase() {
    editedSinceLastLoad = false;
    // Render the last known-good local snapshot immediately, if there is
    // one, instead of always waiting on the network before showing
    // anything - a real local cache was already the safe fallback for any
    // read failure below; this just uses it right away so the app feels
    // instant, while the real fetch still runs and quietly reconciles once
    // it lands. `data` never holds a placeholder/empty default here, only
    // a real prior snapshot, so this doesn't reopen the original
    // startup-race bug (rendering before we know anything real).
    var usedInstantLocal = false;
    var instantLocal = loadLocalData() || findLegacyLocalData();
    if (instantLocal) {
      data = instantLocal;
      privateDataSettled = true;
      usedInstantLocal = true;
      // Only persist this locally for now, never straight to the network:
      // this instant snapshot is whatever THIS device's cache happened to
      // hold, which on a rarely-used device can already be behind the
      // server (e.g. a site log added from another device since this one
      // was last opened). Pushing it here, before the remote fetch below
      // even gets a chance to reconcile, would silently overwrite that
      // newer server data with this stale copy. The reconciliation below
      // (and its existing editedSinceLastLoad/pending-sync checks) remains
      // the only path that actually writes to the server.
      if (applyDailyRollover(data)) saveLocalData();
      applyTaskLinkFromURL();
      render();
    }

    // A request here must never be able to leave the app stuck on the
    // loading screen forever with no way out - wrap it in a timeout (and a
    // sync try/catch, in case building the request itself throws) so any
    // failure mode, including one that never resolves or rejects, still
    // converges on startLocalOnly's own safe fallback (real local cache, or
    // a visible blocked/retry state - never a silent empty default).
    try {
      withTimeout(
        supabaseClient.from("app_state").select("data").eq("id", SUPABASE_ROW_ID).maybeSingle(),
        15000,
        "app_state load"
      ).then(function (result) {
        var row = result && result.data;
        var remote = row && row.data ? normalizeData(row.data) : null;
        var local = remote ? null : (loadLocalData() || findLegacyLocalData());
        var isFreshDefault = !remote && !local;
        var confirmedNewUser = isFreshDefault && !row;
        // Same protection as startLocalOnly: never render an editable bare
        // default over a row we simply failed to read cleanly. Only proceed
        // here when there's real data, or this is a confirmed brand-new
        // user (no row exists yet for this id at all).
        if (isFreshDefault && !confirmedNewUser) {
          // Already showing a valid local snapshot instantly above - leave
          // it up rather than blocking a perfectly good view.
          if (!usedInstantLocal) showDataLoadError();
          return;
        }
        hideDataLoadError();
        if (usedInstantLocal && editedSinceLastLoad) {
          // The user already made a real edit against the instantly
          // rendered local snapshot before this fetch resolved - their own
          // saveData() calls already own persisting from here on, so don't
          // overwrite with what may now be a stale-relative-to-that-edit
          // server snapshot.
          return;
        }
        if (usedInstantLocal && hasPendingSyncFromPreviousSession()) {
          // An edit from a PRIOR session never got confirmed saved (e.g.
          // the app was closed while offline) - the local snapshot is
          // still ahead of this remote read, so keep it and push it now
          // instead of quietly reverting to the older server row. This is
          // a fresh page load, so the in-memory pendingSyncDirty flag was
          // just reset to false and needs re-marking from the persisted
          // localStorage flag before flushPendingSync() will act on it.
          markPendingSyncDirty();
          flushPendingSync();
          return;
        }
        data = remote || local || defaultData();
        // Backups are a nice-to-have safety net, never allowed to disrupt
        // the core load/save flow if the backup table/call misbehaves.
        if (!isFreshDefault) { try { maybeBackupData(); } catch (e) {} }
        if (!isFreshDefault) { try { migratePrivateSheetsFileUrls(); } catch (e) {} }
        try {
          var rolled = applyDailyRollover(data);
          if (rolled && !isFreshDefault) saveData();
          if (confirmedNewUser) {
            // "No row returned" alone is NOT proof this id is actually
            // unused - RLS makes a blocked read look identical to a
            // genuinely missing row, and saveData()'s blind upsert would
            // silently overwrite a real row in that case. An insert-only
            // write fails on a real primary-key conflict regardless of
            // whether RLS hid that row from the SELECT above, so use that
            // as the actual confirmation instead, and hold off
            // rendering/editing until it comes back - exactly like a
            // normal read failure would.
            //
            // Two things a plain single attempt got wrong (caught in
            // review): an unresolving request here must still converge on
            // the loading screen's own timeout, same as the read above -
            // otherwise a hang leaves no visible retry option at all; and a
            // transient network error is not the same signal as a real
            // conflict, so only an actual unique-constraint violation
            // should be treated as "this wasn't a new user after all" -
            // anything else gets one silent retry before falling back to
            // the same visible retry screen a real read failure would show.
            var attemptInsert = function (isRetry) {
              withTimeout(
                supabaseClient.from("app_state").insert({ id: SUPABASE_ROW_ID, data: data, updated_at: new Date().toISOString() }),
                15000,
                "app_state new-user insert"
              ).then(function (result) {
                var err = result && result.error;
                if (err) {
                  var isConflict = err.code === "23505" || /duplicate key/i.test(err.message || "");
                  if (isConflict) {
                    showDataLoadError("existing row detected on insert: " + err.message);
                    return;
                  }
                  if (!isRetry) { attemptInsert(true); return; }
                  showDataLoadError(err.message);
                  return;
                }
                saveLocalData();
                applyTaskLinkFromURL();
                render();
              }, function (thrown) {
                if (!isRetry) { attemptInsert(true); return; }
                showDataLoadError((thrown && thrown.message) || String(thrown));
              });
            };
            attemptInsert(false);
            return;
          }
          applyTaskLinkFromURL();
          render();
        } catch (renderErr) {
          // Temporary diagnostic: a real fetch succeeded but something in
          // the render/rollover path threw on this account's actual data -
          // surface the real error instead of the generic message so this
          // can be root-caused without device-level debugging tools.
          console.error("startWithSupabase render error:", renderErr);
          showDataLoadError((renderErr && renderErr.message) || String(renderErr));
        }
      }, function () {
        if (!usedInstantLocal) startLocalOnly();
      }).catch(function () {
        if (!usedInstantLocal) startLocalOnly();
      });
    } catch (e) {
      console.error("startWithSupabase sync error:", e);
      if (!usedInstantLocal) startLocalOnly();
    }
    loadSharedSheets();
    loadMyOfficeGroups();
    checkPendingProjectInvites();
    checkPendingOfficeGroupInvites();
  }

  function sharedRowToSheet(row) {
    var d = row.data || {};
    var tasks = d.tasks || [];
    var reports = d.reports || [];
    var siteLogs = (d.siteLogs || []).map(normalizeSiteLog);
    var ended = d.ended || false;
    var endedDate = d.endedDate || null;
    var logoId = d.logoId || null;
    return {
      id: row.id,
      shared: true,
      name: row.name,
      tasks: tasks,
      reports: reports,
      files: d.files || [],
      siteLogs: siteLogs,
      folders: d.folders || null,
      officeDirectory: d.officeDirectory || null,
      workPlan: d.workPlan || [],
      ended: ended,
      endedDate: endedDate,
      logoId: logoId,
      members: row.members || [],
      memberNames: row.member_names || {},
      createdBy: row.created_by || null,
      messages: row.messages || [],
      // The last state of this sheet we've actually confirmed the server
      // holds - refreshed both by this load and by our own successful
      // saves. saveSharedSheets() diffs against this (not against the
      // previous in-memory sheet) to tell "we changed this locally" apart
      // from "this just came from the server as-is", which is what lets it
      // skip sheets nothing local touched and merge per-item on the ones
      // that did, instead of blindly overwriting the whole row.
      // Deep-cloned (JSON round-trip): tasks/reports/siteLogs here must
      // never be the SAME array objects as the sheet's own live tasks/
      // reports/siteLogs above - otherwise pushing/editing an item in
      // place would silently mutate this "last synced" baseline too
      // (same array reference), making every future diff check in
      // saveSharedSheets() see "nothing changed" and skip saving entirely.
      _syncedData: JSON.parse(JSON.stringify({ tasks: tasks, reports: reports, siteLogs: siteLogs, ended: ended, endedDate: endedDate, logoId: logoId }))
    };
  }

  function showSharedNotification(title, body, sheetId, tag, chat) {
    if (!("Notification" in window) || Notification.permission !== "granted" || !("serviceWorker" in navigator)) return;
    navigator.serviceWorker.getRegistration().then(function (reg) {
      if (!reg) return;
      reg.showNotification(title, {
        body: body,
        icon: "tasks-icon-192.png",
        badge: "tasks-badge-96.png",
        tag: tag,
        data: { sheetId: sheetId, chat: !!chat }
      });
    }).catch(function () {});
  }

  function notifyNewSharedProject(sheet) {
    showSharedNotification(
      tr("newSharedProjectNotifTitle"),
      tr("newSharedProjectNotifBody").replace("{name}", sheet.name),
      sheet.id,
      "shared-project-" + sheet.id,
      false
    );
  }

  function notifyNewChatMessages(sheet, previousMessages) {
    if (activeChatSheetId === sheet.id) return;
    var previousIds = previousMessages.map(function (m) { return m.id; });
    var newMessages = (sheet.messages || []).filter(function (m) {
      return previousIds.indexOf(m.id) === -1 && m.type !== "system" && m.phone !== myPhoneNumber;
    });
    if (!newMessages.length) return;
    var last = newMessages[newMessages.length - 1];
    var senderName = resolveMemberName(sheet, last.phone);
    var lastText = last.type === "voice" ? tr("voiceMessageLabel") : last.text;
    var body = newMessages.length > 1
      ? tr("newChatMessagesNotifBody").replace("{count}", newMessages.length)
      : (senderName + ": " + lastText);
    showSharedNotification(sheet.name, body, sheet.id, "chat-" + sheet.id, true);
  }

  var sharedSheetsLoadedOnce = false;

  // No .contains("members", [myPhoneNumber]) filter here on purpose - RLS
  // alone decides what comes back: a project this account is a real member
  // of, OR a project whose member is in an office_groups row this account
  // created or is the named Head Office of (see office_groups.sql). Either
  // way the row lands in this same sharedSheets array with full normal
  // read/write access, so a watched project behaves exactly like a real
  // membership everywhere in the app - task writing (shown in red to
  // everyone else via isHeadOffice), chat, procurement purchase-marking,
  // combined reports, all of it.
  function loadSharedSheets() {
    if (!supabaseClient || !myPhoneNumber) return Promise.resolve();
    return supabaseClient.from(SHARED_TABLE).select("*")
      .then(function (result) {
        var rows = (result && result.data) || [];
        var previousById = {};
        sharedSheets.forEach(function (s) { previousById[s.id] = s; });
        var newSheets = rows.map(sharedRowToSheet);
        if (sharedSheetsLoadedOnce) {
          newSheets.forEach(function (s) {
            var prev = previousById[s.id];
            if (!prev) {
              notifyNewSharedProject(s);
            } else {
              notifyNewChatMessages(s, prev.messages || []);
            }
          });
        }
        sharedSheetsLoadedOnce = true;
        sharedSheets = newSheets;
        rollSheetsForward(sharedSheets);
        updateAppBadge();
        try { migrateAllSharedSheetsFileUrls(); } catch (e) {}
        // Don't paint an interactive frame off the private data's initial
        // (unresolved) default before that load has had a chance to settle -
        // see the privateDataSettled comment above. Once it settles, that
        // code path's own render() picks up whatever this call already
        // loaded into sharedSheets.
        if (privateDataSettled) render();
        tryOpenPendingChat();
      }, function () {});
  }

  var authGate = document.getElementById("authGate");
  var appRoot = document.getElementById("appRoot");
  var appLoadingOverlay = document.getElementById("appLoadingOverlay");
  var dataErrorOverlay = document.getElementById("dataErrorOverlay");
  var dataErrorRetryBtn = document.getElementById("dataErrorRetryBtn");
  dataErrorRetryBtn.addEventListener("click", function () {
    dataErrorOverlay.hidden = true;
    appLoadingOverlay.hidden = false;
    if (pendingFirebaseUserForToken) {
      beginAuthenticatedSession(pendingFirebaseUserForToken);
    } else if (supabaseClient) {
      startWithSupabase();
    } else {
      startLocalOnly();
    }
  });
  var authPhoneForm = document.getElementById("authPhoneForm");
  var authPhone = document.getElementById("authPhone");
  var authError = document.getElementById("authError");
  var authSendCodeBtn = document.getElementById("authSendCodeBtn");
  var authCodeForm = document.getElementById("authCodeForm");
  var authCodeSentTo = document.getElementById("authCodeSentTo");
  var authCode = document.getElementById("authCode");
  var authCodeError = document.getElementById("authCodeError");
  var authVerifyCodeBtn = document.getElementById("authVerifyCodeBtn");
  var authChangePhoneBtn = document.getElementById("authChangePhoneBtn");
  var menuUsernameLabel = document.getElementById("menuUsernameLabel");

  var pendingConfirmationResult = null;
  var recaptchaVerifier = null;
  var appShown = false;
  var justVerified = false;

  var SESSION_TOKEN_KEY = "itask-session-token";
  var mySessionToken = null;

  function claimSession() {
    mySessionToken = window.crypto.randomUUID ? window.crypto.randomUUID() : (Date.now().toString(36) + Math.random().toString(36).slice(2));
    try { localStorage.setItem(SESSION_TOKEN_KEY, mySessionToken); } catch (e) {}
    if (!supabaseClient) return Promise.resolve();
    return supabaseClient.from("app_state").update({ session_token: mySessionToken }).eq("id", SUPABASE_ROW_ID)
      .then(function () {}, function () {});
  }

  function establishSession() {
    var stored = null;
    try { stored = localStorage.getItem(SESSION_TOKEN_KEY); } catch (e) {}
    if (justVerified || !stored) return claimSession();
    mySessionToken = stored;
    return Promise.resolve();
  }

  function signOutDueToOtherDevice() {
    try { localStorage.removeItem(SESSION_TOKEN_KEY); } catch (e) {}
    try { localStorage.setItem("itask-kicked", "1"); } catch (e) {}
    clearCachedSessionJwt();
    firebaseAuth.signOut().then(function () { location.reload(); }, function () { location.reload(); });
  }

  function checkSessionStillActive() {
    if (!supabaseClient || !mySessionToken) return;
    supabaseClient.from("app_state").select("session_token").eq("id", SUPABASE_ROW_ID).maybeSingle()
      .then(function (result) {
        var remoteToken = result && result.data && result.data.session_token;
        if (remoteToken && remoteToken !== mySessionToken) signOutDueToOtherDevice();
      }, function () {});
  }

  function startSessionWatcher() {
    setInterval(checkSessionStillActive, 60000);
    document.addEventListener("visibilitychange", function () {
      if (!document.hidden) checkSessionStillActive();
    });
  }

  function isEditingActively() {
    var el = document.activeElement;
    return !!(el && (el.tagName === "INPUT" || el.tagName === "TEXTAREA"));
  }

  function refreshSharedSheetsIfIdle() {
    if (isEditingActively()) return;
    loadSharedSheets();
    loadMyOfficeGroups();
    checkPendingProjectInvites();
    checkPendingOfficeGroupInvites();
  }

  function startSharedSheetsWatcher() {
    setInterval(refreshSharedSheetsIfIdle, 20000);
    document.addEventListener("visibilitychange", function () {
      if (!document.hidden) refreshSharedSheetsIfIdle();
    });
    subscribeSharedProjectsRealtime();
  }

  // Pushes shared-project changes (a task, a chat message, a purchase
  // mark...) to every member's app the moment they happen, instead of
  // everyone waiting on the periodic poll above - that poll stays in
  // place as a fallback in case the websocket connection ever drops.
  // Debounced so a burst of several quick changes (e.g. someone editing
  // multiple tasks in a row) triggers one refresh, not one per change.
  var sharedProjectsRealtimeChannel = null;
  var realtimeRefreshTimer = null;
  function handleSharedProjectsRealtimeChange(payload) {
    clearTimeout(realtimeRefreshTimer);
    realtimeRefreshTimer = setTimeout(function () {
      // Same guard the polling path uses - don't yank a full task-list
      // rebuild out from under someone mid-edit; the next poll or
      // realtime event once they're idle will catch it up.
      if (!isEditingActively()) loadSharedSheets();
      var changedId = (payload && payload.new && payload.new.id) || (payload && payload.old && payload.old.id);
      if (activeChatSheetId && changedId === activeChatSheetId) refreshActiveChat();
    }, 150);
  }
  function subscribeSharedProjectsRealtime() {
    if (!supabaseClient || !supabaseClient.realtime || sharedProjectsRealtimeChannel) return;
    sharedProjectsRealtimeChannel = supabaseClient
      .channel("shared_projects_changes")
      .on("postgres_changes", { event: "*", schema: "public", table: SHARED_TABLE }, handleSharedProjectsRealtimeChange)
      .subscribe();
  }

  // A fresh backup snapshot is only taken on load, gated by
  // BACKUP_MIN_INTERVAL_MS - but a session can stay open for hours without
  // a reload, during which real edits would sit unbacked-up the whole time.
  // Re-check periodically so a long session still gets a recent snapshot.
  function startPeriodicBackup() {
    setInterval(function () { try { maybeBackupData(); } catch (e) {} }, 15 * 60 * 1000);
  }

  function showApp(phoneNumber, rowId) {
    try {
      if (phoneNumber) localStorage.setItem(LAST_PHONE_KEY, "0" + String(phoneNumber).replace(/^\+972/, ""));
    } catch (e) {}
    SUPABASE_ROW_ID = rowId;
    myPhoneNumber = phoneNumber;
    loadChatReadState();
    menuUsernameLabel.textContent = tr("loggedInAs") + phoneNumber;
    hideSplash();
    if (appShown) return;
    appShown = true;
    authGate.hidden = true;
    appRoot.hidden = false;
    startWithSupabase();
    initReminderSettings();
    autoEnableChatNotifications();
    loadDeviceContactsIfNeeded();
    establishSession().then(startSessionWatcher);
    startSharedSheetsWatcher();
    startPeriodicBackup();
  }

  // The last number signed in on this device, so being asked to sign in
  // again only needs the code, not retyping the number.
  var LAST_PHONE_KEY = "itask-last-phone";
  function showAuthGate() {
    appRoot.hidden = true;
    authGate.hidden = false;
    hideSplash();
    var last = null;
    try { last = localStorage.getItem(LAST_PHONE_KEY); } catch (e) {}
    if (last && !authPhone.value) authPhone.value = last;
  }

  function showAuthError(msg) {
    authError.textContent = msg;
    authError.hidden = false;
  }
  function clearAuthError() {
    authError.hidden = true;
  }
  function showAuthCodeError(msg) {
    authCodeError.textContent = msg;
    authCodeError.hidden = false;
  }
  function clearAuthCodeError() {
    authCodeError.hidden = true;
  }

  (function checkKickedFlag() {
    var kicked = false;
    try {
      kicked = localStorage.getItem("itask-kicked") === "1";
      localStorage.removeItem("itask-kicked");
    } catch (e) {}
    if (kicked) showAuthError(tr("signedInElsewhere"));
  })();

  function showCodeStep(phoneNumber) {
    authPhoneForm.hidden = true;
    authCodeForm.hidden = false;
    authCodeSentTo.textContent = tr("authCodeSentTo") + phoneNumber;
    authCode.value = "";
    authCode.focus();
  }
  function showPhoneStep() {
    authCodeForm.hidden = true;
    authPhoneForm.hidden = false;
    clearAuthCodeError();
    pendingConfirmationResult = null;
  }

  // The app authenticates via Firebase phone auth, not Supabase Auth, so
  // without this step every Postgres RLS policy relying on auth.uid()
  // would never match any request - that's why RLS had to stay off
  // entirely until now. Right after Firebase confirms the phone, exchange
  // that credential for a short JWT signed with this Supabase project's
  // own JWT secret (minted server-side by mint-session-token, which
  // verifies the Firebase token itself before signing anything), and swap
  // it in as this client's Authorization header so auth.uid()/auth.jwt()
  // in RLS policies now correctly reflect who's actually asking.
  var pendingFirebaseUserForToken = null;

  // Minting a session token is a real network round-trip (verify the
  // Firebase credential server-side, sign a new JWT), so doing it on every
  // single app open would add a full extra round-trip to every login -
  // exactly the "why is this slower than WhatsApp" complaint. The token is
  // valid for 30 days and its content never changes until then, so cache it
  // in localStorage and only re-mint once it's actually close to expiring.
  var SESSION_JWT_CACHE_KEY = "itask-session-jwt-v1";
  var SESSION_JWT_CACHE_LIFETIME_MS = 25 * 24 * 60 * 60 * 1000; // server mints for 30 days; 5-day safety margin
  function loadCachedSessionJwt(phone) {
    try {
      var cached = JSON.parse(localStorage.getItem(SESSION_JWT_CACHE_KEY));
      if (!cached || cached.phone !== phone || !cached.token || !cached.userId || !cached.mintedAt) return null;
      if (Date.now() - cached.mintedAt > SESSION_JWT_CACHE_LIFETIME_MS) return null;
      return cached;
    } catch (e) { return null; }
  }
  function saveCachedSessionJwt(phone, token, userId) {
    try {
      localStorage.setItem(SESSION_JWT_CACHE_KEY, JSON.stringify({ phone: phone, token: token, userId: userId, mintedAt: Date.now() }));
    } catch (e) {}
  }
  function clearCachedSessionJwt() {
    try { localStorage.removeItem(SESSION_JWT_CACHE_KEY); } catch (e) {}
  }
  function applySessionToken(token) {
    supabaseClient = window.supabase.createClient(SUPABASE_URL, SUPABASE_KEY, {
      global: { headers: { Authorization: "Bearer " + token } }
    });
    // Realtime's websocket connection has its own, separate auth from the
    // REST calls above (which pick up the Authorization header on their
    // own) - without this, the realtime channel below would connect
    // anonymously and RLS would silently deliver it nothing.
    supabaseClient.realtime.setAuth(token);
  }

  function mintSupabaseSessionToken(firebaseUser) {
    return firebaseUser.getIdToken().then(function (idToken) {
      return supabaseClient.functions.invoke("mint-session-token", { body: { idToken: idToken } });
    }).then(function (result) {
      if (result.error || !result.data || !result.data.token) {
        throw (result.error || new Error("mint-session-token returned no token"));
      }
      var token = result.data.token;
      applySessionToken(token);
      return Promise.resolve(result.data.userId || phoneToUuid(firebaseUser.phoneNumber)).then(function (userId) {
        saveCachedSessionJwt(firebaseUser.phoneNumber, token, userId);
        return userId;
      });
    });
  }
  function withTimeout(promise, ms, label) {
    return new Promise(function (resolve, reject) {
      var timer = setTimeout(function () { reject(new Error(label + " timed out after " + ms + "ms")); }, ms);
      promise.then(function (v) { clearTimeout(timer); resolve(v); }, function (e) { clearTimeout(timer); reject(e); });
    });
  }
  function beginAuthenticatedSession(firebaseUser) {
    var cached = loadCachedSessionJwt(firebaseUser.phoneNumber);
    if (cached) {
      applySessionToken(cached.token);
      showApp(firebaseUser.phoneNumber, cached.userId);
      return;
    }
    pendingFirebaseUserForToken = firebaseUser;
    withTimeout(mintSupabaseSessionToken(firebaseUser), 15000, "mintSupabaseSessionToken").then(function (rowId) {
      pendingFirebaseUserForToken = null;
      showApp(firebaseUser.phoneNumber, rowId);
    }, function (err) {
      console.error("mintSupabaseSessionToken failed:", err);
      showDataLoadError();
    });
  }

  if (!supabaseClient || !firebaseAuth) {
    appRoot.hidden = false;
    authGate.hidden = true;
    document.getElementById("accountMenuSection").hidden = true;
    document.getElementById("reminderMenuSection").hidden = true;
    document.getElementById("chatNotifMenuSection").hidden = true;
    startLocalOnly();
    hideSplash();
  } else {
    firebaseAuth.onAuthStateChanged(function (firebaseUser) {
      if (firebaseUser && firebaseUser.phoneNumber) {
        if (supabaseClient.functions) {
          beginAuthenticatedSession(firebaseUser);
        } else {
          phoneToUuid(firebaseUser.phoneNumber).then(function (rowId) {
            showApp(firebaseUser.phoneNumber, rowId);
          });
        }
      } else {
        showAuthGate();
      }
    });

    authPhoneForm.addEventListener("submit", function (e) {
      e.preventDefault();
      clearAuthError();
      var digits = authPhone.value.replace(/\D/g, "").replace(/^0+/, "");
      if (digits.length < 8 || digits.length > 10) {
        showAuthError(tr("invalidPhoneNumber"));
        return;
      }
      var phone = "+972" + digits;
      authSendCodeBtn.disabled = true;
      if (!recaptchaVerifier) {
        recaptchaVerifier = new firebase.auth.RecaptchaVerifier("recaptchaContainer", { size: "invisible" });
      }
      firebaseAuth.signInWithPhoneNumber(phone, recaptchaVerifier)
        .then(function (confirmationResult) {
          authSendCodeBtn.disabled = false;
          pendingConfirmationResult = confirmationResult;
          showCodeStep(phone);
        }, function (err) {
          authSendCodeBtn.disabled = false;
          console.error("signInWithPhoneNumber failed:", err);
          showAuthError(tr("sendCodeError") + " (" + (err && (err.code || err.message) || "unknown") + ")");
          recaptchaVerifier.render().then(function (widgetId) {
            if (window.grecaptcha) window.grecaptcha.reset(widgetId);
          });
        });
    });

    authCodeForm.addEventListener("submit", function (e) {
      e.preventDefault();
      clearAuthCodeError();
      var code = authCode.value.trim();
      if (!pendingConfirmationResult || !/^\d{6}$/.test(code)) {
        showAuthCodeError(tr("invalidCode"));
        return;
      }
      authVerifyCodeBtn.disabled = true;
      pendingConfirmationResult.confirm(code).then(function () {
        authVerifyCodeBtn.disabled = false;
        justVerified = true;
      }, function () {
        authVerifyCodeBtn.disabled = false;
        showAuthCodeError(tr("wrongCode"));
      });
    });

    authChangePhoneBtn.addEventListener("click", showPhoneStep);
  }

  // Registering the service worker here (even inside the native Capacitor
  // app) is what makes push notifications/reminders work there at all -
  // pushManager.subscribe() and the "push" event both need an active SW
  // registration.
  if ("serviceWorker" in navigator && location.protocol !== "file:") {
    window.addEventListener("load", function () {
      navigator.serviceWorker.register("tasks-sw.js").then(function (reg) {
        // A new SW version can finish installing and take over (via
        // skipWaiting + clients.claim in tasks-sw.js) while this exact page
        // instance is still open - e.g. an installed PWA resumed from the
        // background instead of getting a true cold reload. That alone
        // doesn't refresh anything already rendered (images, this script's
        // own in-memory state), so without an explicit reload here, a
        // pushed fix can silently activate in the background while the
        // visible page keeps showing the stale version indefinitely.
        var reloadedForUpdate = false;
        // None of this app's inline-edit fields (task text, report cells,
        // chat input, site-log names...) autosave keystroke-by-keystroke -
        // they only commit on blur/Enter. Force-reloading out from under an
        // in-progress edit with no warning would silently discard whatever
        // hadn't been committed yet, so defer the reload until the
        // currently-focused field (if any) loses focus, which is exactly
        // when its edit, if any, has already committed.
        function reloadOnce() {
          if (reloadedForUpdate) return;
          reloadedForUpdate = true;
          var active = document.activeElement;
          var isEditing = active && (active.tagName === "INPUT" || active.tagName === "TEXTAREA" || active.isContentEditable);
          if (!isEditing) { window.location.reload(); return; }
          document.addEventListener("focusout", function onBlur() {
            document.removeEventListener("focusout", onBlur, true);
            window.location.reload();
          }, true);
        }
        navigator.serviceWorker.addEventListener("controllerchange", reloadOnce);
        if (reg.waiting) reloadOnce();
        reg.addEventListener("updatefound", function () {
          var installing = reg.installing;
          if (!installing) return;
          installing.addEventListener("statechange", function () {
            if (installing.state === "activated") reloadOnce();
          });
        });
        reg.update().catch(function () {});
      }).catch(function () {});
    });
  }

  // Automated tests only (tests/specs): a test page defines
  // window.__itaskTestHooks before load to reach a few internals that have
  // no UI of their own. Never defined in real use, so this does nothing.
  if (typeof window.__itaskTestHooks === "function") {
    window.__itaskTestHooks({
      mergeSharedArrayByLocalChanges: mergeSharedArrayByLocalChanges,
      // swaps in an in-memory stand-in for Supabase (tests/specs/helpers)
      setBackendForTest: function (client, phone) {
        supabaseClient = client;
        myPhoneNumber = phone;
      },
      updateSharedSheetDataSafely: updateSharedSheetDataSafely,
      loadMyOfficeGroups: loadMyOfficeGroups,
      checkPendingProjectInvites: checkPendingProjectInvites,
      verifyCalendarLinks: function () { return calVerifyLinks(true); },
      parseVoiceCommand: parseVoiceCommand,
      // another member's change to a shared task arriving (as a refresh would)
      updateSharedTaskForTest: function (sheetId, taskId, mutate) {
        var sheet = sharedSheets.find(function (s) { return s.id === sheetId; });
        var task = sheet && sheet.tasks.find(function (t) { return t.id === taskId; });
        if (!task) return;
        mutate(task);
        sheet._syncedData = JSON.parse(JSON.stringify(Object.assign({}, sheet._syncedData, { tasks: sheet.tasks })));
        render();
      },
      addSharedSheetForTest: function (sheet) {
        sheet.siteLogs = (sheet.siteLogs || []).map(normalizeSiteLog);
        sharedSheets.push(sheet);
        data.activeSheetId = sheet.id;
        render();
      }
    });
  }
})();
