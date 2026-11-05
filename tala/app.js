/* תל"א – תוכנית לימודים אישית לתלמידים בחינוך המיוחד.
 * Standalone app. All data lives in this device's localStorage; back it up with "ייצוא".
 * Flow: student details → mapping (data, notes and a 1–5 rating per skill) → "build the plan".
 * The goal bank, mapping items and assessment tools come from materials.js. */
'use strict';

const STORE_KEY = 'tala.students.v1';

const STATUSES = [
  { v: 'todo', label: 'טרם החל', cls: 'todo', color: '#c9cfcd' },
  { v: 'progress', label: 'בתהליך', cls: 'progress-s', color: '#6d9bc9' },
  { v: 'partial', label: 'הושג חלקית', cls: 'partial', color: '#e2a93b' },
  { v: 'done', label: 'הושג', cls: 'done', color: '#3b9b62' },
  { v: 'not', label: 'לא הושג', cls: 'not', color: '#c75a46' },
];
const statusOf = v => STATUSES.find(s => s.v === v) || STATUSES[0];
const TEAM_ROLES = ['מחנך/ת', 'מורה שילוב', 'מורה אחראית תחום', 'סייע/ת', 'קלינאי/ת תקשורת', 'מרפא/ה בעיסוק', 'מטפל/ת באומנות', 'פסיכולוג/ית', 'יועץ/ת', 'הורה', 'מנהל/ת'];
const ARABIC_GRADES = ['', 'الاول', 'الثاني', 'الثالث', 'الرابع', 'الخامس', 'السادس', 'السابع', 'الثامن', 'التاسع', 'العاشر', 'الحادي عشر', 'الثاني عشر'];

// ---------- the 1–5 mapping scale ----------
const SCALE = [
  [1, 'לא מבצע / קושי רב'],
  [2, 'מבצע לעיתים רחוקות, בעזרה רבה'],
  [3, 'מבצע חלקית, בעזרה ובתיווך'],
  [4, 'מבצע לרוב, בעזרה מועטה'],
  [5, 'מבצע באופן עצמאי, תואם גיל'],
];
const NEEDS_GOAL = 3;   // 1–3 → goals in the plan
const scaleLabel = n => SCALE.find(x => x[0] === +n)?.[1] || '';

// Every mapping item in one shape: {id, label, goals: [{domain, area, text, ref, level}]}.
const fromInterim = sec => ({ ...fromAcademic(sec), needs: INTERIM_NEEDS_GOAL, interim: true });
const fromAcademic = sec => ({ title: sec.sec, items: sec.items.map(([id, label, ids]) => ({
  id, label, goals: ids.map(g => GOAL_BY_ID[g]).filter(Boolean).map(g => ({ domain: g.d, area: g.area, text: g.t, ref: g.id, level: g.level })),
})) });
const fromFunctional = sec => ({ title: sec.sec, items: sec.items.map(([id, label, domain, goal]) => ({
  id, label, goals: [{ domain, area: domain, text: goal, ref: id }],
})) });
const fromDev = sec => ({ title: sec.label, source: true, items: sec.items.map(([id, label, goal]) => ({
  id, label, goals: [{ domain: sec.domain, area: sec.domain, text: goal, ref: id }],
})) });
const acad = p => ACADEMIC.filter(s => p(s.sec)).map(fromAcademic);
const func = (...ids) => FUNCTIONAL.filter(s => s.items.some(i => ids.includes(i[0][0]))).map(fromFunctional);
const dev = (...ids) => DEVELOPMENTAL.filter(s => ids.includes(s.id)).map(fromDev);

const MAP_GROUPS = [
  { id: 'arabic', domain: 'arabic', title: 'ערבית – קריאה, הבנה, כתיבה ושפה', reading: true, sections: [...INTERIM.map(fromInterim), ...acad(t => !t.includes('الحسابية'))] },
  { id: 'math', domain: 'math', title: 'חשבון', sections: [...acad(t => t.includes('الحسابية')), ...dev('quant')] },
  { id: 'cognitive', domain: 'cognitive', title: 'תלמידאות, קשב, חשיבה והרגלי למידה', sections: [...dev('student', 'indep'), ...func('t', 'p', 'g', 'h'), ...dev('att', 'vis', 'think', 'ready')] },
  { id: 'comm', domain: 'comm', title: 'שפה, דיבור ותקשורת', sections: dev('lang', 'aud') },
  { id: 'emotional', domain: 'emotional', title: 'רגשי, חברתי והתנהגותי', sections: [...func('s', 'l'), ...dev('emo', 'soc')] },
  { id: 'motor', domain: 'motor', title: 'תנועה, ניידות, הנגשה ותחושה', sections: [...dev('access'), ...dev('sen', 'gm', 'fm')] },
  { id: 'daily', domain: 'daily', title: 'פעילויות יום-יום ועצמאות', sections: dev('daily') },
];
const ALL_ITEMS = MAP_GROUPS.flatMap(g => g.sections.flatMap(s => s.items.map(i => ({ ...i, group: g, section: s }))));

// ---------- data ----------
let students = [];
let view = { name: 'list', id: null, tab: 'details', q: '' };

// Each signed-in teacher has her own copy on the device; without a server there is one shared copy.
const storeKey = () => Cloud.user ? `tala.students.u.${Cloud.user.id}` : STORE_KEY;
function loadKey(key) {
  try { return (JSON.parse(localStorage.getItem(key)) || []).map(normalize); } catch { return []; }
}
const load = () => loadKey(storeKey());

// What was last written, per student, so only changed students are sent to the server.
const snap = new Map();
function snapshot() { snap.clear(); for (const s of students) snap.set(s.id, JSON.stringify(s)); }

let saveTimer;
function save() { clearTimeout(saveTimer); saveTimer = setTimeout(flush, 250); }
function flush() {
  clearTimeout(saveTimer);
  if (Cloud.enabled && !Cloud.user) return;
  localStorage.setItem(storeKey(), JSON.stringify(students));
  if (Cloud.user) {
    const ids = new Set();
    for (const s of students) {
      ids.add(s.id);
      const j = JSON.stringify(s);
      if (snap.get(s.id) !== j) { snap.set(s.id, j); Cloud.changed(s.id); }
    }
    for (const id of [...snap.keys()]) if (!ids.has(id)) { snap.delete(id); Cloud.removed(id); }
  }
  const el = document.getElementById('savedNote');
  if (el) el.textContent = 'נשמר ✓';
}
const uid = () => Date.now().toString(36) + Math.random().toString(36).slice(2, 7);
const current = () => view.name === 'adminStudent' ? view.adminData : students.find(s => s.id === view.id);

function schoolYear() {
  const d = new Date();
  const y = d.getMonth() >= 7 ? d.getFullYear() : d.getFullYear() - 1;
  return `${y}–${y + 1}`;
}

function newStudent() {
  return {
    id: uid(), firstName: '', lastName: '', gender: '', idNumber: '', birthDate: '',
    school: '', className: '', grade: '', city: '', homeroomTeacher: '', inclusionTeacher: '', aide: '',
    committee: '', committeeDate: '', parentsContact: '', familyStatus: '', familyPosition: '', health: '', previousSchools: '',
    year: schoolYear(), fillDate: new Date().toISOString().slice(0, 10),
    support: {}, diagnoses: {}, accommodations: {}, accommodationsOther: '',
    background: '', strengths: '', difficulties: '', motivators: '', parentsView: '', studentView: '',
    readingLevel: '', readingBand: '', listeningBand: '', wpm: '', ratings: {}, mapNotes: {},
    parentRecs: '', steps: {}, profile: {}, evalDates: {}, summary: '', team: [], supports: [], goals: [], meetings: [], updatedAt: Date.now(),
  };
}

// Fill in fields added after a record was created.
function normalize(raw) {
  const s = Object.assign(newStudent(), raw);
  ['team', 'supports', 'goals', 'meetings'].forEach(k => { if (!Array.isArray(s[k])) s[k] = []; });
  ['support', 'diagnoses', 'ratings', 'mapNotes', 'steps', 'profile', 'evalDates'].forEach(k => { if (!s[k] || typeof s[k] !== 'object') s[k] = {}; });
  if (typeof s.accommodations === 'string') {
    s.accommodationsOther = [s.accommodationsOther, s.accommodations].filter(Boolean).join('\n');
    s.accommodations = {};
  } else if (!s.accommodations || typeof s.accommodations !== 'object') s.accommodations = {};
  for (const r of Object.values(s.ratings)) if (r && +r.b > 5) r.b = '5';
  s.goals.forEach(g => {
    if (!g.id) g.id = uid();
    ['teacher', 'annual', 'current', 'strengths', 'difficulties', 'accommodations'].forEach(k => { g[k] ??= ''; });
    if (!Array.isArray(g.objectives)) g.objectives = [];
    g.objectives.forEach(o => {
      if (!o.id) o.id = uid();
      if (o.partners == null) o.partners = o.responsible || '';
      if (o.period == null) o.period = o.due ? fmtDate(o.due) : '';
      if (o.curriculum == null) o.curriculum = GOAL_BY_ID[o.ref]?.cur || '';
      o.midEval ??= ''; o.finalEval ??= '';
    });
  });
  return s;
}

// ---------- helpers ----------
const esc = s => String(s ?? '').replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
const fullName = s => `${s.firstName || ''} ${s.lastName || ''}`.trim() || 'תלמיד/ה ללא שם';
const allObjectives = s => s.goals.flatMap(g => g.objectives);
const fmtDate = d => d ? new Date(d).toLocaleDateString('he-IL') : '';
const domainOf = id => DOMAINS.find(d => d.id === id);
const domainLabel = id => domainOf(id)?.label || id || '';
const gradeName = s => GRADE_NAMES[+s.grade] || '';
const rating = (s, id) => +(s.ratings[id]?.b || 0);

function toast(msg) {
  const t = document.createElement('div');
  t.className = 'toast'; t.textContent = msg;
  document.body.appendChild(t);
  setTimeout(() => t.remove(), 2800);
}

function getPath(obj, path) { return path.split('.').reduce((o, k) => o?.[k], obj); }
function setPath(obj, path, val) {
  const keys = path.split('.'); const last = keys.pop();
  keys.reduce((o, k) => (o[k] ??= {}), obj)[last] = val;
}

const field = (path, label, type = 'text', cls = '') => {
  const v = getPath(current(), path) ?? '';
  const input = type === 'textarea'
    ? `<textarea data-path="${path}" dir="auto">${esc(v)}</textarea>`
    : `<input type="${type}" data-path="${path}" value="${esc(v)}" dir="auto">`;
  return `<label class="field ${cls}">${label}${input}</label>`;
};
const selectField = (path, label, options, cls = '') => {
  const v = getPath(current(), path) ?? '';
  return `<label class="field ${cls}">${label}<select data-path="${path}">
    <option value=""></option>${options.map(([val, l]) => `<option value="${esc(val)}" ${String(val) === String(v) ? 'selected' : ''}>${esc(l)}</option>`).join('')}
  </select></label>`;
};
const chips = (act, attrs, values) => `<div class="suggest">${values.map(v => `<button type="button" data-act="${act}" ${attrs} data-v="${esc(v)}">${esc(v)}</button>`).join('')}</div>`;

function progressBar(s) {
  const objs = allObjectives(s);
  if (!objs.length) return '<div class="progress"></div>';
  return '<div class="progress">' + STATUSES.map(st => {
    const n = objs.filter(o => (o.status || 'todo') === st.v).length;
    return n ? `<span style="width:${(n / objs.length) * 100}%;background:${st.color}" title="${st.label}: ${n}"></span>` : '';
  }).join('') + '</div>';
}

// 15 November of the student's school year: the plan must be presented to the parents by then.
function parentsDeadline(s) {
  const y = /^(\d{4})/.exec(s.year || '')?.[1];
  return y ? new Date(+y, 10, 15) : null;
}

// ---------- building the plan ----------
function fillBlanks(text, s) {
  const g = +s.grade;
  let t = text;
  if (g) t = t.replace(/صف ___/g, `صف ${ARABIC_GRADES[g] || g}`);
  if (g && /كلمة في الدقيقة/.test(t)) t = t.replace('___', fluencyNorm(g));
  return t;
}
function methodsFor(domain, area) {
  return (METHODS[area] || METHODS[domain] || METHODS.other).slice(0, 2).join('، ');
}
function partnersFor(domain) {
  return {
    arabic: 'المربية، معلمة التربية الخاصة', math: 'المربية، معلمة التربية الخاصة',
    emotional: 'المربية، المستشارة، الاهل', comm: 'المربية، معالجة النطق، الاهل',
    cognitive: 'المربية، المعالجة الوظيفية', motor: 'المعالجة الوظيفية، المربية',
  }[domain] || 'المربية';
}
function newSection(s, domain) {
  return { id: uid(), domain, teacher: '', annual: fillBlanks(domainOf(domain)?.annual || '', s), current: '', strengths: '', difficulties: '', accommodations: '', objectives: [] };
}
function sectionFor(s, domain) {
  let sec = s.goals.find(g => g.domain === domain);
  if (!sec) { sec = newSection(s, domain); s.goals.push(sec); }
  return sec;
}
function newObjective(s, { text, domain, area, ref }) {
  return {
    id: uid(), ref: ref || '', area: area || '',
    curriculum: (ref && GOAL_BY_ID[ref]?.d === domain && GOAL_BY_ID[ref].cur) || '',
    text: fillBlanks(text, s), period: 'حتى نهاية السنة', criterion: 'بنسبة نجاح 80%',
    methods: [...(STRATEGY_FOR[ref] || []).slice(0, 1), methodsFor(domain, area)].join('، '), partners: partnersFor(domain), status: 'todo', notes: '', midEval: '', finalEval: '',
  };
}
function addObjective(s, sec, item) {
  const text = fillBlanks(item.text, s);
  if (sec.objectives.some(o => (item.ref && o.ref === item.ref) || o.text === text)) return false;
  sec.objectives.push(newObjective(s, { ...item, domain: sec.domain }));
  return true;
}
const fitsLevel = (goal, level) => !level || !goal.level || goal.level.includes(level);

