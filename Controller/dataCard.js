/*
 * Adding data cards
 * @path Controller/dataCard.js
 * @file dataCard.js
 * @Scripted by Prajakta Tatkare
 */

/*
 * Module dependencies
 */


var express = require('express');
var router = express.Router();
var User = require('../Model/dataCard.js');
var winston=require('winston');


/**
 * router - Adds new data card
 *
 * @param  {type} '/'             description
 * @param  {Object} function(req  Object having title,note
 * @param  {Object} res           Object having data card detail
 */
router.post('/', function(req, res) {
  try {

      /**
       * User - UserSchema
       *
       * @param  {Object} req.body      Object having title and content
       * @param  {String} req.decode    userId fetched from cookie is passed here from authenticate middleware
       * @param  {Object} function(err  callback error
       * @param  {Object} result        Object having data card detials
       * @return {type}                 description
       */
      User.saveData(req.body, req.decode, function(err, result) {   //post call for dataCard.js



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



} catch (error) {
      winston.error(error);
    res.send({
        "status": false,
        "message":error

    });

  }


});





module.exports = router;
