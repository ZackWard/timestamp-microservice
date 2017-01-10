var express = require('express');
var moment = require('moment');
var chrono = require('chrono-node');
var app = express();
var port = 3000;

app.use('/static', express.static('public'));

app.get('/', function (req, res) {
    res.sendFile( __dirname + '/public/syntax.html', {}, function (error) {
        if (error) {
            res.status(500).send("Error");
        }
    });
});

app.get('/:dateString', function (req, res) {
    var parsedDate = chrono.parseDate(req.params.dateString, new Date());
    if (parsedDate) {
        res.json({
            "natural": moment(parsedDate).format("MMMM D, Y"),
            "unix": new Date(parsedDate).getTime() / 1000
        });
    } else if (moment.unix(req.params.dateString).isValid()) {
        // Ok, we're dealing with a unix Timestamp
        var unixDate = moment.unix(req.params.dateString);
        res.json({
            "natural": unixDate.format("MMMM D, Y"),
            "unix": unixDate.unix()
        });
    } else {
        res.status(400).json({"natural": null, "unix": null});
    }
});

app.listen(port, 'localhost');
console.log("Timestamp Microservice listening on port " + port);

// Make server available for Mocha testing
module.exports = app;