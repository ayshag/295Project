var mongodb = require("mongodb");
var client = mongodb.MongoClient;
var url = require("../db/url");
var express = require('express');
var router = express.Router();
var bcrypt = require('bcrypt-nodejs');
var salt = bcrypt.genSalt(5, function (err, salt) { return salt; });

router.post('/',function(req,res)
{

    client.connect(url, function (err, client) {
    
        var db = client.db("295db");
        var collection = db.collection("user");
        var query= {
            "email" : req.body.email
        }

        var cursor = collection.findOne(query);
        cursor.then(function (success){
            if(success)
            {
                res.end(JSON.stringify({"message" : "preexisting"}));
            }
            else
            {
                bcrypt.hash(req.body.password, salt, null, function (err, password) 
                {
                    console.log(password);
                    query = {
                        "fname" : req.body.fname,
                        "lname" : req.body.lname,
                        "email": req.body.email,
                        "password" : password, 
                        "mobile" : req.body.mobile,
                        "verified" : "true",
                        "org_id" : req.body.org
                    };
            
                    var cursorSave = collection.save(query);
                    cursorSave.then(function(response){
                        res.end(JSON.stringify({"message" : "created"}));
                    })
                })
            
            }
        })
           
    });

});

module.exports =  router;