const Task = require("../models/task");

exports.getTasks = async (req, res, next) => {
  const tasks = await Task.findAll();

  res.status(200).send(tasks);
};

exports.postTask = async (req, res, next) => {
  const { type, text, color } = req.body;
  console.log(req.body);

  try {
    const dbResponse = await Task.create({
      type,
      text,
      color,
    });

    console.log(dbResponse);

    res.status(200).send(dbResponse);
  } catch (error) {
    res.status(401).send(error);
  }

  res.status(200).send("Post task");
};

exports.patchTask = (req, res, next) => {
  res.status(200).send("Patch task");
};

exports.deleteTask = (req, res, next) => {
  res.status(200).send("Delete task");
};
