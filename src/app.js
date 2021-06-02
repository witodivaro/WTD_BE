require("./utils/encryption");

const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");

const sequelize = require("./db/index");
const tasksRoutes = require("./modules/task/task.router");
const userRoutes = require("./modules/user/user.router");
const pageNotFoundController = require("./controllers/404");

const Task = require("./modules/task/task.model");
const User = require("./modules/user/user.model");
const { authMiddleware } = require("./middlewares/auth.middleware");

Task.belongsTo(User);
User.hasMany(Task, { onDelete: "CASCADE" });

const app = express();

app.use(
  cors({
    origin: "http://localhost:3000",
  })
);

app.use(authMiddleware);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use("/tasks", tasksRoutes);
app.use("/user", userRoutes);
app.use(pageNotFoundController.get404);

app.listen(3002);

sequelize.sync();
