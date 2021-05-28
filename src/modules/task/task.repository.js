const Task = require("./task.model");

class TaskRepository {
  async destroy(where) {
    return await Task.destroy({ where });
  }

  async findAll(options) {
    return await Task.findAll(options);
  }

  async create(task) {
    return await Task.create(task);
  }

  async update(id, patch) {
    const task = await Task.findByPk(id);

    for (const prop in patch) {
      task[prop] = patch[prop];
    }

    return await task.save();
  }
}

module.exports = TaskRepository;
