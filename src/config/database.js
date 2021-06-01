const { db_user, db_port, db_name, db_password } = process.env;

const DB_CONFIG = {
  username: db_user,
  password: db_password,
  port: db_port,
  database: db_name,
  dialect: "postgres",
};

module.exports = DB_CONFIG;
