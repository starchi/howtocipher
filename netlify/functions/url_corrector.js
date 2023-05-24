function levenshteinDistance(s, t) {
  const m = s.length;
  const n = t.length;

  if (m === 0) return n;
  if (n === 0) return m;

  const d = [];
  for (let i = 0; i <= m; i++) {
    d[i] = [i];
  }
  for (let j = 0; j <= n; j++) {
    d[0][j] = j;
  }

  for (let j = 1; j <= n; j++) {
    for (let i = 1; i <= m; i++) {
      const cost = s[i - 1] === t[j - 1] ? 0 : 1;
      d[i][j] = Math.min(
        d[i - 1][j] + 1, // deletion
        d[i][j - 1] + 1, // insertion
        d[i - 1][j - 1] + cost // substitution
      );
    }
  }

  return d[m][n];
}

exports.handler = async (event) => {
  const { queryStringParameters } = event;
  const { url } = queryStringParameters;

  // 获取当前目录下的文件列表
  const files = fs.readdirSync(__dirname);

  // 寻找编辑距离为1的页面
  

  // 返回页面
  if (correctedUrl !== '') {
    return {
      statusCode: 200,
      body: JSON.stringify({ correctedUrl }),
    };
  } else {
    // 返回 common/wrong.html 页面
    const wrongPagePath = path.join(__dirname, 'common', 'wrong.html');
    const wrongPageContent = fs.readFileSync(wrongPagePath, 'utf-8');

    return {
      statusCode: 200,
      body: wrongPageContent,
      headers: {
        'Content-Type': 'text/html',
      },
    };
  }
};


const path = require('path');

exports.handler = async (event) => {
  const { queryStringParameters } = event;
  const { url } = queryStringParameters;

  // 寻找编辑距离为1的页面
  let correctedUrl = '';
  for (const file of files) {
    const filePath = path.join(__dirname, file);
    const fileName = path.basename(filePath);
    const distance = levenshteinDistance(url, fileName);
    if (distance === 1) {
      correctedUrl = file;
      break;
    }
  }

  // 返回页面
  if (correctedUrl !== '') {
    return {
      statusCode: 200,
      body: JSON.stringify({ correctedUrl }),
    };
  } else {
    // 返回 common/wrong.html 页面
    const wrongPageContent = `<html><body><h1>Wrong Page</h1></body></html>`;

    return {
      statusCode: 200,
      body: wrongPageContent,
      headers: {
        'Content-Type': 'text/html',
      },
    };
  }
};
