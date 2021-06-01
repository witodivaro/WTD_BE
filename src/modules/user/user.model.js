const Sequelize = require("sequelize");

const sequelize = require("../../db");

const User = sequelize.define("user", {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    primaryKey: true,
    allowNull: false,
  },
  email: {
    type: Sequelize.TEXT,
    allowNull: false,
    unique: true,
  },
  username: {
    type: Sequelize.TEXT,
    allowNull: false,
    unique: true,
  },
  password: {
    type: Sequelize.TEXT,
    allowNull: false,
  },
  role: {
    type: Sequelize.TEXT,
    allowNull: true,
  },
});

module.exports = User;
