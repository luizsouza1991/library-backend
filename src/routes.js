const AuthorRouter = require("./routers/authorRouter");
const BookRouter = require("./routers/bookRouter");

class Routes {
    constructor(app) {
        new AuthorRouter(app);
        new BookRouter(app);
    }
}

module.exports = Routes;