const mongoose = require('mongoose');

var Product = mongoose.model('Product', {
    name: { type: String },
    brand: { type: String },
    Price: { type: String }
});

module.exports = { 

    Product
 };