const asyncHandler = require("express-async-handler");
const jwt = require("jsonwebtoken");

const validateToken = asyncHandler(async (req, res, next) => {
  let token;
  // when we are sending jwt token via API cookies from client
  token = req.cookies.accessToken;
  if (!token) {
    res.status(401);
    throw new Error("access token missing!");
  }

  jwt.verify(token, process.env.APP_SECRET_KEY, (err, decoded) => {
    if (err) {
      res.status(403);
      throw new Error("Invalid or expired token!");
    }
    req.user = decoded.user;
    next();
  });

  // when we are sending jwt token in API Request header from client
  /*const bearerToken = req.headers.authorization || req.headers.Authorization || req?.body?.headers?.Authorization;
  if (bearerToken && bearerToken.startsWith('Bearer')) {
      token = bearerToken.split(' ')[1];
      jwt.verify(token, process.env.APP_SECRET_KEY, (err, decoded) => {
          if (err) {
              res.status(401);
              throw new Error('un authorized user')
          }
          req.user = decoded.user;
          next()
      })
  } else {
      res.status(401);
      throw new Error('access token missing or invalid token')
  }*/
});

module.exports = validateToken;
