const express = require("express");

const router = express.Router();

const tasksController = require("../controllers/tasks");

router.get("/tasks", tasksController.getTasks);

router.post("/tasks", tasksController.postTask);

router.post("/tasks/archive", tasksController.archiveTask);

router.patch("/tasks/:id", tasksController.patchTask);

router.delete("/tasks/:id", tasksController.deleteTask);

module.exports = router;
