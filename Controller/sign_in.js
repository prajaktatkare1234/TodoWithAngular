var express = require('express');
var router = express.Router();
var cookie=require('cookie-parser')
var jwt = require('jsonwebtoken');
var conf = require('../Config/config.js');
var config=require('../Config/index.js')
var User = require('../Model/index.js');
// console.log("in controller");

router.post('/', function(req, res) {
  var result1 = {};
 result1.status = false;
  try {
    // console.log(config.validationSchema.sign_in);
     req.check(config.validationSchema.sign_in);
     req.getValidationResult().then(function(isValid) {
       try {
        //  console.log("hii");
         if (!isValid.isEmpty()) {
          //  console.log("err");
           var errors = req.validationErrors()
           // isValid = isValid.useFirstErrorOnly();
           throw errors[0].msg;

         }

    User.login(req.body, function(err, result) {

      console.log("loginsdfdsf",result);
    

        if (err) {

            res.send({
                "status": false,
                "message": "login failed"

            });
        } else {
            if (result) {
                // console.log("r", result);
                var token = jwt.sign({
                    _id: result._id
                }, conf.secret, {
                    expiresIn: 60 * 60 * 24
                });

                res.cookie('cookie',token);
                res.send({
                    "status": true,
                    "message": "logged in Successfully",
                    "token": token,
                    "result":result
                })
            } else {
                res.send({
                    "status": false,
                    "message": "login failed"

                });

            }
        }


    });
  } catch (e) {
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
}catch (e) {
  res.send({"message":e})
  }
})




module.exports = router;
