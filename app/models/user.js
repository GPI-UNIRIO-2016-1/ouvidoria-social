/**
 * Created by urielbertoche on 12/17/15.
 */

var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var passportLocalMongoose = require('passport-local-mongoose');
var crypto = require('crypto');

var User = new Schema({
  name: String,
  token: String,
  username: String,
  password: String,
  email: String,
  facebookId: String,
  photo: String,
  myHash: String
}, {
  toObject: {
    virtuals: true
  },
  toJSON: {
    virtuals: true
  }
});

User.pre('save', function (next) {
  var myHash = crypto.createHmac('sha1', global.config.SECRET).update(this.email).digest('hex');
  if (this.myHash != myHash) {
    this.myHash = myHash;
  }

  next();
});

User.plugin(passportLocalMongoose);

module.exports = mongoose.model('User', User);