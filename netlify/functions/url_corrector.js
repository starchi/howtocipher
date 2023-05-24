exports.handler = async (event) => {
  const { path } = event;
  const url = decodeURIComponent(path.replace(/^\/|\/$/g, ''));


  return {
    statusCode: 302,
    headers: {
      Location: url,
    },
  };
};
