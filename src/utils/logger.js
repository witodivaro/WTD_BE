const { createLogger, format, transports } = require("winston");

const { combine, colorize, timestamp, simple } = format;
const { Console } = transports;

const logger = createLogger({
  transports: [new Console()],
  format: combine(simple(), colorize({ all: true }), timestamp()),
});

module.exports = logger;
