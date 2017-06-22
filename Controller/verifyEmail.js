var express = require('express');
router = express.Router();
var User = require('../Model/index.js');
var nodemailer = require('nodemailer');
var jwt = require('jsonwebtoken');
var conf = require('../Config/config.js');




router.put('/', function(req, res) {
    console.log("req", req.body);
    var winston = require('winston');
    User.resetPassword(req.body, function(err, data) {
        if (data)

        {
            console.log("dkgjfdkgljfdkl", data);
            var token = jwt.sign({
                email: data.local.email
            }, conf.TOKEN_SECRET, {
                expiresIn: 60 * 60 * 24
            });

            // create reusable transporter object using the default SMTP transport
            let transporter = nodemailer.createTransport({
                service: 'Gmail',
                auth: {
                    user: 'rani6172@gmail.com',
                    pass: 'welcome.123'
                },

            }, {
                from: 'Prajakta Tatkare <rani6172@gmail.com>'
            });
            //
            console.log('SMTP Configured');

            // Message object
            let message = {

                // Comma separated list of recipients
                to: data.local.email,
                // Subject of the message
                subject: 'Reset Password',

                // plaintext body
                text: 'Hello to myself!',


                html: '<p>click on the below link to change password</p>' +
                    '<a href="http://localhost:8081/#!/changePassword/' + token + '"> http://localhost:8081/#!/changePassword/"' + token + '</a>',

                // Apple Watch specific HTML body



            };

            console.log('Sending Mail');
            transporter.sendMail(message, (error, info) => {
                if (error) {
                    console.log('Error occurred');
                    console.log(error.message);
                    return;
                }

                // console.log("token",token);


                console.log('Message sent successfully!');
                console.log('Server responded with "%s"', info.response);
                transporter.close();

            });

    

            res.send({
                "Email": data.email,
                "status": true
            })
            //


        } else {
            console.log("in else");

            res.send({
                message: "err",
                "status": false
            })
        }

    });



});
module.exports = router;
