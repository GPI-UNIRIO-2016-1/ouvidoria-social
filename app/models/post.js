/**
 * Created by urielbertoche on 5/10/2016.
 */

var mongoose = require('mongoose');
var prune = require("underscore.string/prune");
var Schema = mongoose.Schema;
var _ = require("underscore");

var commentSchema = new Schema({
  author: {type: Schema.Types.ObjectId, ref: 'User'},
  message: String,
  created_on: { type: Date, default: new Date()},
  inAnswer: Boolean
});

//var likeSchema = new Schema({
//  user: {type: Schema}
//})

var Post = new Schema({
  message: String,
  title: String,
  created_on: { type: Date, default: new Date() },
  answered_on: { type: Date, default: null },
  solved_on: { type: Date, default: null },
  unit: {type: Schema.Types.ObjectId, ref: 'Unit'},
  author: {type: Schema.Types.ObjectId, ref: 'User'},
  comments: [commentSchema],
  likes: [
    {
      user: {type: Schema.Types.ObjectId, ref: 'User'}
    }
  ],
  reports: [
    {
      user: {type: Schema.Types.ObjectId, ref: 'User'},
      reason: String
    }
  ]
});

Post.methods.liked = function (user) {
  if (user != undefined && user._id != undefined) {
    var index = _.findIndex(this.likes, function (like) {
      return like._id == user.id;
    });

    if (index != -1)
      return true;
  }

  return false;
};

Post.virtual('prunedTitle').get(function () {
  return prune(this.title, 30);
});

Post.virtual('displayClass').get(function () {
  if (this.likes.length >= 10)
    return "panel-danger";

  if (this.likes.length >= 1)
    return "panel-warning";

  return "panel-primary";
});

module.exports = mongoose.model('Post', Post);