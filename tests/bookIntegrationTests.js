var should = require('should'),
    request = require('supertest'),
    app = require('../app.js'),
    mongoose = require('mongoose'),
    Book = require('../models/bookModel'),
    agent = request.agent(app);

describe('Book Crud Test', function() {
    it('Should allow a book to be posted and return a read and _id', function(done) {
        var bookPost = { title: 'new Book', author: 'Neto', genre: 'Fiction' };
        agent.post('/api/books')
            .set('Accept', 'application/json')
            .send(bookPost)
            .expect('Content-Type', 'application/json; charset=utf-8')
            .expect(201)
            .end(function(err, results) {
                should.not.exist(err);
                results.body.read.should.equal(false);
                results.body.should.have.property('_id');
                done();
            });
    });

    afterEach(function(done) {
        //Book.remove().exec();
        done();
    });
});
