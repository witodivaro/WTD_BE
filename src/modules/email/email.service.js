const nodemailer = require("nodemailer");

const { EMAIL_CONFIG } = require("../../config");

class EmailService {
  constructor() {
    const { GMAIL, GMAIL_PASSWORD } = EMAIL_CONFIG;

    const options = {
      service: "gmail",
      auth: {
        user: GMAIL,
        pass: GMAIL_PASSWORD,
      },
    };

    this.mailer = nodemailer.createTransport(options);
  }

  sendVerificationEmail = async (to) => {
    this.sendEmail({
      to,
      subject: "Email Verification",
      text: "Please, verificate your email",
    });
  };

  sendEmail = async (options) => {
    this.mailer.sendMail({
      from: '"Wito Divaro Tasks" <witodivaro@gmail.com>',
      ...options,
    });
  };
}

module.exports = EmailService;
