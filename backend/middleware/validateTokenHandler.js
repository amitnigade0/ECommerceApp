const asyncHandler = require('express-async-handler')
const jwt = require('jsonwebtoken')

const validateToken = asyncHandler(async (req, res, next) => {
    let token;
    const bearerToken = req.headers.authorization || req.headers.Authorization;
    if (bearerToken && bearerToken.startsWith('Bearer')) {
        token = bearerToken.split(' ')[1];
        jwt.verify(token, process.env.APP_SECRET_KEY, (err, decoded) => {
            if (err) {  
                res.status(401);
                throw new Error('un authorized user1')
            }
            req.user = decoded.user;
            next()
        })
    } else {
        res.status(401);
        throw new Error('access token missing or invalid token')
    }
})

module.exports = validateToken;