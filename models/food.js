var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var foodSchema = new Schema({
    label: Array,
    logo: Array,
    //text: Array,
    position: { type: Number, default: -1},
    date: { type: Date, default: Date.now },
    file_name: String,
    user: { type: String, default: "Junhui" }
});

module.exports = mongoose.model('food', foodSchema);
