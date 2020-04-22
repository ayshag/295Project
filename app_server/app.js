// application server that puts the IOT data in the db
var awsIot = require('aws-iot-device-sdk');
var AWS = require('aws-sdk');
var mongodb = require("mongodb");
var mongo = mongodb.MongoClient;
var url = require("../backend/db/url");
// const sgMail = require('@sendgrid/mail');
AWS.config.loadFromPath('./config.json');
var Validator = require('jsonschema').Validator;
var v = new Validator();
require('console-stamp')(console, '[HH:MM:ss.l]');

//
// Replace the values of '<YourUniqueClientIdentifier>' and '<YourCustomEndpoint>'
// with a unique client identifier and custom host endpoint provided in AWS IoT.
// NOTE: client identifiers must be unique within your AWS account; if a client attempts 
// to connect with a client identifier which is already in use, the existing 
// connection will be terminated.
//
var device = awsIot.device({
    keyPath: "./cert/private.pem.key",
    certPath: "./cert/certificate.pem.crt",
    caPath: "./cert/root-CA.crt",
    clientId: "newid",
    host: "a1gh2aa89k5ewj-ats.iot.us-east-1.amazonaws.com"

});

//
// Device is an instance returned by mqtt.Client(), see mqtt.js for full
// documentation.
//
device
    .on('connect', function() {
        console.log('Connecting to MQTT IOT queue');
        device.subscribe('$aws/things/deeplens_rdAW3I9xTfmHPrCydULALA/infer');
        console.log('Subscribing to MQTT IOT queue');
        device.publish('$aws/things/deeplens_rdAW3I9xTfmHPrCydULALA/infer',
            JSON.stringify({
                "Date": "04-12-2020",
                "Device": "Camera_001",
                "Image": "Image_url_001",
                "Certainty": 0.80,
                "Location": "MLK Library",
                "isThreat": true
            }));
    });

// Address, to be embedded on Person
var IncidentSchema = {
    "id": "/Incident",
    "type": "object",
    "properties": {
        "Date": {
            "type": "string"
        },
        "Device": {
            "type": "string"
        },
        "Certainty": {
            "type": "number"
        },
        "Location": {
            "type": "string"
        },
        "isThreat": {
            "type": "boolean"
        },
        "Image": {
            "type": "string"
        }
    },
    "required": ["Date", "Device", "Certainty", "Location", "isThreat", "Image"]
};

v.addSchema(IncidentSchema, '/Incident');


