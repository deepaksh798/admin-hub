const express = require("express");
const router = express.Router();
const { getDashboardStats } = require("../controllers/dashboardControllers");

// Route to get counts of communities, roles, and users
router.get("/", getDashboardStats);

module.exports = router;
