  // ---------------------------------------------------------------------
  // 🧰 ארגז כלים: in the project row where the sketch was (the same size,
  // floating on its shadow), it opens a small box of tools: printing the
  // tasks (on the tasks page - 14l-print-tasks.js), the PDF scanner (into
  // this project's library - 07b-library-scan.js) and the sketch. Each is
  // the same button as before, now inside the box (their own buttons are
  // hidden).
  // ---------------------------------------------------------------------
  var toolboxBtn = document.getElementById("toolboxBtn");
  var toolboxPop = document.getElementById("toolboxPop");
  function closeToolbox() {
    toolboxPop.hidden = true;
    toolboxBtn.setAttribute("aria-expanded", "false");
  }
  toolboxBtn.addEventListener("click", function (e) {
    e.stopPropagation();
    if (!toolboxPop.hidden) { closeToolbox(); return; }
    // printing: the tasks page only
    document.getElementById("toolboxPrint").hidden = state.viewMode !== "tasks";
    toolboxPop.hidden = false;
    toolboxBtn.setAttribute("aria-expanded", "true");
  });
  document.addEventListener("click", function (e) {
    if (!toolboxPop.hidden && !toolboxPop.contains(e.target)) closeToolbox();
  });
  document.getElementById("toolboxPrint").addEventListener("click", function () {
    closeToolbox();
    document.getElementById("printTasksBtn").click();
  });
  document.getElementById("toolboxScan").addEventListener("click", function () {
    closeToolbox();
    var sheet = activeSheet();
    if (!sheet) return;
    activeLibrarySheetId = sheet.id; // saved into this project's library
    document.getElementById("libraryScanBtn").click();
  });
  document.getElementById("toolboxSketch").addEventListener("click", function () {
    closeToolbox();
    document.getElementById("sketchBtn").click();
  });
