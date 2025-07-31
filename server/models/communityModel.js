const express = require("express");
const mongoose = require("mongoose");
const slug = require("mongoose-slug-generator");
const { required } = require("nodemon/lib/config");

mongoose.plugin(slug);

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
    members: {
      type: Array,
      required: false,
    },
    slug: {
      type: mongoose.Schema.Types.String,
      // slug: "name",
      required: true,
    },
  },
  { timestamps: true }
);

const Community = mongoose.model("Community", communitySchema);

module.exports = Community;
