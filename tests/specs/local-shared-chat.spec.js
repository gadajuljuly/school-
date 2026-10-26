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

const sendFileMessage = (page, m) => page.evaluate((m) => {
  const row = window.__backend.tables.shared_projects[0];
  row.messages = [Object.assign({ id: "f1", phone: "+972500000002", type: "file", fileUrl: location.origin + "/tasks-icon-192.png",
    fileSize: 1234, ts: Date.now(), readBy: ["+972500000002"] }, m)];
}, m);

test("in the Android app, tapping a file someone sent opens it in the phone's viewer", async ({ page }) => {
  await openWithSharedProject(page, { phone: ME, sheet: SHEET, native: true });
  await sendFileMessage(page, { fileName: "תוכנית.pdf", fileType: "application/pdf" });
  await page.locator("#chatBtn").click();
  const file = page.locator(".chat-bubble-file", { hasText: "תוכנית.pdf" });
  await file.click();
  await expect.poll(() => page.evaluate(() => (window.__native.opened || []).length)).toBe(1);
  expect((await page.evaluate(() => window.__native.opened))[0]).toEqual({ path: "file:///cache/תוכנית.pdf", mimeType: "application/pdf" });
  expect((await page.evaluate(() => window.__native.files))[0].size).toBeGreaterThan(100);
  expect(await page.evaluate(() => (window.__native.shared || []).length)).toBe(0);
});

test("an image someone sent opens full-screen inside the app", async ({ page }) => {
  await openWithSharedProject(page, { phone: ME, sheet: SHEET, native: true });
  await sendFileMessage(page, { fileName: "אתר.jpg", fileType: "image/png" });
  await page.locator("#chatBtn").click();
  await page.locator(".chat-bubble-image img").click();
  await expect(page.locator("#imageViewerOverlay")).toBeVisible();
  await expect(page.locator("#imageViewerImg")).toHaveAttribute("src", /tasks-icon-192\.png$/);
  await page.locator("#imageViewerOverlay").click();
  await expect(page.locator("#imageViewerOverlay")).toBeHidden();
});

test("⬇ on a chat file asks which library folder, then saves a copy there", async ({ page }) => {
  await openWithSharedProject(page, { phone: ME, sheet: SHEET });
  await sendFileMessage(page, { fileName: "תוכנית.pdf", fileType: "application/pdf" });
  await page.locator("#chatBtn").click();
  await page.locator(".chat-bubble-download-btn").click();
  const picker = page.locator("#chatSaveFolderOverlay");
  await expect(picker).toBeVisible();
  await expect(picker.locator("#chatSaveFolderList button").first()).toContainText("הורדות");
  await picker.locator("#chatSaveFolderList button", { hasText: "תוכניות" }).click();
  await expect(picker).toBeHidden();
  const filesIn = async (key) => {
    const folders = (await page.evaluate(() => window.__backend.tables.shared_projects[0].data.folders)) || [];
    const f = folders.find((x) => x.key === key);
    return f && f.files.map((x) => x.name);
  };
  await expect.poll(() => filesIn("plans")).toEqual(["תוכנית.pdf"]);
  expect(await filesIn("downloads")).toEqual([]);
  const up = await page.evaluate(() => window.__backend.uploads);
  expect(up).toEqual([expect.objectContaining({ path: expect.stringMatching(/^sh1\/.+\.pdf$/) })]);
});

test("'הורדות' is a built-in library folder that can't be deleted", async ({ page }) => {
  await openWithSharedProject(page, { phone: ME, sheet: SHEET });
  await page.locator("#libraryBtn").click();
  const dl = page.locator("#libraryFoldersGrid .library-item", { hasText: "הורדות" });
  await expect(dl).toBeVisible();
  await expect(dl.locator(".library-item-delete")).toHaveCount(0);
});

test("an image in the chat zooms with two fingers, moves with one, and a double tap zooms in and out", async ({ page }) => {
  await openWithSharedProject(page, { phone: ME, sheet: SHEET, native: true });
  await sendFileMessage(page, { fileName: "סקיצה.png", fileType: "image/png" });
  await page.locator("#chatBtn").click();
  await page.locator(".chat-bubble-image img").click();
  await expect(page.locator("#imageViewerOverlay")).toBeVisible();
  const scale = () => page.evaluate(() => {
    const m = /scale\(([\d.]+)\)/.exec(document.getElementById("imageViewerImg").style.transform || "");
    return m ? +m[1] : 1;
  });
  // fingers: pointer events on the viewer
  const fire = (type, id, x, y) => page.evaluate(({ type, id, x, y }) => {
    document.getElementById("imageViewerOverlay").dispatchEvent(new PointerEvent(type, { pointerId: id, clientX: x, clientY: y, bubbles: true, cancelable: true, pointerType: "touch" }));
  }, { type, id, x, y });
  const box = await page.locator("#imageViewerOverlay").boundingBox();
  const cx = box.x + box.width / 2, cy = box.y + box.height / 2;
  await fire("pointerdown", 1, cx - 40, cy);
  await fire("pointerdown", 2, cx + 40, cy);
  for (let i = 1; i <= 5; i++) { await fire("pointermove", 1, cx - 40 - i * 16, cy); await fire("pointermove", 2, cx + 40 + i * 16, cy); }
  await fire("pointerup", 1, cx - 120, cy);
  await fire("pointerup", 2, cx + 120, cy);
  expect(await scale()).toBeCloseTo(3, 1); // fingers 80px apart -> 240px apart
  // a tap while zoomed doesn't close it
  await fire("pointerdown", 1, cx, cy); await fire("pointerup", 1, cx, cy);
  await page.waitForTimeout(500);
  await expect(page.locator("#imageViewerOverlay")).toBeVisible();
  // double tap: back to normal, then in again
  await fire("pointerdown", 1, cx, cy); await fire("pointerup", 1, cx, cy);
  await fire("pointerdown", 1, cx, cy); await fire("pointerup", 1, cx, cy);
  expect(await scale()).toBe(1);
  await page.waitForTimeout(400);
  await fire("pointerdown", 1, cx, cy); await fire("pointerup", 1, cx, cy);
  await fire("pointerdown", 1, cx, cy); await fire("pointerup", 1, cx, cy);
  expect(await scale()).toBeCloseTo(2.5, 1);
  // ✕ closes it whatever the zoom
  await page.locator(".image-viewer-close").click();
  await expect(page.locator("#imageViewerOverlay")).toBeHidden();
});

test("opening the chat doesn't bring up the keyboard - only tapping the writing box does", async ({ page }) => {
  await openWithSharedProject(page, { phone: ME, sheet: SHEET });
  await page.locator("#chatBtn").click();
  await expect(page.locator("#chatView")).toBeVisible();
  await page.waitForTimeout(300);
  await expect(page.locator("#chatInput")).not.toBeFocused();
  await page.locator("#chatInput").click();
  await expect(page.locator("#chatInput")).toBeFocused();
});
