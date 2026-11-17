const { test, expect } = require("@playwright/test");
const { openWithSharedProject } = require("./helpers/local-app");
const path = require("path");

// The toolbox's site tools (src/app/14n-site-tools.js): the forecast, slope
// and level, the site camera, measuring on the map.
test.use({ viewport: { width: 390, height: 800 }, serviceWorkers: "block", geolocation: { latitude: 32.1, longitude: 34.9 }, permissions: ["geolocation"] });
const ME = "+972500000001";
const PNG = path.join(__dirname, "../../tasks-icon-192.png");
const open = (page) => openWithSharedProject(page, { phone: ME, sheet: { id: "p1", name: "בניין A", members: [ME], tasks: [] } });
const tool = async (page, id) => { await page.locator("#toolboxBtn").click(); await page.locator(id).click(); };
const day = (i) => { const d = new Date(); d.setDate(d.getDate() + i); return d.toISOString().slice(0, 10); };

test("the forecast: the week at the site, with what it means for the work", async ({ page }) => {
  await open(page);
  const asked = [];
  await page.route("https://api.open-meteo.com/**", (r) => {
    asked.push(r.request().url());
    const hours = Array.from({ length: 48 }, (_, i) => new Date(Date.now() + i * 3600000).toISOString().slice(0, 13) + ":00");
    r.fulfill({ json: {
      daily: {
        time: [0, 1, 2, 3, 4, 5, 6].map(day), weather_code: [0, 61, 1, 3, 0, 0, 0],
        temperature_2m_max: [28, 20, 37, 22, 22, 22, 22], temperature_2m_min: [15, 12, 25, 14, 3, 14, 14],
        precipitation_sum: [0, 8.2, 0, 0, 0, 0, 0], precipitation_probability_max: [0, 90, 0, 10, 0, 0, 0],
        wind_speed_10m_max: [10, 20, 15, 45, 10, 10, 10], wind_gusts_10m_max: [20, 30, 25, 70, 20, 20, 20]
      },
      hourly: { time: hours, temperature_2m: hours.map(() => 24), wind_speed_10m: hours.map(() => 12), precipitation_probability: hours.map((_, i) => (i === 2 ? 40 : 0)), weather_code: hours.map(() => 1) }
    } });
  });
  await tool(page, "#toolboxWeather");
  await expect(page.locator("#weatherToolView")).toBeVisible();
  await expect(page.locator(".wt-day")).toHaveCount(7);
  expect(asked[0]).toContain("latitude=32.1");
  await expect(page.locator(".wt-day").nth(0)).toContainText("היום");
  await expect(page.locator(".wt-day").nth(0).locator(".wt-chip")).toHaveText(["יום טוב לעבודה"]);
  await expect(page.locator(".wt-day").nth(1).locator(".wt-chip.rain")).toHaveText("גשם - לא ליציקה / אספלט");
  await expect(page.locator(".wt-day").nth(2).locator(".wt-chip.heat")).toBeVisible();
  await expect(page.locator(".wt-day").nth(3).locator(".wt-chip.wind")).toBeVisible();
  await expect(page.locator(".wt-day").nth(4).locator(".wt-chip.cold")).toBeVisible();
  await expect(page.locator(".wt-hour")).toHaveCount(24);
  await page.locator("#weatherToolBackBtn").click();
  await expect(page.locator("#weatherToolView")).toBeHidden();
});

