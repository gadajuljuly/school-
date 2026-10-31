
  // ---------------------------------------------------------------------
  // The client (המזמין), in the budget control: the income side. Its
  // partial bills are the subcontractors' kind (11d-subcontract-bills.js),
  // of a stand-in "client" whose contract is every BOQ item at its price to
  // the client - with retention and an advance, if the client holds them.
  // A new bill comes filled in from each item's % done; "approved" is what
  // the client's supervisor approved. Money that came in is kept as
  // receipts. Kept in project_finance.data as
  //   client:   { retentionPct, advance, advanceRecoveryPct }
  //   bills:    the client's bills among the others, subId "client"
  //   receipts: [{ id, date, amount, billId, note, by, at }]
  // Amounts before VAT.
  // ---------------------------------------------------------------------
  var CLIENT_ID = "client";

  function clientSub(d) {
    var c = d.client || {};
    return {
      id: CLIENT_ID, name: tr("clientName"), retentionPct: c.retentionPct, advance: c.advance, advanceRecoveryPct: c.advanceRecoveryPct,
      lines: d.items.map(function (i) { return { id: i.id, itemId: i.id, qty: i.qty, price: i.price }; })
    };
  }
  // a new client bill: each item at its % done (never below what's been approved before)
  function clientPrefill(d, sub, bill) {
    var prev = subLastApproved(d, sub, bill.no);
    d.items.forEach(function (i) {
      var done = Math.round(budgetNum(i.qty) * Math.min(100, budgetNum(i.progress))) / 100;
      var before = prev && prev.lines[i.id] ? budgetNum(prev.lines[i.id].approved) : 0;
      bill.lines[i.id] = { asked: Math.max(done, before) };
    });
  }
  function clientSummary(d) {
    var sub = clientSub(d), s = subSummary(d, sub);
    var received = d.receipts.reduce(function (sum, r) { return sum + budgetNum(r.amount); }, 0);
    return { approved: s.approved, due: s.paid, retention: s.retention, advanceLeft: s.advanceLeft, received: received, open: s.paid - received };
  }

  function renderBudgetClient() {
    var d = budget.data;
    if (budget.billId) { renderSubBill(); return; }
    var sub = clientSub(d), s = clientSummary(d);
    var head = bEl("div", "budget-chapter");
    var h = bEl("div", "budget-chapter-head");
    h.appendChild(bEl("b", "", tr("clientName")));
    var edit = bEl("button", "sub-edit", tr("clientTerms"));
    edit.type = "button";
    edit.addEventListener("click", clientTermsForm);
    h.appendChild(edit);
    head.appendChild(h);
    [[tr("budgetContract"), budgetMoney(subContractValue(sub))], [tr("clientApprovedSoFar"), budgetMoney(s.approved)],
      [tr("clientDue"), budgetMoney(s.due)], [tr("clientReceived"), budgetMoney(s.received)],
      [tr("clientOpen"), budgetMoney(s.open)],
      [tr("clientRetentionHeld"), budgetMoney(s.retention) + " (" + budgetNum(sub.retentionPct) + "%)"]].forEach(function (x) {
      var line = bEl("div", "sub-term");
      line.appendChild(bEl("small", "", x[0]));
      line.appendChild(bEl("b", "", x[1]));
      head.appendChild(line);
    });
    budgetBody.appendChild(head);

    // bills
    var bills = bEl("section", "budget-chapter");
    var bh = bEl("div", "budget-chapter-head");
    bh.appendChild(bEl("b", "", tr("clientBills")));
    if (d.items.length) {
      var nb = bEl("button", "sub-edit", tr("subNewBill"));
      nb.type = "button";
      nb.addEventListener("click", function () { subNewBill(sub); });
      bh.appendChild(nb);
    }
    bills.appendChild(bh);
    var list = subBills(d, sub);
    if (!d.items.length) bills.appendChild(bEl("p", "team-empty", tr("subNeedItems")));
    else if (!list.length) bills.appendChild(bEl("p", "team-empty", tr("subNoBills")));
    list.slice().reverse().forEach(function (b) {
      var c = billCalc(d, sub, b);
      var row = bEl("div", "budget-item");
      var top = bEl("div", "budget-item-top");
      top.appendChild(bEl("span", "budget-name", tr("subBillName").replace("{n}", b.no)));
      top.appendChild(bEl("b", "budget-amount", budgetMoney(c.totals.toPay)));
      row.appendChild(top);
      row.appendChild(bEl("small", b.status === "approved" ? "sub-approved" : "budget-warn",
        isoToDisplay(b.date) + " · " + tr(b.status === "approved" ? "clientBillApproved" : "clientBillDraft")));
      row.addEventListener("click", function () { budget.billId = b.id; budget.billDraft = null; renderBudget(); });
      bills.appendChild(row);
    });
    budgetBody.appendChild(bills);

    // money that came in
    var rec = bEl("section", "budget-chapter");
    var rh = bEl("div", "budget-chapter-head");
    rh.appendChild(bEl("b", "", tr("clientReceipts")));
    var nr = bEl("button", "sub-edit", tr("clientAddReceipt"));
    nr.type = "button";
    nr.addEventListener("click", function () { clientReceiptForm(null); });
    rh.appendChild(nr);
    rec.appendChild(rh);
    if (!d.receipts.length) rec.appendChild(bEl("p", "team-empty", tr("clientNoReceipts")));
    d.receipts.slice().sort(function (a, b) { return String(b.date).localeCompare(String(a.date)); }).forEach(function (r) {
      var bill = d.bills.find(function (b) { return b.id === r.billId; });
      var row = bEl("div", "budget-item");
      var top = bEl("div", "budget-item-top");
      top.appendChild(bEl("span", "budget-name", isoToDisplay(r.date)));
      top.appendChild(bEl("b", "budget-amount", budgetMoney(budgetNum(r.amount))));
      row.appendChild(top);
      var sub2 = [bill ? tr("subBillName").replace("{n}", bill.no) : "", r.note || ""].filter(Boolean).join(" · ");
      if (sub2) row.appendChild(bEl("small", "budget-item-nums", sub2));
      row.addEventListener("click", function () { clientReceiptForm(r); });
      rec.appendChild(row);
    });
    budgetBody.appendChild(rec);
  }

  function clientTermsForm() {
    var c = budget.data.client || {};
    budgetForm(tr("clientTerms"), [
      { key: "retentionPct", label: tr("clientRetentionPct"), value: c.retentionPct, type: "number" },
      { key: "advance", label: tr("clientAdvanceField"), value: c.advance, type: "number" },
      { key: "advanceRecoveryPct", label: tr("subAdvanceRecoveryPct"), value: c.advanceRecoveryPct, type: "number" }
    ], function (v) {
      var terms = {
        retentionPct: Math.max(0, Math.min(100, budgetNum(v.retentionPct))), advance: budgetNum(v.advance),
        advanceRecoveryPct: Math.max(0, Math.min(100, budgetNum(v.advanceRecoveryPct)))
      };
      budgetChange(function (d) { d.client = terms; });
    }, null);
  }
  function clientReceiptForm(receipt) {
    var d = budget.data, r = receipt || { date: todayISO() };
    var approved = subBills(d, clientSub(d)).filter(function (b) { return b.status === "approved"; });
    budgetForm(tr(receipt ? "clientEditReceipt" : "clientAddReceipt"), [
      { key: "date", label: tr("shareTaskDate"), value: r.date, type: "date" },
      { key: "amount", label: tr("budgetAmount"), value: r.amount, type: "number" },
      { key: "billId", label: tr("clientForBill"), value: r.billId || "",
        options: [["", "—"]].concat(approved.map(function (b) { return [b.id, tr("subBillName").replace("{n}", b.no)]; })) },
      { key: "note", label: tr("budgetNote"), value: r.note }
    ], function (v) {
      if (!budgetNum(v.amount)) { alert(tr("budgetNeedAmount")); return false; }
      var rec = Object.assign({}, r, {
        id: r.id || uid(), date: v.date || todayISO(), amount: budgetNum(v.amount), billId: v.billId || null, note: v.note,
        by: r.by || myPhoneNumber || null, at: r.at || Date.now()
      });
      budgetChange(budgetUpsert("receipts", rec));
    }, receipt ? function () { budgetChange(budgetRemove("receipts", receipt.id)); } : null);
  }
