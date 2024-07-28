const mongoose = require('mongoose');


const reviewModel = new mongoose.Schema({
    rating: {
        type: Number,
        required: true
    },
    comment: {
        type: String,
        required: true
    },
    date: {
        type: String,
        required: true
    },
    reviewerName: {
        type: String,
        required: true
    },
    reviewerEmail: {
        type: String,
        required: true
    },
    reviewerPhoto: {
        type: String,
        required: true
    },
}, { timestamps: true })

module.exports = mongoose.model('Review', reviewModel);