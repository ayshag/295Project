var express = require('express');
var router = express.Router();
var AWS = require('../aws-config/aws');

var s3 = new AWS.S3(); 
router.get('/',function(req,res){
{
        console.log('Received Request For Threats');
        res.writeHead(200, {
           'Content-Type': 'text/plain'
        });
    
        const linkbase = "https://295-videos.s3.us-east-2.amazonaws.com/"
        const threatsData = [];
        
        //Get keys of all files
        var params = { 
            Bucket: '295-videos',
         }
          
          s3.listObjects(params, function (err, data) {
            if(err)throw err;
         
            for(var i = 0; i<Object.keys(data.Contents).length; i++)
            {
                if(data.Contents[i].Key.includes('.png'))
                {
                    threatsData.push(linkbase + data.Contents[i].Key);
                }
              
            }
        
           res.end(JSON.stringify(threatsData));
       
          });      
    }
})
    


module.exports = router;