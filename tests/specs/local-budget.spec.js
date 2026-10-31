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
  await expect(chapters.first()).toContainText("01 עבודות עפר");
  await expect(chapters.first().locator(".budget-item")).toHaveCount(2);
  await expect(chapters.first().locator(".budget-item").first()).toContainText("חפירה כללית");
  await expect(chapters.first().locator(".budget-item").first()).toContainText("חוזה 5,400 ₪");
  // the contract: 5,400 + 4,800 + 42,000
  await expect(page.locator(".budget-card").first()).toContainText("52,200 ₪");
  await expect.poll(async () => (await finance(page))?.data.items.map((i) => [i.code, i.chapter, i.qty, i.price]))
    .toEqual([["01.010", "01 עבודות עפר", 120, 45], ["01.020", "01 עבודות עפר", 80, 60], ["02.010", "02 עבודות בטון", 35, 1200]]);
  expect((await finance(page)).owner_phone).toBe(ME);
  expect((await finance(page)).project_id).toBe("p1");

  // ...and a CSV too, with its cost budget
  await page.locator("#budgetCsvInput").setInputFiles(path.join(__dirname, "../fixtures/boq.csv"));
  await page.locator("#confirmYesBtn").click();
  await expect(page.locator(".budget-chapter", { hasText: "03 טיח" })).toContainText("טיח פנים");
  await expect.poll(async () => (await finance(page)).data.items.find((i) => i.code === "03.010")).toMatchObject({ unit: 'מ"ר', qty: 500, price: 70, cost: 28000 });
});

test("an item added by hand; expenses against it; spending ahead of the work shows as an overrun", async ({ page }) => {
  await openBudget(page);
  await page.locator(".budget-actions button", { hasText: "＋ סעיף" }).click();
  await fill(page, { code: "04.010", chapter: "חשמל", name: "תשתית חשמל", unit: "קומפ'", qty: 1, price: 60000, cost: 40000, progress: 20 });
  const item = page.locator(".budget-item", { hasText: "תשתית חשמל" });
  await expect(item).toContainText("חוזה 60,000 ₪");
  await expect(item).toContainText("ביצוע 20%");

  // an expense: 20,000 on it - half the budget used for 20% of the work
  await page.locator(".budget-tabs button", { hasText: "הוצאות" }).click();
  await page.locator(".budget-actions button", { hasText: "＋ הוצאה" }).click();
  await fill(page, { supplier: "חשמל בע\"מ", invoice: "1234", itemId: "04.010 תשתית חשמל", amount: 20000 });
  await expect(page.locator(".budget-expense")).toContainText("חשבונית 1234");
  await expect.poll(async () => (await finance(page))?.data.expenses.map((e) => [e.supplier, e.invoice, e.amount])).toEqual([["חשמל בע\"מ", "1234", 20000]]);

  await page.locator(".budget-tabs button", { hasText: "סעיפי כתב הכמויות" }).click();
  await expect(item).toHaveClass(/over/);
  await expect(item).toContainText("ניצול תקציב 50%");
  // at this pace: 20,000 for 20% -> 100,000; 60,000 over
  await expect(item).toContainText("עלות צפויה 100,000 ₪, חריגה של 60,000 ₪");
  await expect(page.locator(".budget-card", { hasText: "רווח צפוי" })).toContainText("-40,000 ₪");

  // the work catches up: 60% done -> no overrun
  await item.click();
  await fill(page, { progress: 60 });
  await expect(item).not.toHaveClass(/over/);
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
