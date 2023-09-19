const express = require("express");
const mongoose = require("mongoose");

const communitySchema = mongoose.Schema(
  {
    id: {
      type: String,
      required: true,
      unique: true,
    },
    name: {
      type: String,
      required: true,
    },
    owner: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

const Community = mongoose.model("Community", communitySchema);

module.exports = Community;
