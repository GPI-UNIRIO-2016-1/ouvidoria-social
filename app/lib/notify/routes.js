/**
 * Created by urielbertoche on 1/6/2016.
 */

var notify = require('./notify');

var validKeys = [
    global.config.SECRET
];

var notifyAll = function (req, res, next) {
  var apiKey = req.params.apikey;
  if (validKeys.indexOf(apiKey) == -1) {
    return next(new Error("Invalid API Key"));
  }

  var message = req.body.message;
  var data = req.body.data;

  notify({ type: 'all' }, message, data);
  res.json({status: 'ok'});
};

var notifyOne = function (req, res, next) {
  var apiKey = req.params.apikey;
  if (validKeys.indexOf(apiKey) == -1) {
    return next(new Error("Invalid API Key"));
  }

  var email = req.body.email;
  var message = req.body.message;
  var data = req.body.data;

  notify({
    type: 'email',
    email: email,
  }, message, data);
  res.json({status: 'ok'});
};

module.exports = {
  notify: notifyOne,
  notifyAll: notifyAll
};