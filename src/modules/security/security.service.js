const jwt = require("jsonwebtoken");

const { JWT_SECRET_KEY } = require("../../config");
const { createCsrfToken } = require("../../utils/auth");

const ONE_MINUTE_IN_MS = 1000 * 60;
const ONE_DAY = ONE_MINUTE_IN_MS * 60 * 24;

const ACCESS_TOKEN_EXPIRATION_TIME = ONE_MINUTE_IN_MS * 5;
const REFRESH_TOKEN_EXPIRATION_TIME = ONE_DAY;
const COOKIES_MAX_AGE = ONE_DAY;

class SecurityService {
  constructor(jwtRepository) {
    this.jwtRepository = jwtRepository;
  }

  async createSecurityTokens(payload) {
    const accessToken = jwt.sign(payload, JWT_SECRET_KEY, {
      expiresIn: ACCESS_TOKEN_EXPIRATION_TIME,
    });

    const refreshToken = jwt.sign(payload, JWT_SECRET_KEY, {
      expiresIn: REFRESH_TOKEN_EXPIRATION_TIME,
    });

    const csrfToken = await createCsrfToken(accessToken);

    return { accessToken, refreshToken, csrfToken };
  }

  setTokensInCookies(res, accessToken, refreshToken, csrfToken) {
    res.cookie("accessToken", accessToken, {
      maxAge: COOKIES_MAX_AGE,
      httpOnly: true,
      sameSite: "LAX",
    });

    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      maxAge: COOKIES_MAX_AGE,
      path: "/user/refresh-token",
      sameSite: "LAX",
    });

    res.cookie("_csrf", csrfToken, {
      httpOnly: false,
      maxAge: COOKIES_MAX_AGE,
      sameSite: "LAX",
    });
  }
}

module.exports = SecurityService;
