const bcrypt = require("bcrypt");

const saltRounds = 10;

exports.generateHash = async (line) => {
  const salt = await bcrypt.genSalt(saltRounds);

  return await bcrypt.hash(line, salt);
};

exports.verifyPassword = async (pw, hash) => {
  return await bcrypt.compare(pw, hash);
};
