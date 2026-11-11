  // ---------------------------------------------------------------------
  // עוזר ITASK (ניסיון): a chat, like a WhatsApp contact. The site manager
  // writes or dictates what happened ("4 trucks of base course came, the
  // roller worked till 2, tomorrow at 7 meeting with the supervisor"); the
  // itask-assistant function (supabase/functions/itask-assistant) turns it
  // into actions, which are applied here - on the phone, through the same
  // code as the task list, the diary and the calendar - and answered with a
  // short reply and ↶ to undo. The same function will serve WhatsApp later.
  // ---------------------------------------------------------------------
  var assistantView = document.getElementById("assistantView");
  var assistantBody = document.getElementById("assistantBody");
  var assistantForm = document.getElementById("assistantForm");
  var assistantInput = document.getElementById("assistantInput");
  var assistantMicBtn = document.getElementById("assistantMicBtn");
  var ASSISTANT_KEY = "itask-assistant-chat";
  var ASSISTANT_KEEP = 40;
  var assistantChat = [];
  var assistantBusy = false;
  try { assistantChat = JSON.parse(localStorage.getItem(ASSISTANT_KEY) || "[]") || []; } catch (e) { assistantChat = []; }

  function assistantSaveChat() {
    assistantChat = assistantChat.slice(-ASSISTANT_KEEP);
    try { localStorage.setItem(ASSISTANT_KEY, JSON.stringify(assistantChat)); } catch (e) {}
  }

  function openAssistant() {
    state.menuOpen = false;
    render();
    assistantView.hidden = false;
    renderAssistant();
    setTimeout(function () { assistantInput.focus(); }, 0);
  }
  document.getElementById("assistantMenuBtn").addEventListener("click", openAssistant);
  document.getElementById("assistantBackBtn").addEventListener("click", function () {
    assistantView.hidden = true;
    render();
  });
  assistantMicBtn.hidden = !(voiceSpeechPlugin || VoiceWebRecognition);

  function assistantTime(ms) {
    var d = new Date(ms);
    return String(d.getHours()).padStart(2, "0") + ":" + String(d.getMinutes()).padStart(2, "0");
  }
  function renderAssistant() {
    assistantBody.innerHTML = "";
    if (!assistantChat.length) {
      var hello = document.createElement("div");
      hello.className = "assistant-hello";
      hello.textContent = tr("assistantHello");
      assistantBody.appendChild(hello);
    }
    assistantChat.forEach(function (m, i) {
      var b = document.createElement("div");
      b.className = "assistant-msg " + (m.role === "user" ? "mine" : "theirs") + (m.error ? " error" : "");
      var t = document.createElement("div");
      t.className = "assistant-text";
      t.textContent = m.text;
      b.appendChild(t);
      var meta = document.createElement("div");
      meta.className = "assistant-meta";
      meta.textContent = assistantTime(m.at || Date.now());
      b.appendChild(meta);
      // ↶ for the latest answer that did something (until undone)
      if (m.role === "assistant" && m.undoable && i === assistantChat.length - 1 && assistantUndo) {
        var u = document.createElement("button");
        u.type = "button";
        u.className = "assistant-undo";
        u.textContent = tr("undoBtn");
        u.addEventListener("click", assistantDoUndo);
        b.appendChild(u);
      }
      assistantBody.appendChild(b);
    });
    if (assistantBusy) {
      var typing = document.createElement("div");
      typing.className = "assistant-msg theirs typing";
      typing.textContent = tr("assistantTyping");
      assistantBody.appendChild(typing);
    }
    assistantBody.scrollTop = assistantBody.scrollHeight;
  }

  // what the assistant knows about the user's projects (kept short)
  function assistantContext() {
    var now = new Date();
    return {
      today: todayISO(),
      now: assistantTime(now.getTime()),
      weekday: now.toLocaleDateString("he-IL", { weekday: "long" }),
      calendar: !!calPlugin,
      projects: voiceTargetSheets().map(function (s) {
        return {
          id: s.id,
          name: s.name,
          open_tasks: (s.tasks || []).filter(function (t) {
            return t.type !== "note" && t.status !== 2 && !t.headOfficeVirtual && !t.planItemId && (t.text || "").trim();
          }).slice(0, 40).map(function (t) { return { id: t.id, text: t.text, date: t.date }; }),
          activities: (s.workPlan || []).filter(function (x) { return x.status !== "done"; }).slice(0, 40).map(function (x) {
            return { id: x.id, name: x.name, progress: x.progress || 0, start: x.start, end: x.end, by: x.by || "" };
          })
        };
      })
    };
  }

  // ---- applying the actions -------------------------------------------
  // (an undo looks the project up again: a shared one may have been
  // reloaded from the server meanwhile, with new objects)
  function assistantLiveSheet(id) {
    return voiceTargetSheets().find(function (s) { return s.id === id; }) || null;
  }
  function assistantDiaryPush(sheet, list, entry, day) {
    day = day || todayISO();
    var log = findOrCreateSiteLog(sheet, day);
    if (!Array.isArray(log[list])) log[list] = [];
    log[list].push(entry);
    saveData();
    return function () {
      var cur = assistantLiveSheet(sheet.id);
      var live = cur && findSiteLog(cur, day);
      if (live && Array.isArray(live[list])) live[list] = live[list].filter(function (e) { return e.id !== entry.id; });
      saveData();
    };
  }
  function assistantDiaryColumnPush(sheet, group, column, entry, day) {
    day = day || todayISO();
    var log = findOrCreateSiteLog(sheet, day);
    if (!Array.isArray(log[group][column])) log[group][column] = [];
    log[group][column].push(entry);
    saveData();
    return function () {
      var cur = assistantLiveSheet(sheet.id);
      var live = cur && findSiteLog(cur, day);
      if (live && Array.isArray(live[group][column])) live[group][column] = live[group][column].filter(function (e) { return e.id !== entry.id; });
      saveData();
    };
  }
  // one action -> a Promise of its undo function (or null when nothing was done).
  // day: the diary's date (a WhatsApp message applied later: the day it was sent)
  function assistantApply(a, day) {
    day = /^\d{4}-\d{2}-\d{2}$/.test(day || "") ? day : todayISO();
    var sheet = voiceTargetSheets().find(function (s) { return s.id === a.project_id; });
    if (!sheet) return Promise.resolve(null);
    var text = String(a.text || "").replace(/\s+/g, " ").trim();
    var date = /^\d{4}-\d{2}-\d{2}$/.test(a.date || "") ? a.date : todayISO();
    var time = /^\d{2}:\d{2}$/.test(a.time || "") ? a.time : "";
    // a task the assistant added: its undo takes it out of the live project
    var removeTaskUndo = function (res) {
      if (!res || !res.taskId) return null;
      return function () {
        var cur = assistantLiveSheet(sheet.id);
        if (!cur) return;
        cur.tasks = (cur.tasks || []).filter(function (x) { return x.id !== res.taskId; });
        saveData();
      };
    };
    switch (a.type) {
      case "add_task":
        if (!text) return Promise.resolve(null);
        return voiceApplyCommand(sheet, { action: "task", texts: [text], date: date, reminderTime: time || null }).then(removeTaskUndo);
      case "complete_task":
        return voiceApplyCommand(sheet, { action: "done", doneTaskId: a.task_id }).then(function (res) {
          if (!res) return null;
          return function () {
            var cur = assistantLiveSheet(sheet.id);
            var t = cur && (cur.tasks || []).find(function (x) { return x.id === a.task_id; });
            if (!t) return;
            t.status = 0;
            if (t.planItemId) workPlanTaskStatusChanged(cur, t);
            saveData();
          };
        });
      case "diary_work":
        if (!text) return Promise.resolve(null);
        return Promise.resolve(assistantDiaryPush(sheet, "works", { id: uid(), text: text, attachment: null }, day));
      case "diary_contractor":
        if (!text) return Promise.resolve(null);
        return Promise.resolve(assistantDiaryPush(sheet, "contractors", { id: uid(), name: text }, day));
      case "diary_procurement":
        if (!text) return Promise.resolve(null);
        return Promise.resolve(assistantDiaryPush(sheet, "procurement", { id: uid(), item: text, quantity: String(a.quantity || ""), supplier: String(a.supplier || "") }, day));
      case "diary_attendance":
        if (!text || SITE_LOG_ATTENDANCE_COLUMNS.indexOf(a.column) === -1) return Promise.resolve(null);
        return Promise.resolve(assistantDiaryColumnPush(sheet, "attendance", a.column, { id: uid(), name: text }, day));
      case "diary_tool":
        if (SITE_LOG_TOOLS_COLUMNS.indexOf(a.column) === -1) return Promise.resolve(null);
        return Promise.resolve(assistantDiaryColumnPush(sheet, "tools", a.column, { id: uid(), qty: String(a.quantity || "1"), note: text }, day));
      case "activity_progress":
        var item = (sheet.workPlan || []).find(function (x) { return x.id === a.activity_id; });
        var pct = Math.max(0, Math.min(100, Math.round(Number(a.percent) || 0)));
        if (!item || !pct) return Promise.resolve(null);
        var before = JSON.parse(JSON.stringify(item));
        var log0 = findSiteLog(sheet, day);
        var dayBefore = log0 && (log0.planned || []).find(function (e) { return e.itemId === item.id; });
        dayBefore = dayBefore ? JSON.parse(JSON.stringify(dayBefore)) : null;
        setSiteLogPlanPct(sheet, day, item, pct);
        return Promise.resolve(function () {
          var cur = assistantLiveSheet(sheet.id);
          if (!cur) return;
          var log = findSiteLog(cur, day);
          if (log && Array.isArray(log.planned)) {
            log.planned = log.planned.filter(function (e) { return e.itemId !== item.id; });
            if (dayBefore) log.planned.push(dayBefore);
          }
          saveWorkPlanItem(cur, before, false);
          saveData();
        });
      case "calendar_event":
        if (!text) return Promise.resolve(null);
        if (!calPlugin) {
          // no phone calendar here (web / computer): a task with a reminder instead
          return voiceApplyCommand(sheet, { action: "task", texts: ["📅 " + text], date: date, reminderTime: time || null }).then(removeTaskUndo);
        }
        var allDay = !time;
        var start, end;
        if (allDay) {
          var p = date.split("-");
          start = Date.UTC(+p[0], +p[1] - 1, +p[2]);
          end = start + 86400000;
        } else {
          start = new Date(date + "T" + time).getTime();
          var endTime = /^\d{2}:\d{2}$/.test(a.end_time || "") ? a.end_time : "";
          end = endTime ? new Date(date + "T" + endTime).getTime() : start + 3600000;
          if (end <= start) end = start + 3600000;
        }
        return calQuickAddEvent(text, start, end, allDay, sheet.name).then(function (eventId) {
          if (eventId == null) return null;
          return function () { calQuickDeleteEvent(eventId); };
        });
    }
    return Promise.resolve(null);
  }

  var assistantUndo = null;
  function assistantDoUndo() {
    var undo = assistantUndo;
    assistantUndo = null;
    if (!undo) return;
    undo();
    render();
    assistantChat.push({ role: "assistant", text: tr("assistantUndone"), at: Date.now() });
    assistantSaveChat();
    renderAssistant();
  }

  function assistantSend(text) {
    text = String(text || "").replace(/\s+/g, " ").trim();
    if (!text || assistantBusy) return;
    var history = assistantChat.filter(function (m) { return !m.error; }).slice(-6)
      .map(function (m) { return { role: m.role, text: m.text }; });
    assistantChat.push({ role: "user", text: text, at: Date.now() });
    assistantSaveChat();
    assistantBusy = true;
    renderAssistant();
    var call = supabaseClient
      ? supabaseClient.functions.invoke("itask-assistant", { body: { text: text, context: assistantContext(), history: history } })
      : Promise.resolve({ data: null, error: new Error("offline") });
    call.then(function (res) {
      var out = res && !res.error && res.data;
      if (!out || out.error) throw new Error((out && out.error) || "failed");
      var actions = Array.isArray(out.actions) ? out.actions : [];
      // one after another (each saves before the next reads)
      var undos = [];
      return actions.reduce(function (p, a) {
        return p.then(function () {
          return assistantApply(a).then(function (u) { if (u) undos.push(u); }, function () {});
        });
      }, Promise.resolve()).then(function () {
        render();
        assistantUndo = undos.length ? function () { undos.slice().reverse().forEach(function (u) { u(); }); } : null;
        var reply = String(out.reply || "").trim() || (undos.length ? tr("assistantDone") : tr("assistantNothing"));
        if (actions.length && !undos.length) reply = tr("assistantNothing");
        assistantChat.push({ role: "assistant", text: reply, at: Date.now(), undoable: !!undos.length });
      });
    }).catch(function () {
      assistantChat.push({ role: "assistant", text: tr("assistantError"), at: Date.now(), error: true });
    }).then(function () {
      assistantBusy = false;
      assistantSaveChat();
      renderAssistant();
    });
  }

  assistantForm.addEventListener("submit", function (e) {
    e.preventDefault();
    var text = assistantInput.value;
    assistantInput.value = "";
    assistantSend(text);
  });
  assistantMicBtn.addEventListener("click", function () {
    if (assistantMicBtn.classList.contains("listening")) { voiceStopListening(); return; }
    assistantMicBtn.classList.add("listening");
    voiceListen().then(function (heard) {
      if (String(heard || "").trim()) assistantSend(heard);
    }, function (err) {
      showToast(tr(err && err.message === "permission" ? "voicePermissionMsg" : "voiceNoSpeech"));
    }).then(function () { assistantMicBtn.classList.remove("listening"); });
  });
