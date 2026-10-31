const { test, expect } = require("@playwright/test");
const { openWithSharedProject } = require("./helpers/local-app");

// The diary of a shared project: several members write in the same day.
// Every one's entries stay - nobody's day replaces another's, and two logs
// started for the same day at once become one.
test.use({ viewport: { width: 390, height: 800 }, serviceWorkers: "block" });

const ME = "+972500000001";
const pad = (n) => String(n).padStart(2, "0");
const today = (() => { const d = new Date(); return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`; })();
const serverLogs = (page) => page.evaluate(() => window.__backend.tables.shared_projects[0].data.siteLogs);

async function addWork(page, text) {
  await page.locator("#siteLogWorksList .site-log-add-btn").click();
  await page.locator("#siteLogWorksList .site-log-add-input").fill(text);
  await page.locator("#siteLogWorksList .site-log-add-input").press("Enter");
}
async function openWorks(page) {
  await page.locator("#calendarFabBtn").click();
  await page.locator("#siteLogWorksBtn").click();
  await expect(page.locator("#siteLogWorksView")).toBeVisible();
}

test("another member started today's log meanwhile: one log, both their works", async ({ page }) => {
  await openWithSharedProject(page, { phone: ME, sheet: { id: "p1", name: "בניין A", members: [ME, "+972509999999"], tasks: [] } });
  await openWorks(page);
  // Dani, on his phone, wrote today's first line (this phone hasn't seen it yet)
  await page.evaluate((date) => {
    const row = window.__backend.tables.shared_projects[0];
    row.data.siteLogs.push({ id: "zz-dani-log", date, works: [{ id: "w-dani", text: "דני: יציקת עמודים", attachment: null }] });
    row.data_version++;
  }, today);
  await addWork(page, "שלי: טפסנות קומה 2");
  await expect.poll(async () => {
    const logs = (await serverLogs(page)).filter((l) => l.date === today);
    return logs.map((l) => l.works.map((w) => w.text).sort());
  }).toEqual([["דני: יציקת עמודים", "שלי: טפסנות קומה 2"]]);
  await expect(page.locator("#siteLogWorksList")).toContainText("דני: יציקת עמודים");
  await expect(page.locator("#siteLogWorksList")).toContainText("שלי: טפסנות קומה 2");
});

test("two members writing in the same day's log: every line stays", async ({ page }) => {
  const log = { id: "L1", date: today, works: [{ id: "w1", text: "בוקר: פריקת ברזל", attachment: null }],
    attendance: { workers: [{ id: "a1", name: "מוחמד" }] } };
  await openWithSharedProject(page, { phone: ME, sheet: { id: "p1", name: "בניין A", members: [ME, "+972509999999"], tasks: [], siteLogs: [log] } });
  await openWorks(page);
  await expect(page.locator("#siteLogWorksList")).toContainText("בוקר: פריקת ברזל");
  // meanwhile Dani adds a line and a worker to the same day
  await page.evaluate(() => {
    const row = window.__backend.tables.shared_projects[0];
    const l = row.data.siteLogs.find((x) => x.id === "L1");
    l.works.push({ id: "w-dani", text: "דני: יציקת עמודים", attachment: null });
    l.attendance = { workers: [{ id: "a1", name: "מוחמד" }, { id: "a2", name: "יוסף" }] };
    row.data_version++;
  });
  await addWork(page, "שלי: טפסנות קומה 2");
  await expect.poll(async () => {
    const l = (await serverLogs(page)).find((x) => x.id === "L1");
    return [l.works.map((w) => w.text), l.attendance.workers.map((w) => w.name)];
  }).toEqual([["בוקר: פריקת ברזל", "דני: יציקת עמודים", "שלי: טפסנות קומה 2"], ["מוחמד", "יוסף"]]);
  expect((await serverLogs(page)).filter((l) => l.date === today)).toHaveLength(1);
  await expect(page.locator("#siteLogWorksList")).toContainText("דני: יציקת עמודים");
});
