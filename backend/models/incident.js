var mongoose = require('mongoose');

var incident = mongoose.model('incident',{
    id :{
        type : Number
    },
    camera_id : {
        type : Number
    },
    date : {
        type : Date
    },
    time : {
        type : String
    },
    certainty : {
        type : String
    },
    severity : {
        type : String
    },
    image_url : {
        type : String
    },
    video_url : {
        type : String
    },
    verified : {
        type : Boolean
    },
    target_label:{
        type : Boolean 
    }
});

module.exports = {incident};