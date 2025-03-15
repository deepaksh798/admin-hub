const express = require("express");
const {
  signup,
  signin,
  getUserDetails,
  // getAllUsers,
} = require("../controllers/userControllers");

const router = express.Router();

router.post("/signup", signup);

router.post("/signin", signin);

router.get("/me", getUserDetails);

// router.get("/users", getAllUsers);

module.exports = router;
