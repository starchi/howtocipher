const fs = require('fs');
const path = require('path');

exports.handler = async function(event, context) {
  try {
    // 从 event.path 获取 URL 的路径
    const urlPath = event.path;

    // 提取目录和文件名
    const directory = path.dirname(urlPath);
    const filename = path.basename(urlPath);

    // 构建文件路径
    const filePath = path.join(__dirname, 'public', directory, filename);

    // 判断文件是否存在
    const fileExists = fs.existsSync(filePath);

    // 根据文件存在与否进行重定向逻辑处理
    let redirectUrl = urlPath;
    if (!fileExists) {
      const modifiedFilename = 'a' + filename;
      const modifiedFilePath = path.join(__dirname, 'public', directory, modifiedFilename);
      const modifiedFileExists = fs.existsSync(modifiedFilePath);
      if (modifiedFileExists) {
        redirectUrl = path.join(directory, modifiedFilename);
      } else {
        redirectUrl = '/common/wrong.html';
      }
    }

    // 构建重定向响应
    return {
      statusCode: 301,
      headers: {
        Location: redirectUrl
      },
      body: ''
    };
  } catch (error) {
    // 处理错误情况
    return {
      statusCode: 400,
      body: error.message
    };
  }
};
