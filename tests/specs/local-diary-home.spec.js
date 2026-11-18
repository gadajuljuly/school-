const { test, expect } = require("@playwright/test");
const { openWithSharedProject } = require("./helpers/local-app");

// The diary's home: the day's diary itself (as it's sent - the same tables),
// each part under its icon with "✎ עריכה" / "+ הוספה" opening its screen;
// above it yesterday / tomorrow, open or closed, how much is filled; under
// it the actions bar.
test.use({ viewport: { width: 390, height: 844 }, serviceWorkers: "block" });

const ME = "+972500000001";
const pad = (n) => String(n).padStart(2, "0");
const iso = (d0) => { const d = new Date(); d.setDate(d.getDate() + d0); return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`; };
const LOGS = [
  { id: "l0", date: iso(-1), number: 7, closed: true, works: [{ id: "w0", text: "חפירה", attachment: null }] },
  { id: "l1", date: iso(0),
    attendance: { foreman: [{ id: "a", name: "יוסי כהן" }], workers: [{ id: "b", name: "6 פועלים" }] },
    tools: { roller: [{ id: "t", qty: "1", note: "" }], truck: [{ id: "u", qty: "2", note: "" }] },
    works: [{ id: "w", text: "פיזור מצע", attachment: null }] },
];

test("the day's card and what each part holds; yesterday's closed log; no money row without permission", async ({ page }) => {
  await openWithSharedProject(page, { phone: ME, sheet: { id: "p1", name: "כביש הדקלים", members: [ME, "+972599999999"], createdBy: "+972599999999", tasks: [], siteLogs: LOGS } });
  await page.locator("#calendarFabBtn").click();
  const v = page.locator("#diaryView");
  await expect(v).toBeVisible();

  await expect(page.locator("#diaryDayTitle")).toHaveText("יומן עבודה מס' 8");
  await expect(page.locator("#diaryDayChip")).toHaveText("● פתוח");
  await expect(page.locator("#diaryDayProgressText")).toHaveText("מולאו 3 מתוך 7");
  await expect(page.locator("#diaryNextDayBtn")).toBeDisabled();
  await expect(page.locator("#diaryDictateBtn")).toBeVisible();

  const row = (id) => page.locator("#" + id);
  const body = (id) => page.locator(`[data-doc="${id}"]`);
  await expect(page.locator("#diaryDocProject")).toHaveText("כביש הדקלים");
  await expect(row("siteLogAttendanceBtn")).toHaveClass(/filled/);
  await expect(row("siteLogAttendanceBtn").locator(".diary-row-end")).toHaveText("✎ עריכה");
  // the parts' content as in the sent diary: tables
  await expect(body("siteLogAttendanceBtn").locator("table")).toContainText("יוסי כהן");
  await expect(body("siteLogAttendanceBtn").locator("table")).toContainText("6 פועלים");
  await expect(body("siteLogToolsBtn").locator("table")).toContainText("מכבש");
  await expect(body("siteLogToolsBtn").locator("table")).toContainText("משאית");
  await expect(body("siteLogWorksBtn")).toContainText("פיזור מצע");
  await expect(row("siteLogContractorsBtn")).not.toHaveClass(/filled/);
  await expect(body("siteLogContractorsBtn")).toHaveText("לא מולא");
  await expect(row("siteLogContractorsBtn").locator(".diary-row-end")).toHaveText("+ הוספה");
  await expect(page.locator("#budgetFabBtn")).toBeHidden(); // not the owner
  await expect(page.locator("#siteLogShareGeneralBtn")).toBeDisabled();
  await expect(page.locator("#diaryShareCaption")).toHaveText("אחרי סגירה");

  // a part opens its own screen; back - the home is up to date
  await row("siteLogContractorsBtn").click();
  await expect(page.locator("#siteLogContractorsView")).toBeVisible();
  await page.locator("#siteLogContractorsBackBtn").click();
  await expect(v).toBeVisible();

  // yesterday: closed, its number, nothing to dictate, share on
  await page.locator("#diaryPrevDayBtn").click();
  await expect(page.locator("#diaryDayTitle")).toHaveText("יומן עבודה מס' 7");
  await expect(page.locator("#diaryDayChip")).toHaveText("✓ נסגר");
  await expect(page.locator("#diaryDayProgressText")).toHaveText("מולאו 1 מתוך 7");
  await expect(page.locator("#diaryDictateBtn")).toBeHidden();
  await expect(page.locator("#siteLogShareGeneralBtn")).toBeEnabled();
  await expect(page.locator("#siteLogCloseBtn")).toHaveText("✓ סגירה מחדש");
  await page.locator("#diaryNextDayBtn").click();
  await expect(page.locator("#diaryDayTitle")).toHaveText("יומן עבודה מס' 8");

  // 🎤 הכתב ליומן: the assistant
  await page.locator("#diaryDictateBtn").click();
  await expect(page.locator("#assistantView")).toBeVisible();
});

test("budget control: the footer's button for the project's owner, not in the diary; the archive in the menu", async ({ page }) => {
  await openWithSharedProject(page, { phone: ME, sheet: { id: "p1", name: "כביש הדקלים", members: [ME], tasks: [], siteLogs: LOGS } });
  await page.locator("#calendarFabBtn").click();
  await expect(page.locator("#diaryView")).not.toContainText("בקרה תקציבית");
  const fab = page.locator("#budgetFabBtn");
  await expect(fab).toBeVisible();
  await fab.click();
  await expect(page.locator("#budgetView")).toBeVisible();
  await expect(fab).toHaveClass(/fab-active/);
  await page.locator("#budgetBackBtn").click();
  await expect(page.locator("#notebookFooter img[src*='archive']")).toHaveCount(0);
  await page.locator("#menuBtn").click();
  await expect(page.locator("#archiveBtn")).toBeVisible();
  await expect(page.locator("#archiveBtn")).toHaveText("📦 ארכיון פרויקטים שהסתיימו");
});

test("every part's row is the list's full width, its name and summary in the same place", async ({ page }) => {
  await openWithSharedProject(page, { phone: ME, sheet: { id: "p1", name: "כביש הדקלים", members: [ME], tasks: [], siteLogs: LOGS } });
  await page.locator("#calendarFabBtn").click();
  const ids = ["siteLogAttendanceBtn", "siteLogToolsBtn", "siteLogContractorsBtn", "siteLogWorksBtn", "siteLogProcurementBtn", "siteLogPhotosBtn", "siteLogPlanBtn"];
  const boxes = await page.evaluate((ids) => ids.map((id) => {
    const row = document.getElementById(id).getBoundingClientRect();
    const name = document.getElementById(id).querySelector(".diary-row-text b").getBoundingClientRect();
    return { w: Math.round(row.width), nameRight: Math.round(row.right - name.right) };
  }), ids);
  boxes.forEach((b) => {
    expect(b.w).toBe(boxes[0].w);
    expect(b.nameRight).toBe(boxes[0].nameRight);
  });
});

test("no tabs on the side: the diary's page is the screen's full width", async ({ page }) => {
  await openWithSharedProject(page, { phone: ME, sheet: { id: "p1", name: "כביש הדקלים", members: [ME], tasks: [], siteLogs: LOGS } });
  await page.locator("#calendarFabBtn").click();
  await expect(page.locator("#diaryTabs")).toHaveCount(0);
  const [doc, proj] = await Promise.all([page.locator(".diary-doc").boundingBox(), page.locator(".diary-proj").boundingBox()]);
  expect(Math.abs(doc.x - proj.x)).toBeLessThan(2);
  expect(Math.abs(doc.width - proj.width)).toBeLessThan(2);
});

test("the project's row at the diary's top: name, logo (opens the logos), sketch; it stays while scrolling", async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 700 });
  await openWithSharedProject(page, { phone: ME, sheet: { id: "p1", name: "רכבת נתניה", members: [ME], tasks: [], siteLogs: LOGS } });
  await page.locator("#calendarFabBtn").click();
  await expect(page.locator("#diaryProjName")).toHaveText("רכבת נתניה");
  await expect(page.locator(".sheet-title-wrap")).toBeHidden(); // not twice
  await expect(page.locator("#diaryProjLogo")).toHaveText("✕");

  await page.locator("#diaryView").evaluate((v) => { v.scrollTop = v.scrollHeight; v.dispatchEvent(new Event("scroll")); });
  await expect(page.locator(".diary-proj")).toBeInViewport();
  await expect(page.locator(".diary-proj")).toHaveClass(/stuck/);

  await page.locator("#diaryProjLogo").click();
  await expect(page.locator("#logoPickerOverlay")).toBeVisible();
  await page.locator("#logoPickerCancelBtn").click();

  // the toolbox (in the sketch's place): its sketch, scanner, no printing
  await page.locator("#diaryProjSketch").click();
  await expect(page.locator("#toolboxPop .toolbox-item:visible")).toHaveText(["סורק PDF", "סקיצה", "מדידה", "מצלמת אתר", "תחזית לאתר", "הזמנת ברזל", "מדידה על מפה"]);
  await page.locator("#toolboxSketch").click();
  await expect(page.locator("#sketchView")).toBeVisible();
  await page.evaluate(() => { document.getElementById("sketchView").hidden = true; });

  // back on the tasks page: its own title row again
  await page.locator("#tasksFabBtn").click();
  await expect(page.locator(".sheet-title-wrap")).toBeVisible();
});

test("a small phone: the menu scrolls inside the screen, its last sections reachable", async ({ page }) => {
  await page.setViewportSize({ width: 360, height: 640 });
  await openWithSharedProject(page, { phone: ME, sheet: { id: "p1", name: "כביש הדקלים", members: [ME], tasks: [] } });
  await page.locator("#menuBtn").click();
  const panel = page.locator("#menuPanel");
  const box = await panel.boundingBox();
  expect(box.y + box.height).toBeLessThanOrEqual(640);
  await page.locator("#archiveBtn").scrollIntoViewIfNeeded();
  await expect(page.locator("#archiveBtn")).toBeInViewport();
  await page.locator("#archiveBtn").click();
  await expect(panel).toBeHidden();
});
