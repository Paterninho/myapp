var express = require('express');
var path = require('path');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var session = require('express-session');
//var favicon = require('serve-favicon');
var mongoose = require('mongoose');
var nodemailer = require('nodemailer');
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var bcrypt = require('bcrypt-nodejs');
var async = require('async');
var crypto = require('crypto');
var flash = require('express-flash');

passport.use(new LocalStrategy(function(username, password, done) {
  User.findOne({ username: username }, function(err, user) {
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

var userSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  resetPasswordToken: String,
  resetPasswordExpires: Date
});

userSchema.pre('save', function(next) {
  var user = this;
  var SALT_FACTOR = 5;

  if (!user.isModified('password')) return next();

  bcrypt.genSalt(SALT_FACTOR, function(err, salt) {
    if (err) return next(err);

    bcrypt.hash(user.password, salt, null, function(err, hash) {
      if (err) return next(err);
      user.password = hash;
      next();
    });
  });
});

userSchema.methods.comparePassword = function(candidatePassword, cb) {
  bcrypt.compare(candidatePassword, this.password, function(err, isMatch) {
    if (err) return cb(err);
    cb(null, isMatch);
  });
};

var User = mongoose.model('User', userSchema);

mongoose.connect('mongodb://localhost:27017/projeto42_');

var app = express();

// Middleware
app.set('port', process.env.PORT || 3000);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');
//app.use(favicon());
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded());
app.use(cookieParser());
app.use(session({ secret: 'session secret key' }));
app.use(passport.initialize());
app.use(passport.session());
app.use(express.static(path.join(__dirname, 'public')));
app.use(flash());

// Routes
app.get('/', function(req, res) {
  res.render('index', { title: 'Projeto 42_' });
});

app.listen(app.get('port'), function() {
  console.log('Express server listening on port ' + app.get('port'));
});

app.get('/', function(req, res){
  res.render('index', {
    title: 'Projeto 42_',
    user: req.user
  });
});

app.get('/login', function(req, res) {
  res.render('login', {
    user: req.user
  });
});

app.post('/login', function(req, res, next) {
  passport.authenticate('local', function(err, user, info) {
    if (err) return next(err)
    if (!user) {
      return res.redirect('/login')
    }
    req.logIn(user, function(err) {
      if (err) return next(err);
      return res.redirect('/layout');
    });
  })(req, res, next);
});

app.get('/layout', function(req, res) {
  res.render('layout', {
    user: req.user
  });
});

app.get('/signup', function(req, res) {
  res.render('signup', {
    user: req.user
  });
});

app.post('/signup', function(req, res) {
  var user = new User({
      username: req.body.username,
      email: req.body.email,
      password: req.body.password
    });

  user.save(function(err) {
    req.logIn(user, function(err) {
      res.redirect('/');
    });
  });
});

app.get('/logout', function(req, res){
  req.logout();
  res.redirect('/');
});

app.get('/forgot', function(req, res) {
  res.render('forgot', {
    user: req.user
  });
});

app.post('/forgot', function(req, res, next) {
  async.waterfall([
    function(done) {
      crypto.randomBytes(20, function(err, buf) {
        var token = buf.toString('hex');
        done(err, token);
      });
    },
    function(token, done) {
      User.findOne({ email: req.body.email }, function(err, user) {
        if (!user) {
          req.flash('error', 'Não foi possivel localizar o e-email informado.');
          return res.redirect('/forgot');
        }

        user.resetPasswordToken = token;
        user.resetPasswordExpires = Date.now() + 3600000; // 1 hour

        user.save(function(err) {
          done(err, token, user);
        });
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
          'http://' + req.headers.host + '/reset/' + token + '\n\n'
      };
      smtpTransport.sendMail(mailOptions, function(err) {
        req.flash('info', 'Um e-mail foi enviado para ' + user.email + ' com as instruções.');
        done(err, 'done');
      });
    }
  ], function(err) {
    if (err) return next(err);
    res.redirect('/forgot');
  });
});

app.get('/reset/:token', function(req, res) {
  User.findOne({ resetPasswordToken: req.params.token, resetPasswordExpires: { $gt: Date.now() } }, function(err, user) {
    if (!user) {
      req.flash('error', 'O token para resetar sua senha não é valido ou expirou.');
      return res.redirect('/forgot');
    }
    res.render('reset', {
      user: req.user
    });
  });
});

app.post('/reset/:token', function(req, res) {
  async.waterfall([
    function(done) {
      User.findOne({ resetPasswordToken: req.params.token, resetPasswordExpires: { $gt: Date.now() } }, function(err, user) {
        if (!user) {
          req.flash('error', 'O token para resetar sua senha não é valido ou expirou.');
          return res.redirect('back');
        }

        user.password = req.body.password;
        user.resetPasswordToken = undefined;
        user.resetPasswordExpires = undefined;
        console.log(user);

        user.save(function(err) {
          req.logIn(user, function(err) {
            done(err, user);
          });
        });
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
});

// EDIT USER POST ACTION
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
              
              // render to views/user/edit.ejs
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
  }
  else {
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

// DELETE USER
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
});
