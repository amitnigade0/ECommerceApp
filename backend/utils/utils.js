const jwt = require("jsonwebtoken");

// Generate JWT
const generateToken = (user) => {
  return jwt.sign(
    {
      user: {
        id: user.id,
        username: user.username,
        email: user.email,
      },
    },
    process.env.APP_SECRET_KEY,
    { expiresIn: "5m" }
  );
};

// Generate Refresh Token
const generateRefreshToken = (user) => {
  return jwt.sign(
    {
      user: {
        id: user.id,
        username: user.username,
        email: user.email,
      },
    },
    process.env.REFRESH_SECRET_KEY,
    { expiresIn: "1d" }
  );
};

module.exports = { generateToken, generateRefreshToken };
