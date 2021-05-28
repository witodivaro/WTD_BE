const { Op } = require("sequelize");

const MILISECONDS_IN_ONE_DAY = 24 * 60 * 60 * 1000;
const ONE_DAY_AGO = Date.now() - MILISECONDS_IN_ONE_DAY * 1;

class TaskService {
  constructor(taskRepository) {
    this.taskRepository = taskRepository;
  }

  async destroyExpiredTasks() {
    return await this.taskRepository.destroy({
      archivedAt: {
        [Op.lt]: ONE_DAY_AGO,
      },
    });
  }

  async getTasks() {
    const tasks = await this.taskRepository.findAll({
      order: [["createdAt", "DESC"]],
      attributes: {
        exclude: ["updatedAt"],
      },
    });

    return tasks;
  }

  async createTask({ type, text, color, dueDate }) {
    const dbResponse = await this.taskRepository.create({
      type,
      text,
      color,
      dueDate,
    });

    return dbResponse;
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
