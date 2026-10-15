  var LIBRARY_BUCKET = "project-files";

  // Supabase Storage rejects object keys containing non-ASCII characters
  // (e.g. Hebrew/Arabic file names) with "Invalid key" - the original name
  // is still kept as display metadata separately, only the storage path
  // itself needs to be safe.
  function safeStorageFileName(name) {
    var dot = name.lastIndexOf(".");
    var base = dot > 0 ? name.slice(0, dot) : name;
    var ext = dot > 0 ? name.slice(dot) : "";
    base = base.replace(/[^a-zA-Z0-9_-]+/g, "_").replace(/^_+|_+$/g, "");
    ext = ext.replace(/[^a-zA-Z0-9.]+/g, "");
    return (base || "file") + ext;
  }

  var libraryBtn = document.getElementById("libraryBtn");
  var archiveBtn = document.getElementById("archiveBtn");
  archiveBtn.addEventListener("click", function () { enterArchiveView(); });
  var libraryFoldersView = document.getElementById("libraryFoldersView");
  var libraryFoldersGrid = document.getElementById("libraryFoldersGrid");
  var libraryAddFolderBtn = document.getElementById("libraryAddFolderBtn");
  var libraryFolderNameOverlay = document.getElementById("libraryFolderNameOverlay");
  var libraryFolderNameInput = document.getElementById("libraryFolderNameInput");
  var libraryFolderNameOkBtn = document.getElementById("libraryFolderNameOkBtn");
  var libraryFolderNameCancelBtn = document.getElementById("libraryFolderNameCancelBtn");
  var libraryView = document.getElementById("libraryView");
  var libraryBackBtn = document.getElementById("libraryBackBtn");
  var libraryHeadTitle = document.getElementById("libraryHeadTitle");
  var libraryGrid = document.getElementById("libraryGrid");
  var libraryAddBtn = document.getElementById("libraryAddBtn");
  var libraryFileInput = document.getElementById("libraryFileInput");
  var activeLibrarySheetId = null;
  var activeLibraryFolderId = null;

  var DEFAULT_LIBRARY_FOLDER_KEYS = ["plans", "photos", "diaries", "reports", "procurementOrders", "attendanceReports", "toolsReports"];
  var LIBRARY_FOLDER_KEY_LABELS = {
    plans: "libraryFolderPlans",
    photos: "libraryFolderPhotos",
    diaries: "libraryFolderDiaries",
    reports: "libraryFolderReports",
    general: "libraryFolderGeneral",
    procurementOrders: "libraryFolderProcurementOrders",
    attendanceReports: "libraryFolderAttendanceReports",
    toolsReports: "libraryFolderToolsReports"
  };

  function buildDefaultLibraryFolders(legacyFiles) {
    var folders = DEFAULT_LIBRARY_FOLDER_KEYS.map(function (key) {
      return { id: uid(), key: key, name: null, files: [] };
    });
    if (legacyFiles && legacyFiles.length) {
      folders.push({ id: uid(), key: "general", name: null, files: legacyFiles });
    }
    return folders;
  }

  function folderDisplayName(folder) {
    if (folder.key && LIBRARY_FOLDER_KEY_LABELS[folder.key]) return tr(LIBRARY_FOLDER_KEY_LABELS[folder.key]);
    return folder.name || "";
  }

  // The bucket is private (see supabase/sql/enable_storage_rls.sql), so a
  // plain getPublicUrl() no longer serves real content - every file needs a
  // signed URL instead. Minting one requires the same storage.objects RLS
  // check as any other access (only the owning user or a shared project's
  // members can succeed), so an expiry this long is safe: it's not a
  // standing grant to anyone who merely has the link, it's simply how long
  // a link that already required a legitimate access check keeps working
  // afterward (matching how this app never re-checks membership on
  // already-loaded chat history either).
  var SIGNED_URL_EXPIRY_SECONDS = 60 * 60 * 24 * 365 * 10;
  function resolveFileUrl(path) {
    return supabaseClient.storage.from(LIBRARY_BUCKET).createSignedUrl(path, SIGNED_URL_EXPIRY_SECONDS).then(function (result) {
      if (result.error) throw result.error;
      return result.data.signedUrl;
    });
  }

  // One-time migration (safe to re-run every load - it's a no-op scan once
  // nothing matches): the bucket used to be public, so every stored
  // fileUrl/audioUrl/attachment.url was a "…/object/public/project-files/…"
  // link. Those stop resolving once the bucket goes private (see
  // enable_storage_rls.sql), so any still found get reissued as signed URLs
  // and written back - otherwise old chat attachments and site-log photos
  // would simply stop loading the moment that SQL is applied.
  function needsUrlMigration(url) {
    return typeof url === "string" && url.indexOf("/object/public/" + LIBRARY_BUCKET + "/") !== -1;
  }
  function pathFromPublicUrl(url) {
    var marker = "/object/public/" + LIBRARY_BUCKET + "/";
    var idx = url.indexOf(marker);
    return idx === -1 ? null : url.slice(idx + marker.length);
  }
  function migrateSiteLogAttachmentUrls(siteLogs) {
    var tasks = [];
    (siteLogs || []).forEach(function (log) {
      (log.works || []).forEach(function (w) {
        if (w.attachment && needsUrlMigration(w.attachment.url)) {
          var path = pathFromPublicUrl(w.attachment.url);
          if (path) tasks.push(resolveFileUrl(path).then(function (url) { w.attachment.url = url; }).catch(function () {}));
        }
      });
    });
    return Promise.all(tasks).then(function () { return tasks.length > 0; });
  }
  function migratePrivateSheetsFileUrls() {
    if (!supabaseClient) return;
    var perSheet = data.sheets.map(function (sheet) { return migrateSiteLogAttachmentUrls(sheet.siteLogs); });
    Promise.all(perSheet).then(function (results) {
      if (results.some(Boolean)) saveData();
    });
  }
  function migrateSharedSheetFileUrls(sheet) {
    if (!supabaseClient) return;
    var needsMessages = (sheet.messages || []).some(function (m) {
      return (m.type === "file" && needsUrlMigration(m.fileUrl)) || (m.type === "voice" && needsUrlMigration(m.audioUrl));
    });
    var needsSiteLogs = (sheet.siteLogs || []).some(function (log) {
      return (log.works || []).some(function (w) { return w.attachment && needsUrlMigration(w.attachment.url); });
    });
    if (!needsMessages && !needsSiteLogs) return;

    if (needsMessages) {
      supabaseClient.from(SHARED_TABLE).select("messages").eq("id", sheet.id).maybeSingle().then(function (result) {
        var current = (result && result.data && result.data.messages) || [];
        var tasks = [];
        current.forEach(function (m) {
          if (m.type === "file" && needsUrlMigration(m.fileUrl)) {
            var path = pathFromPublicUrl(m.fileUrl);
            if (path) tasks.push(resolveFileUrl(path).then(function (url) { m.fileUrl = url; }).catch(function () {}));
          } else if (m.type === "voice" && needsUrlMigration(m.audioUrl)) {
            var path2 = pathFromPublicUrl(m.audioUrl);
            if (path2) tasks.push(resolveFileUrl(path2).then(function (url) { m.audioUrl = url; }).catch(function () {}));
          }
        });
        return Promise.all(tasks).then(function () {
          return supabaseClient.from(SHARED_TABLE).update({ messages: current }).eq("id", sheet.id);
        }).then(function () {
          sheet.messages = current;
          if (activeChatSheetId === sheet.id) renderChatMessages();
        });
      });
    }
    if (needsSiteLogs) {
      supabaseClient.from(SHARED_TABLE).select("data").eq("id", sheet.id).maybeSingle().then(function (result) {
        var currentData = (result && result.data && result.data.data) || {};
        var siteLogs = currentData.siteLogs || [];
        migrateSiteLogAttachmentUrls(siteLogs).then(function () {
          var updatedData = Object.assign({}, currentData, { siteLogs: siteLogs });
          return supabaseClient.from(SHARED_TABLE).update({ data: updatedData }).eq("id", sheet.id);
        }).then(function () {
          sheet.siteLogs = siteLogs;
        });
      });
    }
  }
  function migrateAllSharedSheetsFileUrls() {
    sharedSheets.forEach(migrateSharedSheetFileUrls);
  }

  function isImageFile(entry) {
    return /^image\//.test(entry.type || "");
  }

  function formatFileSize(bytes) {
    if (!bytes) return "";
    if (bytes < 1024) return bytes + " B";
    if (bytes < 1024 * 1024) return Math.round(bytes / 1024) + " KB";
    return (bytes / (1024 * 1024)).toFixed(1) + " MB";
  }

  // Generic safe read-modify-write for a shared project's `data` column
  // (tasks/reports/folders/siteLogs/ended/logoId), used by everything below
  // that touches shared-project data instead of any bespoke read-then-write.
  // mutateFn(freshData) must derive the new data purely from the FRESH copy
  // just read - never from a `sheet` object captured earlier - because:
  // (1) the background shared-sheets poll (every 20s, or on tab focus)
  //     replaces the whole sharedSheets array while a write can be in
  //     flight, orphaning any earlier reference, and
  // (2) data_version is checked-and-incremented on write (WHERE
  //     data_version = <version just read>): if another member's write
  //     landed in between, this update matches zero rows and mutateFn is
  //     called again against a fresh read, so a retry always reflects the
  //     latest server truth instead of blindly overwriting it.
  function updateSharedSheetDataSafely(sheetId, mutateFn, triesLeft) {
    if (triesLeft == null) triesLeft = 4;
    return supabaseClient.from(SHARED_TABLE).select("data, data_version").eq("id", sheetId).maybeSingle().then(function (result) {
      if (result && result.error) throw result.error;
      var row = result && result.data;
      var currentData = (row && row.data) || {};
      var currentVersion = (row && row.data_version) || 1;
      var newData = mutateFn(currentData);
      return supabaseClient.from(SHARED_TABLE)
        .update({ data: newData, data_version: currentVersion + 1, updated_at: new Date().toISOString() })
        .eq("id", sheetId).eq("data_version", currentVersion)
        .select("id")
        .then(function (updateResult) {
          if (updateResult && updateResult.error) throw updateResult.error;
          var affected = (updateResult && updateResult.data) || [];
          if (!affected.length) {
            if (triesLeft > 0) return updateSharedSheetDataSafely(sheetId, mutateFn, triesLeft - 1);
            throw new Error("shared sheet data update conflict: too many retries");
          }
          return newData;
        });
    });
  }

  function applySharedLibraryFolders(sheetId, updateFoldersFn) {
    return updateSharedSheetDataSafely(sheetId, function (currentData) {
      return {
        tasks: currentData.tasks || [],
        reports: currentData.reports || [],
        files: [],
        folders: updateFoldersFn(currentData.folders || buildDefaultLibraryFolders(currentData.files)),
        siteLogs: currentData.siteLogs || [],
        ended: currentData.ended || false,
        endedDate: currentData.endedDate || null,
        logoId: currentData.logoId || null
      };
    }).then(function (updatedData) {
      var liveSheet = sharedSheets.find(function (s) { return s.id === sheetId; });
      if (liveSheet) liveSheet.folders = updatedData.folders;
      return updatedData.folders;
    });
  }

  // Returns a new folders array with any DEFAULT_LIBRARY_FOLDER_KEYS entry
  // that's missing appended, or null if nothing's missing - lets a key
  // added after a sheet's library was already bootstrapped (e.g. the
  // procurement/attendance/tools report folders, added long after "diaries"
  // etc.) still show up for projects created before that key existed,
  // instead of only ever being created lazily the first time its own
  // "send report" button happens to be used.
  function addMissingDefaultFolders(folders) {
    var missingKeys = DEFAULT_LIBRARY_FOLDER_KEYS.filter(function (key) {
      return !folders.some(function (f) { return f.key === key; });
    });
    if (!missingKeys.length) return null;
    return folders.concat(missingKeys.map(function (key) {
      return { id: uid(), key: key, name: null, files: [] };
    }));
  }

  // Lazily creates the default folders (and migrates any pre-existing flat
  // file list into a "General" folder) the first time a sheet's library is
  // opened, then keeps that set topped up on every later open too (see
  // addMissingDefaultFolders() above). Uses the same safe read-then-write
  // approach for shared sheets so a concurrent member never gets their real
  // folder clobbered by another client's bootstrap/migration.
  function ensureLibraryFolders(sheet, callback) {
    if (sheet.folders) {
      var migrated = addMissingDefaultFolders(sheet.folders);
      if (!migrated) { callback(sheet.folders); return; }
      if (sheet.shared) {
        applySharedLibraryFolders(sheet.id, function (liveFolders) {
          return addMissingDefaultFolders(liveFolders) || liveFolders;
        }).then(function (updated) { callback(updated); });
      } else {
        var liveSheetFast = data.sheets.find(function (s) { return s.id === sheet.id; });
        if (liveSheetFast) { liveSheetFast.folders = migrated; saveData(); }
        callback(migrated);
      }
      return;
    }
    if (!sheet.shared) {
      var liveSheet = data.sheets.find(function (s) { return s.id === sheet.id; });
      if (!liveSheet) { callback([]); return; }
      if (!liveSheet.folders) {
        liveSheet.folders = buildDefaultLibraryFolders(liveSheet.files);
        liveSheet.files = [];
        saveData();
      }
      callback(liveSheet.folders);
      return;
    }
    supabaseClient.from(SHARED_TABLE).select("data").eq("id", sheet.id).maybeSingle().then(function (result) {
      var currentData = (result && result.data && result.data.data) || {};
      if (currentData.folders) {
        var migratedShared = addMissingDefaultFolders(currentData.folders);
        if (migratedShared) {
          applySharedLibraryFolders(sheet.id, function (liveFolders) {
            return addMissingDefaultFolders(liveFolders) || liveFolders;
          }).then(function (updated) { callback(updated); });
          return;
        }
        var liveSheet = sharedSheets.find(function (s) { return s.id === sheet.id; });
        if (liveSheet) liveSheet.folders = currentData.folders;
        callback(currentData.folders);
        return;
      }
      // Only reaches the versioned write path when folders genuinely don't
      // exist yet - the fast path above never writes, so opening a library
      // that's already bootstrapped never bumps data_version or risks a
      // spurious conflict with a real concurrent edit.
      updateSharedSheetDataSafely(sheet.id, function (freshData) {
        return {
          tasks: freshData.tasks || [],
          reports: freshData.reports || [],
          files: [],
          folders: freshData.folders || buildDefaultLibraryFolders(freshData.files),
          siteLogs: freshData.siteLogs || [],
          ended: freshData.ended || false,
          endedDate: freshData.endedDate || null,
          logoId: freshData.logoId || null
        };
      }).then(function (updatedData) {
        var liveSheet = sharedSheets.find(function (s) { return s.id === sheet.id; });
        if (liveSheet) liveSheet.folders = updatedData.folders;
        callback(updatedData.folders);
      }, function () { callback(buildDefaultLibraryFolders(currentData.files)); });
    }, function () { callback([]); });
  }

  function renderLibraryFolders() {
    var sheet = allSheets().find(function (s) { return s.id === activeLibrarySheetId; });
    if (!sheet) return;
    ensureLibraryFolders(sheet, function (folders) {
      if (activeLibrarySheetId !== sheet.id || !libraryFoldersView || libraryFoldersView.hidden) return;
      libraryFoldersGrid.innerHTML = "";
      folders.forEach(function (folder) {
        var item = document.createElement("div");
        item.className = "library-item";

        var thumb = document.createElement("div");
        thumb.className = "library-item-thumb";
        thumb.textContent = "📁";
        item.appendChild(thumb);

        var nameEl = document.createElement("div");
        nameEl.className = "library-item-name";
        nameEl.textContent = folderDisplayName(folder);
        item.appendChild(nameEl);

        var folderLongPressFired = false;
        item.addEventListener("click", function () {
          if (folderLongPressFired) { folderLongPressFired = false; return; }
          openLibraryFolderView(sheet, folder);
        });

        // Deletable: any folder that isn't one of today's actual default
        // folders - covers both custom (keyless) folders and orphaned
        // folders left over from an old key (e.g. a stale "logs" folder
        // from before site logs were pointed at the "diaries" key), which
        // would otherwise be stuck undeletable with a blank display name
        // since LIBRARY_FOLDER_KEY_LABELS has no entry for it either.
        if (DEFAULT_LIBRARY_FOLDER_KEYS.indexOf(folder.key) === -1) {
          var delBtn = document.createElement("button");
          delBtn.type = "button";
          delBtn.className = "library-item-delete";
          delBtn.textContent = "✕";
          delBtn.addEventListener("click", function (e) {
            e.stopPropagation();
            askConfirm(tr("libraryConfirmDeleteFolder"), function () {
              deleteLibraryFolder(sheet, folder);
            });
          });
          item.appendChild(delBtn);

          var folderPressStartX = 0, folderPressStartY = 0;
          var startFolderPress = function (e) {
            if (e.target.closest("button")) return;
            var point = e.touches ? e.touches[0] : e;
            folderPressStartX = point.clientX;
            folderPressStartY = point.clientY;
            folderLongPressFired = false;
            clearTimeout(longPressTimer);
            longPressTimer = setTimeout(function () {
              folderLongPressFired = true;
              openLibraryFolderActionModal(sheet, folder);
            }, 1000);
          };
          var cancelFolderPress = function () { clearTimeout(longPressTimer); };
          var moveFolderPress = function (e) {
            var point = e.touches ? e.touches[0] : e;
            if (Math.abs(point.clientX - folderPressStartX) > 10 || Math.abs(point.clientY - folderPressStartY) > 10) {
              cancelFolderPress();
            }
          };
          item.addEventListener("mousedown", startFolderPress);
          item.addEventListener("mouseup", cancelFolderPress);
          item.addEventListener("mouseleave", cancelFolderPress);
          item.addEventListener("mousemove", moveFolderPress);
          item.addEventListener("touchstart", startFolderPress, { passive: true });
          item.addEventListener("touchend", cancelFolderPress);
          item.addEventListener("touchmove", moveFolderPress, { passive: true });
        }

        libraryFoldersGrid.appendChild(item);
      });
    });
  }

  function deleteLibraryFolder(sheet, folder) {
    var sheetId = sheet.id;
    var isShared = !!sheet.shared;
    var paths = (folder.files || []).map(function (f) { return f.path; });
    var removePromise = paths.length ? supabaseClient.storage.from(LIBRARY_BUCKET).remove(paths) : Promise.resolve();
    removePromise.then(function () {
      if (isShared) {
        return applySharedLibraryFolders(sheetId, function (folders) {
          return folders.filter(function (f) { return f.id !== folder.id; });
        });
      }
      var liveSheet = data.sheets.find(function (s) { return s.id === sheetId; });
      if (liveSheet && liveSheet.folders) {
        liveSheet.folders = liveSheet.folders.filter(function (f) { return f.id !== folder.id; });
        saveData();
      }
    }).then(function () {
      renderLibraryFolders();
    }, function () {
      alert(tr("libraryUploadError"));
    });
  }

  var libraryFolderActionOverlay = document.getElementById("libraryFolderActionOverlay");
  var libraryFolderActionDeleteBtn = document.getElementById("libraryFolderActionDeleteBtn");
  var libraryFolderActionCancelBtn = document.getElementById("libraryFolderActionCancelBtn");
  var pendingLibraryFolderAction = null;

  function openLibraryFolderActionModal(sheet, folder) {
    pendingLibraryFolderAction = { sheet: sheet, folder: folder };
    libraryFolderActionOverlay.hidden = false;
  }
  function closeLibraryFolderActionModal() {
    libraryFolderActionOverlay.hidden = true;
    pendingLibraryFolderAction = null;
  }
  libraryFolderActionDeleteBtn.addEventListener("click", function () {
    var pending = pendingLibraryFolderAction;
    closeLibraryFolderActionModal();
    if (!pending) return;
    askConfirm(tr("libraryConfirmDeleteFolder"), function () {
      deleteLibraryFolder(pending.sheet, pending.folder);
    });
  });
  libraryFolderActionCancelBtn.addEventListener("click", closeLibraryFolderActionModal);
  libraryFolderActionOverlay.addEventListener("click", function (e) {
    if (e.target === libraryFolderActionOverlay) closeLibraryFolderActionModal();
  });

  function renderLibraryGrid() {
    var sheet = allSheets().find(function (s) { return s.id === activeLibrarySheetId; });
    var folder = sheet && sheet.folders && sheet.folders.find(function (f) { return f.id === activeLibraryFolderId; });
    var files = (folder && folder.files) || [];
    libraryGrid.classList.toggle("library-grid-rows", !!folder && (isProcurementOrdersFolder(folder) || isAttendanceReportsFolder(folder) || isToolsReportsFolder(folder)));
    libraryGrid.innerHTML = "";
    if (!files.length) {
      var empty = document.createElement("div");
      empty.className = "library-empty";
      empty.textContent = tr("libraryEmptyPrompt");
      libraryGrid.appendChild(empty);
      return;
    }
    files.forEach(function (entry) {
      var item = document.createElement("div");
      item.className = "library-item";

      var thumb = document.createElement("div");
      thumb.className = "library-item-thumb";
      if (isImageFile(entry)) {
        var img = document.createElement("img");
        img.alt = "";
        resolveFileUrl(entry.path).then(function (url) { img.src = url; }).catch(function () {});
        thumb.appendChild(img);
      } else {
        thumb.textContent = "📄";
      }
      item.appendChild(thumb);

      var nameEl = document.createElement("div");
      nameEl.className = "library-item-name";
      nameEl.textContent = entry.name;
      item.appendChild(nameEl);

      var fileLongPressFired = false;
      item.addEventListener("click", function () {
        if (fileLongPressFired) { fileLongPressFired = false; return; }
        resolveFileUrl(entry.path).then(function (url) { window.open(url, "_blank"); }).catch(function () {
          alert(tr("libraryUploadError"));
        });
      });

      var delBtn = document.createElement("button");
      delBtn.type = "button";
      delBtn.className = "library-item-delete";
      delBtn.textContent = "✕";
      delBtn.addEventListener("click", function (e) {
        e.stopPropagation();
        askConfirm(tr("libraryConfirmDelete"), function () {
          deleteLibraryFile(sheet, folder, entry);
        });
      });
      item.appendChild(delBtn);

      // Long-press (matching the folder grid's own long-press pattern) pops
      // up a share/delete action modal, so sharing a file doesn't need its
      // own always-visible button crowding the thumbnail grid.
      var filePressStartX = 0, filePressStartY = 0;
      var startFilePress = function (e) {
        if (e.target.closest("button")) return;
        var point = e.touches ? e.touches[0] : e;
        filePressStartX = point.clientX;
        filePressStartY = point.clientY;
        fileLongPressFired = false;
        clearTimeout(longPressTimer);
        longPressTimer = setTimeout(function () {
          fileLongPressFired = true;
          openLibraryFileActionModal(sheet, folder, entry);
        }, 1000);
      };
      var cancelFilePress = function () { clearTimeout(longPressTimer); };
      var moveFilePress = function (e) {
        var point = e.touches ? e.touches[0] : e;
        if (Math.abs(point.clientX - filePressStartX) > 10 || Math.abs(point.clientY - filePressStartY) > 10) {
          cancelFilePress();
        }
      };
      item.addEventListener("mousedown", startFilePress);
      item.addEventListener("mouseup", cancelFilePress);
      item.addEventListener("mouseleave", cancelFilePress);
      item.addEventListener("mousemove", moveFilePress);
      item.addEventListener("touchstart", startFilePress, { passive: true });
      item.addEventListener("touchend", cancelFilePress);
      item.addEventListener("touchmove", moveFilePress, { passive: true });

      libraryGrid.appendChild(item);
    });
  }

  function deleteLibraryFile(sheet, folder, entry) {
    var sheetId = sheet.id;
    var folderId = folder.id;
    var isShared = !!sheet.shared;
    supabaseClient.storage.from(LIBRARY_BUCKET).remove([entry.path]).then(function () {
      if (isShared) {
        return applySharedLibraryFolders(sheetId, function (folders) {
          return folders.map(function (f) {
            if (f.id !== folderId) return f;
            return Object.assign({}, f, { files: (f.files || []).filter(function (x) { return x.id !== entry.id; }) });
          });
        });
      }
      var liveSheet = data.sheets.find(function (s) { return s.id === sheetId; });
      var liveFolder = liveSheet && liveSheet.folders && liveSheet.folders.find(function (f) { return f.id === folderId; });
      if (liveFolder) {
        liveFolder.files = (liveFolder.files || []).filter(function (f) { return f.id !== entry.id; });
        saveData();
      }
    }).then(function () {
      renderLibraryGrid();
    }, function () {
      alert(tr("libraryUploadError"));
    });
  }

  var libraryFileActionOverlay = document.getElementById("libraryFileActionOverlay");
  var libraryFileActionShareBtn = document.getElementById("libraryFileActionShareBtn");
  var libraryFileActionDeleteBtn = document.getElementById("libraryFileActionDeleteBtn");
  var libraryFileActionCancelBtn = document.getElementById("libraryFileActionCancelBtn");
  var pendingLibraryFileAction = null;

  function openLibraryFileActionModal(sheet, folder, entry) {
    pendingLibraryFileAction = { sheet: sheet, folder: folder, entry: entry };
    libraryFileActionOverlay.hidden = false;
  }
  function closeLibraryFileActionModal() {
    libraryFileActionOverlay.hidden = true;
    pendingLibraryFileAction = null;
  }
  function shareLibraryFile(entry) {
    resolveFileUrl(entry.path).then(function (url) {
      return fetch(url).then(function (r) { return r.blob(); });
    }).then(function (blob) {
      attemptShare(blob, entry.name, entry.type || blob.type);
    }).catch(function () {
      alert(tr("libraryUploadError"));
    });
  }
  libraryFileActionShareBtn.addEventListener("click", function () {
    var pending = pendingLibraryFileAction;
    closeLibraryFileActionModal();
    if (!pending) return;
    shareLibraryFile(pending.entry);
  });
  libraryFileActionDeleteBtn.addEventListener("click", function () {
    var pending = pendingLibraryFileAction;
    closeLibraryFileActionModal();
    if (!pending) return;
    askConfirm(tr("libraryConfirmDelete"), function () {
      deleteLibraryFile(pending.sheet, pending.folder, pending.entry);
    });
  });
  libraryFileActionCancelBtn.addEventListener("click", closeLibraryFileActionModal);
  libraryFileActionOverlay.addEventListener("click", function (e) {
    if (e.target === libraryFileActionOverlay) closeLibraryFileActionModal();
  });

  function uploadLibraryFiles(fileList) {
    var initialSheet = allSheets().find(function (s) { return s.id === activeLibrarySheetId; });
    if (!initialSheet) return;
    var sheetId = initialSheet.id;
    var folderId = activeLibraryFolderId;
    var isShared = !!initialSheet.shared;
    if (!supabaseClient || !folderId) return;
    Array.prototype.slice.call(fileList).forEach(function (file) {
      var path = sheetId + "/" + folderId + "/" + uid() + "-" + safeStorageFileName(file.name);
      supabaseClient.storage.from(LIBRARY_BUCKET).upload(path, file).then(function (result) {
        if (result.error) throw result.error;
        var newEntry = {
          id: uid(),
          name: file.name,
          path: path,
          type: file.type || "",
          size: file.size || 0,
          uploadedAt: Date.now()
        };
        if (isShared) {
          return applySharedLibraryFolders(sheetId, function (folders) {
            return folders.map(function (f) {
              if (f.id !== folderId) return f;
              return Object.assign({}, f, { files: (f.files || []).concat([newEntry]) });
            });
          });
        }
        var liveSheet = data.sheets.find(function (s) { return s.id === sheetId; });
        var liveFolder = liveSheet && liveSheet.folders && liveSheet.folders.find(function (f) { return f.id === folderId; });
        if (liveFolder) {
          liveFolder.files = (liveFolder.files || []).concat([newEntry]);
          saveData();
        }
      }).then(function () {
        renderLibraryGrid();
      }).catch(function (err) {
        console.error("library upload failed:", err);
        alert(tr("libraryUploadError") + "\n" + ((err && (err.message || err.error || err.statusCode)) || JSON.stringify(err) || ""));
      });
    });
  }

  function openLibraryFoldersView() {
    if (!activeSheet()) return;
    state.viewMode = "library";
    state.menuOpen = false;
    render();
  }
  function openLibraryFolderView(sheet, folder) {
    activeLibraryFolderId = folder.id;
    libraryHeadTitle.textContent = folderDisplayName(folder);
    renderLibraryGrid();
    libraryFoldersView.hidden = true;
    libraryView.hidden = false;
    updateActiveFabHighlight();
  }
  function closeLibraryView() {
    libraryView.hidden = true;
    activeLibraryFolderId = null;
    libraryFoldersView.hidden = false;
    renderLibraryFolders();
    updateActiveFabHighlight();
  }
  libraryBtn.addEventListener("click", openLibraryFoldersView);
  libraryBackBtn.addEventListener("click", closeLibraryView);
  libraryAddBtn.addEventListener("click", function () { libraryFileInput.click(); });
  libraryFileInput.addEventListener("change", function () {
    if (libraryFileInput.files && libraryFileInput.files.length) uploadLibraryFiles(libraryFileInput.files);
    libraryFileInput.value = "";
  });

  function openLibraryFolderNameModal() {
    libraryFolderNameInput.value = "";
    libraryFolderNameOverlay.hidden = false;
    libraryFolderNameInput.focus();
  }
  function closeLibraryFolderNameModal() {
    libraryFolderNameOverlay.hidden = true;
  }
  function createLibraryFolder() {
    var name = libraryFolderNameInput.value.trim();
    if (!name) { closeLibraryFolderNameModal(); return; }
    var sheet = allSheets().find(function (s) { return s.id === activeLibrarySheetId; });
    closeLibraryFolderNameModal();
    if (!sheet) return;
    var newFolder = { id: uid(), key: null, name: name, files: [] };
    if (sheet.shared) {
      applySharedLibraryFolders(sheet.id, function (folders) { return (folders || []).concat([newFolder]); })
        .then(function () { renderLibraryFolders(); });
      return;
    }
    var liveSheet = data.sheets.find(function (s) { return s.id === sheet.id; });
    if (liveSheet) {
      liveSheet.folders = (liveSheet.folders || []).concat([newFolder]);
      saveData();
      renderLibraryFolders();
    }
  }
  libraryAddFolderBtn.addEventListener("click", openLibraryFolderNameModal);
  libraryFolderNameOkBtn.addEventListener("click", createLibraryFolder);
  libraryFolderNameCancelBtn.addEventListener("click", closeLibraryFolderNameModal);
  libraryFolderNameInput.addEventListener("keydown", function (e) {
    if (e.key === "Enter") { e.preventDefault(); createLibraryFolder(); }
    if (e.key === "Escape") { closeLibraryFolderNameModal(); }
  });
  libraryFolderNameOverlay.addEventListener("click", function (e) {
    if (e.target === libraryFolderNameOverlay) closeLibraryFolderNameModal();
  });

