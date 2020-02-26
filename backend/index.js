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

server = app.listen(3001, () => {
    console.log("Listening on Port 3001");
});

var io = require('socket.io')(server);

var AWS = require('./aws-config/aws');

var sns = new AWS.SNS();



var signin = require('./routes/signin');
var signup = require('./routes/signup');
var livesurveillance = require('./routes/livesurveillance');
var threatsummary = require('./routes/threatsummary');
var allthreats = require('./routes/allthreats');
var updatepassword = require('./routes/updatepassword');

app.use('/signin', signin);
app.use('/signup', signup);
app.use('/live-surveillance', livesurveillance);
app.use('/threat-summary', threatsummary);
app.use('/all-threats', allthreats);
app.use('/updatepassword', updatepassword);

var params = {
    Protocol: 'http', /* required */
    TopicArn: 'arn:aws:sns:us-east-2:132263860871:item_added', /* required */
    Endpoint: 'http://ec2-18-191-215-47.us-east-2.compute.amazonaws.com:3001'
  };


sns.subscribe(params, function(error, data) {
    /*if (error) 
        console.log(error, error.stack); 
      else    
        console.log(data);           
    */
  });

  io.on('connection', function(socket)
  {
      console.log('Client Connected');
   
      app.post('/', function(req,res){
      var chunks= [];
      req.on('data', function (chunk) {
          chunks.push(chunk);
      });
      req.on('end', function () {
         var  message = JSON.parse(chunks.join(''));
     
      if(message.Type === 'Notification')
       {
          var msg = JSON.parse(message.Message);
          var linkbase = "https://295-videos.s3.us-east-2.amazonaws.com/" + msg.Records[0].s3.object.key;
          console.log('should emit' + linkbase);
          socket.emit('update',{
                            link  : linkbase
                       })
        }
      });
  
       res.end();
  
    });
  });

