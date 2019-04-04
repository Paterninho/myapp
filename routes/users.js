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
          name: result.name,
          email: result.email,
          nickname: result.nickname,
          success: true,
          message: 'Email Cadastrado.',
        });
      }
    }

    db.findUser({email}, handler);
  
  });


app.post('/signup', function(req, res) {

  const { username, email, password, nickname, confirmepw } = req.body;
  
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
      nickname
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

app.put('/edit/(:id)', function(req, res, next) {
  req.assert('name', 'Nome é obrigatório').notEmpty()
  req.assert('age', 'Idade é obrigatório').notEmpty()
  req.assert('email', 'Um email valido é obrigatório').isEmail()

  var errors = req.validationErrors()
  
  if( !errors ) {  

      var user = {
          name: req.sanitize('name').escape().trim(),
          age: req.sanitize('age').escape().trim(),
          email: req.sanitize('email').escape().trim()
      }
      
      var o_id = new ObjectId(req.params.id)
      req.db.collection('users').update({"_id": o_id}, user, function(err, result) {
          if (err) {
              req.flash('error', err)
              res.render('user/edit', {
                  title: 'Edit User',
                  id: req.params.id,
                  name: req.body.name,
                  age: req.body.age,
                  email: req.body.email
              })
          } else {
              req.flash('success', 'Dados atualizados com Sucessos!')
              
              res.redirect('/users')
          }
      })

  }else{

      var error_msg = ''
      errors.forEach(function(error) {
          error_msg += error.msg + '<br>'
      })
      req.flash('error', error_msg)

      res.render('user/edit', { 
          title: 'Edit User',            
          id: req.params.id, 
          name: req.body.name,
          age: req.body.age,
          email: req.body.email
      })
  }
});

app.delete('/delete/(:id)', function(req, res, next) {    
  var o_id = new ObjectId(req.params.id)
  req.db.collection('users').remove({"_id": o_id}, function(err, result) {
      if (err) {
          req.flash('error', err)
          res.redirect('/users')
      } else {
          req.flash('success', 'Usuário Deletado com Sucesso!')
          res.redirect('/users')
      }
  })    
})

module.exports = app;
