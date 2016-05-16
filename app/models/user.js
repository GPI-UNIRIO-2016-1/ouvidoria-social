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
  // photo: String,
  // photo_thumb: String,
  myHash: String
}, {
  toObject: {
    virtuals: true
  },
  toJSON: {
    virtuals: true
  }
});

User.virtual("photo").get(function () {
  return "https://graph.facebook.com/" + this.facebookId + "/picture?type=large";
});

User.virtual("photo_small").get(function () {
  return "https://graph.facebook.com/" + this.facebookId + "/picture?type=small";
});

User.pre('save', function (next) {
  if (this.email == undefined)
    this.email = "No email defined";

  var myHash = crypto.createHmac('sha1', global.config.SECRET).update(this.email).digest('hex');
  if (this.myHash != myHash) {
    this.myHash = myHash;
  }

  next();
});

User.plugin(passportLocalMongoose);

module.exports = mongoose.model('User', User);