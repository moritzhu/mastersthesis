var express = require('express');
var cookieSession = require('cookie-session')
var Keygrip = require("keygrip")

var app = express();

app.use(cookieSession({keys: new Keygrip(['key1', 'key2'], 'SHA384')}))


app.get('/', function(req, res, next) {
    req.session.views = (req.session.views || 0) + 1
    res.send("ok")
    
})
app.listen(3000);