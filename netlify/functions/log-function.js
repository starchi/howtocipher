// 引入必要的模块
const fs = require('fs');

// 定义函数处理程序
exports.handler = async (event) => {
  try {
    // 获取访问IP和URL
    const { clientIp, path } = event.headers;

    // 将IP和URL写入日志文件
    const logEntry = `${clientIp} ${path}\n`;
    fs.appendFileSync('access.log', logEntry);

    // 返回成功的响应
    return {
      statusCode: 200,
      body: 'Success',
    };
  } catch (error) {
    // 返回错误的响应
    return {
      statusCode: 500,
      body: 'Error',
    };
  }
};
