const createSocketMiddleware = (io) => (req, res, next) => {
  req.io = io;

  next();
};

module.exports = { createSocketMiddleware };
