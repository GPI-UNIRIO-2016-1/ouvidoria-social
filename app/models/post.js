/**
 * Created by urielbertoche on 5/10/2016.
 */

var mongoose = require('mongoose');
var prune = require("underscore.string/prune");
var Schema = mongoose.Schema;

var Post = new Schema({
  message: String,
  title: String,
  create_on: { type: Date, default: Date.now },
  answered_on: { type: Date, default: null },
  solved_on: { type: Date, default: null },
  unit: {type: Schema.Types.ObjectId, ref: 'Unit'},
  author: {type: Schema.Types.ObjectId, ref: 'User'},
  comments: [
    {
      user: {type: Schema.Types.ObjectId, ref: 'User', unique: true},
      created_on: { type: Date, default: Date.now },
      message: String,
      isAnswer: Boolean
    }
  ],
  likes: [
    {
      user: {type: Schema.Types.ObjectId, ref: 'User', unique: true}
    }
  ],
  reports: [
    {
      user: {type: Schema.Types.ObjectId, ref: 'User', unique: true},
      reason: String
    }
  ]
});

Post.virtual('prunedTitle').get(function () {
  return prune(this.title, 30);
});

module.exports = mongoose.model('Post', Post);