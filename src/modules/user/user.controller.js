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
    const { email, username, password } = req.body;

    const userDto = {
      email,
      username,
      password,
    };

    try {
      const { user, token } = await this.userService.createUser(userDto);

      res.status(StatusCodes.CREATED).json({ user, token });
    } catch (error) {
      res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(error.errors);
    }
  };

  login = async (req, res, next) => {
    const { username, password } = req.body;

    const loginDto = {
      username,
      password,
    };

    try {
      const user = await this.userService.findOne({ where: loginDto });

      if (!user) {
        return res
          .status(StatusCodes.NOT_FOUND)
          .json(new NotFoundError(USER_NOT_FOUND));
      }

      const token = this.userService.createUserToken(user);

      return res.status(StatusCodes.OK).json({ user, token });
    } catch (error) {
      res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(error.errors);
    }
  };

  updateUser = async (req, res, next) => {};

  deleteUser = async (req, res, next) => {};
}

module.exports = UserController;
