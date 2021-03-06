const Sequelize = require("sequelize");

const sequelize = require("../../db");

const Task = sequelize.define("task", {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    primaryKey: true,
    allowNull: false,
  },
  type: {
    type: Sequelize.TEXT,
    allowNull: false,
  },
  text: {
    type: Sequelize.TEXT,
    allowNull: false,
  },
  color: {
    type: Sequelize.TEXT,
    allowNull: true,
  },
  dueDate: {
    type: Sequelize.DATE,
    allowNull: false,
  },
  isArchived: {
    type: Sequelize.BOOLEAN,
  },
  archivedAt: {
    type: Sequelize.DATE,
    allowNull: true,
  },
  userId: {
    type: Sequelize.INTEGER,
    allowNull: false,
    onDelete: "CASCADE",
  },
});

module.exports = Task;
