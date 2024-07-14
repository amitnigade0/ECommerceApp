const { constants } = require("../constants");

const errorHandler = (err, req, res, next) => {
  const statusCode = res.statusCode ? res.statusCode : 500;
  switch (statusCode) {
    case constants.VALIDATION_ERROR:
      res.json({
        title: "Bad request/Validation Failed",
        errorCode: statusCode,
        message: err.message,
        stackTrace: err.stack,
      });
      break;
    case constants.FORBIDDEN:
      res.json({
        title: "Forbidden",
        errorCode: statusCode,
        message: err.message,
        stackTrace: err.stack,
      });
      break;
    case constants.NOT_FOUND:
      res.json({
        title: "Not Found",
        errorCode: statusCode,
        message: err.message,
        stackTrace: err.stack,
      });
      break;
    case constants.UNAUTHORIZED:
      res.json({
        title: "Un Authorized request",
        errorCode: statusCode,
        message: err.message,
        stackTrace: err.stack,
      });
      break;
  case constants.CONFLICT:
    res.json({
      title: "Already exists!",
      errorCode: statusCode,
      message: err.message,
      stackTrace: err.stack,
    });
    break;
    case constants.SERVER_ERR:
      res.json({
        title: "Server Error",
        errorCode: statusCode,
        message: err.message,
        stackTrace: err.stack,
      });
      break;
      default:
        res.json({
            title: "Unknown error/Something went wrong!",
            message: err.message,
            errorCode: statusCode,
            stackTrace: err.stack,
          });
  }
};

module.exports = errorHandler;
