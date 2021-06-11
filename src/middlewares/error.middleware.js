const { StatusCodes } = require("../consts/codes");
const logger = require("../utils/logger");

exports.errorMiddleware = function (error, req, res, next) {
  if (res.headersSent) {
    return next(error);
  }

  res.status(error.status || StatusCodes.INTERNAL_SERVER_ERROR);
  res.json(error);

  logger.error(JSON.stringify(error, null, 2));
};
