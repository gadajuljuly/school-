
  // ---------------------------------------------------------------------
  // On a computer: installing ITASK as an app (its own window, an icon on
  // the desktop). A browser never installs on its own - Chrome / Edge
  // offer it (beforeinstallprompt) and need one click, then the user's OK
  // in their own dialog. So: a bar at the top says so, and the first click
  // anywhere on the page opens that dialog (once per visit; "✕" puts it
  // off for good). Not in the phone app, nor once installed.
  // ---------------------------------------------------------------------
  var INSTALL_OFF_KEY = "itask-install-off";
  var installPrompt = null;
  var installBar = document.getElementById("installBar");
  var installAsked = false;

  function installWanted() {
    var nativeApp = window.Capacitor && window.Capacitor.isNativePlatform && window.Capacitor.isNativePlatform();
    var installed = window.matchMedia && window.matchMedia("(display-mode: standalone)").matches;
    var off = false;
    try { off = localStorage.getItem(INSTALL_OFF_KEY) === "1"; } catch (e) {}
    return !nativeApp && !installed && !off;
  }
  function askInstall() {
    if (!installPrompt || installAsked) return;
    installAsked = true;
    var p = installPrompt;
    installPrompt = null;
    p.prompt();
    p.userChoice.then(function (choice) {
      if (choice && choice.outcome === "accepted") installBar.hidden = true;
    }, function () {});
  }
  window.addEventListener("beforeinstallprompt", function (e) {
    if (!installWanted()) return;
    e.preventDefault(); // (the bar asks instead of the browser's own mini-prompt)
    installPrompt = e;
    installBar.hidden = false;
  });
  window.addEventListener("appinstalled", function () { installBar.hidden = true; });
  document.getElementById("installBtn").addEventListener("click", function (e) {
    e.stopPropagation();
    installAsked = false;
    askInstall();
  });
  document.getElementById("installOffBtn").addEventListener("click", function (e) {
    e.stopPropagation();
    installBar.hidden = true;
    installPrompt = null;
    try { localStorage.setItem(INSTALL_OFF_KEY, "1"); } catch (err) {}
  });
  // the first click anywhere opens the install dialog
  // (not the bar's own buttons: "✕" must not open it)
  document.addEventListener("click", function (e) {
    if (installBar.contains(e.target)) return;
    if (installPrompt && !installBar.hidden) askInstall();
  }, true);
