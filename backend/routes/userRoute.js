const express = require('express');
const userRouter = express.Router();
const {registerUser, loginUser} = require('../controllers/userController')

// userRouter.get('/register', async (req, res) => {
//     const review = await Review.create(
//         {
//             "rating": 5,
//             "comment": "Great product!",
//             "date": "2024-05-23T08:56:21.619Z",
//             "reviewerName": "Leo Rivera",
//             "reviewerEmail": "leo.rivera@x.dummyjson.com",
// 			"reviewerPhoto": "photo"
//         }
//     )
//     res.send({message: 'regisr'}).status(200)
// })

userRouter.post('/register', registerUser);
userRouter.post('/login', loginUser)

module.exports = userRouter;
