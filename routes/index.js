const express = require('express');
const router = express.Router();

const products = require('./products');
const cart = require('./cart');
const order = require('./order');

// Person.find({ "name": { "$regex": "Alex", "$options": "i" } },
// function(err,docs) { 
// });

/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('index', {products});
});

router.get('/products', function (req, res) {
  res.render('products', { products: products });
})

router.post('/search', function(req, res){
  var elems = [];
  products.forEach(elem => {
    if(elem.name.toLowerCase().search(req.body.product.toLowerCase()) != -1){
      elems.push(elem);
    }
  })
  res.render('products', {products: elems});
});

router.post('/order', function(req, res){
  order.create({
    name: req.body.name,
    email: req.body.email,
    contact: req.body.contact,
    total: req.body.total
  })
  .then(function(createdOrder){
    res.redirect('/allorders');
  })
});

router.get('/allorders', function (req, res) {
  order.find()
    .then(function (foundOrder) {
      res.render('allorders', {foundOrder});
    })
})

router.get('/cart', function (req, res) {
  cart.find()
    .then(function (foundProducts) {
      var total = 0;
      var arr = foundProducts.map(prc => {
        total = total + products[prc.prdc].price;
        return products[prc.prdc];
      })
      res.render('cart', {products: arr, total: total});
    })
})

router.get('/clear', function (req, res) {
  cart.remove({}, function(err){
    if(err) throw err;
    res.redirect('/cart');
  })
})

router.get('/add/:item', function (req, res) {
  cart.create({
    prdc: req.params.item
  })
    .then(function () {
      res.redirect('/products');
    })
})

router.get('/remove/:item', function (req, res) {
  cart.findOneAndDelete({prdc: req.params.item})
    .then(function(){
      res.redirect('/cart');
    })
})

module.exports = router;
