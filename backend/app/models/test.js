const mongoose = require('mongoose');

var Schema = mongoose.Schema;
var model1 = new Schema({
    test: String,
});
module.exports = mongoose.model('test', model1);