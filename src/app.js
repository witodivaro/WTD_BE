const express = require("express");
const http = require("http");
const cors = require("cors");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const { Server } = require("socket.io");

const sequelize = require("./db/index");
const tasksRouter = require("./modules/task/task.router");
const userRouter = require("./modules/user/user.router");
const notFoundRouter = require("./modules/notFound/notFound.router");

const Task = require("./modules/task/task.model");
const User = require("./modules/user/user.model");

const { errorMiddleware } = require("./middlewares/error.middleware");
const { createSocketMiddleware } = require("./middlewares/socket.middleware");

const setupSockets = require("./utils/sockets");

Task.belongsTo(User);
User.hasMany(Task, { onDelete: "CASCADE" });

const app = express();

const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: "http://localhost:3000",
  },
});

app.use(createSocketMiddleware(io));

app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
  })
);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());

app.use("/tasks", tasksRouter);
app.use("/user", userRouter);
app.use(notFoundRouter);

app.use(errorMiddleware);

setupSockets(io);

server.listen(3002);

sequelize.sync();
