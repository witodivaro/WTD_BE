const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");

const sequelize = require("./db/index");
const tasksRoutes = require("./routes/tasks");
const pageNotFoundController = require("./controllers/404");

const Task = require("./models/task");

const app = express();

app.use(
  cors({
    origin: "http://localhost:3000",
  })
);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(tasksRoutes);

app.use(pageNotFoundController.get404);

app.listen(3002);

sequelize.sync();
