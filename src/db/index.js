require("dotenv").config();

const Sequelize = require("sequelize");

const { db_user, db_port, db_name, db_password } = process.env;

const sequelize = new Sequelize({
  dialect: "postgres",
  port: db_port,
  database: db_name,
  password: db_password,
  username: db_user,
});

module.exports = sequelize;
