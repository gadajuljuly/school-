  // ---------------------------------------------------------------------
  // 🖨 הדפסת משימות: the tasks on screen (the day's, or the done ones), each
  // ticked to start with - untick what shouldn't be printed - to a PDF or to
  // the printer. The page looks like the app: ITASK, the project and the
  // date on top, then the rows on the notebook's paper - the blue lines, the
  // red margin, the X mark on the right of each task. All its styles are
  // inline (always the light colours), so the same page serves the PDF
  // (html2canvas, 13-meeting-reports-pdf.js) and the printer (a frame of its
  // own). In the phone app, which can't print from the page, "printer"
  // opens the PDF in the phone's PDF app, which prints.
  // ---------------------------------------------------------------------
  var printTasksBtn = document.getElementById("printTasksBtn");
  var printTasksOverlay = document.getElementById("printTasksOverlay");
  var printTasksList = document.getElementById("printTasksList");
  var printTasksAll = document.getElementById("printTasksAll");
  var PRINT_C = { paper: "#fbf7ee", rule: "#c2d9ec", margin: "#d98a90", ink: "#2c2a24", muted: "#918a78", danger: "#b6473f", green: "#44563c", red: "#bf4e30" };

  // what the list shows right now, in its order
  function printTasksOnScreen() {
    var sheet = activeSheet();
    if (!sheet) return [];
    if (state.showingCompleted) {
      return sheet.tasks.filter(function (t) { return t.status === 2; }).slice().sort(function (a, b) {
        if (a.date !== b.date) return a.date < b.date ? 1 : -1;
        return a.createdAt - b.createdAt;
      });
    }
    return sheet.tasks.filter(function (t) { return t.date === state.viewDate; }).slice().sort(function (a, b) { return a.createdAt - b.createdAt; });
  }

  function openPrintTasks() {
    var tasks = printTasksOnScreen().filter(function (t) { return (t.text || "").trim(); });
    if (!tasks.length) { showToast(tr("printTasksNone")); return; }
    printTasksList.innerHTML = "";
    tasks.forEach(function (t) {
      var row = document.createElement("label");
      row.className = "print-task-pick";
      var cb = document.createElement("input");
      cb.type = "checkbox";
      cb.checked = true; // everything, to start with
      cb.value = t.id;
      cb.addEventListener("change", printTasksSyncAll);
      row.appendChild(cb);
      var text = document.createElement("span");
      text.textContent = t.text;
      if (t.status === 2) text.className = "done";
      row.appendChild(text);
      printTasksList.appendChild(row);
    });
    printTasksSyncAll();
    printTasksOverlay.hidden = false;
  }
  function printTasksBoxes() { return Array.prototype.slice.call(printTasksList.querySelectorAll("input[type=checkbox]")); }
  function printTasksSyncAll() {
    var boxes = printTasksBoxes();
    var on = boxes.filter(function (c) { return c.checked; }).length;
    printTasksAll.checked = on === boxes.length;
    printTasksAll.indeterminate = on > 0 && on < boxes.length;
    document.getElementById("printTasksCount").textContent = tr("printTasksCount").replace("{n}", on).replace("{total}", boxes.length);
  }
  printTasksAll.addEventListener("change", function () {
    printTasksBoxes().forEach(function (c) { c.checked = printTasksAll.checked; });
    printTasksSyncAll();
  });
  function printTasksChosen() {
    var ids = printTasksBoxes().filter(function (c) { return c.checked; }).map(function (c) { return c.value; });
    return printTasksOnScreen().filter(function (t) { return ids.indexOf(t.id) !== -1; });
  }

  // ---- the page -------------------------------------------------------------------------------
  function printEl(tag, style, text) {
    var el = document.createElement(tag);
    if (style) el.setAttribute("style", style);
    if (text != null) el.textContent = text;
    return el;
  }
  // the notebook's lines as a tiny image repeated down the page (the PDF's
  // drawing doesn't do CSS gradients): paper, and a blue line every 36px
  var printLinesUrl = null;
  function printLinesImage() {
    if (printLinesUrl) return printLinesUrl;
    var c = document.createElement("canvas");
    c.width = 4;
    c.height = 36;
    var g = c.getContext("2d");
    g.fillStyle = PRINT_C.paper;
    g.fillRect(0, 0, 4, 36);
    g.fillStyle = PRINT_C.rule;
    g.fillRect(0, 35, 4, 1);
    printLinesUrl = c.toDataURL("image/png");
    return printLinesUrl;
  }
  function buildPrintTasksPage(tasks) {
    var sheet = activeSheet();
    // at least a whole A4 page (794 x 1123 at 96dpi) of paper
    var page = printEl("div", "width:794px;min-height:1123px;display:flex;flex-direction:column;box-sizing:border-box;padding:36px 34px 40px;background:" + PRINT_C.paper +
      ";direction:rtl;font-family:'Rubik','Assistant','Segoe UI',Arial,sans-serif;color:" + PRINT_C.ink + ";");
    page.className = "print-tasks-page";

    // ITASK · the project (and its logo) · the date
    var head = printEl("div", "display:flex;align-items:center;justify-content:space-between;gap:16px;padding:0 6px 14px;border-bottom:2px solid " + PRINT_C.rule + ";");
    var app = printEl("div", "font-weight:800;font-size:26px;letter-spacing:2px;direction:ltr;");
    app.appendChild(printEl("span", "color:" + PRINT_C.red + ";", "I"));
    app.appendChild(printEl("span", "color:" + PRINT_C.green + ";", "TASK"));
    var mid = printEl("div", "display:flex;align-items:center;gap:10px;min-width:0;");
    var logo = sheet && findLogo(sheet.logoId);
    if (logo) {
      var img = printEl("img", "width:40px;height:40px;object-fit:contain;");
      img.src = logo.dataUrl;
      mid.appendChild(img);
    }
    mid.appendChild(printEl("div", "font-weight:800;font-size:24px;", sheet ? sheet.name : ""));
    var when = printEl("div", "font-weight:700;font-size:18px;direction:ltr;",
      state.showingCompleted ? tr("printTasksDoneTitle") : isoToFullDisplay(state.viewDate));
    // right to left: the project, then the date and ITASK
    head.appendChild(mid);
    var right = printEl("div", "display:flex;align-items:center;gap:22px;");
    right.appendChild(when);
    right.appendChild(app);
    head.appendChild(right);
    page.appendChild(head);

    // the notebook: blue lines every 36px, the red margin on the right
    var paper = printEl("div", "position:relative;flex:1;margin-top:18px;background-color:" + PRINT_C.paper +
      ";background-image:url(" + printLinesImage() + ");background-repeat:repeat;background-size:4px 36px;");
    paper.appendChild(printEl("div", "position:absolute;top:0;bottom:0;right:40px;width:2px;background:" + PRINT_C.margin + ";opacity:0.75;"));
    tasks.forEach(function (t) {
      var done = t.status === 2;
      var row = printEl("div", "display:flex;align-items:flex-start;gap:10px;min-height:36px;line-height:36px;font-size:17px;");
      // in the margin: the urgent dot (or the empty circle, as in the app)
      var lead = printEl("div", "width:40px;flex-shrink:0;display:flex;justify-content:center;align-items:center;height:36px;");
      lead.appendChild(printEl("span", t.urgent
        ? "width:12px;height:12px;border-radius:50%;background:" + PRINT_C.danger + ";display:block;"
        : "width:9px;height:9px;border-radius:50%;border:1.5px solid " + PRINT_C.ink + ";display:block;"));
      row.appendChild(lead);
      // the X mark (the note's time instead, for a note)
      var mark = printEl("div", "width:22px;height:36px;flex-shrink:0;display:flex;align-items:center;margin-right:6px;color:" + PRINT_C.ink + ";" + (done ? "opacity:0.5;" : ""));
      if (t.type === "note") {
        mark.setAttribute("style", mark.getAttribute("style") + "width:auto;font-size:14px;color:" + PRINT_C.muted + ";");
        mark.textContent = t.time || "";
      } else {
        mark.innerHTML = rowMarkSvg(t.status).replace(/var\(--danger\)/g, PRINT_C.danger).replace("<svg ", '<svg width="22" height="20" ');
      }
      row.appendChild(mark);
      var text = printEl("div", "flex:1;min-width:0;white-space:normal;overflow-wrap:anywhere;color:" + (done ? PRINT_C.muted : PRINT_C.ink) + ";", t.text);
      if (state.showingCompleted && t.date) {
        text.appendChild(printEl("span", "margin-right:12px;font-size:13px;color:" + PRINT_C.muted + ";direction:ltr;display:inline-block;", isoToDisplay(t.date)));
      }
      row.appendChild(text);
      paper.appendChild(row);
    });
    // a few empty lines under the last one, as on the page
    paper.appendChild(printEl("div", "height:108px;"));
    page.appendChild(paper);
    return page;
  }
  function printTasksFileName() {
    var sheet = activeSheet();
    return tr("printTasksFile") + " " + (sheet ? sheet.name : "") + " " + isoToFileNameDate(state.showingCompleted ? todayISO() : state.viewDate) + ".pdf";
  }

  // ---- PDF / printer ---------------------------------------------------------------------------
  function printTasksPdf() {
    var tasks = printTasksChosen();
    if (!tasks.length) { showToast(tr("printTasksPickOne")); return null; }
    printTasksOverlay.hidden = true;
    showToast(tr("printTasksMaking"));
    return buildPdfBlobFromElement(buildPrintTasksPage(tasks), printTasksFileName()).catch(function () {
      alert(tr("reportPdfError"));
      return null;
    });
  }
  document.getElementById("printTasksPdfBtn").addEventListener("click", function () {
    var making = printTasksPdf();
    if (making) making.then(function (r) { if (r) attemptShare(r.blob, r.fileName, "application/pdf"); });
  });
  document.getElementById("printTasksPrinterBtn").addEventListener("click", function () {
    // the phone app: the PDF, opened in the phone's PDF app (which prints)
    if (capacitorShareAvailable) {
      var making = printTasksPdf();
      if (making) making.then(function (r) { if (r) openPrintPdfOnPhone(r.blob, r.fileName); });
      return;
    }
    var tasks = printTasksChosen();
    if (!tasks.length) { showToast(tr("printTasksPickOne")); return; }
    printTasksOverlay.hidden = true;
    printPageInFrame(buildPrintTasksPage(tasks));
  });
  document.getElementById("printTasksCancelBtn").addEventListener("click", function () { printTasksOverlay.hidden = true; });
  printTasksBtn.addEventListener("click", openPrintTasks);

  function openPrintPdfOnPhone(blob, fileName) {
    var name = sanitizeFileName(fileName);
    var canOpen = nativeTaskAlarmPlugin && typeof nativeTaskAlarmPlugin.openFile === "function";
    if (!canOpen) { attemptShare(blob, name, "application/pdf"); return; }
    blobToBase64(blob).then(function (base64) {
      return window.Capacitor.Plugins.Filesystem.writeFile({ path: name, data: base64, directory: "CACHE" });
    }).then(function (written) {
      showToast(tr("printTasksOpenPdf"), 4000);
      return nativeTaskAlarmPlugin.openFile({ path: written.uri, mimeType: "application/pdf" });
    }).catch(function () {
      attemptShare(blob, name, "application/pdf");
    });
  }

  // the browser's own print dialog, for just this page (in a frame of its own)
  function printPageInFrame(page) {
    var frame = document.createElement("iframe");
    frame.setAttribute("aria-hidden", "true");
    frame.style.cssText = "position:fixed;right:0;bottom:0;width:0;height:0;border:0;visibility:hidden;";
    document.body.appendChild(frame);
    var doc = frame.contentWindow.document;
    doc.open();
    doc.write('<!doctype html><html lang="he" dir="rtl"><head><meta charset="utf-8"><title>' +
      printTasksFileName().replace(/\.pdf$/, "").replace(/[<&]/g, "") + '</title><style>' +
      "@page{size:A4;margin:0}html,body{margin:0;background:" + PRINT_C.paper + ";-webkit-print-color-adjust:exact;print-color-adjust:exact}" +
      ".print-tasks-page{width:100%!important;min-height:100vh}</style></head><body></body></html>");
    doc.close();
    doc.body.appendChild(doc.importNode(page, true));
    var go = function () {
      try { frame.contentWindow.focus(); frame.contentWindow.print(); } catch (e) {}
      setTimeout(function () { if (frame.parentNode) frame.parentNode.removeChild(frame); }, 60000);
    };
    var imgs = Array.prototype.slice.call(doc.images);
    Promise.all(imgs.map(function (im) {
      return im.complete ? null : new Promise(function (res) { im.onload = im.onerror = res; });
    })).then(function () { setTimeout(go, 50); });
  }
