var express = require('express');
var app = express.Router();
var db = require('../db');
const config = require('../config');
var bcrypt = require('bcrypt');
var jwt = require('jsonwebtoken');


app.post('/login', function(req, res, next) {
    const { email, password } = req.body;
    if( email === undefined || password === undefined ){
        res.status(401).json({
            success: false,
            code: 'DD101_API_ERROR_01',
            message: "E-mail and/or password invalid."
        });
    } else {

      const handler = (err, result) => {
            if(!err && result !== null && bcrypt.compareSync(password, result.password)){
                let tokenData = {
                    name: result.name,
                    email: result.email
                }
                let generatedToken = jwt.sign(tokenData, config.JWT_KEY, {  expiresIn: '1m'});
                res.json({
                    success: true,
                    token: generatedToken
                });
            }else{
              res.status(401).json({
                success: false,
                code: 'DD101_API_ERROR_02',
                message: err || 'E-mail e/ou Senha é invalido.'
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
                message: 'Token é Válido.'
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
  