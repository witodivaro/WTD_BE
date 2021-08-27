const jwt = require("jsonwebtoken");

const { JWT_SECRET_KEY } = require("../../config");

const ONE_MINUTE_IN_MS = 1000 * 60;
const ONE_DAY = ONE_MINUTE_IN_MS * 60 * 24;

const ACCESS_TOKEN_EXPIRATION_TIME = ONE_MINUTE_IN_MS * 5;
const REFRESH_TOKEN_EXPIRATION_TIME = ONE_DAY;

class JWTService {
  constructor(jwtRepository) {
    this.jwtRepository = jwtRepository;
  }

  findBlacklistedToken(token) {
    return this.jwtRepository.findOne({ where: { token } });
  }

  createPairOfTokens(payload) {
    const accessToken = jwt.sign(payload, JWT_SECRET_KEY, {
      expiresIn: ACCESS_TOKEN_EXPIRATION_TIME,
    });

    const refreshToken = jwt.sign(payload, JWT_SECRET_KEY, {
      expiresIn: REFRESH_TOKEN_EXPIRATION_TIME,
    });

    return { accessToken, refreshToken };
  }

  setTokensInCookies(res, accessToken, refreshToken) {
    res.cookie("accessToken", accessToken, {
      maxAge: ACCESS_TOKEN_EXPIRATION_TIME,
      httpOnly: true,
      sameSite: "LAX",
    });

    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      expiresIn: REFRESH_TOKEN_EXPIRATION_TIME,
      path: "/user/refresh-token",
      sameSite: "LAX",
    });
  }
}

module.exports = JWTService;
