const mongoose = require('mongoose')

const productTypeSchema = new mongoose.Schema({
    productType: {
        type: String,
        unique: true,
        required: true,
        trim: true,
        lowercase: true,
    },
    completed: {
        type: Boolean,
        default: false
    },
    owner: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    }
}, {
    timestamps: true
})

const ProductType = mongoose.model('ProductType', productTypeSchema)

module.exports = ProductType