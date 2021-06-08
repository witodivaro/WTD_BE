const Router = require("express").Router;

const NotFoundController = require("./notFound.controller");

const router = new Router();

const notFoundController = new NotFoundController();

router.use(notFoundController.get404);

module.exports = router;
