// ITASK
// © 2026 Ahmad Juljoly. All rights reserved.
var CACHE_NAME = "tasks-app-v62";
var CORE_ASSETS = [
  "./tasks.html",
  "./tasks-manifest.json",
  "./tasks-icon-192.png",
  "./tasks-icon-512.png",
  "./tasks-badge-96.png",
  "./tasks-library-icon.webp",
  "./tasks-chat-icon.webp",
  "./tasks-report-icon.webp",
  "./tasks-menu-icon.webp",
  "./tasks-plus-icon.webp",
  "./tasks-calendar-icon.webp",
  "./tasks-attendance-icon.webp",
  "./tasks-tools-icon.webp",
  "./tasks-contractors-icon.webp",
  "./tasks-works-icon.webp",
  "./tasks-procurement-icon.webp",
  "./vendor/html2canvas.min.js",
  "./vendor/jspdf.umd.min.js"
];

self.addEventListener("install", function (event) {
  self.skipWaiting();
  event.waitUntil(
    caches.open(CACHE_NAME).then(function (cache) {
      return cache.addAll(CORE_ASSETS);
    })
  );
});

self.addEventListener("activate", function (event) {
  event.waitUntil(
    caches.keys().then(function (keys) {
      return Promise.all(
        keys.filter(function (key) { return key !== CACHE_NAME; })
          .map(function (key) { return caches.delete(key); })
      );
    }).then(function () { return self.clients.claim(); })
  );
});

self.addEventListener("fetch", function (event) {
  if (event.request.method !== "GET") return;
  var isSameOrigin = event.request.url.indexOf(self.location.origin) === 0;

  // The HTML page itself: always try the network first so a new deploy
  // shows up immediately; fall back to the cached copy only when offline.
  if (event.request.mode === "navigate" || event.request.destination === "document") {
    event.respondWith(
      fetch(event.request, { cache: "no-store" }).then(function (response) {
        if (response && response.ok && isSameOrigin) {
          var copy = response.clone();
          caches.open(CACHE_NAME).then(function (cache) { cache.put(event.request, copy); });
        }
        return response;
      }).catch(function () {
        return caches.match(event.request).then(function (cached) {
          return cached || caches.match("./tasks.html");
        });
      })
    );
    return;
  }

  // Static assets (manifest, icons, fonts): serve from cache instantly,
  // refresh the cache in the background for next time.
  event.respondWith(
    caches.match(event.request).then(function (cached) {
      var network = fetch(event.request).then(function (response) {
        if (response && response.ok && isSameOrigin) {
          var copy = response.clone();
          caches.open(CACHE_NAME).then(function (cache) { cache.put(event.request, copy); });
        }
        return response;
      }).catch(function () {
        return cached;
      });
      return cached || network;
    })
  );
});

self.addEventListener("push", function (event) {
  var payload = { title: "ITASK", body: "יש לך משימה שלא הושלמה" };
  if (event.data) {
    try { payload = event.data.json(); } catch (e) {}
  }
  event.waitUntil(
    self.registration.showNotification(payload.title, {
      body: payload.body,
      icon: "./tasks-icon-192.png",
      // Android masks this into a plain white silhouette for the status
      // bar/collapsed view using only its alpha channel - the full-color
      // square icon has no transparency at all, so it was rendering as an
      // unrecognizable blank blob there. This is a dedicated, already-
      // transparent monochrome cutout of the "X" glyph instead.
      badge: "./tasks-badge-96.png",
      tag: "task-reminder",
      renotify: true,
      data: payload.data || null
    })
  );
});

self.addEventListener("notificationclick", function (event) {
  event.notification.close();
  var taskData = event.notification.data || {};
  var url = "./tasks.html";
  if (taskData.sheetId || taskData.date || taskData.taskId || taskData.chat || taskData.projectInvite) {
    var params = new URLSearchParams();
    if (taskData.sheetId) params.set("sheet", taskData.sheetId);
    if (taskData.date) params.set("date", taskData.date);
    if (taskData.taskId) params.set("task", taskData.taskId);
    if (taskData.chat) params.set("chat", "1");
    if (taskData.projectInvite) params.set("invite", "1");
    url = "./tasks.html?" + params.toString();
  }
  var targetUrl = new URL(url, self.location.href).href;
  event.waitUntil(
    self.clients.matchAll({ type: "window", includeUncontrolled: true }).then(function (clientList) {
      for (var i = 0; i < clientList.length; i++) {
        var client = clientList[i];
        if ("focus" in client) {
          client.postMessage({
            type: "navigate-task",
            sheetId: taskData.sheetId,
            date: taskData.date,
            taskId: taskData.taskId,
            chat: taskData.chat,
            projectInvite: taskData.projectInvite
          });
          return client.focus();
        }
      }
      return self.clients.openWindow(targetUrl);
    }).catch(function () {
      return self.clients.openWindow(targetUrl);
    })
  );
});
