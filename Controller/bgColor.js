/*
 * backGround color for data card
 * @path Controller/bgColor.js
 * @file bgColor.js
 * @Scripted by Prajakta Tatkare
 */

/*
 * Module dependencies
 */

var express = require('express');
var router = express.Router();
var User = require('../Model/dataCard.js');
var winston=require('winston');

/**
 * router - applies background color to data card
 *
 * @param  {String} '/:id'       id of the data ccrad
 * @param  {Object} function(req object  having card color and userId
 * @param  {Object} res          Object having status and message
 */
router.post('/:id', function(req, res) {  //post call for bgColor.js
  try {
    //fetching data card id from api url
    var data_id=req.params.id;
    // call to selectColor function

    /**
     * User - description
     *
     * @param  {String} data_id      id of the data card
     * @param  {Object} req.body     Object having color and userId
     * @param  {Object} function(err call back error
     * @param  {Object} result       data card details
     */
    User.selectColor(data_id,req.body,function(err, result) {


      if(err){
          winston.error("failed to apply background color to card");
        res.send({
                "status": false,
                "message": err


      })
    }
      else{
        winston.info("Giving background color to card");
        res.send({
                  "status": true,
                  "message": result


      })
    }
});

  } catch (error){
        winston.error(error);



    res.send({
            "status": false,
            "message": error


  })
  }

});
module.exports = router;
