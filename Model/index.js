/*
 * userSchema
 * @path model/index.js
 * @file index.js
 */

/*
 * Module dependencies
 */

var mongoose = require('mongoose');
validators = require('mongoose-validators');
var unique_val = require('mongoose-unique-validator');
var express = require('express');
// var app = express();
var crypto = require('crypto');
var jwt = require('jsonwebtoken');
var config = require('../Config/config.js');

var Schema = mongoose.Schema;
/**
 * @schema userSchema
 * @description user details
 */
var userSchema = Schema({
    local:{
      name: {
          type: String,
          // required: true,
          validate: validators.isAlpha(),
          minlength: 2,
          maxlength: 8
      },
      email: {
          type: String,
          unique: true,
          // required: true,
          validate: validators.isEmail()
      },
      password: {
          type: String,
          // required: true,
          validate: validators.isAlphanumeric(),
          minlength: 5,
          // maxlength: 8
      },
      profile_pic:{
        type:String
      },
      original_pic:{
        type:String
      }

    },
    social:{
      displayName: String,
      picture: String,
      facebook: String,
      fbemail:String ,
      google: String,
      gmail:String
    }




});


/**
* create new user
* @return {Error} err
* @return {User} user
* @api For public
*/
userSchema.statics.saveUser = function(req, cb) {
  var pwd = req.body.password;

  var encrypt = encrypt_data(pwd);
  var user_Detail = new this({
    'local.name': req.body.name,
    'local.email': req.body.email,
    'local.password': encrypt
  });


  user_Detail.save(cb);
};

function encrypt_data(pwd) { //function to encrypt password
    var cipher = crypto.createCipher(config.algorithm, config.password)
    var crypted = cipher.update(pwd, 'utf8', 'hex')
    crypted += cipher.final('hex');
    return crypted;
}


/**
 * Find User by its email and password
 *
 * @param {String} email and password
 * @return {Error} err
 * @return {User} user
 * @api user
 */
userSchema.statics.login = function(req, cb) {
var encPass =encrypt_data(req.password)
    this.findOne({
        'local.email': req.email,
        'local.password':encPass
    }, cb);
};

/**
 * Setting profile pic for user
 *
 * @param {String} name
 * @return {Error} err
 * @return {User} user
 * @api user
 */
 userSchema.statics.changeProfilepic = function(req,url,cb) {
   this.update({
     'local.name': req.name
   }, {
     $set: {
       'local.profile_pic':url.profile_pic,
       'local.original_pic':url.original_pic

     }
   }, cb);
 };

/**
 * Find User by its id
 *
 * @param {String} id
 * @return {Error} err
 * @return {User} user
 * @api user
 */
 userSchema.statics.profile=function(req,cb){

   this.findOne({_id:req._id},cb);

 };

/**
 * Find User by its email
 *
 * @param {String} email
 * @return {Error} err
 * @return {User} user
 * @api user
 */
userSchema.statics.verifyEmail=function(req,cb){

  this.findOne({'local.email':req.email},cb);

};

/**
 * Find User by its email and change password
 *
 * @param {String} email
 * @return {Error} err
 * @return {User} user
 * @api user
 */
 userSchema.statics.changePassword=function(req,email,cb){
   var encrypt = encrypt_data(req.password);
   this.update({
     'local.email': email
   }, {
     $set: {
       'local.password':encrypt
     }
   }, cb);
 };



 /**
  * @description Expose `User` Model
  */

var User = mongoose.model('User', userSchema);

module.exports = User;
