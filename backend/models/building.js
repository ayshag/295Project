var mongoose = require('mongoose');

var building = mongoose.model('building',{
    id :{
        type : Number
    },
    org_id : {
        type : String
    },
    latitude : {
        type : String
    },
    longitude : {
        type : String
    },
    city :{
        type : String
    }
});

module.exports = {building};