const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const mongoosePaginate =  require('mongoose-paginate');

const BookSchema = new Schema({
    title: {
        type: String
    },
    isbn: {
        type: String
    },
    author: {
        type: Schema.Types.ObjectId,
        ref: 'Author'
    }
},
{
    timestamps: true
})

BookSchema.plugin(mongoosePaginate);

module.exports = mongoose.model('Book', BookSchema);