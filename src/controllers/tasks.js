const Task = require("../models/task");

exports.getTasks = async (req, res, next) => {
  const tasks = await Task.findAll({
    order: [["createdAt", "DESC"]],
    attributes: {
      exclude: ["updatedAt"],
    },
  });

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

    res.status(200).send(dbResponse);
  } catch (error) {
    res.status(400).send(error);
  }

  res.status(200).send("Post task");
};

exports.patchTask = async (req, res, next) => {
  const { id } = req.params;
  const { type, text, color } = req.body;

  try {
    const task = await Task.findByPk(id);

    task.type = type;
    task.text = text;
    task.color = color;

    const { createdAt } = await task.save();

    res
      .status(200)
      .send({ id: parseInt(id, 10), type, text, color, createdAt });
  } catch (error) {
    res.status(400).send(error);
  }

  res.status(200).send("Patch task");
};

exports.deleteTask = (req, res, next) => {
  res.status(200).send("Delete task");
};
