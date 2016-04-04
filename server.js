var express = require('express');
var request = require('request');
//var bingApi = require('node-bing-api')({accKey: "ZT6UwwHmcPqetCdc6nO9+16rjz5iNa/9izs7sxGO1io"});
var app = express();
var bodyParser = require('body-parser');
var multer = require('multer');
var mongoose = require('mongoose');

var dbName = 'insidethegame';
var connectString = 'mongodb://127.0.0.1:27017/' + dbName;

if (process.env.OPENSHIFT_MONGODB_DB_PASSWORD) {
    connectString = process.env.OPENSHIFT_MONGODB_DB_USERNAME + ":" +
        process.env.OPENSHIFT_MONGODB_DB_PASSWORD + "@" +
        process.env.OPENSHIFT_MONGODB_DB_HOST + ':' +
        process.env.OPENSHIFT_MONGODB_DB_PORT + '/' +
        process.env.OPENSHIFT_APP_NAME;
}

var db = mongoose.connect(connectString);


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(multer());
app.use(express.static(__dirname + '/public'));
var ipaddress = process.env.OPENSHIFT_NODEJS_IP || '127.0.0.1';
var port = process.env.OPENSHIFT_NODEJS_PORT || 3000;

// PROJECT GET REQUESTS BEGIN
app.get('/sports/*', function(req, res) {
    var path = req.url.replace("/sports","");
    console.log(path);
    var url = "http://api.sportradar.us" + path;
    console.log(url);
    req.pipe(request(url)).pipe(res);
});

app.get('/bing/*', function(req, res) {
    var path = req.url.replace("/bing/","");
    var url = "https://api.datamarket.azure.com/Bing/Search/"+path;
    req.pipe(request(url)).pipe(res);
});
// PROJECT GET REQUESTS END

// pass express reference to server side application module
require("./public/assignment/server/app.js")(app,db,mongoose);
require("./public/project/server/app.js")(app);

app.listen(port, ipaddress);