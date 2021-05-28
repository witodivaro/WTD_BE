const { TASK_DOESNT_EXIST } = require("../../consts/taskErrors");
const { NotFoundError, InternalServerError } = require("../../utils/errors");
const { StatusCodes } = require("../../consts/codes");

class TaskController {
  constructor(taskService) {
    this.taskService = taskService;
  }

  getTasks = async (req, res, next) => {
    await this.taskService.destroyExpiredTasks();
    const tasks = await this.taskService.getTasks();

    res.status(StatusCodes.OK).json(tasks);
  };

  createTask = async (req, res, next) => {
    const { type, text, color, dueDate } = req.body;

    try {
      const task = await this.taskService.createTask({
        type,
        text,
        color,
        dueDate,
      });

      res.status(StatusCodes.CREATED).json(task);
    } catch (error) {
      res
        .status(StatusCodes.INTERNAL_SERVER_ERROR)
        .json(new InternalServerError(error.message));
    }
  };

  updateTask = async (req, res, next) => {
    const { id } = req.params;
    const { type, text, color, dueDate, isArchived } = req.body;

    try {
      const updatedTask = await this.taskService.updateTask(id, {
        type,
        text,
        color,
        dueDate,
        isArchived,
      });

      res.status(200).json(updatedTask);
    } catch (error) {
      res
        .status(StatusCodes.INTERNAL_SERVER_ERROR)
        .send(new InternalServerError(error.message));
    }
  };

  deleteTask = async (req, res, next) => {
    const { id } = req.params;

    if (!id) {
      return res
        .status(StatusCodes.NOT_FOUND)
        .send(new NotFoundError(TASK_DOESNT_EXIST));
    }

    try {
      const task = await this.taskService.deleteTask(id);

      res.status(StatusCodes.OK).json(task);
    } catch (error) {
      res
        .status(StatusCodes.INTERNAL_SERVER_ERROR)
        .send(new InternalServerError(error.message));
    }
  };

  changeTaskArchived = async (req, res, next) => {
    const { id } = req.params;
    const { isArchived } = req.body;

    if (!id) {
      return res
        .status(StatusCodes.NOT_FOUND)
        .send(new NotFoundError(TASK_DOESNT_EXIST));
    }

    try {
      const task = await this.taskService.changeTaskArchived(id, isArchived);

      res.status(StatusCodes.OK).json(task);
    } catch (error) {
      res
        .status(StatusCodes.INTERNAL_SERVER_ERROR)
        .send(new InternalServerError(error.message));
    }
  };
}

module.exports = TaskController;
