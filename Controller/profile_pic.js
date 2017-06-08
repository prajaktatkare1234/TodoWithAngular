var express = require('express');
var router = express.Router();
var User = require('../Model/index.js');
var fs=require("fs");
// console.log("in controller");

router.post('/', function(req, res) {
  // console.log(req.body);
  console.log("ghfhgjfhgfhk");
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

            res.send({
                "status": false,
                "message": "data cant be Saved"

            });
        } else {
            if (result) {
                // console.log("r", result);



                res.send({
                    "status": true,
                    "message": "data saved  Successfully",

                })
            } else {
                res.send({
                    "status": false,
                    "message": "saving failed"

                });

            }
        }


    });

});





module.exports = router;
