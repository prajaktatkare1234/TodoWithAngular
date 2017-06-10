var express = require('express');
var router = express.Router();
var User = require('../Model/dataCard.js');
// console.log("in controller");

router.post('/:id',function(req, res) {
    var data_id=req.params.id;
    console.log("asfsadf",data_id);
    User.delete_reminder(data_id, function(err, result) {


      if(err){
        res.send({
                "status": false,
                "message": err


      })
    }
      else{
        res.send({
                  "status": true,
                  "message": "reminder set Successfully",


      })
    }

  });
});
module.exports = router;
