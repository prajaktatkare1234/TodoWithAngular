var express = require('express');
var router = express.Router();
var User = require('../Model/dataCard.js');
// console.log("in controller");

router.post('/:id', function(req, res) {
    var data_id=req.params.id;
    // console.log("req from front",req.body);
    console.log("updatFGHGFHGFDHu");
    User.update_data(data_id,req.body, function(err, result) {


      if(err){
        res.send({
                "status": false,
                "message": err


      })
    }
      else{
        res.send({
                  "status": true,
                  "message": result,


      })
    }
});
});
module.exports = router;
