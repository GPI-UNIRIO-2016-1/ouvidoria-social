/**
 * Created by urielbertoche on 1/11/16.
 */

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
var notify = function (user, message, data) {
  var socket = connections[user.myHash];

  if (socket == undefined) {
    saveNotification(user, message, data);
  } else {
    socket.emit(message, data);
  }
};

module.exports = notify;