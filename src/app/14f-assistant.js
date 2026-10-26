
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
  var assistantView = document.getElementById("assistantView");
  var assistantMessages = document.getElementById("assistantMessages");
  var assistantInput = document.getElementById("assistantInput");
  var assistantMicBtn = document.getElementById("assistantMicBtn");
  var assistantGreeted = false;

  function openAssistant(listen) {
    assistantInput.placeholder = tr("assistantPlaceholder");
    assistantView.hidden = false;
    if (!assistantGreeted) {
      assistantGreeted = true;
      assistantGreet();
    }
    assistantMicBtn.hidden = !(voiceSpeechPlugin || VoiceWebRecognition);
    if (listen && !assistantMicBtn.hidden) assistantListen();
    else assistantInput.focus();
  }
  function closeAssistant() {
    voiceStopListening();
    assistantMicBtn.classList.remove("listening");
    assistantView.hidden = true;
    render();
  }
  document.getElementById("assistantBackBtn").addEventListener("click", closeAssistant);

  // ---- bubbles ------------------------------------------------------------
  function assistantBubble(who, build) {
    var el = document.createElement("div");
    el.className = "as-msg as-" + who;
    if (typeof build === "string") el.textContent = build;
    else build(el);
    assistantMessages.appendChild(el);
    assistantMessages.scrollTop = assistantMessages.scrollHeight;
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
  var ASSISTANT_QUESTION_RE = /^\s*(?:מה|מהן|מהם|אילו|איזה|אלו|כמה|תראה|תראי|הראה|הצג|יש\s+לי|שו|ماذا|ما\s|ما$|شو|ايش|إيش|اعرض|وريني|what|show)(?:\s|$)/i;
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
    if (!sheet) sheet = sheets.find(function (s) { return s.id === data.activeSheetId; }) || sheets[0];
    var texts = cmd.items.length ? cmd.items.slice() : (cmd.reminderTime ? [tr("voiceReminderDefault")] : []);
    if (cmd.action !== "done" && !texts.length) { assistantDidntGet(); return; }
    voiceApplyCommand(sheet, {
      action: cmd.action, texts: texts, date: cmd.date || todayISO(), reminderTime: cmd.reminderTime,
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

  // a typed or spoken line
  function assistantHandle(text) {
    text = String(text || "").replace(/\s+/g, " ").trim();
    if (!text) return;
    assistantBubble("me", text);
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
