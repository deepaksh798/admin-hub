const express = require("express");
const { protect } = require("../middleware/authMiddleware");
const {
  createCommunity,
  getAllCommunity,
  getAllMembers,
  getMyOwnedCommunity,
  getMyJoinedCommunity,
} = require("../controllers/communityControllers");

const router = express.Router();

router.post("/", protect, createCommunity);

router.get("/", protect, getAllCommunity);

router.get("/:id", getAllMembers);

router.get("/me/owner", protect, getMyOwnedCommunity);

router.get("/me/member", protect, getMyJoinedCommunity);

module.exports = router;
