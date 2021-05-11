const express = require('express');
const app = express();
const mongoose = require('mongoose');
var bodyParser = require('body-parser')

app.use(bodyParser.json())

app.get('/', function(req, res) {
  res.send('Hello World')
})

app.listen(3000, function() {
  console.log('listening on 3000')
})

mongoose.connect('mongodb://127.0.0.1:27017/', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
  useCreateIndex: true,
  dbName: "Test"
}); 

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  // we're connected!
});

const documentSchema = new mongoose.Schema({
  title: {
    type : String
  },
  author: {
    type: String
  }
});

const Document = mongoose.model('Document', documentSchema);

let doc1 = new Document({ title: 'Title1', author: 'Author1' });
let doc2 = new Document({ title: 'Title2', author: 'Author2' });
let doc3 = new Document({ title: 'Title3', author: 'Author3' });
let doc4 = new Document({ title: 'Title4', author: 'Author4' });

doc1.save()
doc2.save()
doc3.save()
doc4.save()

/*
Kitten.find(function(err,Kittens) {
  console.log(Kittens)
})

let username = "' || 'a'=='a"
//username = mongoSanitize.sanitize(username)
let query = { $where: `this.name == '${username}'` }

Kitten.find(query, function(err,Kittens) {
  console.log(Kittens)
})

let userInput = {"name": {"$ne":null}}

  // Sanitization

  //userInput = sanitize(userInput)
  //userInput = mongoSanitize.sanitize(userInput);
  console.log(userInput)

  Kitten.find(userInput, function(err,Kittens) {
    console.log(Kittens)
  })
*/


app.post('/operatorInjectionUnsanitized', function (req, res) {
  let title = req.body.title
  Document.find({title: title}, function(erree,docs) {
    console.log(docs)
    res.send(docs)
  });
});

//Post Request --> Body as JSON: {"title" : " ' || 'a'=='a"}
app.post('/whereInjectionUnsanitized', function (req, res) {
  let title = req.body.title
  let unsanitizedQuery = { $where: `this.title == '${title}'` }

  Document.find(unsanitizedQuery, function(erree,docs) {
    console.log(docs)
    res.send(docs)
  });
});




  