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
      type: String,
      required: true,
    },
    user: {
      type: String,
      required: true,
    },
    userEmail: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

const Member = mongoose.model("Member", memberSchema);
module.exports = Member;
