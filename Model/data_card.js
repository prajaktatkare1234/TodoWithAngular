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
    }


});
var data_card_detail;
data_card_Schema.statics.save_data = function(req,d_no, cb) {
  // console.log("in save function cxvgfdg");
    // console.log(req);
    // console.log(d_no);
    // console.log("completed");
    data_card_detail = new this({
        d_no:d_no._id,
        title:req.title,
        take_note:req.take_note

    });

    data_card_detail.save(cb);
};
data_card_Schema.statics.update_data = function(data_id,req,cb) {

    this.update({
        _id: req._id
    }, {
        $set: {
            take_note: req.take_note,
            title:req.title
        }
    }, cb);
};

data_card_Schema.statics.card_notes = function(data_id, cb) {
    // console.log(req);
    this.find({_id:data_id},cb);

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
