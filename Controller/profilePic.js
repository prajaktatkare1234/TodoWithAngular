var express = require('express');
var router = express.Router();
var User = require('../Model/index.js');
var fs=require("fs");
var winston=require('winston');


router.post('/', function(req, res) {
try {
  var save=function(pic_name,pic){
    fs.writeFile('public/profile_pic/'+pic_name, pic, {
      encoding: 'base64'
    }, function(err) {
      if (err) {
        console.log('error');
      } else {
        console.log('File created');
      }
    });
  }
  var croped_image = req.body.croped_image.replace(/^data:image\/png;base64,/g, "");
  var big_image=req.body.big_image.replace(/^data:image\/(png|jpeg);base64,/g, "");
  var crop=req.body.name+"_crop.png";
  var original=req.body.name+"_original.jpeg";
    save(original,big_image);
    save(crop,croped_image);

    var url= '/profile_pic/'+crop;
    var  url_object={
      profile_pic:'/profile_pic/'+crop,
      original_pic:'/profile_pic/'+original,
    }
    console.log(url);
    User.change_profile_pic(req.body, url_object, function(err, result) {



        if (err) {
  winston.error("failed to upload profile pic");
            res.send({

                "status": false,
                "message": " pic not uploaded"

            });
        } else {
            if (result) {
                winston.info("uploaded profile pic successfully" );

                res.send({
                    "status": true,
                    "message": "pic uploaded successfully",

                })
            } else {
                winston.error("failed to upload profile pic");
                res.send({
                    "status": false,
                    "message": "pic not uploaded"

                });

            }
        }


    });


} catch (error) {
  res.send({
      "status": false,
      "message": error

  });
}

});





module.exports = router;
