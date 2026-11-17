#!/usr/bin/env node
// Builds tasks-app.js (what tasks.html loads) from the source files in
// src/app/, joined in file-name order and minified (esbuild: the comments
// and spaces go, local names get short - about half the size, so the app
// downloads and starts faster), with tasks-app.js.map pointing each place
// back to its line in src/app/ (for the browser's developer tools and
// tools/decode-stack.js). Then re-stamps the asset URLs
// (tools/stamp-assets.js). Edit src/app/*.js, never tasks-app.js.
//
//   npm install                      once (esbuild, in the repo's root)
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
const mapFile = outFile + ".map";
const BANNER = "// GENERATED (minified) from src/app/*.js by tools/build-app.js - edit those files, not this one.";

let esbuild;
try {
  esbuild = require("esbuild");
} catch (e) {
  console.error("esbuild is missing - run once in the repo's root: npm install");
  process.exit(1);
}

// the joined sources, and a map of each of their lines back to its file
const B64 = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/";
function vlq(n) {
  let v = n < 0 ? ((-n) << 1) | 1 : n << 1;
  let out = "";
  do {
    let d = v & 31;
    v >>>= 5;
    if (v) d |= 32;
    out += B64[d];
  } while (v);
  return out;
}
const files = fs.readdirSync(srcDir).filter((f) => f.endsWith(".js")).sort();
let joined = "";
const lines = [];
let prevSrc = 0;
let prevLine = 0;
files.forEach((f, si) => {
  const text = fs.readFileSync(path.join(srcDir, f), "utf8");
  joined += text;
  const n = text.split("\n").length - (text.endsWith("\n") ? 1 : 0);
  for (let l = 0; l < n; l++) {
    lines.push(vlq(0) + vlq(si - prevSrc) + vlq(l - prevLine) + vlq(0));
    prevSrc = si;
    prevLine = l;
  }
});
const inputMap = { version: 3, sources: files.map((f) => "src/app/" + f), names: [], mappings: lines.join(";") };

const result = esbuild.transformSync(
  joined + "\n//# sourceMappingURL=data:application/json;base64," + Buffer.from(JSON.stringify(inputMap)).toString("base64"),
  {
    minify: true,
    // Hebrew / Arabic / Russian stay as they are (not \u escapes - twice the size)
    charset: "utf8",
    // no syntax newer than the phones' browsers know (e.g. no "??" made up by the minifier)
    target: "es2017",
    legalComments: "none",
    banner: BANNER,
    sourcefile: "tasks-app.js",
    sourcemap: "external",
    sourcesContent: false
  }
);
const built = result.code + "//# sourceMappingURL=tasks-app.js.map\n";
const builtMap = result.map;

const current = fs.existsSync(outFile) ? fs.readFileSync(outFile, "utf8") : "";
const currentMap = fs.existsSync(mapFile) ? fs.readFileSync(mapFile, "utf8") : "";

if (process.argv.includes("--check")) {
  if (built !== current || builtMap !== currentMap) {
    console.error("tasks-app.js is out of date - run: node tools/build-app.js");
    process.exit(1);
  }
  console.log("tasks-app.js is up to date (" + files.length + " source files)");
  process.exit(0);
}

if (built !== current) fs.writeFileSync(outFile, built);
if (builtMap !== currentMap) fs.writeFileSync(mapFile, builtMap);
console.log("built tasks-app.js from " + files.length + " files (" + Math.round(Buffer.byteLength(built) / 1024) + " KB minified, from " + Math.round(Buffer.byteLength(joined) / 1024) + " KB)");
require("./stamp-assets.js");
