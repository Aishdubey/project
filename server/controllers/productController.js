  
const mongoose = require('mongoose');
var ObjectId = require('mongoose').Types.ObjectId;

var { Product } = require ('../models/product');
var router = require('../routes/index.router');

router.get('/',(req,res)=> {
    Product.find((err,docs) =>{
        if(!err) {
            res.send(docs);
        }
        else {
            console.log('Error in Retriving producst: ' +JSON.stringify(err,undefined,2));
        }
    });
});

router.get('/:id',(req,res) =>{
    if(!ObjectId.isValid(req.param,id))
    return res.status(400).send(`No record : ${req.params.id}`);

    Product.findById(req.params.id, (err, doc) => {
        if (!err) { res.send(doc); }
        else { console.log('Error in Retriving Employee :' + JSON.stringify(err, undefined, 2)); }
    });
});
router.post('/',(req,res) =>{

    var pro = new Product({
        name: req.body.name,
        brand: req.body.brand,
        Price: req.body.Price,
    });

    pro.save((err,doc) =>{

        if(!err) {res.send(doc);}
        else {console.log('Error in Product save: ' +JSON.stringify(err,undefined,2));
    }
    });
});

router.put('/:id', (req, res) => {
    if (!ObjectId.isValid(req.params.id))
        return res.status(400).send(`No record with given id : ${req.params.id}`);

    var pro = {
        name: req.body.name,
        brand: req.body.brand,
        Price: req.body.Price,
    };
    Product.findByIdAndUpdate(req.params.id, { $set: emp }, { new: true }, (err, doc) => {
        if (!err) { res.send(doc); }
        else { console.log('Error in Employee Update :' + JSON.stringify(err, undefined, 2)); }
    });
});

router.delete('/:id', (req, res) => {
    if (!ObjectId.isValid(req.params.id))
        return res.status(400).send(`No record with given id : ${req.params.id}`);

    Product.findByIdAndRemove(req.params.id, (err, doc) => {
        if (!err) { res.send(doc); }
        else { console.log('Error in Employee Delete :' + JSON.stringify(err, undefined, 2)); }
    });
});
module.exports = router;
