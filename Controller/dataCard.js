var express = require('express');
var router = express.Router();
var User = require('../Model/dataCard.js');
// console.log("in controller");
var winston=require('winston');


router.post('/', function(req, res) {

    // console.log("req.decode", req.decode);
    User.save_data(req.body, req.decode, function(err, result) {



        if (err) {
          winston.error("failed to save data card");
            res.send({

                "status": false,
                "message": "data cant be Saved"

            });
        } else {
            if (result) {
                // console.log("r", result);


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

});





module.exports = router;
