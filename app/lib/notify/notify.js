/**
 * Created by urielbertoche on 1/10/16.
 */

var User = require('../../models/user');
var Notification = require('./model');

var connections = global.connections;

var recordableMessages = [
  'levelup'
];

var saveNotification = function (user, message, data) {
  if (recordableMessages.indexOf(message) != -1) {
    // record notification
    var notification = new Notification();
    notification.user = user._id;
    notification.message = message;
    notification.data = data;
    notification.text = data;

    notification.save();
  }
};

/**
 *
 * @param {User} user
 * @param {String} message
 * @param {Mixed} data
 */
var notify = function (destination, message, data) {

  var defaults = {
    type: 'all',
    email: ''
  };

  {
    for (var i in defaults) {
      if (typeof destination[i] == "undefined") {
        destination[i] = defaults[i];
      }
    }
  }

  if (destination.type == 'all') {
    console.log("Broadcasting");
    for (i in connections) {
      connections[i].emit(message, data);
    }
  } else if (destination.type == 'email') {
    User.findOne({email: destination.email}, function (err, user) {
      if (err || !user) console.error("Notify - User not found");
      else {
        var userHash = user.myHash;
        var socket = connections[userHash];

        if (socket == undefined) {
          saveNotification(user, message, data);
        } else {
          socket.emit(message, data);
        }
      }
    });
  }
};

module.exports = notify;