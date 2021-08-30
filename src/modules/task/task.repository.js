const BaseRepository = require("../base/base.repository");
const Task = require("./task.model");

class TaskRepository extends BaseRepository {
  constructor() {
    super(Task);
  }
}

module.exports = TaskRepository;
