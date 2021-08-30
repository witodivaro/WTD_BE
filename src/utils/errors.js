const { StatusCodes } = require("../consts/codes");
const { createTimestamp } = require("./utils");

class Exception {
  constructor() {
    this.timestamp = createTimestamp();
  }
}

class InternalServerException extends Exception {
  status = StatusCodes.INTERNAL_SERVER_ERROR;

  constructor(error) {
    super();

    this.error = error;
  }
}

class ValidationError {
  constructor(message, field) {
    this.message = message;
    this.field = field;
  }
}

class ValidationException extends Exception {
  status = StatusCodes.BAD_REQUEST;

  constructor(validationErrors) {
    super();

    this.validationErrors = validationErrors;
  }
}

class HttpException extends Exception {
  constructor(status, message) {
    super();

    this.status = status;
    this.message = message;
  }
}

module.exports = {
  ValidationError,
  ValidationException,
  InternalServerException,
  HttpException,
};
