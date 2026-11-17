#!/usr/bin/env node
// tasks-app.js is minified (tools/build-app.js): an error's place in it
// (from the app_errors table, or a phone's console) says little. This turns
// every "tasks-app.js...:LINE:COL" in the text it's given into the source
// file and line it came from, using tasks-app.js.map.
//
//   node tools/decode-stack.js "<stack text>"
//   node tools/decode-stack.js < stack.txt
//
// (The map must be of the same build as the error: check out that commit -
// the error's "build" is tasks-app.js's ?v= stamp.)
"use strict";
const fs = require("fs");
const path = require("path");

const map = JSON.parse(fs.readFileSync(path.join(__dirname, "..", "tasks-app.js.map"), "utf8"));
const B64 = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/";

// mappings -> per generated line: [genCol, srcIndex, srcLine][] (all 0-based)
function decodeMappings(mappings) {
  const out = [];
  let src = 0;
  let srcLine = 0;
  let srcCol = 0;
  for (const lineText of mappings.split(";")) {
    const segs = [];
    let genCol = 0;
    for (const seg of lineText.split(",")) {
      if (!seg) continue;
      const vals = [];
      let v = 0;
      let shift = 0;
      for (const ch of seg) {
        const d = B64.indexOf(ch);
        v += (d & 31) << shift;
        if (d & 32) { shift += 5; continue; }
        vals.push(v & 1 ? -(v >>> 1) : v >>> 1);
        v = 0;
        shift = 0;
      }
      genCol += vals[0];
      if (vals.length >= 4) {
        src += vals[1];
        srcLine += vals[2];
        srcCol += vals[3];
        segs.push([genCol, src, srcLine]);
      }
    }
    out.push(segs);
  }
  return out;
}
const decoded = decodeMappings(map.mappings);

function lookup(line, col) {
  const segs = decoded[line - 1] || [];
  let best = null;
  for (const s of segs) {
    if (s[0] <= col - 1) best = s;
    else break;
  }
  return best ? map.sources[best[1]] + ":" + (best[2] + 1) : null;
}

function decode(text) {
  return text.replace(/tasks-app\.js(?:\?v=[\w-]+)?:(\d+):(\d+)/g, (m, l, c) => {
    const at = lookup(Number(l), Number(c));
    return at ? at + " (" + m + ")" : m;
  });
}

if (process.argv[2]) {
  console.log(decode(process.argv.slice(2).join(" ")));
} else {
  console.log(decode(fs.readFileSync(0, "utf8")));
}
