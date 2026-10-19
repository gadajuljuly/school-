
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
  // see scanNewPage
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

  // ---- a page's edits: { quad (the page's 4 corners in the photo, 0..1,
  // clockwise from top-left; null = the whole photo), rotation, filter
  // (doc / color / gray / vivid), brightness (-60..60) } ----
  function scanNewPage(canvas) {
    return { canvas: canvas, quad: null, rotation: 0, filter: scanDocMode.checked ? "doc" : "color", brightness: 0, out: null };
  }
  function scanEdits(page) {
    return { quad: page.quad && page.quad.map(function (p) { return { x: p.x, y: p.y }; }),
      rotation: page.rotation, filter: page.filter, brightness: page.brightness };
  }

  // The photo's quad straightened into a rectangle (perspective-corrected:
  // a page shot at an angle comes out square), bilinear sampling.
  function scanWarp(src, quad) {
    var sw = src.width, sh = src.height;
    var P = quad.map(function (p) { return { x: p.x * sw, y: p.y * sh }; });
    var dist = function (a, b) { return Math.hypot(a.x - b.x, a.y - b.y); };
    var W = Math.max(dist(P[0], P[1]), dist(P[3], P[2]));
    var H = Math.max(dist(P[0], P[3]), dist(P[1], P[2]));
    var k = Math.min(1, SCAN_MAX_SIDE / Math.max(W, H));
    W = Math.max(1, Math.round(W * k)); H = Math.max(1, Math.round(H * k));
    // unit square -> quad (Heckbert's projective mapping)
    var x0 = P[0].x, y0 = P[0].y, x1 = P[1].x, y1 = P[1].y, x2 = P[2].x, y2 = P[2].y, x3 = P[3].x, y3 = P[3].y;
    var dx1 = x1 - x2, dx2 = x3 - x2, dx3 = x0 - x1 + x2 - x3;
    var dy1 = y1 - y2, dy2 = y3 - y2, dy3 = y0 - y1 + y2 - y3;
    var g = 0, h = 0;
    if (Math.abs(dx3) > 1e-9 || Math.abs(dy3) > 1e-9) {
      var det = dx1 * dy2 - dx2 * dy1 || 1e-9;
      g = (dx3 * dy2 - dx2 * dy3) / det;
      h = (dx1 * dy3 - dx3 * dy1) / det;
    }
    var a = x1 - x0 + g * x1, b = x3 - x0 + h * x3, c = x0;
    var d = y1 - y0 + g * y1, e = y3 - y0 + h * y3, f = y0;
    var sdata = src.getContext("2d").getImageData(0, 0, sw, sh).data;
    var out = document.createElement("canvas");
    out.width = W; out.height = H;
    var octx = out.getContext("2d");
    var oimg = octx.createImageData(W, H);
    var od = oimg.data;
    for (var j = 0; j < H; j++) {
      var t = (j + 0.5) / H;
      for (var i = 0; i < W; i++) {
        var u = (i + 0.5) / W;
        var z = g * u + h * t + 1;
        var sx = (a * u + b * t + c) / z - 0.5, sy = (d * u + e * t + f) / z - 0.5;
        var ix = Math.floor(sx), iy = Math.floor(sy), fx = sx - ix, fy = sy - iy;
        if (ix < 0) { ix = 0; fx = 0; } else if (ix >= sw - 1) { ix = sw - 2; fx = 1; }
        if (iy < 0) { iy = 0; fy = 0; } else if (iy >= sh - 1) { iy = sh - 2; fy = 1; }
        if (sw < 2) { ix = 0; fx = 0; }
        if (sh < 2) { iy = 0; fy = 0; }
        var p00 = (iy * sw + ix) * 4, p10 = p00 + 4, p01 = p00 + sw * 4, p11 = p01 + 4;
        var o = (j * W + i) * 4;
        for (var ch = 0; ch < 3; ch++) {
          od[o + ch] = (sdata[p00 + ch] * (1 - fx) + sdata[p10 + ch] * fx) * (1 - fy) +
                       (sdata[p01 + ch] * (1 - fx) + sdata[p11 + ch] * fx) * fy;
        }
        od[o + 3] = 255;
      }
    }
    octx.putImageData(oimg, 0, 0);
    return out;
  }

  function scanRotate(src, rotation) {
    if (!rotation) return src;
    var turned = rotation % 180 !== 0;
    var c = document.createElement("canvas");
    c.width = turned ? src.height : src.width;
    c.height = turned ? src.width : src.height;
    var ctx = c.getContext("2d");
    ctx.translate(c.width / 2, c.height / 2);
    ctx.rotate(rotation * Math.PI / 180);
    ctx.drawImage(src, -src.width / 2, -src.height / 2);
    return c;
  }

  function scanFilter(c, filter, brightness) {
    if (filter === "doc") scanEnhance(c);
    if (filter === "color" && !brightness) return c;
    var ctx = c.getContext("2d");
    var img = ctx.getImageData(0, 0, c.width, c.height);
    var px = img.data;
    var add = brightness * 2;
    for (var i = 0; i < px.length; i += 4) {
      var r = px[i], g = px[i + 1], b = px[i + 2];
      if (filter === "gray") {
        r = g = b = (r * 299 + g * 587 + b * 114) / 1000;
      } else if (filter === "vivid") {
        var l = (r * 299 + g * 587 + b * 114) / 1000;
        r = l + (r - l) * 1.35; g = l + (g - l) * 1.35; b = l + (b - l) * 1.35;
        r = (r - 128) * 1.25 + 140; g = (g - 128) * 1.25 + 140; b = (b - 128) * 1.25 + 140;
      }
      px[i] = r + add; px[i + 1] = g + add; px[i + 2] = b + add;
    }
    ctx.putImageData(img, 0, 0);
    return c;
  }

  // The photo with a page's edits applied - what the PDF gets.
  function scanApplyEdits(src, edits) {
    var c;
    if (edits.quad) {
      c = scanWarp(src, edits.quad);
    } else {
      // a copy - the filters write into it
      c = document.createElement("canvas");
      c.width = src.width; c.height = src.height;
      c.getContext("2d").drawImage(src, 0, 0);
    }
    return scanFilter(scanRotate(c, edits.rotation), edits.filter, edits.brightness);
  }
  function scanRenderPage(page) {
    if (!page.out) page.out = scanApplyEdits(page.canvas, scanEdits(page));
    return page.out;
  }

  function renderScanPages() {
    scanPagesEl.innerHTML = "";
    scanEmptyEl.hidden = scanPages.length > 0;
    scanSaveBtn.disabled = !scanPages.length;
    scanPages.forEach(function (page, i) {
      var item = document.createElement("div");
      item.className = "scan-page";
      item.title = tr("scanEditTitle");
      var shown = scanRenderPage(page);
      var thumb = document.createElement("canvas");
      var s = 160 / Math.max(shown.width, shown.height);
      thumb.width = Math.max(1, Math.round(shown.width * s));
      thumb.height = Math.max(1, Math.round(shown.height * s));
      thumb.getContext("2d").drawImage(shown, 0, 0, thumb.width, thumb.height);
      item.appendChild(thumb);
      item.addEventListener("click", function () { openScanEditor(i); });
      var num = document.createElement("span");
      num.className = "scan-page-num";
      num.textContent = String(i + 1);
      item.appendChild(num);
      var edit = document.createElement("span");
      edit.className = "scan-page-btn scan-page-rotate scan-page-edit";
      edit.textContent = "✎";
      item.appendChild(edit);
      var del = document.createElement("button");
      del.type = "button";
      del.className = "scan-page-btn scan-page-del";
      del.textContent = "✕";
      del.title = tr("deleteBtn");
      del.addEventListener("click", function (e) {
        e.stopPropagation();
        scanPages.splice(i, 1);
        renderScanPages();
      });
      item.appendChild(del);
      scanPagesEl.appendChild(item);
    });
  }

  // ---- the page editor --------------------------------------------------
  var scanEditor = document.getElementById("scanEditor");
  var scanEditorStage = document.getElementById("scanEditorStage");
  var scanEditorCanvas = document.getElementById("scanEditorCanvas");
  var scanEditorPoly = document.getElementById("scanEditorPoly");
  var scanEditorSvg = document.getElementById("scanEditorQuad");
  var scanEditorHandles = Array.prototype.slice.call(document.querySelectorAll(".scan-handle"));
  var scanBrightness = document.getElementById("scanBrightness");
  var scanEditIndex = -1;
  var scanEditState = null;
  var scanEditMode = "crop";
  var scanEditPreviewSrc = null;
  var SCAN_FULL_QUAD = [{ x: 0, y: 0 }, { x: 1, y: 0 }, { x: 1, y: 1 }, { x: 0, y: 1 }];

  function openScanEditor(index) {
    var page = scanPages[index];
    if (!page) return;
    scanEditIndex = index;
    scanEditState = scanEdits(page);
    if (!scanEditState.quad) scanEditState.quad = SCAN_FULL_QUAD.map(function (p) { return { x: p.x, y: p.y }; });
    // a smaller copy keeps the live preview quick
    var k = Math.min(1, 900 / Math.max(page.canvas.width, page.canvas.height));
    scanEditPreviewSrc = document.createElement("canvas");
    scanEditPreviewSrc.width = Math.max(1, Math.round(page.canvas.width * k));
    scanEditPreviewSrc.height = Math.max(1, Math.round(page.canvas.height * k));
    scanEditPreviewSrc.getContext("2d").drawImage(page.canvas, 0, 0, scanEditPreviewSrc.width, scanEditPreviewSrc.height);
    scanBrightness.value = String(scanEditState.brightness);
    scanEditor.hidden = false;
    setScanEditMode("crop");
  }
  function closeScanEditor() {
    scanEditor.hidden = true;
    scanEditIndex = -1;
    scanEditState = null;
    scanEditPreviewSrc = null;
  }
  function isFullQuad(q) {
    return q.every(function (p, i) { return Math.abs(p.x - SCAN_FULL_QUAD[i].x) < 0.002 && Math.abs(p.y - SCAN_FULL_QUAD[i].y) < 0.002; });
  }

  function setScanEditMode(mode) {
    scanEditMode = mode;
    document.querySelectorAll(".scan-editor-tab").forEach(function (b) {
      b.classList.toggle("active", b.getAttribute("data-mode") === mode);
    });
    document.getElementById("scanEditorCropBar").hidden = mode !== "crop";
    document.getElementById("scanEditorFilterBar").hidden = mode !== "filter";
    document.getElementById("scanEditorLightBar").hidden = mode !== "light";
    document.querySelectorAll(".scan-filter-btn").forEach(function (b) {
      b.classList.toggle("active", b.getAttribute("data-filter") === scanEditState.filter);
    });
    drawScanEditor();
  }

  // Crop mode shows the photo itself with the 4 corners; the other modes
  // show the result.
  function drawScanEditor() {
    if (!scanEditState) return;
    var crop = scanEditMode === "crop";
    var shown = crop ? scanEditPreviewSrc : scanApplyEdits(scanEditPreviewSrc, scanEditState);
    scanEditorCanvas.width = shown.width;
    scanEditorCanvas.height = shown.height;
    scanEditorCanvas.getContext("2d").drawImage(shown, 0, 0);
    scanEditorSvg.style.display = crop ? "" : "none";
    scanEditorHandles.forEach(function (h) { h.hidden = !crop; });
    if (crop) placeScanHandles();
  }
  function placeScanHandles() {
    var stage = scanEditorStage.getBoundingClientRect();
    var r = scanEditorCanvas.getBoundingClientRect();
    var ox = r.left - stage.left, oy = r.top - stage.top;
    scanEditorSvg.setAttribute("width", stage.width);
    scanEditorSvg.setAttribute("height", stage.height);
    var pts = scanEditState.quad.map(function (p) { return { x: ox + p.x * r.width, y: oy + p.y * r.height }; });
    scanEditorPoly.setAttribute("points", pts.map(function (p) { return p.x + "," + p.y; }).join(" "));
    scanEditorHandles.forEach(function (h, i) {
      h.style.left = pts[i].x + "px";
      h.style.top = pts[i].y + "px";
    });
  }
  scanEditorHandles.forEach(function (h, i) {
    h.addEventListener("pointerdown", function (e) {
      e.preventDefault();
      h.setPointerCapture(e.pointerId);
      var move = function (ev) {
        var r = scanEditorCanvas.getBoundingClientRect();
        scanEditState.quad[i] = {
          x: Math.min(1, Math.max(0, (ev.clientX - r.left) / r.width)),
          y: Math.min(1, Math.max(0, (ev.clientY - r.top) / r.height))
        };
        placeScanHandles();
      };
      var up = function () {
        h.removeEventListener("pointermove", move);
        h.removeEventListener("pointerup", up);
        h.removeEventListener("pointercancel", up);
      };
      h.addEventListener("pointermove", move);
      h.addEventListener("pointerup", up);
      h.addEventListener("pointercancel", up);
    });
  });
  window.addEventListener("resize", function () { if (!scanEditor.hidden && scanEditMode === "crop") placeScanHandles(); });

  document.querySelectorAll(".scan-editor-tab[data-mode]").forEach(function (b) {
    b.addEventListener("click", function () { setScanEditMode(b.getAttribute("data-mode")); });
  });
  document.getElementById("scanRotateLeftBtn").addEventListener("click", function () {
    scanEditState.rotation = (scanEditState.rotation + 270) % 360;
    if (scanEditMode === "crop") setScanEditMode("filter"); else drawScanEditor();
  });
  document.getElementById("scanRotateRightBtn").addEventListener("click", function () {
    scanEditState.rotation = (scanEditState.rotation + 90) % 360;
    if (scanEditMode === "crop") setScanEditMode("filter"); else drawScanEditor();
  });
  document.getElementById("scanCropResetBtn").addEventListener("click", function () {
    scanEditState.quad = SCAN_FULL_QUAD.map(function (p) { return { x: p.x, y: p.y }; });
    placeScanHandles();
  });
  document.querySelectorAll(".scan-filter-btn").forEach(function (b) {
    b.addEventListener("click", function () {
      scanEditState.filter = b.getAttribute("data-filter");
      setScanEditMode("filter");
    });
  });
  scanBrightness.addEventListener("input", function () {
    scanEditState.brightness = parseInt(scanBrightness.value, 10) || 0;
    drawScanEditor();
  });
  document.getElementById("scanEditDoneBtn").addEventListener("click", function () {
    var page = scanPages[scanEditIndex];
    if (page) {
      page.quad = isFullQuad(scanEditState.quad) ? null : scanEditState.quad;
      page.rotation = scanEditState.rotation;
      page.filter = scanEditState.filter;
      page.brightness = scanEditState.brightness;
      page.out = null;
    }
    closeScanEditor();
    renderScanPages();
  });
  document.getElementById("scanEditCancelBtn").addEventListener("click", closeScanEditor);
  document.getElementById("scanEditDeleteBtn").addEventListener("click", function () {
    if (scanEditIndex >= 0) scanPages.splice(scanEditIndex, 1);
    closeScanEditor();
    renderScanPages();
  });

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

  function addScanFiles(files, edit) {
    var list = Array.prototype.slice.call(files || []).filter(function (f) { return /^image\//.test(f.type || "image/"); });
    return list.reduce(function (p, file) {
      return p.then(function () {
        return scanLoadImage(file).then(function (canvas) {
          scanPages.push(scanNewPage(canvas));
        }, function () {});
      });
    }, Promise.resolve()).then(function () {
      renderScanPages();
      // straight from the camera -> straight into the editor
      if (edit && list.length) openScanEditor(scanPages.length - 1);
    });
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
      addScanFiles(input.files, input === scanCameraInput);
      input.value = "";
    });
  });
  // the switch sets every page's filter (each can still be changed in the editor)
  scanDocMode.addEventListener("change", function () {
    scanPages.forEach(function (p) { p.filter = scanDocMode.checked ? "doc" : "color"; p.out = null; });
    renderScanPages();
  });
  scanSaveBtn.addEventListener("click", pickScanFolder);
  document.getElementById("scanCancelBtn").addEventListener("click", function () {
    if (scanPages.length) askConfirm(tr("scanDiscardConfirm"), closeScanOverlay);
    else closeScanOverlay();
  });
