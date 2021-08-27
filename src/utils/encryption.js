const bcrypt = require("bcrypt");
const md5 = require("md5");
const aes = require('crypto-js/aes');
const { CSRF_SECRET_KEY } = require("../config/auth");

const saltRounds = 10;

exports.generateHash = async (line) => {
  const salt = await bcrypt.genSalt(saltRounds);

  return await bcrypt.hash(line, salt);
};

exports.verifyPassword = async (pw, hash) => {
  return await bcrypt.compare(pw, hash);
};

exports.createCsrfToken = async (jwtToken) => {
  const hashedJwtToken = md5(jwtToken);
  
  const csrfToken = aes.encrypt(hashedJwtToken, CSRF_SECRET_KEY);
  return csrfToken;
};

exports.verifyCsrfToken = (csrfToken, jwtToken) => {
  const decryptedCsrfToken = aes.decrypt(csrfToken, CSRF_SECRET_KEY);
  const hashedJwtToken = md5(jwtToken);
  
  return hashedJwtToken === decryptedCsrfToken;
};
