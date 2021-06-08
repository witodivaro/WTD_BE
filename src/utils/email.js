const generateEmailVerificationTemplate = (username, verificationHash) =>
  `
  <table style="font-size: 16px; background: rgba(0, 0, 0, 0) linear-gradient(to left, rgb(230, 100, 101), rgb(145, 152, 229)) repeat scroll 0% 0%; width: 100%; padding: 20px 0; margin: 0 auto; border-radius: 5px; text-align: center;">
  <tr style="color: rgb(255, 255, 255); ">
      <td>
        <span style="display: block; margin-bottom: 20px;">Hello, <i>${username}</i>!</span>
        <br>
        Please, confirm your email on
        <br>
        <span style="color: rgb(0, 0, 0);">Wito Divaro's</span> 
        Tasks Manager
      </td>
    </tr>
    <tr>
      <td style="margin-top: 20px; margin-bottom: 20px; display: block;">
        <a style="text-decoration: none; color: rgb(255, 255, 255); border-bottom: 1px solid rgb(255, 255, 255);" href="http://localhost:3000/email-verification/${verificationHash}">
          Confirm email
        </a>
      </td>
    </tr>
  </table>
      `;

module.exports = { generateEmailVerificationTemplate };
