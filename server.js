var express = require('express');
var request = require('request');
var app = express();
app.use(express.static(__dirname + '/public'));
var ipaddress = process.env.OPENSHIFT_NODEJS_IP || '127.0.0.1';
var port = process.env.OPENSHIFT_NODEJS_PORT || 3000;
app.get('/api/*', function(req, res) {
    var path = req.url.replace("/api","");
    console.log(path);
    var url = "http://api.sportradar.us" + path;
    req.pipe(request(url)).pipe(res);
});
app.listen(port, ipaddress);