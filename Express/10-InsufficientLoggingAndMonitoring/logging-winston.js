var express = require('express')
const { createLogger, format, transports } = require('winston');
const { combine, timestamp, label, printf, simple } = format;

var app = express()

const myFormat = printf(({ level, message, label, timestamp }) => {
    return `${timestamp} [${label}] ${level}: ${message}`;
  });

  const logger = createLogger({
    format: format.combine(
      format.splat(),
      format.simple()
    ),
    transports: [new transports.Console()]

  });

app.get('/', function (req, res) {
    logger.log("info", "message")
  res.send('hello, world!')
})

app.listen(3000)