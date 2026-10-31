
  // ---------------------------------------------------------------------
  // דוח בוקר: the day's start, over all the projects - opened by the
  // morning notification and the home-screen widget.
  //   1. שים לב: only what needs acting on - activities late, ones whose
  //      pace runs past their end (and what's linked after them), tasks
  //      left from earlier days, the day's reminders; and, for whoever may
  //      see the money (11c-budget.js), BOQ items whose spending runs ahead
  //      of their work and general costs past their budget.
  //   2. the open tasks (today's and earlier), by project, each with the
  //      task list's mark - tapped, it moves on as it does there.
  //   3. the work plans, one under the other: what's under way, late or
  //      starting soon, each with its % bar. Setting a % also marks it in
  //      that day's diary (מתוכנן מול ביצוע).
  // ---------------------------------------------------------------------
  var morningView = document.getElementById("morningView");
  var morningBody = document.getElementById("morningBody");
  var MORNING_SOON_DAYS = 3;
  var morningMore = { tasks: false, plan: false };
  // marked here: they stay on the report (ticked) until it's closed
  var morningTouched = {};

  // the projects' money, read when the report opens: [{ sheet, data }]
  var morningMoney = [];
  function loadMorningMoney() {
    var owners = financeOwnerPhones();
    if (!supabaseClient || !owners.length) return;
    supabaseClient.from(FINANCE_TABLE).select("owner_phone, project_id, data").in("owner_phone", owners).then(function (r) {
      if (!r || r.error) return;
      morningMoney = (r.data || []).map(function (row) {
        var sheet = voiceTargetSheets().find(function (sh) { return sh.id === row.project_id && budgetOwnerFor(sh) === row.owner_phone; });
        return sheet ? { sheet: sheet, data: budgetNormalize(row.data) } : null;
      }).filter(Boolean);
      if (!morningView.hidden && morningMoney.length) renderMorningReport();
    }, function () {});
  }
  // a project's budget overruns, as lines for שים לב
  function morningMoneyLines(m) {
    var d = m.data, out = [];
    d.items.forEach(function (item) {
      var actual = d.expenses.reduce(function (s2, e) { return e.itemId === item.id ? s2 + budgetNum(e.amount) : s2; }, 0);
      if (!budgetItemOver(item, actual)) return;
      var over = budgetItemForecast(item, actual) - budgetNum(item.cost);
      out.push({ text: tr("morningBudgetItem").replace("{name}", [item.code, item.name].filter(Boolean).join(" "))
        .replace("{used}", Math.round(actual * 100 / budgetNum(item.cost))).replace("{done}", Math.round(budgetNum(item.progress))),
        sub: over > 0 ? tr("morningBudgetOver").replace("{sum}", budgetMoney(over)) : "" });
    });
    BUDGET_CATEGORIES.forEach(function (c) {
      var limit = budgetNum(d.generalBudget[c]);
      if (!limit) return;
      var spent = d.expenses.reduce(function (s2, e) {
        var onItem = d.items.some(function (i) { return i.id === e.itemId; });
        return (e.category || "other") === c && !onItem ? s2 + budgetNum(e.amount) : s2;
      }, 0);
      if (spent > limit) out.push({ text: tr("morningBudgetGeneral").replace("{type}", budgetCategoryLabel(c)), sub: tr("morningBudgetOver").replace("{sum}", budgetMoney(spent - limit)) });
    });
    return out;
  }

  function openMorningReport() {
    morningMore = { tasks: false, plan: false };
    morningTouched = {};
    morningMoney = [];
    loadMorningMoney();
    renderMorningReport();
    morningView.hidden = false;
    morningBody.scrollTop = 0;
  }
  function closeMorningReport() {
    morningView.hidden = true;
    render();
  }
  document.getElementById("morningBackBtn").addEventListener("click", closeMorningReport);

  function morningEl(tag, cls, text) {
    var el = document.createElement(tag);
    if (cls) el.className = cls;
    if (text != null) el.textContent = text;
    return el;
  }
  function morningSection(titleKey) {
    var sec = morningEl("section", "morning-section");
    sec.appendChild(morningEl("h3", "morning-section-title", tr(titleKey)));
    morningBody.appendChild(sec);
    return sec;
  }
  function morningMoreBtn(sec, key, onKey, offKey) {
    var b = morningEl("button", "morning-more", tr(morningMore[key] ? offKey : onKey));
    b.type = "button";
    b.addEventListener("click", function () {
      morningMore[key] = !morningMore[key];
      renderMorningReport();
    });
    sec.appendChild(b);
  }

  function renderMorningReport() {
    var today = todayISO();
    document.getElementById("morningDate").textContent = isoToFullDisplay(today);
    var sheets = voiceTargetSheets();
    morningBody.innerHTML = "";
    morningRenderAttention(sheets, today);
    morningRenderTasks(today);
    morningRenderPlans(sheets, today);
  }

  // ---- 1. שים לב -------------------------------------------------------
  function morningRenderAttention(sheets, today) {
    var sec = morningSection("morningAttention");
    var list = morningEl("ul", "morning-attention");
    var add = function (icon, text, sub) {
      var li = morningEl("li", "");
      li.appendChild(morningEl("span", "morning-att-icon", icon));
      var body = morningEl("div", "");
      body.appendChild(morningEl("div", "", text));
      if (sub) body.appendChild(morningEl("small", "", sub));
      li.appendChild(body);
      list.appendChild(li);
    };
    var multi = sheets.length > 1;
    var where = function (sheet) { return multi ? " · " + sheet.name : ""; };
    sheets.forEach(function (sheet) {
      var plan = sheet.workPlan || [];
      var after = function (item) {
        return plan.filter(function (y) {
          return y.status !== "done" && wpLinksOf(y).some(function (l) { return l.from === item.id; });
        }).map(function (y) { return y.name; });
      };
      plan.forEach(function (x) {
        if (x.status === "done") return;
        var next = after(x);
        var drags = next.length ? tr("morningDrags").replace("{list}", next.join(", ")) : "";
        if (wpIsLate(x)) {
          add("⚠", tr("morningLateActivity").replace("{name}", x.name).replace("{date}", isoToDisplay(x.end)) + where(sheet),
            [x.by, drags].filter(Boolean).join(" · "));
          return;
        }
        var f = wpForecastEnd(x);
        if (f && f > x.end) {
          add("📉", tr("morningSlipping").replace("{name}", x.name).replace("{date}", isoToDisplay(f))
            .replace("{n}", wpDiff(x.end, f)) + where(sheet), [x.by, drags].filter(Boolean).join(" · "));
        }
      });
    });
    var older = 0, reminders = [];
    openTasksByProject().forEach(function (g) {
      g.tasks.forEach(function (t) {
        if (t.planItemId) return;
        if (t.date < today) older++;
        var r = t.reminder;
        if (r && r.type === "time" && r.date === today && r.time) reminders.push({ time: r.time, text: t.text, sheet: g.sheet });
      });
    });
    if (older) add("🕓", tr("morningOlderTasks").replace("{n}", older));
    reminders.sort(function (a, b) { return a.time < b.time ? -1 : 1; }).forEach(function (r) {
      add("⏰", r.time + " " + r.text + where(r.sheet));
    });
    morningMoney.forEach(function (m) {
      morningMoneyLines(m).forEach(function (x) { add("💰", x.text + where(m.sheet), x.sub); });
    });
    if (!list.children.length) {
      sec.appendChild(morningEl("p", "morning-ok", tr("morningAllGood")));
      return;
    }
    sec.appendChild(list);
  }

  // ---- 2. the tasks ------------------------------------------------------
  function morningRenderTasks(today) {
    var sec = morningSection("morningTasksTitle");
    var until = morningMore.tasks ? addDaysToISO(today, 7) : today;
    var any = false;
    allSheets().filter(function (s) { return !s.ended && s.id !== HEAD_OFFICE_SHEET_ID; }).forEach(function (sheet) {
      var tasks = (sheet.tasks || []).filter(function (t) {
        // an activity's own task (planItemId) is in the plans, below
        if (t.type === "note" || t.headOfficeVirtual || t.planItemId || !(t.text || "").trim() || t.date > until) return false;
        return t.status !== 2 || morningTouched["t:" + t.id];
      }).sort(function (a, b) { return a.date < b.date ? -1 : a.date > b.date ? 1 : (a.createdAt || 0) - (b.createdAt || 0); });
      if (!tasks.length) return;
      any = true;
      sec.appendChild(morningEl("div", "morning-project", (sheet.shared ? "👥 " : "") + sheet.name));
      tasks.forEach(function (t) {
        var row = morningEl("div", "morning-task" + (t.status === 1 ? " partial" : t.status === 2 ? " done" : ""));
        // the task list's own mark: a tap moves it on - partly done, done, open again
        var mark = morningEl("button", "row-mark morning-mark");
        mark.type = "button";
        mark.title = tr({ 0: "statusPartial", 1: "statusDone", 2: "statusReset" }[t.status || 0]);
        mark.innerHTML = rowMarkSvg(t.status || 0);
        mark.addEventListener("click", function () {
          morningTouched["t:" + t.id] = true;
          cycleStatus(t.id, sheet);
          renderMorningReport();
        });
        row.appendChild(mark);
        var text = morningEl("div", "morning-task-text");
        text.appendChild(morningEl("span", "", t.text));
        var meta = [];
        if (t.date < today) meta.push(tr("morningFrom").replace("{date}", isoToDisplay(t.date)));
        else if (t.date > today) meta.push(isoToDisplay(t.date));
        if (t.reminder && t.reminder.type === "time" && t.reminder.time) meta.push("⏰ " + t.reminder.time);
        if (meta.length) text.appendChild(morningEl("small", "", meta.join(" · ")));
        row.appendChild(text);
        sec.appendChild(row);
      });
    });
    if (!any) sec.appendChild(morningEl("p", "morning-ok", tr("morningNoTasks")));
    morningMoreBtn(sec, "tasks", "morningMoreTasks", "morningLessTasks");
  }

  // ---- 3. the work plans ---------------------------------------------------
  function morningRenderPlans(sheets, today) {
    var withPlan = sheets.filter(function (s) { return (s.workPlan || []).length; });
    if (!withPlan.length) return;
    var sec = morningSection("morningPlansTitle");
    var soon = addDaysToISO(today, MORNING_SOON_DAYS);
    var any = false;
    withPlan.forEach(function (sheet) {
      var items = wpSorted(sheet.workPlan).filter(function (x) {
        if (morningTouched["w:" + x.id]) return true;
        if (x.status === "done") return false;
        return morningMore.plan || x.start <= soon;
      });
      if (!items.length) return;
      any = true;
      sec.appendChild(morningEl("div", "morning-project", (sheet.shared ? "👥 " : "") + sheet.name));
      items.forEach(function (item) {
        var row = morningEl("div", "wp-diary-head morning-plan-row");
        var name = morningEl("div", "wp-diary-name");
        name.appendChild(morningEl("b", "", item.name));
        var sub = [tr("morningRange").replace("{from}", isoToDisplay(item.start)).replace("{to}", isoToDisplay(item.end))];
        if (item.by) sub.push(item.by);
        name.appendChild(morningEl("small", "", sub.join(" · ")));
        if (wpIsLate(item)) name.appendChild(morningEl("small", "wp-diary-late", tr("workPlanStatusLate")));
        else if (item.start > today) name.appendChild(morningEl("small", "", tr("morningStarts").replace("{date}", isoToDisplay(item.start))));
        row.appendChild(name);
        row.appendChild(wpDiaryPctBar(sheet, today, item, wpDayEntry(sheet, today, item.id), function () {
          morningTouched["w:" + item.id] = true;
          renderMorningReport();
        }));
        sec.appendChild(row);
      });
    });
    if (!any) sec.appendChild(morningEl("p", "morning-ok", tr("morningNoActivities")));
    morningMoreBtn(sec, "plan", "morningWholePlan", "morningLessPlan");
  }

  // ---- the morning notification --------------------------------------------
  // A quiet phone notification each morning (07:00 unless set otherwise in
  // the menu): the day's open tasks, the activities late by then and the
  // day's first reminder. The next week's are scheduled with every alarm
  // sync, each worked out from what's known now (the app redoes them
  // whenever it opens); a day with nothing on gets none. Tapping one opens
  // this report (app version 24+; before that, the app).
  var MORNING_ON_KEY = "itask-morning-summary", MORNING_AT_KEY = "itask-morning-summary-at";
  function morningSummaryOn() {
    try { return localStorage.getItem(MORNING_ON_KEY) !== "off"; } catch (e) { return true; }
  }
  function morningSummaryTime() {
    try { return localStorage.getItem(MORNING_AT_KEY) || "07:00"; } catch (e) { return "07:00"; }
  }
  // the summary line for a day, or null when there's nothing on
  function morningSummaryText(iso) {
    var tasks = 0, late = 0, first = null;
    voiceTargetSheets().forEach(function (sheet) {
      (sheet.tasks || []).forEach(function (t) {
        if (t.type === "note" || t.status === 2 || t.headOfficeVirtual || t.planItemId || !(t.text || "").trim()) return;
        // today's list also holds what's still open from before
        if (t.date !== iso && !(t.date < iso && iso === todayISO())) return;
        tasks++;
        var r = t.reminder;
        if (r && r.type === "time" && r.date === iso && r.time && (!first || r.time < first.time)) first = { time: r.time, text: t.text };
      });
      late += (sheet.workPlan || []).filter(function (x) { return x.status !== "done" && x.end < iso; }).length;
    });
    if (!tasks && !late) return null;
    var parts = [];
    if (tasks) parts.push(tr("morningTasks").replace("{n}", tasks));
    if (late) parts.push(tr("morningLate").replace("{n}", late));
    if (first) parts.push(tr("morningFirst").replace("{time}", first.time).replace("{text}", first.text));
    return parts.join(", ");
  }
  function morningAlarms() {
    if (!wpQuietAlarmsSupported || !morningSummaryOn()) return [];
    var hm = morningSummaryTime().split(":"), now = Date.now(), out = [];
    for (var i = 0; i < 7; i++) {
      var iso = addDaysToISO(todayISO(), i);
      var d = wpDate(iso);
      d.setHours(+hm[0] || 0, +hm[1] || 0, 0, 0);
      if (d.getTime() <= now) continue;
      var body = morningSummaryText(iso);
      if (!body) continue;
      out.push({ id: "morning:" + iso, title: tr("morningTitle"), body: body, quiet: true, at: d.getTime(), view: "morning" });
    }
    return out;
  }
  (function () {
    var toggle = document.getElementById("morningSummaryToggle");
    var time = document.getElementById("morningSummaryTime");
    toggle.checked = morningSummaryOn();
    time.value = morningSummaryTime();
    var resync = function () { lastNativeTaskAlarmsJson = null; syncNativeTaskAlarms(); };
    toggle.addEventListener("change", function () {
      try { localStorage.setItem(MORNING_ON_KEY, toggle.checked ? "on" : "off"); } catch (e) {}
      resync();
    });
    time.addEventListener("change", function () {
      if (!/^\d\d:\d\d$/.test(time.value)) return;
      try { localStorage.setItem(MORNING_AT_KEY, time.value); } catch (e) {}
      resync();
    });
  })();
