exports.createTimestamp = () => new Date();

exports.extractCookie = (req, cookieName) => {
  let token = null;

  if (req && req.cookies) token = req.cookies[cookieName];

  return token;
};

exports.parseCookieString = (cookieString) => {
  return cookieString.split(";").reduce((acc, cookieSet) => {
    const [key, value] = cookieSet.replace(/ /g, "").split("=");
    acc[key] = value;
    return acc;
  }, {});
};
