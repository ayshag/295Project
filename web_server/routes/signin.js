var mongodb = require("mongodb");
var client = mongodb.MongoClient;
var url = require("../db/url");
var express = require('express');
var router = express.Router();
var bcrypt = require('bcrypt-nodejs');
router.post('/',function(req,res)
{

   
    client.connect(url, function (err, client) {
        var db = client.db("295db");
        var collection = db.collection("user");
        res.writeHead(200, {
            'Content-Type': 'text/plain'
        })
        
        var query = {
            "email": req.body.email
        };
        
        var cursor = collection.findOne(query);
        
        cursor.then(
            function(user) {
                if(user)
                {
                     bcrypt.compare(req.body.password, user.password, function (err, result)
                    {
                        //Username + Password Matches
                        if(result)
                            res.end(JSON.stringify({"message" : "match"}));
                        //Username + Password Does Not Match
                        else
                             res.end(JSON.stringify({"message" : "no-match"}));
                    })
                }
                else 
                {
                    //User does not exist
                  res.end(JSON.stringify({"message" : "no-user"}));
                }
            }, 
            function(error)  { //Some Other Error
                console.log("error: ", error);
                res.end(JSON.stringify({"message" : "error"}));
                client.close();
            }
        );        
    });

});

module.exports =  router;