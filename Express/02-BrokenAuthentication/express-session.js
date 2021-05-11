var express = require('express');
var session = require('express-session');

var app = express();

app.use(session({ secret: 'keyboard cat'}))

// Access the session as req.session
app.get('/', function(req, res, next) {
  res.send("ho")
})
app.listen(3000);