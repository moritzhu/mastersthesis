var cookieParser = require('cookie-parser')
var csrf = require('csurf')
var bodyParser = require('body-parser')
var express = require('express')
const app = express()
const port = 3000



// setup route middlewares
var csrfProtection = csrf({ cookie: { httpOnly: true, secure: true}})
var parseForm = bodyParser.urlencoded({ extended: false })
app.use(cookieParser())
async function thisThrows() {


        if(50 < Math.floor(Math.random() * Math.floor(100))){
            console.log("resolve")
            Promise.resolve("yes")
        }else {
           Promise.reject("no");
        }
     };


app.get('/', (req, res, next) => {

    const myPromise = new Promise((resolve, reject) => {  
        var random = Math.floor(Math.random() * Math.floor(100))
        console.log(random)
        if(50 < random) {    
            resolve('Promise is resolved successfully.');  
        } else {    
            reject('Promise is rejected');  
        }
    });

    myPromise.then(() => {
        console.log("in then")
        res.send("Hello World")
    }).catch(next)

})

app.all('/', function (req, res) {
    res.cookie('XSRF-TOKEN', req.csrfToken())
    res.render('index')
  })

  app.use((error, req, res, next) => {
    console.log("error")
    return res.status(500).send();
  });
app.listen(port, () => console.log(`Example app listening on port ${port}!`))


