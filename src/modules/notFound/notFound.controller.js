const { ROUTE_NOT_FOUND } = require("../../consts/serverErrors");
const { HttpException } = require("../../utils/errors");

class NotFoundController {
  get404(req, res, next) {
    next(new HttpException(404, ROUTE_NOT_FOUND));
  }
}

module.exports = NotFoundController;
