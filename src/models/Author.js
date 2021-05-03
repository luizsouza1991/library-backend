const mongoose = require('mongoose');
const mongoosePaginate =  require('mongoose-paginate');

const AuthorSchema = new mongoose.Schema({
    firstName: {
        type: String
    },
    lastName: {
        type: String
    }
},
{
    timestamps: true
})

AuthorSchema.plugin(mongoosePaginate);

module.exports = mongoose.model('Author', AuthorSchema);