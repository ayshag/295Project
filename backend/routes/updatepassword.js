var mongodb = require("mongodb");
var client = mongodb.MongoClient;
var url = require("../db/url");
var express = require('express');
var router = express.Router();
var bcrypt = require('bcrypt-nodejs');
var salt = bcrypt.genSalt(5, function (err, salt) { return salt; });

router.put('/',function(req,res){
   
    console.log('Received request for update password');
 
    client.connect(url, function (err, client) {
        console.log(req.body);
        var db = client.db("295db");
        var collection = db.collection("user");
        var query= {
            "email" : req.body.user,
        }

        var cursor = collection.findOne(query);
        cursor.then(function (user){
        if(user)
        {
            console.log("User Found");
           // console.log(req.body.oldpassword);
            bcrypt.compare(req.body.oldpassword, user.password, function (err, success)
            {
               //Matching Old Password
                if(success)
                { 
                    console.log("Old Password Matches");
                    console.log("Old Hashed Password: " + user.password);
                    bcrypt.hash(req.body.newpassword, salt, null, function (err, password) 
                    {
                        console.log("New Hashed Password: " + password);
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
                    console.log("Old Passwords Don't Match");
                    res.end(JSON.stringify({"message" : "no-match"}));
                }
            })
                            
            
            }
        })
           
    });

})

module.exports = router;