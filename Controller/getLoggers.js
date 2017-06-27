/*
 * Adding activity logger
 * @path Controller/getLoggers.js
 * @file Logger.js
 * @Scripted by Prajakta Tatkare
 */

/*
 * Module dependencies
 */

var express = require('express');
var router = express.Router();


var conf = require('../Config/config.js');
var config=require('../Config/index.js')
var User = require('../Model/index.js');
var winston=require('winston');
var logger= require('../Model/logger.js')

router.post('/', function(req, res) { //post call for api getLoggers.js

  try {
    logger.getLoggers(req.body, function(err, result) {



        if (err) {
          winston.error("login failed");
            res.send({
                "status": false,
                "message": " failed to get loggers"

            });
        }
            if (result) {
              winston.info("successfully fetched activities");




                res.send({
                    "status": true,

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
