self.addEventListener("install", () => {
  self.skipWaiting();
});

self.addEventListener("activate", (event) => {
  event.waitUntil(self.clients.claim());
});

self.addEventListener("fetch", () => {
  // بدون تخزين مؤقّت — التطبيق يحتاج اتصالًا مباشرًا بقاعدة البيانات المركزية.
  // وجود هذا المعالج كافٍ لجعل التطبيق قابلًا للتثبيت على الشاشة الرئيسية.
});
