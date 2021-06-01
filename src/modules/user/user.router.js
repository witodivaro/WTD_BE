const express = require("express");

const router = express.Router();

const UserRepository = require("./user.repository");
const UserService = require("./user.service");
const UserController = require("./user.controller");
const User = require("./user.model");

const userRepository = new UserRepository(User);
const userService = new UserService(userRepository);
const userController = new UserController(userService);

router.get("/:id", userController.getUser);

router.post("/", userController.createUser);

router.patch("/:id", userController.updateUser);

router.delete("/:id", userController.deleteUser);

module.exports = router;
