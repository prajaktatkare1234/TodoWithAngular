var express=require('express');
router=express.Router();
var User = require('../Model/index.js');
router.post('/',function(req,res){
  console.log("req",req.body);
var winston=require('winston');
  User.profile(req.decode,function(err,data){
    if(data)
    {
      console.log("in user",data);
  winston.info("user info ");
    obj={
      user_id:data._id,
      name:data.name,
      email:data.email,
      profile_pic:data.profile_pic,
      original_pic:data.original_pic

    }
      res.send({"user_data":data,"status":true})
    }
    else
    {
      console.log("in else of userInfo");
      winston.error("failed to get user info");
      res.send({message:"err","status":false})
    }

  })

});
module.exports=router;
