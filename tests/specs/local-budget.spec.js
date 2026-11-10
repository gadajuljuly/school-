const path = require("path");
const { test, expect } = require("@playwright/test");
const { openWithSharedProject } = require("./helpers/local-app");

// בקרה תקציבית: a project's BOQ items (uploaded from Excel / CSV, or added
// by hand), expenses against them, and budget vs. actual - kept in
// project_finance (the fake server here; its RLS is tested in
// supabase/tests/rls_team_finance.sql).
test.use({ viewport: { width: 390, height: 800 }, serviceWorkers: "block" });

const ME = "+972500000001";
const SHEET = { id: "p1", name: "בניין A", members: [ME], tasks: [] };
const finance = (page) => page.evaluate(() => (window.__backend.tables.project_finance || [])[0] || null);

async function openBudget(page) {
  await openWithSharedProject(page, { phone: ME, native: true, sheet: SHEET });
  await page.locator("#calendarFabBtn").click();
  await page.locator("#siteLogBudgetBtn").click();
  await expect(page.locator("#budgetView")).toBeVisible();
}
async function fill(page, values) {
  for (const [name, value] of Object.entries(values)) {
    const el = page.locator(`#budgetFormFields [name=${name}]`);
    if (await el.evaluate((e) => e.tagName) === "SELECT") await el.selectOption({ label: value });
    else await el.fill(String(value));
  }
  await page.locator("#budgetForm button[type=submit]").click();
}

test("a BOQ uploaded from Excel: its chapters and items, saved for the project", async ({ page }) => {
  await openBudget(page);
  await expect(page.locator("#budgetBody")).toContainText("עדיין אין סעיפים");
  await page.locator("#budgetCsvInput").setInputFiles(path.join(__dirname, "../fixtures/boq.xlsx"));
  await expect(page.locator("#confirmOverlay")).toContainText("נמצאו 3 סעיפים");
  await page.locator("#confirmYesBtn").click();
  const chapters = page.locator(".budget-chapter");
  await expect(chapters).toHaveCount(2);
  // the table: a section per chapter - its number and name in the title row
  await expect(chapters.first().locator("tr.boq-ch .boq-code")).toHaveText("01");
  await expect(chapters.first().locator("tr.boq-ch .boq-desc")).toHaveText("עבודות עפר");
  await expect(chapters.first().locator(".budget-item")).toHaveCount(2);
  await expect(chapters.first().locator(".budget-item").first()).toContainText("חפירה כללית");
  await expect(chapters.first().locator(".budget-item").first().locator("td.boq-contract-total")).toHaveText("5,400"); // the contract
  await expect(chapters.first().locator("tr.boq-sub")).toContainText("10,200"); // the chapter's total
  // the contract: 5,400 + 4,800 + 42,000
  await expect(page.locator(".budget-card").first()).toContainText("52,200 ₪");
  await expect.poll(async () => (await finance(page))?.data.items.map((i) => [i.code, i.chapter, i.qty, i.price]))
    .toEqual([["01.010", "01 עבודות עפר", 120, 45], ["01.020", "01 עבודות עפר", 80, 60], ["02.010", "02 עבודות בטון", 35, 1200]]);
  expect((await finance(page)).owner_phone).toBe(ME);
  expect((await finance(page)).project_id).toBe("p1");

  // ...and a CSV too, with its cost budget
  await page.locator("#budgetCsvInput").setInputFiles(path.join(__dirname, "../fixtures/boq.csv"));
  await page.locator("#confirmYesBtn").click();
  await expect(page.locator(".budget-chapter").filter({ has: page.locator("tr.boq-ch .boq-code", { hasText: "03" }) })).toContainText("טיח פנים");
  await expect.poll(async () => (await finance(page)).data.items.find((i) => i.code === "03.010")).toMatchObject({ unit: 'מ"ר', qty: 500, price: 70, cost: 28000 });
});

test("an item added by hand; expenses against it; spending ahead of the work shows as an overrun", async ({ page }) => {
  await openBudget(page);
  await page.locator(".budget-actions button", { hasText: "＋ סעיף" }).click();
  // the work done is typed as a quantity: 40 of the 200 m = 20%
  await fill(page, { code: "04.010", chapter: "חשמל", name: "תשתית חשמל", unit: "מ'", qty: 200, price: 300, actualPrice: 210, cost: 40000, doneQty: 40 });
  const item = page.locator(".budget-item", { hasText: "תשתית חשמל" });
  await expect(item.locator("td.boq-contract-total")).toHaveText("60,000");
  // the work done at the contract price: 40 x 300
  await expect(item.locator("td.boq-strong").first()).toHaveText("12,000");
  // contract and actual side by side, the actual ones in red: 40 m done at 210 = 8,400
  await expect(item.locator("td.boq-pct").first()).toContainText("40");
  await expect(item.locator("td.boq-actual")).toHaveText(["40", "210", "8,400", "0"]);
  await expect(item.locator("td.boq-actual").nth(2)).toHaveCSS("color", "rgb(198, 40, 40)");
  await expect(page.locator(".boq-total td.boq-actual").first()).toHaveText("8,400");
  await expect.poll(async () => (await finance(page))?.data.items[0]).toMatchObject({ doneQty: 40, progress: 20, actualPrice: 210 });

  // an expense: 20,000 on it - half the budget used for 20% of the work
  await page.locator(".budget-tabs button", { hasText: "הוצאות" }).click();
  await page.locator(".budget-actions button", { hasText: "＋ הוצאה" }).click();
  await fill(page, { supplier: "חשמל בע\"מ", invoice: "1234", itemId: "04.010 תשתית חשמל", amount: 20000 });
  await expect(page.locator(".budget-expense")).toContainText("חשבונית 1234");
  await expect.poll(async () => (await finance(page))?.data.expenses.map((e) => [e.supplier, e.invoice, e.amount])).toEqual([["חשמל בע\"מ", "1234", 20000]]);

  await page.locator(".budget-tabs button", { hasText: "סעיפי כתב הכמויות" }).click();
  await expect(item).toHaveClass(/over/);
  await expect(item.locator("td.boq-pct").nth(1)).toContainText("50% ⚠");
  // at this pace: 20,000 for 20% -> 100,000; 60,000 over
  await expect(item).toContainText("עלות צפויה 100,000 ₪, חריגה של 60,000 ₪");
  await expect(page.locator(".budget-card", { hasText: "רווח צפוי" })).toContainText("-40,000 ₪");

  // the work catches up: 60% done -> no overrun
  await item.click();
  await expect(page.locator("#budgetFormFields label", { hasText: "כמות בפועל (מ')" })).toBeVisible();
  await expect(page.locator("#budgetFormFields [name=doneQty]")).toHaveValue("40");
  await fill(page, { doneQty: 120 });
  await expect(item).not.toHaveClass(/over/);
  await expect(item.locator("td.boq-pct").first()).toContainText("120");
  await expect.poll(async () => (await finance(page)).data.items[0].progress).toBe(60);

  // removed
  await item.click();
  await page.locator("#budgetFormDeleteBtn").click();
  await page.locator("#confirmYesBtn").click();
  await expect(item).toHaveCount(0);
  await expect.poll(async () => (await finance(page)).data.items.length).toBe(0);
});

