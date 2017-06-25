var express = require('express');
var router = express.Router();

var jwt = require('jsonwebtoken');
var conf = require('../Config/config.js');
var config=require('../Config/index.js')
var User = require('../Model/index.js');
var winston=require('winston');

router.post('/', function(req, res) {
  try {
    User.getallUser(req.body, function(err, result) {



        if (err) {
          // winston.error("login failed");
            res.send({
                "status": false,
                "message": " failed to get users"

            });
        }
            if (result) {
              winston.info("successfully fetched users");




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


  } catch (error) {
    res.send({
        "status": false,
        "message": error

    });

  }



});




module.exports = router;
