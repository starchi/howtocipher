const fs = require('fs');
const path = require('path');
const levenshtein = require('js-levenshtein');

exports.handler = async (event) => {
  const { queryStringParameters } = event;
  const { url } = queryStringParameters;

  // 获取当前目录下的文件列表
  const files = fs.readdirSync(__dirname);

  // 寻找编辑距离为1的页面
  let correctedUrl = '';
  for (const file of files) {
    const filePath = path.join(__dirname, file);
    const fileName = path.basename(filePath);
    const distance = levenshtein(url, fileName);
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
