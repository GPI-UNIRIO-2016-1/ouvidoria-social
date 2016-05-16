/**
 * Created by luisoliveiras on 5/15/2016.
 */

var Category = require('../models/unit')
var ObjectId = require('mongoose').Types.ObjectId;

var methods = {};

methods.register = {};

methods.register.get = function (req, res, next) {
    res.render('../views/unit/form', {});
};


methods.register.post = function (req, res, next) {
    var unit = new Unit();

    unit.name = req.body.name
    unit.description = req.body.description

    unit.save(function (err) {
        if (err) {
            console.log(err);
            return res.render('../views/unit/form', {});
        }

        req.flash("success", "Incluido com sucesso.");
        res.redirect("/unit/list");
    })

};


methods.view = function (req, res, next) {
    var unitName = req.params.name;

    Unit.findOne({ name: unitName }, function (err, doc) {
        if (err)
            return next(err);

        res.render('../views/unit/view', { viewUnit: doc });
    });
};


methods.list = function (req, res, next) {
    Unit.find({}, function (err, units) {
        if (err)
            return next(err);

        console.log(units);

        res.render('../views/unit/list', { unit: units });
    });
};

module.exports = methods;