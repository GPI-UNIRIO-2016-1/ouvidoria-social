/**
 * Created by urielbertoche on 1/4/16.
 */

var CronJob = require('cron').CronJob;
var math = require('../lib/math');
var config = require('../../config/ouvidoria');
var notify = require('../lib/notify/notifyByUserObject');
var async = require('async');

var connections = global.connections;

var exemploTarefa = new CronJob('0 * * * * *', function () {
  console.log("Um minuto se passou.");
}, null, true, 'America/Sao_Paulo');

module.exports = {};