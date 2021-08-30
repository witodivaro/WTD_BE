exports.createTimestamp = () => new Date();

exports.extractCookie = (req, cookieName) => {
  let token = null;

  if (req && req.cookies) token = req.cookies[cookieName];

  return token;
};