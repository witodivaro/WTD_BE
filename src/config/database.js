const { DB_USER, DB_PORT, DB_NAME, DB_PASSWORD } = process.env;

const DB_CONFIG = {
  username: DB_USER,
  password: DB_PASSWORD,
  port: DB_PORT,
  database: DB_NAME,
  dialect: "postgres",
};

module.exports = DB_CONFIG;
