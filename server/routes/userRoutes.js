const express = require("express");
const {
  signup,
  signin,
  getUserDetails,
} = require("../controllers/userControllers");

const router = express.Router();

router.post("/signup", signup);

router.post("/signin", signin);

router.get("/me", getUserDetails);

module.exports = router;
