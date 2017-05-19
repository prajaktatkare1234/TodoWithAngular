var mongoose = require('mongoose');

var mongoDB = 'mongodb://127.0.0.1/mydb';
mongoose.connect(mongoDB);

var db = mongoose.connection;

module.exports = {
    "secret": "inbridgelabz",
    "algorithm": 'aes-256-ctr',
    "password": 'd6F3Efeq'
};
