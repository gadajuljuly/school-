/* תל"א – תוכנית לימודים אישית לתלמידים בחינוך המיוחד.
 * Standalone app. All data lives in this device's localStorage; back it up with "ייצוא". */
'use strict';

const STORE_KEY = 'tala.students.v1';

const DOMAINS = [
  'קריאה וכתיבה',
  'חשבון',
  'שפה ותקשורת',
  'רגשי-חברתי',
  'התנהגות',
  'קוגניטיבי (קשב, זיכרון, ארגון)',
  'מוטוריקה עדינה וגסה',
  'תפקוד עצמאי וכישורי חיים',
  'הכנה לעבודה ולבגרות',
  'אחר',
];

// Example objectives the teacher can drop in and then edit.
const BANK = {
  'קריאה וכתיבה': ['יזהה את כל אותיות הא"ב בדפוס', 'יקרא מילים בנות 2 הברות מנוקדות', 'יקרא טקסט קצר ויענה על 3 שאלות הבנה', 'יכתוב את שמו המלא באופן עצמאי', 'יכתוב משפט פשוט מתוך הכתבה'],
  'חשבון': ['יספור עצמים עד 20 בהתאמה חד-חד ערכית', 'יזהה ספרות 0–100', 'יחבר ויחסר בתחום ה-20 בעזרת אמצעי המחשה', 'יזהה מטבעות ושטרות וישלם סכום פשוט', 'יקרא שעה עגולה וחצי שעה בשעון מחוגים'],
  'שפה ותקשורת': ['יבקש עזרה במילים או בתמונה כשהוא זקוק לה', 'ישתמש בלוח תקשורת להבעת בחירה בין 2 אפשרויות', 'יענה על שאלות "מי / מה / איפה"', 'יספר על אירוע ברצף של 3 שלבים', 'ישמור על נושא שיחה במשך 3 תורות'],
  'רגשי-חברתי': ['יזהה ויכנה 4 רגשות בסיסיים בתמונות ובעצמו', 'ימתין לתורו במשחק קבוצתי', 'יפנה לחבר ביוזמתו להצעת משחק', 'ישתמש באסטרטגיית הרגעה (נשימות / פינה שקטה) בעת תסכול', 'ישתף חפץ עם חבר לפי בקשה'],
  'התנהגות': ['ישב במקומו לאורך פעילות של 15 דקות', 'יעבור בין פעילויות בעזרת לוח מעברים ללא התנגדות', 'יפחית התפרצויות מ-5 ל-2 בשבוע', 'ימלא הוראות של מבוגר תוך דקה', 'יעמוד בכללי הכיתה המוסכמים'],
  'קוגניטיבי (קשב, זיכרון, ארגון)': ['ישלים משימה בת 3 שלבים לפי כרטיס הוראות', 'יתמיד במשימה במשך 10 דקות ברצף', 'יזכור ויבצע הוראה בת 2 חלקים', 'יארגן את התיק לפי רשימה מצולמת', 'ימיין פריטים לפי 2 תכונות'],
  'מוטוריקה עדינה וגסה': ['יחזיק עיפרון באחיזה תלת-אצבעית', 'יגזור לאורך קו ישר', 'יעתיק צורות בסיסיות (עיגול, ריבוע, משולש)', 'יעלה וירד במדרגות לסירוגין ללא תמיכה', 'יתפוס כדור בשתי ידיים מ-2 מטר'],
  'תפקוד עצמאי וכישורי חיים': ['ילבש ויפשוט מעיל באופן עצמאי', 'ישתמש בשירותים וירחץ ידיים באופן עצמאי', 'יכין כריך פשוט לפי רצף תמונות', 'יזהה את מספר הקו ויעלה לאוטובוס הנכון', 'יקנה מוצר בחנות ויבדוק עודף'],
  'הכנה לעבודה ולבגרות': ['יגיע בזמן למקום ההתנסות', 'ימלא משימה תעסוקתית לפי סדר שלבים', 'ימלא טופס פרטים אישיים', 'יפנה לממונה בשאלה בצורה מכבדת', 'יעבוד במשך 30 דקות ברצף עם הפסקה מתוכננת'],
  'אחר': [],
};

const CRITERIA = ['ב-80% מהניסיונות', 'ב-4 מתוך 5 הזדמנויות', 'באופן עצמאי', 'עם תיווך מילולי', 'עם תמיכה חזותית', 'לאורך 3 שבועות רצופים'];

