var express = require('express'),
    Book = require('../models/bookModel');

var routes = function () {
    var bookRouter = express.Router();

    var bookController = require('../controllers/bookController')(Book);
    bookRouter.route('/')
        .post(bookController.post)
        .get(bookController.get);

    bookRouter.use('/:bookId', bookController.findByIdInitializer);
    bookRouter.route('/:bookId')
        .get(bookController.getById)
        .put(bookController.put)
        .patch(bookController.patch)
        .delete(bookController.remove);

    return bookRouter;
};

module.exports = routes;