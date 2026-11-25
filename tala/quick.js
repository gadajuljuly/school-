/* Quick mode: a short path to the plan in three steps.
 * 1. Description: grade, strengths and areas to strengthen (free text, with the rubric as help).
 * 2. Summary: check for vague lines, then the teacher confirms.
 * 3. The plan: up to 3 main goals, each a 6-column table (objective, time, means, criteria,
 *    formative and summative evaluation); print (A4 landscape), Excel and Word.
 * Privacy: no full name or ID; identifying fields stay blank on the printed plan, to fill in by hand.
 * Loaded before app.js; uses its helpers at run time. */
'use strict';

const QUICK_TABS = [
  ['q1', T("1. תיאור התלמיד/ה")],
  ['q2', T("2. סיכום ואישור")],
  ['q3', T("3. התל\"א")],
];
const QUICK_MAX_GOALS = 3;
const PERIOD_1 = () => T("עד סיום מחצית א'");
const PERIOD_2 = () => T("עד סוף שנת הלימודים");
const DATE_BLANK = '___/___/___';
const lines = t => String(t || '').split('\n').map(x => x.replace(/^[•\-*]\s*/, '').trim()).filter(Boolean);

function modeSwitch(s) {
  const quick = s.mode === 'quick';
  return `<div class="mode-switch no-print">
    <button class="btn small ${quick ? 'primary' : ''}" data-act="mode" data-v="quick">⚡ ${T("מצב מהיר")}</button>
    <button class="btn small ${quick ? '' : 'primary'}" data-act="mode" data-v="full">🧩 ${T("מצב מפורט")}</button>
  </div>`;
}

// ---------- step 1: description ----------
// Rubric areas the teacher opened stay open when the screen is drawn again (after adding an item).
const quickOpen = new Set();
document.addEventListener('toggle', e => {
  const d = e.target;
  if (d.matches?.('details.qarea')) d.open ? quickOpen.add(d.dataset.area) : quickOpen.delete(d.dataset.area);
}, true);
function tabQ1(s) {
  const chip = (area, item) => {
    const v = `${area.title}: ${item}`;
    return `<span class="qchip">${esc(item)}
      <button type="button" class="qadd plus" data-act="append" data-path="strengths" data-sep="nl" data-v="${esc(v)}" title="${T("הוספה למוקדי כוח")}">+ ${T("כוח")}</button>
      <button type="button" class="qadd focus" data-act="append" data-path="difficulties" data-sep="nl" data-v="${esc(v)}" title="${T("הוספה למוקדים לחיזוק")}">+ ${T("חיזוק")}</button></span>`;
  };
  return `
  <div class="card privacy"><b>${T("שימו לב — שמירה על פרטיות:")}</b>
    ${T("לפי נהלי משרד החינוך אין להזין מידע אישי מזהה על תלמידים (שם מלא, מספר ת\"ז, שם בית ספר או פרטים מזהים אחרים). תארו את התלמיד/ה ללא פרטים מזהים — את הפרטים האישיים משלימים ידנית רק לאחר ההדפסה או הייצוא.")}</div>
  <div class="card"><div class="grid">
    ${field('firstName', T("כינוי או ראשי תיבות (לא שם מלא)"))}
    ${selectField('grade', T("שכבה / רמת כיתה"), GRADE_NAMES.slice(1).map((n, i) => [i + 1, n]))}
    ${field('year', T("שנת לימודים")).replace('<input', '<input dir="ltr" style="text-align:right"')}
  </div></div>
  <div class="card"><div class="grid q-two">
    ${field('strengths', T("מוקדי כוח – תחומים בהם התלמיד/ה מגלה יכולת, עניין וכישורים"), 'textarea', 'wide')}
    ${field('difficulties', T("מוקדים לחיזוק – תחומים בהם נדרש חיזוק"), 'textarea', 'wide')}
  </div>
  <p class="muted" style="margin:6px 0 0">${T("אפשר לכתוב חופשי, או ללחוץ על פריטים מהמחוון למטה. כדאי לפרט (למשל: \"שטף קריאה – קצב איטי\" ולא רק \"מתקשה בקריאה\").")}</p></div>
  <div class="card"><h2>${T("מחוון לעזרה")} <span class="muted" style="font-size:.85rem;font-weight:400">${T("(אין חובה להתייחס להכול)")}</span></h2>
    ${RUBRIC.map(a => `<details class="qarea" data-area="${a.id}" ${quickOpen.has(a.id) ? 'open' : ''}><summary><b>${esc(a.title)}</b></summary><div class="qchips">${a.items.map(i => chip(a, i)).join('')}</div></details>`).join('')}
  </div>
  <div class="card row next"><span class="spacer"></span><button class="btn primary" data-tab="q2">${T("לסיכום ואישור")} ←</button></div>`;
}

