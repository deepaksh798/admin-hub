const express = require("express");
const { Snowflake } = require("@theinternetfolks/snowflake");
const User = require("../models/userModel");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const generateToken = require("../middleware/generateToken");

// USER REGISTRATION

const signup = async (req, res) => {
  console.log("we are in signup", req.body);
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      console.log("ALL FIELDS ARE MENDATORY");
    }

    const userExist = await User.findOne({ email });

    if (userExist) {
      res.status(400);
      throw new Error("User allready exist");
    }

    const data = {
      id: Snowflake.generate(),
      name, //name:name
      email,
      password,
    };

    const token = await generateToken(data.id);
    console.log("token--->", token);

    const user = await User.create(data);
    if (user) {
      res.status(200).json({
        status: true,
        content: { data: user, meta: { access_token: token } },
      });
    }
  } catch (error) {
    console.log(error);
  }
};

// USER SIGNIN

const signin = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });

    if (!user) {
      console.log("Invalid email");
      return res.status(400).json({ message: "Invalid email or password" });
    }

    const passValid = await bcrypt.compare(password, user.password);

    if (!passValid) {
      console.log("Invalid password");
      return res.status(400).json({ message: "Invalid email or password" });
    }

    const token = await generateToken(user.id);
    console.log("token-->", token);

    return res.status(200).json({
      status: true,
      content: { data: user, meta: { access_token: token } },
    });
  } catch (error) {
    console.error("error--->", error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

const getUserDetails = async (req, res) => {
  try {
    console.log("WE ARE IN GetUserDetails");
    let token;

    if (
      req.headers.authorization &&
      req.headers.authorization.startsWith("Bearer")
    ) {
      token = req.headers.authorization.split(" ")[1];

      const { id } = jwt.verify(token, process.env.TOKEN_KEY);
      console.log("Decrypt Token-->", id);

      const user = await User.findOne({ id }, "-password");
      console.log("user", user);

      if (!user) {
        res.status(400);
        throw Error("Invalid Token");
      }

      res.status(200).json({
        status: true,
        content: {
          data: user,
        },
      });
    }
  } catch (error) {
    console.log("getmeError--->", error);
  }
};

// const getAllUsers = async (req, res) => {
//   try {
//     // Fetch all users except the password field
//     const users = await User.find({}, "-password");

//     res.status(200).json({
//       status: true,
//       content: {
//         data: users,
//       },
//     });
//   } catch (error) {
//     console.error("Error fetching users:", error);
//     res.status(500).json({ message: "Internal Server Error" });
//   }
// };

module.exports = { signup, signin, getUserDetails, getAllUsers };
