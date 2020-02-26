var mongoose = require('mongoose');

mongoose.Promise = global.Promise;

//mongoose.connect('mongodb://localhost:27017/lab2ha');
//mongodb://<dbuser>:<dbpassword>@ds149593.mlab.com:49593/lab2ha
console.log('Attempting to connect MongoDb');
//mongodb://295-user:295-pass@ds017862.mlab.com:17862/295db
//mongodb://admin:admin1@ds149593.mlab.com:49593/lab2ha
mongoose.connect('mongodb://295-user:295-pass@ds017862.mlab.com:17862/295db', {useNewUrlParser: true }, function(err,db)
{
    if(err)
        console.log(err);
    else
        console.log('Db connected');
}
);

module.exports = {mongoose};