/**
 * Created by urielbertoche on 12/28/2015.
 */

var methods = {};

methods.randomInt = function(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

methods.random = function () {
  return Math.random();
};

methods.randomArbitrary = function(min, max) {
  return Math.random() * (max - min) + min;
};

module.exports = methods;