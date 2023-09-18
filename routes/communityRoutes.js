const express = require("express");
const { createCommunity } = require("../controllers/userControllers");

const router = express.Router();

router.post("/community", createCommunity);

module.exports = router;
