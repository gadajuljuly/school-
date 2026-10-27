const { test, expect } = require("@playwright/test");
const { openLocalApp } = require("./helpers/local-app");

// Voice commands: the microphone by the new-task field -> the phone's
// speech recognizer (faked: it "hears" window.__voiceSay) -> the offline
// parser -> a confirmation dialog -> saved only on אישור.
test.use({ viewport: { width: 390, height: 800 }, serviceWorkers: "block" });

const sheet = (id, name, tasks = []) => ({ id, name, tasks, reports: [], files: [] });
const DATA = { activeSheetId: "a", sheets: [sheet("a", "אולם ספורט"), sheet("h", "חולון – בניין B"), sheet("r", "רמת גן")] };

function ymd(d) {
  return d.getFullYear() + "-" + String(d.getMonth() + 1).padStart(2, "0") + "-" + String(d.getDate()).padStart(2, "0");
}
async function say(page, text) {
  await page.evaluate((t) => { window.__voiceSay = t; }, text);
  await page.locator("#voiceBtn").click();
  await expect(page.locator("#voiceResult")).toBeVisible();
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

test("a spoken task with a project, day and time is added there with a reminder", async ({ page }) => {
  await openLocalApp(page, { native: true, data: DATA });
  await say(page, "תזכיר לי מחר בעשר להזמין בטון בפרויקט רמת גן");
  await expect(page.locator("#voiceHeard")).toContainText("להזמין בטון");
  await expect(page.locator(".voice-item-input")).toHaveValue("להזמין בטון");
  await expect(page.locator("#voiceProject")).toHaveValue("r");
  const tomorrow = new Date(); tomorrow.setDate(tomorrow.getDate() + 1);
  await expect(page.locator("#voiceDate")).toHaveValue(ymd(tomorrow));
  await expect(page.locator("#voiceReminderTime")).toHaveValue("10:00");
  expect(await page.evaluate(() => window.__native.speech[0].language)).toBe("he-IL");

  await page.locator("#voiceSaveBtn").click();
  await expect(page.locator("#voiceOverlay")).toBeHidden();
  const d = await stored(page);
  const task = d.sheets.find((s) => s.id === "r").tasks[0];
  expect(task).toMatchObject({ text: "להזמין בטון", type: "task", date: ymd(tomorrow), reminder: { type: "time", time: "10:00" } });
  // the native alarm was handed to the phone
  await expect.poll(() => page.evaluate(() => window.__native.alarms.filter((a) => !a.id.startsWith("morning:")).length)).toBe(1);
});

test("nothing is saved on ביטול, and several tasks can be edited before saving", async ({ page }) => {
  await openLocalApp(page, { native: true, data: DATA });
  await say(page, "שלוש משימות לחולון להזמין בטון לבדוק ברזל ולתאם משאבה");
  await page.locator("#voiceCancelBtn").click();
  expect((await stored(page) || DATA).sheets.find((s) => s.id === "h").tasks).toHaveLength(0);

  await say(page, "שלוש משימות לחולון להזמין בטון לבדוק ברזל ולתאם משאבה");
  await expect(page.locator(".voice-item-input")).toHaveCount(3);
  await page.locator(".voice-item-del").nth(1).click();
  await page.locator(".voice-item-input").nth(1).fill("לתאם משאבה ליום שני");
  await page.locator("#voiceSaveBtn").click();
  const tasks = (await stored(page)).sheets.find((s) => s.id === "h").tasks;
  expect(tasks.map((t) => t.text)).toEqual(["להזמין בטון", "לתאם משאבה ליום שני"]);
  await expect(page.locator("#taskList li.task", { hasText: "להזמין בטון" })).toBeVisible();
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
  await expect(page.locator("#voiceAction")).toHaveValue("done");
  await expect(page.locator("#voiceProject")).toHaveValue("r");
  await expect(page.locator("#voiceDoneTask")).toHaveValue("t2");
  await page.locator("#voiceSaveBtn").click();
  const tasks = (await stored(page)).sheets.find((s) => s.id === "r").tasks;
  expect(tasks.find((t) => t.id === "t2").status).toBe(2);
  expect(tasks.find((t) => t.id === "t1").status).toBe(0);
});

test("an on-device model's answer is used when the phone has one, and can be switched off", async ({ page }) => {
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
  await expect(page.locator("#voiceAction")).toHaveValue("note");
  await expect(page.locator("#voiceProject")).toHaveValue("h");
  await expect(page.locator(".voice-item-input")).toHaveValue("לבדוק את המשאבה");
  await expect(page.locator("#voiceSource")).toHaveText(/Gemini Nano/);
  await expect(page.locator("#voiceAiStatus")).toContainText("פעיל");
  expect(await page.evaluate(() => window.__aiPrompt)).toContain("רמת גן");

  // switched off -> the built-in parser, and it stays off
  await page.locator("#voiceAiToggle").uncheck();
  await page.locator("#voiceCancelBtn").click();
  await say(page, "תזכיר לי מחר בעשר להזמין בטון");
  await expect(page.locator("#voiceSource")).toHaveText(/המנתח/);
  await expect(page.locator(".voice-item-input")).toHaveValue("להזמין בטון");
  await expect(page.locator("#voiceReminderTime")).toHaveValue("10:00");
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
  await expect(page.locator("#voiceAiStatus")).toContainText("מוריד את המודל... 25%");
  await expect(page.locator("#voiceSource")).toHaveText(/המנתח/);
  await page.locator("#voiceCancelBtn").click();
  await say(page, "להזמין בטון");
  expect(await page.evaluate(() => window.__aiDownloads)).toBe(1);
});

test("the microphone is hidden where there's no speech recognizer", async ({ page }) => {
  await page.addInitScript(() => { delete window.webkitSpeechRecognition; delete window.SpeechRecognition; });
  await openLocalApp(page);
  await expect(page.locator("#voiceBtn")).toBeHidden();
});
