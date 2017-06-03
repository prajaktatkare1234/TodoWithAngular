var mongoose = require('mongoose');
// validators = require('mongoose-validators');
var express = require('express');

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
    archive:{
      type:Boolean
    },
    pinned:{
      type:Boolean
    }



});
var data_card_detail;
data_card_Schema.statics.save_data = function(req,d_no, cb) {
  var d = new Date();
    data_card_detail = new this({
        d_no:d_no._id,
        title:req.title,
        take_note:req.take_note,
        created:d,
        updated:d,
        bgcolor:req.bgcolor

    });

    data_card_detail.save(cb);
};
data_card_Schema.statics.update_data = function(data_id,req,cb) {
  console.log(data_id,"datajkhjkhl");
  var d = new Date();
    this.update({
        _id: req._id
    }, {
        $set: {
            take_note: req.take_note,
            title:req.title,
            updated:d
        }
    }, cb);
};
data_card_Schema.statics.remind = function(data_id,req,cb) {
  console.log(data_id,"datajkhjk",req);
  var d = new Date();
    this.update({
        _id: data_id
    }, {
        $set: {
        remind_at:req.remind_at
        }
    }, cb);
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
};
data_card_Schema.statics.mark_as_archived = function(data_id,cb) {
  // console.log(data_id,"datajkhjk",req);
  // var d = new Date();
    this.update({
        _id: data_id
    }, {
        $set: {
        archive:true
        }
    }, cb);
};
data_card_Schema.statics.pinned = function(data_id,req,cb) {
  // console.log(data_id,"datajkhjk",req);
  console.log(req);
    this.update({
        _id: data_id
    }, {
        $set: {
        pinned:req.value
        }
    }, cb);
};




data_card_Schema.statics.delete_reminder = function(data_id, cb) {
    // console.log(req);
    this.update({
        _id: data_id
    }, {
        $unset: {
        remind_at:""
        }
    }, cb);

};
data_card_Schema.statics.delete_data = function(data_id, cb) {


        this.remove({_id:data_id},cb)

};
data_card_Schema.statics.get_data = function(req, cb) {
    // console.log(req._id,"in get function");
    this.find({d_no:req._id},cb);
};


var data_card = mongoose.model('data_card', data_card_Schema);

module.exports = data_card;