// Builds (or rebuilds) the plan from the mapping. Returns null when nothing was entered.
function buildPlan(s, rebuild) {
  const rated = ALL_ITEMS.filter(i => rating(s, i.id)).sort((a, b) => rating(s, a.id) - rating(s, b.id));
  const hasNotes = Object.values(s.mapNotes).some(v => v && v.trim());
  if (!rated.length && !s.readingLevel && !hasNotes) return null;
  if (rebuild) s.goals = [];

  const strengths = {}, difficulties = {};
  const push = (map, domain, line) => (map[domain] ??= []).push(line);
  let added = 0;

  for (const item of rated) {
    const r = rating(s, item.id);
    const note = s.ratings[item.id]?.note?.trim();
    const domain = item.goals[0]?.domain || item.group.domain;
    const line = `${item.label} (${r})${note ? ' – ' + note : ''}`;
    if (r > (item.section.needs || NEEDS_GOAL)) { push(strengths, domain, line); continue; }
    push(difficulties, domain, line);
    const fitting = item.goals.filter(g => fitsLevel(g, s.readingLevel));
    for (const g of (fitting.length ? fitting : item.goals)) {
      if (addObjective(s, sectionFor(s, g.domain), g)) added++;
    }
  }

  // Reading level (assessment tools PDF): if the reading skills weren't rated, start from the level's core goals.
  const readingIds = ACADEMIC.filter(x => x.sec.startsWith('ד')).flatMap(x => x.items.map(i => i[0]));
  if (s.readingLevel && !readingIds.some(id => rating(s, id))) {
    const core = { 'أ': ['r1', 'r3', 'r4', 'r5', 'r12', 'r13', 'c18', 'o5'], 'ب': ['r18', 'r20', 'r22', 'r28', 'f1', 'f2', 'c1', 'c3'], 'ج': ['r30', 'f2', 'c3', 'c6', 'c9', 'c12', 'k10', 'k20'] }[s.readingLevel];
    for (const id of core) {
      const g = GOAL_BY_ID[id];
      if (addObjective(s, sectionFor(s, 'arabic'), { domain: 'arabic', area: g.area, text: g.t, ref: g.id })) added++;
    }
  }

  // Current functioning: the teacher's notes per mapping area + reading data.
  const currentText = {};
  for (const grp of MAP_GROUPS) {
    const lines = [];
    if (grp.reading) {
      if (s.readingLevel) lines.push(READING_LEVELS[s.readingLevel].title);
      if (s.readingBand) lines.push(`רמת קריאות: ${s.readingBand}`);
      if (s.listeningBand) lines.push(`הבנת הנשמע: ${s.listeningBand}`);
      if (s.wpm) lines.push(`سرعة القراءة: ${s.wpm} كلمة في الدقيقة${s.grade ? ` (المعيار لصفه: ${fluencyNorm(s.grade)})` : ''}`);
    }
    if (s.mapNotes[grp.id]?.trim()) lines.push(s.mapNotes[grp.id].trim());
    if (lines.length) currentText[grp.domain] = lines.join('\n');
  }

  const order = DOMAINS.map(d => d.id);
  for (const sec of s.goals) {
    if (currentText[sec.domain] && (rebuild || !sec.current.trim())) sec.current = currentText[sec.domain];
    if (strengths[sec.domain] && (rebuild || !sec.strengths.trim())) sec.strengths = strengths[sec.domain].join('\n');
    if (difficulties[sec.domain] && (rebuild || !sec.difficulties.trim())) sec.difficulties = difficulties[sec.domain].join('\n');
  }
  s.goals.sort((a, b) => order.indexOf(a.domain) - order.indexOf(b.domain));

  // Profile table of the Matya format: strengths and areas to strengthen per area.
  for (const row of PROFILE_ROWS) {
    const st = row.domains.flatMap(d => strengths[d] || []), df = row.domains.flatMap(d => difficulties[d] || []);
    const cur = s.profile[row.id] ??= { strengths: '', focus: '' };
    if (st.length && (rebuild || !cur.strengths.trim())) cur.strengths = st.join('\n');
    if (df.length && (rebuild || !cur.focus.trim())) cur.focus = df.join('\n');
  }

  // Overall strengths / difficulties on the details page, if still empty.
  const all = map => Object.values(map).flat();
  if (!s.strengths.trim() && all(strengths).length) s.strengths = all(strengths).join('\n');
  if (!s.difficulties.trim() && all(difficulties).length) s.difficulties = all(difficulties).join('\n');
  return added;
}

// Goals offered under a plan section.
function bankFor(domain) {
  if (domain === 'arabic' || domain === 'math') {
    const bank = GOALS.filter(g => g.d === domain).map(g => ({ ref: g.id, text: g.t, area: domain === 'arabic' ? g.cur : g.area, level: g.level }));
    return domain === 'math' ? bank.concat(devBank('math')) : bank;
  }
  return FUNCTIONAL.flatMap(sec => sec.items.filter(i => i[2] === domain).map(([id, , , t]) => ({ ref: id, text: t, area: 'מיפוי בית הספר' })))
    .concat(devBank(domain));
}
function devBank(domain) {
  return DEVELOPMENTAL.filter(sec => sec.domain === domain).flatMap(sec => sec.items.map(([id, , t]) => ({ ref: id, text: t, area: sec.label })));
}

// ---------- rendering ----------
const app = document.getElementById('app');
// Every render ends with the ✨ buttons.
const renderScreen = () => { renderInner(); decorateAI(); };

function render() { renderScreen(); }
function renderInner() {
  const back = document.getElementById('backBtn');
  const actions = document.getElementById('topActions');
  const title = document.getElementById('title');
  if (view.name === 'newpw') {
    back.hidden = true; title.textContent = 'תל"א / תח"י'; actions.innerHTML = '';
    renderNewPassword();
  } else if (view.name === 'account') {
    back.hidden = false; title.textContent = 'החשבון שלי'; actions.innerHTML = '';
    renderAccount();
  } else if (view.name === 'login') {
    back.hidden = true; title.textContent = 'תל"א / תח"י'; actions.innerHTML = '';
    renderLogin();
  } else if (view.name === 'admin') {
    back.hidden = false; title.textContent = 'ניהול – כל המורות'; actions.innerHTML = accountMenu();
    renderAdmin();
  } else if (view.name === 'adminStudent') {
    back.hidden = false; title.textContent = `${fullName(view.adminData)} · צפייה בלבד`; actions.innerHTML = accountMenu();
    app.innerHTML = `<div class="card muted">מורה: <b>${esc(view.adminOwner)}</b> · עודכן ${new Date(view.adminData.updatedAt || 0).toLocaleString('he-IL')}</div>` + tabDoc(view.adminData);
  } else if (view.name === 'list') {
    back.hidden = true;
    title.textContent = 'תל"א / תח"י';
    actions.innerHTML = `<button class="btn small" data-act="export-all" title="גיבוי כל הנתונים לקובץ">ייצוא</button>
      <button class="btn small" data-act="import" title="שחזור מקובץ גיבוי">ייבוא</button>${accountMenu()}`;
    renderList();
  } else {
    const s = current();
    if (!s) { view = { name: 'list', q: '' }; return render(); }
    back.hidden = false;
    title.textContent = fullName(s);
    actions.innerHTML = `<span class="saved" id="savedNote"></span>`;
    renderStudent(s);
  }
}

const SYNC_TEXT = { syncing: 'מסנכרן…', saved: '☁️ שמור בשרת', pending: 'ממתין לשליחה…', offline: 'אין חיבור – יישלח אחר כך', error: '⚠️ שגיאת סנכרון', idle: '' };
function accountMenu() {
  if (!Cloud.user) return '';
  return `<span class="sync" id="syncNote">${SYNC_TEXT[Cloud.status] || ''}</span>
    ${Cloud.admin && view.name !== 'admin' ? '<button class="btn small" data-act="admin">ניהול</button>' : ''}
    <button class="btn small" data-act="account" title="החשבון שלי: סיסמה וקוד שחזור">🔑</button>
    <button class="btn small" data-act="logout" title="${esc(Cloud.displayName())}">יציאה</button>`;
}
function showSync(st) {
  const el = document.getElementById('syncNote');
  if (el) el.textContent = SYNC_TEXT[st] || '';
}

function renderLogin() {
  const mode = view.loginMode || 'login';
  const reg = mode === 'register', forgot = mode === 'forgot';
  if (forgot && view.sentTo) {
    app.innerHTML = `<div class="card login"><div class="big">📧</div><h2>שלחנו לך מייל</h2>
      <p>שלחנו קישור לבחירת סיסמה חדשה אל <b dir="ltr">${esc(view.sentTo)}</b>.</p>
      <p class="muted">פתחי את המייל (בדקי גם בספאם) ולחצי על הכפתור שבו. הקישור יחזיר אותך לכאן לבחירת סיסמה חדשה.</p>
      <button class="btn" data-act="login-mode" data-v="login">חזרה לכניסה</button></div>`;
    return;
  }
  const title = reg ? 'הרשמה ל-תל"א / תח"י' : forgot ? 'שכחתי סיסמה' : 'כניסה ל-תל"א / תח"י';
  app.innerHTML = `<div class="card login">
    <div class="big">${forgot ? '🔑' : '📋'}</div>
    <h2>${title}</h2>
    <p class="muted">${forgot ? 'הקלידי את מספר הטלפון שלך (או את המייל), ונשלח לך מייל עם קישור לבחירת סיסמה חדשה.'
      : 'כל מורה נכנסת עם מספר הטלפון שלה וסיסמה. התלמידים שלך נשמרים בחשבון שלך ואפשר לעבוד מכל מכשיר.'}</p>
    ${reg ? '<label class="field">שם מלא<input type="text" id="loginName" autocomplete="name"></label>' : ''}
    <label class="field">${forgot ? 'מספר טלפון או מייל' : 'מספר טלפון'}<input type="${forgot ? 'text' : 'tel'}" id="loginPhone" dir="ltr" inputmode="${forgot ? 'email' : 'tel'}" autocomplete="tel" placeholder="05X-XXXXXXX"></label>
    ${reg ? '<label class="field">מייל (לשחזור סיסמה אם תישכח)<input type="email" id="loginEmail" dir="ltr" autocomplete="email" placeholder="name@example.com"></label>' : ''}
    ${!forgot ? `<label class="field">סיסמה<input type="password" id="loginPassword" dir="ltr" autocomplete="${reg ? 'new-password' : 'current-password'}"></label>` : ''}
    <button class="btn primary big" data-act="${reg ? 'register' : forgot ? 'forgot' : 'login-phone'}">${reg ? 'הרשמה' : forgot ? 'שליחת מייל' : 'כניסה'}</button>
    ${mode === 'login' ? `<button class="btn ghost small" data-act="login-mode" data-v="register">פעם ראשונה? הרשמה</button>
      <button class="btn ghost small" data-act="login-mode" data-v="forgot">שכחתי סיסמה</button>` :
      `<button class="btn ghost small" data-act="login-mode" data-v="login">חזרה לכניסה</button>`}
  </div>`;
  document.getElementById(reg ? 'loginName' : 'loginPhone')?.focus();
}

// After the link in the reset e-mail: choose a new password.
function renderNewPassword() {
  app.innerHTML = `<div class="card login"><div class="big">🔑</div><h2>בחירת סיסמה חדשה</h2>
    <p class="muted">${esc(Cloud.displayName())}</p>
    <label class="field">סיסמה חדשה<input type="password" id="newPw" dir="ltr" autocomplete="new-password"></label>
    <button class="btn primary big" data-act="save-password">שמירה וכניסה</button></div>`;
  document.getElementById('newPw')?.focus();
}

function renderAccount() {
  const phone = Cloud.userPhone();
  app.innerHTML = `<div class="card"><h2>החשבון שלי</h2>
      <p>${esc(Cloud.displayName())}${phone ? ` · <bdi dir="ltr">${esc(phone)}</bdi>` : ''} · <bdi dir="ltr">${esc(Cloud.user.email)}</bdi></p></div>
    <div class="card"><h2>שינוי סיסמה</h2>
      <label class="field">סיסמה חדשה<input type="password" id="newPw" dir="ltr" autocomplete="new-password"></label>
      <button class="btn primary" data-act="save-password" style="margin-top:10px">שמירת סיסמה</button></div>`;
}

