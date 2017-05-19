var express = require('express');

var router = express.Router();
var jwt = require("jsonwebtoken");
var config = require("../Config/config.js");

router.use(function(req, res, next) {
    var token = req.headers.cookie;
// console.log(req.headers.cookie,"in auth");
    try{
      // console.log(token);
      token=token.substr(7);

    }
    catch(e){
      return res.json({
        "success":false,
        "message":"login please"
      })

    }

    if (token) {
        console.log("auth", token,config.secret);
        jwt.verify(token, config.secret, function(err, decode) {
            if (err) {
                // console.log("failed",token);

                return res.json({
                    success: false,
                    message: 'athentication failed'
                });
            } else {
                // console.log(req.decode);
                req.decode = decode;
                // console.log(req.decode);

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
