const express = require("express");
const router = express.Router();
const { getDashboardStats } = require("../controllers/dashboardControllers");
const { protect } = require("../middleware/authMiddleware");

// Route to get counts of communities, roles, and users
router.get("/",protect, getDashboardStats);

module.exports = router;
