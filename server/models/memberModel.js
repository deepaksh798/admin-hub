const mongoose = require("mongoose");
const { Snowflake } = require("@theinternetfolks/snowflake");
const Community = require("../models/communityModel");
const User = require("../models/userModel");
const Role = require("../models/roleModel");

const memberSchema = mongoose.Schema(
  {
    id: {
      type: String,
      required: true,
    },
    community: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Community",
      required: true,
    },
    user: {
      type: mongoose.Schema.Types.String,
      ref: "User",
      required: true,
    },
    role: {
      type: mongoose.Schema.Types.String,
      ref: "Role",
      required: true,
    },
  },
  { timestamps: true }
);

const Member = mongoose.model("Member", memberSchema);
module.exports = Member;
