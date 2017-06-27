/*
 * authenticating the user
 * @path Controller/authenticate.js
 * @file authenticate.js
 * @Scripted by Prajakta Tatkare
 */

/*
 * Module dependencies
 */

var express = require('express');
var router = express.Router();
var jwt = require("jsonwebtoken");
var config = require("../Config/config.js");


//middleware for authentication
router.use(function(req, res, next) {
  //fetching token stored in cookie
    var token = req.headers.cookie;
    try{
      console.log("in authen api",token);
      token=token.substr(7);
      if (token) {
          console.log("auth", token,config.TOKEN_SECRET);
          jwt.verify(token, config.TOKEN_SECRET, function(err, decode)  //decoding jwt token

          {
              if (err) {

                  return res.json({
                      success: false,
                      message: 'athentication failed'
                  });
              } else {

                    req.decode = decode;
                    next()

              }
          });
      } else {

          return res.send({
              success: false,
              message: 'token not found'
          });
      }

    }
    catch(e){
      return res.json({
        "success":false,
        "message":"login please"
      })

    }


});
module.exports = router;
