var express = require('express');
var router = express.Router();
var User = require('../Model/data_card.js');
// console.log("in controller");

router.post('/:id',function(req, res) {
    var data_id=req.params.id;
    console.log("asfsadf",data_id);
    User.delete_data(data_id, function(err, result) {


      if(err){
        res.send({
                "status": false,
                "message": err


      })
    }
      else{
        res.send({
                  "status": true,
                  "message": "data deleted Successfully",


      })
    }

  });
});



module.exports = router;
