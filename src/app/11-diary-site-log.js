  var sheetReportsList = document.getElementById("sheetReportsList");
  var tasksFabBtn = document.getElementById("tasksFabBtn");

  var calendarFabBtn = document.getElementById("calendarFabBtn");
  var officeReportsBtn = document.getElementById("officeReportsBtn");
  // The diary (יומן) category icons live inline on the main tasks page now
  // (see #diaryView / render()'s diaryMode branch) instead of a separate
  // screen, so opening it is just another state.viewMode - same pattern as
  // the reports FAB - sharing the page's own date (never a future one,
  // since a log is a record of a day that already happened).
  function openDiaryView() {
    if (state.viewDate > todayISO()) state.viewDate = todayISO();
    state.viewMode = "diary";
    state.menuOpen = false;
    render();
  }
  calendarFabBtn.addEventListener("click", openDiaryView);

  var reportTypeOverlay = document.getElementById("reportTypeOverlay");
  var reportTypeMeetingBtn = document.getElementById("reportTypeMeetingBtn");
  var reportTypeTourBtn = document.getElementById("reportTypeTourBtn");
  var reportTypeCancelBtn = document.getElementById("reportTypeCancelBtn");

  var reportTitleOverlay = document.getElementById("reportTitleOverlay");
  var reportTitleInput = document.getElementById("reportTitleInput");
  var reportTitleSaveBtn = document.getElementById("reportTitleSaveBtn");
  var reportTitleCancelBtn = document.getElementById("reportTitleCancelBtn");

  var reportDateOverlay = document.getElementById("reportDateOverlay");
  var reportDateInput = document.getElementById("reportDateInput");
  var reportDateSaveBtn = document.getElementById("reportDateSaveBtn");
  var reportDateCancelBtn = document.getElementById("reportDateCancelBtn");

  var reportParticipantsOverlay = document.getElementById("reportParticipantsOverlay");
  var reportParticipantsList = document.getElementById("reportParticipantsList");
  var reportParticipantsSaveBtn = document.getElementById("reportParticipantsSaveBtn");
  var reportParticipantsCancelBtn = document.getElementById("reportParticipantsCancelBtn");

  function addParticipantInput(focusIt) {
    var input = document.createElement("input");
    input.type = "text";
    input.className = "auth-input";
    input.placeholder = tr("reportParticipantNamePlaceholder");
    input.maxLength = 100;
    input.addEventListener("input", function () {
      if (input.value.trim() && input === reportParticipantsList.lastElementChild) {
        addParticipantInput(false);
      }
    });
    input.addEventListener("keydown", function (e) {
      e.stopPropagation();
      if (e.key === "Enter") reportParticipantsSaveBtn.click();
      if (e.key === "Escape") closeReportParticipantsModal();
    });
    reportParticipantsList.appendChild(input);
    if (focusIt) input.focus();
  }

  function resetParticipantsList(existingNames) {
    reportParticipantsList.innerHTML = "";
    var names = (existingNames || []).filter(function (name) { return name; });
    if (!names.length) {
      addParticipantInput(true);
      return;
    }
    names.forEach(function (name) {
      addParticipantInput(false);
      reportParticipantsList.lastElementChild.value = name;
    });
    addParticipantInput(false);
  }

  var reportView = document.getElementById("reportView");
  var reportBackBtn = document.getElementById("reportBackBtn");
  var reportHeadTitle = document.getElementById("reportHeadTitle");
  var reportShareBtn = document.getElementById("reportShareBtn");
  var reportSaveBtn = document.getElementById("reportSaveBtn");
  var reportEditBtn = document.getElementById("reportEditBtn");
  var reportCloseBtn = document.getElementById("reportCloseBtn");
  var reportMeta = document.getElementById("reportMeta");
  var reportTableBody = document.getElementById("reportTableBody");
  var reportFabBtn = document.getElementById("reportFabBtn");

  var pendingReportDraft = null;
  var activeReportId = null;
  var editingReportCell = null;
  var openPriorityPopupRowId = null;

  function findReport(id) {
    var all = allSheets();
    for (var i = 0; i < all.length; i++) {
      var found = (all[i].reports || []).find(function (r) { return r.id === id; });
      if (found) return found;
    }
    return null;
  }

  function findSheetForReport(report) {
    var all = allSheets();
    for (var i = 0; i < all.length; i++) {
      if ((all[i].reports || []).indexOf(report) !== -1) return all[i];
    }
    return null;
  }

  function findLogo(logoId) {
    if (!logoId) return null;
    return (data.logos || []).find(function (l) { return l.id === logoId; }) || null;
  }

  function buildPdfDocTitleElement(sheet, titleText) {
    var titleEl = document.createElement("div");
    titleEl.className = "pdf-doc-title";
    titleEl.textContent = titleText;
    var logo = sheet ? findLogo(sheet.logoId) : null;
    if (!logo) return titleEl;
    var header = document.createElement("div");
    header.className = "pdf-doc-header";
    var img = document.createElement("img");
    img.className = "pdf-doc-logo";
    img.src = logo.dataUrl;
    header.appendChild(img);
    header.appendChild(titleEl);
    return header;
  }

  function findSiteLog(sheet, dateISO) {
    // Logs loaded straight from storage (created before a data-model change,
    // e.g. the tools qty/note split) never otherwise pass through
    // normalizeSiteLog - normalizing here, on every read, keeps every log
    // migrated regardless of how old it is, instead of only new ones.
    var log = (sheet.siteLogs || []).find(function (l) { return l.date === dateISO; }) || null;
    return log ? normalizeSiteLog(log) : null;
  }
  function findOrCreateSiteLog(sheet, dateISO) {
    var log = findSiteLog(sheet, dateISO);
    if (log) return log;
    log = normalizeSiteLog({ id: uid(), date: dateISO });
    if (!sheet.siteLogs) sheet.siteLogs = [];
    sheet.siteLogs.push(log);
    return log;
  }
  function findPreviousSiteLog(sheet, dateISO) {
    var candidates = (sheet.siteLogs || []).filter(function (l) { return l.date < dateISO; });
    if (!candidates.length) return null;
    candidates.sort(function (a, b) { return a.date < b.date ? 1 : -1; });
    return candidates[0];
  }
  // Read-only lookup for previewing a log that may not have been created
  // yet (nothing has been added to any category) - never mutates sheet.siteLogs.
  function getSiteLogOrEmpty(sheet, dateISO) {
    return findSiteLog(sheet, dateISO) || normalizeSiteLog({ id: null, date: dateISO });
  }
  function nextSiteLogNumber(sheet, log) {
    return log.number || ((sheet.siteLogs || []).reduce(function (max, l) { return l.number ? Math.max(max, l.number) : max; }, 0) + 1);
  }

  var diaryView = document.getElementById("diaryView");
  var siteLogPreviewBtn = document.getElementById("siteLogPreviewBtn");
  var siteLogPreviewView = document.getElementById("siteLogPreviewView");
  var siteLogPreviewBackBtn = document.getElementById("siteLogPreviewBackBtn");
  var siteLogPreviewContent = document.getElementById("siteLogPreviewContent");
  var siteLogAttendanceBtn = document.getElementById("siteLogAttendanceBtn");
  var siteLogToolsBtn = document.getElementById("siteLogToolsBtn");
  var siteLogContractorsBtn = document.getElementById("siteLogContractorsBtn");
  var siteLogWorksBtn = document.getElementById("siteLogWorksBtn");
  var siteLogCloseBtn = document.getElementById("siteLogCloseBtn");
  var siteLogShareGeneralBtn = document.getElementById("siteLogShareGeneralBtn");
  var siteLogPeriodicBtn = document.getElementById("siteLogPeriodicBtn");
  var siteLogPeriodicRangeOverlay = document.getElementById("siteLogPeriodicRangeOverlay");
  var siteLogPeriodicFromInput = document.getElementById("siteLogPeriodicFromInput");
  var siteLogPeriodicToInput = document.getElementById("siteLogPeriodicToInput");
  var siteLogPeriodicGenerateBtn = document.getElementById("siteLogPeriodicGenerateBtn");
  var siteLogPeriodicCancelBtn = document.getElementById("siteLogPeriodicCancelBtn");
  var siteLogAttendanceView = document.getElementById("siteLogAttendanceView");
  var siteLogAttendanceBackBtn = document.getElementById("siteLogAttendanceBackBtn");
  var siteLogAttendanceColumns = document.getElementById("siteLogAttendanceColumns");
  var siteLogAttendanceShareBtn = document.getElementById("siteLogAttendanceShareBtn");
  var siteLogAttendanceCopyPrevBtn = document.getElementById("siteLogAttendanceCopyPrevBtn");
  var siteLogAttendanceOrderBtn = document.getElementById("siteLogAttendanceOrderBtn");
  var siteLogAttendanceProjectName = document.getElementById("siteLogAttendanceProjectName");
  var siteLogToolsView = document.getElementById("siteLogToolsView");
  var siteLogToolsBackBtn = document.getElementById("siteLogToolsBackBtn");
  var siteLogToolsColumns = document.getElementById("siteLogToolsColumns");
  var siteLogToolsShareBtn = document.getElementById("siteLogToolsShareBtn");
  var siteLogToolsCopyPrevBtn = document.getElementById("siteLogToolsCopyPrevBtn");
  var siteLogToolsOrderBtn = document.getElementById("siteLogToolsOrderBtn");
  var siteLogToolsProjectName = document.getElementById("siteLogToolsProjectName");
  var siteLogContractorsView = document.getElementById("siteLogContractorsView");
  var siteLogContractorsBackBtn = document.getElementById("siteLogContractorsBackBtn");
  var siteLogContractorsList = document.getElementById("siteLogContractorsList");
  var siteLogContractorsCopyPrevBtn = document.getElementById("siteLogContractorsCopyPrevBtn");
  var siteLogContractorsProjectName = document.getElementById("siteLogContractorsProjectName");
  var siteLogWorksView = document.getElementById("siteLogWorksView");
  var siteLogWorksBackBtn = document.getElementById("siteLogWorksBackBtn");
  var siteLogWorksList = document.getElementById("siteLogWorksList");
  var siteLogWorksFileInput = document.getElementById("siteLogWorksFileInput");
  var siteLogWorksCameraInput = document.getElementById("siteLogWorksCameraInput");
  var siteLogWorksCopyPrevBtn = document.getElementById("siteLogWorksCopyPrevBtn");
  var siteLogWorksProjectName = document.getElementById("siteLogWorksProjectName");
  var siteLogWorksPendingEntryId = null;
  var siteLogProcurementBtn = document.getElementById("siteLogProcurementBtn");
  var siteLogProcurementView = document.getElementById("siteLogProcurementView");
  var siteLogProcurementBackBtn = document.getElementById("siteLogProcurementBackBtn");
  var siteLogProcurementShareBtn = document.getElementById("siteLogProcurementShareBtn");
  var siteLogProcurementRows = document.getElementById("siteLogProcurementRows");
  var siteLogProcurementOrderBtn = document.getElementById("siteLogProcurementOrderBtn");
  var siteLogProcurementProjectName = document.getElementById("siteLogProcurementProjectName");

  function updateSiteLogCloseShareButtons() {
    var log = findSiteLog(activeSheet(), activeSiteLogDate);
    siteLogShareGeneralBtn.disabled = !(log && log.closed);
  }

  function openSiteLogPreviewView() {
    var sheet = activeSheet();
    var log = getSiteLogOrEmpty(sheet, activeSiteLogDate);
    var number = log.number || nextSiteLogNumber(sheet, log);
    siteLogPreviewContent.innerHTML = "";
    siteLogPreviewContent.appendChild(buildSiteLogGeneralPdfElement(sheet, log, number));
    diaryView.hidden = true;
    siteLogPreviewView.hidden = false;
  }
  function closeSiteLogPreviewView() {
    siteLogPreviewView.hidden = true;
    diaryView.hidden = false;
  }
  siteLogPreviewBtn.addEventListener("click", openSiteLogPreviewView);
  siteLogPreviewBackBtn.addEventListener("click", closeSiteLogPreviewView);

  // The library already gives every project a default "diaries" folder
  // (displayed as "יומנים" in Hebrew - the same word used for these logs)
  // via DEFAULT_LIBRARY_FOLDER_KEYS/buildDefaultLibraryFolders(). Closed
  // logs belong in that existing folder, not a separate new one - an
  // earlier version of this invented its own "logs" key, which not only
  // duplicated the existing folder but, matched by display name as a fix,
  // collided with "diaries" since both read "יומנים" in Hebrew.
  var SITE_LOG_FOLDER_KEY = "diaries";

  function isSiteLogsFolder(f) {
    return f.key === SITE_LOG_FOLDER_KEY;
  }

  function ensureSiteLogsFolder(sheet) {
    return new Promise(function (resolve) {
      ensureLibraryFolders(sheet, function (folders) {
        var existing = folders.find(isSiteLogsFolder);
        if (existing) { resolve(existing.id); return; }
        var newId = uid();
        if (sheet.shared) {
          applySharedLibraryFolders(sheet.id, function (liveFolders) {
            if (liveFolders.some(isSiteLogsFolder)) return liveFolders;
            return liveFolders.concat([{ id: newId, key: SITE_LOG_FOLDER_KEY, name: null, files: [] }]);
          }).then(function (updated) {
            var folder = updated.find(isSiteLogsFolder);
            resolve(folder ? folder.id : newId);
          });
        } else {
          var liveSheet = data.sheets.find(function (s) { return s.id === sheet.id; });
          if (!liveSheet.folders) liveSheet.folders = folders;
          var folder = liveSheet.folders.find(isSiteLogsFolder);
          if (!folder) {
            folder = { id: newId, key: SITE_LOG_FOLDER_KEY, name: null, files: [] };
            liveSheet.folders.push(folder);
            saveData();
          }
          resolve(folder.id);
        }
      });
    });
  }

  function addFileToLibraryFolder(sheet, folderId, entry) {
    if (sheet.shared) {
      return applySharedLibraryFolders(sheet.id, function (folders) {
        return folders.map(function (f) {
          if (f.id !== folderId) return f;
          return Object.assign({}, f, { files: (f.files || []).concat([entry]) });
        });
      });
    }
    var liveSheet = data.sheets.find(function (s) { return s.id === sheet.id; });
    var liveFolder = liveSheet && liveSheet.folders && liveSheet.folders.find(function (f) { return f.id === folderId; });
    if (liveFolder) {
      liveFolder.files = (liveFolder.files || []).concat([entry]);
      saveData();
    }
    return Promise.resolve();
  }

  function removeLibraryFileEntry(sheet, folderId, entryId, path) {
    var removePromise = supabaseClient ? supabaseClient.storage.from(LIBRARY_BUCKET).remove([path]).catch(function () {}) : Promise.resolve();
    return removePromise.then(function () {
      if (sheet.shared) {
        return applySharedLibraryFolders(sheet.id, function (folders) {
          return folders.map(function (f) {
            if (f.id !== folderId) return f;
            return Object.assign({}, f, { files: (f.files || []).filter(function (x) { return x.id !== entryId; }) });
          });
        });
      }
      var liveSheet = data.sheets.find(function (s) { return s.id === sheet.id; });
      var liveFolder = liveSheet && liveSheet.folders && liveSheet.folders.find(function (f) { return f.id === folderId; });
      if (liveFolder) {
        liveFolder.files = (liveFolder.files || []).filter(function (f) { return f.id !== entryId; });
        saveData();
      }
      return Promise.resolve();
    });
  }

  function uploadClosedLogPdfToLibrary(sheet, blob, fileName) {
    return ensureSiteLogsFolder(sheet).then(function (folderId) {
      var path = sheet.id + "/" + folderId + "/" + uid() + "-" + safeStorageFileName(fileName);
      return supabaseClient.storage.from(LIBRARY_BUCKET).upload(path, blob, { contentType: "application/pdf" }).then(function (result) {
        if (result.error) throw result.error;
        var entry = { id: uid(), name: fileName, path: path, type: "application/pdf", size: blob.size || 0, uploadedAt: Date.now() };
        return addFileToLibraryFolder(sheet, folderId, entry).then(function () { return { entry: entry, folderId: folderId }; });
      });
    });
  }

  // "Send procurement order" writes a PDF copy into a dedicated library
  // folder instead of actually dispatching anything to a supplier - same
  // get-or-create-by-key pattern as ensureSiteLogsFolder() above.
  var PROCUREMENT_ORDERS_FOLDER_KEY = "procurementOrders";
  function isProcurementOrdersFolder(f) {
    return f.key === PROCUREMENT_ORDERS_FOLDER_KEY;
  }
  function ensureProcurementOrdersFolder(sheet) {
    return new Promise(function (resolve) {
      ensureLibraryFolders(sheet, function (folders) {
        var existing = folders.find(isProcurementOrdersFolder);
        if (existing) { resolve(existing.id); return; }
        var newId = uid();
        if (sheet.shared) {
          applySharedLibraryFolders(sheet.id, function (liveFolders) {
            if (liveFolders.some(isProcurementOrdersFolder)) return liveFolders;
            return liveFolders.concat([{ id: newId, key: PROCUREMENT_ORDERS_FOLDER_KEY, name: null, files: [] }]);
          }).then(function (updated) {
            var folder = updated.find(isProcurementOrdersFolder);
            resolve(folder ? folder.id : newId);
          });
        } else {
          var liveSheet = data.sheets.find(function (s) { return s.id === sheet.id; });
          if (!liveSheet.folders) liveSheet.folders = folders;
          var folder = liveSheet.folders.find(isProcurementOrdersFolder);
          if (!folder) {
            folder = { id: newId, key: PROCUREMENT_ORDERS_FOLDER_KEY, name: null, files: [] };
            liveSheet.folders.push(folder);
            saveData();
          }
          resolve(folder.id);
        }
      });
    });
  }
  function uploadProcurementOrderPdfToLibrary(sheet, blob, fileName) {
    return ensureProcurementOrdersFolder(sheet).then(function (folderId) {
      var path = sheet.id + "/" + folderId + "/" + uid() + "-" + safeStorageFileName(fileName);
      return supabaseClient.storage.from(LIBRARY_BUCKET).upload(path, blob, { contentType: "application/pdf" }).then(function (result) {
        if (result.error) throw result.error;
        var entry = { id: uid(), name: fileName, path: path, type: "application/pdf", size: blob.size || 0, uploadedAt: Date.now() };
        return addFileToLibraryFolder(sheet, folderId, entry).then(function () { return { entry: entry, folderId: folderId }; });
      });
    });
  }

  // "Send attendance report" - same pattern as the procurement order above,
  // filing into its own dedicated (also permanent) library folder.
  var ATTENDANCE_REPORTS_FOLDER_KEY = "attendanceReports";
  function isAttendanceReportsFolder(f) {
    return f.key === ATTENDANCE_REPORTS_FOLDER_KEY;
  }
  function ensureAttendanceReportsFolder(sheet) {
    return new Promise(function (resolve) {
      ensureLibraryFolders(sheet, function (folders) {
        var existing = folders.find(isAttendanceReportsFolder);
        if (existing) { resolve(existing.id); return; }
        var newId = uid();
        if (sheet.shared) {
          applySharedLibraryFolders(sheet.id, function (liveFolders) {
            if (liveFolders.some(isAttendanceReportsFolder)) return liveFolders;
            return liveFolders.concat([{ id: newId, key: ATTENDANCE_REPORTS_FOLDER_KEY, name: null, files: [] }]);
          }).then(function (updated) {
            var folder = updated.find(isAttendanceReportsFolder);
            resolve(folder ? folder.id : newId);
          });
        } else {
          var liveSheet = data.sheets.find(function (s) { return s.id === sheet.id; });
          if (!liveSheet.folders) liveSheet.folders = folders;
          var folder = liveSheet.folders.find(isAttendanceReportsFolder);
          if (!folder) {
            folder = { id: newId, key: ATTENDANCE_REPORTS_FOLDER_KEY, name: null, files: [] };
            liveSheet.folders.push(folder);
            saveData();
          }
          resolve(folder.id);
        }
      });
    });
  }
  function uploadAttendanceReportPdfToLibrary(sheet, blob, fileName) {
    return ensureAttendanceReportsFolder(sheet).then(function (folderId) {
      var path = sheet.id + "/" + folderId + "/" + uid() + "-" + safeStorageFileName(fileName);
      return supabaseClient.storage.from(LIBRARY_BUCKET).upload(path, blob, { contentType: "application/pdf" }).then(function (result) {
        if (result.error) throw result.error;
        var entry = { id: uid(), name: fileName, path: path, type: "application/pdf", size: blob.size || 0, uploadedAt: Date.now() };
        return addFileToLibraryFolder(sheet, folderId, entry).then(function () { return { entry: entry, folderId: folderId }; });
      });
    });
  }

  // "Send tools report" - same pattern again, for the tools log's own
  // dedicated (also permanent) library folder.
  var TOOLS_REPORTS_FOLDER_KEY = "toolsReports";
  function isToolsReportsFolder(f) {
    return f.key === TOOLS_REPORTS_FOLDER_KEY;
  }
  function ensureToolsReportsFolder(sheet) {
    return new Promise(function (resolve) {
      ensureLibraryFolders(sheet, function (folders) {
        var existing = folders.find(isToolsReportsFolder);
        if (existing) { resolve(existing.id); return; }
        var newId = uid();
        if (sheet.shared) {
          applySharedLibraryFolders(sheet.id, function (liveFolders) {
            if (liveFolders.some(isToolsReportsFolder)) return liveFolders;
            return liveFolders.concat([{ id: newId, key: TOOLS_REPORTS_FOLDER_KEY, name: null, files: [] }]);
          }).then(function (updated) {
            var folder = updated.find(isToolsReportsFolder);
            resolve(folder ? folder.id : newId);
          });
        } else {
          var liveSheet = data.sheets.find(function (s) { return s.id === sheet.id; });
          if (!liveSheet.folders) liveSheet.folders = folders;
          var folder = liveSheet.folders.find(isToolsReportsFolder);
          if (!folder) {
            folder = { id: newId, key: TOOLS_REPORTS_FOLDER_KEY, name: null, files: [] };
            liveSheet.folders.push(folder);
            saveData();
          }
          resolve(folder.id);
        }
      });
    });
  }
  function uploadToolsReportPdfToLibrary(sheet, blob, fileName) {
    return ensureToolsReportsFolder(sheet).then(function (folderId) {
      var path = sheet.id + "/" + folderId + "/" + uid() + "-" + safeStorageFileName(fileName);
      return supabaseClient.storage.from(LIBRARY_BUCKET).upload(path, blob, { contentType: "application/pdf" }).then(function (result) {
        if (result.error) throw result.error;
        var entry = { id: uid(), name: fileName, path: path, type: "application/pdf", size: blob.size || 0, uploadedAt: Date.now() };
        return addFileToLibraryFolder(sheet, folderId, entry).then(function () { return { entry: entry, folderId: folderId }; });
      });
    });
  }

  // The "reports" folder (unlike the old "diaries"/site-logs one) is one of
  // the 4 protected defaults every sheet already gets from
  // buildDefaultLibraryFolders()/ensureLibraryFolders(), and it can never be
  // deleted through the UI - so no "create it if missing" branch is needed
  // here the way ensureSiteLogsFolder() needs one.
  function ensureReportsFolder(sheet) {
    return new Promise(function (resolve, reject) {
      ensureLibraryFolders(sheet, function (folders) {
        var folder = folders.find(function (f) { return f.key === "reports"; });
        if (folder) resolve(folder.id); else reject(new Error("reports folder missing"));
      });
    });
  }

  function uploadReportPdfToLibrary(sheet, blob, fileName) {
    return ensureReportsFolder(sheet).then(function (folderId) {
      var path = sheet.id + "/" + folderId + "/" + uid() + "-" + safeStorageFileName(fileName);
      return supabaseClient.storage.from(LIBRARY_BUCKET).upload(path, blob, { contentType: "application/pdf" }).then(function (result) {
        if (result.error) throw result.error;
        var entry = { id: uid(), name: fileName, path: path, type: "application/pdf", size: blob.size || 0, uploadedAt: Date.now() };
        return addFileToLibraryFolder(sheet, folderId, entry).then(function () { return { entry: entry, folderId: folderId }; });
      });
    });
  }

  function closeReport() {
    var report = findReport(activeReportId);
    var sheet = activeSheet();
    if (!report || !supabaseClient) { alert(tr("libraryUploadError")); return; }
    var originalContent = reportCloseBtn.textContent;
    reportCloseBtn.disabled = true;
    reportCloseBtn.innerHTML = "&#8987;";
    var previousFile = report.closedFile;
    buildReportPdfBlob(report).then(function (result) {
      var removePrevious = previousFile
        ? removeLibraryFileEntry(sheet, previousFile.folderId, previousFile.entryId, previousFile.path).catch(function () {})
        : Promise.resolve();
      return removePrevious.then(function () {
        return uploadReportPdfToLibrary(sheet, result.blob, result.fileName);
      }).then(function (uploaded) {
        var liveReport = findReport(report.id);
        if (liveReport) liveReport.closedFile = { folderId: uploaded.folderId, entryId: uploaded.entry.id, path: uploaded.entry.path };
        saveData();
        // reportView is only ever hidden, never removed from the DOM, so
        // this button's disabled/spinner state would otherwise still be
        // showing the next time any report is opened.
        reportCloseBtn.disabled = false;
        reportCloseBtn.textContent = originalContent;
        closeReportView();
      });
    }).catch(function (err) {
      console.error("close report failed:", err);
      alert(tr("reportPdfError"));
      reportCloseBtn.disabled = false;
      reportCloseBtn.textContent = originalContent;
    });
  }

  function siteLogGeneralFileName(sheet, log, number) {
    return tr("siteLogGeneralReportTitle") + " " + number + " " + sheet.name + " " + isoToFileNameDate(log.date) + ".pdf";
  }

  function closeSiteLog() {
    var sheet = activeSheet();
    var log = findOrCreateSiteLog(sheet, activeSiteLogDate);
    if (!supabaseClient) { alert(tr("libraryUploadError")); return; }
    var number = nextSiteLogNumber(sheet, log);
    var originalContent = siteLogCloseBtn.textContent;
    siteLogCloseBtn.disabled = true;
    siteLogCloseBtn.innerHTML = "&#8987;";
    var element = buildSiteLogGeneralPdfElement(sheet, log, number);
    var fileName = siteLogGeneralFileName(sheet, log, number);
    var previousFile = log.closedFile;
    buildPdfBlobFromElement(element, fileName).then(function (result) {
      // Closing again (after further edits) replaces the previous PDF in
      // the library rather than piling up a new copy each time - remove
      // the old one first so the folder only ever holds this log's latest
      // version.
      var removePrevious = previousFile
        ? removeLibraryFileEntry(sheet, previousFile.folderId, previousFile.entryId, previousFile.path).catch(function () {})
        : Promise.resolve();
      return removePrevious.then(function () {
        return uploadClosedLogPdfToLibrary(sheet, result.blob, result.fileName);
      }).then(function (uploaded) {
        var liveLog = findOrCreateSiteLog(activeSheet(), activeSiteLogDate);
        liveLog.number = number;
        liveLog.closed = true;
        liveLog.closedAt = Date.now();
        liveLog.closedFile = { folderId: uploaded.folderId, entryId: uploaded.entry.id, path: uploaded.entry.path };
        saveData();
        updateSiteLogCloseShareButtons();
      });
    }).catch(function (err) {
      console.error("close site log failed:", err);
      alert(tr("reportPdfError"));
    }).then(function () {
      siteLogCloseBtn.disabled = false;
      siteLogCloseBtn.textContent = originalContent;
    });
  }

  function shareSiteLogGeneral() {
    var sheet = activeSheet();
    var log = findSiteLog(sheet, activeSiteLogDate);
    if (!log || !log.closed) { showToast(tr("siteLogCloseFirstMsg")); return; }
    var originalContent = siteLogShareGeneralBtn.textContent;
    siteLogShareGeneralBtn.disabled = true;
    siteLogShareGeneralBtn.innerHTML = "&#8987;";
    var element = buildSiteLogGeneralPdfElement(sheet, log, log.number);
    var fileName = siteLogGeneralFileName(sheet, log, log.number);
    buildPdfBlobFromElement(element, fileName).then(function (result) {
      attemptShare(result.blob, result.fileName);
    }).catch(function (err) {
      console.error("share site log failed:", err);
      alert(tr("reportPdfError"));
    }).then(function () {
      siteLogShareGeneralBtn.disabled = !log.closed;
      siteLogShareGeneralBtn.textContent = originalContent;
    });
  }

  siteLogCloseBtn.addEventListener("click", closeSiteLog);
  siteLogShareGeneralBtn.addEventListener("click", shareSiteLogGeneral);

  function openSiteLogPeriodicModal() {
    siteLogPeriodicFromInput.value = "";
    siteLogPeriodicToInput.value = "";
    siteLogPeriodicFromInput.max = todayISO();
    siteLogPeriodicToInput.max = todayISO();
    siteLogPeriodicRangeOverlay.hidden = false;
  }
  function closeSiteLogPeriodicModal() {
    siteLogPeriodicRangeOverlay.hidden = true;
  }
  function buildSiteLogPeriodicPdfElement(sheet, logs) {
    var wrap = document.createElement("div");
    logs.forEach(function (log, index) {
      var docEl = buildSiteLogGeneralPdfElement(sheet, log, log.number);
      if (index > 0) docEl.classList.add("pdf-doc-periodic-section");
      wrap.appendChild(docEl);
    });
    return wrap;
  }
  function generateSiteLogPeriodicReport() {
    var from = siteLogPeriodicFromInput.value;
    var to = siteLogPeriodicToInput.value;
    if (!from || !to) { alert(tr("siteLogPeriodicMissingDatesMsg")); return; }
    if (from > to) { alert(tr("siteLogPeriodicInvalidRangeMsg")); return; }
    var sheet = activeSheet();
    var logs = (sheet.siteLogs || []).filter(function (l) {
      return l.closed && l.date >= from && l.date <= to;
    }).sort(function (a, b) { return a.date < b.date ? -1 : 1; }).map(normalizeSiteLog);
    if (!logs.length) { alert(tr("siteLogPeriodicNoLogsMsg")); return; }
    closeSiteLogPeriodicModal();
    var originalContent = siteLogPeriodicBtn.textContent;
    siteLogPeriodicBtn.disabled = true;
    siteLogPeriodicBtn.innerHTML = "&#8987;";
    var element = buildSiteLogPeriodicPdfElement(sheet, logs);
    var fileName = tr("siteLogPeriodicFileNamePrefix") + " " + sheet.name + " " + isoToFileNameDate(from) + " - " + isoToFileNameDate(to) + ".pdf";
    buildPdfBlobFromElement(element, fileName).then(function (result) {
      attemptShare(result.blob, result.fileName);
    }).catch(function (err) {
      console.error("periodic site log report failed:", err);
      alert(tr("reportPdfError"));
    }).then(function () {
      siteLogPeriodicBtn.disabled = false;
      siteLogPeriodicBtn.textContent = originalContent;
    });
  }
  siteLogPeriodicBtn.addEventListener("click", openSiteLogPeriodicModal);
  siteLogPeriodicCancelBtn.addEventListener("click", closeSiteLogPeriodicModal);
  siteLogPeriodicRangeOverlay.addEventListener("click", function (e) {
    if (e.target === siteLogPeriodicRangeOverlay) closeSiteLogPeriodicModal();
  });
  siteLogPeriodicGenerateBtn.addEventListener("click", generateSiteLogPeriodicReport);

  // Shared by every simple "growable list of names with a + at the bottom"
  // site-log category (attendance columns, contractors, ...): renders the
  // existing entries plus a + that turns into a text input, committing a
  // new entry and putting a fresh + below it once you start typing.
  // getSuggestions (optional): names offered while typing - Head Office's
  // "הזנת נתונים" lists for this column, minus names already entered.
  var siteLogSuggestSeq = 0;
  function renderSiteLogNameList(container, getEntries, addEntry, removeEntry, rerender, getSuggestions) {
    container.innerHTML = "";

    function buildRow(entry) {
      var row = document.createElement("div");
      row.className = "site-log-entry";
      var nameSpan = document.createElement("span");
      nameSpan.textContent = entry.name;
      row.appendChild(nameSpan);
      var removeBtn = document.createElement("button");
      removeBtn.type = "button";
      removeBtn.className = "site-log-entry-remove";
      removeBtn.textContent = "✕";
      removeBtn.addEventListener("click", function () {
        removeEntry(entry.id);
        saveData();
        rerender();
      });
      row.appendChild(removeBtn);
      return row;
    }

    getEntries().forEach(function (entry) { container.appendChild(buildRow(entry)); });

    function createAddBtn() {
      var addBtn = document.createElement("button");
      addBtn.type = "button";
      addBtn.className = "site-log-add-btn";
      var addBtnImg = document.createElement("img");
      addBtnImg.src = "tasks-plus-icon.webp";
      addBtnImg.alt = "+";
      addBtn.appendChild(addBtnImg);
      addBtn.addEventListener("click", function () { activateAddBtn(addBtn); });
      return addBtn;
    }

    function activateAddBtn(addBtn) {
      var input = document.createElement("input");
      input.type = "text";
      input.className = "site-log-add-input";
      input.maxLength = 60;
      var suggestions = getSuggestions ? getSuggestions() : [];
      if (suggestions.length) {
        var taken = getEntries().map(function (e) { return e.name; });
        var listEl = document.createElement("datalist");
        listEl.id = "siteLogSuggest" + (++siteLogSuggestSeq);
        suggestions.forEach(function (name) {
          if (taken.indexOf(name) !== -1) return;
          var opt = document.createElement("option");
          opt.value = name;
          listEl.appendChild(opt);
        });
        container.appendChild(listEl);
        input.setAttribute("list", listEl.id);
      }
      container.replaceChild(input, addBtn);
      input.focus();
      var committed = false;
      var nextBtnShown = false;
      // Commits in place (swaps the input for a normal row) instead of
      // calling the full rerender() - the "next +" shown below the moment
      // typing starts stays a live sibling element this way, so clicking it
      // (which blurs this input first, committing it) still lands its own
      // click right after instead of that click's target having just been
      // destroyed by a full rebuild of the whole column list.
      function commit() {
        if (committed) return;
        committed = true;
        var name = input.value.trim();
        if (!name) {
          if (input.parentNode) input.parentNode.removeChild(input);
          return;
        }
        var entry = addEntry(name);
        saveData();
        if (input.parentNode) input.parentNode.replaceChild(buildRow(entry), input);
      }
      input.addEventListener("blur", commit);
      input.addEventListener("keydown", function (e) {
        if (e.key === "Enter") { e.preventDefault(); input.blur(); }
        else if (e.key === "Escape") { committed = true; rerender(); }
      });
      // Show the next "+" the moment typing starts, instead of waiting for
      // this entry to be committed first.
      input.addEventListener("input", function () {
        if (nextBtnShown || !input.value.trim()) return;
        nextBtnShown = true;
        container.appendChild(createAddBtn());
      });
    }

    container.appendChild(createAddBtn());
  }

  function renderSiteLogAttendanceColumn(colKey) {
    var col = document.createElement("div");
    col.className = "site-log-col";

    var header = document.createElement("div");
    header.className = "site-log-col-header";
    header.textContent = tr("siteLogCol" + colKey.charAt(0).toUpperCase() + colKey.slice(1));
    col.appendChild(header);

    var body = document.createElement("div");
    body.className = "site-log-col-body";
    renderSiteLogNameList(
      body,
      function () { var log = findSiteLog(activeSheet(), activeSiteLogDate); return (log && log.attendance[colKey]) || []; },
      function (name) {
        var entry = { id: uid(), name: name };
        findOrCreateSiteLog(activeSheet(), activeSiteLogDate).attendance[colKey].push(entry);
        return entry;
      },
      function (id) {
        var log = findSiteLog(activeSheet(), activeSiteLogDate);
        if (log) log.attendance[colKey] = log.attendance[colKey].filter(function (e) { return e.id !== id; });
      },
      renderSiteLogAttendanceColumns,
      function () { return officeDirectoryNames(activeSheet(), ATTENDANCE_TO_OFFICE_FOLDER[colKey]); }
    );

    col.appendChild(body);
    return col;
  }

  function renderSiteLogAttendanceColumns() {
    siteLogAttendanceColumns.innerHTML = "";
    SITE_LOG_ATTENDANCE_COLUMNS.forEach(function (colKey) {
      siteLogAttendanceColumns.appendChild(renderSiteLogAttendanceColumn(colKey));
    });
  }

  function openSiteLogAttendanceView() {
    siteLogAttendanceProjectName.textContent = activeSheet().name;
    renderSiteLogAttendanceColumns();
    diaryView.hidden = true;
    siteLogAttendanceView.hidden = false;
  }
  function closeSiteLogAttendanceView() {
    siteLogAttendanceView.hidden = true;
    diaryView.hidden = false;
  }
  siteLogAttendanceBtn.addEventListener("click", openSiteLogAttendanceView);
  siteLogAttendanceBackBtn.addEventListener("click", closeSiteLogAttendanceView);

  function siteLogToolEntries(colKey) {
    var log = findSiteLog(activeSheet(), activeSiteLogDate);
    return (log && log.tools[colKey]) || [];
  }

  // A tool column is a growable list of qty+note rows: existing (committed)
  // entries each get their own row, plus one always-present blank row at the
  // bottom. The moment a number is typed into that blank row's qty field, a
  // fresh blank row appears right below it - so there's always an empty row
  // ready, without a separate "+" button. A row that's never filled in never
  // becomes a real entry, so it never shows up in the report/log view.
  function buildToolEntryRow(colKey, entry, body) {
    var row = document.createElement("div");
    row.className = "site-log-tool-value-row";

    var qtyInput = document.createElement("input");
    qtyInput.type = "number";
    qtyInput.min = "0";
    qtyInput.inputMode = "numeric";
    qtyInput.className = "site-log-tool-qty-input";

    var noteInput = document.createElement("input");
    noteInput.type = "text";
    noteInput.className = "site-log-tool-note-input";

    row.appendChild(qtyInput);
    row.appendChild(noteInput);

    if (entry) {
      qtyInput.value = entry.qty || "";
      noteInput.value = entry.note || "";
      function save() {
        entry.qty = qtyInput.value.trim();
        entry.note = noteInput.value.trim();
        saveData();
      }
      qtyInput.addEventListener("change", save);
      noteInput.addEventListener("change", save);

      var removeBtn = document.createElement("button");
      removeBtn.type = "button";
      removeBtn.className = "site-log-entry-remove";
      removeBtn.textContent = "✕";
      removeBtn.addEventListener("click", function () {
        var list = siteLogToolEntries(colKey);
        var idx = list.indexOf(entry);
        if (idx !== -1) list.splice(idx, 1);
        saveData();
        row.remove();
      });
      row.appendChild(removeBtn);
    } else {
      var nextRowShown = false;
      var committed = false;
      qtyInput.addEventListener("input", function () {
        if (nextRowShown || !qtyInput.value.trim()) return;
        nextRowShown = true;
        body.appendChild(buildToolEntryRow(colKey, null, body));
      });
      row.addEventListener("focusout", function (e) {
        if (committed || row.contains(e.relatedTarget)) return;
        var qty = qtyInput.value.trim();
        var note = noteInput.value.trim();
        if (!qty && !note) return;
        committed = true;
        var liveLog = findOrCreateSiteLog(activeSheet(), activeSiteLogDate);
        if (!Array.isArray(liveLog.tools[colKey])) liveLog.tools[colKey] = [];
        var newEntry = { id: uid(), qty: qty, note: note };
        liveLog.tools[colKey].push(newEntry);
        saveData();
        if (!nextRowShown) { nextRowShown = true; body.appendChild(buildToolEntryRow(colKey, null, body)); }
        body.replaceChild(buildToolEntryRow(colKey, newEntry, body), row);
      });
    }

    return row;
  }

  function renderSiteLogToolsColumn(colKey) {
    var col = document.createElement("div");
    col.className = "site-log-col";

    var header = document.createElement("div");
    header.className = "site-log-col-header";
    header.textContent = tr("siteLogCol" + colKey.charAt(0).toUpperCase() + colKey.slice(1));
    col.appendChild(header);

    var body = document.createElement("div");
    body.className = "site-log-col-body";
    siteLogToolEntries(colKey).forEach(function (entry) {
      body.appendChild(buildToolEntryRow(colKey, entry, body));
    });
    body.appendChild(buildToolEntryRow(colKey, null, body));

    col.appendChild(body);
    return col;
  }

  function renderSiteLogToolsColumns() {
    siteLogToolsColumns.innerHTML = "";
    SITE_LOG_TOOLS_COLUMNS.forEach(function (colKey) {
      siteLogToolsColumns.appendChild(renderSiteLogToolsColumn(colKey));
    });
  }

  function openSiteLogToolsView() {
    siteLogToolsProjectName.textContent = activeSheet().name;
    renderSiteLogToolsColumns();
    diaryView.hidden = true;
    siteLogToolsView.hidden = false;
  }
  function closeSiteLogToolsView() {
    siteLogToolsView.hidden = true;
    diaryView.hidden = false;
  }
  siteLogToolsBtn.addEventListener("click", openSiteLogToolsView);
  siteLogToolsBackBtn.addEventListener("click", closeSiteLogToolsView);

  function renderSiteLogContractorsList() {
    renderSiteLogNameList(
      siteLogContractorsList,
      function () { var log = findSiteLog(activeSheet(), activeSiteLogDate); return (log && log.contractors) || []; },
      function (name) {
        var entry = { id: uid(), name: name };
        findOrCreateSiteLog(activeSheet(), activeSiteLogDate).contractors.push(entry);
        return entry;
      },
      function (id) {
        var log = findSiteLog(activeSheet(), activeSiteLogDate);
        if (log) log.contractors = log.contractors.filter(function (e) { return e.id !== id; });
      },
      renderSiteLogContractorsList,
      function () { return officeDirectoryNames(activeSheet(), "crews"); }
    );
  }

  function openSiteLogContractorsView() {
    siteLogContractorsProjectName.textContent = activeSheet().name;
    renderSiteLogContractorsList();
    diaryView.hidden = true;
    siteLogContractorsView.hidden = false;
  }
  function closeSiteLogContractorsView() {
    siteLogContractorsView.hidden = true;
    diaryView.hidden = false;
  }
  siteLogContractorsBtn.addEventListener("click", openSiteLogContractorsView);
  siteLogContractorsBackBtn.addEventListener("click", closeSiteLogContractorsView);

  function renderSiteLogWorksList() {
    siteLogWorksList.innerHTML = "";
    var sheet = activeSheet();
    var log = findSiteLog(sheet, activeSiteLogDate);
    var entries = (log && log.works) || [];

    entries.forEach(function (entry) {
      var wrap = document.createElement("div");
      wrap.className = "site-log-work-entry";

      var row = document.createElement("div");
      row.className = "site-log-work-row";
      var textSpan = document.createElement("span");
      textSpan.className = "site-log-work-text";
      textSpan.textContent = entry.text;
      row.appendChild(textSpan);
      var removeBtn = document.createElement("button");
      removeBtn.type = "button";
      removeBtn.className = "site-log-entry-remove";
      removeBtn.textContent = "✕";
      removeBtn.addEventListener("click", function () {
        var liveLog = findSiteLog(activeSheet(), activeSiteLogDate);
        if (!liveLog) return;
        var target = liveLog.works.find(function (e) { return e.id === entry.id; });
        var removePromise = (target && target.attachment && supabaseClient)
          ? supabaseClient.storage.from(LIBRARY_BUCKET).remove([target.attachment.path]).catch(function () {})
          : Promise.resolve();
        removePromise.then(function () {
          liveLog.works = liveLog.works.filter(function (e) { return e.id !== entry.id; });
          saveData();
          renderSiteLogWorksList();
        });
      });
      row.appendChild(removeBtn);
      wrap.appendChild(row);

      if (entry.attachment) {
        var previewWrap = document.createElement("div");
        previewWrap.className = "site-log-work-attachment-preview";
        if (isImageFile(entry.attachment)) {
          var thumb = document.createElement("img");
          thumb.className = "site-log-work-attachment-thumb";
          thumb.src = entry.attachment.url;
          thumb.alt = "";
          previewWrap.appendChild(thumb);
        } else {
          var icon = document.createElement("span");
          icon.textContent = "\u{1F4CE}";
          previewWrap.appendChild(icon);
        }
        var link = document.createElement("a");
        link.className = "site-log-work-attachment-name";
        link.textContent = entry.attachment.name;
        link.href = entry.attachment.url;
        link.target = "_blank";
        link.rel = "noopener";
        previewWrap.appendChild(link);
        var removeAttachBtn = document.createElement("button");
        removeAttachBtn.type = "button";
        removeAttachBtn.className = "site-log-work-attachment-remove";
        removeAttachBtn.textContent = "✕";
        removeAttachBtn.addEventListener("click", function () {
          var liveLog = findSiteLog(activeSheet(), activeSiteLogDate);
          var target = liveLog && liveLog.works.find(function (e) { return e.id === entry.id; });
          if (!target || !target.attachment) return;
          var path = target.attachment.path;
          var removePromise = supabaseClient ? supabaseClient.storage.from(LIBRARY_BUCKET).remove([path]).catch(function () {}) : Promise.resolve();
          removePromise.then(function () {
            target.attachment = null;
            saveData();
            renderSiteLogWorksList();
          });
        });
        previewWrap.appendChild(removeAttachBtn);
        wrap.appendChild(previewWrap);
      } else {
        var attachRow = document.createElement("div");
        attachRow.className = "site-log-work-attach-row";
        var cameraBtn = document.createElement("button");
        cameraBtn.type = "button";
        cameraBtn.className = "site-log-work-attach-btn";
        cameraBtn.textContent = "\u{1F4F7} " + tr("imagePopupCamera");
        cameraBtn.addEventListener("click", function () {
          siteLogWorksPendingEntryId = entry.id;
          siteLogWorksCameraInput.value = "";
          siteLogWorksCameraInput.click();
        });
        attachRow.appendChild(cameraBtn);
        var attachBtn = document.createElement("button");
        attachBtn.type = "button";
        attachBtn.className = "site-log-work-attach-btn";
        attachBtn.textContent = "\u{1F4CE}";
        attachBtn.title = tr("chatAttachBtnTitle");
        attachBtn.addEventListener("click", function () {
          siteLogWorksPendingEntryId = entry.id;
          siteLogWorksFileInput.value = "";
          siteLogWorksFileInput.click();
        });
        attachRow.appendChild(attachBtn);
        wrap.appendChild(attachRow);
      }

      siteLogWorksList.appendChild(wrap);
    });

    function createWorksAddBtn() {
      var addBtn = document.createElement("button");
      addBtn.type = "button";
      addBtn.className = "site-log-add-btn";
      var addBtnImg = document.createElement("img");
      addBtnImg.src = "tasks-plus-icon.webp";
      addBtnImg.alt = "+";
      addBtn.appendChild(addBtnImg);
      addBtn.addEventListener("click", function () { activateWorksAddBtn(addBtn); });
      return addBtn;
    }

    function activateWorksAddBtn(addBtn) {
      var input = document.createElement("input");
      input.type = "text";
      input.className = "site-log-add-input";
      input.maxLength = 200;
      siteLogWorksList.replaceChild(input, addBtn);
      input.focus();
      var committed = false;
      var nextBtnShown = false;
      function commit() {
        if (committed) return;
        committed = true;
        var text = input.value.trim();
        if (text) {
          var liveLog = findOrCreateSiteLog(activeSheet(), activeSiteLogDate);
          liveLog.works.push({ id: uid(), text: text, attachment: null });
          saveData();
        }
        renderSiteLogWorksList();
      }
      input.addEventListener("blur", commit);
      input.addEventListener("keydown", function (e) {
        if (e.key === "Enter") { e.preventDefault(); input.blur(); }
        else if (e.key === "Escape") { committed = true; renderSiteLogWorksList(); }
      });
      input.addEventListener("input", function () {
        if (nextBtnShown || !input.value.trim()) return;
        nextBtnShown = true;
        siteLogWorksList.appendChild(createWorksAddBtn());
      });
    }

    siteLogWorksList.appendChild(createWorksAddBtn());
  }

  // Shared by both the camera input (a fresh photo, accept="image/*"
  // capture="environment") and the plain file input (any file, picked
  // from the gallery/file browser) - same upload/attach logic either way.
  function uploadWorksAttachment(file) {
    var entryId = siteLogWorksPendingEntryId;
    siteLogWorksPendingEntryId = null;
    if (!file || !entryId || !supabaseClient) return;
    var sheet = activeSheet();
    var path = sheet.id + "/site-logs/" + activeSiteLogDate + "/" + uid() + "-" + safeStorageFileName(file.name);
    supabaseClient.storage.from(LIBRARY_BUCKET).upload(path, file).then(function (result) {
      if (result.error) throw result.error;
      return resolveFileUrl(path);
    }).then(function (url) {
      var liveLog = findSiteLog(activeSheet(), activeSiteLogDate);
      var entry = liveLog && liveLog.works.find(function (e) { return e.id === entryId; });
      if (entry) {
        entry.attachment = { name: file.name, path: path, url: url, type: file.type || "" };
        saveData();
        renderSiteLogWorksList();
      }
    }).catch(function (err) {
      console.error("site log work attachment upload failed:", err);
      alert(tr("libraryUploadError"));
    });
  }
  siteLogWorksFileInput.addEventListener("change", function () {
    uploadWorksAttachment(siteLogWorksFileInput.files && siteLogWorksFileInput.files[0]);
  });
  siteLogWorksCameraInput.addEventListener("change", function () {
    uploadWorksAttachment(siteLogWorksCameraInput.files && siteLogWorksCameraInput.files[0]);
  });

  function openSiteLogWorksView() {
    siteLogWorksProjectName.textContent = activeSheet().name;
    renderSiteLogWorksList();
    diaryView.hidden = true;
    siteLogWorksView.hidden = false;
  }
  function closeSiteLogWorksView() {
    siteLogWorksView.hidden = true;
    diaryView.hidden = false;
  }
  siteLogWorksBtn.addEventListener("click", openSiteLogWorksView);
  siteLogWorksBackBtn.addEventListener("click", closeSiteLogWorksView);

  function renderSiteLogProcurementRows() {
    siteLogProcurementRows.innerHTML = "";
    var log = findSiteLog(activeSheet(), activeSiteLogDate);
    var entries = (log && log.procurement) || [];

    entries.forEach(function (entry) {
      var row = document.createElement("div");
      row.className = "site-log-procurement-row";

      // Read-only here - only Head Office can mark a row purchased (see
      // officeProcurementList below); this just reflects that state once
      // it's set, via the row's own synced data, same as everything else
      // on this row.
      if (entry.purchased) {
        var mark = document.createElement("span");
        mark.className = "purchased-mark purchased";
        row.appendChild(mark);
      }

      var itemInput = document.createElement("input");
      itemInput.type = "text";
      itemInput.className = "site-log-procurement-item";
      itemInput.maxLength = 80;
      itemInput.value = entry.item;
      itemInput.placeholder = tr("siteLogColItem");
      itemInput.addEventListener("blur", function () {
        entry.item = itemInput.value.trim();
        saveData();
      });
      row.appendChild(itemInput);

      var quantityInput = document.createElement("input");
      quantityInput.type = "text";
      quantityInput.className = "site-log-procurement-quantity";
      quantityInput.maxLength = 30;
      quantityInput.value = entry.quantity;
      quantityInput.placeholder = tr("siteLogColQuantity");
      quantityInput.addEventListener("blur", function () {
        entry.quantity = quantityInput.value.trim();
        saveData();
      });
      row.appendChild(quantityInput);

      var supplierInput = document.createElement("input");
      supplierInput.type = "text";
      supplierInput.className = "site-log-procurement-supplier";
      supplierInput.maxLength = 80;
      supplierInput.value = entry.supplier;
      supplierInput.placeholder = tr("siteLogColSupplier");
      supplierInput.addEventListener("blur", function () {
        entry.supplier = supplierInput.value.trim();
        saveData();
      });
      row.appendChild(supplierInput);

      var removeBtn = document.createElement("button");
      removeBtn.type = "button";
      removeBtn.className = "site-log-procurement-row-remove";
      removeBtn.textContent = "✕";
      removeBtn.addEventListener("click", function () {
        var liveLog = findSiteLog(activeSheet(), activeSiteLogDate);
        if (!liveLog) return;
        liveLog.procurement = liveLog.procurement.filter(function (e) { return e.id !== entry.id; });
        saveData();
        renderSiteLogProcurementRows();
      });
      row.appendChild(removeBtn);

      siteLogProcurementRows.appendChild(row);
    });

    var addBtn = document.createElement("button");
    addBtn.type = "button";
    addBtn.className = "site-log-add-btn";
    var addBtnImg = document.createElement("img");
    addBtnImg.src = "tasks-plus-icon.webp";
    addBtnImg.alt = "+";
    addBtn.appendChild(addBtnImg);
    addBtn.addEventListener("click", function () {
      var liveLog = findOrCreateSiteLog(activeSheet(), activeSiteLogDate);
      liveLog.procurement.push({ id: uid(), item: "", quantity: "", supplier: "" });
      saveData();
      renderSiteLogProcurementRows();
      var lastRow = siteLogProcurementRows.lastElementChild;
      var firstInput = lastRow && lastRow.querySelector("input");
      if (firstInput) firstInput.focus();
    });
    siteLogProcurementRows.appendChild(addBtn);
  }

  function openSiteLogProcurementView() {
    siteLogProcurementProjectName.textContent = activeSheet().name;
    renderSiteLogProcurementRows();
    diaryView.hidden = true;
    siteLogProcurementView.hidden = false;
  }
  function closeSiteLogProcurementView() {
    siteLogProcurementView.hidden = true;
    diaryView.hidden = false;
  }
  siteLogProcurementBtn.addEventListener("click", openSiteLogProcurementView);
  siteLogProcurementBackBtn.addEventListener("click", closeSiteLogProcurementView);

  function copyPreviousSiteLogCategory(applyFn, onDone) {
    var sheet = activeSheet();
    var prevLog = findPreviousSiteLog(sheet, activeSiteLogDate);
    if (!prevLog) { showToast(tr("siteLogNoPreviousLog")); return; }
    askConfirm(tr("siteLogCopyPrevConfirm"), function () {
      var liveLog = findOrCreateSiteLog(sheet, activeSiteLogDate);
      applyFn(liveLog, prevLog);
      saveData();
      onDone();
    });
  }

  siteLogAttendanceCopyPrevBtn.addEventListener("click", function () {
    copyPreviousSiteLogCategory(function (liveLog, prevLog) {
      var copied = {};
      SITE_LOG_ATTENDANCE_COLUMNS.forEach(function (col) {
        copied[col] = (prevLog.attendance[col] || []).map(function (e) { return { id: uid(), name: e.name }; });
      });
      liveLog.attendance = copied;
    }, renderSiteLogAttendanceColumns);
  });

  siteLogToolsCopyPrevBtn.addEventListener("click", function () {
    copyPreviousSiteLogCategory(function (liveLog, prevLog) {
      var copied = {};
      SITE_LOG_TOOLS_COLUMNS.forEach(function (col) {
        copied[col] = (prevLog.tools[col] || []).map(function (e) {
          return { id: uid(), qty: e.qty || "", note: e.note || "" };
        });
      });
      liveLog.tools = copied;
    }, renderSiteLogToolsColumns);
  });

  siteLogContractorsCopyPrevBtn.addEventListener("click", function () {
    copyPreviousSiteLogCategory(function (liveLog, prevLog) {
      liveLog.contractors = (prevLog.contractors || []).map(function (e) { return { id: uid(), name: e.name }; });
    }, renderSiteLogContractorsList);
  });

  // Attachments aren't copied - a copied row would share the same Storage
  // path as the original, and removing either row's attachment later would
  // delete the file out from under the other, so only the text carries over.
  siteLogWorksCopyPrevBtn.addEventListener("click", function () {
    copyPreviousSiteLogCategory(function (liveLog, prevLog) {
      liveLog.works = (prevLog.works || []).map(function (e) { return { id: uid(), text: e.text, attachment: null }; });
    }, renderSiteLogWorksList);
  });

  // "Sending" the order means generating the same procurement PDF the
  // share button produces, filing a copy in the library's dedicated
  // "Procurement orders" folder, and (best-effort) handing it to WhatsApp -
  // no real dispatch to a supplier's own system.
  // Marks this date's log as "sent" for one report category, directly on
  // the siteLogs array entry rather than some new top-level sheet field -
  // siteLogs already rides the existing shared-sheet sync/merge path
  // (saveData() -> saveSharedSheets()) with no extra plumbing needed, and
  // writing the same field again just overwrites it (one log per date, so
  // there's nowhere for a duplicate to even go). Head Office's combined
  // report only includes a project if this matches today's date (see
  // buildOfficeCombinedReportElement below).
  function markSiteLogReportSent(sheet, dateISO, fieldName) {
    var log = findOrCreateSiteLog(sheet, dateISO);
    log[fieldName] = dateISO;
    saveData();
  }

  siteLogProcurementOrderBtn.addEventListener("click", function () {
    if (!activeSiteLogDate) return;
    var sheet = activeSheet();
    var dateISO = activeSiteLogDate;
    var originalText = siteLogProcurementOrderBtn.textContent;
    siteLogProcurementOrderBtn.disabled = true;
    siteLogProcurementOrderBtn.textContent = "⏳";
    var fileName = tr("procurementOrderFileNamePrefix") + " " + sheet.name + " " + isoToFileNameDate(dateISO) + ".pdf";
    buildPdfBlobFromElement(buildSiteLogProcurementPdfElement(dateISO), fileName).then(function (result) {
      return uploadProcurementOrderPdfToLibrary(sheet, result.blob, result.fileName).then(function () {
        markSiteLogReportSent(sheet, dateISO, "procurementSentDate");
        showToast(tr("procurementOrderSentMsg"));
      });
    }).catch(function (err) {
      console.error(err);
    }).then(function () {
      siteLogProcurementOrderBtn.disabled = false;
      siteLogProcurementOrderBtn.textContent = originalText;
    });
  });

  // Same pattern as the procurement order button, for the attendance log.
  siteLogAttendanceOrderBtn.addEventListener("click", function () {
    if (!activeSiteLogDate) return;
    var sheet = activeSheet();
    var dateISO = activeSiteLogDate;
    var originalText = siteLogAttendanceOrderBtn.textContent;
    siteLogAttendanceOrderBtn.disabled = true;
    siteLogAttendanceOrderBtn.textContent = "⏳";
    var fileName = tr("siteLogAttendanceReportFileNamePrefix") + " " + sheet.name + " " + isoToFileNameDate(dateISO) + ".pdf";
    buildPdfBlobFromElement(buildSiteLogAttendancePdfElement(dateISO), fileName).then(function (result) {
      return uploadAttendanceReportPdfToLibrary(sheet, result.blob, result.fileName).then(function () {
        markSiteLogReportSent(sheet, dateISO, "attendanceSentDate");
        showToast(tr("attendanceReportSentMsg"));
      });
    }).catch(function (err) {
      console.error(err);
    }).then(function () {
      siteLogAttendanceOrderBtn.disabled = false;
      siteLogAttendanceOrderBtn.textContent = originalText;
    });
  });

  // Same pattern again, for the tools log.
  siteLogToolsOrderBtn.addEventListener("click", function () {
    if (!activeSiteLogDate) return;
    var sheet = activeSheet();
    var dateISO = activeSiteLogDate;
    var originalText = siteLogToolsOrderBtn.textContent;
    siteLogToolsOrderBtn.disabled = true;
    siteLogToolsOrderBtn.textContent = "⏳";
    var fileName = tr("siteLogToolsReportFileNamePrefix") + " " + sheet.name + " " + isoToFileNameDate(dateISO) + ".pdf";
    buildPdfBlobFromElement(buildSiteLogToolsPdfElement(dateISO), fileName).then(function (result) {
      return uploadToolsReportPdfToLibrary(sheet, result.blob, result.fileName).then(function () {
        markSiteLogReportSent(sheet, dateISO, "toolsSentDate");
        showToast(tr("toolsReportSentMsg"));
      });
    }).catch(function (err) {
      console.error(err);
    }).then(function () {
      siteLogToolsOrderBtn.disabled = false;
      siteLogToolsOrderBtn.textContent = originalText;
    });
  });

  function renderSheetReportsList() {
    sheetReportsList.innerHTML = "";
    var sheet = activeSheet();
    var reports = (sheet.reports || []).slice().sort(function (a, b) { return b.createdAt - a.createdAt; });
    if (!reports.length) {
      var empty = document.createElement("div");
      empty.className = "sheet-reports-empty";
      empty.textContent = tr("reportsListEmpty");
      sheetReportsList.appendChild(empty);
    } else {
      reports.forEach(function (report) {
        var item = document.createElement("button");
        item.type = "button";
        item.className = "report-list-item";
        var typeLabel = report.type === "meeting" ? tr("reportTypeMeeting") : tr("reportTypeTour");
        var titleEl = document.createElement("span");
        titleEl.className = "report-list-item-title";
        titleEl.textContent = report.title || typeLabel;
        var metaEl = document.createElement("span");
        metaEl.className = "report-list-item-meta";
        metaEl.textContent = typeLabel + " · " + isoToFullDisplay(report.date);
        item.appendChild(titleEl);
        item.appendChild(metaEl);

        var reportLongPressFired = false;
        item.addEventListener("click", function () {
          if (reportLongPressFired) { reportLongPressFired = false; return; }
          openReportView(report.id);
        });

        var reportPressStartX = 0, reportPressStartY = 0;
        var startReportPress = function (e) {
          var point = e.touches ? e.touches[0] : e;
          reportPressStartX = point.clientX;
          reportPressStartY = point.clientY;
          reportLongPressFired = false;
          clearTimeout(longPressTimer);
          longPressTimer = setTimeout(function () {
            reportLongPressFired = true;
            openReportActionModal(report.id);
          }, 1000);
        };
        var cancelReportPress = function () {
          clearTimeout(longPressTimer);
        };
        var moveReportPress = function (e) {
          var point = e.touches ? e.touches[0] : e;
          if (Math.abs(point.clientX - reportPressStartX) > 10 || Math.abs(point.clientY - reportPressStartY) > 10) {
            cancelReportPress();
          }
        };
        item.addEventListener("mousedown", startReportPress);
        item.addEventListener("mouseup", cancelReportPress);
        item.addEventListener("mouseleave", cancelReportPress);
        item.addEventListener("mousemove", moveReportPress);
        item.addEventListener("touchstart", startReportPress, { passive: true });
        item.addEventListener("touchend", cancelReportPress);
        item.addEventListener("touchmove", moveReportPress, { passive: true });

        sheetReportsList.appendChild(item);
      });
    }
    var addBtn = document.createElement("button");
    addBtn.type = "button";
    addBtn.className = "sheet-reports-add-btn";
    var addBtnImg = document.createElement("img");
    addBtnImg.src = "tasks-plus-icon.webp";
    addBtnImg.alt = "+";
    addBtn.appendChild(addBtnImg);
    addBtn.title = tr("addBtnTitle");
    addBtn.addEventListener("click", function () {
      reportTypeOverlay.hidden = false;
    });
    sheetReportsList.appendChild(addBtn);
  }

  reportFabBtn.addEventListener("click", function () {
    state.viewMode = "reports";
    state.menuOpen = false;
    render();
  });
  tasksFabBtn.addEventListener("click", function () {
    exitArchiveView();
    state.viewMode = "tasks";
    state.menuOpen = false;
    render();
  });

  // Head Office mode's one combined report, covering every active shared
  // project at once instead of one project's own site log - built from the
  // exact same per-category table builders and the same multi-section/one-
  // PDF technique as the periodic site-log report (buildSiteLogPeriodicPdfElement
  // above), just looping over projects instead of over one project's dates.
  var officeReportTypeView = document.getElementById("officeReportTypeView");
  var officeReportTypeBackBtn = document.getElementById("officeReportTypeBackBtn");
  var officeReportAttendanceBtn = document.getElementById("officeReportAttendanceBtn");
  var officeReportProcurementBtn = document.getElementById("officeReportProcurementBtn");
  var officeReportToolsBtn = document.getElementById("officeReportToolsBtn");

  officeReportsBtn.addEventListener("click", function () {
    state.menuOpen = false;
    officeReportTypeView.hidden = false;
    render();
  });
  function closeOfficeReportTypeModal() {
    officeReportTypeView.hidden = true;
  }
  officeReportTypeBackBtn.addEventListener("click", closeOfficeReportTypeModal);

  // findMatches/matchColumns/rowToCells are only used by the name-based
  // monthly/custom reports (attendance and tools) - procurement has no such
  // report, it stays daily-only (its "daily" equivalent is the interactive
  // purchased-marking list built further below).
  var OFFICE_REPORT_KINDS = {
    attendance: {
      titleKey: "siteLogAttendance",
      tableFn: buildAttendanceTableElement,
      sentField: "attendanceSentDate",
      findMatches: function (log, nameLower) {
        var matches = [];
        SITE_LOG_ATTENDANCE_COLUMNS.forEach(function (col) {
          ((log.attendance && log.attendance[col]) || []).forEach(function (p) {
            if (p && p.name && p.name.toLowerCase().indexOf(nameLower) !== -1) matches.push({ col: col });
          });
        });
        return matches;
      },
      matchColumns: ["officeReportColDate", "officeReportColProject", "officeReportColRole"],
      rowToCells: function (r) { return [isoToFullDisplay(r.date), r.project, siteLogColLabel(r.col)]; }
    },
    // Procurement has no person/name field (just item, quantity, supplier,
    // note) so its monthly/custom reports can't be a name lookup like
    // attendance/tools - noName routes them through buildOfficeRangeReportElement
    // instead, which just combines every sent log in the date range with no
    // filtering.
    procurement: { titleKey: "siteLogProcurement", tableFn: buildProcurementTableElement, sentField: "procurementSentDate", noName: true },
    tools: {
      titleKey: "siteLogTools",
      tableFn: buildToolsTableElement,
      sentField: "toolsSentDate",
      // The operator's name is written into the tool entry's free-text note
      // field - there's no dedicated "operator" field, that's just where
      // this gets recorded in practice.
      findMatches: function (log, nameLower) {
        var matches = [];
        SITE_LOG_TOOLS_COLUMNS.forEach(function (col) {
          ((log.tools && log.tools[col]) || []).forEach(function (e) {
            if (e && e.note && e.note.toLowerCase().indexOf(nameLower) !== -1) matches.push({ col: col, qty: e.qty });
          });
        });
        return matches;
      },
      matchColumns: ["officeReportColDate", "officeReportColProject", "officeReportColTool", "siteLogColQuantity"],
      rowToCells: function (r) { return [isoToFullDisplay(r.date), r.project, siteLogColLabel(r.col), r.qty || ""]; }
    }
  };