mongo.connect(url, function(err, client) {

    var db = client.db("295db");
    var incident_collection = db.collection("incident");
    device
        .on('message', function(topic, payload) {
            var req = JSON.parse(payload);
            console.log('Received Message from queue:', req);

            var result = v.validate(req, IncidentSchema);
            if (result.valid === true) {
                console.log("Schema validation successful");
                var incident = {
                    "date": req.Date,
                    "camera_id": req.Device,
                    "image_url": req.Image,
                    "certainty": req.Certainty,
                    "location": req.Location,
                    "isThreat": req.isThreat

                };

                incident_collection.insertOne(incident)
                    .then(result => console.log(`Successfully inserted item with _id: ${result.insertedId}`))
                    .catch(err => console.error(`Failed to insert item: ${err}`))

                // email notification using sendgrid
                // using Twilio SendGrid's v3 Node.js Library
                // https://github.com/sendgrid/sendgrid-nodejs

                // sgMail.setApiKey(process.env.SENDGRID_API_KEY);
                // const msg = {
                //   to: 'kruti.thukral@sjsu.edu',
                //   from: 'kruti.thukral@sjsu.edu',
                //   subject: 'Sending with Twilio SendGrid is Fun',
                //   text: 'and easy to do anywhere, even with Node.js',
                //   html: '<strong>and easy to do anywhere, even with Node.js</strong>',
                // };
                // sgMail.send(msg).then(result => console.log('sent email successfully'))
                // .catch(err => console.error(`Failed to insert item: ${err}`));
                //         });
                // Create sendEmail params 
                // var recepients = ["kruti.thukral@sjsu.edu", "vishwanath.manvi@sjsu.edu", "aysha.yusufgodil@sjsu.edu"];
                var users = db.collection("user");
                var myCursor = users.find({});
                var email_body = "<p> Caution! A suspicious activity was detected</p><p>Date:" + req.Date + "</p>\
                <p>Location: " + req.Location + "</p>\
                <p>Certainty: " + req.Certainty + "</p>\
                <p>Image URL: " + req.Image + "</p>"
                myCursor.forEach(element => {
                    // var dest_email = element.email;
                    // if  (dest_email) {
                    //     var params = {
                    //         Destination: {
                    //             /* required */
                    //             ToAddresses: [dest_email]
                    //         },
                    //         Message: {
                    //             /* required */
                    //             Body: {
                    //                 /* required */
                    //                 Html: {
                    //                     Charset: "UTF-8",
                    //                     Data: email_body
                    //                 },
                    //                 Text: {
                    //                     Charset: "UTF-8",
                    //                     Data: "this is an email notification from amazon ses"
                    //                 }
                    //             },
                    //             Subject: {
                    //                 Charset: 'UTF-8',
                    //                 Data: 'Suspicious activity detected'
                    //             }
                    //         },
                    //         Source: 'kruti.thukral@sjsu.edu',
                    //         /* required */
                    //         ReplyToAddresses: [
                    //             'kruti.thukral@sjsu.edu',
                    //             /* more items */
                    //         ],
                    //     };

                    //     // Create the promise and SES service object
                    //     var sendPromise = new AWS.SES({
                    //         apiVersion: '2010-12-01'
                    //     }).sendEmail(params).promise();
                    //     console.log("Sending Email");
                    //     // Handle promise's fulfilled/rejected states
                    //     sendPromise.then(
                    //         function(data) {
                    //             console.log(data.MessageId);
                    //             console.log("Email Sent successfully");
                    //         }).catch(
                    //         function(err) {
                    //             console.error(err, err.stack);
                    //             console.log("Email Sent successfully");
                    //         });
                    // }   
                    var mobile = element.mobile;
                    if (mobile) {
                        // send sms notification
                        const accountSid = 'AC7773d787af269c1c13f28af5b98392c7';
                        const authToken = '5637c78cd1bbb8e365e1cdb44e54f8a4';
                        const client = require('twilio')(accountSid, authToken);

                        client.messages
                        .create({
                            body: "Suspicious activity detected on " + req.Date + " at " + req.Location + ". Go to the link for further details " + req.Image,
                            from: '+12058392440',
                            to: mobile
                        })
                        .then(message => console.log(message.sid));
                        // send sms notification
                        // Create publish parameters
                        // var sms_message = "Suspicious activity detected on " +  req.Date + " at " + req.Location + ". Go to the link for further details " +  req.Image;
                        // var sms_params = {
                        //     Message: sms_message, /* required */
                        //     // PhoneNumber: mobile,
                        //     TopicArn: 'arn:aws:sns:us-east-1:484762276025:threatalerts'    
                        // };

                        // // Create promise and SNS service object
                        // var publishTextPromise = new AWS.SNS({apiVersion: '2010-03-31'}).publish(sms_params).promise();

                        // // Handle promise's fulfilled/rejected states
                        // publishTextPromise.then(
                        // function(data) {
                        //     console.log("SNS MessageID is " + data.MessageId);
                        // }).catch(
                        //     function(err) {
                        //     console.error(err, err.stack);
                        // });

                        // var sns = new AWS.SNS();
                        // var params = {
                        //     Message: "Suspicious activity detected on " + req.Date + " at " + req.Location + ". Go to the link for further details " + req.Image,
                        //     MessageStructure: 'string',
                        //     PhoneNumber: mobile,

                        //     Subject: 'MyApp'
                        // };

                        // sns.setSMSAttributes({
                        //         attributes: {
                        //             DefaultSMSType: "Transactional"
                        //         }
                        //     },
                        //     function(error) {
                        //         if (error) {
                        //             console.log(error);
                        //         }
                        //     }
                        // );

                        // sns.publish(params, function(err, data) {
                        //     if (err) console.log(err, err.stack); // an error occurred
                        //     else console.log(data); // successful response
                        // });

                      
                    }


                });


            } else {
                console.log("Error in received message", result.errors);
            }

        });
});
const http = require('http');

const hostname = '127.0.0.1';
const port = 3000;

const server = http.createServer((req, res) => {
    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/plain');
    res.end('Hello World');
});

server.listen(port, hostname, () => {
    console.log(`Server running at http://${hostname}:${port}/`);
});