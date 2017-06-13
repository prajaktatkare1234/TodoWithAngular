var express=require('express');
router=express.Router();
var User = require('../Model/index.js');
router.post('/',function(req,res){
var winston=require('winston');
  User.profile(req.decode,function(err,data){
    if(data)
    {
  winston.info("user info ");
    obj={
      user_id:data._id,
      name:data.name,
      email:data.email,
      profile_pic:data.profile_pic,
      original_pic:data.original_pic

    }
      res.send({"user_data":obj,"status":true})
    }
    else
    {
      winston.error("failed to get user info");
      res.send({message:"err","status":false})
    }

  })

});
module.exports=router;
