var mongoose = require('mongoose');
// validators = require('mongoose-validators');
var express = require('express');

var Schema = mongoose.Schema;

var loggerSchema = Schema({
    userId: {
        type: String
    },

    message: {
        type: String

    },
    time:{
      type:Date
    }





});
loggerSchema.pre('save', function(next) {
  // get the current date
  var currentDate = new Date();


  // if created_at doesn't exist, add to that field
  if (!this.time)
    this.time = currentDate;

  next();
});
loggerSchema.statics.getLoggers = function(req,cb) {
  console.log(req);

    this.find({userId:req.userId},cb);

  }


var logger = mongoose.model('logger', loggerSchema);

module.exports = logger;
