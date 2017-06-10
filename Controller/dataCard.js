var express = require('express');
var router = express.Router();
var User = require('../Model/dataCard.js');
// console.log("in controller");

router.post('/', function(req, res) {

    // console.log("req.decode", req.decode);
    User.save_data(req.body, req.decode, function(err, result) {



        if (err) {

            res.send({
                "status": false,
                "message": "data cant be Saved"

            });
        } else {
            if (result) {
                // console.log("r", result);



                res.send({
                    "status": true,
                    "message": "data saved  Successfully",

                })
            } else {
                res.send({
                    "status": false,
                    "message": "saving failed"

                });

            }
        }


    });

});





module.exports = router;
