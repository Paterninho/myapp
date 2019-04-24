var express = require('express');
var app = express.Router();
var db = require('../db');
const config = require('../config');
var bcrypt = require('bcrypt');
var jwt = require('jsonwebtoken');


app.post('/login', function(req, res, next) {
    const { email, password } = req.body;
    if( email === undefined || password === undefined ){
        res.json({
            success: false,
            message: "E-mail e/ou senha é invalido."
        });
    } else {

      const handler = (err, result) => {
            if(!err && result !== null && bcrypt.compareSync(password, result.password)){
                let tokenData = {
                    name: result.name,
                    email: result.email,
                }
                let generatedToken = jwt.sign(tokenData, config.JWT_KEY, {  expiresIn: '1m'});
                res.json({
                    success: true,
                    token: generatedToken,
                    email: result.email,
                    status: result.status,
                });
            }else{
              res.json({
                success: false,
                message: 'E-mail e/ou senha é invalido.'

            })
          }
        }
        
       db.findUser({email}, handler);
    }
  });

  app.post('/verifytoken', (req, res) => {
    const { token } = req.body
    jwt.verify(token, config.JWT_KEY, (err) => {
        if(!err){
            res.json({
                success: true,
                message: 'Token é válido.'
            });
        } else {
            res.json({
                success: false,
                error: err,
                message: 'Usuário não esta logado no sistema.'
            });
        }
    })
})

  module.exports = app;
  