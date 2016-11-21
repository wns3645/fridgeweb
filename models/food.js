var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var foodSchema = new Schema({
    label: Array,
    published_date: { type: Date, default: Date.now },
    author: String
});

module.exports = mongoose.model('food', foodSchema);
