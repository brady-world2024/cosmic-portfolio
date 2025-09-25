const fs = require("fs");
const path = require("path");

const distDir = path.resolve(__dirname, "..", "dist");
const indexFile = path.join(distDir, "index.html");
const notFoundFile = path.join(distDir, "404.html");

if (!fs.existsSync(indexFile)) {
  console.error(
    "Can't find index.html in the build directory. Run `npm run build` first. Search path:",
    indexFile
  );
  process.exit(1);
}

fs.copyFileSync(indexFile, notFoundFile);
console.log("Copied: dist/index.html -> dist/404.html");
