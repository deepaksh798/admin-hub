const express = require("express");
const dotenv = require("dotenv");
const { Snowflake } = require("@theinternetfolks/snowflake");
const connectDB = require("./config/db");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const cors = require("cors");

const userRoutes = require("./routes/userRoutes");
const communityRoutes = require("./routes/communityRoutes");
const roleRoutes = require("./routes/roleRoutes");
const memberRoutes = require("./routes/memberRoutes");

dotenv.config();
connectDB();
const app = express();
const port = process.env.PORT;

const corsOptions = {
  origin: "*", // or specify your frontend URL instead of "*"
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"],
};
app.use(cors(corsOptions));
app.use(express.json());

app.get("/", (req, res) => {
  console.log("api is running");
});

app.use("/v1/auth", userRoutes);

app.use("/v1/community", communityRoutes);

app.use("/v1/role", roleRoutes);

app.use("/v1/member", memberRoutes);

app.listen(port, () => {
  console.log("Server started on port 5000");
});
