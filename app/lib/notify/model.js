/**
 * Created by urielbertoche on 1/6/2016.
 */

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var User = require('./../../models/user');

var Notification = new Schema({
  message: String,
  text: String,
  data: Schema.Types.Mixed,

  user: {type: Schema.Types.ObjectId, ref: 'User'}
});

module.exports = mongoose.model('Notification', Notification);