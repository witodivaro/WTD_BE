const express = require("express");

const router = express.Router();

const TaskRepository = require("./task.repository");
const TaskService = require("./task.service");
const TaskController = require("./task.controller");
const { TaskSockets } = require("./task.sockets");

const { authenticate } = require("../../middlewares/auth.middleware");

const taskRepository = new TaskRepository();
const taskService = new TaskService(taskRepository);
const taskSockets = new TaskSockets(taskService);
const taskController = new TaskController(taskService, taskSockets);

router.get("/", authenticate, taskController.getTasks);

router.post("/", authenticate, taskController.createTask);

router.patch("/:id", authenticate, taskController.updateTask);

router.patch("/archived/:id", authenticate, taskController.changeTaskArchived);

router.delete("/:id", authenticate, taskController.deleteTask);

router.get("/top", taskController.getTopTaskCreators);

module.exports = router;
