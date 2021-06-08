const { USER_NOT_FOUND } = require("../../consts/authErrors");
const { StatusCodes } = require("../../consts/codes");

const { NotFoundError } = require("../../utils/errors");

class UserController {
  constructor(userService, emailService) {
    this.userService = userService;
    this.emailService = emailService;
  }

  checkToken = async (req, res, next) => {
    res.status(StatusCodes.OK).send();
  };

  signUp = async (req, res, next) => {
    try {
      const { email, username, password } = req.body;

      const userDto = {
        email,
        username,
        password,
      };

      const { user, token, emailVerificationHash } =
        await this.userService.createUser(userDto);

      this.emailService.sendVerificationEmail(
        email,
        username,
        emailVerificationHash
      );

      res
        .status(StatusCodes.CREATED)
        .json({ user: this.userService.toResponse(user), token });
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
      const { user, token } = await this.userService.login(loginDto);

      if (!(user && token)) {
        return res
          .status(StatusCodes.NOT_FOUND)
          .json(new NotFoundError(USER_NOT_FOUND));
      }

      return res
        .status(StatusCodes.OK)
        .json({ user: this.userService.toResponse(user), token });
    } catch (error) {
      next(error);
    }
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
