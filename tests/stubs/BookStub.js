var Book = function (book) {
    this.save = function () { };
};

Book.find = function(query, callback){
    callback(null, []);
};

module.exports = Book;