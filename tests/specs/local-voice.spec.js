const { test, expect } = require("@playwright/test");
const { openLocalApp } = require("./helpers/local-app");

// Voice commands: the microphone by the new-task field opens the assistant
// and listens -> the phone's speech recognizer (faked: it "hears"
// window.__voiceSay) -> the offline parser (or the on-phone model) -> done
// at once, with an undo. The bar goes by itself once it's done.
test.use({ viewport: { width: 390, height: 800 }, serviceWorkers: "block" });

const sheet = (id, name, tasks = []) => ({ id, name, tasks, reports: [], files: [] });
const DATA = { activeSheetId: "a", sheets: [sheet("a", "אולם ספורט"), sheet("h", "חולון – בניין B"), sheet("r", "רמת גן")] };

function ymd(d) {
  return d.getFullYear() + "-" + String(d.getMonth() + 1).padStart(2, "0") + "-" + String(d.getDate()).padStart(2, "0");
}
const bot = (page) => page.locator("#assistantDockReply .as-bot");
async function say(page, text) {
  await page.evaluate((t) => { window.__voiceSay = t; }, text);
  if (await page.locator("#assistantDock").isVisible()) await page.locator("#assistantMicBtn").click();
  else await page.locator("#voiceBtn").click();
  await expect(page.locator("#assistantDockReply .as-me").last()).toHaveText(text);
}
const stored = (page) => page.evaluate(() => JSON.parse(localStorage.getItem("daily-tasks-sheets-v1")));

test("the parser understands Hebrew tasks, projects, days and times", async ({ page }) => {
  await page.addInitScript(() => { window.__itaskTestHooks = (h) => { window.__hooks = h; }; });
  await openLocalApp(page);
  const parse = (text) => page.evaluate(([t, sheets]) => window.__hooks.parseVoiceCommand(t, sheets, new Date(2026, 9, 18, 9, 15).getTime()),
    [text, DATA.sheets]);
  expect(await parse("משימה חדשה להזמין בטון לפרויקט רמת גן מחר בשמונה")).toMatchObject(
    { action: "task", items: ["להזמין בטון"], sheetId: "r", date: "2026-10-19", reminderTime: "08:00" });
  expect(await parse("תזכיר לי בעוד שעה להתקשר לקבלן")).toMatchObject(
    { items: ["להתקשר לקבלן"], date: "2026-10-18", reminderTime: "10:15" });
  expect(await parse("תוסיף שלוש משימות לחולון להזמין בטון לבדוק ברזל ולתאם משאבה")).toMatchObject(
    { items: ["להזמין בטון", "לבדוק ברזל", "לתאם משאבה"], sheetId: "h" });
  expect(await parse("סמן את הזמנת הברזל כבוצע")).toMatchObject({ action: "done", items: ["הזמנת הברזל"] });
  expect(await parse("מזכרת המפקח ביקש לתקן את המעקה")).toMatchObject({ action: "note", items: ["המפקח ביקש לתקן את המעקה"] });
  expect(await parse("ביום חמישי ב-14:30 פגישה עם המפקח")).toMatchObject({ items: ["פגישה עם המפקח"], date: "2026-10-22", reminderTime: "14:30" });
  expect(await parse("תזכיר לי בשמונה וחצי בערב לשלוח דוח")).toMatchObject({ reminderTime: "20:30", date: "2026-10-18" });
  // numbers that aren't times stay in the text
  expect(await parse("להעביר 12 פועלים לקומה 3")).toMatchObject({ items: ["להעביר 12 פועלים לקומה 3"], reminderTime: null, date: null });
  expect(await parse("ذكرني بكرة الساعة 8 اتصل بالمقاول")).toMatchObject({ items: ["اتصل بالمقاول"], date: "2026-10-19", reminderTime: "08:00" });
});

test("🎤 opens the assistant listening: a spoken task with a project, day and time is added there with a reminder", async ({ page }) => {
  await openLocalApp(page, { native: true, data: DATA });
  await say(page, "תזכיר לי מחר בעשר להזמין בטון בפרויקט רמת גן");
  await expect(bot(page).last()).toContainText("✓");
  expect(await page.evaluate(() => window.__native.speech[0].language)).toBe("he-IL");
  const tomorrow = new Date(); tomorrow.setDate(tomorrow.getDate() + 1);
  await expect.poll(async () => ((await stored(page)) || DATA).sheets.find((s) => s.id === "r").tasks.length).toBe(1);
  const task = (await stored(page)).sheets.find((s) => s.id === "r").tasks[0];
  expect(task).toMatchObject({ text: "להזמין בטון", type: "task", date: ymd(tomorrow), reminder: { type: "time", time: "10:00" } });
  // the native alarm was handed to the phone
  await expect.poll(() => page.evaluate(() => window.__native.alarms.filter((a) => !a.id.startsWith("morning:")).length)).toBe(1);
});

test("several tasks in one line; ↶ takes them back", async ({ page }) => {
  await openLocalApp(page, { native: true, data: DATA });
  await say(page, "שלוש משימות לחולון להזמין בטון לבדוק ברזל ולתאם משאבה");
  await expect(bot(page).last()).toContainText("✓");
  await expect.poll(async () => ((await stored(page)) || DATA).sheets.find((s) => s.id === "h").tasks.map((t) => t.text))
    .toEqual(["להזמין בטון", "לבדוק ברזל", "לתאם משאבה"]);
  await bot(page).last().locator("button", { hasText: "ביטול" }).click();
  await expect.poll(async () => (await stored(page)).sheets.find((s) => s.id === "h").tasks).toHaveLength(0);
});

