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

/**
 * router - authenticate the use
 *
 * @param  {Object} function(req
 * @param  {Object} res         Object having token
 * @param  {String} next        passes the token to userInfo api
 * @return {Object}             Object having success status as false
 */
router.use(function(req, res, next) {
  //fetching token stored in cookie
    var token = req.headers.cookie;
    try{

      token=token.substr(7);
      if (token) {


          jwt.verify(token, config.TOKEN_SECRET, function(err, decode)  //decoding jwt token

          {
              if (err) {
                  winston.error("Authentication failed");
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
          winston.error("token not found");
          return res.send({

              success: false,
              message: 'token not found'
          });
      }

    }
    catch(e){
          winston.error(e);
      return res.json({
        "success":false,
        "message":"login please"
      })

    }


});
module.exports = router;
