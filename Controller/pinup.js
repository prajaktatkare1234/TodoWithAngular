var express = require('express');
var router = express.Router();
var User = require('../Model/data_card.js');
console.log("in get cardgfdgh;f'gldhd;'fglhd;gdf'");

router.post('/:id', function(req, res) {
    var data_id=req.params.id;
    console.log("asfsadf",req.body);
    User.pinned(data_id,req.body,function(err, result) {


      if(err){
        res.send({
                "status": false,
                "message": err


      })
    }
      else{
        res.send({
                  "status": true,
                  "message": "pinned",


      })
    }
});
});
module.exports = router;