function renderAdmin() {
  const rows = view.adminRows;
  if (!rows) { app.innerHTML = '<div class="card empty">טוען את נתוני כל המורות…</div>'; return; }
  const q = (view.adminQ || '').trim();
  const phoneBy = Object.fromEntries((view.adminUsers || []).map(u => [String(u.email).toLowerCase(), u.phone]));
  const teacherOf = r => [r.owner_name, Cloud.showPhone(phoneBy[r.owner_email]) || r.owner_email].filter(Boolean).join(' · ') || '—';
  const list = rows.filter(r => !q || [teacherOf(r), fullName(r.data), r.data.className, r.data.school, r.data.homeroomTeacher].join(' ').includes(q));
  const byTeacher = {};
  for (const r of list) (byTeacher[teacherOf(r)] ??= []).push(r);
  const teachers = Object.keys(byTeacher).sort();
  app.innerHTML = `
    <div class="card row">
      <input type="search" id="adminQ" placeholder="חיפוש מורה, תלמיד/ה, כיתה…" value="${esc(q)}" style="flex:1">
      <button class="btn" data-act="admin-refresh">רענון</button>
      <button class="btn" data-act="admin-export">גיבוי הכל (JSON)</button>
    </div>
    <div class="card"><b>${new Set(rows.map(r => r.owner_email)).size}</b> מורות · <b>${rows.length}</b> תלמידים
      · <b>${rows.reduce((t, r) => t + (r.data.goals || []).reduce((n, g) => n + (g.objectives || []).length, 0), 0)}</b> יעדים</div>
    ${view.adminUsers ? `<details class="card teachers"><summary><b>מורות רשומות (${view.adminUsers.length})</b> – איפוס סיסמה</summary>
      <div class="scroll-x"><table class="table">
        <tr><th>שם</th><th>טלפון</th><th>מייל</th><th>נרשמה</th><th>כניסה אחרונה</th><th></th></tr>
        ${view.adminUsers.map(u => `<tr><td>${esc(u.name || '—')}</td><td dir="ltr" style="text-align:right">${esc(Cloud.showPhone(u.phone))}</td><td dir="ltr" style="text-align:right">${esc(u.email)}</td>
          <td>${u.created_at ? new Date(u.created_at).toLocaleDateString('he-IL') : ''}</td>
          <td>${u.last_sign_in_at ? new Date(u.last_sign_in_at).toLocaleDateString('he-IL') : '—'}</td>
          <td><button class="btn small" data-act="admin-reset" data-email="${esc(u.email)}">איפוס סיסמה</button></td></tr>`).join('')}
      </table></div></details>` : ''}
    ${teachers.map(t => `<div class="card">
      <h2>${esc(t)} <span class="count">${byTeacher[t].length} תלמידים</span></h2>
      <div class="scroll-x"><table class="table">
        <tr><th>תלמיד/ה</th><th>כיתה</th><th>בית ספר</th><th>תחומים / יעדים</th><th>עודכן</th><th></th></tr>
        ${byTeacher[t].map(r => {
          const d = r.data, objs = (d.goals || []).reduce((n, g) => n + (g.objectives || []).length, 0);
          return `<tr><td><b>${esc(fullName(d))}</b></td><td>${esc([GRADE_NAMES[+d.grade], d.className].filter(Boolean).join(' · '))}</td>
            <td>${esc(d.school)}</td><td>${(d.goals || []).length} / ${objs}</td><td>${new Date(r.updated_at).toLocaleDateString('he-IL')}</td>
            <td class="row" style="flex-wrap:nowrap"><button class="btn small" data-act="admin-open" data-id="${r.id}">צפייה</button>
              <button class="btn small" data-act="admin-excel" data-id="${r.id}">Excel</button></td></tr>`;
        }).join('')}
      </table></div></div>`).join('') || '<div class="card empty muted">אין עדיין נתונים.</div>'}`;
}
async function openAdmin() {
  view = { name: 'admin', adminRows: null, adminQ: '' }; render();
  try { view.adminRows = await Cloud.allStudents(); }
  catch (e) { view.adminRows = []; alert('לא ניתן לטעון את הנתונים: ' + (e.message || e)); }
  try { view.adminUsers = await Cloud.adminUsers(); } catch { view.adminUsers = null; }
  if (view.name === 'admin') render();
}

function renderList() {
  const q = view.q.trim();
  const list = students
    .filter(s => !q || [fullName(s), s.className, s.school].join(' ').includes(q))
    .sort((a, b) => b.updatedAt - a.updatedAt);
  const today = new Date();
  app.innerHTML = `
    <div class="row search">
      <input type="search" id="q" placeholder="חיפוש תלמיד/ה, כיתה או בית ספר…" value="${esc(view.q)}" style="flex:1">
      <button class="btn primary" data-act="add-student">+ תלמיד/ה חדש/ה</button>
    </div>
    ${students.length === 0 ? `
      <div class="card empty">
        <div class="big">📋</div>
        <h2>ברוכים הבאים ל-תל"א / תח"י</h2>
        <ol class="howto">
          <li><b>פרטי התלמיד/ה</b> – פרטים אישיים, רקע, תמיכות והתאמות.</li>
          <li><b>מיפוי והערכה</b> – לכל מיומנות: הערכה 1–5 והערה, ונתונים כלליים לכל תחום.</li>
          <li><b>בניית התוכנית</b> – לחיצה אחת, והאפליקציה בונה את התל"א מכל מה שהוכנס.</li>
        </ol>
        <button class="btn primary" data-act="add-student">התחילו בתלמיד/ה הראשון/ה</button>
        <p class="muted" style="font-size:.85rem;margin-top:18px">הנתונים נשמרים במכשיר זה בלבד. מומלץ לגבות מדי פעם בכפתור "ייצוא".</p>
      </div>` : ''}
    <div class="student-list">
      ${list.map(s => {
        const objs = allObjectives(s);
        const done = objs.filter(o => o.status === 'done').length;
        const rated = ALL_ITEMS.filter(i => rating(s, i.id)).length;
        const dl = parentsDeadline(s);
        const late = dl && !s.steps.parents && today > dl;
        const soon = dl && !s.steps.parents && !late && dl - today < 30 * 864e5;
        return `<div class="card student-card" data-open="${s.id}">
          <div class="name">${esc(fullName(s))}</div>
          <div class="muted">${esc([s.className && 'כיתה ' + s.className, s.school].filter(Boolean).join(' · '))} ${s.year ? `<bdi dir="ltr">${esc(s.year)}</bdi>` : ''}</div>
          <div class="muted" style="margin-top:6px">${rated} מיומנויות מופו · ${objs.length} יעדים · ${done} הושגו</div>
          ${late ? '<div class="badge late">לא סומן שהתוכנית הוצגה להורים (מועד: 15.11)</div>' : soon ? '<div class="badge soon">להציג להורים עד 15.11</div>' : ''}
          ${progressBar(s)}
        </div>`;
      }).join('')}
    </div>
    ${students.length && !list.length ? '<p class="muted">לא נמצאו תוצאות.</p>' : ''}`;
}

const TABS = [
  ['details', '1. פרטי התלמיד/ה'],
  ['mapping', '2. מיפוי והערכה'],
  ['goals', '3. התוכנית'],
  ['tracking', '4. מעקב'],
  ['doc', 'הדפסה'],
];

function renderStudent(s) {
  const body = { details: tabDetails, mapping: tabMapping, goals: tabGoals, tracking: tabTracking, doc: tabDoc }[view.tab](s);
  app.innerHTML = `
    <div class="tabs">${TABS.map(([k, l]) => `<button class="tab ${view.tab === k ? 'active' : ''}" data-tab="${k}">${l}</button>`).join('')}</div>
    ${body}`;
}

function nextButton(tab, label) {
  return `<div class="card row next"><span class="spacer"></span><button class="btn primary" data-tab="${tab}">${label} ←</button></div>`;
}

function tabDetails(s) {
  return `
  <div class="card"><h2>פרטים אישיים</h2>
    <div class="grid">
      ${field('firstName', 'שם פרטי')}${field('lastName', 'שם משפחה')}
      ${selectField('gender', 'ז/נ', [['ז', 'ז'], ['נ', 'נ']])}
      ${field('idNumber', 'ת.ז.')}${field('birthDate', 'תאריך לידה', 'date')}
      ${field('school', 'בית הספר')}${field('city', 'ישוב')}
      ${field('className', 'כיתה')}
      ${selectField('grade', 'דרגת כיתה', GRADE_NAMES.slice(1).map((n, i) => [i + 1, n]))}
      ${field('homeroomTeacher', 'שם המחנכ/ת')}${field('inclusionTeacher', 'שם מורת השילוב')}${field('aide', 'סייעת')}
      ${selectField('committee', 'ועדה', [['שילוב', 'שילוב'], ['השמה', 'השמה']])}
      ${field('committeeDate', 'מועד ועדה', 'date')}
      ${field('parentsContact', 'קשר עם הורים')}
      ${field('year', 'שנת לימודים').replace('<input', '<input dir="ltr" style="text-align:right"')}
      ${field('fillDate', 'תאריך מילוי התוכנית', 'date')}
    </div>
  </div>
  <div class="card"><h2>רקע</h2>
    <div class="grid">
      ${selectField('familyStatus', 'מצב משפחתי', ['נשואים', 'גרושים', 'פרודים', 'אחר'].map(x => [x, x]))}
      ${field('familyPosition', 'מיקום במשפחה')}
      ${field('health', 'מצב בריאותי / תרופות קבועות', 'text', 'wide')}
      ${field('previousSchools', 'מוסדות חינוכיים קודמים – מגיל הגן', 'textarea', 'wide')}
      ${field('background', 'רקע כללי (התפתחותי, לימודי, טיפולים, ראיון הורים, דו"חות קודמים)', 'textarea', 'wide')}
      ${field('motivators', 'תחומי עניין ומחזקים', 'textarea', 'wide')}
      ${field('parentsView', 'עמדת ההורים ומטרותיהם', 'textarea', 'wide')}
      ${field('studentView', 'ייצוג וסינגור עצמי – מטרות מפי התלמיד/ה', 'textarea', 'wide')}
    </div>
  </div>
  <div class="card"><h2>סוגי תמיכה וטיפול שקיבל</h2>
    <div class="scroll-x"><table class="table check-table">
      <tr><th></th>${SUPPORT_TYPES.map(t => `<th>${t}</th>`).join('')}</tr>
      ${SUPPORT_WHEN.map(w => `<tr><th>${w}</th>${SUPPORT_TYPES.map(t => {
        const key = `${w}|${t}`;
        return `<td><input type="checkbox" data-path="support.${key}" ${s.support[key] ? 'checked' : ''} aria-label="${w} – ${t}"></td>`;
      }).join('')}</tr>`).join('')}
    </table></div>
    <h3 style="margin-top:14px">אבחונים – תאריך האבחון האחרון</h3>
    <div class="grid">${DIAGNOSES.map(d => field(`diagnoses.${d}`, d, 'date')).join('')}</div>
  </div>
  <div class="card"><h2>תמיכות שהתלמיד/ה מקבל/ת</h2>
    <table class="table">
      <tr><th>סוג התמיכה</th><th style="width:110px">מספר השעות</th><th>שם המורה / המטפל</th><th></th></tr>
      ${s.supports.map((m, i) => `<tr>
        <td><input type="text" data-path="supports.${i}.type" value="${esc(m.type)}" list="supportKinds"></td>
        <td><input type="text" data-path="supports.${i}.hours" value="${esc(m.hours)}" inputmode="decimal"></td>
        <td><input type="text" data-path="supports.${i}.teacher" value="${esc(m.teacher)}"></td>
        <td style="width:40px"><button class="btn small danger" data-act="del-support" data-i="${i}" aria-label="מחיקה">✕</button></td>
      </tr>`).join('')}
    </table>
    <datalist id="supportKinds">${SUPPORT_KINDS.map(r => `<option value="${r}">`).join('')}</datalist>
    <button class="btn ghost" data-act="add-support" style="margin-top:8px">+ הוספת תמיכה</button>
  </div>
  <div class="card"><h2>התאמות בהמלצת בית הספר</h2>
    <div class="checks">${ACCOMMODATIONS.map(a => `<label class="check"><input type="checkbox" data-path="accommodations.${a}" ${s.accommodations[a] ? 'checked' : ''}> ${a}</label>`).join('')}</div>
    ${field('accommodationsOther', 'אחר / התאמות בדרכי הוראה ולמידה', 'textarea', 'wide')}
  </div>
  <div class="card"><h2>צוות</h2>
    <table class="table">
      ${s.team.map((m, i) => `<tr>
        <td><input type="text" data-path="team.${i}.name" value="${esc(m.name)}" placeholder="שם"></td>
        <td><input type="text" data-path="team.${i}.role" value="${esc(m.role)}" placeholder="תפקיד" list="roles"></td>
        <td style="width:40px"><button class="btn small danger" data-act="del-team" data-i="${i}" aria-label="מחיקה">✕</button></td>
      </tr>`).join('')}
    </table>
    <datalist id="roles">${TEAM_ROLES.map(r => `<option value="${r}">`).join('')}</datalist>
    <button class="btn ghost" data-act="add-team" style="margin-top:8px">+ הוספת איש/אשת צוות</button>
  </div>
  ${nextButton('mapping', 'המשך למיפוי')}
  <div class="card no-print"><h2>פעולות</h2>
    <div class="row">
      <button class="btn" data-act="export-one">ייצוא תלמיד/ה לקובץ</button>
      <button class="btn" data-act="clone-year">שכפול לשנה הבאה</button>
      <span class="spacer"></span>
      <button class="btn danger" data-act="del-student">מחיקת התלמיד/ה</button>
    </div>
  </div>`;
}

function rateRow(s, item, sec) {
  const v = s.ratings[item.id]?.b || '';
  const tip = n => sec?.interim ? `${INTERIM_SCALE[n]}` : scaleLabel(n);
  return `<tr>
    <td dir="auto">${esc(item.label)}</td>
    <td><div class="rate5" role="radiogroup" aria-label="${esc(item.label)}">
      ${SCALE.map(([n]) => `<label class="r${n}" title="${tip(n)}"><input type="radio" name="rate-${item.id}" value="${n}" data-path="ratings.${item.id}.b" ${String(n) === String(v) ? 'checked' : ''}><span>${n}</span></label>`).join('')}
      <button type="button" class="clear" data-act="clear-rate" data-id="${item.id}" title="ניקוי" ${v ? '' : 'hidden'}>✕</button>
    </div></td>
    <td><input type="text" data-path="ratings.${item.id}.note" value="${esc(s.ratings[item.id]?.note)}" dir="auto" placeholder="הערה"></td>
  </tr>`;
}

