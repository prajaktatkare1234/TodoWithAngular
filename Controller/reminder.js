var express = require('express');
var router = express.Router();
var User = require('../Model/dataCard.js');
var winston=require('winston');


router.post('/:id', function(req, res) {
  try {
    var data_id=req.params.id;

    User.remind(data_id,req.body,function(err, result) {


      if(err){
        winston.error("failed to set reminder");
        res.send({
                "status": false,
                "message": err


      })
    }
      else{
        winston.info("reminder set Successfully");
        res.send({
                  "status": true,
                  "message": result,


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