test("someone else wrote meanwhile: the change goes onto their copy, nothing of theirs is lost", async ({ page }) => {
  await openBudget(page);
  await page.locator(".budget-actions button", { hasText: "＋ סעיף" }).click();
  await fill(page, { code: "01", name: "ראשון", qty: 1, price: 100 });
  await expect.poll(async () => (await finance(page))?.data.items.length).toBe(1);
  // an engineer, elsewhere, adds an item
  await page.evaluate(() => {
    const row = window.__backend.tables.project_finance[0];
    row.data.items.push({ id: "other", code: "02", name: "של המהנדס", qty: 1, price: 50 });
    row.data_version++;
  });
  await page.locator(".budget-actions button", { hasText: "＋ סעיף" }).click();
  await fill(page, { code: "03", name: "שלישי", qty: 1, price: 10 });
  await expect.poll(async () => (await finance(page)).data.items.map((i) => i.code).sort()).toEqual(["01", "02", "03"]);
  await expect(page.locator(".budget-item", { hasText: "של המהנדס" })).toBeVisible();
});

const SEEDED = {
  items: [
    { id: "i1", code: "01.010", chapter: "01 עפר", name: "חפירה", unit: "מ\"ק", qty: 100, price: 50, cost: 3500, progress: 60 },
    { id: "i2", code: "02.010", chapter: "02 בטון", name: "יסודות", unit: "מ\"ק", qty: 10, price: 1000, cost: 8000, progress: 20 },
  ], expenses: [],
};
async function openSeeded(page) {
  await openWithSharedProject(page, { phone: ME, native: true, sheet: SHEET });
  await page.evaluate((data) => { window.__backend.tables.project_finance = [{ owner_phone: "+972500000001", project_id: "p1", data_version: 1, data }]; }, SEEDED);
  await page.locator("#calendarFabBtn").click();
  await page.locator("#siteLogBudgetBtn").click();
  await expect(page.locator(".budget-item")).toHaveCount(2);
}
async function setQty(page, field, value) {
  const input = page.locator(`.sub-bill-line input[data-field=${field}]`).first();
  await input.fill(String(value));
  await input.dispatchEvent("change");
}
const totals = (page) => page.locator(".sub-bill-totals");

