const { StatusCodes } = require("../consts/codes");
const { createTimestamp } = require("./utils");

class Error {
  constructor(message) {
    this.message = message;
    this.timestamp = createTimestamp();
  }
}

class ValidationError extends Error {
  constructor(message, errors) {
    super(message);
    this.status = StatusCodes.BAD_REQUEST;
    this.error = errors;
  }
}

class InternalServerError extends Error {
  constructor(message, error) {
    super(message);
    this.error = error;
  }
}

class NotFoundError extends Error {
  status = StatusCodes.NOT_FOUND;
}

class UnauthorizedError extends Error {
  status = StatusCodes.UNAUTHORIZED;
}

module.exports = {
  ValidationError,
  NotFoundError,
  InternalServerError,
  UnauthorizedError,
};
