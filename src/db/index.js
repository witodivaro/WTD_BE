const Sequelize = require("sequelize");

const { DB_CONFIG } = require("../config");

const sequelize = new Sequelize(DB_CONFIG);

module.exports = sequelize;
