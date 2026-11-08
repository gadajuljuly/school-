  // ---------------------------------------------------------------------
  // משימות דחופות: every urgent, not-yet-done task of every project on one
  // page - opened from the red dot by the app's name (it shows how many).
  // Each row: the task list's own mark (tap: partly done, done, open again -
  // ticked rows stay on the page until it's closed), the urgent dot (tap:
  // no longer urgent), the task, and its project and date; tapping the
  // text opens it in its project.
  // ---------------------------------------------------------------------
  var urgentView = document.getElementById("urgentView");
  var urgentBody = document.getElementById("urgentBody");
  var urgentDotBtn = document.getElementById("urgentDotBtn");
  var urgentCountEl = document.getElementById("urgentCount");
  var urgentTouched = {};

  function urgentSheets() {
    return allSheets().filter(function (s) { return !s.ended && s.id !== HEAD_OFFICE_SHEET_ID; });
  }
  function urgentOpenTasks(sheet) {
    return (sheet.tasks || []).filter(function (t) {
      if (t.type === "note" || t.headOfficeVirtual || !(t.text || "").trim()) return false;
      return (t.urgent && t.status !== 2) || urgentTouched[sheet.id + ":" + t.id];
    }).sort(function (a, b) { return a.date < b.date ? -1 : a.date > b.date ? 1 : (a.createdAt || 0) - (b.createdAt || 0); });
  }
  function urgentCount() {
    return urgentSheets().reduce(function (n, s) {
      return n + (s.tasks || []).filter(function (t) {
        return t.urgent && t.status !== 2 && t.type !== "note" && !t.headOfficeVirtual && (t.text || "").trim();
      }).length;
    }, 0);
  }
  // the dot by the app's name (from render())
  function updateUrgentDot() {
    var n = urgentCount();
    urgentDotBtn.classList.toggle("has-urgent", n > 0);
    urgentCountEl.textContent = n > 0 ? String(n) : "";
    urgentDotBtn.title = tr("urgentDotTitle").replace("{n}", n);
  }

  function openUrgentView() {
    urgentTouched = {};
    state.menuOpen = false;
    renderUrgentView();
    urgentView.hidden = false;
    urgentBody.scrollTop = 0;
  }
  function closeUrgentView() {
    urgentView.hidden = true;
    urgentTouched = {};
    render();
  }
  urgentDotBtn.addEventListener("click", openUrgentView);
  document.getElementById("urgentBackBtn").addEventListener("click", closeUrgentView);

  function renderUrgentView() {
    var today = todayISO();
    urgentBody.innerHTML = "";
    var any = false;
    urgentSheets().forEach(function (sheet) {
      var tasks = urgentOpenTasks(sheet);
      if (!tasks.length) return;
      any = true;
      var head = document.createElement("div");
      head.className = "morning-project";
      head.textContent = (sheet.shared ? "👥 " : "") + sheet.name;
      urgentBody.appendChild(head);
      tasks.forEach(function (t) {
        var row = document.createElement("div");
        row.className = "morning-task urgent-row" + (t.status === 1 ? " partial" : t.status === 2 ? " done" : "");
        var mark = document.createElement("button");
        mark.type = "button";
        mark.className = "row-mark morning-mark";
        mark.title = tr({ 0: "statusPartial", 1: "statusDone", 2: "statusReset" }[t.status || 0]);
        mark.innerHTML = rowMarkSvg(t.status || 0);
        mark.addEventListener("click", function () {
          urgentTouched[sheet.id + ":" + t.id] = true;
          cycleStatus(t.id, sheet);
          renderUrgentView();
          updateUrgentDot();
        });
        row.appendChild(mark);

        var text = document.createElement("button");
        text.type = "button";
        text.className = "morning-task-text urgent-task-text";
        var span = document.createElement("span");
        span.textContent = t.text;
        text.appendChild(span);
        var meta = [];
        if (t.date && t.date < today) meta.push(tr("morningFrom").replace("{date}", isoToDisplay(t.date)));
        else if (t.date && t.date > today) meta.push(isoToDisplay(t.date));
        if (t.reminder && t.reminder.type === "time" && t.reminder.time) meta.push("⏰ " + t.reminder.time);
        if (meta.length) {
          var small = document.createElement("small");
          small.textContent = meta.join(" · ");
          text.appendChild(small);
        }
        text.addEventListener("click", function () {
          urgentView.hidden = true;
          urgentTouched = {};
          navigateToTaskLink(sheet.id, t.date, t.id);
          render();
        });
        row.appendChild(text);

        var dot = document.createElement("button");
        dot.type = "button";
        dot.className = "urgent-unmark";
        dot.title = tr("unmarkUrgent");
        dot.setAttribute("aria-label", tr("unmarkUrgent"));
        dot.addEventListener("click", function () {
          t.urgent = false;
          saveData();
          renderUrgentView();
          updateUrgentDot();
        });
        row.appendChild(dot);
        urgentBody.appendChild(row);
      });
    });
    if (!any) {
      var none = document.createElement("p");
      none.className = "morning-ok";
      none.textContent = tr("urgentNone");
      urgentBody.appendChild(none);
    }
  }
