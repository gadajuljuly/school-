
  // ---------------------------------------------------------------------
  // בקרה תקציבית: a project's money by its bill of quantities (כתב כמויות),
  // from its tile in the diary. Kept in project_finance (see
  // supabase/sql/team_and_finance.sql) as data: {
  //   items:    [{ id, code, chapter, name, unit, qty, price, cost, progress, doneQty, actualPrice }]
  //             - a BOQ item: quantity x unit price is its contract value;
  //               cost is its cost budget; progress its % done; the quantity
  //               done x actualPrice (what a unit costs me) its actual total
  //   expenses: [{ id, date, supplier, supplierCode, invoice, itemId, amount, note, by, at, billId }]
  //   discounts: [{ id, description, kind: "pct" | "amount", value, chapters }] -
  //             on the whole BOQ (chapters null - every chapter, new ones
  //             too) or the chapters named (chapter: one, before), one after the
  //             other (a % off what's left); they go into the unit prices
  //             (budgetItemPrice), the item's own price stays as typed
  //   generalBudget: { category: amount } - the project's own costs (overheads,
  //             insurance...) that sit on no BOQ item
  //   imports:  [{ id, name, at, count }] - each BOQ file uploaded; its items
  //             carry its importId, so the upload can be deleted as one
  //   client, receipts: the client's bill terms and the money that came in
  //             (11f-client-bills.js; the client's bills are among `bills`)
  //   subcontracts, bills: the subcontractors' contracts and partial bills
  //             (11d-subcontract-bills.js); an approved bill's expenses carry its billId
  // } - every amount before VAT; supplier code and invoice number are there
  // for Priority later. The tile shows only to whoever may see that money:
  // the project's owner (the user, for a private project; its creator, for
  // a shared one) and the engineers on the owner's team (financeOwnerPhones,
  // 10b-team.js) - and the server holds to the same (RLS).
  // ---------------------------------------------------------------------
  var budgetView = document.getElementById("budgetView");
  var budgetBody = document.getElementById("budgetBody");
  var siteLogBudgetBtn = document.getElementById("siteLogBudgetBtn");
  var budgetFormOverlay = document.getElementById("budgetFormOverlay");
  var budgetFormFields = document.getElementById("budgetFormFields");
  var FINANCE_TABLE = "project_finance";
  var BUDGET_OVER_MARGIN = 10; // cost used may run this many points ahead of the work done
  // an expense's type (subcontractors': from their approved bills, 11d)
  var BUDGET_CATEGORIES = ["subcontractors", "materials", "labor", "equipment", "overhead", "insurance", "other"];
  function budgetCategoryLabel(cat) {
    return tr("budgetCat_" + (BUDGET_CATEGORIES.indexOf(cat) !== -1 ? cat : "other"));
  }
  // tab: items | client | subs | expenses; subId / billId: a subcontractor / bill open
  // there; analysis: the P&L analysis shown instead (11g-pnl-analysis.js)
  var budget = { sheet: null, owner: null, data: null, version: 0, tab: "items", error: false, subId: null, billId: null, billDraft: null };

  // whose money a project's is, when this phone may see it (else null)
  function budgetOwnerFor(sheet) {
    if (!sheet || !myPhoneNumber) return null;
    var owner = sheet.shared ? sheet.createdBy : myPhoneNumber;
    return owner && financeOwnerPhones().indexOf(owner) !== -1 ? owner : null;
  }
  function updateBudgetTile() {
    siteLogBudgetBtn.hidden = !budgetOwnerFor(activeSheet());
  }

  // ---- numbers -----------------------------------------------------------
  function budgetNum(v) {
    var n = parseFloat(String(v == null ? "" : v).replace(/[,₪\s]/g, ""));
    return isFinite(n) ? n : 0;
  }
  function budgetMoney(n) {
    return Math.round(n || 0).toLocaleString("he-IL") + " ₪";
  }
  // the chapters a discount is on, or null: all of them
  function budgetDiscountChapters(d) {
    if (Array.isArray(d.chapters) && d.chapters.length) return d.chapters;
    return d.chapter ? [d.chapter] : null;
  }
  function budgetDiscountScopeText(d) {
    var on = budgetDiscountChapters(d);
    if (!on) return tr("boqDiscountGeneralShort");
    return on.length === 1 ? tr("boqDiscountOnChapter").replace("{name}", on[0]) : tr("boqDiscountOnChapters").replace("{names}", on.join(", "));
  }
  function budgetChapterOf(item) { return (item.chapter || "").trim() || tr("budgetNoChapter"); }
  // the BOQ's discounts: each one's part of what was left of its chapters
  // (all of them, for a general one) - a factor per chapter that the unit
  // prices are multiplied by - and each one's amount off the contract and
  // off the work done. Worked out once per screen drawing.
  var budgetDiscCache = null;
  function budgetDiscountCalc() {
    if (budgetDiscCache && budgetDiscCache.data === budget.data) return budgetDiscCache.calc;
    var base = {}, doneBase = {}, factor = {}, steps = {};
    budget.data.items.forEach(function (i) {
      var c = budgetChapterOf(i);
      base[c] = (base[c] || 0) + budgetNum(i.qty) * budgetNum(i.price);
      doneBase[c] = (doneBase[c] || 0) + budgetItemDoneQty(i) * budgetNum(i.price);
      factor[c] = 1;
      steps[c] = [];
    });
    var chapters = Object.keys(base);
    var lines = (budget.data.discounts || []).map(function (d) {
      var on = budgetDiscountChapters(d);
      var scope = on ? chapters.filter(function (c) { return on.indexOf(c) !== -1; }) : chapters;
      var left = 0, doneLeft = 0;
      scope.forEach(function (c) { left += base[c] * factor[c]; doneLeft += doneBase[c] * factor[c]; });
      var v = budgetNum(d.value);
      var f = d.kind === "amount" ? (left > 0 ? Math.max(0, 1 - v / left) : 1) : Math.max(0, 1 - v / 100);
      scope.forEach(function (c) {
        if (f !== 1) steps[c].push(factor[c]); // the factor before this discount
        factor[c] *= f;
      });
      return { d: d, amount: left * (1 - f), done: doneLeft * (1 - f) };
    });
    // steps: per chapter, the factor before each discount that touched it
    var calc = { factor: factor, lines: lines, steps: steps };
    budgetDiscCache = { data: budget.data, calc: calc };
    Promise.resolve().then(function () { budgetDiscCache = null; });
    return calc;
  }
  // a unit's contract price, its chapter's / the BOQ's discounts taken off
  function budgetItemPrice(item) {
    var f = budgetDiscountCalc().factor[budgetChapterOf(item)];
    return budgetNum(item.price) * (f == null ? 1 : f);
  }
  function budgetItemContract(item) { return budgetNum(item.qty) * budgetItemPrice(item); }
  // the quantity done at what a unit actually costs
  function budgetItemActualTotal(item) { return budgetItemDoneQty(item) * budgetNum(item.actualPrice); }
  // the quantity done at the contract's unit price (what it earns)
  function budgetItemDoneAtContract(item) { return budgetItemDoneQty(item) * budgetItemPrice(item); }
  // the quantity done: typed in, or (an item from before that) its % of the quantity
  function budgetItemDoneQty(item) {
    if (item.doneQty != null && item.doneQty !== "") return budgetNum(item.doneQty);
    return Math.round(budgetNum(item.qty) * budgetNum(item.progress) / 100 * 1000) / 1000;
  }
  function budgetItemActual(item) {
    return budget.data.expenses.reduce(function (s, e) { return e.itemId === item.id ? s + budgetNum(e.amount) : s; }, 0);
  }
  // at its pace so far: what the item will have cost when done
  function budgetItemForecast(item, actual) {
    var p = budgetNum(item.progress), cost = budgetNum(item.cost);
    if (p >= 100) return actual;
    if (p > 0) return Math.max(actual, actual * 100 / p);
    return Math.max(actual, cost);
  }
  // more of its budget used than of the work done (or past the budget)
  function budgetItemOver(item, actual) {
    var cost = budgetNum(item.cost);
    if (!cost) return false;
    return actual > cost || actual * 100 / cost > budgetNum(item.progress) + BUDGET_OVER_MARGIN;
  }
  // by type: all that was spent, and the general (no BOQ item) part against its budget
  function budgetByCategory() {
    var out = {};
    BUDGET_CATEGORIES.forEach(function (c) {
      out[c] = { spent: 0, general: 0, budget: budgetNum(budget.data.generalBudget[c]) };
    });
    budget.data.expenses.forEach(function (e) {
      var c = out[e.category] ? e.category : "other";
      out[c].spent += budgetNum(e.amount);
      if (!budget.data.items.some(function (i) { return i.id === e.itemId; })) out[c].general += budgetNum(e.amount);
    });
    return out;
  }
  function budgetTotals() {
    var t = { contract: 0, cost: 0, actual: 0, earned: 0, forecast: 0 };
    budget.data.items.forEach(function (item) {
      var actual = budgetItemActual(item), contract = budgetItemContract(item);
      t.contract += contract;
      t.cost += budgetNum(item.cost);
      t.earned += contract * Math.min(100, budgetNum(item.progress)) / 100;
      t.forecast += budgetItemForecast(item, actual);
    });
    budget.data.expenses.forEach(function (e) { t.actual += budgetNum(e.amount); });
    // the project's own costs: their budget, or what's been spent if more
    var cats = budgetByCategory();
    BUDGET_CATEGORIES.forEach(function (c) {
      t.cost += cats[c].budget;
      t.forecast += Math.max(cats[c].budget, cats[c].general);
    });
    return t;
  }

  // ---- the server ------------------------------------------------------------
  function budgetEmpty() { return { items: [], discounts: [], expenses: [], subcontracts: [], bills: [], generalBudget: {}, client: {}, receipts: [], imports: [] }; }
  function budgetNormalize(d) {
    d = d || {};
    var list = function (k) { return Array.isArray(d[k]) ? d[k] : []; };
    return { items: list("items"), discounts: list("discounts"), expenses: list("expenses"), subcontracts: list("subcontracts"), bills: list("bills"),
      generalBudget: d.generalBudget && typeof d.generalBudget === "object" ? d.generalBudget : {},
      client: d.client && typeof d.client === "object" ? d.client : {}, receipts: list("receipts"), imports: list("imports") };
  }
  function budgetRow() {
    return supabaseClient.from(FINANCE_TABLE).select("data, data_version")
      .eq("owner_phone", budget.owner).eq("project_id", budget.sheet.id).maybeSingle();
  }
  function budgetLoad() {
    budget.error = false;
    if (!supabaseClient) { budget.data = budgetEmpty(); renderBudget(); return Promise.resolve(); }
    return budgetRow().then(function (r) {
      if (r && r.error) throw r.error;
      budget.data = budgetNormalize(r && r.data && r.data.data);
      budget.version = (r && r.data && r.data.data_version) || 0;
      renderBudget();
    }).catch(function () {
      budget.error = true;
      budget.data = budget.data || budgetEmpty();
      renderBudget();
    });
  }
  // a change: shown at once, then written onto the server's latest copy
  // (read, change, write only if no one wrote in between - else again)
  function budgetChange(mutate) {
    mutate(budget.data);
    renderBudget();
    if (!supabaseClient) return;
    var owner = budget.owner, projectId = budget.sheet.id;
    var attempt = function (tries) {
      return budgetRow().then(function (r) {
        if (r && r.error) throw r.error;
        var row = r && r.data;
        var next = budgetNormalize(row && JSON.parse(JSON.stringify(row.data)));
        mutate(next);
        var write = row
          ? supabaseClient.from(FINANCE_TABLE).update({ data: next, data_version: row.data_version + 1, updated_at: new Date().toISOString() })
            .eq("owner_phone", owner).eq("project_id", projectId).eq("data_version", row.data_version).select("data_version")
          : supabaseClient.from(FINANCE_TABLE).insert({ owner_phone: owner, project_id: projectId, data: next, data_version: 1 }).select("data_version");
        return write.then(function (w) {
          var done = w && !w.error && (w.data || []).length;
          if (!done) {
            if (tries < 3) return attempt(tries + 1);
            throw (w && w.error) || new Error("conflict");
          }
          if (budget.sheet && budget.sheet.id === projectId) {
            budget.data = next;
            budget.version = row ? row.data_version + 1 : 1;
            renderBudget();
          }
        });
      });
    };
    attempt(0).catch(function () {
      alert(tr("teamSaveError"));
      budgetLoad();
    });
  }
  function budgetUpsert(listName, rec) {
    return function (d) {
      var list = d[listName];
      var i = list.findIndex(function (x) { return x.id === rec.id; });
      if (i >= 0) list[i] = rec; else list.push(rec);
    };
  }
  function budgetRemove(listName, id) {
    return function (d) { d[listName] = d[listName].filter(function (x) { return x.id !== id; }); };
  }

  // ---- the screen ----------------------------------------------------------
  function bEl(tag, cls, text) {
    var el = document.createElement(tag);
    if (cls) el.className = cls;
    if (text != null) el.textContent = text;
    return el;
  }
  function budgetBar(pct, cls) {
    var bar = bEl("div", "budget-bar " + (cls || ""));
    var fill = bEl("div", "budget-bar-fill");
    fill.style.width = Math.max(0, Math.min(100, pct)) + "%";
    bar.appendChild(fill);
    return bar;
  }
  function renderBudget() {
    if (budgetView.hidden || !budget.data) return;
    budgetBody.innerHTML = "";
    if (budget.analysis) { renderPnlAnalysis(); return; }
    if (budget.error) budgetBody.appendChild(bEl("p", "team-error", tr("budgetLoadError")));
    var t = budgetTotals();
    // the summary
    var sum = bEl("div", "budget-summary");
    var card = function (label, value, cls) {
      var c = bEl("div", "budget-card " + (cls || ""));
      c.appendChild(bEl("small", "", label));
      c.appendChild(bEl("b", "", value));
      sum.appendChild(c);
    };
    card(tr("budgetContract"), budgetMoney(t.contract));
    card(tr("budgetCostBudget"), budgetMoney(t.cost));
    card(tr("budgetActual"), budgetMoney(t.actual), t.cost && t.actual > t.cost ? "over" : "");
    card(tr("budgetEarned"), budgetMoney(t.earned));
    card(tr("budgetPlannedProfit"), budgetMoney(t.contract - t.cost), t.contract - t.cost < 0 ? "over" : "");
    card(tr("budgetForecastProfit"), budgetMoney(t.contract - t.forecast), t.contract - t.forecast < t.contract - t.cost ? "over" : "good");
    var cs = clientSummary(budget.data);
    card(tr("clientApprovedSoFar"), budgetMoney(cs.approved));
    card(tr("clientReceived"), budgetMoney(cs.received), cs.open > 0 ? "" : "good");
    budgetBody.appendChild(sum);
    budgetBody.appendChild(bEl("p", "budget-note", tr("budgetBeforeVat")));
    var reports = bEl("button", "budget-reports-btn", tr("brTitleBtn"));
    reports.type = "button";
    reports.addEventListener("click", openBudgetReports);
    var analysis = bEl("button", "budget-reports-btn", tr("pnlTitleBtn"));
    analysis.type = "button";
    analysis.addEventListener("click", function () { budget.analysis = true; renderBudget(); budgetBody.scrollTop = 0; });
    var row = bEl("div", "budget-reports-row");
    row.appendChild(analysis);
    row.appendChild(reports);
    budgetBody.appendChild(row);
    // the tabs
    var tabs = bEl("div", "budget-tabs");
    [["items", "budgetTabItems"], ["client", "budgetTabClient"], ["subs", "budgetTabSubs"], ["expenses", "budgetTabExpenses"]].forEach(function (x) {
      var b = bEl("button", budget.tab === x[0] ? "on" : "", tr(x[1]));
      b.type = "button";
      b.addEventListener("click", function () {
        budget.tab = x[0];
        budget.subId = budget.billId = budget.billDraft = null;
        renderBudget();
      });
      tabs.appendChild(b);
    });
    budgetBody.appendChild(tabs);
    if (budget.tab === "items") renderBudgetItems();
    else if (budget.tab === "subs") renderBudgetSubs();
    else if (budget.tab === "client") renderBudgetClient();
    else renderBudgetExpenses();
  }
  function budgetActions(buttons) {
    var row = bEl("div", "budget-actions");
    buttons.forEach(function (x) {
      var b = bEl("button", x[2] || "", tr(x[0]));
      b.type = "button";
      b.addEventListener("click", x[1]);
      row.appendChild(b);
    });
    budgetBody.appendChild(row);
  }
  function renderBudgetItems() {
    budgetActions([["budgetAddItem", function () { budgetItemForm(null); }, "primary"],
      ["budgetImportCsv", function () { document.getElementById("budgetCsvInput").click(); }],
      ["budgetExportCsv", budgetExport]].concat(budget.data.items.length ? [[budget.data.discounts.length ? "boqDiscountsBtnN" : "boqDiscountsBtn", openBoqDiscounts]] : [], budget.data.items.length ? [["budgetDeleteBoq", budgetDeleteBoqForm]] : []));
    // in the order of the BOQ itself (as uploaded), not re-sorted by number; the
    // chapters in the order they come, and an item added by hand at its chapter's end
    var items = budget.data.items.slice();
    if (!items.length) { budgetBody.appendChild(bEl("p", "team-empty", tr("budgetNoItems"))); return; }
    var chapters = [];
    items.forEach(function (item) {
      var ch = (item.chapter || "").trim() || tr("budgetNoChapter");
      var g = chapters.find(function (c) { return c.name === ch; });
      if (!g) chapters.push(g = { name: ch, items: [] });
      g.items.push(item);
    });
    // a table: the item number and description stay put at the right while
    // the rest scrolls sideways; a section per chapter - its title row, its
    // items, its subtotal - and the BOQ's total at the bottom
    var wrap = bEl("div", "boq-wrap");
    var table = bEl("table", "boq-table");
    var head = bEl("tr");
    // contract / actual side by side - the actual ones in red
    [["budgetCode", "boq-code"], ["budgetName", "boq-desc"], ["budgetUnit"], ["boqContractQty"], ["boqActualQty", "boq-actual"],
      ["boqContractPrice"], ["boqActualPrice", "boq-actual"], ["boqDoneAtContract"], ["boqActualTotal", "boq-actual"], ["boqContractTotal"],
      ["budgetCostBudget"], ["budgetActual", "boq-actual"], ["budgetUsed"]].forEach(function (c) {
      head.appendChild(bEl("th", c[1] || "", tr(c[0])));
    });
    var thead = bEl("thead");
    thead.appendChild(head);
    table.appendChild(thead);
    var num = function (n) { return Math.round(n || 0).toLocaleString("he-IL"); };
    var qtyText = function (n) { return (Math.round(budgetNum(n) * 1000) / 1000).toLocaleString("he-IL"); };
    var pctCell = function (pct, cls) {
      var td = bEl("td", "boq-pct");
      td.appendChild(bEl("span", "", Math.round(pct) + "%" + (cls === "over" ? " ⚠" : "")));
      var bar = bEl("span", "boq-bar " + cls);
      var fill = bEl("i");
      fill.style.width = Math.max(0, Math.min(100, pct)) + "%";
      bar.appendChild(fill);
      td.appendChild(bar);
      return td;
    };
    var sumRow = function (cls, label, contract, cost, actual, actualTotal, doneAtContract) {
      var tr_ = bEl("tr", cls);
      tr_.appendChild(bEl("td", "boq-code"));
      tr_.appendChild(bEl("td", "boq-desc", label));
      [0, 1, 2, 3, 4].forEach(function () { tr_.appendChild(bEl("td")); });
      tr_.appendChild(bEl("td", "", num(doneAtContract)));
      tr_.appendChild(bEl("td", "boq-actual", num(actualTotal)));
      tr_.appendChild(bEl("td", "", num(contract)));
      tr_.appendChild(bEl("td", "", num(cost)));
      tr_.appendChild(bEl("td", "boq-actual", num(actual)));
      tr_.appendChild(bEl("td", "", cost ? Math.round(actual * 100 / cost) + "%" : ""));
      return tr_;
    };
    var all = { contract: 0, cost: 0, actual: 0, actualTotal: 0, doneAtContract: 0 };
    chapters.forEach(function (g) {
      var body = bEl("tbody", "budget-chapter");
      body.dataset.search = boqSearchText(g.name);
      // the chapter's title row: its number (if it starts with one) and name
      var m = /^(\d+(?:[.\-]\d+)*)\s+(.+)$/.exec(g.name);
      var ch = bEl("tr", "boq-ch");
      ch.appendChild(bEl("td", "boq-code", m ? m[1] : ""));
      ch.appendChild(bEl("td", "boq-desc", m ? m[2] : g.name));
      var rest = bEl("td");
      rest.colSpan = 11;
      ch.appendChild(rest);
      body.appendChild(ch);
      var sum = { contract: 0, cost: 0, actual: 0, actualTotal: 0, doneAtContract: 0 };
      g.items.forEach(function (item) {
        var actual = budgetItemActual(item), cost = budgetNum(item.cost), over = budgetItemOver(item, actual);
        var contract = budgetItemContract(item), actualTotal = budgetItemActualTotal(item), doneAtContract = budgetItemDoneAtContract(item);
        sum.contract += contract;
        sum.doneAtContract += doneAtContract;
        sum.actualTotal += actualTotal;
        sum.cost += cost;
        sum.actual += actual;
        var row = bEl("tr", "budget-item" + (over ? " over" : ""));
        row.appendChild(bEl("td", "boq-code", item.code || ""));
        var desc = bEl("td", "boq-desc");
        desc.appendChild(bEl("span", "", item.name || ""));
        if (over) {
          desc.appendChild(bEl("small", "budget-warn", tr("budgetOverWarn")
            .replace("{forecast}", budgetMoney(budgetItemForecast(item, actual)))
            .replace("{diff}", budgetMoney(budgetItemForecast(item, actual) - cost))));
        }
        row.appendChild(desc);
        row.appendChild(bEl("td", "", item.unit || ""));
        row.appendChild(bEl("td", "", qtyText(item.qty)));
        // done: the quantity, its bar showing how much of all of it
        var doneCell = pctCell(budgetNum(item.progress), "done");
        doneCell.classList.add("boq-actual");
        doneCell.firstChild.textContent = qtyText(budgetItemDoneQty(item));
        doneCell.title = Math.round(budgetNum(item.progress)) + "%";
        row.appendChild(doneCell);
        // the contract price with the discounts in it; under it, struck through,
        // the price before each discount - the latest first, the original last
        var priceCell = bEl("td", "", num(budgetItemPrice(item)));
        if (Math.abs(budgetItemPrice(item) - budgetNum(item.price)) > 0.005) {
          var p2 = function (n) { return (Math.round(n * 100) / 100).toLocaleString("he-IL"); };
          priceCell.textContent = p2(budgetItemPrice(item));
          var steps = budgetDiscountCalc().steps[budgetChapterOf(item)] || [];
          steps.slice().reverse().forEach(function (f) {
            priceCell.appendChild(bEl("small", "boq-before-discount", p2(budgetNum(item.price) * f)));
          });
        }
        row.appendChild(priceCell);
        row.appendChild(bEl("td", "boq-actual", budgetNum(item.actualPrice) ? num(budgetNum(item.actualPrice)) : ""));
        row.appendChild(bEl("td", "boq-strong", num(doneAtContract)));
        row.appendChild(bEl("td", "boq-strong boq-actual", num(actualTotal)));
        row.appendChild(bEl("td", "boq-strong boq-contract-total", num(contract)));
        row.appendChild(bEl("td", "", num(cost)));
        row.appendChild(bEl("td", "boq-actual", num(actual)));
        row.appendChild(pctCell(cost ? actual * 100 / cost : 0, over ? "over" : "used"));
        row.addEventListener("click", function () { budgetItemForm(item); });
        row.dataset.search = boqSearchText([item.code, item.name, item.unit].join(" "));
        body.appendChild(row);
      });
      body.appendChild(sumRow("boq-sub", tr("boqChapterTotal").replace("{name}", m ? m[1] : g.name), sum.contract, sum.cost, sum.actual, sum.actualTotal, sum.doneAtContract));
      all.contract += sum.contract;
      all.cost += sum.cost;
      all.actual += sum.actual;
      all.actualTotal += sum.actualTotal;
      all.doneAtContract += sum.doneAtContract;
      table.appendChild(body);
    });
    var foot = bEl("tbody");
    // with discounts: the totals before them, each discount (tap to change
    // it), then the BOQ's total - already after them, as its prices are
    var disc = budgetDiscountCalc();
    if (disc.lines.length) {
      var discRow = function (cls, label, done, contract, onClick) {
        var r = bEl("tr", cls);
        r.appendChild(bEl("td", "boq-code"));
        r.appendChild(bEl("td", "boq-desc", label));
        for (var k = 0; k < 5; k++) r.appendChild(bEl("td"));
        r.appendChild(bEl("td", "", num(done)));
        r.appendChild(bEl("td"));
        r.appendChild(bEl("td", "", num(contract)));
        for (var k2 = 0; k2 < 3; k2++) r.appendChild(bEl("td"));
        if (onClick) r.addEventListener("click", onClick);
        return r;
      };
      var offAll = 0, offDone = 0;
      disc.lines.forEach(function (l) { offAll += l.amount; offDone += l.done; });
      foot.appendChild(discRow("boq-sub boq-before-discounts", tr("boqBeforeDiscounts"), all.doneAtContract + offDone, all.contract + offAll));
      disc.lines.forEach(function (l) {
        foot.appendChild(discRow("boq-discount", "✏️ " + budgetDiscountLabel(l.d), -l.done, -l.amount, function () { budgetDiscountForm(l.d); }));
      });
    }
    foot.appendChild(sumRow("boq-total", tr(disc.lines.length ? "boqAfterDiscounts" : "boqTotal"), all.contract, all.cost, all.actual, all.actualTotal, all.doneAtContract));
    table.appendChild(foot);
    wrap.appendChild(table);
    // search: by item number, description or chapter - the rows that match
    // stay (a chapter that matches: all of it), the totals step aside
    var search = bEl("div", "boq-search");
    var input = bEl("input");
    input.type = "search";
    input.id = "boqSearchInput";
    input.placeholder = tr("boqSearchPlaceholder");
    input.value = budget.search || "";
    var found = bEl("span", "boq-search-count");
    search.appendChild(input);
    search.appendChild(found);
    var applySearch = function () {
      budget.search = input.value;
      var words = boqSearchText(input.value).split(" ").filter(Boolean);
      var hits = function (text) { return words.every(function (w) { return text.indexOf(w) !== -1; }); };
      var n = 0;
      Array.prototype.forEach.call(table.querySelectorAll("tbody.budget-chapter"), function (body) {
        var chapterHit = words.length && hits(body.dataset.search);
        var any = false;
        Array.prototype.forEach.call(body.querySelectorAll("tr.budget-item"), function (row) {
          var show = !words.length || chapterHit || hits(row.dataset.search);
          row.hidden = !show;
          if (show) { any = true; if (words.length) n++; }
        });
        body.hidden = !any;
        var sub = body.querySelector("tr.boq-sub");
        if (sub) sub.hidden = !!words.length;
      });
      foot.hidden = !!words.length;
      found.textContent = words.length ? tr("boqSearchFound").replace("{n}", n) : "";
    };
    input.addEventListener("input", applySearch);
    applySearch();
    budgetBody.appendChild(search);
    budgetBody.appendChild(wrap);
    budgetBody.appendChild(bEl("p", "budget-note", tr("boqNote")));
  }
  // for the BOQ search: lower case, no quote marks (מ"ק = מק), single spaces
  function boqSearchText(s) {
    return String(s || "").toLowerCase().replace(/["'״׳`]/g, "").replace(/\s+/g, " ").trim();
  }
  function budgetItemLabel(item) {
    return [item.code, item.name].filter(Boolean).join(" ");
  }
  // by type: spent, and the project's own (no BOQ item) costs against their budget - tap to set it
  function renderBudgetCategories() {
    var cats = budgetByCategory();
    var sec = bEl("section", "budget-chapter");
    var head = bEl("div", "budget-chapter-head");
    head.appendChild(bEl("b", "", tr("budgetByType")));
    head.appendChild(bEl("small", "", tr("budgetByTypeHint")));
    sec.appendChild(head);
    BUDGET_CATEGORIES.forEach(function (c) {
      var x = cats[c];
      if (c === "subcontractors" && !x.spent) return;
      var over = x.budget ? x.general > x.budget : false;
      var row = bEl("div", "budget-cat" + (over ? " over" : ""));
      row.appendChild(bEl("span", "budget-name", budgetCategoryLabel(c)));
      row.appendChild(bEl("b", "budget-amount", budgetMoney(x.spent)));
      if (c !== "subcontractors") {
        row.appendChild(bEl("small", "budget-item-nums", x.budget
          ? tr("budgetGeneralVs").replace("{spent}", budgetMoney(x.general)).replace("{budget}", budgetMoney(x.budget))
          : tr("budgetSetGeneral")));
        row.addEventListener("click", function () { budgetGeneralForm(c); });
      }
      sec.appendChild(row);
    });
    budgetBody.appendChild(sec);
  }
  function budgetGeneralForm(cat) {
    budgetForm(tr("budgetGeneralTitle").replace("{type}", budgetCategoryLabel(cat)), [
      { key: "amount", label: tr("budgetGeneralAmount"), value: budget.data.generalBudget[cat], type: "number" }
    ], function (v) {
      var amount = budgetNum(v.amount);
      budgetChange(function (d) {
        if (amount) d.generalBudget[cat] = amount; else delete d.generalBudget[cat];
      });
    }, null);
  }
  function renderBudgetExpenses() {
    budgetActions([["budgetAddExpense", function () { budgetExpenseForm(null); }, "primary"]]);
    renderBudgetCategories();
    var list = budget.data.expenses.slice().sort(function (a, b) { return String(b.date).localeCompare(String(a.date)) || (b.at || 0) - (a.at || 0); });
    if (!list.length) { budgetBody.appendChild(bEl("p", "team-empty", tr("budgetNoExpenses"))); return; }
    list.forEach(function (e) {
      var item = budget.data.items.find(function (i) { return i.id === e.itemId; });
      var row = bEl("div", "budget-expense");
      var top = bEl("div", "budget-item-top");
      top.appendChild(bEl("span", "budget-name", e.supplier || ""));
      top.appendChild(bEl("b", "budget-amount", budgetMoney(budgetNum(e.amount))));
      row.appendChild(top);
      row.appendChild(bEl("small", "budget-item-nums", [isoToDisplay(e.date),
        budgetCategoryLabel(e.category),
        e.invoice ? tr("budgetInvoiceShort") + " " + e.invoice : "",
        item ? budgetItemLabel(item) : tr("budgetUnassigned")].filter(Boolean).join(" · ")));
      if (e.note) row.appendChild(bEl("small", "budget-item-nums", e.note));
      // a subcontractor's approved bill's: it's changed there
      var bill = e.billId && budget.data.bills.find(function (b) { return b.id === e.billId; });
      row.addEventListener("click", function () {
        if (!bill) { budgetExpenseForm(e); return; }
        budget.tab = "subs";
        budget.subId = bill.subId;
        budget.billId = bill.id;
        budget.billDraft = null;
        renderBudget();
      });
      budgetBody.appendChild(row);
    });
  }

  // ---- the forms ----------------------------------------------------------------
  var budgetFormSave = null, budgetFormDelete = null;
  function budgetForm(title, fields, onSave, onDelete) {
    document.getElementById("budgetFormTitle").textContent = title;
    budgetFormFields.innerHTML = "";
    fields.forEach(function (f) {
      budgetFormFields.appendChild(bEl("label", "", f.label));
      var input;
      if (f.checks) {
        // ticks: f.all (if given) ticks / unticks them all
        var box = bEl("div", "budget-checks");
        box.dataset.key = f.key;
        var ticks = [];
        var tick = function (value, text, cls) {
          var row = bEl("label", "budget-check" + (cls ? " " + cls : ""));
          var cb = bEl("input");
          cb.type = "checkbox";
          cb.value = value;
          row.appendChild(cb);
          row.appendChild(bEl("span", "", text));
          box.appendChild(row);
          return cb;
        };
        var allBox = f.all ? tick("", f.all, "budget-check-all") : null;
        f.checks.forEach(function (o) {
          var cb = tick(o[0], o[1]);
          cb.checked = (f.value || []).indexOf(o[0]) !== -1;
          cb.dataset.tick = "1";
          ticks.push(cb);
        });
        if (allBox) {
          var syncAll = function () { allBox.checked = ticks.every(function (c) { return c.checked; }); };
          syncAll();
          allBox.addEventListener("change", function () { ticks.forEach(function (c) { c.checked = allBox.checked; }); });
          ticks.forEach(function (c) { c.addEventListener("change", syncAll); });
        }
        budgetFormFields.appendChild(box);
        return;
      }
      if (f.options) {
        input = bEl("select");
        f.options.forEach(function (o) {
          var opt = bEl("option", "", o[1]);
          opt.value = o[0];
          input.appendChild(opt);
        });
      } else {
        input = bEl("input");
        input.type = f.type || "text";
        if (f.type === "number") { input.step = "any"; input.inputMode = "decimal"; }
      }
      input.name = f.key;
      input.value = f.value == null ? "" : f.value;
      if (f.list) input.setAttribute("list", f.list);
      budgetFormFields.appendChild(input);
    });
    budgetFormSave = onSave;
    budgetFormDelete = onDelete;
    document.getElementById("budgetFormDeleteBtn").hidden = !onDelete;
    budgetFormOverlay.hidden = false;
    var first = budgetFormFields.querySelector("input:not([type=checkbox])");
    if (first) first.focus();
  }
  function budgetFormValues() {
    var v = {};
    Array.prototype.forEach.call(budgetFormFields.querySelectorAll("input:not([type=checkbox]), select"), function (i) { v[i.name] = i.value.trim(); });
    Array.prototype.forEach.call(budgetFormFields.querySelectorAll(".budget-checks"), function (box) {
      v[box.dataset.key] = Array.prototype.filter.call(box.querySelectorAll("input[data-tick]"), function (c) { return c.checked; })
        .map(function (c) { return c.value; });
    });
    return v;
  }
  document.getElementById("budgetForm").addEventListener("submit", function (e) {
    e.preventDefault();
    if (budgetFormSave && budgetFormSave(budgetFormValues()) !== false) budgetFormOverlay.hidden = true;
  });
  document.getElementById("budgetFormCancelBtn").addEventListener("click", function () { budgetFormOverlay.hidden = true; });
  document.getElementById("budgetFormDeleteBtn").addEventListener("click", function () {
    var del = budgetFormDelete;
    budgetFormOverlay.hidden = true; // (the question shows over the screen, not behind the form)
    askConfirm(tr("budgetDeleteConfirm"), function () { if (del) del(); });
  });

  function budgetChapterList() {
    var dl = document.getElementById("budgetChapterList");
    dl.innerHTML = "";
    budget.data.items.map(function (i) { return (i.chapter || "").trim(); })
      .filter(function (c, k, all) { return c && all.indexOf(c) === k; })
      .forEach(function (c) { var o = bEl("option"); o.value = c; dl.appendChild(o); });
  }
  function budgetItemForm(item) {
    budgetChapterList();
    var it = item || {};
    budgetForm(tr(item ? "budgetEditItem" : "budgetAddItem"), [
      { key: "code", label: tr("budgetCode"), value: it.code },
      { key: "chapter", label: tr("budgetChapter"), value: it.chapter, list: "budgetChapterList" },
      { key: "name", label: tr("budgetName"), value: it.name },
      { key: "unit", label: tr("budgetUnit"), value: it.unit },
      { key: "qty", label: tr("budgetQty"), value: it.qty, type: "number" },
      { key: "price", label: tr("budgetPrice"), value: it.price, type: "number" },
      { key: "actualPrice", label: tr("budgetActualPriceField"), value: it.actualPrice, type: "number" },
      { key: "cost", label: tr("budgetCostField"), value: it.cost, type: "number" },
      { key: "doneQty", label: tr("budgetDoneQtyField").replace("{unit}", it.unit || ""), value: item ? budgetItemDoneQty(it) : "", type: "number" }
    ], function (v) {
      if (!v.name && !v.code) { alert(tr("budgetNeedName")); return false; }
      // the work done is typed as a quantity; its % (what the sums use) follows from it
      var qty = budgetNum(v.qty), done = Math.max(0, budgetNum(v.doneQty));
      var rec = Object.assign({}, it, {
        id: it.id || uid(), code: v.code, chapter: v.chapter, name: v.name, unit: v.unit,
        qty: qty, price: budgetNum(v.price), actualPrice: budgetNum(v.actualPrice), cost: budgetNum(v.cost),
        doneQty: done, progress: qty ? Math.min(100, done * 100 / qty) : 0
      });
      budgetChange(budgetUpsert("items", rec));
    }, item ? function () { budgetChange(budgetRemove("items", item.id)); } : null);
  }
  function budgetDiscountLabel(d) {
    return tr("boqDiscountLine").replace("{text}", d.description || "") +
      (d.kind === "amount" ? "" : " (" + budgetNum(d.value) + "%)") +
      (budgetDiscountChapters(d) ? " · " + budgetDiscountScopeText(d) : "");
  }
  // 🏷 הנחות: the BOQ's discounts by name - a tap opens one to change it,
  // a long press (a right click on a computer) offers to delete it
  var boqDiscountsOverlay = document.getElementById("boqDiscountsOverlay");
  var boqDiscountsList = document.getElementById("boqDiscountsList");
  function openBoqDiscounts() {
    boqDiscountsList.innerHTML = "";
    var list = budget.data.discounts;
    if (!list.length) boqDiscountsList.appendChild(bEl("p", "move-task-empty", tr("boqNoDiscounts")));
    list.forEach(function (d) {
      var btn = bEl("button", "boq-discount-btn");
      btn.type = "button";
      btn.appendChild(bEl("b", "", d.description || tr("boqDiscountNoName")));
      btn.appendChild(bEl("small", "", (d.kind === "amount" ? budgetMoney(budgetNum(d.value)) : budgetNum(d.value) + "%") + " · " +
        budgetDiscountScopeText(d)));
      var timer = null, long = false;
      var askDelete = function () {
        boqDiscountsOverlay.hidden = true;
        askConfirm(tr("boqDeleteDiscountQ").replace("{name}", d.description || tr("boqDiscountNoName")), function () {
          budgetChange(budgetRemove("discounts", d.id));
          setTimeout(openBoqDiscounts, 0);
        });
      };
      var start = function () {
        long = false;
        clearTimeout(timer);
        timer = setTimeout(function () { long = true; askDelete(); }, 600);
      };
      var stop = function () { clearTimeout(timer); };
      btn.addEventListener("touchstart", start, { passive: true });
      btn.addEventListener("mousedown", function (e) { if (e.button === 0) start(); });
      ["touchend", "touchmove", "touchcancel", "mouseup", "mouseleave"].forEach(function (ev) { btn.addEventListener(ev, stop); });
      btn.addEventListener("contextmenu", function (e) { e.preventDefault(); stop(); if (!long) { long = true; askDelete(); } });
      btn.addEventListener("click", function () {
        if (long) { long = false; return; }
        boqDiscountsOverlay.hidden = true;
        budgetDiscountForm(d, true);
      });
      boqDiscountsList.appendChild(btn);
    });
    boqDiscountsOverlay.hidden = false;
  }
  document.getElementById("boqDiscountsAddBtn").addEventListener("click", function () {
    boqDiscountsOverlay.hidden = true;
    budgetDiscountForm(null, true);
  });
  document.getElementById("boqDiscountsCloseBtn").addEventListener("click", function () { boqDiscountsOverlay.hidden = true; });
  // fromList: back to the discounts' list after it's saved
  function budgetDiscountForm(disc, fromList) {
    var d = disc || { kind: "pct" };
    var chapters = [];
    budget.data.items.forEach(function (i) { var c = budgetChapterOf(i); if (chapters.indexOf(c) === -1) chapters.push(c); });
    var on = budgetDiscountChapters(d);
    (on || []).forEach(function (c) { if (chapters.indexOf(c) === -1) chapters.push(c); });
    // every chapter ticked for a general one - untick those it isn't on
    budgetForm(tr(disc ? "boqEditDiscount" : "boqAddDiscountTitle"), [
      { key: "chapters", label: tr("boqDiscountScope"), all: tr("boqDiscountGeneral"), value: on || chapters,
        checks: chapters.map(function (c) { return [c, tr("boqDiscountOnChapter").replace("{name}", c)]; }) },
      { key: "description", label: tr("boqDiscountDesc"), value: d.description },
      { key: "kind", label: tr("boqDiscountKind"), value: d.kind || "pct",
        options: [["pct", tr("boqDiscountPct")], ["amount", tr("boqDiscountAmount")]] },
      { key: "value", label: tr("boqDiscountValue"), value: d.value, type: "number" }
    ], function (v) {
      var value = budgetNum(v.value);
      if (!value) { alert(tr("budgetNeedAmount")); return false; }
      if (!v.chapters.length) { alert(tr("boqDiscountNeedChapter")); return false; }
      var everyChapter = chapters.every(function (c) { return v.chapters.indexOf(c) !== -1; });
      var rec = Object.assign({}, d, { id: d.id || uid(), description: (v.description || "").trim(), kind: v.kind === "amount" ? "amount" : "pct",
        value: value, chapters: everyChapter ? null : v.chapters, chapter: null });
      budgetChange(budgetUpsert("discounts", rec));
      if (fromList) setTimeout(openBoqDiscounts, 0);
    }, disc ? function () { budgetChange(budgetRemove("discounts", disc.id)); if (fromList) setTimeout(openBoqDiscounts, 0); } : null);
  }
  function budgetExpenseForm(exp) {
    var e = exp || { date: todayISO() };
    var items = budget.data.items.slice().sort(function (a, b) {
      return String(a.code || "").localeCompare(String(b.code || ""), undefined, { numeric: true });
    });
    budgetForm(tr(exp ? "budgetEditExpense" : "budgetAddExpense"), [
      { key: "date", label: tr("shareTaskDate"), value: e.date, type: "date" },
      { key: "category", label: tr("budgetCategory"), value: e.category || "materials",
        options: BUDGET_CATEGORIES.filter(function (c) { return c !== "subcontractors"; }).map(function (c) { return [c, budgetCategoryLabel(c)]; }) },
      { key: "supplier", label: tr("budgetSupplier"), value: e.supplier },
      { key: "supplierCode", label: tr("budgetSupplierCode"), value: e.supplierCode },
      { key: "invoice", label: tr("budgetInvoice"), value: e.invoice },
      { key: "itemId", label: tr("budgetItemField"), value: e.itemId || "",
        options: [["", tr("budgetUnassigned")]].concat(items.map(function (i) { return [i.id, budgetItemLabel(i)]; })) },
      { key: "amount", label: tr("budgetAmount"), value: e.amount, type: "number" },
      { key: "note", label: tr("budgetNote"), value: e.note }
    ], function (v) {
      if (!budgetNum(v.amount)) { alert(tr("budgetNeedAmount")); return false; }
      var rec = Object.assign({}, e, {
        id: e.id || uid(), date: v.date || todayISO(), category: v.category || "other", supplier: v.supplier, supplierCode: v.supplierCode,
        invoice: v.invoice, itemId: v.itemId || null, amount: budgetNum(v.amount), note: v.note,
        by: e.by || myPhoneNumber || null, at: e.at || Date.now()
      });
      budgetChange(budgetUpsert("expenses", rec));
    }, exp ? function () { budgetChange(budgetRemove("expenses", exp.id)); } : null);
  }

  // ---- from / to Excel (CSV) ------------------------------------------------------
  function budgetParseCsv(text) {
    text = text.replace(/^\uFEFF/, "");
    var sep = (text.split("\n")[0].match(/;/g) || []).length > (text.split("\n")[0].match(/,/g) || []).length ? ";" : ",";
    var rows = [], row = [], cell = "", q = false;
    for (var i = 0; i < text.length; i++) {
      var ch = text[i];
      if (q) {
        if (ch === '"' && text[i + 1] === '"') { cell += '"'; i++; }
        else if (ch === '"') q = false;
        else cell += ch;
      } else if (ch === '"' && !cell) q = true; // (מ"ר inside a cell stays as it is)
      else if (ch === sep) { row.push(cell); cell = ""; }
      else if (ch === "\n" || ch === "\r") {
        if (ch === "\r" && text[i + 1] === "\n") i++;
        row.push(cell); rows.push(row); row = []; cell = "";
      } else cell += ch;
    }
    if (cell || row.length) { row.push(cell); rows.push(row); }
    return rows.map(function (r) { return r.map(function (c) { return c.trim(); }); });
  }
  // a BOQ exported from Excel: its header row names the columns; a row
  // with a code / text but no quantity is a chapter title for those after it
  var BUDGET_CSV_COLUMNS = {
    code: /סעיף|מס['׳"]?|קוד|^code|item no/i,
    name: /תיאור|תאור|פירוט|description/i,
    unit: /יח['׳"]?|יחידה|unit/i,
    qty: /כמות|qty|quantity/i,
    price: /מחיר|price|rate/i,
    cost: /תקציב|עלות|budget|cost/i
  };
  // the number in an imported cell: its first one ("1,250.50"), never several run together
  function budgetCellNum(v) {
    var m = String(v == null ? "" : v).match(/-?\d{1,3}(?:,\d{3})+(?:\.\d+)?|-?\d+(?:\.\d+)?/);
    return m ? parseFloat(m[0].replace(/,/g, "")) : 0;
  }
  function budgetImportRows(rows) {
    var headAt = rows.findIndex(function (r) {
      return r.some(function (c) { return BUDGET_CSV_COLUMNS.qty.test(c); }) && r.some(function (c) { return BUDGET_CSV_COLUMNS.name.test(c); });
    });
    if (headAt < 0) return null;
    var col = {};
    rows[headAt].forEach(function (c, k) {
      Object.keys(BUDGET_CSV_COLUMNS).forEach(function (key) {
        if (col[key] == null && c && BUDGET_CSV_COLUMNS[key].test(c)) col[key] = k;
      });
    });
    var get = function (r, key) { return col[key] == null ? "" : String(r[col[key]] || "").trim(); };
    var chapter = "", out = [], last = null; // last: the item / chapter a wrapped line continues
    rows.slice(headAt + 1).forEach(function (r) {
      var name = get(r, "name"), code = get(r, "code"), qty = budgetCellNum(get(r, "qty")), price = budgetCellNum(get(r, "price"));
      if (!name && !code) return;
      if (!qty && !price) {
        // no number of its own: a description's next line - or, with an item number, a chapter
        if (!code) {
          // (a page number, a chapter's total line: not part of anything)
          if (/^(עמוד|page)\s*\d|סה["״']?כ|סך הכל|total/i.test(name)) { last = null; return; }
          if (last === "chapter") chapter += " " + name;
          else if (last) last.name += " " + name;
          return;
        }
        chapter = [code, name].filter(Boolean).join(" ");
        last = "chapter";
        return;
      }
      last = { id: uid(), code: code, chapter: chapter, name: name, unit: get(r, "unit"),
        qty: qty, price: price, cost: budgetCellNum(get(r, "cost")), progress: 0 };
      out.push(last);
    });
    return out;
  }
  // An Excel file (.xlsx) read right here: it's a zip of XML files - the
  // first worksheet's cells, with the shared strings they point to.
  // DecompressionStream("deflate-raw") unpacks it (no library needed).
  function budgetUnzip(buf) {
    var view = new DataView(buf), bytes = new Uint8Array(buf);
    var end = -1;
    for (var i = buf.byteLength - 22; i >= Math.max(0, buf.byteLength - 66000); i--) {
      if (view.getUint32(i, true) === 0x06054b50) { end = i; break; }
    }
    if (end < 0) return Promise.reject(new Error("not a zip"));
    var count = view.getUint16(end + 10, true), at = view.getUint32(end + 16, true), files = {};
    for (var n = 0; n < count; n++) {
      var method = view.getUint16(at + 10, true), size = view.getUint32(at + 20, true);
      var nameLen = view.getUint16(at + 28, true), extraLen = view.getUint16(at + 30, true), commentLen = view.getUint16(at + 32, true);
      var local = view.getUint32(at + 42, true);
      var name = new TextDecoder().decode(bytes.subarray(at + 46, at + 46 + nameLen));
      var start = local + 30 + view.getUint16(local + 26, true) + view.getUint16(local + 28, true);
      files[name] = { method: method, data: bytes.subarray(start, start + size) };
      at += 46 + nameLen + extraLen + commentLen;
    }
    return Promise.resolve(function (name) {
      var f = files[name];
      if (!f) return Promise.resolve(null);
      if (f.method === 0) return Promise.resolve(new TextDecoder().decode(f.data));
      var stream = new Blob([f.data]).stream().pipeThrough(new DecompressionStream("deflate-raw"));
      return new Response(stream).text();
    });
  }
  function budgetXlsxRows(buf) {
    return budgetUnzip(buf).then(function (read) {
      return Promise.all([read("xl/sharedStrings.xml"), read("xl/workbook.xml"), read("xl/_rels/workbook.xml.rels")]).then(function (r) {
        var xml = function (t) { return t ? new DOMParser().parseFromString(t, "application/xml") : null; };
        var strings = [];
        var ss = xml(r[0]);
        if (ss) Array.prototype.forEach.call(ss.getElementsByTagName("si"), function (si) {
          strings.push(Array.prototype.map.call(si.getElementsByTagName("t"), function (t) { return t.textContent; }).join(""));
        });
        // the first sheet, by the workbook's own order
        var path = "xl/worksheets/sheet1.xml";
        var wb = xml(r[1]), rels = xml(r[2]);
        var first = wb && wb.getElementsByTagName("sheet")[0];
        var rid = first && (first.getAttribute("r:id") || first.getAttributeNS("http://schemas.openxmlformats.org/officeDocument/2006/relationships", "id"));
        if (rid && rels) Array.prototype.forEach.call(rels.getElementsByTagName("Relationship"), function (rel) {
          if (rel.getAttribute("Id") === rid) path = "xl/" + rel.getAttribute("Target").replace(/^\/?xl\//, "");
        });
        return read(path).then(function (sheetXml) {
          var doc = xml(sheetXml);
          if (!doc) return [];
          var rows = [];
          Array.prototype.forEach.call(doc.getElementsByTagName("row"), function (row) {
            var out = [];
            Array.prototype.forEach.call(row.getElementsByTagName("c"), function (c) {
              var ref = (c.getAttribute("r") || "").replace(/\d+/g, ""), col = 0;
              for (var k = 0; k < ref.length; k++) col = col * 26 + ref.charCodeAt(k) - 64;
              var v = c.getElementsByTagName("v")[0], type = c.getAttribute("t"), val = "";
              if (type === "s" && v) val = strings[+v.textContent] || "";
              else if (type === "inlineStr") val = Array.prototype.map.call(c.getElementsByTagName("t"), function (t) { return t.textContent; }).join("");
              else if (v) val = v.textContent;
              out[(col || out.length + 1) - 1] = String(val).trim();
            });
            for (var j = 0; j < out.length; j++) if (out[j] == null) out[j] = "";
            rows.push(out);
          });
          return rows;
        });
      });
    });
  }
  // A BOQ in a PDF: no table there, only text placed on the page. Its words
  // (PDF.js, as the sketch's PDF backgrounds use) are put back into lines
  // by height, the header line gives the columns, and each word goes to
  // the nearest column. Hebrew that the PDF holds in display order comes
  // out backwards - if no header is found, the Hebrew is turned around and
  // tried again.
  function budgetPdfLines(buf) {
    return skLoadPdf().then(function (pdfjs) {
      return pdfjs.getDocument({ data: new Uint8Array(buf) }).promise;
    }).then(function (pdf) {
      var pages = [];
      for (var n = 1; n <= pdf.numPages; n++) pages.push(n);
      return Promise.all(pages.map(function (n) {
        return pdf.getPage(n).then(function (page) { return page.getTextContent(); }).then(function (content) {
          var words = content.items.filter(function (it) { return String(it.str || "").trim(); }).map(function (it) {
            var h = Math.abs(it.transform[3]) || 10;
            return { str: String(it.str).trim(), x: it.transform[4], w: it.width || 0, y: it.transform[5], h: h };
          }).sort(function (a, b) { return b.y - a.y || b.x - a.x; });
          // a word drawn twice in the same place (some PDFs fake bold that way): once
          words = words.filter(function (wd, k) {
            return !words.slice(0, k).some(function (o) { return o.str === wd.str && Math.abs(o.x - wd.x) < 2 && Math.abs(o.y - wd.y) < 2; });
          });
          var lines = [];
          words.forEach(function (wd) {
            var line = lines.find(function (l) { return Math.abs(l.y - wd.y) <= Math.max(2, wd.h * 0.45); });
            if (!line) lines.push(line = { y: wd.y, words: [] });
            line.words.push(wd);
          });
          return lines;
        });
      }));
    }).then(function (pages) { return [].concat.apply([], pages); });
  }
  var BUDGET_HEBREW = /[\u0590-\u05FF]/;
  // Which column a word belongs to. The description column is wide and its
  // header sits in its middle, so "the nearest header" misplaces its words;
  // instead: an item number only at the line's start (the item-number
  // column, a number-like word), numbers / units only in the narrow columns
  // past the description (each to the nearest of those), and any other word
  // - a number inside a description too - is description. A table with no
  // description column found: the nearest header, as before.
  var BUDGET_CODE_WORD = /^\d+([.\-\/]\d+)*\.?$/;
  function pdfColumnKinds(columns) {
    columns.forEach(function (c) {
      var l = c.label;
      c.kind = BUDGET_CSV_COLUMNS.name.test(l) ? "name" : BUDGET_CSV_COLUMNS.code.test(l) && !/כמות|מחיר|סה|qty|price/i.test(l) ? "code" : "num";
    });
    var name = columns.find(function (c) { return c.kind === "name"; });
    var code = columns.find(function (c) { return c.kind === "code"; });
    var nums = columns.filter(function (c) { return c.kind === "num"; });
    var rtl = name && nums.length ? name.x > nums[0].x : true;
    return {
      name: name, code: code, rtl: rtl,
      // where the narrow (number / unit) columns start, past the description
      numEdge: nums.length ? (rtl ? Math.max.apply(null, nums.map(function (c) { return c.right; })) : Math.min.apply(null, nums.map(function (c) { return c.left; }))) : null,
      // where the item-number column starts, before the description
      codeEdge: code ? (rtl ? code.left - (code.right - code.left) * 0.6 : code.right + (code.right - code.left) * 0.6) : null
    };
  }
  function pdfColumnOf(columns, wd, str) {
    var k = columns.kinds || (columns.kinds = pdfColumnKinds(columns));
    var mid = wd.x + wd.w / 2;
    var nearest = function (list) {
      var best = list[0];
      list.forEach(function (c) { if (Math.abs(c.x - mid) < Math.abs(best.x - mid)) best = c; });
      return columns.indexOf(best);
    };
    if (!k.name) return nearest(columns);
    var past = function (edge, beyond) { return edge != null && (k.rtl ? (beyond ? mid > edge : mid < edge) : (beyond ? mid < edge : mid > edge)); };
    if (k.code && past(k.codeEdge, true) && BUDGET_CODE_WORD.test(str)) return columns.indexOf(k.code);
    if (past(k.numEdge + (k.rtl ? 8 : -8), false)) return nearest(columns.filter(function (c) { return c.kind === "num"; }));
    return columns.indexOf(k.name);
  }
  // headerText(all the line's text): whether it's the table's header line
  // (a BOQ's, by default: a quantity and a description)
  function budgetPdfRows(lines, turnHebrew, headerText) {
    // turned around: the letters, but a number inside keeps its own order (200, not 002)
    var text = function (wd) {
      if (!turnHebrew || !BUDGET_HEBREW.test(wd.str)) return wd.str;
      return wd.str.split("").reverse().join("").replace(/\d[\d.,:\/-]*\d|\d/g, function (n) { return n.split("").reverse().join(""); });
    };
    headerText = headerText || function (all) { return BUDGET_CSV_COLUMNS.qty.test(all) && BUDGET_CSV_COLUMNS.name.test(all); };
    var isHeader = function (line) { return headerText(line.words.map(text).join(" ")); };
    var columns = null, rows = [];
    lines.forEach(function (line) {
      if (isHeader(line)) {
        // the header's words, those close together as one column (right to left)
        var hw = line.words.slice().sort(function (a, b) { return b.x - a.x; });
        columns = [];
        hw.forEach(function (wd) {
          var last = columns[columns.length - 1];
          if (last && last.left - (wd.x + wd.w) < wd.h * 0.6) {
            last.left = Math.min(last.left, wd.x);
            last.label += " " + text(wd); // (the next word, read right to left)
          } else columns.push({ left: wd.x, right: wd.x + wd.w, label: text(wd) });
        });
        columns.forEach(function (c) { c.x = (c.left + c.right) / 2; });
        rows.push(columns.map(function (c) { return c.label; }));
        return;
      }
      if (!columns) return;
      var cells = columns.map(function () { return []; });
      line.words.forEach(function (wd) {
        cells[pdfColumnOf(columns, wd, text(wd))].push(wd);
      });
      rows.push(cells.map(function (ws) {
        return ws.sort(function (a, b) { return b.x - a.x; }).map(text).join(" ");
      }));
    });
    return columns ? rows : null;
  }
  function budgetPdfImport(buf) {
    return budgetPdfLines(buf).then(function (lines) {
      var items = null;
      [false, true].some(function (turn) {
        var rows = budgetPdfRows(lines, turn);
        items = rows && budgetImportRows(rows);
        return items && items.length;
      });
      return items;
    });
  }
  function budgetImportFile(file) {
    if (/\.pdf$/i.test(file.name) || file.type === "application/pdf") return file.arrayBuffer().then(budgetPdfImport);
    var isXlsx = /\.xlsx$/i.test(file.name) || /spreadsheetml/.test(file.type);
    var rows = isXlsx
      ? file.arrayBuffer().then(budgetXlsxRows)
      : file.text().then(budgetParseCsv);
    return rows.then(budgetImportRows);
  }
  document.getElementById("budgetCsvInput").addEventListener("change", function (e) {
    var file = e.target.files && e.target.files[0];
    e.target.value = "";
    if (!file) return;
    budgetImportFile(file).then(function (items) {
      if (!items || !items.length) { alert(tr("budgetImportNone")); return; }
      askConfirm(tr("budgetImportConfirm").replace("{n}", items.length), function () {
        // each upload remembered, so it can be deleted as one
        var upload = { id: uid(), name: file.name, at: Date.now(), count: items.length };
        items.forEach(function (i) { i.importId = upload.id; });
        budgetChange(function (d) {
          d.items = d.items.concat(JSON.parse(JSON.stringify(items)));
          d.imports.push(upload);
        });
      });
    }, function () { alert(tr("budgetImportNone")); });
  });
  // deleting a BOQ: one upload's items (the file it came from), or every item
  function budgetDeleteBoqForm() {
    var d = budget.data;
    var options = d.imports.filter(function (u) {
      return d.items.some(function (i) { return i.importId === u.id; });
    }).map(function (u) {
      return [u.id, tr("budgetUploadOption").replace("{name}", u.name).replace("{date}", isoToDisplay(new Date(u.at).toISOString().slice(0, 10)))
        .replace("{n}", d.items.filter(function (i) { return i.importId === u.id; }).length)];
    }).concat([["*", tr("budgetDeleteAllItems").replace("{n}", d.items.length)]]);
    budgetForm(tr("budgetDeleteBoq"), [{ key: "which", label: tr("budgetDeleteWhich"), value: options[0][0], options: options }], function (v) {
      var gone = d.items.filter(function (i) { return v.which === "*" || i.importId === v.which; }).map(function (i) { return i.id; });
      if (!gone.length) return;
      var linked = d.expenses.filter(function (e) { return gone.indexOf(e.itemId) !== -1; }).length +
        d.subcontracts.reduce(function (n, sub) { return n + sub.lines.filter(function (l) { return gone.indexOf(l.itemId) !== -1; }).length; }, 0);
      budgetFormOverlay.hidden = true;
      askConfirm(tr("budgetDeleteBoqConfirm").replace("{n}", gone.length) + (linked ? "\n" + tr("budgetDeleteBoqLinked").replace("{n}", linked) : ""), function () {
        var which = v.which;
        budgetChange(function (dd) {
          dd.items = dd.items.filter(function (i) { return gone.indexOf(i.id) === -1; });
          dd.imports = dd.imports.filter(function (u) { return which !== "*" && u.id !== which; });
        });
      });
      return false;
    }, null);
  }
  function budgetExport() {
    var rows = [[tr("budgetCode"), tr("budgetChapter"), tr("budgetName"), tr("budgetUnit"), tr("boqContractQty"), tr("boqActualQty"), tr("boqContractPrice"), tr("boqActualPrice"),
      tr("boqDoneAtContract"), tr("boqActualTotal"), tr("budgetContract"), tr("budgetCostBudget"), tr("budgetActual"), tr("budgetDone") + " %", tr("budgetUsed") + " %", tr("budgetForecastCost")]];
    budget.data.items.forEach(function (i) {
      var actual = budgetItemActual(i), cost = budgetNum(i.cost);
      rows.push([i.code || "", i.chapter || "", i.name || "", i.unit || "", budgetNum(i.qty), budgetItemDoneQty(i), Math.round(budgetItemPrice(i) * 100) / 100, budgetNum(i.actualPrice),
        Math.round(budgetItemDoneAtContract(i)), Math.round(budgetItemActualTotal(i)), Math.round(budgetItemContract(i)), Math.round(cost), Math.round(actual), Math.round(budgetNum(i.progress)),
        cost ? Math.round(actual * 100 / cost) : "", Math.round(budgetItemForecast(i, actual))]);
    });
    // the discounts (already in the prices above), for the record
    budgetDiscountCalc().lines.forEach(function (l) {
      rows.push(["", "", budgetDiscountLabel(l.d), "", "", "", "", "", -Math.round(l.done), "", -Math.round(l.amount)]);
    });
    var csv = "\uFEFF" + rows.map(function (r) { return r.map(wpCsvCell).join(","); }).join("\r\n");
    attemptShare(new Blob([csv], { type: "text/csv;charset=utf-8" }),
      tr("budgetTile") + " " + budget.sheet.name + " " + isoToFileNameDate(todayISO()) + ".csv", "text/csv");
  }

  function openBudgetView() {
    var sheet = activeSheet();
    var owner = budgetOwnerFor(sheet);
    if (!owner) return;
    budget = { sheet: sheet, owner: owner, data: null, version: 0, tab: "items", error: false, subId: null, billId: null, billDraft: null };
    document.getElementById("budgetProjectName").textContent = sheet.name;
    budgetBody.innerHTML = "";
    budgetView.hidden = false;
    budgetLoad();
  }
  siteLogBudgetBtn.addEventListener("click", openBudgetView);
  document.getElementById("budgetBackBtn").addEventListener("click", function () { budgetView.hidden = true; });