test("slope and level: from the phone's tilt; calibrate; hold", async ({ page }) => {
  await open(page);
  const tilt = (x, y, z) => page.evaluate(([x, y, z]) => {
    for (let i = 0; i < 60; i++) {
      const e = new Event("devicemotion");
      e.accelerationIncludingGravity = { x, y, z };
      window.dispatchEvent(e);
    }
  }, [x, y, z]);
  await tool(page, "#toolboxMeasure");
  await expect(page.locator("#levelToolView")).toBeVisible();
  await expect(page.locator("#lvPaneSlope")).toBeVisible();
  // lying on a 2% slope along its length
  const g = 9.81, a = Math.atan(0.02);
  await tilt(0, g * Math.sin(a), g * Math.cos(a));
  await expect(page.locator("#lvSlopePct")).toHaveText("2.0%");
  await expect(page.locator("#lvSlopeDeg")).toHaveText("1.1°");
  await expect(page.locator("#lvSlopeMm")).toHaveText('2.0 ס"מ לכל מטר');
  // hold: the numbers stay
  await page.locator("#lvHoldBtn").click();
  await tilt(0, 0, g);
  await expect(page.locator("#lvSlopePct")).toHaveText("2.0%");
  await page.locator("#lvHoldBtn").click();
  await expect(page.locator("#lvSlopePct")).toHaveText("0.0%");
  // the level: the bubble; level -> green
  await page.locator(".lv-tab[data-lv=level]").click();
  await expect(page.locator("#lvVial")).toHaveClass(/ok/);
  await tilt(g * Math.sin(0.05), 0, g * Math.cos(0.05));
  await expect(page.locator("#lvAxisX")).toHaveText("↔ 2.9°");
  await expect(page.locator("#lvVial")).not.toHaveClass(/ok/);
  // calibrate: this surface is zero now
  await page.locator("#lvZeroBtn").click();
  await expect(page.locator("#lvAxisX")).toHaveText("↔ 0.0°");
  await expect(page.locator("#lvVial")).toHaveClass(/ok/);
  // the camera tape: in the phone app only
  await page.locator(".lv-tab[data-lv=ar]").click();
  await expect(page.locator("#lvPaneAr")).toBeVisible();
  await expect(page.locator("#lvFoot")).toBeHidden();
  await page.locator("#lvArStartBtn").click();
  await expect(page.locator("#appToast")).toContainText("באפליקציה");
});

test("the camera tape: the phone app's own screen; what it measured shows", async ({ page }) => {
  await openWithSharedProject(page, { phone: ME, native: true, sheet: { id: "p1", name: "בניין A", members: [ME], tasks: [] } });
  await page.evaluate(() => {
    const p = window.Capacitor.Plugins.ItaskAlarm;
    const f = p.features.bind(p);
    p.features = () => f().then((r) => Object.assign({}, r, { arMeasure: true }));
    p.measureAR = () => Promise.resolve({ lines: ["2.35 מ'", "0.80 מ'"] });
  });
  await tool(page, "#toolboxMeasure");
  await page.locator(".lv-tab[data-lv=ar]").click();
  await page.locator("#lvArStartBtn").click();
  await expect(page.locator(".lv-ar-row")).toHaveText(["0.80 מ'", "2.35 מ'"]);
});

test("the site camera: a photo straight into today's diary", async ({ page }) => {
  await open(page);
  await page.route("https://api.open-meteo.com/**", (r) => r.fulfill({ json: { current: { temperature_2m: 24, weather_code: 1, wind_speed_10m: 5 } } }));
  await page.locator("#toolboxBtn").click();
  const chooser = page.waitForEvent("filechooser");
  await page.locator("#toolboxCamera").click();
  await (await chooser).setFiles(PNG);
  await expect.poll(() => page.evaluate(() => ((window.__backend.tables.shared_projects[0].data.siteLogs || [])[0] || {}).photos?.length)).toBe(1);
  const log = await page.evaluate(() => window.__backend.tables.shared_projects[0].data.siteLogs[0]);
  expect(log.date).toBe(await page.evaluate(() => { const d = new Date(), p = (n) => String(n).padStart(2, "0"); return d.getFullYear() + "-" + p(d.getMonth() + 1) + "-" + p(d.getDate()); }));
});

test("measuring on the map: a distance, then an area", async ({ page }) => {
  await open(page);
  await tool(page, "#toolboxMap");
  await expect(page.locator("#mapMeasureView")).toBeVisible();
  await expect(page.locator("#mmMap.leaflet-container")).toBeVisible();
  await expect(page.locator("#mmResult")).toHaveText("הקישו על המפה כדי לסמן נקודות");
  const box = await page.locator("#mmMap").boundingBox();
  const at = (x, y) => page.mouse.click(box.x + x, box.y + y);
  await at(100, 100); await at(250, 100);
  await expect(page.locator("#mmResult")).toHaveText(/^מרחק: [\d.]+ (מ'|ק"מ)$/);
  await expect(page.locator(".mm-seg")).toHaveCount(1);
  await at(250, 250);
  await page.locator(".mm-mode[data-mm=area]").click();
  await expect(page.locator("#mmResult")).toHaveText(/^שטח: .+ · היקף: .+$/);
  await page.locator("#mmUndoBtn").click();
  await expect(page.locator(".mm-seg")).toHaveCount(1);
  await page.locator("#mmClearBtn").click();
  await expect(page.locator("#mmResult")).toHaveText("הקישו על המפה כדי לסמן נקודות");
});
