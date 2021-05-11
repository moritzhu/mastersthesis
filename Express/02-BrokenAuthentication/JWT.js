const express = require('express')
const app = express()
const port = 3000

app.get('/', (req, res) => res.send('<h1> Hello World! </h1>'))

app.listen(port, () => console.log(`Example app listening on port ${port}!`))
var jwt = require('jsonwebtoken');
var token = jwt.sign({ foo: 'bar', name: "aAAAAAAa" }, 'shhhhh', {audience: "Momo"});
console.log(token)

console.log(jwt.verify(token, 'shhhhh'))