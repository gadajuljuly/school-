const CACHE = 'tala-v9';
const FILES = ['./', './index.html', './config.js', './cloud.js', './vendor/supabase-js-2.118.0.js', './materials.js', './xlsx.js', './app.js', './style.css', './manifest.json', './icon.svg'];
self.addEventListener('install', e => {
  e.waitUntil(caches.open(CACHE).then(c => c.addAll(FILES)));
  self.skipWaiting();
});
self.addEventListener('activate', e => {
  e.waitUntil(caches.keys().then(keys => Promise.all(keys.filter(k => k !== CACHE).map(k => caches.delete(k)))));
  self.clients.claim();
});
// Network first, so updates arrive; cache as an offline fallback.
self.addEventListener('fetch', e => {
  if (e.request.method !== 'GET') return;
  // Only this app's own files; server (Supabase) requests go straight to the network.
  if (new URL(e.request.url).origin !== self.location.origin) return;
  e.respondWith(
    fetch(e.request).then(r => {
      const copy = r.clone();
      caches.open(CACHE).then(c => c.put(e.request, copy));
      return r;
    }).catch(() => caches.match(e.request))
  );
});
