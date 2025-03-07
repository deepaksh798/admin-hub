const express = require("express");
const { protect } = require("../middleware/authMiddleware");
const { createMember } = require("../controllers/memberControllers");
const { getMyJoinedCommunity } = require("../controllers/communityControllers");
const router = express.Router();

router.post("/", protect, createMember);
router.get("/", protect, getMyJoinedCommunity)

module.exports = router;
