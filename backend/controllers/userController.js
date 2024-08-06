const asyncHandler = require('express-async-handler');
const User = require('../models/userModel');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

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

module.exports = {registerUser, loginUser, currentUser, updateUser}