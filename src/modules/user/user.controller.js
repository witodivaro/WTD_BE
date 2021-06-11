const { validationResult } = require("express-validator");

const { StatusCodes } = require("../../consts/codes");

const { ValidationError, ValidationException } = require("../../utils/errors");

class UserController {
  constructor(userService, emailService, jwtService) {
    this.userService = userService;
    this.emailService = emailService;
    this.jwtService = jwtService;
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

      const user = await this.userService.createUser(userDto);

      // this.emailService.sendVerificationEmail(
      //   email,
      //   username,
      //   user.emailVerificationHash
      // );

      const { accessToken, refreshToken } = this.jwtService.createPairOfTokens({
        id: user.id,
      });

      this.jwtService.setTokensInCookies(res, accessToken, refreshToken);

      res
        .status(StatusCodes.CREATED)
        .json({ user: this.userService.toResponse(user) });
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
      const user = await this.userService.login(loginDto);

      const { accessToken, refreshToken } = this.jwtService.createPairOfTokens({
        id: user.id,
      });

      this.jwtService.setTokensInCookies(res, accessToken, refreshToken);

      return res
        .status(StatusCodes.OK)
        .json({ user: this.userService.toResponse(user) });
    } catch (error) {
      next(error);
    }
  };

  refreshTokens = async (req, res, next) => {
    const { id } = req.jwtPayload;

    const { accessToken, refreshToken } = this.jwtService.createPairOfTokens({
      id,
    });

    this.jwtService.setTokensInCookies(res, accessToken, refreshToken);

    res.status(StatusCodes.OK).send();
  };

  logout = async (req, res, next) => {
    res.status(200).send();
  };

  verificateEmail = async (req, res, next) => {
    const { verificationHash } = req.body;

    try {
      await this.userService.verificateEmail(verificationHash);

      res.status(200).send();
    } catch (error) {
      next(error);
    }
  };
}

module.exports = UserController;
