/*
 * Registration for new user
 * @path Controller/signUp.js
 * @file signUp.js
 * @Scripted by Prajakta Tatkare
 */

/*
 * Module dependencies
 */

var express = require('express');
var app = express();
var router = express.Router();
var User = require('../Model/index.js');
var config=require('../Config/index.js')
var winston=require('winston');
var jwt = require('jsonwebtoken');
var conf = require('../Config/config.js');




router.post('/', function(req, res) { //post call for api signUp.js




    var result1 = {};
   result1.status = false;
   try{

     if(req.body.updation!=="change"){
       //validating the fields
       req.check(config.validationSchema.sign_up);
       req.getValidationResult().then(function(isValid){
         try{

           if (!isValid.isEmpty()) {

             var errors = req.validationErrors()

             throw errors[0].msg;

           }
           User.saveUser(req, function(err, result) {

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
    //code for changing Password
     var token= req.body.token
     var email;
     //decoding token and fetching email
     jwt.verify(token, conf.TOKEN_SECRET,function(err,decoded){
       email=decoded.email;
         User.changePassword(req.body,email,function(err,data){
           if(data)
           {

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








});






module.exports = router;
