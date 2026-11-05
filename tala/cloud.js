/* Server sync (Supabase): sign-in with phone + password (reset by e-mail), each teacher's students saved to the server,
 * and an administrator view of all teachers. Off when config.js is empty.
 * The data stays usable offline: changes wait in a queue and are sent when back online. */
'use strict';

const Cloud = (() => {
  const cfg = window.TALA_CONFIG || {};
  const enabled = !!(cfg.supabaseUrl && cfg.supabaseAnonKey && window.supabase);
  let sb = null, user = null, admin = false, onStatus = () => {};
  let pushTimer = null, pushing = false, status = 'idle';

  const qKey = () => `tala.queue.${user?.id}`;
  const readQueue = () => { try { return JSON.parse(localStorage.getItem(qKey())) || {}; } catch { return {}; } };
  const writeQueue = q => localStorage.setItem(qKey(), JSON.stringify(q));
  const setStatus = s => { status = s; onStatus(s); };

  // A password-reset link from the e-mail lands here with "type=recovery" in the address.
  let recovering = /type=recovery/.test(location.hash);
  let onRecovery = () => {};

  async function init({ onAuth, onStatusChange, onPasswordRecovery }) {
    if (!enabled) return;
    onStatus = onStatusChange || onStatus;
    onRecovery = onPasswordRecovery || onRecovery;
    sb = window.supabase.createClient(cfg.supabaseUrl, cfg.supabaseAnonKey, {
      auth: { persistSession: true, autoRefreshToken: true, detectSessionInUrl: true },
    });
    const { data } = await sb.auth.getSession();
    await setUser(data.session?.user || null);
    sb.auth.onAuthStateChange(async (ev, session) => {
      if (ev === 'PASSWORD_RECOVERY') { recovering = true; await setUser(session?.user || null); onRecovery(); return; }
      const next = session?.user || null;
      if ((next?.id || null) === (user?.id || null)) return;
      await setUser(next);
      onAuth();
    });
    window.addEventListener('online', () => flushSoon(0));
    setInterval(() => flushSoon(0), 60000);
  }
  const isRecovering = () => recovering && !!user;
  function recoveryDone() {
    recovering = false;
    if (location.hash) history.replaceState(null, '', location.pathname + location.search);
  }

  async function setUser(u) {
    user = u; admin = false;
    if (!u) return;
    const { data } = await sb.from('tala_admins').select('email').limit(1);
    admin = !!(data && data.length);
  }

  // Any password is allowed (the teacher's choice). The server needs at least 6 characters,
  // so the app always adds the same ending before sending it.
  const pw = p => String(p ?? '') + '~tala';

  // Phone numbers are kept as international digits: 050-1234567 → 972501234567.
  function normPhone(phone) {
    let d = String(phone || '').replace(/\D/g, '');
    if (d.startsWith('00')) d = d.slice(2);
    if (d.startsWith('0')) d = '972' + d.slice(1);
    return d.length >= 11 && d.length <= 13 ? d : null;
  }
  function showPhone(d) {
    if (!d) return '';
    return d.startsWith('972') ? '0' + d.slice(3) : '+' + d;
  }
  const maskEmail = e => e.replace(/^(.)(.*)(@.*)$/, (_, a, b, c) => a + '*'.repeat(Math.min(b.length, 6)) + c);
  async function emailForPhone(phone) {
    const p = normPhone(phone);
    if (!p) throw new Error('bad-phone');
    const { data, error } = await sb.rpc('tala_email_for_phone', { p_phone: p });
    if (error) throw error;
    return data;
  }

  // Sign in: phone + password (the account behind the phone is the teacher's e-mail).
  async function signInPhone(phone, password) {
    const email = await emailForPhone(phone);
    if (!email) throw new Error('no-user');
    return signInPassword(email, password);
  }
  // Register: name, phone, e-mail, password.
  async function signUpPhone(phone, email, password, name) {
    const p = normPhone(phone);
    if (!p) throw new Error('bad-phone');
    if (await emailForPhone(phone)) throw new Error('phone-taken');
    const { data, error } = await sb.auth.signUp({ email, password: pw(password), options: { data: { name, phone: showPhone(p) } } });
    if (error) throw error;
    if (!data.session) throw new Error('confirm-required');
    await setUser(data.user);
    const r = await sb.rpc('tala_register_phone', { p_phone: p });
    if (r.error) throw r.error;
    if (r.data !== 'ok') throw new Error(r.data === 'taken' ? 'phone-taken' : r.data);
  }
  // Forgotten password: an e-mail with a link to choose a new password. Returns the (masked) address.
  async function forgotPassword(phoneOrEmail) {
    const v = String(phoneOrEmail || '').trim();
    const email = v.includes('@') ? v : await emailForPhone(v);
    if (!email) throw new Error('no-user');
    const { error } = await sb.auth.resetPasswordForEmail(email, { redirectTo: location.origin + location.pathname });
    if (error) throw error;
    return maskEmail(email);
  }

  // ✨ writing helper (Edge Function "tala-ai").
  async function ai(payload) {
    const { data, error } = await sb.functions.invoke(cfg.aiFunction || 'tala-ai', { body: { lang: LANG, ...payload } });
    if (error) {
      let code = 'server';
      try {
        const res = error.context;
        const body = await res.json();
        code = body.error || (res.status === 404 ? 'not-found' : `http-${res.status} ${body.message || body.msg || ''}`.trim());
      } catch { if (/Failed to send|fetch/i.test(error.message || '')) code = 'not-deployed'; }
      throw new Error(code);
    }
    return data.text;
  }

  async function adminUsers() {
    const { data, error } = await sb.rpc('tala_admin_users');
    if (error) throw error;
    return data;
  }
  async function adminSetPassword(email, password) {
    const { data, error } = await sb.rpc('tala_admin_set_password', { p_email: email, p_password: pw(password) });
    if (error) throw error;
    return data;
  }
  const displayName = () => user?.user_metadata?.name || user?.email || '';
  const userPhone = () => user?.user_metadata?.phone || '';

  async function signInPassword(email, password) {
    const { data, error } = await sb.auth.signInWithPassword({ email, password: pw(password) });
    if (error) throw error;
    await setUser(data.user);
  }
  async function changePassword(password) {
    const { error } = await sb.auth.updateUser({ password: pw(password) });
    if (error) throw error;
  }
  async function signOut() { await sb.auth.signOut(); user = null; admin = false; }

  // Merge the server copy with this device's copy (newest wins) and send what the server lacks.
  async function sync(local) {
    setStatus('syncing');
    const { data, error } = await sb.from('tala_students').select('id,data,deleted,updated_at').eq('owner', user.id);
    if (error) { setStatus('error'); throw error; }
    const byId = new Map(local.map(s => [s.id, s]));
    const queue = readQueue();
    const seen = new Set();
    for (const row of data) {
      seen.add(row.id);
      const mine = byId.get(row.id);
      const remoteTime = Date.parse(row.updated_at) || 0;
      if (row.deleted) {
        if (mine && !queue[row.id]) byId.delete(row.id);
        continue;
      }
      if (!mine || ((row.data?.updatedAt || remoteTime) > (mine.updatedAt || 0) && !queue[row.id])) byId.set(row.id, row.data);
      else if ((mine.updatedAt || 0) > (row.data?.updatedAt || remoteTime)) queue[row.id] = 'put';
    }
    for (const id of byId.keys()) if (!seen.has(id)) queue[id] = 'put';
    writeQueue(queue);
    const merged = [...byId.values()];
    await flush(merged);
    return merged;
  }

  let latest = () => [];
  function track(getStudents) { latest = getStudents; }
  function changed(id) { const q = readQueue(); q[id] = 'put'; writeQueue(q); flushSoon(); }
  function removed(id) { const q = readQueue(); q[id] = 'del'; writeQueue(q); flushSoon(); }
  function flushSoon(ms = 1500) {
    if (!user) return;
    clearTimeout(pushTimer);
    pushTimer = setTimeout(() => flush(latest()), ms);
  }

  async function flush(students) {
    if (!user || pushing) return;
    const queue = readQueue();
    const ids = Object.keys(queue);
    if (!ids.length) { setStatus('saved'); return; }
    if (!navigator.onLine) { setStatus('offline'); return; }
    pushing = true; setStatus('syncing');
    try {
      const rows = ids.map(id => {
        if (queue[id] === 'del') return { id, data: {}, deleted: true, updated_at: new Date().toISOString() };
        const s = students.find(x => x.id === id);
        return s ? { id, data: s, deleted: false, updated_at: new Date(s.updatedAt || Date.now()).toISOString() } : null;
      }).filter(Boolean);
      if (rows.length) {
        const { error } = await sb.from('tala_students').upsert(rows, { onConflict: 'id' });
        if (error) throw error;
      }
      const after = readQueue();
      for (const id of ids) if (after[id] === queue[id]) delete after[id];
      writeQueue(after);
      setStatus(Object.keys(after).length ? 'pending' : 'saved');
    } catch (e) {
      console.warn('sync failed', e);
      setStatus(navigator.onLine ? 'error' : 'offline');
    } finally { pushing = false; }
  }

  // Administrator: every teacher's students (the server only allows this for administrators).
  async function allStudents() {
    const { data, error } = await sb.from('tala_students').select('id,owner_email,owner_name,data,updated_at').eq('deleted', false).order('owner_email');
    if (error) throw error;
    return data;
  }

  return {
    enabled, init, ai, isRecovering, recoveryDone, signInPhone, signUpPhone, forgotPassword, showPhone, displayName, userPhone,
    adminUsers, adminSetPassword, changePassword, signOut, sync, track, changed, removed, flushSoon, allStudents,
    get user() { return user; }, get admin() { return admin; }, get status() { return status; },
  };
})();
