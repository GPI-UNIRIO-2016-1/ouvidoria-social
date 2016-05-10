/**
 * Created by urielbertoche on 5/9/16.
 */

var User = require('../models/user');
var ObjectId = require('mongoose').Types.ObjectId;

var methods = {};

methods.edit = function (req, res, next) {
    var userId = req.params.id;

    User.findOne({_id: userId}, function (err, doc) {

    });
};

methods.view = function (req, res, next) {
    // var userId = new ObjectId(req.params.id);
    var userId = req.params.id;

    // console.log(userId);
    User.findOne({_id: userId}, function (err, doc) {
        if (err)
            return next(err);

        console.log(doc);

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