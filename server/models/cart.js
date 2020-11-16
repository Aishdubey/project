const mongoose = require('mongoose');

var Cart = mongoose.model('Cart', {
    productname: { type: String },
    productbrand: { type: String },
    productprice: { type: String }
});

module.exports = {
    Cart
};
    