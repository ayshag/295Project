var mongoose = require('mongoose');

var organization = mongoose.model('organization',{
    id :{
        type : Number
    },
    name :{
        type : String
    }
});

module.exports = {organization};