var mongodb = require("mongodb");
var client = mongodb.MongoClient;
var url = require("../db/url");
var express = require('express');
var router = express.Router();
var AWS = require('../aws-config/aws');

var s3 = new AWS.S3(); 

router.post('/',function(req,res){

       
        console.log(req.body);
      
                client.connect(url, function (err, client) {
                    var db = client.db("295db");
                    var collection = db.collection("incident");
        
                    
                        var query= {
                            "image_url" : req.body.link
                        }
                        var update ={
                            $set: {"isThreat":false}
                        }

                    
                        var cursor = collection.update(query,update);
                        cursor.then(function(response){
                            console.log(response);
                            res.end(JSON.stringify({"success" : true}));
                        })
                 
                }) 
            })
          

       

    


module.exports = router;