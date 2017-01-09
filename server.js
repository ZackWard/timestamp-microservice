var express = require('express');
var moment = require('moment');
var chrono = require('chrono-node');
var app = express();
var port = 3000;

app.get('/', function (req, res) {
    res.end("Syntax: ");
});

app.get('/:dateString', function (req, res) {
    var parsedDate = chrono.parseDate(req.params.dateString, new Date());
    if (parsedDate) {
        res.send({
            "natural": parsedDate.toString(),
            "unix": new Date(parsedDate).getTime() / 1000
        });
    } else if (moment.unix(req.params.dateString).isValid()) {
        // Ok, we're dealing with a unix Timestamp
        var unixDate = moment.unix(req.params.dateString);
        res.send({
            "natural": unixDate.toString(),
            "unix": unixDate.unix()
        });
    } else {
        res.send({"natural": null, "unix": null});
    }
});

app.listen(port);
console.log("Timestamp Microservice listening on port " + port);