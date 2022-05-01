const jwt = require("jsonwebtoken");
const path = require("path");

const createAccessToken = (user) => {
  const accessToken = jwt.sign(
    {
      username: user.username,
      role: user.role,
    },
    process.env.ACCESS_TOKEN_SECRET,
    { expiresIn: "15s" }
  );
  return accessToken;
};

const createRefreshToken = (user) => {
  const refreshToken = jwt.sign(
    {
      username: user.username,
      role: user.role,
    },
    process.env.REFRESH_TOKEN_SECRET
  );
  return refreshToken;
};

module.exports = { createAccessToken, createRefreshToken };
