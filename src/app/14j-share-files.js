  // ---------------------------------------------------------------------
  // Files shared into ITASK from another app (photos from WhatsApp or the
  // gallery, a PDF, a document - app version 31+): ItaskAlarmPlugin copies
  // them into the app's cache and hands them over with launch view
  // "share"; here they're saved into a folder of a project's library.
  // Photos go to "תמונות" by default, other files to the folder last
  // chosen for that project.
  // ---------------------------------------------------------------------
  var shareFilesOverlay = document.getElementById("shareFilesOverlay");
  var shareFilesList = document.getElementById("shareFilesList");
  var shareFilesProject = document.getElementById("shareFilesProject");
  var shareFilesFolder = document.getElementById("shareFilesFolder");
  var shareFilesSaveBtn = document.getElementById("shareFilesSaveBtn");
  var shareFilesPending = [];
  var SHARE_FILES_LAST_KEY = "itask-share-files-folder";

  function shareFilesAllMedia() {
    return shareFilesPending.length > 0 && shareFilesPending.every(function (f) {
      return /^(image|video)\//.test(f.type || "");
    });
  }
  function shareFilesLastFolders() {
    try { return JSON.parse(localStorage.getItem(SHARE_FILES_LAST_KEY) || "{}") || {}; } catch (e) { return {}; }
  }

  function fillShareFilesFolders() {
    var sheet = allSheets().find(function (s) { return s.id === shareFilesProject.value; });
    shareFilesFolder.innerHTML = "";
    shareFilesSaveBtn.disabled = true;
    if (!sheet) return;
    var forSheet = sheet.id;
    ensureLibraryFolders(sheet, function (folders) {
      if (shareFilesProject.value !== forSheet) return;
      var live = libraryLive(folders);
      live.slice().sort(function (a, b) {
        return libraryFolderPath(live, a).localeCompare(libraryFolderPath(live, b));
      }).forEach(function (f) {
        var o = document.createElement("option");
        o.value = f.id;
        o.textContent = libraryFolderPath(live, f);
        shareFilesFolder.appendChild(o);
      });
      var last = shareFilesLastFolders()[forSheet];
      var photos = live.find(function (f) { return f.key === "photos" && !f.parentId; });
      var downloads = live.find(function (f) { return f.key === "downloads" && !f.parentId; });
      var pick = shareFilesAllMedia() && photos ? photos.id
        : (last && live.some(function (f) { return f.id === last; })) ? last
        : downloads ? downloads.id : (live[0] && live[0].id);
      if (pick) shareFilesFolder.value = pick;
      shareFilesSaveBtn.disabled = !shareFilesFolder.value;
    });
  }

  function openShareFilesModal(files) {
    closeMoveTask();
    shareFilesPending = (files || []).filter(function (f) { return f && f.path; });
    if (!shareFilesPending.length) return;
    shareFilesList.innerHTML = "";
    shareFilesPending.forEach(function (f) {
      var li = document.createElement("li");
      li.textContent = (/^image\//.test(f.type || "") ? "🖼 " : /^video\//.test(f.type || "") ? "🎬 " : "📄 ") + (f.name || "");
      shareFilesList.appendChild(li);
    });
    shareFilesProject.innerHTML = "";
    allSheets().filter(function (s) {
      return !s.ended && s.id !== HEAD_OFFICE_SHEET_ID;
    }).forEach(function (s) {
      var o = document.createElement("option");
      o.value = s.id;
      o.textContent = (s.shared ? "👥 " : "") + s.name;
      shareFilesProject.appendChild(o);
    });
    if (allSheets().some(function (s) { return s.id === data.activeSheetId && !s.ended; })) {
      shareFilesProject.value = data.activeSheetId;
    }
    shareFilesSaveBtn.textContent = tr("shareFilesSave");
    shareFilesOverlay.hidden = false;
    fillShareFilesFolders();
  }
  shareFilesProject.addEventListener("change", fillShareFilesFolders);
  shareFilesFolder.addEventListener("change", function () { shareFilesSaveBtn.disabled = !shareFilesFolder.value; });
  document.getElementById("shareFilesCancelBtn").addEventListener("click", function () {
    shareFilesOverlay.hidden = true;
    shareFilesPending = [];
  });

  // a shared file's bytes: straight from the app's cache through the web
  // view, or (if that's not served) through the plugin as base64
  function readSharedFile(f) {
    var asFile = function (blob) {
      return new File([blob], f.name, { type: f.type || blob.type || "" });
    };
    var viaPlugin = function () {
      return nativeTaskAlarmPlugin.readSharedFile({ path: f.path }).then(function (res) {
        var bin = atob((res && res.data) || "");
        var bytes = new Uint8Array(bin.length);
        for (var i = 0; i < bin.length; i++) bytes[i] = bin.charCodeAt(i);
        return asFile(new Blob([bytes], { type: f.type || "" }));
      });
    };
    var cap = window.Capacitor;
    if (!cap || typeof cap.convertFileSrc !== "function") return viaPlugin();
    return fetch(cap.convertFileSrc("file://" + f.path)).then(function (r) {
      if (!r.ok) throw new Error("not served");
      return r.blob();
    }).then(function (blob) {
      if (f.size > 0 && blob.size !== f.size) throw new Error("partial");
      return asFile(blob);
    }).catch(viaPlugin);
  }

  document.getElementById("shareFilesForm").addEventListener("submit", function (e) {
    e.preventDefault();
    var sheetId = shareFilesProject.value;
    var folderId = shareFilesFolder.value;
    if (!sheetId || !folderId || !shareFilesPending.length) return;
    var folderName = shareFilesFolder.options[shareFilesFolder.selectedIndex].textContent;
    var files = shareFilesPending;
    try {
      var last = shareFilesLastFolders();
      if (!shareFilesAllMedia()) { last[sheetId] = folderId; localStorage.setItem(SHARE_FILES_LAST_KEY, JSON.stringify(last)); }
    } catch (err) {}
    shareFilesSaveBtn.disabled = true;
    shareFilesSaveBtn.textContent = tr("shareFilesSaving");
    Promise.all(files.map(readSharedFile)).then(function (list) {
      return uploadLibraryFiles(list, folderId, sheetId);
    }).then(function () {
      shareFilesOverlay.hidden = true;
      shareFilesPending = [];
      showToast(tr("shareFilesSaved").replace("{folder}", folderName));
    }, function (err) {
      console.error("shared files upload failed:", err);
      shareFilesSaveBtn.disabled = false;
      shareFilesSaveBtn.textContent = tr("shareFilesSave");
      alert(tr("shareFilesFailed"));
    });
  });
