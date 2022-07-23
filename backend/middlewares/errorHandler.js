const errorHandler = (error, req, res, next) => {
  let statusCode = res.statusCode ? res.statusCode : 500;

  if (error.message.startsWith("Cast to ObjectId")) {
    error.message = "Invalid format id";
    statusCode = 400;
  }

  if (error.message.startsWith("invalid signature")) {
    error.message = "Invalid token";
    statusCode = 400;
  }

  res.status(statusCode).json({ message: error.message, stack: error.stack });
};

module.exports = errorHandler;
