const express = require("express");
const bodyParser = require("body-parser");

const sequelize = require("./db/index");
const tasksRoutes = require("./routes/tasks");

const Task = require("./models/task");

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(tasksRoutes);

app.listen(3000);

sequelize.sync().then(() => {
  Task.findByPk(1).then((task) => {
    if (!task) {
      Task.create({
        type: "homo",
        text: "lorem testum",
        color: "#000",
      });
    }
  });
});
