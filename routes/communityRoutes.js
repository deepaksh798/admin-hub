const express = require("express");
const { protected } = require("../middleware/authMiddleware");
const {
  createCommunity,
  getCommunity,
} = require("../controllers/communityControllers");

const router = express.Router();

router.post("/community", protected, createCommunity);

router.get("/community", protected, getCommunity);

module.exports = router;
