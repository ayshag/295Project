var mongodb = require("mongodb");
var client = mongodb.MongoClient;
var url = require("../db/url");
var express = require('express');
var router = express.Router();
var bcrypt = require('bcrypt-nodejs');
var salt = bcrypt.genSalt(5, function (err, salt) { return salt; });

router.put('/',function(req,res){
   
 
    client.connect(url, function (err, client) {
        var db = client.db("295db");
        var collection = db.collection("user");
        var query= {
            "email" : req.body.user,
        }

        var cursor = collection.findOne(query);
        cursor.then(function (user){
        if(user)
        {
         
            bcrypt.compare(req.body.oldpassword, user.password, function (err, success)
            {
               //Matching Old Password
                if(success)
                { 
                 
                    bcrypt.hash(req.body.newpassword, salt, null, function (err, password) 
                    {
                        var query = {
                            "email" : req.body.user
                        }
                        
                        var update ={
                            $set: {"password":password}
                        }

                    
                        var cursorUpdate = collection.update(query,update);
                        cursorUpdate.then(function(response){
                            res.end(JSON.stringify({"message" : "updated"}));
                        })
                    })
                }
                //Old Password Does Not Match
                else
                {
                    res.end(JSON.stringify({"message" : "no-match"}));
                }
            })
                            
            
            }
        })
           
    });

})

module.exports = router;