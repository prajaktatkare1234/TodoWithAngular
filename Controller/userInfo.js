/*
 * getting user information
 * @path Controller/userInfo.js
 * @file userInfo.js
 * @Scripted by Prajakta Tatkare
 */

/*
 * Module dependencies
 */

var express=require('express');
router=express.Router();
var User = require('../Model/index.js');
var winston=require('winston');

router.post('/',function(req,res){ //post call for api userInfo.js
  try {
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
        res.send({"user_data":data,"status":true})
      }
      else
      {

        winston.error("failed to get user info");
        res.send({message:"err","status":false})
      }

    })


  } catch (error) {
        winston.error(error);
    res.send({message:error,"status":false})
  }


});
module.exports=router;
