var express = require('express');
var app = express.Router();
var async = require('async');
var crypto = require('crypto');
var nodemailer = require('nodemailer');
var db = require('../db');
var bcrypt = require('bcrypt');
var config = require('../config');
var date = require('date-and-time');

app.post('/forgot', function(req, res, next) {
    async.waterfall([
      function(done) {
        crypto.randomBytes(20, function(err, buf) {
          var token = buf.toString('hex');
          done(err, token);
        });
      },
      function(token, done) {
        db.findUser({ email: req.body.email }, function(err, user) {
          if(!user){
            res.status(401).json({
                success: false,
                code: 'DD101_API_ERROR_01',
                message: 'Não foi possivel localizar o e-email informado.'
            });
        } 

          user.resetPasswordToken = token;
          user.resetPasswordExpires = Date.now() + 3600000;
          user.dataResete = date.format(new Date(), 'DD/MM/YYYY HH:mm:ss');
         
          db.save(user)
          done(err, token, user);
          });
      },
      function(token, user, done) {
        var smtpTransport = nodemailer.createTransport({
          service: 'Gmail',
          auth: {
            user: 'projeto42senai@gmail.com',
            pass: '1q2w!Q@W'
          }
        });
        var mailOptions = {
          
          to: user.email,
          from: 'projeto42senai@gmail.com',
          subject: 'Não entre em pânico! ',
          text: 'Este email foi enviado porque a função "Esqueceu a senha" foi aplicada à sua conta. Para definir uma nova senha clique no link abaixo:\n\n' +
          'http://localhost:4200/#/pages/altera-senha?token=' + token + '\n\n'
        };
        smtpTransport.sendMail(mailOptions, function(err) {
          res.json({
            success: true,
            message: 'Um e-mail foi enviado para ' + user.email + ' com as instruções.'
        });

          done(err, 'done');
        });
      }
    ], function(err) {
      if (err) return next(err);
      res.redirect('http://localhost:4200/#/pages/forgot-password');
    });
  });
  
  app.get('/reset/:token', function(req, res) {
    db.find({ resetPasswordToken: req.params.token, resetPasswordExpires: { $gt: Date.now() } }, function(err, user) {
      if (!user) {
        res.status(401).json({
          success: false,
          code: 'DD101_API_ERROR_01',
          message: 'O token para resetar sua senha não é valido ou expirou.'
      });
        return res.redirect('http://localhost:4200/#/pages/forgot-password');
      }else{
      res.render('http://localhost:4200/#/app/forms', {
        user: req.user
      });
    }
    });
  });
  
  app.post('/reset/:token', function(req, res) {
    async.waterfall([
      function(done) {
        db.find({resetPasswordToken: req.params.token, resetPasswordExpires: { $gt: Date.now() } }, function(err, user) {
          if(!user){
            res.status(401).json({
                success: false,
                code: 'DD101_API_ERROR_01',
                message: 'O token para resetar sua senha não é valido ou expirou.'
            });
        }   
         
          user.password = bcrypt.hashSync(req.body.password, config.SALT_ROUNDS);
          delete user.resetPasswordToken;
          delete user.resetPasswordExpires;

          db.update(user)
            done(err, user);
            });
      },
      function(user, done) {
        var smtpTransport = nodemailer.createTransport({
          service: 'Gmail', 
          auth: {
            user: 'projeto42senai@gmail.com',
            pass: '1q2w!Q@W'
          }
        });
        var mailOptions = {
          to: user.email,
          from: 'projeto42senai@gmail.com',
          subject: 'Sua senha foi alterada',
          text: 'Ola,\n\n' +
            'Esta é a confirmação que a senha do seu usuário ' + user.email + ' foi alterada.\n'
        };
        smtpTransport.sendMail(mailOptions, function(err) {
          res.json({
            success: true,
            message: 'Sua senha foi alterada.'
        });
          done(err);
        });
      }
    ], function(err) {
      res.redirect('/');
    });
  })

  module.exports = app;