var express = require('express'),
    mongoose = require('mongoose'),
    bodyParser = require('body-parser');

var port = process.env.PORT || 3000;
var db = mongoose.connect('mongodb://libraryUser:LibraryMongoDBPassword@ds229415.mlab.com:29415/library-api-db', { useMongoClient: true });

var app = express();
app.use(bodyParser.urlencoded({ extended: true }));

app.use(bodyParser.json());

var bookRouter = require('./Routes/bookRoutes')();
app.use('/api/books', bookRouter);
app.use('/api/authors', bookRouter);

app.get('/', function(req, res) {
    res.send('welcome to my API!');
});

app.listen(port, function() {
    console.log("Gulp is running my app on port: " + port);
});