const STATUSES = [
  { v: 'todo', label: 'טרם החל', cls: 'todo', color: '#c9cfcd' },
  { v: 'progress', label: 'בתהליך', cls: 'progress-s', color: '#6d9bc9' },
  { v: 'partial', label: 'הושג חלקית', cls: 'partial', color: '#e2a93b' },
  { v: 'done', label: 'הושג', cls: 'done', color: '#3b9b62' },
  { v: 'not', label: 'לא הושג', cls: 'not', color: '#c75a46' },
];
const statusOf = v => STATUSES.find(s => s.v === v) || STATUSES[0];

const TEAM_ROLES = ['מחנך/ת', 'מורה משלב/ת', 'סייע/ת', 'קלינאי/ת תקשורת', 'מרפא/ה בעיסוק', 'פיזיותרפיסט/ית', 'פסיכולוג/ית', 'יועץ/ת', 'מטפל/ת באומנות', 'הורה', 'מנהל/ת'];

// ---------- data ----------
let students = load();
let view = { name: 'list', id: null, tab: 'details', q: '' };

function load() {
  try { return JSON.parse(localStorage.getItem(STORE_KEY)) || []; } catch { return []; }
}
let saveTimer;
function save() {
  clearTimeout(saveTimer);
  saveTimer = setTimeout(() => {
    localStorage.setItem(STORE_KEY, JSON.stringify(students));
    const el = document.getElementById('savedNote');
    if (el) el.textContent = 'נשמר ✓';
  }, 250);
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
    id: uid(), firstName: '', lastName: '', idNumber: '', birthDate: '', school: '', className: '',
    framework: '', diagnosis: '', year: schoolYear(), startDate: '', reviewDate: '',
    background: '', strengths: '', difficulties: '', motivators: '', parentsView: '', studentView: '',
    accommodations: '', summary: '',
    team: [], goals: [], meetings: [], updatedAt: Date.now(),
  };
}

// ---------- helpers ----------
const esc = s => String(s ?? '').replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
const fullName = s => `${s.firstName || ''} ${s.lastName || ''}`.trim() || 'תלמיד/ה ללא שם';
const allObjectives = s => s.goals.flatMap(g => g.objectives);
const fmtDate = d => d ? new Date(d).toLocaleDateString('he-IL') : '';

function toast(msg) {
  const t = document.createElement('div');
  t.className = 'toast'; t.textContent = msg;
  document.body.appendChild(t);
  setTimeout(() => t.remove(), 2200);
}

function getPath(obj, path) { return path.split('.').reduce((o, k) => o?.[k], obj); }
function setPath(obj, path, val) {
  const keys = path.split('.'); const last = keys.pop();
  keys.reduce((o, k) => o[k], obj)[last] = val;
}

const field = (path, label, type = 'text', cls = '') => {
  const s = current(); const v = getPath(s, path) ?? '';
  const input = type === 'textarea'
    ? `<textarea data-path="${path}">${esc(v)}</textarea>`
    : `<input type="${type}" data-path="${path}" value="${esc(v)}">`;
  return `<label class="field ${cls}">${label}${input}</label>`;
};

function progressBar(s) {
  const objs = allObjectives(s);
  if (!objs.length) return '<div class="progress"></div>';
  return '<div class="progress">' + STATUSES.map(st => {
    const n = objs.filter(o => (o.status || 'todo') === st.v).length;
    return n ? `<span style="width:${(n / objs.length) * 100}%;background:${st.color}" title="${st.label}: ${n}"></span>` : '';
  }).join('') + '</div>';
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
        <p class="muted">כאן בונים תוכנית לימודים אישית לכל תלמיד/ה: תמונת מצב, מטרות שנתיות, יעדים מדידים,<br>דרכי עבודה ומעקב התקדמות – ומפיקים מסמך מוכן להדפסה ולחתימה.</p>
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
          <div class="muted" style="margin-top:6px">${s.goals.length} מטרות · ${objs.length} יעדים · ${done} הושגו</div>
          ${progressBar(s)}
        </div>`;
      }).join('')}
    </div>
    ${students.length && !list.length ? '<p class="muted">לא נמצאו תוצאות.</p>' : ''}`;
}

const TABS = [
  ['details', 'פרטים וצוות'],
  ['status', 'תמונת מצב'],
  ['goals', 'מטרות ויעדים'],
  ['tracking', 'מעקב ופגישות'],
  ['doc', 'מסמך להדפסה'],
];

