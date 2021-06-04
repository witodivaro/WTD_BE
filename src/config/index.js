require("dotenv").config();

const { JWT_SECRET_KEY } = require("./auth");
const DB_CONFIG = require("./database");
const EMAIL_CONFIG = require("./email");

module.exports = {
  DB_CONFIG,
  JWT_SECRET_KEY,
  EMAIL_CONFIG,
};
