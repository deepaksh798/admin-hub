const express = require("express");
const { createRole, getAllRole, deleteRole } = require("../controllers/roleControllers");
const { protect } = require("../middleware/authMiddleware");

const router = express.Router();

router.post("/", protect, createRole);
router.get("/", protect, getAllRole);
router.get("/delete/:id", protect, deleteRole);


module.exports = router;
