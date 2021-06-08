const jwt = require("jsonwebtoken");

const { JWT_SECRET_KEY } = require("../../config");
const { EMAIL_CONFIG } = require("../../config");
const { USER_NOT_FOUND } = require("../../consts/authErrors");

const { generateHash, verifyPassword } = require("../../utils/encryption");

const { EMAIL_VERIFICATION_SECRET_KEY } = EMAIL_CONFIG;

class UserService {
  constructor(userRepository) {
    this.userRepository = userRepository;
  }

  toResponse(user) {
    const { username, email, role } = user;

    return { username, email, role };
  }

  createUser = async (userDto) => {
    const { email, username, password } = userDto;

    const hashedPassword = await generateHash(password);
    let emailVerificationHash = await generateHash(
      EMAIL_VERIFICATION_SECRET_KEY + email + username
    );

    emailVerificationHash = emailVerificationHash.replace(/\//g, "slash");

    const user = await this.userRepository.create({
      ...userDto,
      password: hashedPassword,
      emailVerificationHash,
    });

    const token = this.createUserToken(user);

    return { user, token, emailVerificationHash };
  };

  createUserToken = (user) => {
    return jwt.sign({ role: "user", id: user.id }, JWT_SECRET_KEY);
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

  verificateEmail = async (verificationHash) => {
    const options = {
      where: {
        emailVerificationHash: verificationHash,
      },
    };

    const user = await this.findOne(options);

    if (!user) {
      throw new Error(USER_NOT_FOUND);
    }

    user.emailVerificated = true;

    await user.save();

    return user;
  };

  findOne = async (options) => {
    return await this.userRepository.findOne(options);
  };
}

module.exports = UserService;
