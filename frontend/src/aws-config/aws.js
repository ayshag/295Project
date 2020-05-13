var AWS = require('aws-sdk'); 

AWS.config = new AWS.Config();

AWS.config.accessKeyId = "AKIAXBXQVKC4TY2ZUR6V";
AWS.config.secretAccessKey = "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";
AWS.config.region = "us-east-1";
module.exports = AWS;