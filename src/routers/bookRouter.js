const RouterBase = require("./base/router")
const BookController = require("../controllers/bookController");

class BookRouter extends RouterBase {
    constructor(app) {
        super(app, 'book', new BookController());
    }
}

module.exports = BookRouter;