// ---------- step 2: summary and confirmation ----------
// Lines that name an area without saying what in it (e.g. "difficulty in reading").
const VAGUE = [
  { re: /קריא|قراء|read/i, detail: /שטף|דיוק|קצב|הנגנה|הבנ|פענוח|הסק|מסר|طلاق|دق|سرع|فهم|تنغيم|استنتاج|رسال|فك|fluen|accura|speed|pace|rate|comprehen|decod|infer|message|prosod/i,
    hint: "האם הקושי בשטף הקריאה (דיוק, קצב, הנגנה) או בהבנת הנקרא?" },
  { re: /כתיב|כתב|كتاب|writ/i, detail: /העתק|אחיז|קריא|הבעה|כתיב|מוסכמ|הספק|התעייפ|نسخ|مسك|مقروء|تعبير|إملاء|املاء|أعراف|إنتاج|تعب|copy|grip|legib|spell|express|convention|output|fatigue/i,
    hint: "האם הקושי בהעתקה, באחיזה, בכתב הקריא, בכתיב או בהבעה בכתב?" },
  { re: /מתמטיק|חשבון|رياضيات|حساب|math/i, detail: /מספר|פעול|שבר|עשרונ|גאומ|חיבור|חיסור|כפל|חילוק|عدد|أعداد|اعداد|عمليات|كسور|عشري|هندس|جمع|طرح|ضرب|قسم|number|operation|fraction|decimal|geometr|addition|subtraction|multipl|divis/i,
    hint: "באיזה נושא במתמטיקה: תחום המספרים, פעולות, שברים, עשרוניים או גאומטריה?" },
  { re: /^\s*(שפה|لغة|اللغة|language)\s*$|מתקש[הת]? בשפה|صعوب[ةه] في اللغة|difficult(y|ies) (in|with) language/i, detail: /$^/,
    hint: "האם הקושי באוצר המילים, בתחביר, בדקדוק או בהבעה בעל פה?" },
];
function vagueLines(s) {
  const out = [];
  for (const line of lines(s.difficulties)) {
    const v = VAGUE.find(x => x.re.test(line) && !x.detail.test(line));
    if (v) out.push([line, T(v.hint)]);
  }
  return out;
}

function tabQ2(s) {
  const st = lines(s.strengths), df = lines(s.difficulties);
  const vague = vagueLines(s);
  const list = l => l.length ? `<ul class="qlist">${l.map(x => `<li>${esc(x)}</li>`).join('')}</ul>` : `<p class="muted">${T("(לא הוזן)")}</p>`;
  return `
  <div class="card"><h2>${T("סיכום")}</h2>
    <table class="kv">
      <tr><td>${T("כיתה")}</td><td>${esc(gradeName(s)) || `<span class="muted">${T("(לא הוזן)")}</span>`}</td></tr>
      <tr><td>${T("מוקדי כוח")}</td><td>${list(st)}</td></tr>
      <tr><td>${T("מוקדים לחיזוק")}</td><td>${list(df)}</td></tr>
    </table>
  </div>
  ${vague.length ? `<div class="card qwarn"><b>💡 ${T("כדאי לדייק לפני ההפקה:")}</b>
    <ul class="qlist">${vague.map(([l, h]) => `<li>"${esc(l)}" – ${esc(h)}</li>`).join('')}</ul></div>` : ''}
  <div class="card">
    ${df.length ? `<p><b>${T("האם הסיכום משקף נכונה את מצב התלמיד/ה לפני שנתקדם לניסוח המטרות?")}</b></p>
      ${s.goals.length ? `<p class="muted">${T("שימו לב: הפקה מחדש מחליפה את המטרות הקיימות.")}</p>` : ''}
      <div class="row">
        <button class="btn" data-tab="q1">✏️ ${T("לא, לתיקון התיאור")}</button>
        <span class="spacer"></span>
        <button class="btn primary big" data-act="quick-build">✅ ${T("כן, להפיק את התל\"א")}</button>
      </div>`
    : `<p>${T("כדי להפיק תל\"א צריך לכתוב לפחות מוקד אחד לחיזוק.")}</p><button class="btn primary" data-tab="q1">← ${T("לתיאור התלמיד/ה")}</button>`}
  </div>`;
}

