var express = require('express');
var router = express.Router();
var winston=require('winston');
var User = require('../Model/dataCard.js');



router.post('/', function(req, res) {

  req.decode.isDeleted=false;
    User.get_data(req.decode, function(err, result) {

    if(result)
      {

        winston.info("Getting card data");
        res.send({"data_info":result,"status":true})
      }
      else
      {
        res.send({message:"err","status":false})
        logger.error("error while getting data card");
      }





    });

  });





module.exports = router;
