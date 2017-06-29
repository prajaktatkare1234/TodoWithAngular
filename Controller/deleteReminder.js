/*
 * Removing reminder
 * @path Controller/deleteReminder.js
 * @file deleteReminder.js
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
 * router - Delete Reminder
 *
 * @param  {String} '/:id'       id of data card
 * @param  {Object} function(req Object having data card details
 * @param  {type} res            Object having status and message
 */
router.post('/:id',function(req, res) {  // post call for api deleteReminder.js
  try {
    var data_id=req.params.id; //fetching data from api url

    /**
     * User - UserSchema
     *
     * @param  {String} data_id      id of data card
     * @param  {Object} req.body     Object having data card details
     * @param  {Object} function(err callback error
     * @param  {Object} result       Object having status and message   

     */
    User.deleteReminder(data_id, req.body,function(err, result) {


      if(err){
        winston.info("reminder deleted Successfully");

        res.send({
                "status": false,
                "message": err


      })
    }
      else{
          winston.error("failed to delete reminder");
        res.send({
                  "status": true,
                  "message": "reminder deleted Successfully",


      })
    }

  });

} catch (error) {
      winston.error(error);
    res.send({
            "status": false,
            "message": error


  })

  }

});
module.exports = router;