// ---------- building the goals ----------
// The area (rubric key) a free-text line belongs to.
const AREA_WORDS = {
  reading: /קריא|הבנת הנקרא|שטף|قراء|فهم المقروء|طلاق|read|fluen/i,
  writing: /כתיב|כתב|העתק|אחיז|كتاب|إملاء|املاء|نسخ|خط|writ|spell|copy|handwrit/i,
  language: /שפה|אוצר מילים|תחביר|דקדוק|הבעה|לשון|لغ|مفردات|نحو|تعبير|language|vocabular|grammar|syntax|express/i,
  math: /מתמטיק|חשבון|מספר|שבר|גאומ|رياضيات|حساب|عدد|أعداد|كسور|هندس|math|number|fraction|geometr/i,
  social: /חבר|קשר|שיח|תור|נימוס|اجتماع|صداق|علاق|دور|social|friend|peer|conversation|turn/i,
  emotional: /רגש|התנהג|שליטה|תסכול|סמכות|כללים|שינויים|عاطف|سلوك|إحباط|انفعال|ضبط|قوانين|emotion|behavio|frustrat|self-control|rules/i,
  student: /קשב|ריכוז|התארגנ|ציוד|קצב|זמן|הסח|انتباه|تركيز|تنظيم|أدوات|وتيرة|attention|focus|organi|equipment|pace/i,
  indep: /עצמא|מוטיבציה|השתתפ|משימ|استقلال|دافع|مشارك|مهام|independ|motivat|particip|task/i,
  motor: /מוטור|תנוע|אחיזה|ספורט|حرك|motor|movement|sport/i,
  daily: /אכיל|היגיינ|מעיל|שירותים|طعام|أكل|نظاف|معطف|eat|hygien|coat|toilet/i,
  self: /סינגור|ייצוג|צרכים|مناصرة|احتياجات|advoca|needs/i,
};
function areaOf(line) {
  const byTitle = RUBRIC.find(a => line.startsWith(a.title + ':'));
  if (byTitle) return byTitle.id;
  const k = Object.keys(AREA_WORDS).find(k => AREA_WORDS[k].test(line));
  return k || null;
}
const AREA_ORDER = ['reading', 'writing', 'language', 'math', 'social', 'emotional', 'student', 'indep', 'self', 'motor', 'daily'];
const isFluency = line => /שטף|דיוק|קצב|הנגנה|طلاق|دق|سرع|تنغيم|fluen|accura|speed|pace|prosod/i.test(line) && /קריא|قراء|read/i.test(line);

// Up to max areas, academic first; a reading fluency difficulty leads.
function pickAreas(s, max) {
  const df = lines(s.difficulties);
  const found = new Map();
  for (const l of df) { const a = areaOf(l); if (a) (found.get(a) || found.set(a, []).get(a)).push(l); }
  const order = [...AREA_ORDER];
  if (df.some(isFluency)) order.splice(order.indexOf('reading'), 1), order.unshift('reading');
  const academic = ['reading', 'writing', 'language', 'math'], social = ['social'], emo = ['emotional', 'student', 'indep', 'self'];
  const keys = [...found.keys()].sort((a, b) => order.indexOf(a) - order.indexOf(b));
  // One per kind first (academic, social, behavioral/emotional/executive), then the rest.
  const chosen = [];
  for (const kind of [academic, social, emo]) { const k = keys.find(x => kind.includes(x)); if (k) chosen.push(k); }
  for (const k of keys) if (!chosen.includes(k)) chosen.push(k);
  return chosen.slice(0, max).map(k => ({ key: k, lines: found.get(k) }));
}