test("a subcontractor's partial bills: cumulative quantities, less previous bills, retention and the advance; approved -> in the budget; undone", async ({ page }) => {
  await openSeeded(page);
  await page.locator(".budget-tabs button", { hasText: "קבלני משנה" }).click();
  await page.locator(".budget-actions button", { hasText: "＋ קבלן משנה" }).click();
  await fill(page, { name: "עפר בע\"מ", retentionPct: 5, advance: 1000, advanceRecoveryPct: 20 });
  // its contract: the excavation, at its own price
  await page.locator(".sub-edit", { hasText: "＋ סעיף לחוזה" }).click();
  await fill(page, { itemId: "01.010 חפירה", qty: 100, price: 30 });
  await expect(page.locator(".budget-chapter", { hasText: "סעיפי החוזה" })).toContainText("100 מ\"ק × 30 ₪ = 3,000 ₪");

  // bill 1: 50 asked and approved
  await page.locator(".sub-edit", { hasText: "＋ חשבון חדש" }).click();
  await setQty(page, "asked", 50);
  await expect(page.locator(".sub-bill-line input[data-field=approved]")).toHaveValue("50");
  await expect(totals(page)).toContainText("בחשבון זה1,500 ₪");
  await expect(totals(page)).toContainText(/פחות עיכבון \(5%\)\u200e?-75 ₪/);
  await expect(totals(page)).toContainText(/פחות קיזוז מקדמה\u200e?-300 ₪/);
  await expect(totals(page)).toContainText("לתשלום1,125 ₪");
  await page.locator(".budget-actions button", { hasText: "אישור החשבון" }).click();
  await expect(page.locator("#confirmOverlay")).toContainText("1,125 ₪");
  await page.locator("#confirmYesBtn").click();
  await expect(page.locator(".sub-bill-head")).toContainText("✓ אושר");
  await expect(page.locator(".sub-bill-line input").first()).toBeDisabled();
  const server = () => page.evaluate(() => window.__backend.tables.project_finance[0].data);
  await expect.poll(async () => (await server()).expenses.map((e) => [e.category, e.itemId, e.amount, e.invoice])).toEqual([["subcontractors", "i1", 1500, "חשבון חלקי 1"]]);

  // bill 2: asked 80, approved 70 - only the difference this time
  await page.locator(".sub-back").click();
  await page.locator(".sub-edit", { hasText: "＋ חשבון חדש" }).click();
  await expect(page.locator(".sub-bill-line")).toContainText("מצטבר קודם: 50");
  await setQty(page, "asked", 80);
  await setQty(page, "approved", 70);
  await expect(page.locator(".sub-bill-line input[data-field=asked]")).toHaveValue("80");
  await expect(totals(page)).toContainText("הקבלן ביקש (מצטבר)2,400 ₪");
  await expect(totals(page)).toContainText("מצטבר מאושר2,100 ₪");
  await expect(totals(page)).toContainText("לתשלום450 ₪"); // 600 - 30 - 120
  // a quantity ahead of the work done on the item (60%) is flagged
  await setQty(page, "approved", 75);
  await expect(page.locator(".sub-bill-line")).toContainText("75% מאושר, אבל הסעיף בוצע רק 60%");
  await setQty(page, "approved", 70);
  await page.locator(".budget-actions button", { hasText: "אישור החשבון" }).click();
  await page.locator("#confirmYesBtn").click();
  await expect.poll(async () => (await server()).expenses.reduce((s, e) => s + e.amount, 0)).toBe(2100);

  // the subcontractor's page: approved to date, payable, retention, advance left
  await page.locator(".sub-back").click();
  const head = page.locator(".budget-chapter").first();
  await expect(head).toContainText("2,100 ₪");
  await expect(head).toContainText("1,575 ₪");
  await expect(head).toContainText("105 ₪ (5%)");
  await expect(head).toContainText("580 ₪ / 1,000 ₪");

  // the latest one, approved by mistake: back to a draft, out of the budget
  await page.locator(".budget-item", { hasText: "חשבון חלקי 2" }).click();
  await page.locator(".budget-actions button", { hasText: "ביטול אישור" }).click();
  await page.locator("#confirmYesBtn").click();
  await expect(page.locator(".sub-bill-head")).toContainText("טיוטה");
  await expect.poll(async () => (await server()).expenses.map((e) => e.amount)).toEqual([1500]);

  // the expenses tab: the bill's expense is there, by type
  await page.locator(".budget-tabs button", { hasText: "הוצאות" }).click();
  await expect(page.locator(".budget-expense")).toContainText("קבלני משנה");
  await expect(page.locator(".budget-cat", { hasText: "קבלני משנה" })).toContainText("1,500 ₪");
});

test("expense types: insurance / overheads with a general budget of their own, counted in the project's cost", async ({ page }) => {
  await openSeeded(page);
  await page.locator(".budget-tabs button", { hasText: "הוצאות" }).click();
  // the insurance budget for the project
  await page.locator(".budget-cat", { hasText: "ביטוחים" }).click();
  await fill(page, { amount: 2000 });
  await expect(page.locator(".budget-card", { hasText: "תקציב עלות" })).toContainText("13,500 ₪"); // 3,500 + 8,000 + 2,000
  // an insurance policy, on no item
  await page.locator(".budget-actions button", { hasText: "＋ הוצאה" }).click();
  await fill(page, { category: "ביטוחים", supplier: "הראל", amount: 2500 });
  const ins = page.locator(".budget-cat", { hasText: "ביטוחים" });
  await expect(ins).toContainText("כללי (לא משויך לסעיף): 2,500 ₪ מתוך 2,000 ₪");
  await expect(ins).toHaveClass(/over/);
  await expect(page.locator(".budget-expense", { hasText: "הראל" })).toContainText("ביטוחים");
  await expect.poll(() => page.evaluate(() => window.__backend.tables.project_finance[0].data.expenses.map((e) => [e.category, e.amount]))).toEqual([["insurance", 2500]]);
  // materials on an item
  await page.locator(".budget-actions button", { hasText: "＋ הוצאה" }).click();
  await fill(page, { category: "חומרים", supplier: "בטון הצפון", itemId: "02.010 יסודות", amount: 1000 });
  await expect(page.locator(".budget-cat", { hasText: "חומרים" })).toContainText("1,000 ₪");
});

const REPORT_DATA = {
  items: [
    { id: "i1", code: "01.010", chapter: "01 עפר", name: "חפירה", unit: "מ\"ק", qty: 100, price: 50, cost: 3000, progress: 50 },
    { id: "i2", code: "02.010", chapter: "02 בטון", name: "יסודות", unit: "מ\"ק", qty: 10, price: 1000, cost: 8000, progress: 20 },
  ],
  generalBudget: { insurance: 1000 },
  expenses: [
    { id: "e1", date: "2026-09-10", category: "materials", supplier: "בטון הצפון", itemId: "i2", amount: 2000 },
    { id: "e2", date: "2026-10-05", category: "labor", supplier: "פועלים", itemId: "i1", amount: 700 },
    { id: "e3", date: "2026-10-06", category: "materials", supplier: "בטון הצפון", itemId: "i2", amount: 500 },
    { id: "e4", date: "2026-10-07", category: "insurance", supplier: "הראל", amount: 900 },
    { id: "b1:l1", date: "2026-10-08", category: "subcontractors", supplier: "עפר בע\"מ", invoice: "חשבון חלקי 1", itemId: "i1", amount: 1500, billId: "b1" },
  ],
  subcontracts: [{ id: "s1", name: "עפר בע\"מ", retentionPct: 5, advance: 0, advanceRecoveryPct: 0, lines: [{ id: "l1", itemId: "i1", qty: 100, price: 30 }] }],
  bills: [{ id: "b1", subId: "s1", no: 1, date: "2026-10-08", status: "approved", approvedBy: ME, approvedAt: "2026-10-08T10:00:00Z",
    lines: { l1: { asked: 50, approved: 50 } }, totals: { asked: 1500, cumulative: 1500, previous: 0, gross: 1500, retention: 75, advance: 0, toPay: 1425 } }],
};
async function openReports(page) {
  // in a browser (not the phone app) the files download, so their text can be read
  await openWithSharedProject(page, { phone: ME, sheet: SHEET });
  await page.evaluate((data) => { window.__backend.tables.project_finance = [{ owner_phone: "+972500000001", project_id: "p1", data_version: 1, data }]; }, REPORT_DATA);
  await page.locator("#calendarFabBtn").click();
  await page.locator("#siteLogBudgetBtn").click();
  await expect(page.locator(".budget-item")).toHaveCount(2);
  await page.locator(".budget-reports-btn", { hasText: "דוחות" }).click();
  await expect(page.locator("#budgetReportOverlay")).toBeVisible();
}
async function excel(page) {
  const [download] = await Promise.all([page.waitForEvent("download"), page.locator("#brExcelBtn").click()]);
  const fs = require("fs");
  return { name: download.suggestedFilename(), text: fs.readFileSync(await download.path(), "utf8").replace(/^﻿/, "") };
}

