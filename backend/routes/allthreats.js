var mongodb = require("mongodb");
var client = mongodb.MongoClient;
var url = require("../db/url");
var express = require('express');
var router = express.Router();
var AWS = require('../aws-config/aws');

var s3 = new AWS.S3(); 

router.get('/',function(req,res){
{
        
        res.writeHead(200, {
           'Content-Type': 'text/plain'
        });
    
       const linkbase = "https://vishbucket2.s3.amazonaws.com/";
        var threatsData = [];
        //Get keys of all files
        var params = { 
           Bucket: 'vishbucket2',
         }
          
          s3.listObjects(params, function (err, data) {
                if(err)throw err;
                
           var i = 0;
               for(; i<data.Contents.length; i++)
               {
                    var key = data.Contents[i].Key;
                        if(key.includes('image'))
                        {
                            threatsData.push({"link" : linkbase + key });
                            
                        }
                }
               res.end(JSON.stringify(threatsData));
               
            
       
          });      
    }
})
    


module.exports = router;