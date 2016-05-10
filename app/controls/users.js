/**
 * Created by urielbertoche on 5/9/16.
 */

var User = require('../models/user');

var methods = {}

methods.get = {};

methods.get.list = function (req, res, next) {
    User.find({}, function (err, users) {
        if (err)
            return next(err);

        console.log(users);

        res.render('../views/user/list', {users: users});
    });
};

module.exports = methods;