
  // ---------------------------------------------------------------------
  // The budget control's reports (11c-budget.js), as PDF or Excel (CSV):
  //   - רווח והפסד: the contract, the value of the work done, the costs
  //     (by type and by chapter), profit to date, and the forecast.
  //   - הוצאות לפי בחירה: the expenses of the chosen types (one or several),
  //     in a period, grouped by type / supplier / BOQ item / month.
  //   - קבלני משנה: each one's contract, approved, payable, retention and
  //     advance, with their approved bills in the period.
  //   - תזרים מזומנים: by month, what came in from the client against what
  //     was spent, and the running balance.
  // Each report is built once as { title, period, sections: [{ heading,
  // columns, rows, total }] } and then drawn into either. Amounts before VAT.
  // ---------------------------------------------------------------------
  var budgetReportOverlay = document.getElementById("budgetReportOverlay");
  var brPeriod = document.getElementById("brPeriod");

  function openBudgetReports() {
    var types = document.getElementById("brTypes");
    types.innerHTML = "";
    BUDGET_CATEGORIES.forEach(function (c) {
      var lab = bEl("label", "cal-form-check");
      var cb = bEl("input");
      cb.type = "checkbox";
      cb.value = c;
      cb.checked = true;
      lab.appendChild(cb);
      lab.appendChild(bEl("span", "", budgetCategoryLabel(c)));
      types.appendChild(lab);
    });
    brShowFields();
    budgetReportOverlay.hidden = false;
  }
  function brKind() {
    var on = budgetReportOverlay.querySelector("input[name=brKind]:checked");
    return on ? on.value : "pnl";
  }
  // P&L is to date; the others take a period, the expenses report types and grouping too
  function brShowFields() {
    var kind = brKind();
    document.getElementById("brTypesRow").hidden = kind !== "expenses";
    document.getElementById("brGroupRow").hidden = kind !== "expenses";
    brPeriod.parentNode.querySelector("[data-i18n=brPeriod]").hidden = kind === "pnl";
    brPeriod.hidden = kind === "pnl";
    document.getElementById("brDates").hidden = kind === "pnl" || brPeriod.value !== "custom";
  }
  Array.prototype.forEach.call(budgetReportOverlay.querySelectorAll("input[name=brKind]"), function (r) {
    r.addEventListener("change", brShowFields);
  });
  brPeriod.addEventListener("change", brShowFields);

  function brRange() {
    var today = todayISO(), p = brPeriod.value;
    if (p === "month") return { from: today.slice(0, 8) + "01", to: today };
    if (p === "lastMonth") {
      var d = new Date(today.slice(0, 7) + "-01T12:00:00");
      d.setDate(0);
      var end = d.getFullYear() + "-" + String(d.getMonth() + 1).padStart(2, "0") + "-" + String(d.getDate()).padStart(2, "0");
      return { from: end.slice(0, 8) + "01", to: end };
    }
    if (p === "custom") return { from: document.getElementById("brFrom").value || null, to: document.getElementById("brTo").value || null };
    return { from: null, to: null };
  }
  // a report's date, with its year: 31/10/2026
  function brDate(iso) {
    var p = String(iso || "").split("-");
    return p.length === 3 ? p[2] + "/" + p[1] + "/" + p[0] : "";
  }
  function brInRange(date, range) {
    return (!range.from || date >= range.from) && (!range.to || date <= range.to);
  }
  function brRangeLabel(range) {
    if (!range.from && !range.to) return tr("brAll");
    return (range.from ? brDate(range.from) : "…") + " – " + (range.to ? brDate(range.to) : "…");
  }
  function brPct(part, whole) {
    return whole ? Math.round(part * 1000 / whole) / 10 + "%" : "";
  }

  // ---- the reports, as data ------------------------------------------------------
  function brPnl() {
    var d = budget.data, t = budgetTotals(), cats = budgetByCategory();
    var profitNow = t.earned - t.actual;
    var sections = [{
      heading: tr("brSummary"), columns: ["", tr("brAmount")],
      rows: [
        [tr("budgetContract"), budgetMoney(t.contract)],
        [tr("budgetEarned"), budgetMoney(t.earned)],
        [tr("budgetActual"), budgetMoney(t.actual)],
        [tr("brProfitToDate"), budgetMoney(profitNow) + (t.earned ? " (" + brPct(profitNow, t.earned) + ")" : "")],
        [tr("budgetCostBudget"), budgetMoney(t.cost)],
        [tr("budgetForecastCost"), budgetMoney(t.forecast)],
        [tr("budgetPlannedProfit"), budgetMoney(t.contract - t.cost) + (t.contract ? " (" + brPct(t.contract - t.cost, t.contract) + ")" : "")],
        [tr("budgetForecastProfit"), budgetMoney(t.contract - t.forecast) + (t.contract ? " (" + brPct(t.contract - t.forecast, t.contract) + ")" : "")],
        [tr("clientApprovedSoFar"), budgetMoney(clientSummary(d).approved)],
        [tr("clientReceived"), budgetMoney(clientSummary(d).received)],
        [tr("clientOpen"), budgetMoney(clientSummary(d).open)]
      ]
    }, {
      heading: tr("budgetByType"), columns: [tr("budgetCategory"), tr("budgetActual"), tr("brShare")],
      rows: BUDGET_CATEGORIES.filter(function (c) { return cats[c].spent; }).map(function (c) {
        return [budgetCategoryLabel(c), budgetMoney(cats[c].spent), brPct(cats[c].spent, t.actual)];
      }),
      total: [tr("brTotal"), budgetMoney(t.actual), t.actual ? "100%" : ""]
    }];
    // by chapter: what it's worth, what's been done of it, what it cost
    var chapters = [];
    d.items.forEach(function (item) {
      var name = (item.chapter || "").trim() || tr("budgetNoChapter");
      var g = chapters.find(function (c) { return c.name === name; });
      if (!g) chapters.push(g = { name: name, contract: 0, earned: 0, cost: 0, actual: 0 });
      var contract = budgetItemContract(item);
      g.contract += contract;
      g.earned += contract * Math.min(100, budgetNum(item.progress)) / 100;
      g.cost += budgetNum(item.cost);
      g.actual += budgetItemActual(item);
    });
    if (chapters.length) {
      sections.push({
        heading: tr("brByChapter"),
        columns: [tr("budgetChapter"), tr("budgetContract"), tr("budgetEarned"), tr("budgetCostBudget"), tr("budgetActual"), tr("brProfitToDate")],
        rows: chapters.map(function (g) {
          return [g.name, budgetMoney(g.contract), budgetMoney(g.earned), budgetMoney(g.cost), budgetMoney(g.actual), budgetMoney(g.earned - g.actual)];
        })
      });
    }
    var general = BUDGET_CATEGORIES.filter(function (c) { return cats[c].budget || cats[c].general; });
    if (general.length) {
      sections.push({
        heading: tr("brGeneralCosts"), columns: [tr("budgetCategory"), tr("brBudget"), tr("budgetActual"), tr("brLeft")],
        rows: general.map(function (c) {
          return [budgetCategoryLabel(c), budgetMoney(cats[c].budget), budgetMoney(cats[c].general), budgetMoney(cats[c].budget - cats[c].general)];
        })
      });
    }
    return { title: tr("brPnl"), period: tr("brToDate").replace("{date}", brDate(todayISO())), sections: sections };
  }

  function brExpenses(types, range, groupBy) {
    var d = budget.data;
    var list = d.expenses.filter(function (e) {
      return types.indexOf(BUDGET_CATEGORIES.indexOf(e.category) !== -1 ? e.category : "other") !== -1 && brInRange(e.date || "", range);
    }).sort(function (a, b) { return String(a.date).localeCompare(String(b.date)); });
    var itemOf = function (e) { return d.items.find(function (i) { return i.id === e.itemId; }); };
    var keyOf = {
      category: function (e) { return budgetCategoryLabel(e.category); },
      supplier: function (e) { return e.supplier || "—"; },
      item: function (e) { var i = itemOf(e); return i ? budgetItemLabel(i) : tr("budgetUnassigned"); },
      month: function (e) { return String(e.date || "").slice(5, 7) + "/" + String(e.date || "").slice(0, 4); }
    }[groupBy];
    var groups = [];
    list.forEach(function (e) {
      var k = keyOf(e);
      var g = groups.find(function (x) { return x.key === k; });
      if (!g) groups.push(g = { key: k, list: [], sum: 0 });
      g.list.push(e);
      g.sum += budgetNum(e.amount);
    });
    var total = list.reduce(function (s, e) { return s + budgetNum(e.amount); }, 0);
    var sections = [{
      heading: tr("brSummary"), columns: [tr({ category: "budgetCategory", supplier: "budgetSupplier", item: "budgetItemField", month: "brMonth" }[groupBy]), tr("brAmount"), tr("brShare")],
      rows: groups.map(function (g) { return [g.key, budgetMoney(g.sum), brPct(g.sum, total)]; }),
      total: [tr("brTotal"), budgetMoney(total), total ? "100%" : ""]
    }];
    groups.forEach(function (g) {
      sections.push({
        heading: g.key,
        columns: [tr("shareTaskDate"), tr("budgetCategory"), tr("budgetSupplier"), tr("budgetInvoice"), tr("budgetItemField"), tr("brAmount")],
        rows: g.list.map(function (e) {
          var i = itemOf(e);
          return [brDate(e.date), budgetCategoryLabel(e.category), e.supplier || "", e.invoice || "", i ? budgetItemLabel(i) : "", budgetMoney(budgetNum(e.amount))];
        }),
        total: [tr("brTotal"), "", "", "", "", budgetMoney(g.sum)]
      });
    });
    var title = types.length === BUDGET_CATEGORIES.length ? tr("brAllExpenses")
      : tr("brExpensesOf").replace("{types}", types.map(budgetCategoryLabel).join(", "));
    return { title: title, period: brRangeLabel(range), sections: sections, empty: !list.length };
  }

  function brSubs(range) {
    var d = budget.data;
    var rows = d.subcontracts.map(function (sub) {
      var s = subSummary(d, sub);
      return [sub.name, budgetMoney(s.contract), budgetMoney(s.approved), budgetMoney(s.contract - s.approved),
        budgetMoney(s.paid), budgetMoney(s.retention), budgetMoney(s.advanceLeft)];
    });
    var sections = [{
      heading: tr("brSummary"),
      columns: [tr("subName"), tr("subContract"), tr("subApprovedSoFar"), tr("brContractLeft"), tr("subPaid"), tr("subRetentionHeld"), tr("subAdvanceLeft")],
      rows: rows
    }];
    d.subcontracts.forEach(function (sub) {
      var bills = subBills(d, sub).filter(function (b) { return b.status === "approved" && brInRange(b.date || "", range); });
      if (!bills.length) return;
      sections.push({
        heading: sub.name,
        columns: [tr("brBillNo"), tr("shareTaskDate"), tr("subCumulative"), tr("subThisBill"), tr("subRetention"), tr("subAdvanceRecovery"), tr("subToPay")],
        rows: bills.map(function (b) {
          var t = b.totals || {};
          return [b.no, brDate(b.date), budgetMoney(budgetNum(t.cumulative)), budgetMoney(budgetNum(t.gross)),
            budgetMoney(budgetNum(t.retention)), budgetMoney(budgetNum(t.advance)), budgetMoney(budgetNum(t.toPay))];
        }),
        total: [tr("brTotal"), "", "", budgetMoney(bills.reduce(function (s, b) { return s + budgetNum(b.totals && b.totals.gross); }, 0)),
          budgetMoney(bills.reduce(function (s, b) { return s + budgetNum(b.totals && b.totals.retention); }, 0)),
          budgetMoney(bills.reduce(function (s, b) { return s + budgetNum(b.totals && b.totals.advance); }, 0)),
          budgetMoney(bills.reduce(function (s, b) { return s + budgetNum(b.totals && b.totals.toPay); }, 0))]
      });
    });
    return { title: tr("brSubs"), period: brRangeLabel(range), sections: sections, empty: !d.subcontracts.length };
  }

  function brCash(range) {
    var d = budget.data, months = {};
    var add = function (date, k, v) {
      if (!date || !brInRange(date, range)) return;
      var m = date.slice(0, 7);
      months[m] = months[m] || { in: 0, out: 0 };
      months[m][k] += v;
    };
    d.receipts.forEach(function (r) { add(r.date, "in", budgetNum(r.amount)); });
    d.expenses.forEach(function (e) { add(e.date, "out", budgetNum(e.amount)); });
    var keys = Object.keys(months).sort(), run = 0, tin = 0, tout = 0;
    var rows = keys.map(function (m) {
      var x = months[m];
      run += x.in - x.out;
      tin += x.in;
      tout += x.out;
      return [m.slice(5, 7) + "/" + m.slice(0, 4), budgetMoney(x.in), budgetMoney(x.out), budgetMoney(x.in - x.out), budgetMoney(run)];
    });
    return {
      title: tr("brCash"), period: brRangeLabel(range), empty: !keys.length,
      sections: [{ heading: tr("brByMonth"), columns: [tr("brMonth"), tr("clientReceived"), tr("budgetActual"), tr("brNet"), tr("brRunning")],
        rows: rows, total: [tr("brTotal"), budgetMoney(tin), budgetMoney(tout), budgetMoney(tin - tout), ""] }]
    };
  }

  function brBuild() {
    var kind = brKind(), range = brRange();
    if (kind === "pnl") return brPnl();
    if (kind === "cash") return brCash(range);
    if (kind === "subs") return brSubs(range);
    var types = Array.prototype.filter.call(document.querySelectorAll("#brTypes input"), function (c) { return c.checked; })
      .map(function (c) { return c.value; });
    if (!types.length) { alert(tr("brPickTypes")); return null; }
    return brExpenses(types, range, document.getElementById("brGroupBy").value);
  }
  function brFileName(report, ext) {
    return report.title + " " + budget.sheet.name + " " + isoToFileNameDate(todayISO()) + "." + ext;
  }

  // ---- drawn: PDF / Excel ------------------------------------------------------------
  function brPdf(report) {
    var doc = bEl("div", "pdf-doc");
    doc.dir = RTL_LANGS[currentLang] ? "rtl" : "ltr";
    doc.appendChild(buildPdfDocTitleElement(budget.sheet, budget.sheet.name));
    doc.appendChild(bEl("div", "pdf-doc-info-title", report.title));
    doc.appendChild(bEl("div", "pdf-doc-info-date", report.period + " · " + tr("budgetBeforeVat")));
    report.sections.forEach(function (sec) {
      doc.appendChild(bEl("div", "pdf-doc-section-heading", sec.heading));
      var table = bEl("table", "pdf-doc-table");
      var thead = bEl("thead"), hr = bEl("tr");
      sec.columns.forEach(function (c) { hr.appendChild(bEl("th", "", c)); });
      thead.appendChild(hr);
      table.appendChild(thead);
      var tbody = bEl("tbody");
      sec.rows.concat(sec.total ? [sec.total] : []).forEach(function (r, k, all) {
        var row = bEl("tr", sec.total && k === all.length - 1 ? "br-total" : "");
        r.forEach(function (v) { row.appendChild(bEl("td", "", String(v))); });
        tbody.appendChild(row);
      });
      table.appendChild(tbody);
      doc.appendChild(table);
    });
    showToast(tr("workPlanPdfMsg"));
    buildPdfBlobFromElement(doc, brFileName(report, "pdf")).then(function (r) {
      attemptShare(r.blob, r.fileName, "application/pdf");
    }, function () { alert(tr("teamSaveError")); });
  }
  function brCsv(report) {
    var rows = [[report.title + " – " + budget.sheet.name], [report.period + " · " + tr("budgetBeforeVat")], []];
    report.sections.forEach(function (sec) {
      rows.push([sec.heading]);
      rows.push(sec.columns);
      sec.rows.forEach(function (r) { rows.push(r); });
      if (sec.total) rows.push(sec.total);
      rows.push([]);
    });
    var csv = "﻿" + rows.map(function (r) { return r.map(wpCsvCell).join(","); }).join("\r\n");
    attemptShare(new Blob([csv], { type: "text/csv;charset=utf-8" }), brFileName(report, "csv"), "text/csv");
  }
  function brMake(draw) {
    var report = brBuild();
    if (!report) return;
    if (report.empty) { alert(tr("brNothing")); return; }
    budgetReportOverlay.hidden = true;
    draw(report);
  }
  document.getElementById("budgetReportForm").addEventListener("submit", function (e) {
    e.preventDefault();
    brMake(brPdf);
  });
  document.getElementById("brExcelBtn").addEventListener("click", function () { brMake(brCsv); });
  document.getElementById("brCancelBtn").addEventListener("click", function () { budgetReportOverlay.hidden = true; });
