/*
 * Connecting with facebook
 * @path Controller/fb.js
 * @file fb.js
 * @Scripted by Prajakta Tatkare
 */

/*
 * Module dependencies
 */

var express = require('express');
var router = express.Router();
var User = require('../Model/index.js');
var config=require('../Config/index.js');
var winston=require('winston');
var conf = require('../Config/config.js');
var async = require('async');
var bcrypt = require('bcryptjs');
var bodyParser = require('body-parser');
var moment = require('moment');
var mongoose = require('mongoose');
var request = require('request');
var jwt = require('jsonwebtoken');




function createJWT(user) {
//generated token from user id
    return jwt.sign({
        _id: user
    }, conf.TOKEN_SECRET, {
        expiresIn: 60 * 60 * 24
    });
res.send({
            "status": false,
            "message": error


  })
}


router.post('/', function(req, res) {
  try {
    var fields = ['id', 'email', 'first_name', 'last_name', 'link', 'name'];
    var accessTokenUrl = 'https://graph.facebook.com/v2.5/oauth/access_token';
    var graphApiUrl = 'https://graph.facebook.com/v2.5/me?fields=' + fields.join(',');
    var params = {
        code: req.body.code,
        client_id: req.body.clientId,
        client_secret: conf.FACEBOOK_SECRET,
        redirect_uri: req.body.redirectUri
    };

    // Step 1. Exchange authorization code for access token.
    request.get({
        url: accessTokenUrl,
        qs: params,
        json: true
    }, function(err, response, accessToken) {
        if (response.statusCode !== 200) {
            return res.status(500).send({
                message: accessToken.error.message
            });
        }

        // Step 2. Retrieve profile information about the current user.
        request.get({

            url: graphApiUrl,
            qs: accessToken,
            json: true
        }, function(err, response, profile) {
            if (response.statusCode !== 200) {


                return res.status(500).send({
                    message: profile.error.message
                });
            }

            if (req.header('Authorization')) {
                  console.log("in Authorization");
                User.findOne({
                    'social.facebook': profile.id
                }, function(err, existingUser) {
                    if (existingUser) {
                      var token = createJWT(existingUser._id);
                          console.log(token,"token");
                      res.cookie("cookie",token);
                        return res.status(409).send({
                            message: 'There is already a Facebook account that belongs to you'
                        });
                    }
                    var token = req.header('Authorization').split(' ')[1];

                    console.log("tokendggadgd",token);
                    var payload =     jwt.verify(token, conf.TOKEN_SECRET)
                    console.log("payload",payload);
                    User.findById(payload, function(err, user) {
                        if (!user) {
                            return res.status(400).send({
                                message: 'User not found'
                            });
                        }
                        user.social.facebook = profile.id;
                        user.social.picture = user.picture || 'https://graph.facebook.com/v2.3/' + profile.id + '/picture?type=large';
                        user.social.displayName = user.displayName || profile.name;
                        user.social.fbemail=profile.email;
                        var token = createJWT(user._id);
                        console.log("token",token);
                        res.cookie("cookie",token);
                        user.save(function() {

                            res.send({

                                token: token
                            });
                        });
                    });
                });



            } else {

                // Step 3. Create a new user account or return an existing one.
                User.findOne({
                    'social.facebook': profile.id
                }, function(err, existingUser) {
                    if (existingUser) {
                        // var token = createJWT(existingUser);
                        var token = createJWT(existingUser._id);
                            console.log("token",token);
                        res.cookie("cookie",token);
                        return res.send({
                            token: token
                        });
                    }
                    var user = new User();
                    user.social.facebook = profile.id;
                    user.social.picture = 'https://graph.facebook.com/' + profile.id + '/picture?type=large';
                    user.social.displayName = profile.name;
                    user.social.fbemail=profile.email;
                    console.log("saving in else");
                    var token = createJWT(user._id);
                        console.log("token",token);
                    res.cookie("cookie",token);{}
                    console.log(user,"user");
                    user.save(function() {

                    res.send({
                            token: token
                        });
                    });
                });
            }
        });
    });

  } catch (error) {
    res.send({
            "status": false,
            "message": error


  })



  }

});
module.exports = router;
