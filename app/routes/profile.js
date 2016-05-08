/**
 * Created by urielbertoche on 12/24/2015.
 */

var math = require("../lib/math");
var random = require("../lib/random");

var methods = {};

methods.profile = function(req, res, next) {
  res.render('profile/config');
};

module.exports = methods;