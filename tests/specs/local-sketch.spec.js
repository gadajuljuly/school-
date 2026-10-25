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

test("sketch: several lines in one held stroke each straighten, keeping their direction", async ({ page }) => {
  await openWithSharedProject(page, { phone: ME, sheets: [{ id: "p1", name: "בניין A", members: [ME], tasks: [] }] });
  await page.locator("#sketchBtn").click();
  await page.locator(".sk-tool[data-tool=pen]").click();
  // a wobbly zig-zag: right, then down-right at a slant, then right again
  const corners = [[40, 100], [180, 110], [250, 260], [340, 250]];
  const pts = [];
  for (let k = 1; k < corners.length; k++) {
    const [ax, ay] = corners[k - 1], [bx, by] = corners[k];
    for (let i = k === 1 ? 0 : 1; i <= 12; i++) {
      const t = i / 12, j = i % 2 ? 2 : -2;
      pts.push([ax + (bx - ax) * t + j, ay + (by - ay) * t - j]);
    }
  }
  await drawHeld(page, pts);
  const all = await els(page);
  expect(all.map((e) => e.type)).toEqual(["stroke"]);
  const got = all[0].pts;
  expect(got.length).toBe(4); // three straight lines
  // each corner where it was drawn (world units are offset from the screen)
  got.forEach((p, i) => {
    expect(Math.abs((p.x - got[0].x) - (corners[i][0] - corners[0][0]))).toBeLessThan(8);
    expect(Math.abs((p.y - got[0].y) - (corners[i][1] - corners[0][1]))).toBeLessThan(8);
  });
});

// a wobbly hand-drawn polygon with n corners on radius r, starting at a corner
const wobblyPolygon = (cx, cy, r, n, rot) => {
  const pts = [];
  for (let k = 0; k < n; k++) {
    const a1 = rot + k / n * Math.PI * 2, a2 = rot + (k + 1) / n * Math.PI * 2;
    const r1 = r * (1 + (k % 2 ? 0.08 : -0.06)), r2 = r * (1 + ((k + 1) % n % 2 ? 0.08 : -0.06));
    for (let i = 0; i < 10; i++) {
      const t = i / 10, j = i % 2 ? 1.5 : -1.5;
      pts.push([cx + r1 * Math.cos(a1) * (1 - t) + r2 * Math.cos(a2) * t + j, cy + r1 * Math.sin(a1) * (1 - t) + r2 * Math.sin(a2) * t - j]);
    }
  }
  pts.push(pts[0]);
  return pts;
};

test("sketch: a held triangle, pentagon or hexagon becomes a perfect one", async ({ page }) => {
  await openWithSharedProject(page, { phone: ME, sheets: [{ id: "p1", name: "בניין A", members: [ME], tasks: [] }] });
  await page.locator("#sketchBtn").click();
  await page.locator(".sk-tool[data-tool=pen]").click();
  const shapes = [[120, 140, 70, 3, -Math.PI / 2], [280, 300, 70, 5, -Math.PI / 2], [140, 460, 65, 6, 0]];
  for (const s of shapes) await drawHeld(page, wobblyPolygon(...s));
  const all = await els(page);
  expect(all.map((e) => e.type)).toEqual(["stroke", "stroke", "stroke"]);
  all.forEach((el, i) => {
    const n = shapes[i][3], p = el.pts;
    expect(p.length).toBe(n + 1); // closed: back to the start
    expect(p[n]).toEqual(p[0]);
    const sides = p.slice(0, n).map((q, k) => Math.hypot(p[k + 1].x - q.x, p[k + 1].y - q.y));
    sides.forEach((s) => expect(Math.abs(s - sides[0])).toBeLessThan(0.5)); // all sides equal
  });
});

