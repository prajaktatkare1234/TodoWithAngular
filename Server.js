var express = require('express');
var app = express();
var morgan=require('morgan');

var bodyParser = require('body-parser');
var validator=require('express-validator');
var config=require('./Config/config.js');
var p = process.env.PORT || 8081
// app.use(cors());
app.use(morgan("dev"));
app.use(bodyParser.json({limit: '10mb'}));
app.use(bodyParser.urlencoded({extended:true,limit: '10mb'}));
app.use(express.static('./public'));
app.use(validator());
app.use(require('./Controller'));
var server = app.listen(p, function() {
    var host = server.address().address
    var port = server.address().port
    console.log("Example app listening at http://%s:%s", host, port)
});
