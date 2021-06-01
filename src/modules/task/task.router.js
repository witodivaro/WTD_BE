const express = require("express");

const router = express.Router();

const TaskRepository = require("./task.repository");
const TaskService = require("./task.service");
const TaskController = require("./task.controller");
const Task = require("./task.model");

const taskRepository = new TaskRepository(Task);
const taskService = new TaskService(taskRepository);
const taskController = new TaskController(taskService);

router.get("/", taskController.getTasks);

router.post("/", taskController.createTask);

router.patch("/:id", taskController.updateTask);

router.patch("/archived/:id", taskController.changeTaskArchived);

router.delete("/:id", taskController.deleteTask);

module.exports = router;
