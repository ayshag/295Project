var mongoose = require('mongoose');

var camera = mongoose.model('camera',{
    id :{
        type : Number
    },
    name : {
        type : String
    },
    latitude : {
        type : String
    },
    longitude : {
        type : String
    },
    building_id :{
        type : Number
    }
});

module.exports = {camera};