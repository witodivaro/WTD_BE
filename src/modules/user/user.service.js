const { EMAIL_CONFIG } = require("../../config");
const {
  USER_NOT_FOUND,
  UNIQUE_EMAIL,
  UNIQUE_USERNAME,
  WRONG_CREDENTIALS,
} = require("../../consts/authErrors");

const { generateHash, verifyPassword } = require("../../utils/encryption");
const {
  ValidationException,
  ValidationError,
  HttpException,
} = require("../../utils/errors");

const { EMAIL_VERIFICATION_SECRET_KEY } = EMAIL_CONFIG;

class UserService {
  constructor(userRepository, jwtService) {
    this.userRepository = userRepository;
    this.jwtService = jwtService;
  }

  toResponse(user) {
    const { username, email, role } = user;

    return { username, email, role };
  }

  createUser = async (userDto) => {
    const { email, username, password } = userDto;

    let existingUser = null;

    existingUser = await this.findOne({ where: { email } });

    if (existingUser) {
      throw new ValidationException([
        new ValidationError(UNIQUE_EMAIL, "email"),
      ]);
    }

    existingUser = await this.findOne({ where: { username } });

    if (existingUser) {
      throw new ValidationException([
        new ValidationError(UNIQUE_USERNAME, "username"),
      ]);
    }

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

    return user;
  };

  login = async (loginDto) => {
    const { username, password } = loginDto;

    const options = {
      where: {
        username,
      },
    };

    const user = await this.findOne(options);

    if (!user) {
      throw new HttpException(400, WRONG_CREDENTIALS);
    }

    const passwordMatches = await verifyPassword(password, user.password);

    if (!passwordMatches) {
      throw new HttpException(400, WRONG_CREDENTIALS);
    }

    return user;
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
