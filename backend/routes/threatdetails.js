var mongodb = require("mongodb");
var client = mongodb.MongoClient;
var url = require("../db/url");
var express = require('express');
var router = express.Router();
var AWS = require('../aws-config/aws');

router.post('/',function(req,res){
{
        console.log("Received Request for Threat Details");
     
        const threatLinks = req.body;
        var i = 0;
        client.connect(url, function (err, client) {
            var threatDetails = [];
                        var db = client.db("295db");
                        var collection = db.collection("incident");
                        for(; i<threatLinks.length; i++)
                        {
                            var query= {
                                "image_url" : threatLinks[i]
                            }
                            var cursor = collection.findOne(query);
                            cursor.then(function (result, threatDetails){
                                console.log(result)
                                threatsDetails.push(result);
                                returnDetails();
                            })
                        }
                      
                    })

        function returnDetails()
        {
            console.log("i " +  i);
            console.log(threatLinks.length);
            if(i == threatLinks.length)
            {
                console.log(threatDetails);
                res.end(JSON.stringify(threatDetails));
            }
        }
          
       
             
    }
})
    


module.exports = router;