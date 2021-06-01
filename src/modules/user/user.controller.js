class UserController {
  constructor(userService) {
    this.userService = userService;
  }

  getUser = async (req, res, next) => {
    console.log(1);
  };

  createUser = async (req, res, next) => {
    res.setHeader("Set-Cookie", "loggedIn=true");
    res.json({ lets: "go" });
  };

  updateUser = async (req, res, next) => {};

  deleteUser = async (req, res, next) => {};
}

module.exports = UserController;