test("reports: profit and loss - contract, work done, costs by type and chapter, the forecast", async ({ page }) => {
  await openReports(page);
  const { text } = await excel(page);
  expect(text.split("\r\n")[0]).toContain("רווח והפסד – בניין A");
  // earned: 5,000 x 50% + 10,000 x 20% = 4,500; spent 5,600 -> -1,100
  expect(text).toContain("ערך מה שבוצע,\"4,500 ₪\"");
  expect(text).toContain("הוצאות בפועל,\"5,600 ₪\"");
  expect(text).toMatch(/רווח לפי ביצוע,"‎?-1,100 ₪/);
  expect(text).toContain("קבלני משנה,\"1,500 ₪\",26.8%");
  expect(text).toContain("01 עפר,\"5,000 ₪\",\"2,500 ₪\",\"3,000 ₪\",\"2,200 ₪\",300 ₪");
  expect(text).toContain("ביטוחים,\"1,000 ₪\",900 ₪,100 ₪");
});

test("reports: expenses of the types picked, in a period, grouped by supplier; subcontractors' bills", async ({ page }) => {
  await openReports(page);
  await page.locator("input[name=brKind][value=expenses]").check();
  // materials and labor only, October, by supplier
  for (const t of ["קבלני משנה", "כלים מושכרים", "תקורות", "ביטוחים", "אחר"]) {
    await page.locator("#brTypes label", { hasText: t }).locator("input").uncheck();
  }
  await page.locator("#brPeriod").selectOption("custom");
  await page.locator("#brFrom").fill("2026-10-01");
  await page.locator("#brTo").fill("2026-10-31");
  await page.locator("#brGroupBy").selectOption("supplier");
  const { text } = await excel(page);
  expect(text.split("\r\n")[0]).toContain("דוח הוצאות – חומרים, כוח אדם (פועלים)");
  expect(text).toContain("01/10/2026 – 31/10/2026");
  expect(text).toContain("בטון הצפון,500 ₪");   // September's 2,000 is out of the period
  expect(text).toContain("פועלים,700 ₪");
  expect(text).toContain("\"סה\"\"כ\",\"1,200 ₪\",100%");
  expect(text).not.toContain("הראל");

  // the subcontractors' report
  await page.locator(".budget-reports-btn", { hasText: "דוחות" }).click();
  await page.locator("input[name=brKind][value=subs]").check();
  const subs = await excel(page);
  expect(subs.text).toContain("\"עפר בע\"\"מ\",\"3,000 ₪\",\"1,500 ₪\",\"1,500 ₪\",\"1,425 ₪\",75 ₪");
  expect(subs.text).toContain("1,08/10/2026,\"1,500 ₪\",\"1,500 ₪\",75 ₪,0 ₪,\"1,425 ₪\"");
});

for (const [file, what] of [["boq.pdf", "a PDF"], ["boq-visual.pdf", "a PDF whose Hebrew is stored backwards (display order)"]]) {
  test(`a BOQ uploaded from ${what}: its lines and columns rebuilt into chapters and items`, async ({ page }) => {
    await openBudget(page);
    await page.locator("#budgetCsvInput").setInputFiles(path.join(__dirname, "../fixtures/" + file));
    await expect(page.locator("#confirmOverlay")).toContainText("נמצאו 3 סעיפים", { timeout: 15000 });
    await page.locator("#confirmYesBtn").click();
    await expect.poll(async () => (await finance(page))?.data.items.map((i) => [i.code, i.chapter, i.name, i.unit, i.qty, i.price]))
      .toEqual([
        ["01.010", "01 עבודות עפר", "חפירה כללית", "מ\"ק", 120, 45],
        ["01.020", "01 עבודות עפר", "מילוי מהודק", "מ\"ק", 80, 60],
        ["02.010", "02 עבודות בטון", "יסודות", "מ\"ק", 35, 1200],
      ]);
    await expect(page.locator(".budget-card").first()).toContainText("52,200 ₪");
  });
}

test("the client: bills filled in from the % done, approved by the client with retention, payments received; cash flow", async ({ page }) => {
  await openSeeded(page); // i1: 100 x 50, 60% done; i2: 10 x 1,000, 20% done
  await page.locator(".budget-tabs button", { hasText: "מזמין" }).click();
  await page.locator(".sub-edit", { hasText: "עיכבון ומקדמה" }).click();
  await fill(page, { retentionPct: 5 });
  await page.locator(".sub-edit", { hasText: "＋ חשבון חדש" }).click();
  // filled in from the work done: 60 and 2
  const asked = page.locator(".sub-bill-line input[data-field=asked]");
  await expect(asked.nth(0)).toHaveValue("60");
  await expect(asked.nth(1)).toHaveValue("2");
  await expect(totals(page)).toContainText("הוגש למזמין (מצטבר)5,000 ₪");
  // the client's supervisor approved 55 of the 60
  await setQty(page, "approved", 55);
  await expect(totals(page)).toContainText("לקבל4,513 ₪"); // 4,750 - 5%
  await page.locator(".budget-actions button", { hasText: "אושר ע\"י המזמין" }).click();
  await page.locator("#confirmYesBtn").click();
  await expect(page.locator(".sub-bill-head")).toContainText("✓ אושר");
  // no expense: it's income
  await expect.poll(() => page.evaluate(() => window.__backend.tables.project_finance[0].data.expenses.length)).toBe(0);

  await page.locator(".sub-back").click();
  await page.locator(".sub-edit", { hasText: "＋ תקבול" }).click();
  await fill(page, { amount: 4000, billId: "חשבון חלקי 1" });
  const head = page.locator(".budget-chapter").first();
  await expect(head).toContainText("4,750 ₪");   // approved: 55 x 50 + 2 x 1,000
  await expect(head).toContainText("4,000 ₪");   // received
  await expect(head).toContainText("513 ₪");     // still to collect: 4,512.5 - 4,000
  await expect(page.locator(".budget-card", { hasText: "התקבל מהמזמין" })).toContainText("4,000 ₪");

  // the next bill starts from what was approved
  await page.locator(".sub-edit", { hasText: "＋ חשבון חדש" }).click();
  await expect(page.locator(".sub-bill-line").first()).toContainText("מצטבר קודם: 55");
  await expect(asked.nth(0)).toHaveValue("60");
});

for (const [file, what] of [["approved-bill.pdf", "its cumulative quantities"], ["approved-bill-amounts.pdf", "only cumulative amounts, Hebrew stored backwards"]]) {
  test(`the client's approved bill from a PDF (${what}): each item's approved cumulative quantity filled in`, async ({ page }) => {
    await openSeeded(page); // i1 01.010 at 50; i2 02.010 at 1,000
    await page.locator(".budget-tabs button", { hasText: "מזמין" }).click();
    await page.locator(".sub-edit", { hasText: "＋ חשבון חדש" }).click();
    const dialog = new Promise((resolve) => page.once("dialog", (d) => resolve(d.message())));
    await page.locator("#clientBillInput").setInputFiles(path.join(__dirname, "../fixtures/" + file));
    const message = await dialog;
    expect(message).toContain("עודכנו 2 סעיפים");
    if (file === "approved-bill.pdf") expect(message).toContain("לא נמצאו בכתב הכמויות: 09.999");
    const approved = page.locator(".sub-bill-line input[data-field=approved]");
    await expect(approved.nth(0)).toHaveValue("55");
    await expect(approved.nth(1)).toHaveValue("2.5");
    await expect(totals(page)).toContainText("מצטבר מאושר5,250 ₪");
    // saved as the draft; a hand fix still works, then approved
    await expect.poll(() => page.evaluate(() => {
      const b = window.__backend.tables.project_finance[0].data.bills[0];
      return b && [b.lines.i1.approved, b.lines.i2.approved];
    })).toEqual([55, 2.5]);
    await setQty(page, "approved", 54);
    await page.locator(".budget-actions button", { hasText: "אושר ע\"י המזמין" }).click();
    await page.locator("#confirmYesBtn").click();
    await expect(page.locator(".sub-bill-head")).toContainText("✓ אושר");
    await expect(totals(page)).toContainText("מצטבר מאושר5,200 ₪");
  });
}

test("P&L analysis: headline tiles, what the numbers say, and the charts", async ({ page }) => {
  await openWithSharedProject(page, { phone: ME, native: true, sheet: SHEET });
  await page.evaluate((data) => { window.__backend.tables.project_finance = [{ owner_phone: "+972500000001", project_id: "p1", data_version: 1, data }]; }, {
    items: [
      { id: "i1", code: "01.010", chapter: "01 עפר", name: "חפירה", qty: 100, price: 100, cost: 8000, progress: 100 },
      { id: "i2", code: "02.010", chapter: "02 בטון", name: "יסודות", qty: 10, price: 1000, cost: 8000, progress: 25 },
    ],
    expenses: [
      { id: "e1", date: "2026-09-10", category: "subcontractors", itemId: "i1", amount: 7000 },
      { id: "e2", date: "2026-10-05", category: "materials", itemId: "i2", amount: 4000 },
    ],
    bills: [{ id: "c1", subId: "client", no: 1, date: "2026-10-01", status: "approved", lines: {}, totals: { cumulative: 12000, toPay: 12000, gross: 12000, retention: 0, advance: 0, previous: 0, asked: 12000 } }],
    receipts: [{ id: "r1", date: "2026-10-20", amount: 10000 }],
  });
  await page.locator("#calendarFabBtn").click();
  await page.locator("#siteLogBudgetBtn").click();
  await page.locator(".budget-reports-btn", { hasText: "ניתוח רווח והפסד" }).click();
  // earned 10,000 + 2,500 = 12,500; spent 11,000 -> 1,500 (12%)
  await expect(page.locator(".pnl-tile").first()).toContainText("1,500 ₪");
  const says = page.locator(".pnl-insights");
  await expect(says).toContainText("עבודה בשווי 12,500 ₪ והוצאו 11,000 ₪ – רווח של 1,500 ₪ (12%)");
  // budget of the work done: 8,000 + 2,000 = 10,000 against 11,000 spent
  await expect(says).toContainText("הוצאו 1.10 ₪");
  await expect(says).toContainText("הסעיפים שמובילים לחריגה: 02.010 יסודות");
  await expect(says).toContainText("פרקים בהפסד (הוצאו יותר מערך מה שבוצע): 02 בטון");
  await expect(says).toContainText("נותרו 2,000 ₪ לגבייה");
  // the charts: the time line (two months), costs by type, profit / done-vs-used by chapter
  await expect(page.locator(".pnl-section svg")).toHaveCount(5);
  // the ring: the work done (12,500) = the profit and each cost type, each its own colour
  const ring = page.locator(".pnl-section", { hasText: "לאן הולך כל שקל" });
  await expect(ring.locator(".pnl-ring-legend")).toContainText("רווח1,500 ₪12%");
  await expect(ring.locator(".pnl-ring-legend")).toContainText("קבלני משנה7,000 ₪56%");
  await expect(ring.locator(".pnl-ring-legend")).toContainText("חומרים4,000 ₪32%");
  // the pie's top: three slices, three colours (the walls in front are their shades)
  expect(new Set(await ring.locator("path").evaluateAll((ps) => ps.map((p) => p.getAttribute("fill")).filter((f) => f.startsWith("#")))).size).toBe(3);
  await expect(ring.locator(".pnl-ring-total")).toContainText("12,500 ₪");
  await expect(page.locator(".pnl-section", { hasText: "רווח לפי פרק" }).locator("rect[fill='#eb6834']")).toHaveCount(1); // 02 בטון, at a loss
  await page.locator(".pnl-hit").first().click();
  await expect(page.locator(".pnl-readout")).toContainText("09/2026");
  await expect(page.locator(".pnl-readout")).toContainText("עלויות 7,000 ₪");
  // as a PDF
  await page.locator(".budget-actions button", { hasText: "PDF של הניתוח" }).click();
  await expect.poll(() => page.evaluate(() => (window.__native.files || []).map((f) => f.path)), { timeout: 20000 }).toEqual([expect.stringContaining("ניתוח רווח והפסד")]);
});

test("deleting a BOQ: one upload's items (uploaded twice by mistake), or all of them", async ({ page }) => {
  await openBudget(page);
  for (let i = 0; i < 2; i++) {
    await page.locator("#budgetCsvInput").setInputFiles(path.join(__dirname, "../fixtures/boq.xlsx"));
    await page.locator("#confirmYesBtn").click();
    await expect(page.locator(".budget-item")).toHaveCount(3 * (i + 1));
  }
  await expect.poll(async () => (await finance(page))?.data.imports.length).toBe(2);
  // the first upload only
  await page.locator(".budget-actions button", { hasText: "מחיקת כתב כמויות" }).click();
  const which = page.locator("#budgetFormFields select[name=which]");
  await expect(which.locator("option")).toHaveCount(3); // two uploads + everything
  await expect(which.locator("option").first()).toContainText("boq.xlsx");
  await expect(which.locator("option").first()).toContainText("3 סעיפים");
  await page.locator("#budgetForm button[type=submit]").click();
  await expect(page.locator("#confirmOverlay")).toContainText("למחוק 3 סעיפים");
  await page.locator("#confirmYesBtn").click();
  await expect(page.locator(".budget-item")).toHaveCount(3);
  await expect.poll(async () => { const d = (await finance(page)).data; return [d.items.length, d.imports.length, new Set(d.items.map((i) => i.importId)).size]; }).toEqual([3, 1, 1]);
  // an item by hand, then everything
  await page.locator(".budget-actions button", { hasText: "＋ סעיף" }).click();
  await fill(page, { code: "09", name: "ידני", qty: 1, price: 10 });
  await page.locator(".budget-actions button", { hasText: "מחיקת כתב כמויות" }).click();
  await page.locator("#budgetFormFields select[name=which]").selectOption({ label: "כל הסעיפים (4)" });
  await page.locator("#budgetForm button[type=submit]").click();
  await page.locator("#confirmYesBtn").click();
  await expect(page.locator(".budget-item")).toHaveCount(0);
  await expect.poll(async () => { const d = (await finance(page)).data; return [d.items.length, d.imports.length]; }).toEqual([0, 0]);
  await expect(page.locator(".budget-actions button", { hasText: "מחיקת כתב כמויות" })).toHaveCount(0);
});

test("a real-world BOQ PDF: wrapped descriptions, bold drawn twice, totals, page numbers, two pages", async ({ page }) => {
  await openBudget(page);
  await page.locator("#budgetCsvInput").setInputFiles(path.join(__dirname, "../fixtures/boq-real.pdf"));
  await expect(page.locator("#confirmOverlay")).toContainText("נמצאו 4 סעיפים", { timeout: 15000 });
  await page.locator("#confirmYesBtn").click();
  await expect.poll(async () => (await finance(page))?.data.items.map((i) => [i.code, i.chapter, i.name, i.unit, i.qty, i.price])).toEqual([
    ["01.51.01.0010", "1 עבודות ניקוז ומניעת סחף", "פירוק צינור ניקוז מבטון או אסבסט בקוטר 121 ס\"מ ועד 200 ס\"מ, כולל פינוי לאתר מורשה", "מ'", 150, 1150],
    ["01.51.01.0020", "1 עבודות ניקוז ומניעת סחף", "תעלת ניקוז מבטון טרום", "מ\"א", 80.5, 420],
    ["02.01.0010", "2 עבודות עפר", "חפירה כללית בשטח פתוח", "מ\"ק", 1200, 35],
    ["02.01.0020", "2 עבודות עפר", "מילוי מובא מהודק בשכבות של 20 ס\"מ", "מ\"ק", 600, 0],
  ]);
  // the contract: 172,500 + 33,810 + 42,000
  await expect(page.locator(".budget-card").first()).toContainText("248,310 ₪");
});

test("the BOQ shows in the file's own order, not re-sorted by item number", async ({ page }) => {
  await openWithSharedProject(page, { phone: ME, native: true, sheet: SHEET });
  await page.evaluate(() => { window.__backend.tables.project_finance = [{ owner_phone: "+972500000001", project_id: "p1", data_version: 1, data: { items: [
    { id: "a", code: "51.01", chapter: "51 ניקוז", name: "צינור", qty: 1, price: 1 },
    { id: "b", code: "51.10", chapter: "51 ניקוז", name: "שוחה", qty: 1, price: 1 },
    { id: "c", code: "51.02", chapter: "51 ניקוז", name: "מכסה", qty: 1, price: 1 },
    { id: "d", code: "40.01", chapter: "40 גינון", name: "דשא", qty: 1, price: 1 },
  ] } }]; });
  await page.locator("#calendarFabBtn").click();
  await page.locator("#siteLogBudgetBtn").click();
  await expect(page.locator(".budget-item")).toHaveCount(4);
  expect(await page.locator(".budget-item .boq-code").allInnerTexts()).toEqual(["51.01", "51.10", "51.02", "40.01"]);
  expect(await page.locator("tr.boq-ch .boq-desc").allInnerTexts()).toEqual(["ניקוז", "גינון"]);
});

test("finding an item in the BOQ: by number, by words of its description, by chapter", async ({ page }) => {
  await openBudget(page);
  for (const v of [{ code: "01.010", chapter: "01 עבודות עפר", name: "חפירה בשטח פתוח", unit: "מ\"ק", qty: 500, price: 45 },
                   { code: "01.020", chapter: "01 עבודות עפר", name: "מצע סוג א מהודק", unit: "מ\"ק", qty: 300, price: 120 },
                   { code: "02.010", chapter: "02 ניקוז", name: "צינור ניקוז קוטר 60", unit: "מ'", qty: 80, price: 900 }]) {
    await page.locator(".budget-actions button", { hasText: "＋ סעיף" }).click();
    await fill(page, v);
    await expect(page.locator(".budget-item", { hasText: v.name })).toBeVisible();
  }
  const rows = page.locator(".boq-table tr.budget-item:visible");
  const search = page.locator("#boqSearchInput");
  await expect(rows).toHaveCount(3);
  await search.fill("02.010");
  await expect(rows).toHaveCount(1);
  await expect(rows).toContainText("צינור ניקוז");
  await expect(page.locator(".boq-search-count")).toHaveText("נמצאו 1");
  await expect(page.locator(".boq-total")).toBeHidden();
  await search.fill("מצע מהודק");
  await expect(rows).toHaveCount(1);
  await search.fill("עבודות עפר");
  await expect(rows).toHaveCount(2);
  await search.fill("אין כזה");
  await expect(rows).toHaveCount(0);
  await expect(page.locator(".boq-search-count")).toHaveText("נמצאו 0");
  // still found after editing a found item
  await search.fill("ניקוז");
  await rows.first().click();
  await fill(page, { doneQty: 10 });
  await expect(search).toHaveValue("ניקוז");
  await expect(rows).toHaveCount(1);
  await search.fill("");
  await expect(rows).toHaveCount(3);
  await expect(page.locator(".boq-total")).toBeVisible();
});

test("discounts on the BOQ: general or on one chapter, each described - a % or an amount; they go into the unit prices", async ({ page }) => {
  await openBudget(page);
  for (const v of [{ code: "01.010", chapter: "01 עבודות עפר", name: "חפירה", unit: "מ\"ק", qty: 1000, price: 100, doneQty: 500 },
                   { code: "02.010", chapter: "02 ניקוז", name: "צינור", unit: "מ'", qty: 100, price: 1000, doneQty: 0 }]) {
    await page.locator(".budget-actions button", { hasText: "＋ סעיף" }).click();
    await fill(page, v);
    await expect(page.locator(".budget-item", { hasText: v.name })).toBeVisible();
  }
  const dig = page.locator(".budget-item", { hasText: "חפירה" });
  const pipe = page.locator(".budget-item", { hasText: "צינור" });
  const priceOf = (row) => row.locator("td").nth(5);
  const panel = page.locator("#boqDiscountsOverlay");
  const listed = panel.locator(".boq-discount-btn");

  // 🏷 הנחות: the list (empty), ＋ a new one - 10% off the earthworks chapter only
  await page.locator(".budget-actions button", { hasText: "🏷 הנחות" }).click();
  await expect(panel).toBeVisible();
  await expect(panel).toContainText("עדיין אין הנחות");
  await page.locator("#boqDiscountsAddBtn").click();
  // every chapter ticked to start with (a general discount); the drainage one unticked
  const ticks = page.locator("#budgetFormFields .budget-check");
  await expect(ticks).toHaveText(["הנחה כללית – כל כתב הכמויות", "פרק 01 עבודות עפר", "פרק 02 ניקוז"]);
  for (let k = 0; k < 3; k++) await expect(ticks.nth(k).locator("input")).toBeChecked();
  await ticks.filter({ hasText: "פרק 02 ניקוז" }).click();
  await expect(ticks.first().locator("input")).not.toBeChecked();
  await fill(page, { description: "הנחת עפר", value: 10 });
  await expect(panel).toBeVisible(); // back to the list
  await expect(listed).toHaveCount(1);
  await expect(listed.first()).toContainText("הנחת עפר");
  await expect(listed.first()).toContainText("10% · פרק 01 עבודות עפר");
  await expect(priceOf(dig)).toContainText("90");
  await expect(priceOf(dig).locator(".boq-before-discount")).toHaveText("100");
  await expect(priceOf(pipe)).toHaveText("1,000");
  await expect(dig.locator("td.boq-contract-total")).toHaveText("90,000");

  // then a general 5,000 off what's left (90,000 + 100,000)
  await page.locator("#boqDiscountsAddBtn").click();
  await fill(page, { description: "הנחה מסחרית", kind: "סכום (₪)", value: 5000 });
  await expect(listed).toHaveCount(2);
  await expect(listed.nth(1)).toContainText("כללית");
  // the price after each discount: 87.63 now, under it 90 (after the first) and 100 (before any), struck through
  await expect(priceOf(dig)).toContainText("87.63");
  await expect(priceOf(dig).locator(".boq-before-discount")).toHaveText(["90", "100"]);
  await expect(priceOf(pipe).locator(".boq-before-discount")).toHaveText(["1,000"]);
  await page.locator("#boqDiscountsCloseBtn").click();

  const rows = page.locator("tr.boq-discount");
  await expect(rows).toHaveCount(2);
  await expect(rows.nth(0)).toContainText("הנחה: הנחת עפר (10%) · פרק 01 עבודות עפר");
  await expect(rows.nth(0)).toContainText("-10,000");
  await expect(rows.nth(0)).toContainText("-5,000"); // half the earthworks done: half of it off that
  await expect(page.locator("tr.boq-before-discounts")).toContainText("200,000");
  const total = page.locator("tr.boq-total");
  await expect(total).toContainText("סה\"כ לאחר הנחות");
  await expect(total).toContainText("185,000");
  await expect.poll(async () => (await finance(page))?.data.discounts.map((d) => [d.description, d.kind, d.value, d.chapter]))
    .toEqual([["הנחת עפר", "pct", 10, null], ["הנחה מסחרית", "amount", 5000, null]]);
  await expect.poll(async () => (await finance(page)).data.discounts.map((d) => d.chapters)).toEqual([["01 עבודות עפר"], null]);
  await expect.poll(async () => (await finance(page)).data.items.map((i) => i.price)).toEqual([100, 1000]); // the typed prices stay

  // a tap on its name: changed
  await page.locator(".budget-actions button", { hasText: "🏷 הנחות" }).click();
  await listed.filter({ hasText: "הנחה מסחרית" }).click();
  await expect(page.locator("#budgetFormFields [name=description]")).toHaveValue("הנחה מסחרית");
  // a general one: every chapter ticked
  for (let k = 0; k < 3; k++) await expect(ticks.nth(k).locator("input")).toBeChecked();
  await fill(page, { description: "הנחה מסחרית מעודכנת", value: 10000 });
  await expect(listed.nth(1)).toContainText("הנחה מסחרית מעודכנת");
  await expect(total).toContainText("180,000");

  // none ticked: not saved
  await listed.filter({ hasText: "הנחה מסחרית מעודכנת" }).click();
  await ticks.first().click();
  await page.locator("#budgetForm button[type=submit]").click();
  await expect(page.locator("#budgetFormOverlay")).toBeVisible();
  // then only the drainage chapter: 10,000 off its 100,000
  await ticks.filter({ hasText: "פרק 02 ניקוז" }).click();
  await page.locator("#budgetForm button[type=submit]").click();
  await expect(listed.nth(1)).toContainText("פרק 02 ניקוז");
  await expect(priceOf(pipe)).toContainText("900");
  await expect(total).toContainText("180,000");

  // a long press: delete it? no / yes
  const longPress = async (loc) => {
    const box = await loc.boundingBox();
    await page.mouse.move(box.x + box.width / 2, box.y + box.height / 2);
    await page.mouse.down();
    await page.waitForTimeout(800);
    await page.mouse.up();
  };
  await longPress(listed.filter({ hasText: "הנחת עפר" }));
  await expect(page.locator("#confirmOverlay")).toContainText("למחוק את ההנחה \"הנחת עפר\"?");
  await expect(page.locator("#budgetFormOverlay")).toBeHidden(); // the long press didn't also open it
  await page.locator("#confirmYesBtn").click();
  await expect(panel).toBeVisible();
  await expect(listed).toHaveCount(1);
  await longPress(listed.first());
  await page.locator("#confirmYesBtn").click();
  await expect(panel).toContainText("עדיין אין הנחות");
  await page.locator("#boqDiscountsCloseBtn").click();
  await expect(rows).toHaveCount(0);
  await expect(priceOf(dig)).toHaveText("100");
  await expect(total).toContainText("200,000");
});

test("the BOQ's header row stays in view while scrolling down a long BOQ", async ({ page }) => {
  await openBudget(page);
  for (let n = 1; n <= 25; n++) {
    await page.locator(".budget-actions button", { hasText: "＋ סעיף" }).click();
    await fill(page, { code: "01." + String(n).padStart(3, "0"), chapter: "01 עפר", name: "סעיף " + n, qty: 10, price: 100 });
  }
  await expect(page.locator(".budget-item", { hasText: "סעיף 25" })).toHaveCount(1);
  const wrap = page.locator(".boq-wrap");
  await wrap.scrollIntoViewIfNeeded();
  await wrap.evaluate((w) => { w.scrollTop = w.scrollHeight; });
  const pos = await page.evaluate(() => {
    const w = document.querySelector(".boq-wrap").getBoundingClientRect();
    const h = document.querySelector(".boq-table thead th").getBoundingClientRect();
    return { wrapTop: w.top, headTop: h.top, scrolled: document.querySelector(".boq-wrap").scrollTop };
  });
  expect(pos.scrolled).toBeGreaterThan(50);
  expect(Math.abs(pos.headTop - pos.wrapTop)).toBeLessThan(3);
  await expect(page.locator(".boq-table thead th").first()).toBeInViewport();
  await expect(page.locator(".budget-item", { hasText: "סעיף 25" })).toBeInViewport();
});
