/**
 * Created by urielbertoche on 1/6/2016.
 */
var options = require('yargs')
    .usage( "Usage: $0 <type> [email] <message> <data \"{key: value\"> ")
    .required(3, "email, message and data are required")
    .example("$0 email foo@gmail.com levelup \"{'level': '15'}\"", "Sends a message levelup to user with email foo@gmail.com containing data level: 15")
    .example("$0 all reset \"{'minutes': '15'}\"", "Sends a message reset to every logged user with reset timer")
    .epilog("Copyright 2015 bertoche.com.br")
    .argv;

var request = require('request');
var APISecret = require('../../config/ouvidoria').SECRET;

var type = options._[0];
var email = '';
var message = '';
var data = '';
var url = 'http://localhost:3000/notify/';
if (type == 'all') {
  url += 'all/';
  message = options._[1];
  data = options._[2];
} else if (type == 'email') {
  email = options._[1];
  message = options._[2];
  data = options._[3];
}

console.log(url);

request.post({
  url: url + APISecret,
  form: {
    email: email,
    message: message,
    data: data
  }
}, function (error, response, body) {
  console.log(body);
});