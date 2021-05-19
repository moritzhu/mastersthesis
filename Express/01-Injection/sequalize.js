var express = require('express');
const { Sequelize, DataTypes } = require('sequelize');


var app = express();

const sequelize = new Sequelize('newchema', "root", "password", {dialect:"mysql", host:"localhost"}) // Example for sqlite

sequelize.authenticate()

const User = sequelize.define('User', {
    name: {
        type: DataTypes.STRING
    },
    nachname: {
        type: DataTypes.STRING
    }
}, {  freezeTableName: true, timestamps: false, createdAt: false,
})


app.get('/normal', function(req, res, next) {
    User.findAll({where: {name: "' OR 1=1 --"}}).then(result => {
        res.send(result)
    })    
})

app.get('/raw', function(req, res, next) {
    let input = "' OR 1=1"
    sequelize.query("SELECT * FROM user WHERE name='" + input).then(result => {
        res.send(result)
    })
})

app.get('/rawSecure', function(req, res, next) {
    let input = "' OR 1=1"
    sequelize.query("SELECT * FROM user WHERE name= $1",{bind: [input]}).then(result => {
        res.send(result)
    })
})
app.listen(3000);