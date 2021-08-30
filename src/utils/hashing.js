const bcrypt = require("bcrypt");
const md5 = require("md5");

const saltRounds = 10;

exports.generateStrongHash = async (line) => {
  const salt = await bcrypt.genSalt(saltRounds);

  return await bcrypt.hash(line, salt);
};

exports.compareHashes = async (hash1, hash2) => {
  return await bcrypt.compare(hash1, hash2);
};

exports.generateSimpleHash = (text) => {
  return md5(text);
}