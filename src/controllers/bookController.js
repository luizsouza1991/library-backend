const ControllerBase = require('./base/controller');
const Book = require("../models/Book");
const BookDto = require("../dto/bookDto");
const status = require('http-status')

class BookController extends ControllerBase {
    constructor() {
        super(Book, BookDto);
    }
    
    async index(req, res) {
        try {
            let result = [];
            const data = await this.schema.find().populate('author').sort({createdAt:-1});
            result = data.map(data => new this.model(data));
            
            return res.status(status.OK).json(result);
        } catch {
            return res.status(status.INTERNAL_SERVER_ERROR).json();
        }
    }

    async create(req, res) {
        try {
            const obj = new this.model(req.body, true);
            const data = await this.schema.create(obj);
            let book = await Book.findOne({'_id': data._id}).populate('author');
            const result = new this.model(book);

            return res.status(status.CREATED).json(result);
        } catch (err) {
            return res.status(status.INTERNAL_SERVER_ERROR).json();
        }
    }

    async update(req, res) {
        try {
            const obj = new BookDto(req.body);
            await Book.findByIdAndUpdate(req.params.id, obj, { new: true });
            let book = await Book.findOne({'_id': req.params.id}).populate('author');
            book = new BookDto(book);
            return res.status(status.OK).json(book);
        } catch (err) {
            return res.status(status.INTERNAL_SERVER_ERROR).json();
        }
    }

    async search(req, res) {
        try {
            let result = [];
            let query = [
                {title: {$regex: req.query.title, $options: 'i'}},
                {isbn: {$regex: req.query.isbn}}
            ]
            
            if (req.query.author) {
                query.push({author: {$in: req.query.author.split(',')}})
            }

            const data = await Book.find({$or: query}).populate('author');
            result = data.map(data => new BookDto(data));

            return res.status(status.OK).json(result);
        } catch {
            return res.status(status.INTERNAL_SERVER_ERROR).json();
        }
    }
}

module.exports = BookController;