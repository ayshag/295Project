var mongodb = require("mongodb");
var client = mongodb.MongoClient;
var url = require("../db/url");
var express = require('express');
var router = express.Router();
router.get('/',function(req,res){

     
        var threatsData = [];


        client.connect(url, function (err, client) {
            if(err)
                console.log(err);
            var db = client.db("295db");
            var collection = db.collection("incident");

            var cursor = collection.find();
            cursor.each(function (err, result){
                 if(result == null)
                 {
                    res.end(JSON.stringify(threatsData));
                   return;
                 }
                if( result.isThreat && result.image_url.includes("amazonaws.com"))
                {
                    threatsData.push({'link' : result.image_url});
                    threatsData[threatsData.length-1].isThreat = result.isThreat;
                    threatsData[threatsData.length-1].id = result.id;
                    threatsData[threatsData.length-1].camera_id = result.camera_id;
                    threatsData[threatsData.length-1].date = result.date;
                    threatsData[threatsData.length-1].city = result.city;
                    threatsData[threatsData.length-1].location = result.location;
                    threatsData[threatsData.length-1].time = result.time;
                    threatsData[threatsData.length-1].certainty = result.certainty;
                    threatsData[threatsData.length-1].severity = result.severity;
                }
            
            })
           
        })
        
       
        

    
})
    


module.exports = router;