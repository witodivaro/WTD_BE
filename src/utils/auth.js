const jwt = require("jsonwebtoken");

const { CSRF_SECRET_KEY, JWT_SECRET_KEY } = require("../config/auth");
const { encrypt, decrypt } = require("./encryption");
const { generateSimpleHash, compareHashes } = require("./hashing");

exports.createCsrfToken = async (jwtToken) => {
  const hashedJwtToken = generateSimpleHash(jwtToken);

  const csrfToken = encrypt(hashedJwtToken, CSRF_SECRET_KEY);

  return csrfToken;
};

exports.verifyJwtToken = (jwtToken) => {
  return jwt.verify(jwtToken, JWT_SECRET_KEY);
};

exports.verifyCsrfToken = (csrfToken, jwtToken) => {
  const decryptedCsrfToken = decrypt(csrfToken, CSRF_SECRET_KEY);
  const hashedJwtToken = generateSimpleHash(jwtToken);

  return hashedJwtToken === decryptedCsrfToken;
};

exports.verifyPassword = async (pw, hash) => {
  return compareHashes(pw, hash)
};
