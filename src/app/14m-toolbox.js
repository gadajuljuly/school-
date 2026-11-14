  // ---------------------------------------------------------------------
  // 🧰 ארגז כלים: in the project row where the sketch was (floating on its
  // shadow) - on every page, and in the diary's own top row - it opens a small box of tools: printing the
  // tasks (on the tasks page - 14l-print-tasks.js), the PDF scanner (into
  // this project's library - 07b-library-scan.js) and the sketch. Each is
  // the same button as before, now inside the box (their own buttons are
  // hidden).
  // ---------------------------------------------------------------------
  var toolboxBtn = document.getElementById("toolboxBtn");
  var toolboxPop = document.getElementById("toolboxPop");
  // the box: on the page itself, under whichever toolbox was tapped (the
  // project row's, or the diary's own)
  document.body.appendChild(toolboxPop);
  var toolboxOpener = null;
  function closeToolbox() {
    toolboxPop.hidden = true;
    if (toolboxOpener) toolboxOpener.setAttribute("aria-expanded", "false");
    toolboxOpener = null;
  }
  function openToolbox(opener) {
    if (!toolboxPop.hidden && toolboxOpener === opener) { closeToolbox(); return; }
    closeToolbox();
    // printing: the tasks page only
    document.getElementById("toolboxPrint").hidden = state.viewMode !== "tasks";
    toolboxOpener = opener;
    opener.setAttribute("aria-expanded", "true");
    var r = opener.getBoundingClientRect();
    toolboxPop.style.top = Math.round(r.bottom + 6) + "px";
    toolboxPop.style.left = Math.max(8, Math.round(r.left - 2)) + "px";
    toolboxPop.hidden = false;
  }
  [toolboxBtn, document.getElementById("diaryProjSketch")].forEach(function (opener) {
    opener.addEventListener("click", function (e) {
      e.stopPropagation();
      openToolbox(opener);
    });
  });
  document.addEventListener("click", function (e) {
    if (!toolboxPop.hidden && !toolboxPop.contains(e.target)) closeToolbox();
  });
  window.addEventListener("resize", closeToolbox);
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
