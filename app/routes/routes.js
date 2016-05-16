var express = require('express');

var authRoutes = require('./auth');
var notifyRoutes = require('../lib/notify/routes');
var profileRoutes = require('./profile');
var ensureAuthenticated = require('../middlewares/ensureAuthenticated');
var userRoutes = require("../controls/users");
var postRoutes = require("../controls/posts");
var unitRoutes = require("../controls/unit");
var categoryRoutes = require("../controls/category");

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
router.all('/user/*', ensureAuthenticated);
router.get('/profile/config', profileRoutes.profile);
router.get('/user/view/:id/', userRoutes.view);
router.get('/user/list', userRoutes.list);
router.get('/user/new', userRoutes.register.get);
router.post('/user/new', userRoutes.register.post);

// Posts routes
router.get('/post/view/:id', postRoutes.view);
router.get('/post/list', postRoutes.list);
router.all("/post/new", ensureAuthenticated);
router.get("/post/new", postRoutes.add.get);
router.post("/post/new", postRoutes.add.post);

// Unit routes
router.get('/unit/view/:id', unitRoutes.view);
router.get('/unit/list', unitRoutes.list);
router.all("/unit/new", ensureAuthenticated);
router.get("/unit/new", unitRoutes.register.get);
router.post("/unit/new", unitRoutes.register.post);

// Category routes
router.get('/category/view/:id', categoryRoutes.view);
router.get('/category/list', categoryRoutes.list);
router.all("/category/new", ensureAuthenticated);
router.get("/category/new", categoryRoutes.register.get);
router.post("/category/new", categoryRoutes.register.post);

// Notifier routes
router.post('/notify/:apikey', notifyRoutes.notify);
router.post('/notify/all/:apikey', notifyRoutes.notifyAll);

module.exports = router;