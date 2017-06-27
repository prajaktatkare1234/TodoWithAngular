var mongoose = require('mongoose');

var mongoDB = 'mongodb://127.0.0.1/mydb';
mongoose.connect(mongoDB);//Connecting with mongoDB

var db = mongoose.connection;
//exporting secret keys
module.exports = {
    "secret": "inbridgelabz",
    /*for password encryption*/
    "algorithm": 'aes-256-ctr',
    "password": 'd6F3Efeq',
    /*secret key for facebook login*/
    "FACEBOOK_SECRET": process.env.FACEBOOK_SECRET || 'c7a432c1540b121a7a80583a8f7fed75',
     /*secret key for jwt token*/
    "TOKEN_SECRET":'YOUR_UNIQUE_JWT_TOKEN_SECRET',
    /*secret key for google login*/
    "GOOGLE_SECRET": process.env.GOOGLE_SECRET || 'ARyzO8XBWhhi90v9Bj8gYizQ'

};
