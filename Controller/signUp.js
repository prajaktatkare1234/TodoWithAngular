var express = require('express');
var app = express();
var router = express.Router();
var User = require('../Model/index.js');
var config=require('../Config/index.js')
var winston=require('winston');
var jwt = require('jsonwebtoken');
var conf = require('../Config/config.js');




router.post('/', function(req, res) {
// console.log("updation",req.body.updation);

  // console.log("email",email);
  // console.log("updation",email,req.body.updation);

  if(req.body.updation!=="change")
  {
    console.log("old");
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


  }
  else{
    var token = req.headers.cookie;
    token=token.substr(7);
    console.log("token",token);
  var email;
  jwt.verify(token, conf.TOKEN_SECRET,function(err,decoded){
    // console.log("err",err,"decoded",decoded);
    email=decoded.email;
    console.log("check dhdsfkjghdfjkshgjkfdslghjfkd",email);
    console.log("in change password",req.body);
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


});






module.exports = router;
