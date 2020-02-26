var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var session = require('express-session');
var cors = require('cors');

server = app.listen(3001, () => {
    console.log("Listening on Port 3001");
});

var io = require('socket.io')(server);
/*
io.on('connection', function(socket){
    console.log('Client Connected');
    const linkbase = "https://295-videos.s3.us-east-2.amazonaws.com/";
          socket.emit('update',{
              link  : linkbase
          });   
  })*/
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

var AWS = require('aws-sdk'); 

AWS.config = new AWS.Config();
AWS.config.accessKeyId = "*accessKeyId*";
AWS.config.secretAccessKey = "*secretAccessKey*";
AWS.config.region = "us-east-2";

var sns = new AWS.SNS();


var params = {
  Protocol: 'http', /* required */
  TopicArn: 'arn:aws:sns:us-east-2:132263860871:item_added', /* required */
  Endpoint: 'http://ec2-18-191-215-47.us-east-2.compute.amazonaws.com:3001'
};

//var subscribePromise = new AWS.SNS({apiVersion: '2010-03-31'}).subscribe(params).promise();

/*subscribePromise.then(
  function(data) {
    console.log("Subscription ARN is " + data.);
  }).catch(
    function(err) {
    console.error(err, err.stack);
  });*/


sns.subscribe(params, function(err, data) {
  if (err) console.log(err, err.stack); // an error occurred
  else     console.log(data);           // successful response
});

var send_msg = [] ;
var connected = true, send = false;
var linkbase = "https://295-videos.s3.us-east-2.amazonaws.com/";
io.on('connection', function(socket)
{
	console.log('Client Connected');
	
	/*setInterval(function(){
		//ToDo : Clear once page shifts
		
		if(send)
		{
			console.log(linkbase + send);
			socket.emit('update',{
                  		link  : linkbase
                 	})
			send = false;
			linkbase = "https://295-videos.s3.us-east-2.amazonaws.com/";
		}
	},3300);
});*/
console.log('test1');

app.post('/', function(req,res){
console.log('test');
//console.log(req);
var chunks= [];
 req.on('data', function (chunk) {
        chunks.push(chunk);
    });
    req.on('end', function () {
       var  message = JSON.parse(chunks.join(''));
	//console.log('Printing Message');
       // console.log(message);
	if(message.Type === 'Notification')
	{
		console.log('Notification');
		//console.log(message);
		console.log(typeof JSON.parse(message.Message));
		console.log(JSON.parse(message.Message));

		var msg = JSON.parse(message.Message);
		//console.log(msg.Records[0].s3);
		console.log(msg.Records[0].s3.object.key);
        	//console.log(msg.Records[0]);
		//console.log(msg.Records[0].object.key);
	
        		linkbase = "https://295-videos.s3.us-east-2.amazonaws.com/" + msg.Records[0].s3.object.key;
			send = true;
              		console.log('should emit' + linkbase);
			socket.emit('update',{
                  		link  : linkbase
                 	})

			

      }
	});

       res.end();

	});
});
app.get('/live-surveillance',function(req,res){
   console.log("Received Request For Link");
	rec = false;
    res.writeHead(200, {
       'Content-Type': 'text/plain'
    });
    res.end(JSON.stringify({'link': 'https://295-videos.s3.us-east-2.amazonaws.com/jellyfish-25-mbps-hd-hevc.mp4'}));

})


app.get('/threat-summary',function(req,res){
   
    res.writeHead(200, {
       'Content-Type': 'text/plain'
    });
    res.end(JSON.stringify({'link': 'https://295-videos.s3.us-east-2.amazonaws.com/images/image1.jpg'}));

})

