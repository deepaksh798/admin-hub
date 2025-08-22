const express = require("express");
const { Snowflake } = require("@theinternetfolks/snowflake");
const Community = require("../models/communityModel");
const Members = require("../models/memberModel");

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
      slug: name,
    };

    console.log("data-->", data);
    // console.log("req.user.id --->", req.user.id);

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

const getAllCommunity = async (req, res) => {
  try {
    console.log("we are in GetCommunity");
    data = await Community.find();

    console.log("get data---->", data);

    if (!data) {
      res.status(400);
      throw new Error("not found");
    }
    if (data.length === 0) {
      res.status(200).json({ status: 400, message: "No communities found" });
      console.log("No communities found");
      return;
    }

    const length = Math.floor(data.length / 5);

    res.status(200).json({
      status: true,
      content: {
        meta: { total: data.length, pages: length },
        data: data,
      },
    });
  } catch (error) {
    console.log("error--->", error);
  }
};

const getAllMembers = async (req, res) => {
  try {
    const slug = req.params.id;

    const community = await Community.find({ slug: slug });

    if (!community) {
      console.log("community not found");
      res.status(200);
      throw new Error("community not found");
    }

    console.log("community-->", community);
    const members = await Members.find({ community: community[0].id })
      .populate("user", "name")
      .populate("role", "name");
    console.log("members", members);

    if (!members) {
      console.log("Community not found");
      res.statue(404);
    }

    res.status(200).json({ statue: true, content: { data: members } });
  } catch (error) {
    console.log(error);
    res.status(400);
  }
};

const getMyOwnedCommunity = async (req, res) => {
  try {
    const communities = await Community.find({ owner: req.user.id });

    if (!communities) {
      console.log("Community not found");
      res.status(404);
      throw new Error("Community not found");
    }

    res.status(200).json({
      status: true,
      content: {
        meta: { total: communities.length, pages: 1, page: 1 },
        data: communities,
      },
    });
  } catch (error) {
    console.log("error", error);
    res.status(400);
    throw new Error(`Error in create communtity api`);
  }
};

const getMyJoinedCommunity = async (req, res) => {
  try {
    console.log("req.user==>", req.user.id);
    const data = await Members.find({ user: req.user.id }).populate(
      "community"
    );
    console.log("data", data);
    res.status(200).json({ statue: true, content: { data: data } });
  } catch (error) {
    console.log(error);
  }
};

module.exports = {
  createCommunity,
  getAllCommunity,
  getAllMembers,
  getMyOwnedCommunity,
  getMyJoinedCommunity,
};
