/* תל"א – תוכנית לימודים אישית לתלמידים בחינוך המיוחד.
 * Standalone app. All data lives in this device's localStorage; back it up with "ייצוא".
 * The goal bank, mapping sheets and assessment tools come from materials.js. */
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
const TEAM_ROLES = ['מחנך/ת', 'מורה שילוב', 'מורה אחראית תחום', 'סייע/ת', 'קלינאי/ת תקשורת', 'מרפא/ה בעיסוק', 'פסיכולוג/ית', 'יועץ/ת', 'הורה', 'מנהל/ת'];
const ARABIC_GRADES = ['', 'الاول', 'الثاني', 'الثالث', 'الرابع', 'الخامس', 'السادس', 'السابع', 'الثامن', 'التاسع', 'العاشر', 'الحادي عشر', 'الثاني عشر'];
const RATE_COLS = [['b', 'תחילה'], ['m', 'אמצע'], ['e', 'סוף']];

// ---------- data ----------
let students = [];
let view = { name: 'list', id: null, tab: 'details', q: '' };

function load() {
  let list;
  try { list = JSON.parse(localStorage.getItem(STORE_KEY)) || []; } catch { list = []; }
  return list.map(normalize);
}
let saveTimer;
function save() {
  clearTimeout(saveTimer);
  saveTimer = setTimeout(flush, 250);
}
function flush() {
  clearTimeout(saveTimer);
  localStorage.setItem(STORE_KEY, JSON.stringify(students));
  const el = document.getElementById('savedNote');
  if (el) el.textContent = 'נשמר ✓';
}
const uid = () => Date.now().toString(36) + Math.random().toString(36).slice(2, 7);
const current = () => students.find(s => s.id === view.id);

function schoolYear() {
  const d = new Date();
  const y = d.getMonth() >= 7 ? d.getFullYear() : d.getFullYear() - 1;
  return `${y}–${y + 1}`;
}

function newStudent() {
  return {
    id: uid(), firstName: '', lastName: '', gender: '', idNumber: '', birthDate: '',
    school: '', className: '', grade: '', city: '', homeroomTeacher: '', inclusionTeacher: '',
    committee: '', committeeDate: '', parentsContact: '', familyStatus: '', familyPosition: '', health: '', previousSchools: '',
    year: schoolYear(), fillDate: new Date().toISOString().slice(0, 10), reviewDate: '',
    support: {}, diagnoses: {}, accommodations: {}, accommodationsOther: '',
    background: '', strengths: '', difficulties: '', motivators: '', parentsView: '', studentView: '',
    readingLevel: '', readingBand: '', listeningBand: '', wpm: '', ratings: {},
    summary: '', team: [], goals: [], meetings: [], updatedAt: Date.now(),
  };
}

