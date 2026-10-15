const { test, expect } = require("@playwright/test");
const { longPress, openWithSharedProject } = require("./helpers/local-app");

// Shared projects and their chat against an in-memory stand-in for the
// server (helpers/local-app.js FAKE_BACKEND): what the app actually writes,
// and that two members writing at the same moment don't lose each other's
// messages or tasks.
test.use({ viewport: { width: 390, height: 800 }, serviceWorkers: "block" });

const ME = "+972500000001";
const pad = (n) => String(n).padStart(2, "0");
const d = new Date();
const TODAY = `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`;
const SHEET = {
  id: "sh1", name: "בניין A", members: [ME, "+972500000002"],
  tasks: [{ id: "k1", text: "לבדוק יציקה", status: 0, type: "task", date: TODAY, createdAt: 1 }],
};
const serverRow = (page) => page.evaluate(() => window.__backend.tables.shared_projects[0]);

test("sending a chat message stores it on the server and notifies the others", async ({ page }) => {
  await openWithSharedProject(page, { phone: ME, sheet: SHEET });
  await page.locator("#chatBtn").click();
  await expect(page.locator("#chatView")).toBeVisible();
  await page.locator("#chatInput").fill("מתי מגיע הבטון?");
  await page.locator("#chatInput").press("Enter");

  await expect(page.locator(".chat-bubble-mine", { hasText: "מתי מגיע הבטון?" })).toBeVisible();
  const row = await serverRow(page);
  expect(row.messages).toEqual([expect.objectContaining({ text: "מתי מגיע הבטון?", phone: ME })]);
  expect(row.messages_version).toBe(2);
  const pushes = await page.evaluate(() => window.__backend.log.filter((l) => l.fn === "send-chat-notification"));
  expect(pushes).toHaveLength(1);
});

test("a task quoted into the chat is sent with the message", async ({ page }) => {
  await openWithSharedProject(page, { phone: ME, sheet: SHEET });
  await longPress(page, page.locator("#taskList li.task", { hasText: "לבדוק יציקה" }));
  await page.locator("#taskChatQuoteBtn").click();
  await expect(page.locator("#chatReplyBar")).toBeVisible();
  await page.locator("#chatInput").fill("מי לוקח את זה?");
  await page.locator("#chatInput").press("Enter");

  await expect(page.locator("#chatReplyBar")).toBeHidden();
  const msg = (await serverRow(page)).messages[0];
  expect(msg).toMatchObject({ text: "מי לוקח את זה?", replyTo: { taskId: "k1", text: "לבדוק יציקה" } });
  const bubble = page.locator(".chat-bubble-mine", { hasText: "מי לוקח את זה?" });
  await expect(bubble.locator(".chat-bubble-quote")).toContainText("לבדוק יציקה");

  // tapping the quote goes back to the task
  await bubble.locator(".chat-bubble-quote").click();
  await expect(page.locator("#chatView")).toBeHidden();
  await expect(page.locator("#taskList li.task", { hasText: "לבדוק יציקה" })).toBeVisible();
});

test("two members sending at the same moment: both messages are kept", async ({ page }) => {
  await openWithSharedProject(page, { phone: ME, sheet: SHEET });
  // just before this device writes, another member's message lands first
  await page.evaluate(() => {
    window.__backend.interfere = (st, tables) => {
      if (st.op !== "update" || !st.payload || !st.payload.messages) return false;
      const row = tables.shared_projects[0];
      row.messages = row.messages.concat([{ id: "other", phone: "+972500000002", text: "אני בדרך", ts: Date.now() - 1000, readBy: ["+972500000002"] }]);
      row.messages_version += 1;
      return true;
    };
  });
  await page.locator("#chatBtn").click();
  await page.locator("#chatInput").fill("הגעתי לאתר");
  await page.locator("#chatInput").press("Enter");

  await expect.poll(async () => (await serverRow(page)).messages.map((m) => m.text)).toEqual(["אני בדרך", "הגעתי לאתר"]);
  expect((await serverRow(page)).messages_version).toBe(3);
});

test("two members editing the shared task list at once: nobody's change is lost", async ({ page }) => {
  await openWithSharedProject(page, { phone: ME, sheet: SHEET });
  // the other member adds a task on the server just before this device saves
  await page.evaluate(() => {
    window.__backend.interfere = (st, tables) => {
      if (st.op !== "update" || !st.payload || !st.payload.data) return false;
      const row = tables.shared_projects[0];
      row.data = Object.assign({}, row.data, { tasks: row.data.tasks.concat([{ id: "k2", text: "משימה של חבר", status: 0, type: "task", date: row.data.tasks[0].date, createdAt: 2 }]) });
      row.data_version += 1;
      return true;
    };
  });
  // this device marks the existing task partial
  await page.locator("#taskList li.task", { hasText: "לבדוק יציקה" }).click();

  await expect.poll(async () => {
    const tasks = (await serverRow(page)).data.tasks;
    return tasks.map((t) => t.id + ":" + t.status).sort();
  }).toEqual(["k1:1", "k2:0"]);
  // and this device now shows the other member's task too
  await expect(page.locator("#taskList li.task", { hasText: "משימה של חבר" })).toBeVisible();
});