// Objectives from the goal bank for an area (used without the AI helper).
function bankObjectives(s, key, areaLines) {
  const area = RUBRIC.find(a => a.id === key);
  let ids = [];
  if (key === 'reading') ids = areaLines.some(isFluency) ? ['f1', 'f2'] : ['c1', 'c3'];
  if (key === 'writing') ids = ['w3', 'w4'];
  if (key === 'language') ids = ['o2', 'o5'];
  let texts = ids.map(id => GOAL_BY_ID[id]?.t).filter(Boolean);
  if (!texts.length) {
    const sec = { student: 'student', indep: 'indep', social: 'soc', emotional: 'emo', motor: 'fm', daily: 'daily', self: 'emo' }[key];
    const items = ALL_ITEMS.filter(i => sec ? i.section.id === sec : i.group.domain === area.d);
    texts = [...new Set(items.flatMap(i => i.goals.map(g => g.text)))].slice(0, 2);
  }
  return texts.map(t => fillBlanks(t, s));
}

function quickSection(s, key, annual, objs) {
  const area = RUBRIC.find(a => a.id === key) || RUBRIC[0];
  const sec = newSection(s, area.d);
  sec.quickArea = key;
  if (annual) sec.annual = annual;
  sec.objectives = objs.slice(0, 2).map((o, i) => ({
    ...newObjective(s, { text: o.text || '', domain: area.d }),
    period: i === 0 ? PERIOD_1() : PERIOD_2(),
    methods: o.means || methodsFor(area.d),
    criterion: o.crit || T("بنسبة نجاح 80%"),
  }));
  while (sec.objectives.length < 2) sec.objectives.push({ ...newObjective(s, { text: '', domain: area.d }), period: sec.objectives.length ? PERIOD_2() : PERIOD_1() });
  return sec;
}

function fallbackGoals(s, picks) {
  return picks.map(({ key, lines: l }) => quickSection(s, key, '', bankObjectives(s, key, l).map(text => ({ text }))));
}

