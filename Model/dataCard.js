var mongoose = require('mongoose');
// validators = require('mongoose-validators');
var express = require('express');
var logger=require("./logger.js")
// console.log("datcard",logger);
var Schema = mongoose.Schema;

var data_card_Schema = Schema({

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
      type:Boolean
    },
    pinned:{
      type:Boolean
    },
    isDeleted:{
      type:Boolean,
      default:false
    },
    isCollaborated:{
      type:Boolean,
      default:false
    },
    collabWith:{
      type:String
    }




});
var data_card_detail;
data_card_Schema.statics.save_data = function(req,d_no, cb) {
  var date = new Date();
    data_card_detail = new this({
        d_no:d_no._id,
        title:req.title,
        take_note:req.take_note,
        created:date,
        updated:date,
        bgcolor:req.bgcolor

    });

    data_card_detail.save(cb);
    var loggerDetail= new logger({
      userId:d_no._id,
      message:"new card added"
    });
    loggerDetail.save();
};

data_card_Schema.statics.shareNote = function(req, cb) {
  // var date = new Date();
  console.log("userid",req.id);
    data_card_detail = new this({
        d_no:req.id,
        title:req.title,
        take_note:req.take_note,
        isCollaborated:true,
        collabWith:req.collabWith

    });

    data_card_detail.save(cb);

};
data_card_Schema.statics.update_data = function(data_id,req,cb) {

  var d = new Date();
    this.update({
        _id: req._id,
        isDeleted:false
    }, {
        $set: {
            take_note: req.take_note,
            title:req.title,
            updated:d
        }
    }, cb);
    var loggerDetail= new logger({
      userId:req.userId,
      message:" card updated"
    });
    loggerDetail.save();
};
data_card_Schema.statics.remind = function(data_id,req,cb) {

  var d = new Date();
    this.update({
        _id: data_id
    }, {
        $set: {
        remind_at:req.remind_at
        }
    }, cb);
    var loggerDetail= new logger({
      userId:req.userId,
      message:"reminder is set "
    });
    loggerDetail.save();
};

data_card_Schema.statics.select_color = function(data_id,req,cb) {
  console.log(data_id,"datajkhjk",req);
  // var d = new Date();
    this.update({
        _id: data_id
    }, {
        $set: {
        bgcolor:req.bgcolor
        }
    }, cb);
    var loggerDetail= new logger({
      userId:req.userId,
      message:" background color set"
    });
    loggerDetail.save();
};
data_card_Schema.statics.mark_as_archived = function(data_id,req,cb) {
  console.log(data_id,"datajkhjk",req.archive);
  // var d = new Date();
// var message;
// console.log(req);
if(req.archive=="true"){
  // console.log("archive",req.archive);
  message="card is archived";
}
else
  {
    // console.log("unarchive",req.archive);
    message="card is unarchived";
  }
    this.update({
        _id: data_id
    }, {
        $set: {
        isArchived:req.archive,
        pinned:req.pinned
        }
    }, cb);

console.log("message",message);
    var loggerDetail= new logger({
      userId:req.userId,
      "message":message
    });
    loggerDetail.save();
};
data_card_Schema.statics.pinned = function(data_id,req,cb) {
  // console.log(data_id,"datajkhjk",req);
  // console.log(req);
  if(req.pin=="true"){
    // console.log("archive",req.archive);
    message="card is pinned";
  }
  else
    {
      // console.log("unarchive",req.archive);
      message="card is unpinned";
    }

    this.update({
        _id: data_id
    }, {
        $set: {
        pinned:req.pin,
        isArchived:req.archive
        }
    }, cb);
    var loggerDetail= new logger({
      userId:req.userId,
      "message":message
    });
    loggerDetail.save();
// };
};




data_card_Schema.statics.delete_reminder = function(data_id,req, cb) {
    // console.log(req);
    this.update({
        _id: data_id
    }, {
        $unset: {
        remind_at:""
        }
    }, cb);
    var loggerDetail= new logger({
      userId:req.userId,
      "message":"reminder deleted"
    });
    loggerDetail.save();


};
data_card_Schema.statics.delete_data = function(data_id,req, cb) {
  var message;
if(req.delete=='delete')
{
  message="data deleted permanently";
  console.log("permanent delete");
   this.remove({_id:data_id},cb)
}
else if(req.delete=='restore')
{
  message="data card restored";
  console.log("restore");
  this.update({
      _id: data_id

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
      _id: data_id

  }, {
      $set: {
      isDeleted:true,
      pinned:false,
      reminder:false


      }
  }, cb);


}
var loggerDetail= new logger({
  userId:req.userId,
  "message":message
});
loggerDetail.save();


};
data_card_Schema.statics.get_data = function(req, cb) {
console.log("get data",req);
    this.find({d_no:req._id},cb);
};


var data_card = mongoose.model('data_card', data_card_Schema);

module.exports = data_card;
