var express = require('express');
var app = express.Router();
var bcrypt = require('bcrypt');
const config = require('../config');
var db = require('../db');

app.post('', function(req, res) {
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