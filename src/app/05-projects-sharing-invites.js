  // A shared project I was added to but haven't approved (or declined)
  // stays out of every list - see "Shared-project invites" below.
  var hiddenSharedProjectIds = {};
  function allSheets() {
    return data.sheets.concat(sharedSheets.filter(function (s) { return !hiddenSharedProjectIds[s.id]; }));
  }

  function activeSheet() {
    var all = allSheets();
    var sheet = all.find(function (s) { return s.id === data.activeSheetId; });
    return sheet || all[0];
  }

  function addSheet() {
    var name = tr("projectWord") + " " + (data.sheets.length + 1);
    var sheet = { id: uid(), name: name, tasks: [], reports: [], files: [] };
    data.sheets.push(sheet);
    data.activeSheetId = sheet.id;
    state.renamingSheetId = sheet.id;
    saveData();
    render();
  }

  function animatePageTurn(direction, applyChange) {
    var page = document.querySelector(".ruled-body");
    if (!page) { applyChange(); return; }

    var clone = page.cloneNode(true);
    clone.classList.add("page-turn-clone");
    clone.querySelectorAll("[id]").forEach(function (el) { el.removeAttribute("id"); });
    clone.style.top = page.offsetTop + "px";
    clone.style.left = page.offsetLeft + "px";
    clone.style.width = page.offsetWidth + "px";
    clone.style.height = page.offsetHeight + "px";
    page.parentNode.appendChild(clone);

    applyChange();

    var outClass = direction > 0 ? "page-turn-out-fwd" : "page-turn-out-bwd";
    clone.classList.add(outClass);
    setTimeout(function () {
      clone.remove();
    }, 430);
  }

  function selectSheet(id) {
    if (data.activeSheetId === id) return;
    var visible = visibleSheets();
    var oldIndex = visible.findIndex(function (s) { return s.id === data.activeSheetId; });
    var newIndex = visible.findIndex(function (s) { return s.id === id; });
    var direction = newIndex > oldIndex ? 1 : -1;
    animatePageTurn(direction, function () {
      data.activeSheetId = id;
      var newSheet = allSheets().find(function (s) { return s.id === id; });
      if (newSheet && newSheet.ended && newSheet.endedDate) {
        // Each archived project is pinned to its own end date, not whatever
        // date the previously-viewed project happened to be on.
        state.viewDate = newSheet.endedDate;
      }
      saveData();
      render();
    });
  }

  function commitRename(id, value) {
    var sheet = allSheets().find(function (s) { return s.id === id; });
    var trimmed = value.trim();
    if (sheet && trimmed) {
      sheet.name = trimmed.slice(0, 40);
      if (sheet.shared) {
        // name isn't part of the shared row's `data` column saveSharedSheets()
        // manages - it has its own safe update, same as the member-list edit
        // flow, so a rename never rides along on saveData()'s blind path.
        updateSharedProjectSettings(sheet.id, function (current) {
          return { name: sheet.name, members: current.members, memberNames: current.memberNames };
        }).catch(function () { scheduleSyncRetry(); });
      }
    }
    state.renamingSheetId = null;
    saveData();
    render();
  }

  function deleteSheet(id) {
    var sharedSheet = sharedSheets.find(function (s) { return s.id === id; });
    if (sharedSheet) {
      // Only the member who created it - deleting a shared project removes
      // it for every member, not just this device. The DB's own RLS policy
      // (shared_projects_created_by.sql) enforces the same rule, so this is
      // a defensive check, not the only thing stopping anyone else.
      if (!supabaseClient || sharedSheet.createdBy !== myPhoneNumber) {
        alert(tr("cannotDeleteSharedProject"));
        return;
      }
      var sharedMsg = tr("confirmDeleteSharedProjectNamed").replace("{name}", sharedSheet.name);
      askConfirm(sharedMsg, function () {
        supabaseClient.from(SHARED_TABLE).delete().eq("id", id).then(function (result) {
          if (result && result.error) { alert(tr("cannotDeleteSharedProject")); return; }
          sharedSheets = sharedSheets.filter(function (s) { return s.id !== id; });
          if (data.activeSheetId === id) {
            var nextSheet = allSheets()[0];
            if (nextSheet) data.activeSheetId = nextSheet.id;
          }
          render();
        }, function () { alert(tr("cannotDeleteSharedProject")); });
      });
      return;
    }
    if (data.sheets.length <= 1) {
      alert(tr("mustHaveOneProject"));
      return;
    }
    var sheet = data.sheets.find(function (s) { return s.id === id; });
    var msg = sheet ? tr("confirmDeleteProjectNamed").replace("{name}", sheet.name) : tr("confirmDeleteProjectGeneric");
    askConfirm(msg, function () {
      data.sheets = data.sheets.filter(function (s) { return s.id !== id; });
      if (data.activeSheetId === id) {
        data.activeSheetId = data.sheets[0].id;
      }
      saveData();
      render();
    });
  }

  function endSheet(id) {
    if (visibleSheets().length <= 1) {
      alert(tr("mustHaveOneActiveProject"));
      return;
    }
    var sheet = allSheets().find(function (s) { return s.id === id; });
    var msg = sheet ? tr("confirmEndProjectNamed").replace("{name}", sheet.name) : tr("confirmEndProjectGeneric");
    askConfirm(msg, function () {
      sheet.ended = true;
      sheet.endedDate = todayISO();
      if (data.activeSheetId === id) {
        var nextVisible = visibleSheets().find(function (s) { return s.id !== id; });
        if (nextVisible) data.activeSheetId = nextVisible.id;
      }
      saveData();
      render();
    });
  }

  function reactivateSheet(id) {
    var sheet = allSheets().find(function (s) { return s.id === id; });
    if (!sheet) return;
    sheet.ended = false;
    sheet.endedDate = null;
    saveData();
    render();
  }

  // The web Contact Picker API (navigator.contacts) is unavailable inside
  // the TWA build (Play Store wraps the site with no browser chrome, and
  // that API is gated behind a visible omnibox permission prompt Chrome
  // simply won't show there). The native Android build (built separately
  // via android-app/, wrapping this same site in a Capacitor shell instead
  // of a bare TWA) exposes a real native contact picker through
  // @capacitor-community/contacts, with no such restriction - detect and
  // prefer that one when present.
  var capacitorContactsAvailable = !!(
    window.Capacitor && window.Capacitor.isNativePlatform && window.Capacitor.isNativePlatform() &&
    window.Capacitor.Plugins && window.Capacitor.Plugins.Contacts
  );
  var contactPickerSupported = !!(navigator.contacts && window.ContactsManager) || capacitorContactsAvailable;

  // Chat used to ask each member to type their own display name once (a
  // prompt() the first time they opened a shared project's chat) - a real
  // name should never need to be typed in twice, since the native app
  // already has the real answer sitting in the phone's own contacts.
  // null = not loaded yet (still show the memberNames/phone fallback);
  // an object (even {}) = load finished, this is the source of truth for
  // any phone number found in it.
  var deviceContactsByPhone = null;
  function loadDeviceContactsIfNeeded() {
    if (!capacitorContactsAvailable || deviceContactsByPhone) return;
    var Contacts = window.Capacitor.Plugins.Contacts;
    // @capacitor-community/contacts v5+ calls it checkPermissions (the old
    // getPermissions name made this fail, so chat never showed contact names)
    var check = Contacts.checkPermissions || Contacts.getPermissions;
    Promise.resolve().then(function () { return check.call(Contacts); }).then(function (status) {
      if (status && status.contacts === "granted") return status;
      return Contacts.requestPermissions();
    }).then(function (status) {
      if (!status || status.contacts !== "granted") { deviceContactsByPhone = {}; return; }
      return Contacts.getContacts({ projection: { name: true, phones: true } }).then(function (result) {
        var map = {};
        (result && result.contacts || []).forEach(function (c) {
          var displayName = c.name && (c.name.display || [c.name.given, c.name.family].filter(Boolean).join(" "));
          if (!displayName) return;
          (c.phoneNumbers || []).forEach(function (p) {
            var normalized = normalizePhoneDigits(p.number);
            if (normalized && !map[normalized]) map[normalized] = displayName;
          });
        });
        deviceContactsByPhone = map;
        render();
      });
    }).catch(function () { deviceContactsByPhone = {}; });
  }
  function getDeviceContactName(phone) {
    if (!deviceContactsByPhone) return null;
    var normalized = normalizePhoneDigits(phone);
    return (normalized && deviceContactsByPhone[normalized]) || null;
  }
  // The name shown for a member's messages/mentions: this device's own
  // contacts take priority (so everyone sees names the way they actually
  // know that person), falling back to whatever name was on record from
  // before this change, then the bare phone number.
  function resolveMemberName(sheet, phone) {
    if (!phone) return phone;
    return getDeviceContactName(phone) || (sheet && sheet.memberNames && sheet.memberNames[phone]) || phone;
  }

  // The standard Web Push API (navigator.serviceWorker + window.PushManager)
  // is unsupported by the Android WebView engine the native app runs in -
  // reminders/chat notifications need a native Firebase Cloud Messaging
  // plugin there instead. Uses @capacitor-firebase/messaging rather than
  // @capacitor/push-notifications: the latter's register() call is a
  // documented, widely-reported source of silent hangs (its
  // "registration"/"registrationError" events sometimes never fire at all,
  // with no native error) - confirmed against public bug reports and
  // reproduced here even with a correctly configured Firebase project.
  // @capacitor-firebase/messaging's getToken() is a real Promise instead of
  // an unreliable one-shot event pair.
  var capacitorPushAvailable = !!(
    window.Capacitor && window.Capacitor.isNativePlatform && window.Capacitor.isNativePlatform() &&
    window.Capacitor.Plugins && window.Capacitor.Plugins.FirebaseMessaging
  );

  // The Android WebView this app runs in doesn't implement navigator.share()
  // at all (unlike Chrome), so every PDF/file share silently fell back to a
  // plain download there - these two native plugins give a real OS share
  // sheet instead: Filesystem writes the blob to a real file the OS can
  // hand off, Share hands that file to the native share sheet.
  var capacitorShareAvailable = !!(
    window.Capacitor && window.Capacitor.isNativePlatform && window.Capacitor.isNativePlatform() &&
    window.Capacitor.Plugins && window.Capacitor.Plugins.Share && window.Capacitor.Plugins.Filesystem
  );

  // Native pickContact() only returns ONE contact per call (unlike the web
  // API's multiple:true), so this gets called once per button press;
  // pressing the button again picks another. Resolves to null if the user
  // cancels the native picker or it has no usable phone number.
  function pickOneNativeContact() {
    return window.Capacitor.Plugins.Contacts.pickContact({ projection: { name: true, phones: true } })
      .then(function (result) {
        var contact = result && result.contact;
        var phones = (contact && contact.phones) || [];
        var tel = phones.length ? phones[0].number : "";
        if (!tel) return null;
        var name = contact && contact.name && (contact.name.display || [contact.name.given, contact.name.family].filter(Boolean).join(" "));
        return { tel: tel, name: name || "" };
      })
      .catch(function (err) {
        // backing out of the picker isn't an error; anything else (most
        // often READ_CONTACTS missing from the app's manifest) is said
        // out loud instead of the button silently doing nothing
        var msg = (err && err.message) || "";
        if (!/cancel/i.test(msg)) alert(tr("contactPickFailedMsg") + (msg ? "\n" + msg : ""));
        return null;
      });
  }

  // --- Project invites: "שיתוף" on a project's tab sends a real invite to
  // one or more contacts instead of just dumping a text summary - each
  // invited phone only gains access after they explicitly approve (see the
  // receiving side further down), rather than being silently added.
  var projectInviteSendOverlay = document.getElementById("projectInviteSendOverlay");
  var projectInviteSendMessage = document.getElementById("projectInviteSendMessage");
  var projectInviteSendList = document.getElementById("projectInviteSendList");
  var projectInvitePickContactsBtn = document.getElementById("projectInvitePickContactsBtn");
  var projectInviteSendBtn = document.getElementById("projectInviteSendBtn");
  var projectInviteSendCancelBtn = document.getElementById("projectInviteSendCancelBtn");
  var pendingInviteSheetId = null;

  function addInvitePhoneInput(focusIt, presetValue, presetName) {
    var input = document.createElement("input");
    input.type = "tel";
    input.className = "auth-input";
    input.placeholder = tr("sharedProjectPhonePlaceholder");
    input.maxLength = 60;
    if (presetValue) input.value = presetName ? (presetName + " – " + presetValue) : presetValue;
    if (presetName) input.dataset.contactName = presetName;
    input.addEventListener("input", function () {
      delete input.dataset.contactName;
      if (input.value.trim() && input === projectInviteSendList.lastElementChild) {
        addInvitePhoneInput(false);
      }
    });
    input.addEventListener("keydown", function (e) {
      e.stopPropagation();
      if (e.key === "Enter") projectInviteSendBtn.click();
      if (e.key === "Escape") closeProjectInviteSendModal();
    });
    projectInviteSendList.appendChild(input);
    if (focusIt) input.focus();
  }

  function pickContactsForInvite() {
    if (!contactPickerSupported) return;
    if (capacitorContactsAvailable) {
      pickOneNativeContact().then(function (picked) {
        if (!picked) return;
        var lastEmpty = projectInviteSendList.lastElementChild;
        if (lastEmpty && !lastEmpty.value.trim() && lastEmpty.parentNode) lastEmpty.parentNode.removeChild(lastEmpty);
        addInvitePhoneInput(false, picked.tel, picked.name);
        addInvitePhoneInput(false);
      });
      return;
    }
    navigator.contacts.select(["name", "tel"], { multiple: true }).then(function (contacts) {
      var lastEmpty = projectInviteSendList.lastElementChild;
      contacts.forEach(function (c) {
        var tel = (c.tel && c.tel[0]) || "";
        var name = (c.name && c.name[0]) || "";
        if (!tel) return;
        addInvitePhoneInput(false, tel, name);
      });
      if (lastEmpty && !lastEmpty.value.trim() && lastEmpty.parentNode) lastEmpty.parentNode.removeChild(lastEmpty);
      addInvitePhoneInput(false);
    }).catch(function () {});
  }
  projectInvitePickContactsBtn.hidden = !contactPickerSupported;
  projectInvitePickContactsBtn.addEventListener("click", pickContactsForInvite);

  function openProjectInviteSendModal(id) {
    var sheet = allSheets().find(function (s) { return s.id === id; });
    if (!sheet) return;
    pendingInviteSheetId = id;
    projectInviteSendMessage.textContent = tr("projectInviteSendMessagePrefix") + " \"" + sheet.name + "\"";
    projectInviteSendList.innerHTML = "";
    addInvitePhoneInput(false);
    projectInviteSendOverlay.hidden = false;
  }
  function closeProjectInviteSendModal() {
    projectInviteSendOverlay.hidden = true;
    pendingInviteSheetId = null;
  }
  projectInviteSendCancelBtn.addEventListener("click", closeProjectInviteSendModal);
  projectInviteSendOverlay.addEventListener("click", function (e) {
    if (e.target === projectInviteSendOverlay) closeProjectInviteSendModal();
  });

  function sendProjectInviteNotification(targetPhone, projectName, senderName, inviteId, shared) {
    if (!supabaseClient || !supabaseClient.functions) return;
    try {
      supabaseClient.functions.invoke("send-project-invite-notification", {
        body: { targetPhone: targetPhone, projectName: projectName, senderName: senderName, inviteId: inviteId, shared: !!shared }
      }).then(function () {}, function (err) {
        console.error("send-project-invite-notification failed:", err);
      });
    } catch (e) {}
  }

  // A "share" is a one-time COPY, not a live shared project: the sender's
  // own project is never touched or converted - each invited phone, once
  // they approve, gets an independent private project seeded from a
  // snapshot of the sender's tasks/reports/site logs taken right now.
  // Files aren't included in the snapshot since they live in the sender's
  // own storage folder (keyed by this sheet's id) and the recipient has no
  // access to it.
  function buildProjectInviteSnapshot(sheet) {
    return {
      tasks: sheet.tasks || [],
      reports: sheet.reports || [],
      siteLogs: sheet.siteLogs || []
    };
  }

  projectInviteSendBtn.addEventListener("click", function () {
    if (!pendingInviteSheetId || !supabaseClient) return;
    var inputs = Array.prototype.slice.call(projectInviteSendList.querySelectorAll("input"));
    var invitees = [];
    inputs.forEach(function (i) {
      var phone = normalizePhoneDigits(i.value);
      if (!phone || phone === myPhoneNumber) return;
      invitees.push({ phone: phone, name: i.dataset.contactName || null });
    });
    if (!invitees.length) {
      alert(tr("projectInviteNeedPhoneMsg"));
      return;
    }

    var sheet = allSheets().find(function (s) { return s.id === pendingInviteSheetId; });
    if (!sheet) return;
    var senderName = myDisplayNameIn(sheet) || myPhoneNumber;
    var snapshot = buildProjectInviteSnapshot(sheet);

    closeProjectInviteSendModal();

    var rows = invitees.map(function (inv) {
      return {
        project_name: sheet.name,
        snapshot: snapshot,
        invited_phone: inv.phone,
        invited_by_phone: myPhoneNumber,
        invited_by_name: senderName
      };
    });

    supabaseClient.from("project_invites").insert(rows).select().then(function (result) {
      if (result && result.error) { console.error("project_invites insert failed:", result.error); return; }
      (result.data || []).forEach(function (row) {
        sendProjectInviteNotification(row.invited_phone, row.project_name, row.invited_by_name, row.id);
      });
      showToast(tr("projectInviteSentMsg"));
    }, function (err) {
      console.error("project_invites insert failed:", err);
    });
  });

  // --- Receiving side: an invite addressed to my own phone shows an
  // approve/decline prompt. Approving creates a brand-new PRIVATE project
  // from the invite's snapshot (never a shared one) and marks the invite
  // resolved via a plain update - my own phone number is both the row I'm
  // allowed to see and the one I'm allowed to resolve, so no elevated
  // privileges are needed here.
  var projectInviteReceivedOverlay = document.getElementById("projectInviteReceivedOverlay");
  var projectInviteReceivedMessage = document.getElementById("projectInviteReceivedMessage");
  var projectInviteApproveBtn = document.getElementById("projectInviteApproveBtn");
  var projectInviteDeclineBtn = document.getElementById("projectInviteDeclineBtn");
  var pendingProjectInvitesQueue = [];
  var activeProjectInvite = null;

  function sharedInviteProjectId(invite) {
    return invite && invite.snapshot && invite.snapshot.sharedProjectId || null;
  }
  // For each shared project, only the newest invite to me counts (I may
  // have been removed and added again).
  function latestSharedInvites(rows) {
    var latest = {};
    rows.forEach(function (r) {
      var pid = sharedInviteProjectId(r);
      if (!pid) return;
      var key = pid + "|" + r.invited_phone;
      if (!latest[key] || String(r.created_at || "") > String(latest[key].created_at || "")) latest[key] = r;
    });
    return Object.keys(latest).map(function (k) { return latest[k]; });
  }
  function checkPendingProjectInvites() {
    if (!supabaseClient || !myPhoneNumber) return;
    cleanUpDeclinedSharedInvites();
    if (activeProjectInvite) return;
    try {
      supabaseClient.from("project_invites").select("*")
        .eq("invited_phone", myPhoneNumber)
        .then(function (result) {
          if (!result || result.error || !result.data) return;
          var hidden = {};
          latestSharedInvites(result.data).forEach(function (r) {
            if (r.status !== "approved") hidden[sharedInviteProjectId(r)] = true;
          });
          var changed = JSON.stringify(hidden) !== JSON.stringify(hiddenSharedProjectIds);
          hiddenSharedProjectIds = hidden;
          if (changed) render();
          var pendingShared = latestSharedInvites(result.data).filter(function (r) { return r.status === "pending"; });
          var pendingCopies = result.data.filter(function (r) { return r.status === "pending" && !sharedInviteProjectId(r); });
          pendingProjectInvitesQueue = pendingCopies.concat(pendingShared);
          showNextPendingProjectInvite();
        }, function () {});
    } catch (e) {}
  }
  function showNextPendingProjectInvite() {
    if (activeProjectInvite || !pendingProjectInvitesQueue.length) return;
    activeProjectInvite = pendingProjectInvitesQueue.shift();
    var senderLabel = activeProjectInvite.invited_by_name || activeProjectInvite.invited_by_phone;
    var templateKey = sharedInviteProjectId(activeProjectInvite) ? "sharedProjectInviteMsgTemplate" : "projectInviteReceivedMsgTemplate";
    projectInviteReceivedMessage.textContent = tr(templateKey)
      .replace("{project}", activeProjectInvite.project_name)
      .replace("{name}", senderLabel);
    projectInviteReceivedOverlay.hidden = false;
  }
  function closeProjectInviteReceivedModal() {
    projectInviteReceivedOverlay.hidden = true;
    activeProjectInvite = null;
    showNextPendingProjectInvite();
  }
  function resolveProjectInvite(invite, newStatus) {
    if (!supabaseClient) return;
    supabaseClient.from("project_invites")
      .update({ status: newStatus, resolved_at: new Date().toISOString() })
      .eq("id", invite.id)
      .then(function (result) {
        if (result && result.error) console.error("project_invites update failed:", result.error);
      }, function (err) {
        console.error("project_invites update failed:", err);
      });
  }
  projectInviteApproveBtn.addEventListener("click", function () {
    if (!activeProjectInvite) return;
    var invite = activeProjectInvite;
    var sharedId = sharedInviteProjectId(invite);
    if (sharedId) {
      // joining a shared project I'm already listed in: just show it
      delete hiddenSharedProjectIds[sharedId];
      if (sharedSheets.some(function (s) { return s.id === sharedId; })) data.activeSheetId = sharedId;
      else loadSharedSheets();
      resolveProjectInvite(invite, "approved");
      showToast(tr("projectInviteApprovedMsg"));
      closeProjectInviteReceivedModal();
      render();
      return;
    }
    // resolveProjectInvite()'s server update is fire-and-forget - if it
    // fails (a brief network blip), the invite row stays "pending" and
    // checkPendingProjectInvites() will surface this exact same invite
    // again later, and approving it a second time would otherwise push a
    // full duplicate of the project. Tag the imported sheet with the
    // invite's id so re-approving the same invite is a safe no-op instead.
    var alreadyImported = data.sheets.some(function (s) { return s.importedInviteId === invite.id; });
    if (!alreadyImported) {
      var snap = invite.snapshot || {};
      data.sheets.push({
        id: uid(),
        name: invite.project_name,
        tasks: snap.tasks || [],
        reports: snap.reports || [],
        files: [],
        folders: null,
        siteLogs: (snap.siteLogs || []).map(normalizeSiteLog),
        logoId: null,
        ended: false,
        endedDate: null,
        importedInviteId: invite.id
      });
      data.activeSheetId = data.sheets[data.sheets.length - 1].id;
      saveData();
    }
    resolveProjectInvite(invite, "approved");
    showToast(tr("projectInviteApprovedMsg"));
    closeProjectInviteReceivedModal();
    render();
  });
  projectInviteDeclineBtn.addEventListener("click", function () {
    if (!activeProjectInvite) return;
    resolveProjectInvite(activeProjectInvite, "declined");
    showToast(tr("projectInviteDeclinedMsg"));
    closeProjectInviteReceivedModal();
  });

  function normalizePhoneDigits(raw) {
    var digits = (raw || "").replace(/\D/g, "");
    if (digits.indexOf("972") === 0 && digits.length > 10) digits = digits.slice(3);
    digits = digits.replace(/^0+/, "");
    if (digits.length < 8 || digits.length > 10) return null;
    return "+972" + digits;
  }

  var sharedProjectOverlay = document.getElementById("sharedProjectOverlay");
  var sharedProjectModalMessage = document.getElementById("sharedProjectModalMessage");
  var sharedProjectNameInput = document.getElementById("sharedProjectNameInput");
  var sharedProjectMembersList = document.getElementById("sharedProjectMembersList");
  var sharedProjectSaveBtn = document.getElementById("sharedProjectSaveBtn");
  var sharedProjectCancelBtn = document.getElementById("sharedProjectCancelBtn");

  function addSharedMemberInput(focusIt, presetValue, presetName) {
    var input = document.createElement("input");
    input.type = "tel";
    input.className = "auth-input";
    input.placeholder = tr("sharedProjectPhonePlaceholder");
    input.maxLength = 60;
    if (presetValue) input.value = presetName ? (presetName + " – " + presetValue) : presetValue;
    if (presetName) input.dataset.contactName = presetName;
    input.addEventListener("input", function () {
      delete input.dataset.contactName;
      if (input.value.trim() && input === sharedProjectMembersList.lastElementChild) {
        addSharedMemberInput(false);
      }
    });
    input.addEventListener("keydown", function (e) {
      e.stopPropagation();
      if (e.key === "Enter") sharedProjectSaveBtn.click();
      if (e.key === "Escape") closeSharedProjectModal();
    });
    sharedProjectMembersList.appendChild(input);
    if (focusIt) input.focus();
  }

  function pickContactsForSharedProject() {
    if (!contactPickerSupported) return;
    if (capacitorContactsAvailable) {
      pickOneNativeContact().then(function (picked) {
        if (!picked) return;
        var lastEmpty = sharedProjectMembersList.lastElementChild;
        if (lastEmpty && !lastEmpty.value.trim() && lastEmpty.parentNode) lastEmpty.parentNode.removeChild(lastEmpty);
        addSharedMemberInput(false, picked.tel, picked.name);
        addSharedMemberInput(false);
      });
      return;
    }
    navigator.contacts.select(["name", "tel"], { multiple: true }).then(function (contacts) {
      var lastEmpty = sharedProjectMembersList.lastElementChild;
      contacts.forEach(function (c) {
        var tel = (c.tel && c.tel[0]) || "";
        var name = (c.name && c.name[0]) || "";
        if (!tel) return;
        addSharedMemberInput(false, tel, name);
      });
      if (lastEmpty && !lastEmpty.value.trim() && lastEmpty.parentNode) lastEmpty.parentNode.removeChild(lastEmpty);
      addSharedMemberInput(false);
    }).catch(function () {});
  }

  var sharedProjectPickContactsBtn = document.getElementById("sharedProjectPickContactsBtn");
  sharedProjectPickContactsBtn.hidden = !contactPickerSupported;
  sharedProjectPickContactsBtn.addEventListener("click", pickContactsForSharedProject);

  var pendingSharedEditId = null;

  var pendingConvertSheetId = null;

  function openSharedProjectModal() {
    pendingSharedEditId = null;
    pendingConvertSheetId = null;
    sharedProjectModalMessage.textContent = tr("sharedProjectModalMessage");
    sharedProjectNameInput.value = "";
    sharedProjectMembersList.innerHTML = "";
    addSharedMemberInput(false);
    sharedProjectOverlay.hidden = false;
    sharedProjectNameInput.focus();
  }
  function openSharedProjectEditModal(id) {
    var sheet = sharedSheets.find(function (s) { return s.id === id; });
    if (!sheet) return;
    pendingSharedEditId = id;
    pendingConvertSheetId = null;
    sharedProjectModalMessage.textContent = tr("sharedProjectEditModalMessage");
    sharedProjectNameInput.value = sheet.name;
    sharedProjectMembersList.innerHTML = "";
    var otherMembers = (sheet.members || []).filter(function (p) { return p !== myPhoneNumber; });
    otherMembers.forEach(function (phone) {
      var knownName = getDeviceContactName(phone) || (sheet.memberNames || {})[phone] || "";
      addSharedMemberInput(false, phone.replace("+972", "0"), knownName);
    });
    addSharedMemberInput(false);
    sharedProjectOverlay.hidden = false;
    sharedProjectNameInput.focus();
  }
  function openSharedProjectConvertModal(id) {
    var sheet = data.sheets.find(function (s) { return s.id === id; });
    if (!sheet) return;
    if (data.sheets.length <= 1) {
      alert(tr("mustHaveOneProject"));
      return;
    }
    pendingSharedEditId = null;
    pendingConvertSheetId = id;
    sharedProjectModalMessage.textContent = tr("sharedProjectConvertModalMessage");
    sharedProjectNameInput.value = sheet.name;
    sharedProjectMembersList.innerHTML = "";
    addSharedMemberInput(false);
    sharedProjectOverlay.hidden = false;
    sharedProjectNameInput.focus();
  }
  function closeSharedProjectModal() {
    sharedProjectOverlay.hidden = true;
    pendingSharedEditId = null;
    pendingConvertSheetId = null;
  }
  // ---- Shared-project invites ----
  // Adding someone to a shared project lists their phone in its members
  // right away (the database only lets members write to it), but their
  // app keeps the project hidden until they approve: each new member gets
  // a project_invites row tagged snapshot.sharedProjectId, a push, and the
  // same approve/decline prompt as a shared copy. Declining keeps it
  // hidden for them, and the inviter's app then takes them off the members
  // (a member can't remove themselves - the database requires the writer
  // to stay a member).
  function inviteNewSharedMembers(sheetId, projectName, newPhones) {
    if (!supabaseClient || !newPhones.length) return;
    var sheet = sharedSheets.find(function (s) { return s.id === sheetId; });
    var senderName = (sheet && myDisplayNameIn(sheet)) || myPhoneNumber;
    var rows = newPhones.map(function (phone) {
      return {
        project_name: projectName,
        snapshot: { sharedProjectId: sheetId },
        invited_phone: phone,
        invited_by_phone: myPhoneNumber,
        invited_by_name: senderName
      };
    });
    supabaseClient.from("project_invites").insert(rows).select().then(function (result) {
      if (result && result.error) { console.error("shared project invites insert failed:", result.error); return; }
      (result.data || []).forEach(function (row) {
        sendProjectInviteNotification(row.invited_phone, row.project_name, row.invited_by_name, row.id, true);
      });
    }, function (err) { console.error("shared project invites insert failed:", err); });
  }
  function cleanUpDeclinedSharedInvites() {
    if (!supabaseClient || !myPhoneNumber) return;
    try {
      supabaseClient.from("project_invites").select("*").eq("invited_by_phone", myPhoneNumber).then(function (result) {
        if (!result || result.error || !result.data) return;
        latestSharedInvites(result.data).forEach(function (r) {
          if (r.status !== "declined") return;
          var pid = sharedInviteProjectId(r);
          var sheet = sharedSheets.find(function (s) { return s.id === pid; });
          if (!sheet || (sheet.members || []).indexOf(r.invited_phone) === -1) return;
          updateSharedProjectSettings(pid, function (current) {
            return { name: current.name, members: current.members.filter(function (p) { return p !== r.invited_phone; }), memberNames: current.memberNames };
          }).then(function () { render(); }, function () {});
        });
      }, function () {});
    } catch (e) {}
  }

  sharedProjectSaveBtn.addEventListener("click", function () {
    var name = sharedProjectNameInput.value.trim().slice(0, 40) || tr("sharedProjectDefaultName");
    var inputs = Array.prototype.slice.call(sharedProjectMembersList.querySelectorAll("input"));
    var members = [];
    var pickedNames = {};
    inputs.forEach(function (i) {
      var phone = normalizePhoneDigits(i.value);
      if (!phone) return;
      members.push(phone);
      if (i.dataset.contactName) pickedNames[phone] = i.dataset.contactName;
    });
    if (myPhoneNumber && members.indexOf(myPhoneNumber) === -1) members.push(myPhoneNumber);
    if (members.length < 2) {
      alert(tr("sharedProjectNeedMember"));
      return;
    }
    var invitedId = null, previousMembers = [myPhoneNumber];
    if (pendingSharedEditId) {
      var existing = sharedSheets.find(function (s) { return s.id === pendingSharedEditId; });
      if (existing) {
        invitedId = existing.id;
        previousMembers = existing.members || [];
        existing.name = name;
        existing.members = members;
        existing.memberNames = Object.assign({}, existing.memberNames || {}, pickedNames);
        // An existing shared row - editing it safely means merging against
        // whatever's actually on the server right now (e.g. another member
        // may have set their own display name since this loaded), not
        // blindly overwriting it with this device's possibly-stale copy.
        updateSharedProjectSettings(existing.id, function (current) {
          return { name: name, members: members, memberNames: Object.assign({}, current.memberNames || {}, pickedNames) };
        }).catch(function () { scheduleSyncRetry(); });
      }
    } else if (pendingConvertSheetId) {
      var privateSheet = data.sheets.find(function (s) { return s.id === pendingConvertSheetId; });
      if (privateSheet) {
        var converted = {
          id: window.crypto.randomUUID ? window.crypto.randomUUID() : uid(),
          shared: true,
          name: name,
          tasks: privateSheet.tasks || [],
          reports: privateSheet.reports || [],
          files: privateSheet.files || [],
          folders: privateSheet.folders || null,
          siteLogs: privateSheet.siteLogs || [],
          workPlan: privateSheet.workPlan || [],
          workHammocks: privateSheet.workHammocks || [],
          workBaseline: privateSheet.workBaseline || null,
          ended: privateSheet.ended || false,
          endedDate: privateSheet.endedDate || null,
          logoId: privateSheet.logoId || null,
          members: members,
          memberNames: pickedNames,
          createdBy: myPhoneNumber,
          messages: []
        };
        data.sheets = data.sheets.filter(function (s) { return s.id !== pendingConvertSheetId; });
        sharedSheets.push(converted);
        invitedId = converted.id;
        if (data.activeSheetId === pendingConvertSheetId) data.activeSheetId = converted.id;
      }
    } else {
      var sheet = {
        id: window.crypto.randomUUID ? window.crypto.randomUUID() : uid(),
        shared: true,
        name: name,
        tasks: [],
        reports: [],
        files: [],
        ended: false,
        endedDate: null,
        logoId: null,
        members: members,
        memberNames: pickedNames,
        createdBy: myPhoneNumber,
        messages: []
      };
      sharedSheets.push(sheet);
      invitedId = sheet.id;
      data.activeSheetId = sheet.id;
    }
    closeSharedProjectModal();
    saveData();
    render();
    if (invitedId) {
      inviteNewSharedMembers(invitedId, name, members.filter(function (p) {
        return p !== myPhoneNumber && previousMembers.indexOf(p) === -1;
      }));
    }
  });
  sharedProjectCancelBtn.addEventListener("click", closeSharedProjectModal);
  sharedProjectOverlay.addEventListener("click", function (e) {
    if (e.target === sharedProjectOverlay) closeSharedProjectModal();
  });

  var sheetActionOverlay = document.getElementById("sheetActionOverlay");
  var sheetActionDeleteBtn = document.getElementById("sheetActionDeleteBtn");
  var sheetActionShareBtn = document.getElementById("sheetActionShareBtn");
  var sheetActionEndBtn = document.getElementById("sheetActionEndBtn");
  var sheetActionReactivateBtn = document.getElementById("sheetActionReactivateBtn");
  var sheetActionMembersBtn = document.getElementById("sheetActionMembersBtn");
  var sheetActionMakeSharedBtn = document.getElementById("sheetActionMakeSharedBtn");
  var sheetActionLogoBtn = document.getElementById("sheetActionLogoBtn");
  var sheetActionCancelBtn = document.getElementById("sheetActionCancelBtn");
  var pendingSheetActionId = null;

  function openSheetActionModal(id) {
    pendingSheetActionId = id;
    var sheet = allSheets().find(function (s) { return s.id === id; });
    var isShared = !!sharedSheets.find(function (s) { return s.id === id; });
    // Deleting a shared project removes it for every member, not just this
    // device - only the member who created it gets the option, same as
    // the DB's own RLS policy (shared_projects_created_by.sql) enforces.
    sheetActionDeleteBtn.hidden = isShared && (!sheet || sheet.createdBy !== myPhoneNumber);
    sheetActionMembersBtn.hidden = !isShared;
    sheetActionMakeSharedBtn.hidden = isShared;
    sheetActionEndBtn.hidden = !!(sheet && sheet.ended);
    sheetActionReactivateBtn.hidden = !(sheet && sheet.ended);
    sheetActionOverlay.hidden = false;
  }
  function closeSheetActionModal() {
    sheetActionOverlay.hidden = true;
    pendingSheetActionId = null;
  }
  sheetActionDeleteBtn.addEventListener("click", function () {
    var id = pendingSheetActionId;
    closeSheetActionModal();
    deleteSheet(id);
  });
  sheetActionShareBtn.addEventListener("click", function () {
    var id = pendingSheetActionId;
    closeSheetActionModal();
    openProjectInviteSendModal(id);
  });
  sheetActionEndBtn.addEventListener("click", function () {
    var id = pendingSheetActionId;
    closeSheetActionModal();
    endSheet(id);
  });
  sheetActionReactivateBtn.addEventListener("click", function () {
    var id = pendingSheetActionId;
    closeSheetActionModal();
    reactivateSheet(id);
  });
  sheetActionMembersBtn.addEventListener("click", function () {
    var id = pendingSheetActionId;
    closeSheetActionModal();
    openSharedProjectEditModal(id);
  });
  sheetActionMakeSharedBtn.addEventListener("click", function () {
    var id = pendingSheetActionId;
    closeSheetActionModal();
    openSharedProjectConvertModal(id);
  });
  sheetActionLogoBtn.addEventListener("click", function () {
    var id = pendingSheetActionId;
    closeSheetActionModal();
    openLogoPickerModal(id);
  });
  sheetActionCancelBtn.addEventListener("click", closeSheetActionModal);
  sheetActionOverlay.addEventListener("click", function (e) {
    if (e.target === sheetActionOverlay) closeSheetActionModal();
  });

