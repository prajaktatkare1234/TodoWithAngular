var mongoose = require('mongoose');
validators = require('mongoose-validators');
var unique_val = require('mongoose-unique-validator');
var express = require('express');
// var app = express();
var crypto = require('crypto');
var jwt = require('jsonwebtoken');
var config = require('../Config/config.js');

// console.log("in model");
var Schema = mongoose.Schema;

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



userSchema.statics.save_user = function(req, cb) {
    var pwd = req.body.password;

    var encrypt = encrypt_data(pwd);
    var user_Detail = new this({
        'local.name': req.body.name,
        'local.email': req.body.email,
        'local.password': encrypt
    });


    user_Detail.save(cb);
};
function encrypt_data(pwd) {
    var cipher = crypto.createCipher(config.algorithm, config.password)
    var crypted = cipher.update(pwd, 'utf8', 'hex')
    crypted += cipher.final('hex');
    return crypted;
}
userSchema.statics.login = function(req, cb) {
var encPass =encrypt_data(req.password)
    this.findOne({
        'local.email': req.email,
        'local.password':encPass
    }, cb);
}
userSchema.statics.change_profile_pic = function(req,url,cb) {
  // console.log(data_id,"datajkhjk",req);
  // var d = new Date();
    this.update({
      'local.name': req.name
    }, {
        $set: {
        'local.profile_pic':url.profile_pic,
        'local.original_pic':url.original_pic

        }
    }, cb);
};

userSchema.statics.profile=function(req,cb){
    console.log("hjgsdf",req);
  this.findOne({_id:req._id},cb);
  //{
 //   if(user){
 //       res.send({"user_detail":user});
 //
 //   }
 //   else{
 //     res.send({message:"error"});
 //   }
 // })
}
userSchema.statics.resetPassword=function(req,cb){
    console.log("hjgsdf",req.email);

  this.findOne({'local.email':req.email},cb);

}
userSchema.statics.changePassword=function(req,email,cb){
console.log("in change password dksajldksgkldfgjfkdl",email);
  var encrypt = encrypt_data(req.password);
  console.log(encrypt);

  this.update({
    'local.email': email
  }, {
      $set: {
      'local.password':encrypt
      }
  }, cb);
}

var User = mongoose.model('User', userSchema);

module.exports = User;
