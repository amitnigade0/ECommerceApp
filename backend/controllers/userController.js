const asyncHandler = require('express-async-handler');
const User = require('../models/userModel');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const nodemailer = require('nodemailer');
const crypto = require('crypto');
require('dotenv').config()

const registerUser = asyncHandler(async (req, res) => {
    const { username, email, password } = req.body;
    if (!username || !email || !password) {
        res.status(400);
        throw new Error('One or more fields missing!')
    }
    const isUserExists = await User.findOne({ email });
    if (isUserExists) {
        res.status(409);
        throw new Error('User already exists!')
    }
    const hashedPassword = await bcrypt.hash(password, 10)

    const registerdUser = await User.create({
        username, email, password: hashedPassword
    })
    if (!registerdUser) {
        res.status(400);
        throw new Error('Something went wrong while user registration!')
    }
    res.json({ message: 'Registration successful!', username }).status(201);
})

const loginUser = asyncHandler(async (req, res) => {
    const { email, password } = req.body;
    if (!email || !password) {
        res.status(400);
        throw new Error('One or more fields missing!')
    }
    const user = await User.findOne({ email });
    if (!user) {
        res.status(404);
        throw new Error('User is not registerd!')
    }
    const isValidPassword = await bcrypt.compare(password, user.password)
    if (isValidPassword) {
        const token = jwt.sign({
            user: {
                id: user.id,
                username: user.username,
                email
            }
        }, process.env.APP_SECRET_KEY, { expiresIn: '1h' })
        res.json({ message: 'Login successful!', token }).status(200);
    } else {
        res.status(401);
        throw new Error('Email & paaword does not match!')
    }
})

const currentUser = asyncHandler(async (req, res) => {
    let user = await User.findOne({ _id: req.user.id });
    if (!user) {
        res.status(404);
        throw new Error('current user not found!')
    }
    user.password = '*******';
    res.json(user).status(200);
})

const updateUser = asyncHandler(async (req, res) => {
    let user = await User.findOne({ _id: req.user.id });
    if (!user) {
        res.status(404);
        throw new Error('current user not found!')
    }
    const validFields = Object.keys(User.schema.obj);
    const updateFields = Object.keys(req.body);

    const validData = updateFields.every(field => validFields.includes(field));
    if (!validData) {
        res.status(400);
        throw new Error('Invalid data to update user!')
    }
    const updatedUserData = await User.updateOne(
        { _id: req.user.id },
        { $set: req.body }
    )
    res.json(updatedUserData).status(201)

})

const logoutUser = asyncHandler(async (req, res) => {
    let token;
    const bearerToken = req.headers.authorization || req.headers.Authorization || req?.body?.headers?.Authorization;
    if (bearerToken && bearerToken.startsWith('Bearer')) {
        token = bearerToken.split(' ')[1];
    }
    res.status(200).json({ message: 'Logged out successfully!' });
})

const forgotPassword = asyncHandler(async (req, res) => {
    const { email } = req.body;

    // Check if user exists
    const user = await User.findOne({ email });
    if (!user) {
        return res.status(404).json({ message: 'User not found' });
    }

    // Generate a reset code
    const resetCode = crypto.randomBytes(3).toString('hex')
    user.resetPasswordToken = resetCode;
    user.resetPasswordExpires = Date.now() + 600000; // 10 min

    await user.save();

    // Send email
    const transporter = nodemailer.createTransport({
        secure: true,
        host: 'smtp.gmail.com',
        port: 465,
        auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.APP_PASSWORD_GOOGLE,
        },
    });
    
    const mailOptions = {
        from: process.env.EMAIL_USER,
        to: email,
        subject: 'E-Cart Account Password Reset Code',
        text: `Your E-Cart account password reset code is ${resetCode}. It will expire in 1 hour.`,
        html: `<span>Your E-Cart account password reset code is <b>${resetCode}</b>. It will expire in 10 minuntes.</span>`
    };

    transporter.sendMail(mailOptions, (error, info) => {
        console.log(error);
        if (error) {
            return res.status(500).json({ message: 'Error sending email' });
        }
        res.status(200).json({ message: 'Reset code sent to your email' });
    });
})

const resetPassword = asyncHandler(async (req, res) => {
    const { resetPasswordToken, newPassword } = req.body;

    // Check if user exists
    const user = await User.findOne({ resetPasswordToken, resetPasswordExpires: {$gt: Date.now()} });
    if (!user) {
        return res.status(404).json({ message: 'Invalid or expired token' });
    }

    const hashedPassword = await bcrypt.hash(newPassword, 10);
    user.password = hashedPassword;
    user.resetPasswordToken = '';
    user.resetPasswordExpires = ''
    await user.save();
    res.status(201).json({ message: 'Password reset successfully' });
})

module.exports = {registerUser, loginUser, currentUser, updateUser, logoutUser, forgotPassword, resetPassword}