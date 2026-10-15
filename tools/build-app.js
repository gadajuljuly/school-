#!/usr/bin/env node
// Builds tasks-app.js (what tasks.html loads) from the source files in
// src/app/, joined in file-name order, then re-stamps the asset URLs
// (tools/stamp-assets.js). Edit src/app/*.js, never tasks-app.js.
//
//   node tools/build-app.js          build + stamp
//   node tools/build-app.js --check  fail if tasks-app.js is out of date
//
// The sources are plain slices of one script - together they form a single
// (function () { ... })() - so they share every variable exactly as before
// the split, with no module system or bundler involved.
"use strict";
const fs = require("fs");
const path = require("path");

const root = path.join(__dirname, "..");
const srcDir = path.join(root, "src", "app");
const outFile = path.join(root, "tasks-app.js");
const HEADER = "// GENERATED from src/app/*.js by tools/build-app.js - edit those files, not this one.\n";

const files = fs.readdirSync(srcDir).filter((f) => f.endsWith(".js")).sort();
const built = HEADER + files.map((f) => fs.readFileSync(path.join(srcDir, f), "utf8")).join("");
const current = fs.existsSync(outFile) ? fs.readFileSync(outFile, "utf8") : "";

if (process.argv.includes("--check")) {
  if (built !== current) {
    console.error("tasks-app.js is out of date - run: node tools/build-app.js");
    process.exit(1);
  }
  console.log("tasks-app.js is up to date (" + files.length + " source files)");
  process.exit(0);
}

if (built !== current) fs.writeFileSync(outFile, built);
console.log("built tasks-app.js from " + files.length + " files");
require("./stamp-assets.js");
