const jwt = require("jsonwebtoken");
const User = require("../models/userModel");

const protect = async (req, res, next) => {
  console.log("we are in AUTH MIDDLEWARE");

  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    try {
      token = req.headers.authorization.split(" ")[1];

      const decodeToken = jwt.verify(token, process.env.TOKEN_KEY);
      console.log("Decrypt Token-->", decodeToken);

      req.user = await User.findOne({ id: decodeToken.id }).select("-password");
      console.log("req.user===>", req.user);
      next();
    } catch (error) {
      console.log(error);
      res.status(400);
      throw new Error("error appear in authMiddleware");
    }
    if (!token) {
      console.log("invalid token");
      res.status(400);
    }
  }
};

module.exports = { protect };
