const express = require("express");
const {
  signup,
  signin,
  getUserDetails,
  getAllUsers,
} = require("../controllers/userControllers");
const {protect} = require("../middleware/authMiddleware");

const router = express.Router();

router.post("/signup", signup);

router.post("/signin", signin);

router.get("/me", getUserDetails);

router.get("/users", protect, getAllUsers);

module.exports = router;
