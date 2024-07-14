const express = require('express');
const userRouter = express.Router();


userRouter.get('/register', (req, res) => {
    res.send({message: 'regisr'}).status(200)
})

module.exports = userRouter
