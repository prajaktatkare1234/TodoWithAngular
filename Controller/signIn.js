/*
 * Sign in for user
 * @path Controller/signIn.js
 * @file signIn.js
 * @Scripted by Prajakta Tatkare
 */

/*
 * Module dependencies
 */

var express = require('express');
var router = express.Router();
var cookie=require('cookie-parser')
var jwt = require('jsonwebtoken');
var conf = require('../Config/config.js');
var config=require('../Config/index.js')
var User = require('../Model/index.js');
var winston=require('winston');

router.post('/', function(req, res) { // post call for api signIn.js

      var result1 = {};
     result1.status = false;
      try {
      // validating email and password
    req.check(config.validationSchema.sign_in);

    req.getValidationResult().then(function(isValid) {
      try {

        if (!isValid.isEmpty()) {

          var errors = req.validationErrors()

          throw errors[0].msg;

        }

   User.login(req.body, function(err, result) {




       if (err) {
         winston.error("login failed");
           res.send({
               "status": false,
               "message": "login failed"

           });
       } else {
           if (result) {
             winston.info("logged in successfully");
             //generating token from user id
               var token = jwt.sign({
                   _id: result._id
               }, conf.TOKEN_SECRET, {
                   expiresIn: 60 * 60 * 24
               });
               // storing token in cookie
               res.cookie('cookie',token);
               res.send({
                   "status": true,
                   "message": "logged in Successfully",
                   "token": token,
                   "result":result
               })
           } else {
                 winston.error("Login failed");
               res.send({
                   "status": false,
                   "message": "login failed"

               });

           }
       }


   });
 } catch (e) {
       winston.error(e);
   result1.message="sorry server error";

     if (!config.checkSystemErrors(e)) {
       result1.status = false;
       result1.message = e;
     }
     res.send(result1);
     return;

   }
 });



    }catch (e) {
      res.send({"message":e});
      }


});




module.exports = router;