function renderStudent(s) {
  const body = {
    details: tabDetails, status: tabStatus, goals: tabGoals, tracking: tabTracking, doc: tabDoc,
  }[view.tab](s);
  app.innerHTML = `
    <div class="tabs">${TABS.map(([k, l]) => `<button class="tab ${view.tab === k ? 'active' : ''}" data-tab="${k}">${l}</button>`).join('')}</div>
    ${body}`;
}

function tabDetails(s) {
  return `
  <div class="card"><h2>פרטי התלמיד/ה</h2>
    <div class="grid">
      ${field('firstName', 'שם פרטי')}${field('lastName', 'שם משפחה')}
      ${field('idNumber', 'תעודת זהות')}${field('birthDate', 'תאריך לידה', 'date')}
      ${field('school', 'בית ספר / גן')}${field('className', 'כיתה')}
      ${field('framework', 'מסגרת (כיתה מיוחדת / שילוב / בי"ס לחנ"מ)')}
      ${field('diagnosis', 'לקות / אבחנה עיקרית')}
      ${field('year', 'שנת לימודים').replace('<input', '<input dir="ltr" style="text-align:right"')}${field('startDate', 'תאריך בניית התוכנית', 'date')}
      ${field('reviewDate', 'מועד הערכה מתוכנן', 'date')}
    </div>
  </div>
  <div class="card"><h2>צוות רב-מקצועי</h2>
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

function tabStatus() {
  return `
  <div class="card"><h2>רקע ותמונת מצב</h2>
    <div class="grid">
      ${field('background', 'רקע כללי (התפתחותי, משפחתי, לימודי, טיפולים)', 'textarea', 'wide')}
      ${field('strengths', 'נקודות חוזק', 'textarea', 'wide')}
      ${field('difficulties', 'קשיים וצרכים', 'textarea', 'wide')}
      ${field('motivators', 'תחומי עניין ומחזקים', 'textarea', 'wide')}
    </div>
  </div>
  <div class="card"><h2>קולות השותפים</h2>
    <div class="grid">
      ${field('parentsView', 'עמדת ההורים ומטרותיהם', 'textarea', 'wide')}
      ${field('studentView', 'עמדת התלמיד/ה ורצונותיו/ה', 'textarea', 'wide')}
    </div>
  </div>
  <div class="card"><h2>התאמות ונגישות</h2>
    ${field('accommodations', 'התאמות בדרכי הוראה, היבחנות, סביבה ועזרים טכנולוגיים', 'textarea', 'wide')}
  </div>`;
}

function tabGoals(s) {
  return `
  ${s.goals.length === 0 ? `<div class="card empty"><div class="big">🎯</div>
    <p class="muted">עדיין אין מטרות. לכל תחום מגדירים <b>מטרה שנתית</b>, ומתחתיה <b>יעדים</b> מדידים לטווח קצר.</p></div>` : ''}
  ${s.goals.map((g, gi) => `
    <div class="card goal">
      <div class="goal-head">
        <span class="domain-pill">מטרה ${gi + 1}</span>
        <select data-path="goals.${gi}.domain" data-rerender style="width:auto">
          ${DOMAINS.map(d => `<option ${d === g.domain ? 'selected' : ''}>${d}</option>`).join('')}
        </select>
        <span class="spacer"></span>
        <button class="btn small" data-act="move-goal" data-gi="${gi}" data-dir="-1" ${gi === 0 ? 'disabled' : ''} aria-label="למעלה">▲</button>
        <button class="btn small" data-act="move-goal" data-gi="${gi}" data-dir="1" ${gi === s.goals.length - 1 ? 'disabled' : ''} aria-label="למטה">▼</button>
        <button class="btn small danger" data-act="del-goal" data-gi="${gi}">מחיקת מטרה</button>
      </div>
      <div class="grid">
        <label class="field wide">מצב קיים בתחום<textarea data-path="goals.${gi}.current">${esc(g.current)}</textarea></label>
        <label class="field wide">מטרה שנתית<textarea data-path="goals.${gi}.annual" placeholder="לדוגמה: התלמיד ירחיב את יכולתו לתקשר את צרכיו בכיתה">${esc(g.annual)}</textarea></label>
      </div>
      ${g.objectives.map((o, oi) => `
        <div class="objective">
          <div class="row" style="margin-bottom:8px">
            <span class="num">יעד ${gi + 1}.${oi + 1}</span>
            <select class="status ${statusOf(o.status).cls}" data-path="goals.${gi}.objectives.${oi}.status" data-status>
              ${STATUSES.map(st => `<option value="${st.v}" ${st.v === (o.status || 'todo') ? 'selected' : ''}>${st.label}</option>`).join('')}
            </select>
            <span class="spacer"></span>
            <button class="btn small danger" data-act="del-obj" data-gi="${gi}" data-oi="${oi}" aria-label="מחיקת יעד">✕</button>
          </div>
          <div class="grid">
            <label class="field wide">היעד (מה התלמיד/ה יעשה)<textarea data-path="goals.${gi}.objectives.${oi}.text">${esc(o.text)}</textarea></label>
            <label class="field wide">קריטריון להצלחה (איך נמדוד)
              <input type="text" data-path="goals.${gi}.objectives.${oi}.criterion" value="${esc(o.criterion)}">
              <div class="suggest">${CRITERIA.map(c => `<button type="button" data-act="add-criterion" data-gi="${gi}" data-oi="${oi}" data-v="${esc(c)}">${c}</button>`).join('')}</div>
            </label>
            <label class="field wide">דרכי פעולה, שיטות ועזרים<textarea data-path="goals.${gi}.objectives.${oi}.methods">${esc(o.methods)}</textarea></label>
            <label class="field">אחראי/ת<input type="text" list="teamList" data-path="goals.${gi}.objectives.${oi}.responsible" value="${esc(o.responsible)}"></label>
            <label class="field">תאריך יעד<input type="date" data-path="goals.${gi}.objectives.${oi}.due" value="${esc(o.due)}"></label>
            <label class="field wide">הערכה והערות מעקב<textarea data-path="goals.${gi}.objectives.${oi}.notes">${esc(o.notes)}</textarea></label>
          </div>
        </div>`).join('')}
      <div style="margin-top:10px">
        <button class="btn ghost" data-act="add-obj" data-gi="${gi}">+ יעד חדש</button>
        ${(BANK[g.domain] || []).length ? `<div class="muted" style="font-size:.85rem;margin-top:10px">רעיונות ליעדים בתחום (לחיצה מוסיפה יעד):</div>
        <div class="suggest">${BANK[g.domain].map((t, ti) => `<button type="button" data-act="add-obj" data-gi="${gi}" data-bank="${ti}">${esc(t)}</button>`).join('')}</div>` : ''}
      </div>
    </div>`).join('')}
  <datalist id="teamList">${s.team.filter(m => m.name).map(m => `<option value="${esc(m.name)}${m.role ? ' – ' + esc(m.role) : ''}">`).join('')}</datalist>
  <div class="card">
    <div class="row">
      <select id="newDomain" style="width:auto;flex:1">${DOMAINS.map(d => `<option>${d}</option>`).join('')}</select>
      <button class="btn primary" data-act="add-goal">+ הוספת מטרה בתחום</button>
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
        ${s.goals.map((g, gi) => g.objectives.map((o, oi) => `<tr><td>${esc(g.domain)}</td><td>${gi + 1}.${oi + 1} ${esc(o.text)}</td><td><span class="status ${statusOf(o.status).cls}">${statusOf(o.status).label}</span></td></tr>`).join('')).join('')}
      </table>` : '<p class="muted">אין עדיין יעדים למעקב. הוסיפו אותם בלשונית "מטרות ויעדים".</p>'}
  </div>
  <div class="card"><h2>פגישות צוות והורים</h2>
    ${s.meetings.map((m, i) => `<div class="objective">
      <div class="grid">
        <label class="field">תאריך<input type="date" data-path="meetings.${i}.date" value="${esc(m.date)}"></label>
        <label class="field">סוג הפגישה<input type="text" list="meetingTypes" data-path="meetings.${i}.type" value="${esc(m.type)}"></label>
        <label class="field wide">משתתפים<input type="text" data-path="meetings.${i}.participants" value="${esc(m.participants)}"></label>
        <label class="field wide">סיכום והחלטות<textarea data-path="meetings.${i}.summary">${esc(m.summary)}</textarea></label>
      </div>
      <div class="row" style="margin-top:6px"><span class="spacer"></span><button class="btn small danger" data-act="del-meeting" data-i="${i}">מחיקת פגישה</button></div>
    </div>`).join('')}
    <datalist id="meetingTypes"><option value="בניית תל&quot;א"><option value="הערכת אמצע שנה"><option value="הערכת סוף שנה"><option value="פגישת הורים"><option value="ישיבת צוות"></datalist>
    <button class="btn ghost" data-act="add-meeting" style="margin-top:8px">+ תיעוד פגישה</button>
  </div>
  <div class="card"><h2>סיכום והמלצות להמשך</h2>
    ${field('summary', 'סיכום שנתי, הישגים והמלצות לשנה הבאה', 'textarea', 'wide')}
  </div>`;
}

