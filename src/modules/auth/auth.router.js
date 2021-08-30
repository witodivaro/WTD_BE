const router = require("express").Router();
const { body } = require("express-validator");

const {
  verifyRefreshToken,
  verifyAccessToken,
} = require("../../middlewares/auth.middleware");

const { AuthController, AuthService, UserRepository } = require(".");
const { SecurityService } = require("../security");
const EmailService = require("../email/email.service");

const {
  USERNAME_LIMITS,
  PASSWORD_MIN_LENGTH,
  WRONG_EMAIL,
} = require("../../consts/authErrors");

const securityService = new SecurityService();
const userRepository = new UserRepository();
const authService = new AuthService(userRepository);
const emailService = new EmailService();
const authController = new AuthController(
  authService,
  emailService,
  securityService
);

router.post(
  "/check-access-token",
  verifyAccessToken,
  authController.checkToken
);

router.post(
  "/sign-up",
  // body("email").isEmail().withMessage(WRONG_EMAIL),
  // body("password").isLength({ min: 8 }).withMessage(PASSWORD_MIN_LENGTH),
  // body("username").isLength({ min: 3, max: 20 }).withMessage(USERNAME_LIMITS),
  authController.signUp
);

router.post("/login", authController.login);

router.post("/verificate-email", authController.verificateEmail);

router.post("/refresh-token", verifyRefreshToken, authController.refreshTokens);

module.exports = router;
