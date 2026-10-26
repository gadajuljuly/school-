
  // ---------------------------------------------------------------------
  // סקיצה – saving / sharing only part of it. "שמירה" and 📤 first ask:
  // the whole sketch, or an area. For an area the rest of the page dims,
  // a finger marks a rectangle (dragging outside it marks a new one), its
  // yellow corner dots resize it and dragging inside it moves it; two
  // fingers still zoom and pan. ✓ hands that rectangle (world units) to
  // the export, which then draws just it.
  // ---------------------------------------------------------------------
  var skAreaChoice = document.getElementById("sketchAreaChoiceOverlay");
  var skAreaBar = document.getElementById("sketchAreaBar");
  var skAreaPending = null; // what to do with the canvas
  sk.crop = null;           // { r: {x0,y0,x1,y1}, drag }

  // asks whole / area, then done(canvas)
  function skPickExportArea(titleKey, done) {
    if (!sk.els.length) { showToast(tr("sketchEmptyMsg")); return; }
    skAreaPending = done;
    document.getElementById("sketchAreaChoiceTitle").textContent = tr(titleKey);
    skAreaChoice.hidden = false;
  }
  document.getElementById("sketchAreaAllBtn").addEventListener("click", function () {
    skAreaChoice.hidden = true;
    var done = skAreaPending;
    skAreaPending = null;
    var canvas = skRenderForExport();
    if (!canvas) { showToast(tr("sketchEmptyMsg")); return; }
    if (done) done(canvas);
  });
  document.getElementById("sketchAreaPickBtn").addEventListener("click", function () {
    skAreaChoice.hidden = true;
    // to start with: the middle of the screen
    var dpr = window.devicePixelRatio || 1, W = skCanvas.width / dpr, H = skCanvas.height / dpr;
    var a = skToWorld(W * 0.12, H * 0.18), b = skToWorld(W * 0.88, H * 0.82);
    sk.crop = { r: { x0: a.x, y0: a.y, x1: b.x, y1: b.y }, drag: null };
    sketchView.classList.add("sk-cropping");
    skAreaBar.hidden = false;
    skDraw();
  });
  document.getElementById("sketchAreaChoiceCancelBtn").addEventListener("click", function () {
    skAreaChoice.hidden = true;
    skAreaPending = null;
  });
  function skEndCrop() {
    sk.crop = null;
    sketchView.classList.remove("sk-cropping");
    skAreaBar.hidden = true;
    skDraw();
  }
  document.getElementById("sketchAreaOkBtn").addEventListener("click", function () {
    var r = sk.crop && sk.crop.r, done = skAreaPending;
    skAreaPending = null;
    skEndCrop();
    if (!r || !done) return;
    done(skRenderForExport(r));
  });
  document.getElementById("sketchAreaCancelBtn").addEventListener("click", function () {
    skAreaPending = null;
    skEndCrop();
  });

  function skCropNorm(r) {
    return { x0: Math.min(r.x0, r.x1), y0: Math.min(r.y0, r.y1), x1: Math.max(r.x0, r.x1), y1: Math.max(r.y0, r.y1) };
  }
  function skCropCorners(r) {
    return [{ x: r.x0, y: r.y0 }, { x: r.x1, y: r.y0 }, { x: r.x1, y: r.y1 }, { x: r.x0, y: r.y1 }];
  }
  // pointer handlers, called from the canvas's own while marking
  function skCropDown(p) {
    var c = sk.crop, r = c.r, sp = skToScreen(p);
    var corners = skCropCorners(r);
    for (var i = 0; i < 4; i++) {
      if (skDist(sp, skToScreen(corners[i])) < 24) {
        var opp = corners[(i + 2) % 4];
        c.drag = { mode: "corner", fixed: opp };
        return;
      }
    }
    if (p.x > r.x0 && p.x < r.x1 && p.y > r.y0 && p.y < r.y1) {
      c.drag = { mode: "move", start: p, r0: Object.assign({}, r) };
      return;
    }
    c.drag = { mode: "new", start: p, prev: Object.assign({}, r) };
    c.r = { x0: p.x, y0: p.y, x1: p.x, y1: p.y };
    skDraw();
  }
  function skCropMove(p) {
    var c = sk.crop, d = c.drag;
    if (!d) return;
    if (d.mode === "move") {
      var dx = p.x - d.start.x, dy = p.y - d.start.y;
      c.r = { x0: d.r0.x0 + dx, y0: d.r0.y0 + dy, x1: d.r0.x1 + dx, y1: d.r0.y1 + dy };
    } else if (d.mode === "corner") {
      c.r = skCropNorm({ x0: d.fixed.x, y0: d.fixed.y, x1: p.x, y1: p.y });
    } else {
      c.r = skCropNorm({ x0: d.start.x, y0: d.start.y, x1: p.x, y1: p.y });
    }
    skDraw();
  }
  function skCropEnd() {
    var c = sk.crop, d = c.drag;
    c.drag = null;
    c.r = skCropNorm(c.r);
    // too small to mean anything (a tap): keep what was marked before
    if ((c.r.x1 - c.r.x0) * sk.view.z < 16 || (c.r.y1 - c.r.y0) * sk.view.z < 16) {
      if (d && d.prev) c.r = d.prev;
    }
    skDraw();
  }
  // the dimmed page around the area, its frame and the four dots
  function skDrawCrop(ctx) {
    if (!sk.crop) return;
    var dpr = window.devicePixelRatio || 1, W = skCanvas.width / dpr, H = skCanvas.height / dpr;
    var r = skCropNorm(sk.crop.r), a = skToScreen({ x: r.x0, y: r.y0 }), b = skToScreen({ x: r.x1, y: r.y1 });
    ctx.save();
    ctx.beginPath();
    ctx.rect(0, 0, W, H);
    ctx.rect(a.x, a.y, b.x - a.x, b.y - a.y);
    ctx.fillStyle = "rgba(20, 30, 50, 0.45)";
    ctx.fill("evenodd");
    ctx.strokeStyle = "#fff"; ctx.lineWidth = 3;
    ctx.strokeRect(a.x, a.y, b.x - a.x, b.y - a.y);
    ctx.strokeStyle = "#2e4fb8"; ctx.lineWidth = 1.5; ctx.setLineDash([7, 5]);
    ctx.strokeRect(a.x, a.y, b.x - a.x, b.y - a.y);
    ctx.setLineDash([]);
    ctx.shadowColor = "rgba(0,0,0,0.35)"; ctx.shadowBlur = 4;
    [[a.x, a.y], [b.x, a.y], [b.x, b.y], [a.x, b.y]].forEach(function (q) {
      ctx.beginPath(); ctx.arc(q[0], q[1], 10, 0, Math.PI * 2);
      ctx.fillStyle = "#ffd400"; ctx.fill();
      ctx.strokeStyle = "#8a6d00"; ctx.lineWidth = 2; ctx.stroke();
    });
    ctx.restore();
  }
