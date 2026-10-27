
  // ---------------------------------------------------------------------
  // יומן – תמונות מהשטח: the day's site photos. Each one (camera or
  // gallery) gets a strip printed along its bottom - project, date, time
  // and the weather then - and is saved to the library under תמונות / the
  // day's date, and listed in that day's diary (log.photos, shown in its
  // PDF too). The day's weather is kept on the diary as well (log.weather).
  // Weather: Open-Meteo (free, no key) at the phone's location, or - when
  // there's no location - at the site's town, asked once per project.
  // ---------------------------------------------------------------------
  var diaryPhotosView = document.getElementById("diaryPhotosView");
  var diaryPhotosGrid = document.getElementById("diaryPhotosGrid");
  var diaryPlaceOverlay = document.getElementById("diaryPlaceOverlay");
  var DIARY_PLACE_KEY = "itask-site-place:";
  var diaryWeatherCache = {}; // sheetId -> { at, weather }

  // WMO weather codes -> words and a sign
  function diaryWeatherWords(code) {
    var table = [
      [[0], "☀", "weatherClear"], [[1, 2], "🌤", "weatherPartly"], [[3], "☁", "weatherCloudy"],
      [[45, 48], "🌫", "weatherFog"], [[51, 53, 55, 56, 57], "🌦", "weatherDrizzle"],
      [[61, 63, 65, 66, 67, 80, 81, 82], "🌧", "weatherRain"], [[71, 73, 75, 77, 85, 86], "❄", "weatherSnow"],
      [[95, 96, 99], "⛈", "weatherStorm"]
    ];
    for (var i = 0; i < table.length; i++) if (table[i][0].indexOf(code) >= 0) return { sign: table[i][1], words: tr(table[i][2]) };
    return { sign: "", words: "" };
  }
  function diaryWeatherText(w) {
    if (!w) return "";
    var d = diaryWeatherWords(w.code);
    // °C, not a bare ° (which right-to-left text would put before the number)
    return (d.sign + " " + Math.round(w.temp) + "°C " + d.words + (w.wind >= 25 ? " · " + tr("weatherWind").replace("{n}", Math.round(w.wind)) : "")).trim();
  }
  function diaryPhoneLocation() {
    return new Promise(function (resolve) {
      if (!navigator.geolocation) { resolve(null); return; }
      var done = false;
      var finish = function (v) { if (!done) { done = true; resolve(v); } };
      setTimeout(function () { finish(null); }, 7000);
      try {
        navigator.geolocation.getCurrentPosition(function (p) {
          finish({ lat: p.coords.latitude, lon: p.coords.longitude });
        }, function () { finish(null); }, { timeout: 6500, maximumAge: 15 * 60000, enableHighAccuracy: false });
      } catch (e) { finish(null); }
    });
  }
  // the site's town, asked once (null: no weather wanted / not found)
  function diarySitePlace(sheet) {
    var saved = null;
    try { saved = JSON.parse(localStorage.getItem(DIARY_PLACE_KEY + sheet.id) || "null"); } catch (e) {}
    if (saved) return Promise.resolve(saved.skip ? null : saved);
    return new Promise(function (resolve) {
      var input = document.getElementById("diaryPlaceInput");
      input.value = "";
      diaryPlaceOverlay.hidden = false;
      input.focus();
      var close = function () {
        diaryPlaceOverlay.hidden = true;
        document.getElementById("diaryPlaceOkBtn").onclick = null;
        document.getElementById("diaryPlaceSkipBtn").onclick = null;
      };
      document.getElementById("diaryPlaceSkipBtn").onclick = function () {
        close();
        try { localStorage.setItem(DIARY_PLACE_KEY + sheet.id, JSON.stringify({ skip: true })); } catch (e) {}
        resolve(null);
      };
      document.getElementById("diaryPlaceOkBtn").onclick = function () {
        var name = input.value.trim();
        if (!name) return;
        close();
        fetch("https://geocoding-api.open-meteo.com/v1/search?count=1&language=he&name=" + encodeURIComponent(name))
          .then(function (r) { return r.json(); })
          .then(function (res) {
            var hit = res && res.results && res.results[0];
            if (!hit) { showToast(tr("diaryPlaceNotFound")); resolve(null); return; }
            var place = { name: hit.name, lat: hit.latitude, lon: hit.longitude };
            try { localStorage.setItem(DIARY_PLACE_KEY + sheet.id, JSON.stringify(place)); } catch (e) {}
            resolve(place);
          }, function () { resolve(null); });
      };
    });
  }
  // the weather now at the site (kept for 20 minutes), or null
  function diaryWeatherNow(sheet) {
    var c = diaryWeatherCache[sheet.id];
    if (c && Date.now() - c.at < 20 * 60000) return Promise.resolve(c.weather);
    return diaryPhoneLocation().then(function (loc) {
      return loc || diarySitePlace(sheet);
    }).then(function (loc) {
      if (!loc) return null;
      return fetch("https://api.open-meteo.com/v1/forecast?current=temperature_2m,weather_code,wind_speed_10m&latitude=" +
        loc.lat + "&longitude=" + loc.lon).then(function (r) { return r.json(); }).then(function (res) {
        var cur = res && res.current;
        if (!cur) return null;
        var w = { temp: cur.temperature_2m, code: cur.weather_code, wind: cur.wind_speed_10m };
        diaryWeatherCache[sheet.id] = { at: Date.now(), weather: w };
        return w;
      });
    }).catch(function () { return null; });
  }

  // ---- the stamp along a photo's bottom --------------------------------------
  function diaryStampPhoto(canvas, sheet, when, weather) {
    var ctx = canvas.getContext("2d");
    var w = canvas.width, h = canvas.height;
    var size = Math.max(14, Math.round(Math.min(w, h) * 0.034));
    var band = Math.round(size * 2.2);
    ctx.fillStyle = "rgba(0, 0, 0, 0.55)";
    ctx.fillRect(0, h - band, w, band);
    ctx.fillStyle = "#fff";
    ctx.font = "700 " + size + "px Assistant, Arial, sans-serif";
    ctx.textBaseline = "middle";
    var y = h - band / 2, pad = size * 0.7;
    var d = new Date(when);
    var when2 = isoToFullDisplay(wpIso(d)) + "  " + String(d.getHours()).padStart(2, "0") + ":" + String(d.getMinutes()).padStart(2, "0");
    // the project's name at the right, its date and time beside it - each
    // drawn on its own, so mixed Hebrew / numbers keep their order
    ctx.direction = "rtl";
    ctx.textAlign = "right";
    ctx.fillText(sheet.name, w - pad, y);
    var nameW = ctx.measureText(sheet.name).width;
    ctx.direction = "ltr";
    ctx.fillText(when2, w - pad - nameW - size, y);
    if (weather) {
      ctx.direction = "rtl";
      ctx.textAlign = "left";
      ctx.fillText(diaryWeatherText(weather), pad, y);
    }
    return canvas;
  }

  // ---- the library: תמונות / the day ----------------------------------------------
  function diaryPhotoFolderName(dateISO) { return dateISO.split("-").reverse().join("."); }
  function ensureDiaryPhotoFolder(sheet, dateISO) {
    var name = diaryPhotoFolderName(dateISO);
    var pick = function (folders) {
      var photos = folders.find(function (f) { return f.key === "photos"; });
      return photos && folders.find(function (f) { return f.parentId === photos.id && f.name === name; });
    };
    return new Promise(function (resolve) {
      ensureLibraryFolders(sheet, function (folders) {
        var hit = pick(folders);
        if (hit) { resolve(hit.id); return; }
        var addTo = function (list) {
          var photos = list.find(function (f) { return f.key === "photos"; });
          if (!photos || pick(list)) return list;
          return list.concat([{ id: uid(), key: null, name: name, parentId: photos.id, files: [] }]);
        };
        if (sheet.shared) {
          applySharedLibraryFolders(sheet.id, addTo).then(function (updated) {
            var f = pick(updated);
            resolve(f ? f.id : null);
          }, function () { resolve(null); });
          return;
        }
        var live = data.sheets.find(function (s) { return s.id === sheet.id; });
        if (!live) { resolve(null); return; }
        live.folders = addTo(live.folders || folders);
        saveData();
        var f2 = pick(live.folders);
        resolve(f2 ? f2.id : null);
      });
    });
  }

  // ---- taking / adding photos ------------------------------------------------------------
  function diaryAddPhotos(files) {
    var sheet = activeSheet(), dateISO = activeSiteLogDate;
    if (!sheet || !dateISO || !supabaseClient || !files.length) return;
    showToast(tr("diaryPhotosSaving"));
    diaryWeatherNow(sheet).then(function (weather) {
      renderDiaryPhotos(weather);
      return ensureDiaryPhotoFolder(sheet, dateISO).then(function (folderId) {
        return Array.prototype.reduce.call(files, function (chain, file) {
          return chain.then(function () {
            var when = file.lastModified && Math.abs(Date.now() - file.lastModified) < 3 * 86400000 ? file.lastModified : Date.now();
            return scanLoadImage(file).then(function (canvas) {
              diaryStampPhoto(canvas, sheet, when, weather);
              return new Promise(function (res) { canvas.toBlob(res, "image/jpeg", 0.88); });
            }).then(function (blob) {
              var d = new Date(when);
              var name = tr("diaryPhotoName") + " " + diaryPhotoFolderName(dateISO) + " " +
                String(d.getHours()).padStart(2, "0") + "-" + String(d.getMinutes()).padStart(2, "0") + "-" + String(d.getSeconds()).padStart(2, "0") + ".jpg";
              var path = sheet.id + "/" + (folderId || "site-logs/" + dateISO) + "/" + uid() + "-" + safeStorageFileName(name);
              return supabaseClient.storage.from(LIBRARY_BUCKET).upload(path, blob, { contentType: "image/jpeg" }).then(function (result) {
                if (result.error) throw result.error;
                return resolveFileUrl(path);
              }).then(function (url) {
                var entry = { id: uid(), name: name, path: path, type: "image/jpeg", size: blob.size || 0, uploadedAt: Date.now() };
                var log = findOrCreateSiteLog(sheet, dateISO);
                log.photos.push({ id: entry.id, name: name, path: path, url: url, type: "image/jpeg", at: when, weather: weather ? diaryWeatherText(weather) : null });
                if (weather && !log.weather) log.weather = diaryWeatherText(weather);
                saveData();
                renderDiaryPhotos();
                return folderId ? addFileToLibraryFolder(sheet, folderId, entry) : null;
              });
            });
          });
        }, Promise.resolve());
      });
    }).then(function () {
      showToast(tr("diaryPhotosSaved"));
    }, function (err) {
      console.error("diary photo failed:", err);
      alert(tr("libraryUploadError"));
    });
  }

  function renderDiaryPhotos(weatherNow) {
    var sheet = activeSheet();
    var log = sheet && activeSiteLogDate ? findSiteLog(sheet, activeSiteLogDate) : null;
    var photos = (log && log.photos) || [];
    var weatherEl = document.getElementById("diaryPhotosWeather");
    var wText = (log && log.weather) || (weatherNow ? diaryWeatherText(weatherNow) : "");
    weatherEl.hidden = !wText;
    weatherEl.textContent = wText ? tr("diaryWeatherLine").replace("{w}", wText) : "";
    document.getElementById("diaryPhotosActions").hidden = !!(log && log.closed);
    diaryPhotosGrid.innerHTML = "";
    if (!photos.length) {
      var empty = document.createElement("div");
      empty.className = "library-empty";
      empty.textContent = tr("diaryPhotosEmpty");
      diaryPhotosGrid.appendChild(empty);
      return;
    }
    photos.forEach(function (p) {
      var item = document.createElement("div");
      item.className = "library-item";
      var thumb = document.createElement("div");
      thumb.className = "library-item-thumb";
      var img = document.createElement("img");
      img.alt = "";
      img.src = p.url;
      thumb.appendChild(img);
      item.appendChild(thumb);
      var d = new Date(p.at);
      var nameEl = document.createElement("div");
      nameEl.className = "library-item-name";
      nameEl.textContent = String(d.getHours()).padStart(2, "0") + ":" + String(d.getMinutes()).padStart(2, "0") + (p.weather ? " " + p.weather.split(" ")[0] : "");
      item.appendChild(nameEl);
      item.addEventListener("click", function () { openImageViewer(p.url, p.name); });
      if (!log.closed) {
        var del = document.createElement("button");
        del.type = "button";
        del.className = "library-item-delete";
        del.textContent = "✕";
        del.addEventListener("click", function (e) {
          e.stopPropagation();
          askConfirm(tr("diaryPhotoDeleteConfirm"), function () {
            // off the diary; the copy in the library stays
            log.photos = log.photos.filter(function (x) { return x.id !== p.id; });
            saveData();
            renderDiaryPhotos();
          });
        });
        item.appendChild(del);
      }
      diaryPhotosGrid.appendChild(item);
    });
  }
  function openDiaryPhotos() {
    var sheet = activeSheet();
    if (!sheet || !activeSiteLogDate) return;
    document.getElementById("diaryPhotosTitle").textContent = tr("diaryPhotos") + " – " + isoToDisplay(activeSiteLogDate);
    renderDiaryPhotos();
    diaryPhotosView.hidden = false;
  }
  document.getElementById("siteLogPhotosBtn").addEventListener("click", openDiaryPhotos);
  document.getElementById("diaryPhotosBackBtn").addEventListener("click", function () { diaryPhotosView.hidden = true; });
  var diaryCameraInput = document.getElementById("diaryPhotosCameraInput");
  var diaryGalleryInput = document.getElementById("diaryPhotosGalleryInput");
  document.getElementById("diaryPhotosCameraBtn").addEventListener("click", function () { diaryCameraInput.click(); });
  document.getElementById("diaryPhotosGalleryBtn").addEventListener("click", function () { diaryGalleryInput.click(); });
  [diaryCameraInput, diaryGalleryInput].forEach(function (input) {
    input.addEventListener("change", function () {
      var files = Array.prototype.slice.call(input.files || []);
      input.value = "";
      diaryAddPhotos(files);
    });
  });

  // in the diary's PDF: the day's weather under its date, and its photos
  function appendDiaryPhotosPdfSection(doc, log) {
    var photos = (log.photos || []).filter(function (p) { return p.url; });
    if (!photos.length) return;
    var heading = document.createElement("div");
    heading.className = "pdf-doc-section-heading";
    heading.textContent = tr("diaryPhotos");
    doc.appendChild(heading);
    var grid = document.createElement("div");
    grid.className = "pdf-doc-photos";
    photos.forEach(function (p) {
      var img = document.createElement("img");
      img.src = p.url;
      grid.appendChild(img);
    });
    doc.appendChild(grid);
  }
