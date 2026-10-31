
  // ---------------------------------------------------------------------
  // בקרה תקציבית: a project's money by its bill of quantities (כתב כמויות),
  // from its tile in the diary. Kept in project_finance (see
  // supabase/sql/team_and_finance.sql) as data: {
  //   items:    [{ id, code, chapter, name, unit, qty, price, cost, progress }]
  //             - a BOQ item: quantity x unit price is its contract value;
  //               cost is its cost budget; progress its % done
  //   expenses: [{ id, date, supplier, supplierCode, invoice, itemId, amount, note, by, at, billId }]
  //   generalBudget: { category: amount } - the project's own costs (overheads,
  //             insurance...) that sit on no BOQ item
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
  // tab: items | client | subs | expenses; subId / billId: a subcontractor / bill open there
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
  function budgetItemContract(item) { return budgetNum(item.qty) * budgetNum(item.price); }
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
  function budgetEmpty() { return { items: [], expenses: [], subcontracts: [], bills: [], generalBudget: {}, client: {}, receipts: [] }; }
  function budgetNormalize(d) {
    d = d || {};
    var list = function (k) { return Array.isArray(d[k]) ? d[k] : []; };
    return { items: list("items"), expenses: list("expenses"), subcontracts: list("subcontracts"), bills: list("bills"),
      generalBudget: d.generalBudget && typeof d.generalBudget === "object" ? d.generalBudget : {},
      client: d.client && typeof d.client === "object" ? d.client : {}, receipts: list("receipts") };
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
    budgetBody.appendChild(reports);
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
      ["budgetExportCsv", budgetExport]]);
    var items = budget.data.items.slice().sort(function (a, b) {
      return String(a.code || "").localeCompare(String(b.code || ""), undefined, { numeric: true });
    });
    if (!items.length) { budgetBody.appendChild(bEl("p", "team-empty", tr("budgetNoItems"))); return; }
    var chapters = [];
    items.forEach(function (item) {
      var ch = (item.chapter || "").trim() || tr("budgetNoChapter");
      var g = chapters.find(function (c) { return c.name === ch; });
      if (!g) chapters.push(g = { name: ch, items: [] });
      g.items.push(item);
    });
    chapters.forEach(function (g) {
      var sec = bEl("section", "budget-chapter");
      var head = bEl("div", "budget-chapter-head");
      head.appendChild(bEl("b", "", g.name));
      var gCost = 0, gActual = 0;
      g.items.forEach(function (i) { gCost += budgetNum(i.cost); gActual += budgetItemActual(i); });
      head.appendChild(bEl("small", gActual > gCost && gCost ? "over" : "", budgetMoney(gActual) + " / " + budgetMoney(gCost)));
      sec.appendChild(head);
      g.items.forEach(function (item) {
        var actual = budgetItemActual(item), cost = budgetNum(item.cost), over = budgetItemOver(item, actual);
        var row = bEl("div", "budget-item" + (over ? " over" : ""));
        var top = bEl("div", "budget-item-top");
        top.appendChild(bEl("span", "budget-code", item.code || ""));
        top.appendChild(bEl("span", "budget-name", item.name || ""));
        row.appendChild(top);
        row.appendChild(bEl("small", "budget-item-nums", [
          tr("budgetContract") + " " + budgetMoney(budgetItemContract(item)),
          tr("budgetCostBudget") + " " + budgetMoney(cost),
          tr("budgetActual") + " " + budgetMoney(actual)].join(" · ")));
        var bars = bEl("div", "budget-item-bars");
        var done = bEl("div", "budget-bar-row");
        done.appendChild(bEl("small", "", tr("budgetDone") + " " + Math.round(budgetNum(item.progress)) + "%"));
        done.appendChild(budgetBar(budgetNum(item.progress), "done"));
        bars.appendChild(done);
        var used = bEl("div", "budget-bar-row");
        var usedPct = cost ? actual * 100 / cost : 0;
        used.appendChild(bEl("small", "", tr("budgetUsed") + " " + Math.round(usedPct) + "%"));
        used.appendChild(budgetBar(usedPct, over ? "used over" : "used"));
        bars.appendChild(used);
        row.appendChild(bars);
        if (over) {
          row.appendChild(bEl("small", "budget-warn", tr("budgetOverWarn")
            .replace("{forecast}", budgetMoney(budgetItemForecast(item, actual)))
            .replace("{diff}", budgetMoney(budgetItemForecast(item, actual) - cost))));
        }
        row.addEventListener("click", function () { budgetItemForm(item); });
        sec.appendChild(row);
      });
      budgetBody.appendChild(sec);
    });
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
    var first = budgetFormFields.querySelector("input");
    if (first) first.focus();
  }
  function budgetFormValues() {
    var v = {};
    Array.prototype.forEach.call(budgetFormFields.querySelectorAll("input, select"), function (i) { v[i.name] = i.value.trim(); });
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
      { key: "cost", label: tr("budgetCostField"), value: it.cost, type: "number" },
      { key: "progress", label: tr("budgetProgressField"), value: it.progress, type: "number" }
    ], function (v) {
      if (!v.name && !v.code) { alert(tr("budgetNeedName")); return false; }
      var rec = Object.assign({}, it, {
        id: it.id || uid(), code: v.code, chapter: v.chapter, name: v.name, unit: v.unit,
        qty: budgetNum(v.qty), price: budgetNum(v.price), cost: budgetNum(v.cost),
        progress: Math.max(0, Math.min(100, budgetNum(v.progress)))
      });
      budgetChange(budgetUpsert("items", rec));
    }, item ? function () { budgetChange(budgetRemove("items", item.id)); } : null);
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
    var get = function (r, key) { return col[key] == null ? "" : (r[col[key]] || ""); };
    var chapter = "", out = [];
    rows.slice(headAt + 1).forEach(function (r) {
      var name = get(r, "name"), code = get(r, "code"), qty = get(r, "qty");
      if (!name && !code) return;
      if (!budgetNum(qty) && !budgetNum(get(r, "price"))) { chapter = [code, name].filter(Boolean).join(" "); return; }
      out.push({ id: uid(), code: code, chapter: chapter, name: name, unit: get(r, "unit"),
        qty: budgetNum(qty), price: budgetNum(get(r, "price")), cost: budgetNum(get(r, "cost")), progress: 0 });
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
  function budgetPdfRows(lines, turnHebrew) {
    var text = function (wd) { return turnHebrew && BUDGET_HEBREW.test(wd.str) ? wd.str.split("").reverse().join("") : wd.str; };
    var isHeader = function (line) {
      var all = line.words.map(text).join(" ");
      return BUDGET_CSV_COLUMNS.qty.test(all) && BUDGET_CSV_COLUMNS.name.test(all);
    };
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
        var mid = wd.x + wd.w / 2, best = 0;
        columns.forEach(function (c, k) { if (Math.abs(c.x - mid) < Math.abs(columns[best].x - mid)) best = k; });
        cells[best].push(wd);
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
        budgetChange(function (d) { d.items = d.items.concat(JSON.parse(JSON.stringify(items))); });
      });
    }, function () { alert(tr("budgetImportNone")); });
  });
  function budgetExport() {
    var rows = [[tr("budgetCode"), tr("budgetChapter"), tr("budgetName"), tr("budgetUnit"), tr("budgetQty"), tr("budgetPrice"),
      tr("budgetContract"), tr("budgetCostBudget"), tr("budgetActual"), tr("budgetDone") + " %", tr("budgetUsed") + " %", tr("budgetForecastCost")]];
    budget.data.items.forEach(function (i) {
      var actual = budgetItemActual(i), cost = budgetNum(i.cost);
      rows.push([i.code || "", i.chapter || "", i.name || "", i.unit || "", budgetNum(i.qty), budgetNum(i.price),
        Math.round(budgetItemContract(i)), Math.round(cost), Math.round(actual), Math.round(budgetNum(i.progress)),
        cost ? Math.round(actual * 100 / cost) : "", Math.round(budgetItemForecast(i, actual))]);
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
