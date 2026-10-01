// @ts-check
const { defineConfig, devices } = require("@playwright/test");

const PORT = 4321;

module.exports = defineConfig({
  testDir: "./specs",
  fullyParallel: false,
  workers: 1,
  retries: process.env.CI ? 1 : 0,
  reporter: process.env.CI ? [["list"], ["html", { open: "never" }]] : "list",
  use: {
    baseURL: `http://localhost:${PORT}`,
    trace: "retain-on-failure",
  },
  webServer: {
    // Serves the repo root (one level up) as plain static files, exactly
    // like GitHub Pages does - no build step, so tasks.html's relative
    // asset paths (icons, tasks-sw.js, vendor/*) resolve the same way.
    // "localhost" (not 127.0.0.1) matters: Firebase Auth treats it as an
    // automatically-authorized domain, so phone sign-in works with no
    // extra Firebase console setup beyond the test phone number itself.
    command: `npx http-server .. -p ${PORT} -c-1 --silent`,
    url: `http://localhost:${PORT}/tasks.html`,
    reuseExistingServer: !process.env.CI,
    timeout: 30000,
  },
  projects: [
    { name: "chromium", use: { ...devices["Desktop Chrome"] } },
  ],
});
