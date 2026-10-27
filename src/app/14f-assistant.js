
  // ---------------------------------------------------------------------
  // עוזר ITASK: a chat with the app, opened from the home-screen widget
  // (launch view "assistant", or "assistant-listen" from its 🎤 - then it
  // starts listening at once). Typed or spoken lines are either questions
  // ("מה יש לי היום / מחר / ביום שלישי?", "מה באיחור?", "מה המשימות של
  // בניין A?") answered from the projects, or commands (a task, a note, a
  // reminder, a work-plan activity, marking a task done) understood like a
  // voice command and carried out at once - the reply says what was done,
  // with ↶ to undo it and a button to open it in the app.
  // ---------------------------------------------------------------------
  // The assistant lives in a bar docked over the app, right above the icon
  // row (#assistantDock): typed or spoken, with its latest exchange shown
  // above its line and the whole conversation one tap away (🕘, the full
  // #assistantView). "תציג..." opens the app's own screens under it, and
  // what's on screen is what the next words are about.
  var assistantView = document.getElementById("assistantView");
  var assistantMessages = document.getElementById("assistantMessages");
  var assistantDock = document.getElementById("assistantDock");
  var assistantDockReply = document.getElementById("assistantDockReply");
  var assistantInput = document.getElementById("assistantInput");
  var assistantMicBtn = document.getElementById("assistantMicBtn");
  var assistantGreeted = false;

  // the bar, when it's open: the screens above end at its top
  function assistantDockEdge() { return assistantDock.hidden ? null : assistantDock; }
  function assistantRefit() {
    if (typeof wpFitAboveFooter === "function") wpFitAboveFooter();
    if (typeof calFitAboveFooter === "function") calFitAboveFooter();
  }
  if (window.ResizeObserver) new ResizeObserver(assistantRefit).observe(assistantDock);

  // ask: a line to ask straight away (the morning summary's tap)
  function openAssistant(listen, ask) {
    assistantInput.placeholder = tr("assistantPlaceholder");
    assistantView.hidden = true;
    assistantDock.hidden = false;
    assistantRefit();
    if (!assistantGreeted) {
      assistantGreeted = true;
      assistantGreet();
    }
    assistantMicBtn.hidden = !(voiceSpeechPlugin || VoiceWebRecognition);
    if (ask) { assistantHandle(ask); return; }
    if (listen && !assistantMicBtn.hidden) assistantListen();
    else assistantInput.focus();
  }
  function closeAssistant() {
    voiceStopListening();
    assistantMicBtn.classList.remove("listening");
    assistantMoveToHistory();
    assistantDock.hidden = true;
    assistantView.hidden = true;
    assistantRefit();
    render();
  }
  document.getElementById("assistantDockCloseBtn").addEventListener("click", closeAssistant);
  // the whole conversation
  function assistantMoveToHistory() {
    while (assistantDockReply.firstChild) assistantMessages.appendChild(assistantDockReply.firstChild);
  }
  document.getElementById("assistantDockHistoryBtn").addEventListener("click", function () {
    assistantMoveToHistory();
    assistantView.hidden = false;
    assistantMessages.scrollTop = assistantMessages.scrollHeight;
  });
  document.getElementById("assistantBackBtn").addEventListener("click", function () { assistantView.hidden = true; });

  // ---- bubbles ------------------------------------------------------------
  // the bar shows the latest exchange (my line, its reply); what came
  // before moves to the conversation, buttons and all
  function assistantBubble(who, build) {
    var el = document.createElement("div");
    el.className = "as-msg as-" + who;
    if (typeof build === "string") el.textContent = build;
    else build(el);
    if (assistantDock.hidden) {
      assistantMessages.appendChild(el);
      assistantMessages.scrollTop = assistantMessages.scrollHeight;
      return el;
    }
    if (who === "me") assistantMoveToHistory();
    assistantDockReply.appendChild(el);
    assistantDockReply.scrollTop = assistantDockReply.scrollHeight;
    return el;
  }
  function assistantAdd(el, tag, text, cls) {
    var x = document.createElement(tag);
    if (cls) x.className = cls;
    if (text != null) x.textContent = text;
    el.appendChild(x);
    return x;
  }
  function assistantGreet() {
    assistantBubble("bot", function (el) {
      assistantAdd(el, "div", tr("assistantHello"));
      var chips = assistantAdd(el, "div", null, "as-chips");
      ["assistantChipToday", "assistantChipTomorrow", "assistantChipLate", "assistantChipRemind"].forEach(function (k) {
        var b = assistantAdd(chips, "button", tr(k));
        b.type = "button";
        b.addEventListener("click", function () {
          if (k === "assistantChipRemind") { assistantInput.value = tr("assistantRemindStart"); assistantInput.focus(); return; }
          assistantHandle(tr(k));
        });
      });
    });
  }

  // ---- questions -------------------------------------------------------------
  var ASSISTANT_QUESTION_RE = /^\s*(?:מתי|متى|when|מה|מהן|מהם|אילו|איזה|אלו|כמה|תראה|תראי|הראה|הצג|יש\s+לי|שו|ماذا|ما\s|ما$|شو|ايش|إيش|اعرض|وريني|what|show)(?:\s|$)/i;
  var ASSISTANT_COMMAND_RE = /(?:^|\s)(?:תוסיף|תוסיפי|הוסף|הוסיפי|תרשום|רשום|תזכיר|תזכירי|תזכורת|סמן|תסמן|סיימתי|أضف|اضف|ذكرني|سجل)(?:\s|$)/;
  function assistantIsQuestion(text) {
    if (ASSISTANT_COMMAND_RE.test(" " + text + " ")) return false;
    return ASSISTANT_QUESTION_RE.test(text) || /[?؟]\s*$/.test(text);
  }
  function assistantDayLabel(iso) {
    var d = new Date(iso + "T12:00:00");
    var wd = d.toLocaleDateString(calLocale(), { weekday: "long" });
    return wd + " " + isoToDisplay(iso);
  }
  // what's on for a day: open tasks (with their reminder times) and the
  // work-plan activities running that day, by project
  function assistantDayAnswer(el, iso) {
    var any = false;
    voiceTargetSheets().forEach(function (sheet) {
      // an activity's own task shows as the activity (📊)
      var tasks = (sheet.tasks || []).filter(function (t) {
        return t.type !== "note" && t.status !== 2 && !t.headOfficeVirtual && !t.planItemId && t.date === iso && (t.text || "").trim();
      });
      // running that day - and today, the late ones too
      var acts = (sheet.workPlan || []).filter(function (x) {
        return x.status !== "done" && x.start <= iso && (x.end >= iso || (iso === todayISO() && wpIsLate(x)));
      });
      if (!tasks.length && !acts.length) return;
      any = true;
      assistantAdd(el, "div", (sheet.shared ? "👥 " : "") + sheet.name, "as-group");
      var ul = assistantAdd(el, "ul");
      tasks.forEach(function (t) {
        var time = t.reminder && t.reminder.type === "time" && t.reminder.time ? " ⏰ " + t.reminder.time : "";
        assistantAdd(ul, "li", t.text + time);
      });
      acts.forEach(function (x) {
        assistantAdd(ul, "li", "📊 " + x.name + (x.progress ? " (" + x.progress + "%)" : "") + (wpIsLate(x) ? " ⚠" : ""));
      });
    });
    if (!any) assistantAdd(el, "div", tr("assistantNothingThatDay"));
  }
  function assistantLateAnswer(el) {
    var any = false;
    voiceTargetSheets().forEach(function (sheet) {
      var late = (sheet.workPlan || []).filter(wpIsLate);
      if (!late.length) return;
      any = true;
      assistantAdd(el, "div", (sheet.shared ? "👥 " : "") + sheet.name, "as-group");
      var ul = assistantAdd(el, "ul");
      late.forEach(function (x) {
        assistantAdd(ul, "li", "⚠ " + x.name + " – " + tr("assistantLateSince").replace("{date}", isoToDisplay(x.end)) +
          (x.by ? " (" + x.by + ")" : "") + (x.progress ? " " + x.progress + "%" : ""));
      });
    });
    if (!any) assistantAdd(el, "div", tr("assistantNothingLate"));
  }
  function assistantProjectAnswer(el, sheet) {
    var tasks = (sheet.tasks || []).filter(function (t) {
      return t.type !== "note" && t.status !== 2 && !t.headOfficeVirtual && !t.planItemId && (t.text || "").trim();
    }).sort(function (a, b) { return a.date.localeCompare(b.date); });
    assistantAdd(el, "div", (sheet.shared ? "👥 " : "") + sheet.name, "as-group");
    if (!tasks.length) { assistantAdd(el, "div", tr("assistantNoOpenTasks")); return; }
    var ul = assistantAdd(el, "ul");
    tasks.slice(0, 25).forEach(function (t) {
      assistantAdd(ul, "li", (t.date !== todayISO() ? isoToDisplay(t.date) + " – " : "") + t.text);
    });
    if (tasks.length > 25) assistantAdd(el, "div", tr("assistantAndMore").replace("{n}", tasks.length - 25));
  }
  // answers a question; false when it isn't one it knows
  function assistantAnswer(text) {
    var t = " " + text + " ";
    // "מתי צפוי להסתיים השלד?" - an activity's dates, as planned / as it goes
    if (/^\s*(?:מתי|متى|when)\s/i.test(text)) {
      var hit = assistantFindActivity(text.replace(/[?؟]/g, " ").replace(/\s(?:מתי|צפוי|צפויה|יסתיים|תסתיים|להסתיים|יתחיל|תתחיל|להתחיל|מסתיים|מסתיימת|ה?פעילות|متى)(?=\s|$)/g, " "));
      if (hit) {
        var x = hit.item, f = wpForecastEnd(x);
        assistantBubble("bot", function (el) {
          assistantAdd(el, "b", "📊 " + x.name + " – " + hit.sheet.name);
          var lines = [];
          if (x.status === "done") lines.push(tr("assistantActDone").replace("{date}", isoToDisplay(x.actualEnd || x.end)));
          else {
            lines.push(tr("assistantActPlanned").replace("{from}", isoToDisplay(x.start)).replace("{to}", isoToDisplay(x.end)));
            if (x.actualStart) lines.push(tr("assistantActStarted").replace("{date}", isoToDisplay(x.actualStart)).replace("{p}", x.progress || 0));
            if (f) lines.push(tr(f > x.end ? "assistantActForecastLate" : "assistantActForecast").replace("{date}", isoToDisplay(f)).replace("{n}", wpDiff(x.end, f)));
            else if (wpIsLate(x)) lines.push(tr("assistantActLateNoPace"));
          }
          assistantAdd(el, "div", lines.join("\n"));
        });
        return true;
      }
    }
    if (/איחור|מאחר|מתעכב|באיחור|متأخر|تأخير|متأخرة/.test(t)) {
      assistantBubble("bot", function (el) {
        assistantAdd(el, "b", tr("assistantLateTitle"));
        assistantLateAnswer(el);
      });
      return true;
    }
    var day = null;
    if (/\s(?:היום|להיום|اليوم)[\s?؟]/.test(t)) day = todayISO();
    else {
      var parsed = parseVoiceCommand(text.replace(/[?؟]/g, " "), [], null, { bareWeekday: true });
      if (parsed.date) day = parsed.date;
    }
    var proj = voiceFindSheet(text.replace(/[?؟]/g, " "), voiceTargetSheets());
    // "מה המשימות שלי?" - today's
    if (!day && !proj && /משימ|مهام|مهمات/.test(t)) day = todayISO();
    if (day) {
      assistantBubble("bot", function (el) {
        assistantAdd(el, "b", tr("assistantDayTitle").replace("{day}", assistantDayLabel(day)));
        assistantDayAnswer(el, day);
      });
      return true;
    }
    if (proj) {
      assistantBubble("bot", function (el) {
        assistantAdd(el, "b", tr("assistantProjectTitle"));
        assistantProjectAnswer(el, proj.sheet);
      });
      return true;
    }
    return false;
  }

  // ---- commands ----------------------------------------------------------------
  function assistantRun(text, cmd) {
    var sheets = voiceTargetSheets();
    if (!sheets.length) { assistantBubble("bot", tr("assistantNoProject")); return; }
    var sheet = cmd.sheetId && sheets.find(function (s) { return s.id === cmd.sheetId; });
    var doneTask = null;
    if (cmd.action === "done") {
      var query = cmd.items.join(" ");
      if (!sheet) sheet = voiceBestDoneSheet(query);
      if (sheet) {
        doneTask = voiceOpenTasks(sheet).map(function (t) { return { t: t, s: voiceScoreTask(t, query) }; })
          .filter(function (x) { return x.s > 0; })
          .sort(function (a, b) { return b.s - a.s; })[0];
      }
      if (!doneTask) { assistantBubble("bot", tr("assistantNoSuchTask")); return; }
      doneTask = doneTask.t;
    }
    var ctx = assistantContext();
    if (!sheet && ctx.sheet && sheets.indexOf(ctx.sheet) >= 0) sheet = ctx.sheet;
    if (!sheet) sheet = sheets.find(function (s) { return s.id === data.activeSheetId; }) || sheets[0];
    var texts = cmd.items.length ? cmd.items.slice() : (cmd.reminderTime ? [tr("voiceReminderDefault")] : []);
    if (cmd.action !== "done" && !texts.length) { assistantDidntGet(); return; }
    voiceApplyCommand(sheet, {
      action: cmd.action, texts: texts, date: cmd.date || (ctx.kind === "tasks" && state.viewDate >= todayISO() ? state.viewDate : todayISO()), reminderTime: cmd.reminderTime,
      endDate: cmd.endDate, by: cmd.by, doneTaskId: doneTask && doneTask.id
    }).then(function (res) {
      if (!res) return;
      render();
      assistantBubble("bot", function (el) {
        assistantAdd(el, "b", "✓ " + tr(res.msgKey));
        var lines = [];
        lines.push(tr("assistantInProject").replace("{p}", sheet.name));
        if (cmd.action === "done") lines.push(doneTask.text);
        else {
          lines.push((cmd.action === "plan" && cmd.endDate && cmd.endDate !== res.date ?
            isoToDisplay(res.date) + " – " + isoToDisplay(cmd.endDate) : assistantDayLabel(res.date)) +
            (cmd.reminderTime ? " ⏰ " + cmd.reminderTime : ""));
          texts.forEach(function (x) { lines.push("• " + x); });
        }
        assistantAdd(el, "div", lines.join("\n"));
        var actions = assistantAdd(el, "div", null, "as-actions");
        var undo = assistantAdd(actions, "button", tr("assistantUndo"));
        undo.type = "button";
        undo.addEventListener("click", function () {
          res.undo();
          render();
          undo.disabled = true;
          undo.textContent = tr("assistantUndone");
          open.disabled = true;
        });
        var open = assistantAdd(actions, "button", tr("assistantOpen"));
        open.type = "button";
        open.addEventListener("click", function () {
          assistantView.hidden = true;
          if (cmd.action === "plan") {
            data.activeSheetId = sheet.id;
            render();
            openWorkPlan();
            return;
          }
          viewingArchive = false;
          state.viewMode = "tasks";
          state.showingCompleted = cmd.action === "done";
          navigateToTaskLink(sheet.id, res.date, res.taskId, false);
          render();
        });
      });
    });
  }
  function assistantDidntGet() {
    assistantBubble("bot", function (el) {
      assistantAdd(el, "div", tr("assistantDidntGet"));
      assistantAdd(el, "div", tr("assistantExamples"));
    });
  }

  // ---- work-plan and chat commands -------------------------------------------
  // "עדכן טיח ל-60%", "העבר את יציקת התקרה ליום חמישי", "דחה את החשמל
  // ביומיים", "שלח לצ'אט של בניין A: הבטון מתעכב". True when handled.
  // the activity the words fit best - in the project on screen first
  function assistantFindActivity(words, prefer) {
    if (prefer === undefined) { var c = assistantContext(); prefer = c.kind === "plan" ? c.sheet : null; }
    if (prefer) {
      var own = null;
      (prefer.workPlan || []).forEach(function (x) {
        var sc = voiceScoreTask({ text: x.name }, words);
        if (sc > 0 && (!own || sc > own.score)) own = { sheet: prefer, item: x, score: sc };
      });
      if (own) return own;
    }
    var best = null;
    voiceTargetSheets().forEach(function (sheet) {
      (sheet.workPlan || []).forEach(function (x) {
        var score = voiceScoreTask({ text: x.name }, words);
        if (score > 0 && (!best || score > best.score)) best = { sheet: sheet, item: x, score: score };
      });
    });
    return best;
  }
  // a reply saying what changed in the plan, with ↶ (puts every activity
  // that moved back as it was) and a way to the plan
  // the bar of an activity on screen flashes (what just changed)
  function assistantFlash(selector) {
    setTimeout(function () {
      document.querySelectorAll(selector).forEach(function (el) {
        el.classList.remove("as-flash");
        void el.offsetWidth;
        el.classList.add("as-flash");
      });
    }, 60);
  }
  function assistantPlanDone(sheet, before, title, line, flashId) {
    render();
    refreshWorkPlanIfOpen();
    if (flashId) assistantFlash("#workPlanChart .wp-bar[data-id='" + flashId + "']");
    assistantBubble("bot", function (el) {
      assistantAdd(el, "b", "✓ " + title);
      assistantAdd(el, "div", tr("assistantInProject").replace("{p}", sheet.name) + "\n" + line);
      var actions = assistantAdd(el, "div", null, "as-actions");
      var undo = assistantAdd(actions, "button", tr("assistantUndo"));
      undo.type = "button";
      undo.addEventListener("click", function () {
        var now = {};
        (sheet.workPlan || []).forEach(function (x) { now[x.id] = x; });
        before.forEach(function (old) {
          var cur = now[old.id];
          if (cur && JSON.stringify(cur) !== JSON.stringify(old)) saveWorkPlanItem(sheet, old, false);
        });
        render();
        undo.disabled = true;
        undo.textContent = tr("assistantUndone");
      });
      var open = assistantAdd(actions, "button", tr("assistantOpenPlan"));
      open.type = "button";
      open.addEventListener("click", function () {
        assistantView.hidden = true;
        data.activeSheetId = sheet.id;
        render();
        openWorkPlan();
      });
    });
  }
  // ---- the plan on screen -----------------------------------------------------------
  // "הוסף פעילות איטום מיום ראשון לשבוע, צוות איטום", "קשר את הטיח אחרי
  // החשמל", "סמן את החפירה כהושלמה", "מחק את פעילות הגידור", "שמור קו
  // בסיס", "רק מה שבאיחור" / "רק ערסל חניון" / "הכל". True when handled.
  function assistantPlanCommand(text, ctx) {
    var sheet = ctx.sheet;
    if (!sheet) return false;
    var t = " " + text.replace(/[?؟.!]+$/, "") + " ";
    var before = function () { return JSON.parse(JSON.stringify(sheet.workPlan || [])); };
    // what the chart shows
    if (/^\s*(?:תציג\s+)?(?:רק|בלבד)\s/.test(t) || /^\s*(?:הכל|הכול|בטל\s+(?:את\s+)?ה?סינון|תציג\s+הכל)\s*$/.test(t)) {
      if (/איחור|מאחר/.test(t)) { wpState.filter = { late: true }; }
      else if (/^\s*(?:הכל|הכול|בטל|תציג\s+הכל)/.test(t)) { wpState.filter = null; }
      else {
        var hName = t.replace(/\s(?:תציג|רק|את|ה?ערסל|ה?פעילויות|של)(?=\s)/g, " ").trim();
        var ham = (sheet.workHammocks || []).find(function (h) { return voiceScoreTask({ text: h.name }, hName) > 0; });
        if (!ham) return false;
        wpState.filter = { hammock: ham.id, name: ham.name };
      }
      renderWorkPlan();
      assistantBubble("bot", "👁 " + (wpState.filter ? (wpState.filter.late ? tr("workPlanFilterLate") : tr("workPlanFilterHammock").replace("{h}", wpState.filter.name)) : tr("workPlanFilterAll")));
      return true;
    }
    if (/^\s*(?:שמור|תשמור|תשמרי)\s+(?:את\s+)?קו\s+(?:ה)?בסיס/.test(t)) {
      var items = {};
      (sheet.workPlan || []).forEach(function (x) { items[x.id] = { start: x.start, end: x.end }; });
      wpState.showBaseline = true;
      saveWorkBaseline(sheet, { savedAt: Date.now(), savedBy: myPhoneNumber || null, items: items });
      assistantBubble("bot", "✓ " + tr("workPlanBaselineSavedMsg"));
      return true;
    }
    // a new activity: whatever's added while the plan is shown goes into it
    var am = t.match(/^\s*(?:הוסף|תוסיף|תוסיפי|הוסיפי|רשום|תרשום)\s+(?:פעילות\s+|לתוכנית\s+(?:העבודה\s+)?)?(.+)$/);
    if (am) {
      var cmd = parseVoicePlan(" לתוכנית העבודה " + am[1] + " ", [sheet], null, { people: voicePeople() });
      if (!cmd.items.length) return false;
      var b0 = before();
      voiceApplyCommand(sheet, { action: "plan", texts: cmd.items, date: cmd.date, endDate: cmd.endDate, by: cmd.by }).then(function (res) {
        if (!res) return;
        var added = (sheet.workPlan || []).filter(function (x) { return !b0.some(function (y) { return y.id === x.id; }); });
        assistantPlanDone(sheet, b0, tr("voicePlanAddedMsg"), added.map(function (x) {
          return "📊 " + x.name + ": " + isoToDisplay(x.start) + " – " + isoToDisplay(x.end) + (x.by ? " (" + x.by + ")" : "");
        }).join("\n"), added[0] && added[0].id);
        // the undo of a new one is taking it out
        var undo = assistantDockReply.querySelector(".as-bot:last-child .as-actions button");
        if (undo) undo.addEventListener("click", function () { added.forEach(function (x) { saveWorkPlanItem(sheet, x, true); }); refreshWorkPlanIfOpen(); });
      });
      return true;
    }
    var lm = t.match(/^\s*(?:קשר|תקשר|תקשרי|חבר|תחבר|תחברי)\s+(?:את\s+)?(.+?)\s+(?:אחרי|לאחר)\s+(.+)$/);
    if (lm) {
      var succ = assistantFindActivity(lm[1], sheet), pred = assistantFindActivity(lm[2], sheet);
      if (!succ || !pred || succ.item.id === pred.item.id || succ.sheet !== sheet || pred.sheet !== sheet) return false;
      var b1 = before();
      var linked = Object.assign({}, succ.item, { links: (succ.item.links || []).filter(function (l) { return l.from !== pred.item.id; }).concat([{ from: pred.item.id, type: "FS", lag: 0 }]),
        updatedBy: myPhoneNumber || null, updatedAt: Date.now() });
      saveWorkPlanItem(sheet, linked, false);
      // it moves on if it no longer fits after the other one (the usual question)
      var shift = wpLinkShift(linked, pred.item, { type: "FS", lag: 0 });
      if (shift) { linked = wpShift(linked, shift); saveWorkPlanItem(sheet, linked, false); wpCascadeDependents(sheet, linked); }
      assistantPlanDone(sheet, b1, tr("assistantLinkedDone"), "📊 " + pred.item.name + " → " + linked.name + ": " + isoToDisplay(linked.start), linked.id);
      return true;
    }
    var dm = t.match(/^\s*(?:סמן|תסמן|תסמני)\s+(?:את\s+)?(.+?)\s+(?:כ-?)?(?:הושלם|הושלמה|גמור|גמורה|בוצע|בוצעה|נגמר|נגמרה)\s*$/) ||
      t.match(/^\s*(?:סיימנו|סיימתי|גמרנו)\s+(?:את\s+)?(.+)$/) || t.match(/^\s*(.+?)\s+(?:הסתיים|הסתיימה|הושלם|הושלמה|נגמר|נגמרה)\s*$/);
    if (dm) {
      var hit = assistantFindActivity(dm[1], sheet);
      if (!hit || hit.sheet !== sheet) return false;
      var b2 = before();
      var done = Object.assign({}, hit.item, { status: "done", progress: 100, updatedBy: myPhoneNumber || null, updatedAt: Date.now() });
      saveWorkPlanItem(sheet, done, false);
      assistantPlanDone(sheet, b2, tr("assistantActMarkedDone"), "📊 " + done.name + " ✓ " + isoToDisplay(done.end), done.id);
      return true;
    }
    var xm = t.match(/^\s*(?:מחק|תמחק|תמחקי|הסר|תסיר|תסירי)\s+(?:את\s+)?(?:ה?פעילות\s+)?(.+)$/);
    if (xm) {
      var gone = assistantFindActivity(xm[1], sheet);
      if (!gone || gone.sheet !== sheet) return false;
      var b3 = before();
      saveWorkPlanItem(sheet, gone.item, true);
      assistantPlanDone(sheet, b3, tr("assistantActDeleted"), "📊 " + gone.item.name);
      // ↶ puts it back (the usual undo only restores ones still there)
      var undo2 = assistantDockReply.querySelector(".as-bot:last-child .as-actions button");
      if (undo2) undo2.addEventListener("click", function () { saveWorkPlanItem(sheet, gone.item, false); refreshWorkPlanIfOpen(); });
      return true;
    }
    return false;
  }

  function assistantSpecial(text) {
    var t = " " + text.replace(/[?؟.!]+$/, "") + " ";
    // progress
    var pm = t.match(/^\s*(?:(?:עדכן|תעדכן|עדכני|תעדכני)\s+)?(?:את\s+)?(?:ה?התקדמות\s+(?:של\s+)?)?(.+?)\s*(?:ל|ל-|ב|ב-|על|-)?\s*(\d{1,3})\s*(?:%|אחוז|אחוזים)\s*$/);
    if (pm && +pm[2] <= 100) {
      var hit = assistantFindActivity(pm[1]);
      if (hit) {
        var before = JSON.parse(JSON.stringify(hit.sheet.workPlan || []));
        var p = +pm[2];
        var item = Object.assign({}, hit.item, { progress: p, status: p >= 100 ? "done" : p > 0 ? "prog" : "todo",
          updatedBy: myPhoneNumber || null, updatedAt: Date.now() });
        saveWorkPlanItem(hit.sheet, item, false);
        assistantPlanDone(hit.sheet, before, tr("assistantProgressDone"), "📊 " + item.name + " – " + p + "%", item.id);
        return true;
      }
    }
    // move / postpone an activity
    var mm = t.match(/^\s*(?:העבר|תעביר|תעבירי|הזז|תזיז|תזיזי|דחה|תדחה|תדחי|הקדם|תקדים)\s+(?:את\s+)?(.+)$/);
    if (mm) {
      var rest = " " + mm[1] + " ", shift = null;
      var later = !/^\s*(?:הקדם|תקדים)/.test(t);
      rest = rest.replace(/\s(?:ב-?|ל-?)?(?:(\d+)\s+(ימים|יום|שבועות)|(יומיים|שבוע|שבועיים))(?=\s)/, function (m0, n, unit, word) {
        shift = word ? { "יומיים": 2, "שבוע": 7, "שבועיים": 14 }[word] : +n * (unit === "שבועות" ? 7 : 1);
        return " ";
      });
      var parsed = shift == null ? parseVoiceCommand(rest, [], null, { plan: true, bareWeekday: true }) : null;
      var words = parsed ? parsed.items.join(" ") : rest;
      var act = (parsed && parsed.date || shift != null) && assistantFindActivity(words);
      if (act) {
        var before2 = JSON.parse(JSON.stringify(act.sheet.workPlan || []));
        var x = act.item, len = wpDiff(x.start, x.end);
        var start = shift != null ? addDaysToISO(x.start, later ? shift : -shift) : parsed.date;
        var moved = Object.assign({}, x, { start: start, end: addDaysToISO(start, len), updatedBy: myPhoneNumber || null, updatedAt: Date.now() });
        saveWorkPlanItem(act.sheet, moved, false);
        wpCascadeDependents(act.sheet, moved);
        assistantPlanDone(act.sheet, before2, tr("assistantMovedDone"),
          "📊 " + moved.name + ": " + isoToDisplay(moved.start) + " – " + isoToDisplay(moved.end), moved.id);
        return true;
      }
    }
    // a message to a project's chat
    var cm = t.match(/^\s*(?:שלח|תשלח|תשלחי|כתוב|תכתוב|תכתבי)\s+(?:הודעה\s+)?(?:ל|ב)(?:צ['׳]?אט|קבוצה)\s+(?:של\s+)?(?:פרויקט\s+)?(.+)$/);
    if (cm) {
      var shared = voiceTargetSheets().filter(function (s) { return s.shared; });
      var body = cm[1], proj = null, msg = "";
      var colon = body.match(/^(.+?)\s*[:–-]\s+(.+)$/) || body.match(/^(.+?):(.+)$/);
      if (colon) {
        var f = voiceFindSheet(colon[1], shared);
        if (f) { proj = f.sheet; msg = colon[2]; }
      }
      if (!proj) {
        var f2 = voiceFindSheet(body, shared);
        if (f2) { proj = f2.sheet; msg = f2.rest; }
      }
      msg = (msg || "").replace(/^\s*(?:ש|:)\s*/, "").trim();
      if (!proj) { assistantBubble("bot", tr("assistantWhichChat")); return true; }
      if (!msg) { assistantBubble("bot", tr("assistantWhatToSay")); return true; }
      sendChatMessage(proj.id, msg).then(function () {
        assistantBubble("bot", function (el) {
          assistantAdd(el, "b", "✓ " + tr("assistantSentToChat").replace("{p}", proj.name));
          assistantAdd(el, "div", "💬 " + msg);
          var actions = assistantAdd(el, "div", null, "as-actions");
          var open = assistantAdd(actions, "button", tr("assistantOpenChat"));
          open.type = "button";
          open.addEventListener("click", function () {
            assistantView.hidden = true;
            navigateToTaskLink(proj.id, null, null, true);
            render();
          });
        });
      }, function () { assistantBubble("bot", tr("chatFileUploadError")); });
      return true;
    }
    return false;
  }

  // ---- what's on screen ----------------------------------------------------------
  // { kind: plan|calendar|tasks|diary|chat|library|other, sheet }
  function assistantContext() {
    if (!workPlanView.hidden) {
      return { kind: "plan", sheet: wpState.sheetId ? allSheets().find(function (x) { return x.id === wpState.sheetId; }) : null };
    }
    if (typeof calView !== "undefined" && calView && !calView.hidden) return { kind: "calendar", sheet: null };
    var kinds = { tasks: "tasks", diary: "diary", chat: "chat", library: "library" };
    return { kind: kinds[state.viewMode] || "other", sheet: activeSheet() };
  }
  // the screens opened over the app: shut before another is shown
  function assistantCloseViews() {
    if (!workPlanView.hidden) { workPlanView.hidden = true; wpLinkFrom = null; }
    if (typeof calView !== "undefined" && calView && !calView.hidden) closeCalendarView();
    if (!sketchView.hidden) closeSketch();
    if (!diaryPhotosView.hidden) diaryPhotosView.hidden = true;
    if (!libraryView.hidden) { libraryView.hidden = true; activeLibraryFolderId = null; }
    assistantView.hidden = true;
    exitArchiveView();
    state.menuOpen = false;
  }

  // ---- showing --------------------------------------------------------------------
  // "תציג את תוכנית העבודה של בניין A", "...את המשימות של מחר", "...את לוח
  // השנה של שבוע הבא", "...את היומן", "...את הצ'אט", "...את הספרייה",
  // "...את הסקיצה חתך קיר". True when it was a "show".
  var ASSISTANT_SHOW_RE = /^\s*(?:תציג|תציגי|הצג|הציגי|תראה|תראי|הראה|הראי|תפתח|תפתחי|פתח|פתחי|עבור|תעבור|תעברי|اعرض|افتح|وريني|show|open)\s+(?:לי\s+|لي\s+)?(?:את\s+)?(.+)$/i;
  function assistantShow(text) {
    var m = text.replace(/[?؟.!]+$/, "").match(ASSISTANT_SHOW_RE);
    if (!m) return false;
    var what = " " + m[1] + " ";
    var sheets = voiceTargetSheets();
    var found = voiceFindSheet(what, sheets);
    var ctx = assistantContext();
    var sheet = found ? found.sheet : (ctx.sheet && sheets.indexOf(ctx.sheet) >= 0 ? ctx.sheet : activeSheet());
    var parsed = parseVoiceCommand(what, [], null, { bareWeekday: true });
    var day = parsed.date;
    var kind = /תוכנית|תכנית|גאנט|גנט|خطة|plan|gantt/i.test(what) ? "plan" :
      /לוח\s*ה?שנה|פגישות|קלנדר|التقويم|calendar/i.test(what) ? "calendar" :
      /יומן|يومية|diary/i.test(what) ? "diary" :
      /צ['׳]?אט|הודעות|الدردشة|chat/i.test(what) ? "chat" :
      /ספרי[יה]|קבצים|المكتبة|library|files/i.test(what) ? "library" :
      /סקיצ|رسم|sketch/i.test(what) ? "sketch" :
      /משימות|מטלות|המשימות|مهام|المهام|tasks/i.test(what) || found || day ? "tasks" : null;
    if (!kind) return false;
    if (!sheet && kind !== "calendar") { assistantBubble("bot", tr("assistantNoProject")); return true; }
    assistantCloseViews();
    if (sheet) data.activeSheetId = sheet.id;
    var say = null;
    if (kind === "plan") {
      state.viewMode = "tasks";
      render();
      openWorkPlan();
      if (/שבוע/.test(what)) { wpState.zoom = "week"; wpState.anchor = day || (/הבא/.test(what) ? addDaysToISO(todayISO(), 7) : todayISO()); }
      else if (/חודש/.test(what)) { wpState.zoom = "month"; wpState.anchor = day || (/הבא/.test(what) ? addDaysToISO(todayISO().slice(0, 8) + "01", 31) : todayISO()); }
      renderWorkPlan();
      say = tr("assistantShowingPlan").replace("{p}", sheet.name);
    } else if (kind === "calendar") {
      if (!calPlugin) { assistantBubble("bot", tr("assistantCalendarAppOnly")); return true; }
      openCalendarView();
      calState.mode = /שבוע/.test(what) ? "week" : (day || /היום|יום/.test(what)) ? "day" : "month";
      if (/שבוע\s+הבא/.test(what) && !day) day = addDaysToISO(todayISO(), 7);
      if (day) calState.anchor = new Date(day + "T12:00:00");
      say = tr("assistantShowingCalendar");
    } else if (kind === "diary") {
      state.viewDate = clampViewDate(day && day <= todayISO() ? day : todayISO());
      openDiaryView();
      say = tr("assistantShowingDiary").replace("{p}", sheet.name).replace("{d}", isoToDisplay(state.viewDate));
    } else if (kind === "chat") {
      state.viewMode = "tasks";
      render();
      if (!sheet.shared) { assistantBubble("bot", tr("assistantNoChat")); return true; }
      openChatView();
      say = tr("assistantShowingChat").replace("{p}", sheet.name);
    } else if (kind === "library") {
      render();
      openLibraryFoldersView();
      say = tr("assistantShowingLibrary").replace("{p}", sheet.name);
    } else if (kind === "sketch") {
      state.viewMode = "tasks";
      render();
      openSketch();
      var name = (found ? found.rest : what).replace(/\s(?:ה?סקיצה|ה?סקיצות|של|את)(?=\s)/g, " ").trim();
      var hit = name && (sheet.sketches || []).find(function (x) { return voiceScoreTask({ text: x.name }, name) > 0; });
      if (hit && hit.id !== sk.sketchId) skSwitchTo(sheet, skReadDraft(sheet.id, hit.id) || { sketchId: hit.id, name: hit.name, els: [], savedAt: 0, syncedAt: 0 });
      say = tr("assistantShowingSketch").replace("{p}", sheet.name);
    } else {
      state.viewMode = "tasks";
      state.showingCompleted = false;
      if (day) state.viewDate = clampViewDate(day);
      render();
      say = tr("assistantShowingTasks").replace("{p}", sheet.name).replace("{d}", isoToDisplay(state.viewDate));
    }
    assistantBubble("bot", "👁 " + say);
    return true;
  }

  // a typed or spoken line
  function assistantHandle(text) {
    text = String(text || "").replace(/\s+/g, " ").trim();
    if (!text) return;
    assistantBubble("me", text);
    if (assistantShow(text)) return;
    var ctx = assistantContext();
    if (ctx.kind === "plan" && assistantPlanCommand(text, ctx)) return;
    if (assistantSpecial(text)) return;
    if (assistantIsQuestion(text)) {
      if (!assistantAnswer(text)) assistantDidntGet();
      return;
    }
    var thinking = assistantBubble("bot", tr("voiceThinking"));
    thinking.classList.add("as-thinking");
    var sheets = voiceTargetSheets();
    var ai = VOICE_PLAN_RE.test(" " + text + " ") ? Promise.resolve(null) : voiceAiParse(text, sheets);
    ai.then(function (aiCmd) {
      thinking.remove();
      assistantRun(text, aiCmd || parseVoiceCommand(text, sheets, null, { people: voicePeople() }));
    });
  }
  document.getElementById("assistantForm").addEventListener("submit", function (e) {
    e.preventDefault();
    var text = assistantInput.value;
    assistantInput.value = "";
    assistantHandle(text);
  });

  // ---- speaking --------------------------------------------------------------------
  var assistantListening = false;
  function assistantListen() {
    if (assistantListening) { voiceStopListening(); return; }
    assistantListening = true;
    assistantMicBtn.classList.add("listening");
    assistantInput.placeholder = tr("voiceListening");
    voiceListen().then(function (heard) {
      assistantHandle(heard);
    }, function (err) {
      assistantBubble("bot", tr(err && err.message === "permission" ? "voicePermissionMsg" : "voiceNoSpeech"));
    }).then(function () {
      assistantListening = false;
      assistantMicBtn.classList.remove("listening");
      assistantInput.placeholder = tr("assistantPlaceholder");
    });
  }
  assistantMicBtn.addEventListener("click", assistantListen);

  // ---- the morning summary ---------------------------------------------------------
  // A quiet phone notification each morning (07:00 unless set otherwise in
  // the menu): the day's open tasks, the activities late by then and the
  // day's first reminder. The next week's are scheduled with every alarm
  // sync, each worked out from what's known now (the app redoes them
  // whenever it opens); a day with nothing on gets none. Tapping one opens
  // the assistant on "מה יש לי היום?" (app version 24+; before that, the app).
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
        if (t.type === "note" || t.status === 2 || t.headOfficeVirtual || !(t.text || "").trim()) return;
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
  function assistantMorningAlarms() {
    if (!wpQuietAlarmsSupported || !morningSummaryOn()) return [];
    var hm = morningSummaryTime().split(":"), now = Date.now(), out = [];
    for (var i = 0; i < 7; i++) {
      var iso = addDaysToISO(todayISO(), i);
      var d = wpDate(iso);
      d.setHours(+hm[0] || 0, +hm[1] || 0, 0, 0);
      if (d.getTime() <= now) continue;
      var body = morningSummaryText(iso);
      if (!body) continue;
      out.push({ id: "morning:" + iso, title: tr("morningTitle"), body: body, quiet: true, at: d.getTime(), view: "assistant-today" });
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
