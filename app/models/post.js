/**
 * Created by urielbertoche on 5/10/2016.
 */

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var Post = new Schema({
  message: String,
  title: String,
  create_on: { type: Date, default: Date.now },
  answered_on: { type: Date, default: null },
  solved_on: { type: Date, default: null },
  author: {type: Schema.Types.ObjectId, ref: 'User'}
});

module.exports = mongoose.model('Post', Post);