function tabDoc(s) {
  const kv = (k, v) => v ? `<tr><td>${k}</td><td class="pre">${esc(v)}</td></tr>` : '';
  const section = (title, rows) => rows.trim() ? `<h2>${title}</h2><table class="kv">${rows}</table>` : '';
  return `
  <div class="row no-print" style="margin-bottom:12px">
    <button class="btn primary" data-act="print">🖨️ הדפסה / שמירה כ-PDF</button>
    <span class="muted">בחלון ההדפסה אפשר לבחור "שמירה כ-PDF".</span>
  </div>
  <div class="doc">
    <h1>תוכנית לימודים אישית (תל"א)</h1>
    <div class="sub">שנת הלימודים <bdi dir="ltr">${esc(s.year)}</bdi></div>
    ${section('פרטים אישיים', [
      kv('שם התלמיד/ה', fullName(s)), kv('תעודת זהות', s.idNumber), kv('תאריך לידה', fmtDate(s.birthDate)),
      kv('בית ספר', s.school), kv('כיתה', s.className), kv('מסגרת', s.framework), kv('לקות / אבחנה', s.diagnosis),
      kv('תאריך בניית התוכנית', fmtDate(s.startDate)), kv('מועד הערכה', fmtDate(s.reviewDate)),
    ].join(''))}
    ${s.team.length ? `<h2>הצוות המטפל</h2><table><tr><th>שם</th><th>תפקיד</th></tr>
      ${s.team.map(m => `<tr><td>${esc(m.name)}</td><td>${esc(m.role)}</td></tr>`).join('')}</table>` : ''}
    ${section('תמונת מצב', [kv('רקע', s.background), kv('נקודות חוזק', s.strengths), kv('קשיים וצרכים', s.difficulties), kv('תחומי עניין ומחזקים', s.motivators)].join(''))}
    ${section('קולות השותפים', [kv('עמדת ההורים', s.parentsView), kv('עמדת התלמיד/ה', s.studentView)].join(''))}
    ${section('התאמות ונגישות', kv('התאמות', s.accommodations))}
    ${s.goals.length ? '<h2>מטרות ויעדים</h2>' : ''}
    ${s.goals.map((g, gi) => `
      <table class="kv">
        <tr><td>מטרה ${gi + 1} – תחום</td><td><b>${esc(g.domain)}</b></td></tr>
        ${kv('מצב קיים', g.current)}
        ${kv('מטרה שנתית', g.annual)}
      </table>
      ${g.objectives.length ? `<table>
        <tr><th style="width:6%">#</th><th>יעד</th><th>קריטריון הצלחה</th><th>דרכי פעולה</th><th style="width:13%">אחראי/ת</th><th style="width:10%">תאריך יעד</th><th style="width:11%">הערכה</th></tr>
        ${g.objectives.map((o, oi) => `<tr><td>${gi + 1}.${oi + 1}</td><td class="pre">${esc(o.text)}</td><td>${esc(o.criterion)}</td><td class="pre">${esc(o.methods)}</td><td>${esc(o.responsible)}</td><td>${fmtDate(o.due)}</td><td>${statusOf(o.status).label}${o.notes ? `<div class="pre" style="font-size:.85em">${esc(o.notes)}</div>` : ''}</td></tr>`).join('')}
      </table>` : ''}`).join('')}
    ${s.meetings.length ? `<h2>פגישות</h2><table><tr><th style="width:14%">תאריך</th><th style="width:18%">סוג</th><th>משתתפים</th><th>סיכום</th></tr>
      ${s.meetings.map(m => `<tr><td>${fmtDate(m.date)}</td><td>${esc(m.type)}</td><td>${esc(m.participants)}</td><td class="pre">${esc(m.summary)}</td></tr>`).join('')}</table>` : ''}
    ${section('סיכום והמלצות', kv('סיכום', s.summary))}
    <div class="sign"><div>חתימת המחנך/ת</div><div>חתימת ההורים</div><div>חתימת המנהל/ת</div></div>
  </div>`;
}

