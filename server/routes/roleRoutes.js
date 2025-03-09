const express = require("express");
const { createRole, getAllRole } = require("../controllers/roleControllers");
const { protect } = require("../middleware/authMiddleware");

const router = express.Router();

router.post("/", protect, createRole);
router.get("/", protect, getAllRole);

module.exports = router;
