/**
 * Created by urielbertoche on 5/10/2016.
 */

var Post = require('../models/post');
var Category = require('../models/category');
var marked = require("marked");
var moment = require("moment");
var ObjectId = require('mongoose').Types.ObjectId;
var _ = require("underscore");
var methods = {};

methods.add = {};

methods.add.get = function (req, res, next) {
  res.render("../views/post/form", { });
};

methods.add.post = function (req, res, next) {
  var post_data = req.body;
  if (post_data.title != "" && post_data.message != "") {
      var post = new Post();
      post.author = req.user;
      post.message = post_data.message;
      post.title = post_data.title;
      post.categories = post_data.categories;

      Category.find({
        _id: {
          $in: post.categories
        }
      }).exec(function (err, categories) {
        if (err) return next(err);

        var categories_list = [];

        for (var i = 0; i < categories.length; i++) {
          var category = {
            id: categories[i]._id,
            text: categories[i].name
          };

          categories_list.push(category);
        }

        post_data.categories = categories_list;

        //req.flash("info", "Cancelado para teste");
        //return res.render("post/form", {post: post_data});

        post.save(function (err) {
            if (err)
                return next(err);

            req.flash("success", "Post criado com sucesso!");
            res.redirect("/post/list");
        });

      });
  }
  else {
      req.flash("warning", "Titulo ou comentário não preenchido.");
      res.redirect("/post/new");
  }
};

methods.view = function (req, res, next) {
  var postId = req.params.id;

  var populateQuery = [
    {
      path: 'author'
    },
    {
      path: 'unit',
      select: 'managers'
    },
    {
      path: 'comments',
      populate: {
        path: 'author',
        model: 'User'
      }
    }
  ];

  Post.findOne({_id: postId}).populate(populateQuery).exec(function (err, doc) {
    if (err)
      return next(err);

    console.log(doc);

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

methods.ajax = {};

methods.ajax.like = function (req, res, next) {
  var postId = req.params.id;

  Post.findOne({_id: postId}).exec(function (err, doc) {
    if (err)
      return next(err);

    var index = _.findIndex(doc.likes, function(like) { return like._id == req.user.id; }); //indexOf(userId);

    if (index != -1) {
      doc.likes.splice(index, 1);
    }  else {
      doc.likes.push(req.user.id);
    }

    doc.save(function (err, post) {
      if (err)
        return next(err);

      res.json(post);
    });
  });
};

methods.ajax.report = function (req, res, next) {
  var postId = req.params.id;

  Post.findOne({_id: postId}).exec(function (err, doc) {
    if (err)
      return next(err);

    var index = _.findIndex(doc.reports, function(report) { return report._id == req.user.id; }); //indexOf(userId);
    var reason = req.body.reason;

    if (reason == undefined)
      reason = "Razão não informada.";

    if (index == -1) {
      doc.reports.push({
        _id: req.user.id,
        reason: reason
      });
    }

    doc.save(function (err, post) {
      if (err)
        return next(err);

      res.json(post);
    });
  });
};

methods.ajax.comment = function (req, res, next) {
  var postId = req.params.id;
  var isUnitManager = false;

  var populateQuery = [
    {
      path: 'unit',
      select: 'managers'
    },
    {
      path: 'comments',
      populate: {
        path: 'user',
        model: 'User',
        select: 'name'
      }
    }
  ];

  Post.findOne({_id: postId}).populate(populateQuery).exec(function (err, doc) {
    if (doc.unit != null) {
      var index = _.findIndex(doc.unit.managers, function (manager) { return manager._id == req.user.id; });
      isUnitManager = index != -1;
    }

    var comment = {
      author: req.user,
      message: req.body.message,
      isAnswer: isUnitManager
    };

    doc.comments.push(comment);

    doc.save(function (err, post) {
      if (err)
        return next(err);

      res.json(post);
    });
  });
};

module.exports = methods;