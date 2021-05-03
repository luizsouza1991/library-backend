const ControllerBase = require('./base/controller');
const Author = require("../models/Author");
const AuthorDto = require("../dto/authorDto");
const status = require('http-status');
const Book = require("../models/Book");


class AuthorController extends ControllerBase {
    constructor() {
        super(Author, AuthorDto);
    }

    async search(req, res) {
        try {
            let result = [];
            let query = [
                {firstName: {$regex: req.query.firstName, $options: 'i'}},
                {lastName: {$regex: req.query.lastName, $options: 'i'}}
            ]

            const data = await Author.find({$or: query});
            result = data.map(data => new Author(data));

            return res.status(status.OK).json(result);
        } catch {
            return res.status(status.INTERNAL_SERVER_ERROR).json();
        }
    }

    async destroy(req, res) {
        try {
            await Author.findOneAndDelete({'_id':req.params.id});
            await Book.deleteMany({'author':req.params.id});

            return res.status(status.NO_CONTENT).json();
        } catch {
            return res.status(status.INTERNAL_SERVER_ERROR).json();
        }
    }
}

module.exports = AuthorController;