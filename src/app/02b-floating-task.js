
  // ---------------------------------------------------------------------
  // The floating task (app version 25+, ItaskFloatReceiver): an open task
  // of the next project shows over the screen for 8 seconds - every quarter
  // hour from 06:00 to 18:00, every half hour the rest of the day. It runs on its own once the phone lets ITASK
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
      startAssistantBubble(f);
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
    if (!document.hidden) { refreshFloatStatus(false); refreshBubbleStatus(); }
  });

  // ---- the assistant's floating bubble (app version 29+, ItaskBubbleService):
  // the ITASK mark over every app; a tap opens the assistant chat (launch
  // view "chat"). Off until switched on - offered once, here or in the menu;
  // it needs the same "display over other apps" permission.
  var BUBBLE_ASKED_KEY = "itask-bubble-asked";
  var bubbleSupported = false;
  var bubbleMenuSection = document.getElementById("bubbleMenuSection");
  var bubbleToggle = document.getElementById("bubbleToggle");
  function refreshBubbleStatus() {
    if (!bubbleSupported) return;
    nativeTaskAlarmPlugin.bubbleStatus().then(function (st) {
      bubbleMenuSection.hidden = false;
      bubbleToggle.checked = !!st.on;
    }).catch(function () {});
  }
  function setBubbleOn(on) {
    return nativeTaskAlarmPlugin.setBubbleOn({ on: on }).then(function () {
      if (!on) return refreshBubbleStatus();
      return nativeTaskAlarmPlugin.bubbleStatus().then(function (st) {
        if (!st.canDraw) openFloatSettings(); // it shows once that's allowed
        refreshBubbleStatus();
      });
    }).catch(function () {});
  }
  function startAssistantBubble(features) {
    bubbleSupported = !!(features && features.assistantBubble);
    if (!bubbleSupported) return;
    refreshBubbleStatus();
    nativeTaskAlarmPlugin.bubbleStatus().then(function (st) {
      var asked = false;
      try { asked = !!localStorage.getItem(BUBBLE_ASKED_KEY); } catch (e) {}
      // (another question already on screen - e.g. the floating task's
      // first-time one: this one waits for the next time the app opens)
      if (asked || st.on || !document.getElementById("confirmOverlay").hidden) return;
      try { localStorage.setItem(BUBBLE_ASKED_KEY, "1"); } catch (e) {}
      askConfirm(tr("bubbleAsk"), function () { setBubbleOn(true); });
    }).catch(function () {});
  }
  bubbleToggle.addEventListener("change", function () {
    if (bubbleSupported) setBubbleOn(bubbleToggle.checked);
  });
