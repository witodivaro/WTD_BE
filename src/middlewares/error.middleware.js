const { StatusCodes } = require("../consts/codes");
const { InternalServerError } = require("../utils/errors");
const logger = require("../utils/logger");

exports.errorMiddleware = function (error, req, res, next) {
  if (res.headersSent) {
    return next(error);
  }

  res.status(StatusCodes.INTERNAL_SERVER_ERROR);
  res.json(new InternalServerError(error.errors || error.message));

  logger.error(error);
};
