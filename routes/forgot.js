var express = require('express');
var app = express.Router();
var async = require('async');
var crypto = require('crypto');
var mongoose = require('mongoose');
var nodemailer = require('nodemailer');

var db = require('../db');
const config = require('../config');
var bcrypt = require('bcrypt');

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
          if (!user) {
            req.flash('error', 'Não foi possivel localizar o e-email informado.');
            return res.redirect('http://localhost:4200/#/pages/forgot-password');
          }
          user.resetPasswordToken = token;
          user.resetPasswordExpires = Date.now() + 3600000; // 1 hour
         
          db.save(user)
          console.log(user);
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
          'http://localhost:4200/#/app/forms?token=' + token + '\n\n'
        };
        smtpTransport.sendMail(mailOptions, function(err) {
          req.flash('info', 'Um e-mail foi enviado para ' + user.email + ' com as instruções.');
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
        req.flash('error', 'O token para resetar sua senha não é valido ou expirou.');
        return res.redirect('http://localhost:4200/#/pages/forgot-password');
      }
      res.render('http://localhost:4200/#/app/forms', {
        user: req.user
      });
    });
  });
  
  app.post('/reset/:token', function(req, res) {
    async.waterfall([
      function(done) {
        db.find({resetPasswordToken: req.params.token, resetPasswordExpires: { $gt: Date.now() } }, function(err, user) {
          if (!user) {
            console.log('error', 'O token para resetar sua senha não é valido ou expirou.');
            req.flash('error', 'O token para resetar sua senha não é valido ou expirou.');
            return res.redirect('back');
          }

          user.password = bcrypt.hashSync(req.body.password, config.SALT_ROUNDS);
          user.resetPasswordToken = undefined;
          user.resetPasswordExpires = undefined;
          console.log(user);

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
          from: 'passwordreset@demo.com',
          subject: 'Sua senha foi alterada',
          text: 'Ola,\n\n' +
            'Esta é a confirmação que a senha do seu usuário ' + user.email + ' foi alterada.\n'
        };
        smtpTransport.sendMail(mailOptions, function(err) {
          req.flash('success', 'Sucesso! Sua senha foi alterada.');
          done(err);
        });
      }
    ], function(err) {
      res.redirect('/');
    });
  })

  module.exports = app;