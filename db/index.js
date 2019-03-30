var config = require('../config');
var MongoClient = require('mongodb').MongoClient;

var db;
var collection;
var forgot;

MongoClient.connect(config.MONGO_URL, (err, dataBase) => {
    if(!err){
        console.log('Conexão estabelecida com o banco de dados.');
        db = dataBase;
        collection = db.collection('users');
        forgot = db.collection('forgot')
    } else {
        console.log('Não foi possível estabelecer conexão com o banco de dados.')
    }
});

module.exports = {

    update:(data) => {
        collection.save(data)
    },

    save: (data) => {
        forgot.save(data)
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

    findOne: (data) => {
        collection.findOne(data)
    },

    find:(data, handler) => {
        forgot.findOne(data, (err, result) => {
            handler(err, result);
        })
    },
}