function readingBlock(s) {
  const a = ASSESSMENT[Math.min(+s.grade || 0, 7)];
  return `<div class="reading">
    <h3>רמת קריאה – أدوات لتقييم البروفيل اللغوي</h3>
    <div class="grid">
      ${selectField('grade', 'דרגת כיתה', GRADE_NAMES.slice(1).map((n, i) => [i + 1, n]))}
      ${selectField('readingBand', 'רמת קריאות (הקיפי)', GRADE_BANDS.map(b => [b, b]))}
      ${selectField('listeningBand', 'הבנת הנשמע (הקיפי)', GRADE_BANDS.map(b => [b, b]))}
      <label class="field">سرعة القراءة (كلمة في الدقيقة)<input type="text" data-path="wpm" value="${esc(s.wpm)}" inputmode="numeric">
        ${s.grade ? `<span class="hint">المعيار لصفه: ${fluencyNorm(s.grade)}</span>` : ''}</label>
    </div>
    <div class="levels">
      ${Object.entries(READING_LEVELS).map(([k, l]) => `<label class="level ${s.readingLevel === k ? 'active' : ''}" dir="rtl">
        <input type="radio" name="readingLevel" value="${k}" data-path="readingLevel" data-rerender ${s.readingLevel === k ? 'checked' : ''}>
        <b>${l.title}</b><span>${l.text}</span></label>`).join('')}
    </div>
    ${a ? `<div class="tools" dir="rtl">
      <b>مهام التقييم للصف ${ARABIC_GRADES[Math.min(+s.grade, 7)]}${+s.grade > 7 ? ' (اعلى صف في الملف)' : ''}:</b>
      <ul>${a.tasks.map(t => `<li>${esc(t)}</li>`).join('')}</ul>
      <a class="btn small" href="${TOOLS_PDF}#page=${a.page}" target="_blank" rel="noopener">פתיחת כלי ההערכה ↗</a>
    </div>` : '<p class="muted">בחרו דרגת כיתה כדי לראות את משימות ההערכה המתאימות.</p>'}
  </div>`;
}

function tabMapping(s) {
  const open = view.openSec || {};
  return `
  <div class="card scale-card">
    <b>סולם ההערכה</b>
    <div class="scale5">${SCALE.map(([n, l]) => `<span class="r${n}"><b>${n}</b> ${l}</span>`).join('')}</div>
    <div class="muted" style="font-size:.85rem">מיומנות שהוערכה 1–${NEEDS_GOAL} תיכנס לתוכנית כיעד; ${NEEDS_GOAL + 1}–5 תירשם כתחום חוזק. אין חובה להעריך הכל – רק את מה שנבדק.</div>
  </div>
  ${MAP_GROUPS.map(grp => {
    const items = grp.sections.flatMap(x => x.items);
    const rated = items.filter(i => rating(s, i.id)).length;
    return `<div class="card map-group">
      <h2>${grp.title} <span class="count">${rated}/${items.length}</span></h2>
      <label class="field wide">נתונים והערות כלליות לתחום (תצפיות, מבחנים, אבחונים, דברי הצוות)
        <textarea dir="auto" data-path="mapNotes.${grp.id}">${esc(s.mapNotes[grp.id])}</textarea></label>
      ${grp.reading ? readingBlock(s) : ''}
      ${grp.sections.map((sec, si) => {
        const key = `${grp.id}-${si}`;
        const n = sec.items.filter(i => rating(s, i.id)).length;
        return `<details class="map-sec" data-key="${key}" ${open[key] ? 'open' : ''}>
          <summary dir="auto">${esc(sec.title)} <span class="count">${n}/${sec.items.length}</span>${sec.source ? '<span class="src" title="' + esc(DEV_SOURCE) + '">ⓘ</span>' : ''}</summary>
          ${sec.interim ? `<div class="cur-note" dir="rtl">${[5, 4, 3, 2, 1].map(n => `<b>${n}</b> ${INTERIM_SCALE[n]}`).join(' · ')} — 1–${INTERIM_NEEDS_GOAL} تدخل الخطة كأهداف</div>` : ''}
          <div class="scroll-x"><table class="table rate-table">${sec.items.map(i => rateRow(s, i, sec)).join('')}</table></div>
        </details>`;
      }).join('')}
    </div>`;
  }).join('')}
  <div class="card build">
    <div><b>סיימת להכניס נתונים?</b><div class="muted">האפליקציה תבנה תוכנית לכל תחום: יכולת התפקוד הנוכחית, תחומי חוזק וקושי, ויעדים ממאגר המטרות לפי ההערכות.</div></div>
    <button class="btn primary big" data-act="build">✨ בנה את התוכנית</button>
  </div>`;
}

function tabGoals(s) {
  const partnerChips = [...new Set([...s.team.filter(m => m.name).map(m => m.name), ...PARTNERS])];
  return `
  <div class="card row">
    <div><b>בנייה מהמיפוי</b><div class="muted" style="font-size:.9rem">שיניתם את המיפוי? אפשר להוסיף רק יעדים חדשים, או לבנות את כל התוכנית מחדש.</div></div>
    <span class="spacer"></span>
    <button class="btn" data-act="build-add">הוספת יעדים חדשים</button>
    <button class="btn primary" data-act="build">✨ בנייה מחדש</button>
    <button class="btn" data-act="excel">⬇️ Excel</button>
  </div>
  ${s.goals.length || Object.keys(s.profile).length ? `<div class="card"><h2>פרופיל תלמיד – תיאור רמת התפקוד</h2>
    <div class="scroll-x"><table class="table profile-table">
      <tr><th></th><th>מוקדי כוח – תחומים בהם התלמיד מגלה יכולת וכישורים</th><th>מוקדים לחיזוק</th></tr>
      ${PROFILE_ROWS.map(r => `<tr><td><b>${r.title}</b><div class="muted" style="font-size:.8rem">${r.desc}</div></td>
        <td><textarea dir="auto" data-path="profile.${r.id}.strengths">${esc(s.profile[r.id]?.strengths)}</textarea></td>
        <td><textarea dir="auto" data-path="profile.${r.id}.focus">${esc(s.profile[r.id]?.focus)}</textarea></td></tr>`).join('')}
    </table></div>
    ${field('studentView', 'ייצוג וסינגור עצמי – מטרות מפי התלמיד/ה', 'textarea', 'wide')}
  </div>` : ''}
  ${s.goals.length === 0 ? `<div class="card empty"><div class="big">🎯</div>
    <p class="muted">עדיין אין תוכנית. מלאו את <b>המיפוי</b> ולחצו "בנה את התוכנית", או הוסיפו תחום ידנית למטה.</p>
    <button class="btn primary" data-tab="mapping">למיפוי</button></div>` : ''}
  ${s.goals.map((g, gi) => {
    const bank = bankFor(g.domain);
    const areas = [...new Set(bank.map(b => b.area))];
    const used = new Set(g.objectives.map(o => o.ref).filter(Boolean));
    return `
    <div class="card goal">
      <div class="goal-head">
        <span class="domain-pill">תחום ${gi + 1}</span>
        <select data-path="goals.${gi}.domain" data-rerender style="width:auto">
          ${DOMAINS.map(d => `<option value="${d.id}" ${d.id === g.domain ? 'selected' : ''}>${d.label}</option>`).join('')}
          ${domainOf(g.domain) ? '' : `<option selected value="${esc(g.domain)}">${esc(g.domain)}</option>`}
        </select>
        <span class="spacer"></span>
        <button class="btn small" data-act="move-goal" data-gi="${gi}" data-dir="-1" ${gi === 0 ? 'disabled' : ''} aria-label="למעלה">▲</button>
        <button class="btn small" data-act="move-goal" data-gi="${gi}" data-dir="1" ${gi === s.goals.length - 1 ? 'disabled' : ''} aria-label="למטה">▼</button>
        <button class="btn small danger" data-act="del-goal" data-gi="${gi}">מחיקת תחום</button>
      </div>
      <div class="grid">
        <label class="field">שם מורה אחראית תחום<input type="text" data-path="goals.${gi}.teacher" value="${esc(g.teacher)}" list="teamNames"></label>
        <label class="field wide">מטרה\\ות שנתית\\ות<textarea dir="auto" data-path="goals.${gi}.annual">${esc(g.annual)}</textarea></label>
        <label class="field wide">יכולת התפקוד הנוכחית<textarea dir="auto" data-path="goals.${gi}.current">${esc(g.current)}</textarea></label>
        <label class="field">תחומי חוזק<textarea dir="auto" data-path="goals.${gi}.strengths">${esc(g.strengths)}</textarea></label>
        <label class="field">תחומי קושי<textarea dir="auto" data-path="goals.${gi}.difficulties">${esc(g.difficulties)}</textarea></label>
      </div>
      ${g.objectives.map((o, oi) => `
        <div class="objective">
          <div class="row" style="margin-bottom:8px">
            <span class="num">יעד ${gi + 1}.${oi + 1}</span>
            ${g.domain === 'arabic' ? `<select class="cur-select" data-path="goals.${gi}.objectives.${oi}.curriculum" title="مجال المنهاج 2009">
              <option value="">مجال المنهاج 2009…</option>${CURRICULUM.domains.map(c => `<option ${c === o.curriculum ? 'selected' : ''}>${c}</option>`).join('')}
            </select>` : ''}
            <select class="status ${statusOf(o.status).cls}" data-path="goals.${gi}.objectives.${oi}.status" data-status>
              ${STATUSES.map(st => `<option value="${st.v}" ${st.v === (o.status || 'todo') ? 'selected' : ''}>${st.label}</option>`).join('')}
            </select>
            <span class="spacer"></span>
            <button class="btn small" data-act="move-obj" data-gi="${gi}" data-oi="${oi}" data-dir="-1" ${oi === 0 ? 'disabled' : ''} aria-label="למעלה">▲</button>
            <button class="btn small" data-act="move-obj" data-gi="${gi}" data-oi="${oi}" data-dir="1" ${oi === g.objectives.length - 1 ? 'disabled' : ''} aria-label="למטה">▼</button>
            <button class="btn small danger" data-act="del-obj" data-gi="${gi}" data-oi="${oi}" aria-label="מחיקת יעד">✕</button>
          </div>
          <div class="grid">
            <label class="field wide">יעד עפ"י יכולת התפקוד הנוכחית (אקדמי – תפקודי)<textarea dir="auto" data-path="goals.${gi}.objectives.${oi}.text">${esc(o.text)}</textarea></label>
            <label class="field">פרק זמן להשגה<input type="text" dir="auto" data-path="goals.${gi}.objectives.${oi}.period" value="${esc(o.period)}">
              ${chips('set', `data-path="goals.${gi}.objectives.${oi}.period"`, PERIODS)}</label>
            <label class="field">אמות מידה להצלחה<input type="text" dir="auto" data-path="goals.${gi}.objectives.${oi}.criterion" value="${esc(o.criterion)}">
              ${chips('append', `data-path="goals.${gi}.objectives.${oi}.criterion"`, CRITERIA)}</label>
            <label class="field wide">דרכי הוראה, שיטות ואמצעים<input type="text" dir="auto" data-path="goals.${gi}.objectives.${oi}.methods" value="${esc(o.methods)}">
              ${chips('append', `data-path="goals.${gi}.objectives.${oi}.methods"`, METHODS[o.area] || METHODS[g.domain] || METHODS.other)}</label>
            <label class="field wide">גורמים מטפלים שותפים לתוכנית<input type="text" dir="auto" data-path="goals.${gi}.objectives.${oi}.partners" value="${esc(o.partners)}">
              ${chips('append', `data-path="goals.${gi}.objectives.${oi}.partners"`, partnerChips)}</label>
            <label class="field wide">הערכה והערות מעקב<textarea dir="auto" data-path="goals.${gi}.objectives.${oi}.notes">${esc(o.notes)}</textarea></label>
          </div>
        </div>`).join('')}
      <div style="margin-top:10px">
        <button class="btn ghost" data-act="add-obj" data-gi="${gi}">+ יעד ריק</button>
        ${bank.length ? `<details class="bank">
          <summary>מאגר המטרות לתחום (${bank.length}) – לחיצה מוסיפה יעד${s.readingLevel && g.domain === 'arabic' ? ` · מסומנות המתאימות לרמה (${s.readingLevel})` : ''}</summary>
          ${g.domain === 'arabic' ? `<div class="cur-note" dir="rtl">مرتبة حسب مجالات ${esc(CURRICULUM.title)}${s.grade ? ' · ' + curriculumStage(s.grade) : ''}</div>` : ''}
          ${areas.map(area => `<div class="bank-area"><div class="bank-title">${esc(g.domain === 'arabic' ? 'مجال ' + area : area)}</div>
            <div class="suggest">${bank.filter(b => b.area === area).map(b => `<button type="button" dir="rtl"
              class="${used.has(b.ref) ? 'used' : ''} ${s.readingLevel && b.level?.includes(s.readingLevel) ? 'fit' : ''}"
              data-act="add-bank" data-gi="${gi}" data-ref="${b.ref}" ${used.has(b.ref) ? 'disabled' : ''}>${esc(fillBlanks(b.text, s))}</button>`).join('')}</div></div>`).join('')}
        </details>` : ''}
      </div>
      <label class="field wide" style="margin-top:12px">התאמות: דרכי הוראה למידה, התאמות דרכי הבחנות
        <textarea dir="auto" data-path="goals.${gi}.accommodations">${esc(g.accommodations)}</textarea></label>
    </div>`;
  }).join('')}
  <datalist id="teamNames">${s.team.filter(m => m.name).map(m => `<option value="${esc(m.name)}">`).join('')}</datalist>
  <div class="card">
    <div class="row">
      <select id="newDomain" style="width:auto;flex:1">${DOMAINS.map(d => `<option value="${d.id}">${d.label}</option>`).join('')}</select>
      <button class="btn primary" data-act="add-goal">+ הוספת תחום לתוכנית</button>
    </div>
  </div>
  <div class="card"><h2>המלצות להורים</h2>
    ${field('parentRecs', 'ההמלצות (אחת בכל שורה)', 'textarea', 'wide')}
    ${Object.entries(PARENT_RECS).map(([area, recs]) => `<div class="bank-title" style="margin-top:8px">${area}</div>
      ${chips('append', 'data-path="parentRecs" data-sep="nl"', recs)}`).join('')}
  </div>`;
}

