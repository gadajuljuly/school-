
  // ---------------------------------------------------------------------
  // The floating task (app version 25+, ItaskFloatReceiver): every quarter
  // hour from 06:00 to 18:00 an open task of the next project shows over
  // the screen for 8 seconds. It runs on its own once the phone lets ITASK
  // "display over other apps" - asked for once, when the app first opens
  // with it; the switch (and that permission, if still missing) is in the
  // menu. Its tasks are the home-screen widget's list (syncNativeWidget).
  // ---------------------------------------------------------------------
  var FLOAT_ASKED_KEY = "itask-float-asked";
  var floatSupported = false;
  var floatMenuSection = document.getElementById("floatMenuSection");
  var floatToggle = document.getElementById("floatToggle");
  var floatAllowBtn = document.getElementById("floatAllowBtn");

  function refreshFloatStatus(askIfMissing) {
    if (!floatSupported) return;
    nativeTaskAlarmPlugin.floatStatus().then(function (st) {
      floatMenuSection.hidden = false;
      floatToggle.checked = !!st.on;
      floatAllowBtn.hidden = !st.on || !!st.canDraw;
      if (!askIfMissing || !st.on || st.canDraw) return;
      var asked = false;
      try { asked = !!localStorage.getItem(FLOAT_ASKED_KEY); localStorage.setItem(FLOAT_ASKED_KEY, "1"); } catch (e) {}
      if (!asked) askConfirm(tr("floatAsk"), openFloatSettings);
    }).catch(function () {});
  }
  function openFloatSettings() {
    nativeTaskAlarmPlugin.openFloatSettings().catch(function () {});
  }
  // once the app is up (from syncNativeWidget, after the data has loaded)
  var floatStarted = false;
  function startFloatingTask() {
    if (floatStarted || !nativeTaskAlarmPlugin || !nativeTaskAlarmPlugin.features) return;
    floatStarted = true;
    nativeTaskAlarmPlugin.features().then(function (f) {
      floatSupported = !!(f && f.floatingTask);
      refreshFloatStatus(true);
    }).catch(function () {});
  }
  floatToggle.addEventListener("change", function () {
    if (!floatSupported) return;
    nativeTaskAlarmPlugin.setFloatOn({ on: floatToggle.checked }).then(function () {
      refreshFloatStatus(false);
    }).catch(function () {});
  });
  floatAllowBtn.addEventListener("click", openFloatSettings);
  // back from the phone's settings
  document.addEventListener("visibilitychange", function () {
    if (!document.hidden) refreshFloatStatus(false);
  });
