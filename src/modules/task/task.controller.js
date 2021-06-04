const { NotFoundError, UnauthorizedError } = require("../../utils/errors");
const { StatusCodes } = require("../../consts/codes");
const { UNAUTHORIZED } = require("../../consts/authErrors");
const { TASK_DOESNT_EXIST } = require("../../consts/taskErrors");

class TaskController {
  constructor(taskService) {
    this.taskService = taskService;
  }

  getTasks = async (req, res, next) => {
    console.log(req.cookies);
    if (!req.user) {
      return res
        .status(StatusCodes.UNAUTHORIZED)
        .json(new UnauthorizedError(UNAUTHORIZED));
    }

    await this.taskService.destroyExpiredTasks();
    const tasks = await this.taskService.getTasks(req.user);

    res.status(StatusCodes.OK).json(tasks);
  };

  createTask = async (req, res, next) => {
    if (!req.user) {
      return res
        .status(StatusCodes.UNAUTHORIZED)
        .json(new UnauthorizedError(UNAUTHORIZED));
    }

    const { type, text, color, dueDate } = req.body;

    const taskDto = {
      type,
      text,
      color,
      dueDate,
    };

    try {
      const task = await this.taskService.createTask(taskDto, req.user);

      res.status(StatusCodes.CREATED).json(this.taskService.toResponse(task));
    } catch (error) {
      next(error);
    }
  };

  updateTask = async (req, res, next) => {
    const { id } = req.params;

    try {
      const updatedTask = await this.taskService.updateTask(id, req.body);

      res.status(StatusCodes.OK).json(this.taskService.toResponse(updatedTask));
    } catch (error) {
      next(error);
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
      next(error);
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

      res.status(StatusCodes.OK).json(this.taskService.toResponse(task));
    } catch (error) {
      next(error);
    }
  };
}

module.exports = TaskController;