test("sketch: pressing a dimension and dragging moves it back and forth, with extension lines", async ({ page }) => {
  await openWithSharedProject(page, { phone: ME, sheets: [{ id: "p1", name: "בניין A", members: [ME], tasks: [] }] });
  await page.locator("#sketchBtn").click();
  await page.locator(".sk-tool[data-tool=dim]").click();
  await drag(page, [40, 160], [240, 160]);
  await page.locator("#sketchTextForm button[type=submit]").click();
  let all = await els(page);
  const { a, b } = all[0];

  await drag(page, [140, 161], [140, 101]); // up
  all = await els(page);
  expect(all).toHaveLength(1); // moved, not a new dimension
  expect(all[0].off).toBe(-60);
  expect(all[0].a).toEqual(a); // still measures the same points
  expect(all[0].b).toEqual(b);

  await drag(page, [140, 101], [140, 191]); // and back down past where it was
  expect((await els(page))[0].off).toBe(30);

  await page.locator("#sketchUndoBtn").click();
  expect((await els(page))[0].off).toBe(-60);

  // pressing away from it still draws a new dimension
  await drag(page, [40, 300], [200, 300]);
  await expect(page.locator("#sketchTextOverlay")).toBeVisible();
});

test("sketch: a new dimension can start where another ends", async ({ page }) => {
  await openWithSharedProject(page, { phone: ME, sheets: [{ id: "p1", name: "בניין A", members: [ME], tasks: [] }] });
  await page.locator("#sketchBtn").click();
  await page.locator(".sk-tool[data-tool=dim]").click();
  await drag(page, [40, 160], [240, 160]);
  await page.locator("#sketchTextForm button[type=submit]").click();
  await drag(page, [240, 160], [240, 300]);
  await page.locator("#sketchTextForm button[type=submit]").click();
  const all = await els(page);
  expect(all.map((e) => e.type)).toEqual(["dim", "dim"]);
  expect(all[0].off || 0).toBe(0);
});

test("sketch share: a shared project's sketch can go straight into its chat as a picture", async ({ page }) => {
  await openWithSharedProject(page, { phone: ME, sheets: [{ id: "p1", name: "בניין A", members: [ME, "+972500000002"], tasks: [] }] });
  await page.locator("#sketchBtn").click();
  await page.locator(".sk-tool[data-tool=line]").click();
  await drag(page, [40, 160], [240, 160]);
  await page.locator("#sketchShareBtn").click();
  await expect(page.locator("#sketchShareOverlay")).toBeVisible();
  await page.locator("#sketchShareChatBtn").click();
  await expect(page.locator("#sketchShareOverlay")).toBeHidden();
  await expect.poll(() => page.evaluate(() => window.__backend.tables.shared_projects[0].messages.length)).toBe(1);
  const msg = await page.evaluate(() => window.__backend.tables.shared_projects[0].messages[0]);
  expect(msg).toMatchObject({ type: "file", phone: ME, fileType: "image/png", fileName: expect.stringMatching(/^סקיצה בניין A .+\.png$/) });
  const up = await page.evaluate(() => window.__backend.uploads);
  expect(up[0].path).toMatch(/^p1\/files\/.+\.png$/);
  expect(up[0].size).toBeGreaterThan(500);
  // the other choice still shares out to other apps; cancel closes it
  await page.locator("#sketchShareBtn").click();
  await page.locator("#sketchShareCancelBtn").click();
  await expect(page.locator("#sketchShareOverlay")).toBeHidden();
});

