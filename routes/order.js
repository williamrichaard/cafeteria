var mongoose = require('mongoose');

var orderSchema = mongoose.Schema({
    name: String,
    contact: Number,
    email: String,
    total: Number
})

module.exports = mongoose.model('order', orderSchema);