function tabTracking(s) {
  const objs = allObjectives(s);
  const dl = parentsDeadline(s);
  return `
  <div class="card"><h2>שלבי בניית התל"א</h2>
    ${PLAN_STEPS.map(([k, l]) => `<label class="check step"><input type="checkbox" data-path="steps.${k}" ${s.steps[k] ? 'checked' : ''}> ${l}</label>`).join('')}
    ${dl ? `<p class="muted" style="font-size:.9rem">לפי חוק החינוך המיוחד יש להציג את התל"א להורים עד ${dl.toLocaleDateString('he-IL')}.</p>` : ''}
  </div>
  <div class="card"><h2>הערכה מעצבת ומסכמת</h2>
    <div class="grid">${field('evalDates.mid', 'תאריך הערכה מעצבת', 'date')}${field('evalDates.final', 'תאריך הערכה מסכמת', 'date')}</div>
    ${s.goals.map((g, gi) => g.objectives.length ? `<h3 style="margin-top:14px">מטרה ${gi + 1} – ${esc(domainLabel(g.domain))}</h3>
      ${g.objectives.map((o, oi) => `<div class="objective">
        <div dir="auto"><b>${gi + 1}.${oi + 1}</b> ${esc(o.text)}</div>
        <div class="grid" style="margin-top:6px">
          <label class="field">הערכה מעצבת<textarea dir="auto" data-path="goals.${gi}.objectives.${oi}.midEval">${esc(o.midEval)}</textarea></label>
          <label class="field">הערכה מסכמת<textarea dir="auto" data-path="goals.${gi}.objectives.${oi}.finalEval">${esc(o.finalEval)}</textarea></label>
        </div></div>`).join('')}` : '').join('') || '<p class="muted">אין עדיין יעדים.</p>'}
  </div>
  <div class="card"><h2>תמונת התקדמות</h2>
    ${objs.length ? `${progressBar(s)}
      <div class="row" style="margin-top:10px">${STATUSES.map(st => `<span class="status ${st.cls}">${st.label}: ${objs.filter(o => (o.status || 'todo') === st.v).length}</span>`).join('')}</div>
      <table class="table" style="margin-top:12px">
        <tr><th>תחום</th><th>יעד</th><th>סטטוס</th></tr>
        ${s.goals.map((g, gi) => g.objectives.map((o, oi) => `<tr><td>${esc(domainLabel(g.domain))}</td><td dir="auto">${gi + 1}.${oi + 1} ${esc(o.text)}</td>
          <td><select class="status ${statusOf(o.status).cls}" data-path="goals.${gi}.objectives.${oi}.status" data-status>
            ${STATUSES.map(st => `<option value="${st.v}" ${st.v === (o.status || 'todo') ? 'selected' : ''}>${st.label}</option>`).join('')}
          </select></td></tr>`).join('')).join('')}
      </table>` : '<p class="muted">אין עדיין יעדים למעקב.</p>'}
  </div>
  <div class="card"><h2>פגישות צוות והורים</h2>
    ${s.meetings.map((m, i) => `<div class="objective">
      <div class="grid">
        <label class="field">תאריך<input type="date" data-path="meetings.${i}.date" value="${esc(m.date)}"></label>
        <label class="field">סוג הפגישה<input type="text" list="meetingTypes" data-path="meetings.${i}.type" value="${esc(m.type)}"></label>
        <label class="field wide">משתתפים<input type="text" data-path="meetings.${i}.participants" value="${esc(m.participants)}"></label>
        <label class="field wide">סיכום והחלטות<textarea dir="auto" data-path="meetings.${i}.summary">${esc(m.summary)}</textarea></label>
      </div>
      <div class="row" style="margin-top:6px"><span class="spacer"></span><button class="btn small danger" data-act="del-meeting" data-i="${i}">מחיקת פגישה</button></div>
    </div>`).join('')}
    <datalist id="meetingTypes"><option value="ישיבת צוות רב-מקצועי"><option value="הצגת התל&quot;א להורים"><option value="הערכה מעצבת"><option value="הערכה מסכמת"><option value="פגישת משוב סוף שנה"></datalist>
    <button class="btn ghost" data-act="add-meeting" style="margin-top:8px">+ תיעוד פגישה</button>
  </div>
  <div class="card"><h2>דו"ח סיכום והמלצות להמשך</h2>
    ${field('summary', 'תיאור התהליך שעבר התלמיד/ה, הישגים והמלצות להמשך טיפול', 'textarea', 'wide')}
  </div>`;
}

function tabDoc(s) {
  const fmt = view.format || 'matya';
  return `
  <div class="card row no-print">
    <b>פורמט:</b>
    <button class="btn small ${fmt === 'matya' ? 'primary' : ''}" data-act="format" data-v="matya">פורמט תל"א (מת"יא)</button>
    <button class="btn small ${fmt === 'school' ? 'primary' : ''}" data-act="format" data-v="school">תבנית בית הספר (תח"י)</button>
    <span class="spacer"></span>
    <button class="btn primary" data-act="excel">⬇️ הורדה כקובץ Excel</button>
    <button class="btn" data-act="print">🖨️ הדפסה / PDF</button>
  </div>
  ${fmt === 'matya' ? docMatya(s) : docSchool(s)}`;
}

// Rows of the plan in the Matya format, shared by the printed page and the Excel file.
function matyaData(s) {
  const info = [
    ['שם התלמיד/ה', fullName(s), 'תעודת זהות', s.idNumber],
    ['תאריך לידה', fmtDate(s.birthDate), 'כיתה', [gradeName(s), s.className].filter(Boolean).join(' · ')],
    ['בית ספר', s.school, 'שנת הלימודים', s.year],
    ['מחנכת הכיתה', s.homeroomTeacher, 'סייעת', s.aide],
  ];
  const goalTitle = (g, gi) => `מטרה ${gi + 1} – ${domainLabel(g.domain)}: ${g.annual}`;
  const evalHead = (label, date) => `${label} (תאריך: ${date ? fmtDate(date) : '      '})`;
  const goalHead = ['יעד', 'פרק זמן להשגת היעד', 'דרכים ואמצעים (יפורט עם צוות ההוראה והטיפול)', 'אמות מידה להערכה',
    evalHead('הערכה מעצבת', s.evalDates.mid), evalHead('הערכה מסכמת', s.evalDates.final)];
  const goalRow = o => [o.text, o.period, [o.methods, o.partners && `(${o.partners})`].filter(Boolean).join('\n'), o.criterion, o.midEval, o.finalEval];
  return { info, goalTitle, goalHead, goalRow };
}

function docMatya(s) {
  const { info, goalTitle, goalHead, goalRow } = matyaData(s);
  return `<div class="doc matya">
    <h1 class="u">תל"א – תוכנית לימודים אישית</h1>
    <table class="kv">${info.map(r => `<tr><td>${r[0]}</td><td>${esc(r[1])}</td><td>${r[2]}</td><td>${esc(r[3])}</td></tr>`).join('')}</table>
    <h3 class="u">הצוות הרב-מקצועי המשתתף בהכנת התוכנית ובביצועה:</h3>
    <table><tr><th>שם</th><th>תפקיד</th></tr>${(s.team.length ? s.team : [{}, {}, {}]).map(m => `<tr><td>${esc(m.name)}</td><td>${esc(m.role)}</td></tr>`).join('')}</table>
    <h3 class="u">תמיכות שהתלמיד/ה מקבל/ת:</h3>
    <table><tr><th>סוג התמיכה</th><th>מספר השעות</th><th>שם המורה/מטפל</th></tr>${(s.supports.length ? s.supports : [{}, {}, {}]).map(m => `<tr><td>${esc(m.type)}</td><td>${esc(m.hours)}</td><td>${esc(m.teacher)}</td></tr>`).join('')}</table>

    <div class="page-break"></div>
    <h1 class="u">פרופיל תלמיד – תיאור רמת התפקוד</h1>
    <table class="profile"><tr><th style="width:30%"></th><th>מוקדי כוח – תחומים בהם התלמיד מגלה יכולת וכישורים</th><th>מוקדים לחיזוק</th></tr>
      ${PROFILE_ROWS.map(r => `<tr><td class="ptitle"><b>${r.title}</b><div>${r.desc}</div></td><td class="pre" dir="auto">${esc(s.profile[r.id]?.strengths)}</td><td class="pre" dir="auto">${esc(s.profile[r.id]?.focus)}</td></tr>`).join('')}
    </table>
    <h3 class="u">ייצוג וסינגור עצמי – מטרות מפי התלמיד:</h3>
    <div class="pre line" dir="auto">${esc(s.studentView) || '&nbsp;'}</div>

    ${s.goals.map((g, gi) => `<div class="page-break"></div>
      <h2 class="center u plain">תכנית לימודים אישית (תל"א)</h2>
      <div class="banner" dir="auto">${esc(goalTitle(g, gi))}</div>
      <table class="goals6"><tr>${goalHead.map(h => `<th>${esc(h)}</th>`).join('')}</tr>
        ${g.objectives.map(o => `<tr>${goalRow(o).map(v => `<td class="pre" dir="auto">${esc(v)}</td>`).join('')}</tr>`).join('')}
      </table>`).join('')}
    ${tailPages(s)}
  </div>`;
}

function interimPage(s) {
  const secs = INTERIM.map(sec => [sec, sec.items.filter(([id]) => rating(s, id))]).filter(([, items]) => items.length);
  if (!secs.length) return '';
  const levels = [5, 4, 3, 2, 1];
  return `<div class="page-break"></div><div dir="rtl">
    <h1>تقييم مرحلي – اللغة العربية</h1><div class="sub">مجموعة الدعم</div>
    <table class="kv"><tr><td>اسم التلميذ\\ة</td><td>${esc(fullName(s))}</td><td>رقم الهوية</td><td>${esc(s.idNumber)}</td></tr>
      <tr><td>الصّف</td><td>${esc([ARABIC_GRADES[+s.grade], s.className].filter(Boolean).join(' '))}</td><td>التّاريخ</td><td></td></tr></table>
    <table class="interim"><tr><th></th><th>المهارة</th>${levels.map(n => `<th class="c">${INTERIM_SCALE[n]}</th>`).join('')}</tr>
      ${secs.map(([sec, items]) => items.map(([id, label], k) => `<tr>${k ? '' : `<td rowspan="${items.length}" class="ptitle"><b>${esc(sec.sec.replace('التقييم المرحلي – ', ''))}</b></td>`}
        <td>${esc(label)}</td>${levels.map(n => `<td class="c">${rating(s, id) === n ? '✓' : ''}</td>`).join('')}</tr>`).join('')).join('')}
    </table>
    ${s.mapNotes.arabic ? `<table class="kv"><tr><td>ملاحظات</td><td class="pre">${esc(s.mapNotes.arabic)}</td></tr></table>` : ''}
    <div class="sign four"><div>مديرة المدرسة</div><div>مربية الصف</div><div>معلمة الدعم</div><div>توقيع ولي امر التلميذ/ة</div></div>
  </div>`;
}

function tailPages(s) {
  const services = s.team.filter(m => m.name && m.role && !/הורה|מחנך|מנהל/.test(m.role));
  return `${interimPage(s)}${s.parentRecs.trim() ? `<div class="page-break"></div><h1>המלצות להורים</h1><div class="sub">${esc(fullName(s))}</div>
      <ul class="recs" dir="auto">${s.parentRecs.split('\n').filter(x => x.trim()).map(x => `<li>${esc(x)}</li>`).join('')}</ul>` : ''}
    ${s.goals.length ? `<div class="page-break"></div><h1>אישור הורים</h1>
      <p class="consent">אנו, ההורים של <b>${esc(fullName(s))}</b>, מאשרים בזאת שקיבלנו מידע על תפקודו/ה בבית הספר והסבר על תכנית הלימודים האישית (תל"א) המתוכננת לשנת הלימודים <bdi dir="ltr">${esc(s.year)}</bdi>.</p>
      ${services.length ? `<p class="consent">ידוע לנו ש${esc(s.firstName || 'בננו/בתנו')} יקבל/תקבל עזרה מקצועית בתחומים הבאים:</p>
        <ul class="recs">${services.map(m => `<li>${esc(m.role)} – ${esc(m.name)}</li>`).join('')}</ul>` : ''}
      <table class="kv consent-table"><tr><td>שמות ההורים</td><td></td></tr><tr><td>תאריך</td><td></td></tr><tr><td>חתימת ההורים</td><td></td></tr></table>` : ''}`;
}

function exportExcel(s) {
  const { info, goalTitle, goalHead, goalRow } = matyaData(s);
  const C = (v, st = 'cell') => ({ v: v ?? '', s: st });
  const sheets = [];

  // 1. Details, team, supports
  const rows = [[C('תל"א – תוכנית לימודים אישית', 'title')], []];
  const merges = ['A1:D1'];
  for (const r of info) rows.push([C(r[0], 'label'), C(r[1]), C(r[2], 'label'), C(r[3])]);
  rows.push([], [C('הצוות הרב-מקצועי המשתתף בהכנת התוכנית ובביצועה:', 'sub')]);
  merges.push(`A${rows.length}:D${rows.length}`);
  rows.push([C('שם', 'head'), C('', 'head'), C('תפקיד', 'head'), C('', 'head')]);
  merges.push(`A${rows.length}:B${rows.length}`, `C${rows.length}:D${rows.length}`);
  for (const m of (s.team.length ? s.team : [{}, {}, {}])) {
    rows.push([C(m.name), C(''), C(m.role), C('')]);
    merges.push(`A${rows.length}:B${rows.length}`, `C${rows.length}:D${rows.length}`);
  }
  rows.push([], [C('תמיכות שהתלמיד/ה מקבל/ת:', 'sub')]);
  merges.push(`A${rows.length}:D${rows.length}`);
  rows.push([C('סוג התמיכה', 'head'), C('מספר השעות', 'head'), C('שם המורה/מטפל', 'head'), C('', 'head')]);
  merges.push(`C${rows.length}:D${rows.length}`);
  for (const m of (s.supports.length ? s.supports : [{}, {}, {}])) {
    rows.push([C(m.type), C(m.hours), C(m.teacher), C('')]);
    merges.push(`C${rows.length}:D${rows.length}`);
  }
  sheets.push({ name: 'פרטים', cols: [22, 28, 22, 28], rows, merges });

  // 2. Profile
  const prof = [[C('פרופיל תלמיד – תיאור רמת התפקוד', 'title')], [],
    [C('', 'head'), C('מוקדי כוח – תחומים בהם התלמיד מגלה יכולת וכישורים', 'head'), C('מוקדים לחיזוק', 'head')]];
  for (const r of PROFILE_ROWS) prof.push([C(`${r.title}\n${r.desc}`, 'label'), C(s.profile[r.id]?.strengths), C(s.profile[r.id]?.focus)]);
  prof.push([], [C('ייצוג וסינגור עצמי – מטרות מפי התלמיד:', 'sub')], [C(s.studentView, 'wrap')]);
  sheets.push({ name: 'פרופיל', cols: [30, 50, 50], rows: prof, merges: ['A1:C1', `A${prof.length - 1}:C${prof.length - 1}`, `A${prof.length}:C${prof.length}`] });

  // 3. One sheet per goal, as in the format
  s.goals.forEach((g, gi) => {
    const r = [[C('תכנית לימודים אישית (תל"א)', 'title')], [], [C(goalTitle(g, gi), 'banner'), C('', 'banner'), C('', 'banner'), C('', 'banner'), C('', 'banner'), C('', 'banner')], [],
      goalHead.map(h => C(h, 'head'))];
    for (const o of g.objectives) r.push(goalRow(o).map(v => C(v)));
    if (!g.objectives.length) r.push(goalHead.map(() => C('')));
    sheets.push({ name: `מטרה ${gi + 1} - ${domainLabel(g.domain)}`, landscape: true, cols: [38, 16, 34, 22, 24, 24], rows: r, merges: ['A1:F1', 'A3:F3'] });
  });

  // 4. Interim assessment form (תקييم مرحلي), filled from the ratings
  const interimRows = INTERIM.map(sec => [sec, sec.items.filter(([id]) => rating(s, id))]).filter(([, items]) => items.length);
  if (interimRows.length) {
    const levels = [5, 4, 3, 2, 1];
    const ir = [[C('تقييم مرحلي – اللغة العربية', 'title')], [C('مجموعة الدعم', 'center')], [],
      [C('اسم التلميذ\\ة:', 'label'), C(fullName(s)), C('رقم الهوية:', 'label'), C(s.idNumber), C('الصّف:', 'label'), C([ARABIC_GRADES[+s.grade], s.className].filter(Boolean).join(' ')), C('التّاريخ:', 'label')],
      [], [C('', 'head'), C('المهارة', 'head'), ...levels.map(n => C(INTERIM_SCALE[n], 'head'))]];
    const im = ['A1:G1', 'A2:G2'];
    for (const [sec, items] of interimRows) {
      const start = ir.length + 1;
      items.forEach(([id, label], k) => ir.push([C(k ? '' : sec.sec.replace('التقييم المرحلي – ', ''), 'label'), C(label), ...levels.map(n => C(rating(s, id) === n ? '✓' : '', 'center'))]));
      if (items.length > 1) im.push(`A${start}:A${ir.length}`);
    }
    ir.push([], [C('ملاحظات:', 'label'), C(s.mapNotes.arabic || ''), C(''), C(''), C(''), C(''), C('')]); im.push(`B${ir.length}:G${ir.length}`);
    ir.push([], [C('مديرة المدرسة', 'center'), C(''), C('مربية الصف', 'center'), C(''), C('معلمة الدعم', 'center'), C(''), C('توقيع ولي امر التلميذ/ة', 'center')]);
    sheets.push({ name: 'تقييم مرحلي', cols: [16, 46, 11, 11, 11, 11, 13], rows: ir, merges: im });
  }

  // 5. Mapping (the data the plan was built from)
  const map = [[C('מיפוי והערכה', 'title')], [C(`סולם: ${SCALE.map(([n, l]) => `${n} – ${l}`).join(' · ')}`, 'wrap')], []];
  const mm = ['A1:D1', 'A2:D2'];
  for (const grp of MAP_GROUPS) {
    const items = grp.sections.flatMap(x => x.items).filter(i => rating(s, i.id));
    if (!items.length && !s.mapNotes[grp.id]) continue;
    map.push([C(grp.title, 'banner'), C('', 'banner'), C('', 'banner'), C('', 'banner')]); mm.push(`A${map.length}:D${map.length}`);
    if (s.mapNotes[grp.id]) { map.push([C('נתונים והערות', 'label'), C(s.mapNotes[grp.id]), C(''), C('')]); mm.push(`B${map.length}:D${map.length}`); }
    if (items.length) {
      map.push([C('המיומנות', 'head'), C('הערכה (1–5)', 'head'), C('הערה', 'head'), C('', 'head')]); mm.push(`C${map.length}:D${map.length}`);
      for (const i of items) { map.push([C(i.label), C(rating(s, i.id), 'center'), C(s.ratings[i.id]?.note), C('')]); mm.push(`C${map.length}:D${map.length}`); }
    }
    map.push([]);
  }
  if (map.length > 3) sheets.push({ name: 'מיפוי', cols: [50, 12, 30, 20], rows: map, merges: mm });

  // 5. Recommendations to parents
  if (s.parentRecs.trim()) {
    const rec = [[C('המלצות להורים', 'title')], [], ...s.parentRecs.split('\n').filter(x => x.trim()).map(x => [C('• ' + x.trim(), 'wrap')])];
    sheets.push({ name: 'המלצות להורים', cols: [100], rows: rec });
  }

  const blob = XLSX.build(sheets);
  const a = document.createElement('a');
  a.href = URL.createObjectURL(blob);
  a.download = `תלא - ${fullName(s)}.xlsx`.replace(/[\\/:*?"<>|]/g, '_');
  a.click();
  setTimeout(() => URL.revokeObjectURL(a.href), 1000);
  toast('קובץ ה-Excel ירד');
}

function docSchool(s) {
  const kv = (k, v) => v ? `<tr><td>${k}</td><td class="pre" dir="auto">${esc(v)}</td></tr>` : '';
  const support = SUPPORT_WHEN.map(w => [w, SUPPORT_TYPES.filter(t => s.support[`${w}|${t}`])]).filter(([, l]) => l.length);
  const diag = DIAGNOSES.filter(d => s.diagnoses[d]);
  const acc = ACCOMMODATIONS.filter(a => s.accommodations[a]);
  const mapping = MAP_GROUPS.map(grp => {
    const rows = grp.sections.flatMap(x => x.items).filter(i => rating(s, i.id));
    const notes = s.mapNotes[grp.id];
    if (!rows.length && !notes) return '';
    return `<h2>${grp.title}</h2>
      ${notes ? `<table class="kv">${kv('נתונים והערות', notes)}</table>` : ''}
      ${rows.length ? `<table><tr><th>המיומנות</th><th class="c">הערכה</th><th>הערה</th></tr>
        ${rows.map(i => `<tr><td dir="auto">${esc(i.label)}</td><td class="c r${rating(s, i.id)}">${rating(s, i.id)}</td><td dir="auto">${esc(s.ratings[i.id]?.note)}</td></tr>`).join('')}</table>` : ''}`;
  }).join('');
  const reading = s.readingLevel || s.readingBand || s.listeningBand || s.wpm;
  const head = g => `<table class="kv">
      <tr><td>שם התלמיד</td><td>${esc(fullName(s))}</td><td>שם מחנך\\ת כיתה</td><td>${esc(s.homeroomTeacher)}</td></tr>
      <tr><td>דרגת כיתה</td><td>${esc(gradeName(s) || s.className)}</td><td>שם מורה אחראית תחום</td><td>${esc(g.teacher)}</td></tr>
      <tr><td>שם בית הספר</td><td>${esc(s.school)}</td><td>תחום התפקוד</td><td><b>${esc(domainLabel(g.domain))}</b></td></tr>
      <tr><td>תאריך מילוי התוכנית</td><td colspan="3">${fmtDate(s.fillDate)}</td></tr>
    </table>`;

  return `
  <div class="doc">
    <h1>פרופיל תלמיד – פרטים ורקע</h1>
    <div class="sub">שנת הלימודים <bdi dir="ltr">${esc(s.year)}</bdi></div>
    <table class="kv">
      ${kv('שם התלמיד/ה', fullName(s))}${kv('ז/נ', s.gender)}${kv('ת.ז.', s.idNumber)}${kv('תאריך לידה', fmtDate(s.birthDate))}
      ${kv('בית הספר', s.school)}${kv('ישוב', s.city)}${kv('כיתה', [gradeName(s), s.className].filter(Boolean).join(' · '))}
      ${kv('שם המחנכת', s.homeroomTeacher)}${kv('שם מורת השילוב', s.inclusionTeacher)}
      ${kv('ועדה', [s.committee, fmtDate(s.committeeDate)].filter(Boolean).join(' · '))}${kv('קשר עם הורים', s.parentsContact)}
      ${kv('מצב משפחתי', s.familyStatus)}${kv('מיקום במשפחה', s.familyPosition)}${kv('מצב בריאותי / תרופות', s.health)}
      ${kv('מוסדות חינוכיים קודמים', s.previousSchools)}
    </table>
    ${support.length ? `<h2>סוגי תמיכה וטיפול שקיבל</h2><table class="kv">${support.map(([w, l]) => kv(w, l.join(', '))).join('')}</table>` : ''}
    ${diag.length ? `<h2>אבחונים</h2><table class="kv">${diag.map(d => kv(d, fmtDate(s.diagnoses[d]))).join('')}</table>` : ''}
    ${[s.background, s.strengths, s.difficulties, s.motivators, s.parentsView, s.studentView].some(Boolean) ? `<h2>רקע ותיאור כללי</h2><table class="kv">
      ${kv('רקע', s.background)}${kv('תחומי חוזק', s.strengths)}${kv('תחומי קושי', s.difficulties)}${kv('תחומי עניין ומחזקים', s.motivators)}
      ${kv('עמדת ההורים', s.parentsView)}${kv('עמדת התלמיד/ה', s.studentView)}</table>` : ''}
    ${acc.length || s.accommodationsOther ? `<h2>התאמות בהמלצת בית הספר</h2><table class="kv">${kv('התאמות', acc.join(' · '))}${kv('אחר', s.accommodationsOther)}</table>` : ''}

    ${mapping || reading ? `<div class="page-break"></div><h1>מיפוי והערכה</h1>
      <div class="sub">${esc(fullName(s))} · סולם: ${SCALE.map(([n, l]) => `${n} – ${l}`).join(' · ')}</div>
      ${reading ? `<table class="kv">
        ${kv('רמת קריאה (أدوات التقييم)', s.readingLevel ? READING_LEVELS[s.readingLevel].title : '')}
        ${kv('רמת קריאות', s.readingBand)}${kv('הבנת הנשמע', s.listeningBand)}${kv('سرعة القراءة', s.wpm ? `${s.wpm} كلمة في الدقيقة` : '')}</table>` : ''}
      ${mapping}` : ''}

    ${s.goals.map(g => `
      <div class="page-break"></div>
      <h1>תוכנית עבודה שנתית לתלמיד תח"י – תל"א</h1>
      <div class="sub">תוכנית חינוכית יחידנית · תוכנית לימודים אישית</div>
      ${head(g)}
      ${g.domain === 'arabic' ? `<table class="kv">${kv('תוכנית הלימודים', CURRICULUM.title + (s.grade ? '\n' + curriculumStage(s.grade) : ''))}</table>` : ''}
      <table class="kv">${kv('מטרה\\ות שנתית\\ות', g.annual)}${kv('יכולת התפקוד הנוכחית', g.current)}${kv('תחומי חוזק', g.strengths)}${kv('תחומי קושי', g.difficulties)}</table>
      <table>
        <tr><th>יעדים עפ"י יכולת התפקוד הנוכחית של התלמיד אקדמי – תפקודי</th><th style="width:14%">פרק זמן להשגה</th>
          <th style="width:28%">אמות מידה להצלחה, דרכי הוראה שיטות ואמצעים</th><th style="width:16%">גורמים מטפלים שותפים לתוכנית</th></tr>
        ${g.objectives.map(o => `<tr><td class="pre" dir="auto">${esc(o.text)}${o.curriculum ? `<div class="eval">مجال المنهاج: ${esc(o.curriculum)}</div>` : ''}${o.status && o.status !== 'todo' ? `<div class="eval">הערכה: ${statusOf(o.status).label}${o.notes ? ' – ' + esc(o.notes) : ''}</div>` : ''}</td>
          <td dir="auto">${esc(o.period)}</td>
          <td dir="auto">${o.criterion ? `<b>${esc(o.criterion)}</b><br>` : ''}${esc(o.methods)}</td>
          <td dir="auto">${esc(o.partners)}</td></tr>`).join('')}
      </table>
      <table class="kv">${kv('התאמות: דרכי הוראה למידה, התאמות דרכי הבחנות', [g.accommodations, acc.join(' · ')].filter(Boolean).join('\n'))}</table>
      <div class="sign two"><div>חתימת מורה מחנכת · תאריך</div><div>חתימת מורה אחראית תחום · תאריך</div></div>`).join('')}

    ${s.meetings.length || s.summary ? `<div class="page-break"></div>` : ''}
    ${s.meetings.length ? `<h2>פגישות</h2><table><tr><th style="width:14%">תאריך</th><th style="width:18%">סוג</th><th>משתתפים</th><th>סיכום</th></tr>
      ${s.meetings.map(m => `<tr><td>${fmtDate(m.date)}</td><td>${esc(m.type)}</td><td>${esc(m.participants)}</td><td class="pre" dir="auto">${esc(m.summary)}</td></tr>`).join('')}</table>` : ''}
    ${s.summary ? `<h2>דו"ח סיכום והמלצות</h2><table class="kv">${kv('סיכום', s.summary)}</table>` : ''}

    ${tailPages(s)}
  </div>`;
}

// ---------- ✨ AI writing helper ----------
const AI_ACTIONS = [
  ['improve', 'שיפור ניסוח'], ['expand', 'הרחבה'], ['shorten', 'קיצור'],
  ['measurable', 'ניסוח כיעד מדיד'], ['to_ar', 'תרגום לערבית'], ['to_he', 'תרגום לעברית'],
];
const AI_SKIP = /^(firstName|lastName|idNumber|birthDate|school|city|className|homeroomTeacher|inclusionTeacher|aide|parentsContact|familyPosition|year|fillDate|committeeDate|wpm|team\.|supports\.|meetings\.\d+\.(date|type|participants)|diagnoses\.|evalDates\.)/;

// Adds a ✨ button to every writing field of the current screen.
function decorateAI() {
  if (!Cloud.user || !['student'].includes(view.name)) return;
  app.querySelectorAll('textarea[data-path], input[type=text][data-path]').forEach(el => {
    if (AI_SKIP.test(el.dataset.path) || el.parentElement.classList.contains('ai-wrap')) return;
    const wrap = document.createElement('span');
    wrap.className = 'ai-wrap' + (el.tagName === 'TEXTAREA' ? ' ta' : '');
    el.replaceWith(wrap);
    wrap.append(el);
    const b = document.createElement('button');
    b.type = 'button'; b.className = 'ai-btn'; b.dataset.path = el.dataset.path;
    wrap.append(b);
    updateAIIcon(el);
  });
}

// Empty field: ✨ opens the menu (draft). Field with text: 💎 improves the text in one click.
function updateAIIcon(el) {
  const b = el.parentElement?.classList.contains('ai-wrap') && el.parentElement.querySelector('.ai-btn');
  if (!b) return;
  const has = !!el.value.trim();
  b.textContent = has ? '💎' : '✨';
  b.title = has ? 'שיפור הטקסט (לחיצה)' : 'עזרה בכתיבה';
  b.dataset.act = has ? 'ai-improve' : 'ai-menu';
}

function aiContext(path) {
  const s = current();
  const lines = [];
  if (s.grade) lines.push(`דרגת כיתה: ${gradeName(s)}`);
  if (s.readingLevel) lines.push(READING_LEVELS[s.readingLevel].title);
  const m = /^goals\.(\d+)(?:\.objectives\.(\d+))?/.exec(path);
  if (m) {
    const g = s.goals[+m[1]];
    lines.push(`תחום: ${domainLabel(g.domain)}`);
    if (g.annual) lines.push(`מטרה שנתית: ${g.annual}`);
    if (g.current) lines.push(`יכולת תפקוד נוכחית: ${g.current}`);
    if (g.difficulties) lines.push(`תחומי קושי: ${g.difficulties}`);
    if (m[2] != null) {
      const o = g.objectives[+m[2]];
      if (o.text && !path.endsWith('.text')) lines.push(`היעד: ${o.text}`);
      if (o.criterion && !path.endsWith('.criterion')) lines.push(`אמת מידה: ${o.criterion}`);
    }
  } else {
    if (s.strengths) lines.push(`תחומי חוזק: ${s.strengths}`);
    if (s.difficulties) lines.push(`תחומי קושי: ${s.difficulties}`);
  }
  return lines.join('\n');
}

function closeAI() { document.querySelector('.ai-pop')?.remove(); }

async function quickImprove(btn) {
  closeAI();
  const el = btn.parentElement.querySelector('[data-path]');
  const before = el.value;
  const pop = document.createElement('div');
  pop.className = 'ai-pop';
  pop.innerHTML = '<div class="ai-head">💎 משפר…</div><div class="ai-wait"></div>';
  btn.parentElement.append(pop);
  btn.classList.add('busy');
  try {
    const text = await Cloud.ai({ action: 'improve', text: before, field: aiLabel(el), context: aiContext(el.dataset.path) });
    if (el.value !== before) { closeAI(); return; } // the teacher kept typing meanwhile
    el.value = text;
    el.dispatchEvent(new Event('input', { bubbles: true }));
    pop.innerHTML = `<div class="ai-head">💎 הטקסט שופר</div>
      <div class="row"><button type="button" class="btn small" data-ai-do="undo">ביטול השינוי</button>
      <button type="button" class="btn small" data-ai-do="more">אפשרויות נוספות</button>
      <button type="button" class="btn small primary" data-ai-do="ok">אישור</button></div>`;
    pop.onclick = e => {
      const d = e.target.closest('[data-ai-do]')?.dataset.aiDo;
      if (!d) return;
      e.stopPropagation();
      if (d === 'undo') { el.value = before; el.dispatchEvent(new Event('input', { bubbles: true })); }
      if (d === 'more') { openAIMenu(btn); return; }
      closeAI();
    };
    clearTimeout(pop.timer);
    pop.timer = setTimeout(() => { if (pop.isConnected && !pop.matches(':hover')) pop.remove(); }, 8000);
  } catch (err) {
    showAIError(pop, err.message);
  } finally { btn.classList.remove('busy'); }
}

function aiLabel(el) {
  return el.closest('label')?.firstChild?.textContent?.trim() || el.closest('tr')?.querySelector('td')?.textContent?.trim() || '';
}
function showAIError(pop, m) {
  pop.innerHTML = `<div class="ai-head">✨</div><p class="ai-err">${{
    'not-deployed': 'עוזר הכתיבה עוד לא הופעל בשרת.', 'not-signed-in': 'צריך להיכנס מחדש לחשבון.',
    'api-key': 'מפתח ה-AI בשרת חסר או שגוי.', busy: 'העוזר עמוס כרגע. נסי שוב בעוד דקה.',
    refusal: 'העוזר לא יכול לעזור עם הטקסט הזה.', empty: 'אין טקסט לעבוד עליו.',
    'not-found': `השרת לא מצא את הפונקציה "${esc(window.TALA_CONFIG?.aiFunction || 'tala-ai')}".`,
    'api-404': 'שם המודל של Gemini לא נמצא (api-404).', 'empty-result': 'העוזר החזיר תשובה ריקה. נסי שוב.',
  }[m] || 'משהו השתבש (' + esc(m) + ').'}</p><button type="button" class="btn small" data-ai-do="cancel">סגירה</button>`;
  pop.onclick = e => { if (e.target.closest('[data-ai-do]')) closeAI(); };
}

function openAIMenu(btn) {
  closeAI();
  const el = btn.parentElement.querySelector('[data-path]');
  const empty = !el.value.trim();
  const pop = document.createElement('div');
  pop.className = 'ai-pop';
  pop.innerHTML = `<div class="ai-head">✨ עזרה בכתיבה</div>
    ${empty ? '<button type="button" data-ai="draft">ניסוח טיוטה לשדה</button>'
      : AI_ACTIONS.map(([k, l]) => `<button type="button" data-ai="${k}">${l}</button>`).join('') + '<button type="button" data-ai="draft">ניסוח חדש לשדה</button>'}`;
  btn.parentElement.append(pop);
  pop.addEventListener('click', e => {
    const a = e.target.closest('[data-ai]');
    if (a) runAI(el, a.dataset.ai, pop);
  });
}

async function runAI(el, action, pop) {
  const label = aiLabel(el);
  pop.innerHTML = '<div class="ai-head">✨ כותב…</div><div class="ai-wait"></div>';
  try {
    const text = await Cloud.ai({ action, text: el.value, field: label, context: aiContext(el.dataset.path) });
    pop.innerHTML = `<div class="ai-head">✨ הצעה</div><div class="ai-result" dir="auto"></div>
      <div class="row"><button type="button" class="btn small primary" data-ai-do="replace">החלפה</button>
      ${el.value.trim() ? '<button type="button" class="btn small" data-ai-do="append">הוספה בסוף</button>' : ''}
      <button type="button" class="btn small" data-ai-do="cancel">ביטול</button></div>`;
    pop.querySelector('.ai-result').textContent = text;
    pop.onclick = e => {
      const d = e.target.closest('[data-ai-do]')?.dataset.aiDo;
      if (!d) return;
      e.stopPropagation();
      if (d !== 'cancel') {
        el.value = d === 'append' ? `${el.value.replace(/\s+$/, '')}\n${text}` : text;
        el.dispatchEvent(new Event('input', { bubbles: true }));
      }
      closeAI();
    };
  } catch (err) {
    showAIError(pop, err.message);
  }
}
document.addEventListener('click', e => {
  if (!e.target.closest('.ai-pop, .ai-btn')) closeAI();
}, true);

// ---------- events ----------
function touch(s) { s.updatedAt = Date.now(); save(); }

function onEdit(e) {
  const t = e.target;
  if (t.id === 'adminQ') {
    if (e.type !== 'input') return;
    view.adminQ = t.value; renderAdmin();
    const q = document.getElementById('adminQ'); q.focus(); q.setSelectionRange(q.value.length, q.value.length);
    return;
  }
  if (t.id === 'q') {
    if (e.type !== 'input') return;
    view.q = t.value; renderList();
    const q = document.getElementById('q'); q.focus(); q.setSelectionRange(q.value.length, q.value.length);
    return;
  }
  const path = t.dataset.path; const s = current();
  if (!path || !s) return;
  updateAIIcon(t);
  // Selects/checkboxes/radios commit on change; text fields on input.
  const isChoice = t.tagName === 'SELECT' || t.type === 'checkbox' || t.type === 'radio';
  if (isChoice !== (e.type === 'change')) return;
  setPath(s, path, t.type === 'checkbox' ? t.checked : t.value);
  if (t.hasAttribute('data-status')) t.className = 'status ' + statusOf(t.value).cls;
  if (t.type === 'radio' && path.startsWith('ratings.')) {
    const box = t.closest('.rate5'); box.querySelector('.clear').hidden = false;
    updateCounts(s);
  }
  if (path === 'firstName' || path === 'lastName') document.getElementById('title').textContent = fullName(s);
  touch(s);
  if (t.hasAttribute('data-rerender') || (path === 'grade' && view.tab === 'mapping')) rerender();
}
app.addEventListener('input', onEdit);
app.addEventListener('keydown', e => {
  if (e.key !== 'Enter' || !['login', 'newpw'].includes(view.name)) return;
  document.querySelector('[data-act="login-phone"],[data-act="register"],[data-act="forgot"],[data-act="save-password"]')?.click();
});
app.addEventListener('change', onEdit);
// Remember which mapping sections are open across re-renders.
app.addEventListener('toggle', e => {
  const key = e.target.dataset?.key;
  if (key) (view.openSec ??= {})[key] = e.target.open;
}, true);

function updateCounts(s) {
  document.querySelectorAll('.map-group').forEach((card, gi) => {
    const grp = MAP_GROUPS[gi];
    const items = grp.sections.flatMap(x => x.items);
    card.querySelector('h2 .count').textContent = `${items.filter(i => rating(s, i.id)).length}/${items.length}`;
    card.querySelectorAll('.map-sec').forEach((d, si) => {
      const sec = grp.sections[si];
      d.querySelector('summary .count').textContent = `${sec.items.filter(i => rating(s, i.id)).length}/${sec.items.length}`;
    });
  });
}

function rerender() { const y = scrollY; render(); scrollTo(0, y); }

document.addEventListener('click', e => {
  const t = e.target.closest('[data-act],[data-open],[data-tab]');
  if (!t || t.disabled) return;
  if (t.dataset.open) { view = { name: 'student', id: t.dataset.open, tab: 'details', q: view.q }; render(); scrollTo(0, 0); return; }
  if (t.dataset.tab) { view.tab = t.dataset.tab; render(); scrollTo(0, 0); return; }
  e.preventDefault();
  const s = current(); const d = t.dataset;
  const gi = +d.gi, oi = +d.oi;
  switch (d.act) {
    case 'account': view = { name: 'account' }; render(); return;
    case 'save-password': {
      const v = document.getElementById('newPw').value;
      if (!v) { alert('נא להקליד סיסמה חדשה'); return; }
      t.disabled = true;
      Cloud.changePassword(v).then(() => { toast('הסיסמה עודכנה'); Cloud.recoveryDone(); boot(); })
        .catch(err => { t.disabled = false; alert('לא ניתן לעדכן: ' + (err.message || err)); });
      return;
    }
    case 'forgot': {
      const v = document.getElementById('loginPhone').value.trim();
      if (!v) { alert('נא להקליד מספר טלפון או מייל'); return; }
      t.disabled = true;
      Cloud.forgotPassword(v).then(masked => { view.sentTo = masked; render(); }).catch(err => {
        t.disabled = false;
        const m = err.message || String(err);
        alert(m === 'bad-phone' ? 'מספר הטלפון לא תקין' : m === 'no-user' ? 'לא מצאנו מורה רשומה עם הפרטים האלה'
          : /rate limit/i.test(m) ? 'נשלחו יותר מדי מיילים. נסי שוב בעוד כמה דקות.' : 'שליחת המייל נכשלה: ' + m);
      });
      return;
    }
    case 'admin-reset': {
      const u = view.adminUsers.find(x => x.email === d.email);
      const name = u?.name || d.email;
      const temp = String(1000 + crypto.getRandomValues(new Uint32Array(1))[0] % 9000);
      if (!confirm(`לתת ל${name} סיסמה זמנית חדשה? הסיסמה הקודמת שלה תפסיק לעבוד.`)) return;
      Cloud.adminSetPassword(d.email, temp).then(ok => {
        if (!ok) { alert('המורה לא נמצאה'); return; }
        alert(`הסיסמה הזמנית של ${name} (${Cloud.showPhone(u?.phone) || d.email}):\n\n${temp}\n\nמסרי לה אותה. אחרי הכניסה היא יכולה להחליף סיסמה בכפתור 🔑.`);
      }).catch(err => alert('האיפוס נכשל: ' + (err.message || err)));
      return;
    }
    case 'login-phone': case 'register': {
      const reg = d.act === 'register';
      const phone = document.getElementById('loginPhone').value;
      const pw = document.getElementById('loginPassword').value;
      const name = reg ? document.getElementById('loginName').value.trim() : '';
      const email = reg ? document.getElementById('loginEmail').value.trim() : '';
      if (reg && !name) { alert('נא להקליד שם מלא'); return; }
      if (!phone.trim()) { alert('נא להקליד מספר טלפון'); return; }
      if (reg && !/^\S+@\S+\.\S+$/.test(email)) { alert('נא להקליד כתובת מייל תקינה (לשחזור סיסמה)'); return; }
      if (!pw) { alert('נא להקליד סיסמה'); return; }
      t.disabled = true;
      (reg ? Cloud.signUpPhone(phone, email, pw, name) : Cloud.signInPhone(phone, pw)).then(boot).catch(err => {
        t.disabled = false;
        const m = err.message || String(err);
        alert(m === 'bad-phone' ? 'מספר הטלפון לא תקין'
          : m === 'phone-taken' ? 'מספר הטלפון הזה כבר רשום. עברי ל"כניסה".'
          : m === 'no-user' ? 'מספר הטלפון לא רשום. בפעם הראשונה לחצי "הרשמה".'
          : /already registered|already exists/i.test(m) ? 'המייל הזה כבר רשום. עברי ל"כניסה".'
          : /invalid login/i.test(m) ? 'הסיסמה שגויה. אפשר ללחוץ "שכחתי סיסמה".'
          : m === 'confirm-required' ? 'ההרשמה נקלטה, אבל השרת מחכה לאישור מייל. המנהלת צריכה לכבות את "Confirm email" ב-Supabase.'
          : 'הפעולה נכשלה: ' + m);
      });
      return;
    }
    case 'ai-menu': openAIMenu(t); return;
    case 'ai-improve': if (!t.classList.contains('busy')) quickImprove(t); return;
    case 'login-mode': view.loginMode = d.v; view.sentTo = ''; render(); return;
    case 'login-password': {
      const email = document.getElementById('loginEmail').value.trim();
      const pw = document.getElementById('loginPassword').value;
      if (!email || !pw) { alert('נא להקליד מייל וסיסמה'); return; }
      t.disabled = true;
      Cloud.signInPassword(email, pw).then(boot).catch(err => {
        t.disabled = false;
        alert(/invalid/i.test(err.message || '') ? 'המייל או הסיסמה שגויים' : 'הכניסה נכשלה: ' + (err.message || err));
      });
      return;
    }
    case 'change-password': {
      const pw = prompt('סיסמה חדשה (לפחות 6 תווים):');
      if (!pw) return;
      if (pw.length < 6) { alert('הסיסמה קצרה מדי'); return; }
      Cloud.changePassword(pw).then(() => toast('הסיסמה עודכנה')).catch(err => alert('לא ניתן לעדכן: ' + (err.message || err)));
      return;
    }
    case 'send-code': {
      const email = document.getElementById('loginEmail').value.trim();
      if (!/^\S+@\S+\.\S+$/.test(email)) { alert('נא להקליד כתובת מייל תקינה'); return; }
      t.disabled = true;
      Cloud.sendCode(email).then(() => { view.sentTo = email; render(); })
        .catch(err => { t.disabled = false; alert('שליחת המייל נכשלה: ' + (err.message || err)); });
      return;
    }
    case 'verify-code': {
      const code = document.getElementById('loginCode').value.trim();
      if (!code) return;
      t.disabled = true;
      Cloud.verifyCode(view.sentTo, code).then(boot).catch(err => { t.disabled = false; alert('הקוד לא התקבל: ' + (err.message || err)); });
      return;
    }
    case 'login-back': view.sentTo = ''; render(); return;
    case 'logout':
      if (!confirm(`לצאת מהחשבון (${Cloud.displayName()})? התלמידים נשמרים בשרת ויחכו לך בכניסה הבאה.`)) return;
      flush(); Cloud.signOut().then(() => { students = []; view = { name: 'login' }; render(); });
      return;
    case 'admin': openAdmin(); return;
    case 'admin-refresh': openAdmin(); return;
    case 'admin-open': case 'admin-excel': {
      const r = view.adminRows.find(x => x.id === d.id);
      if (!r) return;
      if (d.act === 'admin-excel') { exportExcel(normalize(JSON.parse(JSON.stringify(r.data)))); return; }
      view = { name: 'adminStudent', adminUsers: view.adminUsers, adminData: normalize(JSON.parse(JSON.stringify(r.data))), adminOwner: [r.owner_name, r.owner_email].filter(Boolean).join(' · '), adminRows: view.adminRows, adminQ: view.adminQ };
      render(); scrollTo(0, 0); return;
    }
    case 'admin-export':
      download(`tala-all-teachers-${new Date().toISOString().slice(0, 10)}.json`, { app: 'tala', version: 3, rows: view.adminRows }); return;
    case 'add-student': {
      const n = newStudent(); students.push(n); save();
      view = { name: 'student', id: n.id, tab: 'details', q: '' }; render();
      document.querySelector('[data-path="firstName"]')?.focus();
      return;
    }
    case 'del-student':
      if (!confirm(`למחוק את ${fullName(s)} ואת כל התוכנית? לא ניתן לבטל.`)) return;
      students = students.filter(x => x !== s); save(); view = { name: 'list', q: '' }; break;
    case 'clone-year': {
      const c = normalize(JSON.parse(JSON.stringify(s)));
      c.id = uid(); c.year = nextYear(s.year);
      c.meetings = []; c.summary = ''; c.steps = {}; c.fillDate = new Date().toISOString().slice(0, 10);
      if (+c.grade && +c.grade < 12) c.grade = String(+c.grade + 1);
      c.goals.forEach(g => { g.id = uid(); g.objectives = g.objectives.filter(o => o.status !== 'done').map(o => ({ ...o, id: uid(), status: 'todo', notes: '' })); });
      c.updatedAt = Date.now(); students.push(c); save();
      view.id = c.id; toast('נוצרה תוכנית לשנה הבאה (ללא היעדים שהושגו). עדכנו את המיפוי.'); break;
    }
    case 'clear-rate': {
      if (s.ratings[d.id]) s.ratings[d.id].b = '';
      t.closest('.rate5').querySelectorAll('input').forEach(i => { i.checked = false; });
      t.hidden = true; updateCounts(s); touch(s); return;
    }
    case 'build':
    case 'build-add': {
      let rebuild = false;
      if (d.act === 'build' && allObjectives(s).length) {
        if (!confirm('לבנות את התוכנית מחדש מהמיפוי? יעדים ושינויים שעשית בתוכנית יוחלפו.\n(כדי לשמור אותם ולהוסיף רק יעדים חדשים – בטלו ובחרו "הוספת יעדים חדשים")')) return;
        rebuild = true;
      }
      const n = buildPlan(s, rebuild);
      if (n === null) { alert('אין עדיין נתונים: הכניסו הערכות 1–5 במיפוי (או רמת קריאה / הערות לתחום), ואז בנו את התוכנית.'); return; }
      view.tab = 'goals';
      toast(n ? `נבנתה תוכנית עם ${n} יעדים חדשים – עברו עליה והתאימו` : 'לא נמצאו יעדים חדשים להוספה');
      touch(s); render(); scrollTo(0, 0); return;
    }
    case 'add-team': s.team.push({ name: '', role: '' }); break;
    case 'add-support': s.supports.push({ type: '', hours: '', teacher: '' }); break;
    case 'del-support': s.supports.splice(+d.i, 1); break;
    case 'excel': exportExcel(s); return;
    case 'format': view.format = d.v; break;
    case 'del-team': s.team.splice(+d.i, 1); break;
    case 'add-goal': {
      const domain = document.getElementById('newDomain').value;
      if (s.goals.some(g => g.domain === domain) && !confirm('התחום כבר קיים בתוכנית. להוסיף אותו שוב?')) return;
      s.goals.push(newSection(s, domain));
      break;
    }
    case 'del-goal':
      if (!confirm('למחוק את התחום ואת כל היעדים שלו?')) return;
      s.goals.splice(gi, 1); break;
    case 'move-goal': { const j = gi + +d.dir; [s.goals[gi], s.goals[j]] = [s.goals[j], s.goals[gi]]; break; }
    case 'move-obj': { const list = s.goals[gi].objectives; const j = oi + +d.dir; [list[oi], list[j]] = [list[j], list[oi]]; break; }
    case 'add-obj': s.goals[gi].objectives.push(newObjective(s, { text: '', domain: s.goals[gi].domain })); break;
    case 'add-bank': {
      const g = s.goals[gi]; const b = bankFor(g.domain).find(x => x.ref === d.ref);
      if (b) addObjective(s, g, { text: b.text, area: g.domain === 'arabic' ? GOAL_BY_ID[b.ref]?.area : b.area, ref: b.ref });
      break;
    }
    case 'del-obj': s.goals[gi].objectives.splice(oi, 1); break;
    case 'set': setPath(s, d.path, d.v); break;
    case 'append': {
      const sep = d.sep === 'nl' ? '\n' : '، ';
      const cur = getPath(s, d.path) || '';
      if (cur.split(sep).map(x => x.trim()).includes(d.v)) return;
      setPath(s, d.path, cur.trim() ? `${cur.replace(/\s+$/, '')}${sep}${d.v}` : d.v); break;
    }
    case 'add-meeting': s.meetings.push({ date: new Date().toISOString().slice(0, 10), type: '', participants: '', summary: '' }); break;
    case 'del-meeting': s.meetings.splice(+d.i, 1); break;
    case 'print': window.print(); return;
    case 'export-all': download(`tala-backup-${new Date().toISOString().slice(0, 10)}.json`, { app: 'tala', version: 3, students }); return;
    case 'export-one': download(`tala-${fullName(s)}.json`, { app: 'tala', version: 3, students: [s] }); return;
    case 'import': document.getElementById('importFile').click(); return;
    default: return;
  }
  if (s && students.includes(s)) touch(s); else save();
  rerender();
});

function nextYear(y) {
  const m = /^(\d{4})\D+(\d{4})$/.exec(y || '');
  return m ? `${+m[1] + 1}–${+m[2] + 1}` : y;
}

document.getElementById('backBtn').addEventListener('click', () => {
  if (view.name === 'account') { view = { name: 'list', q: '' }; render(); return; }
  if (view.name === 'adminStudent') { view = { name: 'admin', adminRows: view.adminRows, adminUsers: view.adminUsers, adminQ: view.adminQ }; render(); return; }
  view = { name: 'list', q: view.q || '' }; render();
});

function download(name, data) {
  const a = document.createElement('a');
  a.href = URL.createObjectURL(new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' }));
  a.download = name.replace(/[\\/:*?"<>|]/g, '_');
  a.click();
  setTimeout(() => URL.revokeObjectURL(a.href), 1000);
}

document.getElementById('importFile').addEventListener('change', async e => {
  const f = e.target.files[0]; e.target.value = '';
  if (!f) return;
  try {
    const data = JSON.parse(await f.text());
    const incoming = Array.isArray(data) ? data : data.students;
    if (!Array.isArray(incoming)) throw new Error();
    let added = 0, updated = 0;
    for (const raw of incoming) {
      if (!raw || typeof raw !== 'object') continue;
      const st = normalize(raw);
      const i = students.findIndex(x => x.id === st.id);
      if (i >= 0) { students[i] = st; updated++; } else { students.push(st); added++; }
    }
    save(); render();
    toast(`יובאו ${added} חדשים, עודכנו ${updated}`);
  } catch { alert('הקובץ אינו קובץ גיבוי תקין של תל"א'); }
});

window.addEventListener('beforeunload', flush);
window.addEventListener('pagehide', flush);

if ('serviceWorker' in navigator) navigator.serviceWorker.register('sw.js').catch(() => {});

// Start: sign in (when a server is set up), load this teacher's students, then sync with the server.
async function boot() {
  if (Cloud.enabled && !Cloud.user) { students = []; view = { name: 'login' }; render(); return; }
  if (Cloud.isRecovering()) { view = { name: 'newpw' }; render(); return; }
  students = load();
  if (Cloud.user) {
    const anon = loadKey(STORE_KEY);
    if (anon.length && confirm(`נמצאו במכשיר ${anon.length} תלמידים שנשמרו לפני הכניסה לחשבון. להוסיף אותם לחשבון שלך?`)) {
      for (const a of anon) if (!students.some(x => x.id === a.id)) students.push(a);
      localStorage.setItem(storeKey(), JSON.stringify(students));
      localStorage.removeItem(STORE_KEY);
    }
    snapshot();
  }
  view = { name: 'list', q: '' }; render();
  if (!Cloud.user) return;
  Cloud.track(() => students);
  try {
    students = (await Cloud.sync(students)).map(normalize);
    localStorage.setItem(storeKey(), JSON.stringify(students));
    snapshot();
    if (view.name === 'list') render();
  } catch (e) {
    console.warn(e);
    toast('אין חיבור לשרת – עובדים מהמכשיר, והשינויים יישלחו כשהחיבור יחזור');
  }
}

(async () => {
  try { await Cloud.init({ onAuth: boot, onStatusChange: showSync, onPasswordRecovery: () => { view = { name: 'newpw' }; render(); } }); } catch (e) { console.warn('cloud init failed', e); }
  boot();
})();
