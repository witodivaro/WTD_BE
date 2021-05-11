const Task = require("../models/task");
const { TASK_DOESNT_EXIST } = require("../consts/taskErrors");
const { NotFoundError, InternalServerError } = require("../utils/errors");
const { StatusCodes } = require("../consts/codes");

exports.getTasks = async (req, res, next) => {
  const tasks = await Task.findAll({
    order: [["createdAt", "DESC"]],
    attributes: {
      exclude: ["updatedAt"],
    },
  });

  res.status(StatusCodes.OK).send(tasks);
};

exports.postTask = async (req, res, next) => {
  const { type, text, color, dueDate } = req.body;

  try {
    const dbResponse = await Task.create({
      type,
      text,
      color,
      dueDate,
    });

    res.status(StatusCodes.CREATED).send(dbResponse);
  } catch (error) {
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .send(new InternalServerError(error.message));
  }
};

exports.patchTask = async (req, res, next) => {
  const { id } = req.params;
  const { type, text, color, dueDate, isArchived } = req.body;

  try {
    const task = await Task.findByPk(id);

    task.type = type;
    task.text = text;
    task.color = color;
    task.dueDate = dueDate;
    task.isArchived = isArchived;

    const { createdAt } = await task.save();

    res.status(StatusCodes.OK).send({
      id: parseInt(id, 10),
      type,
      text,
      color,
      createdAt,
      dueDate,
      isArchived,
    });
  } catch (error) {
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .send(new InternalServerError(error.message));
  }
};

exports.deleteTask = async (req, res, next) => {
  const { id } = req.params;

  if (!id) {
    return res
      .status(StatusCodes.NOT_FOUND)
      .send(new NotFoundError(TASK_DOESNT_EXIST));
  }

  try {
    const taskToDelete = await Task.findByPk(id);

    if (!taskToDelete) {
      return res
        .status(StatusCodes.NOT_FOUND)
        .send(new NotFoundError(TASK_DOESNT_EXIST));
    }

    await taskToDelete.destroy();
    res.status(StatusCodes.OK).send({ success: true });
  } catch (error) {
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .send(new InternalServerError(error.message));
  }
};

exports.changeTaskArchived = async (req, res, next) => {
  const { id } = req.params;

  const { isArchived } = req.body;

  if (!id) {
    return res
      .status(StatusCodes.NOT_FOUND)
      .send(new NotFoundError(TASK_DOESNT_EXIST));
  }

  try {
    const taskToChangeArchived = await Task.findByPk(id);

    if (!taskToChangeArchived) {
      return res
        .status(StatusCodes.NOT_FOUND)
        .send(new NotFoundError(TASK_DOESNT_EXIST));
    }

    taskToChangeArchived.isArchived = isArchived;

    if (isArchived) {
      taskToChangeArchived.archivedAt = new Date();
    } else {
      taskToChangeArchived.archivedAt = null;
    }

    await taskToChangeArchived.save();
    res.status(StatusCodes.OK).send(taskToChangeArchived);
  } catch (error) {
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .send(new InternalServerError(error.message));
  }
};
