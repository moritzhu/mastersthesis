var express = require('express');
//var serialize = require('node-serialize');
var serialize = require('serialize-javascript');

var app = express();
var secretData = "cookies"

app.get('/', function(req, res, next) {

    var serializedData = serialize({fn: function () {console.log(secretData)}, age: 24})
    var deserializedData = deserialize(serializedData)
    deserializedData[0]
    res.send("Test")
})


function deserialize(serializedJavascript){
    return eval('(' + serializedJavascript + ')');
  }
app.listen(3000);