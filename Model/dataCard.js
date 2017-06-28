/*
 * dataSchema
 * @path model/dataCard.js
 * @file dataCard.js
 */

/*
 * Module dependencies
 */
var mongoose = require('mongoose');
var express = require('express');
var logger=require("./logger.js")

var Schema = mongoose.Schema;
/**
 * @schema DataSchema
 * @description data note contents
 */

var datacardSchema = Schema({

    d_no: {
        type: String
    },

    title: {
        type: String

    },
    take_note:{
      type:String
    },
    created:{
      type:Date
    },
    updated:{
      type:Date
    },
    remind_at:{
      type:Date

    },
    bgcolor:{
      type:String
    },
    isArchived:{
      type:Boolean,
      default:false
    },
    pinned:{
      type:Boolean,
      default:false
    },
    isDeleted:{
      type:Boolean,
      default:false
    }





});
var datacardSchema;
/**
* Add data card
* @param {String} userId
* @return {Error} err
* @return {data} data card
* @api For user
*/


datacardSchema.statics.saveData = function(req,userId, cb) {
  var currDate = new Date();
    data_card_detail = new this({
        d_no:userId._id,
        title:req.title,
        take_note:req.take_note,
        created:currDate,
        updated:currDate,
        bgcolor:req.bgcolor

    });
    data_card_detail.save(cb);
    // saving userId and activity message in loggerSchema
    var loggerDetail= new logger({
      userId:userId._id,
      message:"new card added",
      title:req.title
    });
    loggerDetail.save();


};


/**
* Update data card
* @param {String} dataId
* @return {Error} err
* @return {data} data card
* @api For user
*/

datacardSchema.statics.updateData = function(dataId,req,cb) {

  var currDate = new Date();
    this.update({
        _id: req._id,
        isDeleted:false
    }, {
        $set: {
            take_note: req.take_note,
            title:req.title,
            updated:currDate
        }
    }, cb);
      // saving userId and activity message in loggerSchema
    var loggerDetail= new logger({
      userId:req.userId,
      message:" card updated",
      title:req.title
    });
    loggerDetail.save();
};

/**
* set Reminder
* @param {String} dataId
* @return {Error} err
* @return {data} data card
* @api For user
*/

datacardSchema.statics.remind = function(dataId,req,cb) {
  // var currDate= new Date();
  this.update({
    _id: dataId
  }, {
    $set: {
      remind_at:req.remind_at
    }
  }, cb);
  // saving userId and activity message in loggerSchema
  var loggerDetail= new logger({
    userId:req.userId,
    message:"reminder is set ",
    title:req.title

  });
  loggerDetail.save();
};


/**
* set background color
* @param {String} dataId
* @return {Error} err
* @return {data} data card
* @api For user
*/

datacardSchema.statics.selectColor = function(dataId,req,cb) {
  this.update({
    _id: dataId
  }, {
    $set: {
      bgcolor:req.bgcolor,

    }
  }, cb);
  // saving userId and activity message in loggerSchema
  var loggerDetail= new logger({
    userId:req.userId,
    message:" background color set",
    title:req.title
  });
  loggerDetail.save();
};


/**
* Archive data card
* @param {String} dataId
* @return {Error} err
* @return {data} data card
* @api For user
*/


datacardSchema.statics.archived = function(dataId,req,cb) {

if(req.archive=="true"){
  message="card is archived";
}
else
  {
    message="card is unarchived";

  }
    this.update({
        _id: dataId
    }, {
        $set: {
        isArchived:req.archive,
        pinned:req.pinned
        }
    }, cb);
  // saving userId and activity message in loggerSchema
    var loggerDetail= new logger({
      userId:req.userId,
      "message":message,
      title:req.title
    });
    loggerDetail.save();
};

/**
* Pin data card
* @param {String} dataId
* @return {Error} err
* @return {data} data card
* @api For user
*/

datacardSchema.statics.pinned = function(dataId,req,cb) {
  if(req.pin=="true"){
    message="card is pinned";
  }
  else
    {
      message="card is unpinned";
      }

    this.update({
        _id: dataId
    }, {
        $set: {
        pinned:req.pin,
        isArchived:req.archive
        }
    }, cb);
    // saving userId and activity message in loggerSchema
    var loggerDetail= new logger({
      userId:req.userId,
      "message":message,
      title:req.title
    });
    loggerDetail.save();
  };




/**
* Delete Reminder
* @param {String} dataId
* @return {Error} err
* @return {data} data card
* @api For user
*/


datacardSchema.statics.deleteReminder = function(dataId,req, cb) {
    this.update({
        _id: dataId
    }, {
        $unset: {
        remind_at:""
        }
    }, cb);
    // saving userId and activity message in loggerSchema
    var loggerDetail= new logger({
      userId:req.userId,
      "message":"reminder deleted",
      title:req.title
    });
    loggerDetail.save();
  };





/**
* Delete data card
* @param {String} dataId
* @return {Error} err
* @return {data} data card
* @api For user
*/

datacardSchema.statics.deleteData = function(dataId,req, cb) {
  var message;
if(req.delete=='delete')
{
  message="data deleted permanently";
   this.remove({_id:dataId},cb)
}
else if(req.delete=='restore')
{
  message="data card restored";
  this.update({
      _id: dataId

  }, {
      $set: {
      isDeleted:false,
      pinned:false,
      reminder:false,
      isArchive:true


      }
  }, cb);

}
else{
  message="data deleted";

  this.update({
      _id: dataId

  }, {
      $set: {
      isDeleted:true,
      pinned:false,
      reminder:false
    }
  }, cb);
}
// saving userId and activity message in loggerSchema
var loggerDetail= new logger({
  userId:req.userId,
  "message":message,
  title:req.title
});
loggerDetail.save();
};



/**
* Get data cards
*
* @return {Error} err
* @return {data} data card
* @api For user
*/

datacardSchema.statics.getData = function(req, cb) {
    this.find({d_no:req._id},cb);
};


var data_card = mongoose.model('data_card', datacardSchema);

module.exports = data_card;
