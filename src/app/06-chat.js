  var chatBtn = document.getElementById("chatBtn");
  var chatFabBadge = document.getElementById("chatFabBadge");
  var chatView = document.getElementById("chatView");
  var ruledBodyEl = document.querySelector(".ruled-body");
  var chatMessages = document.getElementById("chatMessages");
  var chatMessagesInner = document.getElementById("chatMessagesInner");
  var chatForm = document.getElementById("chatForm");
  var chatInput = document.getElementById("chatInput");
  var activeChatSheetId = null;
  var chatPollTimer = null;
  // Set right before the render triggered by actually opening the chat, so
  // that render forces a scroll to the latest message regardless of
  // whatever stale scrollTop this element was left at from the last time
  // this same chat was open - consumed (read once, then cleared) by the
  // very next renderChatMessages() call.
  var chatForceScrollNext = false;

  var CHAT_READ_KEY_PREFIX = "itask-chat-read:";
  var chatReadState = {};
  function chatReadStorageKey() { return CHAT_READ_KEY_PREFIX + SUPABASE_ROW_ID; }
  function loadChatReadState() {
    try {
      var raw = localStorage.getItem(chatReadStorageKey());
      chatReadState = raw ? JSON.parse(raw) : {};
    } catch (e) { chatReadState = {}; }
  }
  function persistChatReadState() {
    try { localStorage.setItem(chatReadStorageKey(), JSON.stringify(chatReadState)); } catch (e) {}
  }
  function markChatRead(sheet) {
    if (!sheet) return;
    chatReadState[sheet.id] = Date.now();
    persistChatReadState();
    updateAppBadge();
  }
  function getUnreadCount(sheet) {
    if (!sheet || !sheet.messages) return 0;
    var lastRead = chatReadState[sheet.id] || 0;
    return sheet.messages.filter(function (m) {
      return m.type !== "system" && m.phone !== myPhoneNumber && m.ts > lastRead;
    }).length;
  }
  function totalUnreadCount() {
    return sharedSheets.reduce(function (sum, s) { return sum + getUnreadCount(s); }, 0);
  }
  function updateAppBadge() {
    if (!("setAppBadge" in navigator)) return;
    var n = totalUnreadCount();
    try {
      if (n > 0) navigator.setAppBadge(n).catch(function () {});
      else if ("clearAppBadge" in navigator) navigator.clearAppBadge().catch(function () {});
    } catch (e) {}
  }

  var CONTACT_COLOR_COUNT = 16;
  function contactColorIndex(phone) {
    var hash = 0;
    for (var i = 0; i < phone.length; i++) hash = (hash * 31 + phone.charCodeAt(i)) >>> 0;
    return (hash % CONTACT_COLOR_COUNT) + 1;
  }

  function chatDayLabel(ts) {
    var d = new Date(ts);
    var today = new Date();
    var yesterday = new Date();
    yesterday.setDate(today.getDate() - 1);
    if (d.toDateString() === today.toDateString()) return tr("chatToday");
    if (d.toDateString() === yesterday.toDateString()) return tr("chatYesterday");
    return d.toLocaleDateString([], { day: "2-digit", month: "2-digit", year: "numeric" });
  }

  function chatMessagePreviewText(m) {
    if (!m) return "";
    if (m.type === "voice") return tr("voiceMessageLabel");
    if (m.type === "file") return "📎 " + (m.fileName || "");
    return (m.text || "").slice(0, 80);
  }
  function chatMessageSenderLabel(m, sheet) {
    if (m.phone === myPhoneNumber) return tr("chatYou");
    return resolveMemberName(sheet, m.phone);
  }
  function escapeRegExp(s) { return s.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"); }
  function renderMessageTextWithMentions(container, text, sheet) {
    var names = ((sheet && sheet.members) || [])
      .map(function (p) { return resolveMemberName(sheet, p) !== p ? resolveMemberName(sheet, p) : null; })
      .filter(function (n) { return n; });
    names = Array.from(new Set(names)).sort(function (a, b) { return b.length - a.length; });
    if (!names.length) { container.textContent = text; return; }
    // No trailing \b: JS regex word-boundaries are ASCII-only, so a
    // Hebrew/Arabic name followed by a space or punctuation (neither side
    // being a \w character) would never register as a boundary and the
    // match would silently fail. Longest-name-first ordering above already
    // prevents a shorter name that's a prefix of a longer one from
    // matching too eagerly, so no boundary assertion is needed here.
    var re = new RegExp("@(" + names.map(escapeRegExp).join("|") + ")", "g");
    var lastIndex = 0, match, any = false;
    while ((match = re.exec(text))) {
      any = true;
      if (match.index > lastIndex) container.appendChild(document.createTextNode(text.slice(lastIndex, match.index)));
      var span = document.createElement("span");
      span.className = "chat-mention";
      span.textContent = match[0];
      container.appendChild(span);
      lastIndex = re.lastIndex;
    }
    if (!any) { container.textContent = text; return; }
    if (lastIndex < text.length) container.appendChild(document.createTextNode(text.slice(lastIndex)));
  }

  function isChatScrolledNearBottom() {
    return (chatMessages.scrollHeight - chatMessages.scrollTop - chatMessages.clientHeight) < 120;
  }
  function updateChatScrollButton() {
    chatScrollBottomBtn.hidden = isChatScrolledNearBottom();
  }

  function renderChatMessages() {
    var sheet = sharedSheets.find(function (s) { return s.id === activeChatSheetId; });
    var messages = (sheet && sheet.messages) || [];
    // Always jump to the bottom right after actually opening the chat (or
    // on a genuinely empty container), rather than trusting whatever
    // scrollTop this element was left at from the last time this chat was
    // open. Once the chat is actually open, fall back to the real current
    // scroll position so a background poll refresh doesn't yank someone
    // reading history.
    var wasNearBottom = chatForceScrollNext || !chatMessagesInner.children.length || isChatScrolledNearBottom();
    chatForceScrollNext = false;
    chatMessagesInner.innerHTML = "";
    if (!messages.length) {
      var empty = document.createElement("div");
      empty.className = "chat-empty";
      empty.textContent = tr("chatEmptyPrompt");
      chatMessagesInner.appendChild(empty);
      return;
    }
    var lastDay = null;
    messages.forEach(function (m, i) {
      var day = new Date(m.ts).toDateString();
      if (day !== lastDay) {
        var sep = document.createElement("div");
        sep.className = "chat-day-sep";
        sep.textContent = chatDayLabel(m.ts);
        chatMessagesInner.appendChild(sep);
        lastDay = day;
      }
      if (m.type === "system") {
        var sysEl = document.createElement("div");
        sysEl.className = "chat-system-msg";
        sysEl.textContent = systemMessageText(m, sheet, true);
        chatMessagesInner.appendChild(sysEl);
        return;
      }
      var isMine = m.phone === myPhoneNumber;
      var prev = messages[i - 1];
      var isStart = day !== (prev ? new Date(prev.ts).toDateString() : null) || !prev || prev.phone !== m.phone;
      var bubble = document.createElement("div");
      bubble.className = "chat-bubble " + (isMine ? "chat-bubble-mine" : "chat-bubble-theirs") + (isStart ? " chat-bubble-start" : "");
      bubble.dataset.msgId = m.id;
      var replyIcon = document.createElement("span");
      replyIcon.className = "chat-bubble-reply-icon";
      replyIcon.textContent = "↩";
      bubble.appendChild(replyIcon);
      if (!isMine) {
        var colorIdx = contactColorIndex(m.phone);
        bubble.style.setProperty("--bubble-bg", "var(--contact-bg-" + colorIdx + ")");
        bubble.style.setProperty("--sender-color", "var(--contact-name-" + colorIdx + ")");
      }
      if (isStart && !isMine) {
        var senderEl = document.createElement("div");
        senderEl.className = "chat-bubble-sender";
        senderEl.textContent = resolveMemberName(sheet, m.phone);
        bubble.appendChild(senderEl);
      }
      if (m.replyTo) {
        var quoteEl = document.createElement("div");
        quoteEl.className = "chat-bubble-quote";
        var quoteSenderEl = document.createElement("span");
        quoteSenderEl.className = "chat-bubble-quote-sender";
        quoteSenderEl.textContent = m.replyTo.senderName;
        var quoteTextEl = document.createElement("span");
        quoteTextEl.className = "chat-bubble-quote-text";
        quoteTextEl.textContent = m.replyTo.text;
        quoteEl.appendChild(quoteSenderEl);
        quoteEl.appendChild(quoteTextEl);
        quoteEl.addEventListener("click", function (e) {
          e.stopPropagation();
          if (m.replyTo && m.replyTo.taskId) {
            var quotedSheetId = activeChatSheetId;
            state.viewMode = "tasks";
            navigateToTaskLink(quotedSheetId, m.replyTo.taskDate, m.replyTo.taskId, false);
            render();
            return;
          }
          var target = m.replyTo && chatMessagesInner.querySelector('[data-msg-id="' + m.replyTo.id + '"]');
          if (target) target.scrollIntoView({ behavior: "smooth", block: "center" });
        });
        bubble.appendChild(quoteEl);
      }
      var textEl = document.createElement("div");
      if (m.type === "voice") {
        textEl.className = "chat-bubble-voice";
        var audioEl = document.createElement("audio");
        audioEl.controls = true;
        audioEl.preload = "none";
        audioEl.src = m.audioUrl;
        textEl.appendChild(audioEl);
      } else if (m.type === "file") {
        var isImg = /^image\//.test(m.fileType || "");
        if (isImg) {
          textEl.className = "chat-bubble-image";
          var imgEl = document.createElement("img");
          imgEl.src = m.fileUrl;
          imgEl.alt = m.fileName || "";
          imgEl.addEventListener("click", function () { openChatFile(m); });
          textEl.appendChild(imgEl);
        } else {
          textEl.className = "chat-bubble-file";
          var fileIcon = document.createElement("div");
          fileIcon.className = "chat-bubble-file-icon";
          fileIcon.textContent = "📄";
          textEl.appendChild(fileIcon);
          var fileInfo = document.createElement("div");
          fileInfo.className = "chat-bubble-file-info";
          var fileNameEl = document.createElement("div");
          fileNameEl.className = "chat-bubble-file-name";
          fileNameEl.textContent = m.fileName || "";
          fileInfo.appendChild(fileNameEl);
          var fileSizeEl = document.createElement("div");
          fileSizeEl.className = "chat-bubble-file-size";
          fileSizeEl.textContent = formatFileSize(m.fileSize);
          fileInfo.appendChild(fileSizeEl);
          textEl.appendChild(fileInfo);
          // tapping the file itself opens it (not only the ⬇ button)
          textEl.style.cursor = "pointer";
          textEl.addEventListener("click", function () { openChatFile(m); });
        }
        var downloadBtn = document.createElement("button");
        downloadBtn.type = "button";
        downloadBtn.className = "chat-bubble-download-btn";
        downloadBtn.textContent = "⬇";
        downloadBtn.title = tr("libraryAddBtnTitle");
        downloadBtn.addEventListener("click", function (e) {
          e.stopPropagation();
          saveChatFileToLibrary(activeChatSheetId, m);
        });
        textEl.appendChild(downloadBtn);
      } else {
        textEl.className = "chat-bubble-text";
        renderMessageTextWithMentions(textEl, m.text, sheet);
      }
      bubble.appendChild(textEl);
      var timeEl = document.createElement("div");
      timeEl.className = "chat-bubble-time";
      var timeValueEl = document.createElement("span");
      timeValueEl.className = "chat-bubble-time-value";
      timeValueEl.textContent = new Date(m.ts).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
      timeEl.appendChild(timeValueEl);
      if (m.edited) {
        var editedEl = document.createElement("span");
        editedEl.className = "chat-bubble-edited-mark";
        editedEl.textContent = tr("chatMsgEditedMark");
        timeEl.appendChild(editedEl);
      }
      if (isMine) {
        var readBy = m.readBy || [m.phone];
        var readByOthers = readBy.some(function (p) { return p !== myPhoneNumber; });
        var checkEl = document.createElement("span");
        checkEl.className = "chat-bubble-check" + (readByOthers ? " chat-bubble-check-read" : "");
        checkEl.textContent = readByOthers ? "✓✓" : "✓";
        timeEl.appendChild(checkEl);
      }
      bubble.appendChild(timeEl);
      attachChatBubbleLongPress(bubble, m);
      attachChatBubbleSwipeReply(bubble, m, replyIcon);
      chatMessagesInner.appendChild(bubble);
    });
    if (wasNearBottom) chatMessages.scrollTop = chatMessages.scrollHeight;
    updateChatScrollButton();
  }

  // Opening a file (from the chat or the library). Images open in the
  // app's own full-screen viewer. Inside the Android app any other file is
  // saved to the app's cache and opened in the phone's own viewer for its
  // type (ItaskAlarm.openFile, app version 19+); an older app, or a phone
  // with no app for that type, gets the share sheet instead. In a browser
  // the link opens in a new tab.
  function fetchFileBlob(url) {
    return fetch(url).then(function (res) {
      if (!res.ok) throw new Error("HTTP " + res.status);
      return res.blob();
    });
  }
  function openFileUrl(url, fileName, fileType) {
    if (/^image\//.test(fileType || "")) { openImageViewer(url, fileName); return; }
    if (!capacitorShareAvailable) { window.open(url, "_blank"); return; }
    showToast(tr("chatFileOpeningMsg"));
    var name = sanitizeFileName(fileName || "file");
    fetchFileBlob(url).then(function (blob) {
      var type = fileType || blob.type;
      var canOpen = nativeTaskAlarmPlugin && typeof nativeTaskAlarmPlugin.openFile === "function";
      if (!canOpen) { attemptShare(blob, name, type); return; }
      return blobToBase64(blob).then(function (base64) {
        return window.Capacitor.Plugins.Filesystem.writeFile({ path: name, data: base64, directory: "CACHE" });
      }).then(function (written) {
        return nativeTaskAlarmPlugin.openFile({ path: written.uri, mimeType: type });
      }).catch(function () {
        attemptShare(blob, name, type);
      });
    }).catch(function () {
      alert(tr("chatFileOpenError"));
    });
  }
  function openChatFile(m) {
    openFileUrl(m.fileUrl, m.fileName, m.fileType);
  }

  var imageViewerOverlay = document.getElementById("imageViewerOverlay");
  var imageViewerImg = document.getElementById("imageViewerImg");
  // Two fingers zoom (about the point between them), one finger moves a
  // zoomed picture, a double tap zooms in / back out. A single tap on the
  // unzoomed picture, or ✕, closes it.
  var ivZoom = { s: 1, x: 0, y: 0 };
  var ivPointers = {};
  var ivGesture = null;
  var ivLastTap = 0;
  var ivCloseTimer = null;
  function ivApply() {
    var W = imageViewerOverlay.clientWidth, H = imageViewerOverlay.clientHeight;
    var maxX = Math.max(0, (imageViewerImg.offsetWidth * ivZoom.s - W) / 2);
    var maxY = Math.max(0, (imageViewerImg.offsetHeight * ivZoom.s - H) / 2);
    ivZoom.x = Math.max(-maxX, Math.min(maxX, ivZoom.x));
    ivZoom.y = Math.max(-maxY, Math.min(maxY, ivZoom.y));
    imageViewerImg.style.transform = "translate(" + ivZoom.x + "px," + ivZoom.y + "px) scale(" + ivZoom.s + ")";
  }
  // zoom to s keeping the screen point (px, py) still
  function ivZoomAt(s, px, py, from) {
    var r = imageViewerOverlay.getBoundingClientRect();
    var cx = px - r.left - r.width / 2, cy = py - r.top - r.height / 2;
    s = Math.max(1, Math.min(6, s));
    ivZoom.x = cx - (cx - from.x) * s / from.s;
    ivZoom.y = cy - (cy - from.y) * s / from.s;
    ivZoom.s = s;
    ivApply();
  }
  function openImageViewer(url, name) {
    ivZoom = { s: 1, x: 0, y: 0 };
    ivPointers = {};
    ivGesture = null;
    imageViewerImg.style.transform = "";
    imageViewerImg.src = url;
    imageViewerImg.alt = name || "";
    imageViewerOverlay.hidden = false;
  }
  function closeImageViewer() {
    clearTimeout(ivCloseTimer);
    imageViewerOverlay.hidden = true;
    imageViewerImg.removeAttribute("src");
  }
  imageViewerOverlay.querySelector(".image-viewer-close").addEventListener("click", function (e) {
    e.stopPropagation();
    closeImageViewer();
  });
  imageViewerOverlay.addEventListener("pointerdown", function (e) {
    if (e.target.closest(".image-viewer-close")) return;
    e.preventDefault();
    clearTimeout(ivCloseTimer);
    ivPointers[e.pointerId] = { x: e.clientX, y: e.clientY };
    var ids = Object.keys(ivPointers);
    if (ids.length === 2) {
      var a = ivPointers[ids[0]], b = ivPointers[ids[1]];
      ivGesture = { pinch: true, d: Math.hypot(a.x - b.x, a.y - b.y) || 1, mid: { x: (a.x + b.x) / 2, y: (a.y + b.y) / 2 }, from: Object.assign({}, ivZoom), moved: true };
    } else if (ids.length === 1) {
      ivGesture = { start: { x: e.clientX, y: e.clientY }, from: Object.assign({}, ivZoom), moved: false };
    }
  });
  imageViewerOverlay.addEventListener("pointermove", function (e) {
    if (!ivPointers[e.pointerId] || !ivGesture) return;
    ivPointers[e.pointerId] = { x: e.clientX, y: e.clientY };
    var ids = Object.keys(ivPointers);
    if (ivGesture.pinch && ids.length >= 2) {
      var a = ivPointers[ids[0]], b = ivPointers[ids[1]];
      var mid = { x: (a.x + b.x) / 2, y: (a.y + b.y) / 2 };
      var g = ivGesture.from;
      // zoom about the starting midpoint, then follow the fingers
      ivZoomAt(g.s * Math.hypot(a.x - b.x, a.y - b.y) / ivGesture.d, ivGesture.mid.x, ivGesture.mid.y, g);
      ivZoom.x += mid.x - ivGesture.mid.x;
      ivZoom.y += mid.y - ivGesture.mid.y;
      ivApply();
    } else if (!ivGesture.pinch) {
      var dx = e.clientX - ivGesture.start.x, dy = e.clientY - ivGesture.start.y;
      if (Math.hypot(dx, dy) > 8) ivGesture.moved = true;
      if (ivZoom.s > 1) {
        ivZoom.x = ivGesture.from.x + dx;
        ivZoom.y = ivGesture.from.y + dy;
        ivApply();
      }
    }
  });
  function ivPointerEnd(e) {
    if (!ivPointers[e.pointerId]) return;
    delete ivPointers[e.pointerId];
    var left = Object.keys(ivPointers);
    var g = ivGesture;
    if (left.length === 1 && g && g.pinch) {
      // one finger stays down after a pinch: carry on moving with it
      var p = ivPointers[left[0]];
      ivGesture = { start: { x: p.x, y: p.y }, from: Object.assign({}, ivZoom), moved: true };
      return;
    }
    if (left.length) return;
    ivGesture = null;
    if (!g || g.moved || g.pinch || e.type === "pointercancel") return;
    var now = Date.now();
    if (now - ivLastTap < 320) {
      ivLastTap = 0;
      if (ivZoom.s > 1) { ivZoom = { s: 1, x: 0, y: 0 }; ivApply(); }
      else ivZoomAt(2.5, e.clientX, e.clientY, ivZoom);
      return;
    }
    ivLastTap = now;
    // a single tap: close, unless zoomed in (or a second tap follows)
    if (ivZoom.s === 1) ivCloseTimer = setTimeout(closeImageViewer, 330);
  }
  imageViewerOverlay.addEventListener("pointerup", ivPointerEnd);
  imageViewerOverlay.addEventListener("pointercancel", ivPointerEnd);

  // ⬇ asks which of the project's library folders to save into ("הורדות"
  // first, then the rest), then files a copy there.
  var chatSaveFolderOverlay = document.getElementById("chatSaveFolderOverlay");
  var chatSaveFolderList = document.getElementById("chatSaveFolderList");
  function saveChatFileToLibrary(sheetId, m) {
    var sheet = sharedSheets.find(function (s) { return s.id === sheetId; });
    if (!sheet || !supabaseClient) return;
    ensureLibraryFolders(sheet, function (folders) {
      chatSaveFolderList.innerHTML = "";
      var ordered = folders.filter(function (f) { return f.key === "downloads"; })
        .concat(folders.filter(function (f) { return f.key !== "downloads"; }));
      ordered.forEach(function (folder) {
        var btn = document.createElement("button");
        btn.type = "button";
        btn.textContent = "📁 " + folderDisplayName(folder);
        btn.addEventListener("click", function () {
          chatSaveFolderOverlay.hidden = true;
          saveChatFileToFolder(sheet, m, folder);
        });
        chatSaveFolderList.appendChild(btn);
      });
      chatSaveFolderOverlay.hidden = false;
    });
  }
  document.getElementById("chatSaveFolderCancelBtn").addEventListener("click", function () { chatSaveFolderOverlay.hidden = true; });
  chatSaveFolderOverlay.addEventListener("click", function (e) { if (e.target === chatSaveFolderOverlay) chatSaveFolderOverlay.hidden = true; });
  function saveChatFileToFolder(sheet, m, folder) {
    var fileName = m.fileName || "file";
    showToast(tr("chatFileSavingMsg"));
    fetchFileBlob(m.fileUrl).then(function (blob) {
      var path = sheet.id + "/" + folder.id + "/" + uid() + "-" + safeStorageFileName(fileName);
      return supabaseClient.storage.from(LIBRARY_BUCKET).upload(path, blob, { contentType: m.fileType || blob.type }).then(function (result) {
        if (result.error) throw result.error;
        var entry = { id: uid(), name: fileName, path: path, type: m.fileType || blob.type || "", size: blob.size || 0, uploadedAt: Date.now() };
        return addFileToLibraryFolder(sheet, folder.id, entry);
      });
    }).then(function () {
      showToast(tr("chatFileSavedToFolderMsg").replace("{folder}", folderDisplayName(folder)));
    }, function () {
      alert(tr("chatFileSaveError"));
    });
  }

  function refreshActiveChat() {
    if (!activeChatSheetId || !supabaseClient) return;
    supabaseClient.from(SHARED_TABLE).select("messages").eq("id", activeChatSheetId).maybeSingle()
      .then(function (result) {
        var messages = (result && result.data && result.data.messages) || [];
        var sheet = sharedSheets.find(function (s) { return s.id === activeChatSheetId; });
        if (sheet) sheet.messages = messages;
        renderChatMessages();
        markChatRead(sheet);
        markMessagesReadOnServer(activeChatSheetId);
      }, function () {});
  }

  // Generic safe read-modify-write for a shared project's `messages` column,
  // version-gated the same way updateSharedSheetDataSafely guards `data` -
  // a write only lands if messages_version still matches what was just
  // read, otherwise mutateFn is retried against a fresh read instead of
  // blindly overwriting whatever another member's send/edit/delete just
  // landed in between. mutateFn may return null to mean "nothing to write"
  // (e.g. a read-receipt update that finds there's nothing new to mark).
  function updateSharedMessagesSafely(sheetId, mutateFn, triesLeft) {
    if (triesLeft == null) triesLeft = 4;
    return supabaseClient.from(SHARED_TABLE).select("messages, messages_version").eq("id", sheetId).maybeSingle().then(function (result) {
      if (result && result.error) throw result.error;
      var row = result && result.data;
      var currentMessages = (row && row.messages) || [];
      var currentVersion = (row && row.messages_version) || 1;
      var updated = mutateFn(currentMessages);
      if (updated === null) return null;
      return supabaseClient.from(SHARED_TABLE)
        .update({ messages: updated, messages_version: currentVersion + 1 })
        .eq("id", sheetId).eq("messages_version", currentVersion)
        .select("id")
        .then(function (updateResult) {
          if (updateResult && updateResult.error) throw updateResult.error;
          var affected = (updateResult && updateResult.data) || [];
          if (!affected.length) {
            if (triesLeft > 0) return updateSharedMessagesSafely(sheetId, mutateFn, triesLeft - 1);
            throw new Error("shared messages update conflict: too many retries");
          }
          return updated;
        });
    });
  }

  // Marks every incoming message not yet attributed to me in its readBy
  // list as read (drives the sent/read checkmarks on the SENDER's side).
  // Only issues a write when something actually needs updating.
  function markMessagesReadOnServer(sheetId) {
    if (!supabaseClient || !myPhoneNumber) return;
    var sheet = sharedSheets.find(function (s) { return s.id === sheetId; });
    if (!sheet) return;
    var needsUpdate = (sheet.messages || []).some(function (m) {
      return m.type !== "system" && m.phone !== myPhoneNumber && (m.readBy || [m.phone]).indexOf(myPhoneNumber) === -1;
    });
    if (!needsUpdate) return;
    updateSharedMessagesSafely(sheetId, function (current) {
      var changed = false;
      var updated = current.map(function (m) {
        if (m.type === "system" || m.phone === myPhoneNumber) return m;
        var readBy = m.readBy || [m.phone];
        if (readBy.indexOf(myPhoneNumber) !== -1) return m;
        changed = true;
        return Object.assign({}, m, { readBy: readBy.concat([myPhoneNumber]) });
      });
      return changed ? updated : null;
    }).then(function (updated) {
      if (!updated) return;
      var liveSheet = sharedSheets.find(function (s) { return s.id === sheetId; });
      if (liveSheet) liveSheet.messages = updated;
      if (activeChatSheetId === sheetId) renderChatMessages();
    }, function () {});
  }

  function openChatView() {
    var sheet = activeSheet();
    if (!sheet || !sheet.shared) return;
    // No-op if already open for this exact sheet (the footer's chat icon
    // stays reachable now that chat is inline, unlike the old full-screen
    // overlay that covered the footer) - avoids stacking a second poll
    // interval on a redundant tap.
    if (state.viewMode === "chat" && activeChatSheetId === sheet.id) return;
    activeChatSheetId = sheet.id;
    chatForceScrollNext = true;
    state.viewMode = "chat";
    state.menuOpen = false;
    // Show the view BEFORE rendering into it: #chatMessages has no layout
    // at all while chatView is still hidden (display:none), so forcing
    // scrollTop to the bottom during that render would be a silent no-op -
    // render() unhides chatView before its chatMode branch calls
    // renderChatMessages(), so this ordering still holds.
    render();
    markChatRead(sheet);
    markMessagesReadOnServer(sheet.id);
    refreshActiveChat();
    loadDeviceContactsIfNeeded();
    chatPollTimer = setInterval(refreshActiveChat, 5000);
    chatInput.focus();
  }
  // Tears down chat's own transient state (recording/editing/replying/
  // mention popup/poll timer) - called from render() itself (see its top,
  // below) the moment state.viewMode moves away from "chat", whichever of
  // the footer icons, a sheet-tab switch, or anything else caused that, so
  // there's one single place this cleanup can't be forgotten rather than
  // every navigation entry point needing to remember to call it.
  function teardownChatView() {
    if (activeRecorder) stopVoiceRecording(false);
    if (editingChatMessageId) cancelEditingChatMessage();
    if (pendingChatReplyTo) cancelChatReply();
    hideMentionPopup();
    activeChatSheetId = null;
    clearInterval(chatPollTimer);
  }
  chatBtn.addEventListener("click", openChatView);

  // Task long-press -> chat-with-arrow button: opens this shared project's
  // chat with the task already quoted above the input (like a swiped
  // message), so the user just types their message about it. The quote
  // carries the task's id/date - tapping it in the chat jumps to the task.
  taskChatQuoteBtn.addEventListener("click", function () {
    var sheet = activeSheet();
    var task = sheet && sheet.tasks.find(function (t) { return t.id === pendingMoveTaskId; });
    closeMoveTask();
    if (!task || !sheet.shared) return;
    // a failure in chat's side work (marking read, contacts...) mustn't
    // stop the quote from being set up
    try { openChatView(); } catch (err) { console.error(err); }
    if (state.viewMode !== "chat" || activeChatSheetId !== sheet.id) return;
    if (editingChatMessageId) cancelEditingChatMessage();
    var label = tr(task.type === "note" ? "chatQuoteNoteLabel" : "chatQuoteTaskLabel");
    if (task.date) label += " · " + task.date.split("-").reverse().slice(0, 2).join("/");
    var quote = { id: "task:" + task.id, taskId: task.id, taskDate: task.date || null,
      senderName: label, text: (task.text || "").slice(0, 300) };
    pendingChatReplyTo = quote;
    chatReplySender.textContent = quote.senderName;
    chatReplyText.textContent = quote.text;
    chatReplyBar.hidden = false;
    chatInput.focus();
  });

  // Fires an actual push notification to every other member's device (works
  // even if their app/browser isn't open), reusing the same push
  // infrastructure already deployed for task reminders. Fire-and-forget:
  // never let a notification failure disrupt the send flow itself.
  function triggerChatPushNotification(sheetId, text) {
    if (!supabaseClient || !supabaseClient.functions) return;
    var sheet = sharedSheets.find(function (s) { return s.id === sheetId; });
    var senderName = resolveMemberName(sheet, myPhoneNumber);
    try {
      supabaseClient.functions.invoke("send-chat-notification", {
        body: { sheetId: sheetId, senderPhone: myPhoneNumber, senderName: senderName, text: text }
      }).then(function () {}, function (err) {
        console.error("send-chat-notification failed:", err);
      });
    } catch (e) {}
  }

  function myDisplayNameIn(sheet) {
    return resolveMemberName(sheet, myPhoneNumber);
  }

  var SYSTEM_ACTION_KEYS = {
    added: "chatSysTaskAdded",
    deleted: "chatSysTaskDeleted",
    done: "chatSysTaskDone",
    undone: "chatSysTaskUndone"
  };
  // forSelf shows "You" for the acting member's own device (the in-app chat
  // view); push notification text always uses the real resolved name
  // instead, since it's composed on the ACTOR's device but read by every
  // OTHER recipient, who should never see "You did X" for someone else's
  // action.
  function systemMessageText(m, sheet, forSelf) {
    var key = SYSTEM_ACTION_KEYS[m.sysAction];
    if (!key) return "";
    var actorName = (forSelf && m.actorPhone === myPhoneNumber) ? tr("chatYou") : resolveMemberName(sheet, m.actorPhone || m.actorName);
    return tr(key).replace("{name}", m.taskName || "").replace("{actor}", actorName || "");
  }

  // sysAction/taskName/actorPhone are stored as structured data rather than
  // pre-rendered text, so each viewer's own language *and contacts* are
  // applied locally at render time (see systemMessageText) instead of
  // baking in whatever the acting member's app happened to show for
  // themselves when the action happened.
  function sendChatSystemMessage(sheetId, sysAction, taskName, actorPhone) {
    if (!supabaseClient || !sheetId) return;
    var msg = { id: uid(), type: "system", sysAction: sysAction, taskName: taskName, actorPhone: actorPhone, ts: Date.now() };
    updateSharedMessagesSafely(sheetId, function (current) {
      return current.concat([msg]).slice(-200);
    }).then(function (updated) {
      var sheet = sharedSheets.find(function (s) { return s.id === sheetId; });
      if (sheet) sheet.messages = updated;
      if (activeChatSheetId === sheetId) renderChatMessages();
      triggerChatPushNotification(sheetId, systemMessageText(msg, sheet));
    }, function (err) {
      console.error("sendChatSystemMessage failed:", err);
    });
  }

  function sendChatMessage(sheetId, text, replyTo) {
    var trimmed = (text || "").trim();
    if (!trimmed || !supabaseClient) return Promise.resolve();
    var msg = { id: uid(), phone: myPhoneNumber, text: trimmed.slice(0, 500), ts: Date.now(), readBy: [myPhoneNumber] };
    if (replyTo) msg.replyTo = replyTo;
    return updateSharedMessagesSafely(sheetId, function (current) {
      return current.concat([msg]).slice(-200);
    }).then(function (updated) {
      var sheet = sharedSheets.find(function (s) { return s.id === sheetId; });
      if (sheet) sheet.messages = updated;
      triggerChatPushNotification(sheetId, trimmed.slice(0, 500));
    });
  }

  chatForm.addEventListener("submit", function (e) {
    e.preventDefault();
    var text = chatInput.value;
    if (!text.trim() || !activeChatSheetId) return;
    chatInput.value = "";
    hideMentionPopup();
    if (editingChatMessageId) {
      var msgId = editingChatMessageId;
      cancelEditingChatMessage();
      updateChatMessageText(activeChatSheetId, msgId, text).then(renderChatMessages);
    } else {
      var replyTo = pendingChatReplyTo;
      cancelChatReply();
      sendChatMessage(activeChatSheetId, text, replyTo).then(renderChatMessages);
    }
  });

  function sendChatVoiceMessage(sheetId, audioUrl, durationSec) {
    if (!audioUrl || !supabaseClient) return Promise.resolve();
    var msg = { id: uid(), phone: myPhoneNumber, type: "voice", audioUrl: audioUrl, duration: durationSec || 0, ts: Date.now(), readBy: [myPhoneNumber] };
    return updateSharedMessagesSafely(sheetId, function (current) {
      return current.concat([msg]).slice(-200);
    }).then(function (updated) {
      var sheet = sharedSheets.find(function (s) { return s.id === sheetId; });
      if (sheet) sheet.messages = updated;
      triggerChatPushNotification(sheetId, tr("voiceMessageLabel"));
    });
  }

  var chatMicBtn = document.getElementById("chatMicBtn");
  var chatRecordingBar = document.getElementById("chatRecordingBar");
  var chatRecordingTime = document.getElementById("chatRecordingTime");
  var chatRecordingCancelBtn = document.getElementById("chatRecordingCancelBtn");
  var chatRecordingSendBtn = document.getElementById("chatRecordingSendBtn");
  var activeRecorder = null;
  var recordedChunks = [];
  var recordingStartedAt = 0;
  var recordingTimerInterval = null;

  function formatRecordingTime(ms) {
    var totalSec = Math.max(0, Math.floor(ms / 1000));
    var m = Math.floor(totalSec / 60);
    var s = totalSec % 60;
    return m + ":" + (s < 10 ? "0" : "") + s;
  }

  function startVoiceRecording() {
    if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia || !window.MediaRecorder) {
      alert(tr("voiceNotSupported"));
      return;
    }
    navigator.mediaDevices.getUserMedia({ audio: true }).then(function (stream) {
      recordedChunks = [];
      var recorder;
      try { recorder = new MediaRecorder(stream); } catch (e) {
        stream.getTracks().forEach(function (t) { t.stop(); });
        alert(tr("voiceNotSupported"));
        return;
      }
      activeRecorder = recorder;
      recorder.addEventListener("dataavailable", function (e) {
        if (e.data && e.data.size > 0) recordedChunks.push(e.data);
      });
      recorder.addEventListener("stop", function () {
        stream.getTracks().forEach(function (t) { t.stop(); });
      });
      recorder.start();
      recordingStartedAt = Date.now();
      chatForm.hidden = true;
      chatRecordingBar.hidden = false;
      chatRecordingTime.textContent = "0:00";
      recordingTimerInterval = setInterval(function () {
        chatRecordingTime.textContent = formatRecordingTime(Date.now() - recordingStartedAt);
      }, 500);
    }, function () {
      alert(tr("voiceMicPermissionDenied"));
    });
  }

  function uploadAndSendVoiceMessage(blob, durationSec) {
    if (!activeChatSheetId || !supabaseClient) return;
    if (!blob.size) { alert(tr("voiceUploadError") + " (empty recording)"); return; }
    var ext = (blob.type && blob.type.indexOf("mp4") !== -1) ? "m4a" : "webm";
    var path = activeChatSheetId + "/voice/" + uid() + "." + ext;
    supabaseClient.storage.from(LIBRARY_BUCKET).upload(path, blob, { contentType: blob.type || "audio/webm" })
      .then(function (result) {
        if (result.error) throw result.error;
        return resolveFileUrl(path);
      })
      .then(function (url) {
        return sendChatVoiceMessage(activeChatSheetId, url, durationSec);
      })
      .then(function () { renderChatMessages(); }, function (err) {
        console.error("voice message send failed:", err);
        alert(tr("voiceUploadError") + "\n" + ((err && (err.message || err.error || err.statusCode)) || JSON.stringify(err) || ""));
      });
  }

  function stopVoiceRecording(shouldSend) {
    clearInterval(recordingTimerInterval);
    chatRecordingBar.hidden = true;
    chatForm.hidden = false;
    var recorder = activeRecorder;
    activeRecorder = null;
    if (!recorder) return;
    var durationSec = Math.round((Date.now() - recordingStartedAt) / 1000);
    if (!shouldSend) {
      recorder.stop();
      return;
    }
    recorder.addEventListener("stop", function onStop() {
      recorder.removeEventListener("stop", onStop);
      var blob = new Blob(recordedChunks, { type: recorder.mimeType || "audio/webm" });
      uploadAndSendVoiceMessage(blob, durationSec);
    });
    recorder.stop();
  }

  chatMicBtn.addEventListener("click", startVoiceRecording);
  chatRecordingCancelBtn.addEventListener("click", function () { stopVoiceRecording(false); });
  chatRecordingSendBtn.addEventListener("click", function () { stopVoiceRecording(true); });

  var chatAttachBtn = document.getElementById("chatAttachBtn");
  var chatFileInput = document.getElementById("chatFileInput");
  chatAttachBtn.addEventListener("click", function () { chatFileInput.click(); });
  chatFileInput.addEventListener("change", function () {
    var file = chatFileInput.files && chatFileInput.files[0];
    chatFileInput.value = "";
    if (file) uploadAndSendChatFile(file);
  });

  function uploadAndSendChatFile(file) {
    if (!activeChatSheetId || !supabaseClient) return;
    var path = activeChatSheetId + "/files/" + uid() + "-" + safeStorageFileName(file.name);
    supabaseClient.storage.from(LIBRARY_BUCKET).upload(path, file)
      .then(function (result) {
        if (result.error) throw result.error;
        return resolveFileUrl(path);
      })
      .then(function (url) {
        return sendChatFileMessage(activeChatSheetId, url, file.name, file.type || "", file.size || 0);
      })
      .then(function () { renderChatMessages(); }, function () { alert(tr("chatFileUploadError")); });
  }

  function sendChatFileMessage(sheetId, fileUrl, fileName, fileType, fileSize) {
    if (!fileUrl || !supabaseClient) return Promise.resolve();
    return supabaseClient.from(SHARED_TABLE).select("messages").eq("id", sheetId).maybeSingle()
      .then(function (result) {
        var current = (result && result.data && result.data.messages) || [];
        var msg = { id: uid(), phone: myPhoneNumber, type: "file", fileUrl: fileUrl, fileName: fileName, fileType: fileType, fileSize: fileSize, ts: Date.now(), readBy: [myPhoneNumber] };
        var updated = current.concat([msg]).slice(-200);
        return supabaseClient.from(SHARED_TABLE).update({ messages: updated }).eq("id", sheetId)
          .then(function () {
            var sheet = sharedSheets.find(function (s) { return s.id === sheetId; });
            if (sheet) sheet.messages = updated;
            triggerChatPushNotification(sheetId, "📎 " + fileName);
          });
      });
  }

  var chatMsgActionOverlay = document.getElementById("chatMsgActionOverlay");
  var chatMsgEditBtn = document.getElementById("chatMsgEditBtn");
  var chatMsgDeleteBtn = document.getElementById("chatMsgDeleteBtn");
  var chatMsgActionCancelBtn = document.getElementById("chatMsgActionCancelBtn");
  var chatEditingBar = document.getElementById("chatEditingBar");
  var chatEditingCancelBtn = document.getElementById("chatEditingCancelBtn");
  var chatReplyBar = document.getElementById("chatReplyBar");
  var chatReplySender = document.getElementById("chatReplySender");
  var chatReplyText = document.getElementById("chatReplyText");
  var chatReplyCancelBtn = document.getElementById("chatReplyCancelBtn");
  var chatScrollBottomBtn = document.getElementById("chatScrollBottomBtn");
  var chatMentionPopup = document.getElementById("chatMentionPopup");
  var pendingChatActionMessage = null;
  var pendingChatReplyTo = null;
  var editingChatMessageId = null;
  var chatLongPressTimer = null;

  function startChatReply(message) {
    var sheet = sharedSheets.find(function (s) { return s.id === activeChatSheetId; });
    pendingChatReplyTo = { id: message.id, senderName: chatMessageSenderLabel(message, sheet), text: chatMessagePreviewText(message) };
    chatReplySender.textContent = pendingChatReplyTo.senderName;
    chatReplyText.textContent = pendingChatReplyTo.text;
    chatReplyBar.hidden = false;
    chatInput.focus();
  }
  function cancelChatReply() {
    pendingChatReplyTo = null;
    chatReplyBar.hidden = true;
  }
  chatReplyCancelBtn.addEventListener("click", cancelChatReply);

  chatMessages.addEventListener("scroll", updateChatScrollButton);
  chatScrollBottomBtn.addEventListener("click", function () {
    chatMessages.scrollTo({ top: chatMessages.scrollHeight, behavior: "smooth" });
  });

  // "@" mention autocomplete: shows the OTHER members of this shared
  // project (by their known display name) whenever the text typed since
  // the last "@" (with no space in between) matches the start of one.
  function activeMentionQuery() {
    var pos = chatInput.selectionStart || chatInput.value.length;
    var uptoCursor = chatInput.value.slice(0, pos);
    var at = uptoCursor.lastIndexOf("@");
    if (at === -1) return null;
    var query = uptoCursor.slice(at + 1);
    if (/\s/.test(query)) return null;
    return { at: at, query: query };
  }
  function hideMentionPopup() {
    chatMentionPopup.hidden = true;
    chatMentionPopup.innerHTML = "";
  }
  function insertMention(at, query, name) {
    var before = chatInput.value.slice(0, at);
    var after = chatInput.value.slice(at + 1 + query.length);
    chatInput.value = before + "@" + name + " " + after;
    var cursorPos = (before + "@" + name + " ").length;
    chatInput.focus();
    chatInput.setSelectionRange(cursorPos, cursorPos);
    hideMentionPopup();
  }
  function updateMentionPopup() {
    var sheet = sharedSheets.find(function (s) { return s.id === activeChatSheetId; });
    var m = activeMentionQuery();
    if (!m || !sheet) { hideMentionPopup(); return; }
    var q = m.query.toLowerCase();
    var candidates = (sheet.members || [])
      .filter(function (p) { return p !== myPhoneNumber; })
      .map(function (p) { return resolveMemberName(sheet, p); })
      .filter(function (name, idx, arr) { return arr.indexOf(name) === idx && name.toLowerCase().indexOf(q) !== -1; });
    if (!candidates.length) { hideMentionPopup(); return; }
    chatMentionPopup.innerHTML = "";
    candidates.forEach(function (name) {
      var item = document.createElement("button");
      item.type = "button";
      item.className = "chat-mention-item";
      item.textContent = name;
      item.addEventListener("click", function () { insertMention(m.at, m.query, name); });
      chatMentionPopup.appendChild(item);
    });
    chatMentionPopup.hidden = false;
  }
  chatInput.addEventListener("input", updateMentionPopup);
  chatInput.addEventListener("click", updateMentionPopup);
  chatInput.addEventListener("blur", function () {
    setTimeout(hideMentionPopup, 150);
  });

  function attachChatBubbleLongPress(bubbleEl, message) {
    var startX = 0, startY = 0, fired = false;
    var start = function (e) {
      var pt = e.touches ? e.touches[0] : e;
      startX = pt.clientX; startY = pt.clientY; fired = false;
      clearTimeout(chatLongPressTimer);
      chatLongPressTimer = setTimeout(function () {
        fired = true;
        openChatMessageActionModal(message);
      }, 550);
    };
    var cancel = function () { clearTimeout(chatLongPressTimer); };
    var move = function (e) {
      var pt = e.touches ? e.touches[0] : e;
      if (Math.abs(pt.clientX - startX) > 10 || Math.abs(pt.clientY - startY) > 10) cancel();
    };
    bubbleEl.addEventListener("mousedown", start);
    bubbleEl.addEventListener("mouseup", cancel);
    bubbleEl.addEventListener("mouseleave", cancel);
    bubbleEl.addEventListener("mousemove", move);
    bubbleEl.addEventListener("touchstart", start, { passive: true });
    bubbleEl.addEventListener("touchend", cancel);
    bubbleEl.addEventListener("touchmove", move, { passive: true });
  }

  // Swipe-to-quote: dragging a bubble sideways past a threshold starts a
  // reply/quote of it (replacing the earlier long-press "quote" action, per
  // feedback that it should be a drag gesture instead). touch-action: pan-y
  // on .chat-bubble (see CSS) lets the browser keep handling vertical list
  // scrolling natively while this handles the horizontal axis itself.
  var CHAT_SWIPE_THRESHOLD = 50;
  var CHAT_SWIPE_MAX = 70;
  function attachChatBubbleSwipeReply(bubbleEl, message, replyIcon) {
    var startX = 0, startY = 0, dragging = false;
    var start = function (e) {
      var pt = e.touches ? e.touches[0] : e;
      startX = pt.clientX; startY = pt.clientY;
      dragging = false;
    };
    var move = function (e) {
      var pt = e.touches ? e.touches[0] : e;
      var dx = pt.clientX - startX;
      var dy = pt.clientY - startY;
      if (!dragging) {
        if (Math.abs(dx) > 10 && Math.abs(dx) > Math.abs(dy) * 1.5) dragging = true;
        else return;
      }
      var capped = Math.max(-CHAT_SWIPE_MAX, Math.min(CHAT_SWIPE_MAX, dx));
      bubbleEl.style.transition = "none";
      bubbleEl.style.transform = "translateX(" + capped + "px)";
      replyIcon.style.opacity = String(Math.min(1, Math.abs(dx) / CHAT_SWIPE_THRESHOLD));
      replyIcon.style.left = capped > 0 ? "-26px" : "";
      replyIcon.style.right = capped < 0 ? "-26px" : "";
    };
    var end = function (e) {
      if (dragging) {
        var pt = (e.changedTouches && e.changedTouches[0]) || e;
        var dx = Math.max(-CHAT_SWIPE_MAX, Math.min(CHAT_SWIPE_MAX, pt.clientX - startX));
        bubbleEl.style.transition = "transform 0.2s ease";
        bubbleEl.style.transform = "translateX(0)";
        replyIcon.style.opacity = "0";
        if (Math.abs(dx) >= CHAT_SWIPE_THRESHOLD) startChatReply(message);
      }
      dragging = false;
    };
    bubbleEl.addEventListener("mousedown", start);
    bubbleEl.addEventListener("mousemove", move);
    bubbleEl.addEventListener("mouseup", end);
    bubbleEl.addEventListener("mouseleave", function (e) { if (dragging) end(e); });
    bubbleEl.addEventListener("touchstart", start, { passive: true });
    bubbleEl.addEventListener("touchmove", move, { passive: true });
    bubbleEl.addEventListener("touchend", end);
  }

  function openChatMessageActionModal(message) {
    pendingChatActionMessage = message;
    var isMine = message.phone === myPhoneNumber;
    chatMsgEditBtn.hidden = !isMine || message.type === "voice" || message.type === "file";
    chatMsgDeleteBtn.hidden = !isMine;
    chatMsgActionOverlay.hidden = false;
  }
  function closeChatMessageActionModal() {
    chatMsgActionOverlay.hidden = true;
    pendingChatActionMessage = null;
  }
  chatMsgActionCancelBtn.addEventListener("click", closeChatMessageActionModal);
  chatMsgActionOverlay.addEventListener("click", function (e) {
    if (e.target === chatMsgActionOverlay) closeChatMessageActionModal();
  });

  function deleteChatMessage(sheetId, msgId) {
    if (!supabaseClient) return;
    updateSharedMessagesSafely(sheetId, function (current) {
      return current.filter(function (m) { return m.id !== msgId; });
    }).then(function (updated) {
      var sheet = sharedSheets.find(function (s) { return s.id === sheetId; });
      if (sheet) sheet.messages = updated;
      renderChatMessages();
    });
  }

  function updateChatMessageText(sheetId, msgId, newText) {
    if (!supabaseClient) return Promise.resolve();
    return updateSharedMessagesSafely(sheetId, function (current) {
      return current.map(function (m) {
        if (m.id === msgId) return Object.assign({}, m, { text: newText.trim().slice(0, 500), edited: true });
        return m;
      });
    }).then(function (updated) {
      var sheet = sharedSheets.find(function (s) { return s.id === sheetId; });
      if (sheet) sheet.messages = updated;
    });
  }

  function startEditingChatMessage(message) {
    editingChatMessageId = message.id;
    chatInput.value = message.text || "";
    chatEditingBar.hidden = false;
    chatInput.focus();
  }
  function cancelEditingChatMessage() {
    editingChatMessageId = null;
    chatInput.value = "";
    chatEditingBar.hidden = true;
  }
  chatEditingCancelBtn.addEventListener("click", cancelEditingChatMessage);

  chatMsgDeleteBtn.addEventListener("click", function () {
    var message = pendingChatActionMessage;
    closeChatMessageActionModal();
    if (!message) return;
    askConfirm(tr("chatMsgConfirmDelete"), function () {
      if (editingChatMessageId === message.id) cancelEditingChatMessage();
      deleteChatMessage(activeChatSheetId, message.id);
    });
  });
  chatMsgEditBtn.addEventListener("click", function () {
    var message = pendingChatActionMessage;
    closeChatMessageActionModal();
    if (message) startEditingChatMessage(message);
  });
  function copyChatMessageText(message) {
    var text = chatMessagePreviewText(message);
    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(text).then(function () {
        showToast(tr("chatMsgCopiedMsg"));
      }, function () {
        showToast(tr("chatMsgCopyFailedMsg"));
      });
    } else {
      showToast(tr("chatMsgCopyFailedMsg"));
    }
  }
  chatMsgCopyBtn.addEventListener("click", function () {
    var message = pendingChatActionMessage;
    closeChatMessageActionModal();
    if (message) copyChatMessageText(message);
  });
  function convertChatMessageToTask(message) {
    var sheet = sharedSheets.find(function (s) { return s.id === activeChatSheetId; });
    if (!sheet) return;
    sheet.tasks.push({
      id: uid(),
      text: chatMessagePreviewText(message),
      status: 0,
      urgent: false,
      type: "task",
      date: todayISO(),
      createdAt: Date.now()
    });
    saveData();
    showToast(tr("chatMsgAddedAsTaskMsg"));
  }
  chatMsgToTaskBtn.addEventListener("click", function () {
    var message = pendingChatActionMessage;
    closeChatMessageActionModal();
    if (message) convertChatMessageToTask(message);
  });

