var argo = require('argo');
var express = require('express');
var openarpa = require('openarpa-scrape');

var app = express();

var port = 3000;

var proxy = argo()
    .target('https://api.usergrid.com')
    .build();

app.get('/hello', function(req, res) {
    res.send('Hello from openARPA!!');
});

app.get('/amianto', function(req, res) {
    res.writeHead(200, {"Content-Type" : "application/json"});
    openarpa.amianto(function (data) {
        res.end(JSON.stringify(data) + '\n');    
    });
});

app.get('/monitoring/:format', function(req, res) {
    res.writeHead(200, {"Content-Type" : "application/json"});
    openarpa.monitoring(false, req.params.format, function (data) {
        res.end(JSON.stringify(data) + '\n');    
    });
});

app.get('/warning/:format', function(req, res) {
    res.writeHead(200, {"Content-Type" : "application/json"});
    openarpa.monitoring(true, req.params.format, function (data) {
        res.end(JSON.stringify(data) + '\n');    
    });
});

app.all('*', proxy.run);

var lhost = 'http://localhost:' + port;
var testhost = 'http://openpuglia-test.apigee.net';

console.log('try this: curl ' + lhost + '/hello\n');
console.log('or server test: curl ' + testhost + '/hello');

console.log('-----------------------------------\n');
var m = '/monitoring\n';
console.log('try this: curl ' + lhost + m);
console.log('or server test: curl ' + testhost + m);

console.log('-----------------------------------\n');
var m = '/monitoring/geojson\n';
console.log('try this: curl ' + lhost + m);
console.log('or server test: curl ' + testhost + m);

console.log('-----------------------------------\n');
var m = '/warning\n';
console.log('try this: curl ' + lhost + m);
console.log('or server test: curl ' + testhost + m);

console.log('-----------------------------------\n');
var m = '/warning/geojson\n';
console.log('try this: curl ' + lhost + m);
console.log('or server test: curl ' + testhost + m);

console.log('-----------------------------------\n');
var m = '/amianto\n';
console.log('try this: curl ' + lhost + m);
console.log('or server test: curl ' + testhost + m);

app.listen(port);