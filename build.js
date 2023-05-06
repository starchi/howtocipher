const fs = require("fs");
const path = require("path");

function readdirRecursive(dir) {
  const files = fs.readdirSync(dir);

  let fileList = [];
  files.forEach((file) => {
    const fullPath = path.join(dir, file);
    const stat = fs.statSync(fullPath);
    if (stat.isDirectory()) {
      fileList = fileList.concat(readdirRecursive(fullPath));
    } else {
      fileList.push(fullPath);
    }
  });

  return fileList;
}

const publicPath = path.join(__dirname, "public");
const allFiles = readdirRecursive(publicPath);
const htmlFiles = allFiles.filter((file) => file.endsWith(".html"));

const data = {
  files: htmlFiles,
};

fs.writeFileSync(
  path.join(__dirname, "functions", "static-files.json"),
  JSON.stringify(data, null, 2)
);

console.log("Static file list generated successfully.");
