exports.handler = async (event) => {
  const { path } = event;
  const url = decodeURIComponent(path.replace(/^\/|\/$/g, ''));

  if (!url) {
    return {
      statusCode: 400,
      body: 'Missing URL',
    };
  }

  let correctedUrl = url;

  // 如果URL不包含'A'前缀，进行纠错处理
  if (!url.includes('/191.html')) {
    correctedUrl = 'https://howtocipher.netlify.app/beginner/A191.html'
  }

  console.log('Original URL:', url);
  console.log('Corrected URL:', correctedUrl);

  return {
    statusCode: 302,
    headers: {
      Location: correctedUrl,
    },
  };
};
