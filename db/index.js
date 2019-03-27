var config = require('../config');
var MongoClient = require('mongodb').MongoClient;

var db;
var collection;
var forgot;

MongoClient.connect(config.MONGO_URL, (err, dataBase) => {
    if(!err){
        console.log('Connection established to MongoDB.');
        db = dataBase;
        collection = db.collection('users');
        forgot = db.collection('forgot')
    } else {
        console.log('Not possible to established the connection to MongoDB.')
    }
});

module.exports = {

    save: (data) => {
        forgot.insertOne(data)
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
    find:(data, handler) => {
        forgot.findOne(data, (err, result) => {
            handler(err, result);
        })
    },
}