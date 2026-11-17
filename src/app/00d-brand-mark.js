  // ---------------------------------------------------------------------
  // The app's signature on everything it makes: the app's icon and ITASK,
  // small, at the top left - on every page of its PDFs (reports, the diary,
  // the work plan, scans, sketches, the tasks page) and on its pictures
  // (diary photos, a sketch shared as a picture).
  // ---------------------------------------------------------------------
  var brandIconImg = null, brandIconLoaded = null;
  function brandIcon() {
    if (brandIconImg) return brandIconImg;
    brandIconImg = new Promise(function (resolve) {
      var img = new Image();
      img.onload = function () { brandIconLoaded = img; resolve(img); };
      img.onerror = function () { resolve(null); };
      img.src = "tasks-icon-192.png";
    });
    return brandIconImg;
  }
  // the mark itself, `h` pixels tall: a light rounded plate (readable on a
  // photo or a drawing), the icon, then I (red) TASK (green)
  function drawBrandMark(ctx, x, y, h, icon) {
    var pad = h * 0.16, iconS = h - 2 * pad, font = Math.round(h * 0.56);
    ctx.save();
    ctx.font = "800 " + font + "px Rubik, Assistant, Arial, sans-serif";
    ctx.direction = "ltr";
    ctx.textAlign = "left";
    ctx.textBaseline = "middle";
    var iW = ctx.measureText("I").width, tW = ctx.measureText("TASK").width;
    var w = pad + (icon ? iconS + pad * 1.2 : 0) + iW + tW + pad * 1.6;
    ctx.fillStyle = "rgba(255, 255, 255, 0.82)";
    var r = h * 0.22;
    ctx.beginPath();
    ctx.moveTo(x + r, y); ctx.lineTo(x + w - r, y); ctx.quadraticCurveTo(x + w, y, x + w, y + r);
    ctx.lineTo(x + w, y + h - r); ctx.quadraticCurveTo(x + w, y + h, x + w - r, y + h);
    ctx.lineTo(x + r, y + h); ctx.quadraticCurveTo(x, y + h, x, y + h - r);
    ctx.lineTo(x, y + r); ctx.quadraticCurveTo(x, y, x + r, y);
    ctx.fill();
    var cx = x + pad;
    if (icon) {
      ctx.drawImage(icon, cx, y + pad, iconS, iconS);
      cx += iconS + pad * 1.2;
    }
    ctx.fillStyle = "#bf4e30";
    ctx.fillText("I", cx, y + h / 2 + h * 0.03);
    ctx.fillStyle = "#44563c";
    ctx.fillText("TASK", cx + iW, y + h / 2 + h * 0.03);
    ctx.restore();
    return w;
  }
  // on a picture (a canvas), in its top-left corner - at once (the icon
  // is loaded when the app starts; until then, the name alone)
  function brandCanvas(canvas) {
    var h = Math.max(22, Math.round(Math.min(canvas.width, canvas.height) * 0.045));
    drawBrandMark(canvas.getContext("2d"), Math.round(h * 0.4), Math.round(h * 0.4), h, brandIconLoaded);
    return canvas;
  }
  // the mark as a picture of its own (for PDFs and the printed tasks page): { url, ratio }
  var brandMarkCached = null;
  function brandMarkImage() {
    return brandIcon().then(function (icon) {
      if (brandMarkCached) return brandMarkCached;
      var h = 96, c = document.createElement("canvas");
      c.width = 600; c.height = h;
      var w = Math.ceil(drawBrandMark(c.getContext("2d"), 0, 0, h, icon));
      var out = document.createElement("canvas");
      out.width = w; out.height = h;
      out.getContext("2d").drawImage(c, 0, 0);
      brandMarkCached = { url: out.toDataURL("image/png"), ratio: w / h };
      return brandMarkCached;
    });
  }
  // on every page of a jsPDF document (mm), at the top left
  var BRAND_PDF_MM = { x: 4, y: 3.5, h: 6 };
  function brandPdf(pdf) {
    return brandMarkImage().then(function (mark) {
      var n = pdf.internal.getNumberOfPages();
      for (var i = 1; i <= n; i++) {
        pdf.setPage(i);
        pdf.addImage(mark.url, "PNG", BRAND_PDF_MM.x, BRAND_PDF_MM.y, BRAND_PDF_MM.h * mark.ratio, BRAND_PDF_MM.h);
      }
      return pdf;
    }, function () { return pdf; });
  }
  setTimeout(brandMarkImage, 1500);
