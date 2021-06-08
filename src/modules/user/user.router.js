const express = require("express");
const router = express.Router();

const passport = require("../../middlewares/auth.middleware");

const UserRepository = require("./user.repository");
const UserService = require("./user.service");
const UserController = require("./user.controller");
const User = require("./user.model");
const EmailService = require("../email/email.service");

const userRepository = new UserRepository(User);
const userService = new UserService(userRepository);
const emailService = new EmailService();
const userController = new UserController(userService, emailService);

router.post(
  "/check-token",
  passport.authenticate("jwt"),
  userController.checkToken
);

router.post("/sign-up", userController.signUp);

router.post("/login", userController.login);

router.post("/verificate-email", userController.verificateEmail);

module.exports = router;
