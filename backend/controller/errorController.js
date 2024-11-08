const AppError = require('../utils/appError');

const devError = (err, res) => {
  res.status(err.statusCode).json({
    status: err.status,
    message: err.message,
    stack: err.stack,
  });
};

const prodError = (err, res) => {
  if (err.isOperational) {
    res.status(err.statusCode).json({
      status: err.status,
      message: err.message,
    });
  } else {
    res.status(err.statusCode).json({
      status: err.status,
      message: 'Something went wrong',
    });
  }
};

const handleCastError = (err) => {
  const message = `Invalid ${err.path}: ${err.value}`;
  return new AppError(message, 400);
};

const handleDuplicateFields = (err) => {
  const message = `Duplicate field value ${err.errorResponse.keyValue.value}`;
  return new AppError(message, 400);
};

const handleValidationError = (err) => {
  const value = Object.value(error.err).map((el) => el.message + '\n');
  const message = `Invaid input. ${value}`;
  return new AppError(message, 400);
};

module.exports = (err, req, res, next) => {
  err.statusCode = err.statusCode || 500;

  if (process.env.NODE_ENV === 'development') {
    devError(err, res);
  } else if (process.env.NODE_ENV === 'production') {
    Object.defineProperty(err, 'name', {
      value: err.name,
      enumerable: true,
    });
    let error = { ...err };

    if (error.name === 'CastError') {
      error = handleCastError(error);
    }
    if (error.code === 11000) {
      error = handleDuplicateFields(error);
    }
    if (error.name === 'ValidationError') error = handleValidationError(error);

    prodError(error, res);
  }
};
