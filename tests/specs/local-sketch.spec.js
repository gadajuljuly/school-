const { test, expect } = require("@playwright/test");
const { openWithSharedProject } = require("./helpers/local-app");

// סקיצה: the sketch pad on squared paper.
test.use({ viewport: { width: 390, height: 800 }, serviceWorkers: "block" });
const ME = "+972500000001";
const els = (page) => page.evaluate(() => {
  const k = Object.keys(localStorage).find((x) => x.startsWith("itask-sketch:"));
  return k ? JSON.parse(localStorage.getItem(k)).els : [];
});
async function drag(page, from, to, hold) {
  const box = await page.locator("#sketchCanvas").boundingBox();
  await page.mouse.move(box.x + from[0], box.y + from[1]);
  await page.mouse.down();
  const steps = 8;
  for (let i = 1; i <= steps; i++) {
    await page.mouse.move(box.x + from[0] + (to[0] - from[0]) * i / steps, box.y + from[1] + (to[1] - from[1]) * i / steps + (hold ? (i % 2) * 2 : 0));
  }
  if (hold) await page.waitForTimeout(800);
  await page.mouse.up();
}

test("sketch: lines, scale, dimension, callout, text, eraser, undo; the draft stays; saved as PDF to a folder", async ({ page }) => {
  await openWithSharedProject(page, { phone: ME, sheets: [{ id: "p1", name: "בניין A", members: [ME], tasks: [] }] });
  await expect(page.locator("#sketchBtn")).toBeVisible();
  await page.locator("#sketchBtn").click();
  await expect(page.locator("#sketchView")).toBeVisible();
  await expect(page.locator("#sketchTitle")).toContainText("בניין A");

  // a hand-drawn, slightly wobbly line held at its end becomes straight
  await page.locator(".sk-tool[data-tool=pen]").click();
  await drag(page, [40, 100], [240, 103], true);
  await expect.poll(async () => (await els(page)).map((e) => e.type)).toEqual(["line"]);
  const line = (await els(page))[0];
  expect(line.a.y).toBe(line.b.y); // snapped level

  // scale: a square = 50 cm
  await page.locator("#sketchScaleBtn").click();
  await page.locator("#sketchScalePer").fill("50");
  await page.locator("#sketchScaleSaveBtn").click();
  await expect(page.locator("#sketchScaleLabel")).toContainText("50");

  // dimension: the real length offered, changeable to any text
  await page.locator(".sk-tool[data-tool=dim]").click();
  await drag(page, [40, 160], [240, 160]);
  await expect(page.locator("#sketchTextOverlay")).toBeVisible();
  await expect(page.locator("#sketchTextInput")).toHaveValue(/^5\.00 מ'$/); // 200px = 10 squares = 5 m
  await page.locator("#sketchTextForm button[type=submit]").click();
  await page.locator(".sk-tool[data-tool=dim]").click();
  await drag(page, [40, 220], [140, 220]);
  await page.locator("#sketchTextInput").fill("רוחב פתח");
  await page.locator("#sketchTextForm button[type=submit]").click();

  // callout: arrow from a point to a shelf with text
  await page.locator(".sk-tool[data-tool=leader]").click();
  await drag(page, [100, 300], [180, 260]);
  await page.locator("#sketchTextInput").fill("עמוד 30/30");
  await page.locator("#sketchTextForm button[type=submit]").click();

  // text
  await page.locator(".sk-tool[data-tool=text]").click();
  const box = await page.locator("#sketchCanvas").boundingBox();
  await page.mouse.click(box.x + 200, box.y + 380);
  await page.locator("#sketchTextInput").fill("חדר 1");
  await page.locator("#sketchTextForm button[type=submit]").click();

  let all = await els(page);
  expect(all.map((e) => e.type)).toEqual(["line", "dim", "dim", "leader", "text"]);
  expect(all[1].text).toBe("5.00 מ'");
  expect(all[2].text).toBe("רוחב פתח");
  expect(all[3].text).toBe("עמוד 30/30");

  // eraser: tap the text away; undo brings it back
  await page.locator(".sk-tool[data-tool=eraser]").click();
  await page.mouse.click(box.x + 200, box.y + 380);
  await expect.poll(async () => (await els(page)).length).toBe(4);
  await page.locator("#sketchUndoBtn").click();
  await expect.poll(async () => (await els(page)).length).toBe(5);

  // the draft is kept: close and reopen
  await page.locator("#sketchCloseBtn").click();
  await page.locator("#sketchBtn").click();
  await expect.poll(async () => (await els(page)).length).toBe(5);

  // save into a library folder as a PDF
  await page.locator("#sketchSaveBtn").click();
  await page.locator("#chatSaveFolderOverlay button", { hasText: "תוכניות" }).click();
  await expect.poll(async () => {
    const f = (await page.evaluate(() => window.__backend.tables.shared_projects[0].data.folders || [])).find((x) => x.key === "plans");
    return f && f.files.map((x) => x.name);
  }).toEqual([expect.stringMatching(/^סקיצה בניין A .+\.pdf$/)]);
});

// a hand-drawn closed shape, held at its end, then the finger wobbles and lifts
async function drawHeld(page, points) {
  const box = await page.locator("#sketchCanvas").boundingBox();
  await page.mouse.move(box.x + points[0][0], box.y + points[0][1]);
  await page.mouse.down();
  for (const [x, y] of points.slice(1)) await page.mouse.move(box.x + x, box.y + y);
  await page.waitForTimeout(800); // held: straightened
  const [lx, ly] = points[points.length - 1];
  await page.mouse.move(box.x + lx + 6, box.y + ly + 5); // the finger moves a bit as it lifts
  await page.mouse.move(box.x + lx + 14, box.y + ly - 9);
  await page.mouse.up();
}
const wobblyCircle = (cx, cy, rx, ry) => Array.from({ length: 40 }, (_, i) => {
  const a = i / 38 * Math.PI * 2, j = (i % 3) - 1;
  return [cx + (rx + j * 2) * Math.cos(a), cy + (ry + j * 2) * Math.sin(a)];
});

test("sketch: a held hand-drawn circle becomes a circle, a box a rectangle - and stays so as the finger lifts", async ({ page }) => {
  await openWithSharedProject(page, { phone: ME, sheets: [{ id: "p1", name: "בניין A", members: [ME], tasks: [] }] });
  await page.locator("#sketchBtn").click();
  await page.locator(".sk-tool[data-tool=pen]").click();

  await drawHeld(page, wobblyCircle(120, 140, 60, 56));
  let all = await els(page);
  expect(all.map((e) => e.type)).toEqual(["circle"]);
  expect(all[0].rx).toBeUndefined(); // round enough: a true circle
  expect(all[0].r).toBeGreaterThan(50);

  await drawHeld(page, wobblyCircle(260, 330, 90, 45));
  all = await els(page);
  expect(all[1]).toMatchObject({ type: "circle" });
  expect(all[1].rx / all[1].ry).toBeGreaterThan(1.6); // an ellipse

  const box = [[60, 420], [130, 418], [200, 421], [260, 420], [262, 470], [259, 520], [200, 522], [130, 519], [60, 521], [58, 470], [61, 423]];
  await drawHeld(page, box);
  all = await els(page);
  expect(all[2].type).toBe("rect");
  const r = all[2];
  // the lift didn't stretch it or turn it into a line
  expect(Math.abs((r.b.x - r.a.x) - 200)).toBeLessThan(15);
  expect(Math.abs((r.b.y - r.a.y) - 100)).toBeLessThan(15);
});

test("sketch eraser: only the piece between crossings or corners goes", async ({ page }) => {
  await openWithSharedProject(page, { phone: ME, sheets: [{ id: "p1", name: "בניין A", members: [ME], tasks: [] }] });
  await page.evaluate(() => {
    localStorage.setItem("itask-sketch:p1", JSON.stringify({ scale: null, view: { x: 0, y: 0, z: 1 }, els: [
      { type: "line", a: { x: 40, y: 100 }, b: { x: 340, y: 100 }, color: "#1f1f1f", w: 3 },   // crossed twice
      { type: "line", a: { x: 140, y: 40 }, b: { x: 140, y: 160 }, color: "#1f1f1f", w: 3 },
      { type: "line", a: { x: 240, y: 40 }, b: { x: 240, y: 160 }, color: "#1f1f1f", w: 3 },
      { type: "rect", a: { x: 60, y: 240 }, b: { x: 300, y: 360 }, color: "#c62828", w: 3 },
    ] }));
  });
  await page.locator("#sketchBtn").click();
  await page.locator(".sk-tool[data-tool=eraser]").click();
  const box = await page.locator("#sketchCanvas").boundingBox();
  // the middle of the long line, between the two crossings
  await page.mouse.click(box.x + 190, box.y + 100);
  let all = await els(page);
  const horiz = all.filter((e) => e.type === "line" && e.a.y === 100 && e.b.y === 100);
  expect(horiz.map((e) => [Math.round(e.a.x), Math.round(e.b.x)]).sort((a, b) => a[0] - b[0])).toEqual([[40, 140], [240, 340]]);
  // the rectangle's top side, corner to corner: the other three sides stay
  await page.mouse.click(box.x + 180, box.y + 240);
  all = await els(page);
  expect(all.some((e) => e.type === "rect")).toBe(false);
  const red = all.filter((e) => e.color === "#c62828");
  expect(red).toHaveLength(3);
  expect(red.every((e) => !(e.a.y === 240 && e.b.y === 240))).toBe(true);
  // a line with nothing crossing it goes whole
  await page.mouse.click(box.x + 140, box.y + 50);
  all = await els(page);
  expect(all.filter((e) => e.type === "line" && e.a.x === 140 && e.b.x === 140 && e.a.y === 40)).toHaveLength(0);
});
