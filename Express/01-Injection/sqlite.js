const express = require('express')
const helmet = require('helmet')
const app = express()
const port = 3000
require('dotenv').config()
process.env.NODE_ENV = 'production';

app.use(helmet())



app.get('/', (req, res) => {
    console.log(app.get('env'))


})

app.listen(port, () => console.log(`Example app listening on port ${port}!`))


var mysql      = require('mysql');
var connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'root',
  password : 'password',
  database : 'newchema'
});

connection.connect();



app.get('/userInsecure', (req, res) => {
    var input = req.query.input;   
    console.log(input)
    console.log(connection.escape(input))

    connection.query("SELECT * from user WHERE name = '" + input, function(err, rows, fields) {
        if (err) throw err;
        console.log(this.sql);
        if(rows.length > 0){
            res.send(rows)
        }else{
            res.send('empty')
        }
      });
})

app.get('/userEscaped', (req, res) => {

    var input = req.query.input;   
    var sql    = "SELECT * FROM user WHERE name = " + connection.escape(input);
    console.log(connection.escape(input))
    connection.query(sql, function(err, rows, fields) {
        if (err) throw err;
        console.log(this.sql);
        if(rows.length > 0){
            res.send(rows)
        }else{
            res.send('empty')
        }
      });
})

app.get('/userPlaceholder', (req, res) => {

    var input = req.query.input;   
    connection.query("SELECT * from user WHERE name = ?",[input], function(err, rows, fields) {

        if (err) throw err;
        console.log(this.sql);
        if(rows.length > 0){
            res.send(rows)
        }else{
            res.send('empty')
        }
      });
})
app.use(function(err, req, res, next) {
    console.error(err.stack);
    res.status(500).send('Something broke!');
  })

