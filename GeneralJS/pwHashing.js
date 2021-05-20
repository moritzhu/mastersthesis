var crypto = require('crypto')
var argon2 = require('argon2')
var bcrypt = require('bcrypt');

let password  = "Please give me a 1.0"
let salt = crypto.randomBytes(16) 

//Secure configuration for Argon2
argon2.hash(password, {type : argon2.argon2id, timeCost: 2, memoryCost: 15360, parallelism: 1}) //as defined by OWASP

//Secure bcrypt config --> Default 10 hash rounds
bcrypt.hash(password, (err, hash) => {
    //Save PW
});

//Secure configuration for PBKDF2
crypto.pbkdf2(password, salt, 310000, 64, 'sha256', (err,pwHash) => {
})

//Secure configuration for scrypt
crypto.scrypt(password, salt, 64, {cost: 65536, blockSize: 8, parallelization: 1 , maxmem: 9999999999},(err,pwHash) => {
    //Save PW
})

