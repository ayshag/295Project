var mongoose = require('mongoose');

var notification = mongoose.model('notification',{
    id :{
        type : Number
    },
    user_id : {
        type : Number
    },
    incident_id : {
        type : Number
    },
    text : {
        type : String
    },
    email : {
        type : Boolean
    },
    mobile : {
        type : Boolean
    }
});

module.exports = {notification};