/**
 * Created by luisoliveiras on 5/15/2016.
 */

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var Unit = new Schema({
    name: String,
    description: String,
});

module.exports = mongoose.model('Unit', Unit);