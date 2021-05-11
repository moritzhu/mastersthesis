var errorhandler = require('errorhandler')
var express = require('express')
 
var app = express()


app.get('/', function (req, res) {
    throw Error()
  res.send('hello, world!')
})
//app.use(errorhandler())

app.listen(3000)