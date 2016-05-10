

var Category = require('../models/category')
var ObjectId = require('mongoose').Types.ObjectId;

var methods = {};

methods.register = {};

methods.register.get = function (req, res, next) {
    res.render('../views/category/form', {});
};


methods.register.post = function (req, res, next) {
    var category = new Category();

    category.name = req.body.name
    category.description = req.body.description

    category.save(function (err) {
        if (err) {
            console.log(err);
            return res.render('../views/category/form', {});
        }

        req.flash("success", "Incluido com sucesso.");
        res.redirect("/user/list");
    })

};


methods.view = function (req, res, next) {
    var categoryName = req.params.name;

    Category.findOne({ name: categoryName }, function (err, doc) {
        if (err)
            return next(err);

        res.render('../views/category/view', { viewCategory: doc });
    });
};


methods.list = function (req, res, next) {
    Category.find({}, function (err, categories) {
        if (err)
            return next(err);

        console.log(categories);

        res.render('../views/category/list', { categories: categories });
    });
};

module.exports = methods;