// ---------- events ----------
function touch(s) { s.updatedAt = Date.now(); save(); }

app.addEventListener('input', e => {
  if (e.target.id === 'q') { view.q = e.target.value; renderList(); const q = document.getElementById('q'); q.focus(); q.setSelectionRange(q.value.length, q.value.length); return; }
  const path = e.target.dataset.path; const s = current();
  if (!path || !s) return;
  setPath(s, path, e.target.value);
  if (e.target.hasAttribute('data-status')) e.target.className = 'status ' + statusOf(e.target.value).cls;
  if (path === 'firstName' || path === 'lastName') document.getElementById('title').textContent = fullName(s);
  touch(s);
  if (e.target.hasAttribute('data-rerender')) render();
});

document.addEventListener('click', e => {
  const t = e.target.closest('[data-act],[data-open],[data-tab]');
  if (!t) return;
  if (t.dataset.open) { view = { name: 'student', id: t.dataset.open, tab: 'details', q: view.q }; render(); scrollTo(0, 0); return; }
  if (t.dataset.tab) { view.tab = t.dataset.tab; render(); scrollTo(0, 0); return; }
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
      const c = JSON.parse(JSON.stringify(s));
      c.id = uid(); c.year = schoolYear() === s.year ? nextYear(s.year) : schoolYear();
      c.meetings = []; c.summary = ''; c.startDate = ''; c.reviewDate = '';
      c.goals.forEach(g => { g.id = uid(); g.objectives = g.objectives.filter(o => o.status !== 'done').map(o => ({ ...o, id: uid(), status: 'todo', notes: '', due: '' })); });
      c.updatedAt = Date.now(); students.push(c); save();
      view.id = c.id; toast('נוצרה תוכנית לשנה הבאה (ללא היעדים שהושגו)'); break;
    }
    case 'add-team': s.team.push({ name: '', role: '' }); break;
    case 'del-team': s.team.splice(+d.i, 1); break;
    case 'add-goal': s.goals.push({ id: uid(), domain: document.getElementById('newDomain').value, current: '', annual: '', objectives: [] }); break;
    case 'del-goal':
      if (!confirm('למחוק את המטרה ואת כל היעדים שלה?')) return;
      s.goals.splice(gi, 1); break;
    case 'move-goal': { const j = gi + +d.dir; [s.goals[gi], s.goals[j]] = [s.goals[j], s.goals[gi]]; break; }
    case 'add-obj': {
      const text = d.bank !== undefined ? BANK[s.goals[gi].domain][+d.bank] : '';
      s.goals[gi].objectives.push({ id: uid(), text, criterion: '', methods: '', responsible: '', due: '', status: 'todo', notes: '' });
      break;
    }
    case 'del-obj': s.goals[gi].objectives.splice(oi, 1); break;
    case 'add-criterion': {
      const o = s.goals[gi].objectives[oi];
      o.criterion = o.criterion ? `${o.criterion}, ${d.v}` : d.v; break;
    }
    case 'add-meeting': s.meetings.push({ date: new Date().toISOString().slice(0, 10), type: '', participants: '', summary: '' }); break;
    case 'del-meeting': s.meetings.splice(+d.i, 1); break;
    case 'print': window.print(); return;
    case 'export-all': download(`tala-backup-${new Date().toISOString().slice(0, 10)}.json`, { app: 'tala', version: 1, students }); return;
    case 'export-one': download(`tala-${fullName(s)}.json`, { app: 'tala', version: 1, students: [s] }); return;
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
      const st = Object.assign(newStudent(), raw);
      ['team', 'goals', 'meetings'].forEach(k => { if (!Array.isArray(st[k])) st[k] = []; });
      st.goals.forEach(g => { if (!Array.isArray(g.objectives)) g.objectives = []; });
      const i = students.findIndex(x => x.id === st.id);
      if (i >= 0) { students[i] = st; updated++; } else { students.push(st); added++; }
    }
    save(); render();
    toast(`יובאו ${added} חדשים, עודכנו ${updated}`);
  } catch { alert('הקובץ אינו קובץ גיבוי תקין של תל"א'); }
});

window.addEventListener('beforeunload', () => localStorage.setItem(STORE_KEY, JSON.stringify(students)));

if ('serviceWorker' in navigator) navigator.serviceWorker.register('sw.js').catch(() => {});

render();
