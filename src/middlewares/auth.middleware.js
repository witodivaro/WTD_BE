const jwt = require("jsonwebtoken");

const { JWT_SECRET_KEY } = require("../config");
const User = require("../modules/user/user.model");
const { HttpException } = require("../utils/errors");
const { UNAUTHORIZED, FORBIDDEN } = require("../consts/authErrors");
const { JWTService } = require("../modules/jwt");

const extractJwtFromCookie = (req, tokenKey) => {
  let token = null;

  if (req && req.cookies) token = req.cookies[tokenKey];

  return token;
};

module.exports = {
  extractJwtFromCookie,
  authenticate: async (req, res, next) => {
    try {
      const accessToken = extractJwtFromCookie(req, "accessToken");

      const payload = jwt.verify(accessToken, JWT_SECRET_KEY);

      const user = await User.findByPk(payload.id);

      if (!user) {
        next(new HttpException(403, FORBIDDEN));
      }

      req.user = user;

      next();
    } catch (err) {
      if (err instanceof jwt.TokenExpiredError) {
        return next(new HttpException(401, UNAUTHORIZED));
      }

      next(new HttpException(403, FORBIDDEN));
    }
  },
  verifyRefreshToken: async (req, res, next) => {
    try {
      const refreshToken = extractJwtFromCookie(req, "refreshToken");

      const payload = jwt.verify(refreshToken, JWT_SECRET_KEY);

      req.jwtPayload = payload;

      next();
    } catch (err) {
      res.clearCookie("accessToken");
      res.clearCookie("refreshToken");

      next(new HttpException(403, FORBIDDEN));
    }
  },
};
