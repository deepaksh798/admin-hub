const jwt = require("jsonwebtoken");

const generateToken = async (userId) => {
  return jwt.sign({ id: userId }, process.env.TOKEN_KEY, {
    expiresIn: "30d",
  });
};

module.exports = generateToken;
