const crypto = require('crypto');
const cryptojs = require('crypto-js')
const key = crypto.randomBytes(32); // 32 * 8 = 256 --> needed since AES 256 is used 
const iv = crypto.randomBytes(16); //  16 * 8 = 128 --> AES has a 128 block length!
let algorithm = "aes-256-gcm"
let text  = "Please give me a 1.0"

//Encrypt with crypto-js
console.log("Crypto-js:")
let cryptoJSEncrypted = cryptojs.AES.encrypt(text, key.toString('utf-8'))
let cryptoJSDecrypted = cryptojs.AES.decrypt(cryptoJSEncrypted, key.toString('utf-8'))

console.log("E: " + cryptoJSEncrypted)
console.log("D: " + cryptoJSDecrypted.toString(cryptojs.enc.Utf8))


//Example taken from:
//https://www.techengineer.one/how-to-encrypt-decrypt-with-aes-ccm-gcm-in-node-js/
try {
    console.log("\nNode crypto module")
    var cipher = crypto.createCipheriv(algorithm, key, iv);
    var decipher = crypto.createDecipheriv(algorithm, key, iv);

    console.log(algorithm + ':');
    // Encrypting
    var encText = cipher.update(text, 'utf8', 'hex');
    encText += cipher.final('hex');
    console.log("E: " + encText);

    const tag = cipher.getAuthTag();
    decipher.setAuthTag(tag);

    // Decrypting
    var decText = decipher.update(encText, 'hex', 'utf8');
    decText += decipher.final('utf8');
    console.log("D: " + decText);

    console.log("MATCH: " + (decText == text));

} catch (e) {
    console.log(e);
}
