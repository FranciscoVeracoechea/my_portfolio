export default isDev => (error, req, res, _next) => {
  const message = error.message || 'An error has occurred, please try again and make sure the data is correct';

  if (isDev) {
    const e = {
      ...error,
      status: error.status || 500,
    };
    console.error('ERROR -> \n', error);
    return res.status(error.status || 500).json(e);
  }

  return res.status(error.status || 500).json({
    message,
    status: error.status || 500,
  });
};
