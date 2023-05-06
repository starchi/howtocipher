const fs = require('fs');
const path = require('path');
const util = require('util');

const readdir = util.promisify(fs.readdir);

// 使用Levenshtein距离计算字符串相似度
function levenshteinDistance(a, b) {
  const matrix = [];
  let i, j;

  for (i = 0; i <= b.length; i++) {
    matrix[i] = [i];
  }
  for (j = 0; j <= a.length; j++) {
    matrix[0][j] = j;
  }
  for (i = 1; i <= b.length; i++) {
    for (j = 1; j <= a.length; j++) {
      if (b.charAt(i - 1) === a.charAt(j - 1)) {
        matrix[i][j] = matrix[i - 1][j - 1];
      } else {
        matrix[i][j] = Math.min(matrix[i - 1][j - 1] + 1, matrix[i][j - 1] + 1, matrix[i - 1][j] + 1);
      }
    }
  }

  return matrix[b.length][a.length];
}

// 检查一个URL是否存在
async function urlExists(url) {
  try {
    const files = await readdir(path.join(__dirname, '..', 'public'));
    return files.includes(url);
  } catch (error) {
    console.error('Error reading files:', error);
    return false;
  }
}

exports.handler = async (event, context) => {
  const requestedUrl = event.queryStringParameters.url;

  // 如果请求的URL实际上存在，则直接返回它
  if (await urlExists(requestedUrl)) {
    return {
      statusCode: 200,
      body: JSON.stringify({ correctedUrl: requestedUrl }),
    };
  }

  try {
    const files = await readdir(path.join(__dirname, '..', 'public'));
    const similarUrls = files.filter((file) => levenshteinDistance(requestedUrl, file) === 1);

    // 如果找到编辑距离为1的URL，返回第一个
    if (similarUrls.length > 0) {
      return {
        statusCode: 200,
        body: JSON.stringify({ correctedUrl: similarUrls[0] }),
      };
    }

    // 如果找不到类似的URL，返回一个错误消息
    return {
      statusCode: 404,
      body: JSON.stringify({ error: "No similar URL found" }),
  };
} catch (error) {
  console.error("Error reading files:", error);
  return {
    statusCode: 500,
    body: JSON.stringify({ error: "Internal server error" }),
  };
}
}