// The AI helper writes the goals in a fixed line format, parsed below.
function aiGoalsPrompt(max, onlyKey) {
  return `Individual learning plan (ILP) goals for a special-education student.
Based on the context (grade, strengths, areas to strengthen), write ${onlyKey ? `exactly 1 goal for the area "${onlyKey}"` : `at most ${max} main goals, suited to the student's age and grade: academic, social, behavioral/emotional/executive - only areas that came up in the description, the most important first`}.
If a difficulty in reading fluency or reading accuracy is mentioned, the academic goal must focus on it.
For each goal write exactly these lines and nothing else:
GOAL[key]: the annual goal
OBJ1: an objective to reach by the end of the first semester (observable and measurable)
MEANS1: 2-3 practical ways and means, separated by "; "
CRIT1: 1-2 measures for evaluation
OBJ2: an objective to reach by the end of the school year
MEANS2: 2-3 practical ways and means, separated by "; "
CRIT2: 1-2 measures for evaluation
key is one of: ${RUBRIC.map(a => a.id).join(', ')}.
Keep the labels GOAL, OBJ1, MEANS1, CRIT1, OBJ2, MEANS2, CRIT2 in English exactly as written; write the content after them in the plan language. Do not include names or identifying details.`;
}
function parseAIGoals(text) {
  const goals = [];
  for (const raw of String(text).split('\n')) {
    const l = raw.replace(/^[\s*#>\-•]+/, '').replace(/\*\*/g, '').trim();
    let m;
    if ((m = /^GOAL\s*\[\s*([a-z]+)\s*\]\s*[:：]\s*(.+)$/i.exec(l))) { goals.push({ key: m[1].toLowerCase(), annual: m[2].trim(), objs: [{}, {}] }); continue; }
    if (!goals.length) continue;
    if ((m = /^(OBJ|MEANS|CRIT)\s*([12])\s*[:：]\s*(.+)$/i.exec(l))) {
      const o = goals.at(-1).objs[+m[2] - 1];
      o[{ OBJ: 'text', MEANS: 'means', CRIT: 'crit' }[m[1].toUpperCase()]] = m[3].trim().replace(/\s*;\s*/g, T("، "));
    }
  }
  return goals.filter(g => g.annual && g.objs.some(o => o.text) && RUBRIC.some(a => a.id === g.key));
}

function quickContext(s) {
  return [
    s.grade ? `${T("כיתה")}: ${gradeName(s)}` : '',
    `${T("מוקדי כוח")}:\n${lines(s.strengths).join('\n') || '-'}`,
    `${T("מוקדים לחיזוק")}:\n${lines(s.difficulties).join('\n')}`,
  ].filter(Boolean).join('\n\n');
}

async function makeQuickGoals(s, { max = QUICK_MAX_GOALS, onlyKey = null } = {}) {
  const picks = onlyKey ? [{ key: onlyKey, lines: lines(s.difficulties).filter(l => areaOf(l) === onlyKey) }] : pickAreas(s, max);
  if (Cloud.enabled && Cloud.user) {
    try {
      const text = await Cloud.ai({ action: 'draft', text: '', field: aiGoalsPrompt(max, onlyKey), context: quickContext(s) });
      const goals = parseAIGoals(text).slice(0, onlyKey ? 1 : max);
      if (goals.length) return { ai: true, sections: goals.map(g => quickSection(s, onlyKey || g.key, g.annual, g.objs)) };
    } catch (e) { console.warn('AI goals failed', e); }
  }
  return { ai: false, sections: fallbackGoals(s, picks.length ? picks : [{ key: 'reading', lines: [] }]) };
}

async function quickBuild(s, btn) {
  if (s.goals.length && !confirm(T("להפיק מחדש? המטרות הקיימות יוחלפו."))) return;
  btn.disabled = true; btn.textContent = `✨ ${T("מנסח את המטרות…")}`;
  const { ai, sections } = await makeQuickGoals(s);
  s.goals = sections;
  touch(s);
  view.tab = 'q3'; render(); scrollTo(0, 0);
  toast(ai ? T("התל\"א נוסחה בעזרת ✨ – עברו עליה והתאימו") : T("התל\"א נבנתה מהמאגר – עברו עליה והתאימו"));
}

async function quickAddGoal(s, key, btn) {
  btn.disabled = true;
  const { sections } = await makeQuickGoals(s, { onlyKey: key });
  s.goals.push(...sections);
  touch(s); render();
}

// ---------- step 3: the plan ----------
const Q_HEAD = () => [T("יעד"), T("פרק זמן להשגת היעד"), T("דרכים ואמצעים (יפורט עפ\"י צוות ההוראה והטיפול)"), T("אמות מידה להערכה"), T("הערכה מעצבת"), T("הערכה מסכמת")];

function tabQ3(s) {
  if (!s.goals.length) return `<div class="card empty"><div class="big">🎯</div><p class="muted">${T("עדיין אין תל\"א. כתבו תיאור ואשרו את הסיכום.")}</p>
    <button class="btn primary" data-tab="q2">${T("לסיכום ואישור")}</button></div>`;
  const ta = (path, v, rows = 3) => `<textarea dir="auto" rows="${rows}" data-path="${path}">${esc(v)}</textarea>`;
  const head = Q_HEAD();
  return `
  <div class="card row no-print">
    <button class="btn primary" data-act="print">🖨️ ${T("הדפסה / PDF")}</button>
    <button class="btn" data-act="quick-excel">⬇️ Excel</button>
    <button class="btn" data-act="quick-word">⬇️ Word</button>
    <span class="spacer"></span>
    <label class="qdates">${head[4]}: <input type="date" data-path="evalDates.mid" value="${esc(s.evalDates.mid)}"></label>
    <label class="qdates">${head[5]}: <input type="date" data-path="evalDates.final" value="${esc(s.evalDates.final)}"></label>
    <button class="btn" data-tab="q2">✨ ${T("להפיק מחדש")}</button>
  </div>
  <div class="no-print">
  ${s.goals.map((g, gi) => `<div class="card">
    <div class="row"><h2 style="margin:0">${T("מטרה")} ${gi + 1} <span class="muted" style="font-size:.9rem">(${esc(domainLabel(g.domain))})</span></h2><span class="spacer"></span>
      <button class="btn small danger" data-act="del-goal" data-gi="${gi}">✕ ${T("מחיקת המטרה")}</button></div>
    <label class="field">${T("המטרה")}${ta(`goals.${gi}.annual`, g.annual, 2)}</label>
    ${g.objectives.map((o, oi) => {
      const p = `goals.${gi}.objectives.${oi}`;
      const f = (key, label, rows, cls = '') => `<label class="field ${cls}">${label}${ta(`${p}.${key}`, o[key], rows)}</label>`;
      return `<div class="qobj">
        <div class="row"><b>${T("יעד")} ${oi + 1}</b><input type="text" class="qperiod" dir="auto" data-path="${p}.period" value="${esc(o.period)}" aria-label="${head[1]}">
          <span class="spacer"></span><button class="btn small danger" data-act="del-obj" data-gi="${gi}" data-oi="${oi}" aria-label="${T("מחיקה")}">✕</button></div>
        ${f('text', head[0], 2, 'wide')}
        <div class="grid">${f('methods', head[2], 3)}${f('criterion', head[3], 3)}${f('midEval', head[4], 2)}${f('finalEval', head[5], 2)}</div>
      </div>`;
    }).join('')}
    <button class="btn small ghost" data-act="add-obj" data-gi="${gi}">+ ${T("יעד")}</button>
  </div>`).join('')}
  <div class="card"><p><b>${T("האם יש מטרה נוספת שתרצו להוסיף בהתאם לרמת התפקוד של התלמיד/ה?")}</b></p>
    <div class="row"><select id="qNewArea" style="width:auto;flex:1">${RUBRIC.map(a => `<option value="${a.id}">${esc(a.title)}</option>`).join('')}</select>
    <button class="btn" data-act="quick-add-goal">+ ${T("מטרה נוספת")}</button></div></div>
  </div>
  <div class="print-only">${docQuick(s)}</div>
  <style>@page { size: A4 landscape; }</style>`;
}

// The printed plan: A4 landscape, identifying fields left blank to fill in by hand.
function docQuick(s) {
  const blank = '<span class="blank"></span>';
  const head = Q_HEAD();
  const date = d => d ? fmtDate(d) : DATE_BLANK;
  return `<div class="doc qdoc">
    <h1>${T("תכנית לימודים אישית – תל\"א")}</h1>
    <div class="sub">${T("שנת הלימודים")} <bdi dir="ltr">${esc(s.year)}</bdi></div>
    <table class="kv">
      <tr><td>${T("שם התלמיד/ה")}</td><td>${blank}</td><td>${T("כיתה")}</td><td>${esc(gradeName(s))}</td></tr>
      <tr><td>${T("מחנך/ת")}</td><td>${blank}</td><td>${T("בית הספר")}</td><td>${blank}</td></tr>
      <tr><td>${T("צוות שותף")}</td><td colspan="3">${blank}</td></tr>
    </table>
    <table class="kv">
      <tr><td>${T("מוקדי כוח")}</td><td class="pre" dir="auto">${esc(lines(s.strengths).join('\n'))}</td></tr>
      <tr><td>${T("מוקדים לחיזוק")}</td><td class="pre" dir="auto">${esc(lines(s.difficulties).join('\n'))}</td></tr>
    </table>
    ${s.goals.map((g, gi) => `<h3>${T("מטרה")} ${gi + 1}: ${esc(g.annual)}</h3>
      <table class="qprint">
        <tr>${head.map(h => `<th>${h}</th>`).join('')}</tr>
        ${g.objectives.map(o => `<tr><td class="pre" dir="auto">${esc(o.text)}</td><td class="pre" dir="auto">${esc(o.period)}</td><td class="pre" dir="auto">${esc(o.methods)}</td>
          <td class="pre" dir="auto">${esc(o.criterion)}</td><td class="pre" dir="auto">${esc(o.midEval)}<div class="qdate">${T("תאריך")}: ${date(s.evalDates.mid)}</div></td>
          <td class="pre" dir="auto">${esc(o.finalEval)}<div class="qdate">${T("תאריך")}: ${date(s.evalDates.final)}</div></td></tr>`).join('')}
      </table>`).join('')}
  </div>`;
}

function quickFileName(s, ext) {
  const nick = (s.firstName || '').trim();
  return `${T("תלא")}${nick ? ' - ' + nick : ''}.${ext}`.replace(/[\\/:*?"<>|]/g, '_');
}
function downloadBlob(blob, name) {
  const a = document.createElement('a');
  a.href = URL.createObjectURL(blob); a.download = name; a.click();
  setTimeout(() => URL.revokeObjectURL(a.href), 1000);
}

function quickExcel(s) {
  const C = (v, st = 'cell') => ({ v: v ?? '', s: st });
  const head = Q_HEAD();
  const date = d => d ? fmtDate(d) : DATE_BLANK;
  const rows = [[C(T("תכנית לימודים אישית – תל\"א"), 'title')], [C(`${T("שנת הלימודים")} ${s.year}`, 'center')], [],
    [C(T("שם התלמיד/ה"), 'label'), C(''), C(T("כיתה"), 'label'), C(gradeName(s)), C(''), C('')],
    [C(T("מחנך/ת"), 'label'), C(''), C(T("בית הספר"), 'label'), C(''), C(''), C('')],
    [C(T("צוות שותף"), 'label'), C(''), C(''), C(''), C(''), C('')],
    [C(T("מוקדי כוח"), 'label'), C(lines(s.strengths).join('\n')), C(''), C(''), C(''), C('')],
    [C(T("מוקדים לחיזוק"), 'label'), C(lines(s.difficulties).join('\n')), C(''), C(''), C(''), C('')], []];
  const merges = ['A1:F1', 'A2:F2', 'D4:F4', 'D5:F5', 'B6:F6', 'B7:F7', 'B8:F8'];
  s.goals.forEach((g, gi) => {
    rows.push([C(`${T("מטרה")} ${gi + 1}: ${g.annual}`, 'banner'), ...Array(5).fill(C('', 'banner'))]); merges.push(`A${rows.length}:F${rows.length}`);
    rows.push(head.map(h => C(h, 'head')));
    for (const o of g.objectives) rows.push([C(o.text), C(o.period), C(o.methods), C(o.criterion),
      C(`${o.midEval ? o.midEval + '\n' : ''}${T("תאריך")}: ${date(s.evalDates.mid)}`), C(`${o.finalEval ? o.finalEval + '\n' : ''}${T("תאריך")}: ${date(s.evalDates.final)}`)]);
    rows.push([]);
  });
  downloadBlob(XLSX.build([{ name: T("תלא"), landscape: true, cols: [34, 16, 34, 24, 24, 24], rows, merges }, ...parentRecsSheet(s)]), quickFileName(s, 'xlsx'));
  toast(T("קובץ ה-Excel ירד"));
}

// Word opens an HTML page saved as .doc; the page is set to A4 landscape.
function quickWord(s) {
  const dir = document.documentElement.dir || 'rtl';
  // Word ignores pre-wrap: line breaks inside cells become <br>.
  const body = docQuick(s).replace(/(<td class="pre"[^>]*>)([^<]*)/g, (m, a, t) => a + t.replace(/\n/g, '<br>'))
    .replace(/<table class="/g, '<table border="1" cellspacing="0" cellpadding="5" width="100%" class="');
  const html = `<html xmlns:o="urn:schemas-microsoft-com:office:office" xmlns:w="urn:schemas-microsoft-com:office:word" lang="${LANG}" dir="${dir}">
<head><meta charset="utf-8"><title>${T("תכנית לימודים אישית – תל\"א")}</title>
<style>
@page WordSection1 { size: 841.9pt 595.3pt; mso-page-orientation: landscape; margin: 36pt; }
div.WordSection1 { page: WordSection1; }
body { font-family: Arial, sans-serif; font-size: 11pt; direction: ${dir}; }
h1 { font-size: 18pt; text-align: center; margin: 0; } h3 { font-size: 13pt; margin: 14pt 0 4pt; }
.sub { text-align: center; color: #555; margin-bottom: 10pt; }
table { border-collapse: collapse; width: 100%; margin: 6pt 0; }
td, th { border: 1px solid #777; padding: 4pt 6pt; vertical-align: top; text-align: ${dir === 'rtl' ? 'right' : 'left'}; }
th { background: #e6efec; } .kv td:nth-child(odd) { background: #f3f3f3; font-weight: bold; width: 18%; }
.pre { white-space: pre-wrap; } .qdate { color: #555; margin-top: 4pt; } .blank { display: inline-block; min-width: 120pt; }
</style></head><body><div class="WordSection1">${body}</div></body></html>`;
  downloadBlob(new Blob(['\ufeff', html], { type: 'application/msword' }), quickFileName(s, 'doc'));
  toast(T("קובץ ה-Word ירד"));
}
