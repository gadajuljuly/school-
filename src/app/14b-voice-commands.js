
  // ---------------------------------------------------------------------
  // Voice commands: the microphone by the new-task field. The phone's own
  // recognizer turns speech into text (the SpeechRecognition plugin in
  // the app, webkitSpeechRecognition in a browser); parseVoiceCommand
  // turns the text into a command offline, or an on-device model does
  // (ItaskAI, when the phone has one - see voiceAiParse). Nothing is
  // saved before the user confirms it in #voiceOverlay.
  // ---------------------------------------------------------------------
  var voiceSpeechPlugin = (
    window.Capacitor && window.Capacitor.isNativePlatform && window.Capacitor.isNativePlatform() &&
    window.Capacitor.Plugins && window.Capacitor.Plugins.SpeechRecognition
  ) || null;
  var VoiceWebRecognition = window.SpeechRecognition || window.webkitSpeechRecognition || null;
  var voiceAiPlugin = (
    window.Capacitor && window.Capacitor.Plugins && window.Capacitor.Plugins.ItaskAI
  ) || null;

  var VOICE_HE_HOURS = {
    "אחת עשרה": 11, "שתים עשרה": 12, "שתיים עשרה": 12, "אחת": 1, "שתיים": 2, "שתים": 2,
    "שלוש": 3, "ארבע": 4, "חמש": 5, "שש": 6, "שבע": 7, "שמונה": 8, "תשע": 9, "עשר": 10
  };
  var VOICE_HE_COUNTS = {
    "אחת": 1, "אחד": 1, "שתיים": 2, "שתים": 2, "שניים": 2, "שני": 2, "שתי": 2, "שלוש": 3, "שלושה": 3,
    "ארבע": 4, "ארבעה": 4, "חמש": 5, "חמישה": 5, "שש": 6, "שישה": 6, "שבע": 7, "שבעה": 7,
    "שמונה": 8, "תשע": 9, "תשעה": 9, "עשר": 10, "עשרה": 10, "עשרים": 20, "שלושים": 30,
    "ארבעים": 40, "חמישים": 50
  };
  var VOICE_HE_MONTHS = {
    "ינואר": 1, "פברואר": 2, "מרץ": 3, "מרס": 3, "אפריל": 4, "מאי": 5, "יוני": 6, "יולי": 7,
    "אוגוסט": 8, "ספטמבר": 9, "אוקטובר": 10, "נובמבר": 11, "דצמבר": 12
  };
  var VOICE_WEEKDAYS = {
    "ראשון": 0, "שני": 1, "שלישי": 2, "רביעי": 3, "חמישי": 4, "שישי": 5, "שבת": 6,
    "الأحد": 0, "الاحد": 0, "الاثنين": 1, "الإثنين": 1, "الثلاثاء": 2, "الأربعاء": 3, "الاربعاء": 3,
    "الخميس": 4, "الجمعة": 5, "السبت": 6
  };
  var VOICE_DAYPART = "בבוקר|בצהריים|בצהרים|אחר הצהריים|אחרי הצהריים|אחה\"צ|אחה״צ|בערב|בלילה|الصبح|صباحا|صباحاً|الظهر|المسا|مساء|مساءً|بالليل";

  var VOICE_NAME_STOPWORDS = ["פרויקט", "של", "את", "עם", "על", "מול", "مشروع"];

  function voiceAlt(map) {
    return Object.keys(map).sort(function (a, b) { return b.length - a.length; }).join("|");
  }
  function voiceNumber(token) {
    if (token == null) return null;
    if (/^\d+$/.test(token)) return parseInt(token, 10);
    return VOICE_HE_COUNTS.hasOwnProperty(token) ? VOICE_HE_COUNTS[token] : null;
  }
  function voiceYmd(d) {
    return d.getFullYear() + "-" + String(d.getMonth() + 1).padStart(2, "0") + "-" + String(d.getDate()).padStart(2, "0");
  }
  function voiceHm(h, m) {
    return String(h).padStart(2, "0") + ":" + String(m).padStart(2, "0");
  }
  // A word's matching key: no punctuation, and without the prefix letters
  // Hebrew glues on (ו ב ל ה מ ש כ) or the Arabic article/prepositions -
  // both sides are keyed the same way, so "בחולון" finds "חולון".
  function voiceWordKey(w) {
    var k = String(w).replace(/[^֐-׿؀-ۿa-zA-Z0-9]/g, "").toLowerCase();
    if (/[؀-ۿ]/.test(k)) {
      var a = k.replace(/^(و|ف)?(ب|ل)?(ال)?/, "");
      return a.length >= 2 ? a : k;
    }
    for (var i = 0; i < 2 && k.length > 3 && /^[ובלהמשכ]/.test(k); i++) k = k.slice(1);
    return k;
  }
  function voiceKeys(text) {
    return String(text).split(/\s+/).map(voiceWordKey).filter(function (k) { return k.length >= 2; });
  }

  // The project the sentence names, by the most words of its name heard
  // (a part is enough: "חולון" for "חולון – בניין B"). Returns the words
  // to drop from the task text too, with a "בפרויקט"/"של" right before.
  function voiceFindSheet(text, sheets) {
    var words = text.split(/\s+/);
    var keys = words.map(voiceWordKey);
    var best = null;
    sheets.forEach(function (sheet) {
      var nameKeys = voiceKeys(sheet.name).filter(function (k) { return VOICE_NAME_STOPWORDS.indexOf(k) === -1; });
      if (!nameKeys.length) return;
      var hit = [];
      keys.forEach(function (k, i) { if (k.length >= 2 && nameKeys.indexOf(k) !== -1) hit.push(i); });
      if (!hit.length) return;
      var score = hit.length + hit.length / nameKeys.length;
      if (!best || score > best.score) best = { sheet: sheet, score: score, hit: hit };
    });
    if (!best) return null;
    var drop = {};
    best.hit.forEach(function (i) {
      drop[i] = true;
      for (var j = i - 1; j >= 0 && j >= i - 2; j--) {
        if (/^(פרויקט|של|مشروع)$/.test(keys[j]) || keys[j] === "") drop[j] = true;
        else break;
      }
    });
    return {
      sheet: best.sheet,
      rest: words.filter(function (w, i) { return !drop[i]; }).join(" ")
    };
  }

  // Free speech -> { action: "task"|"note"|"done", items, sheetId, date,
  // reminderTime }. Offline rules for Hebrew (and the common Arabic
  // words); whatever isn't recognized as a command, project, date or time
  // stays the task's text.
  function parseVoiceCommand(rawText, sheets, nowMs, opts) {
    opts = opts || {};
    if (!opts.plan && VOICE_PLAN_RE.test(" " + rawText + " ")) return parseVoicePlan(rawText, sheets, nowMs, opts);
    var now = new Date(nowMs || Date.now());
    // commas set apart, so "שלישי," still reads as a word
    var text = " " + String(rawText || "").replace(/[״]/g, "\"").replace(/[–—]/g, "-").replace(/\s*([,،])\s*/g, " $1 ").replace(/\s+/g, " ").trim() + " ";
    var result = { action: "task", items: [], sheetId: null, date: null, reminderTime: null };
    var reminderIntent = false, plural = false, dateFound = false;
    var reminderAt = null;

    function take(re, fn) {
      text = text.replace(re, function () {
        var keep = fn.apply(null, arguments);
        return keep === false ? arguments[0] : " ";
      });
    }

    // --- what to do ---------------------------------------------------
    take(/(\s)(?:תזכיר|תזכירי|תזכרי|להזכיר|תזכורת|ذكرني|ذكّرني|ذكريني|تذكير)(?:\s+לי)?(?:\s+ש(?=[^\s]{3,})|(?=\s))/g, function () { reminderIntent = true; });
    take(/(\s)(?:סמן|תסמן|סמני|תסמני|סיימתי|סיימנו)(?:\s+את)?(?:\s+ה?משימה)?(?:\s+כ?-?(?:בוצע|בוצעה|גמור|גמורה|הושלם|הושלמה))?(?=\s)/g, function () { result.action = "done"; });
    take(/(\s)(?:כ-?)?(?:בוצע|בוצעה|הושלם|הושלמה|تم|خلصت|انتهيت)(?=\s)/g, function () { result.action = "done"; });
    take(/(\s)(?:תוסיף|תוסיפי|הוסף|הוסיפי|תרשום|תרשמי|רשום|רשמי|תכתוב|תכתבי|כתוב|כתבי|أضف|اضف|ضيف|اكتب|سجل)(?:\s+לי|\s+لي)?(?=\s)/g, function () {});
    // "מזכרת" anywhere; "הערה" only opening the command (it's also a word
    // tasks use: "לתקן את הערת המפקח")
    take(/(\s)(?:מזכרת|ملاحظة)(?:\s+חדשה|\s+جديدة)?(?=\s)|^(\s)הערה(?:\s+חדשה)?(?=\s)/g, function () { if (result.action !== "done") result.action = "note"; });
    var pluralCount = 0;
    take(new RegExp("(\\s)(?:(\\d+|" + voiceAlt(VOICE_HE_COUNTS) + ")\\s+)?משימות(?:\\s+חדשות)?(?=\\s)", "g"), function (m, sp, n) {
      plural = true;
      pluralCount = voiceNumber(n) || 0;
    });
    take(/(\s)(?:ה?משימה|مهمة)(?:\s+חדשה|\s+جديدة)?(?=\s)/g, function () {});

    // --- when ---------------------------------------------------------
    take(/(\s)(?:ב)?עוד\s+(חצי שעה|רבע שעה|שעה|שעתיים|יומיים|שבוע|שבועיים|(\S+)\s+(דקות|דקה|שעות|ימים))(?=\s)/g, function (m, sp, what, n, unit) {
      var count = voiceNumber(n);
      var mins = { "חצי שעה": 30, "רבע שעה": 15, "שעה": 60, "שעתיים": 120 }[what];
      var days = { "יומיים": 2, "שבוע": 7, "שבועיים": 14 }[what];
      if (unit) {
        if (count == null) return false;
        if (unit === "דקות" || unit === "דקה") mins = count;
        else if (unit === "שעות") mins = count * 60;
        else days = count;
      }
      if (mins != null) {
        reminderAt = new Date(now.getTime() + mins * 60000);
      } else {
        var d = new Date(now); d.setDate(d.getDate() + days);
        result.date = voiceYmd(d);
      }
      dateFound = true;
    });
    take(/(\s)بعد\s+(ساعة|ساعتين|نص ساعة|نصف ساعة|(\d+)\s+(دقائق|دقيقة|ساعات))(?=\s)/g, function (m, sp, what, n, unit) {
      var mins = { "ساعة": 60, "ساعتين": 120, "نص ساعة": 30, "نصف ساعة": 30 }[what];
      if (unit) mins = parseInt(n, 10) * (unit === "ساعات" ? 60 : 1);
      reminderAt = new Date(now.getTime() + mins * 60000);
      dateFound = true;
    });
    take(/(\s)(?:מ)?(?:ה)?(?:יום\s+)?(מחרתיים|היום|מחר|بعد بكرة|بعد بكره|اليوم|بكرة|بكره|غدا|غداً|بكرا)(?=\s)/g, function (m, sp, w) {
      var d = new Date(now);
      if (/מחרתיים|بعد/.test(w)) d.setDate(d.getDate() + 2);
      else if (/מחר|بكر|غد/.test(w)) d.setDate(d.getDate() + 1);
      result.date = voiceYmd(d);
      dateFound = true;
    });
    take(new RegExp("(\\s)(?:ב|ל|מ)?(?:יום\\s+)?(" + voiceAlt(VOICE_WEEKDAYS) + ")(?:\\s+(?:הבא|הקרוב|القادم|الجاي))?(?=\\s)", "g"), function (m, sp, w) {
      // "שני"/"שלישי"... alone are also numbers/words - need "יום" or "ב"
      if (!/יום|^\s*ב|ال/.test(m) && !opts.bareWeekday) return false;
      var d = new Date(now);
      var diff = (VOICE_WEEKDAYS[w] - d.getDay() + 7) % 7 || 7;
      d.setDate(d.getDate() + diff);
      result.date = voiceYmd(d);
      dateFound = true;
    });
    take(new RegExp("(\\s)(?:ב-?|ל-?|מה-?|מ-?|ה-?)?(\\d{1,2})(?:[./](\\d{1,2})(?:[./](\\d{2,4}))?|\\s+(?:ב|ל)(" + voiceAlt(VOICE_HE_MONTHS) + "|חודש))(?=\\s)", "g"), function (m, sp, day, mon, yr, monName) {
      var dd = parseInt(day, 10);
      var mm = mon ? parseInt(mon, 10) : (monName && monName !== "חודש" ? VOICE_HE_MONTHS[monName] : now.getMonth() + 1);
      if (dd < 1 || dd > 31 || mm < 1 || mm > 12) return false;
      var yy = yr ? (yr.length === 2 ? 2000 + parseInt(yr, 10) : parseInt(yr, 10)) : now.getFullYear();
      var d = new Date(yy, mm - 1, dd);
      if (!yr && voiceYmd(d) < voiceYmd(now)) {
        if (monName === "חודש") d = new Date(yy, mm, dd); else d = new Date(yy + 1, mm - 1, dd);
      }
      result.date = voiceYmd(d);
      dateFound = true;
    });

    // Clock times: "בשעה 10", "ב-8:30", "בשמונה וחצי בערב", "ברבע לתשע".
    // A bare "ב-3"/"בשלוש" only counts as a time with a reminder, a day,
    // minutes or a part of the day around it ("ב-3 קומות" stays text).
    var timeFound = false;
    var hourAlt = voiceAlt(VOICE_HE_HOURS);
    take(new RegExp("(\\s)(בשעה\\s+|ב-?|الساعة\\s+|عالساعة\\s+)?(?:(רבע|עשרה|חמישה|עשרים)\\s+ל-?)?(?:(\\d{1,2})(?::(\\d{2}))?|(" + hourAlt + "))(\\s+(?:וחצי|ורבע|ועשרה|ועשרים|וחמישה|וחמש|ושלושים|וארבעים|ونص|وربع))?(\\s+(?:" + VOICE_DAYPART + "))?(?=\\s)", "g"),
      function (m, sp, prefix, before, hDigits, mDigits, hWord, minWord, part) {
        if (timeFound) return false;
        var strong = /בשעה|الساعة/.test(prefix || "") || mDigits || minWord || part || before;
        if (!strong && !(prefix && (reminderIntent || dateFound))) return false;
        var h = hDigits != null ? parseInt(hDigits, 10) : VOICE_HE_HOURS[hWord];
        var min = mDigits ? parseInt(mDigits, 10) : 0;
        if (minWord) {
          min = { "וחצי": 30, "ורבע": 15, "ועשרה": 10, "ועשרים": 20, "וחמישה": 5, "וחמש": 5, "ושלושים": 30, "וארבעים": 40, "ونص": 30, "وربع": 15 }[minWord.trim()];
        }
        if (before) { min = 60 - { "רבע": 15, "עשרה": 10, "חמישה": 5, "עשרים": 20 }[before]; h -= 1; }
        if (h > 23 || min > 59 || h < 0) return false;
        var p = (part || "").trim();
        if (h < 12 && h > 0) {
          if (/צהר|אחה|ערב|الظهر|مسا|المسا|بالليل/.test(p) && !(p === "בצהריים" && h >= 11)) h += 12;
          else if (/לילה/.test(p)) { if (h >= 6) h += 12; }
          else if (!p && !mDigits && h <= 6) h += 12;
          else if (!p && mDigits && h <= 5) h += 12;
        }
        result.reminderTime = voiceHm(h % 24, min);
        timeFound = true;
      });
    if (!timeFound && reminderIntent) {
      take(new RegExp("(\\s)(" + VOICE_DAYPART + ")(?=\\s)"), function (m, sp, p) {
        if (/בוקר|الصبح|صباح/.test(p)) result.reminderTime = "08:00";
        else if (/בצהר|الظهر/.test(p)) result.reminderTime = "12:00";
        else if (/אחה|אחר|אחרי/.test(p)) result.reminderTime = "16:00";
        else result.reminderTime = "19:00";
        timeFound = true;
      });
    }
    if (reminderAt) {
      result.date = voiceYmd(reminderAt);
      result.reminderTime = voiceHm(reminderAt.getHours(), reminderAt.getMinutes());
    }

    // --- where --------------------------------------------------------
    var found = voiceFindSheet(text.trim(), sheets || []);
    if (found) {
      result.sheetId = found.sheet.id;
      text = " " + found.rest + " ";
    }

    // --- the text itself ----------------------------------------------
    var rest = text.replace(/\s+/g, " ").trim()
      .replace(/^(?:את|ש|ו|לי|עם|ל|في|ب)\s+/, "")
      .replace(/\s+(?:ו|את|ב|ל|של|في)$/, "")
      .replace(/^[-:,.\s]+|[-:,.\s]+$/g, "");
    var items = [rest];
    if (result.action !== "done") {
      items = rest.split(/\s*[,،]\s*|\s+וגם\s+/);
      if (plural) {
        items = [].concat.apply([], items.map(function (it) { return it.split(/\s+ו(?=ל\S{2,})/); }));
        // "שלוש משימות: להזמין בטון לבדוק ברזל ולתאם משאבה" without commas:
        // the missing splits go before the next infinitive-looking word
        var missing = pluralCount - items.length;
        for (var i = 0; i < items.length && missing > 0; i++) {
          var words = items[i].split(" ");
          if (!/^ל\S{2,}$/.test(words[0])) continue;
          for (var w = 2; w < words.length && missing > 0; w++) {
            if (/^ל\S{3,}$/.test(words[w]) && !/^ל(?:פרויקט|קבלן|ספק|מפקח|קומה)/.test(words[w])) {
              items.splice(i, 1, words.slice(0, w).join(" "), words.slice(w).join(" "));
              missing--;
              break;
            }
          }
        }
      }
    }
    result.items = items.map(function (s) { return s.trim(); }).filter(Boolean);
    if (!result.date && result.reminderTime) {
      // a time already gone today means tomorrow
      result.date = voiceHm(now.getHours(), now.getMinutes()) < result.reminderTime ? voiceYmd(now) :
        voiceYmd(new Date(now.getFullYear(), now.getMonth(), now.getDate() + 1));
    }
    return result;
  }

  // "תוסיף לתוכנית העבודה יציקת תקרה קומה 3 מיום ראשון עד שלישי, צוות
  // טפסנות" -> { action: "plan", items, sheetId, date (start), endDate, by }.
  // The part before "עד" is parsed as usual (its date is the start), the
  // part after it gives the end; "למשך שבוע" works too. Who carries it out:
  // a name from the project's lists, or a trailing "צוות/קבלן ...".
  var VOICE_PLAN_RE = /\s(?:ל|ב)?(?:תוכנית|תכנית)(?:\s+ה?עבודה)?(?=\s)|\sלגאנט(?=\s)|\s(?:لخطة|خطة)\s+العمل(?=\s)/;
  function parseVoicePlan(rawText, sheets, nowMs, opts) {
    var text = " " + String(rawText || "").replace(/\s+/g, " ").trim() + " ";
    text = text.replace(new RegExp(VOICE_PLAN_RE.source, "g"), " ");
    var days = null;
    text = text.replace(/\sלמשך\s+(שבוע|שבועיים|יומיים|חודש|(\S+)\s+(ימים|שבועות))(?=\s)/, function (m, what, n, unit) {
      var count = voiceNumber(n);
      days = { "שבוע": 7, "שבועיים": 14, "יומיים": 2, "חודש": 30 }[what] || (count ? count * (unit === "שבועות" ? 7 : 1) : null);
      return " ";
    });
    var split = text.match(/^(.*?)\s(?:ו)?(?:עד|حتى|لغاية)\s+(?:ל|ה)?-?(.*)$/);
    var left = split ? split[1] : text;
    var res = parseVoiceCommand(left, sheets, nowMs, { plan: true });
    var rest = res.items.join(", ");
    var endDate = null;
    var start = res.date || voiceYmd(new Date(nowMs || Date.now()));
    if (split) {
      var right = parseVoiceCommand(" " + split[2] + " ", [], nowMs, { plan: true, bareWeekday: true });
      // "מיום ראשון עד שלישי": the Tuesday after that Sunday
      if (right.date && right.date < start) {
        right = parseVoiceCommand(" " + split[2] + " ", [], new Date(start + "T12:00").getTime(), { plan: true, bareWeekday: true });
      }
      endDate = right.date;
      if (right.items.length) rest = (rest ? rest + ", " : "") + right.items.join(", ");
    }
    if (!endDate && days) {
      var e = new Date(start + "T12:00"); e.setDate(e.getDate() + days - 1);
      endDate = voiceYmd(e);
    }
    var by = "";
    (opts.people || []).slice().sort(function (a, b) { return b.length - a.length; }).some(function (name) {
      var at = name && rest.indexOf(name);
      if (!name || at === -1) return false;
      by = name;
      rest = (rest.slice(0, at) + rest.slice(at + name.length));
      return true;
    });
    if (!by) {
      rest = rest.replace(/(?:^|,\s*|\s)((?:צוות|קבלן|קבלני|חברת|فرقة|مقاول)\s+[^,]+)$/, function (m, who) { by = who.trim(); return ""; });
    }
    rest = rest.replace(/\s*,\s*/g, ", ").replace(/^[\s,:-]+|[\s,:-]+$/g, "").replace(/^(?:את|ש)\s+/, "");
    return {
      action: "plan",
      items: rest ? [rest.replace(/,\s*/g, " ")] : [],
      sheetId: res.sheetId,
      date: start,
      endDate: endDate && endDate >= start ? endDate : start,
      by: by,
      reminderTime: null
    };
  }

  // The on-device model (ItaskAI - Gemini Nano on Android phones that have
  // it): asked for the same command as JSON. Anything missing, invalid or
  // slow falls back to parseVoiceCommand.
  function voiceAiPrompt(text, sheets) {
    return [
      "Convert a spoken command for a construction task app into JSON.",
      "Today is " + voiceYmd(new Date()) + " (" + ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"][new Date().getDay()] + "), time " + voiceHm(new Date().getHours(), new Date().getMinutes()) + ".",
      "Projects: " + sheets.map(function (s) { return JSON.stringify(s.name); }).join(", "),
      "Reply with JSON only: {\"action\":\"task|note|done\",\"items\":[\"task text in the speaker's language\"],\"project\":\"exact project name or null\",\"date\":\"YYYY-MM-DD or null\",\"time\":\"HH:MM or null\"}",
      "Several tasks in one sentence become several items. \"time\" is only for a requested reminder or a stated hour.",
      "Command: " + text
    ].join("\n");
  }
  function voiceAiResultToCommand(reply, sheets) {
    var m = String(reply || "").match(/\{[\s\S]*\}/);
    if (!m) return null;
    var j;
    try { j = JSON.parse(m[0]); } catch (e) { return null; }
    if (!j || ["task", "note", "done"].indexOf(j.action) === -1 || !Array.isArray(j.items)) return null;
    var items = j.items.filter(function (s) { return typeof s === "string" && s.trim(); }).map(function (s) { return s.trim(); });
    if (!items.length && j.action !== "task") return null;
    var sheet = null;
    if (j.project) {
      sheet = sheets.find(function (s) { return s.name === j.project; }) ||
        (voiceFindSheet(String(j.project), sheets) || {}).sheet || null;
    }
    return {
      action: j.action,
      items: items,
      sheetId: sheet ? sheet.id : null,
      date: /^\d{4}-\d{2}-\d{2}$/.test(j.date || "") ? j.date : null,
      reminderTime: /^\d{2}:\d{2}$/.test(j.time || "") ? j.time : null,
      byAi: true
    };
  }
  // The model's on/off switch (in the voice dialog) and its state:
  // available / downloadable / downloading / unavailable / failed. A
  // downloadable model is fetched once, in the background (AICore keeps it).
  var VOICE_AI_PREF_KEY = "itask-voice-ai";
  var voiceAiState = "unknown";
  var voiceAiProgress = null;
  function voiceAiEnabled() {
    try { return localStorage.getItem(VOICE_AI_PREF_KEY) !== "off"; } catch (e) { return true; }
  }
  function startVoiceAiDownload() {
    if (voiceAiState === "downloading") return;
    voiceAiState = "downloading";
    voiceAiProgress = null;
    renderVoiceAiRow();
    voiceAiPlugin.download().then(function () {
      voiceAiState = "available";
      renderVoiceAiRow();
    }).catch(function () {
      voiceAiState = "failed";
      renderVoiceAiRow();
    });
  }
  function refreshVoiceAiStatus() {
    if (!voiceAiPlugin) return;
    voiceAiPlugin.available().then(function (res) {
      if (voiceAiState === "downloading") return;
      voiceAiState = (res && res.status) || (res && res.available ? "available" : "unavailable");
      if (voiceAiState === "downloadable" && voiceAiEnabled()) startVoiceAiDownload();
      renderVoiceAiRow();
    }).catch(function () {});
  }
  if (voiceAiPlugin && voiceAiPlugin.addListener) {
    voiceAiPlugin.addListener("downloadProgress", function (d) {
      voiceAiProgress = d && d.total ? Math.round(d.bytes * 100 / d.total) : null;
      renderVoiceAiRow();
    });
  }

  function voiceAiParse(text, sheets) {
    if (!voiceAiPlugin || !voiceAiEnabled()) return Promise.resolve(null);
    var ask = voiceAiPlugin.available().then(function (res) {
      if (!res || !res.available) return null;
      return voiceAiPlugin.generate({ prompt: voiceAiPrompt(text, sheets) }).then(function (out) {
        return voiceAiResultToCommand(out && out.text, sheets);
      });
    }).catch(function () { return null; });
    var timeout = new Promise(function (resolve) { setTimeout(function () { resolve(null); }, 10000); });
    return Promise.race([ask, timeout]);
  }

  // ---- listening ---------------------------------------------------------
  function voiceSpeechLang() {
    return { he: "he-IL", en: "en-US", ar: "ar-IL", ru: "ru-RU" }[currentLang] || "he-IL";
  }
  var voiceWebRec = null;
  var voiceListenToken = 0;
  function voiceListen() {
    if (voiceSpeechPlugin) {
      return voiceSpeechPlugin.requestPermissions().then(function (p) {
        if (!p || p.speechRecognition !== "granted") throw new Error("permission");
        return voiceSpeechPlugin.start({ language: voiceSpeechLang(), maxResults: 1, partialResults: false, popup: false });
      }).then(function (res) {
        return (res && res.matches && res.matches[0]) || "";
      });
    }
    return new Promise(function (resolve, reject) {
      var rec = new VoiceWebRecognition();
      var heard = "";
      voiceWebRec = rec;
      rec.lang = voiceSpeechLang();
      rec.interimResults = false;
      rec.maxAlternatives = 1;
      rec.onresult = function (e) { heard = e.results[0][0].transcript; };
      rec.onerror = function (e) {
        reject(new Error(e.error === "not-allowed" || e.error === "service-not-allowed" ? "permission" : (e.error || "error")));
      };
      rec.onend = function () { voiceWebRec = null; resolve(heard); };
      rec.start();
    });
  }
  function voiceStopListening() {
    if (voiceSpeechPlugin) voiceSpeechPlugin.stop().catch(function () {});
    if (voiceWebRec) { try { voiceWebRec.abort(); } catch (e) {} voiceWebRec = null; }
  }

  // ---- the confirmation dialog ------------------------------------------
  var voiceBtn = document.getElementById("voiceBtn");
  var voiceOverlay = document.getElementById("voiceOverlay");
  var voiceListeningRow = document.getElementById("voiceListening");
  var voiceListeningText = document.getElementById("voiceListeningText");
  var voiceHeard = document.getElementById("voiceHeard");
  var voiceResult = document.getElementById("voiceResult");
  var voiceAction = document.getElementById("voiceAction");
  var voiceItems = document.getElementById("voiceItems");
  var voiceProject = document.getElementById("voiceProject");
  var voiceDate = document.getElementById("voiceDate");
  var voiceDateRow = document.getElementById("voiceDateRow");
  var voiceReminderRow = document.getElementById("voiceReminderRow");
  var voiceReminderTime = document.getElementById("voiceReminderTime");
  var voicePlanRows = document.getElementById("voicePlanRows");
  var voiceEndDate = document.getElementById("voiceEndDate");
  var voiceBy = document.getElementById("voiceBy");
  var voiceSaveBtn = document.getElementById("voiceSaveBtn");
  var voiceSource = document.getElementById("voiceSource");
  var voiceAiRow = document.getElementById("voiceAiRow");
  var voiceAiToggle = document.getElementById("voiceAiToggle");
  var voiceAiStatus = document.getElementById("voiceAiStatus");
  var voiceItemTexts = [];
  var voiceDoneQuery = "";

  voiceBtn.hidden = !(voiceSpeechPlugin || VoiceWebRecognition);

  function voiceTargetSheets() {
    return allSheets().filter(function (s) { return !s.ended && s.id !== HEAD_OFFICE_SHEET_ID; });
  }
  function voiceScoreTask(task, query) {
    var q = voiceKeys(query);
    var t = voiceKeys(task.text);
    return q.filter(function (k) { return t.indexOf(k) !== -1; }).length;
  }
  function voiceOpenTasks(sheet) {
    return sheet.tasks.filter(function (t) { return t.type !== "note" && t.status !== 2; });
  }
  // For "done": the open task the words fit best, across all projects when
  // none was named.
  function voiceBestDoneSheet(query) {
    var best = null;
    voiceTargetSheets().forEach(function (s) {
      voiceOpenTasks(s).forEach(function (t) {
        var score = voiceScoreTask(t, query);
        if (score > 0 && (!best || score > best.score)) best = { sheet: s, score: score };
      });
    });
    return best && best.sheet;
  }

  function renderVoiceAiRow() {
    voiceAiRow.hidden = !voiceAiPlugin;
    if (!voiceAiPlugin) return;
    voiceAiToggle.checked = voiceAiEnabled();
    var status = {
      available: "voiceAiAvailable", downloading: "voiceAiDownloading", downloadable: "voiceAiDownloading",
      failed: "voiceAiFailed", unavailable: "voiceAiUnavailable"
    }[voiceAiState];
    voiceAiStatus.textContent = tr("voiceAiLabel") + (status ? " - " + tr(status) : "") +
      (voiceAiState === "downloading" && voiceAiProgress != null ? " " + voiceAiProgress + "%" : "");
  }

  function renderVoiceItems() {
    voiceItems.innerHTML = "";
    var done = voiceAction.value === "done";
    var plan = voiceAction.value === "plan";
    voiceDateRow.hidden = done;
    voiceReminderRow.hidden = done || plan;
    voicePlanRows.hidden = !plan;
    if (done) {
      var sheet = allSheets().find(function (s) { return s.id === voiceProject.value; });
      var tasks = sheet ? voiceOpenTasks(sheet).slice() : [];
      tasks.sort(function (a, b) {
        return voiceScoreTask(b, voiceDoneQuery) - voiceScoreTask(a, voiceDoneQuery) ||
          String(b.date || "").localeCompare(String(a.date || ""));
      });
      var label = document.createElement("label");
      label.textContent = tr("voiceDoneWhich");
      voiceItems.appendChild(label);
      if (!tasks.length) {
        var none = document.createElement("p");
        none.className = "voice-empty";
        none.textContent = tr("voiceNoTaskFound");
        voiceItems.appendChild(none);
      } else {
        var sel = document.createElement("select");
        sel.id = "voiceDoneTask";
        tasks.slice(0, 15).forEach(function (t) {
          var o = document.createElement("option");
          o.value = t.id;
          o.textContent = t.text;
          sel.appendChild(o);
        });
        voiceItems.appendChild(sel);
      }
      voiceSaveBtn.disabled = !tasks.length;
      return;
    }
    if (!voiceItemTexts.length) voiceItemTexts = [""];
    voiceItemTexts.forEach(function (txt, i) {
      var row = document.createElement("div");
      row.className = "voice-item-row";
      var input = document.createElement("input");
      input.type = "text";
      input.maxLength = 200;
      input.className = "voice-item-input";
      input.value = txt;
      input.addEventListener("input", function () { voiceItemTexts[i] = input.value; });
      row.appendChild(input);
      if (voiceItemTexts.length > 1) {
        var del = document.createElement("button");
        del.type = "button";
        del.className = "voice-item-del";
        del.textContent = "✕";
        del.title = tr("deleteBtn");
        del.addEventListener("click", function () {
          voiceItemTexts.splice(i, 1);
          renderVoiceItems();
        });
        row.appendChild(del);
      }
      voiceItems.appendChild(row);
    });
    voiceSaveBtn.disabled = false;
  }

  function showVoiceCommand(heard, cmd) {
    voiceListeningRow.hidden = true;
    voiceSource.hidden = !voiceAiPlugin;
    voiceSource.textContent = tr(cmd.byAi ? "voiceBySourceAi" : "voiceBySourceRules");
    voiceHeard.textContent = tr("voiceHeardPrefix") + " " + heard;
    voiceHeard.hidden = false;
    var sheets = voiceTargetSheets();
    voiceProject.innerHTML = "";
    sheets.forEach(function (s) {
      var o = document.createElement("option");
      o.value = s.id;
      o.textContent = (s.shared ? "👥 " : "") + s.name;
      voiceProject.appendChild(o);
    });
    var sheetId = cmd.sheetId;
    if (!sheetId && cmd.action === "done") {
      var bestSheet = voiceBestDoneSheet(cmd.items.join(" "));
      if (bestSheet) sheetId = bestSheet.id;
    }
    if (!sheetId && sheets.some(function (s) { return s.id === data.activeSheetId; })) sheetId = data.activeSheetId;
    if (sheetId) voiceProject.value = sheetId;
    var peopleSheet = allSheets().find(function (s) { return s.id === voiceProject.value; });
    if (peopleSheet) wpFillPeople(peopleSheet);
    voiceAction.value = cmd.action;
    voiceItemTexts = cmd.action === "done" ? [] : (cmd.items.length ? cmd.items.slice() : [cmd.reminderTime ? tr("voiceReminderDefault") : ""]);
    voiceDoneQuery = cmd.items.join(" ");
    voiceDate.value = cmd.date || (state.viewDate >= todayISO() ? state.viewDate : todayISO());
    voiceReminderTime.value = cmd.reminderTime || "";
    voiceEndDate.value = cmd.endDate || voiceDate.value;
    voiceBy.value = cmd.by || "";
    voiceResult.hidden = false;
    voiceSaveBtn.hidden = false;
    renderVoiceItems();
  }

  function startVoiceCommand() {
    var token = ++voiceListenToken;
    voiceListeningRow.hidden = false;
    voiceListeningText.textContent = tr("voiceListening");
    voiceHeard.hidden = true;
    voiceResult.hidden = true;
    voiceSaveBtn.hidden = true;
    voiceSource.hidden = true;
    voiceOverlay.hidden = false;
    renderVoiceAiRow();
    refreshVoiceAiStatus();
    voiceListen().then(function (heard) {
      if (token !== voiceListenToken) return;
      heard = (heard || "").trim();
      if (!heard) {
        voiceListeningText.textContent = tr("voiceNoSpeech");
        return;
      }
      voiceListeningText.textContent = tr("voiceThinking");
      var sheets = voiceTargetSheets();
      var opts = { people: voicePeople() };
      // the model isn't asked about work-plan activities (date ranges) - the
      // rules handle those
      var ai = VOICE_PLAN_RE.test(" " + heard + " ") ? Promise.resolve(null) : voiceAiParse(heard, sheets);
      return ai.then(function (aiCmd) {
        if (token !== voiceListenToken) return;
        showVoiceCommand(heard, aiCmd || parseVoiceCommand(heard, sheets, null, opts));
      });
    }).catch(function (err) {
      if (token !== voiceListenToken) return;
      voiceListeningText.textContent = tr(err && err.message === "permission" ? "voicePermissionMsg" : "voiceNoSpeech");
    });
  }

  function voicePeople() {
    var names = [];
    voiceTargetSheets().forEach(function (s) {
      wpPeopleSuggestions(s).forEach(function (n) { if (names.indexOf(n) === -1) names.push(n); });
    });
    return names;
  }

  function closeVoiceOverlay() {
    voiceListenToken++;
    voiceStopListening();
    voiceOverlay.hidden = true;
  }

  function saveVoiceCommand() {
    var sheet = allSheets().find(function (s) { return s.id === voiceProject.value; });
    if (!sheet) return;
    if (voiceAction.value === "done") {
      var sel = document.getElementById("voiceDoneTask");
      var task = sel && sheet.tasks.find(function (t) { return t.id === sel.value; });
      if (!task) return;
      task.status = 2;
      if (task.planItemId) workPlanTaskStatusChanged(sheet, task);
      saveData();
      if (sheet.shared) sendChatSystemMessage(sheet.id, "done", task.text, myPhoneNumber);
      closeVoiceOverlay();
      render();
      showToast(tr("voiceDoneMsg"));
      return;
    }
    var texts = voiceItemTexts.map(function (s) { return s.replace(/\s+/g, " ").trim(); }).filter(Boolean);
    if (!texts.length) return;
    if (voiceAction.value === "plan") {
      var start = voiceDate.value || todayISO();
      var end = voiceEndDate.value && voiceEndDate.value >= start ? voiceEndDate.value : start;
      texts.forEach(function (name) {
        saveWorkPlanItem(sheet, {
          id: uid(), name: name, start: start, end: end, by: voiceBy.value.replace(/\s+/g, " ").trim(),
          status: "todo", progress: 0, note: "", showInTasks: true, updatedBy: myPhoneNumber || null, updatedAt: Date.now()
        }, false);
      });
      closeVoiceOverlay();
      render();
      showToast(tr("voicePlanAddedMsg"));
      return;
    }
    var type = voiceAction.value === "note" ? "note" : "task";
    var date = voiceDate.value || todayISO();
    var reminder = null;
    if (voiceReminderTime.value) {
      var fireAt = new Date(date + "T" + voiceReminderTime.value);
      if (isNaN(fireAt.getTime()) || fireAt.getTime() <= Date.now()) {
        showToast(tr("taskReminderPastMsg"));
        return;
      }
      reminder = { type: "time", date: date, time: voiceReminderTime.value, fireAt: fireAt.toISOString(), firedAt: null };
      if (sheet.shared) reminder.by = myPhoneNumber;
    }
    var ready = (!reminder || nativeTaskAlarmPlugin) ? Promise.resolve(true) : ensurePushReadyForTaskReminder();
    ready.then(function (ok) {
      if (reminder && !ok) {
        alert(tr("taskReminderNotSupportedMsg"));
        reminder = null;
      }
      texts.forEach(function (text) {
        var t = { id: uid(), text: text, status: 0, urgent: false, type: type, date: date, createdAt: Date.now() };
        if (type === "note") t.time = currentTimeHHMM();
        if (reminder) t.reminder = Object.assign({}, reminder);
        sheet.tasks.push(t);
        if (sheet.shared && type === "task") sendChatSystemMessage(sheet.id, "added", text, myPhoneNumber);
      });
      closeVoiceOverlay();
      viewingArchive = false;
      state.viewMode = "tasks";
      state.showingCompleted = false;
      data.activeSheetId = sheet.id;
      state.viewDate = clampViewDate(date);
      saveData();
      render();
      showToast(tr(reminder ? "voiceAddedReminderMsg" : "voiceAddedMsg"));
      if (reminder) ensureExactAlarmPermission();
    });
  }

  voiceBtn.addEventListener("click", startVoiceCommand);
  voiceAiToggle.addEventListener("change", function () {
    try { localStorage.setItem(VOICE_AI_PREF_KEY, voiceAiToggle.checked ? "on" : "off"); } catch (e) {}
    if (voiceAiToggle.checked && voiceAiState === "downloadable") startVoiceAiDownload();
  });
  voiceAction.addEventListener("change", function () {
    if (voiceAction.value !== "done" && !voiceItemTexts.length) voiceItemTexts = [voiceDoneQuery];
    renderVoiceItems();
  });
  voiceProject.addEventListener("change", function () {
    if (voiceAction.value === "done") renderVoiceItems();
  });
  document.getElementById("voiceForm").addEventListener("submit", function (e) {
    e.preventDefault();
    saveVoiceCommand();
  });
  document.getElementById("voiceAgainBtn").addEventListener("click", function () {
    voiceStopListening();
    startVoiceCommand();
  });
  document.getElementById("voiceCancelBtn").addEventListener("click", closeVoiceOverlay);
  document.getElementById("voiceReminderClearBtn").addEventListener("click", function () {
    voiceReminderTime.value = "";
  });
