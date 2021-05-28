const express = require("express");

const router = express.Router();

const UserRepository = require("./user.repository");
const UserService = require("./user.service");
const UserController = require("./user.controller");
const User = require("./user.model");

const userRepository = new UserRepository(User);
const userService = new UserService(userRepository);
const userController = new UserController(userService);

router.get("/user/:id", userController.getUser);

router.post("/user", userController.createUser);

router.patch("/user/:id", userController.updateUser);

router.delete("/user/:id", userController.deleteUser);

module.exports = router;
