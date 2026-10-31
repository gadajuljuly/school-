
  // ---------------------------------------------------------------------
  // קבלני משנה, in the budget control (11c-budget.js): each subcontractor's
  // contract - BOQ items at their own prices, retention (עיכבון) and an
  // advance (מקדמה) recovered from their bills - and their partial bills
  // (חשבון חלקי מצטבר). The engineer types a bill in from what the
  // contractor handed over: per item the cumulative quantity asked and the
  // one approved. Approving it (one engineer is enough) locks it: what's
  // due this time is the approved cumulative value, less the previous
  // bills', less retention and the advance recovered - and the period's
  // value goes into the budget as expenses on those BOQ items. Kept in
  // project_finance.data as
  //   subcontracts: [{ id, name, phone, supplierCode, retentionPct, advance,
  //                    advanceRecoveryPct, lines: [{ id, itemId, qty, price }] }]
  //   bills: [{ id, subId, no, date, status draft|approved, note,
  //             lines: { lineId: { asked, approved } }, approvedBy, approvedAt, totals }]
  // All amounts before VAT.
  // ---------------------------------------------------------------------
  var SUB_AHEAD_MARGIN = 10; // approved % of a line may run this far ahead of its item's work

  // (the client's bills - 11f-client-bills.js - are these same bills, of a "client"
  // stand-in: every BOQ item at its price to the client)
  function subOf(d, id) {
    if (id === CLIENT_ID) return clientSub(d);
    return d.subcontracts.find(function (s) { return s.id === id; });
  }
  function subBills(d, sub) {
    return d.bills.filter(function (b) { return b.subId === sub.id; }).sort(function (a, b) { return a.no - b.no; });
  }
  function subLastApproved(d, sub, beforeNo) {
    var approved = subBills(d, sub).filter(function (b) { return b.status === "approved" && (beforeNo == null || b.no < beforeNo); });
    return approved[approved.length - 1] || null;
  }
  function subContractValue(sub) {
    return sub.lines.reduce(function (s, l) { return s + budgetNum(l.qty) * budgetNum(l.price); }, 0);
  }
  // what a bill comes to (an approved one keeps the totals it was approved with)
  function billCalc(d, sub, bill) {
    var prev = subLastApproved(d, sub, bill.no);
    var lines = sub.lines.map(function (l) {
      var prevCum = prev && prev.lines[l.id] ? budgetNum(prev.lines[l.id].approved) : 0;
      var own = bill.lines[l.id] || {};
      var asked = own.asked != null && own.asked !== "" ? budgetNum(own.asked) : prevCum;
      var approved = own.approved != null && own.approved !== "" ? budgetNum(own.approved) : asked;
      var price = budgetNum(l.price);
      return { line: l, prevCum: prevCum, asked: asked, approved: approved, cumValue: approved * price, period: (approved - prevCum) * price };
    });
    var cumulative = lines.reduce(function (s, x) { return s + x.cumValue; }, 0);
    var asked = lines.reduce(function (s, x) { return s + x.asked * budgetNum(x.line.price); }, 0);
    var prevCumulative = lines.reduce(function (s, x) { return s + x.prevCum * budgetNum(x.line.price); }, 0);
    var gross = cumulative - prevCumulative;
    var retention = gross * budgetNum(sub.retentionPct) / 100;
    var recoveredBefore = subBills(d, sub).filter(function (b) { return b.status === "approved" && b.no < bill.no; })
      .reduce(function (s, b) { return s + budgetNum(b.totals && b.totals.advance); }, 0);
    var advanceLeft = Math.max(0, budgetNum(sub.advance) - recoveredBefore);
    var advance = Math.min(advanceLeft, Math.max(0, gross * budgetNum(sub.advanceRecoveryPct) / 100));
    var totals = bill.status === "approved" && bill.totals ? bill.totals : {
      asked: asked, cumulative: cumulative, previous: prevCumulative, gross: gross,
      retention: retention, advance: advance, toPay: gross - retention - advance
    };
    return { lines: lines, totals: totals };
  }
  function subSummary(d, sub) {
    var approved = subBills(d, sub).filter(function (b) { return b.status === "approved"; });
    var last = approved[approved.length - 1];
    var sum = function (k) { return approved.reduce(function (s, b) { return s + budgetNum(b.totals && b.totals[k]); }, 0); };
    return {
      contract: subContractValue(sub), approved: last ? budgetNum(last.totals.cumulative) : 0,
      paid: sum("toPay"), retention: sum("retention"), advanceLeft: Math.max(0, budgetNum(sub.advance) - sum("advance"))
    };
  }

  // ---- the subcontractors' list ---------------------------------------------
  function renderBudgetSubs() {
    if (budget.billId) { renderSubBill(); return; }
    if (budget.subId) { renderSubDetail(); return; }
    budgetActions([["subAdd", function () { subForm(null); }, "primary"]]);
    var d = budget.data;
    if (!d.subcontracts.length) { budgetBody.appendChild(bEl("p", "team-empty", tr("subNone"))); return; }
    d.subcontracts.forEach(function (sub) {
      var s = subSummary(d, sub);
      var row = bEl("div", "budget-expense sub-row");
      var top = bEl("div", "budget-item-top");
      top.appendChild(bEl("span", "budget-name", sub.name));
      top.appendChild(bEl("b", "budget-amount", budgetMoney(s.contract)));
      row.appendChild(top);
      row.appendChild(bEl("small", "budget-item-nums", [tr("subApprovedSoFar") + " " + budgetMoney(s.approved),
        tr("subPaid") + " " + budgetMoney(s.paid), tr("subRetentionHeld") + " " + budgetMoney(s.retention)].join(" · ")));
      var pending = subBills(d, sub).filter(function (b) { return b.status !== "approved"; }).length;
      if (pending) row.appendChild(bEl("small", "budget-warn", tr("subPendingBills").replace("{n}", pending)));
      row.addEventListener("click", function () { budget.subId = sub.id; renderBudget(); });
      budgetBody.appendChild(row);
    });
  }
  function subBack(to) {
    var b = bEl("button", "sub-back", "→ " + to);
    b.type = "button";
    return b;
  }

  // ---- one subcontractor: terms, contract lines, bills -------------------------
  function renderSubDetail() {
    var d = budget.data, sub = subOf(d, budget.subId);
    if (!sub) { budget.subId = null; renderBudget(); return; }
    var back = subBack(tr("subAll"));
    back.addEventListener("click", function () { budget.subId = null; renderBudget(); });
    budgetBody.appendChild(back);
    var s = subSummary(d, sub);
    var head = bEl("div", "budget-chapter");
    var h = bEl("div", "budget-chapter-head");
    h.appendChild(bEl("b", "", sub.name));
    var edit = bEl("button", "sub-edit", tr("subEditTerms"));
    edit.type = "button";
    edit.addEventListener("click", function () { subForm(sub); });
    h.appendChild(edit);
    head.appendChild(h);
    [[tr("subContract"), budgetMoney(s.contract)], [tr("subApprovedSoFar"), budgetMoney(s.approved)],
      [tr("subPaid"), budgetMoney(s.paid)], [tr("subRetentionHeld"), budgetMoney(s.retention) + " (" + budgetNum(sub.retentionPct) + "%)"],
      [tr("subAdvanceLeft"), budgetMoney(s.advanceLeft) + (budgetNum(sub.advance) ? " / " + budgetMoney(budgetNum(sub.advance)) : "")]].forEach(function (x) {
      var line = bEl("div", "sub-term");
      line.appendChild(bEl("small", "", x[0]));
      line.appendChild(bEl("b", "", x[1]));
      head.appendChild(line);
    });
    budgetBody.appendChild(head);

    // the contract's lines
    var lines = bEl("section", "budget-chapter");
    var lh = bEl("div", "budget-chapter-head");
    lh.appendChild(bEl("b", "", tr("subLines")));
    var addLine = bEl("button", "sub-edit", tr("subAddLine"));
    addLine.type = "button";
    addLine.addEventListener("click", function () { subLineForm(sub, null); });
    lh.appendChild(addLine);
    lines.appendChild(lh);
    if (!sub.lines.length) lines.appendChild(bEl("p", "team-empty", tr("subNoLines")));
    sub.lines.forEach(function (l) {
      var item = d.items.find(function (i) { return i.id === l.itemId; });
      var row = bEl("div", "budget-item");
      var top = bEl("div", "budget-item-top");
      top.appendChild(bEl("span", "budget-code", item ? item.code || "" : ""));
      top.appendChild(bEl("span", "budget-name", item ? item.name : tr("subItemGone")));
      row.appendChild(top);
      row.appendChild(bEl("small", "budget-item-nums", budgetNum(l.qty) + " " + (item && item.unit || "") + " × " +
        budgetMoney(budgetNum(l.price)) + " = " + budgetMoney(budgetNum(l.qty) * budgetNum(l.price))));
      row.addEventListener("click", function () { subLineForm(sub, l); });
      lines.appendChild(row);
    });
    budgetBody.appendChild(lines);

    // its bills
    var bills = bEl("section", "budget-chapter");
    var bh = bEl("div", "budget-chapter-head");
    bh.appendChild(bEl("b", "", tr("subBills")));
    if (sub.lines.length) {
      var nb = bEl("button", "sub-edit", tr("subNewBill"));
      nb.type = "button";
      nb.addEventListener("click", function () { subNewBill(sub); });
      bh.appendChild(nb);
    }
    bills.appendChild(bh);
    var list = subBills(d, sub);
    if (!list.length) bills.appendChild(bEl("p", "team-empty", tr("subNoBills")));
    list.slice().reverse().forEach(function (b) {
      var c = billCalc(d, sub, b);
      var row = bEl("div", "budget-item");
      var top = bEl("div", "budget-item-top");
      top.appendChild(bEl("span", "budget-name", tr("subBillName").replace("{n}", b.no)));
      top.appendChild(bEl("b", "budget-amount", budgetMoney(c.totals.toPay)));
      row.appendChild(top);
      row.appendChild(bEl("small", b.status === "approved" ? "sub-approved" : "budget-warn",
        isoToDisplay(b.date) + " · " + (b.status === "approved"
          ? tr("subApprovedBy").replace("{who}", teamPersonName(b.approvedBy, "")).replace("{date}", isoToDisplay(String(b.approvedAt || "").slice(0, 10)))
          : tr("subDraft"))));
      row.addEventListener("click", function () { budget.billId = b.id; budget.billDraft = null; renderBudget(); });
      bills.appendChild(row);
    });
    budgetBody.appendChild(bills);
  }

  // ---- a bill ----------------------------------------------------------------
  function subNewBill(sub) {
    var d = budget.data;
    var open = subBills(d, sub).find(function (b) { return b.status !== "approved"; });
    if (open) { budget.billId = open.id; budget.billDraft = null; renderBudget(); return; }
    var bills = subBills(d, sub);
    var bill = { id: uid(), subId: sub.id, no: bills.length ? bills[bills.length - 1].no + 1 : 1, date: todayISO(), status: "draft", lines: {}, note: "" };
    if (sub.id === CLIENT_ID) clientPrefill(d, sub, bill);
    budget.billId = bill.id;
    budget.billDraft = JSON.parse(JSON.stringify(bill));
    budgetChange(budgetUpsert("bills", bill));
  }
  function renderSubBill() {
    var d = budget.data;
    var saved = d.bills.find(function (b) { return b.id === budget.billId; });
    var sub = saved && subOf(d, saved.subId);
    if (!saved || !sub) { budget.billId = null; renderBudget(); return; }
    var locked = saved.status === "approved";
    if (!budget.billDraft || budget.billDraft.id !== saved.id || locked) budget.billDraft = JSON.parse(JSON.stringify(saved));
    var bill = budget.billDraft;
    var isClient = sub.id === CLIENT_ID;
    var back = subBack(sub.name);
    back.addEventListener("click", function () { budget.billId = null; budget.billDraft = null; renderBudget(); });
    budgetBody.appendChild(back);
    var head = bEl("div", "budget-chapter-head sub-bill-head");
    head.appendChild(bEl("b", "", tr("subBillName").replace("{n}", bill.no) + " – " + sub.name));
    head.appendChild(bEl("small", locked ? "sub-approved" : "budget-warn", locked
      ? tr("subApprovedBy").replace("{who}", teamPersonName(bill.approvedBy, "")).replace("{date}", isoToDisplay(String(bill.approvedAt || "").slice(0, 10)))
      : tr("subDraft")));
    budgetBody.appendChild(head);

    var calc = billCalc(d, sub, bill);
    var table = bEl("div", "sub-bill-lines");
    calc.lines.forEach(function (x) {
      var item = d.items.find(function (i) { return i.id === x.line.itemId; });
      var row = bEl("div", "sub-bill-line");
      var top = bEl("div", "budget-item-top");
      top.appendChild(bEl("span", "budget-code", item ? item.code || "" : ""));
      top.appendChild(bEl("span", "budget-name", item ? item.name : tr("subItemGone")));
      row.appendChild(top);
      row.appendChild(bEl("small", "budget-item-nums", tr("subLineInfo").replace("{qty}", budgetNum(x.line.qty))
        .replace("{unit}", item && item.unit || "").replace("{price}", budgetMoney(budgetNum(x.line.price))).replace("{prev}", x.prevCum)));
      var inputs = bEl("div", "sub-bill-inputs");
      [["asked", isClient ? "clientAsked" : "subAsked", x.asked], ["approved", isClient ? "clientApprovedQty" : "subApprovedQty", x.approved]].forEach(function (f) {
        var lab = bEl("label", "");
        lab.appendChild(bEl("small", "", tr(f[1])));
        var inp = bEl("input");
        inp.type = "number";
        inp.step = "any";
        inp.inputMode = "decimal";
        inp.value = f[2];
        inp.disabled = locked;
        inp.setAttribute("data-line", x.line.id);
        inp.setAttribute("data-field", f[0]);
        inp.addEventListener("change", function () {
          var own = bill.lines[x.line.id] = bill.lines[x.line.id] || {};
          own[f[0]] = budgetNum(inp.value);
          // the approved follows what's asked until the engineer sets it
          if (f[0] === "asked" && own.approvedSet !== true) own.approved = own.asked;
          if (f[0] === "approved") own.approvedSet = true;
          renderBudget();
        });
        lab.appendChild(inp);
        inputs.appendChild(lab);
      });
      inputs.appendChild(bEl("b", "sub-bill-cum", budgetMoney(x.cumValue)));
      row.appendChild(inputs);
      // more than the contract, or ahead of the work done on the item
      var warn = [];
      if (budgetNum(x.line.qty) && x.approved > budgetNum(x.line.qty)) warn.push(tr("subOverContract"));
      var pct = budgetNum(x.line.qty) ? x.approved * 100 / budgetNum(x.line.qty) : 0;
      if (item && pct > budgetNum(item.progress) + SUB_AHEAD_MARGIN) {
        warn.push(tr("subAheadOfWork").replace("{pct}", Math.round(pct)).replace("{done}", Math.round(budgetNum(item.progress))));
      }
      if (warn.length) row.appendChild(bEl("small", "budget-warn", "⚠ " + warn.join(" · ")));
      table.appendChild(row);
    });
    budgetBody.appendChild(table);

    var t = calc.totals;
    var sum = bEl("div", "sub-bill-totals");
    [[tr(isClient ? "clientAskedTotal" : "subAskedTotal"), t.asked], [tr("subCumulative"), t.cumulative], [tr("subPrevious"), -t.previous],
      [tr("subThisBill"), t.gross], [tr("subRetention") + " (" + budgetNum(sub.retentionPct) + "%)", -t.retention],
      [tr("subAdvanceRecovery"), -t.advance], [tr(isClient ? "clientToReceive" : "subToPay"), t.toPay]].forEach(function (x, k, all) {
      var line = bEl("div", "sub-total-line" + (k === all.length - 1 ? " final" : ""));
      line.appendChild(bEl("span", "", x[0]));
      line.appendChild(bEl("b", "", budgetMoney(x[1])));
      sum.appendChild(line);
    });
    sum.appendChild(bEl("small", "budget-note", tr("budgetBeforeVat")));
    budgetBody.appendChild(sum);

    if (locked) {
      var actions = [["subPdf", function () { subBillPdf(sub, saved); }, "primary"]];
      var last = subLastApproved(d, sub);
      if (last && last.id === saved.id) actions.push(["subUnapprove", function () { subUnapprove(sub, saved); }]);
      budgetActions(actions);
    } else {
      budgetActions([["subSaveDraft", function () { subSaveDraft(bill); }],
        [isClient ? "clientApprove" : "subApprove", function () { subApprove(sub, bill); }, "primary"]].concat(isClient
        // the bill as handed in, to send the client
        ? [["clientPdfDraft", function () { subBillPdf(sub, bill, true); }],
          ["clientUploadApproved", function () { document.getElementById("clientBillInput").click(); }]] : []).concat([
        ["subDeleteDraft", function () {
          askConfirm(tr("budgetDeleteConfirm"), function () {
            var id = bill.id;
            budget.billId = null;
            budget.billDraft = null;
            budgetChange(budgetRemove("bills", id));
          });
        }]]));
    }
  }
  function subSaveDraft(bill) {
    var rec = JSON.parse(JSON.stringify(bill));
    budgetChange(function (d) {
      var cur = d.bills.find(function (b) { return b.id === rec.id; });
      if (cur && cur.status === "approved") return; // approved meanwhile, elsewhere
      budgetUpsert("bills", rec)(d);
    });
    showToast(tr("subDraftSaved"));
  }
  // approved: locked with its totals, and the period's value into the budget
  function subApprove(sub, bill) {
    var draft = JSON.parse(JSON.stringify(bill));
    var isClient = sub.id === CLIENT_ID;
    askConfirm(tr(isClient ? "clientApproveConfirm" : "subApproveConfirm").replace("{n}", draft.no).replace("{sum}", budgetMoney(billCalc(budget.data, sub, draft).totals.toPay)), function () {
      var who = myPhoneNumber || null, at = new Date().toISOString();
      budgetChange(function (d) {
        var s = subOf(d, sub.id);
        var cur = d.bills.find(function (b) { return b.id === draft.id; });
        if (!s || !cur || cur.status === "approved") return;
        var rec = JSON.parse(JSON.stringify(draft));
        var calc = billCalc(d, s, rec);
        calc.lines.forEach(function (x) { rec.lines[x.line.id] = { asked: x.asked, approved: x.approved }; });
        rec.status = "approved";
        rec.approvedBy = who;
        rec.approvedAt = at;
        rec.totals = calc.totals;
        budgetUpsert("bills", rec)(d);
        // a subcontractor's: its cost into the budget (the client's is income - 11f)
        if (isClient) return;
        calc.lines.forEach(function (x) {
          if (!x.period) return;
          d.expenses.push({ id: rec.id + ":" + x.line.id, date: rec.date, category: "subcontractors", supplier: s.name, supplierCode: s.supplierCode || "",
            invoice: tr("subBillName").replace("{n}", rec.no), itemId: x.line.itemId, amount: Math.round(x.period * 100) / 100,
            note: "", billId: rec.id, by: who, at: Date.now() });
        });
      });
      showToast(tr(isClient ? "clientApprovedMsg" : "subApprovedMsg"));
    });
  }
  // a mistake: the latest approved bill back to a draft, its expenses out of the budget
  function subUnapprove(sub, bill) {
    askConfirm(tr("subUnapproveConfirm").replace("{n}", bill.no), function () {
      budgetChange(function (d) {
        var cur = d.bills.find(function (b) { return b.id === bill.id; });
        if (!cur) return;
        cur.status = "draft";
        delete cur.totals;
        delete cur.approvedBy;
        delete cur.approvedAt;
        d.expenses = d.expenses.filter(function (e) { return e.billId !== bill.id; });
      });
    });
  }

  // ---- the forms: a subcontractor's terms, a contract line ---------------------
  function subForm(sub) {
    var s = sub || {};
    budgetForm(tr(sub ? "subEditTerms" : "subAdd"), [
      { key: "name", label: tr("subName"), value: s.name },
      { key: "phone", label: tr("teamPhonePh"), value: s.phone, type: "tel" },
      { key: "supplierCode", label: tr("budgetSupplierCode"), value: s.supplierCode },
      { key: "retentionPct", label: tr("subRetentionPct"), value: s.retentionPct, type: "number" },
      { key: "advance", label: tr("subAdvanceField"), value: s.advance, type: "number" },
      { key: "advanceRecoveryPct", label: tr("subAdvanceRecoveryPct"), value: s.advanceRecoveryPct, type: "number" }
    ], function (v) {
      if (!v.name) { alert(tr("subNeedName")); return false; }
      var rec = Object.assign({ lines: [] }, s, {
        id: s.id || uid(), name: v.name, phone: v.phone, supplierCode: v.supplierCode,
        retentionPct: Math.max(0, Math.min(100, budgetNum(v.retentionPct))), advance: budgetNum(v.advance),
        advanceRecoveryPct: Math.max(0, Math.min(100, budgetNum(v.advanceRecoveryPct)))
      });
      if (!sub) budget.subId = rec.id;
      budgetChange(function (d) {
        var cur = subOf(d, rec.id);
        budgetUpsert("subcontracts", Object.assign({}, rec, { lines: cur ? cur.lines : rec.lines }))(d);
      });
    }, sub && !budget.data.bills.some(function (b) { return b.subId === sub.id; }) ? function () {
      budget.subId = null;
      budgetChange(budgetRemove("subcontracts", sub.id));
    } : null);
  }
  function subLineForm(sub, line) {
    var d = budget.data;
    if (!d.items.length) { alert(tr("subNeedItems")); return; }
    var l = line || {};
    var items = d.items.slice().sort(function (a, b) {
      return String(a.code || "").localeCompare(String(b.code || ""), undefined, { numeric: true });
    });
    budgetForm(tr(line ? "subEditLine" : "subAddLine"), [
      { key: "itemId", label: tr("budgetItemField"), value: l.itemId || items[0].id,
        options: items.map(function (i) { return [i.id, budgetItemLabel(i)]; }) },
      { key: "qty", label: tr("subLineQty"), value: l.qty, type: "number" },
      { key: "price", label: tr("subLinePrice"), value: l.price, type: "number" }
    ], function (v) {
      var item = d.items.find(function (i) { return i.id === v.itemId; });
      var rec = { id: l.id || uid(), itemId: v.itemId, qty: v.qty === "" && item ? budgetNum(item.qty) : budgetNum(v.qty), price: budgetNum(v.price) };
      budgetChange(function (dd) {
        var s = subOf(dd, sub.id);
        if (!s) return;
        var i = s.lines.findIndex(function (x) { return x.id === rec.id; });
        if (i >= 0) s.lines[i] = rec; else s.lines.push(rec);
      });
    }, line && !d.bills.some(function (b) { return b.subId === sub.id && b.lines[line.id]; }) ? function () {
      budgetChange(function (dd) {
        var s = subOf(dd, sub.id);
        if (s) s.lines = s.lines.filter(function (x) { return x.id !== line.id; });
      });
    } : null);
  }

  // ---- the approved bill as a PDF ------------------------------------------------
  // asAsked: a draft, at the quantities handed in (the client's bill, to send them)
  function subBillPdf(sub, bill, asAsked) {
    var d = budget.data;
    if (asAsked) {
      bill = JSON.parse(JSON.stringify(bill));
      billCalc(d, sub, bill).lines.forEach(function (x) { bill.lines[x.line.id] = { asked: x.asked, approved: x.asked }; });
    }
    var calc = billCalc(d, sub, bill), t = calc.totals;
    var doc = bEl("div", "pdf-doc");
    doc.dir = RTL_LANGS[currentLang] ? "rtl" : "ltr";
    doc.appendChild(buildPdfDocTitleElement(budget.sheet, budget.sheet.name));
    doc.appendChild(bEl("div", "pdf-doc-info-title", tr("subBillName").replace("{n}", bill.no) + " – " + sub.name));
    doc.appendChild(bEl("div", "pdf-doc-info-date", isoToFullDisplay(bill.date)));
    var table = bEl("table", "pdf-doc-table");
    var head = bEl("tr");
    ["budgetCode", "budgetName", "budgetUnit", "subLineQty", "subLinePrice", "subPrevCumQty", "subApprovedQty", "subCumulative", "subThisBill"].forEach(function (k) {
      head.appendChild(bEl("th", "", tr(k)));
    });
    var thead = bEl("thead");
    thead.appendChild(head);
    table.appendChild(thead);
    var tbody = bEl("tbody");
    calc.lines.forEach(function (x) {
      var item = d.items.find(function (i) { return i.id === x.line.itemId; }) || {};
      var tr_ = bEl("tr");
      [item.code || "", item.name || "", item.unit || "", budgetNum(x.line.qty), budgetMoney(budgetNum(x.line.price)), x.prevCum, x.approved,
        budgetMoney(x.cumValue), budgetMoney(x.period)].forEach(function (v) { tr_.appendChild(bEl("td", "", String(v))); });
      tbody.appendChild(tr_);
    });
    table.appendChild(tbody);
    doc.appendChild(table);
    var sums = bEl("table", "pdf-doc-table sub-pdf-totals");
    [[tr("subCumulative"), t.cumulative], [tr("subPrevious"), -t.previous], [tr("subThisBill"), t.gross],
      [tr("subRetention") + " (" + budgetNum(sub.retentionPct) + "%)", -t.retention], [tr("subAdvanceRecovery"), -t.advance],
      [tr(sub.id === CLIENT_ID ? "clientToReceive" : "subToPay"), t.toPay]].forEach(function (x) {
      var r = bEl("tr");
      r.appendChild(bEl("td", "", x[0]));
      r.appendChild(bEl("td", "", budgetMoney(x[1])));
      sums.appendChild(r);
    });
    doc.appendChild(sums);
    doc.appendChild(bEl("div", "pdf-doc-info-date", tr("budgetBeforeVat") + (bill.status === "approved" ? " · " +
      tr("subApprovedBy").replace("{who}", teamPersonName(bill.approvedBy, "")).replace("{date}", isoToDisplay(String(bill.approvedAt || "").slice(0, 10))) : "")));
    var fileName = tr("subBillName").replace("{n}", bill.no) + " " + sub.name + " " + budget.sheet.name + ".pdf";
    showToast(tr("workPlanPdfMsg"));
    buildPdfBlobFromElement(doc, fileName).then(function (r) {
      attemptShare(r.blob, r.fileName, "application/pdf");
    }, function () { alert(tr("teamSaveError")); });
  }
