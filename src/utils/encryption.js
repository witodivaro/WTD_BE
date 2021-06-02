const bcrypt = require("bcrypt");

const saltRounds = 10;

exports.generateHash = async (pw) => {
  const salt = await bcrypt.genSalt(saltRounds);

  return await bcrypt.hash(pw, salt);
};

exports.comparePasswordAndHash = async (pw, hash) => {
  return await bcrypt.compare(pw, hash);
};
