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

    // 检查文件是否存在
    const fileExists = fs.existsSync(filePath);

    // 根据文件存在与否，进行重定向逻辑处理
    let redirectUrl = urlPath;
    if (!fileExists) {
      const modifiedFilename = 'a' + filename;
      redirectUrl = path.join(directory, modifiedFilename);
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
