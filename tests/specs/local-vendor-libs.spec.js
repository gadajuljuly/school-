const { test, expect } = require("@playwright/test");

// Supabase and Firebase are kept in vendor/ (and the offline cache) rather
// than fetched from their CDNs on every start: they load, and give the app
// what it uses. (The other tests keep them out and run on a fake backend.)
test("the vendored Supabase and Firebase load and expose what the app uses", async ({ page }) => {
  await page.route(/^https?:\/\/(?!localhost)/, (r) => r.abort()); // nothing from outside
  await page.goto("/tasks-privacy.html");
  for (const src of ["vendor/supabase-js-2.118.0.js", "vendor/firebase-app-compat-10.7.1.js", "vendor/firebase-auth-compat-10.7.1.js"]) {
    await page.addScriptTag({ url: "/" + src });
  }
  const got = await page.evaluate(() => ({
    supabase: typeof (window.supabase && window.supabase.createClient),
    firebaseApp: typeof (window.firebase && window.firebase.initializeApp),
    firebaseAuth: typeof (window.firebase && window.firebase.auth),
    recaptcha: typeof (window.firebase && window.firebase.auth && window.firebase.auth.RecaptchaVerifier),
    sdk: window.firebase && window.firebase.SDK_VERSION,
  }));
  expect(got).toEqual({ supabase: "function", firebaseApp: "function", firebaseAuth: "function", recaptcha: "function", sdk: "10.7.1" });
  // and the page asks for them from here, not from the CDNs
  const html = require("fs").readFileSync(require("path").join(__dirname, "../../tasks.html"), "utf8");
  expect(html).not.toMatch(/cdn\.jsdelivr\.net|gstatic\.com\/firebasejs/);
  const sw = require("fs").readFileSync(require("path").join(__dirname, "../../tasks-sw.js"), "utf8");
  expect(sw).toContain("./vendor/supabase-js-2.118.0.js");
});
