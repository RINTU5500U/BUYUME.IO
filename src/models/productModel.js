const mongoose = require('mongoose')

const productSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    quantity: {
        type: Number,
        required: true
    },
    createdAt: {
        type: String,
        default: new Date().toLocaleString()
    },
    updatedAt: {
        type: String,
        default: null
    }
})

module.exports = mongoose.model('Product', productSchema)

