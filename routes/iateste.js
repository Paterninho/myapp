var express = require('express');
var app = express.Router();
const config = require('../config');
var _ = require('underscore');

var weka = require('../lib/weka-lib.js');

var arff = require('node-arff');



var data
    //ARFF json format (see [node-arff](https://github.com/chesles/node-arff))

//See Weka Documentation
app.post('/iaback', function(req, res) {
    console.log('aaaaaa');
    var retorno={};
    arff.load('./iaweka/datasets/teste.arff', function(err, data){ console.log('aaaaaa23'); retorno = data;});
    
    res.json({
        success: true,
        message: 'sei la.',
        data : retorno
      });
}),

module.exports = app;