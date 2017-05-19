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
    name: {
        type: String,
        required: true,
        validate: validators.isAlpha(),
        minlength: 2,
        maxlength: 8
    },
    email: {
        type: String,
        unique: true,
        required: true,
        validate: validators.isEmail()
    },
    password: {
        type: String,
        required: true,
        validate: validators.isAlphanumeric(),
        minlength: 5,
        // maxlength: 8
    }
});
userSchema.plugin(unique_val);



userSchema.statics.save_user = function(req, cb) {
    var pwd = req.body.password;

    var encrypt = encrypt_data(pwd);
    var user_Detail = new this({
        name: req.body.name,
        email: req.body.email,
        password: encrypt
    });
    // user_Detail.save(function(err) {
    //     if (err)
    //         cb(err, null);
    //     else
    //         cb(null, "Saved");
    // });



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
        email: req.email,
        password:encPass
    }, cb);
}
userSchema.statics.profile=function(req,cb){
    // console.log("hjgsdf");
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

var User = mongoose.model('User', userSchema);

module.exports = User;
