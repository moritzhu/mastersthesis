var express = require('express')
var loglevel = require('loglevel');
var tracer = require('tracer').console();
const pino = require('pino')()
var morgan = require('morgan')
const { createLogger, format, transports } = require('winston');
const { combine, timestamp, label, printf, simple } = format;
var bunyan = require('bunyan').createLogger({name: 'myapp'});

var app = express()


app.use(morgan())

const myFormat = printf(({ level, message,  timestamp }) => {
  return `${timestamp} ${level}: ${message}`;
});

const winston = createLogger({
  format: format.combine(
    timestamp(),
    myFormat
  ),
  transports: [new transports.Console()]

});


app.get('/', function (req, res) {
    loglevel.error("loglevel");
    pino.info('pino')
    tracer.info('hello %s %d', 'world', 123, { foo: 'bar' })
    winston.log("info", "winston")
    bunyan.info("bunyan")
    res.send('hello, world!')
})

app.listen(3000)

