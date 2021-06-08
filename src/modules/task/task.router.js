const express = require("express");

const router = express.Router();

const TaskRepository = require("./task.repository");
const TaskService = require("./task.service");
const TaskController = require("./task.controller");
const Task = require("./task.model");

const passport = require("../../middlewares/auth.middleware");

const taskRepository = new TaskRepository(Task);
const taskService = new TaskService(taskRepository);
const taskController = new TaskController(taskService);

router.get(
  "/",
  passport.authenticate("jwt", { session: false }),
  taskController.getTasks
);

router.post(
  "/",
  passport.authenticate("jwt", { session: false }),
  taskController.createTask
);

router.patch(
  "/:id",
  passport.authenticate("jwt", { session: false }),
  taskController.updateTask
);

router.patch(
  "/archived/:id",
  passport.authenticate("jwt", { session: false }),
  taskController.changeTaskArchived
);

router.delete(
  "/:id",
  passport.authenticate("jwt", { session: false }),
  taskController.deleteTask
);

router.get("/top", taskController.getTopTaskCreators);

module.exports = router;
