var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var session = require('express-session');
var cors = require('cors');

app.use(cors({ origin: '*', credentials: true }));

app.use(session({
    secret: 'threatdetection',
    resave: false, 
    saveUninitialized: false, 
    duration: 60 * 50 * 1000,   
    activeDuration: 5 * 60 * 1000
}));

app.use(bodyParser.json());

app.use(function (req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Credentials', 'true');
    res.setHeader('Access-Control-Allow-Methods', 'GET,HEAD,OPTIONS,POST,PUT,DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers');
    res.setHeader('Cache-Control', 'no-cache');
    next();
});

app.listen(3001, () => {
    console.log("Listening on Port 3001");
});




var signin = require('./routes/signin');
var signup = require('./routes/signup');
var allthreats = require('./routes/allthreats');
var updatepassword = require('./routes/updatepassword');
var threatdetails = require('./routes/threatdetails');
var classify = require('./routes/classify');

app.use('/signin', signin);
app.use('/signup', signup);
app.use('/all-threats', allthreats);
app.use('/updatepassword', updatepassword);
app.use('/threat-details', threatdetails);
app.use('/classify', classify);
