const logger = require("../../utils/logger");

const SocketEvents = {
  SCORE_UPDATE: "score:update",
  SCORE_UPDATED: "score:updated",
};

class TaskSockets {
  constructor(taskService) {
    this.taskService = taskService;
  }

  sendTopTaskCreators = async (io) => {
    try {
      const topUsers = await this.taskService.getTopTaskCreators();

      io.sockets.emit(SocketEvents.SCORE_UPDATED, topUsers);
    } catch (error) {
      logger.error(error);
    }
  };
}

module.exports = { TaskSockets, SocketEvents };
