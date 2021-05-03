const DtoBase = require("./base/dto");

class CarDto extends DtoBase {
    constructor(data, createOrUpdate) {
        super(data, createOrUpdate);
        if (data) {
            data.firstName ? this.firstName = data.firstName : () => {};
            data.lastName ? this.lastName = data.lastName : () => {};
        }
    }
}

module.exports = CarDto;