var mongoose = require('mongoose');


var users = mongoose.model('user',{
    id :{
        type : Number
    },
   fname :{
        type : String
    },
    lname : {
        type : String
    },
    email : {
        type : String
    },
    phone :{
        type : Number
    },
    password : {
        type : String
    },
    verified : {
        type : Boolean
    },
    org_id : {
        type : Number
    }
});

module.exports = {users};

/*var mongoose = require('mongoose');




var users = mongoose.model('user',{
    username :{
        type : String
    },
    password : {
        type : String
    },
    phone :{
        type : Number
    },
    name : {
        type : String
    },
    aboutme : {
        type : String
    },
    city : {
        type : String
    },
    country : {
        type : String
    },
    school : {
        type : String
    },
    hometown : {
        type : String
    },
    languages : {
        type : String
    },
    gender : {
        type : String
    },
    propowner : {
        type : Boolean
    }
});*/