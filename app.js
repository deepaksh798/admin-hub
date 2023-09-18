const express = require("express");
const dotenv = require("dotenv");
const { Snowflake } = require("@theinternetfolks/snowflake");
const connectDB = require("./config/db");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const userRoutes = require("./routes/userRoutes");
const communityRoutes = require("./routes/communityRoutes.js");

dotenv.config();
connectDB();
const app = express();
const port = process.env.PORT;

app.use(express.json());

app.get("/", (req, res) => {
  console.log("api is running");
});

app.use("/v1/auth", userRoutes);

app.use("/v1", communityRoutes);

app.listen(port, () => {
  console.log("Server started on port 5000");
});
