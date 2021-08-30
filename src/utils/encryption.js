const aes = require('crypto-js/aes');
const CryptoJS = require('crypto-js');

const keySize = 256;
const ivSize = 128;
const iterations = 100;

exports.encrypt = (text, secretKey) => {
  const salt = CryptoJS.lib.WordArray.random(128 / 8);

  const key = CryptoJS.PBKDF2(secretKey, salt, {
    keySize: keySize / 32,
    iterations,
  });

  const iv = CryptoJS.lib.WordArray.random(ivSize / 8);

  const encrypted = aes.encrypt(text, key, {
    iv,
    padding: CryptoJS.pad.Pkcs7,
    mode: CryptoJS.mode.CBC,
  });

  return salt.toString() + iv.toString() + encrypted.toString();
};

exports.decrypt = (transitMessage, secretKey) => {
  const salt = CryptoJS.enc.Hex.parse(transitMessage.substr(0, 32));
  const iv = CryptoJS.enc.Hex.parse(transitMessage.substr(32, 32));
  const encrypted = transitMessage.substring(64);

  const key = CryptoJS.PBKDF2(secretKey, salt, {
    keySize: keySize / 32,
    iterations,
  });

  const decrypted = aes
    .decrypt(encrypted, key, {
      iv,
      padding: CryptoJS.pad.Pkcs7,
      mode: CryptoJS.mode.CBC,
    })
    .toString(CryptoJS.enc.Utf8);

  return decrypted;
};
