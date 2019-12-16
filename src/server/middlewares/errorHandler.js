export default isDev => (error, req, res, _next) => {

  if (isDev) {
    console.error('ERROR -> \n', error);
  }

  return res.status(error.status).json(error);
};
