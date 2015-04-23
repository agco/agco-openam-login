'use strict';

var bodyParser = require('body-parser');
var express = require('express');
var app = express();

var Server = function() {
    app.use(bodyParser.json());
    app.use('/', express.static(__dirname + '/public'));

    var server = app.listen(3000, function() {
        var host = server.address().address;
        var port = server.address().port;
        console.log('Login module listening at http://%s:%s', host, port);
    });
};

module.exports = new Server();
