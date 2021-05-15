var express = require('express');
var cors = require('cors')

var app = express();
app.use(cors())

// Access the session as req.session
app.get('/', function(req, res, next) {
})
app.listen(3000);