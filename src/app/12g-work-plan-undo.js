
  // ---------------------------------------------------------------------
  // תוכנית עבודה – ↶ undo. Every change to a plan goes through
  // saveWorkPlanItem (12b), which first remembers the project's plan as it
  // was - the saves of one action (an activity and what moved after it)
  // within a moment of each other count as one. ↶ puts the latest back:
  // each activity that differs is saved as it was, one added since is
  // removed, one removed comes back (with its hammock). The last 30 are kept,
  // for this session.
  // ---------------------------------------------------------------------
  var wpUndoStack = [];
  var wpUndoOpen = {};    // sheetId -> the current action's moment hasn't passed
  var wpUndoing = false;
  var workPlanUndoBtn = document.getElementById("workPlanUndoBtn");

  function wpRememberForUndo(sheet) {
    // (wpUndoOpen is set once this file has run - a save while loading isn't an action)
    if (wpUndoing || !sheet || !wpUndoOpen || wpUndoOpen[sheet.id]) return;
    wpUndoOpen[sheet.id] = true;
    setTimeout(function () { delete wpUndoOpen[sheet.id]; }, 800);
    wpUndoStack.push({
      sheetId: sheet.id,
      plan: JSON.parse(JSON.stringify(sheet.workPlan || [])),
      hammocks: JSON.parse(JSON.stringify(sheet.workHammocks || []))
    });
    if (wpUndoStack.length > 30) wpUndoStack.shift();
    wpUpdateUndoBtn();
  }
  // the latest that belongs to what's on screen (one project, or the office's all)
  function wpUndoIndex() {
    for (var i = wpUndoStack.length - 1; i >= 0; i--) {
      if (!wpState.sheetId || wpUndoStack[i].sheetId === wpState.sheetId) return i;
    }
    return -1;
  }
  function wpUpdateUndoBtn() {
    if (!workPlanUndoBtn) return;
    workPlanUndoBtn.disabled = wpUndoIndex() < 0;
  }
  function workPlanUndo() {
    var i = wpUndoIndex();
    if (i < 0) return;
    var snap = wpUndoStack.splice(i, 1)[0];
    var sheet = allSheets().find(function (s) { return s.id === snap.sheetId; });
    if (!sheet) { wpUpdateUndoBtn(); return; }
    var before = {};
    snap.plan.forEach(function (x) { before[x.id] = x; });
    var hammockOf = function (x) {
      return x.hammock ? snap.hammocks.find(function (h) { return h.id === x.hammock; }) : undefined;
    };
    wpUndoing = true;
    try {
      // added since: out
      (sheet.workPlan || []).slice().forEach(function (x) {
        if (!before[x.id]) saveWorkPlanItem(sheet, x, true);
      });
      // changed or removed since: as they were
      snap.plan.forEach(function (x) {
        var now = (sheet.workPlan || []).find(function (y) { return y.id === x.id; });
        if (!now || JSON.stringify(now) !== JSON.stringify(x)) saveWorkPlanItem(sheet, JSON.parse(JSON.stringify(x)), false, hammockOf(x));
      });
    } finally {
      wpUndoing = false;
    }
    renderWorkPlan();
    showToast(tr("workPlanUndone"));
  }
  workPlanUndoBtn.addEventListener("click", workPlanUndo);
