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
          message: 'Cadastro liberado.',
        });
      } else {
        res.json({
          usr: result,
          success: false,
          message: 'Email ja cadastrado.',
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
          message: 'Usuario não encontrado.',
        });
      } else {
        res.json({
          email: result.email,
          id: result._id,
          name: result.name,
          pw: result.password,
          status: result.status,
          perfil: result.perfil,
          success: true,
          message: 'Email cadastrado.',
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
          message: 'Ocorreu um erro inesperado. Tente novamente mais tarde.',
          error: err
        });
      }
    }
  
    db.findAll(handler);
  
  });

  app.post('/updateADM', function(req, res){

    const {id, perfil} = req.body;

    if(perfil === 'Inativo'){

      const dataToInsert = {
        status: perfil,
      };

      const handler = (err, result) => {
        if (!err) {
          res.json({
            success: true,
            message: 'Usuário alterado com sucesso.',
            data: result
          });    
     } else {
        res.json({
          success: false,
          message: 'Erro ao alterar usuário.',
          error: err
        });
      }
  }

  db.updateOne(id, dataToInsert, handler);

    }else if(perfil != 'Inativo'){

      const dataToInsert = {
        status: 'Ativo',
        perfil: perfil,
      };

      const handler = (err, result) => {
        if (!err) {
          res.json({
            success: true,
            message: 'Usuário alterado com sucesso.',
            data: result
          });    
     } else {
        res.json({
          success: false,
          message: 'Erro ao alterar usuário.',
          error: err
        });
      }
  }

  db.updateOne(id, dataToInsert, handler);

    }
  });


  app.post('/updateUser', function(req, res) {
    
    const {username, email, password, newpassword, confirmenewpw, _id } = req.body;

    if(password === undefined){
      res.json({
        success: false,
        message: 'Informe sua senha para efetuar a alteração.',
      });
      return;
    }
    
    db.findUser({email}, function(err, user) {

    var result = bcrypt.compareSync(password, user.password);
  
    if (result) {

     if(newpassword != undefined && confirmenewpw != undefined){
  
      if(newpassword.length < 8){
        res.json({
          success: false,
          message: 'Informe uma senha com pelo menos 8 digitos.',
        });
        return;
      }
  
      if(newpassword != confirmenewpw){
        res.json({
          success: false,
          message: 'Os campos da nova senha não conferem.',
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
                message: 'Usuário alterado com sucesso.',
                data: result
              });    
         } else {
            res.json({
              success: false,
              message: 'Erro ao alterar usuário.',
              error: err
            });
          }
      }
  
      db.updateOne(_id, dataToInsert, handler);

    }else{
  
      const dataToInsert = {
        name: username,
        email,
      };
    
      const handler = (err, result) => {
        if (!err) {
          res.json({
            success: true,
            message: 'Usuário alterado com sucesso.',
            data: result
          });
        } else {
          res.json({
            success: false,
            message: 'Erro ao alterar usuário.',
            error: err
          });
        }
    
      }
  
      db.updateOne(_id, dataToInsert, handler);
    }  

  }else{
    res.json({
      success: false,
      message: 'Senha atual informada é invalida.',
      error: err
    });
  }
})

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

      var perfil = "User";
      var status = "Ativo";

      const hash = bcrypt.hashSync(password, config.SALT_ROUNDS);
    
      const dataToInsert = {
        name: username,
        email,
        password: hash,
        created,
        perfil,
        status,
      };
    
      const handler = (err, result) => {
        if (!err) {
          res.json({
            success: true,
            message: 'Usuário cadastrado com sucesso.',
            data: result
          });
        } else {
          res.json({
            success: false,
            message: 'Erro ao cadastrar usuário.',
            error: err
          });
        }
    
      }

      db.register(dataToInsert, handler);
    
      }    
  });

  module.exports = app;
