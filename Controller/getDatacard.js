/*
 * Getting data cards
 * @path Controller/getDatacard.js
 * @file getDatacard.js
 * @Scripted by Prajakta Tatkare
 */

/*
 * Module dependencies
 */

var express = require('express');
var router = express.Router();
var winston=require('winston');
var User = require('../Model/dataCard.js');



router.post('/', function(req, res) { //post call for api getDatacard.js
  try {

    req.decode.isDeleted=false;
      User.getData(req.decode, function(err, result) {
  console.log("kfjdskljfasdk",result);
      if(result)
        {

          winston.info("Getting card data");
          res.send({"data_info":result,"status":true})
        }
        else
        {
          res.send({message:"err","status":false})
          // logger.error("error while getting data card");
        }





      });

  } catch (error) {
    res.send({
        "status": false,
        "message": error

    });
  }


  });





module.exports = router;
