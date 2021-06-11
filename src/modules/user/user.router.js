const router = require("express").Router();
const { body } = require("express-validator");

const {
  authenticate,
  verifyRefreshToken,
} = require("../../middlewares/auth.middleware");

const { UserService, UserController, UserRepository } = require("./");
const { JWTRepository, JWTService } = require("../jwt");
const EmailService = require("../email/email.service");

const {
  USERNAME_LIMITS,
  PASSWORD_MIN_LENGTH,
  WRONG_EMAIL,
} = require("../../consts/authErrors");

const jwtRepository = new JWTRepository();
const jwtService = new JWTService(jwtRepository);
const userRepository = new UserRepository();
const userService = new UserService(userRepository);
const emailService = new EmailService();
const userController = new UserController(
  userService,
  emailService,
  jwtService
);

router.post("/check-access-token", authenticate, userController.checkToken);

router.post(
  "/sign-up",
  // body("email").isEmail().withMessage(WRONG_EMAIL),
  // body("password").isLength({ min: 8 }).withMessage(PASSWORD_MIN_LENGTH),
  // body("username").isLength({ min: 3, max: 20 }).withMessage(USERNAME_LIMITS),
  userController.signUp
);

router.post("/login", userController.login);

router.post("/verificate-email", userController.verificateEmail);

router.post("/refresh-token", verifyRefreshToken, userController.refreshTokens);

module.exports = router;
