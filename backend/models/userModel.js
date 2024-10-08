const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    username: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    resetPasswordToken: {
        type: String,
        required: false
    },
    resetPasswordExpires: {
        type: Date,
        required: false
    },
    cartItems: {
        type: Array,
        required: false
    },
    orders: {
        type: Array,
        required: false
    },
    profilePhoto: {
        type: String,
        required: false
    },
    address: {
        type: String,
        required: false
    },
    shippingAddress: {
        type: String,
        required: false
    },
    language: {
        type: String,
        required: false
    },
    contactNumber: {
        type: String,
        required: false
    }
}, { timestamps: true })

module.exports = mongoose.model('User', userSchema)