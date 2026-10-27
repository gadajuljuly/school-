
  // ---------------------------------------------------------------------
  // תוכנית עבודה – what really happened. Each activity keeps its actual
  // start (actualStart: set the day it goes "בביצוע" / gets its first %)
  // and actual finish (actualEnd: the day it's marked done), both editable
  // in its settings. Done early or late, its end moves to the real day:
  //   - later: what's linked after it moves on (the existing cascade);
  //   - earlier: what's linked after it and hasn't started may start
  //     earlier - offered, never before today (wpPullDependents).
  // An activity under way also gets a forecast end from its pace so far
  // (40% in 6 days -> ~9 more); one past its planned end shows as a dashed
  // tail on its bar, and tapping that offers to replan by it.
  // ---------------------------------------------------------------------
  var wpActualStart = document.getElementById("wpActualStart");
  var wpActualEnd = document.getElementById("wpActualEnd");
  var wpEditorSaving = false; // the settings form saves (and cascades) itself

  // fills in / clears the actual dates as an activity's state changes;
  // returns what happened to its end ("earlier" / "later" / null)
  function wpApplyActuals(prev, item) {
    var today = todayISO();
    var started = item.status !== "todo" || (item.progress || 0) > 0;
    if (started && !item.actualStart) item.actualStart = prev && prev.actualStart || (item.start < today ? item.start : today);
    if (!started) { item.actualStart = null; item.actualEnd = null; }
    if (item.status !== "done") { item.actualEnd = null; return null; }
    var justDone = !prev || prev.status !== "done";
    if (!item.actualEnd) item.actualEnd = justDone ? today : (prev && prev.actualEnd) || item.end;
    if (!justDone) return null;
    // done: the plan shows what really happened
    var oldEnd = item.end;
    if (item.actualStart && item.actualStart < item.start) item.start = item.actualStart;
    item.end = item.actualEnd < item.start ? item.start : item.actualEnd;
    return item.end < oldEnd ? "earlier" : item.end > oldEnd ? "later" : null;
  }
  function wpAfterActuals(sheet, item, change) {
    if (!change) return;
    var cascade = !wpEditorSaving; // (the form runs the later-cascade itself)
    // after the save has settled (and any dialog it opened)
    setTimeout(function () {
      if (change === "earlier") wpPullDependents(sheet, item);
      else if (cascade) wpCascadeDependents(sheet, item);
    }, 0);
  }

  // ---- earlier -----------------------------------------------------------
  // the days `s` could move (negative: earlier) and still keep the link from `p`
  function wpLinkGap(s, p, link) {
    var lag = link.lag || 0;
    return link.type === "SS" ? wpDiff(s.start, addDaysToISO(p.start, lag)) :
      link.type === "FF" ? wpDiff(s.end, addDaysToISO(p.end, lag)) :
      link.type === "SF" ? wpDiff(s.end, addDaysToISO(p.start, lag)) :
      wpDiff(s.start, addDaysToISO(p.end, 1 + lag));
  }
  function wpPullDependents(sheet, item) {
    var today = todayISO();
    var byId = {};
    (sheet.workPlan || []).forEach(function (x) { byId[x.id] = Object.assign({}, x); });
    byId[item.id] = item;
    var moves = {}, order = [], queue = [item.id], guard = 0;
    while (queue.length && guard++ < 500) {
      var predId = queue.shift();
      Object.keys(byId).forEach(function (id) {
        var x = byId[id];
        if (x.status !== "todo" || x.actualStart) return; // under way: stays
        var links = wpLinksOf(x);
        if (!links.some(function (l) { return l.from === predId; })) return;
        // as early as every one of its links allows
        var room = null;
        links.forEach(function (l) {
          var p = byId[l.from];
          if (!p) return;
          var g = wpLinkGap(x, p, l);
          room = room === null ? g : Math.max(room, g);
        });
        if (room === null || room >= 0) return;
        if (addDaysToISO(x.start, room) < today) room = Math.min(0, wpDiff(x.start, today));
        if (room >= 0) return;
        byId[id] = wpShift(x, room);
        if (!moves[id]) order.push(id);
        moves[id] = byId[id];
        queue.push(id);
      });
    }
    if (!order.length) return;
    askConfirm(tr("workPlanPullConfirm").replace("{name}", item.name)
      .replace("{list}", order.map(function (id) { return moves[id].name + " (" + isoToDisplay(moves[id].start) + ")"; }).join(", ")), function () {
      order.forEach(function (id) { saveWorkPlanItem(sheet, moves[id], false); });
      renderWorkPlan();
    });
  }

  // ---- forecast ---------------------------------------------------------------
  // when an activity under way should end at its pace so far (null: no pace yet)
  function wpForecastEnd(item) {
    if (item.status === "done") return null;
    var p = item.progress || 0;
    if (p <= 0 || p >= 100) return null;
    var from = item.actualStart || item.start;
    var today = todayISO();
    if (from > today) return null;
    // days worked so far (today too), and as many more as the rest needs
    var spent = wpDiff(from, today) + 1;
    return addDaysToISO(today, Math.ceil(spent * (100 - p) / p));
  }
  // past the planned end: a dashed tail on the bar, and "צפי" by the name
  function wpDrawForecast(trackEl, nameEl, sheet, item, range, dayW, forPdf) {
    var f = wpForecastEnd(item);
    if (!f || f <= item.end) return;
    nameEl.appendChild(wpEl("small", "wp-forecast-label", tr("workPlanForecastShort").replace("{date}", isoToDisplay(f))));
    var from = Math.max(0, wpDiff(range.start, addDaysToISO(item.end, 1)));
    var to = Math.min(range.days - 1, wpDiff(range.start, f));
    if (to < 0 || from > range.days - 1) return;
    var tail = wpEl("div", "wp-forecast");
    tail.style.right = (from * dayW) + "px";
    tail.style.width = Math.max(4, (to - from + 1) * dayW - 1) + "px";
    tail.title = tr("workPlanForecastShort").replace("{date}", isoToDisplay(f));
    if (!forPdf) {
      tail.addEventListener("click", function (e) {
        e.stopPropagation();
        askConfirm(tr("workPlanForecastConfirm").replace("{name}", item.name).replace("{date}", isoToDisplay(f)), function () {
          var moved = Object.assign({}, item, { end: f, updatedBy: myPhoneNumber || null, updatedAt: Date.now() });
          saveWorkPlanItem(sheet, moved, false);
          renderWorkPlan();
          wpCascadeDependents(sheet, moved);
        });
      });
    }
    trackEl.appendChild(tail);
  }

  // ---- the settings: the actual dates -------------------------------------------------
  function wpFillActuals(item) {
    wpActualStart.value = item.actualStart || "";
    wpActualEnd.value = item.actualEnd || "";
    wpShowActualRows();
  }
  function wpShowActualRows() {
    document.getElementById("wpActualRow").hidden = wpEditStatus === "todo" && !(parseInt(wpProgress.value, 10) > 0);
    document.getElementById("wpActualEndField").hidden = wpEditStatus !== "done";
  }
  // a status tapped in the form: the actual dates the save would set, shown now
  function wpActualsForStatus(status) {
    var today = todayISO();
    if (status !== "todo" && !wpActualStart.value) wpActualStart.value = wpStart.value && wpStart.value < today ? wpStart.value : today;
    if (status === "done" && !wpActualEnd.value) wpActualEnd.value = today;
    if (status !== "done") wpActualEnd.value = "";
    if (status === "todo") wpActualStart.value = "";
    wpShowActualRows();
  }
