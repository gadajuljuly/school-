/* Server sync (Supabase): e-mail sign-in, each teacher's students saved to the server,
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

  async function init({ onAuth, onStatusChange }) {
    if (!enabled) return;
    onStatus = onStatusChange || onStatus;
    sb = window.supabase.createClient(cfg.supabaseUrl, cfg.supabaseAnonKey, {
      auth: { persistSession: true, autoRefreshToken: true, detectSessionInUrl: true },
    });
    const { data } = await sb.auth.getSession();
    await setUser(data.session?.user || null);
    sb.auth.onAuthStateChange(async (_ev, session) => {
      const next = session?.user || null;
      if ((next?.id || null) === (user?.id || null)) return;
      await setUser(next);
      onAuth();
    });
    window.addEventListener('online', () => flushSoon(0));
    setInterval(() => flushSoon(0), 60000);
  }

  async function setUser(u) {
    user = u; admin = false;
    if (!u) return;
    const { data } = await sb.from('tala_admins').select('email').limit(1);
    admin = !!(data && data.length);
  }

  async function sendCode(email) {
    const { error } = await sb.auth.signInWithOtp({
      email, options: { emailRedirectTo: location.origin + location.pathname, shouldCreateUser: true },
    });
    if (error) throw error;
  }
  async function verifyCode(email, token) {
    const { data, error } = await sb.auth.verifyOtp({ email, token, type: 'email' });
    if (error) throw error;
    await setUser(data.user);
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
    const { data, error } = await sb.from('tala_students').select('id,owner_email,data,updated_at').eq('deleted', false).order('owner_email');
    if (error) throw error;
    return data;
  }

  return {
    enabled, init, sendCode, verifyCode, signOut, sync, track, changed, removed, flushSoon, allStudents,
    get user() { return user; }, get admin() { return admin; }, get status() { return status; },
  };
})();
