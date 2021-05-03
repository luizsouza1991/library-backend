const ObjectId = require('mongoose').Types.ObjectId;

class DtoBase {
    constructor(data, createOrUpdate) {
        if (createOrUpdate) {
            this._id = ObjectId(data._id || data.uuid);
            delete this.uuid;
        } else {
            data._id || data.uuid ? this.uuid = data._id || data.uuid : () => {};
        }
    }
}

module.exports = DtoBase;