var express = require('express');

var authRoutes = require('./auth');
var notifyRoutes = require('../lib/notify/routes');
var profileRoutes = require('./profile');
var ensureAuthenticated = require('../middlewares/ensureAuthenticated');
var userRoutes = require("../controls/users");

var router = express.Router();

router.get('/', function (req, res) {
  res.render('index');
});

// Auth routes
router.get('/auth/facebook', authRoutes.facebook);
router.get('/auth/facebook/unlink', authRoutes.facebook.unlink);
router.get('/auth/facebook/callback', authRoutes.facebook.callback);
router.get('/auth/register', authRoutes.register);
router.get('/auth/login', authRoutes.login);
router.get('/auth/logout', authRoutes.logout);
router.post('/auth/register', authRoutes.register.post);
router.post('/auth/login', authRoutes.login.post);

// User routes
router.all('/profile/*', ensureAuthenticated);
router.get('/profile/config', profileRoutes.profile);
router.get('/user/view/:id/', userRoutes.view);
router.get('/user/list', userRoutes.list);
router.get('/user/new', userRoutes.register.get);
router.post('/user/new', userRoutes.register.post);

// Notifier routes
router.post('/notify/:apikey', notifyRoutes.notify);
router.post('/notify/all/:apikey', notifyRoutes.notifyAll);

module.exports = router;