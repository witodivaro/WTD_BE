class UserController {
  constructor(userService) {
    this.userService = userService;
  }

  getUser = async (req, res, next) => {};

  createUser = async (req, res, next) => {};

  updateUser = async (req, res, next) => {};

  deleteUser = async (req, res, next) => {};
}

module.exports = UserController;
