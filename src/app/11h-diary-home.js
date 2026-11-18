  // ---------------------------------------------------------------------
  // The diary's home (#diaryView): the day's diary itself, as it's sent
  // (the same tables as its PDF - 13-meeting-reports-pdf.js) - and filled
  // from right here: each part under its icon and name, with "✎ עריכה" when
  // it has something, "+ הוספה" when not; the name opens the part's own
  // screen (the same buttons as before, same ids - 11-diary-site-log.js and
  // the others), and coming back shows the day again, up to date. Above it:
  // yesterday / tomorrow, open or closed, how much is filled, dictation;
  // under it, the log's actions.
  // ---------------------------------------------------------------------
  var diaryPrevDayBtn = document.getElementById("diaryPrevDayBtn");
  var diaryNextDayBtn = document.getElementById("diaryNextDayBtn");
  var diaryDictateBtn = document.getElementById("diaryDictateBtn");

  function diaryShiftISO(iso, days) {
    var p = iso.split("-");
    var d = new Date(+p[0], +p[1] - 1, +p[2] + days);
    return d.getFullYear() + "-" + String(d.getMonth() + 1).padStart(2, "0") + "-" + String(d.getDate()).padStart(2, "0");
  }
  function diaryWeekday(iso) {
    var p = iso.split("-");
    var locale = { he: "he-IL", en: "en-GB", ar: "ar", ru: "ru-RU" }[currentLang] || "he-IL";
    try { return new Date(+p[0], +p[1] - 1, +p[2]).toLocaleDateString(locale, { weekday: "long" }); } catch (e) { return ""; }
  }
  function diaryJoin(list) {
    return list.filter(function (x) { return String(x || "").trim(); }).join(", ");
  }

  // each part: what's in it today ("" when nothing)
  function diaryParts(log) {
    var people = [];
    SITE_LOG_ATTENDANCE_COLUMNS.forEach(function (c) {
      ((log.attendance || {})[c] || []).forEach(function (e) { people.push(e.name); });
    });
    var tools = [];
    SITE_LOG_TOOLS_COLUMNS.forEach(function (c) {
      var list = (log.tools || {})[c] || [];
      if (!list.length) return;
      var qty = list.reduce(function (s, e) { return s + (parseFloat(e.qty) || 1); }, 0);
      tools.push(tr("siteLogCol" + c.charAt(0).toUpperCase() + c.slice(1)) + (qty > 1 ? " ×" + qty : ""));
    });
    var photos = (log.photos || []).length;
    var planned = (log.planned || []).length;
    return [
      { id: "siteLogAttendanceBtn", sum: diaryJoin(people) },
      { id: "siteLogToolsBtn", sum: tools.join(", ") },
      { id: "siteLogContractorsBtn", sum: diaryJoin((log.contractors || []).map(function (e) { return e.name; })) },
      { id: "siteLogWorksBtn", sum: (log.works || []).map(function (e) { return e.text; }).filter(Boolean).join(" · ") },
      { id: "siteLogProcurementBtn", sum: diaryJoin((log.procurement || []).map(function (e) { return [e.item, e.quantity].filter(Boolean).join(" "); })) },
      { id: "siteLogPhotosBtn", sum: photos ? tr("diarySumPhotos").replace("{n}", photos) : "" },
      { id: "siteLogPlanBtn", sum: planned ? tr("diarySumPlanned").replace("{n}", planned) : "", emptyAction: "diaryUpdate" }
    ];
  }

  // a part's content, as its PDF shows it (the same table builders)
  function diaryDocBody(id, sheet, log, body) {
    if (id === "siteLogAttendanceBtn") body.appendChild(buildAttendanceTableElement(log, true));
    else if (id === "siteLogToolsBtn") body.appendChild(buildToolsTableElement(log, true));
    else if (id === "siteLogProcurementBtn") body.appendChild(buildProcurementTableElement(log, true));
    else if (id === "siteLogContractorsBtn") {
      filledContractors(log).forEach(function (c) {
        var line = document.createElement("div");
        line.className = "pdf-doc-contractor-line";
        line.textContent = c.name;
        body.appendChild(line);
      });
    } else if (id === "siteLogWorksBtn") {
      var frame = document.createElement("div");
      frame.className = "pdf-doc-works-frame";
      filledWorks(log).forEach(function (w) {
        var rowEl = document.createElement("div");
        rowEl.className = "pdf-doc-work-row";
        var textEl = document.createElement("div");
        textEl.className = "pdf-doc-work-row-text";
        textEl.textContent = w.text;
        rowEl.appendChild(textEl);
        if (w.attachment && isImageFile(w.attachment)) {
          var imgEl = document.createElement("img");
          imgEl.className = "pdf-doc-work-row-image";
          imgEl.src = w.attachment.url;
          rowEl.appendChild(imgEl);
        }
        frame.appendChild(rowEl);
      });
      body.appendChild(frame);
    } else if (id === "siteLogPhotosBtn") {
      var grid = document.createElement("div");
      grid.className = "pdf-doc-photos";
      (log.photos || []).forEach(function (p) {
        if (!p.url) return;
        var img = document.createElement("img");
        img.src = p.url;
        img.alt = "";
        img.addEventListener("click", function (e) { e.stopPropagation(); openImageViewer(p.url, p.name); });
        grid.appendChild(img);
      });
      body.appendChild(grid);
    } else if (id === "siteLogPlanBtn") {
      appendPlannedPdfSection(body, log);
      var heading = body.querySelector(".pdf-doc-section-heading");
      if (heading) heading.remove(); // (its name is the part's own, above)
    }
  }

  function renderDiaryHome() {
    var sheet = activeSheet();
    if (!sheet) return;
    // the project: its logo (or the X square - both open the logos), its
    // name and the sketch, at the top - and staying there while scrolling
    document.getElementById("diaryProjName").textContent = sheet.name;
    var logo = findLogo(sheet.logoId);
    var logoBtn = document.getElementById("diaryProjLogo");
    logoBtn.innerHTML = "";
    logoBtn.classList.toggle("empty", !logo);
    if (logo) {
      var img = document.createElement("img");
      img.src = logo.dataUrl;
      img.alt = "";
      logoBtn.appendChild(img);
    } else {
      logoBtn.textContent = "✕";
    }
    var day = activeSiteLogDate || state.viewDate;
    var log = getSiteLogOrEmpty(sheet, day);
    var number = log.number || nextSiteLogNumber(sheet, log);
    var today = todayISO();

    document.getElementById("diaryDocProject").textContent = sheet.name;
    document.getElementById("diaryDayTitle").textContent = tr("diaryDayTitle").replace("{n}", number);
    document.getElementById("diaryDaySub").textContent = isoToFullDisplay(day) + " - " + diaryWeekday(day);
    var weatherEl = document.getElementById("diaryDayWeather");
    weatherEl.hidden = !log.weather;
    weatherEl.textContent = log.weather ? tr("diaryWeatherLine").replace("{w}", log.weather) : "";
    var chip = document.getElementById("diaryDayChip");
    chip.textContent = tr(log.closed ? "diaryClosed" : "diaryOpen");
    chip.classList.toggle("closed", !!log.closed);

    var parts = diaryParts(log);
    var filled = parts.filter(function (x) { return x.sum; }).length;
    document.getElementById("diaryDayProgressText").textContent = tr("diaryFilled").replace("{n}", filled).replace("{total}", parts.length);
    document.getElementById("diaryDayBar").style.width = Math.round(filled * 100 / parts.length) + "%";

    diaryPrevDayBtn.textContent = "→";
    diaryPrevDayBtn.title = tr("diaryPrevDay").replace(/[→←]/g, "").trim();
    diaryNextDayBtn.textContent = "←";
    diaryNextDayBtn.title = tr("diaryNextDay").replace(/[→←]/g, "").trim();
    diaryNextDayBtn.disabled = day >= today; // a diary is for days that happened
    diaryDictateBtn.hidden = day !== today || !!log.closed;

    parts.forEach(function (x) {
      var sum = document.querySelector('[data-sum="' + x.id + '"]');
      var end = document.querySelector('[data-end="' + x.id + '"]');
      var row = document.getElementById(x.id);
      row.classList.toggle("filled", !!x.sum);
      sum.textContent = x.sum || tr("diaryNotFilled");
      end.className = "diary-row-end " + (x.sum ? "edit" : "add");
      end.textContent = x.sum ? tr("diaryEdit") : tr(x.emptyAction || "diaryAdd");
      // what's in it, as in the sent diary
      var body = document.querySelector('[data-doc="' + x.id + '"]');
      body.innerHTML = "";
      if (x.sum) {
        try { diaryDocBody(x.id, sheet, log, body); } catch (e) { body.textContent = x.sum; }
      } else {
        var none = document.createElement("div");
        none.className = "diary-sec-empty";
        none.textContent = tr("diaryNotFilled");
        body.appendChild(none);
      }
    });


    document.getElementById("diaryShareCaption").textContent = tr(log.closed ? "diaryActShare" : "diaryActShareAfter");
    if (!siteLogCloseBtn.disabled) siteLogCloseBtn.textContent = "✓ " + tr(log.closed ? "diaryCloseAgain" : "siteLogCloseBtn");
  }

  function diaryGoToDay(iso) {
    if (iso > todayISO()) return;
    state.viewDate = iso;
    render();
  }
  diaryPrevDayBtn.addEventListener("click", function () { diaryGoToDay(diaryShiftISO(activeSiteLogDate || state.viewDate, -1)); });
  diaryNextDayBtn.addEventListener("click", function () { diaryGoToDay(diaryShiftISO(activeSiteLogDate || state.viewDate, 1)); });

  document.getElementById("diaryProjLogo").addEventListener("click", function () { openLogoPickerModal(); });
  // (its toolbox: 14m-toolbox.js)

  // 🎤 הכתב ליומן: the assistant, already listening when the phone can
  diaryDictateBtn.addEventListener("click", function () {
    openAssistant();
    if (!assistantMicBtn.hidden) assistantMicBtn.click();
  });

  // back from any of its screens (they just unhide it): up to date again
  if (window.MutationObserver) {
    new MutationObserver(function () {
      if (!diaryView.hidden) renderDiaryHome();
    }).observe(diaryView, { attributes: true, attributeFilter: ["hidden"] });
  }

  // the project row pinned at the top: shaped as its own card while the list scrolls under it
  var diaryProjRow = document.querySelector(".diary-proj");
  diaryView.addEventListener("scroll", function () {
    diaryProjRow.classList.toggle("stuck", diaryView.scrollTop > 4);
  }, { passive: true });
