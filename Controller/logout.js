var express=require('express');
router=express.Router();
var winston=require('winston');

router.post('/',function(req,res){
  // console.log(req.decode);
  res.clearCookie('cookie');
  winston.info("logged out Successfully");
  res.send({"status":false,"message":"logged out"});



});
module.exports=router;
