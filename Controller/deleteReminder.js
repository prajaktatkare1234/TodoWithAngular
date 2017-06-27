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

router.post('/:id',function(req, res) {  // post call for api deleteReminder.js
  try {
    var data_id=req.params.id; //fetching data from api url

    User.deleteReminder(data_id, req.body,function(err, result) {


      if(err){
        winston.error("reminder deleted Successfully");

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
    res.send({
            "status": false,
            "message": error


  })

  }

});
module.exports = router;
