/*
 * Connecting with google
 * @path Controller/google.js
 * @file google.js
 * @Scripted by Prajakta Tatkare
 */

/*
 * Module dependencies
 */

var express = require('express');
var router = express.Router();
var User = require('../Model/index.js');
var config=require('../Config/index.js');
var conf = require('../Config/config.js');

var winston=require('winston');

var async = require('async');
var bcrypt = require('bcryptjs');
var jwt = require('jsonwebtoken');

var moment = require('moment');
var mongoose = require('mongoose');
var request = require('request');

function createJWT(user) {

    return jwt.sign({
        _id: user
    }, conf.TOKEN_SECRET, {
        expiresIn: 60 * 60 * 24
    });
}


router.post('/', function(req, res) {
  try {
    var accessTokenUrl = 'https://accounts.google.com/o/oauth2/token';
    var peopleApiUrl = 'https://www.googleapis.com/plus/v1/people/me/openIdConnect';
    var params = {
        code: req.body.code,
        client_id: req.body.clientId,
        client_secret: conf.GOOGLE_SECRET,
        redirect_uri: req.body.redirectUri,
        grant_type: 'authorization_code'
    };
console.log("params",params);
    // Step 1. Exchange authorization code for access token.
    request.post(accessTokenUrl, {
        json: true,
        form: params
    }, function(err, response, token) {

        var accessToken = token.access_token;
        var headers = {
            Authorization: 'Bearer ' + accessToken
        };

        // Step 2. Retrieve profile information about the current user.
        request.get({
            url: peopleApiUrl,
            headers: headers,
            json: true
        }, function(err, response, profile) {
            if (profile.error) {
                return res.status(500).send({
                    message: profile.error.message
                });
            }
            // Step 3a. Link user accounts.
            if (req.header('Authorization')) {

                console.log("in google api",profile);
                User.findOne({
                    'social.google': profile.sub
                }, function(err, existingUser) {
                    if (existingUser) {
                        return res.status(409).send({
                            message: 'There is already a Google account that belongs to you'
                        });
                    }
                    var token = req.header('Authorization').split(' ')[1];
                    var payload =    jwt.verify(token, conf.TOKEN_SECRET)
                    User.findById(payload, function(err, user) {
                        if (!user) {
                            return res.status(400).send({
                                message: 'User not found'
                            });
                        }
                        user.socil.google = profile.sub;
                        user.social.picture = user.picture || profile.picture.replace('sz=50', 'sz=200');
                        user.social.displayName = user.displayName || profile.name;
                        user.social.gmail =profile.email;
                        var token = createJWT(user._id);
                        res.cookie("cookie",token);
                        user.save(function() {


                            res.send({
                                token: token
                            });
                        });

                    });
                });
            } else {

                // Step 3b. Create a new user account or return an existing one.
                User.findOne({
                    'social.google': profile.sub
                }, function(err, existingUser) {
                    if (existingUser) {
                      var token = createJWT(existingUser._id);
                      res.cookie("cookie",token);
                        return res.send({
                            token: token
                        });
                    }
                    var user = new User();

                    user.social.google = profile.sub;
                    user.social.picture = profile.picture.replace('sz=50', 'sz=200');
                    user.social.displayName = profile.name;
                    user.social.gmail =profile.email;
                    var token = createJWT(user._id);
                        res.cookie("cookie",token);
                    user.save(function(err) {

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

    });

  }



});
module.exports = router;
