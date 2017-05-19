var express=require('express');
router=express.Router();
var User = require('../Model/index.js');
router.post('/',function(req,res){
// console.log("user_info");
  User.profile(req.decode,function(err,data){
    if(data)
    {
    console.log("in user_info",data);
    obj={
      user_id:data._id,
      name:data.name,
      email:data.email
    }
      res.send({"user_data":obj,"status":true})
    }
    else
    {
      res.send({message:"err","status":false})
    }

  })

});
module.exports=router;
