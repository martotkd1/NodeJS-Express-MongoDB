var express = require('express');
var app = new express();
var port = process.env.PORT || 3000;

var mongoose = require('mongoose');
var db;
if (process.env.ENV == 'Test') {
    db = mongoose.connect('mongodb://localhost/bookAPI_test')
}
else {
    db = mongoose.connect('mongodb://localhost/bookAPI')
}

var bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

var Book = require('./models/bookModel');
var bookRouter = require('./Routes/bookRoutes.js')(Book);
app.use('/api/Books', bookRouter);

app.get('/', function (req, res) {
    res.send('Welcome to my API! Nice, yeah!');
});

app.get('/api', function (req, res) {
    res.send('api contains all the data, for instance, /api/Books');
});

app.listen(port, function () {
    console.log('Gulp is running on PORT: ' + port);
});

module.exports = app;