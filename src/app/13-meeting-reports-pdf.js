  function closeReportTypeModal() {
    reportTypeOverlay.hidden = true;
    pendingReportDraft = null;
  }
  function chooseReportType(type) {
    pendingReportDraft = { type: type };
    reportTypeOverlay.hidden = true;
    reportTitleInput.value = "";
    reportTitleOverlay.hidden = false;
    reportTitleInput.focus();
  }
  function openReportEditFlow(reportId) {
    var report = findReport(reportId);
    if (!report) return;
    pendingReportDraft = { type: report.type, editId: report.id };
    reportTitleInput.value = report.title || "";
    reportTitleOverlay.hidden = false;
    reportTitleInput.focus();
  }
  reportTypeMeetingBtn.addEventListener("click", function () { chooseReportType("meeting"); });
  reportTypeTourBtn.addEventListener("click", function () { chooseReportType("tour"); });
  reportTypeCancelBtn.addEventListener("click", closeReportTypeModal);
  reportTypeOverlay.addEventListener("click", function (e) {
    if (e.target === reportTypeOverlay) closeReportTypeModal();
  });

  function closeReportTitleModal() {
    reportTitleOverlay.hidden = true;
    pendingReportDraft = null;
  }
  reportTitleSaveBtn.addEventListener("click", function () {
    if (!pendingReportDraft) return;
    pendingReportDraft.title = reportTitleInput.value.trim();
    reportTitleOverlay.hidden = true;
    var existingReport = pendingReportDraft.editId ? findReport(pendingReportDraft.editId) : null;
    reportDateInput.value = existingReport ? existingReport.date : todayISO();
    reportDateOverlay.hidden = false;
  });
  reportTitleCancelBtn.addEventListener("click", closeReportTitleModal);
  reportTitleOverlay.addEventListener("click", function (e) {
    if (e.target === reportTitleOverlay) closeReportTitleModal();
  });
  reportTitleInput.addEventListener("keydown", function (e) {
    e.stopPropagation();
    if (e.key === "Enter") reportTitleSaveBtn.click();
    if (e.key === "Escape") closeReportTitleModal();
  });

  function closeReportDateModal() {
    reportDateOverlay.hidden = true;
    pendingReportDraft = null;
  }
  reportDateSaveBtn.addEventListener("click", function () {
    if (!pendingReportDraft) return;
    pendingReportDraft.date = reportDateInput.value || todayISO();
    reportDateOverlay.hidden = true;
    var existingReport = pendingReportDraft.editId ? findReport(pendingReportDraft.editId) : null;
    var existingNames = existingReport && existingReport.participants
      ? existingReport.participants.split(",").map(function (s) { return s.trim(); })
      : [];
    resetParticipantsList(existingNames);
    reportParticipantsOverlay.hidden = false;
  });
  reportDateCancelBtn.addEventListener("click", closeReportDateModal);
  reportDateOverlay.addEventListener("click", function (e) {
    if (e.target === reportDateOverlay) closeReportDateModal();
  });

  function closeReportParticipantsModal() {
    reportParticipantsOverlay.hidden = true;
    pendingReportDraft = null;
  }
  reportParticipantsSaveBtn.addEventListener("click", function () {
    if (!pendingReportDraft) return;
    var names = Array.prototype.slice.call(reportParticipantsList.querySelectorAll("input"))
      .map(function (input) { return input.value.trim(); })
      .filter(function (name) { return name; });
    var participantsStr = names.join(", ");
    var reportId;
    if (pendingReportDraft.editId) {
      var existing = findReport(pendingReportDraft.editId);
      if (existing) {
        existing.title = pendingReportDraft.title;
        existing.date = pendingReportDraft.date || todayISO();
        existing.participants = participantsStr;
      }
      reportId = pendingReportDraft.editId;
    } else {
      var report = {
        id: uid(),
        type: pendingReportDraft.type,
        title: pendingReportDraft.title,
        participants: participantsStr,
        date: pendingReportDraft.date || todayISO(),
        createdAt: Date.now(),
        rows: []
      };
      activeSheet().reports.push(report);
      reportId = report.id;
    }
    saveData();
    pendingReportDraft = null;
    reportParticipantsOverlay.hidden = true;
    openReportView(reportId);
  });
  reportParticipantsCancelBtn.addEventListener("click", closeReportParticipantsModal);
  reportParticipantsOverlay.addEventListener("click", function (e) {
    if (e.target === reportParticipantsOverlay) closeReportParticipantsModal();
  });

  function closePriorityPopup() {
    var existing = document.querySelector(".report-priority-popup");
    if (existing) existing.remove();
    openPriorityPopupRowId = null;
  }

  function openReportView(reportId) {
    activeReportId = reportId;
    editingReportCell = null;
    closePriorityPopup();
    closeImagePopup();
    renderReportView();
    reportView.hidden = false;
  }

  function closeReportView() {
    reportView.hidden = true;
    activeReportId = null;
    editingReportCell = null;
    closePriorityPopup();
    closeImagePopup();
    if (state.viewMode === "reports") renderSheetReportsList();
  }
  reportBackBtn.addEventListener("click", closeReportView);
  reportEditBtn.addEventListener("click", function () {
    if (activeReportId) openReportEditFlow(activeReportId);
  });
  reportCloseBtn.addEventListener("click", closeReport);

  var renderReportViewDepth = 0;
  function renderReportView() {
    if (renderReportViewDepth > 0) return;
    renderReportViewDepth++;
    try {
      renderReportViewInner();
    } finally {
      renderReportViewDepth--;
    }
  }
  function renderReportViewInner() {
    var report = findReport(activeReportId);
    if (!report) { closeReportView(); return; }
    scheduleReportPdfCacheRefresh(report);
    var typeLabel = report.type === "meeting" ? tr("reportTypeMeeting") : tr("reportTypeTour");
    reportHeadTitle.textContent = report.title || typeLabel;
    var metaText = typeLabel + " · " + isoToFullDisplay(report.date);
    if (report.participants) metaText += " — " + tr("reportShareParticipantsLabel") + report.participants;
    reportMeta.textContent = metaText;

    reportTableBody.innerHTML = "";
    report.rows.forEach(function (row, index) {
      var rowEl = document.createElement("tr");

      var numTd = document.createElement("td");
      numTd.textContent = String(index + 1);
      (function (rowId) {
        var rowLongPressFired = false;
        var rowPressStartX = 0, rowPressStartY = 0;
        var startRowPress = function (e) {
          var point = e.touches ? e.touches[0] : e;
          rowPressStartX = point.clientX;
          rowPressStartY = point.clientY;
          rowLongPressFired = false;
          clearTimeout(longPressTimer);
          longPressTimer = setTimeout(function () {
            rowLongPressFired = true;
            openReportRowActionModal(rowId);
          }, 1000);
        };
        var cancelRowPress = function () { clearTimeout(longPressTimer); };
        var moveRowPress = function (e) {
          var point = e.touches ? e.touches[0] : e;
          if (Math.abs(point.clientX - rowPressStartX) > 10 || Math.abs(point.clientY - rowPressStartY) > 10) {
            cancelRowPress();
          }
        };
        numTd.addEventListener("mousedown", startRowPress);
        numTd.addEventListener("mouseup", cancelRowPress);
        numTd.addEventListener("mouseleave", cancelRowPress);
        numTd.addEventListener("mousemove", moveRowPress);
        numTd.addEventListener("touchstart", startRowPress, { passive: true });
        numTd.addEventListener("touchend", cancelRowPress);
        numTd.addEventListener("touchmove", moveRowPress, { passive: true });
      })(row.id);
      rowEl.appendChild(numTd);

      var taskTd = document.createElement("td");
      taskTd.className = "report-col-task";
      if (editingReportCell && editingReportCell.rowId === row.id && editingReportCell.field === "task") {
        var taskInputEl = document.createElement("input");
        taskInputEl.type = "text";
        taskInputEl.className = "report-cell-input";
        taskInputEl.value = row.task || "";
        taskInputEl.maxLength = 200;
        taskTd.appendChild(taskInputEl);
        setTimeout(function () { taskInputEl.focus(); }, 0);
        var myTaskEditRef = editingReportCell;
        var commitTask = function () {
          row.task = taskInputEl.value.trim();
          if (editingReportCell !== myTaskEditRef) return;
          editingReportCell = null;
          saveData();
          renderReportView();
        };
        taskInputEl.addEventListener("blur", commitTask);
        taskInputEl.addEventListener("keydown", function (e) {
          e.stopPropagation();
          if (e.key === "Enter") commitTask();
          if (e.key === "Escape") { editingReportCell = null; renderReportView(); }
        });
      } else {
        var taskBtn = document.createElement("button");
        taskBtn.type = "button";
        taskBtn.className = "report-cell-btn";
        taskBtn.textContent = row.task || "";
        taskBtn.addEventListener("click", function () {
          editingReportCell = { rowId: row.id, field: "task" };
          renderReportView();
        });
        taskTd.appendChild(taskBtn);
      }
      rowEl.appendChild(taskTd);

      var respTd = document.createElement("td");
      if (editingReportCell && editingReportCell.rowId === row.id && editingReportCell.field === "responsible") {
        var respInputEl = document.createElement("input");
        respInputEl.type = "text";
        respInputEl.className = "report-cell-input";
        respInputEl.value = row.responsible || "";
        respInputEl.maxLength = 100;
        respTd.appendChild(respInputEl);
        setTimeout(function () { respInputEl.focus(); }, 0);
        var myRespEditRef = editingReportCell;
        var commitResp = function () {
          row.responsible = respInputEl.value.trim();
          if (editingReportCell !== myRespEditRef) return;
          editingReportCell = null;
          saveData();
          renderReportView();
        };
        respInputEl.addEventListener("blur", commitResp);
        respInputEl.addEventListener("keydown", function (e) {
          e.stopPropagation();
          if (e.key === "Enter") commitResp();
          if (e.key === "Escape") { editingReportCell = null; renderReportView(); }
        });
      } else {
        var respBtn = document.createElement("button");
        respBtn.type = "button";
        respBtn.className = "report-cell-btn";
        respBtn.textContent = row.responsible || "";
        respBtn.addEventListener("click", function () {
          editingReportCell = { rowId: row.id, field: "responsible" };
          renderReportView();
        });
        respTd.appendChild(respBtn);
      }
      rowEl.appendChild(respTd);

      var dueTd = document.createElement("td");
      if (editingReportCell && editingReportCell.rowId === row.id && editingReportCell.field === "dueDate") {
        var dueInputEl = document.createElement("input");
        dueInputEl.type = "date";
        dueInputEl.className = "report-cell-input";
        dueInputEl.value = row.dueDate || "";
        dueTd.appendChild(dueInputEl);
        setTimeout(function () {
          dueInputEl.focus();
          if (dueInputEl.showPicker) { try { dueInputEl.showPicker(); } catch (e) {} }
        }, 0);
        var commitDue = function () {
          row.dueDate = dueInputEl.value || null;
          editingReportCell = null;
          saveData();
          renderReportView();
        };
        dueInputEl.addEventListener("change", commitDue);
        dueInputEl.addEventListener("blur", commitDue);
      } else {
        var dueBtn = document.createElement("button");
        dueBtn.type = "button";
        dueBtn.className = "report-cell-btn";
        dueBtn.textContent = row.dueDate ? isoToDisplay(row.dueDate) : "";
        dueBtn.addEventListener("click", function () {
          editingReportCell = { rowId: row.id, field: "dueDate" };
          renderReportView();
        });
        dueTd.appendChild(dueBtn);
      }
      rowEl.appendChild(dueTd);

      var statusTd = document.createElement("td");
      var statusMark = document.createElement("span");
      statusMark.className = "report-status-mark";
      statusMark.innerHTML = rowMarkSvg(row.status);
      statusMark.style.cursor = "pointer";
      statusMark.addEventListener("click", function () {
        row.status = (row.status + 1) % 3;
        saveData();
        renderReportView();
      });
      statusTd.appendChild(statusMark);
      rowEl.appendChild(statusTd);

      var priorityTd = document.createElement("td");
      priorityTd.style.position = "relative";
      if (row.priority) {
        var tag = document.createElement("span");
        tag.className = "report-priority-tag " + row.priority;
        tag.textContent = row.priority === "urgent" ? tr("priorityUrgent") : tr("priorityRegular");
        priorityTd.appendChild(tag);
      }
      priorityTd.addEventListener("click", function (e) {
        e.stopPropagation();
        togglePriorityPopup(row, priorityTd);
      });
      rowEl.appendChild(priorityTd);

      var imageTd = document.createElement("td");
      imageTd.style.position = "relative";
      if (row.image) {
        var thumb = document.createElement("img");
        thumb.className = "report-image-thumb";
        thumb.src = row.image;
        thumb.alt = "";
        imageTd.appendChild(thumb);
      } else {
        var imagePlaceholder = document.createElement("span");
        imagePlaceholder.className = "report-image-placeholder";
        imagePlaceholder.innerHTML = "&#128247;";
        imageTd.appendChild(imagePlaceholder);
      }
      imageTd.addEventListener("click", function (e) {
        e.stopPropagation();
        toggleImagePopup(row, imageTd);
      });
      rowEl.appendChild(imageTd);

      reportTableBody.appendChild(rowEl);
    });

    var addRowEl = document.createElement("tr");
    var addNumTd = document.createElement("td");
    var addBtn = document.createElement("button");
    addBtn.type = "button";
    addBtn.className = "report-add-row-btn";
    var addRowBtnImg = document.createElement("img");
    addRowBtnImg.src = "tasks-plus-icon.webp";
    addRowBtnImg.alt = "+";
    addBtn.appendChild(addRowBtnImg);
    addBtn.title = tr("addBtnTitle");
    addBtn.addEventListener("mousedown", function (e) {
      e.preventDefault();
      addReportRow();
    });
    addBtn.addEventListener("touchstart", function (e) {
      e.preventDefault();
      addReportRow();
    }, { passive: false });
    addNumTd.appendChild(addBtn);
    addRowEl.appendChild(addNumTd);
    for (var i = 0; i < 6; i++) {
      addRowEl.appendChild(document.createElement("td"));
    }
    reportTableBody.appendChild(addRowEl);
  }

  function togglePriorityPopup(row, anchorTd) {
    if (openPriorityPopupRowId === row.id) { closePriorityPopup(); return; }
    closePriorityPopup();
    openPriorityPopupRowId = row.id;
    var popup = document.createElement("div");
    popup.className = "report-priority-popup";
    var urgentBtn = document.createElement("button");
    urgentBtn.type = "button";
    urgentBtn.textContent = tr("priorityUrgent");
    urgentBtn.addEventListener("click", function (e) {
      e.stopPropagation();
      row.priority = row.priority === "urgent" ? null : "urgent";
      saveData();
      closePriorityPopup();
      renderReportView();
    });
    var regularBtn = document.createElement("button");
    regularBtn.type = "button";
    regularBtn.textContent = tr("priorityRegular");
    regularBtn.addEventListener("click", function (e) {
      e.stopPropagation();
      row.priority = row.priority === "regular" ? null : "regular";
      saveData();
      closePriorityPopup();
      renderReportView();
    });
    popup.appendChild(urgentBtn);
    popup.appendChild(regularBtn);
    document.body.appendChild(popup);
    var rect = anchorTd.getBoundingClientRect();
    popup.style.top = (rect.bottom + window.scrollY) + "px";
    popup.style.left = (rect.left + window.scrollX) + "px";
  }

  document.addEventListener("click", function (e) {
    if (openPriorityPopupRowId && !e.target.closest(".report-priority-popup")) {
      closePriorityPopup();
    }
  });

  var reportImageCameraInput = document.getElementById("reportImageCameraInput");
  var reportImageGalleryInput = document.getElementById("reportImageGalleryInput");
  var pendingImageRowId = null;
  var openImagePopupRowId = null;

  function closeImagePopup() {
    var existing = document.querySelector(".report-priority-popup.report-image-popup");
    if (existing) existing.remove();
    openImagePopupRowId = null;
  }

  function toggleImagePopup(row, anchorTd) {
    if (openImagePopupRowId === row.id) { closeImagePopup(); return; }
    closeImagePopup();
    closePriorityPopup();
    openImagePopupRowId = row.id;
    var popup = document.createElement("div");
    popup.className = "report-priority-popup report-image-popup";
    var cameraBtn = document.createElement("button");
    cameraBtn.type = "button";
    cameraBtn.textContent = tr("imagePopupCamera");
    cameraBtn.addEventListener("click", function (e) {
      e.stopPropagation();
      pendingImageRowId = row.id;
      closeImagePopup();
      reportImageCameraInput.value = "";
      reportImageCameraInput.click();
    });
    var galleryBtn = document.createElement("button");
    galleryBtn.type = "button";
    galleryBtn.textContent = tr("imagePopupGallery");
    galleryBtn.addEventListener("click", function (e) {
      e.stopPropagation();
      pendingImageRowId = row.id;
      closeImagePopup();
      reportImageGalleryInput.value = "";
      reportImageGalleryInput.click();
    });
    popup.appendChild(cameraBtn);
    popup.appendChild(galleryBtn);
    if (row.image) {
      var removeBtn = document.createElement("button");
      removeBtn.type = "button";
      removeBtn.textContent = tr("imagePopupRemove");
      removeBtn.addEventListener("click", function (e) {
        e.stopPropagation();
        row.image = null;
        saveData();
        closeImagePopup();
        renderReportView();
      });
      popup.appendChild(removeBtn);
    }
    document.body.appendChild(popup);
    var rect = anchorTd.getBoundingClientRect();
    popup.style.top = (rect.bottom + window.scrollY) + "px";
    popup.style.left = (rect.left + window.scrollX) + "px";
  }

  document.addEventListener("click", function (e) {
    if (openImagePopupRowId && !e.target.closest(".report-image-popup")) {
      closeImagePopup();
    }
  });

  function resizeImageFile(file, callback) {
    var reader = new FileReader();
    reader.onload = function () {
      var img = new Image();
      img.onload = function () {
        var maxDim = 900;
        var scale = Math.min(1, maxDim / Math.max(img.width, img.height));
        var canvas = document.createElement("canvas");
        canvas.width = Math.round(img.width * scale);
        canvas.height = Math.round(img.height * scale);
        var ctx = canvas.getContext("2d");
        ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
        callback(canvas.toDataURL("image/jpeg", 0.72));
      };
      img.src = reader.result;
    };
    reader.readAsDataURL(file);
  }

  function handleReportImageFile(file) {
    if (!file || !pendingImageRowId) return;
    var report = findReport(activeReportId);
    if (!report) return;
    var row = report.rows.find(function (r) { return r.id === pendingImageRowId; });
    if (!row) return;
    resizeImageFile(file, function (dataUrl) {
      row.image = dataUrl;
      saveData();
      renderReportView();
    });
  }
  reportImageCameraInput.addEventListener("change", function () {
    handleReportImageFile(reportImageCameraInput.files && reportImageCameraInput.files[0]);
  });
  reportImageGalleryInput.addEventListener("change", function () {
    handleReportImageFile(reportImageGalleryInput.files && reportImageGalleryInput.files[0]);
  });

  function commitEditingReportCellIfPending() {
    if (!editingReportCell) return;
    var report = findReport(activeReportId);
    if (!report) { editingReportCell = null; return; }
    var row = report.rows.find(function (r) { return r.id === editingReportCell.rowId; });
    var inputEl = reportTableBody.querySelector(".report-cell-input");
    if (row && inputEl && (editingReportCell.field === "task" || editingReportCell.field === "responsible")) {
      row[editingReportCell.field] = inputEl.value.trim();
    }
    editingReportCell = null;
  }

  function addReportRow() {
    commitEditingReportCellIfPending();
    var report = findReport(activeReportId);
    if (!report) return;
    var newRow = { id: uid(), task: "", responsible: "", status: 0, priority: null, dueDate: null, image: null };
    report.rows.push(newRow);
    saveData();
    editingReportCell = { rowId: newRow.id, field: "task" };
    renderReportView();
  }

  function buildReportPdfElement(report) {
    var typeLabel = report.type === "meeting" ? tr("reportTypeMeeting") : tr("reportTypeTour");
    var pdfTitle = report.type === "meeting" ? tr("reportPdfTitleMeeting") : tr("reportPdfTitleTour");

    var doc = document.createElement("div");
    doc.className = "pdf-doc";
    doc.dir = RTL_LANGS[currentLang] ? "rtl" : "ltr";

    doc.appendChild(buildPdfDocTitleElement(findSheetForReport(report), pdfTitle));

    var infoTitle = document.createElement("div");
    infoTitle.className = "pdf-doc-info-title";
    infoTitle.textContent = report.title || typeLabel;
    doc.appendChild(infoTitle);

    var infoDate = document.createElement("div");
    infoDate.className = "pdf-doc-info-date";
    infoDate.textContent = isoToFullDisplay(report.date);
    doc.appendChild(infoDate);

    if (report.participants) {
      var partsEl = document.createElement("div");
      partsEl.className = "pdf-doc-participants";
      var partsLabel = document.createElement("strong");
      partsLabel.textContent = tr("reportShareParticipantsLabel");
      partsEl.appendChild(partsLabel);
      partsEl.appendChild(document.createTextNode(report.participants));
      doc.appendChild(partsEl);
    }

    var table = document.createElement("table");
    table.className = "pdf-doc-table";
    var thead = document.createElement("thead");
    var headRow = document.createElement("tr");
    ["reportColNum", "reportColTask", "reportColResponsible", "reportColDue", "reportColStatus", "reportColPriority", "reportColImage"].forEach(function (key) {
      var th = document.createElement("th");
      th.textContent = tr(key);
      headRow.appendChild(th);
    });
    thead.appendChild(headRow);
    table.appendChild(thead);

    var tbody = document.createElement("tbody");
    if (!report.rows.length) {
      var emptyRow = document.createElement("tr");
      var emptyTd = document.createElement("td");
      emptyTd.className = "pdf-doc-empty";
      emptyTd.colSpan = 7;
      emptyTd.textContent = tr("reportShareNoRows");
      emptyRow.appendChild(emptyTd);
      tbody.appendChild(emptyRow);
    } else {
      report.rows.forEach(function (row, index) {
        var rowEl = document.createElement("tr");

        var numTd = document.createElement("td");
        numTd.textContent = String(index + 1);
        rowEl.appendChild(numTd);

        var taskTd = document.createElement("td");
        taskTd.className = "pdf-doc-col-task";
        taskTd.textContent = row.task || "";
        rowEl.appendChild(taskTd);

        var respTd = document.createElement("td");
        respTd.textContent = row.responsible || "";
        rowEl.appendChild(respTd);

        var dueTd = document.createElement("td");
        dueTd.textContent = row.dueDate ? isoToDisplay(row.dueDate) : "";
        rowEl.appendChild(dueTd);

        var statusTd = document.createElement("td");
        statusTd.textContent = row.status === 2 ? tr("statusWordDone") : row.status === 1 ? tr("statusWordPartial") : tr("statusWordNotDone");
        rowEl.appendChild(statusTd);

        var priorityTd = document.createElement("td");
        if (row.priority) {
          var tag = document.createElement("span");
          tag.className = "pdf-doc-priority-tag " + row.priority;
          tag.textContent = row.priority === "urgent" ? tr("priorityUrgent") : tr("priorityRegular");
          priorityTd.appendChild(tag);
        }
        rowEl.appendChild(priorityTd);

        var imageTd = document.createElement("td");
        if (row.image) {
          var img = document.createElement("img");
          img.className = "pdf-doc-thumb";
          img.src = row.image;
          imageTd.appendChild(img);
        }
        rowEl.appendChild(imageTd);

        tbody.appendChild(rowEl);
      });
    }
    table.appendChild(tbody);
    doc.appendChild(table);

    var footerEl = document.createElement("div");
    footerEl.className = "pdf-doc-footer";
    footerEl.textContent = tr("reportPdfFooter");
    doc.appendChild(footerEl);

    return doc;
  }

  function siteLogColLabel(colKey) {
    return tr("siteLogCol" + colKey.charAt(0).toUpperCase() + colKey.slice(1));
  }

  // Row/category-level "is this actually filled in" checks, shared by both
  // the standalone per-category reports and the combined general report -
  // an empty row (added via "+" but never filled in) or a wholly-untouched
  // category should never show up in either.
  function siteLogAttendanceIsEmpty(log) {
    if (!log) return true;
    return SITE_LOG_ATTENDANCE_COLUMNS.every(function (col) {
      return !((log.attendance && log.attendance[col]) || []).some(function (p) { return p && p.name && p.name.trim(); });
    });
  }
  function siteLogToolsIsEmpty(log) {
    if (!log) return true;
    return SITE_LOG_TOOLS_COLUMNS.every(function (col) {
      var list = (log.tools && log.tools[col]) || [];
      return !list.some(function (e) { return e && ((e.qty && String(e.qty).trim()) || (e.note && e.note.trim())); });
    });
  }
  function filledContractors(log) {
    return ((log && log.contractors) || []).filter(function (c) { return c && c.name && c.name.trim(); });
  }
  function filledWorks(log) {
    return ((log && log.works) || []).filter(function (w) { return w && ((w.text && w.text.trim()) || w.attachment); });
  }
  function filledProcurement(log) {
    return ((log && log.procurement) || []).filter(function (r) {
      return r && ((r.item && r.item.trim()) || (r.quantity && r.quantity.trim()) || (r.supplier && r.supplier.trim()));
    });
  }

  function buildAttendanceTableElement(log, compact) {
    // A column (e.g. "מנהל עבודה") that nobody was assigned to for this log
    // is dropped entirely, not shown as a blank column - same rule as an
    // empty row elsewhere: nothing filled in means nothing shown.
    var activeColumns = SITE_LOG_ATTENDANCE_COLUMNS.filter(function (colKey) {
      return ((log && log.attendance[colKey]) || []).some(function (p) { return p && p.name && p.name.trim(); });
    });
    var headerColumns = activeColumns.length ? activeColumns : SITE_LOG_ATTENDANCE_COLUMNS;
    var colLists = activeColumns.map(function (colKey) {
      return ((log && log.attendance[colKey]) || []).filter(function (p) { return p && p.name && p.name.trim(); });
    });
    var maxRows = colLists.length ? Math.max.apply(null, colLists.map(function (l) { return l.length; })) : 0;

    var table = document.createElement("table");
    table.className = compact ? "pdf-doc-table pdf-doc-table-half" : "pdf-doc-table";
    var thead = document.createElement("thead");
    var headRow = document.createElement("tr");
    headerColumns.forEach(function (colKey) {
      var th = document.createElement("th");
      th.textContent = siteLogColLabel(colKey);
      headRow.appendChild(th);
    });
    thead.appendChild(headRow);
    table.appendChild(thead);

    var tbody = document.createElement("tbody");
    if (maxRows === 0) {
      var emptyRow = document.createElement("tr");
      var emptyTd = document.createElement("td");
      emptyTd.className = "pdf-doc-empty";
      emptyTd.colSpan = headerColumns.length;
      emptyTd.textContent = tr("reportShareNoRows");
      emptyRow.appendChild(emptyTd);
      tbody.appendChild(emptyRow);
    } else {
      for (var i = 0; i < maxRows; i++) {
        var rowEl = document.createElement("tr");
        colLists.forEach(function (list) {
          var td = document.createElement("td");
          td.textContent = list[i] ? list[i].name : "";
          rowEl.appendChild(td);
        });
        tbody.appendChild(rowEl);
      }
    }
    table.appendChild(tbody);
    return table;
  }

  function toolEntryCellText(entry) {
    if (!entry) return "";
    var qty = (entry.qty || "").toString().trim();
    var note = (entry.note || "").toString().trim();
    return qty && note ? (qty + " – " + note) : (qty || note);
  }

  function buildToolsTableElement(log, compact) {
    // Same rule as attendance: a tool column (e.g. "משאית") left blank for
    // this log is dropped entirely rather than shown as an empty column, and
    // a row nobody filled in (the always-present blank typing row) never
    // becomes a real entry, so it never reaches this table either.
    var activeColumns = SITE_LOG_TOOLS_COLUMNS.filter(function (colKey) {
      return ((log && log.tools[colKey]) || []).some(function (e) { return e && (e.qty || e.note); });
    });
    var headerColumns = activeColumns.length ? activeColumns : SITE_LOG_TOOLS_COLUMNS;
    var colLists = activeColumns.map(function (colKey) {
      return ((log && log.tools[colKey]) || []).filter(function (e) { return e && (e.qty || e.note); });
    });
    var maxRows = colLists.length ? Math.max.apply(null, colLists.map(function (l) { return l.length; })) : 0;

    var table = document.createElement("table");
    table.className = compact ? "pdf-doc-table pdf-doc-table-half" : "pdf-doc-table";
    var thead = document.createElement("thead");
    var headRow = document.createElement("tr");
    headerColumns.forEach(function (colKey) {
      var th = document.createElement("th");
      th.textContent = siteLogColLabel(colKey);
      headRow.appendChild(th);
    });
    thead.appendChild(headRow);
    table.appendChild(thead);

    var tbody = document.createElement("tbody");
    if (maxRows === 0) {
      var emptyRow = document.createElement("tr");
      var emptyTd = document.createElement("td");
      emptyTd.className = "pdf-doc-empty";
      emptyTd.colSpan = headerColumns.length;
      emptyTd.textContent = tr("reportShareNoRows");
      emptyRow.appendChild(emptyTd);
      tbody.appendChild(emptyRow);
    } else {
      for (var i = 0; i < maxRows; i++) {
        var rowEl = document.createElement("tr");
        colLists.forEach(function (list) {
          var td = document.createElement("td");
          td.textContent = toolEntryCellText(list[i]);
          rowEl.appendChild(td);
        });
        tbody.appendChild(rowEl);
      }
    }
    table.appendChild(tbody);
    return table;
  }

  function buildProcurementTableElement(log, compact) {
    var table = document.createElement("table");
    table.className = compact ? "pdf-doc-table pdf-doc-table-procurement-general" : "pdf-doc-table";
    var thead = document.createElement("thead");
    var headRow = document.createElement("tr");
    [tr("siteLogColItem"), tr("siteLogColQuantity"), tr("siteLogColSupplier")].forEach(function (label) {
      var th = document.createElement("th");
      th.textContent = label;
      headRow.appendChild(th);
    });
    thead.appendChild(headRow);
    table.appendChild(thead);

    var tbody = document.createElement("tbody");
    var rows = filledProcurement(log);
    if (!rows.length) {
      var emptyRow = document.createElement("tr");
      var emptyTd = document.createElement("td");
      emptyTd.className = "pdf-doc-empty";
      emptyTd.colSpan = 3;
      emptyTd.textContent = tr("reportShareNoRows");
      emptyRow.appendChild(emptyTd);
      tbody.appendChild(emptyRow);
    } else {
      rows.forEach(function (row) {
        var rowEl = document.createElement("tr");
        [row.item, row.quantity, row.supplier].forEach(function (val) {
          var td = document.createElement("td");
          td.textContent = val || "";
          rowEl.appendChild(td);
        });
        tbody.appendChild(rowEl);
      });
    }
    table.appendChild(tbody);
    return table;
  }

  function buildSiteLogAttendancePdfElement(dateISO) {
    var doc = document.createElement("div");
    doc.className = "pdf-doc";
    doc.dir = RTL_LANGS[currentLang] ? "rtl" : "ltr";

    var sheet = activeSheet();
    doc.appendChild(buildPdfDocTitleElement(sheet, sheet.name));

    var categoryTitle = document.createElement("div");
    categoryTitle.className = "pdf-doc-info-title";
    categoryTitle.textContent = tr("siteLogAttendance");
    doc.appendChild(categoryTitle);

    var infoDate = document.createElement("div");
    infoDate.className = "pdf-doc-info-date";
    infoDate.textContent = isoToFullDisplay(dateISO);
    doc.appendChild(infoDate);

    var log = findSiteLog(sheet, dateISO);
    doc.appendChild(buildAttendanceTableElement(log));

    var footerEl = document.createElement("div");
    footerEl.className = "pdf-doc-footer";
    footerEl.textContent = tr("reportPdfFooter");
    doc.appendChild(footerEl);

    return doc;
  }

  function buildSiteLogToolsPdfElement(dateISO) {
    var doc = document.createElement("div");
    doc.className = "pdf-doc";
    doc.dir = RTL_LANGS[currentLang] ? "rtl" : "ltr";

    var sheet = activeSheet();
    doc.appendChild(buildPdfDocTitleElement(sheet, sheet.name));

    var categoryTitle = document.createElement("div");
    categoryTitle.className = "pdf-doc-info-title";
    categoryTitle.textContent = tr("siteLogTools");
    doc.appendChild(categoryTitle);

    var infoDate = document.createElement("div");
    infoDate.className = "pdf-doc-info-date";
    infoDate.textContent = isoToFullDisplay(dateISO);
    doc.appendChild(infoDate);

    var log = findSiteLog(sheet, dateISO);
    doc.appendChild(buildToolsTableElement(log));

    var footerEl = document.createElement("div");
    footerEl.className = "pdf-doc-footer";
    footerEl.textContent = tr("reportPdfFooter");
    doc.appendChild(footerEl);

    return doc;
  }

  function buildSiteLogProcurementPdfElement(dateISO) {
    var doc = document.createElement("div");
    doc.className = "pdf-doc";
    doc.dir = RTL_LANGS[currentLang] ? "rtl" : "ltr";

    var sheet = activeSheet();
    doc.appendChild(buildPdfDocTitleElement(sheet, sheet.name));

    var categoryTitle = document.createElement("div");
    categoryTitle.className = "pdf-doc-info-title";
    categoryTitle.textContent = tr("siteLogProcurement");
    doc.appendChild(categoryTitle);

    var infoDate = document.createElement("div");
    infoDate.className = "pdf-doc-info-date";
    infoDate.textContent = isoToFullDisplay(dateISO);
    doc.appendChild(infoDate);

    var log = findSiteLog(sheet, dateISO);
    doc.appendChild(buildProcurementTableElement(log));

    var footerEl = document.createElement("div");
    footerEl.className = "pdf-doc-footer";
    footerEl.textContent = tr("reportPdfFooter");
    doc.appendChild(footerEl);

    return doc;
  }

  function isoToDayName(iso) {
    var parts = iso.split("-").map(Number);
    var d = new Date(parts[0], parts[1] - 1, parts[2]);
    var localeMap = { he: "he-IL", en: "en-US", ar: "ar", ru: "ru-RU" };
    return d.toLocaleDateString(localeMap[currentLang] || "he-IL", { weekday: "long" });
  }

  function buildSiteLogGeneralPdfElement(sheet, log, number) {
    var doc = document.createElement("div");
    doc.className = "pdf-doc";
    doc.dir = RTL_LANGS[currentLang] ? "rtl" : "ltr";

    doc.appendChild(buildPdfDocTitleElement(sheet, sheet.name));

    var logNumberEl = document.createElement("div");
    logNumberEl.className = "pdf-doc-info-title";
    logNumberEl.textContent = tr("siteLogGeneralReportTitle") + " " + number;
    doc.appendChild(logNumberEl);

    var dateEl = document.createElement("div");
    dateEl.className = "pdf-doc-info-date";
    dateEl.textContent = isoToFullDisplay(log.date) + " - " + isoToDayName(log.date);
    doc.appendChild(dateEl);

    if (!siteLogAttendanceIsEmpty(log)) {
      var attendanceHeading = document.createElement("div");
      attendanceHeading.className = "pdf-doc-section-heading";
      attendanceHeading.textContent = tr("siteLogAttendance");
      doc.appendChild(attendanceHeading);
      doc.appendChild(buildAttendanceTableElement(log, true));
    }

    if (!siteLogToolsIsEmpty(log)) {
      var toolsHeading = document.createElement("div");
      toolsHeading.className = "pdf-doc-section-heading";
      toolsHeading.textContent = tr("siteLogTools");
      doc.appendChild(toolsHeading);
      doc.appendChild(buildToolsTableElement(log, true));
    }

    var contractors = filledContractors(log);
    if (contractors.length) {
      var contractorsHeading = document.createElement("div");
      contractorsHeading.className = "pdf-doc-section-heading";
      contractorsHeading.textContent = tr("siteLogContractors");
      doc.appendChild(contractorsHeading);
      var contractorsList = document.createElement("div");
      contractorsList.className = "pdf-doc-contractors-list";
      contractors.forEach(function (c) {
        var line = document.createElement("div");
        line.className = "pdf-doc-contractor-line";
        line.textContent = c.name;
        contractorsList.appendChild(line);
      });
      doc.appendChild(contractorsList);
    }

    var works = filledWorks(log);
    if (works.length) {
      var worksFrame = document.createElement("div");
      worksFrame.className = "pdf-doc-works-frame";
      var worksTitle = document.createElement("div");
      worksTitle.className = "pdf-doc-works-frame-title";
      worksTitle.textContent = tr("siteLogWorksTourTitle");
      worksFrame.appendChild(worksTitle);
      works.forEach(function (w) {
        var rowEl = document.createElement("div");
        rowEl.className = "pdf-doc-work-row";
        var textEl = document.createElement("div");
        textEl.className = "pdf-doc-work-row-text";
        textEl.textContent = w.text;
        rowEl.appendChild(textEl);
        if (w.attachment && isImageFile(w.attachment)) {
          var imgEl = document.createElement("img");
          imgEl.className = "pdf-doc-work-row-image";
          imgEl.src = w.attachment.url;
          rowEl.appendChild(imgEl);
        }
        worksFrame.appendChild(rowEl);
      });
      doc.appendChild(worksFrame);
    }

    appendPlannedPdfSection(doc, log);

    if (filledProcurement(log).length) {
      var procurementHeading = document.createElement("div");
      procurementHeading.className = "pdf-doc-section-heading";
      procurementHeading.textContent = tr("siteLogProcurement");
      doc.appendChild(procurementHeading);
      doc.appendChild(buildProcurementTableElement(log, true));
    }

    var footerEl = document.createElement("div");
    footerEl.className = "pdf-doc-footer";
    footerEl.textContent = tr("reportPdfFooter");
    doc.appendChild(footerEl);

    return doc;
  }

  function shareSiteLogPdf(btn, buildElementFn, buildFileNameFn, dateISO) {
    var originalContent = btn.innerHTML;
    btn.disabled = true;
    btn.innerHTML = "&#8987;";
    function restore() { btn.disabled = false; btn.innerHTML = originalContent; }
    var fileName = buildFileNameFn(dateISO);
    buildPdfBlobFromElement(buildElementFn(dateISO), fileName).then(function (result) {
      restore();
      attemptShare(result.blob, result.fileName);
    }).catch(function (err) {
      console.error(err);
      restore();
      alert(tr("reportPdfError"));
    });
  }

  siteLogAttendanceShareBtn.addEventListener("click", function () {
    if (!activeSiteLogDate) return;
    shareSiteLogPdf(siteLogAttendanceShareBtn, buildSiteLogAttendancePdfElement, function (dateISO) {
      return tr("siteLogAttendanceReportFileNamePrefix") + " " + activeSheet().name + " " + isoToFileNameDate(dateISO) + ".pdf";
    }, activeSiteLogDate);
  });
  siteLogToolsShareBtn.addEventListener("click", function () {
    if (!activeSiteLogDate) return;
    shareSiteLogPdf(siteLogToolsShareBtn, buildSiteLogToolsPdfElement, function (dateISO) {
      return tr("siteLogToolsReportFileNamePrefix") + " " + activeSheet().name + " " + isoToFileNameDate(dateISO) + ".pdf";
    }, activeSiteLogDate);
  });
  siteLogProcurementShareBtn.addEventListener("click", function () {
    if (!activeSiteLogDate) return;
    shareSiteLogPdf(siteLogProcurementShareBtn, buildSiteLogProcurementPdfElement, function (dateISO) {
      return tr("siteLogProcurementReportFileNamePrefix") + " " + activeSheet().name + " " + isoToFileNameDate(dateISO) + ".pdf";
    }, activeSiteLogDate);
  });

  function waitForImagesLoaded(container) {
    var imgs = Array.prototype.slice.call(container.querySelectorAll("img"));
    return Promise.all(imgs.map(function (img) {
      if (img.complete) return Promise.resolve();
      return new Promise(function (resolve) {
        img.addEventListener("load", resolve);
        img.addEventListener("error", resolve);
      });
    }));
  }

  var loadedScripts = {};
  function loadScriptOnce(src) {
    if (!loadedScripts[src]) {
      loadedScripts[src] = new Promise(function (resolve, reject) {
        var script = document.createElement("script");
        script.src = src;
        script.onload = resolve;
        script.onerror = reject;
        document.head.appendChild(script);
      });
    }
    return loadedScripts[src];
  }

  var appToastEl = document.getElementById("appToast");
  var appToastTimer = null;
  function showToast(message, duration) {
    if (!appToastEl) return;
    appToastEl.textContent = message;
    appToastEl.classList.add("app-toast-visible");
    clearTimeout(appToastTimer);
    appToastTimer = setTimeout(function () {
      appToastEl.classList.remove("app-toast-visible");
    }, duration || 4500);
  }

  function downloadBlob(blob, fileName) {
    var url = URL.createObjectURL(blob);
    var a = document.createElement("a");
    a.href = url;
    a.download = sanitizeFileName(fileName);
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    setTimeout(function () { URL.revokeObjectURL(url); }, 2000);
  }

  function sanitizeFileName(name) {
    // "/" (and other path-separator-like characters) silently truncate a
    // shared/downloaded file's name down to whatever follows the last one -
    // this is the last line of defense on top of using isoToFileNameDate()
    // at each call site, since a free-typed project/report name could also
    // contain one.
    return name.replace(/[\\/:*?"<>|]/g, "-");
  }

  function blobToBase64(blob) {
    return new Promise(function (resolve, reject) {
      var reader = new FileReader();
      reader.onloadend = function () {
        var result = reader.result || "";
        var commaIdx = result.indexOf(",");
        resolve(commaIdx === -1 ? result : result.slice(commaIdx + 1));
      };
      reader.onerror = reject;
      reader.readAsDataURL(blob);
    });
  }

  function shareViaCapacitor(blob, fileName) {
    var Filesystem = window.Capacitor.Plugins.Filesystem;
    var Share = window.Capacitor.Plugins.Share;
    return blobToBase64(blob).then(function (base64) {
      return Filesystem.writeFile({ path: fileName, data: base64, directory: "CACHE" });
    }).then(function (result) {
      return Share.share({ title: fileName, files: [result.uri] });
    });
  }

  function attemptShare(blob, fileName, mimeType) {
    fileName = sanitizeFileName(fileName);
    if (capacitorShareAvailable) {
      shareViaCapacitor(blob, fileName).catch(function (err) {
        if (err && err.message && /share canceled|cancel/i.test(err.message)) return;
        downloadBlob(blob, fileName);
        showToast(tr("shareFallbackToSaveMsg"));
      });
      return;
    }
    var file = new File([blob], fileName, { type: mimeType || "application/pdf" });
    var shareData = { files: [file], title: fileName };
    // Some Android browsers support sharing files via navigator.share()
    // without exposing (or correctly answering) navigator.canShare, so
    // don't let a missing/false canShare rule out trying share() itself -
    // only skip it when share() is entirely absent. An installed/standalone
    // PWA in particular often can't share files at all even though the same
    // browser engine supports it fine in a normal tab - when that forces
    // the fallback to a plain download, say so, or it just looks like the
    // share button silently did the wrong thing.
    var hasShare = !!navigator.share;
    var canShareResult = navigator.canShare ? navigator.canShare(shareData) : "missing";
    var canShareFiles = hasShare && (canShareResult === "missing" || canShareResult);
    if (canShareFiles) {
      try {
        navigator.share(shareData).catch(function (err) {
          if (err && err.name === "AbortError") return;
          downloadBlob(blob, fileName);
          showToast(tr("shareFallbackToSaveMsg"));
        });
        return;
      } catch (err) {
        downloadBlob(blob, fileName);
        showToast(tr("shareFallbackToSaveMsg"));
        return;
      }
    }
    downloadBlob(blob, fileName);
    showToast(tr("shareFallbackToSaveMsg"));
  }

  function buildPdfBlobFromElement(element, fileName) {
    var ready = (window.html2canvas && window.jspdf) ? Promise.resolve() : Promise.all([
      window.html2canvas ? Promise.resolve() : loadScriptOnce("vendor/html2canvas.min.js"),
      window.jspdf ? Promise.resolve() : loadScriptOnce("vendor/jspdf.umd.min.js")
    ]);
    return ready.then(function () {
      var container = document.createElement("div");
      container.className = "pdf-doc-wrap";
      container.style.position = "fixed";
      container.style.top = "0";
      container.style.left = "-99999px";
      container.appendChild(element);
      document.body.appendChild(container);

      return waitForImagesLoaded(container).then(function () {
        return window.html2canvas(container, { scale: 2, backgroundColor: "#ffffff", useCORS: true });
      }).then(function (canvas) {
        var pdf = new window.jspdf.jsPDF({ unit: "mm", format: "a4" });
        var pageWidth = pdf.internal.pageSize.getWidth();
        var pageHeight = pdf.internal.pageSize.getHeight();
        var imgWidth = pageWidth;
        var imgHeight = (canvas.height * imgWidth) / canvas.width;
        var imgData = canvas.toDataURL("image/jpeg", 0.92);
        var heightLeft = imgHeight;
        var position = 0;
        pdf.addImage(imgData, "JPEG", 0, position, imgWidth, imgHeight);
        heightLeft -= pageHeight;
        while (heightLeft > 0) {
          position -= pageHeight;
          pdf.addPage();
          pdf.addImage(imgData, "JPEG", 0, position, imgWidth, imgHeight);
          heightLeft -= pageHeight;
        }
        document.body.removeChild(container);
        return { blob: pdf.output("blob"), fileName: fileName };
      }).catch(function (err) {
        if (container.parentNode) document.body.removeChild(container);
        throw err;
      });
    });
  }

  function buildReportPdfBlob(report) {
    var typeLabel = report.type === "meeting" ? tr("reportTypeMeeting") : tr("reportTypeTour");
    var fileName = (report.title || typeLabel) + ".pdf";
    return buildPdfBlobFromElement(buildReportPdfElement(report), fileName);
  }

  // Cache the last generated PDF per report so tapping "share" can call
  // navigator.share() synchronously from the click handler - both iOS
  // Safari and Android Chrome drop/reject the share sheet (NotAllowedError)
  // if it's invoked after the async html2canvas/jsPDF work, since that
  // spends the click's user activation. The share button stays disabled
  // (with a spinner) until a fresh PDF is actually cached and ready, so a
  // real tap can never fall through to the slow, activation-losing path.
  var REPORT_SHARE_ICON = "&#128228;";
  var REPORT_SHARE_SPINNER = "&#8987;";
  var reportPdfCache = {};
  var reportPdfCacheTimer = null;
  function setShareBtnReady(ready) {
    reportShareBtn.disabled = !ready;
    reportShareBtn.innerHTML = ready ? REPORT_SHARE_ICON : REPORT_SHARE_SPINNER;
  }
  function scheduleReportPdfCacheRefresh(report) {
    var hadCache = !!reportPdfCache[report.id];
    delete reportPdfCache[report.id];
    if (reportPdfCacheTimer) clearTimeout(reportPdfCacheTimer);
    setShareBtnReady(false);
    // On first open there's nothing to show yet, so start building right
    // away - every extra millisecond of delay here is a millisecond closer
    // to losing the share button's user-activation window if it's tapped
    // quickly. Only debounce repeat rebuilds triggered by fast edits.
    reportPdfCacheTimer = setTimeout(function () {
      buildReportPdfBlob(report).then(function (result) {
        reportPdfCache[report.id] = result;
        if (activeReportId === report.id) setShareBtnReady(true);
      }).catch(function () {
        if (activeReportId === report.id) setShareBtnReady(true);
      });
    }, hadCache ? 900 : 0);
  }

  function generateReportPdf(report, mode) {
    var cached = reportPdfCache[report.id];
    if (cached) {
      if (mode === "save") downloadBlob(cached.blob, cached.fileName);
      else attemptShare(cached.blob, cached.fileName);
      return;
    }
    var activeBtn = mode === "save" ? reportSaveBtn : reportShareBtn;
    var originalBtnContent = activeBtn.innerHTML;
    function restoreBtn() {
      activeBtn.disabled = false;
      activeBtn.innerHTML = originalBtnContent;
    }
    activeBtn.disabled = true;
    activeBtn.innerHTML = "&#8987;";
    buildReportPdfBlob(report).then(function (result) {
      restoreBtn();
      reportPdfCache[report.id] = result;
      if (mode === "save") downloadBlob(result.blob, result.fileName);
      else attemptShare(result.blob, result.fileName);
    }).catch(function (err) {
      console.error(err);
      restoreBtn();
      alert(tr("reportPdfError"));
    });
  }

  reportShareBtn.addEventListener("click", function () {
    var report = findReport(activeReportId);
    if (!report) return;
    generateReportPdf(report, "share");
  });
  reportSaveBtn.addEventListener("click", function () {
    var report = findReport(activeReportId);
    if (!report) return;
    generateReportPdf(report, "save");
  });

  menuBtn.addEventListener("click", function (e) {
    e.stopPropagation();
    if (!state.menuOpen) closeSearch();
    state.menuOpen = !state.menuOpen;
    render();
  });
  document.addEventListener("click", function (e) {
    if (state.menuOpen && !menuPanel.contains(e.target) && e.target !== menuBtn) {
      state.menuOpen = false;
      render();
    }
  });

  function runSearch(query) {
    searchResults.innerHTML = "";
    var q = query.trim().toLowerCase();
    if (!q) {
      searchResults.innerHTML = '<div class="search-empty">' + tr("searchEmptyPrompt") + '</div>';
      return;
    }
    var matches = [];
    allSheets().forEach(function (sheet) {
      sheet.tasks.forEach(function (t) {
        if (t.text.toLowerCase().indexOf(q) !== -1) {
          matches.push({ task: t, sheetId: sheet.id, sheetName: sheet.name });
        }
      });
    });
    matches.sort(function (a, b) { return b.task.createdAt - a.task.createdAt; });
    matches = matches.slice(0, 30);
    if (!matches.length) {
      searchResults.innerHTML = '<div class="search-empty">' + tr("searchNoResults") + '</div>';
      return;
    }
    matches.forEach(function (m) {
      var btn = document.createElement("button");
      btn.type = "button";
      btn.className = "search-result";

      var textEl = document.createElement("span");
      textEl.className = "search-result-text";
      textEl.textContent = m.task.text;

      var metaEl = document.createElement("span");
      metaEl.className = "search-result-meta";
      metaEl.textContent = m.sheetName + " · " + isoToFullDisplay(m.task.date);

      btn.appendChild(textEl);
      btn.appendChild(metaEl);
      btn.addEventListener("click", function () {
        data.activeSheetId = m.sheetId;
        state.viewDate = clampViewDate(m.task.date);
        closeSearch();
        render();
      });
      searchResults.appendChild(btn);
    });
  }

  function openSearch() {
    state.searchOpen = true;
    searchPanel.hidden = false;
    searchBtn.setAttribute("aria-expanded", "true");
    runSearch(searchInput.value);
    searchInput.focus();
  }
  function closeSearch() {
    state.searchOpen = false;
    searchPanel.hidden = true;
    searchBtn.setAttribute("aria-expanded", "false");
  }

  searchBtn.addEventListener("click", function (e) {
    e.stopPropagation();
    if (state.searchOpen) {
      closeSearch();
    } else {
      state.menuOpen = false;
      menuPanel.hidden = true;
      menuBtn.setAttribute("aria-expanded", "false");
      openSearch();
    }
  });
  searchInput.addEventListener("click", function (e) { e.stopPropagation(); });
  searchInput.addEventListener("input", function () { runSearch(searchInput.value); });
  searchInput.addEventListener("keydown", function (e) {
    e.stopPropagation();
    if (e.key === "Escape") closeSearch();
  });
  document.addEventListener("click", function (e) {
    if (state.searchOpen && !searchPanel.contains(e.target) && e.target !== searchBtn) {
      closeSearch();
    }
  });

