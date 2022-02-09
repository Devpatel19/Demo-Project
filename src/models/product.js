const mongoose = require('mongoose')
const reviewSchema = mongoose.Schema(
    {
        like: { 
            type: Number, 
            required: true,
            default: 0 
        },
        dislike:{
            type: Number,
            require: true,
            default: 0
        },
        comment: { 
            type: String, 
            required: true 
        },
        user: {
            type: mongoose.Schema.Types.ObjectId,
            required: true,
            ref: 'User',
        },
        types:{
            type: mongoose.Schema.Types.ObjectId,
            required: true,
            ref: 'Product'
        }
    },
    {
        timestamps: true,
    }
)
const productSchema = new mongoose.Schema({
    productname: {
        type: String,
        required: true,
        trim: true,
    },
    brand: {
        type: String,
        required: true
    },
    image: {
        type: String,
        required: false
    },
    description: {
        type: String,
        required: true,
    },
    reviews: [reviewSchema],
    like: {
        type: Number,
        required: true,
        default: 0
    },
    dislike: {
        type: Number,
        required: true,
        default: 0
    },
    owner: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    },
    types: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'ProductType'
    }
}, {
    timestamps: true
})
const Product = mongoose.model('Product',productSchema)

const Review = mongoose.model('Review',reviewSchema)

module.exports = { Product, Review }