var allThreats = [];
app.get('/all-threats',function(req,res){
   console.log('Received Request');
  //  res.writeHead(200, {
  //     'Content-Type': 'text/plain'
  //  });

    const linkbase = "https://295-videos.s3.us-east-2.amazonaws.com/"
    const threatsData = [];
    //Get keys of all files
    //var AWS = require('aws-sdk');
    //AWS.config.update({accessKeyId:'AKIAJAMGNI66QCPCXDIA',secretAccessKey:'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'});
    var s3 = new AWS.S3(); 

    var params = { 
        Bucket: '295-videos',
    
       
      }
      
      s3.listObjects(params, function (err, data) {
        if(err)throw err;
       // console.log(data);
      //  var count = 1;
        for(var i = 0; i<Object.keys(data.Contents).length; i++)
        {
            if(data.Contents[i].Key.includes('.png'))
            {
                //var name = 'threat' + count;
              //  count++;
                // console.log(data);
                threatsData.push(linkbase + data.Contents[i].Key);
                //threatsData[name] = linkbase + data.Contents[i].Key;
                //console.log(threatsData[name]);
            }
            //threatsData.add({name : data.Contents[i].Key});
        }
       // console.log(data);
       console.log(threatsData);
res.end(JSON.stringify(threatsData));


      });

    //const linkbase = "https://295-videos.s3.us-east-2.amazonaws.com/";
  /*  const linkbase = "https://vishbucket2.s3.amazonaws.com/";
    const data ={
        threat1 : linkbase + "image0.jpg",
        threat2 : linkbase + "image1.jpg",
        threat3 : linkbase + "image2.jpg",
        threat4 : linkbase + "image3.jpg",
        threat5 : linkbase + "image4.jpg",
        threat6 : linkbase + "image5.jpg",
        threat7 : linkbase + "image6.jpg",
        threat8 : linkbase + "image7.jpg",
    }
*/
  
})




/*
var getParams = {
    Bucket: 'example-bucket', //replace example bucket with your s3 bucket name
    Key: 'data/data.json' // replace file location with your s3 file location
}

s3.getObject(getParams, function (err, data) {

    if (err) {
        console.log(err);
    } else {
        console.log(data.Body.toString()); //this will log data to console
    }

})*/
/*
var s3 = require('aws2js').load('s3', awsAccessKeyId, awsSecretAccessKey);    
s3.setBucket(bucketName);

var folder = encodeURI('some/path/to/S3/folder');
var url = '?prefix=' + folder;

s3.get(url, 'xml', function (error, data) {
    console.log(error);
    console.log(data);
});*/




//https://295-videos.s3.us-east-2.amazonaws.com/images/icon-1.png
/*
var AWS = require('aws-sdk');
//Access ID :  AKIAR5S4KLKDTGOWXQ5M
//Secret KEY : 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 
var fs = require('fs'); 
var s3 = new AWS.S3({apiVersion: '2006-03-01'});
var fileStream = fs.createWriteStream('./video.mp4');
var s3Stream = s3.getObject({Bucket: '295-videos', Key: 'jellyfish-25-mbps-hd-hevc.mp4'}).createReadStream();
s3Stream.on('error', function(err) {
    // NoSuchKey: The specified key does not exist
    console.error(err);
});
s3Stream.pipe(fileStream).on('error', function(err) {
    // capture any errors that occur when writing data to the file
    console.error('File Stream:', err);
}).on('close', function() {
    console.log('Done.');
});*/
/*
const mqtt = require('mqtt')
const client = mqtt.connect('mqtt://broker.hivemq.com');
//console.log(client);

//Publish - Should happen on IoT Device
client.on('connect', () => {
    console.log('Connected and Publishing Message');
    setTimeout(()=> {
    client.publish('garage/connected', 'true');
    },2000)
  })




client.on('connect', () => {
    console.log('Connected and Subscribing Message');
  
    client.subscribe('garage/connected')
  
  })


client.on('message', (topic, message) => {
    console.log('Received Message');
    if(topic === 'garage/connected') {
      var connected = (message.toString() === 'true');
      console.log('Found Topic and Corresponding Message', connected);
    }
  })
*/
