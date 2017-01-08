var express = require('express');
var app = express();
var port = 3000;

app.get('/', function (req, res) {
    res.end("Hello World!");
});

app.listen(port);
console.log("Timestamp Microservice listening on port " + port);