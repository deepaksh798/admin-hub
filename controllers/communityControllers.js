const express = require("express");
const { Snowflake } = require("@theinternetfolks/snowflake");
const Community = require("../models/communityModel");

// Create Community

const createCommunity = async (req, res) => {
  console.log("we are in createCommunity", req.body);

  try {
    const { name, owner } = req.body;
    if (!name || !owner) {
      console.log("ALL FIELDS ARE MENDATORY");
    }

    const data = {
      id: Snowflake.generate(),
      name: name,
      owner: req.user.id,
    };

    console.log("data-->", data);

    const community = await Community.create(data);
    if (community) {
      res.status(200).json({
        status: true,
        content: { data: community },
      });
    }
  } catch (error) {
    console.log("error-->", error);
  }
};

const getCommunity = async (req, res) => {
  try {
    console.log("we are in GetCommunity");
    data = await Community.find();

    console.log("get data---->", data);

    if (!data) {
      res.status(400);
      throw new Error("not found");
    }
    if (data.length === 0) {
      res.status(400);
      throw new Error("no communies are there");
    }
    res.status(200).json({
      status: true,
      content: {
        meta: { total: data.length, pages: data.length / 5 },
        data: data,
      },
    });
  } catch (error) {
    console.log("error--->", error);
  }
};

module.exports = { createCommunity, getCommunity };
