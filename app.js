var express = require('express'),
    mongoose = require('mongoose'),
    bodyParser = require('body-parser');

var db;

mongoose.Promise = global.Promise;
if (process.env.ENV == 'Test') {
   console.log("Connecting to test db");
    db = mongoose.connect('mongodb://libraryUser:LibraryMongoDBPassword@ds243085.mlab.com:43085/library-api-db_test', { useMongoClient: true });
}
else {           
    console.log("Connecting to db");
    db = mongoose.connect('mongodb://libraryUser:LibraryMongoDBPassword@ds229415.mlab.com:29415/library-api-db', { useMongoClient: true });
}

var port = process.env.PORT || 8080;

var app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

var bookRouter = require('./Routes/bookRoutes')();
app.use('/api/books', bookRouter);

app.get('/', function(req, res) {
    res.send('welcome to my API!');
});

app.listen(port, function() {
    console.log("Gulp is running my app on port: " + port);
});

module.exports = app;