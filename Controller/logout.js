var express=require('express');
router=express.Router();
var winston=require('winston');

router.post('/',function(req,res){
  try {
    res.clearCookie('cookie');
    winston.info("logged out Successfully");
    res.send({"status":false,"message":"logged out"});

  } catch (error) {
    res.send({
        "status": false,
        "message": error

    });
  }



});
module.exports=router;