test("sketch fill: a closed area is painted under its lines; an open one isn't; painting again recolours", async ({ page }) => {
  await openWithSharedProject(page, { phone: ME, sheets: [{ id: "p1", name: "בניין A", members: [ME], tasks: [] }] });
  await page.locator("#sketchBtn").click();
  await page.locator(".sk-tool[data-tool=line]").click();
  // a closed square, and a U open at the top next to it
  for (const [a, b] of [[[60, 100], [200, 100]], [[200, 100], [200, 240]], [[200, 240], [60, 240]], [[60, 240], [60, 100]],
    [[240, 100], [240, 240]], [[240, 240], [340, 240]], [[340, 240], [340, 100]]]) await drag(page, a, b);
  const box = await page.locator("#sketchCanvas").boundingBox();
  const fills = async () => (await els(page)).filter((e) => e.type === "fill");

  await page.locator(".sk-tool[data-tool=fill]").click();
  await page.mouse.click(box.x + 130, box.y + 170);
  let f = await fills();
  expect(f).toHaveLength(1);
  expect(f[0].color).toBe("#1f1f1f");
  expect(f[0].src).toMatch(/^data:image\/png/);
  expect(f[0].w).toBeGreaterThan(135); // the whole square, into the lines
  expect(f[0].w).toBeLessThan(150);

  await page.mouse.click(box.x + 290, box.y + 170); // inside the open U
  await page.mouse.click(box.x + 130, box.y + 400); // outside everything
  expect(await fills()).toHaveLength(1);

  await page.locator(".sk-color[data-color='#c62828']").click();
  await page.mouse.click(box.x + 100, box.y + 140);
  f = await fills();
  expect(f).toHaveLength(1);
  expect(f[0].color).toBe("#c62828");

  // the eraser on a line takes the line, inside the area takes the paint
  await page.locator(".sk-tool[data-tool=eraser]").click();
  await page.mouse.click(box.x + 130, box.y + 170);
  expect(await fills()).toHaveLength(0);
  expect((await els(page)).filter((e) => e.type === "line")).toHaveLength(7);
  await page.locator("#sketchUndoBtn").click();
  expect(await fills()).toHaveLength(1);
});

test("sketch objects: placed from the menu, moved by dragging, sized and turned by the yellow dot", async ({ page }) => {
  await openWithSharedProject(page, { phone: ME, sheets: [{ id: "p1", name: "בניין A", members: [ME], tasks: [] }] });
  await page.locator("#sketchBtn").click();
  await page.locator("#sketchObjBtn").click();
  await expect(page.locator(".sk-obj-pick")).toHaveCount(13);
  await page.locator(".sk-obj-pick[data-obj=car]").click();
  await expect(page.locator("#sketchObjMenu")).toBeHidden();
  let car = (await els(page))[0];
  expect(car).toMatchObject({ type: "obj", kind: "car", rot: 0 });
  expect(car.w / car.h).toBeCloseTo(4.5 / 1.9, 2);
  expect(car.w).toBeCloseTo(90, 0); // 4.5 m, a square being a metre
  const view = await page.evaluate(() => JSON.parse(localStorage.getItem(Object.keys(localStorage).find((x) => x.startsWith("itask-sketch:")))).view);
  const scr = (p) => [(p.x - view.x) * view.z, (p.y - view.y) * view.z];

  // move: drag the body
  const c0 = scr(car.c);
  await drag(page, c0, [c0[0] - 60, c0[1] + 40]);
  let moved = (await els(page))[0];
  expect(moved.c.x - car.c.x).toBeCloseTo(-60, 0);
  expect(moved.c.y - car.c.y).toBeCloseTo(40, 0);
  expect(moved.w).toBe(car.w);

  // the yellow dot at its corner: pulled straight out it doubles the size
  car = moved;
  const hd = [car.c.x + car.w / 2, car.c.y + car.h / 2];
  const h0 = scr({ x: hd[0], y: hd[1] }), cc = scr(car.c);
  await drag(page, h0, [cc[0] + (h0[0] - cc[0]) * 2, cc[1] + (h0[1] - cc[1]) * 2]);
  let big = (await els(page))[0];
  expect(big.w / car.w).toBeCloseTo(2, 1);
  expect(big.rot).toBe(0);
  expect(big.c).toEqual(car.c);

  // ...and swung round the centre it turns (snapping to 15 degrees)
  const r = Math.hypot(big.w / 2, big.h / 2), a0 = Math.atan2(big.h, big.w);
  const target = { x: big.c.x + r * Math.cos(a0 + Math.PI / 2), y: big.c.y + r * Math.sin(a0 + Math.PI / 2) };
  const hd2 = scr({ x: big.c.x + big.w / 2, y: big.c.y + big.h / 2 });
  await drag(page, hd2, scr(target));
  const turned = (await els(page))[0];
  expect(turned.rot).toBeCloseTo(Math.PI / 2, 3);
  expect(turned.w).toBeCloseTo(big.w, 0);

  // undo goes back one gesture at a time
  await page.locator("#sketchUndoBtn").click();
  expect((await els(page))[0].rot).toBe(0);

  // another tool drops the selection; the eraser takes the object
  await page.locator(".sk-tool[data-tool=eraser]").click();
  await page.mouse.click(...(await (async () => { const b = await page.locator("#sketchCanvas").boundingBox(); const p = scr(big.c); return [b.x + p[0], b.y + p[1]]; })()));
  expect(await els(page)).toHaveLength(0);
});

