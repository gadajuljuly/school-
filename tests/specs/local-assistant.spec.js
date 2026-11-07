const { test, expect } = require("@playwright/test");
const { openWithSharedProject } = require("./helpers/local-app");

// עוזר ITASK: a chat - the message goes to the itask-assistant function
// (faked here), its actions land in the diary, the tasks, the plan and the
// phone's calendar, with ↶ to undo them all.
test.use({ viewport: { width: 390, height: 800 }, serviceWorkers: "block" });

const ME = "+972500000001";
const pad = (n) => String(n).padStart(2, "0");
const iso = (d0) => { const d = new Date(); d.setDate(d.getDate() + d0); return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`; };
const SHEET = { id: "p1", name: "כביש הדקלים", members: [ME], tasks: [
  { id: "t1", text: "לתאם מכבש", status: 0, type: "task", date: iso(0), createdAt: 1 }],
  workPlan: [{ id: "w1", name: "מצעים ק\"מ 0–0.6", start: iso(-5), end: iso(5), status: "prog", progress: 20, by: "" }] };
const server = (page) => page.evaluate(() => window.__backend.tables.shared_projects[0].data);
const A = (o) => Object.assign({ project_id: "p1", text: "", date: "", time: "", end_time: "", column: "", quantity: "", supplier: "", task_id: "", activity_id: "", percent: 0 }, o);

async function openAssistant(page) {
  await page.locator("#menuBtn").click();
  await page.locator("#assistantMenuBtn").click();
  await expect(page.locator("#assistantView")).toBeVisible();
}

test("a site message becomes diary lines, a task, progress and a calendar event - and ↶ undoes them", async ({ page }) => {
  await openWithSharedProject(page, { phone: ME, native: true, calendarEvents: [], sheet: SHEET });
  await page.evaluate((acts) => {
    window.__fnReplies = { "itask-assistant": () => ({ reply: "רשמתי ביומן של כביש הדקלים, עדכנתי מצעים ל-50% וקבעתי פגישה מחר ב-7:00.", actions: acts }) };
  }, [
    A({ type: "diary_work", text: "פיזור והידוק מצע א' בק\"מ 0.4" }),
    A({ type: "diary_tool", column: "roller", quantity: "1", text: "עד 14:00" }),
    A({ type: "diary_attendance", column: "workers", text: "6 פועלים" }),
    A({ type: "diary_procurement", text: "מצע סוג א'", quantity: "4 משאיות", supplier: "מחצבות השרון" }),
    A({ type: "diary_contractor", text: "עבודות עפר כהן" }),
    A({ type: "complete_task", task_id: "t1" }),
    A({ type: "add_task", text: "להזמין אספלט", date: iso(1) }),
    A({ type: "activity_progress", activity_id: "w1", percent: 50 }),
    A({ type: "calendar_event", text: "פגישה עם המפקח", date: iso(1), time: "07:00" }),
  ]);
  await openAssistant(page);
  await expect(page.locator(".assistant-hello")).toBeVisible();
  await page.locator("#assistantInput").fill("הגיעו 4 משאיות מצע, המכבש עבד עד 14:00, מחר ב-7 פגישה עם המפקח");
  await page.locator("#assistantForm button[type=submit]").click();
  await expect(page.locator(".assistant-msg.theirs").last()).toContainText("רשמתי ביומן של כביש הדקלים");

  // what was sent: the text and a short summary of the projects
  const sent = await page.evaluate(() => window.__backend.log.filter((l) => l.fn === "itask-assistant").map((l) => l.body));
  expect(sent).toHaveLength(1);
  expect(sent[0].text).toContain("4 משאיות מצע");
  expect(sent[0].context.today).toBe(iso(0));
  expect(sent[0].context.projects.find((x) => x.id === "p1")).toMatchObject({ id: "p1", name: "כביש הדקלים", open_tasks: [{ id: "t1", text: "לתאם מכבש" }], activities: [{ id: "w1", progress: 20 }] });

  await expect.poll(async () => {
    const d = await server(page);
    const log = (d.siteLogs || []).find((l) => l.date === iso(0)) || {};
    return {
      works: (log.works || []).map((w) => w.text),
      roller: (log.tools && log.tools.roller || []).map((t) => [t.qty, t.note]),
      workers: (log.attendance && log.attendance.workers || []).map((x) => x.name),
      proc: (log.procurement || []).map((x) => [x.item, x.quantity, x.supplier]),
      contractors: (log.contractors || []).map((x) => x.name),
      done: d.tasks.find((t) => t.id === "t1").status,
      newTask: d.tasks.filter((t) => t.text === "להזמין אספלט").map((t) => t.date),
      plan: d.workPlan.find((x) => x.id === "w1").progress,
    };
  }).toEqual({
    works: ["פיזור והידוק מצע א' בק\"מ 0.4"], roller: [["1", "עד 14:00"]], workers: ["6 פועלים"],
    proc: [["מצע סוג א'", "4 משאיות", "מחצבות השרון"]], contractors: ["עבודות עפר כהן"],
    done: 2, newTask: [iso(1)], plan: 50,
  });
  const events = await page.evaluate(() => Object.values(window.__native.events));
  expect(events).toEqual([expect.objectContaining({ title: "פגישה עם המפקח", allDay: false, description: "כביש הדקלים" })]);
  expect(new Date(events[0].start).getHours()).toBe(7);

  // ↶ undoes everything that message did
  await page.locator(".assistant-undo").click();
  await expect(page.locator(".assistant-msg.theirs").last()).toContainText("ביטלתי");
  await expect.poll(async () => {
    const d = await server(page);
    const log = (d.siteLogs || []).find((l) => l.date === iso(0)) || {};
    return [(log.works || []).length, (log.contractors || []).length, d.tasks.find((t) => t.id === "t1").status,
      d.tasks.filter((t) => t.text === "להזמין אספלט").length, d.workPlan.find((x) => x.id === "w1").progress];
  }).toEqual([0, 0, 0, 0, 20]);
  expect(await page.evaluate(() => Object.keys(window.__native.events).length)).toBe(0);

  // the chat stays after closing and reopening
  await page.locator("#assistantBackBtn").click();
  await openAssistant(page);
  await expect(page.locator(".assistant-msg.mine")).toContainText("4 משאיות מצע");
});

test("a question is answered with no actions; a failure says so", async ({ page }) => {
  await openWithSharedProject(page, { phone: ME, sheet: SHEET });
  await page.evaluate(() => { window.__fnReplies = { "itask-assistant": () => ({ reply: "פתוח לך היום: לתאם מכבש.", actions: [] }) }; });
  await openAssistant(page);
  await page.locator("#assistantInput").fill("מה פתוח לי היום?");
  await page.locator("#assistantInput").press("Enter");
  await expect(page.locator(".assistant-msg.theirs").last()).toHaveText(/פתוח לך היום: לתאם מכבש\./);
  await expect(page.locator(".assistant-undo")).toHaveCount(0);

  await page.evaluate(() => { window.__fnReplies = { "itask-assistant": () => ({ error: "busy" }) }; });
  await page.locator("#assistantInput").fill("הגיעו 2 משאיות");
  await page.locator("#assistantInput").press("Enter");
  await expect(page.locator(".assistant-msg.error")).toContainText("לא הצלחתי");
});

test("on a computer (no phone calendar) an event becomes a task on its day", async ({ page }) => {
  await openWithSharedProject(page, { phone: ME, sheet: SHEET });
  await page.evaluate((a) => { window.__fnReplies = { "itask-assistant": () => ({ reply: "קבעתי.", actions: [a] }) }; },
    A({ type: "calendar_event", text: "פגישה עם המפקח", date: iso(1), time: "07:00" }));
  await openAssistant(page);
  await page.locator("#assistantInput").fill("מחר ב-7 פגישה עם המפקח");
  await page.locator("#assistantInput").press("Enter");
  await expect.poll(async () => (await server(page)).tasks.filter((t) => t.text.includes("פגישה עם המפקח")).map((t) => t.date))
    .toEqual([iso(1)]);
});

test("a message shared from WhatsApp goes to the assistant, with the chosen project", async ({ page }) => {
  await openWithSharedProject(page, { phone: ME, native: true, sheet: SHEET });
  await page.evaluate((a) => { window.__fnReplies = { "itask-assistant": () => ({ reply: "רשמתי ביומן.", actions: [a] }) }; },
    A({ type: "diary_work", text: "הגיעו 3 משאיות מצע" }));
  await expect.poll(() => page.evaluate(() => !!(window.__native.listeners && window.__native.listeners.launchView))).toBe(true);
  await page.evaluate(() => window.__native.listeners.launchView({ view: "share", text: "דני: הגיעו 3 משאיות מצע לק\"מ 0.4" }));
  await expect(page.locator("#shareTaskOverlay")).toBeVisible();
  await page.locator("#shareTaskProject").selectOption("p1");
  await page.locator("#shareTaskAssistantBtn").click();
  await expect(page.locator("#assistantView")).toBeVisible();
  await expect(page.locator(".assistant-msg.theirs").last()).toContainText("רשמתי ביומן");
  const sent = await page.evaluate(() => window.__backend.log.filter((l) => l.fn === "itask-assistant").map((l) => l.body.text));
  expect(sent).toEqual([expect.stringContaining("כביש הדקלים")]);
  expect(sent[0]).toContain("3 משאיות מצע");
  await expect.poll(async () => {
    const d = await server(page);
    const log = (d.siteLogs || []).find((l) => l.date === iso(0)) || {};
    return (log.works || []).map((w) => w.text);
  }).toEqual(["הגיעו 3 משאיות מצע"]);
});
