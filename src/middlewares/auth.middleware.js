const jwt = require("jsonwebtoken");

const { JWT_SECRET_KEY } = require("../config");
const User = require("../modules/user/user.model");

exports.authMiddleware = async (req, _, next) => {
  const authHeader = req.headers.authorization;

  const token = authHeader?.split(" ")[1];

  if (token) {
    const { id } = jwt.verify(token, JWT_SECRET_KEY);

    req.user = await User.findByPk(id);
  } else {
    req.user = null;
  }

  next();
};
