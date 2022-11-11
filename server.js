"use strict";
exports.__esModule = true;
var express = require('express');
var app = express();
var port = process.env.port || 3000;
var path = require('path');
var response_1 = require("./response");
// Bodyparser middleware
var bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({
    extended: false
}));
app.use(bodyParser.json());
// Set up pug templating engine
app.set('view engine', 'pug');
app.use(express.static(__dirname + "/public"));
app.get('/', function (req, res) {
    res.render('index');
});
// Return the prompt and its result
app.get('/prompt/', function (req, res) {
    var prompt = req.query.prompt;
    response_1["default"](prompt).then(function (result) {
        var displayResult = result;
        res.render('result', { prompt: prompt, result: displayResult });
    })["catch"](function (err) {
        console.log(err.message);
        res.render('result', { prompt: prompt, result: "Error" });
    });
});
// Run the server
app.listen(port, function () {
    console.log("Server running at http://localhost:" + port);
});
