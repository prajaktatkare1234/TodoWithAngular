var express = require('express');

var router = express.Router();
var jwt = require("jsonwebtoken");
// var jwt = require('jwt-simple');

var config = require("../Config/config.js");

router.use(function(req, res, next) {
    var token = req.headers.cookie;
// console.log(req.headers.cookie,"in auth");
    try{
      console.log("in authen api",token);
      token=token.substr(7);

    }
    catch(e){
      return res.json({
        "success":false,
        "message":"login please"
      })

    }

    if (token) {
        console.log("auth", token,config.TOKEN_SECRET);
        jwt.verify(token, config.TOKEN_SECRET, function(err, decode)
        //  jwt.decode(token, conf.TOKEN_SECRET,function(err,decode)
        {
            if (err) {
                // console.log("failed",token);

                return res.json({
                    success: false,
                    message: 'athentication failed'
                });
            } else {

                  req.decode = decode;
            console.log(req.decode,"decoded");

                // return res.json({ success: false,message:req.decode});
                next();
            }
        });
    } else {
        return res.send({
            success: false,
            message: 'token not found'
        });
    }
});
module.exports = router;

// req.body.token || req.query.token ||
