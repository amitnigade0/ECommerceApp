const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const productSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    brand: {
        type: String,
        required: true
    },
    category: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    discountPercentage: {
        type: Number,
        required: true
    },
    rating: {
        type: Number,
        required: true
    },
    stock: {
        type: Number,
        required: true
    },
    tags: {
        type: Array,
        required: true
    },
    sku: {
        type: String,
        required: true
    },
    availabilityStatus: {
        type: String,
        required: true
    },
    images: {
        type: Array,
        required: true
    },
    thumbnail: {
        type: String,
        required: true
    },
    //reviews: [{ type: Schema.Types.ObjectId, ref: 'Review' }],
    reviews: {
        type: Array,
        required: true
    },
    returnPolicy: {
        type: String,
        required: true
    },
    shippingInformation: {
        type: String,
        required: true
    },
    warrantyInformation: {
        type: String,
        required: true
    },
    weight: {
        type: Number,
        required: true
    },
    dimensions: {
        type: Object,
        required: true
    },
}, { timestamps: true })

module.exports = mongoose.model('Product', productSchema);