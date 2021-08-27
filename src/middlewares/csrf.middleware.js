const { HttpException } = require("../utils/errors");
const { verifyCsrfToken } = require("../utils/encryption");

module.exports = {
  csrfWall: (req, res, next) => {
    const { jwt } = req;
    const csrfToken = req.headers["X-CSRF-TOKEN"];

    if (!csrfToken) {
      return next(new HttpException(403, "CSRF Token is not set"));
    }

    if (!jwt) {
      return next(new Error("JWT Token is not defined on CSRF validation"));
    }

    const isPassingCsrf = verifyCsrfToken(csrfToken, jwt);

    if (!isPassingCsrf) {
      return next(new HttpException(403, "CSRF Token is not valid"));
    }

    return next();
  },
};
