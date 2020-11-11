const { httpStatusCode } = require('../utils/httpCodes');

module.exports = ((err, req, res, next) => {
  // if an error has no status, display 500
  const { statusCode = httpStatusCode.SERVER_ERROR, message } = err;
  res.status(statusCode).send({
    // check the status and display a message based on it
    // message: statusCode === 500 ? 'An error occurred on the server' : message
    message,
    statusCode,
  });
  next();
});
