exports.handler = async function(event, context) {
  // 从查询参数中获取原始URL
  const { url } = event.queryStringParameters;

  // 对原始URL进行重定向逻辑处理
  let redirectUrl = url;
  if (url.includes('/beginner/')) {
    redirectUrl = url.replace('/beginner/', '/beginner/A');
  }

  // 构建重定向响应
  return {
    statusCode: 301,
    headers: {
      Location: redirectUrl
    },
    body: ''
  };
};
