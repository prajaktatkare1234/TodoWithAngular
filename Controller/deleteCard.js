/*
 * Adding data cards
 * @path Controller/deleteCard.js
 * @file deleteCard.js
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
 * router - Deletes data card
 *
 * @param  {String} '/:id'          id of data card
 * @param  {Object} function(req    Object having data card details
 * @param  {Object} res             Object having status and message
 * @return {type}                   description
 */
router.post('/:id',function(req, res) {  // post call for api delete.js
  try {
    var data_id=req.params.id; //fetching data card id from api url

    /**
     * User - description
     *
     * @param  {String} data_id      fetched data card id from api url
     * @param  {Object} req.body     Object having data card details
     * @param  {Object} function(err callback error
     * @param  {Object} result       Object having status and message
     * @return {type}                description     
     */
    User.deleteData(data_id,req.body, function(err, result) {


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

} catch (error) {
      winston.error(error);
    res.send({
              "status": true,
              "message": error


  });

  }

});



module.exports = router;
