var express = require('express'),
    mongoose = require('mongoose'),
    bodyParser = require('body-parser');

var port = process.env.PORT || 3000;
var app = express();

var db = mongoose.connect('mongodb://libraryUser:LibraryMongoDBPassword@ds229415.mlab.com:29415/library-api-db', { useMongoClient: true });
var Book = require('./models/bookModel');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

var bookRouter = express.Router();

bookRouter.route('/Books')
    .post(function(req, res) {
        var book = new Book(req.body);
        book.save();
        res.status(201).send(book)
    })
    .get(function(req, res) {
        var query = [];

        if (req.query.genre) {
            query.genre = req.query.genre
        }

        Book.find(query, function(err, books) {
            if (err)
                res.status(500).send(err);
            else
                res.json(books);
        });
    });

bookRouter.route('/Books/:bookId')
    .get(function(req, res) {
        Book.findById(req.params.bookId, function(err, book) {
            if (err)
                res.status(500).send(err);
            else
                res.json(book);
        });
    });


app.use('/api', bookRouter);



app.get('/', function(req, res) {
    res.send('welcome to my API!');
});

app.listen(port, function() {
    console.log("Gulp is running my app on port: " + port);
});
