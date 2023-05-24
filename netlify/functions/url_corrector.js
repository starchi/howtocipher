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

  return {
    statusCode: 302,
    headers: {
      Location: correctedUrl,
    },
  };
};
