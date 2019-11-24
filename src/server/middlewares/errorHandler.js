export default isDev => (error, req, res, _next) => {

  if (isDev) {
    const e = {
      ...error,
      status: error.status || 500,
    };
    console.error('ERROR -> \n', error);
    return res.status(error.status || 500).json(e);
  }

  const message = error.message || 'An error has occurred, please try again and make sure the data is correct';
  return res.status(error.status || 500).json({
    message,
    errmsg: error.errmsg,
    status: error.status || 500,
  });
};
