const RouterBase = require("./base/router")
const AuthorController = require("../controllers/authorController");

class AuthorRouter extends RouterBase {
    constructor(app) {
        super(app, 'author', new AuthorController());
    }
}

module.exports = AuthorRouter;