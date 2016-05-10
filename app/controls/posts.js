/**
 * Created by urielbertoche on 5/10/2016.
 */

var Post = require('../models/post');
var marked = require("marked");
var moment = require("moment");
var ObjectId = require('mongoose').Types.ObjectId;

var methods = {};

methods.add = {};

methods.add.get = function (req, res, next) {
  res.render("../views/post/form", { });
};

methods.add.post = function (req, res, next) {
  var post_data = req.body;

  var post = new Post();
  post.author = req.user;
  post.message = post_data.message;
  post.title = post_data.title;

  post.save(function (err) {
    if (err)
      return next(err);

    req.flash("success", "Post criado com sucesso!");
    res.redirect("/post/list");
  });
};

methods.view = function (req, res, next) {
  var postId = req.params.id;

  Post.findOne({_id: postId}).populate("author").exec(function (err, doc) {
    if (err)
      return next(err);

    res.render("../views/post/view", {post: doc, md: marked, moment: moment});
  });
};

methods.list = function (req, res, next) {
  /*
   * A principio um list basico e suficiente, mas futuramente precisaremos criar as views para casos diferentes, ex:
   * mais visualizadas, mais curtidas, mais recentes, etc;
   */

  Post.find({}).populate("author").exec(function (err, docs) {
    if (err)
      return next(err);

    res.render("../views/post/list", {posts: docs, moment: moment});
  });
};

module.exports = methods;