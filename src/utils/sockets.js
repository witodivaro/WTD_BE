const { verifyCsrfToken, verifyJwtToken } = require("./auth");
const { parseCookieString } = require("./utils");

const setupSockets = (io) => {
  io.on("connection", (socket) => {
    const { _csrf } = socket.handshake.query;
    const { accessToken } = parseCookieString(socket.handshake.headers.cookie);

    let isConnectionAllowed = true;
    const isCsrfPassing = 
    verifyCsrfToken(_csrf, accessToken);

    if (!isCsrfPassing) isConnectionAllowed = false;

    try {
      verifyJwtToken(accessToken);
    } catch (err) {
      isConnectionAllowed = false;
    }

    if (!isConnectionAllowed) {
      socket.disconnect();
    }
  });
};

module.exports = setupSockets;