// Fill in fields added after a record was created, and map the first version's fields.
function normalize(raw) {
  const s = Object.assign(newStudent(), raw);
  ['team', 'goals', 'meetings'].forEach(k => { if (!Array.isArray(s[k])) s[k] = []; });
  ['support', 'diagnoses', 'ratings'].forEach(k => { if (!s[k] || typeof s[k] !== 'object') s[k] = {}; });
  if (typeof s.accommodations === 'string') {
    s.accommodationsOther = [s.accommodationsOther, s.accommodations].filter(Boolean).join('\n');
    s.accommodations = {};
  } else if (!s.accommodations || typeof s.accommodations !== 'object') s.accommodations = {};
  s.goals.forEach(g => {
    if (!g.id) g.id = uid();
    if (!Array.isArray(g.objectives)) g.objectives = [];
    g.objectives.forEach(o => {
      if (!o.id) o.id = uid();
      if (o.partners == null) o.partners = o.responsible || '';
      if (o.period == null) o.period = o.due ? fmtDate(o.due) : '';
      if (o.curriculum == null) o.curriculum = GOAL_BY_ID[o.ref]?.cur || '';
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

function toast(msg) {
  const t = document.createElement('div');
  t.className = 'toast'; t.textContent = msg;
  document.body.appendChild(t);
  setTimeout(() => t.remove(), 2600);
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

// Latest rating given (end, else middle, else beginning).
function latestRating(s, id) {
  const r = s.ratings[id];
  if (!r) return 0;
  return +(r.e || r.m || r.b || 0);
}

// ---------- drafting the plan from the materials ----------
function fillBlanks(text, s) {
  const g = +s.grade;
  let t = text;
  if (g) t = t.replace(/صف ___/g, `صف ${ARABIC_GRADES[g] || g}`);
  if (g && /كلمة في الدقيقة/.test(t)) t = t.replace('___', fluencyNorm(g));
  return t;
}

function methodsFor(domain, area) {
  const list = METHODS[area] || METHODS[domain] || METHODS.other;
  return list.slice(0, 2).join('، ');
}
function partnersFor(domain) {
  return {
    arabic: 'المربية، معلمة التربية الخاصة', math: 'المربية، معلمة التربية الخاصة',
    emotional: 'المربية، المستشارة، الاهل', comm: 'المربية، معالجة النطق، الاهل', cognitive: 'المربية، المعالجة الوظيفية',
  }[domain] || 'المربية';
}

function sectionFor(s, domain) {
  let sec = s.goals.find(g => g.domain === domain);
  if (!sec) {
    sec = { id: uid(), domain, teacher: '', annual: fillBlanks(domainOf(domain)?.annual || '', s), current: '', accommodations: '', objectives: [] };
    s.goals.push(sec);
  }
  return sec;
}

function newObjective(s, { text, domain, area, ref }) {
  return {
    id: uid(), ref: ref || '', area: area || '', curriculum: (ref && GOAL_BY_ID[ref]?.d === domain && GOAL_BY_ID[ref].cur) || '', text: fillBlanks(text, s),
    period: 'حتى نهاية السنة', criterion: 'بنسبة نجاح 80%', methods: methodsFor(domain, area), partners: partnersFor(domain),
    status: 'todo', notes: '',
  };
}

function addObjective(s, sec, item) {
  const text = fillBlanks(item.text, s);
  if (sec.objectives.some(o => (item.ref && o.ref === item.ref) || o.text === text)) return false;
  sec.objectives.push(newObjective(s, { ...item, domain: sec.domain }));
  return true;
}

function fitsLevel(goal, level) {
  return !level || !goal.level || goal.level.includes(level);
}

function draftPlan(s) {
  const found = []; // {domain, area, text, ref, why}
  const currentLines = {}; // domain -> lines describing the current state
  const note = (domain, line) => (currentLines[domain] ??= []).push(line);

  // Academic profile: items at or below "يستصعب" get their goals.
  for (const sec of ACADEMIC) {
    for (const [id, label, goalIds] of sec.items) {
      const r = latestRating(s, id);
      if (!r || r > ACADEMIC_NEEDS_GOAL) continue;
      const domain = sec.sec.includes('الحسابية') ? 'math' : 'arabic';
      note(domain, `${label}: ${ACADEMIC_SCALE.find(x => x[0] === r)[1]}`);
      const goals = goalIds.map(g => GOAL_BY_ID[g]).filter(Boolean);
      const fitting = goals.filter(g => fitsLevel(g, s.readingLevel));
      for (const g of (fitting.length ? fitting : goals)) found.push({ domain: g.d, area: g.area, text: g.t, ref: g.id });
    }
  }

  // Reading level (PDF): if the reading sections weren't rated, start from the level's core goals.
  const readingRated = ACADEMIC.filter(x => x.sec.startsWith('ד')).some(x => x.items.some(([id]) => latestRating(s, id)));
  if (s.readingLevel && !readingRated) {
    const core = {
      'أ': ['r1', 'r3', 'r4', 'r5', 'r12', 'r13', 'c18', 'o5'],
      'ب': ['r18', 'r20', 'r22', 'r28', 'f1', 'f2', 'c1', 'c3'],
      'ج': ['r30', 'f2', 'c3', 'c6', 'c9', 'c12', 'k10', 'k20'],
    }[s.readingLevel];
    for (const id of core) { const g = GOAL_BY_ID[id]; found.push({ domain: g.d, area: g.area, text: g.t, ref: g.id }); }
  }
  if (s.readingLevel) note('arabic', READING_LEVELS[s.readingLevel].title);
  if (s.readingBand) note('arabic', `רמת קריאות: ${s.readingBand}`);
  if (s.listeningBand) note('arabic', `הבנת הנשמע: ${s.listeningBand}`);
  if (s.wpm) note('arabic', `سرعة القراءة: ${s.wpm} كلمة في الدقيقة${s.grade ? ` (المعيار لصفه: ${fluencyNorm(s.grade)})` : ''}`);

  // Functional profile: items at 1–2 get a goal in their domain.
  for (const sec of FUNCTIONAL) {
    for (const [id, label, domain, goal] of sec.items) {
      const r = latestRating(s, id);
      if (!r || r > FUNCTIONAL_NEEDS_GOAL) continue;
      note(domain, `${label}: ${FUNCTIONAL_SCALE.find(x => x[0] === r)[1]}`);
      found.push({ domain, area: domain, text: goal, ref: id });
    }
  }

  if (!found.length) return null;
  let added = 0;
  const order = DOMAINS.map(d => d.id);
  found.sort((a, b) => order.indexOf(a.domain) - order.indexOf(b.domain));
  for (const item of found) {
    const sec = sectionFor(s, item.domain);
    if (addObjective(s, sec, item)) added++;
  }
  for (const [domain, lines] of Object.entries(currentLines)) {
    const sec = s.goals.find(g => g.domain === domain);
    if (sec && !sec.current.trim()) sec.current = lines.join('\n');
  }
  s.goals.sort((a, b) => order.indexOf(a.domain) - order.indexOf(b.domain));
  return added;
}

// Bank of goals offered under a plan section.
function bankFor(domain) {
  if (domain === 'arabic' || domain === 'math') {
    return GOALS.filter(g => g.d === domain).map(g => ({ ref: g.id, text: g.t, area: domain === 'arabic' ? g.cur : g.area, level: g.level }));
  }
  return FUNCTIONAL.flatMap(sec => sec.items.filter(i => i[2] === domain).map(([id, , , t]) => ({ ref: id, text: t, area: domain })));
}

// ---------- rendering ----------
const app = document.getElementById('app');

function render() {
  const back = document.getElementById('backBtn');
  const actions = document.getElementById('topActions');
  const title = document.getElementById('title');
  if (view.name === 'list') {
    back.hidden = true;
    title.textContent = 'תל"א · תוכנית לימודים אישית';
    actions.innerHTML = `<button class="btn small" data-act="export-all" title="גיבוי כל הנתונים לקובץ">ייצוא</button>
      <button class="btn small" data-act="import" title="שחזור מקובץ גיבוי">ייבוא</button>`;
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

function renderList() {
  const q = view.q.trim();
  const list = students
    .filter(s => !q || [fullName(s), s.className, s.school].join(' ').includes(q))
    .sort((a, b) => b.updatedAt - a.updatedAt);
  app.innerHTML = `
    <div class="row search">
      <input type="search" id="q" placeholder="חיפוש תלמיד/ה, כיתה או בית ספר…" value="${esc(view.q)}" style="flex:1">
      <button class="btn primary" data-act="add-student">+ תלמיד/ה חדש/ה</button>
    </div>
    ${students.length === 0 ? `
      <div class="card empty">
        <div class="big">📋</div>
        <h2>ברוכים הבאים לבונה התל"א</h2>
        <p class="muted">ממלאים את דף הפתיחה ואת גיליונות המיפוי (אקדמי ותפקודי) ובוחרים רמת קריאה לפי כלי ההערכה –<br>
        והאפליקציה מנסחת טיוטת תל"א לכל תחום (عربي, حساب, תקשורתי, רגשי, קוגניטיבי…) ממאגר המטרות.</p>
        <button class="btn primary" data-act="add-student">התחילו בתלמיד/ה הראשון/ה</button>
        <p class="muted" style="font-size:.85rem;margin-top:18px">הנתונים נשמרים במכשיר זה בלבד. מומלץ לגבות מדי פעם בכפתור "ייצוא".</p>
      </div>` : ''}
    <div class="student-list">
      ${list.map(s => {
        const objs = allObjectives(s);
        const done = objs.filter(o => o.status === 'done').length;
        return `<div class="card student-card" data-open="${s.id}">
          <div class="name">${esc(fullName(s))}</div>
          <div class="muted">${esc([s.className && 'כיתה ' + s.className, s.school].filter(Boolean).join(' · '))} ${s.year ? `<bdi dir="ltr">${esc(s.year)}</bdi>` : ''}</div>
          <div class="muted" style="margin-top:6px">${s.goals.length} תחומים · ${objs.length} יעדים · ${done} הושגו</div>
          ${progressBar(s)}
        </div>`;
      }).join('')}
    </div>
    ${students.length && !list.length ? '<p class="muted">לא נמצאו תוצאות.</p>' : ''}`;
}

const TABS = [
  ['details', '1. פרטים ורקע'],
  ['mapping', '2. מיפוי והערכה'],
  ['goals', '3. תוכנית תל"א'],
  ['tracking', '4. מעקב ופגישות'],
  ['doc', 'מסמך להדפסה'],
];

function renderStudent(s) {
  const body = { details: tabDetails, mapping: tabMapping, goals: tabGoals, tracking: tabTracking, doc: tabDoc }[view.tab](s);
  app.innerHTML = `
    <div class="tabs">${TABS.map(([k, l]) => `<button class="tab ${view.tab === k ? 'active' : ''}" data-tab="${k}">${l}</button>`).join('')}</div>
    ${body}`;
}

function tabDetails(s) {
  return `
  <div class="card"><h2>פרופיל תלמיד – פרטים</h2>
    <div class="grid">
      ${field('firstName', 'שם פרטי')}${field('lastName', 'שם משפחה')}
      ${selectField('gender', 'ז/נ', [['ז', 'ז'], ['נ', 'נ']])}
      ${field('idNumber', 'ת.ז.')}${field('birthDate', 'תאריך לידה', 'date')}
      ${field('school', 'בית הספר')}${field('city', 'ישוב')}
      ${field('className', 'כיתה')}
      ${selectField('grade', 'דרגת כיתה', GRADE_NAMES.slice(1).map((n, i) => [i + 1, n]))}
      ${field('homeroomTeacher', 'שם המחנכ/ת')}${field('inclusionTeacher', 'שם מורת השילוב')}
      ${selectField('committee', 'ועדה', [['שילוב', 'שילוב'], ['השמה', 'השמה']])}
      ${field('committeeDate', 'מועד ועדה', 'date')}
      ${field('parentsContact', 'קשר עם הורים')}
      ${field('year', 'שנת לימודים').replace('<input', '<input dir="ltr" style="text-align:right"')}
      ${field('fillDate', 'תאריך מילוי התוכנית', 'date')}
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
    <h3 style="margin-top:14px">סוגי אבחונים – תאריך האבחון האחרון</h3>
    <div class="grid">${DIAGNOSES.map(d => field(`diagnoses.${d}`, d, 'date')).join('')}</div>
  </div>
  <div class="card"><h2>רקע כללי</h2>
    <div class="grid">
      ${selectField('familyStatus', 'מצב משפחתי', ['נשואים', 'גרושים', 'פרודים', 'אחר'].map(x => [x, x]))}
      ${field('familyPosition', 'מיקום במשפחה')}
      ${field('health', 'מצב בריאותי / תרופות קבועות', 'text', 'wide')}
      ${field('previousSchools', 'מוסדות חינוכיים קודמים – מגיל הגן', 'textarea', 'wide')}
      ${field('background', 'רקע נוסף (התפתחותי, לימודי, טיפולים)', 'textarea', 'wide')}
      ${field('strengths', 'נקודות חוזק', 'textarea', 'wide')}
      ${field('difficulties', 'קשיים וצרכים', 'textarea', 'wide')}
      ${field('motivators', 'תחומי עניין ומחזקים', 'textarea', 'wide')}
      ${field('parentsView', 'עמדת ההורים', 'textarea', 'wide')}
      ${field('studentView', 'עמדת התלמיד/ה', 'textarea', 'wide')}
    </div>
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
  <div class="card no-print"><h2>פעולות</h2>
    <div class="row">
      <button class="btn" data-act="export-one">ייצוא תלמיד/ה לקובץ</button>
      <button class="btn" data-act="clone-year">שכפול לשנה הבאה</button>
      <span class="spacer"></span>
      <button class="btn danger" data-act="del-student">מחיקת התלמיד/ה</button>
    </div>
  </div>`;
}

function ratingTable(s, sections, scale, threshold) {
  return sections.map(sec => `
    <h3 class="sec-title" dir="auto">${esc(sec.sec)}</h3>
    <div class="scroll-x"><table class="table rate-table">
      <tr><th>המיומנות</th>${RATE_COLS.map(([, l]) => `<th class="rate-col">${l}</th>`).join('')}<th>התייחסות נוספת</th></tr>
      ${sec.items.map(([id, label]) => `<tr>
        <td dir="auto">${esc(label)}</td>
        ${RATE_COLS.map(([k]) => {
          const v = s.ratings[id]?.[k] || '';
          return `<td><select class="rate ${v && +v <= threshold ? 'low' : v ? 'ok' : ''}" data-path="ratings.${id}.${k}" data-threshold="${threshold}">
            <option value=""></option>${scale.map(([n]) => `<option ${String(n) === String(v) ? 'selected' : ''}>${n}</option>`).join('')}
          </select></td>`;
        }).join('')}
        <td><input type="text" data-path="ratings.${id}.note" value="${esc(s.ratings[id]?.note)}" dir="auto"></td>
      </tr>`).join('')}
    </table></div>`).join('');
}

function tabMapping(s) {
  const a = ASSESSMENT[Math.min(+s.grade || 0, 7)];
  return `
  <div class="card"><h2>רמת קריאה – أدوات لتقييم البروفيل اللغوي</h2>
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
      <a class="btn small" href="${TOOLS_PDF}#page=${a.page}" target="_blank" rel="noopener">פתיחת כלי ההערכה (نسخة الطالب / المعلم) ↗</a>
    </div>` : '<p class="muted">בחרו דרגת כיתה כדי לראות את משימות ההערכה המתאימות.</p>'}
  </div>
  <div class="card"><h2>מיפוי אישי – פרופיל אקדמי</h2>
    <p class="muted scale" dir="auto">${ACADEMIC_SCALE.map(([n, l]) => `<b>${n}</b> ${l}`).join(' · ')}<br>
    פריט שדורג ${ACADEMIC_NEEDS_GOAL} ומטה ייכנס לטיוטת התוכנית.</p>
    ${ratingTable(s, ACADEMIC, ACADEMIC_SCALE, ACADEMIC_NEEDS_GOAL)}
  </div>
  <div class="card"><h2>מיפוי אישי – פרופיל תפקודי</h2>
    <p class="muted scale" dir="auto">${FUNCTIONAL_SCALE.map(([n, l]) => `<b>${n}</b> ${l}`).join(' · ')}<br>
    פריט שדורג ${FUNCTIONAL_NEEDS_GOAL} ומטה ייכנס לטיוטת התוכנית.</p>
    ${ratingTable(s, FUNCTIONAL, FUNCTIONAL_SCALE, FUNCTIONAL_NEEDS_GOAL)}
  </div>
  <div class="card row"><span class="muted">סיימתם למפות?</span><span class="spacer"></span>
    <button class="btn primary" data-act="draft">✨ ניסוח טיוטת תל"א מהמיפוי</button></div>`;
}

function tabGoals(s) {
  const partnerChips = [...new Set([...s.team.filter(m => m.name).map(m => m.name), ...PARTNERS])];
  return `
  <div class="card row">
    <div><b>ניסוח אוטומטי</b><div class="muted" style="font-size:.9rem">לפי המיפוי ורמת הקריאה, ממאגר המטרות. יעדים קיימים לא יוכפלו.</div></div>
    <span class="spacer"></span>
    <button class="btn primary" data-act="draft">✨ ניסוח טיוטה מהמיפוי</button>
  </div>
  ${s.goals.length === 0 ? `<div class="card empty"><div class="big">🎯</div>
    <p class="muted">עדיין אין תחומים בתוכנית. מלאו את <b>המיפוי</b> ולחצו "ניסוח טיוטה", או הוסיפו תחום ידנית למטה.</p></div>` : ''}
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
        <label class="field wide">יכולת התפקוד הנוכחית (מהמיפוי)<textarea dir="auto" data-path="goals.${gi}.current">${esc(g.current)}</textarea></label>
      </div>
      ${g.objectives.map((o, oi) => `
        <div class="objective">
          <div class="row" style="margin-bottom:8px">
            <span class="num">יעד ${gi + 1}.${oi + 1}</span>
            ${g.domain === 'arabic' ? `<select class="cur-select" data-path="goals.${gi}.objectives.${oi}.curriculum" title="مجال المنهاج 2009">
              <option value="">مجال المنهاج 2009…</option>${CURRICULUM.domains.map(c => `<option ${c === o.curriculum ? 'selected' : ''}>${c}</option>`).join('')}
            </select>` : o.area && o.area !== g.domain ? `<span class="area-pill">${esc(o.area)}</span>` : ''}
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
        ${bank.length ? `<details class="bank" ${g.objectives.length ? '' : 'open'}>
          <summary>מאגר המטרות לתחום (${bank.length}) – לחיצה מוסיפה יעד${s.readingLevel && g.domain === 'arabic' ? ` · מסומנות המתאימות לרמה (${s.readingLevel})` : ''}</summary>
          ${g.domain === 'arabic' ? `<div class="cur-note" dir="rtl">مرتبة حسب مجالات ${esc(CURRICULUM.title)}${s.grade ? ' · ' + curriculumStage(s.grade) : ''}</div>` : ''}
          ${areas.map(area => `<div class="bank-area"><div class="bank-title">${esc(area === g.domain ? domainLabel(area) : g.domain === 'arabic' ? 'مجال ' + area : area)}</div>
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
  </div>`;
}

function tabTracking(s) {
  const objs = allObjectives(s);
  return `
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
    <p class="muted" style="font-size:.9rem">לעדכון ההערכה המעצבת והמסכמת – דרגו שוב את המיפוי בעמודות "אמצע" ו"סוף".</p>
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
    <datalist id="meetingTypes"><option value="בניית תל&quot;א"><option value="הערכה מעצבת"><option value="הערכה מסכמת"><option value="פגישת הורים"><option value="ישיבת צוות"></datalist>
    <button class="btn ghost" data-act="add-meeting" style="margin-top:8px">+ תיעוד פגישה</button>
  </div>
  <div class="card"><h2>סיכום והמלצות להמשך</h2>
    ${field('summary', 'סיכום שנתי, הישגים והמלצות לשנה הבאה', 'textarea', 'wide')}
  </div>`;
}

function tabDoc(s) {
  const kv = (k, v) => v ? `<tr><td>${k}</td><td class="pre" dir="auto">${esc(v)}</td></tr>` : '';
  const support = SUPPORT_WHEN.map(w => [w, SUPPORT_TYPES.filter(t => s.support[`${w}|${t}`])]).filter(([, l]) => l.length);
  const diag = DIAGNOSES.filter(d => s.diagnoses[d]);
  const acc = ACCOMMODATIONS.filter(a => s.accommodations[a]);
  const ratedRows = (sections, scale) => sections.map(sec => {
    const rows = sec.items.filter(([id]) => RATE_COLS.some(([k]) => s.ratings[id]?.[k]) || s.ratings[id]?.note);
    if (!rows.length) return '';
    return `<tr><th colspan="5" dir="auto">${esc(sec.sec)}</th></tr>` + rows.map(([id, label]) => `<tr><td dir="auto">${esc(label)}</td>${RATE_COLS.map(([k]) => `<td class="c">${s.ratings[id]?.[k] || ''}</td>`).join('')}<td dir="auto">${esc(s.ratings[id]?.note)}</td></tr>`).join('');
  }).join('');
  const academic = ratedRows(ACADEMIC), functional = ratedRows(FUNCTIONAL);
  const head = g => `<table class="kv">
      <tr><td>שם התלמיד</td><td>${esc(fullName(s))}</td><td>שם מחנך\\ת כיתה</td><td>${esc(s.homeroomTeacher)}</td></tr>
      <tr><td>דרגת כיתה</td><td>${esc(gradeName(s) || s.className)}</td><td>שם מורה אחראית תחום</td><td>${esc(g.teacher)}</td></tr>
      <tr><td>שם בית הספר</td><td>${esc(s.school)}</td><td>תחום התפקוד</td><td><b>${esc(domainLabel(g.domain))}</b></td></tr>
      <tr><td>תאריך מילוי התוכנית</td><td colspan="3">${fmtDate(s.fillDate)}</td></tr>
    </table>`;

  return `
  <div class="row no-print" style="margin-bottom:12px">
    <button class="btn primary" data-act="print">🖨️ הדפסה / שמירה כ-PDF</button>
    <span class="muted">בחלון ההדפסה אפשר לבחור "שמירה כ-PDF". כל תחום מודפס בעמוד נפרד, כמו בגיליונות התבנית.</span>
  </div>
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
    ${[s.background, s.strengths, s.difficulties, s.motivators, s.parentsView, s.studentView].some(Boolean) ? `<h2>רקע כללי ותמונת מצב</h2><table class="kv">
      ${kv('רקע', s.background)}${kv('נקודות חוזק', s.strengths)}${kv('קשיים וצרכים', s.difficulties)}${kv('תחומי עניין ומחזקים', s.motivators)}
      ${kv('עמדת ההורים', s.parentsView)}${kv('עמדת התלמיד/ה', s.studentView)}</table>` : ''}
    ${acc.length || s.accommodationsOther ? `<h2>התאמות בהמלצת בית הספר</h2><table class="kv">${kv('התאמות', acc.join(' · '))}${kv('אחר', s.accommodationsOther)}</table>` : ''}

    ${academic || functional || s.readingLevel ? `<div class="page-break"></div><h1>מיפוי אישי – פרופיל</h1><div class="sub">${esc(fullName(s))}</div>
      ${s.readingLevel || s.readingBand || s.listeningBand || s.wpm ? `<table class="kv">
        ${kv('רמת קריאה (أدوات التقييم)', s.readingLevel ? READING_LEVELS[s.readingLevel].title : '')}
        ${kv('רמת קריאות', s.readingBand)}${kv('הבנת הנשמע', s.listeningBand)}${kv('سرعة القراءة', s.wpm ? `${s.wpm} كلمة في الدقيقة` : '')}</table>` : ''}
      ${academic ? `<h2>פרופיל אקדמי (1–6)</h2><table><tr><th>המיומנות</th><th class="c">תחילה</th><th class="c">אמצע</th><th class="c">סוף</th><th>התייחסות נוספת</th></tr>${academic}</table>` : ''}
      ${functional ? `<h2>פרופיל תפקודי (1–4)</h2><table><tr><th>המיומנות</th><th class="c">תחילה</th><th class="c">אמצע</th><th class="c">סוף</th><th>התייחסות נוספת</th></tr>${functional}</table>` : ''}` : ''}

    ${s.goals.map(g => `
      <div class="page-break"></div>
      <h1>תוכנית עבודה שנתית לתלמיד תח"י – תל"א</h1>
      <div class="sub">תוכנית חינוכית יחידנית · תוכנית לימודים אישית</div>
      ${head(g)}
      ${g.domain === 'arabic' ? `<table class="kv">${kv('תוכנית הלימודים', CURRICULUM.title + (s.grade ? '\n' + curriculumStage(s.grade) : ''))}</table>` : ''}
      <table class="kv">${kv('מטרה\\ות שנתית\\ות', g.annual)}${kv('יכולת התפקוד הנוכחית', g.current)}</table>
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
    ${s.summary ? `<h2>סיכום והמלצות</h2><table class="kv">${kv('סיכום', s.summary)}</table>` : ''}
  </div>`;
}

// ---------- events ----------
function touch(s) { s.updatedAt = Date.now(); save(); }

function onEdit(e) {
  const t = e.target;
  if (t.id === 'q') {
    if (e.type !== 'input') return;
    view.q = t.value; renderList();
    const q = document.getElementById('q'); q.focus(); q.setSelectionRange(q.value.length, q.value.length);
    return;
  }
  const path = t.dataset.path; const s = current();
  if (!path || !s) return;
  // Selects/checkboxes/radios commit on change; text fields on input.
  const isChoice = t.tagName === 'SELECT' || t.type === 'checkbox' || t.type === 'radio';
  if (isChoice !== (e.type === 'change')) return;
  setPath(s, path, t.type === 'checkbox' ? t.checked : t.value);
  if (t.hasAttribute('data-status')) t.className = 'status ' + statusOf(t.value).cls;
  if (t.classList.contains('rate')) t.className = 'rate ' + (t.value ? (+t.value <= +t.dataset.threshold ? 'low' : 'ok') : '');
  if (path === 'firstName' || path === 'lastName') document.getElementById('title').textContent = fullName(s);
  touch(s);
  if (t.hasAttribute('data-rerender') || (path === 'grade' && view.tab === 'mapping')) { const y = scrollY; render(); scrollTo(0, y); }
}
app.addEventListener('input', onEdit);
app.addEventListener('change', onEdit);

document.addEventListener('click', e => {
  const t = e.target.closest('[data-act],[data-open],[data-tab]');
  if (!t || t.disabled) return;
  if (t.dataset.open) { view = { name: 'student', id: t.dataset.open, tab: 'details', q: view.q }; render(); scrollTo(0, 0); return; }
  if (t.dataset.tab) { view.tab = t.dataset.tab; render(); scrollTo(0, 0); return; }
  e.preventDefault();
  const s = current(); const d = t.dataset;
  const gi = +d.gi, oi = +d.oi;
  switch (d.act) {
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
      c.meetings = []; c.summary = ''; c.fillDate = new Date().toISOString().slice(0, 10);
      // The end-of-year rating becomes the new starting point.
      for (const r of Object.values(c.ratings)) { r.b = r.e || r.m || r.b || ''; r.m = ''; r.e = ''; }
      c.goals.forEach(g => { g.id = uid(); g.objectives = g.objectives.filter(o => o.status !== 'done').map(o => ({ ...o, id: uid(), status: 'todo', notes: '' })); });
      c.updatedAt = Date.now(); students.push(c); save();
      view.id = c.id; toast('נוצרה תוכנית לשנה הבאה (ללא היעדים שהושגו)'); break;
    }
    case 'draft': {
      const n = draftPlan(s);
      if (n === null) { alert('אין עדיין נתונים לניסוח: דרגו פריטים במיפוי האקדמי או התפקודי, או בחרו רמת קריאה (أ / ب / ج).'); return; }
      view.tab = 'goals';
      toast(n ? `נוספו ${n} יעדים לטיוטה – עברו עליהם והתאימו` : 'כל היעדים מהמיפוי כבר נמצאים בתוכנית');
      touch(s); render(); scrollTo(0, 0); return;
    }
    case 'add-team': s.team.push({ name: '', role: '' }); break;
    case 'del-team': s.team.splice(+d.i, 1); break;
    case 'add-goal': {
      const domain = document.getElementById('newDomain').value;
      if (s.goals.some(g => g.domain === domain) && !confirm('התחום כבר קיים בתוכנית. להוסיף אותו שוב?')) return;
      s.goals.push({ id: uid(), domain, teacher: '', annual: fillBlanks(domainOf(domain)?.annual || '', s), current: '', accommodations: '', objectives: [] });
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
      if (b) addObjective(s, g, { text: b.text, area: b.area, ref: b.ref });
      break;
    }
    case 'del-obj': s.goals[gi].objectives.splice(oi, 1); break;
    case 'set': setPath(s, d.path, d.v); break;
    case 'append': {
      const cur = getPath(s, d.path) || '';
      if (cur.split('، ').includes(d.v)) return;
      setPath(s, d.path, cur ? `${cur}، ${d.v}` : d.v); break;
    }
    case 'add-meeting': s.meetings.push({ date: new Date().toISOString().slice(0, 10), type: '', participants: '', summary: '' }); break;
    case 'del-meeting': s.meetings.splice(+d.i, 1); break;
    case 'print': window.print(); return;
    case 'export-all': download(`tala-backup-${new Date().toISOString().slice(0, 10)}.json`, { app: 'tala', version: 2, students }); return;
    case 'export-one': download(`tala-${fullName(s)}.json`, { app: 'tala', version: 2, students: [s] }); return;
    case 'import': document.getElementById('importFile').click(); return;
    default: return;
  }
  if (s && students.includes(s)) touch(s); else save();
  const y = scrollY; render(); scrollTo(0, y);
});

function nextYear(y) {
  const m = /^(\d{4})\D+(\d{4})$/.exec(y || '');
  return m ? `${+m[1] + 1}–${+m[2] + 1}` : y;
}

document.getElementById('backBtn').addEventListener('click', () => { view = { name: 'list', q: view.q || '' }; render(); });

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

students = load();
render();
