/**
 * Created by urielbertoche on 5/9/16.
 */

var User = require('../models/user');
var ObjectId = require('mongoose').Types.ObjectId;

var methods = {};

methods.register = {};

methods.register.get = function (req, res, next) {
    res.render('../views/user/form', { });
};

methods.register.post = function (req, res, next) {
    var post_data = req.body;

    var user = {
        name: post_data.name,
        username: post_data.email,
        email: post_data.email
    };

    var password = post_data.password;

    User.register(new User(user), password, function (err, user) {
        if (err) {
            console.log(err);
            return res.render('../views/user/form', {account: user});
        }

        req.flash("success", "Incluido com sucesso.");
        res.redirect("/user/list");
    });
};

methods.view = function (req, res, next) {
    var userId = req.params.id;

    User.findOne({_id: userId}, function (err, doc) {
        if (err)
            return next(err);

        res.render('../views/user/view', {viewUser: doc});
    });
};

methods.list = function (req, res, next) {
    User.find({}, function (err, users) {
        if (err)
            return next(err);

        console.log(users);

        res.render('../views/user/list', {users: users});
    });
};

module.exports = methods;