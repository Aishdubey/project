const express = require('express');
var router = express.Router();
var ObjectId = require('mongoose').Types.ObjectId;

var { Cart } = require('../models/cart');



router.get('/',(req,res) =>{
    Cart.find((err,docs) =>{
        if(!err) { res.send(docs);}
        else{console.log('Error in ' +JSON.stringify(err,undefined,2));}
    });
});

router.get('/:id',(req,res) => {
    if(!ObjectId.isValid(req.params.id))
        return res.status(400).send(`No record: ${req.params.id}` );
    Cart.findById(req.params.id,(err,doc) =>{
        if(!err){res.send(doc);}
        else {console.log('Error:' +JSON.stringify(err,undefined,2));}
    });

});
router.post('/',(req,res) => {
    var cart = new Cart({
        productname: req.body.productname,
        productbrand: req.body.productbrand,
        productprice: req.body.productprice,
    });
    cart.save((err,doc) => {
        if(!err) { res.send(doc);}
        else{console.log('Error in ' +JSON.stringify(err,undefined,2));}
    })
});

router.put('/:id', (req, res) => {
    if (!ObjectId.isValid(req.params.id))
        return res.status(400).send(`No record with given id : ${req.params.id}`);

    var cart = {
        name: req.body.name,
        position: req.body.position,
        office: req.body.office,
        salary: req.body.salary,
    };
    Cart.findByIdAndUpdate(req.params.id, { $set: emp }, { new: true }, (err, doc) => {
        if (!err) { res.send(doc); }
        else { console.log('Error in Employee Update :' + JSON.stringify(err, undefined, 2)); }
    });
});

router.delete('/:id', (req, res) => {
    if (!ObjectId.isValid(req.params.id))
        return res.status(400).send(`No record with given id : ${req.params.id}`);

        Cart.findByIdAndRemove(req.params.id, (err, doc) => {
        if (!err) { res.send(doc); }
        else { console.log('Error in Employee Delete :' + JSON.stringify(err, undefined, 2)); }
    });
});
module.exports = router;