const DtoBase = require("./base/dto");
const AuthorDto = require("./authorDto");

class BookDto extends DtoBase {
    constructor(data, createOrUpdate) {
        super(data, createOrUpdate);
        if (data) {
            data.title ? this.title = data.title : () => {};
            data.isbn ? this.isbn = data.isbn : () => {};
            data.author ? this.author = data.author : () => {};
        }
    }
}

module.exports = BookDto;