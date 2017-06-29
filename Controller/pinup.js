/*
 * pin and unpin data cards
 * @path Controller/pinup.js
 * @file pinup.js
 * @Scripted by Prajakta Tatkare
 */

/*
 * Module dependencies
 */

var express = require('express');
var router = express.Router();
var User = require('../Model/dataCard.js');
var winston=require('winston');

router.post('/:id', function(req, res) { //post call for api pinup.js
  try {
    var data_id=req.params.id; //fetching user id from api url

    User.pinned(data_id,req.body,function(err, result) {


      if(err){
        winston.error("failed to pin the card");
        res.send({
                "status": false,
                "message": err


      })
    }
      else{
          winston.info("pinned data card");
        res.send({
                  "status": true,
                  "message": "pinned",


      })
    }
});
  } catch (error) {
        winston.error(error);
    res.send({
        "status": false,
        "message": error

    });

  }
});
module.exports = router;
