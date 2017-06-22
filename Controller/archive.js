var express = require('express');
var router = express.Router();
var User = require('../Model/dataCard.js');

router.post('/:id', function(req, res) {
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
});
module.exports = router;
