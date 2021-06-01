const jwt = require("jsonwebtoken");

const { JWT_SECRET_KEY } = require("../../config");

class UserService {
  constructor(userRepository) {
    this.userRepository = userRepository;
  }

  createUser = async (userDto) => {
    const user = await this.userRepository.create({ ...userDto, role: "user" });

    const token = this.createUserToken(user);

    return { user, token };
  };

  createUserToken = (user) => {
    return jwt.sign({ role: "user", id: user.id }, JWT_SECRET_KEY);
  };

  getUserByToken = async (token) => {
    const jwtPayload = jwt.verify(token, JWT_SECRET_KEY);

    return await this.userRepository.findById(jwtPayload.id);
  };

  findOne = async (options) => {
    return await this.userRepository.findOne(options);
  };
}

module.exports = UserService;
