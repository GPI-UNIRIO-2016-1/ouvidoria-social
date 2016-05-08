/**
 * Created by urielbertoche on 12/28/2015.
 */

var methods = {};

methods.round = function (num, decimalPlaces) {
  if (decimalPlaces == undefined || isNaN(parseInt(decimalPlaces)))
    decimalPlaces = 0;
  decimalPlaces = parseInt(decimalPlaces);
  return +(Math.round(num + "e+" + decimalPlaces) + "e-" + decimalPlaces);
};

methods.max = function(num, max) {
  return (num > max) ? max : num;
};

module.exports = methods;