const express = require("express");

const router = express.Router();

const tasksController = require("../controllers/tasks");

router.get("/tasks", tasksController.getTasks);

router.post("/tasks", tasksController.postTask);

router.patch("/tasks/:id", tasksController.patchTask);

router.patch("/tasks/archived/:id", tasksController.changeTaskArchived);

router.delete("/tasks/:id", tasksController.deleteTask);

module.exports = router;
