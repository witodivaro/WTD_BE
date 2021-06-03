const express = require("express");
const router = express.Router();

const passport = require("../../middlewares/auth.middleware");

const UserRepository = require("./user.repository");
const UserService = require("./user.service");
const UserController = require("./user.controller");
const User = require("./user.model");

const userRepository = new UserRepository(User);
const userService = new UserService(userRepository);
const userController = new UserController(userService);

router.get("/", userController.getUser);

router.post("/sign-up", userController.signUp);

router.post("/login", userController.login);

router.patch("/:id", userController.updateUser);

router.delete("/:id", userController.deleteUser);

module.exports = router;
