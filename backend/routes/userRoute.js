const express = require('express');
const userRouter = express.Router();
const { registerUser, loginUser, currentUser, updateUser, logoutUser, forgotPassword, resetPassword} = require('../controllers/userController')
const validateToken = require('../middleware/validateTokenHandler')

userRouter.post('/register', registerUser);
userRouter.post('/login', loginUser)
userRouter.get('/current', validateToken, currentUser);
userRouter.post('/update', validateToken, updateUser)
userRouter.post('/logout', validateToken, logoutUser)
userRouter.post('/forgot-password', forgotPassword)
userRouter.post('/reset-password', resetPassword)

module.exports = userRouter;
