var express=require('express');
router=express.Router();
var User = require('../Model/index.js');
var nodemailer=require('nodemailer');
var jwt = require('jsonwebtoken');
var conf = require('../Config/config.js');



router.post('/',function(req,res){
  console.log("req",req.body);
var winston=require('winston');
  User.resetPassword(req.body,function(err,data){
    if(data)

    { console.log(data);
        
        // create reusable transporter object using the default SMTP transport
      let transporter = nodemailer.createTransport({
          service: 'Gmail',
          auth: {
              user: 'rani6172@gmail.com',
              pass:  'welcome.123'
          },

      }, {
          // default message fields

          // sender info
          from: 'Prajakta Tatkare <rani6172@gmail.com>',

      });

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
              '<a href="http://localhost:8081/#!/changePassword"> http://localhost:8081/#!/changePassword</a>',

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
      var token=  jwt.sign({
            email: data.local.email
        }, conf.TOKEN_SECRET, {
            expiresIn: 60 * 60 * 24
        });
        res.cookie('cookie',token);

      res.send({"Email":data.email,"status":true})



    }

    else
    {

      res.send({message:"err","status":false})
    }

  });
    // User.changePassword(req.body,function(err,data){
    //   if(data)
    //   {
    //
    //     res.send({"user_data":data,"status":true})
    //   }
    //   else
    //   {
    //
    //     res.send({message:"err","status":false})
    //   }
    //
    // });



});
module.exports=router;
