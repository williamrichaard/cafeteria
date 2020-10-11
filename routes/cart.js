var mongoose = require('mongoose');

// mongoose.connect('mongodb://localhost/cart');
mongoose.connect('mongodb://localhost:27017/cafeteria', { useNewUrlParser: true , useUnifiedTopology: true});

var cartSchema = mongoose.Schema({
  prdc: Number
})

module.exports = mongoose.model('cart', cartSchema);