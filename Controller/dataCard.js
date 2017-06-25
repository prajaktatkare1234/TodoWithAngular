var express = require('express');
var router = express.Router();
var User = require('../Model/dataCard.js');
// console.log("in controller");
var winston=require('winston');


router.post('/', function(req, res) {
  try {
    if(req.body.col!=="col")
    {
      User.save_data(req.body, req.decode, function(err, result) {



        if (err) {
          winston.error("failed to save data card");
            res.send({

                "status": false,
                "message": "data cant be Saved"

            });
        } else {
            if (result) {



                winston.info(" data card saved Successfully");
                res.send({
                    "status": true,
                    "message": "data saved  Successfully",

                })
            } else {
                winston.error("failed to save data card");
                res.send({
                    "status": false,
                    "message": "saving failed"

                });

            }
        }


    });
  }
  else{
    User.shareNote(req.body, function(err, result) {



        if (err) {
          // winston.error("login failed");
            res.send({
                "status": false,
                "message": " failed to collaborate"

            });
        }
            if (result) {
              winston.info("successfully collaborated");




                res.send({
                    "status": true,
                    // "message": "logged in Successfully",
                    // "token": token,
                    "result":result
                })
            } else {
                res.send({
                    "status": false,
                    "message": "login failed"

                });

            }


    });
  }


} catch (error) {
    res.send({
        "status": false,
        "message":error

    });

  }


});





module.exports = router;
