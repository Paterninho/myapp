var express = require('express');
var app = express.Router();
var bcrypt = require('bcrypt');
const config = require('../config');
var db = require('../db');

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
          success: true,
          message: 'Email Cadastrado.',
        });
      }
      
    }

    db.findUser({email}, handler);
  
  });

  app.post('/updateUser', function(req, res) {

  const {username, email, password, newpassword, confirmenewpw, _id } = req.body;
  
  if(newpassword != undefined){
  
  var newPW = bcrypt.hashSync(newpassword, config.SALT_ROUNDS);
 
   if(newpassword.length < 8){
    res.json({
      success: false,
      message: 'Informe uma senha com Pelo Menos 8 Digitos.',
    });

    }else if(newPW != password){
      res.json({
        success: false,
        message: 'Senha Atual Invalida.',
      });  

    }else if(newpassword != confirmenewpw){
        res.json({
          success: false,
          message: 'Os campos da nova senha não conferem.',
        }); 

    }else{ 

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
      console.log("nop"); 
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

    const hash = bcrypt.hashSync(password, config.SALT_ROUNDS);
  
    const dataToInsert = {
      name: username,
      email,
      password: hash,
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
