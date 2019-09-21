var config = require('../config');
var MongoClient = require('mongodb').MongoClient;
var ObjectID = require('mongodb').ObjectID;

var db;
var collection;
var forgot;
var base;
var predict;

MongoClient.connect(config.MONGO_URL, (err, dataBase) => {
    if(!err){
        console.log('Conexão estabelecida com o banco de dados.');
        db = dataBase;
        collection = db.collection('users');
        forgot = db.collection('forgot');
        base = db.collection('sei la');
        predict = db.collection('predicted');
    } else {
        console.log('Não foi possível estabelecer conexão com o banco de dados.')
    }
});

module.exports = {

    update:(data) => {
        collection.save(data)
    },

    updateOne: (id, data, handler) => {
        collection.update({_id: ObjectID(id)}, {$set: data}, (err, result) => {
            handler(err, result);
        })
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

    findAll: (handler) => {
        collection.find((err, result) => {
            handler(err, result);
        })
    },

    AllBases: (handler) => {
        base.find((err, result) => {
            handler(err, result);
        })
    },

    BasesGem: (data, handler) => {
        console.log(data);
        base.find(data, (err, result) => {
            handler(err, result);
        })
    },
    BasesPredict: (data, handler) => {
        console.log(data);
        predict.find(data, (err, result) => {
            handler(err, result);
        })
    },
}