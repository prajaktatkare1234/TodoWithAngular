var express = require('express');
var router = express.Router();
var User = require('../Model/dataCard.js');
var winston=require('winston');
// console.log("in get cardgfdgh;f'gldhd;'fglhd;gdf'");

router.post('/:id', function(req, res) {
    var data_id=req.params.id;
    console.log("asfsadf",req.body);
    User.select_color(data_id,req.body,function(err, result) {


      if(err){
          winston.error("failed to apply background colot to card");
        res.send({
                "status": false,
                "message": err


      })
    }
      else{
        winston.info("Giving background color to card");
        res.send({
                  "status": true,
                  "message": result,


      })
    }
});
});
module.exports = router;
