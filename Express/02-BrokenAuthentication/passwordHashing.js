var express = require('express');
var crypto = require('crypto')
var argon2 = require('argon2')
var bcrypt = require('bcryptjs');

var app = express();

const asyncMiddleware = fn =>
  (req, res, next) => {
    Promise.resolve(fn(req, res, next))
      .catch(next);
  };

app.get('/', asyncMiddleware(async (req, res, next) => {
crypto.pbkdf2("pw", "salt", 1000, 64 , 'sha512', (err, derivedKey) => {
    if (err) throw err;
    //console.log(derivedKey.toString('hex'));  // '3745e48...08d59ae'
  });

  try {
    const value = await argon2.hash("password");
    //console.log(value)

  } catch (err) {
    //...
  }


  var salt = bcrypt.genSaltSync(10);
  var hash = bcrypt.hashSync("B4c0/\/", salt);

  console.log(salt)
  console.log(hash)

res.send("worked")
}))
app.listen(3000);