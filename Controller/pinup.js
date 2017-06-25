var express = require('express');
var router = express.Router();
var User = require('../Model/dataCard.js');
var winston=require('winston');

router.post('/:id', function(req, res) {
  try {
    var data_id=req.params.id;

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
    res.send({
        "status": false,
        "message": error

    });

  }
});
module.exports = router;
