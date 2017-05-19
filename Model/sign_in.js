var mongoose = require('mongoose');
validators = require('mongoose-validators');
var crypto = require('crypto');
  algorithm = 'aes-256-ctr',
    password = 'd6F3Efeq';
console.log("in model");
var Schema = mongoose.Schema;

require('../Config/config.js');
var User = require('../Model/sign_up.js');


User.login = function(req, cb) {

    User.findOne({
        email: req.body.email
    }, function(err, User) {
        if (User) {
            console.log(User.password);
            var decrypt_data = decrypt(User.password);

            if (decrypt_data == req.body.password) {
                console.log(decrypt_data);
                cb(null, "valid User");
            } else {
                cb("Wrong password", null);
            }
        } else {
            console.log("err");
            cb("Invalid User", null);
        }

        function decrypt(pwd) {
            var decipher = crypto.createDecipher(algorithm, password)
            var dec = decipher.update(pwd, 'hex', 'utf8')
            dec += decipher.final('utf8');
            return dec;
        }

    });

}



module.exports = User;
// algorithm = 'aes-256-ctr',
// password = 'd6F3Efeq';
