
  // ---------------------------------------------------------------------
  // סקיצה: a quick site-sketch pad on light-blue squared paper. Everything
  // drawn is kept as shapes (not pixels) in world units - one grid square
  // is SK_CELL units - so it can be zoomed, erased shape by shape, undone,
  // measured and redrawn sharp for the PDF.
  //   tools: pen (a held stroke end turns it into a straight line /
  //   rectangle / circle), straight line, wall, dimension (two arrows and a
  //   number or word in the middle), callout (an arrow from a point to a
  //   horizontal shelf with text on it), text, door, window, stairs, north
  //   arrow, eraser, hand (pan; two fingers pan and zoom with any tool).
  //   With a scale set (a square = so many cm/m) straight lines show their
  //   real length and dimensions fill it in.
  // A draft per project is kept in localStorage until saved or cleared.
  // ---------------------------------------------------------------------
  var SK_CELL = 20;
  var SK_COLORS = ["#1f1f1f", "#2e4fb8", "#c62828", "#2e7d32", "#c05023"];
  var SK_WIDTHS = [1.5, 3, 6];
  var sketchView = document.getElementById("sketchView");
  var skCanvas = document.getElementById("sketchCanvas");
  var skCtx = skCanvas.getContext("2d");
  var skLenTip = document.getElementById("sketchLenTip");
  var sk = {
    sheetId: null,
    els: [],            // the drawing
    undo: [], redo: [],
    tool: "pen", color: SK_COLORS[0], width: 1,
    snap: true,
    scale: null,        // { per: 50, unit: "cm" } - one square
    view: { x: 0, y: 0, z: 1 }, // screen = (world - x) * z
    draft: null,        // the element being drawn
    images: {}          // decoded background images by element id
  };

  function skDraftKey() { return "itask-sketch:" + sk.sheetId; }
  function skSaveDraft() {
    try {
      localStorage.setItem(skDraftKey(), JSON.stringify({ els: sk.els, scale: sk.scale, view: sk.view }));
    } catch (e) {}
  }
  function skLoadDraft() {
    var d = null;
    try { d = JSON.parse(localStorage.getItem(skDraftKey()) || "null"); } catch (e) {}
    sk.els = (d && d.els) || [];
    sk.scale = (d && d.scale) || null;
    sk.view = (d && d.view) || { x: -40, y: -40, z: 1 };
    sk.undo = []; sk.redo = [];
    sk.objSel = null;
    sk.bgSel = false;
  }
  function skCommit(fn) {
    sk.undo.push(JSON.stringify(sk.els));
    if (sk.undo.length > 80) sk.undo.shift();
    sk.redo = [];
    fn();
    skSaveDraft();
    skDraw();
    skUpdateButtons();
  }

  // ---- coordinates ----------------------------------------------------
  function skToWorld(sx, sy) { return { x: sx / sk.view.z + sk.view.x, y: sy / sk.view.z + sk.view.y }; }
  function skToScreen(p) { return { x: (p.x - sk.view.x) * sk.view.z, y: (p.y - sk.view.y) * sk.view.z }; }
  function skEventPoint(e) {
    var r = skCanvas.getBoundingClientRect();
    return skToWorld(e.clientX - r.left, e.clientY - r.top);
  }
  // with # on, a point near the end of a line already drawn (or a corner)
  // is caught exactly on it; otherwise on the grid
  function skEndPoints() {
    var out = [];
    sk.els.forEach(function (el) {
      if (el.type === "line" || el.type === "wall" || el.type === "dim" || el.type === "door" || el.type === "window") out.push(el.a, el.b);
      else if (el.type === "rect" || el.type === "stairs") out.push(el.a, el.b, { x: el.a.x, y: el.b.y }, { x: el.b.x, y: el.a.y });
      else if (el.type === "stroke" && el.pts.length > 1) {
        // a straightened stroke's corners, a freehand one's two ends
        if (el.pts.length <= 13) out.push.apply(out, el.pts);
        else out.push(el.pts[0], el.pts[el.pts.length - 1]);
      }
    });
    return out;
  }
  function skEndSnap(p) {
    if (!sk.snap) return null;
    var best = null, bestD = 16 / sk.view.z;
    skEndPoints().forEach(function (q) {
      var d = skDist(p, q);
      if (d < bestD) { bestD = d; best = q; }
    });
    sk.snapMark = best ? { x: best.x, y: best.y } : null;
    return sk.snapMark;
  }
  function skSnapPoint(p) {
    if (!sk.snap) return p;
    var e = skEndSnap(p);
    if (e) return { x: e.x, y: e.y };
    var g = SK_CELL / 2;
    return { x: Math.round(p.x / g) * g, y: Math.round(p.y / g) * g };
  }
  function skDist(a, b) { return Math.hypot(a.x - b.x, a.y - b.y); }
  // a dimension can be shifted sideways (off) from the points it measures
  function skDimLine(el) {
    var off = el.off || 0, len = skDist(el.a, el.b) || 1;
    var nx = -(el.b.y - el.a.y) / len * off, ny = (el.b.x - el.a.x) / len * off;
    return { a: { x: el.a.x + nx, y: el.a.y + ny }, b: { x: el.b.x + nx, y: el.b.y + ny } };
  }
  // straight lines lock to 0/45/90 degrees when close to them
  function skSnapAngle(a, b) {
    var ang = Math.atan2(b.y - a.y, b.x - a.x);
    var step = Math.PI / 4;
    var near = Math.round(ang / step) * step;
    if (Math.abs(ang - near) > 0.12) return b;
    var len = skDist(a, b);
    return { x: a.x + Math.cos(near) * len, y: a.y + Math.sin(near) * len };
  }
  function skRealLength(len) {
    if (!sk.scale) return "";
    var v = len / SK_CELL * sk.scale.per; // in the scale's unit
    var m = sk.scale.unit === "cm" ? v / 100 : v;
    return (m >= 10 ? m.toFixed(1) : m.toFixed(2)) + " " + tr("sketchMeterShort");
  }

  // ---- drawing --------------------------------------------------------
  function skResize() {
    var r = skCanvas.parentNode.getBoundingClientRect();
    var dpr = window.devicePixelRatio || 1;
    skCanvas.width = Math.round(r.width * dpr);
    skCanvas.height = Math.round(r.height * dpr);
    skCanvas.style.width = r.width + "px";
    skCanvas.style.height = r.height + "px";
    skDraw();
  }
  function skDrawGrid(ctx, w, h, view) {
    ctx.fillStyle = "#ffffff";
    ctx.fillRect(0, 0, w, h);
    var step = SK_CELL * view.z;
    if (step < 4) return;
    var x0 = Math.floor(view.x / SK_CELL), y0 = Math.floor(view.y / SK_CELL);
    var cols = Math.ceil(w / step) + 2, rows = Math.ceil(h / step) + 2;
    for (var i = 0; i < cols; i++) {
      var gx = (x0 + i) * SK_CELL, sx = (gx - view.x) * view.z;
      ctx.strokeStyle = (x0 + i) % 5 === 0 ? "#9cc3ea" : "#d7e8f8";
      ctx.lineWidth = (x0 + i) % 5 === 0 ? 1 : 0.7;
      ctx.beginPath(); ctx.moveTo(sx, 0); ctx.lineTo(sx, h); ctx.stroke();
    }
    for (var j = 0; j < rows; j++) {
      var gy = (y0 + j) * SK_CELL, sy = (gy - view.y) * view.z;
      ctx.strokeStyle = (y0 + j) % 5 === 0 ? "#9cc3ea" : "#d7e8f8";
      ctx.lineWidth = (y0 + j) % 5 === 0 ? 1 : 0.7;
      ctx.beginPath(); ctx.moveTo(0, sy); ctx.lineTo(w, sy); ctx.stroke();
    }
  }
  function skArrowHead(ctx, tip, from, size) {
    var ang = Math.atan2(tip.y - from.y, tip.x - from.x);
    ctx.beginPath();
    ctx.moveTo(tip.x, tip.y);
    ctx.lineTo(tip.x - size * Math.cos(ang - 0.4), tip.y - size * Math.sin(ang - 0.4));
    ctx.lineTo(tip.x - size * Math.cos(ang + 0.4), tip.y - size * Math.sin(ang + 0.4));
    ctx.closePath();
    ctx.fill();
  }
  function skLabel(ctx, text, x, y, angle, size, color, boxed) {
    ctx.save();
    ctx.translate(x, y);
    if (angle) ctx.rotate(angle);
    ctx.font = "700 " + size + "px Assistant, Arial, sans-serif";
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    if (boxed) {
      var w = ctx.measureText(text).width + size * 0.6;
      ctx.fillStyle = "rgba(255,255,255,0.92)";
      ctx.fillRect(-w / 2, -size * 0.65, w, size * 1.3);
    }
    ctx.fillStyle = color;
    ctx.fillText(text, 0, 0);
    ctx.restore();
  }
  // Draws one element; view = {x,y,z} maps world to the canvas.
  function skDrawEl(ctx, el, view) {
    var z = view.z;
    var P = function (p) { return { x: (p.x - view.x) * z, y: (p.y - view.y) * z }; };
    var lw = (el.w || SK_WIDTHS[1]) * z;
    ctx.strokeStyle = ctx.fillStyle = el.color || "#1f1f1f";
    ctx.lineWidth = lw;
    ctx.lineCap = "round";
    ctx.lineJoin = "round";
    if (el.type === "stroke") {
      ctx.beginPath();
      el.pts.forEach(function (p, i) { var s = P(p); if (i) ctx.lineTo(s.x, s.y); else ctx.moveTo(s.x, s.y); });
      ctx.stroke();
    } else if (el.type === "line" || el.type === "wall") {
      var a = P(el.a), b = P(el.b);
      if (el.type === "wall") ctx.lineWidth = Math.max(lw, 7 * z), ctx.lineCap = "butt";
      ctx.beginPath(); ctx.moveTo(a.x, a.y); ctx.lineTo(b.x, b.y); ctx.stroke();
      var len = skRealLength(skDist(el.a, el.b));
      if (len && skDist(el.a, el.b) > SK_CELL * 1.5) {
        var ang = Math.atan2(b.y - a.y, b.x - a.x);
        if (ang > Math.PI / 2 || ang < -Math.PI / 2) ang += Math.PI;
        var nx = -Math.sin(ang) * 11 * Math.max(0.7, z), ny = Math.cos(ang) * 11 * Math.max(0.7, z);
        skLabel(ctx, len, (a.x + b.x) / 2 - nx, (a.y + b.y) / 2 - ny, ang, 11 * Math.max(0.8, z), "#2e4fb8", true);
      }
    } else if (el.type === "rect") {
      var r1 = P(el.a), r2 = P(el.b);
      ctx.strokeRect(Math.min(r1.x, r2.x), Math.min(r1.y, r2.y), Math.abs(r2.x - r1.x), Math.abs(r2.y - r1.y));
    } else if (el.type === "circle") {
      var c = P(el.c);
      ctx.beginPath();
      if (el.rx) ctx.ellipse(c.x, c.y, el.rx * z, el.ry * z, 0, 0, Math.PI * 2);
      else ctx.arc(c.x, c.y, el.r * z, 0, Math.PI * 2);
      ctx.stroke();
    } else if (el.type === "dim") {
      var dl = skDimLine(el), d1 = P(dl.a), d2 = P(dl.b);
      ctx.lineWidth = Math.max(1, 1.3 * z);
      if (Math.abs(el.off || 0) > 1) {
        // extension lines from the measured points, a little past the dimension
        var ex = (d1.x - P(el.a).x) / Math.abs(el.off * z), ey = (d1.y - P(el.a).y) / Math.abs(el.off * z);
        ctx.save();
        ctx.lineWidth = Math.max(0.8, 0.9 * z);
        [[P(el.a), d1], [P(el.b), d2]].forEach(function (q) {
          ctx.beginPath();
          ctx.moveTo(q[0].x + ex * 3 * z, q[0].y + ey * 3 * z);
          ctx.lineTo(q[1].x + ex * 5 * z, q[1].y + ey * 5 * z);
          ctx.stroke();
        });
        ctx.restore();
      }
      ctx.beginPath(); ctx.moveTo(d1.x, d1.y); ctx.lineTo(d2.x, d2.y); ctx.stroke();
      // short ticks across the ends, arrows at both
      var da = Math.atan2(d2.y - d1.y, d2.x - d1.x);
      var tx = -Math.sin(da) * 6 * z, ty = Math.cos(da) * 6 * z;
      [d1, d2].forEach(function (p) { ctx.beginPath(); ctx.moveTo(p.x - tx, p.y - ty); ctx.lineTo(p.x + tx, p.y + ty); ctx.stroke(); });
      skArrowHead(ctx, d1, d2, 9 * Math.max(0.7, z));
      skArrowHead(ctx, d2, d1, 9 * Math.max(0.7, z));
      var la = da;
      if (la > Math.PI / 2 || la < -Math.PI / 2) la += Math.PI;
      var text = el.text || skRealLength(skDist(el.a, el.b));
      if (text) skLabel(ctx, text, (d1.x + d2.x) / 2, (d1.y + d2.y) / 2, la, 13 * Math.max(0.8, z), el.color, true);
    } else if (el.type === "leader") {
      // arrow tip at a, line to the elbow b, then a horizontal shelf with
      // the text standing on it, running away from the tip
      var t1 = P(el.a), t2 = P(el.b);
      ctx.lineWidth = Math.max(1, 1.4 * z);
      var size = 13 * Math.max(0.8, z);
      ctx.font = "700 " + size + "px Assistant, Arial, sans-serif";
      var tw = ctx.measureText(el.text || "").width + 10;
      var dirx = t2.x >= t1.x ? 1 : -1;
      var t3 = { x: t2.x + dirx * tw, y: t2.y };
      ctx.beginPath(); ctx.moveTo(t1.x, t1.y); ctx.lineTo(t2.x, t2.y); ctx.lineTo(t3.x, t3.y); ctx.stroke();
      skArrowHead(ctx, t1, t2, 10 * Math.max(0.7, z));
      ctx.save();
      ctx.textAlign = "center";
      ctx.textBaseline = "bottom";
      ctx.fillText(el.text || "", (t2.x + t3.x) / 2, t2.y - 2);
      ctx.restore();
    } else if (el.type === "text") {
      var tp = P(el.p);
      ctx.save();
      ctx.font = "700 " + (el.size || 16) * z + "px Assistant, Arial, sans-serif";
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";
      ctx.fillText(el.text, tp.x, tp.y);
      ctx.restore();
    } else if (el.type === "door") {
      // hinge at a, leaf to b, swing arc a quarter turn
      var h = P(el.a), e = P(el.b);
      var rr = skDist(h, e), a0 = Math.atan2(e.y - h.y, e.x - h.x);
      ctx.lineWidth = Math.max(1.2, 2 * z);
      ctx.beginPath(); ctx.moveTo(h.x, h.y); ctx.lineTo(e.x, e.y); ctx.stroke();
      ctx.setLineDash([4 * z, 3 * z]);
      ctx.beginPath(); ctx.arc(h.x, h.y, rr, a0, a0 + Math.PI / 2); ctx.stroke();
      ctx.setLineDash([]);
    } else if (el.type === "window") {
      var w1 = P(el.a), w2 = P(el.b);
      var wa = Math.atan2(w2.y - w1.y, w2.x - w1.x);
      var ox = -Math.sin(wa) * 4 * z, oy = Math.cos(wa) * 4 * z;
      ctx.lineWidth = Math.max(1, 1.4 * z);
      [-1, 0, 1].forEach(function (k) {
        ctx.beginPath(); ctx.moveTo(w1.x + ox * k, w1.y + oy * k); ctx.lineTo(w2.x + ox * k, w2.y + oy * k); ctx.stroke();
      });
    } else if (el.type === "stairs") {
      var s1 = P(el.a), s2 = P(el.b);
      var x = Math.min(s1.x, s2.x), y = Math.min(s1.y, s2.y), w = Math.abs(s2.x - s1.x), hh = Math.abs(s2.y - s1.y);
      ctx.lineWidth = Math.max(1, 1.4 * z);
      ctx.strokeRect(x, y, w, hh);
      var along = w >= hh, n = Math.max(3, Math.round((along ? w : hh) / (10 * z)));
      for (var k = 1; k < n; k++) {
        ctx.beginPath();
        if (along) { ctx.moveTo(x + w * k / n, y); ctx.lineTo(x + w * k / n, y + hh); }
        else { ctx.moveTo(x, y + hh * k / n); ctx.lineTo(x + w, y + hh * k / n); }
        ctx.stroke();
      }
      var m1 = along ? { x: x + 4 * z, y: y + hh / 2 } : { x: x + w / 2, y: y + hh - 4 * z };
      var m2 = along ? { x: x + w - 4 * z, y: y + hh / 2 } : { x: x + w / 2, y: y + 4 * z };
      ctx.beginPath(); ctx.moveTo(m1.x, m1.y); ctx.lineTo(m2.x, m2.y); ctx.stroke();
      skArrowHead(ctx, m2, m1, 8 * Math.max(0.7, z));
    } else if (el.type === "north") {
      var n0 = P(el.p), L = 26 * z;
      ctx.lineWidth = Math.max(1.2, 1.6 * z);
      ctx.beginPath(); ctx.arc(n0.x, n0.y, L * 0.7, 0, Math.PI * 2); ctx.stroke();
      ctx.beginPath(); ctx.moveTo(n0.x, n0.y - L); ctx.lineTo(n0.x - L * 0.3, n0.y + L * 0.4); ctx.lineTo(n0.x, n0.y + L * 0.15); ctx.closePath(); ctx.fill();
      skLabel(ctx, "N", n0.x, n0.y - L - 8 * z, 0, 12 * Math.max(0.8, z), el.color);
    } else if (el.type === "obj") {
      skDrawObj(ctx, el, view);
    } else if (el.type === "image" || el.type === "fill") {
      var img = sk.images[el.id];
      if (!img) {
        img = new Image();
        img.onload = function () { skDraw(); };
        img.src = el.src;
        sk.images[el.id] = img;
      }
      if (img.complete && img.naturalWidth) {
        var ip = P(el.p);
        ctx.save();
        ctx.globalAlpha = el.type === "fill" ? 1 : 0.55;
        ctx.drawImage(el.pattern ? skFillArt(el, img) : img, ip.x, ip.y, el.w * z, el.h * z);
        ctx.restore();
      }
    }
  }
  // background picture, then painted areas, then everything drawn on top
  function skDrawLayers(ctx, view) {
    sk.els.forEach(function (el) { if (el.type === "image") skDrawEl(ctx, el, view); });
    sk.els.forEach(function (el) { if (el.type === "fill") skDrawEl(ctx, el, view); });
    sk.els.forEach(function (el) { if (el.type !== "image" && el.type !== "fill") skDrawEl(ctx, el, view); });
  }
  function skDraw() {
    if (sketchView.hidden) return;
    var dpr = window.devicePixelRatio || 1;
    var w = skCanvas.width / dpr, h = skCanvas.height / dpr;
    skCtx.setTransform(dpr, 0, 0, dpr, 0, 0);
    skDrawGrid(skCtx, w, h, sk.view);
    skDrawLayers(skCtx, sk.view);
    if (sk.draft) skDrawEl(skCtx, sk.draft, sk.view);
    skDrawObjSelection(skCtx, sk.view);
    skDrawCrop(skCtx);
    var bgShown = skBgSelected();
    if (bgShown) {
      var b0 = skToScreen(bgShown.p), bx = skBgCloseScreen(bgShown);
      skCtx.save();
      skCtx.strokeStyle = "#2e4fb8"; skCtx.lineWidth = 2; skCtx.setLineDash([8, 5]);
      skCtx.strokeRect(b0.x, b0.y, bgShown.w * sk.view.z, bgShown.h * sk.view.z);
      skCtx.setLineDash([]);
      skCtx.shadowColor = "rgba(0,0,0,0.35)"; skCtx.shadowBlur = 4;
      skCtx.beginPath(); skCtx.arc(bx.x, bx.y, 14, 0, Math.PI * 2);
      skCtx.fillStyle = "#d32f2f"; skCtx.fill();
      skCtx.shadowBlur = 0;
      skCtx.strokeStyle = "#fff"; skCtx.lineWidth = 3; skCtx.lineCap = "round";
      skCtx.beginPath(); skCtx.moveTo(bx.x - 5, bx.y - 5); skCtx.lineTo(bx.x + 5, bx.y + 5); skCtx.moveTo(bx.x + 5, bx.y - 5); skCtx.lineTo(bx.x - 5, bx.y + 5); skCtx.stroke();
      skCtx.restore();
    }
    if (sk.draft && sk.snapMark) {
      // the caught end: a green square
      var sm = skToScreen(sk.snapMark);
      skCtx.save();
      skCtx.strokeStyle = "#1e9e3a"; skCtx.lineWidth = 2.5;
      skCtx.strokeRect(sm.x - 7, sm.y - 7, 14, 14);
      skCtx.restore();
    }
    var scaleLabel = document.getElementById("sketchScaleLabel");
    scaleLabel.textContent = sk.scale ? tr("sketchScaleNow").replace("{n}", sk.scale.per + " " + tr(sk.scale.unit === "cm" ? "sketchUnitCm" : "sketchUnitM")) : tr("sketchNoScale");
  }

  // ---- recognizing a held stroke ---------------------------------------
  // straight line / rectangle / circle, or null to keep it freehand
  function skRecognize(pts) {
    if (pts.length < 4) return null;
    var a = pts[0], b = pts[pts.length - 1];
    var len = 0;
    for (var i = 1; i < pts.length; i++) len += skDist(pts[i - 1], pts[i]);
    var chord = skDist(a, b);
    if (chord > 0 && len / chord < 1.15) return { type: "line", a: skSnapPoint(a), b: skSnapPoint(skSnapAngle(a, b)) };
    if (chord > len * 0.25) return skPolyline(pts); // not closed
    var minx = Infinity, miny = Infinity, maxx = -Infinity, maxy = -Infinity;
    pts.forEach(function (p) {
      minx = Math.min(minx, p.x); maxx = Math.max(maxx, p.x); miny = Math.min(miny, p.y); maxy = Math.max(maxy, p.y);
    });
    var w = maxx - minx, h = maxy - miny, size = Math.max(w, h);
    if (size < 8) return null;
    var cx = (minx + maxx) / 2, cy = (miny + maxy) / 2, rx = w / 2 || 1, ry = h / 2 || 1;
    // how far, on average, the stroke strays from an ellipse in its box
    // and from the box's own sides - whichever it hugs closer wins
    var ellErr = 0, boxErr = 0;
    pts.forEach(function (p) {
      var nx = (p.x - cx) / rx, ny = (p.y - cy) / ry;
      ellErr += Math.abs(Math.hypot(nx, ny) - 1) * Math.min(rx, ry);
      boxErr += Math.min(Math.abs(p.x - minx), Math.abs(p.x - maxx), Math.abs(p.y - miny), Math.abs(p.y - maxy));
    });
    ellErr /= pts.length; boxErr /= pts.length;
    // a triangle, pentagon, hexagon... hugs its own straight sides closer
    var poly = skClosedPolygon(pts, size);
    if (poly && poly.pts.length === 5 && boxErr < size * 0.06) poly = null; // four square corners: a rectangle
    if (poly && poly.err < ellErr && poly.err < boxErr * 0.8) return { type: "stroke", pts: poly.pts };
    if (Math.min(ellErr, boxErr) > size * 0.12) return poly ? { type: "stroke", pts: poly.pts } : null;
    if (ellErr <= boxErr) {
      var ratio = rx / ry;
      if (ratio > 0.8 && ratio < 1.25) return { type: "circle", c: skSnapPoint({ x: cx, y: cy }), r: (rx + ry) / 2 };
      return { type: "circle", c: skSnapPoint({ x: cx, y: cy }), r: (rx + ry) / 2, rx: rx, ry: ry };
    }
    return { type: "rect", a: skSnapPoint({ x: minx, y: miny }), b: skSnapPoint({ x: maxx, y: maxy }) };
  }

  // several lines in one stroke: each straight run becomes a straight line
  // between its corners, keeping the direction it was drawn in
  function skPolyline(pts) {
    var minx = Infinity, miny = Infinity, maxx = -Infinity, maxy = -Infinity;
    pts.forEach(function (p) {
      minx = Math.min(minx, p.x); maxx = Math.max(maxx, p.x); miny = Math.min(miny, p.y); maxy = Math.max(maxy, p.y);
    });
    var keep = {};
    keep[0] = keep[pts.length - 1] = true;
    skRdp(pts, Math.max(6, Math.max(maxx - minx, maxy - miny) * 0.06), 0, pts.length - 1, keep);
    var idx = Object.keys(keep).map(Number).sort(function (x, y) { return x - y; });
    var out = idx.map(function (i) { return { x: pts[i].x, y: pts[i].y }; });
    // drop runs too short to be a line of their own
    out = out.filter(function (p, i) { return i === 0 || i === out.length - 1 || skDist(p, out[i - 1]) > 6; });
    if (out.length < 3 || out.length > 12) return null;
    return { type: "stroke", pts: out };
  }

  // a closed stroke as a polygon of 3-8 straight sides: { pts, err } or null.
  // One that is nearly regular is made exactly regular.
  function skClosedPolygon(pts, size) {
    var keep = {};
    keep[0] = keep[pts.length - 1] = true;
    skRdp(pts, Math.max(6, size * 0.06), 0, pts.length - 1, keep);
    var v = Object.keys(keep).map(Number).sort(function (x, y) { return x - y; })
      .map(function (i) { return { x: pts[i].x, y: pts[i].y }; });
    v.pop(); // the end meets the start
    v = v.filter(function (p, i) { return !i || skDist(p, v[i - 1]) > size * 0.08; });
    // the start was mid-side: no corner there
    var turn = function (i) {
      var a = v[(i + v.length - 1) % v.length], b = v[i], c = v[(i + 1) % v.length];
      var a1 = Math.atan2(b.y - a.y, b.x - a.x), a2 = Math.atan2(c.y - b.y, c.x - b.x);
      return Math.abs(Math.atan2(Math.sin(a2 - a1), Math.cos(a2 - a1)));
    };
    for (var i = v.length - 1; i >= 0 && v.length > 3; i--) if (turn(i) < 0.35) v.splice(i, 1);
    if (v.length < 3 || v.length > 8) return null;
    var n = v.length, cx = 0, cy = 0;
    v.forEach(function (p) { cx += p.x / n; cy += p.y / n; });
    var sides = v.map(function (p, k) { return skDist(p, v[(k + 1) % n]); });
    var radii = v.map(function (p) { return skDist(p, { x: cx, y: cy }); });
    var mean = function (a) { return a.reduce(function (x, y) { return x + y; }, 0) / a.length; };
    var ms = mean(sides), mr = mean(radii);
    var even = function (a, m) { return a.every(function (x) { return Math.abs(x - m) < m * 0.22; }); };
    if (even(sides, ms) && even(radii, mr)) {
      var area = 0;
      v.forEach(function (p, k) { var q = v[(k + 1) % n]; area += p.x * q.y - q.x * p.y; });
      var step = (area < 0 ? -1 : 1) * Math.PI * 2 / n, sx = 0, sy = 0;
      v.forEach(function (p, k) {
        var a0 = Math.atan2(p.y - cy, p.x - cx) - k * step;
        sx += Math.cos(a0); sy += Math.sin(a0);
      });
      var start = Math.atan2(sy, sx);
      v = v.map(function (p, k) { return { x: cx + mr * Math.cos(start + k * step), y: cy + mr * Math.sin(start + k * step) }; });
    }
    var err = 0;
    pts.forEach(function (p) {
      var d = Infinity;
      for (var k = 0; k < n; k++) d = Math.min(d, skSegDist(p, v[k], v[(k + 1) % n]));
      err += d;
    });
    return { pts: v.concat([{ x: v[0].x, y: v[0].y }]), err: err / pts.length };
  }

  // ---- hit testing (eraser) ---------------------------------------------
  function skSegDist(p, a, b) {
    var dx = b.x - a.x, dy = b.y - a.y, l2 = dx * dx + dy * dy;
    var t = l2 ? Math.max(0, Math.min(1, ((p.x - a.x) * dx + (p.y - a.y) * dy) / l2)) : 0;
    return Math.hypot(p.x - (a.x + t * dx), p.y - (a.y + t * dy));
  }
  function skHit(el, p, tol) {
    switch (el.type) {
      case "stroke":
        for (var i = 1; i < el.pts.length; i++) if (skSegDist(p, el.pts[i - 1], el.pts[i]) < tol) return true;
        return false;
      case "dim":
        var dl = skDimLine(el);
        return skSegDist(p, dl.a, dl.b) < tol;
      case "line": case "wall": case "door": case "window":
        return skSegDist(p, el.a, el.b) < tol;
      case "leader":
        return skSegDist(p, el.a, el.b) < tol || (Math.abs(p.y - el.b.y) < tol && Math.abs(p.x - el.b.x) < 120);
      case "rect": case "stairs":
        var c = [el.a, { x: el.b.x, y: el.a.y }, el.b, { x: el.a.x, y: el.b.y }];
        for (var k = 0; k < 4; k++) if (skSegDist(p, c[k], c[(k + 1) % 4]) < tol) return true;
        return el.type === "stairs" && p.x > Math.min(el.a.x, el.b.x) && p.x < Math.max(el.a.x, el.b.x) && p.y > Math.min(el.a.y, el.b.y) && p.y < Math.max(el.a.y, el.b.y);
      case "circle":
        if (el.rx) return Math.abs(Math.hypot((p.x - el.c.x) / el.rx, (p.y - el.c.y) / el.ry) - 1) * Math.min(el.rx, el.ry) < tol;
        return Math.abs(skDist(p, el.c) - el.r) < tol;
      case "text": return skDist(p, el.p) < tol * 2.5;
      case "north": return skDist(p, el.p) < 30;
      case "image": return false; // removed with its own button
      case "fill": return skFillHas(el, p);
      case "obj": return skObjHas(el, p, tol / 2);
    }
    return false;
  }

  // ---- painting an area -------------------------------------------------
  // The lines around the touch are drawn into a bitmap, the area is
  // flooded from the touch, and the result is kept as a see-through
  // picture lying under the lines. An area that isn't closed isn't painted.
  var SK_FILL_ALPHA = 90; // of 255
  function skFillBarriers() {
    return sk.els.filter(function (el) {
      return ["stroke", "line", "wall", "rect", "circle", "door", "window"].indexOf(el.type) >= 0;
    });
  }
  function skFill(p) {
    var walls = skFillBarriers();
    var minx = Infinity, miny = Infinity, maxx = -Infinity, maxy = -Infinity;
    walls.forEach(function (el) {
      skSegmentsOf(el).forEach(function (sg) {
        sg.forEach(function (q) { minx = Math.min(minx, q.x); miny = Math.min(miny, q.y); maxx = Math.max(maxx, q.x); maxy = Math.max(maxy, q.y); });
      });
    });
    if (!walls.length || p.x <= minx || p.x >= maxx || p.y <= miny || p.y >= maxy) { showToast(tr("sketchFillOpen")); return; }
    minx -= 4; miny -= 4; maxx += 4; maxy += 4;
    var k = Math.min(2, 1600 / Math.max(maxx - minx, maxy - miny)); // pixels per world unit
    var W = Math.ceil((maxx - minx) * k), H = Math.ceil((maxy - miny) * k);
    var c = document.createElement("canvas");
    c.width = W; c.height = H;
    var ctx = c.getContext("2d");
    ctx.strokeStyle = "#000";
    ctx.lineCap = ctx.lineJoin = "round";
    walls.forEach(function (el) {
      // a little thicker than drawn, so a hand-drawn corner that almost meets still closes
      ctx.lineWidth = Math.max((el.type === "wall" ? 7 : (el.w || SK_WIDTHS[1])) * k, 1.5) + 3;
      ctx.beginPath();
      skSegmentsOf(el).forEach(function (sg) {
        ctx.moveTo((sg[0].x - minx) * k, (sg[0].y - miny) * k);
        ctx.lineTo((sg[1].x - minx) * k, (sg[1].y - miny) * k);
      });
      ctx.stroke();
    });
    var px = ctx.getImageData(0, 0, W, H).data;
    var ink = new Uint8Array(W * H), area = new Uint8Array(W * H);
    for (var i = 0; i < W * H; i++) ink[i] = px[i * 4 + 3] > 40 ? 1 : 0;
    var sx = Math.floor((p.x - minx) * k), sy = Math.floor((p.y - miny) * k), start = sy * W + sx;
    if (ink[start]) { showToast(tr("sketchFillOpen")); return; }
    var stack = [start], open = false, n = 0;
    area[start] = 1;
    while (stack.length) {
      var j = stack.pop(), x = j % W, y = (j - x) / W;
      n++;
      if (x === 0 || y === 0 || x === W - 1 || y === H - 1) { open = true; break; }
      [j - 1, j + 1, j - W, j + W].forEach(function (q) { if (!area[q] && !ink[q]) { area[q] = 1; stack.push(q); } });
    }
    if (open || n < 4) { showToast(tr("sketchFillOpen")); return; }
    // reach a few pixels into the lines, so no white seam shows along them
    for (var pass = 0; pass < 3; pass++) {
      var grow = [];
      for (var q = W; q < W * H - W; q++) {
        if (!area[q] && ink[q] && (area[q - 1] || area[q + 1] || area[q - W] || area[q + W])) grow.push(q);
      }
      grow.forEach(function (q2) { area[q2] = 1; });
    }
    var x0 = W, y0 = H, x1 = 0, y1 = 0;
    for (var m = 0; m < W * H; m++) {
      if (!area[m]) continue;
      var mx = m % W, my = (m - mx) / W;
      if (mx < x0) x0 = mx; if (mx > x1) x1 = mx; if (my < y0) y0 = my; if (my > y1) y1 = my;
    }
    var cw = x1 - x0 + 1, ch = y1 - y0 + 1;
    var out = document.createElement("canvas");
    out.width = cw; out.height = ch;
    var octx = out.getContext("2d"), img = octx.createImageData(cw, ch);
    var pattern = sk.fillKind && sk.fillKind !== "color" ? sk.fillKind : null;
    var hex = sk.color.replace("#", ""), r = parseInt(hex.slice(0, 2), 16), g = parseInt(hex.slice(2, 4), 16), b = parseInt(hex.slice(4, 6), 16);
    for (var yy = 0; yy < ch; yy++) {
      for (var xx = 0; xx < cw; xx++) {
        if (!area[(yy + y0) * W + xx + x0]) continue;
        var o = (yy * cw + xx) * 4;
        img.data[o] = r; img.data[o + 1] = g; img.data[o + 2] = b; img.data[o + 3] = pattern ? 235 : SK_FILL_ALPHA;
      }
    }
    octx.putImageData(img, 0, 0);
    var el = { type: "fill", id: uid(), src: out.toDataURL("image/png"), p: { x: minx + x0 / k, y: miny + y0 / k }, w: cw / k, h: ch / k, color: sk.color };
    if (pattern) {
      el.pattern = pattern;
      if (pattern === "road") el.axis = skAreaAxis(area, W, H, minx, miny, k);
    }
    skCommit(function () {
      // painting an area again replaces its old colour
      sk.els = sk.els.filter(function (e) { return !(e.type === "fill" && skFillHas(e, p)); });
      sk.els.push(el);
    });
  }
  // the long axis of a painted area (its centre, direction and half length)
  function skAreaAxis(area, W, H, minx, miny, k) {
    var n = 0, sx = 0, sy = 0, sxx = 0, syy = 0, sxy = 0;
    for (var i = 0; i < W * H; i += 2) {
      if (!area[i]) continue;
      var x = i % W, y = (i - x) / W;
      n++; sx += x; sy += y; sxx += x * x; syy += y * y; sxy += x * y;
    }
    var cx = sx / n, cy = sy / n, vxx = sxx / n - cx * cx, vyy = syy / n - cy * cy, vxy = sxy / n - cx * cy;
    var ang = 0.5 * Math.atan2(2 * vxy, vxx - vyy);
    return { cx: minx + cx / k, cy: miny + cy / k, ang: ang, len: (W + H) / k };
  }
  // is p inside the painted part of a fill (its picture's see-through pixels aside)?
  function skFillHas(el, p) {
    if (p.x < el.p.x || p.y < el.p.y || p.x > el.p.x + el.w || p.y > el.p.y + el.h) return false;
    var img = sk.images[el.id];
    if (!img || !img.naturalWidth) return true;
    if (!sk.fillMasks) sk.fillMasks = {};
    var mask = sk.fillMasks[el.id];
    if (!mask) {
      var c = document.createElement("canvas");
      c.width = img.naturalWidth; c.height = img.naturalHeight;
      c.getContext("2d").drawImage(img, 0, 0);
      mask = sk.fillMasks[el.id] = { data: c.getContext("2d").getImageData(0, 0, c.width, c.height).data, w: c.width, h: c.height };
    }
    var x = Math.min(mask.w - 1, Math.floor((p.x - el.p.x) / el.w * mask.w));
    var y = Math.min(mask.h - 1, Math.floor((p.y - el.p.y) / el.h * mask.h));
    return mask.data[(y * mask.w + x) * 4 + 3] > 0;
  }

  // ---- input --------------------------------------------------------------
  var skPointers = {};
  var skPinch = null;
  var skHoldTimer = null;
  var skLastMove = null;
  var skDimMove = null;
  // a long press on the background picture picks it up; the finger then
  // moves it about the page
  var skBgHold = null, skBgMove = null;
  function skBgAt(p) {
    return sk.els.find(function (el) {
      return el.type === "image" && p.x >= el.p.x && p.y >= el.p.y && p.x <= el.p.x + el.w && p.y <= el.p.y + el.h;
    });
  }
  // the picked-up background keeps a frame and a red ✕ (removes it) until
  // the next touch elsewhere
  function skBgSelected() { return sk.bgSel ? sk.els.find(function (el) { return el.type === "image"; }) : null; }
  // the ✕ on screen: at the picture's top corner, kept in view
  function skBgCloseScreen(el) {
    var q = skToScreen({ x: el.p.x + el.w, y: el.p.y });
    var dpr = window.devicePixelRatio || 1, W = skCanvas.width / dpr, H = skCanvas.height / dpr;
    return { x: Math.max(20, Math.min(W - 20, q.x)), y: Math.max(48, Math.min(H - 20, q.y)) };
  }
  function skBgCancel() {
    if (skBgHold) { clearTimeout(skBgHold.timer); skBgHold = null; }
    if (skBgMove) { skBgMove.el.p = skBgMove.p0; skBgMove = null; }
  }
  function skStartDraft(p) {
    var t = sk.tool, color = sk.color, w = SK_WIDTHS[sk.width];
    var s = skSnapPoint(p);
    if (t === "pen") return { type: "stroke", pts: [p], color: color, w: w };
    if (t === "line" || t === "wall") return { type: t, a: s, b: s, color: color, w: w };
    if (t === "dim" || t === "door" || t === "window" || t === "stairs") return { type: t, a: s, b: s, color: color, w: w };
    if (t === "leader") return { type: "leader", a: p, b: p, text: "", color: color, w: w };
    return null;
  }
  function skUpdateDraft(p) {
    var d = sk.draft;
    if (!d || d.locked) return; // straightened while held: final
    if (d.type === "stroke") { d.pts.push(p); return; }
    var e = d.type !== "leader" && skEndSnap(p);
    var b = e ? { x: e.x, y: e.y } : d.type === "leader" ? p : skSnapPoint(d.type === "stairs" ? p : skSnapAngle(d.a, p));
    d.b = b;
  }
  function skShowLenTip(e) {
    var d = sk.draft;
    var show = d && (d.type === "line" || d.type === "wall" || d.type === "dim") && sk.scale;
    skLenTip.hidden = !show;
    if (!show) return;
    skLenTip.textContent = skRealLength(skDist(d.a, d.b));
    var r = skCanvas.getBoundingClientRect();
    skLenTip.style.left = (e.clientX - r.left + 14) + "px";
    skLenTip.style.top = (e.clientY - r.top - 34) + "px";
  }
  // ---- erasing piece by piece -------------------------------------------
  // A line, wall, rectangle or pen stroke is erased only between the two
  // break points around the touch: where another line crosses it, and its
  // own corners (a rectangle's, or a pen stroke's sharp turns). Anything
  // else, or a line with no break points, goes whole.
  function skRdp(pts, eps, first, last, keep) {
    var maxD = 0, idx = -1;
    for (var i = first + 1; i < last; i++) {
      var d = skSegDist(pts[i], pts[first], pts[last]);
      if (d > maxD) { maxD = d; idx = i; }
    }
    if (maxD > eps) { keep[idx] = true; skRdp(pts, eps, first, idx, keep); skRdp(pts, eps, idx, last, keep); }
  }
  // { pts, closed, corners: [index...] } or null (erased whole)
  function skPathOf(el) {
    if (el.type === "line" || el.type === "wall") return { pts: [el.a, el.b], closed: false, corners: [] };
    if (el.type === "rect") {
      return { pts: [el.a, { x: el.b.x, y: el.a.y }, el.b, { x: el.a.x, y: el.b.y }], closed: true, corners: [0, 1, 2, 3] };
    }
    if (el.type === "stroke" && el.pts.length > 1) {
      var keep = {};
      skRdp(el.pts, 4, 0, el.pts.length - 1, keep);
      return { pts: el.pts, closed: false, corners: Object.keys(keep).map(Number) };
    }
    return null;
  }
  // every straight piece of another element, for crossings
  function skSegmentsOf(el) {
    var segs = [];
    var path = skPathOf(el);
    if (path) {
      var n = path.pts.length;
      for (var i = 0; i < (path.closed ? n : n - 1); i++) segs.push([path.pts[i], path.pts[(i + 1) % n]]);
    } else if (el.type === "circle") {
      var rx = el.rx || el.r, ry = el.ry || el.r, prev = null;
      for (var k = 0; k <= 48; k++) {
        var q = { x: el.c.x + rx * Math.cos(k / 48 * Math.PI * 2), y: el.c.y + ry * Math.sin(k / 48 * Math.PI * 2) };
        if (prev) segs.push([prev, q]);
        prev = q;
      }
    } else if (el.a && el.b && (el.type === "dim" || el.type === "door" || el.type === "window" || el.type === "leader")) {
      var sl = el.type === "dim" ? skDimLine(el) : el;
      segs.push([sl.a, sl.b]);
    }
    return segs;
  }
  function skCross(p1, p2, p3, p4) {
    var d = (p2.x - p1.x) * (p4.y - p3.y) - (p2.y - p1.y) * (p4.x - p3.x);
    if (Math.abs(d) < 1e-9) return null;
    var t = ((p3.x - p1.x) * (p4.y - p3.y) - (p3.y - p1.y) * (p4.x - p3.x)) / d;
    var u = ((p3.x - p1.x) * (p2.y - p1.y) - (p3.y - p1.y) * (p2.x - p1.x)) / d;
    return (t >= 0 && t <= 1 && u >= 0 && u <= 1) ? t : null;
  }
  // the points of a path between two distances along it
  function skSubPath(pts, cum, from, to) {
    var out = [];
    var at = function (sDist) {
      for (var i = 1; i < pts.length; i++) {
        if (sDist <= cum[i] + 1e-9) {
          var seg = cum[i] - cum[i - 1] || 1, t = (sDist - cum[i - 1]) / seg;
          return { x: pts[i - 1].x + (pts[i].x - pts[i - 1].x) * t, y: pts[i - 1].y + (pts[i].y - pts[i - 1].y) * t };
        }
      }
      return pts[pts.length - 1];
    };
    out.push(at(from));
    for (var i = 0; i < pts.length; i++) if (cum[i] > from + 1e-6 && cum[i] < to - 1e-6) out.push(pts[i]);
    out.push(at(to));
    return out;
  }
  function skErasePiece(index, p) {
    var el = sk.els[index];
    var path = skPathOf(el);
    if (!path) return null;
    var pts = path.closed ? path.pts.concat([path.pts[0]]) : path.pts.slice();
    var cum = [0];
    for (var i = 1; i < pts.length; i++) cum.push(cum[i - 1] + skDist(pts[i - 1], pts[i]));
    var total = cum[cum.length - 1];
    if (total < 1) return null;
    // where on the path the touch is
    var best = Infinity, sTap = 0;
    for (var j = 1; j < pts.length; j++) {
      var a = pts[j - 1], b = pts[j], dx = b.x - a.x, dy = b.y - a.y, l2 = dx * dx + dy * dy;
      var t = l2 ? Math.max(0, Math.min(1, ((p.x - a.x) * dx + (p.y - a.y) * dy) / l2)) : 0;
      var dd = Math.hypot(p.x - (a.x + t * dx), p.y - (a.y + t * dy));
      if (dd < best) { best = dd; sTap = cum[j - 1] + t * (cum[j] - cum[j - 1]); }
    }
    // break points: corners and crossings
    var bps = path.corners.map(function (ci) { return cum[ci]; });
    sk.els.forEach(function (other, oi) {
      if (oi === index) return;
      skSegmentsOf(other).forEach(function (seg) {
        for (var k = 1; k < pts.length; k++) {
          var tt = skCross(pts[k - 1], pts[k], seg[0], seg[1]);
          if (tt !== null) bps.push(cum[k - 1] + tt * (cum[k] - cum[k - 1]));
        }
      });
    });
    var eps = 0.5;
    // an open path's own ends aren't break points; a closed one's start is a corner
    bps = path.closed ?
      bps.map(function (x) { return x >= total - eps ? 0 : x; }) :
      bps.filter(function (x) { return x > eps && x < total - eps; });
    bps.sort(function (x, y) { return x - y; });
    var s0 = null, s1 = null;
    bps.forEach(function (x) {
      if (x < sTap - eps) s0 = x;
      if (x > sTap + eps && s1 === null) s1 = x;
    });
    var pieces = [];
    if (path.closed) {
      if (bps.length < 2) return [];
      if (s0 === null) s0 = bps[bps.length - 1] - total;
      if (s1 === null) s1 = bps[0] + total;
      // what's left runs from s1 round to s0
      var twice = pts.concat(pts.slice(1));
      var cum2 = cum.concat(cum.slice(1).map(function (x) { return x + total; }));
      var from = s1, to = s0 + total;
      if (from >= total) { from -= total; to -= total; }
      pieces.push(skSubPath(twice, cum2, from, to));
    } else {
      if (s0 !== null) pieces.push(skSubPath(pts, cum, 0, s0));
      if (s1 !== null) pieces.push(skSubPath(pts, cum, s1, total));
    }
    // back into shapes: straight pieces stay lines/walls, pen pieces strokes
    var out = [];
    pieces.forEach(function (piece) {
      if (piece.length < 2) return;
      if (el.type === "stroke") {
        out.push({ type: "stroke", pts: piece, color: el.color, w: el.w });
        return;
      }
      for (var q = 1; q < piece.length; q++) {
        if (skDist(piece[q - 1], piece[q]) < 1) continue;
        out.push({ type: el.type === "wall" ? "wall" : "line", a: piece[q - 1], b: piece[q], color: el.color, w: el.w });
      }
    });
    return out;
  }
  function skErase(p) {
    var tol = 10 / sk.view.z;
    // the lines first: a painted area lies under them
    var order = [];
    for (var i = sk.els.length - 1; i >= 0; i--) if (sk.els[i].type !== "fill") order.push(i);
    for (i = sk.els.length - 1; i >= 0; i--) if (sk.els[i].type === "fill") order.push(i);
    for (var o = 0; o < order.length; o++) {
      i = order[o];
      if (skHit(sk.els[i], p, tol)) {
        var idx = i;
        var rest = skErasePiece(idx, p);
        skCommit(function () {
          if (rest) sk.els.splice.apply(sk.els, [idx, 1].concat(rest));
          else sk.els.splice(idx, 1);
        });
        return;
      }
    }
  }

  skCanvas.addEventListener("pointerdown", function (e) {
    skCanvas.setPointerCapture(e.pointerId);
    skPointers[e.pointerId] = { x: e.clientX, y: e.clientY };
    var ids = Object.keys(skPointers);
    if (ids.length === 2) {
      // a second finger: pan + zoom, and whatever was being drawn is dropped
      clearTimeout(skHoldTimer);
      sk.draft = null;
      if (skDimMove) { skDimMove.el.off = skDimMove.off; skDimMove = null; }
      skObjCancelDrag();
      skBgCancel();
      if (sk.crop) sk.crop.drag = null;
      skLenTip.hidden = true;
      var a = skPointers[ids[0]], b = skPointers[ids[1]];
      skPinch = { d: Math.hypot(a.x - b.x, a.y - b.y), mid: { x: (a.x + b.x) / 2, y: (a.y + b.y) / 2 }, view: Object.assign({}, sk.view) };
      skDraw();
      return;
    }
    if (ids.length > 2) return;
    var p = skEventPoint(e);
    if (sk.crop) { skCropDown(p); return; }
    ["sketchShapesMenu", "sketchObjMenu", "sketchFillMenu", "sketchBgMenu"].forEach(function (id) { document.getElementById(id).hidden = true; });
    var selBg = skBgSelected();
    if (selBg) {
      sk.bgSel = false;
      if (skDist(skToScreen(p), skBgCloseScreen(selBg)) < 22) {
        skCommit(function () { sk.els = sk.els.filter(function (el) { return el !== selBg; }); });
        return;
      }
      skDraw();
    }
    if (skObjPointerDown(p)) return;
    var bg = ["eraser", "fill", "text", "north"].indexOf(sk.tool) < 0 && skBgAt(p);
    if (bg) {
      skBgHold = { el: bg, screen: { x: e.clientX, y: e.clientY }, at: p };
      skBgHold.timer = setTimeout(function () {
        var h = skBgHold;
        skBgHold = null;
        if (!h) return;
        // whatever the press had started (a line, a pan...) is dropped
        clearTimeout(skHoldTimer);
        sk.draft = null;
        if (skPinch && skPinch.pan) { sk.view = skPinch.view; skPinch = null; }
        if (skDimMove) { skDimMove.el.off = skDimMove.off; skDimMove = null; }
        skLenTip.hidden = true;
        skBgMove = { el: h.el, start: h.at, p0: { x: h.el.p.x, y: h.el.p.y }, before: JSON.stringify(sk.els) };
        sk.bgSel = true;
        if (navigator.vibrate) { try { navigator.vibrate(25); } catch (err) {} }
        skDraw();
      }, 550);
    }
    if (sk.tool === "hand") { skPinch = { pan: true, start: { x: e.clientX, y: e.clientY }, view: Object.assign({}, sk.view) }; return; }
    if (sk.tool === "eraser") { skErase(p); return; }
    if (sk.tool === "fill") { skFill(p); return; }
    if (sk.tool === "text") { skAskText("", function (text) { skCommit(function () { sk.els.push({ type: "text", p: p, text: text, color: sk.color, size: 16 }); }); }); return; }
    if (sk.tool === "north") { skCommit(function () { sk.els.push({ type: "north", p: skSnapPoint(p), color: sk.color }); }); return; }
    // pressing on a dimension with the dimension tool shifts it sideways
    if (sk.tool === "dim") {
      for (var i = sk.els.length - 1; i >= 0; i--) {
        // away from its ends, so a new dimension can start where one ends
        var dl = sk.els[i].type === "dim" && skDimLine(sk.els[i]);
        if (dl && skHit(sk.els[i], p, 12 / sk.view.z) && Math.min(skDist(p, dl.a), skDist(p, dl.b)) > 16 / sk.view.z) {
          skDimMove = { el: sk.els[i], start: p, off: sk.els[i].off || 0, before: JSON.stringify(sk.els) };
          return;
        }
      }
    }
    sk.draft = skStartDraft(p);
    skLastMove = { x: e.clientX, y: e.clientY };
    skDraw();
  });
  skCanvas.addEventListener("pointermove", function (e) {
    if (!skPointers[e.pointerId]) return;
    skPointers[e.pointerId] = { x: e.clientX, y: e.clientY };
    var ids = Object.keys(skPointers);
    if (skPinch && !skPinch.pan && ids.length === 2) {
      var a = skPointers[ids[0]], b = skPointers[ids[1]];
      var d = Math.hypot(a.x - b.x, a.y - b.y);
      var mid = { x: (a.x + b.x) / 2, y: (a.y + b.y) / 2 };
      var z = Math.max(0.25, Math.min(6, skPinch.view.z * d / skPinch.d));
      var r = skCanvas.getBoundingClientRect();
      // keep the world point under the starting midpoint under the fingers
      var wx = (skPinch.mid.x - r.left) / skPinch.view.z + skPinch.view.x;
      var wy = (skPinch.mid.y - r.top) / skPinch.view.z + skPinch.view.y;
      sk.view = { z: z, x: wx - (mid.x - r.left) / z, y: wy - (mid.y - r.top) / z };
      skDraw();
      return;
    }
    if (sk.crop) { if (ids.length === 1) skCropMove(skEventPoint(e)); return; }
    if (skBgHold && Math.hypot(e.clientX - skBgHold.screen.x, e.clientY - skBgHold.screen.y) > 8) skBgCancel();
    if (skBgMove) {
      var bq = skEventPoint(e);
      skBgMove.el.p = { x: skBgMove.p0.x + bq.x - skBgMove.start.x, y: skBgMove.p0.y + bq.y - skBgMove.start.y };
      skDraw();
      return;
    }
    if (skPinch && skPinch.pan) {
      sk.view = Object.assign({}, skPinch.view, {
        x: skPinch.view.x - (e.clientX - skPinch.start.x) / sk.view.z,
        y: skPinch.view.y - (e.clientY - skPinch.start.y) / sk.view.z
      });
      skDraw();
      return;
    }
    if (skObjPointerMove(skEventPoint(e))) return;
    if (sk.tool === "eraser" && e.buttons) { skErase(skEventPoint(e)); return; }
    if (skDimMove) {
      var m = skDimMove, q = skEventPoint(e), el = m.el, len = skDist(el.a, el.b) || 1;
      var off = m.off + ((q.x - m.start.x) * -(el.b.y - el.a.y) + (q.y - m.start.y) * (el.b.x - el.a.x)) / len;
      el.off = sk.snap ? Math.round(off / (SK_CELL / 2)) * (SK_CELL / 2) : off;
      skDraw();
      return;
    }
    if (!sk.draft) return;
    skUpdateDraft(skEventPoint(e));
    skShowLenTip(e);
    // the pen held still near the end: straighten what was drawn
    if (sk.draft.type === "stroke" && Math.hypot(e.clientX - skLastMove.x, e.clientY - skLastMove.y) > 3) {
      skLastMove = { x: e.clientX, y: e.clientY };
      clearTimeout(skHoldTimer);
      skHoldTimer = setTimeout(function () {
        var shape = sk.draft && sk.draft.type === "stroke" && skRecognize(sk.draft.pts);
        if (shape) {
          shape.color = sk.draft.color;
          shape.w = sk.draft.w;
          shape.locked = true;
          sk.draft = shape;
          if (navigator.vibrate) { try { navigator.vibrate(20); } catch (err) {} }
          skDraw();
        }
      }, 550);
    }
    skDraw();
  });
  function skPointerEnd(e) {
    delete skPointers[e.pointerId];
    clearTimeout(skHoldTimer);
    if (skBgHold) { clearTimeout(skBgHold.timer); skBgHold = null; }
    if (skPinch) {
      if (!Object.keys(skPointers).length) { skPinch = null; skSaveDraft(); }
      return;
    }
    if (sk.crop) { skCropEnd(); return; }
    if (skBgMove) {
      var bm = skBgMove;
      skBgMove = null;
      if (bm.el.p.x !== bm.p0.x || bm.el.p.y !== bm.p0.y) {
        sk.undo.push(bm.before);
        if (sk.undo.length > 80) sk.undo.shift();
        sk.redo = [];
        skSaveDraft();
        skUpdateButtons();
      }
      skDraw();
      return;
    }
    if (skObjPointerEnd()) return;
    if (skDimMove) {
      var m = skDimMove;
      skDimMove = null;
      if ((m.el.off || 0) !== m.off) {
        // one undo step back to where it was
        sk.undo.push(m.before);
        if (sk.undo.length > 80) sk.undo.shift();
        sk.redo = [];
        skSaveDraft();
        skUpdateButtons();
      }
      skDraw();
      return;
    }
    var d = sk.draft;
    sk.draft = null;
    sk.snapMark = null;
    skLenTip.hidden = true;
    if (!d) return;
    delete d.locked;
    if (d.type === "stroke") {
      if (d.pts.length < 2) d.pts.push({ x: d.pts[0].x + 0.5, y: d.pts[0].y });
    } else if (d.type !== "circle" && skDist(d.a, d.b) < 4) {
      skDraw();
      return; // a tap, not a drag
    }
    if (d.type === "dim") {
      skAskText(skRealLength(skDist(d.a, d.b)), function (text) {
        d.text = text;
        skCommit(function () { sk.els.push(d); });
      }, true);
      return;
    }
    if (d.type === "leader") {
      skAskText("", function (text) {
        d.text = text;
        skCommit(function () { sk.els.push(d); });
      });
      return;
    }
    skCommit(function () { sk.els.push(d); });
  }
  skCanvas.addEventListener("pointerup", skPointerEnd);
  skCanvas.addEventListener("pointercancel", skPointerEnd);
  skCanvas.addEventListener("wheel", function (e) {
    e.preventDefault();
    var r = skCanvas.getBoundingClientRect();
    var sx = e.clientX - r.left, sy = e.clientY - r.top;
    var w = skToWorld(sx, sy);
    var z = Math.max(0.25, Math.min(6, sk.view.z * (e.deltaY < 0 ? 1.15 : 1 / 1.15)));
    sk.view = { z: z, x: w.x - sx / z, y: w.y - sy / z };
    skDraw();
  }, { passive: false });

  // ---- text entry (text, dimension, callout) -----------------------------
  var skTextOverlay = document.getElementById("sketchTextOverlay");
  var skTextInput = document.getElementById("sketchTextInput");
  var skTextDone = null;
  function skAskText(initial, done, allowEmpty) {
    skTextInput.value = initial || "";
    skTextDone = { fn: done, allowEmpty: !!allowEmpty };
    document.getElementById("sketchTextHint").hidden = !(allowEmpty && initial);
    skTextOverlay.hidden = false;
    setTimeout(function () { skTextInput.focus(); skTextInput.select(); }, 30);
  }
  document.getElementById("sketchTextForm").addEventListener("submit", function (e) {
    e.preventDefault();
    var t = skTextInput.value.trim();
    var pending = skTextDone;
    skTextOverlay.hidden = true;
    skTextDone = null;
    if (!pending || (!t && !pending.allowEmpty)) { skDraw(); return; }
    pending.fn(t);
  });
  document.getElementById("sketchTextCancelBtn").addEventListener("click", function () {
    skTextOverlay.hidden = true;
    skTextDone = null;
    skDraw();
  });

  // ---- scale -----------------------------------------------------------------
  var skScaleOverlay = document.getElementById("sketchScaleOverlay");
  document.getElementById("sketchScaleBtn").addEventListener("click", function () {
    document.getElementById("sketchScalePer").value = sk.scale ? sk.scale.per : 50;
    document.getElementById("sketchScaleUnit").value = sk.scale ? sk.scale.unit : "cm";
    skScaleOverlay.hidden = false;
  });
  document.getElementById("sketchScaleSaveBtn").addEventListener("click", function () {
    var per = parseFloat(document.getElementById("sketchScalePer").value);
    var unit = document.getElementById("sketchScaleUnit").value;
    sk.scale = per > 0 ? { per: per, unit: unit } : null;
    skScaleOverlay.hidden = true;
    skSaveDraft();
    skDraw();
  });
  document.getElementById("sketchScaleOffBtn").addEventListener("click", function () {
    sk.scale = null;
    skScaleOverlay.hidden = true;
    skSaveDraft();
    skDraw();
  });
  document.getElementById("sketchScaleCancelBtn").addEventListener("click", function () { skScaleOverlay.hidden = true; });

  // ---- toolbar -----------------------------------------------------------------
  function skUpdateButtons() {
    document.querySelectorAll(".sk-tool").forEach(function (b) { b.classList.toggle("on", b.getAttribute("data-tool") === sk.tool); });
    document.querySelectorAll(".sk-color").forEach(function (b) { b.classList.toggle("on", b.getAttribute("data-color") === sk.color); });
    document.querySelectorAll(".sk-width").forEach(function (b) { b.classList.toggle("on", +b.getAttribute("data-width") === sk.width); });
    document.getElementById("sketchUndoBtn").disabled = !sk.undo.length;
    document.getElementById("sketchRedoBtn").disabled = !sk.redo.length;
    document.getElementById("sketchSnapBtn").classList.toggle("on", sk.snap);
    document.getElementById("sketchShapesMenu").hidden = true;
    document.getElementById("sketchObjMenu").hidden = true;
    document.getElementById("sketchFillMenu").hidden = true;
    document.getElementById("sketchBgMenu").hidden = true;
    document.getElementById("sketchObjBtn").classList.toggle("on", sk.tool === "obj");
    if (sk.tool !== "obj" && sk.objSel) { sk.objSel = null; skDraw(); }
  }
  document.querySelectorAll(".sk-tool").forEach(function (b) {
    b.addEventListener("click", function () {
      sk.tool = b.getAttribute("data-tool");
      if (sk.bgSel) { sk.bgSel = false; skDraw(); }
      skUpdateButtons();
      if (sk.tool === "leader") showToast(tr("sketchLeaderHint"), 2500);
      else if (sk.tool === "dim") showToast(tr("sketchDimHint"), 2500);
      else if (sk.tool === "door") showToast(tr("sketchDoorHint"), 2500);
    });
  });
  document.getElementById("sketchShapesBtn").addEventListener("click", function () {
    var m = document.getElementById("sketchShapesMenu");
    m.hidden = !m.hidden;
  });
  document.querySelectorAll(".sk-color").forEach(function (b) {
    b.addEventListener("click", function () { sk.color = b.getAttribute("data-color"); skUpdateButtons(); });
  });
  document.querySelectorAll(".sk-width").forEach(function (b) {
    b.addEventListener("click", function () { sk.width = +b.getAttribute("data-width"); skUpdateButtons(); });
  });
  document.getElementById("sketchUndoBtn").addEventListener("click", function () {
    if (!sk.undo.length) return;
    sk.redo.push(JSON.stringify(sk.els));
    sk.els = JSON.parse(sk.undo.pop());
    skSaveDraft(); skDraw(); skUpdateButtons();
  });
  document.getElementById("sketchRedoBtn").addEventListener("click", function () {
    if (!sk.redo.length) return;
    sk.undo.push(JSON.stringify(sk.els));
    sk.els = JSON.parse(sk.redo.pop());
    skSaveDraft(); skDraw(); skUpdateButtons();
  });
  document.getElementById("sketchSnapBtn").addEventListener("click", function () { sk.snap = !sk.snap; skUpdateButtons(); });
  document.getElementById("sketchClearBtn").addEventListener("click", function () {
    if (!sk.els.length) return;
    askConfirm(tr("sketchClearConfirm"), function () { skCommit(function () { sk.els = []; }); });
  });
  // a photo or plan to draw over, faded, fitted to the screen
  // from the 🖼 button: take a photo, pick one, or take the background away
  var skImageInput = document.getElementById("sketchImageInput");
  var skImageCameraInput = document.getElementById("sketchImageCameraInput");
  var skBgMenu = document.getElementById("sketchBgMenu");
  document.getElementById("sketchBgBtn").addEventListener("click", function () {
    var open = skBgMenu.hidden;
    skUpdateButtons();
    document.getElementById("sketchBgRemoveBtn").hidden = !sk.els.some(function (el) { return el.type === "image"; });
    skBgMenu.hidden = !open;
  });
  document.getElementById("sketchImageBtn").addEventListener("click", function () { skBgMenu.hidden = true; skImageInput.click(); });
  document.getElementById("sketchBgCameraBtn").addEventListener("click", function () { skBgMenu.hidden = true; skImageCameraInput.click(); });
  // a picture or PDF already in the project's library (any folder)
  var skLibOverlay = document.getElementById("sketchLibOverlay");
  function skIsImg(entry) { return isImageFile(entry) || /\.(jpe?g|png|webp|gif)$/i.test(entry.name || ""); }
  function skIsBgFile(entry) {
    return skIsImg(entry) || /pdf/i.test(entry.type || "") || /\.pdf$/i.test(entry.name || "");
  }
  document.getElementById("sketchBgLibraryBtn").addEventListener("click", function () {
    skBgMenu.hidden = true;
    var sheet = allSheets().find(function (s) { return s.id === sk.sheetId; });
    if (!sheet || !supabaseClient) return;
    ensureLibraryFolders(sheet, function (folders) {
      skLibShow(folders, null);
      skLibOverlay.hidden = false;
    });
  });
  // one folder at a time, like the library: its folders, then its pictures
  // and PDFs; null = the library's first screen (folders only)
  function skLibShow(folders, folder) {
    var list = document.getElementById("sketchLibList");
    list.innerHTML = "";
    document.getElementById("sketchLibTitle").textContent = folder ? "📂 " + libraryFolderPath(folders, folder) : tr("sketchLibTitle");
    var button = function (text, cls, onClick) {
      var b = document.createElement("button");
      b.type = "button";
      if (cls) b.className = cls;
      b.textContent = text;
      b.addEventListener("click", onClick);
      list.appendChild(b);
    };
    if (folder) {
      var parent = folder.parentId && folders.find(function (f) { return f.id === folder.parentId; });
      button(tr("sketchLibBack"), "sk-lib-back", function () { skLibShow(folders, parent || null); });
    }
    folders.filter(function (f) { return folder ? f.parentId === folder.id : !f.parentId; }).forEach(function (f) {
      button("📁 " + folderDisplayName(f), "sk-lib-dir", function () { skLibShow(folders, f); });
    });
    (folder ? (folder.files || []).filter(skIsBgFile) : []).forEach(function (entry) {
      button((skIsImg(entry) ? "🖼 " : "📄 ") + entry.name, "sk-lib-file", function () {
        skLibOverlay.hidden = true;
        showToast(tr("sketchPdfLoading"));
        resolveFileUrl(entry.path).then(fetchFileBlob).then(function (blob) {
          var file = new File([blob], entry.name, { type: entry.type || blob.type });
          if (!skIsImg(entry)) skPdfBackground(file);
          else scanLoadImage(file).then(function (canvas) { skPlaceBackground(canvas, 1400); });
        }).catch(function (err) {
          console.error("sketch library background failed:", err);
          alert(tr("chatFileOpenError"));
        });
      });
    });
    if (folder && list.children.length === 1) {
      list.appendChild(Object.assign(document.createElement("div"), { className: "sk-lib-folder", textContent: tr("sketchLibNothing") }));
    }
  }
  document.getElementById("sketchLibCancelBtn").addEventListener("click", function () { skLibOverlay.hidden = true; });
  document.getElementById("sketchBgRemoveBtn").addEventListener("click", function () {
    skBgMenu.hidden = true;
    skCommit(function () { sk.els = sk.els.filter(function (el) { return el.type !== "image"; }); });
  });
  [skImageInput, skImageCameraInput].forEach(function (input) { input.addEventListener("change", function () { skSetBackground(input); }); });
  // A PDF (a plan, say): one of its pages, drawn sharp, is the background
  function skLoadPdf() {
    return (window.pdfjsLib ? Promise.resolve() : loadScriptOnce("vendor/pdf.min.js")).then(function () {
      window.pdfjsLib.GlobalWorkerOptions.workerSrc = "vendor/pdf.worker.min.js";
      return window.pdfjsLib;
    });
  }
  function skPdfPageCanvas(pdf, n) {
    return pdf.getPage(n).then(function (page) {
      var v = page.getViewport({ scale: 1 });
      var vp = page.getViewport({ scale: 2200 / Math.max(v.width, v.height) });
      var c = document.createElement("canvas");
      c.width = Math.round(vp.width); c.height = Math.round(vp.height);
      var ctx = c.getContext("2d");
      ctx.fillStyle = "#fff"; ctx.fillRect(0, 0, c.width, c.height);
      return page.render({ canvasContext: ctx, viewport: vp }).promise.then(function () { return c; });
    });
  }
  var skPdfPageOverlay = document.getElementById("sketchPdfPageOverlay");
  document.getElementById("sketchPdfPageCancelBtn").addEventListener("click", function () { skPdfPageOverlay.hidden = true; });
  function skPdfBackground(file) {
    showToast(tr("sketchPdfLoading"));
    file.arrayBuffer().then(function (buf) {
      return skLoadPdf().then(function (lib) { return lib.getDocument({ data: new Uint8Array(buf) }).promise; });
    }).then(function (pdf) {
      var use = function (n) {
        skPdfPageCanvas(pdf, n).then(function (c) { skPlaceBackground(c, 2200); }, function () { alert(tr("sketchPdfError")); });
      };
      if (pdf.numPages === 1) { use(1); return; }
      var list = document.getElementById("sketchPdfPageList");
      list.innerHTML = "";
      for (var n = 1; n <= Math.min(pdf.numPages, 60); n++) {
        (function (n) {
          var b = document.createElement("button");
          b.type = "button";
          b.textContent = "📄 " + tr("sketchPdfPage").replace("{n}", n);
          b.addEventListener("click", function () { skPdfPageOverlay.hidden = true; use(n); });
          list.appendChild(b);
        })(n);
      }
      skPdfPageOverlay.hidden = false;
    }).catch(function (err) {
      console.error("sketch pdf failed:", err);
      alert(tr("sketchPdfError"));
    });
  }
  function skSetBackground(input) {
    var file = input.files && input.files[0];
    input.value = "";
    if (!file) return;
    if (file.type === "application/pdf" || /\.pdf$/i.test(file.name || "")) { skPdfBackground(file); return; }
    scanLoadImage(file).then(function (canvas) { skPlaceBackground(canvas, 1400); });
  }
  // fitted to the screen, replacing any earlier background
  function skPlaceBackground(canvas, maxSide) {
    var k = Math.min(1, maxSide / Math.max(canvas.width, canvas.height));
    var c = document.createElement("canvas");
    c.width = Math.round(canvas.width * k); c.height = Math.round(canvas.height * k);
    c.getContext("2d").drawImage(canvas, 0, 0, c.width, c.height);
    var r = skCanvas.getBoundingClientRect();
    var fit = Math.min(r.width / c.width, r.height / c.height) * 0.9 / sk.view.z;
    var tl = skToWorld(r.width / 2 - c.width * fit * sk.view.z / 2, r.height / 2 - c.height * fit * sk.view.z / 2);
    skCommit(function () {
      sk.els = sk.els.filter(function (el) { return el.type !== "image"; });
      sk.els.unshift({ type: "image", id: uid(), src: c.toDataURL("image/jpeg", 0.8), p: tl, w: c.width * fit, h: c.height * fit });
    });
    showToast(tr("sketchBgMoveHint"), 3000);
  }


  // ---- open / close / save -------------------------------------------------------
  function openSketch() {
    var sheet = activeSheet();
    if (!sheet) return;
    sk.sheetId = sheet.id;
    skLoadDraft();
    document.getElementById("sketchTitle").textContent = tr("sketchTitle") + " – " + sheet.name;
    sketchView.hidden = false;
    skUpdateButtons();
    skResize();
  }
  function closeSketch() {
    if (sk.crop) skEndCrop();
    skSaveDraft();
    sketchView.hidden = true;
  }
  window.addEventListener("resize", function () { if (!sketchView.hidden) skResize(); });
  document.getElementById("sketchBtn").addEventListener("click", openSketch);
  document.getElementById("sketchCloseBtn").addEventListener("click", closeSketch);

  // The drawing's own area (plus a margin), drawn sharp at a fixed scale.
  function skRenderForExport(area) {
    var minx = Infinity, miny = Infinity, maxx = -Infinity, maxy = -Infinity;
    var add = function (p) { minx = Math.min(minx, p.x); miny = Math.min(miny, p.y); maxx = Math.max(maxx, p.x); maxy = Math.max(maxy, p.y); };
    sk.els.forEach(function (el) {
      if (el.pts) el.pts.forEach(add);
      if (el.type === "dim") { var bl = skDimLine(el); add(bl.a); add(bl.b); }
      if (el.type === "obj") { [[-1, -1], [1, -1], [1, 1], [-1, 1]].forEach(function (q) { add(skObjCorner(el, q[0], q[1])); }); return; }
      if (el.a) add(el.a);
      if (el.b) { add(el.b); if (el.type === "leader") add({ x: el.b.x + (el.b.x >= el.a.x ? 1 : -1) * 160, y: el.b.y - 20 }); }
      if (el.c) { add({ x: el.c.x - (el.rx || el.r), y: el.c.y - (el.ry || el.r) }); add({ x: el.c.x + (el.rx || el.r), y: el.c.y + (el.ry || el.r) }); }
      if (el.p) { add({ x: el.p.x - 40, y: el.p.y - 40 }); add({ x: el.p.x + (el.w || 40), y: el.p.y + (el.h || 40) }); }
    });
    if (area) {
      minx = area.x0; miny = area.y0; maxx = area.x1; maxy = area.y1;
    } else {
      if (minx === Infinity) return null;
      var pad = SK_CELL * 2;
      minx = Math.floor((minx - pad) / SK_CELL) * SK_CELL; miny = Math.floor((miny - pad) / SK_CELL) * SK_CELL;
      maxx += pad; maxy += pad;
    }
    var z = Math.min(3, 2400 / Math.max(maxx - minx, maxy - miny));
    var c = document.createElement("canvas");
    c.width = Math.round((maxx - minx) * z); c.height = Math.round((maxy - miny) * z);
    var ctx = c.getContext("2d");
    var view = { x: minx, y: miny, z: z };
    skDrawGrid(ctx, c.width, c.height, view);
    skDrawLayers(ctx, view);
    if (sk.scale) {
      ctx.font = "700 " + Math.round(14 * Math.max(1, z / 1.5)) + "px Assistant, Arial, sans-serif";
      ctx.fillStyle = "#2e4fb8";
      ctx.textAlign = "left";
      ctx.textBaseline = "bottom";
      ctx.fillText(tr("sketchScaleNow").replace("{n}", sk.scale.per + " " + tr(sk.scale.unit === "cm" ? "sketchUnitCm" : "sketchUnitM")), 10, c.height - 8);
    }
    return c;
  }
  function skFileName() {
    var sheet = allSheets().find(function (s) { return s.id === sk.sheetId; });
    var d = new Date();
    return tr("sketchTitle") + " " + (sheet ? sheet.name + " " : "") + isoToFileNameDate(todayISO()) + " " +
      String(d.getHours()).padStart(2, "0") + "-" + String(d.getMinutes()).padStart(2, "0");
  }
  function skBuildPdf(canvas) {
    return (window.jspdf ? Promise.resolve() : loadScriptOnce("vendor/jspdf.umd.min.js")).then(function () {
      var landscape = canvas.width > canvas.height;
      var pdf = new window.jspdf.jsPDF({ unit: "mm", format: "a4", orientation: landscape ? "landscape" : "portrait" });
      var pw = landscape ? 297 : 210, ph = landscape ? 210 : 297, m = 8;
      var k = Math.min((pw - 2 * m) / canvas.width, (ph - 2 * m) / canvas.height);
      pdf.addImage(canvas.toDataURL("image/jpeg", 0.92), "JPEG", (pw - canvas.width * k) / 2, (ph - canvas.height * k) / 2, canvas.width * k, canvas.height * k);
      return pdf.output("blob");
    });
  }
  // into a library folder of the project, as a PDF
  document.getElementById("sketchSaveBtn").addEventListener("click", function () {
    skPickExportArea("sketchAreaSaveTitle", skSaveToLibrary);
  });
  function skSaveToLibrary(canvas) {
    var sheet = allSheets().find(function (s) { return s.id === sk.sheetId; });
    if (!sheet || !supabaseClient) { alert(tr("scanSaveError")); return; }
    ensureLibraryFolders(sheet, function (folders) {
      chatSaveFolderList.innerHTML = "";
      folders.forEach(function (folder) {
        var btn = document.createElement("button");
        btn.type = "button";
        btn.textContent = "📁 " + folderDisplayName(folder);
        btn.addEventListener("click", function () {
          chatSaveFolderOverlay.hidden = true;
          var fileName = skFileName() + ".pdf";
          showToast(tr("scanSavingMsg"));
          skBuildPdf(canvas).then(function (blob) {
            var path = sheet.id + "/" + folder.id + "/" + uid() + "-" + safeStorageFileName(fileName);
            return supabaseClient.storage.from(LIBRARY_BUCKET).upload(path, blob, { contentType: "application/pdf" }).then(function (result) {
              if (result.error) throw result.error;
              return addFileToLibraryFolder(sheet, folder.id, { id: uid(), name: fileName, path: path, type: "application/pdf", size: blob.size || 0, uploadedAt: Date.now() });
            });
          }).then(function () {
            showToast(tr("scanSavedMsg").replace("{folder}", folderDisplayName(folder)));
          }, function (err) {
            console.error("sketch save failed:", err);
            alert(tr("scanSaveError"));
          });
        });
        chatSaveFolderList.appendChild(btn);
      });
      chatSaveFolderOverlay.hidden = false;
    });
  
  }
  // share as a picture: into the project's own chat (a shared project),
  // or out to other apps (WhatsApp, mail...)
  var sketchShareOverlay = document.getElementById("sketchShareOverlay");
  var skSharePending = null;
  function skShareToApps(canvas) {
    canvas.toBlob(function (blob) { attemptShare(blob, skFileName() + ".png", "image/png"); }, "image/png");
  }
  function skShareToChat(canvas, sheetId) {
    var fileName = skFileName() + ".png";
    showToast(tr("sketchSendingToChat"));
    canvas.toBlob(function (blob) {
      var path = sheetId + "/files/" + uid() + "-" + safeStorageFileName(fileName);
      supabaseClient.storage.from(LIBRARY_BUCKET).upload(path, blob, { contentType: "image/png" })
        .then(function (result) {
          if (result.error) throw result.error;
          return resolveFileUrl(path);
        })
        .then(function (url) { return sendChatFileMessage(sheetId, url, fileName, "image/png", blob.size || 0); })
        .then(function () {
          if (activeChatSheetId === sheetId) renderChatMessages();
          showToast(tr("sketchSentToChat"));
        }, function (err) {
          console.error("sketch to chat failed:", err);
          alert(tr("chatFileUploadError"));
        });
    }, "image/png");
  }
  document.getElementById("sketchShareBtn").addEventListener("click", function () {
    skPickExportArea("sketchAreaShareTitle", skShareCanvas);
  });
  function skShareCanvas(canvas) {
    var shared = supabaseClient && sharedSheets.some(function (s) { return s.id === sk.sheetId; });
    if (!shared) { skShareToApps(canvas); return; }
    skSharePending = canvas;
    sketchShareOverlay.hidden = false;
  }
  document.getElementById("sketchShareChatBtn").addEventListener("click", function () {
    sketchShareOverlay.hidden = true;
    if (skSharePending) skShareToChat(skSharePending, sk.sheetId);
    skSharePending = null;
  });
  document.getElementById("sketchShareAppsBtn").addEventListener("click", function () {
    sketchShareOverlay.hidden = true;
    if (skSharePending) skShareToApps(skSharePending);
    skSharePending = null;
  });
  document.getElementById("sketchShareCancelBtn").addEventListener("click", function () {
    sketchShareOverlay.hidden = true;
    skSharePending = null;
  });
