const { HttpException } = require("../utils/errors");
const { verifyCsrfToken } = require("../utils/auth");
const { extractCookie } = require("../utils/utils");

module.exports = {
  csrfWall: (req, res, next) => {
    const csrfToken = req.headers["x-csrf-token"];
    const accessToken = extractCookie(req, "accessToken");

    if (!csrfToken) {
      return next(new HttpException(403, "CSRF Token is not set"));
    }

    if (!accessToken) {
      return next(new HttpException(403, "Access token is not set"));
    }

    const isPassingCsrf = verifyCsrfToken(csrfToken, accessToken);

    if (!isPassingCsrf) {
      return next(new HttpException(403, "CSRF Token is not valid"));
    }

    return next();
  },
};
