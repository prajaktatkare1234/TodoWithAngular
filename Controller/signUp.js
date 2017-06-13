var express = require('express');
// var app = express();
var router = express.Router();
var User = require('../Model/index.js');
var config=require('../Config/index.js')
var winston=require('winston');


router.post('/', function(req, res) {
  // console.log("request",req.body.password);
  var result1 = {};
 result1.status = false;
 try{
   req.check(config.validationSchema.sign_up);
   req.getValidationResult().then(function(isValid){
     try{
      //  console.log("hii");
       if (!isValid.isEmpty()) {
        //  console.log("err");
         var errors = req.validationErrors()
         // isValid = isValid.useFirstErrorOnly();
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
           // res.send({"message":e})
       }



   });



 }
 catch (e) {
   res.send({"message":e})
   }



});






module.exports = router;
