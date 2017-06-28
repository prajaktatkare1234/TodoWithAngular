/*
 * loggerSchema
 * @path model/logger.js
 * @file logger.js
 */

/*
 * Module dependencies
 */
var mongoose = require('mongoose');
var express = require('express');

var Schema = mongoose.Schema;
/**
 * @schema loggerSchema
 * @description logger details
 */

var loggerSchema = Schema({
    userId: {
        type: String
    },

    message: {
        type: String

    },
    time:{
      type:Date
    },
    title:{
      type:String
    }

  });


  /**
  * Add time
  * @return {Error} err
  * @return {data} logger
  * @api For user
  */


loggerSchema.pre('save', function(next) {
  // get the current date
  var currentDate = new Date();
  // if created_at doesn't exist, add to that field
  if (!this.time)
  this.time = currentDate;

  next();
});


/**
* Get logger
*
* @return {Error} err
* @return {data} logger
* @api For user
*/

loggerSchema.statics.getLoggers = function(req,cb) {
  console.log(req);

    this.find({userId:req.userId},cb);

  }


var logger = mongoose.model('logger', loggerSchema);

module.exports = logger;
