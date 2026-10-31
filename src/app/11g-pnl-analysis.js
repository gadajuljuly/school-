
  // ---------------------------------------------------------------------
  // ניתוח רווח והפסד: the budget control's numbers read for the user - a
  // few headline tiles, what they say in words (profit on the work done,
  // cost per budgeted shekel, the forecast, the items and chapters behind
  // an overrun, collection), and four charts drawn as SVG:
  //   - income approved by the client against costs, cumulative by month;
  //   - costs by type (ranked bars, one hue);
  //   - profit on the work done by chapter (diverging around zero);
  //   - work done against budget used, by chapter.
  // Colors: blue / orange (validated together for color-blind reading),
  // gray hairlines; every bar is labelled, and a tap on the time chart
  // reads that month's values out. The same, with the charts, as a PDF.
  // ---------------------------------------------------------------------
  var PNL_BLUE = "#2a78d6", PNL_ORANGE = "#eb6834", PNL_GRID = "#e1e0d9", PNL_AXIS = "#c3c2b7", PNL_MUTED = "#898781", PNL_INK = "#2c2a24";

  function pnlEsc(s) {
    return String(s == null ? "" : s).replace(/[&<>"]/g, function (c) { return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]; });
  }
  function pnlShort(n) {
    var a = Math.abs(n), sign = n < 0 ? "-" : "";
    if (a >= 1e6) return sign + (Math.round(a / 1e5) / 10) + "M";
    if (a >= 1e4) return sign + Math.round(a / 1e3) + "K";
    return sign + Math.round(a).toLocaleString("he-IL");
  }
  function pnlPct(part, whole) { return whole ? Math.round(part * 1000 / whole) / 10 : 0; }

  // ---- the numbers ---------------------------------------------------------------
  function pnlData() {
    var d = budget.data, t = budgetTotals(), cats = budgetByCategory(), cs = clientSummary(d);
    var planCostDone = 0, itemActual = 0;
    var chapters = [];
    var overruns = [];
    d.items.forEach(function (item) {
      var actual = budgetItemActual(item), cost = budgetNum(item.cost), p = Math.min(100, budgetNum(item.progress));
      planCostDone += cost * p / 100;
      itemActual += actual;
      var name = (item.chapter || "").trim() || tr("budgetNoChapter");
      var g = chapters.find(function (c) { return c.name === name; });
      if (!g) chapters.push(g = { name: name, contract: 0, earned: 0, cost: 0, actual: 0, planDone: 0 });
      var contract = budgetItemContract(item);
      g.contract += contract;
      g.earned += contract * p / 100;
      g.cost += cost;
      g.actual += actual;
      g.planDone += cost * p / 100;
      var over = budgetItemForecast(item, actual) - cost;
      if (cost && over > 0 && budgetItemOver(item, actual)) overruns.push({ name: budgetItemLabel(item), over: over });
    });
    overruns.sort(function (a, b) { return b.over - a.over; });
    // by month: costs, and what the client approved (each approved bill's cumulative value)
    var months = {};
    var month = function (date) { return String(date || "").slice(0, 7); };
    d.expenses.forEach(function (e) {
      var m = month(e.date);
      if (!m) return;
      months[m] = months[m] || { cost: 0, income: null };
      months[m].cost += budgetNum(e.amount);
    });
    subBills(d, clientSub(d)).filter(function (b) { return b.status === "approved"; }).forEach(function (b) {
      var m = month(b.date);
      if (!m) return;
      months[m] = months[m] || { cost: 0, income: null };
      months[m].income = budgetNum(b.totals && b.totals.cumulative);
    });
    var keys = Object.keys(months).sort(), runCost = 0, lastIncome = 0;
    var timeline = keys.map(function (m) {
      runCost += months[m].cost;
      if (months[m].income != null) lastIncome = months[m].income;
      return { month: m, cost: runCost, income: lastIncome };
    });
    return { t: t, cats: cats, cs: cs, chapters: chapters, overruns: overruns, timeline: timeline,
      cpi: itemActual ? itemActual / (planCostDone || 1) : null, planCostDone: planCostDone, itemActual: itemActual };
  }

  // what the numbers say, in sentences
  function pnlInsights(x) {
    var t = x.t, out = [];
    var profit = t.earned - t.actual;
    if (t.earned || t.actual) {
      out.push({ good: profit >= 0, text: tr(profit >= 0 ? "pnlInProfit" : "pnlInLoss")
        .replace("{earned}", budgetMoney(t.earned)).replace("{spent}", budgetMoney(t.actual))
        .replace("{sum}", budgetMoney(Math.abs(profit))).replace("{pct}", pnlPct(profit, t.earned)) });
    }
    if (x.cpi != null && x.planCostDone) {
      var cpi = Math.round(x.cpi * 100) / 100;
      out.push({ good: cpi <= 1.05, text: tr(cpi > 1.05 ? "pnlCpiOver" : cpi < 0.95 ? "pnlCpiUnder" : "pnlCpiOk").replace("{cpi}", cpi.toFixed(2)) });
    }
    if (t.contract) {
      var planned = t.contract - t.cost, forecast = t.contract - t.forecast;
      out.push({ good: forecast >= planned, text: tr("pnlForecast")
        .replace("{forecast}", budgetMoney(forecast)).replace("{fpct}", pnlPct(forecast, t.contract))
        .replace("{planned}", budgetMoney(planned)).replace("{ppct}", pnlPct(planned, t.contract)) });
    }
    if (x.overruns.length) {
      out.push({ good: false, text: tr("pnlTopOverruns").replace("{list}", x.overruns.slice(0, 3).map(function (o) {
        return o.name + " (" + budgetMoney(o.over) + ")";
      }).join(", ")) });
    }
    var losing = x.chapters.filter(function (c) { return c.actual > c.earned && c.actual > 0; });
    if (losing.length) out.push({ good: false, text: tr("pnlLosingChapters").replace("{list}", losing.map(function (c) { return c.name; }).join(", ")) });
    var biggest = BUDGET_CATEGORIES.filter(function (c) { return x.cats[c].spent; }).sort(function (a, b) { return x.cats[b].spent - x.cats[a].spent; })[0];
    if (biggest && t.actual) {
      out.push({ good: true, text: tr("pnlBiggestCost").replace("{type}", budgetCategoryLabel(biggest)).replace("{pct}", pnlPct(x.cats[biggest].spent, t.actual)) });
    }
    if (x.cs.approved) {
      out.push({ good: x.cs.open <= 0, text: tr("pnlCollection").replace("{approved}", budgetMoney(x.cs.approved))
        .replace("{received}", budgetMoney(x.cs.received)).replace("{open}", budgetMoney(Math.max(0, x.cs.open))) });
    }
    if (!out.length) out.push({ good: true, text: tr("pnlNoData") });
    return out;
  }

  // ---- the charts (SVG strings; drawn right to left, as the page reads) ------------------
  // (each SVG is set left-to-right itself: its x / text-anchor are placed by
  // hand, and the page's RTL would otherwise flip every anchor)
  var PNL_W = 340;
  // horizontal bars: rows of { label, value, color }, labels on the right
  function pnlBars(rows, opts) {
    opts = opts || {};
    var rowH = 26, labelW = 110, valueW = 62, top = 4, h = top + rows.length * rowH + 4;
    var plotW = PNL_W - labelW - valueW;
    var min = Math.min(0, Math.min.apply(null, rows.map(function (r) { return r.value; })));
    var max = Math.max(0, Math.max.apply(null, rows.map(function (r) { return r.value; })));
    var span = (max - min) || 1;
    // x of a value: the bars grow from the zero line toward the left (RTL)
    var right = PNL_W - labelW - 6;
    var xOf = function (v) { return right - (v - min) / span * plotW; };
    var zero = xOf(0);
    var out = ['<svg viewBox="0 0 ' + PNL_W + " " + h + '" width="100%" role="img" direction="ltr" style="direction:ltr" font-family="inherit" font-size="11">'];
    out.push('<line x1="' + zero + '" y1="0" x2="' + zero + '" y2="' + h + '" stroke="' + PNL_AXIS + '" stroke-width="1"/>');
    rows.forEach(function (r, i) {
      var y = top + i * rowH, barY = y + 6, barH = 14;
      var x1 = xOf(Math.max(0, r.value)), x2 = xOf(Math.min(0, r.value));
      var w = Math.max(r.value ? 2 : 0, Math.abs(x2 - x1));
      var x = Math.min(x1, x2);
      // the label reads right to left (so "01 עפר" stays so), from the right edge
      out.push('<text x="' + (PNL_W - 2) + '" y="' + (y + 17) + '" direction="rtl" text-anchor="start" fill="' + PNL_INK + '">' + pnlEsc(r.label) + "</text>");
      out.push('<rect x="' + x + '" y="' + barY + '" width="' + w + '" height="' + barH + '" rx="3" fill="' + r.color + '"><title>' +
        pnlEsc(r.label + ": " + (r.text || budgetMoney(r.value))) + "</title></rect>");
      // the value at the bar's far end (left of a positive bar, right of a negative one)
      var lx = r.value >= 0 ? x - 4 : x + w + 4;
      out.push('<text x="' + lx + '" y="' + (y + 17) + '" text-anchor="' + (r.value >= 0 ? "end" : "start") + '" fill="' + PNL_MUTED + '">' +
        pnlEsc(r.text || pnlShort(r.value)) + "</text>");
    });
    out.push("</svg>");
    return out.join("");
  }
  // cumulative lines by month: two series on one ₪ axis, chronological left to right
  function pnlLines(points, series) {
    var h = 170, left = 40, right = 10, top = 10, bottom = 22;
    var plotW = PNL_W - left - right, plotH = h - top - bottom;
    var max = Math.max.apply(null, points.map(function (p) { return Math.max.apply(null, series.map(function (s) { return p[s.key]; })); })) || 1;
    var xOf = function (i) { return left + (points.length === 1 ? plotW / 2 : i * plotW / (points.length - 1)); };
    var yOf = function (v) { return top + plotH - v / max * plotH; };
    var out = ['<svg viewBox="0 0 ' + PNL_W + " " + h + '" width="100%" role="img" direction="ltr" style="direction:ltr" font-family="inherit" font-size="10">'];
    [0, 0.5, 1].forEach(function (f) {
      var y = yOf(max * f);
      out.push('<line x1="' + left + '" y1="' + y + '" x2="' + (PNL_W - right) + '" y2="' + y + '" stroke="' + (f ? PNL_GRID : PNL_AXIS) + '" stroke-width="1"/>');
      out.push('<text x="' + (left - 4) + '" y="' + (y + 3) + '" text-anchor="end" fill="' + PNL_MUTED + '">' + pnlShort(max * f) + "</text>");
    });
    points.forEach(function (p, i) {
      if (points.length <= 6 || i % Math.ceil(points.length / 6) === 0 || i === points.length - 1) {
        out.push('<text x="' + xOf(i) + '" y="' + (h - 6) + '" text-anchor="middle" fill="' + PNL_MUTED + '">' + p.month.slice(5, 7) + "/" + p.month.slice(2, 4) + "</text>");
      }
    });
    series.forEach(function (s) {
      var d = points.map(function (p, i) { return (i ? "L" : "M") + xOf(i).toFixed(1) + " " + yOf(p[s.key]).toFixed(1); }).join(" ");
      out.push('<path d="' + d + '" fill="none" stroke="' + s.color + '" stroke-width="2" stroke-linejoin="round" stroke-linecap="round"/>');
      points.forEach(function (p, i) {
        out.push('<circle cx="' + xOf(i) + '" cy="' + yOf(p[s.key]) + '" r="4" fill="' + s.color + '" stroke="#fff" stroke-width="2"/>');
      });
    });
    // a column per month to tap / hover: reads its values out below the chart
    points.forEach(function (p, i) {
      var w = points.length === 1 ? plotW : plotW / (points.length - 1);
      out.push('<rect class="pnl-hit" data-i="' + i + '" x="' + (xOf(i) - w / 2) + '" y="' + top + '" width="' + w + '" height="' + plotH + '" fill="transparent"/>');
    });
    out.push("</svg>");
    return out.join("");
  }
  function pnlLegend(items) {
    return '<div class="pnl-legend">' + items.map(function (it) {
      return '<span><i style="background:' + it.color + '"></i>' + pnlEsc(it.label) + "</span>";
    }).join("") + "</div>";
  }

  // the analysis' parts, as HTML strings (for the screen and the PDF alike)
  function pnlSections(x) {
    var t = x.t, s = [];
    var profit = t.earned - t.actual;
    var tiles = [
      [tr("brProfitToDate"), budgetMoney(profit), t.earned ? pnlPct(profit, t.earned) + "%" : "", profit < 0],
      [tr("pnlPlannedMargin"), t.contract ? pnlPct(t.contract - t.cost, t.contract) + "%" : "—", budgetMoney(t.contract - t.cost), false],
      [tr("budgetForecastProfit"), budgetMoney(t.contract - t.forecast), t.contract ? pnlPct(t.contract - t.forecast, t.contract) + "%" : "", t.contract - t.forecast < 0],
      [tr("pnlCpi"), x.cpi != null && x.planCostDone ? x.cpi.toFixed(2) : "—", tr("pnlCpiHint"), x.cpi != null && x.cpi > 1.05]
    ];
    s.push({ html: '<div class="pnl-tiles">' + tiles.map(function (tl) {
      return '<div class="pnl-tile' + (tl[3] ? " bad" : "") + '"><small>' + pnlEsc(tl[0]) + "</small><b>" + pnlEsc(tl[1]) + "</b><span>" + pnlEsc(tl[2]) + "</span></div>";
    }).join("") + "</div>" });
    s.push({ title: tr("pnlWhatItSays"), html: '<ul class="pnl-insights">' + pnlInsights(x).map(function (i) {
      return '<li class="' + (i.good ? "good" : "bad") + '"><span>' + (i.good ? "✓" : "⚠") + "</span>" + pnlEsc(i.text) + "</li>";
    }).join("") + "</ul>" });
    if (x.timeline.length) {
      s.push({ title: tr("pnlChartTime"), chart: "time", html: pnlLegend([{ color: PNL_BLUE, label: tr("pnlIncomeApproved") }, { color: PNL_ORANGE, label: tr("pnlCostsCum") }]) +
        pnlLines(x.timeline, [{ key: "income", color: PNL_BLUE }, { key: "cost", color: PNL_ORANGE }]) + '<p class="pnl-readout"></p>' });
    }
    var cats = BUDGET_CATEGORIES.filter(function (c) { return x.cats[c].spent; }).sort(function (a, b) { return x.cats[b].spent - x.cats[a].spent; });
    if (cats.length) {
      s.push({ title: tr("pnlChartTypes"), html: pnlBars(cats.map(function (c) {
        return { label: budgetCategoryLabel(c), value: x.cats[c].spent, color: PNL_BLUE, text: pnlShort(x.cats[c].spent) + " · " + pnlPct(x.cats[c].spent, t.actual) + "%" };
      })) });
    }
    if (x.chapters.length) {
      s.push({ title: tr("pnlChartChapterProfit"), html: pnlLegend([{ color: PNL_BLUE, label: tr("pnlProfit") }, { color: PNL_ORANGE, label: tr("pnlLoss") }]) +
        pnlBars(x.chapters.map(function (c) {
          var v = c.earned - c.actual;
          return { label: c.name, value: v, color: v >= 0 ? PNL_BLUE : PNL_ORANGE };
        })) });
      var rows = [];
      x.chapters.forEach(function (c) {
        rows.push({ label: c.name, value: c.contract ? pnlPct(c.earned, c.contract) : 0, color: PNL_BLUE, text: (c.contract ? pnlPct(c.earned, c.contract) : 0) + "%" });
        rows.push({ label: "", value: c.cost ? pnlPct(c.actual, c.cost) : 0, color: PNL_ORANGE, text: (c.cost ? pnlPct(c.actual, c.cost) : 0) + "%" });
      });
      s.push({ title: tr("pnlChartDoneVsUsed"), html: pnlLegend([{ color: PNL_BLUE, label: tr("budgetDone") }, { color: PNL_ORANGE, label: tr("budgetUsed") }]) + pnlBars(rows) });
    }
    return s;
  }

  // ---- the screen ----------------------------------------------------------------
  function renderPnlAnalysis() {
    var back = subBack(tr("budgetTile"));
    back.addEventListener("click", function () { budget.analysis = false; renderBudget(); });
    budgetBody.appendChild(back);
    budgetBody.appendChild(bEl("h3", "pnl-title", tr("pnlTitle")));
    budgetBody.appendChild(bEl("p", "budget-note", tr("brToDate").replace("{date}", isoToDisplay(todayISO())) + " · " + tr("budgetBeforeVat")));
    var x = pnlData();
    pnlSections(x).forEach(function (sec) {
      var box = bEl("section", "pnl-section");
      if (sec.title) box.appendChild(bEl("h4", "", sec.title));
      var body = bEl("div", "");
      body.innerHTML = sec.html;
      box.appendChild(body);
      if (sec.chart === "time") pnlWireTime(box, x.timeline);
      budgetBody.appendChild(box);
    });
    budgetActions([["pnlPdf", function () { pnlPdf(x); }, "primary"]]);
  }
  // the time chart: a month tapped / hovered, its values read out
  function pnlWireTime(box, points) {
    var readout = box.querySelector(".pnl-readout");
    var show = function (i) {
      var p = points[i];
      readout.textContent = p.month.slice(5, 7) + "/" + p.month.slice(0, 4) + " · " + tr("pnlIncomeApproved") + " " + budgetMoney(p.income) +
        " · " + tr("pnlCostsCum") + " " + budgetMoney(p.cost);
    };
    Array.prototype.forEach.call(box.querySelectorAll(".pnl-hit"), function (r) {
      var i = +r.getAttribute("data-i");
      r.addEventListener("click", function () { show(i); });
      r.addEventListener("mouseenter", function () { show(i); });
    });
    show(points.length - 1);
  }

  // ---- as a PDF (each chart as a picture, so the PDF draws it as on screen) --------------
  function pnlPdf(x) {
    var doc = bEl("div", "pdf-doc pnl-pdf");
    doc.dir = RTL_LANGS[currentLang] ? "rtl" : "ltr";
    doc.appendChild(buildPdfDocTitleElement(budget.sheet, budget.sheet.name));
    doc.appendChild(bEl("div", "pdf-doc-info-title", tr("pnlTitle")));
    doc.appendChild(bEl("div", "pdf-doc-info-date", tr("brToDate").replace("{date}", isoToDisplay(todayISO())) + " · " + tr("budgetBeforeVat")));
    pnlSections(x).forEach(function (sec) {
      if (sec.title) doc.appendChild(bEl("div", "pdf-doc-section-heading", sec.title));
      var body = bEl("div", "");
      body.innerHTML = sec.html.replace(/<p class="pnl-readout"><\/p>/, "");
      Array.prototype.forEach.call(body.querySelectorAll("svg"), function (svg) {
        svg.setAttribute("xmlns", "http://www.w3.org/2000/svg");
        svg.setAttribute("width", "680");
        var vb = svg.getAttribute("viewBox").split(" ");
        svg.setAttribute("height", String(Math.round(680 * vb[3] / vb[2])));
        var img = document.createElement("img");
        img.src = "data:image/svg+xml;charset=utf-8," + encodeURIComponent(svg.outerHTML);
        img.style.width = "100%";
        svg.parentNode.replaceChild(img, svg);
      });
      doc.appendChild(body);
    });
    showToast(tr("workPlanPdfMsg"));
    buildPdfBlobFromElement(doc, tr("pnlTitle") + " " + budget.sheet.name + " " + isoToFileNameDate(todayISO()) + ".pdf").then(function (r) {
      attemptShare(r.blob, r.fileName, "application/pdf");
    }, function () { alert(tr("teamSaveError")); });
  }
