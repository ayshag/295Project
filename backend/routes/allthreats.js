var mongodb = require("mongodb");
var client = mongodb.MongoClient;
var url = require("../db/url");
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
        var threatsData = [];
        //Get keys of all files
        var params = { 
            Bucket: '295-videos',
         }
          
          s3.listObjects(params, function (err, data) {
            if(err)throw err;
           // console.log('length ' +Object.keys(data.Contents).length);
           var i = 0;
           function myLoop (data) {
               setTimeout(function (){
                var key = data.Contents[i].Key;
                //console.log(key);
                if(key.includes('.png'))
                {
                    threatsData.push({"link" : linkbase + key });
                    
                    addToThreats(threatsData.length-1,threatsData,linkbase + key);
                    i++;
                    if(i< Object.keys(data.Contents).length)
                           // if(threatsData.length % 4 == 0)
                            //{  
                             //   console.log(threatsData);
                               // res.write(JSON.stringify(threatsData));
                               // threatsData = [];
                           // }
                            myLoop(data);
                    }
                    else
                    {
                        console.log("return");
                        console.log(threatsData);
                         res.end(JSON.stringify(threatsData));
                    }
               
                },250)
            }
           /* for(var i = 0; i<Object.keys(data.Contents).length; i++)
            {
                var key = data.Contents[i].Key;
                console.log(key);
                setTimeout(function(){
                    handler(key); } ,1)
                
               
               
            }*/
            myLoop(data);

            function addToThreats(i,threatsData,link)
            {
                client.connect(url, function (err, client) {
                    var db = client.db("295db");
                    var collection = db.collection("incident");
                    //console.log("link " + link);
                    
                    var query= {
                        "image_url" : link
                    }
                    var cursor = collection.findOne(query);
                    cursor.then(function (result){
                       // console.log(result);
                        if(result)
                        {
                            threatsData[i].id = result.id;
                            threatsData[i].camera_id = result.camera_id;
                            threatsData[i].date = result.date;
                            threatsData[i].city = result.city;
                            threatsData[i].location = result.location;
                            threatsData[i].time = result.time;
                            threatsData[i].certainty = result.certainty;
                            threatsData[i].severity = result.severity;
                        }
                    })
                })
            }
            /*function handler(key){
                console.log("key " + key);
                if(key.includes('.png'))
                {
                    console.log("ey" + key);
                    threatsData.push(linkbase + key);
                    
                  
                    client.connect(url, function (err, client) {
                        var db = client.db("295db");
                        var collection = db.collection("incident");
                        console.log(key);
                        
                        var query= {
                            "image_url" : key
                        }
                        var cursor = collection.findOne(query);
                        cursor.then(function (result){
                            console.log(result);
                        })
                    })
                }
            
            }*/
            
            if(i == Object.keys(data.Contents).length)
            {
            
              //  console.log(threatsData);
               res.end(JSON.stringify(threatsData));
            }
       
          });      
    }
})
    


module.exports = router;