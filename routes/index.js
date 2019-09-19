var express = require('express');
var app = express.Router();
var bcrypt = require('bcrypt');
const config = require('../config');
var db = require('../db');
var date = require('date-and-time');

const seasons = {
  Jan: 1,
  Fev: 2,
  Mar: 3,
  Abr: 4,
  Mai: 5,
  Jun: 6,
  Jul: 7,
  Ago: 8,
  Set: 9,
  Out: 10,
  Nov: 11,
  Dez: 12,
  sort: (inputArr) => {
  let len = inputArr.length;
  let swapped;
  do {
  swapped = false;
  for (let i = 0; i < (len - 1); i++) {
  if (seasons[inputArr[i].mes] > seasons[inputArr[i + 1].mes]) {
  let tmp = inputArr[i];
  inputArr[i] = inputArr[i + 1];
  inputArr[i + 1] = tmp;
  swapped = true;
  }
  }
  } while (swapped);
  return inputArr;
  }
  }

/* GET home page. */
app.post('/bases', (req, res, next) => {
  const {ano, faixaEtaria, regio}  = req.body;
 
  const dataToInsert = {
    ano,
    faixaEtaria,
    regio
  };

  const handler = (err, result) => {
    if (!err && result != null) {
      result.toArray((err, users) => {
        if(!err){
         
          res.json({
            success: true,
            data: seasons.sort(users)
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

  db.BasesGem(dataToInsert ,handler);

});


module.exports = app;
