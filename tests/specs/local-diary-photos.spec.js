const { test, expect } = require("@playwright/test");
const { openWithSharedProject } = require("./helpers/local-app");
const path = require("path");

// יומן – תמונות מהשטח: photos stamped with project / date / time / weather,
// saved to the library under תמונות / the day and listed in the diary.
// Open-Meteo is answered here, not over the network.
test.use({ viewport: { width: 390, height: 800 }, serviceWorkers: "block" });
const ME = "+972500000001";
const PNG = path.join(__dirname, "../../tasks-icon-192.png");
const server = (page) => page.evaluate(() => window.__backend.tables.shared_projects[0].data);
const todayDots = () => { const d = new Date(), p = (n) => String(n).padStart(2, "0"); return `${p(d.getDate())}.${p(d.getMonth() + 1)}.${d.getFullYear()}`; };

async function fakeWeather(page, asked) {
  await page.route("https://api.open-meteo.com/**", (r) => { asked.push(r.request().url()); r.fulfill({ json: { current: { temperature_2m: 24.4, weather_code: 1, wind_speed_10m: 12 } } }); });
  await page.route("https://geocoding-api.open-meteo.com/**", (r) => { asked.push(r.request().url()); r.fulfill({ json: { results: [{ name: "טירה", latitude: 32.23, longitude: 34.95 }] } }); });
}

test.describe("with the phone's location", () => {
  test.use({ geolocation: { latitude: 32.1, longitude: 34.9 }, permissions: ["geolocation"] });
  test("a photo goes to the day's diary and to the library under תמונות / the date, with the weather", async ({ page }) => {
    const asked = [];
    await openWithSharedProject(page, { phone: ME, sheet: { id: "p1", name: "בניין A", members: [ME], tasks: [] } });
    await fakeWeather(page, asked); // (after the helper's own "nothing outside" route)
    await page.locator("#calendarFabBtn").click();
    await page.locator("#siteLogPhotosBtn").click();
    await expect(page.locator("#diaryPhotosView")).toBeVisible();
    await expect(page.locator("#diaryPhotosGrid")).toContainText("עוד אין תמונות");
    await page.locator("#diaryPhotosCameraInput").setInputFiles(PNG);
    await expect(page.locator("#diaryPhotosGrid .library-item")).toHaveCount(1);
    await expect(page.locator("#diaryPhotosWeather")).toHaveText("מזג אוויר: 🌤 24°C מעונן חלקית");
    expect(asked[0]).toContain("latitude=32.1"); // where the phone is
    // the diary
    await expect.poll(async () => ((await server(page)).siteLogs || [])[0]?.photos?.length).toBe(1);
    const log = (await server(page)).siteLogs[0];
    expect(log.weather).toBe("🌤 24°C מעונן חלקית");
    expect(log.photos[0]).toMatchObject({ type: "image/jpeg", weather: "🌤 24°C מעונן חלקית" });
    // the library: תמונות / today's date
    await expect.poll(async () => {
      const f = (await server(page)).folders || [];
      const photos = f.find((x) => x.key === "photos");
      const day = photos && f.find((x) => x.parentId === photos.id);
      return day && [day.name, day.files.length];
    }).toEqual([todayDots(), 1]);
    const up = await page.evaluate(() => window.__backend.uploads);
    expect(up[0].path).toMatch(/\.jpg$/);
    // two more from the gallery: the same day folder
    await page.locator("#diaryPhotosGalleryInput").setInputFiles([PNG, PNG]);
    await expect(page.locator("#diaryPhotosGrid .library-item")).toHaveCount(3);
    await expect.poll(async () => (await server(page)).folders.filter((x) => x.name === todayDots()).length).toBe(1);
  });
});

test("no location: the site's town is asked once, then used", async ({ page, context }) => {
  await context.clearPermissions();
  const asked = [];
  await openWithSharedProject(page, { phone: ME, sheet: { id: "p1", name: "בניין A", members: [ME], tasks: [] } });
  await fakeWeather(page, asked);
  await page.locator("#calendarFabBtn").click();
  await page.locator("#siteLogPhotosBtn").click();
  await page.locator("#diaryPhotosCameraInput").setInputFiles(PNG);
  await expect(page.locator("#diaryPlaceOverlay")).toBeVisible({ timeout: 10000 });
  await page.locator("#diaryPlaceInput").fill("טירה");
  await page.locator("#diaryPlaceOkBtn").click();
  await expect(page.locator("#diaryPhotosGrid .library-item")).toHaveCount(1);
  expect(asked.some((u) => u.includes("geocoding"))).toBe(true);
  expect(asked.some((u) => u.includes("latitude=32.23"))).toBe(true);
});
