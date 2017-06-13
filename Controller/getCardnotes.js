var express = require('express');
var router = express.Router();
var User = require('../Model/dataCard.js');


router.post('/:id', function(req, res) {
    var data_id=req.params.id;

    User.card_notes(data_id, function(err, result) {


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
