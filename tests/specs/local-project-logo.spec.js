const { test, expect } = require("@playwright/test");
const { openWithSharedProject } = require("./helpers/local-app");

// The project's logo by its name: a tap shows the logos to change it; a
// project with none shows a square with an X there, which does the same.
test.use({ viewport: { width: 390, height: 800 }, serviceWorkers: "block" });

const ME = "+972500000001";
// a 2x2 PNG, in a colour per logo
const png = (r, g, b) => {
  const zlib = require("zlib");
  const crc = (buf) => { let c, crcTable = []; for (let n = 0; n < 256; n++) { c = n; for (let k = 0; k < 8; k++) c = c & 1 ? 0xedb88320 ^ (c >>> 1) : c >>> 1; crcTable[n] = c >>> 0; } let x = 0xffffffff; for (const v of buf) x = crcTable[(x ^ v) & 0xff] ^ (x >>> 8); return (x ^ 0xffffffff) >>> 0; };
  const chunk = (type, data) => { const len = Buffer.alloc(4); len.writeUInt32BE(data.length); const td = Buffer.concat([Buffer.from(type), data]); const c = Buffer.alloc(4); c.writeUInt32BE(crc(td)); return Buffer.concat([len, td, c]); };
  const ihdr = Buffer.alloc(13); ihdr.writeUInt32BE(2, 0); ihdr.writeUInt32BE(2, 4); ihdr[8] = 8; ihdr[9] = 2;
  const row = Buffer.from([0, r, g, b, r, g, b]);
  return Buffer.concat([Buffer.from([137, 80, 78, 71, 13, 10, 26, 10]), chunk("IHDR", ihdr), chunk("IDAT", zlib.deflateSync(Buffer.concat([row, row]))), chunk("IEND", Buffer.alloc(0))]);
};

test("a project with no logo: an X square that opens the logos; a new one set on it; tapped to change or remove it", async ({ page }) => {
  await openWithSharedProject(page, { phone: ME, sheets: [{ id: "p1", name: "כביש הדקלים", members: [ME], tasks: [] }] });
  const empty = page.locator("#sheetTitleLogoEmpty");
  const logo = page.locator("#sheetTitleLogo");
  const picker = page.locator("#logoPickerOverlay");
  await expect(empty).toBeVisible();
  await expect(empty).toHaveText("✕");
  await expect(logo).toBeHidden();

  // the X: the logos (none yet) - ＋ a new one, set on this project
  await empty.click();
  await expect(picker).toBeVisible();
  await expect(picker.locator(".logo-picker-add")).toContainText("לוגו חדש");
  let chooser = page.waitForEvent("filechooser");
  await picker.locator(".logo-picker-add").click();
  await (await chooser).setFiles({ name: "חברה א.png", mimeType: "image/png", buffer: png(200, 0, 0) });
  await expect(logo).toBeVisible();
  await expect(empty).toBeHidden();
  const first = await logo.getAttribute("src");

  // the logo: tap - all the logos; another one added, then the first chosen back
  await logo.click();
  await expect(picker).toBeVisible();
  chooser = page.waitForEvent("filechooser");
  await picker.locator(".logo-picker-add").click();
  await (await chooser).setFiles({ name: "חברה ב.png", mimeType: "image/png", buffer: png(0, 0, 200) });
  await expect.poll(() => logo.getAttribute("src")).not.toBe(first);
  await logo.click();
  await expect(picker.locator(".logo-picker-item:not(.logo-picker-add)")).toHaveCount(3); // none + 2 logos
  await expect(picker.locator(".logo-picker-item.selected")).toContainText("חברה ב");
  await picker.locator(".logo-picker-item", { hasText: "חברה א" }).click();
  await expect(picker).toBeHidden();
  await expect.poll(() => logo.getAttribute("src")).toBe(first);

  // "no logo": the X square back
  await logo.click();
  await picker.locator(".logo-picker-item").first().click();
  await expect(logo).toBeHidden();
  await expect(empty).toBeVisible();
});
