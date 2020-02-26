var AWS = require('aws-sdk'); 

AWS.config = new AWS.Config();
AWS.config.accessKeyId = "AKIAJAMGNI66QCPCXDIA";
AWS.config.secretAccessKey = "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";
AWS.config.region = "us-east-2";

module.exports = AWS;