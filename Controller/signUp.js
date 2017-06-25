var express = require('express');
var app = express();
var router = express.Router();
var User = require('../Model/index.js');
var config=require('../Config/index.js')
var winston=require('winston');
var jwt = require('jsonwebtoken');
var conf = require('../Config/config.js');




router.post('/', function(req, res) {

  // if(req.body.updation!=="change")
  // {

    console.log("old");
    var result1 = {};
   result1.status = false;
   try{

     if(req.body.updation!=="change"){
       req.check(config.validationSchema.sign_up);
       req.getValidationResult().then(function(isValid){
         try{

           if (!isValid.isEmpty()) {

             var errors = req.validationErrors()

             throw errors[0].msg;

           }
           User.save_user(req, function(err, result) {



               if (err) {
                 winston.error("Registration failed ");
                   res.send({
                       "status": false,
                       "message": err
                   });
               } else {
                 winston.info("Registered successfully");
                   res.send({
                       "status": true,
                       "message": "Registered Successfully"
                   });
               }


           });
         }
         catch (e) {
           result1.message="sorry server error";

             if (!config.checkSystemErrors(e)) {
               result1.status = false;
               result1.message = e;
             }
             res.send(result1);
             return;

           }



       });
     }
     else{
       var token= req.body.token
     var email;
     jwt.verify(token, conf.TOKEN_SECRET,function(err,decoded){

       email=decoded.email;

       console.log("in change password",req.body);
       User.changePassword(req.body,email,function(err,data){
         if(data)
         {
           res.clearCookie('cookie');
           res.send({"user_data":data,"status":true})
         }
         else
         {

           res.send({message:"err","status":false})
         }

       });
     })

     }




   }
   catch (e) {
     res.send({"message":error})
     }


  // }
  //


});






module.exports = router;
