var express = require('express');
var router = express.Router();

router.get('/',function(req,res){
    console.log("Received Request For Link");
     res.writeHead(200, {
        'Content-Type': 'text/plain'
     });
     res.end(JSON.stringify({'link': 'https://295-videos.s3.us-east-2.amazonaws.com/jellyfish-25-mbps-hd-hevc.mp4'}));
 
 })
 
 module.exports =  router;