const mongoose = require('mongoose');


const cartModel = new mongoose.Schema({
    productId: {
        type: String,
        required: true
    },
    image: {
        type: String,
        required: true
    },
    title: {
        type: String,
        required: true
    },
    offeredPrice: {
        type: Number,
        required: true
    },
    quantity: {
        type: Number,
        required: true
    },
}, { timestamps: true })

module.exports = mongoose.model('Cart', cartModel);