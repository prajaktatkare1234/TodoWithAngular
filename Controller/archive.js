/*
 * Archive and unarchive data card
 * @path Controller/archive.js
 * @file archive.js
 * @Scripted by Prajakta Tatkare
 */

/*
 * Module dependencies
 */

var express = require('express');
var router = express.Router();
var User = require('../Model/dataCard.js');

router.post('/:id', function(req, res)  /* Post call for archive.js */
 {

  try {
    var data_id=req.params.id;

    User.mark_as_archived(data_id,req.body,function(err, result) {


      if(err){
        res.send({
                "status": false,
                "message": err


      })
    }
      else{
        res.send({
                  "status": true,
                  "message": "archived",


      })
    }
});

  } catch (error) {
    res.send({
              "status": true,
              "message": "error",


  })

  }


});
module.exports = router;
