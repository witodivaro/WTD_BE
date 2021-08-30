const { Op } = require("sequelize");

const { EMAIL_CONFIG } = require("../../config");
const {
  USER_NOT_FOUND,
  UNIQUE_EMAIL,
  UNIQUE_USERNAME,
  WRONG_CREDENTIALS,
} = require("../../consts/authErrors");

const { verifyPassword } = require("../../utils/auth");
const {
  ValidationException,
  ValidationError,
  HttpException,
} = require("../../utils/errors");
const { generateStrongHash } = require("../../utils/hashing");

const { EMAIL_VERIFICATION_SECRET_KEY } = EMAIL_CONFIG;

class AuthService {
  constructor(userRepository, jwtService) {
    this.userRepository = userRepository;
    this.jwtService = jwtService;
  }

  userToResponse(user) {
    const { username, email, role } = user;

    return { username, email, role };
  }

  createUser = async (userDto) => {
    const { email, username, password } = userDto;

    let existingUser = null;

    existingUser = await this.findOne({
      where: {
        [Op.or]: [{ email }, { username }],
      },
    });

    if (existingUser) {
      const { email: emailInUse, username: usernameInUse } = existingUser;

      if (emailInUse === email) {
        throw new ValidationException([
          new ValidationError(UNIQUE_EMAIL, "email"),
        ]);
      }
      
      if (usernameInUse === username) {
        throw new ValidationException([
          new ValidationError(UNIQUE_USERNAME, "username"),
        ]);
      }
    }

    const hashedPassword = await generateStrongHash(password);
    let emailVerificationHash = await generateStrongHash(
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
      throw new HttpException(401, USER_NOT_FOUND);
    }

    user.emailVerificated = true;

    await user.save();

    return user;
  };

  findOne = async (options) => {
    return await this.userRepository.findOne(options);
  };
}

module.exports = AuthService;
