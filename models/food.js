var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var foodSchema = new Schema({
    label: Array,
    logo: Array,
    text: Array,
    date: { type: Date, default: Date.now },
    author: { type: String, default: "Junhui" }
});

module.exports = mongoose.model('food', foodSchema);
