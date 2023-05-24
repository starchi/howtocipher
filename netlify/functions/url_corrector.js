exports.handler = async (event) => {
  const { queryStringParameters } = event;
  const { url } = queryStringParameters;

  const correctedUrl = url.replace(/\/(\d+)\.html$/, '/A$1.html');

  return {
    statusCode: 302,
    headers: {
      Location: correctedUrl,
    },
  };
};
