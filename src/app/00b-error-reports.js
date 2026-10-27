
  // ---------------------------------------------------------------------
  // Error reports: what breaks on someone's phone lands in the app_errors
  // table (supabase/sql/app_errors.sql) - an uncaught error, a promise
  // nobody caught, or a failure the app itself logs with console.error -
  // with who, which build and which screen, so it can be fixed before
  // anyone has to tell. At most 15 a session, each kind once, none while
  // offline; reporting never throws on its own account.
  // ---------------------------------------------------------------------
  var errorReportsSent = 0;
  var errorReportsSeen = {};
  var ERROR_REPORTS_MAX = 15;
  var ERROR_NOISE = /ResizeObserver loop|^Script error\.?$|Load failed|Failed to fetch|NetworkError|network error|AbortError|The user aborted|Share canceled/i;
  function appBuildId() {
    var s = document.querySelector("script[src*='tasks-app.js']");
    var m = s && /[?&]v=([\w-]+)/.exec(s.getAttribute("src"));
    return m ? m[1] : "";
  }
  function reportAppError(kind, message, extra) {
    try {
      message = String(message || "").slice(0, 1000);
      if (!message || ERROR_NOISE.test(message)) return;
      if (errorReportsSent >= ERROR_REPORTS_MAX || navigator.onLine === false) return;
      var key = kind + "|" + message;
      if (errorReportsSeen[key]) return;
      errorReportsSeen[key] = true;
      if (typeof supabaseClient === "undefined" || !supabaseClient) return;
      errorReportsSent++;
      extra = extra || {};
      var row = {
        kind: kind,
        message: message,
        stack: String(extra.stack || "").slice(0, 4000) || null,
        source: extra.source ? String(extra.source).slice(0, 300) : null,
        line: extra.line || null,
        col: extra.col || null,
        build: appBuildId(),
        view: (typeof state !== "undefined" && state && state.viewMode) || null,
        phone: (typeof myPhoneNumber !== "undefined" && myPhoneNumber) || null,
        native: !!(window.Capacitor && window.Capacitor.isNativePlatform && window.Capacitor.isNativePlatform()),
        lang: typeof currentLang !== "undefined" ? currentLang : null,
        ua: navigator.userAgent.slice(0, 300)
      };
      Promise.resolve(supabaseClient.from("app_errors").insert(row)).then(function () {}, function () {});
    } catch (e) {}
  }
  window.addEventListener("error", function (e) {
    reportAppError("error", e.message || (e.error && e.error.message), {
      stack: e.error && e.error.stack, source: e.filename, line: e.lineno, col: e.colno
    });
  });
  window.addEventListener("unhandledrejection", function (e) {
    var r = e.reason;
    reportAppError("promise", (r && (r.message || r.error_description || r.error)) || String(r), { stack: r && r.stack });
  });
  // failures the app catches and logs: console.error("what failed:", err)
  (function () {
    var orig = console.error;
    console.error = function () {
      try {
        var parts = Array.prototype.map.call(arguments, function (a) {
          if (a && a.message) return a.message;
          if (a && typeof a === "object") { try { return JSON.stringify(a); } catch (e) { return String(a); } }
          return String(a);
        });
        var err = Array.prototype.find.call(arguments, function (a) { return a && a.stack; });
        reportAppError("logged", parts.join(" "), { stack: err && err.stack });
      } catch (e) {}
      return orig.apply(console, arguments);
    };
  })();
