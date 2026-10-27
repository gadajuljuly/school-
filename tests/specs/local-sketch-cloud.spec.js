const { test, expect } = require("@playwright/test");
const { openWithSharedProject } = require("./helpers/local-app");

// סקיצות on the server: each sketch a JSON file in the project's storage,
// their list in the project's data - so every member (and every phone)
// has them. The fake storage here keeps what's uploaded.
test.use({ viewport: { width: 390, height: 800 }, serviceWorkers: "block" });
const ME = "+972500000001", DANA = "+972500000002";
const server = (page) => page.evaluate(() => window.__backend.tables.shared_projects[0].data);

async function keepingStorage(page, files) {
  await page.evaluate((files) => {
    window.__files = Object.assign({}, files || {});
    const st = window.__backend.client.storage, from = st.from;
    st.from = (b) => Object.assign(from(b), {
      upload: (p, blob) => blob.text().then((t) => { window.__files[p] = t; return { data: { path: p }, error: null }; }),
      createSignedUrl: (p) => Promise.resolve({ data: { signedUrl: URL.createObjectURL(new Blob([window.__files[p] || "{}"], { type: "application/json" })) }, error: null }),
      remove: (ps) => { ps.forEach((p) => { delete window.__files[p]; }); return Promise.resolve({ data: ps, error: null }); },
    });
  }, files);
}
async function drag(page, from, to) {
  const box = await page.locator("#sketchCanvas").boundingBox();
  await page.mouse.move(box.x + from[0], box.y + from[1]);
  await page.mouse.down();
  for (let i = 1; i <= 8; i++) await page.mouse.move(box.x + from[0] + (to[0] - from[0]) * i / 8, box.y + from[1] + (to[1] - from[1]) * i / 8);
  await page.mouse.up();
}

test("what's drawn goes up to the project (file + list entry); leaving sends it at once", async ({ page }) => {
  await openWithSharedProject(page, { phone: ME, sheets: [{ id: "p1", name: "בניין A", members: [ME, DANA], tasks: [] }] });
  await keepingStorage(page);
  await page.locator("#sketchBtn").click();
  await expect(page.locator("#sketchTitle")).toHaveText("סקיצה 1 ▾ · בניין A");
  await page.locator(".sk-tool[data-tool=line]").click();
  await drag(page, [40, 160], [240, 160]);
  // a few seconds after the drawing stops
  await expect.poll(async () => ((await server(page)).sketches || []).map((s) => [s.name, s.updatedBy]), { timeout: 8000 }).toEqual([["סקיצה 1", ME]]);
  const id = (await server(page)).sketches[0].id;
  const file = JSON.parse(await page.evaluate((id) => window.__files["p1/sketches/" + id + ".json"], id));
  expect(file.els.map((e) => e.type)).toEqual(["line"]);
  // another line, then straight out: no waiting
  await drag(page, [40, 260], [240, 260]);
  await page.locator("#sketchCloseBtn").click();
  await expect.poll(async () => JSON.parse(await page.evaluate((id) => window.__files["p1/sketches/" + id + ".json"], id)).els.length).toBe(2);
});

test("another member's phone opens the project's sketch from the server", async ({ page }) => {
  const els = [{ type: "line", a: { x: 0, y: 0 }, b: { x: 100, y: 0 }, color: "#c62828", w: 3 }];
  await openWithSharedProject(page, { phone: DANA, sheets: [{ id: "p1", name: "בניין A", members: [ME, DANA], tasks: [],
    sketches: [{ id: "s1", name: "חתך קיר", updatedAt: Date.now() - 60000, updatedBy: ME }] }] });
  await keepingStorage(page, { "p1/sketches/s1.json": JSON.stringify({ name: "חתך קיר", els, scale: null }) });
  await page.locator("#sketchBtn").click();
  await expect(page.locator("#sketchTitle")).toHaveText("חתך קיר ▾ · בניין A");
  await expect.poll(() => page.evaluate(() => {
    const k = Object.keys(localStorage).find((x) => x.startsWith("itask-sketch:p1:s1"));
    return k && JSON.parse(localStorage.getItem(k)).els.length;
  })).toBe(1);
});

test("the list: a new sketch, switching, renaming, deleting; the old single draft becomes a sketch", async ({ page }) => {
  await openWithSharedProject(page, { phone: ME, sheets: [{ id: "p1", name: "בניין A", members: [ME], tasks: [] }] });
  await keepingStorage(page);
  // a draft from before (one per project)
  await page.evaluate(() => localStorage.setItem("itask-sketch:p1", JSON.stringify({ els: [{ type: "line", a: { x: 0, y: 0 }, b: { x: 50, y: 0 } }], scale: null, view: { x: 0, y: 0, z: 1 } })));
  await page.locator("#sketchBtn").click();
  await expect(page.locator("#sketchTitle")).toHaveText("סקיצה 1 ▾ · בניין A");
  expect(await page.evaluate(() => localStorage.getItem("itask-sketch:p1"))).toBe(null); // moved
  await expect.poll(async () => ((await server(page)).sketches || []).length, { timeout: 8000 }).toBe(1); // and sent up

  await page.locator("#sketchTitle").click();
  await expect(page.locator("#sketchListRows .sk-list-row")).toHaveCount(1);
  await page.locator("#sketchNewBtn").click();
  await expect(page.locator("#sketchTitle")).toHaveText("סקיצה 2 ▾ · בניין A");
  await page.locator(".sk-tool[data-tool=line]").click();
  await drag(page, [40, 300], [300, 300]);
  await expect.poll(async () => ((await server(page)).sketches || []).map((s) => s.name).sort(), { timeout: 8000 }).toEqual(["סקיצה 1", "סקיצה 2"]);

  // rename "סקיצה 2"
  await page.locator("#sketchTitle").click();
  await page.locator(".sk-list-row", { hasText: "סקיצה 2" }).locator(".sk-list-btn", { hasText: "✎" }).click();
  await page.locator("#sketchNameInput").fill("קומת קרקע");
  await page.locator("#sketchNameOkBtn").click();
  await expect(page.locator("#sketchTitle")).toHaveText("קומת קרקע ▾ · בניין A");
  await expect.poll(async () => (await server(page)).sketches.map((s) => s.name).sort()).toEqual(["סקיצה 1", "קומת קרקע"]);

  // back to "סקיצה 1": its own drawing
  await page.locator(".sk-list-row", { hasText: "סקיצה 1" }).locator(".sk-list-open").click();
  await expect(page.locator("#sketchTitle")).toHaveText("סקיצה 1 ▾ · בניין A");
  const cur = await page.evaluate(() => { const id = localStorage.getItem("itask-sketch-cur:p1"); return JSON.parse(localStorage.getItem("itask-sketch:p1:" + id)); });
  expect(cur.els[0].b.x).toBe(50);

  // delete "קומת קרקע": off the list and out of storage
  await page.locator("#sketchTitle").click();
  const idK = (await server(page)).sketches.find((s) => s.name === "קומת קרקע").id;
  await page.locator(".sk-list-row", { hasText: "קומת קרקע" }).locator(".sk-list-btn", { hasText: "🗑" }).click();
  if (await page.locator("#confirmOverlay").isVisible()) await page.locator("#confirmYesBtn").click();
  await expect.poll(async () => (await server(page)).sketches.map((s) => s.name)).toEqual(["סקיצה 1"]);
  expect(await page.evaluate((id) => window.__files["p1/sketches/" + id + ".json"], idK)).toBeUndefined();
});
