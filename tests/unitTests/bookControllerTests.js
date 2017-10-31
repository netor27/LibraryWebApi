var should = require('should'),
    sinon = require('sinon')
    Book = require('../stubs/BookStub');

describe('Book Controller Tests:', function() {
    describe('Post', function() {
        it('Should not allow empty title on post', function() {
            
            var req = {
                body: {
                    author: 'Neto'
                }
            };

            var res = {
                status: sinon.spy(),
                send: sinon.spy()
            };
            
            var bookController = require("../../controllers/bookController")(Book);
            bookController.post(req,res);
            res.status.calledWith(400).should.equal(true, 'Bad status ' + res.status.args[0][0]);            
            res.send.calledWith('Title is required').should.equal(true);
        });
    });

    describe('Get', function() {
        it('Should return a valid response when getting the list of books', function() {

            var req = {
                query:{}
            };

            var res = {
                status: sinon.spy(),
                json: sinon.spy()
            };
            
            var bookController = require("../../controllers/bookController")(Book);
            bookController.get(req, res);
            res.status.callCount.should.be.equal(0, 'res.status was called ' + res.status.callCount + ' times');
            res.json.callCount.should.be.equal(1, 'res.json was called ' + res.json.callCount + ' times');
        });
    });
});