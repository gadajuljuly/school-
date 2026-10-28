
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
    assistantNumberTasks();
    if (!assistantGreeted) {
      assistantGreeted = true;
      assistantGreet();
    }
    assistantMicBtn.hidden = !(voiceSpeechPlugin || VoiceWebRecognition);
    refreshVoiceAiStatus();
    if (ask) { assistantHandle(ask); return; }
    if (listen && !assistantMicBtn.hidden) assistantListen();
    else assistantInput.focus();
  }
  function closeAssistant() {
    clearTimeout(assistantIdleTimer);
    voiceStopListening();
    assistantStopSpeaking();
    assistantMicBtn.classList.remove("listening");
    assistantMoveToHistory();
    assistantDock.hidden = true;
    assistantView.hidden = true;
    assistantRefit();
    render();
    assistantNumberTasks();
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
    if (who === "bot") { assistantSpeakSoon(); assistantCloseSoon(); }
    else clearTimeout(assistantIdleTimer);
    return el;
  }

  // ---- the bar comes when it's called and goes once it's done: a while
  // after the answer (longer for a longer one), unless it's still in use -
  // listening, speaking, being typed in, or the conversation is open
  var assistantIdleTimer = null;
  var assistantSpeaking = false;
  function assistantInUse() {
    return assistantListening || assistantSpeaking || document.activeElement === assistantInput ||
      !!assistantInput.value.trim() || !assistantView.hidden || !!assistantDockReply.querySelector(".as-thinking");
  }
  function assistantCloseSoon(ms) {
    clearTimeout(assistantIdleTimer);
    // the greeting waits for a first line
    if (assistantDock.hidden || !assistantDockReply.querySelector(".as-me")) return;
    if (ms == null) {
      var last = assistantDockReply.querySelector(".as-bot:last-child");
      ms = Math.min(20000, 7000 + 50 * (last ? last.textContent.length : 0));
    }
    assistantIdleTimer = setTimeout(function () {
      if (assistantDock.hidden) return;
      if (assistantInUse()) { assistantCloseSoon(5000); return; }
      closeAssistant();
    }, ms);
  }
  // a touch on the bar (an undo, a chip...) gives it more time
  ["pointerdown", "input"].forEach(function (ev) {
    assistantDock.addEventListener(ev, function () { if (assistantIdleTimer) assistantCloseSoon(8000); });
  });

  // ---- speech mode (🔊): answers read aloud, and after a spoken line it
  // listens again - hands-free, until a moment of silence ------------------
  var ASSISTANT_VOICE_KEY = "itask-assistant-voice";
  var assistantLastByVoice = false;
  var assistantSpeakTimer = null;
  var assistantNativeSpeak = false;
  if (nativeTaskAlarmPlugin && nativeTaskAlarmPlugin.features) {
    nativeTaskAlarmPlugin.features().then(function (f) { assistantNativeSpeak = !!(f && f.speak); }, function () {});
  }
  function assistantVoiceMode() {
    try { return localStorage.getItem(ASSISTANT_VOICE_KEY) === "on"; } catch (e) { return false; }
  }
  function assistantShowVoiceMode() {
    var b = document.getElementById("assistantSpeakBtn");
    b.textContent = assistantVoiceMode() ? "🔊" : "🔇";
    b.classList.toggle("on", assistantVoiceMode());
  }
  document.getElementById("assistantSpeakBtn").addEventListener("click", function () {
    var on = !assistantVoiceMode();
    try { localStorage.setItem(ASSISTANT_VOICE_KEY, on ? "on" : "off"); } catch (e) {}
    assistantShowVoiceMode();
    if (!on) assistantStopSpeaking();
    showToast(tr(on ? "assistantVoiceOn" : "assistantVoiceOff"));
  });
  assistantShowVoiceMode();
  // what a bubble says, without its buttons and signs
  function assistantSpeechText(el) {
    var c = el.cloneNode(true);
    c.querySelectorAll(".as-actions, .as-chips, .as-ai-note, button").forEach(function (b) { b.remove(); });
    // a pause between lines (a detached copy has no layout, so no innerText)
    c.querySelectorAll("li, div, p, br, h3, h4").forEach(function (n) { n.after(". "); });
    return c.textContent.replace(/[\p{Extended_Pictographic}\u{FE0F}↶•→]/gu, " ")
      .replace(/\s+/g, " ").replace(/(\s*[.:]\s*)+\./g, ".").replace(/^[\s.]+/, "").trim();
  }
  function assistantSay(text) {
    if (assistantNativeSpeak && nativeTaskAlarmPlugin.speak) {
      return nativeTaskAlarmPlugin.speak({ text: text, lang: voiceSpeechLang() }).catch(function () {});
    }
    if (!window.speechSynthesis || !window.SpeechSynthesisUtterance) return Promise.resolve();
    return new Promise(function (resolve) {
      var u = new SpeechSynthesisUtterance(text);
      u.lang = voiceSpeechLang();
      u.onend = u.onerror = function () { resolve(); };
      window.speechSynthesis.cancel();
      window.speechSynthesis.speak(u);
    });
  }
  function assistantStopSpeaking() {
    clearTimeout(assistantSpeakTimer);
    if (assistantNativeSpeak && nativeTaskAlarmPlugin.stopSpeaking) nativeTaskAlarmPlugin.stopSpeaking().catch(function () {});
    if (window.speechSynthesis) window.speechSynthesis.cancel();
  }
  // the latest answer, once the replies have settled (a "thinking..." first is skipped)
  function assistantSpeakSoon() {
    if (!assistantVoiceMode()) return;
    clearTimeout(assistantSpeakTimer);
    assistantSpeakTimer = setTimeout(function () {
      var last = assistantDockReply.querySelector(".as-bot:last-child");
      if (!last || last.classList.contains("as-thinking") || assistantDock.hidden) return;
      var byVoice = assistantLastByVoice;
      assistantSpeaking = true;
      assistantSay(assistantSpeechText(last)).then(function () {
        assistantSpeaking = false;
        if (byVoice && assistantVoiceMode() && !assistantDock.hidden && !assistantListening) assistantListen();
      });
    }, 250);
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

  // ---- the on-phone AI (Gemini Nano, offline) -------------------------------
  // A question the fixed answers don't cover goes to the model, with a short
  // summary of the projects. It only answers - changes stay with the exact
  // commands, so nothing it says is carried out.
  var assistantAiLast = null; // the previous question and answer, for "ומה עם..."
  function assistantAiData() {
    var today = todayISO();
    var ctx = assistantContext();
    var sheets = voiceTargetSheets().slice();
    if (ctx.sheet && sheets.indexOf(ctx.sheet) > 0) { sheets.splice(sheets.indexOf(ctx.sheet), 1); sheets.unshift(ctx.sheet); }
    var lines = [], size = 0, LIMIT = 2600;
    function add(line) {
      if (size + line.length > LIMIT) return false;
      lines.push(line); size += line.length + 1;
      return true;
    }
    sheets.some(function (sh) {
      if (!add("Project " + JSON.stringify(sh.name) + (sh === ctx.sheet ? " (on screen)" : "") + ":")) return true;
      var tasks = voiceOpenTasks(sh).slice().sort(function (a, b) { return String(a.date || "").localeCompare(String(b.date || "")); });
      tasks.slice(0, 20).forEach(function (t) {
        add("- task: " + t.text + (t.date ? " | date " + t.date + (t.date < today ? " (overdue)" : "") : "") +
          (t.reminder && t.reminder.time ? " | reminder " + t.reminder.time : "") + (t.status === 1 ? " | in progress" : ""));
      });
      (sh.workPlan || []).slice(0, 25).forEach(function (x) {
        var f = wpForecastEnd(x);
        add("- plan activity: " + x.name + " | " + x.start + " to " + x.end + " | " +
          (x.status === "done" ? "done" : (x.progress || 0) + "%") + (wpIsLate(x) ? " | LATE" : "") +
          (x.by ? " | by " + x.by : "") + (f && f > x.end ? " | forecast end " + f : "") + (x.note ? " | note: " + x.note : ""));
      });
      return false;
    });
    return lines.join("\n");
  }
  function assistantAiPrompt(text) {
    var now = new Date();
    return [
      "You are the assistant inside ITASK, a construction-site task app. Answer the user's question using ONLY the data below.",
      "Today is " + todayISO() + " (" + ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"][now.getDay()] + ").",
      "Reply in the language of the question, in at most 3 short sentences, plain text. If the data doesn't say, say you don't know.",
      "You cannot change anything. If asked to do something, say which command to type, e.g. \"הוסף משימה ...\" or \"עדכן טיח ל-60%\".",
      "DATA:",
      assistantAiData() || "(no projects)",
      assistantAiLast ? "Previous question: " + assistantAiLast.q + "\nPrevious answer: " + assistantAiLast.a : "",
      "Question: " + text
    ].filter(Boolean).join("\n");
  }
  function assistantAiChat(text) {
    if (!voiceAiPlugin || !voiceAiEnabled()) { assistantDidntGet(); return; }
    var thinking = assistantBubble("bot", tr("assistantAiThinking"));
    thinking.classList.add("as-thinking");
    var ask = voiceAiPlugin.available().then(function (res) {
      if (!res || !res.available) return null;
      return voiceAiPlugin.generate({ prompt: assistantAiPrompt(text) }).then(function (out) {
        return String(out && out.text || "").replace(/\*\*|__|^#+\s*/gm, "").trim() || null;
      });
    }).catch(function () { return null; });
    var timeout = new Promise(function (resolve) { setTimeout(function () { resolve(null); }, 25000); });
    Promise.race([ask, timeout]).then(function (answer) {
      thinking.remove();
      if (!answer) { assistantDidntGet(); return; }
      assistantAiLast = { q: text, a: answer };
      assistantBubble("bot", function (el) {
        el.classList.add("as-ai");
        assistantAdd(el, "div", "🤖 " + answer);
        assistantAdd(el, "small", tr("assistantAiNote")).className = "as-ai-note";
      });
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

  // ---- the tasks on screen: numbered ---------------------------------------------------
  // While the bar is open each task in the list gets a small number, so
  // "סמן את 3 כבוצעה", "העבר את 5 למחר", "תזכיר לי על 2 בשעה 4", "מחק את 4",
  // "בטל סימון 3" (a task's words work too, instead of its number).
  var taskListEl = document.getElementById("taskList");
  var assistantNumbering = false;
  function assistantNumberTasks() {
    if (assistantNumbering) return;
    assistantNumbering = true;
    taskListEl.querySelectorAll(".as-num").forEach(function (n) { n.remove(); });
    if (!assistantDock.hidden && state.viewMode === "tasks") {
      var n = 0;
      taskListEl.querySelectorAll("li.task").forEach(function (li) {
        var badge = document.createElement("span");
        badge.className = "as-num";
        badge.textContent = ++n;
        li.insertBefore(badge, li.firstChild);
      });
    }
    assistantNumbering = false;
  }
  if (window.MutationObserver) {
    new MutationObserver(function () { if (!assistantNumbering) assistantNumberTasks(); }).observe(taskListEl, { childList: true });
  }
  // a task on screen by its number or its words
  function assistantTaskOnScreen(token) {
    var lis = Array.prototype.slice.call(taskListEl.querySelectorAll("li.task"));
    var sheet = activeSheet();
    var byLi = function (li) { return li && sheet && sheet.tasks.find(function (t) { return t.id === li.dataset.taskId; }); };
    var num = String(token).match(/^\s*(\d{1,3})\s*$/) || String(token).match(/^\s*(?:משימה|מס(?:פר|'|׳)?)\s*(\d{1,3})\s*$/);
    if (num) return byLi(lis[+num[1] - 1]);
    var best = null;
    lis.forEach(function (li) {
      var t = byLi(li);
      var sc = t ? voiceScoreTask(t, token) : 0;
      if (sc > 0 && (!best || sc > best.sc)) best = { t: t, sc: sc };
    });
    return best && best.t;
  }
  function assistantTaskDone(sheet, t, title, line, undo) {
    render();
    assistantFlash("#taskList li.task[data-task-id='" + t.id + "']");
    assistantBubble("bot", function (el) {
      assistantAdd(el, "b", "✓ " + title);
      assistantAdd(el, "div", line);
      var actions = assistantAdd(el, "div", null, "as-actions");
      var u = assistantAdd(actions, "button", tr("assistantUndo"));
      u.type = "button";
      u.addEventListener("click", function () {
        undo();
        saveData();
        render();
        u.disabled = true;
        u.textContent = tr("assistantUndone");
      });
    });
  }
  function assistantSetTaskStatus(sheet, t, status) {
    var wasDone = t.status === 2;
    t.status = status;
    if (t.planItemId) workPlanTaskStatusChanged(sheet, t);
    if (t.planRef) workPlanRefStatusChanged(t);
    saveData();
    if (sheet.shared && t.type === "task" && wasDone !== (t.status === 2)) {
      sendChatSystemMessage(sheet.id, t.status === 2 ? "done" : "undone", t.text, myPhoneNumber);
    }
  }
  function assistantTaskCommand(text) {
    var sheet = activeSheet();
    if (!sheet) return false;
    var t0 = " " + text.replace(/[?؟.!]+$/, "") + " ";
    var m, t;
    if ((m = t0.match(/^\s*(?:בטל|תבטל|תבטלי)\s+(?:את\s+)?(?:ה)?סימון\s+(?:של\s+)?(.+?)\s*$/)) && (t = assistantTaskOnScreen(m[1]))) {
      var was = t.status;
      assistantSetTaskStatus(sheet, t, 0);
      assistantTaskDone(sheet, t, tr("assistantTaskUndone"), t.text, function () { assistantSetTaskStatus(sheet, t, was); });
      return true;
    }
    if (((m = t0.match(/^\s*(?:סמן|תסמן|תסמני)\s+(?:את\s+)?(.+?)\s+(?:כ-?)?(?:בוצע|בוצעה|הושלם|הושלמה|גמור|גמורה)\s*$/)) ||
        (m = t0.match(/^\s*(?:סיימתי|סיימנו)\s+(?:את\s+)?(\d{1,3})\s*$/)) || (m = t0.match(/^\s*(\d{1,3})\s+(?:בוצע|בוצעה|הושלם|הושלמה)\s*$/))) &&
        (t = assistantTaskOnScreen(m[1]))) {
      var was2 = t.status;
      assistantSetTaskStatus(sheet, t, 2);
      assistantTaskDone(sheet, t, tr("voiceDoneMsg"), t.text, function () { assistantSetTaskStatus(sheet, t, was2); });
      return true;
    }
    if ((m = t0.match(/^\s*(?:מחק|תמחק|תמחקי|הסר|תסיר)\s+(?:את\s+)?(?:ה?משימה\s+)?(.+?)\s*$/)) && (t = assistantTaskOnScreen(m[1]))) {
      var copy = JSON.parse(JSON.stringify(t)), at = sheet.tasks.indexOf(t);
      removeTask(t.id);
      assistantTaskDone(sheet, copy, tr("assistantTaskDeleted"), copy.text, function () { sheet.tasks.splice(Math.max(0, at), 0, copy); });
      return true;
    }
    if ((m = t0.match(/^\s*(?:העבר|תעביר|תעבירי|דחה|תדחה|תדחי|הזז|תזיז)\s+(?:את\s+)?(\S+(?:\s+\S+)?)\s+(ל.+|ב.+)$/))) {
      t = assistantTaskOnScreen(m[1]);
      var p = parseVoiceCommand(" " + m[2] + " ", [], null, { bareWeekday: true });
      // an activity's own task: it's the activity that moves (further on)
      if (t && p.date && !t.planItemId) {
        var old = { date: t.date, reminder: t.reminder ? JSON.parse(JSON.stringify(t.reminder)) : null };
        t.date = p.date;
        if (t.reminder && t.reminder.type === "time" && t.reminder.time) {
          var fire = new Date(p.date + "T" + t.reminder.time);
          t.reminder = Object.assign({}, t.reminder, { date: p.date, fireAt: fire.toISOString(), firedAt: null });
        }
        saveData();
        assistantTaskDone(sheet, t, tr("assistantTaskMoved"), t.text + " → " + assistantDayLabel(p.date), function () { t.date = old.date; t.reminder = old.reminder; });
        return true;
      }
    }
    if ((m = t0.match(/^\s*(?:תזכיר|תזכירי|הזכר)\s+(?:לי\s+)?(?:על|את)\s+(\S+)\s+(.+)$/)) && (t = assistantTaskOnScreen(m[1]))) {
      var r = parseVoiceCommand(" תזכיר לי " + m[2] + " ", [], null, { bareWeekday: true });
      if (!r.reminderTime) return false;
      var date = r.date || t.date;
      var fireAt = new Date(date + "T" + r.reminderTime);
      if (isNaN(fireAt.getTime()) || fireAt.getTime() <= Date.now()) { assistantBubble("bot", tr("taskReminderPastMsg")); return true; }
      var oldR = t.reminder ? JSON.parse(JSON.stringify(t.reminder)) : null;
      t.reminder = { type: "time", date: date, time: r.reminderTime, fireAt: fireAt.toISOString(), firedAt: null };
      if (sheet.shared) t.reminder.by = myPhoneNumber;
      saveData();
      ensureExactAlarmPermission();
      assistantTaskDone(sheet, t, tr("voiceAddedReminderMsg"), t.text + " ⏰ " + assistantDayLabel(date) + " " + r.reminderTime, function () { t.reminder = oldR; });
      return true;
    }
    return false;
  }
  // with the tasks on screen, a move / delete / unmark nothing answered to
  // isn't a new task called "העבר..."
  var ASSISTANT_TASK_VERB_RE = /^\s*(?:העבר|תעביר|תעבירי|דחה|תדחה|תדחי|הזז|תזיז|מחק|תמחק|תמחקי|הסר|תסיר|בטל\s+סימון|תבטל\s+סימון)\s/;

  // ---- the phone's calendar -------------------------------------------------------------
  // "קבע מחר ב-10 פגישה עם היזם" (an hour, unless "לשעתיים" / "לחצי שעה"),
  // "העבר את הפגישה של חמישי ל-12", "העבר את הפגישה עם היזם למחר ב-9" -
  // into / in the phone's calendar (the app only), with ↶.
  function assistantCalendarId() {
    var ready = calState.calendars && calState.calendars.length ? Promise.resolve() : calLoadCalendars();
    return ready.then(function () {
      var writable = (calState.calendars || []).filter(function (c) { return c.writable; });
      var last = null;
      try { last = localStorage.getItem(CAL_LAST_CALENDAR_KEY); } catch (e) {}
      var pick = writable.find(function (c) { return String(c.id) === last; }) || writable.find(function (c) { return c.primary; }) || writable[0];
      return pick ? pick.id : null;
    });
  }
  function assistantCalendarReply(title, line, undo) {
    if (typeof calView !== "undefined" && !calView.hidden) calLoadAndRender();
    assistantBubble("bot", function (el) {
      assistantAdd(el, "b", "✓ " + title);
      assistantAdd(el, "div", line);
      var actions = assistantAdd(el, "div", null, "as-actions");
      var u = assistantAdd(actions, "button", tr("assistantUndo"));
      u.type = "button";
      u.addEventListener("click", function () {
        u.disabled = true;
        undo().then(function () {
          u.textContent = tr("assistantUndone");
          if (!calView.hidden) calLoadAndRender();
        });
      });
    });
  }
  function assistantHm(ms) {
    var d = new Date(ms);
    return String(d.getHours()).padStart(2, "0") + ":" + String(d.getMinutes()).padStart(2, "0");
  }
  function assistantCalendarCommand(text, ctx) {
    var t0 = " " + text.replace(/[?؟.!]+$/, "") + " ";
    var meeting = /פגישה|פגישת|אירוע|סיור|ביקור|ביומן\s+של\s+הטלפון|בלוח\s+ה?שנה/.test(t0);
    var cm = t0.match(/^\s*(?:קבע|תקבע|תקבעי|צור|תיצור|תקבע\s+לי|קבע\s+לי)\s+(?:לי\s+)?(.+)$/);
    var mm = t0.match(/^\s*(?:העבר|תעביר|תעבירי|הזז|תזיז|דחה|תדחה)\s+(?:את\s+)?(ה?(?:פגישה|אירוע|סיור|ביקור).*)$/);
    if (!cm && !mm) return false;
    if (cm && !meeting && ctx.kind !== "calendar") return false;
    if (!calPlugin) { assistantBubble("bot", tr("assistantCalendarAppOnly")); return true; }
    if (cm) {
      var body = " " + cm[1] + " ", mins = 60;
      body = body.replace(/\s(?:ל|למשך\s+)(שעה|שעתיים|חצי\s+שעה|שלוש\s+שעות|(\d+)\s+שעות|(\d+)\s+דקות)(?=\s)/, function (m0, w, h, mi) {
        mins = h ? +h * 60 : mi ? +mi : { "שעה": 60, "שעתיים": 120, "שלוש שעות": 180 }[w.replace(/\s+/g, " ")] || 30;
        return " ";
      });
      var p = parseVoiceCommand(" תזכיר לי " + body + " ", [], null, { bareWeekday: true });
      var title = (p.items.join(" ") || tr("assistantMeeting")).replace(/^\s*(?:לי|ש)\s+/, "").trim();
      if (!p.reminderTime) { assistantBubble("bot", tr("assistantMeetingWhen")); return true; }
      var start = new Date((p.date || todayISO()) + "T" + p.reminderTime).getTime();
      assistantCalendarId().then(function (calId) {
        if (calId == null) { assistantBubble("bot", tr("calSaveError")); return; }
        return calPlugin.saveEvent({ calendarId: calId, title: title, allDay: false, start: start, end: start + mins * 60000,
          rrule: "", reminderMinutes: 15, location: "", description: "" }).then(function (res) {
          var id = res && res.eventId;
          assistantCalendarReply(tr("assistantMeetingSet"), "📅 " + title + "\n" + assistantDayLabel(wpIso(new Date(start))) + " " + assistantHm(start) + "–" + assistantHm(start + mins * 60000),
            function () { return calPlugin.deleteEvent({ eventId: id }); });
        });
      }).catch(function () { assistantBubble("bot", tr("calSaveError")); });
      return true;
    }
    // moving: which one (its day / words), and to when
    var parts = mm[1].match(/^(.*?)\s(?:ל-?|אל\s+)(?=\d|מחר|היום|יום|שעה|ראשון|שני|שלישי|רביעי|חמישי|שישי|שבת)(.+)$/);
    if (!parts) { assistantBubble("bot", tr("assistantMeetingWhen")); return true; }
    var from = parseVoiceCommand(" " + parts[1] + " ", [], null, { bareWeekday: true });
    var words = from.items.join(" ").replace(/(?:^|\s)(?:ה?פגישה|ה?אירוע|של|עם)(?=\s|$)/g, " ").trim();
    var to = parseVoiceCommand(" תזכיר לי " + parts[2].replace(/^-?/, "ב-").replace(/^ב-(מחר|היום|יום|ראשון|שני|שלישי|רביעי|חמישי|שישי|שבת)/, "$1") + " ", [], null, { bareWeekday: true });
    if (!to.date && !to.reminderTime) { assistantBubble("bot", tr("assistantMeetingWhen")); return true; }
    var now = Date.now();
    calPlugin.listEvents({ from: now - 86400000, to: now + 45 * 86400000 }).then(function (res) {
      var evs = ((res && res.events) || []).filter(function (e) { return !e.allDay; });
      if (from.date) evs = evs.filter(function (e) { return wpIso(new Date(e.begin)) === from.date; });
      if (words) {
        var scored = evs.map(function (e) { return { e: e, s: voiceScoreTask({ text: e.title || "" }, words) }; }).filter(function (x) { return x.s > 0; });
        if (scored.length) evs = scored.sort(function (a, b) { return b.s - a.s; }).map(function (x) { return x.e; });
      }
      evs.sort(function (a, b) { return a.begin - b.begin; });
      var ev = evs.filter(function (e) { return e.begin >= now - 3600000; })[0] || evs[0];
      if (!ev) { assistantBubble("bot", tr("assistantNoSuchMeeting")); return; }
      return calPlugin.getEvent({ eventId: ev.eventId }).then(function (full) {
        var len = (full.dtend || (full.dtstart + (full.durationMs || 3600000))) - full.dtstart;
        var day = to.date || wpIso(new Date(full.dtstart));
        var time = to.reminderTime || assistantHm(full.dtstart);
        var start = new Date(day + "T" + time).getTime();
        var base = { eventId: ev.eventId, calendarId: full.calendarId, title: full.title, allDay: false, rrule: full.rrule || "",
          reminderMinutes: full.reminders && full.reminders.length ? full.reminders[0] : -1, location: full.location || "", description: full.description || "" };
        return calPlugin.saveEvent(Object.assign({}, base, { start: start, end: start + len })).then(function () {
          assistantCalendarReply(tr("assistantMeetingMoved"), "📅 " + full.title + "\n" + assistantDayLabel(day) + " " + time,
            function () { return calPlugin.saveEvent(Object.assign({}, base, { start: full.dtstart, end: full.dtstart + len })); });
        });
      });
    }).catch(function () { assistantBubble("bot", tr("calSaveError")); });
    return true;
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
    if (ctx.kind === "tasks" && assistantTaskCommand(text)) return;
    if (assistantCalendarCommand(text, ctx)) return;
    if (assistantSpecial(text)) return;
    if (ctx.kind === "tasks" && ASSISTANT_TASK_VERB_RE.test(" " + text)) { assistantBubble("bot", tr("assistantTaskNotFound")); return; }
    if (assistantIsQuestion(text)) {
      if (!assistantAnswer(text)) assistantAiChat(text);
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
    assistantLastByVoice = false;
    var text = assistantInput.value;
    assistantInput.value = "";
    // the keyboard goes: the answer shows, then the bar goes too
    assistantInput.blur();
    assistantHandle(text);
  });

  // ---- speaking --------------------------------------------------------------------
  var assistantListening = false;
  function assistantListen() {
    if (assistantListening) { voiceStopListening(); return; }
    assistantStopSpeaking();
    assistantListening = true;
    assistantMicBtn.classList.add("listening");
    assistantInput.placeholder = tr("voiceListening");
    voiceListen().then(function (heard) {
      // silence ends a hands-free run
      assistantLastByVoice = !!(heard && heard.trim());
      assistantHandle(heard);
    }, function (err) {
      assistantLastByVoice = false;
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
