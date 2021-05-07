const { ROUTE_NOT_FOUND } = require("../consts/serverErrors");
const { StatusCodes } = require("../consts/codes");
const { NotFoundError } = require("../utils/errors");

exports.get404 = (req, res) => {
  res.status(StatusCodes.NOT_FOUND).send(new NotFoundError(ROUTE_NOT_FOUND));
};
