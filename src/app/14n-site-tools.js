  // ---------------------------------------------------------------------
  // The toolbox's site tools (14m-toolbox.js):
  //  - מדידה: a tape in the camera (the phone app's own ARCore screen,
  //    version 33+ - ItaskMeasureActivity.java), slope and a bubble level
  //    (the phone's tilt sensor);
  //  - מצלמת אתר: a photo straight into today's diary (11b-diary-photos.js);
  //  - תחזית לאתר: the week's weather at the site, with what it means for
  //    the work (concrete, asphalt, cranes, heat);
  //  - מדידה על מפה: a distance or an area on the satellite map.
  // ---------------------------------------------------------------------

  // ---- 🌦 the site's forecast -------------------------------------------------
  var weatherToolView = document.getElementById("weatherToolView");
  function siteLocation(sheet) {
    return diaryPhoneLocation().then(function (loc) {
      if (loc) return { lat: loc.lat, lon: loc.lon, here: true };
      return diarySitePlace(sheet);
    });
  }
  function wtDayName(iso, i) {
    if (i === 0) return tr("wtToday");
    return diaryWeekday(iso);
  }
  // what the day means for the work
  function wtWarnings(d) {
    var w = [];
    if (d.rainP >= 50 || d.rain >= 1) w.push({ k: "rain", t: tr("wtWarnRain") });
    if (d.gust >= 50 || d.wind >= 40) w.push({ k: "wind", t: tr("wtWarnWind") });
    if (d.max >= 35) w.push({ k: "heat", t: tr("wtWarnHeat") });
    if (d.min <= 5) w.push({ k: "cold", t: tr("wtWarnCold") });
    return w;
  }
  function renderWeatherTool(res, loc) {
    var place = document.getElementById("weatherToolPlace");
    place.textContent = loc.here ? tr("wtHere") : tr("wtAt").replace("{place}", loc.name || "");
    // the next 24 hours, hour by hour
    var hoursEl = document.getElementById("weatherToolHours");
    hoursEl.innerHTML = "";
    var h = res.hourly || {}, now = Date.now(), shown = 0;
    (h.time || []).forEach(function (t, i) {
      if (shown >= 24 || new Date(t).getTime() < now - 3600000) return;
      shown++;
      var cell = document.createElement("div");
      cell.className = "wt-hour";
      var sign = diaryWeatherWords(h.weather_code[i]).sign;
      cell.innerHTML = "<b></b><span class='wt-sign'></span><span class='wt-t'></span><span class='wt-rp'></span><span class='wt-w'></span>";
      cell.children[0].textContent = t.slice(11, 16);
      cell.children[1].textContent = sign;
      cell.children[2].textContent = Math.round(h.temperature_2m[i]) + "°";
      cell.children[3].textContent = h.precipitation_probability[i] ? "☂" + h.precipitation_probability[i] + "%" : "";
      cell.children[4].textContent = h.wind_speed_10m ? "💨" + Math.round(h.wind_speed_10m[i]) : "";
      if (t.slice(11, 13) === "00") cell.classList.add("wt-midnight"); // a new day starts
      hoursEl.appendChild(cell);
    });
    // the week
    var daysEl = document.getElementById("weatherToolDays");
    daysEl.innerHTML = "";
    var d = res.daily || {};
    (d.time || []).forEach(function (iso, i) {
      var day = {
        code: d.weather_code[i], max: d.temperature_2m_max[i], min: d.temperature_2m_min[i],
        rain: d.precipitation_sum[i] || 0, rainP: d.precipitation_probability_max[i] || 0,
        wind: d.wind_speed_10m_max[i] || 0, gust: d.wind_gusts_10m_max[i] || 0
      };
      var words = diaryWeatherWords(day.code);
      var card = document.createElement("div");
      card.className = "wt-day";
      var top = document.createElement("div");
      top.className = "wt-day-top";
      var name = document.createElement("div");
      name.className = "wt-day-name";
      name.textContent = wtDayName(iso, i) + " · " + isoToDisplay(iso);
      var temp = document.createElement("div");
      temp.className = "wt-day-temp";
      temp.textContent = words.sign + " " + Math.round(day.max) + "° / " + Math.round(day.min) + "°";
      top.appendChild(name);
      top.appendChild(temp);
      card.appendChild(top);
      var sub = document.createElement("div");
      sub.className = "wt-day-sub";
      sub.textContent = words.words + " · " + tr("wtRain") + " " + day.rainP + "%" + (day.rain >= 0.1 ? " (" + day.rain.toFixed(1) + " מ\"מ)" : "") +
        " · " + tr("wtWind") + " " + Math.round(day.wind) + " קמ\"ש";
      card.appendChild(sub);
      var warns = wtWarnings(day);
      var chips = document.createElement("div");
      chips.className = "wt-chips";
      (warns.length ? warns : [{ k: "good", t: tr("wtGood") }]).forEach(function (w) {
        var c = document.createElement("span");
        c.className = "wt-chip " + w.k;
        c.textContent = w.t;
        chips.appendChild(c);
      });
      card.appendChild(chips);
      daysEl.appendChild(card);
    });
  }
  function openWeatherTool() {
    var sheet = activeSheet();
    if (!sheet) return;
    weatherToolView.hidden = false;
    document.getElementById("weatherToolPlace").textContent = tr("wtLoading");
    document.getElementById("weatherToolHours").innerHTML = "";
    document.getElementById("weatherToolDays").innerHTML = "";
    siteLocation(sheet).then(function (loc) {
      if (!loc) { document.getElementById("weatherToolPlace").textContent = tr("wtNoPlace"); return; }
      return fetch("https://api.open-meteo.com/v1/forecast?latitude=" + loc.lat + "&longitude=" + loc.lon +
        "&daily=weather_code,temperature_2m_max,temperature_2m_min,precipitation_sum,precipitation_probability_max,wind_speed_10m_max,wind_gusts_10m_max" +
        "&hourly=temperature_2m,precipitation_probability,weather_code,wind_speed_10m&timezone=auto&forecast_days=7")
        .then(function (r) { if (!r.ok) throw new Error("http " + r.status); return r.json(); })
        .then(function (res) { renderWeatherTool(res, loc); });
    }).catch(function () {
      document.getElementById("weatherToolPlace").textContent = tr("wtFailed");
    });
  }
  document.getElementById("weatherToolBackBtn").addEventListener("click", function () { weatherToolView.hidden = true; });

  // ---- 📷 the site camera: straight into today's diary --------------------------
  var toolboxCameraInput = document.getElementById("toolboxCameraInput");
  function openSiteCamera() {
    var sheet = activeSheet();
    if (!sheet) return;
    var log = findSiteLog(sheet, todayISO());
    if (log && log.closed) { showToast(tr("toolCameraClosed"), 3500); return; }
    toolboxCameraInput.click();
  }
  toolboxCameraInput.addEventListener("change", function () {
    var files = Array.prototype.slice.call(toolboxCameraInput.files || []);
    toolboxCameraInput.value = "";
    if (files.length) diaryAddPhotos(files, todayISO());
  });

  // ---- 📐 measuring: the camera tape, slope, level ------------------------------
  var levelToolView = document.getElementById("levelToolView");
  var lv = { tab: "slope", hold: false, zero: { x: 0, y: 0 }, x: 0, y: 0, g: null, listening: false, seen: false };
  var LV_ZERO_KEY = "itask-level-zero";
  try { lv.zero = JSON.parse(localStorage.getItem(LV_ZERO_KEY) || "null") || lv.zero; } catch (e) {}
  function lvDeg(r) { return r * 180 / Math.PI; }
  function lvFmt(n) { return (Math.round(n * 10) / 10).toFixed(1); }
  // the phone's gravity -> its tilt along its width (x) and length (y), smoothed
  function lvOnMotion(e) {
    var a = e.accelerationIncludingGravity;
    if (!a || a.x === null || a.z === null) return;
    lv.seen = true;
    var k = 0.15; // low-pass: steady numbers
    if (!lv.g) lv.g = { x: a.x, y: a.y, z: a.z };
    lv.g.x += (a.x - lv.g.x) * k; lv.g.y += (a.y - lv.g.y) * k; lv.g.z += (a.z - lv.g.z) * k;
    if (!lv.hold) lvRender();
  }
  function lvAngles() {
    var g = lv.g || { x: 0, y: 0, z: 9.81 };
    var n = Math.sqrt(g.x * g.x + g.y * g.y + g.z * g.z) || 9.81;
    var flat = Math.abs(g.z) / n > 0.5; // lying on a surface, or standing on an edge
    if (flat) {
      return { flat: true, x: lvDeg(Math.atan2(g.x, Math.abs(g.z))) - lv.zero.x, y: lvDeg(Math.atan2(g.y, Math.abs(g.z))) - lv.zero.y };
    }
    // on an edge: how far the edge is from level / plumb (the screen's own rotation)
    var rot = lvDeg(Math.atan2(g.x, g.y)); // 0: upright
    var off = ((rot % 90) + 90) % 90;
    if (off > 45) off -= 90;
    return { flat: false, edge: off };
  }
  function lvRender() {
    var a = lvAngles();
    if (lv.tab === "level") {
      var x = a.flat ? a.x : 0, y = a.flat ? a.y : 0;
      document.getElementById("lvAxisX").textContent = "↔ " + lvFmt(Math.abs(x)) + "°";
      document.getElementById("lvAxisY").textContent = "↕ " + lvFmt(Math.abs(y)) + "°";
      var max = 10, r = 177; // ±10°: the bubble at the rim (in its own widths: 39% of the vial / its 22%)
      var bx = Math.max(-1, Math.min(1, -x / max)) * r, by = Math.max(-1, Math.min(1, y / max)) * r;
      var bubble = document.getElementById("lvBubble");
      bubble.style.transform = "translate(" + bx.toFixed(1) + "%, " + by.toFixed(1) + "%)";
      document.getElementById("lvVial").classList.toggle("ok", Math.abs(x) < 0.3 && Math.abs(y) < 0.3);
      return;
    }
    if (lv.tab !== "slope") return;
    var deg, dir = null;
    if (a.flat) {
      var tx = Math.tan(a.x * Math.PI / 180), ty = Math.tan(a.y * Math.PI / 180);
      deg = lvDeg(Math.atan(Math.sqrt(tx * tx + ty * ty)));
      dir = lvDeg(Math.atan2(-ty, tx)); // downhill, on the screen
      document.getElementById("lvSlopeHint").textContent = tr("lvSlopeFlat");
    } else {
      deg = Math.abs(a.edge);
      document.getElementById("lvSlopeHint").textContent = tr("lvSlopeEdge");
    }
    var pct = Math.tan(deg * Math.PI / 180) * 100;
    document.getElementById("lvSlopeDeg").textContent = lvFmt(deg) + "°";
    document.getElementById("lvSlopePct").textContent = lvFmt(pct) + "%";
    document.getElementById("lvSlopeMm").textContent = tr("lvSlopeMm").replace("{n}", lvFmt(pct));
    var arrow = document.getElementById("lvSlopeArrow");
    arrow.style.visibility = dir !== null && deg >= 0.2 ? "visible" : "hidden";
    if (dir !== null) arrow.style.transform = "rotate(" + Math.round(dir) + "deg)";
    document.getElementById("lvPaneSlope").classList.toggle("ok", deg < 0.3);
  }
  function lvListen() {
    if (lv.listening) return;
    var start = function () {
      lv.listening = true;
      window.addEventListener("devicemotion", lvOnMotion);
      // no sensor (a computer): said after a moment
      setTimeout(function () { document.getElementById("lvNoSensor").hidden = lv.seen || levelToolView.hidden; }, 1500);
    };
    // iPhone: the motion sensor needs a yes, asked from the tap
    if (window.DeviceMotionEvent && typeof DeviceMotionEvent.requestPermission === "function") {
      DeviceMotionEvent.requestPermission().then(start, start);
    } else start();
  }
  function lvStop() {
    lv.listening = false;
    window.removeEventListener("devicemotion", lvOnMotion);
  }
  function lvShowTab(tab) {
    lv.tab = tab;
    document.querySelectorAll(".lv-tab").forEach(function (b) { b.classList.toggle("on", b.getAttribute("data-lv") === tab); });
    document.getElementById("lvPaneAr").hidden = tab !== "ar";
    document.getElementById("lvPaneSlope").hidden = tab !== "slope";
    document.getElementById("lvPaneLevel").hidden = tab !== "level";
    document.getElementById("lvFoot").hidden = tab === "ar";
    if (tab === "ar") { document.getElementById("lvNoSensor").hidden = true; lvArPrepare(); }
    else { lvListen(); lvRender(); }
  }
  function openMeasureTool() {
    lv.hold = false;
    document.getElementById("lvHoldBtn").textContent = tr("lvHold");
    levelToolView.hidden = false;
    lvShowTab(lv.tab);
  }
  document.querySelectorAll(".lv-tab").forEach(function (b) {
    b.addEventListener("click", function () { lvShowTab(b.getAttribute("data-lv")); });
  });
  document.getElementById("levelToolBackBtn").addEventListener("click", function () {
    levelToolView.hidden = true;
    lvStop();
  });
  document.getElementById("lvHoldBtn").addEventListener("click", function () {
    lv.hold = !lv.hold;
    this.textContent = tr(lv.hold ? "lvRelease" : "lvHold");
    if (!lv.hold) lvRender();
  });
  // calibrate: this surface is now zero (a phone's sensor is often a little off)
  document.getElementById("lvZeroBtn").addEventListener("click", function () {
    lv.zero = { x: 0, y: 0 };
    var a = lvAngles();
    if (!a.flat) return;
    lv.zero = { x: a.x, y: a.y };
    try { localStorage.setItem(LV_ZERO_KEY, JSON.stringify(lv.zero)); } catch (e) {}
    showToast(tr("lvZeroed"));
    lvRender();
  });

  // the camera tape: the phone app's own screen (ARCore), version 33+
  var lvArResults = [];
  function lvArFeatures() {
    var plugin = nativeTaskAlarmPlugin;
    if (!plugin || typeof plugin.features !== "function") return Promise.resolve(null);
    return plugin.features().catch(function () { return {}; });
  }
  function lvArPrepare() {
    var text = document.getElementById("lvArText");
    text.textContent = tr("lvArText");
    renderLvArResults();
  }
  function renderLvArResults() {
    var el = document.getElementById("lvArResults");
    el.innerHTML = "";
    lvArResults.forEach(function (r) {
      var row = document.createElement("div");
      row.className = "lv-ar-row";
      row.textContent = r;
      el.appendChild(row);
    });
  }
  document.getElementById("lvArStartBtn").addEventListener("click", function () {
    if (!nativeTaskAlarmPlugin) { showToast(tr("lvArNeedsApp"), 3500); return; }
    lvArFeatures().then(function (f) {
      if (!f || !f.arMeasure || typeof nativeTaskAlarmPlugin.measureAR !== "function") { showToast(tr("lvArNeedsUpdate"), 4000); return; }
      return nativeTaskAlarmPlugin.measureAR({ lang: currentLang }).then(function (res) {
        if (res && res.unsupported) { showToast(tr("lvArUnsupported"), 4000); return; }
        // what was measured there, each line "2.35 מ'" (kept here while the tool is open)
        (res && res.lines || []).forEach(function (l) { lvArResults.unshift(l); });
        renderLvArResults();
      });
    }).catch(function () { showToast(tr("lvArUnsupported"), 4000); });
  });

  // ---- 🗺 measuring on the map ------------------------------------------------------
  var mapMeasureView = document.getElementById("mapMeasureView");
  var mm = { map: null, mode: "line", pts: [], layer: null };
  function loadLeaflet() {
    if (window.L) return Promise.resolve();
    if (!document.getElementById("leafletCss")) {
      var css = document.createElement("link");
      css.id = "leafletCss";
      css.rel = "stylesheet";
      css.href = "vendor/leaflet-1.9.4.css";
      document.head.appendChild(css);
    }
    return loadScriptOnce("vendor/leaflet-1.9.4.js");
  }
  // metres along the ground between two points
  function mmDist(a, b) {
    var R = 6371008.8, toR = Math.PI / 180;
    var dLat = (b.lat - a.lat) * toR, dLon = (b.lng - a.lng) * toR;
    var h = Math.sin(dLat / 2) * Math.sin(dLat / 2) + Math.cos(a.lat * toR) * Math.cos(b.lat * toR) * Math.sin(dLon / 2) * Math.sin(dLon / 2);
    return 2 * R * Math.asin(Math.min(1, Math.sqrt(h)));
  }
  // square metres inside the points (small areas: a flat projection around them)
  function mmArea(pts) {
    if (pts.length < 3) return 0;
    var lat0 = pts[0].lat * Math.PI / 180, R = 6371008.8, toR = Math.PI / 180;
    var xy = pts.map(function (p) { return { x: p.lng * toR * R * Math.cos(lat0), y: p.lat * toR * R }; });
    var s = 0;
    for (var i = 0; i < xy.length; i++) { var j = (i + 1) % xy.length; s += xy[i].x * xy[j].y - xy[j].x * xy[i].y; }
    return Math.abs(s) / 2;
  }
  function mmFmtLen(m) { return m >= 1000 ? (m / 1000).toFixed(2) + " ק\"מ" : (m >= 100 ? Math.round(m) : m.toFixed(1)) + " מ'"; }
  function mmFmtArea(a) {
    if (a >= 1000) return Math.round(a).toLocaleString("he-IL") + " מ\"ר (" + (a / 1000).toFixed(2) + " דונם)";
    return a.toFixed(1) + " מ\"ר";
  }
  function mmRender() {
    if (!mm.map) return;
    if (mm.layer) mm.layer.remove();
    mm.layer = L.layerGroup().addTo(mm.map);
    var latlngs = mm.pts.map(function (p) { return [p.lat, p.lng]; });
    if (mm.mode === "area" && mm.pts.length >= 3) {
      L.polygon(latlngs, { color: "#ffd23f", weight: 3, fillOpacity: 0.25 }).addTo(mm.layer);
    } else if (mm.pts.length >= 2) {
      L.polyline(latlngs, { color: "#ffd23f", weight: 3 }).addTo(mm.layer);
    }
    mm.pts.forEach(function (p, i) {
      var m = L.circleMarker([p.lat, p.lng], { radius: 7, color: "#fff", weight: 2, fillColor: "#bf4e30", fillOpacity: 1 }).addTo(mm.layer);
      m.on("click", function (e) { L.DomEvent.stopPropagation(e); });
      // each side's length beside it
      if (i > 0) {
        var a = mm.pts[i - 1];
        L.tooltip({ permanent: true, direction: "center", className: "mm-seg" })
          .setLatLng([(a.lat + p.lat) / 2, (a.lng + p.lng) / 2]).setContent(mmFmtLen(mmDist(a, p))).addTo(mm.layer);
      }
    });
    var total = 0;
    for (var i = 1; i < mm.pts.length; i++) total += mmDist(mm.pts[i - 1], mm.pts[i]);
    var res = document.getElementById("mmResult");
    if (!mm.pts.length) { res.textContent = tr("mmHint"); return; }
    if (mm.mode === "area") {
      var per = total + (mm.pts.length >= 3 ? mmDist(mm.pts[mm.pts.length - 1], mm.pts[0]) : 0);
      res.textContent = tr("mmAreaRes").replace("{a}", mmFmtArea(mmArea(mm.pts))).replace("{d}", mmFmtLen(per));
    } else {
      res.textContent = tr("mmDistance").replace("{d}", mmFmtLen(total));
    }
  }
  function mmLocate(sheet) {
    return siteLocation(sheet).then(function (loc) {
      if (loc && mm.map) mm.map.setView([loc.lat, loc.lon], 18);
    }, function () {});
  }
  function openMapTool() {
    var sheet = activeSheet();
    if (!sheet) return;
    mapMeasureView.hidden = false;
    document.getElementById("mmResult").textContent = tr("mmHint");
    loadLeaflet().then(function () {
      if (!mm.map) {
        mm.map = L.map("mmMap", { zoomControl: true, attributionControl: true }).setView([31.77, 35.21], 8);
        L.tileLayer("https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}", {
          maxZoom: 20, maxNativeZoom: 19, attribution: "Esri, Maxar, Earthstar Geographics"
        }).addTo(mm.map);
        mm.map.on("click", function (e) { mm.pts.push(e.latlng); mmRender(); });
        mmLocate(sheet);
      } else {
        mm.map.invalidateSize();
      }
      mmRender();
    }, function () {
      document.getElementById("mmResult").textContent = tr("mmFailed");
    });
  }
  document.querySelectorAll(".mm-mode").forEach(function (b) {
    b.addEventListener("click", function () {
      mm.mode = b.getAttribute("data-mm");
      document.querySelectorAll(".mm-mode").forEach(function (x) { x.classList.toggle("on", x === b); });
      mmRender();
    });
  });
  document.getElementById("mmUndoBtn").addEventListener("click", function () { mm.pts.pop(); mmRender(); });
  document.getElementById("mmClearBtn").addEventListener("click", function () { mm.pts = []; mmRender(); });
  document.getElementById("mmLocateBtn").addEventListener("click", function () { var s = activeSheet(); if (s) mmLocate(s); });
  document.getElementById("mapMeasureBackBtn").addEventListener("click", function () { mapMeasureView.hidden = true; });

  // ---- the toolbox's buttons ---------------------------------------------------------
  [["toolboxMeasure", openMeasureTool], ["toolboxCamera", openSiteCamera], ["toolboxWeather", openWeatherTool], ["toolboxMap", openMapTool]].forEach(function (x) {
    document.getElementById(x[0]).addEventListener("click", function () {
      closeToolbox();
      x[1]();
    });
  });
