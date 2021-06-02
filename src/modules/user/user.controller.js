const { UNAUTHORIZED, USER_NOT_FOUND } = require("../../consts/authErrors");
const { StatusCodes } = require("../../consts/codes");
const { UnauthorizedError, NotFoundError } = require("../../utils/errors");

class UserController {
  constructor(userService) {
    this.userService = userService;
  }

  getUser = async (req, res, next) => {
    if (!req.user) {
      return res
        .status(StatusCodes.UNAUTHORIZED)
        .json(new UnauthorizedError(UNAUTHORIZED));
    }

    return res.status(StatusCodes.OK).json(req.user);
  };

  signUp = async (req, res, next) => {
    try {
      const { email, username, password } = req.body;

      const userDto = {
        email,
        username,
        password,
      };

      const { user, token } = await this.userService.createUser(userDto);

      res.status(StatusCodes.CREATED).json({ user, token });
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

      return res.status(StatusCodes.OK).json({ user, token });
    } catch (error) {
      next(error);
    }
  };

  updateUser = async (req, res, next) => {};

  deleteUser = async (req, res, next) => {};
}

module.exports = UserController;
