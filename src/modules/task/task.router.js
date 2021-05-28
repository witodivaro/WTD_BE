const express = require("express");

const router = express.Router();

const TaskRepository = require("./task.repository");
const TaskService = require("./task.service");
const TaskController = require("./task.controller");

const taskRepository = new TaskRepository();
const taskService = new TaskService(taskRepository);
const taskController = new TaskController(taskService);

router.get("/tasks", taskController.getTasks);

router.post("/tasks", taskController.createTask);

router.patch("/tasks/:id", taskController.updateTask);

router.patch("/tasks/archived/:id", taskController.changeTaskArchived);

router.delete("/tasks/:id", taskController.deleteTask);

module.exports = router;
