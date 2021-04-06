const { CelebrateError } = require('celebrate');
const { SERVER_ERROR, VALIDATION_ERROR } = require('../config/errors');

const errorHandler = (err, req, res, next) => {
  const { statusCode = 500, message } = err;
  if (err instanceof CelebrateError) {
    return res.status(400).send({ message: VALIDATION_ERROR });
  } if (err.status) {
    return res.status(err.status).send({ message: err.message });
  }
  res.status(statusCode).send({ message: statusCode === 500 ? SERVER_ERROR : message });
  return next();
};

module.exports = errorHandler;
