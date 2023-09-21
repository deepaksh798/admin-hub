const express = require("express");
const { protect } = require("../middleware/authMiddleware");
const { createMember } = require("../controllers/memberControllers");
const router = express.Router();

router.post("/", protect, createMember);

module.exports = router;
