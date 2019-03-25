var config = require('../config');
var MongoClient = require('mongodb').MongoClient;

var db;
var collection;

MongoClient.connect(config.MONGO_URL, (err, dataBase) => {
    if(!err){
        console.log('Connection established to MongoDB.');
        db = dataBase;
        collection = db.collection('users');
    } else {
        console.log('Not possible to established the connection to MongoDB.')
    }
});

module.exports = {

    save: (data) => {
        collection.insertOne(data)
    },

    register: (data, handler) => {
        collection.insertOne(data, (err, result) => {
            handler(err, result);
        })
    },

    findUser: (data, handler) => {
        collection.findOne(data, (err, result) => {
            handler(err, result);
        })
    },
    findAll: (handler) => {
        collection.find((err, result) => {
            handler(err, result);
        })
    }
}