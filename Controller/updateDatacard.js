/*
 * update card data
 * @path Controller/updateDatacard.js
 * @file updateDatacard.js
 * @Scripted by Prajakta Tatkare
 */

/*
 * Module dependencies
 */

var express = require('express');
var router = express.Router();
var User = require('../Model/dataCard.js');
var winston=require('winston');

router.post('/:id', function(req, res) { //post call for api updateDatacard.js
  try {
    var data_id=req.params.id;//fetching data card id from api url

    User.updateData(data_id,req.body, function(err, result) {


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
        winston.error(error);
    res.send({
            "status": false,
            "message": error


  })
  }

});
module.exports = router;
