var express = require('express');
var router = express.Router();
var User = require('../Model/dataCard.js');
// console.log("in controller");
var winston=require('winston');

router.post('/:id',function(req, res) {
  try {
    var data_id=req.params.id;

    User.delete_reminder(data_id, req.body,function(err, result) {


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
