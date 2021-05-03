const status = require('http-status')

class ControllerBase {
    constructor(schema, model) {
        this.schema = schema;
        this.model = model;
    }

    async index(req, res) {
        try {
            let result = [];
            const data = await this.schema.find().sort({createdAt:-1});
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
            const result = new this.model(data);

            return res.status(status.CREATED).json(result);
        } catch {
            return res.status(status.INTERNAL_SERVER_ERROR).json();
        }
    }

    async show(req, res) {
        try {
            const data = await this.schema.findOne({'_id': req.params.id});
            if (!data) {
                return res.status(status.NOT_FOUND).json();
            }

            const obj = new this.model(data);
            return res.status(status.OK).json(obj);
        } catch {
            return res.status(status.INTERNAL_SERVER_ERROR).json();
        }
    }

    async update(req, res) {
        try {
            const obj = new this.model(req.body);
            await this.schema.findByIdAndUpdate(req.params.id, obj, { new: true });

            return res.status(status.NO_CONTENT).json()
        } catch {
            return res.status(status.INTERNAL_SERVER_ERROR).json();
        }
    }

    async destroy(req, res) {
        try {
            await this.schema.findOneAndDelete({'_id':req.params.id});

            return res.status(status.NO_CONTENT).json();
        } catch {
            return res.status(status.INTERNAL_SERVER_ERROR).json();
        }
    }
}

module.exports = ControllerBase;