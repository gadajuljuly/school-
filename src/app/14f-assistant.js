
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

  // ---- work-plan and chat commands -------------------------------------------
  // "עדכן טיח ל-60%", "העבר את יציקת התקרה ליום חמישי", "דחה את החשמל
  // ביומיים", "שלח לצ'אט של בניין A: הבטון מתעכב". True when handled.
  function assistantFindActivity(words) {
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
  function assistantPlanDone(sheet, before, title, line) {
    render();
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
        assistantPlanDone(hit.sheet, before, tr("assistantProgressDone"), "📊 " + item.name + " – " + p + "%");
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
          "📊 " + moved.name + ": " + isoToDisplay(moved.start) + " – " + isoToDisplay(moved.end));
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

  // a typed or spoken line
  function assistantHandle(text) {
    text = String(text || "").replace(/\s+/g, " ").trim();
    if (!text) return;
    assistantBubble("me", text);
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
