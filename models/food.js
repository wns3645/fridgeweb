var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var foodSchema = new Schema({
    label: Array,
    logo: Array,
    text: Array,
    published_date: { type: Date, default: Date.now },
    author: String
});

module.exports = mongoose.model('food', foodSchema);
