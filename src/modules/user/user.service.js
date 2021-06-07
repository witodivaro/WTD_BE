const jwt = require("jsonwebtoken");

const { JWT_SECRET_KEY } = require("../../config");
const { generateHash, verifyPassword } = require("../../utils/encryption");

class UserService {
  constructor(userRepository) {
    this.userRepository = userRepository;
  }

  toResponse(user) {
    const { username, email, role } = user;

    return { username, email, role };
  }

  createUser = async (userDto) => {
    const { password } = userDto;

    const hashedPassword = await generateHash(password);

    const user = await this.userRepository.create({
      ...userDto,
      password: hashedPassword,
      role: "user",
    });

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

  login = async (loginDto) => {
    const { username, password } = loginDto;

    let token = null;

    const options = {
      where: {
        username,
      },
    };

    const user = await this.findOne(options);

    if (user) {
      const passwordMatches = await verifyPassword(password, user.password);

      if (passwordMatches) {
        token = this.createUserToken(user);
      }
    }

    return { user, token };
  };

  findOne = async (options) => {
    return await this.userRepository.findOne(options);
  };
}

module.exports = UserService;