test("sketch fill: textures - paving, road (with a centre line), grass, soil, base course, water", async ({ page }) => {
  await openWithSharedProject(page, { phone: ME, sheets: [{ id: "p1", name: "בניין A", members: [ME], tasks: [] }] });
  await page.locator("#sketchBtn").click();
  await page.locator(".sk-tool[data-tool=line]").click();
  for (const [a, b] of [[[40, 100], [340, 100]], [[340, 100], [340, 160]], [[340, 160], [40, 160]], [[40, 160], [40, 100]]]) await drag(page, a, b);
  const box = await page.locator("#sketchCanvas").boundingBox();
  await page.locator(".sk-tool[data-tool=fill]").click();
  await expect(page.locator("#sketchFillMenu")).toBeVisible();
  await expect(page.locator(".sk-fill-pick")).toHaveCount(6);
  await expect(page.locator(".sk-fill-color")).toHaveCount(5); // plain colours too
  await page.locator(".sk-fill-pick[data-fill=road]").click();
  await expect(page.locator("#sketchFillMenu")).toBeHidden();
  await page.mouse.click(box.x + 190, box.y + 130);
  let f = (await els(page)).filter((e) => e.type === "fill");
  expect(f).toHaveLength(1);
  expect(f[0].pattern).toBe("road");
  expect(Math.abs(Math.sin(f[0].axis.ang))).toBeLessThan(0.05); // along the long side
  // the texture is drawn: a dark road pixel inside the area
  const px = await page.evaluate(({ x, y }) => {
    const c = document.getElementById("sketchCanvas"), d = window.devicePixelRatio || 1;
    return Array.from(c.getContext("2d").getImageData(Math.round(x * d), Math.round(y * d), 1, 1).data);
  }, { x: 100, y: 115 });
  expect(px[0]).toBeLessThan(120);

  await page.locator(".sk-tool[data-tool=fill]").click();
  await page.locator(".sk-fill-pick[data-fill=grass]").click();
  await page.mouse.click(box.x + 190, box.y + 130);
  f = (await els(page)).filter((e) => e.type === "fill");
  expect(f.map((e) => e.pattern)).toEqual(["grass"]);
});

test("sketch objects: each comes in a top view and a side view", async ({ page }) => {
  await openWithSharedProject(page, { phone: ME, sheets: [{ id: "p1", name: "בניין A", members: [ME], tasks: [] }] });
  await page.locator("#sketchBtn").click();
  await page.locator("#sketchObjBtn").click();
  await expect(page.locator(".sk-view-switch button[data-view=top]")).toHaveClass(/on/);
  await page.locator(".sk-obj-pick[data-obj=truck]").click();
  await page.locator("#sketchObjBtn").click();
  await page.locator(".sk-view-switch button[data-view=side]").click();
  await expect(page.locator(".sk-view-switch button[data-view=side]")).toHaveClass(/on/);
  await expect(page.locator(".sk-obj-pick")).toHaveCount(13);
  await page.locator(".sk-obj-pick[data-obj=truck]").click();
  const [top, side] = await els(page);
  expect(top).toMatchObject({ kind: "truck", view: "top" });
  expect(side).toMatchObject({ kind: "truck", view: "side" });
  expect(top.w / top.h).toBeCloseTo(9 / 2.5, 2); // seen from above: length x width
  expect(side.w / side.h).toBeCloseTo(9 / 3.4, 2); // from the side: length x height
  // the menu remembers the last view
  await page.locator("#sketchObjBtn").click();
  await expect(page.locator(".sk-view-switch button[data-view=side]")).toHaveClass(/on/);
});

