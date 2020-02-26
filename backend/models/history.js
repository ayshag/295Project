var mongoose = require('mongoose');

var history = mongoose.model('history',{
    id :{
        type : Number
    },
    camera_id : {
        type : Number
    },
    video_url : {
        type : String
    },
    date : {
        type : Date
    }
});

module.exports = {history};