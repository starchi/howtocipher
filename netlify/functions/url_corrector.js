
exports.handler = async function(event, context) {
  try {
    // 从 event.path 获取 URL 的路径
    const path = event.path;
    const fs = require('fs');
    const fe=fs.existsSync('191.html');
    

    // 对路径进行重定向逻辑处理
    let redirectUrl = path;
    if (path.includes('/beginner/')) {
      redirectUrl = path.replace('/beginner/', '/beginner/A');
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
