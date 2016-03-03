var express = require('express');
var request = require('request');
//var bingApi = require('node-bing-api')({accKey: "ZT6UwwHmcPqetCdc6nO9+16rjz5iNa/9izs7sxGO1io"});
var app = express();
app.use(express.static(__dirname + '/public'));
var ipaddress = process.env.OPENSHIFT_NODEJS_IP || '127.0.0.1';
var port = process.env.OPENSHIFT_NODEJS_PORT || 3000;

/*SportRadar API call*/
app.get('/api/*', function(req, res) {
    var path = req.url.replace("/api","");
    console.log(path);
    var url = "http://api.sportradar.us" + path;
    req.pipe(request(url)).pipe(res);
});

/* MAIN BING CODE */
app.get('/bing/*', function(req, res) {
    var path = req.url.replace("/bing/","");
    var url = "https://api.datamarket.azure.com/Bing/Search/"+path;
    req.pipe(request(url)).pipe(res);
});
app.listen(port, ipaddress);