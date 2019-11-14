var express = require('express');
var app = express.Router();
var bcrypt = require('bcrypt');
const config = require('../config');
var db = require('../db');
var date = require('date-and-time');

const seasons = {
  Jan: 1, Fev: 2, Mar: 3, Abr: 4, Mai: 5, Jun: 6, Jul: 7, Ago: 8, Set: 9, Out: 10, Nov: 11, Dez: 12,
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
    }
    while (swapped);
    return inputArr;
  }
}

app.post('/line', (req, res, next) => {
  var mes = undefined;
  var mesesArr = Object.keys(seasons).filter(mes => {
    return typeof seasons[mes] != "function"
  });

  const { ano, faixaEtaria, regio, paraPredicao } = req.body;

  const dataToInsert = {
    ano,
    faixaEtaria,
    regio
  };
  if (paraPredicao) {
    mes = {
      "$in": mesesArr.slice(mesesArr.indexOf(req.body.mes))
    }
    dataToInsert["mes"] = mes
  }


  const handler = (err, result) => {
    if (!err && result != null) {
      result.toArray((err, users) => {
        if (!err) {
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

  db.BasesGem(dataToInsert, handler);

});

app.post('/linePredict', (req, res, next) => {
  const { faixaEtaria, regio, genero } = req.body;

  if (genero == 'Todos') {
    const dataToInsert = {
      faixaEtaria,
      regio
    };

    const handler = (err, result) => {
      if (!err && result != null) {
        result.toArray((err, users) => {
          if (!err) {
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

    db.BasesPredict(dataToInsert, handler);

  } else {

    const dataToInsert = {
      faixaEtaria,
      regio,
      genero
    };

    const handler = (err, result) => {
      if (!err && result != null) {
        result.toArray((err, users) => {
          if (!err) {
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

    db.BasesPredict(dataToInsert, handler);

  }

});

app.post('/pie', (req, res, next) => {
  const { genero, mes, faixaEtaria, ano } = req.body;

  if (genero == 'Todos') {

    const dataToInsert = {
      mes,
      faixaEtaria,
      ano
    };

    const handler = (err, result) => {
      if (!err && result != null) {
        result.toArray((err, users) => {
          if (!err) {

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

    db.BasesGem(dataToInsert, handler);

  } else {

    const dataToInsert = {
      genero,
      mes,
      faixaEtaria,
      ano
    };

    const handler = (err, result) => {
      if (!err && result != null) {
        result.toArray((err, users) => {
          if (!err) {

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

    db.BasesGem(dataToInsert, handler);

  }

});

app.post('/column', (req, res, next) => {
  var mes = undefined;
  var mesesArr = Object.keys(seasons).filter(mes => {
    return typeof seasons[mes] != "function"
  });

  const { faixaEtaria, ano, genero, paraPredicao } = req.body;

  if (genero == 'Todos') {
    var dataToInsert = {
      faixaEtaria,
      ano,
    }

  } else {

    var dataToInsert = {
      faixaEtaria,
      ano,
      genero
    };

  }

  if (paraPredicao) {
    mes = {
      "$in": mesesArr.slice(mesesArr.indexOf(req.body.mes))
    }
    dataToInsert["mes"] = mes
  }


  const handler = (err, result) => {
    if (!err && result != null) {
      result.toArray((err, users) => {
        if (!err) {

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

  db.BasesGem(dataToInsert, handler);

});


app.post('/columnPredict', (req, res, next) => {
  const { faixaEtaria, genero } = req.body;


  if (genero == 'Todos') {
    const dataToInsert = {
      faixaEtaria,
    };

    const handler = (err, result) => {
      if (!err && result != null) {
        result.toArray((err, users) => {
          if (!err) {

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

    db.BasesPredict(dataToInsert, handler);

  } else {

    const dataToInsert = {
      faixaEtaria,
      genero
    };

    const handler = (err, result) => {
      if (!err && result != null) {
        result.toArray((err, users) => {
          if (!err) {

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

    db.BasesPredict(dataToInsert, handler);

  }

});


app.post('/area', (req, res, next) => {
  const { faixaEtaria, ano, genero } = req.body;


  if (genero != 'Todos') {

    const dataToInsert = {
      faixaEtaria,
      ano,
      genero
    };

    const handler = (err, result) => {
      if (!err && result != null) {
        result.toArray((err, users) => {
          if (!err) {

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

    db.BasesGem(dataToInsert, handler);

  } else {
    const dataToInsert = {
      faixaEtaria,
      ano
    };

    const handler = (err, result) => {
      if (!err && result != null) {
        result.toArray((err, users) => {
          if (!err) {

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

    db.BasesGem(dataToInsert, handler);

  }

});

module.exports = app;
