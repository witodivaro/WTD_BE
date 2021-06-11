const Sequelize = require("sequelize");

const sequelize = require("../../db");

const BlacklistedJWT = sequelize.define("blacklisted_jwt", {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true,
  },
  token: {
    type: Sequelize.TEXT,
    allowNull: false,
  },
  expirationTime: {
    type: Sequelize.DATE,
    allowNull: false,
  },
  isBlacklisted: {
    type: Sequelize.BOOLEAN,
    allowNull: false,
    default: false,
  },
});

module.exports = BlacklistedJWT;