test("\"סמן בוצע\" finds the open task the words fit, in whichever project", async ({ page }) => {
  const data = JSON.parse(JSON.stringify(DATA));
  const today = ymd(new Date());
  data.sheets[2].tasks = [
    { id: "t1", text: "לבדוק טפסנות", status: 0, type: "task", date: today },
    { id: "t2", text: "הזמנת ברזל לקומה 2", status: 0, type: "task", date: today },
  ];
  await openLocalApp(page, { native: true, data });
  await say(page, "סמן בוצע הזמנת ברזל");
  await expect(bot(page).last()).toContainText("✓");
  await expect.poll(async () => ((await stored(page)) || data).sheets.find((s) => s.id === "r").tasks.find((t) => t.id === "t2").status).toBe(2);
  expect((await stored(page)).sheets.find((s) => s.id === "r").tasks.find((t) => t.id === "t1").status).toBe(0);
});

test("an on-device model's answer is used when the phone has one, and can be switched off in the menu", async ({ page }) => {
  await openLocalApp(page, { native: true, data: DATA });
  // init scripts run in the order added, so this one lands after NATIVE_FAKE
  await page.addInitScript(() => {
    window.Capacitor.Plugins.ItaskAI = {
      available: () => Promise.resolve({ available: true, status: "available" }),
      generate: ({ prompt }) => {
        window.__aiPrompt = prompt;
        return Promise.resolve({ text: "```json\n{\"action\":\"note\",\"items\":[\"לבדוק את המשאבה\"],\"project\":\"חולון – בניין B\",\"date\":null,\"time\":null}\n```" });
      },
    };
  });
  await page.reload();
  await page.locator("#appRoot").waitFor({ state: "visible" });
  await say(page, "תזכיר לי מחר בעשר להזמין בטון");
  await expect.poll(async () => ((await stored(page)) || DATA).sheets.find((s) => s.id === "h").tasks.map((t) => [t.type, t.text]))
    .toEqual([["note", "לבדוק את המשאבה"]]);
  expect(await page.evaluate(() => window.__aiPrompt)).toContain("רמת גן");

  // switched off (in the menu) -> the built-in parser, and it stays off
  await page.locator("#assistantDockCloseBtn").click();
  await page.locator("#menuBtn").click();
  await expect(page.locator("#voiceAiMenuSection")).toBeVisible();
  await expect(page.locator("#voiceAiStatus")).toContainText("פעיל");
  await page.locator("#voiceAiToggle").uncheck();
  await page.locator("#menuBtn").click();
  await say(page, "תזכיר לי מחר בעשר להזמין בטון");
  await expect.poll(async () => (await stored(page)).sheets.find((s) => s.id === "a").tasks.map((t) => [t.text, t.reminder && t.reminder.time]))
    .toEqual([["להזמין בטון", "10:00"]]);
});

test("a model the phone can download is fetched in the background, meanwhile the parser answers", async ({ page }) => {
  await openLocalApp(page, { native: true, data: DATA });
  await page.addInitScript(() => {
    let listener = null;
    window.__aiDownloads = 0;
    window.Capacitor.Plugins.ItaskAI = {
      available: () => Promise.resolve({ available: false, status: "downloadable" }),
      addListener: (name, fn) => { listener = fn; return Promise.resolve({ remove() {} }); },
      download: () => {
        window.__aiDownloads++;
        listener({ bytes: 50, total: 200 });
        return new Promise(() => {});
      },
      generate: () => Promise.reject(new Error("not yet")),
    };
  });
  await page.reload();
  await page.locator("#appRoot").waitFor({ state: "visible" });
  await say(page, "להזמין בטון");
  await expect(bot(page).last()).toContainText("✓");
  await say(page, "לבדוק ברזל");
  await expect(bot(page).last()).toContainText("✓");
  expect(await page.evaluate(() => window.__aiDownloads)).toBe(1);
  await page.locator("#assistantDockCloseBtn").click();
  await page.locator("#menuBtn").click();
  await expect(page.locator("#voiceAiStatus")).toContainText("מוריד את המודל... 25%");
});

test("no speech recognizer: 🎤 still opens the assistant, for typing; the bar goes by itself after the answer", async ({ page }) => {
  await page.addInitScript(() => { delete window.webkitSpeechRecognition; delete window.SpeechRecognition; });
  await openLocalApp(page, { data: DATA });
  await page.clock.install();
  await page.locator("#voiceBtn").click();
  await expect(page.locator("#assistantDock")).toBeVisible();
  await expect(page.locator("#assistantMicBtn")).toBeHidden();
  await expect(page.locator("#assistantInput")).toBeFocused();
  // the greeting alone doesn't close it
  await page.clock.runFor(30000);
  await expect(page.locator("#assistantDock")).toBeVisible();
  await page.locator("#assistantInput").fill("להזמין בטון");
  await page.locator("#assistantSendBtn").click();
  await expect(bot(page).last()).toContainText("✓");
  await expect(page.locator("#assistantInput")).not.toBeFocused();
  // a touch gives it more time
  await page.clock.runFor(5000);
  await bot(page).last().click();
  await page.clock.runFor(6000);
  await expect(page.locator("#assistantDock")).toBeVisible();
  await page.clock.runFor(3000);
  await expect(page.locator("#assistantDock")).toBeHidden();
  await expect(page.locator("#taskList li.task", { hasText: "להזמין בטון" })).toBeVisible();
});
