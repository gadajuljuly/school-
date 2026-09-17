var CACHE_NAME = "tasks-app-v5";
var CORE_ASSETS = [
  "./tasks.html",
  "./tasks-manifest.json",
  "./tasks-icon-192.png",
  "./tasks-icon-512.png"
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
      fetch(event.request).then(function (response) {
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
  var payload = { title: "פרויקטי משימות", body: "יש לך משימה שלא הושלמה" };
  if (event.data) {
    try { payload = event.data.json(); } catch (e) {}
  }
  event.waitUntil(
    self.registration.showNotification(payload.title, {
      body: payload.body,
      icon: "./tasks-icon-192.png",
      badge: "./tasks-icon-192.png",
      tag: "task-reminder"
    }).then(function () {
      return new Promise(function (resolve) {
        setTimeout(function () {
          self.registration.getNotifications({ tag: "task-reminder" }).then(function (notifications) {
            notifications.forEach(function (n) { n.close(); });
            resolve();
          });
        }, 5000);
      });
    })
  );
});

self.addEventListener("notificationclick", function (event) {
  event.notification.close();
  event.waitUntil(
    self.clients.matchAll({ type: "window", includeUncontrolled: true }).then(function (clientList) {
      for (var i = 0; i < clientList.length; i++) {
        if ("focus" in clientList[i]) return clientList[i].focus();
      }
      if (self.clients.openWindow) return self.clients.openWindow("./tasks.html");
    })
  );
});
