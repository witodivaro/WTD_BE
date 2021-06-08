const { StatusCodes } = require("../consts/codes");
const { createTimestamp } = require("./utils");

class Error {
  constructor() {
    this.timestamp = createTimestamp();
  }
}

class ValidationError extends Error {
  constructor(errors) {
    super();
    this.status = StatusCodes.BAD_REQUEST;
    this.errors = errors;
  }
}

class InternalServerError extends Error {
  constructor(error) {
    super();
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
