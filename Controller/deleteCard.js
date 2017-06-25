var express = require('express');
var router = express.Router();
var User = require('../Model/dataCard.js');
var winston=require('winston');


router.post('/:id',function(req, res) {
  try {
    var data_id=req.params.id;

    User.delete_data(data_id,req.body, function(err, result) {


      if(err){
            winston.error("failed to delete data card");
        res.send({
                "status": false,
                "message": err


      })
    }
      else{
          winston.info("data card deleted Successfully");

        res.send({
                  "status": true,
                  "message": "data deleted Successfully",


      })
    }

  });

} catch (error) {
    res.send({
              "status": true,
              "message": error


  });

  }

});



module.exports = router;
