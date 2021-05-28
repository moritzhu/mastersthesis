const express = require('express')
const app = express()
const port = 3000

var mysql      = require('mysql');
var connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'root',
  password : 'password',
  database : 'newchema'
});

connection.connect();

app.get('/', (req, res) => {
    res.send("home")
})
app.get('/userInsecure', (req, res) => {
    var input = req.query.input;   
    //var input = "' OR 1=1"
    connection.query("SELECT * from user WHERE name = '" + input, function(err, rows, fields) {
        if (err){
            res.send("error")
        }else{
            if(rows.length > 0){
                res.send(rows)
            }else{
                res.send('empty')
            }
        }
       
      });
})

app.get('/userEscaped', (req, res) => {

    var input = req.query.input;   
    //var input = "' OR 1=1"
    connection.query("SELECT * FROM user WHERE name = " + connection.escape(input), function(err, rows, fields) {
        if(rows.length > 0){
            res.send("success")
        }else{
            res.send('empty')
        }
      });
})

app.get('/userPlaceholder', (req, res) => {

    //var input = req.query.input;   
    var input = "' OR 1=1" 
    connection.query("SELECT * from user WHERE name = ?",[input], function(err, rows, fields) {
        if(rows.length > 0){
            res.send(rows)
        }else{
            res.send('empty')
        }
      });
})

app.listen(port, () => console.log(`MySQL injection listening on ${port}!`))

//Global error handler 
app.use(function(err, req, res, next) {
    console.error(err.stack);
    res.status(500).send('Something broke!');
  })
