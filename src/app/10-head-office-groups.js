  var myOfficeGroups = [];
  var HEAD_OFFICE_ACTIVE_KEY = "itask-head-office-active";

  // The always-present "הזמנות רכש" tab in Head Office mode. Not a real
  // shared/synced project - just one ordinary private sheet (in data.sheets,
  // persisted via the normal app_state save path) whose id is this fixed
  // constant, and whose tasks are entirely system-generated (see
  // syncHeadOfficeVirtualTasks below) rather than user-added.
  var HEAD_OFFICE_SHEET_ID = "head-office-main";
  var wasHeadOfficeModeLastRender = false;

  function getHeadOfficeActivePref() {
    try { return localStorage.getItem(HEAD_OFFICE_ACTIVE_KEY) === "1"; } catch (e) { return false; }
  }
  function setHeadOfficeActivePref(on) {
    try { localStorage.setItem(HEAD_OFFICE_ACTIVE_KEY, on ? "1" : "0"); } catch (e) {}
  }
  function recomputeHeadOfficeMode() {
    isHeadOfficeMode = canBeHeadOffice && getHeadOfficeActivePref();
  }

  var headOfficeToggleOnBtn = document.getElementById("headOfficeToggleOnBtn");
  var headOfficeToggleOffBtn = document.getElementById("headOfficeToggleOffBtn");
  // A compact icon equivalent of the two menu buttons above, sitting above
  // the search icon on the main screen - one toggle button instead of two
  // (there's no room to stack two icons here), showing the current state
  // via its own "active" outline rather than swapping to a second icon.
  var headOfficeIconBtn = document.getElementById("headOfficeIconBtn");
  function updateHeadOfficeToggleButtons() {
    headOfficeToggleOnBtn.hidden = !canBeHeadOffice || isHeadOfficeMode;
    headOfficeToggleOffBtn.hidden = !canBeHeadOffice || !isHeadOfficeMode;
    headOfficeIconBtn.hidden = !canBeHeadOffice;
    headOfficeIconBtn.classList.toggle("active", isHeadOfficeMode);
    headOfficeIconBtn.setAttribute("aria-pressed", String(isHeadOfficeMode));
  }
  function setHeadOfficeActive(on) {
    setHeadOfficeActivePref(on);
    recomputeHeadOfficeMode();
    updateHeadOfficeToggleButtons();
    state.menuOpen = false;
    render();
  }
  headOfficeToggleOnBtn.addEventListener("click", function () { setHeadOfficeActive(true); });
  headOfficeToggleOffBtn.addEventListener("click", function () { setHeadOfficeActive(false); });
  headOfficeIconBtn.addEventListener("click", function () { setHeadOfficeActive(!isHeadOfficeMode); });

  // Fetched once after login (and again right after an invite is
  // approved) - being the creator of any group, or having an APPROVED
  // head_office invite in one (see office_group_invites, invited there
  // only resolves once the invited phone itself approves - see
  // checkPendingOfficeGroupInvites below), is enough to unlock the toggle.
  function loadMyOfficeGroups() {
    if (!supabaseClient || !myPhoneNumber) return Promise.resolve();
    var asCreator = supabaseClient.from("office_groups").select("id").eq("creator_phone", myPhoneNumber);
    var asHeadOffice = supabaseClient.from("office_group_invites").select("id")
      .eq("invited_phone", myPhoneNumber).eq("role", "head_office").eq("status", "approved");
    return Promise.all([asCreator, asHeadOffice]).then(function (results) {
      var creatorRows = (results[0] && results[0].data) || [];
      var headOfficeRows = (results[1] && results[1].data) || [];
      myOfficeGroups = creatorRows.map(function (r) { return r.id; });
      canBeHeadOffice = (creatorRows.length + headOfficeRows.length) > 0;
      officeGroupManageBtn.hidden = myOfficeGroups.length === 0;
      recomputeHeadOfficeMode();
      updateHeadOfficeToggleButtons();
      render();
    }, function () {});
  }

  // "הקמת קבוצת משרד" - a two-step flow: pick the group's members (whose
  // shared projects get watched), then pick the one phone number that
  // becomes this group's Head Office. Either step takes a typed number or
  // a contact.
  var officeGroupCreateBtn = document.getElementById("officeGroupCreateBtn");
  var officeGroupMembersOverlay = document.getElementById("officeGroupMembersOverlay");
  var officeGroupMembersList = document.getElementById("officeGroupMembersList");
  var officeGroupMembersPickContactsBtn = document.getElementById("officeGroupMembersPickContactsBtn");
  var officeGroupMembersNextBtn = document.getElementById("officeGroupMembersNextBtn");
  var officeGroupMembersCancelBtn = document.getElementById("officeGroupMembersCancelBtn");
  var officeGroupHeadOfficeOverlay = document.getElementById("officeGroupHeadOfficeOverlay");
  var officeGroupHeadOfficeInput = document.getElementById("officeGroupHeadOfficeInput");
  var officeGroupHeadOfficePickContactsBtn = document.getElementById("officeGroupHeadOfficePickContactsBtn");
  var officeGroupHeadOfficeFinishBtn = document.getElementById("officeGroupHeadOfficeFinishBtn");
  var officeGroupHeadOfficeBackBtn = document.getElementById("officeGroupHeadOfficeBackBtn");
  officeGroupMembersPickContactsBtn.hidden = !contactPickerSupported;
  officeGroupHeadOfficePickContactsBtn.hidden = !contactPickerSupported;

  var pendingOfficeGroupMembers = [];

  function renderOfficeGroupMembersList() {
    officeGroupMembersList.innerHTML = "";
    pendingOfficeGroupMembers.forEach(function (phone) {
      var row = document.createElement("div");
      row.className = "site-log-entry";
      var phoneSpan = document.createElement("span");
      phoneSpan.textContent = phone;
      phoneSpan.dir = "ltr";
      row.appendChild(phoneSpan);
      var removeBtn = document.createElement("button");
      removeBtn.type = "button";
      removeBtn.className = "site-log-entry-remove";
      removeBtn.textContent = "✕";
      removeBtn.addEventListener("click", function () {
        pendingOfficeGroupMembers = pendingOfficeGroupMembers.filter(function (p) { return p !== phone; });
        renderOfficeGroupMembersList();
      });
      row.appendChild(removeBtn);
      officeGroupMembersList.appendChild(row);
    });

    var addRow = document.createElement("div");
    addRow.className = "site-log-entry";
    var addInput = document.createElement("input");
    addInput.type = "tel";
    addInput.className = "site-log-add-input";
    addInput.placeholder = tr("headOfficeMemberAddPlaceholder");
    addInput.dir = "ltr";
    addRow.appendChild(addInput);
    var addBtn = document.createElement("button");
    addBtn.type = "button";
    addBtn.className = "site-log-add-btn";
    var addBtnImg = document.createElement("img");
    addBtnImg.src = "tasks-plus-icon.webp";
    addBtnImg.alt = "+";
    addBtn.appendChild(addBtnImg);
    function submitAdd() {
      var phone = normalizePhoneDigits(addInput.value);
      if (!phone) { alert(tr("headOfficeMemberInvalidMsg")); return; }
      if (pendingOfficeGroupMembers.indexOf(phone) === -1) pendingOfficeGroupMembers.push(phone);
      renderOfficeGroupMembersList();
    }
    addBtn.addEventListener("click", submitAdd);
    addInput.addEventListener("keydown", function (e) { if (e.key === "Enter") { e.preventDefault(); submitAdd(); } });
    addRow.appendChild(addBtn);
    officeGroupMembersList.appendChild(addRow);
  }

  function openOfficeGroupCreateFlow() {
    pendingOfficeGroupMembers = [];
    renderOfficeGroupMembersList();
    state.menuOpen = false;
    render();
    officeGroupMembersOverlay.hidden = false;
  }
  officeGroupCreateBtn.addEventListener("click", openOfficeGroupCreateFlow);
  officeGroupMembersCancelBtn.addEventListener("click", function () { officeGroupMembersOverlay.hidden = true; });
  officeGroupMembersOverlay.addEventListener("click", function (e) {
    if (e.target === officeGroupMembersOverlay) officeGroupMembersOverlay.hidden = true;
  });

  function pickContactsForOfficeGroupMembers() {
    if (!contactPickerSupported) return;
    function addPicked(phone) {
      if (phone && pendingOfficeGroupMembers.indexOf(phone) === -1) pendingOfficeGroupMembers.push(phone);
    }
    if (capacitorContactsAvailable) {
      pickOneNativeContact().then(function (picked) {
        if (!picked) return;
        addPicked(normalizePhoneDigits(picked.tel));
        renderOfficeGroupMembersList();
      });
      return;
    }
    navigator.contacts.select(["tel"], { multiple: true }).then(function (contacts) {
      contacts.forEach(function (c) {
        var tel = (c.tel && c.tel[0]) || "";
        addPicked(normalizePhoneDigits(tel));
      });
      renderOfficeGroupMembersList();
    }).catch(function () {});
  }
  officeGroupMembersPickContactsBtn.addEventListener("click", pickContactsForOfficeGroupMembers);

  officeGroupMembersNextBtn.addEventListener("click", function () {
    if (!pendingOfficeGroupMembers.length) { alert(tr("officeGroupNoMembersMsg")); return; }
    officeGroupMembersOverlay.hidden = true;
    officeGroupHeadOfficeInput.value = "";
    officeGroupHeadOfficeOverlay.hidden = false;
  });

  officeGroupHeadOfficeBackBtn.addEventListener("click", function () {
    officeGroupHeadOfficeOverlay.hidden = true;
    officeGroupMembersOverlay.hidden = false;
  });
  officeGroupHeadOfficeOverlay.addEventListener("click", function (e) {
    if (e.target === officeGroupHeadOfficeOverlay) officeGroupHeadOfficeOverlay.hidden = true;
  });

  function pickContactForOfficeGroupHeadOffice() {
    if (!contactPickerSupported) return;
    if (capacitorContactsAvailable) {
      pickOneNativeContact().then(function (picked) {
        if (!picked) return;
        var phone = normalizePhoneDigits(picked.tel);
        if (phone) officeGroupHeadOfficeInput.value = phone;
      });
      return;
    }
    navigator.contacts.select(["tel"], { multiple: false }).then(function (contacts) {
      var c = contacts && contacts[0];
      var tel = c && c.tel && c.tel[0];
      var phone = tel && normalizePhoneDigits(tel);
      if (phone) officeGroupHeadOfficeInput.value = phone;
    }).catch(function () {});
  }
  officeGroupHeadOfficePickContactsBtn.addEventListener("click", pickContactForOfficeGroupHeadOffice);

  // Creates the (empty) group, then sends one invite per member plus one
  // for the chosen Head Office number - each only takes effect once ITS
  // OWN invited phone approves it (checkPendingOfficeGroupInvites below),
  // except when the creator names themselves (either role), which is
  // approved immediately - nobody needs to ask their own permission.
  officeGroupHeadOfficeFinishBtn.addEventListener("click", function () {
    // Left empty, the creator is the group's Head Office themselves (a
    // group can have only its own creator as Head Office) - only a
    // typed-but-invalid number blocks finishing.
    var rawHeadOfficeInput = officeGroupHeadOfficeInput.value.trim();
    var headOfficePhone = rawHeadOfficeInput ? normalizePhoneDigits(rawHeadOfficeInput) : myPhoneNumber;
    if (!headOfficePhone) { alert(tr("headOfficeMemberInvalidMsg")); return; }
    if (!supabaseClient || !myPhoneNumber) return;
    supabaseClient.from("office_groups").insert({ creator_phone: myPhoneNumber }).select().then(function (result) {
      if ((result && result.error) || !result.data || !result.data[0]) {
        console.error("office_groups insert failed:", result && result.error);
        alert(tr("officeGroupCreateErrorMsg"));
        return;
      }
      var groupId = result.data[0].id;
      var invites = pendingOfficeGroupMembers.map(function (phone) {
        return {
          group_id: groupId,
          role: "member",
          invited_phone: phone,
          invited_by_phone: myPhoneNumber,
          invited_by_name: myPhoneNumber,
          status: phone === myPhoneNumber ? "approved" : "pending"
        };
      });
      invites.push({
        group_id: groupId,
        role: "head_office",
        invited_phone: headOfficePhone,
        invited_by_phone: myPhoneNumber,
        invited_by_name: myPhoneNumber,
        status: headOfficePhone === myPhoneNumber ? "approved" : "pending"
      });
      supabaseClient.from("office_group_invites").insert(invites).then(function (inviteResult) {
        if (inviteResult && inviteResult.error) {
          console.error("office_group_invites insert failed:", inviteResult.error);
          alert(tr("officeGroupCreateErrorMsg"));
          return;
        }
        officeGroupHeadOfficeOverlay.hidden = true;
        pendingOfficeGroupMembers = [];
        showToast(tr("officeGroupCreatedMsg"));
        loadMyOfficeGroups();
        loadSharedSheets();
      }, function () { alert(tr("officeGroupCreateErrorMsg")); });
    }, function () { alert(tr("officeGroupCreateErrorMsg")); });
  });

  // --- Receiving side: an office_group_invites row addressed to my own
  // phone shows an approve/decline prompt, same queue-one-at-a-time
  // pattern as checkPendingProjectInvites above. Approving just flips its
  // status (the shared_projects RLS in office_groups.sql reads that
  // directly) and, for a head_office invite, refreshes this account's own
  // Head Office eligibility so the toggle appears right away.
  var officeGroupInviteReceivedOverlay = document.getElementById("officeGroupInviteReceivedOverlay");
  var officeGroupInviteReceivedMessage = document.getElementById("officeGroupInviteReceivedMessage");
  var officeGroupInviteApproveBtn = document.getElementById("officeGroupInviteApproveBtn");
  var officeGroupInviteDeclineBtn = document.getElementById("officeGroupInviteDeclineBtn");
  var pendingOfficeGroupInvitesQueue = [];
  var activeOfficeGroupInvite = null;

  function checkPendingOfficeGroupInvites() {
    if (!supabaseClient || !myPhoneNumber || activeOfficeGroupInvite) return;
    try {
      supabaseClient.from("office_group_invites").select("*")
        .eq("invited_phone", myPhoneNumber).eq("status", "pending")
        .then(function (result) {
          if (!result || result.error || !result.data || !result.data.length) return;
          pendingOfficeGroupInvitesQueue = result.data;
          showNextPendingOfficeGroupInvite();
        }, function () {});
    } catch (e) {}
  }
  function showNextPendingOfficeGroupInvite() {
    if (activeOfficeGroupInvite || !pendingOfficeGroupInvitesQueue.length) return;
    activeOfficeGroupInvite = pendingOfficeGroupInvitesQueue.shift();
    var senderLabel = activeOfficeGroupInvite.invited_by_name || activeOfficeGroupInvite.invited_by_phone;
    var template = activeOfficeGroupInvite.role === "head_office"
      ? tr("officeGroupInviteHeadOfficeMsgTemplate")
      : tr("officeGroupInviteMemberMsgTemplate");
    officeGroupInviteReceivedMessage.textContent = template.replace("{name}", senderLabel);
    officeGroupInviteReceivedOverlay.hidden = false;
  }
  function closeOfficeGroupInviteReceivedModal() {
    officeGroupInviteReceivedOverlay.hidden = true;
    activeOfficeGroupInvite = null;
    showNextPendingOfficeGroupInvite();
  }
  function resolveOfficeGroupInvite(invite, newStatus) {
    if (!supabaseClient) return Promise.resolve();
    return supabaseClient.from("office_group_invites")
      .update({ status: newStatus, resolved_at: new Date().toISOString() })
      .eq("id", invite.id)
      .then(function (result) {
        if (result && result.error) console.error("office_group_invites update failed:", result.error);
      }, function (err) {
        console.error("office_group_invites update failed:", err);
      });
  }
  officeGroupInviteApproveBtn.addEventListener("click", function () {
    if (!activeOfficeGroupInvite) return;
    var invite = activeOfficeGroupInvite;
    resolveOfficeGroupInvite(invite, "approved").then(function () {
      if (invite.role === "head_office") loadMyOfficeGroups();
      loadSharedSheets();
    });
    showToast(tr("officeGroupInviteApprovedMsg"));
    closeOfficeGroupInviteReceivedModal();
  });
  officeGroupInviteDeclineBtn.addEventListener("click", function () {
    if (!activeOfficeGroupInvite) return;
    resolveOfficeGroupInvite(activeOfficeGroupInvite, "declined");
    showToast(tr("officeGroupInviteDeclinedMsg"));
    closeOfficeGroupInviteReceivedModal();
  });

  // "ניהול קבוצת המשרד" - visible once this account has created at least
  // one group (myOfficeGroups, refreshed by loadMyOfficeGroups). Lists
  // each group's Head Office and member invites with their current
  // status, with an add-row and a ✕ to remove any invite (member or
  // Head Office alike) - deleting one is immediate, same table either
  // side already reads from, so it takes effect right away whether the
  // invite was still pending or already approved.
  var officeGroupManageBtn = document.getElementById("officeGroupManageBtn");
  var officeGroupManageView = document.getElementById("officeGroupManageView");
  var officeGroupManageBackBtn = document.getElementById("officeGroupManageBackBtn");
  var officeGroupManageList = document.getElementById("officeGroupManageList");

  function officeGroupStatusLabel(status) {
    if (status === "approved") return tr("officeGroupStatusApproved");
    if (status === "declined") return tr("officeGroupStatusDeclined");
    return tr("officeGroupStatusPending");
  }

  function removeOfficeGroupInvite(inviteId) {
    if (!supabaseClient) return;
    supabaseClient.from("office_group_invites").delete().eq("id", inviteId).then(function (result) {
      if (result && result.error) { console.error("office_group_invites delete failed:", result.error); return; }
      loadAndRenderOfficeGroupManage();
      loadSharedSheets();
    }, function () {});
  }

  function addOfficeGroupMember(groupId, phone, existingMembers) {
    if (existingMembers.some(function (m) { return m.invited_phone === phone; })) return;
    supabaseClient.from("office_group_invites").insert({
      group_id: groupId,
      role: "member",
      invited_phone: phone,
      invited_by_phone: myPhoneNumber,
      invited_by_name: myPhoneNumber,
      status: phone === myPhoneNumber ? "approved" : "pending"
    }).then(function (result) {
      if (result && result.error) {
        console.error("office_group_invites insert failed:", result.error);
        alert(tr("officeGroupCreateErrorMsg"));
        return;
      }
      loadAndRenderOfficeGroupManage();
      loadSharedSheets();
    }, function () { alert(tr("officeGroupCreateErrorMsg")); });
  }

  function renderOfficeGroupManageList(groups, invites) {
    officeGroupManageList.innerHTML = "";
    groups.forEach(function (group, idx) {
      var groupInvites = invites.filter(function (i) { return i.group_id === group.id; });
      var headOffice = groupInvites.find(function (i) { return i.role === "head_office"; });
      var members = groupInvites.filter(function (i) { return i.role === "member"; });

      var card = document.createElement("div");
      card.className = "office-procurement-project";

      var title = document.createElement("div");
      title.className = "office-procurement-project-name";
      var headOfficeText = headOffice
        ? headOffice.invited_phone + (headOffice.status !== "approved" ? " (" + officeGroupStatusLabel(headOffice.status) + ")" : "")
        : "-";
      title.textContent = (groups.length > 1 ? tr("officeGroupLabel") + " " + (idx + 1) + " - " : "") + tr("officeGroupHeadOfficeLabel") + " " + headOfficeText;
      title.dir = "auto";
      card.appendChild(title);

      members.forEach(function (m) {
        var row = document.createElement("div");
        row.className = "site-log-entry";
        var span = document.createElement("span");
        span.textContent = m.invited_phone + " - " + officeGroupStatusLabel(m.status);
        span.dir = "ltr";
        row.appendChild(span);
        var removeBtn = document.createElement("button");
        removeBtn.type = "button";
        removeBtn.className = "site-log-entry-remove";
        removeBtn.textContent = "✕";
        removeBtn.addEventListener("click", function () { removeOfficeGroupInvite(m.id); });
        row.appendChild(removeBtn);
        card.appendChild(row);
      });

      var addRow = document.createElement("div");
      addRow.className = "site-log-entry";
      var addInput = document.createElement("input");
      addInput.type = "tel";
      addInput.className = "site-log-add-input";
      addInput.placeholder = tr("headOfficeMemberAddPlaceholder");
      addInput.dir = "ltr";
      addRow.appendChild(addInput);
      var addBtn = document.createElement("button");
      addBtn.type = "button";
      addBtn.className = "site-log-add-btn";
      var addBtnImg = document.createElement("img");
      addBtnImg.src = "tasks-plus-icon.webp";
      addBtnImg.alt = "+";
      addBtn.appendChild(addBtnImg);
      function submitAdd() {
        var phone = normalizePhoneDigits(addInput.value);
        if (!phone) { alert(tr("headOfficeMemberInvalidMsg")); return; }
        addOfficeGroupMember(group.id, phone, members);
      }
      addBtn.addEventListener("click", submitAdd);
      addInput.addEventListener("keydown", function (e) { if (e.key === "Enter") { e.preventDefault(); submitAdd(); } });
      addRow.appendChild(addBtn);
      card.appendChild(addRow);

      officeGroupManageList.appendChild(card);
    });
  }

  function loadAndRenderOfficeGroupManage() {
    if (!supabaseClient || !myPhoneNumber) return;
    supabaseClient.from("office_groups").select("id, created_at").eq("creator_phone", myPhoneNumber).order("created_at")
      .then(function (groupsResult) {
        var groups = (groupsResult && groupsResult.data) || [];
        if (!groups.length) { officeGroupManageList.innerHTML = ""; return; }
        var groupIds = groups.map(function (g) { return g.id; });
        supabaseClient.from("office_group_invites").select("*").in("group_id", groupIds)
          .then(function (invitesResult) {
            var invites = (invitesResult && invitesResult.data) || [];
            renderOfficeGroupManageList(groups, invites);
          }, function () {});
      }, function () {});
  }

  function openOfficeGroupManageView() {
    state.menuOpen = false;
    render();
    officeGroupManageView.hidden = false;
    loadAndRenderOfficeGroupManage();
  }
  officeGroupManageBtn.addEventListener("click", openOfficeGroupManageView);
  officeGroupManageBackBtn.addEventListener("click", function () { officeGroupManageView.hidden = true; });

  // Company logos can be large source images (a marketing PNG straight off
  // someone's phone) - they're stored inline as data URLs in app_state's
  // JSON (no per-sheet "owning folder" to hang a Storage RLS policy off,
  // since a logo is shared across all of a user's projects), so downscale
  // through a canvas first or a handful of logo uploads would bloat that
  // JSON blob into the megabytes.
  var LOGO_MAX_DIMENSION = 300;
  function resizeImageFileToDataUrl(file) {
    return new Promise(function (resolve, reject) {
      var reader = new FileReader();
      reader.onerror = reject;
      reader.onload = function () {
        var img = new Image();
        img.onerror = reject;
        img.onload = function () {
          var scale = Math.min(1, LOGO_MAX_DIMENSION / Math.max(img.width, img.height));
          var w = Math.max(1, Math.round(img.width * scale));
          var h = Math.max(1, Math.round(img.height * scale));
          var canvas = document.createElement("canvas");
          canvas.width = w;
          canvas.height = h;
          canvas.getContext("2d").drawImage(img, 0, 0, w, h);
          resolve(canvas.toDataURL("image/png"));
        };
        img.src = reader.result;
      };
      reader.readAsDataURL(file);
    });
  }

  logoFileInput.addEventListener("change", function () {
    var file = logoFileInput.files && logoFileInput.files[0];
    if (!file) return;
    if (file.type.indexOf("image/") !== 0) { alert(tr("logoInvalidFileMsg")); return; }
    resizeImageFileToDataUrl(file).then(function (dataUrl) {
      data.logos.push({
        id: uid(),
        name: file.name.replace(/\.[^.]+$/, "") || tr("chooseLogoTitle"),
        dataUrl: dataUrl,
        addedAt: Date.now()
      });
      saveData();
      showToast(tr("logoAddedToast"));
    }).catch(function () {
      alert(tr("logoInvalidFileMsg"));
    });
  });

  function renderSheetTitleLogo() {
    var sheet = activeSheet();
    var logo = sheet ? findLogo(sheet.logoId) : null;
    if (logo) {
      sheetTitleLogo.src = logo.dataUrl;
      sheetTitleLogo.hidden = false;
    } else {
      sheetTitleLogo.src = "";
      sheetTitleLogo.hidden = true;
    }
  }

  function openLogoPickerModal(sheetId) {
    var sheet = sheetId ? allSheets().find(function (s) { return s.id === sheetId; }) : activeSheet();
    if (!sheet) return;
    logoPickerGrid.innerHTML = "";
    var noneItem = document.createElement("div");
    noneItem.className = "logo-picker-item" + (!sheet.logoId ? " selected" : "");
    var noneThumb = document.createElement("div");
    noneThumb.className = "logo-picker-thumb";
    noneThumb.textContent = "✕";
    noneItem.appendChild(noneThumb);
    var noneName = document.createElement("div");
    noneName.className = "logo-picker-name";
    noneName.textContent = tr("logoNoneOption");
    noneItem.appendChild(noneName);
    noneItem.addEventListener("click", function () {
      sheet.logoId = null;
      saveData();
      renderSheetTitleLogo();
      closeLogoPickerModal();
    });
    logoPickerGrid.appendChild(noneItem);

    (data.logos || []).forEach(function (logo) {
      var item = document.createElement("div");
      item.className = "logo-picker-item" + (sheet.logoId === logo.id ? " selected" : "");
      var thumb = document.createElement("div");
      thumb.className = "logo-picker-thumb";
      var img = document.createElement("img");
      img.src = logo.dataUrl;
      img.alt = "";
      thumb.appendChild(img);
      item.appendChild(thumb);
      var nameEl = document.createElement("div");
      nameEl.className = "logo-picker-name";
      nameEl.textContent = logo.name;
      item.appendChild(nameEl);
      item.addEventListener("click", function () {
        sheet.logoId = logo.id;
        saveData();
        renderSheetTitleLogo();
        closeLogoPickerModal();
      });
      logoPickerGrid.appendChild(item);
    });

    if (!(data.logos || []).length) {
      var emptyMsg = document.createElement("div");
      emptyMsg.className = "logo-picker-empty";
      emptyMsg.textContent = tr("logoPickerEmptyMsg");
      logoPickerGrid.appendChild(emptyMsg);
    }

    logoPickerOverlay.hidden = false;
  }
  function closeLogoPickerModal() {
    logoPickerOverlay.hidden = true;
  }
  logoPickerCancelBtn.addEventListener("click", closeLogoPickerModal);
  logoPickerOverlay.addEventListener("click", function (e) {
    if (e.target === logoPickerOverlay) closeLogoPickerModal();
  });

