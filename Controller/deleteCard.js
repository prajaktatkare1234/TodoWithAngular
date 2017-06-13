var express = require('express');
var router = express.Router();
var User = require('../Model/dataCard.js');
// console.log("in controller");
var winston=require('winston');


router.post('/:id',function(req, res) {
    var data_id=req.params.id;
    console.log("asfsadf",data_id);
    User.delete_data(data_id, function(err, result) {


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
});



module.exports = router;
