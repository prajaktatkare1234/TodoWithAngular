/*
 * backGroung color for data card
 * @path Controller/bgColor.js
 * @file bgColor.js
 * @Scripted by Prajakta Tatkare
 */

/*
 * Module dependencies
 */

var express = require('express');
var router = express.Router();
var User = require('../Model/dataCard.js');
var winston=require('winston');

router.post('/:id', function(req, res) {
  try {
    var data_id=req.params.id;

    User.select_color(data_id,req.body,function(err, result) {


      if(err){
          winston.error("failed to apply background colot to card");
        res.send({
                "status": false,
                "message": err


      })
    }
      else{
        winston.info("Giving background color to card");
        res.send({
                  "status": true,
                  "message": result


      })
    }
});

  } catch (error){
    res.send({
            "status": false,
            "message": error


  })
  }

});
module.exports = router;
