const express = require("express");
const { createRole, getAllRole } = require("../controllers/roleControllers");

const router = express.Router();

router.post("/", createRole);
router.get("/", getAllRole);

module.exports = router;
