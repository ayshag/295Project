var express = require('express');
var router = express.Router();

router.get('/',function(req,res){
   
    res.writeHead(200, {
       'Content-Type': 'text/plain'
    });
    res.end(JSON.stringify({'link': 'https://295-videos.s3.us-east-2.amazonaws.com/images/image1.jpg'}));

})

module.exports = router;