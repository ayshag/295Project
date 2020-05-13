var AWS = require('aws-sdk'); 

AWS.config = new AWS.Config();

AWS.config.accessKeyId = "AWSAccessKeyId";
AWS.config.secretAccessKey = "AWSSecretAccessKey";
AWS.config.region = "us-east-1";
module.exports = AWS;