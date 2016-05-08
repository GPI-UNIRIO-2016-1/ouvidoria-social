/**
 * Created by urielbertoche on 12/24/2015.
 */

var passport = require('passport');
var request = require('request');
var User = require('../models/user');

var methods = {};

methods.facebook = passport.authenticate('facebook', {scope: 'email'});

methods.facebook.unlink = function(req, res, next) {
  request.del("https://graph.facebook.com/" + req.user.facebookId + "/permissions?access_token=" + req.user.token, function (error, response, body) {
    if (error) console.error(error);
    else {
      console.log(body);
      res.redirect('/logout');
    }

  });
};

methods.facebook.callback = function(req, res, next) {
  passport.authenticate('facebook', { failureRedirect: '/login' })(req, res, function() {
        // Successful authentication, redirect home.
        res.redirect('/');
      });
};

methods.register = function(req, res, next) {
  res.render('auth/register', { });
};

methods.register.post = function(req, res, next) {
  User.register(new User({ username : req.body.username }), req.body.password, function(err, user) {
    if (err) {
      return res.render("register", {info: "Sorry. That username already exists. Try again."});
    }

    passport.authenticate('local')(req, res, function () {
      res.redirect('/');
    });
  });
};

methods.login = function(req, res, next) {
  res.render('auth/login');
};

methods.login.post =  function(req, res, next) {
  passport.authenticate('local')(req, res, function() {
    res.redirect('/');
  });
};

methods.logout = function(req, res, next) {
  req.logout();
  res.redirect('/');
};

module.exports = methods;