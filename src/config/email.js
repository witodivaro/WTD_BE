const { GMAIL, GMAIL_PASSWORD, EMAIL_VERIFICATION_SECRET_KEY } = process.env;

const EMAIL_CONFIG = {
  GMAIL,
  GMAIL_PASSWORD,
  EMAIL_VERIFICATION_SECRET_KEY,
};

module.exports = EMAIL_CONFIG;
