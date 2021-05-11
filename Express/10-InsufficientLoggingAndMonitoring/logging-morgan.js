var express = require('express')
var fs = require('fs')
var morgan = require('morgan')
var path = require('path')
 
var app = express()
 
//logging to files
//var accessLogStream = fs.createWriteStream(path.join(__dirname, 'access.log'), { flags: 'a' })
 
//Modes:
// combined, common, dev, short, tiny

//Log to a file with mode combined:
//app.use(morgan('combined', { stream: accessLogStream }))
 
//Log to console with mode common
app.use(morgan())


app.get('/', function (req, res) {
  res.send('hello, world!')
})

app.listen(3000)