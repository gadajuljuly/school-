#!/usr/bin/env node
// Run after every change to tasks.css / tasks-app.js (node tools/stamp-assets.js).
//
// tasks.html loads them as tasks.css?v=<hash> and tasks-app.js?v=<hash>.
// The page itself is network-first in tasks-sw.js, but static files are
// served cache-first - so a changed file must get a new URL, or phones
// would keep running old code under the new page. This rewrites both
// ?v= stamps from the files' contents, lists the stamped URLs in the
// service worker's precache, and bumps its CACHE_NAME when anything
// changed (which also clears the old caches on the phones).
"use strict";
const fs = require("fs");
const path = require("path");
const crypto = require("crypto");

const root = path.join(__dirname, "..");
const read = (f) => fs.readFileSync(path.join(root, f), "utf8");
const write = (f, s) => fs.writeFileSync(path.join(root, f), s);
const hash = (f) => crypto.createHash("sha1").update(read(f)).digest("hex").slice(0, 10);

const assets = ["tasks.css", "tasks-app.js"];
let html = read("tasks.html");
let sw = read("tasks-sw.js");
const before = html + sw;

for (const f of assets) {
  const re = new RegExp(f.replace(/[.-]/g, "\\$&") + "\\?v=[0-9a-z]+", "g");
  const stamped = f + "?v=" + hash(f);
  if (!re.test(html)) throw new Error("tasks.html doesn't reference " + f + "?v=");
  html = html.replace(re, stamped);
  if (re.test(sw)) {
    sw = sw.replace(re, stamped);
  } else {
    sw = sw.replace('var CORE_ASSETS = [\n', 'var CORE_ASSETS = [\n  "./' + stamped + '",\n');
  }
}

if (html + sw !== before) {
  sw = sw.replace(/var CACHE_NAME = "tasks-app-v(\d+)";/, (m, n) => 'var CACHE_NAME = "tasks-app-v' + (Number(n) + 1) + '";');
  write("tasks.html", html);
  write("tasks-sw.js", sw);
  console.log("stamped:", assets.map((f) => f + "?v=" + hash(f)).join(", "), "|", sw.match(/tasks-app-v\d+/)[0]);
} else {
  console.log("up to date");
}
