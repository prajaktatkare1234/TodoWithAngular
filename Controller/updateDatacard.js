var express = require('express');
var router = express.Router();
var User = require('../Model/dataCard.js');
var winston=require('winston');

router.post('/:id', function(req, res) {
  try {
    var data_id=req.params.id;

    User.update_data(data_id,req.body, function(err, result) {


      if(err){
        winston.error("failed to update data card");
        res.send({
                "status": false,
                "message": err


      })
    }
      else{
          winston.info("updated data card successfully");
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