test("sketch fill: back to a plain colour after a texture", async ({ page }) => {
  await openWithSharedProject(page, { phone: ME, sheets: [{ id: "p1", name: "בניין A", members: [ME], tasks: [] }] });
  await page.locator("#sketchBtn").click();
  await page.locator(".sk-tool[data-tool=line]").click();
  for (const [a, b] of [[[60, 100], [200, 100]], [[200, 100], [200, 240]], [[200, 240], [60, 240]], [[60, 240], [60, 100]]]) await drag(page, a, b);
  const box = await page.locator("#sketchCanvas").boundingBox();
  await page.locator(".sk-tool[data-tool=fill]").click();
  await page.locator(".sk-fill-pick[data-fill=grass]").click();
  await page.mouse.click(box.x + 130, box.y + 170);
  await page.locator(".sk-tool[data-tool=fill]").click();
  await page.locator(".sk-fill-color[data-color='#2e4fb8']").click();
  await expect(page.locator(".sk-color[data-color='#2e4fb8']")).toHaveClass(/on/);
  await page.mouse.click(box.x + 130, box.y + 170);
  const f = (await els(page)).filter((e) => e.type === "fill");
  expect(f).toHaveLength(1);
  expect(f[0].pattern).toBeUndefined();
  expect(f[0].color).toBe("#2e4fb8");
});

test("the sketch icon is hidden in the library and back with the tasks", async ({ page }) => {
  await openWithSharedProject(page, { phone: ME, sheets: [{ id: "p1", name: "בניין A", members: [ME], tasks: [] }] });
  await expect(page.locator("#sketchBtn")).toBeVisible();
  await page.locator("#libraryBtn").click();
  await expect(page.locator("#libraryFoldersView")).toBeVisible();
  await expect(page.locator("#sketchBtn")).toBeHidden();
  await page.locator("#tasksFabBtn").click();
  await expect(page.locator("#sketchBtn")).toBeVisible();
});

test("sketch #: a new line starting near the end of another is caught exactly on it", async ({ page }) => {
  await openWithSharedProject(page, { phone: ME, sheets: [{ id: "p1", name: "בניין A", members: [ME], tasks: [] }] });
  await page.locator("#sketchBtn").click();
  await page.locator(".sk-tool[data-tool=line]").click();
  // one line drawn off the grid (# off)...
  await page.locator("#sketchSnapBtn").click();
  await drag(page, [40, 103], [193, 147]);
  await page.locator("#sketchSnapBtn").click(); // # on again
  const first = (await els(page))[0];
  expect(first.b.x % 10).not.toBe(0);
  // ...a new one started a few pixels from its end starts exactly there
  await drag(page, [199, 151], [300, 260]);
  // and one ended a few pixels from its start ends exactly there
  await drag(page, [300, 260], [45, 108]);
  const [, second, third] = await els(page);
  expect(second.a).toEqual(first.b);
  expect(third.b).toEqual(first.a);
  expect(third.a).toEqual(second.b);
  // far from any end it still sits on the grid
  await drag(page, [80, 400], [203, 400]);
  const fourth = (await els(page))[3];
  expect(fourth.a.x % 10).toBe(0);
  expect(fourth.b.x % 10).toBe(0);
});
