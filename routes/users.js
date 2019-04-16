var express = require('express');
var app = express.Router();
var bcrypt = require('bcrypt');
const config = require('../config');
var db = require('../db');
var date = require('date-and-time');

 app.post('/findUser', function(req, res) {
    const {email} = req.body;
  
    const handler = (err, result) => {
      if (!result) {
        res.json({
          success: true,
          message: 'Cadastro Liberado.',
        });
      } else {
        res.json({
          usr: result,
          success: false,
          message: 'Email Ja Cadastrado.',
        });
      }
    }

    db.findUser({email}, handler);
  
  });

  app.post('/findEmail', function(req, res) {
    const {email} = req.body;
    const handler = (err, result) => {
      if (!result) {
        res.json({
          success: false,
          message: 'Usuario não Encontrado.',
        });
      } else {
        res.json({
          email: result.email,
          id: result._id,
          name: result.name,
          pw: result.password,
          status: result.status,
          success: true,
          message: 'Email Cadastrado.',
        });
      }
      
    }

    db.findUser({email}, handler);
  
  });

  app.post('/listusers', (req, res, next) => {
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
          message: 'An error happened.',
          error: err
        });
      }
    }
  
    db.findAll(handler);
  
  });

  app.post('/updateUser', function(req, res) {
    
  const {username, email, password, newpassword, confirmenewpw, _id } = req.body;

  if(password != undefined && newpassword != undefined && confirmenewpw != undefined){

  db.findUser({email}, function(err, user) {
  var result = bcrypt.compareSync(password, user.password);

  if (result) {

    if(newpassword.length < 8){
      res.json({
        success: false,
        message: 'Informe uma senha com Pelo Menos 8 Digitos.',
      });
      return;
    }

    if(newpassword != confirmenewpw){
      res.json({
        success: false,
        message: 'Os Campos da Nova Senha não Conferem.',
      }); 
      return;
    }

    const hash = bcrypt.hashSync(newpassword, config.SALT_ROUNDS);
      
        const dataToInsert = {
          name: username,
          email,
          password: hash,
        };

        const handler = (err, result) => {
          if (!err) {
            res.json({
              success: true,
              message: 'Usuário Alterado com Sucesso.',
              data: result
            });    
       } else {
          res.json({
            success: false,
            message: 'Erro ao Alterar Usuário.',
            error: err
          });
        }
    }

    db.updateOne(_id, dataToInsert, handler);
    
  }else{
    res.json({
      success: false,
      message: 'Senha Atual Informada é Invalida.',
      error: err
    });
  }
})
    }else{

      const dataToInsert = {
        name: username,
        email,
      };
    
      const handler = (err, result) => {
        if (!err) {
          res.json({
            success: true,
            message: 'Usuário Alterado com sucesso.',
            data: result
          });
        } else {
          res.json({
            success: false,
            message: 'Erro ao Alterar Usuário.',
            error: err
          });
        }
    
      }
  
      db.updateOne(_id, dataToInsert, handler);
    }  
});


app.post('/signup', function(req, res) {

  const { username, email, password, confirmepw } = req.body;
  
  if(password.length < 8){
      res.json({
        success: false,
        message: 'Informe uma senha com no minimo 8 caracteres.',
      });  
      
    }else if(password != confirmepw){
      res.json({
        success: false,
        message: 'Os campos de senha não conferem.',
      });  

    }else{

    var created = date.format(new Date(), 'DD/MM/YYYY');   

    var status = "User";

    const hash = bcrypt.hashSync(password, config.SALT_ROUNDS);
  
    const dataToInsert = {
      name: username,
      email,
      password: hash,
      created,
      status,
    };
  
    const handler = (err, result) => {
      if (!err) {
        res.json({
          success: true,
          message: 'Usuário Cadastrado com sucesso.',
          data: result
        });
      } else {
        res.json({
          success: false,
          message: 'Erro ao Cadastrar Usuário.',
          error: err
        });
      }
  
    }

    db.register(dataToInsert, handler);
  
    }    
});

module.exports = app;
