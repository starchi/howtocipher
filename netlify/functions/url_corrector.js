async function getFiles() {
  try {
    const staticFiles = require("./static-files.json");
    return staticFiles.files;
  } catch (error) {
    console.error("Error reading files:", error);
    throw error;
  }
}

