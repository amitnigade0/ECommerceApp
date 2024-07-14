const mongoose = require('mongoose');
const { type } = require('os');

const reviewModel = mongoose.Schema({
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
        type: Date, default: Date.now
    },
    reviewerEmail: {
        type: String,
        required: true
    },
    reviewerPhoto: {
        type: String,
        required: true
    },
})

module.exports = mongoose.model('Review', reviewModel);