var express = require('express')
 
var app = express()
const rateLimit = require("express-rate-limit");

// Enable if you're behind a reverse proxy (Heroku, Bluemix, AWS ELB, Nginx, etc)
// see https://expressjs.com/en/guide/behind-proxies.html
// app.set('trust proxy', 1);

const limiter = rateLimit({
  windowMs: 1 * 60 * 1000, // 15 minutes
  max: 5 // limit each IP to 100 requests per windowMs
});

//  apply to all requests
app.use(limiter);

app.get('/', function (req, res) {
  res.send('hello, world!')
})
//app.use(errorhandler())

app.listen(3000)