const notFoundHandler = (request, response, next) => {
  const err = new Error("Resource Not Found");
  err.status = 404;
  next(err);
};

const errorHandler = (err, request, response, next) => {
  response.status(err.status || 500).json({
    message: err.message,
    error: err,
  });
};

module.exports = { notFoundHandler, errorHandler };
