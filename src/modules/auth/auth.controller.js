const { validationResult } = require("express-validator");

const { StatusCodes } = require("../../consts/codes");
const { createCsrfToken } = require("../../utils/encryption");

const { ValidationError, ValidationException } = require("../../utils/errors");

class AuthController {
  constructor(authService, emailService, securityService) {
    this.authService = authService;
    this.emailService = emailService;
    this.securityService = securityService;
  }

  checkToken = async (req, res, next) => {
    res.status(StatusCodes.OK).send();
  };

  signUp = async (req, res, next) => {
    const errors = validationResult(req);

    try {
      if (!errors.isEmpty()) {
        throw new ValidationException(
          errors
            .array()
            .map(({ param, msg }) => new ValidationError(msg, param))
        );
      }

      const { email, username, password } = req.body;

      const userDto = {
        email,
        username,
        password,
      };

      const user = await this.authService.createUser(userDto);

      // this.emailService.sendVerificationEmail(
      //   email,
      //   username,
      //   user.emailVerificationHash
      // );

      const { accessToken, refreshToken, csrfToken } = await this.securityService.createSecurityTokens({
        id: user.id,
      });

      this.securityService.setTokensInCookies(res, accessToken, refreshToken, csrfToken);

      res
        .status(StatusCodes.CREATED)
        .json({ user: this.authService.userToResponse(user) });
    } catch (error) {
      next(error);
    }
  };

  login = async (req, res, next) => {
    const { username, password } = req.body;

    const loginDto = {
      username,
      password,
    };

    try {
      const user = await this.authService.login(loginDto);

      const { accessToken, refreshToken, csrfToken } = await this.securityService.createSecurityTokens({
        id: user.id,
      });

      this.securityService.setTokensInCookies(res, accessToken, refreshToken, csrfToken);

      return res
        .status(StatusCodes.OK)
        .json({ user: this.authService.userToResponse(user) });
    } catch (error) {
      next(error);
    }
  };

  refreshTokens = async (req, res, next) => {
    const { id } = req.jwtPayload;

    const { accessToken, refreshToken, csrfToken } = await this.securityService.createSecurityTokens({
      id,
    });

    this.securityService.setTokensInCookies(res, accessToken, refreshToken, csrfToken);

    res.status(StatusCodes.OK).send();
  };

  logout = async (req, res, next) => {
    res.status(200).send();
  };

  verificateEmail = async (req, res, next) => {
    const { verificationHash } = req.body;

    try {
      await this.authService.verificateEmail(verificationHash);

      res.status(200).send();
    } catch (error) {
      next(error);
    }
  };
}

module.exports = AuthController;
