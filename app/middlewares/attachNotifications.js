/**
 * Created by urielbertoche on 1/7/2016.
 */

var mongoose = require('mongoose');

var Notification = require('../lib/notify/model');

function attachNotifications(req,res,next) {
  if (req.user) {
    Notification.find({user: req.user._id}, function (err, docs) {
      if (err) next();
      res.locals.notifications = docs;
      next();
    });
  } else {
    res.locals.notifications = [];
    next();
  }
}

module.exports = attachNotifications;