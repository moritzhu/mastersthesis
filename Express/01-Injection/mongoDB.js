const express = require('express');
const app = express();
const {MongoClient} = require('mongodb');
var sanitize = require('mongo-sanitize');
const mongoSanitize = require('express-mongo-sanitize')
var bodyParser = require('body-parser')

app.use(bodyParser.json())
let mytestcoll;

app.get('/', function(req, res) {
  res.send('Hello World')
})



app.listen(3000, function() {
  console.log('listening on 3000')
})


// Connection URL
const url = 'mongodb://localhost:27017';

// Database Name
const dbName = 'Test';

// Use connect method to connect to the server
MongoClient.connect(url, function(err, client) {
  console.log("Connected successfully to server");
  const db = client.db(dbName);
  mytestcoll= db.collection("TestCollection")
  
  var userInput = "' || 'a'=='a"
  var userInput2 = ""

  var whereQuery = {$where : `this.titel == '${userInput}'`}

 mytestcoll.find(whereQuery).toArray(function(erree,docs) {
    console.log("Query with $where")
    console.log(docs)
 })

mytestcoll.find({ 'title' : userInput}).toArray(function(erree,docs) {
  console.log("Query without $where")
  console.log(docs)
})

mytestcoll.find({ 'title' : { $ne: userInput2}}).toArray(function(erree,docs) {
  console.log("Query with insecure querying")
  console.log(docs)
})


var sanitizedUserInput = sanitize(userInput)
var sanitizedUserInput2 = ""
console.log(sanitizedUserInput2)
var sanitizedWhereQuery = sanitize(whereQuery)

mytestcoll.find(sanitizedWhereQuery).toArray(function(erree,docs) {
  console.log("Sanitized query with $where")
  console.log(docs)
})

mytestcoll.find({ 'title' : sanitizedUserInput}).toArray(function(erree,docs) {
console.log("Sanitized query without $where")
console.log(docs)
})

mytestcoll.find({ 'title' : { $ne: sanitizedUserInput2}}).toArray(function(erree,docs) {
console.log("Sanitized query with insecure querying")
console.log(docs)
})

  // Sanitization
  //userInput = sanitize(userInput)
  //userInput = mongoSanitize.sanitize(userInput);
  //console.log(userInput)

  //mytestcoll.find(userInput).toArray(function(erree,docs) {
  //  console.log(docs)
  //})
  
});

//IF javascriptEnables is set to false array will be empty

//Post Request --> Body as JSON: { 	"title" : {"$ne": ""}}
app.post('/operatorInjectionSanitized', function (req, res) {
  mongoSanitize.sanitize(req.body)
  let title = req.body.title
  console.log(title)
  mytestcoll.find({title: title}).toArray(function(erree,docs) {
    console.log(docs)
    res.send(docs)
  });
});

app.post('/operatorInjectionUnsanitized', function (req, res) {
  let title = req.body.title
  mytestcoll.find({title: title}).toArray(function(erree,docs) {
    console.log(docs)
    res.send(docs)
  });
});

//Post Request --> Body as JSON: {"title" : " ' || 'a'=='a"}
app.put('/whereInjectionUnsanitized', function (req, res) {
  let title = req.body.title
  let unsanitizedQuery = { $where: `this.title == '${title}'` }

  mytestcoll.find(unsanitizedQuery).toArray(function(erree,docs) {
    console.log(docs)
    res.send(docs)
  });
});

//Still returns all, because query is emptied
app.post('/whereInjectionSanitized', function (req, res) {
  mongoSanitize(req)
  let title = req.body.title
  let sanitizedQuery = { $where: `this.title == '${title}'` }
  console.log(sanitizedQuery)
  mytestcoll.find(sanitizedQuery).toArray(function(erree,docs) {
    console.log(docs)
    res.send(docs)
  });
});
