const jwt = require("jsonwebtoken");

const User = require("../modules/user/user.model");

const { JWT_SECRET_KEY } = require("../config");

const { UNAUTHORIZED, FORBIDDEN } = require("../consts/authErrors");

const { HttpException } = require("../utils/errors");
const { extractCookie } = require("../utils/utils");
const { verifyJwtToken } = require("../utils/auth");

module.exports = {
  authenticate: async (req, res, next) => {
    try {
      const accessToken = extractCookie(req, "accessToken");

      const payload = verifyJwtToken(accessToken);

      const user = await User.findByPk(payload.id);

      if (!user) {
        next(new HttpException(403, FORBIDDEN));
      }

      if (!req.user) {
        req.user = user;
      }

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
      const refreshToken = extractCookie(req, "refreshToken");

      const payload = verifyJwtToken(refreshToken);

      req.jwtPayload = payload;

      next();
    } catch (err) {
      res.clearCookie("accessToken");
      res.clearCookie("refreshToken");

      next(new HttpException(403, FORBIDDEN));
    }
  },
};
