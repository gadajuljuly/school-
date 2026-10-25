  // ---------------------------------------------------------------------
  // סקיצה – ready-made objects and textured fills.
  // Objects (trees, vehicles, site machines, workers, road signs, a
  // container, a bridge) are kept as { type: "obj", id, kind, c, w, h, rot }
  // and drawn from code, so they stay sharp at any zoom. The selected one
  // shows a yellow dot: dragging it resizes (and turns) the object,
  // dragging the object itself moves it.
  // Fills can be a plain colour or a texture: interlocking paving, road,
  // grass, garden soil, base course, water. A textured fill keeps only its
  // shape (the mask); the texture is laid over it when drawn.
  // ---------------------------------------------------------------------

  // sizes in metres, length along the object's own x axis
  var SK_OBJS = [
    { kind: "tree", m: [5, 5] },
    { kind: "car", m: [4.5, 1.9] },
    { kind: "truck", m: [9, 2.5] },
    { kind: "excavator", m: [9.5, 3.2] },
    { kind: "backhoe", m: [6, 2.4] },
    { kind: "bobcat", m: [3, 1.8] },
    { kind: "worker", m: [1.2, 2] },
    { kind: "signStop", m: [1.1, 2] },
    { kind: "signNoEntry", m: [1.1, 2] },
    { kind: "signGiveWay", m: [1.1, 2] },
    { kind: "signWorks", m: [1.1, 2] },
    { kind: "container", m: [6.06, 2.44] },
    { kind: "bridge", m: [15, 6] }
  ];
  var SK_FILL_KINDS = ["color", "paving", "road", "grass", "soil", "gravel", "water"];
  sk.fillKind = "color";

  function skObjDef(kind) { return SK_OBJS.find(function (o) { return o.kind === kind; }); }
  // world units per metre: by the scale, or a square is a metre
  function skUnitsPerMetre() {
    if (!sk.scale) return SK_CELL;
    var mPerCell = sk.scale.unit === "cm" ? sk.scale.per / 100 : sk.scale.per;
    return mPerCell > 0 ? SK_CELL / mPerCell : SK_CELL;
  }

  // ---- drawing the objects (local px, origin at the centre, front = +x) ----
  function skRR(ctx, x, y, w, h, r) {
    r = Math.max(0, Math.min(r, w / 2, h / 2));
    ctx.beginPath();
    ctx.moveTo(x + r, y);
    ctx.arcTo(x + w, y, x + w, y + h, r);
    ctx.arcTo(x + w, y + h, x, y + h, r);
    ctx.arcTo(x, y + h, x, y, r);
    ctx.arcTo(x, y, x + w, y, r);
    ctx.closePath();
  }
  function skBox(ctx, x, y, w, h, r, fill, stroke, lw) {
    skRR(ctx, x, y, w, h, r);
    ctx.fillStyle = fill; ctx.fill();
    if (stroke) { ctx.strokeStyle = stroke; ctx.lineWidth = lw; ctx.stroke(); }
  }
  function skPoly(ctx, pts, fill, stroke, lw) {
    ctx.beginPath();
    pts.forEach(function (q, i) { if (i) ctx.lineTo(q[0], q[1]); else ctx.moveTo(q[0], q[1]); });
    ctx.closePath();
    if (fill) { ctx.fillStyle = fill; ctx.fill(); }
    if (stroke) { ctx.strokeStyle = stroke; ctx.lineWidth = lw; ctx.stroke(); }
  }
  function skDisc(ctx, x, y, r, fill, stroke, lw) {
    ctx.beginPath(); ctx.arc(x, y, Math.max(0.1, r), 0, Math.PI * 2);
    if (fill) { ctx.fillStyle = fill; ctx.fill(); }
    if (stroke) { ctx.strokeStyle = stroke; ctx.lineWidth = lw; ctx.stroke(); }
  }
  var SK_YELLOW = "#f2b705", SK_YELLOW_DARK = "#8a6500", SK_GLASS = "#2b3440", SK_TYRE = "#262626";
  var SK_DRAW_OBJ = {
    tree: function (ctx, w, h) {
      var r = Math.min(w, h) / 2, lw = Math.max(1, r * 0.04);
      for (var i = 0; i < 9; i++) {
        var a = i / 9 * Math.PI * 2;
        skDisc(ctx, Math.cos(a) * r * 0.6, Math.sin(a) * r * 0.6, r * 0.4, "#4f8f3a", "#356b27", lw);
      }
      skDisc(ctx, 0, 0, r * 0.62, "#5fa347");
      skDisc(ctx, -r * 0.2, -r * 0.2, r * 0.3, "#7cbd5d");
      skDisc(ctx, 0, 0, r * 0.09, "#6b4a2b");
    },
    car: function (ctx, w, h) {
      var lw = Math.max(1, h * 0.05);
      [[-0.3, -1], [-0.3, 1], [0.3, -1], [0.3, 1]].forEach(function (q) { skBox(ctx, q[0] * w - w * 0.08, q[1] * h * 0.42 - h * 0.08, w * 0.16, h * 0.16, h * 0.04, SK_TYRE); });
      skBox(ctx, -w / 2, -h * 0.42, w, h * 0.84, h * 0.28, "#3f6fb5", "#23406e", lw);
      skPoly(ctx, [[w * 0.08, -h * 0.34], [w * 0.24, -h * 0.3], [w * 0.24, h * 0.3], [w * 0.08, h * 0.34]], SK_GLASS);
      skPoly(ctx, [[-w * 0.24, -h * 0.32], [-w * 0.34, -h * 0.28], [-w * 0.34, h * 0.28], [-w * 0.24, h * 0.32]], SK_GLASS);
      skBox(ctx, -w * 0.22, -h * 0.3, w * 0.28, h * 0.6, h * 0.08, "#5a8ad0");
      skBox(ctx, w * 0.1, -h * 0.52, w * 0.05, h * 0.12, 1, "#23406e");
      skBox(ctx, w * 0.1, h * 0.4, w * 0.05, h * 0.12, 1, "#23406e");
    },
    truck: function (ctx, w, h) {
      var lw = Math.max(1, h * 0.04);
      [-0.38, -0.25, 0.32].forEach(function (x) {
        skBox(ctx, x * w - w * 0.045, -h * 0.5, w * 0.09, h * 0.1, 1, SK_TYRE);
        skBox(ctx, x * w - w * 0.045, h * 0.4, w * 0.09, h * 0.1, 1, SK_TYRE);
      });
      skBox(ctx, -w / 2, -h * 0.44, w * 0.74, h * 0.88, h * 0.05, "#9aa3ad", "#59616b", lw);
      ctx.strokeStyle = "#7d868f"; ctx.lineWidth = Math.max(0.6, lw * 0.6);
      for (var i = 1; i < 8; i++) { var x = -w / 2 + w * 0.74 * i / 8; ctx.beginPath(); ctx.moveTo(x, -h * 0.44); ctx.lineTo(x, h * 0.44); ctx.stroke(); }
      skBox(ctx, w * 0.26, -h * 0.42, w * 0.24, h * 0.84, h * 0.12, "#d0452f", "#7c2416", lw);
      skBox(ctx, w * 0.4, -h * 0.36, w * 0.06, h * 0.72, h * 0.04, SK_GLASS);
    },
    excavator: function (ctx, w, h) {
      var lw = Math.max(1, h * 0.04);
      skBox(ctx, -w * 0.48, -h * 0.5, w * 0.5, h * 0.24, h * 0.06, SK_TYRE);
      skBox(ctx, -w * 0.48, h * 0.26, w * 0.5, h * 0.24, h * 0.06, SK_TYRE);
      ctx.strokeStyle = "#555"; ctx.lineWidth = Math.max(0.6, lw * 0.6);
      for (var i = 1; i < 10; i++) {
        var x = -w * 0.48 + w * 0.5 * i / 10;
        ctx.beginPath(); ctx.moveTo(x, -h * 0.5); ctx.lineTo(x, -h * 0.26); ctx.moveTo(x, h * 0.26); ctx.lineTo(x, h * 0.5); ctx.stroke();
      }
      skBox(ctx, -w * 0.42, -h * 0.36, w * 0.4, h * 0.72, h * 0.12, SK_YELLOW, SK_YELLOW_DARK, lw);
      skBox(ctx, -w * 0.42, -h * 0.34, w * 0.08, h * 0.68, h * 0.08, "#c48f00");
      skBox(ctx, -w * 0.1, -h * 0.34, w * 0.1, h * 0.26, h * 0.04, SK_GLASS);
      skBox(ctx, -w * 0.04, h * 0.0, w * 0.42, h * 0.16, h * 0.05, SK_YELLOW, SK_YELLOW_DARK, lw);
      skPoly(ctx, [[w * 0.36, -h * 0.1], [w * 0.5, -h * 0.16], [w * 0.5, h * 0.32], [w * 0.36, h * 0.26]], "#5a5a5a", "#2e2e2e", lw);
    },
    backhoe: function (ctx, w, h) {
      var lw = Math.max(1, h * 0.04);
      [[-0.17, 0.22, 0.16], [0.14, 0.15, 0.12]].forEach(function (t) {
        skBox(ctx, t[0] * w - t[1] * w / 2, -h * 0.5, t[1] * w, t[2] * h, h * 0.04, SK_TYRE);
        skBox(ctx, t[0] * w - t[1] * w / 2, h * 0.5 - t[2] * h, t[1] * w, t[2] * h, h * 0.04, SK_TYRE);
      });
      skBox(ctx, -w * 0.5, -h * 0.07, w * 0.22, h * 0.14, h * 0.04, SK_YELLOW, SK_YELLOW_DARK, lw);
      skBox(ctx, -w * 0.5, -h * 0.13, w * 0.06, h * 0.26, h * 0.03, "#5a5a5a", "#2e2e2e", lw);
      skBox(ctx, -w * 0.3, -h * 0.36, w * 0.54, h * 0.72, h * 0.1, SK_YELLOW, SK_YELLOW_DARK, lw);
      skBox(ctx, -w * 0.13, -h * 0.28, w * 0.2, h * 0.56, h * 0.05, SK_GLASS);
      skBox(ctx, w * 0.2, -h * 0.4, w * 0.13, h * 0.08, 1, SK_YELLOW, SK_YELLOW_DARK, lw);
      skBox(ctx, w * 0.2, h * 0.32, w * 0.13, h * 0.08, 1, SK_YELLOW, SK_YELLOW_DARK, lw);
      skBox(ctx, w * 0.32, -h * 0.5, w * 0.18, h, h * 0.04, "#6b6b6b", "#2e2e2e", lw);
    },
    bobcat: function (ctx, w, h) {
      var lw = Math.max(1, h * 0.04);
      [-0.27, 0.05].forEach(function (x) {
        skBox(ctx, x * w - w * 0.1, -h * 0.5, w * 0.2, h * 0.16, h * 0.04, SK_TYRE);
        skBox(ctx, x * w - w * 0.1, h * 0.34, w * 0.2, h * 0.16, h * 0.04, SK_TYRE);
      });
      skBox(ctx, -w * 0.5, -h * 0.36, w * 0.68, h * 0.72, h * 0.12, "#eeeeee", "#333", lw);
      skBox(ctx, -w * 0.5, -h * 0.36, w * 0.12, h * 0.72, h * 0.08, "#e0661b");
      skBox(ctx, -w * 0.3, -h * 0.26, w * 0.32, h * 0.52, h * 0.05, SK_GLASS);
      skBox(ctx, w * 0.08, -h * 0.42, w * 0.2, h * 0.09, 1, "#e0661b", "#333", lw);
      skBox(ctx, w * 0.08, h * 0.33, w * 0.2, h * 0.09, 1, "#e0661b", "#333", lw);
      skBox(ctx, w * 0.26, -h * 0.5, w * 0.24, h, h * 0.05, "#5a5a5a", "#2e2e2e", lw);
    },
    worker: function (ctx, w, h) {
      var u = Math.min(w / 1.2, h / 2), lw = Math.max(1, u * 0.06);
      ctx.lineCap = "round";
      ctx.strokeStyle = "#1f3b6e"; ctx.lineWidth = u * 0.22;
      ctx.beginPath(); ctx.moveTo(-u * 0.14, u * 0.25); ctx.lineTo(-u * 0.2, u * 0.9); ctx.moveTo(u * 0.14, u * 0.25); ctx.lineTo(u * 0.2, u * 0.9); ctx.stroke();
      ctx.strokeStyle = "#ff7a00"; ctx.lineWidth = u * 0.16;
      ctx.beginPath(); ctx.moveTo(-u * 0.28, -u * 0.38); ctx.lineTo(-u * 0.48, u * 0.15); ctx.moveTo(u * 0.28, -u * 0.38); ctx.lineTo(u * 0.48, u * 0.15); ctx.stroke();
      skBox(ctx, -u * 0.3, -u * 0.45, u * 0.6, u * 0.75, u * 0.12, "#ff7a00", "#9a4a00", lw);
      ctx.fillStyle = "#e8e8e8";
      ctx.fillRect(-u * 0.3, -u * 0.12, u * 0.6, u * 0.07);
      ctx.fillRect(-u * 0.3, u * 0.08, u * 0.6, u * 0.07);
      skDisc(ctx, 0, -u * 0.68, u * 0.2, "#e9b48a", "#8c5a3a", lw);
      ctx.beginPath(); ctx.arc(0, -u * 0.72, u * 0.24, Math.PI, 0); ctx.closePath();
      ctx.fillStyle = "#ffd400"; ctx.fill(); ctx.strokeStyle = "#8a6d00"; ctx.lineWidth = lw; ctx.stroke();
      ctx.fillStyle = "#ffd400"; ctx.fillRect(-u * 0.32, -u * 0.74, u * 0.64, u * 0.06);
    },
    signStop: function (ctx, w, h) { skSignPole(ctx, w, h); skSignOctagon(ctx, w, h); },
    signNoEntry: function (ctx, w, h) {
      skSignPole(ctx, w, h);
      var r = Math.min(w, h / 1.8) * 0.48, cy = -h / 2 + r + 1;
      skDisc(ctx, 0, cy, r, "#c8102e", "#fff", Math.max(1, r * 0.08));
      skBox(ctx, -r * 0.68, cy - r * 0.16, r * 1.36, r * 0.32, 1, "#fff");
    },
    signGiveWay: function (ctx, w, h) {
      skSignPole(ctx, w, h);
      var s = Math.min(w, h / 1.8) * 0.98, top = -h / 2 + 1;
      skPoly(ctx, [[-s / 2, top], [s / 2, top], [0, top + s * 0.87]], "#c8102e", "#fff", Math.max(1, s * 0.03));
      skPoly(ctx, [[-s * 0.3, top + s * 0.12], [s * 0.3, top + s * 0.12], [0, top + s * 0.64]], "#fff");
    },
    signWorks: function (ctx, w, h) {
      skSignPole(ctx, w, h);
      var s = Math.min(w, h / 1.8) * 0.98, top = -h / 2 + 1, base = top + s * 0.87;
      skPoly(ctx, [[0, top], [s / 2, base], [-s / 2, base]], "#c8102e", "#fff", Math.max(1, s * 0.03));
      skPoly(ctx, [[0, top + s * 0.2], [s * 0.32, base - s * 0.09], [-s * 0.32, base - s * 0.09]], "#fff");
      // a man digging
      ctx.strokeStyle = "#111"; ctx.lineCap = "round"; ctx.lineWidth = Math.max(1, s * 0.05);
      var cx = -s * 0.03, cy = base - s * 0.28;
      skDisc(ctx, cx + s * 0.03, cy - s * 0.17, s * 0.045, "#111");
      ctx.beginPath();
      ctx.moveTo(cx, cy - s * 0.1); ctx.lineTo(cx - s * 0.04, cy + s * 0.05);
      ctx.lineTo(cx - s * 0.1, cy + s * 0.16); ctx.moveTo(cx - s * 0.04, cy + s * 0.05); ctx.lineTo(cx + s * 0.04, cy + s * 0.16);
      ctx.moveTo(cx, cy - s * 0.06); ctx.lineTo(cx + s * 0.1, cy + s * 0.02);
      ctx.moveTo(cx + s * 0.04, cy - s * 0.08); ctx.lineTo(cx + s * 0.16, cy + s * 0.14);
      ctx.stroke();
      skPoly(ctx, [[cx + s * 0.12, base - s * 0.12], [cx + s * 0.24, base - s * 0.12], [cx + s * 0.18, base - s * 0.2]], "#111");
    },
    container: function (ctx, w, h) {
      var lw = Math.max(1, h * 0.04);
      skBox(ctx, -w / 2, -h / 2, w, h, h * 0.03, "#b5532f", "#6e2f17", lw);
      ctx.lineWidth = Math.max(0.6, lw * 0.6);
      for (var i = 1; i < 24; i++) {
        var x = -w / 2 + w * i / 24;
        ctx.strokeStyle = i % 2 ? "#923f20" : "#cf6a43";
        ctx.beginPath(); ctx.moveTo(x, -h / 2 + h * 0.06); ctx.lineTo(x, h / 2 - h * 0.06); ctx.stroke();
      }
      ctx.strokeStyle = "#6e2f17"; ctx.lineWidth = lw;
      ctx.strokeRect(-w / 2 + h * 0.06, -h / 2 + h * 0.06, w - h * 0.12, h - h * 0.12);
    },
    bridge: function (ctx, w, h) {
      var lw = Math.max(1, h * 0.025);
      // abutments at both ends
      skBox(ctx, -w / 2, -h / 2, w * 0.05, h, 1, "#8f8a80", "#555", lw);
      skBox(ctx, w / 2 - w * 0.05, -h / 2, w * 0.05, h, 1, "#8f8a80", "#555", lw);
      skBox(ctx, -w * 0.45, -h * 0.42, w * 0.9, h * 0.84, 1, "#a7a9ac", "#555", lw);
      ctx.strokeStyle = "#fff"; ctx.lineWidth = Math.max(1, h * 0.03); ctx.setLineDash([h * 0.25, h * 0.2]);
      ctx.beginPath(); ctx.moveTo(-w * 0.43, 0); ctx.lineTo(w * 0.43, 0); ctx.stroke();
      ctx.setLineDash([]);
      [-1, 1].forEach(function (sgn) {
        var y = sgn * h * 0.42 - (sgn > 0 ? h * 0.1 : 0);
        skBox(ctx, -w * 0.45, y, w * 0.9, h * 0.1, 1, "#6d6f72", "#3d3f42", lw);
        ctx.fillStyle = "#3d3f42";
        for (var i = 0; i <= 12; i++) ctx.fillRect(-w * 0.45 + w * 0.9 * i / 12 - lw, y, lw * 2, h * 0.1);
      });
      ctx.strokeStyle = "#555"; ctx.lineWidth = lw;
      [-0.15, 0.15].forEach(function (x) { ctx.beginPath(); ctx.moveTo(x * w, -h * 0.32); ctx.lineTo(x * w, h * 0.32); ctx.stroke(); });
    }
  };
  function skSignPole(ctx, w, h) {
    skBox(ctx, -Math.max(1, w * 0.04), -h / 2 + w * 0.4, Math.max(2, w * 0.08), h - w * 0.4, 1, "#8d9399", "#5d6267", 0.8);
  }
  function skSignOctagon(ctx, w, h) {
    var r = Math.min(w, h / 1.8) * 0.5, cy = -h / 2 + r + 1, pts = [];
    for (var i = 0; i < 8; i++) { var a = Math.PI / 8 + i * Math.PI / 4; pts.push([Math.cos(a) * r, cy + Math.sin(a) * r]); }
    skPoly(ctx, pts, "#c8102e", "#fff", Math.max(1, r * 0.08));
    ctx.fillStyle = "#fff";
    ctx.font = "800 " + (r * 0.5) + "px Assistant, Arial, sans-serif";
    ctx.textAlign = "center"; ctx.textBaseline = "middle";
    ctx.fillText("עצור", 0, cy + r * 0.04);
  }

  function skDrawObj(ctx, el, view) {
    var draw = SK_DRAW_OBJ[el.kind];
    if (!draw) return;
    var z = view.z;
    ctx.save();
    ctx.translate((el.c.x - view.x) * z, (el.c.y - view.y) * z);
    ctx.rotate(el.rot || 0);
    ctx.lineJoin = "round";
    draw(ctx, el.w * z, el.h * z);
    ctx.restore();
  }
  // the object's corners, in world units
  function skObjCorner(el, sx, sy) {
    var c = Math.cos(el.rot || 0), s = Math.sin(el.rot || 0), x = sx * el.w / 2, y = sy * el.h / 2;
    return { x: el.c.x + x * c - y * s, y: el.c.y + x * s + y * c };
  }
  function skObjHas(el, p, tol) {
    var c = Math.cos(-(el.rot || 0)), s = Math.sin(-(el.rot || 0));
    var dx = p.x - el.c.x, dy = p.y - el.c.y;
    var x = dx * c - dy * s, y = dx * s + dy * c;
    return Math.abs(x) <= el.w / 2 + (tol || 0) && Math.abs(y) <= el.h / 2 + (tol || 0);
  }
  function skObjById(id) { return sk.els.find(function (e) { return e.type === "obj" && e.id === id; }); }
  // the selection: a dashed frame and the yellow dot (on screen only)
  function skDrawObjSelection(ctx, view) {
    var el = sk.objSel && skObjById(sk.objSel);
    if (!el) return;
    var S = function (q) { return { x: (q.x - view.x) * view.z, y: (q.y - view.y) * view.z }; };
    var cs = [skObjCorner(el, -1, -1), skObjCorner(el, 1, -1), skObjCorner(el, 1, 1), skObjCorner(el, -1, 1)].map(S);
    ctx.save();
    ctx.strokeStyle = "#2e4fb8"; ctx.lineWidth = 1.5; ctx.setLineDash([6, 4]);
    ctx.beginPath(); cs.forEach(function (q, i) { if (i) ctx.lineTo(q.x, q.y); else ctx.moveTo(q.x, q.y); }); ctx.closePath(); ctx.stroke();
    ctx.setLineDash([]);
    var hd = cs[2];
    ctx.shadowColor = "rgba(0,0,0,0.35)"; ctx.shadowBlur = 4;
    skDisc(ctx, hd.x, hd.y, 11, "#ffd400", "#8a6d00", 2);
    ctx.restore();
  }

  // ---- placing, moving, resizing ------------------------------------------
  var skObjDrag = null;
  function skAddObject(kind) {
    var def = skObjDef(kind);
    var upm = skUnitsPerMetre(), w = def.m[0] * upm, h = def.m[1] * upm;
    // keep it a sensible size on the screen whatever the scale
    var dpr = window.devicePixelRatio || 1, screenW = skCanvas.width / dpr / sk.view.z, screenH = skCanvas.height / dpr / sk.view.z;
    var k = Math.min(1, Math.min(screenW, screenH) * 0.6 / Math.max(w, h));
    k = Math.max(k, 28 / Math.max(w, h));
    w *= k; h *= k;
    var el = { type: "obj", id: uid(), kind: kind, c: { x: sk.view.x + screenW / 2, y: sk.view.y + screenH / 2 }, w: w, h: h, rot: 0 };
    sk.tool = "obj";
    skCommit(function () { sk.els.push(el); });
    sk.objSel = el.id;
    skUpdateButtons();
    skDraw();
  }
  // pointer down: the yellow dot of the selected object, or (objects tool)
  // an object to select and move. True when it was taken.
  function skObjPointerDown(p) {
    var sel = sk.objSel && skObjById(sk.objSel);
    if (sel) {
      var hd = skObjCorner(sel, 1, 1);
      if (skDist(p, hd) < 20 / sk.view.z) {
        skObjDrag = { id: sel.id, mode: "size", before: JSON.stringify(sk.els), start: { c: sel.c, w: sel.w, h: sel.h, rot: sel.rot || 0, hd: hd } };
        return true;
      }
    }
    if (sk.tool !== "obj") return false;
    for (var i = sk.els.length - 1; i >= 0; i--) {
      var el = sk.els[i];
      if (el.type === "obj" && skObjHas(el, p, 4 / sk.view.z)) {
        sk.objSel = el.id;
        skObjDrag = { id: el.id, mode: "move", before: JSON.stringify(sk.els), start: { p: p, c: { x: el.c.x, y: el.c.y } } };
        skDraw();
        return true;
      }
    }
    sk.objSel = null;
    skDraw();
    return true;
  }
  function skObjPointerMove(p) {
    if (!skObjDrag) return false;
    var el = skObjById(skObjDrag.id), st = skObjDrag.start;
    if (!el) { skObjDrag = null; return false; }
    if (skObjDrag.mode === "move") {
      el.c = { x: st.c.x + p.x - st.p.x, y: st.c.y + p.y - st.p.y };
    } else {
      // the dot's distance from the centre sizes it, its angle turns it
      var d0 = skDist(st.hd, st.c), d1 = Math.max(8, skDist(p, st.c));
      var k = Math.max(0.05, d1 / d0);
      el.w = st.w * k; el.h = st.h * k;
      var a0 = Math.atan2(st.hd.y - st.c.y, st.hd.x - st.c.x), a1 = Math.atan2(p.y - st.c.y, p.x - st.c.x);
      var rot = st.rot + a1 - a0, step = Math.PI / 12;
      var snapped = Math.round(rot / step) * step;
      el.rot = Math.abs(rot - snapped) < 0.09 ? snapped : rot;
      if (Math.abs(Math.sin(el.rot)) < 1e-9) el.rot = Math.round(el.rot / Math.PI) * Math.PI;
    }
    skDraw();
    return true;
  }
  function skObjPointerEnd() {
    if (!skObjDrag) return false;
    var before = skObjDrag.before;
    skObjDrag = null;
    if (before !== JSON.stringify(sk.els)) {
      sk.undo.push(before);
      if (sk.undo.length > 80) sk.undo.shift();
      sk.redo = [];
      skSaveDraft();
      skUpdateButtons();
    }
    skDraw();
    return true;
  }
  function skObjCancelDrag() {
    if (!skObjDrag) return;
    sk.els = JSON.parse(skObjDrag.before);
    skObjDrag = null;
  }

  // ---- the objects menu ------------------------------------------------------
  var skObjMenu = document.getElementById("sketchObjMenu");
  SK_OBJS.forEach(function (def) {
    var b = document.createElement("button");
    b.type = "button";
    b.className = "sk-obj-pick";
    b.setAttribute("data-obj", def.kind);
    var c = document.createElement("canvas");
    c.width = 88; c.height = 88;
    var ctx = c.getContext("2d"), k = 76 / Math.max(def.m[0], def.m[1]);
    ctx.translate(44, 44);
    SK_DRAW_OBJ[def.kind](ctx, def.m[0] * k, def.m[1] * k);
    var label = document.createElement("span");
    label.setAttribute("data-i18n", "skObj_" + def.kind);
    label.textContent = tr("skObj_" + def.kind);
    b.appendChild(c);
    b.appendChild(label);
    b.addEventListener("click", function () {
      skObjMenu.hidden = true;
      skAddObject(def.kind);
    });
    skObjMenu.appendChild(b);
  });
  document.getElementById("sketchObjBtn").addEventListener("click", function () {
    var open = skObjMenu.hidden;
    sk.tool = "obj";
    skUpdateButtons();
    skObjMenu.hidden = !open;
    if (open) showToast(tr("sketchObjHint"), 2500);
  });

  // ---- textured fills -----------------------------------------------------------
  function skRand(seed) {
    var s = seed;
    return function () { s = (s * 1664525 + 1013904223) % 4294967296; return s / 4294967296; };
  }
  // one tile of a texture at R pixels per world unit
  function skFillTile(kind, R) {
    var tw = kind === "paving" ? 24 : kind === "water" ? 40 : 30, th = kind === "paving" ? 12 : kind === "water" ? 20 : 30;
    var c = document.createElement("canvas");
    c.width = Math.max(2, Math.round(tw * R)); c.height = Math.max(2, Math.round(th * R));
    var ctx = c.getContext("2d"), rnd = skRand(kind.length * 7919 + 17);
    ctx.scale(c.width / tw, c.height / th);
    var dots = function (n, colors, rmin, rmax) {
      for (var i = 0; i < n; i++) {
        var x = rnd() * tw, y = rnd() * th, r = rmin + rnd() * (rmax - rmin);
        ctx.fillStyle = colors[Math.floor(rnd() * colors.length)];
        [-tw, 0, tw].forEach(function (ox) { [-th, 0, th].forEach(function (oy) { ctx.beginPath(); ctx.arc(x + ox, y + oy, r, 0, Math.PI * 2); ctx.fill(); }); });
      }
    };
    if (kind === "paving") {
      // interlocking blocks laid in a running bond
      ctx.fillStyle = "#857a6b"; ctx.fillRect(0, 0, tw, th);
      [[0, 0, ["#c9b79c", "#b8a385"]], [-6, 6, ["#b8a385", "#c9b79c", "#c9b79c"]]].forEach(function (row) {
        for (var i = 0; i < row[2].length + 1; i++) {
          var x = row[0] + i * 12;
          skRR(ctx, x + 0.5, row[1] + 0.5, 11, 5, 1.4);
          ctx.fillStyle = row[2][i % row[2].length]; ctx.fill();
        }
      });
    } else if (kind === "road") {
      ctx.fillStyle = "#54575c"; ctx.fillRect(0, 0, tw, th);
      dots(140, ["#46494d", "#63666b", "#6d7075", "#3e4044"], 0.25, 0.6);
    } else if (kind === "grass") {
      ctx.fillStyle = "#74ad4f"; ctx.fillRect(0, 0, tw, th);
      ctx.lineCap = "round"; ctx.lineWidth = 0.5;
      for (var g = 0; g < 160; g++) {
        var gx = rnd() * tw, gy = rnd() * th, a = -Math.PI / 2 + (rnd() - 0.5) * 0.9, l = 1.5 + rnd() * 2;
        ctx.strokeStyle = rnd() < 0.5 ? "#5a9638" : "#93c86a";
        [-tw, 0, tw].forEach(function (ox) { [-th, 0, th].forEach(function (oy) {
          ctx.beginPath(); ctx.moveTo(gx + ox, gy + oy); ctx.lineTo(gx + ox + Math.cos(a) * l, gy + oy + Math.sin(a) * l); ctx.stroke();
        }); });
      }
    } else if (kind === "soil") {
      ctx.fillStyle = "#7b5534"; ctx.fillRect(0, 0, tw, th);
      dots(120, ["#5f3f24", "#9a6e47", "#6c4a2c", "#8a603b"], 0.3, 1.1);
    } else if (kind === "gravel") {
      ctx.fillStyle = "#cfc6b3"; ctx.fillRect(0, 0, tw, th);
      for (var q = 0; q < 70; q++) {
        var px = rnd() * tw, py = rnd() * th, rx = 0.7 + rnd() * 1.1, ry = rx * (0.6 + rnd() * 0.4), rot = rnd() * Math.PI;
        var col = ["#9d968a", "#b5ad9f", "#8a8378", "#c2baa9"][Math.floor(rnd() * 4)];
        [-tw, 0, tw].forEach(function (ox) { [-th, 0, th].forEach(function (oy) {
          ctx.beginPath(); ctx.ellipse(px + ox, py + oy, rx, ry, rot, 0, Math.PI * 2);
          ctx.fillStyle = col; ctx.fill(); ctx.strokeStyle = "#6f695f"; ctx.lineWidth = 0.25; ctx.stroke();
        }); });
      }
    } else if (kind === "water") {
      ctx.fillStyle = "#5d9fd8"; ctx.fillRect(0, 0, tw, th);
      ctx.strokeStyle = "#aed3f3"; ctx.lineWidth = 0.7; ctx.lineCap = "round";
      [[2, 5], [22, 5], [12, 15], [32, 15]].forEach(function (w0) {
        ctx.beginPath();
        ctx.moveTo(w0[0], w0[1]);
        ctx.quadraticCurveTo(w0[0] + 2.5, w0[1] - 2, w0[0] + 5, w0[1]);
        ctx.quadraticCurveTo(w0[0] + 7.5, w0[1] + 2, w0[0] + 10, w0[1]);
        ctx.stroke();
      });
    }
    return c;
  }
  // the textured picture of a fill: its texture, cut to its shape
  function skFillArt(el, mask) {
    if (!sk.fillArt) sk.fillArt = {};
    if (sk.fillArt[el.id]) return sk.fillArt[el.id];
    var R = Math.min(3, 2400 / Math.max(el.w, el.h));
    var c = document.createElement("canvas");
    c.width = Math.max(1, Math.round(el.w * R)); c.height = Math.max(1, Math.round(el.h * R));
    var ctx = c.getContext("2d");
    var pat = ctx.createPattern(skFillTile(el.pattern, R), "repeat");
    // laid from the world's origin, so neighbouring fills meet seamlessly
    ctx.save();
    ctx.translate(-el.p.x * R, -el.p.y * R);
    ctx.fillStyle = pat;
    ctx.fillRect(el.p.x * R, el.p.y * R, c.width, c.height);
    ctx.restore();
    if (el.pattern === "road" && el.axis) {
      // a dashed white centre line along the road's length
      var a = el.axis, ux = Math.cos(a.ang), uy = Math.sin(a.ang);
      ctx.strokeStyle = "#f4f4f4"; ctx.lineWidth = Math.max(1, 1.6 * R); ctx.setLineDash([12 * R, 9 * R]);
      ctx.beginPath();
      ctx.moveTo((a.cx - ux * a.len - el.p.x) * R, (a.cy - uy * a.len - el.p.y) * R);
      ctx.lineTo((a.cx + ux * a.len - el.p.x) * R, (a.cy + uy * a.len - el.p.y) * R);
      ctx.stroke();
    }
    ctx.globalCompositeOperation = "destination-in";
    ctx.drawImage(mask, 0, 0, c.width, c.height);
    sk.fillArt[el.id] = c;
    return c;
  }

  // ---- the fill menu ---------------------------------------------------------------
  var skFillMenu = document.getElementById("sketchFillMenu");
  function skFillSwatch(kind) {
    var c = document.createElement("canvas");
    c.width = 56; c.height = 40;
    var ctx = c.getContext("2d");
    if (kind === "color") {
      ctx.fillStyle = sk.color; ctx.globalAlpha = 0.45; ctx.fillRect(0, 0, 56, 40);
    } else {
      ctx.fillStyle = ctx.createPattern(skFillTile(kind, 1.6), "repeat");
      ctx.fillRect(0, 0, 56, 40);
    }
    return c;
  }
  function skBuildFillMenu() {
    var list = skFillMenu.querySelector(".sk-fill-list");
    list.innerHTML = "";
    SK_FILL_KINDS.forEach(function (kind) {
      var b = document.createElement("button");
      b.type = "button";
      b.className = "sk-fill-pick" + (sk.fillKind === kind ? " on" : "");
      b.setAttribute("data-fill", kind);
      b.appendChild(skFillSwatch(kind));
      var label = document.createElement("span");
      label.textContent = tr("skFill_" + kind);
      b.appendChild(label);
      b.addEventListener("click", function () {
        sk.fillKind = kind;
        skFillMenu.hidden = true;
      });
      list.appendChild(b);
    });
  }
  document.querySelector(".sk-tool[data-tool=fill]").addEventListener("click", function () {
    skBuildFillMenu();
    skFillMenu.hidden = false;
  });
