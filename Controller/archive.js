/*
 * Archive and unarchive data card
 * @path Controller/archive.js
 * @file archive.js
 * @Scripted by Prajakta Tatkare
 */

/*
 * Module dependencies
 */

var express = require('express');
var router = express.Router();
var User = require('../Model/dataCard.js');



/**
 * router - marks the data card as archive
 *
 * @param  {String} '/:id'        id of data card
 * @param  {Object} function(req  object having values for archive and pin
 * @param  {Object} res           object having status and message
 * @return {type}
 */
router.post('/:id', function(req, res) {

    try {
        /* fetching data card id from  api url */
        var data_id = req.params.id;


        /**
         * User - UserSchema
         *
         * @param  {type} data_id      id of data card
         * @param  {type} req.body     object having values for archive and pin
         * @param  {type} function(err call back error
         * @param  {type} result       object having data card details
         * @return {type}
         */
        User.archived(data_id, req.body, function(err, result) {


            if (err) {
                winston.error("failed to archive data card");
                res.send({
                    "status": false,
                    "message": err


                })
            } else {
                res.send({
                    "status": true,
                    "message": "archived",


                })
            }
        });

    }


     catch (error) {
        winston.error(error);



        res.send({
            "status": true,
            "message": "error",


        })

    }


});
module.exports = router;
