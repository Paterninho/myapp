var express = require('express');
var app = express.Router();
var bcrypt = require('bcrypt');
const config = require('../config');
var db = require('../db');
var date = require('date-and-time');

/* GET home page. */
app.post('/bases', (req, res, next) => {
  const handler = (err, result) => {
    if (!err && result != null) {
      result.toArray((err, users) => {
        if(!err){
          res.json({
            success: true,
            data: users
          });
        }
      })
    } else {
      res.json({
        success: false,
        message: 'Ocorreu um erro inesperado. Tente novamente mais tarde.',
        error: err
      });
    }
  }

  db.AllBases(handler);

});


module.exports = app;
