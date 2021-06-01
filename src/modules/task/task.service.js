const { Op } = require("sequelize");

const MILISECONDS_IN_ONE_DAY = 24 * 60 * 60 * 1000;
const ONE_DAY_AGO = Date.now() - MILISECONDS_IN_ONE_DAY * 1;

class TaskService {
  constructor(taskRepository) {
    this.taskRepository = taskRepository;
  }

  toResponse(task) {
    const { id, type, text, color, dueDate, isArchived } = task;

    return { id, type, text, color, dueDate, isArchived };
  }

  async destroyExpiredTasks() {
    return await this.taskRepository.destroy({
      archivedAt: {
        [Op.lt]: ONE_DAY_AGO,
      },
    });
  }

  async getTasks(user) {
    const options = {
      order: [["createdAt", "DESC"]],
      attributes: {
        exclude: ["updatedAt"],
      },
    };

    if (!user) {
      return await this.taskRepository.findAll(options);
    }

    return await user.getTasks(options);
  }

  async createTask(taskDto, user) {
    if (user) {
      return await user.createTask(taskDto);
    }

    return await this.taskRepository.create(taskDto);
  }

  async updateTask(id, updatedTask) {
    return await this.taskRepository.update(id, updatedTask);
  }

  async deleteTask(id) {
    return await this.taskRepository.destroy({ id });
  }

  async changeTaskArchived(id, isArchived) {
    const updatedTask = {
      isArchived,
      archivedAt: isArchived ? new Date() : null,
    };

    return await this.taskRepository.update(id, updatedTask);
  }
}

module.exports = TaskService;
