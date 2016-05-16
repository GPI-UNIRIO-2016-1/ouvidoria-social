var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var Category = new Schema({
    name: String,
    description: String,
});

module.exports = mongoose.model('Category', Category);