  // ---------------------------------------------------------------------
  // The diary as a binder: tabs down its left side - "יומן" (the day's
  // whole diary, 11h-diary-home.js), then each part by its icon:
  // attendance, tools, contractors, works, procurement, photos, planned vs
  // done. A tab opens its page right there, in the binder, beside the tabs
  // (each page is still its own view - 11-diary-site-log.js and the
  // others - only placed inside the binder instead of over the screen).
  // A green dot on a tab: that part is filled today.
  // ---------------------------------------------------------------------
  var DIARY_TABS = [
    { key: "home" },
    { key: "attendance", btn: "siteLogAttendanceBtn", view: "siteLogAttendanceView" },
    { key: "tools", btn: "siteLogToolsBtn", view: "siteLogToolsView" },
    { key: "contractors", btn: "siteLogContractorsBtn", view: "siteLogContractorsView" },
    { key: "works", btn: "siteLogWorksBtn", view: "siteLogWorksView" },
    { key: "procurement", btn: "siteLogProcurementBtn", view: "siteLogProcurementView" },
    { key: "photos", btn: "siteLogPhotosBtn", view: "diaryPhotosView" },
    { key: "plan", btn: "siteLogPlanBtn", view: "siteLogPlanView" }
  ];
  var diaryTabsEl = document.createElement("nav");
  diaryTabsEl.className = "diary-tabs";
  diaryTabsEl.id = "diaryTabs";
  diaryTabsEl.hidden = true;
  document.body.appendChild(diaryTabsEl);
  var diaryBinder = null; // where the binder's pages go (measured off the diary)
  // (each page: placed in the binder while the tabs show - tasks.css)
  setTimeout(function () {
    DIARY_TABS.forEach(function (t) { var v = diaryTabView(t); if (v) v.classList.add("binder-page"); });
  }, 0);

  DIARY_TABS.forEach(function (t) {
    var b = document.createElement("button");
    b.type = "button";
    b.className = "diary-tab";
    b.setAttribute("data-tab", t.key);
    if (t.key === "home") {
      b.classList.add("diary-tab-home");
      b.innerHTML = "<span class='diary-tab-book'>📖</span>";
      var cap = document.createElement("small");
      cap.setAttribute("data-i18n", "diaryTabHome");
      cap.textContent = tr("diaryTabHome");
      b.appendChild(cap);
      b.title = tr("diaryTabHome");
    } else {
      var row = document.getElementById(t.btn);
      var icon = row && row.querySelector("img");
      var img = document.createElement("img");
      img.alt = "";
      img.src = icon ? icon.getAttribute("src") : "";
      b.appendChild(img);
      var title = row && row.querySelector("b");
      b.title = title ? title.textContent : "";
      var dot = document.createElement("i");
      dot.className = "diary-tab-dot";
      b.appendChild(dot);
    }
    b.addEventListener("click", function () { openDiaryTab(t.key); });
    diaryTabsEl.appendChild(b);
  });

  function diaryTabView(t) { return t.view ? document.getElementById(t.view) : null; }
  function diaryOpenTab() {
    for (var i = 1; i < DIARY_TABS.length; i++) {
      var v = diaryTabView(DIARY_TABS[i]);
      if (v && !v.hidden) return DIARY_TABS[i];
    }
    return diaryView.hidden ? null : DIARY_TABS[0];
  }
  function closeDiaryTabViews(except) {
    DIARY_TABS.forEach(function (t) {
      var v = diaryTabView(t);
      if (v && v !== except && !v.hidden) v.hidden = true;
    });
  }
  function openDiaryTab(key) {
    var t = DIARY_TABS.find(function (x) { return x.key === key; });
    if (!t) return;
    var current = diaryOpenTab();
    if (current && current.key === key) return;
    closeDiaryTabViews();
    if (t.key === "home") {
      diaryView.hidden = false;
      return;
    }
    // the part's own opening (it fills its page and hides the diary)
    diaryView.hidden = false;
    var row = document.getElementById(t.btn);
    if (row) row.click();
    // the photos' page opens over the diary: the diary under it goes too
    if (t.key === "photos") diaryView.hidden = true;
  }
  // ...and comes back with the photos' back button
  document.getElementById("diaryPhotosBackBtn").addEventListener("click", function () {
    if (state.viewMode === "diary") diaryView.hidden = false;
  });

  // the binder: below the project's row, beside the tabs, above the footer
  function measureDiaryBinder() {
    if (diaryView.hidden) return;
    var r = diaryView.getBoundingClientRect();
    if (!r.width) return;
    var proj = diaryView.querySelector(".diary-proj");
    var pr = proj ? proj.getBoundingClientRect() : null;
    // tabs from under the project's row; a part's page from its top (its own head names the project)
    diaryBinder = { top: Math.round(pr ? pr.top : r.top), tabsTop: Math.round(pr ? pr.bottom : r.top), left: Math.round(r.left), right: Math.round(r.right), bottom: Math.round(r.bottom) };
  }
  function placeDiaryBinder() {
    if (!diaryBinder) return;
    var b = diaryBinder;
    diaryTabsEl.style.top = (b.tabsTop + 6) + "px";
    diaryTabsEl.style.left = b.left + "px";
    diaryTabsEl.style.height = Math.max(0, b.bottom - b.tabsTop - 6) + "px";
    DIARY_TABS.forEach(function (t) {
      var v = diaryTabView(t);
      if (!v) return;
      v.style.setProperty("--binder-top", b.top + "px");
      v.style.setProperty("--binder-left", b.left + "px");
      v.style.setProperty("--binder-right", (window.innerWidth - b.right) + "px");
      v.style.setProperty("--binder-bottom", (window.innerHeight - b.bottom) + "px");
    });
  }
  var diaryTabsQueued = false;
  function updateDiaryTabs() {
    if (diaryTabsQueued) return;
    diaryTabsQueued = true;
    requestAnimationFrame(function () {
      diaryTabsQueued = false;
      var open = diaryOpenTab();
      measureDiaryBinder();
      // only while the diary (or one of its pages) is what's on screen
      var show = !!open && !!diaryBinder && !diaryTabsCovered(open);
      diaryTabsEl.hidden = !show;
      document.body.classList.toggle("diary-binder-on", show);
      if (!show) return;
      placeDiaryBinder();
      diaryTabsEl.querySelectorAll(".diary-tab").forEach(function (b) {
        var key = b.getAttribute("data-tab");
        b.classList.toggle("on", key === open.key);
        var t = DIARY_TABS.find(function (x) { return x.key === key; });
        var row = t && t.btn && document.getElementById(t.btn);
        b.classList.toggle("filled", !!(row && row.classList.contains("filled")));
      });
    });
  }
  // another screen over the diary (the preview, a tool, the assistant...)
  function diaryTabsCovered(open) {
    var own = DIARY_TABS.map(diaryTabView).filter(Boolean);
    var views = document.querySelectorAll(".report-view:not([hidden]), .sketch-view:not([hidden])");
    for (var i = 0; i < views.length; i++) {
      if (own.indexOf(views[i]) === -1) return true;
    }
    return false;
  }
  if (window.MutationObserver) {
    new MutationObserver(updateDiaryTabs).observe(document.body, { attributes: true, attributeFilter: ["hidden", "class"], subtree: true });
  }
  window.addEventListener("resize", function () { diaryBinder = null; updateDiaryTabs(); });
  diaryView.addEventListener("scroll", updateDiaryTabs, { passive: true });
