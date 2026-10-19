
  // ---------------------------------------------------------------------
  // Library "סריקת מסמך": photograph pages with the camera (or pick them
  // from the gallery), optionally cleaned up as a document (white paper,
  // crisp text), saved as one PDF into a library folder the user picks.
  // ---------------------------------------------------------------------
  var libraryScanBtn = document.getElementById("libraryScanBtn");
  var scanOverlay = document.getElementById("scanOverlay");
  var scanPagesEl = document.getElementById("scanPages");
  var scanEmptyEl = document.getElementById("scanEmpty");
  var scanCameraInput = document.getElementById("scanCameraInput");
  var scanGalleryInput = document.getElementById("scanGalleryInput");
  var scanDocMode = document.getElementById("scanDocMode");
  var scanNameInput = document.getElementById("scanName");
  var scanSaveBtn = document.getElementById("scanSaveBtn");
  var SCAN_MAX_SIDE = 2000;
  // { canvas (camera image, scaled down), rotation (0/90/180/270) }
  var scanPages = [];

  function scanLoadImage(file) {
    return new Promise(function (resolve, reject) {
      var url = URL.createObjectURL(file);
      var img = new Image();
      img.onload = function () {
        var scale = Math.min(1, SCAN_MAX_SIDE / Math.max(img.naturalWidth, img.naturalHeight));
        var c = document.createElement("canvas");
        c.width = Math.max(1, Math.round(img.naturalWidth * scale));
        c.height = Math.max(1, Math.round(img.naturalHeight * scale));
        c.getContext("2d").drawImage(img, 0, 0, c.width, c.height);
        URL.revokeObjectURL(url);
        resolve(c);
      };
      img.onerror = function () { URL.revokeObjectURL(url); reject(new Error("image")); };
      img.src = url;
    });
  }

  // "מצב מסמך": each pixel divided by the paper's own brightness around it
  // (the brightest of its 32px block, smoothed), so shadows and uneven light
  // drop out and the paper turns white; then the ink is darkened - like a
  // scanner, minus colour.
  function scanEnhance(canvas) {
    var w = canvas.width, h = canvas.height;
    var ctx = canvas.getContext("2d");
    var img = ctx.getImageData(0, 0, w, h);
    var px = img.data;
    var gray = new Uint8Array(w * h);
    for (var i = 0, k = 0; k < gray.length; i += 4, k++) {
      gray[k] = (px[i] * 299 + px[i + 1] * 587 + px[i + 2] * 114) / 1000 | 0;
    }
    var B = 32, bw = Math.ceil(w / B), bh = Math.ceil(h / B);
    var blk = new Float32Array(bw * bh);
    for (var y = 0; y < h; y++) {
      for (var x = 0; x < w; x++) {
        var bi = (y / B | 0) * bw + (x / B | 0);
        if (gray[y * w + x] > blk[bi]) blk[bi] = gray[y * w + x];
      }
    }
    // smooth the block grid (a lone bright speck mustn't make a block "paper")
    var bg = new Float32Array(bw * bh);
    for (var by = 0; by < bh; by++) {
      for (var bx = 0; bx < bw; bx++) {
        var sum = 0, cnt = 0;
        for (var dy = -1; dy <= 1; dy++) {
          for (var dx = -1; dx <= 1; dx++) {
            var yy = by + dy, xx = bx + dx;
            if (yy >= 0 && yy < bh && xx >= 0 && xx < bw) { sum += blk[yy * bw + xx]; cnt++; }
          }
        }
        bg[by * bw + bx] = Math.max(24, sum / cnt);
      }
    }
    var hist = new Uint32Array(256);
    var norm = new Uint8Array(w * h);
    for (var y2 = 0; y2 < h; y2++) {
      // bilinear between block centres
      var fy = Math.min(bh - 1, Math.max(0, (y2 + 0.5) / B - 0.5));
      var y0 = fy | 0, y1 = Math.min(bh - 1, y0 + 1), ty = fy - y0;
      for (var x2 = 0; x2 < w; x2++) {
        var fx = Math.min(bw - 1, Math.max(0, (x2 + 0.5) / B - 0.5));
        var x0 = fx | 0, x1 = Math.min(bw - 1, x0 + 1), tx = fx - x0;
        var b = (bg[y0 * bw + x0] * (1 - tx) + bg[y0 * bw + x1] * tx) * (1 - ty) +
                (bg[y1 * bw + x0] * (1 - tx) + bg[y1 * bw + x1] * tx) * ty;
        var v = Math.min(255, gray[y2 * w + x2] * 255 / b) | 0;
        norm[y2 * w + x2] = v;
        hist[v]++;
      }
    }
    var target = w * h * 0.01, acc = 0, lo = 0;
    for (; lo < 255; lo++) { acc += hist[lo]; if (acc >= target) break; }
    lo = Math.min(lo, 170);
    var hi = 225;
    var lut = new Uint8ClampedArray(256);
    for (var v2 = 0; v2 < 256; v2++) {
      var t = Math.min(1, Math.max(0, (v2 - lo) / (hi - lo)));
      lut[v2] = Math.round(255 * Math.pow(t, 1.5));
    }
    for (var j = 0, m = 0; m < norm.length; j += 4, m++) {
      px[j] = px[j + 1] = px[j + 2] = lut[norm[m]];
    }
    ctx.putImageData(img, 0, 0);
    return canvas;
  }

  // A page as it goes into the PDF: rotated, and cleaned up in document mode.
  function scanRenderPage(page) {
    var src = page.canvas;
    var turned = page.rotation % 180 !== 0;
    var c = document.createElement("canvas");
    c.width = turned ? src.height : src.width;
    c.height = turned ? src.width : src.height;
    var ctx = c.getContext("2d");
    ctx.fillStyle = "#ffffff";
    ctx.fillRect(0, 0, c.width, c.height);
    ctx.translate(c.width / 2, c.height / 2);
    ctx.rotate(page.rotation * Math.PI / 180);
    ctx.drawImage(src, -src.width / 2, -src.height / 2);
    return scanDocMode.checked ? scanEnhance(c) : c;
  }

  function renderScanPages() {
    scanPagesEl.innerHTML = "";
    scanEmptyEl.hidden = scanPages.length > 0;
    scanSaveBtn.disabled = !scanPages.length;
    scanPages.forEach(function (page, i) {
      var item = document.createElement("div");
      item.className = "scan-page";
      var shown = scanRenderPage(page);
      var thumb = document.createElement("canvas");
      var s = 160 / Math.max(shown.width, shown.height);
      thumb.width = Math.max(1, Math.round(shown.width * s));
      thumb.height = Math.max(1, Math.round(shown.height * s));
      thumb.getContext("2d").drawImage(shown, 0, 0, thumb.width, thumb.height);
      item.appendChild(thumb);
      var num = document.createElement("span");
      num.className = "scan-page-num";
      num.textContent = String(i + 1);
      item.appendChild(num);
      var rot = document.createElement("button");
      rot.type = "button";
      rot.className = "scan-page-btn scan-page-rotate";
      rot.textContent = "↻";
      rot.title = tr("scanRotate");
      rot.addEventListener("click", function () {
        page.rotation = (page.rotation + 90) % 360;
        renderScanPages();
      });
      item.appendChild(rot);
      var del = document.createElement("button");
      del.type = "button";
      del.className = "scan-page-btn scan-page-del";
      del.textContent = "✕";
      del.title = tr("deleteBtn");
      del.addEventListener("click", function () {
        scanPages.splice(i, 1);
        renderScanPages();
      });
      item.appendChild(del);
      scanPagesEl.appendChild(item);
    });
  }

  function scanDefaultName() {
    var d = new Date();
    return tr("scanDefaultName") + " " + isoToFileNameDate(todayISO()) + " " +
      String(d.getHours()).padStart(2, "0") + "-" + String(d.getMinutes()).padStart(2, "0");
  }

  function openScanOverlay() {
    scanPages = [];
    scanNameInput.value = scanDefaultName();
    renderScanPages();
    scanOverlay.hidden = false;
  }
  function closeScanOverlay() {
    scanOverlay.hidden = true;
    scanPages = [];
  }

  function addScanFiles(files) {
    var list = Array.prototype.slice.call(files || []).filter(function (f) { return /^image\//.test(f.type || "image/"); });
    return list.reduce(function (p, file) {
      return p.then(function () {
        return scanLoadImage(file).then(function (canvas) {
          scanPages.push({ canvas: canvas, rotation: 0 });
        }, function () {});
      });
    }, Promise.resolve()).then(renderScanPages);
  }

  function buildScanPdf() {
    return (window.jspdf ? Promise.resolve() : loadScriptOnce("vendor/jspdf.umd.min.js")).then(function () {
      var pdf = null;
      scanPages.forEach(function (page) {
        var c = scanRenderPage(page);
        var landscape = c.width > c.height;
        var pw = landscape ? 297 : 210, ph = landscape ? 210 : 297, margin = 6;
        var scale = Math.min((pw - 2 * margin) / c.width, (ph - 2 * margin) / c.height);
        var w = c.width * scale, h = c.height * scale;
        if (!pdf) pdf = new window.jspdf.jsPDF({ unit: "mm", format: "a4", orientation: landscape ? "landscape" : "portrait" });
        else pdf.addPage("a4", landscape ? "landscape" : "portrait");
        pdf.addImage(c.toDataURL("image/jpeg", 0.75), "JPEG", (pw - w) / 2, (ph - h) / 2, w, h);
      });
      return pdf.output("blob");
    });
  }

  function saveScanToFolder(sheet, folder) {
    var name = (scanNameInput.value || "").trim() || scanDefaultName();
    var fileName = /\.pdf$/i.test(name) ? name : name + ".pdf";
    showToast(tr("scanSavingMsg"));
    buildScanPdf().then(function (blob) {
      var path = sheet.id + "/" + folder.id + "/" + uid() + "-" + safeStorageFileName(fileName);
      return supabaseClient.storage.from(LIBRARY_BUCKET).upload(path, blob, { contentType: "application/pdf" }).then(function (result) {
        if (result.error) throw result.error;
        var entry = { id: uid(), name: fileName, path: path, type: "application/pdf", size: blob.size || 0, uploadedAt: Date.now() };
        return addFileToLibraryFolder(sheet, folder.id, entry);
      });
    }).then(function () {
      closeScanOverlay();
      showToast(tr("scanSavedMsg").replace("{folder}", folderDisplayName(folder)));
      if (activeLibraryFolderId === folder.id) renderLibraryGrid();
    }, function (err) {
      console.error("scan save failed:", err);
      alert(tr("scanSaveError"));
    });
  }

  // Which library folder: the same picker as saving a chat file.
  function pickScanFolder() {
    var sheet = allSheets().find(function (s) { return s.id === activeLibrarySheetId; });
    if (!sheet || !scanPages.length) return;
    if (!supabaseClient) { alert(tr("scanSaveError")); return; }
    ensureLibraryFolders(sheet, function (folders) {
      chatSaveFolderList.innerHTML = "";
      folders.forEach(function (folder) {
        var btn = document.createElement("button");
        btn.type = "button";
        btn.textContent = "📁 " + folderDisplayName(folder);
        btn.addEventListener("click", function () {
          chatSaveFolderOverlay.hidden = true;
          saveScanToFolder(sheet, folder);
        });
        chatSaveFolderList.appendChild(btn);
      });
      chatSaveFolderOverlay.hidden = false;
    });
  }

  libraryScanBtn.addEventListener("click", openScanOverlay);
  document.getElementById("scanCaptureBtn").addEventListener("click", function () { scanCameraInput.click(); });
  document.getElementById("scanGalleryBtn").addEventListener("click", function () { scanGalleryInput.click(); });
  [scanCameraInput, scanGalleryInput].forEach(function (input) {
    input.addEventListener("change", function () {
      addScanFiles(input.files);
      input.value = "";
    });
  });
  scanDocMode.addEventListener("change", renderScanPages);
  scanSaveBtn.addEventListener("click", pickScanFolder);
  document.getElementById("scanCancelBtn").addEventListener("click", function () {
    if (scanPages.length) askConfirm(tr("scanDiscardConfirm"), closeScanOverlay);
    else closeScanOverlay();
  });
