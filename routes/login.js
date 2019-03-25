var express = require('express');
var app = express.Router();
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var db = require('../db');
const config = require('../config');
var bcrypt = require('bcrypt');

var jwt = require('jsonwebtoken');

var user = {};

passport.use(new LocalStrategy(function(user, done) {
  User.findOne({ email: email }, function(err, user) {
    if (err) return done(err);
    if (!user) return done(null, false, { message: 'Incorrect username.' });
    user.comparePassword(password, function(err, isMatch) {
      if (isMatch) {
        return done(null, user);
      } else {
        return done(null, false, { message: 'Incorrect password.' });
      }
    });
  });
}));

passport.serializeUser(function(user, done) {
  done(null, user.id);
});

passport.deserializeUser(function(id, done) {
  User.findById(id, function(err, user) {
    done(err, user);
  });
});

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
            } else {
                res.status(401).json({
                    success: false,
                    code: 'DD101_API_ERROR_02',
                    message: err || 'User does not exists.'
                });
            }
        }
        
       db.findUser({email}, handler);

    }
  });

  app.get('/verifytoken', (req, res, next) => {
    //[0] = Bearer ----  [1] = token
    let token = req.headers['authorization'].split(' ')[1];
    jwt.verify(token, config.JWT_KEY, (err, decode) => {
        if(!err){
            res.json({
                success: true,
                message: 'Token is valid.'
            });
        } else {
            res.status(401).json({
                success: false,
                error: err
            });
        }
    })
})

  module.exports = app;
  