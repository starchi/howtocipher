exports.handler = async (event) => {
  const { path } = event;
  const url = decodeURIComponent(path.replace(/^\/|\/$/g, ''));

  if (!url) {
    return {
      statusCode: 400,
      body: 'Missing URL',
    };
  }

  const correctedUrl = url.replace(/\/(\d+)\.html$/, '/A$1.html');
  
  // 如果已经包含了'A'前缀，直接返回原始URL
  if (correctedUrl.includes('/A')) {
    return {
      statusCode: 302,
      headers: {
        Location: url,
      },
    };
  }

  return {
    statusCode: 302,
    headers: {
      Location: correctedUrl,
    },
  };
};
