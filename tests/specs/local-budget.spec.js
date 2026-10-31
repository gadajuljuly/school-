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
