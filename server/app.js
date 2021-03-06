require ('./config/config');
require('./models/db');
require('./config/passportConfig');

const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const rtsIndex = require('./routes/index.router');
const passport = require('passport');
var productController = require('./controllers/productController.js');
var cartController = require('./controllers/cartController.js');


var app = express();

app.use(bodyParser.json());
app.use(cors({origin: 'http://localhost:4200'}));
app.use(passport.initialize());
app.use('/api',rtsIndex);


app.use('/Product',productController);
app.use('/carts',cartController);


app.use((err,req,res,next) =>{
    if (err.name === 'ValidationError') {
        var valErrors = [];
        Object.keys(err.errors).forEach(key => valErrors.push(err.errors[key].message));
        res.status(422).send(valErrors)
    }
});

app.listen(process.env.PORT,() => console.log(`Server started at port : ${process.env.PORT}`));